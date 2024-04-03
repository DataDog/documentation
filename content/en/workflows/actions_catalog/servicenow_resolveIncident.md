---
bundle: com.datadoghq.servicenow
bundle_title: ServiceNow
description: Resolve a ServiceNow incident.
icon:
  integration_id: servicenow
  type: integration_logo
input: '#/$defs/ResolveIncidentInputs'
inputFieldOrder:
- incidentId
- closeNotes
output: '#/$defs/ResolveIncidentOutputs'
permissions:
- admin
- web_service_admin
source: servicenow
title: Resolve incident
---

Resolve a ServiceNow incident.

{{< workflows >}}
