---
title: Overview
id: overview
sidebar_position: 1

---

Overview of the Fundamentals
==============================

Introduction
------------

The fundamental idea behind the _open trip model_ is splitting data into _static
data_ (entities) and _dynamic data_ (actions and events) and decouple their
interaction (similar to how a relational database decouples relations). 

Entities contain data that changes relatively sparingly. Think for instance
about _consignments_, _locations_, and _vehicles_. Though properties of these
entities might change, this generally occurs quite rarely and is definitely not
reflected in real-time. 

On the other hand, how these static entities interact is more prone to change.
For example, a vehicle itself remains the same height, width, and weight over
its lifetime, but it can move multiple different goods every single day. Actions
are used to model this interaction between entities, and events allow you to
model real-time data & update previously shared data incrementally.

Design principles
-----------------

1. **Designed for communication, not processing or as an internal format.**

OTM is designed as a _communication format_. The intended purpose it that
different parties use the same language for communicating. To meet that purpose
OTM needs to be applicable in many use cases which requires great flexibility.
This flexiblity can complicate the code if you process OTM internally (for
example when dealing with inline vs reference associations). You are not
required - or even encouraged - to completely implement the specification if
doesn't fit your use cases. Focus on the parts of OTM that you need and
translate between OTM and your internal format at the boundaries of your
services.

2. **OTM is deliberately a loose format.**

As mentioned, OTM tries to serve a broad spectrum of use cases in the domain of
traffic and logistics, as such OTM is pretty loose in what data is required.
Many fields are optional, and often data types offer multiple modelling options,
such as the many georeference options available on a location. However, for your
use case some fields might actually be required, even if the OTM specification
makes them optional. In such cases the recommend approach is to _only_ accept
incoming OTM that you are able to process, and return validation errors
otherwise. There is no reason to accept OTM, even if valid, when you are not
able to process it anyway.

3. **The ultimate goal is to greatly reduce the amount of tailor-made software.**

The loose format with many optional values allows for handling many use cases
with one data model. However, it might result in two parties implementing OTM
without being able to communicate automatically. To avoid this, [OTM profiles
were created](OTM_Profiles), so that different use cases have a
clear intended structure. Even so, it could still result in small discrepancies.
We are continously trying to balance flexibility to enable parties to use OTM
broadly, and strict rules so that the parties use OTM consistently.

Instead, we could have decided to make OTM more strict, but that would limit the
real world use cases we can accurately model, without OTM becoming too bloated.
We strongly believe we should strive to avoid custom software as much as
possible, but that the limited amount of custom software needed to model
specific use cases or OTM profiles is already a large improvement over the many
custom, proprietary API formats that were needed before.

OTM Entities
------------

### Connecting all entities

Chronologically, it all starts with the [TransportOrder](#tag/TransportOrder),
which groups a set of [Consignments](#tag/Consignment) that need to be shipped
from one location to another. A consignment contains various related
[Goods](#tag/Goods) that are shipped together and administered together. Thus
note that goods are actual physical entities, whereas transport orders and
consignments are administrative ones. The official [Documents](#tag/Document)
that are related to the goods, transport orders, consignments or the delivery
thereof can also be attached either as binary or with a reference to some online
location.

Ultimately, consignments are moved as part of one or multiple
[Trips](#tag/Trip), where various [Constraints](#tag/Constraint) can be put in
place to ensure consignments are delivered on time, or always abide to a certain
temperature during the trip. The transport orders and consignments can be
associated with various [Actors](#tag/Actor). Such as the shipper, the carrier,
the consignee, consignor, or any legal party that is involved in the logistic
operation.

The trip is an entity that models visiting various [Locations](#tag/Location)
using a single [Vehicle](#tag/Vehicle). As such, when multiple vehicles are
involved, these need to be modelled as multiple trips in OTM. Each location that
is visited at a certain time is a [Stop action](#tag/Action) on which multiple
other actions can occur, such as [Loading](#tag/Action) and
[Unloading](#tag/Action) of various Consignments. Other actions include
[Waiting](#tag/Action) - for example because the dock is still occupied - and
having a [Break](#tag/Action). The big difference is that a break is always
mandatory and waiting can be shorted if the situation changes. 

Consignments after unloading can be (optionally) [HandOver](#tag/Action) from
one party (an actor) to another. If needed, you can use a [Move](#tag/Action)
action to model a detailed description of how to travel between two locations
and which [Route](#tag/Route) to take.

During a trip a [Sensor](#tag/Sensor) in a vehicle can give
[LocationUpdateEvents](#tag/Event) with coordinates of the vehicle, or
[SensorUpdateEvents](#tag/Event) with sensor values, for example the temperature
of the goods, or the speed of the vehicle. After OTM data has been shared, it
can be updated using [UpdateEvents](#tag/Event) with the modified data of the
entities that needed to be updates. Also entities can be _associated_ and
_unassociated_ using the [AssociationCreatedEvent](#tag/Event) and
[AssociationRemovedEvent](#tag/Event). This can be useful to provide or modify
information of which vehicle is going to drive which trip after an initial
planning has been made.

### Visually

The above can be visualized as follows:

![](/img/otm5_overview_1.png)

We can also use color-coding to differentiate actions and entities (blue vs
black), and gray out arrows to and from actors and constraints. Since basically
every entity can have some relationship to them to get the following:

![](/img/otm5_overview_2.png)

This can be overwhelming, since there are so many arrows. You can even see some
arrows point two ways. The OTM is thus not a
[tree](https://en.wikipedia.org/wiki/Tree_(data_structure)) but a
[graph](https://www.tutorialspoint.com/data_structures_algorithms/graph_data_structure.htm).
The reason for this setup - as we will show later on - is because it is easier
to model different use cases that way.
