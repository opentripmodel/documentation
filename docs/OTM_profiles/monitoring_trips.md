Monitoring Trips
================

:::warning
This profile is still a work in progress.
:::

Overview
--------

Trips model visiting multiple _locations_ with a _vehicle_ and doing multiple _actions_ on and in between those locations, such as loading and unloading consignments. A single trip goes through multiple phases,  each which has more information than the previous. It is possible that different parties are only involved in some of the phases, so it is not required to model each phase.

The different phases of a trip are:
1. Creating a (draft) planning of a trip. This planning contains the locations that need to be visited, but might or might not know at which times these locatons will be visited. All actions in this trip are in the lifecycle planned. Other information about the trip might be gradually added, such as the vehicle and the driver that are supposed to drive this trip. Note that this is not mandatory though, if information is present it can be provided right at the start.

2. Once a planning is finalized it can be driven. The vehicle and planned times are all known. At this point we might know more about the state of the world and can anticipate what will happen during the trip, such as being delayed because of a traffic jam. Continous location update and traffic events can provide real-time insight in where the vehicle is, that can serve as a basis to make predictions.

3. Once all is set and done the trip is fininshed. All information is known and cannot change anymore since it is in the past. This information is useful so we can compare our original planning with what actually happened so we can make more accurate planning data in the future. It can also be used for billing, or analyzing the data to find bottlebecks and optimize the process for next trips.


General structure
-----------------

Monitoring trips is a complex operation that includes almost every entity and action within OTM, and was actually the primary reason for creating OTM. Looking at the original image from the [overview](otm_overview) we can see that only the TransportOrder is not present. Everything that can be present in phase 1 is black, the additions for phase 2 are made purple, and the only addition for phase 3 is actual _proof of delivery_ using a HandOver made red. 

![](/img/otm5_monitoring_trips_profile.png)

Since this might not give enough insight, we can also the present the hierarchy with the required rules as follows:

- Trip
  - A trip _must_ have a unique UUID.
  - A trip _can_ contain a vehicle that is requested/planned/realized to drive the corresponding trip. Once the trip is in phase 2 the vehicle should be known.
  - A trip _can_ contain a list of involved actors, such as the carrier driving the trip of the shipper containing the goods to be transported. They are not mandatory, but recommended.
  - A trip _can_ contain constraints about the time windows between which the trip should be completed.
  - A trip _must_ contain a list of actions, including at least two _stops_, and optionally a _move_ between them. Since a trip has to visit at least two places to be considered a trip.
      - Stop
          - A stop _must_ contain a Location
          - A stop _can_ contain actions itself, usually _load_ and _unload_ actions 
          - The _load_ and _unload_ actions only require a reference to the consignments that are loaded/unloaded.
          - A stop _can_ also contain _genericActions_ in for actions that do not have a native OTM variant yet (such as taking a break, applying     maintenance, adding fuel, etc.).
          - A stop _can_ contain any other data that is present in the specification, such as a _sequenceNumber_, _startTime_, _endTime_, _remark_, etc.
          - A stop _can_ contain a time-based constraint.
      - Move (this is optional), can contain the route between two stops to exactly show how to go from one place to another.
      - And then again stop/move/stop, etc.

Example
-------

To see examples of this profile go to the [example page](../examples.md#trips).