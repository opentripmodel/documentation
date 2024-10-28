Exchanging Transport Orders
===========================

:::warning
This profile is still a work in progress.
:::

Overview
--------

The very first step of transporting goods from one place to another starts with the _transport order_. It is concerned with what needs to be transported under what constraints (i.e. before a certain date, or below a certain temperature). It is generally the initial communication between a _carrier_ and a _shipper_. Afterwards, the transport order is served as input in creating actual planning data as part of the [Monitoring Trips](monitoring-trips) profile.

General structure
-----------------

At the bottom of the hierarchy we have goods, physical units with dimensions, weights, etc. that need to be transported. Goods are part of a consignment, which is an administrative unit that groups the goods together. Note that groups within one consignment cannot be split, they are always part of the same transported unit. If goods need or can be split they should be part of different consignments.

On the top of the chain, we have the transport order, that is able to group multiple consignments. For example, because they are part of one assignment given by some shipper.

This can be visualized as follows, where the grayed out entities, associations, events and actions are not relevant for this profile:

![](/img/otm5_transport_order_profile.png)

The rules for the transport order profile are:
- a transport order _must_ at least have one consignment.
- A consignment _must_ have at least one goods item to be transported.
- A consignment _must_ at least have one load action and one unload action. It _can_ have multiple if multiple trips are involved.
- Every load and unload actions _must_ have a location.
- All other fields are optional. For example, each consignment _can_ have a constraint determining between what time windows the goods need to be delivered.

Example
-------

Lets imagine we want to create a `transportOrder` for some evidence that needs to be transported from the police station
headquarters to the investigation lab. The template starts out with a `transportOrder` that has some external ID, a description,
and _empty_ actors and consignments:

```json
{
  "id": "58885aa4-fda3-488b-8930-f5867edac095",
  "externalAttributes": {
    "transportOrderId": "12345"
  },
  "description": "Example transport order",
  "actors": [ ],
  "consignments": [ ]
}
```

From here on out we start by adding the relevant parties. For this particular `transportOrder` there are three parties involved:
1. The shipper that is responsible for the goods that need to be carried from location A to location B.
2. The carrier responsible for the actual transportation of the goods.
3. The receiver, that ultimately the receives the location at some point.

So we add these actors to the JSON. Note that the shipper and receiver have a location (since those need to be
visited). And that both locations have various levels of detail:

```json
[
  {
    "entity": {
      "id": "36bbd811-1342-4890-8dd0-1684bba0afa2",
      "name": "Police station Amsterdam",
      "contactDetails": [
        {
          "value": "0900 8844",
          "type": "phone"
        }
      ],
      "locations": [
        {
          "entity": {
            "id": "65a45b12-4096-4b76-a474-27ab635d3ed2",
            "geoReference": {
              "name": "Police head quarters",
              "street": "Elandsgracht",
              "houseNumber": "117",
              "city": "Amsterdam",
              "type": "addressGeoReference"
            }
          },
          "associationType": "inline"
        }
      ]
    },
    "roles": [ "shipper" ],
    "associationType": "inline"
  },
  {
    "entity": {
      "id": "502d5eff-dc3a-45c6-a247-e664b9b70c96",
      "name": "Investigation bureau",
      "contactDetails": [
        {
          "value": "investigation@bureau.com",
          "type": "email"
        }
      ],
      "locations": [
        {
          "entity": {
            "id": "65a45b12-4096-4b76-a474-27ab635d3ed2",
            "geoReference": {
              "lat": 52.0930345,
              "lon": 5.1174618,
              "type": "latLonPointGeoReference"
            },
            "administrativeReference": {
              "name": "Investigation bureau",
              "street": "De Neude",
              "city": "Utrecht"
            }
          },
          "associationType": "inline"
        }
      ]
    },
    "roles": [ "receiver" ],
    "associationType": "inline"
  },
  {
    "entity": {
      "id": "502d5eff-dc3a-45c6-a247-e664b9b70c96",
      "name": "Logistics B.V.",
      "contactDetails": [
        {
          "value": "Carrier company Logistics B.V.",
          "type": "name"
        }
      ]
    },
    "roles": [ "carrier" ],
    "associationType": "inline"
  }
]
```

Now that we have all the involved parties we can focus on the goods that need to be transported. For that we
create a consignment (the evidence), that contains two pieces of items (of the same type). These goods also have
the added constraint that they need to be kept at 'room temperature' (between 15 and 25 degrees) at all times:

```json
{
  "entity": {
    "id": "6819cb23-7941-4004-9b1b-f2a5c0302839",
    "status": "accepted",
    "goods": [
      {
        "entity": {
          "id": "8090bc95-9217-4d92-82d7-ed0a46a024fb",
          "name": "Evidence",
          "externalAttributes": {
            "evidenceId": "306036-10000"
          },
          "description": "two pieces of evidence, 100kg each that need to be stored at room temperature",
          "quantity": 2,
          "weight": {
            "value": 100,
            "unit": "kg"
          },
          "packagingMaterial": "EURO",
          "constraint": {
            "entity": {
              "id": "af061b25-be4b-4716-aec8-92189949f9a0",
              "value": {
                "sensorValueConstraintType": "range",
                "maximum": {
                  "value": 25,
                  "unit": "C"
                },
                "minimum": {
                  "value": 15,
                  "unit": "C"
                },
                "type": "sensorValueConstraint"
              }
            },
            "associationType": "inline"
          },
          "type": "items"
        },
        "associationType": "inline"
      }
    ],
  }
}
```

Now that the consignment has been created we can couple all things together and add the load and
unload actions from the shipping party to the receiving party. Since we already declared the locations
inline we can now reference them:

```json
[
  {
    "entity": {
      "id": "2c0aaccf-d39b-4ed4-97f1-5acf24ae0d0b",
      "location": {
        "uuid": "65a45b12-4096-4b76-a474-27ab635d3ed2",
        "entityType": "location",
        "associationType": "reference"
      },
      "startTime": "2021-08-11T10:00:00Z",
      "endTime": "2021-08-11T13:00:00Z",
      "actionType": "load"
    },
    "associationType": "inline"
  },
  {
    "entity": {
      "id": "99257220-dd3c-4d3f-9078-34b42ee157ad",
      "location": {
        "uuid": "65a45b12-4096-4b76-a474-27ab635d3ed2",
        "entityType": "location",
        "associationType": "reference"
      },
      "startTime": "2021-08-11T16:00:00Z",
      "endTime": "2021-08-11T19:00:00Z",
      "actionType": "unload"
    },
    "associationType": "inline"
  }
]
```

And that's it! So the whole example becomes:

```json
{
  "id": "58885aa4-fda3-488b-8930-f5867edac095",
  "externalAttributes": {
    "transportOrderId": "12345"
  },
  "description": "Example transport order",
  "consignments": [
    {
      "entity": {
        "id": "6819cb23-7941-4004-9b1b-f2a5c0302839",
        "status": "accepted",
        "goods": [
          {
            "entity": {
              "id": "8090bc95-9217-4d92-82d7-ed0a46a024fb",
              "name": "Evidence",
              "externalAttributes": {
                "evidenceId": "306036-10000"
              },
              "description": "two pieces of evidence, 100kg each that need to be stored at room temperature",
              "quantity": 2,
              "weight": {
                "value": 100,
                "unit": "kg"
              },
              "packagingMaterial": "EURO",
              "constraint": {
                "entity": {
                  "id": "af061b25-be4b-4716-aec8-92189949f9a0",
                  "value": {
                    "sensorValueConstraintType": "range",
                    "maximum": {
                      "value": 25,
                      "unit": "C"
                    },
                    "minimum": {
                      "value": 15,
                      "unit": "C"
                    },
                    "type": "sensorValueConstraint"
                  }
                },
                "associationType": "inline"
              },
              "type": "items"
            },
            "associationType": "inline"
          }
        ],
        "actions": [
          {
            "entity": {
              "id": "2c0aaccf-d39b-4ed4-97f1-5acf24ae0d0b",
              "location": {
                "uuid": "65a45b12-4096-4b76-a474-27ab635d3ed2",
                "entityType": "location",
                "associationType": "reference"
              },
              "startTime": "2021-08-11T10:00:00Z",
              "endTime": "2021-08-11T13:00:00Z",
              "actionType": "load"
            },
            "associationType": "inline"
          },
          {
            "entity": {
              "id": "99257220-dd3c-4d3f-9078-34b42ee157ad",
              "location": {
                "uuid": "65a45b12-4096-4b76-a474-27ab635d3ed2",
                "entityType": "location",
                "associationType": "reference"
              },
              "startTime": "2021-08-11T16:00:00Z",
              "endTime": "2021-08-11T19:00:00Z",
              "actionType": "unload"
            },
            "associationType": "inline"
          }
        ]
      },
      "associationType": "inline"
    }
  ],
  "actors": [
    {
      "entity": {
        "id": "36bbd811-1342-4890-8dd0-1684bba0afa2",
        "name": "Police station Amsterdam",
        "contactDetails": [
          {
            "value": "0900 8844",
            "type": "phone"
          }
        ],
        "locations": [
          {
            "entity": {
              "id": "65a45b12-4096-4b76-a474-27ab635d3ed2",
              "geoReference": {
                "name": "Police head quarters",
                "street": "Elandsgracht",
                "houseNumber": "117",
                "city": "Amsterdam",
                "type": "addressGeoReference"
              }
            },
            "associationType": "inline"
          }
        ]
      },
      "roles": [ "shipper" ],
      "associationType": "inline"
    },
    {
      "entity": {
        "id": "502d5eff-dc3a-45c6-a247-e664b9b70c96",
        "name": "Investigation bureau",
        "contactDetails": [
          {
            "value": "investigation@bureau.com",
            "type": "email"
          }
        ],
        "locations": [
          {
            "entity": {
              "id": "65a45b12-4096-4b76-a474-27ab635d3ed2",
              "geoReference": {
                "lat": 52.0930345,
                "lon": 5.1174618,
                "type": "latLonPointGeoReference"
              },
              "administrativeReference": {
                "name": "Investigation bureau",
                "street": "De Neude",
                "city": "Utrecht"
              }
            },
            "associationType": "inline"
          }
        ]
      },
      "roles": [ "receiver" ],
      "associationType": "inline"
    },
    {
      "entity": {
        "id": "502d5eff-dc3a-45c6-a247-e664b9b70c96",
        "name": "Logistics B.V.",
        "contactDetails": [
          {
            "value": "Carrier company Logistics B.V.",
            "type": "name"
          }
        ]
      },
      "roles": [ "carrier" ],
      "associationType": "inline"
    }
  ]
}
```

Validation Tool
---------------

You can check the above rules for each involved entity using the following calls.

**Consignments**

To check whether your messages abide to the profile you can send a consignment to:

`PUT https://otm5-documentation-api.services.simacan.com/api/v5/validate/consignments`

For example, if you you send invalid JSON (there is a missing curly bracket after the UUID of goods).

```
{
  "id":"89d45cf1-f3cd-4f60-98fd-50a4208c6b54",
  "goods":[
    {
      "associationType":"reference",
      "entityType":"goods",
      "uuid":"89d45cf1-f3cd-4f60-98fd-50a4208c6b54"
    
  ]
}
```

You will get the error message as a `400 Bad Request`:

```
[
    "Encountered an error while parsing JSON: expected } or , got ] (line 10, column 245) at index 244"
]
```

If you send valid JSON, but an invalid OTM you will be notified as well:

```
{
    "id":"test",
    "random": "message"
}
```

returning

```
[
    "An entity id must end with a UUID"
]
```

Lastly, its possible that you send valid Consignments, but not those that are expected in this profile:

```
{
  "id":"89d45cf1-f3cd-4f60-98fd-50a4208c6b54",
  "actions":[
    {
      "associationType":"inline",
      "entity":{
        "id":"89d45cf1-f3cd-4f60-98fd-50a4208c6b54",
        "actionType":"unload"
      }
    }
  ]
}
```

This will return the list of error messages:

```
{
    "errors": [
        {
            "field": "goods",
            "message": "consignments are expected to contain at least one goods item",
            "type": "missingField"
        },
        {
            "field": "actions",
            "message": "List actions has size 1 but required at least 2",
            "type": "invalidField"
        }
    ]
}
```

Here is an example of a valid consignment. You can also see the use of inline and reference associations.

```
{
  "id":"89d45cf1-f3cd-4f60-98fd-50a4208c6b54",
  "goods":[
    {
      "uuid":"89d45cf1-f3cd-4f60-98fd-50a4208c6b54",
      "entityType":"goods",
      "associationType":"reference"
    }
  ],
  "actions":[
    {
      "entity":{
        "id":"89d45cf1-f3cd-4f60-98fd-50a4208c6b54",
        "location":{
          "uuid":"47bd36fa-9f15-4f5d-ab07-6eff4f11b846",
          "entityType":"location",
          "associationType":"reference"
        },
        "actionType":"load"
      },
      "associationType":"inline"
    },
    {
      "entity":{
        "id":"049ffbc8-b561-4b50-b82f-49854c4148da",
        "location":{
          "entity":{
            "id":"1662d54f-2031-4a55-b790-2b7715701640",
            "geoReference":{
              "lat":52.092995,
              "lon":5.1237933,
              "type":"latLonPointGeoReference"
            }
          },
          "associationType":"inline"
        },
        "startTime":"2021-01-17T10:00:00Z",
        "endTime":"2021-01-17T10:15:00Z",
        "actionType":"unload"
      },
      "associationType":"inline"
    }
  ]
}
```

**TransportOrders**

To check whether your messages abide to the profile you can send a transport order to:

`PUT https://otm5-documentation-api.services.simacan.com/api/v5/validate/transportOrders`

The error message systems works the same as for the consignments. There is only on rule for transport orders, which is that there needs to be at least one consignment.

**Goods**

Goods have many optional fields, and there none that are required for the transport order profile. So, as long as you send a valid Goods according to the specification below it will be accepted.

`PUT https://otm5-documentation-api.services.simacan.com/api/v5/validate/goods`