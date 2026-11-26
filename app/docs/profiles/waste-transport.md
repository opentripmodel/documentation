---
sidebar_label: DRAFT Waste transport
---
# OTM Profile - Waste transport (f.k.a. EBA)

:::warning
This profile is work in progress.
:::

:::info

The message models of OTM profiles are specified and maintained here: [SUTC specifications](https://sutc.semantic-treehouse.nl/specifications)

An overview of the specifications for the OTM profile for waste transport can be found here: [OTM profile - Waste transport](https://sutc.semantic-treehouse.nl/project/otm-profile-waste-transport)

The profile consists of two message models:
1. [Planned Trip](https://sutc.semantic-treehouse.nl/id/specification/otm-profile-eba-planned-trip)
2. [Weigh event](https://sutc.semantic-treehouse.nl/id/specification/otm-profile-eba-weigh-event)

:::


## Introduction / context

The OTM profile for waste transport supports the exchange of transport and weighing information between a transport organisation and a waste processor.

This profile covers the same functionality as the outdated [Elektronische Begeleidingsbrief Afval (EBA) standard](https://sutc.semantic-treehouse.nl/id/project/elektronische-begeleidingsbrief-afval) version 1.2. That standard is based on UBL/XML, whereas the OTM profile is based on OTM JSON. Mapping specifications are available to support the transition from EBA v1.2 to OTM profile for waste transport (see section below).

## Scope OTM Profile

The profile enables the Transport Management System (TMS) of the transport organisation to provide information about a planned waste transport to the waste processor. The waste processor provides weighing information back to the transport organisation.

The standard flow consists of three main exchanges:

1. **Planned trip:** Before the transport takes place, the sends a planned trip message to the waste processor's system. The message describes the planned transport and includes information about the waste being transported, such as the applicable waste types. Furthermore, status change and updated information about the planned trip can be send to to the waste processor's system.

2. **Weigh event 1:** When the vehicle arrives at the waste processor and passes the weigh station, the waste processor's system sends a weigh event to the TMS. This event contains the measured total weight of the transport combination, including the vehicle and its load.

3. **Weigh event 2:** After the waste has been unloaded, the vehicle passes the weigh station again. The waste processor's system sends another weigh event to the TMS containing the measured weight after unloading.

Weighing results can be of type calibrated, manually or tare.

The difference between the incoming and outgoing weighing results can be used to determine the weight of the waste that has been unloaded.

![](./sequence-diagram-waste-disposal.png)


## OTM Profile Structure

The full message specification can be found in the SUTC [Semantic Treehouse Environment](https://sutc.semantic-treehouse.nl/).

The **Planned Trip (EBA)** message is build around the OTM `Trip` element. This container allows `vehicle`, `actors` and `actions` be communicated. To specify the type of waste that is being disposed off, the `classificationLines` element within the `goods/entity` element can be used. The classification lines allows the TMS to communicate the EURAL code of the waste. 

The **Weigh Event (EBA)** message has the root element of `weighEvent`. In this element, the sub-elements of `vehicle` and `weighingResult` can be communicated. When weighing the allowed `weighingType` are:
* calibrated - Measurement from the calibrated weighing equipment of the waste processor;
* manual - Data entered manually from the chauffeur; or
* tare - Weight from the known specifications of the empty vehicle.

The manual and tare options are only available for the outgoing weigh event message. 

## Example
The shape of these messegas are straightforward.
### Planned Trip (EBA)
```json
{
    "entityType": "trip",
    "id": "b36fa58d-569a-49e3-bcaa-ebacb1120a35",
    "externalAttributes": {},
    "status": "confirmed",
    "vehicle": {
        "associationType": "inline",
        "entity": {
            "id": "f374b805-dd8a-4ecc-a542-9776bc748fd5",
            "licensePlate": "BB-01-BB"
        }
    },
    "actors": [
        {
            "associationType": "inline",
            "entity": {
                "id": "5afca73b-77bd-4947-a056-aafae0c27b23",
                "name": "Example Logistics B.V."
            },
            "roles": [
                "shipper"
            ]
        }
    ],
    "actions": [
        {
            "associationType": "inline",
            "entity": {
                "actionType": "stop",
                "location": {
                    "associationType": "inline",
                    "entity": {
                        "id": "93a71809-fb31-482f-a40d-d1cf856842cf",
                        "geoReference": {
                            "type": "addressGeoReference",
                            "name": "Example Waste Processing Facility",
                            "street": "Industrieweg",
                            "houseNumber": "25",
                            "houseNumberAddition": "",
                            "postalCode": "7418 AA",
                            "city": "Deventer",
                            "country": "NL"
                        },
                        "gln": "8712345678906"
                    }
                },
                "startTime": "2026-11-06T10:00:00+01:00",
                "endTime": "2026-11-06T10:30:00+01:00",
                "actions": [
                    {
                        "associationType": "inline",
                        "entity": {
                            "actionType": "unload",
                            "consignment": {
                                "associationType": "inline",
                                "entity": {
                                    "goods": [
                                        {
                                            "associationType": "inline",
                                            "entity": {
                                                "entityType": "goods",
                                                "type": "items",
                                                "id": "db9f02c3-6944-4781-b1a0-9390623387d6",
                                                "name": "Mixed construction and demolition waste",
                                                "quantity": 1,
                                                "weight": {
                                                    "value": 12450,
                                                    "unit": "kg"
                                                },
                                                "adr": {
                                                    "UNNumber": "UN3077",
                                                    "waste": true,
                                                    "description": "Environmentally hazardous substance, solid, n.o.s."
                                                },
                                                "classificationLines": [
                                                    {
                                                        "euralCode": "170904"
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            },
                            "transportEquipment": {
                                "associationType": "inline",
                                "entity": {
                                    "id": "3d426a7f-603d-4570-925b-89b010447f1b",
                                    "equipmentType": "trailer",
                                    "licensePlate": "OP-12-AB"
                                }
                            }
                        }
                    }
                ]
            }
        }
    ]
}

```

### Weight Event (EBA)
```json
{
    "eventType": "weighEvent",
    "id": "0264c464-e973-4ef8-a272-6a6dff716cbf",
    "creationDate": "2026-11-06T10:12:43+01:00",
    "vehicle": {
        "associationType": "inline",
        "entity": {
            "licensePlate": "BB-01-BB"
        }
    },
    "weighingResult": {
        "weighingType": "calibrated",
        "weight": {
            "value": 28740,
            "unit": "kg"
        },
        "remark": "Incoming weighing before unloading",
        "weighbridgeId": "WB-01",
        "weighbridgeSequenceNr": "2026-004582"
    }
}
```

## Migrating from EBA v1.2 to OTM profile

Organisations that already have an implementation of EBA v1.2 do not have to start from scratch. Mapping specifications are available that describe, element by element, how the EBA v1.2 messages relate to the messages of the OTM profile for waste transport:

| EBA v1.2 message | OTM profile message | Mapping specification |
|---|---|---|
| Vooraanmelding (pre-notification) | Planned Trip | [EBA Vooraanmelding to OTM Trip](https://sutc.semantic-treehouse.nl/id/specification/eba-vooraanmelding-to-otm-trip) |
| Weegbevestiging (weighing confirmation) | Weigh Event | [EBA Weegbevestiging to OTM Event](https://sutc.semantic-treehouse.nl/id/specification/eba-weegbevestiging-to-otm-event) |

These mappings can be used to reuse existing data sources and business logic, and to (temporarily) translate between both formats while trading partners migrate.

### Conceptual differences

Although the functional scope is the same, the OTM profile is based on a different modelling approach than EBA v1.2. Keep the following differences in mind when migrating:

* **Syntax: UBL/XML vs. OTM JSON** - EBA v1.2 messages are XML documents based on UBL. The OTM profile uses JSON messages based on the OTM data model, which can be exchanged via the [OTM API](../developers/api_specification.md).
* **Document-oriented vs. entity-oriented** - An EBA message is a self-contained business document. OTM is built around [entities](../fundamentals/entities.md) (such as trips, actors, locations, vehicles and goods) that each have their own identifier and can be linked to each other using [associations](../fundamentals/associations.md). Entities can be included inline or referenced by `id`.
* **Trip as central concept** - Instead of a pre-notification document, the transport is described as an OTM `Trip` consisting of `actions`. The visit to the waste processor is modelled as a `stop` action with a `location`, a time window, and a nested `unload` action that carries the consignment and goods.
* **Parties as actors with roles** - Parties in EBA are represented as `actors` in OTM, where the function of each party is expressed using `roles` (e.g. `shipper`).
* **Waste classification** - The waste type (EURAL code) is specified on the goods using `classificationLines`, while hazardous substance information is captured in the `adr` element.
* **Status and updates** - Changes to a planned transport are communicated by sending the same trip (same `id`) with updated information and/or an updated [status](../fundamentals/entity_status.md), following the OTM [lifecycle](../fundamentals/lifecycles.md) concepts.
* **Weighing as an event** - A weighing confirmation is modelled as an OTM `weighEvent`: an occurrence at a specific moment in time, linked to the vehicle, with a `weighingResult` that explicitly states the `weighingType` (calibrated, manual or tare).