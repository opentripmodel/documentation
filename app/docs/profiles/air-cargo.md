---
sidebar_label: DRAFT Air Cargo
---

# OTM Profile - Air Cargo
:::warning
This profile is still a work in progress.
:::

:::info
The message models of OTM profiles are specified and maintained here: https://sutc.semantic-treehouse.nl/specifications
:::


## Introduction / context
Air Cargo Shipments are dropped off (Export) and Picked up (Import) at Ground Handler locations (Import). The Air Cargo community has working agreements (Protocol-afspraken) for Export and Import that describe requirements for the Drop-off and Pick-up processes.

These Drop-off and Pick-up processes are supported by applications delivered to the Cargo Community by Cargonaut. These applications are used by all the logistics parties involved in the Export and Import flows. The exchange of data that is inherent with the use of the Applications (APIs), will be standardized using the OTM Air Cargo Profile.

The OTM Air Cargo Profile brings standardization that will make it easier for software companies to deliver additional (integration) services to the logistics partners in the Export and Import flows. It also makes it easier to share data with logistics partners further down / up the logistics chains.

This OTM profile will contribute to the standardization and effectiveness of data exchange between logistics partners and the forementioned Applications. By using the OTM as a standard for these flows, the Air Cargo Profile also supports the goals of the Basis Data Infrastructuur (BDI), in supporting a common Onthologie. The wider use of the OTM standard will contribute to more efficient and effective logistics operations in the EU.

## Scope OTM Profile
The OTM Air Cargo Profile is used for APIs that are used in the scope of movements from and to the Ground Handlers for Pick-up and Drop-off of shipments. The applications that support these processes are Secure Import and eLink. The APIs are designed to support both applications equally. Currently, only Secure Import uses these APIs. Once eLink is Rebuild on the new Port Community System (PCS) platform, it will make use of the same components as Secure Import and the OTM Air Cargo Profile can be used as well.

There are multiple OTM APIs on the new PCS, that can be categorized in:
* AWB GET API: Ground Handler -> Cargonaut
* Pre-Announcement POST API: Cargonaut -> Ground Handler
* Visit and Trip GET/POST APIs:	Forwarder / Road Transport Company -> Cargonaut

The Ground Handlers use the APIs in their IT domain for a common Use case for Ground Handlers is to receive and collect data from Cargonaut and present this data in the KIOSK. The KIOSK is a physical standing monitor of the Ground Handler, that is used to further automate the process of the Front Desk of the Ground Handlers.

Forwarders and Road Transport Companies use the APIs in their IT domain for the integration of their IT systems with the PCS. Specially creating Visits and Trips or retrieving the status of Visits and Trips is a desire to minimize the work to manually copy-paste data between applications and to minimize the amount of applications used by the End Users.

## OTM Profile Strucutre

The OTM Air Cargo Profile is built around the standard OTM `trip` object. The profile uses the trip as its root element, detailing the journey through sub elements like (stop) `actions` and `actors` (parties involved).

Overview of terminology mapping between Cargonaut and OTM
| Cargonaut concept | OTM entity |
| ----------------- | ---------- |
| Trip				| Trip       |
| Involved parties	| Actors identifiers |
| Visit				| Stop actions with (sub) location |
| AWB on a visit	| Consignment |
| Pick-up or drop-off | Load or unload action |

External attributes are used for data elements regarding e.g. the status of the consignment. This is because in the Air Cargo process the ENUM values used for the RTI (sub) statuses (i.e. RTI, AES, PGTS, AvSec, Inspection) for this data element are very specific. By using an external attribute, these ENUMs are applicable only for the OTM Air Cargo Profile.


## Relation to other standards
* The [IATA ONE Record](https://www.iata.org/en/programs/cargo/e/one-record/) standard is widely used in the Air Cargo domain for Messages and APIs.
