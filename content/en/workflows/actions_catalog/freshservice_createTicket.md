---
bundle: com.datadoghq.freshservice
bundle_title: Freshservice
description: Create new Freshservice Ticket.
icon:
  integration_id: freshservice
  type: integration_logo
input: '#/$defs/CreateTicketInputs'
inputFieldOrder:
- email
- status
- priority
- subject
- description
- urgency
- impact
- responder_id
output: '#/$defs/CreateTicketOutputs'
source: freshservice
stability: stable
title: Create ticket
---

Create new Freshservice Ticket.

{{< workflows >}}
