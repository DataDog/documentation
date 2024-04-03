---
bundle: com.datadoghq.servicenow
bundle_title: ServiceNow
description: Create new ServiceNow Incident.
icon:
  integration_id: servicenow
  type: integration_logo
input: '#/$defs/CreateIncidentInputs'
inputFieldOrder:
- shortDescription
- urgency
- impact
- comments
- assignedTo
output: '#/$defs/CreateIncidentOutputs'
permissions:
- admin
- web_service_admin
source: servicenow
title: Create incident
---

Create new ServiceNow Incident.

{{< workflows >}}
