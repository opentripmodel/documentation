---
title: OTM Profiles

---

OTM profiles
============

As can be seen from the specification, there is no single top-level element in OTM. Depending on the use case your viewpoint might change and some other entity becomes top-level. For instance, for a 'home delivery' operation the trips are the central piece of the puzzle, which each visit multiple locations to deliver goods. However for a track-and-trace operation, the consignments and its contained goods are the central object, which might be part of _multiple_ trips before arriving at its final destination.

This approach makes OTM flexible while remaining quite simple and small. The data is modelled the same, however how the different pieces relate to each other is different. However it also means that parties using OTM might not be able to actually communicate with each other. To counter this, different use cases in OTM make use of so-called _OTM profiles_ which are a stricter set of rules on top of OTM to ensure that specific messages have a clear intent and are unambiguous. The provided rules in a profile show you the hierarchy of the entities, but also come with a stricter set of rules addressing fields that are required even though they are optional in the official specification. Before parties communicate in OTM they have to determine which profile they are going to abide to.

The various profiles are currently still being discussed and will be thoroughly documented with examples once finalized.

Each profile uses the same setup:

1. It starts of with the what and the why of the profile in a few sentences. So you can quickly determine whether this profile is of intersted to you.
2. Then it provides the general structure, which entities are involved, and what data in these entities are present.
3. Since this all fairly abstract, it then continues with an example. This example is first provided in text, and then worked out in detail in actual JSON messages.
4. If applicable, links on how to validate JSON messages using the validation tool are present.