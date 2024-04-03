---
bundle: com.datadoghq.freshservice
bundle_title: Freshservice
description: Update the Freshservice Ticket.
icon:
  integration_id: freshservice
  type: integration_logo
input: '#/$defs/UpdateTicketInputs'
inputFieldOrder:
- ticketId
- status
- priority
- responder_id
keywords:
- modify
- put
- set
- update
output: '#/$defs/UpdateTicketOutputs'
source: freshservice
stability: stable
title: Update ticket
---

Update the Freshservice Ticket.

{{< workflows >}}
