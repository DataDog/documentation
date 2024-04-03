---
bundle: com.datadoghq.servicenow
bundle_title: ServiceNow
description: Get a ServiceNow incident.
icon:
  integration_id: servicenow
  type: integration_logo
input: '#/$defs/GetIncidentInputs'
inputFieldOrder:
- incidentId
keywords:
- describe
- get
- lookup
output: '#/$defs/GetIncidentOutputs'
permissions:
- admin
- web_service_admin
source: servicenow
title: Get incident
---

Get a ServiceNow incident.

{{< workflows >}}
