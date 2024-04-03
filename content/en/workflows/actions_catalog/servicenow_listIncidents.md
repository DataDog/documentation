---
bundle: com.datadoghq.servicenow
bundle_title: ServiceNow
description: Retrieve list of existing ServiceNow incidents.
icon:
  integration_id: servicenow
  type: integration_logo
input: '#/$defs/ListIncidentsInputs'
inputFieldOrder:
- fieldsToReturn
- queryFilter
- limit
keywords:
- all
- list
output: '#/$defs/ListIncidentsOutputs'
permissions:
- admin
- web_service_admin
source: servicenow
title: List incidents
---

Retrieve list of existing ServiceNow incidents.

{{< workflows >}}
