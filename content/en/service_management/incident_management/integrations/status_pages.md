---
title: Datadog Status Pages
further_reading:
- link: "/service_management/status_pages/
  tag: "Documentation"
  text: "Learn more about Datadog Status Pages"
---

## Overview

Status Pages conveys real-time status of an organization's services on a webpage. Enable the integration to automatically link and update your status page notice within Datadog's Incident Management platform. As an Incident Commander or Responder, you can:
- Send customer facing messages with accurate and up to date information
- Update Status Page while investigating an incident without leaving the Datadog platform
- Resolve both Datadog incidents and the linked Status Page notice at the same time

## Prerequisites

At least one Status Page is required to enable the Status Pages integration for Incident Management

## Setup

1. In the [Integration Settings page][1], find the Status Pages integration.
1. Toggle **Enable Status Pages notice creation**.

## Add a Status Pages notice

You must have a role with Incidents Write and Status Pages Notice Write permissions to add a Status Pages notice.

1. In the [Incidents page][2], open an existing incident.
1. At the top of the incident page, click **Update Status Page**.
1. Enter all the required fields, which include Select a Status Page, Notice title, and Notice status. You can also specify which Status Page components are affected.


## Update status

After a Status Page is added to an incident, you can continue updating the Status Page until the incident is resolved.

1. In the [Incidents page][2], open the incident you want to update.
1. Find the Status Page you added and hover on the button to open the integration modal. You can unlink the Status Page integration or update the current Status Page notice.
1. Click **Update Status Page** to open the linked Status Page details and make your modifications.
1. Click **Update** to update the Status Page notice.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings?section=integrations
[2]: https://app.datadoghq.com/incidents
