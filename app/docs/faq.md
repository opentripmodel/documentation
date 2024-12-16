---
title: FAQ
sidebar_position: 7
---

Frequently Asked Questions
==========================

* _Is it mandatory to use JSON as file format for OTM5?_
  
  > Yes, this is mandatory. OTM5 does not exist as XML and only JSON is and will be supported. By keeping the options to a minum we
  ensure it is easier to adopt and also that parties that implement OTM can actually talk with each other.

* _How open or free is OTM5 as a standard? How do you prevent that different parties add or change fields?_
  
  > We cannot police every party that _says_ they are doing OTM without actually confirming to the well-defined standard. Simply put, if
  they do not follow the structures defined in [the API portal](https://otm5.opentripmodel.org/) then they are not doing OTM. That said,
  even within the standard there still is some room for different interpretations, so we try to improve this situation by extending or
  documentation & examples, and continously improve the standard itself as well.

* _OTM5 contains some free text fields, such as the vehicle type, the unit measurement, and the type of transport equipment? Which values
  should be used for those fields?_

  > We have been working on incorporating 'standard lists' in the specification as well. For currentcies, temperatures, mass, length and
  speed values we have provided the options in [the API speficication](https://otm5.opentripmodel.org/) and we are also currently working
  on extending that for the different 'types' that are present (such as vehicles, goods items, transport equipment, etc.)

* _The API specification is based on the REST architecture? Is REST therefore mandatory? Are alternatives such as sFTP permitted?_

  > To prevent many flavours of communicating OTM5 we decided to incorporate the actual protocol of communication within the standard. So yes
  the use of REST is mandatory. We understand that moving towards OTM5 is a proces and therefore we like to encourage to focus on the model first,
  but to incorporate the REST architecture afterwards as well.

* _Are any endpoints provided by the OTM standard?_

  > No, the OTM5 standard only consists of the _specification_ of what OTM is and how it should be used. Parties needing to communicate need to
  setup services themselves to actually do this communication. Which party provides the endpoint and which party uses those endpoints needs to be
  decided by the parties themselves as well.

* _When using Transport Orders is it mandatory to use one, or multiple consignments?_

  > A transport without any consignment doesn't make sense. However there is no rule about whether or not a transport order can contain one or
  multiple consignments. Different parties have different needs, so we cannot mandate a process here.

* _How do you update a transport order with multiple consignments?_

  > There are two supported options within the OTM5 standard for updates.
  > 1. You can send the complete transportOrder, including all consignments (both those that are changed and those that are unchanged).
  > 2. You only send an update request to the specific consignments that need updating.
  > The advantage of method 1 is that you only need to do one request, but the downside is that the messages can get quite large, even if
   most consignments did not change. The advantage of method 2 is that you only send what is changed, but you do need to do multiple requests
   to change each consignment. Our view is that parties should always support method 1 and optionally can also support method 2.

* _What is the difference between actions and events?_

  > Actions model the dynamic interaction between static entities. Such as loading and unloading goods from and into vehicles. Entities like
  vehicles seldomly change, whereas load and unload time windows are often updated. By separateing these in entities and actions we make this
  interaction simpler. 
  >
  > Events on the other hand model updates to existing data (such as the updateEvent, or associationCreatedEvent/associationRemovedEvent) or
  model changes that are happening in real-time (such as locationUpdateEvents or sensorUpdateEvents). 

* _My company does not use UUIDs for identifying entities, are UUIDs mandatory?_

  > Since OTM5.2 you do not have to provide UUIDs anymore when sending entities. However, UUIDs are currently best possible method of
  ensuring unique IDs among different platforms. So we highly recommend using them as your primary identifiers. Omitting UUIDs is thus
  allowed when sending entities, however you cannot retrieve entities by any other identifier. This might be accepted if retrieving is
  not necessary.

* _What are constraints used for?_
  
  > Constraints are, as the name suggests, are information about restrictions that hold for the actions or entities they are attached to.
  This can range from delivery windows for consignments, to vehicle types for certain type of goods. See also [this how-to](http://localhost:3000/developer-portal/adding-constraints/) for more information. 

* _What are the association types that appear in the OTM5 messages?_

  > Whenever you look at a hierarchy of entities. Such as a trip, containing stops, containing locations and various sub-actions such as loading and unloading
  consignments you can see that each entity is wrapped in what is called an _association_. These assocaitions are useful because sometimes we want to provide
  the information completely (association type inline), and sometimes we just want to refer to an existing entity (association type reference). This allows you
  to choose whatever is suited for your operation. See also [this dedicated page](associations.md#associations) about
  associations.

* _How can you deal with layered data about the load carriers and the goods contained in them?_

  > OTM5 contains the entity 'Goods' for which two types exist:
  > 1. Items: these are non-layered goods items such as bananas, paperclips, and other type of item you can think of.
  > 2. TransportEquipment: these are layered goods that contain other goods. Examples include boxes, pallets, but also trailers and containers. Basically
  > everything that contains other goods and is not _actively driving_ can be considered a transport equipment.
  >
  > You can thus combine both to create a trailer containing pallets with boxes of bananas and paperclips to model a layered hierarchy of goods.

* _The documentation shows that some entities can refer both ways. For example an action can refer to a consigment, but a consignment can
  also refer to actions. Why is this and how should it be used?_

  > OTM5 indeed allows entities to refer to each other in different ways. This is because OTM supports multiple use cases. For example whenever
  we model a trip that visits multiple locations we have trips that contain stops that again contain load and unload actions that refer to consignments
  being loaded and unloaded. Thus an action needs to be able to refer to the consignment. However, when we look at those same consignments from
  a _track and trace_ perspective we often follow a _single_ consignment that can be part of multiple trips before arriving at its final destination. Thus
  a consignment contains _all_ load and unload actions in that use case. It can be a bit daunting at first, but we strongly believe that this allows us to
  keep the specification fairly small while being useful for a wide range of use cases. See also the [overview](otm_overview.md#overview-of-open-trip-model-v5) for more information.

