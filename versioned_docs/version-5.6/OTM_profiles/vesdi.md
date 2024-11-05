VESDI
=====

:::warning
This profile is still a work in progress.
:::

Overview
--------

VESDI is the abbreviation for _Vehicle_, _Emission_, _Shipment_, _Data_, _Interface_. The purpose of this profile is to model relevant and the most common used data elements related to (logistic) vehicles, the goods that are transported (shipment/consignment), and fuel consumption. The VESDI profile is designed to be used between IT systems used in the logistic industry and institutions for statistics like the CBS in the Netherlands and tooling and platform used for CarbonFootPrint calculations like BigMile.

General structure
-----------------

The basis for the VESDI interface is the OTM realized trip. See also [The official trip API documentation](https://otm5.opentripmodel.org/#tag/Trip/paths/~1api~1v5~1trips/put) and the realized trip profile in monitoring Added are specific element related to the vehicle (e.g. type, emission class) and fuel consumption (e.g usage, mileage). Note though that the emission and the measured distance are not part of OTM5.0 yet, but are planned for OTM5.1.              

The VESDI can be used in B2B communication as well.

Example
--------