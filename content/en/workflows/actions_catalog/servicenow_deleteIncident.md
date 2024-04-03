---
bundle: com.datadoghq.servicenow
bundle_title: ServiceNow
description: Delete an existing ServiceNow incident.
icon:
  integration_id: servicenow
  type: integration_logo
input: '#/$defs/DeleteIncidentInputs'
inputFieldOrder:
- incidentId
keywords:
- delete
- remove
output: '#/$defs/DeleteIncidentOutputs'
permissions:
- admin
- web_service_admin
source: servicenow
title: Delete incident
---

Delete an existing ServiceNow incident.

{{< workflows >}}
