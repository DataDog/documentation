---
title: Integrate Datadog Status Pages with Datadog Incident Management
description: Learn how to integrate Datadog Status Pages with Incident Management to communicate real-time service status during incidents.
aliases:
- /service_management/incident_management/integrations/status_pages/
further_reading:
- link: https://www.datadoghq.com/blog/status-pages
  tag: Blog
  text: Keep stakeholders informed with Datadog Status Pages
- link: "/incident_response/status_pages/"
  tag: "Documentation"
  text: "Learn more about Datadog Status Pages"
---

## Overview

Status Pages is a way to keep internal and external stakeholders informed during service disruptions by publishing real-time updates about system health.

This integration enables responders to publish and update status page notices directly from Incident Management.
- Eliminate context switching by managing public communications without leaving your incident workflow
- Publish notices quickly and consistently during high-severity incidents
- Keep incident timelines and public-facing updates in sync to reduce confusion and messaging mistakes

## Prerequisites

At least one status page is required to enable the Status Pages integration for Incident Management.

You must have a role with the Incident Settings Write permission to enable the Status Pages integration for Incident Management.

## Setup

1. In the [Integration Settings page][1], find the Status Pages integration.
1. Toggle **Enable Status Pages notice creation**.

## Publish a Status Pages notice

You must have a role with Incidents Write and Status Pages Notice Write permissions to add a Status Pages notice from an incident.

{{< img src="/incident_response/incident_management/setup_and_configuration/integrations/status_pages/status_pages_config_modal.png" alt="Configuration modal for integrating a Datadog incident with a status page notice" style="width:70%;" >}}

1. In the [Incidents List page][2], open an existing incident.
1. At the top of the incident page, click **Update Status Page**.
1. Enter all the required fields, including _Select a Status Page_, _Notice title_, and _Notice status_. You can also specify which status page components are affected.

## Update a Status Pages notice

After a notice is added to an incident, you can continue updating the status page until the incident is resolved.

{{< img src="/incident_response/incident_management/setup_and_configuration/integrations/status_pages/incident_status_pages.png" alt="Screenshot showing the integration of a Datadog incident with a Status Page notice, including fields for selecting a status page, notice title, and status" style="width:100%;" >}}

1. In the [Incidents List page][2], open the incident you want to update.
1. At the top of the incident page, find the status page you added, and hover over the button to open the integration modal. You can update the current status page notice or unlink the notice.
1. Click **Update** to update the status page notice.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings?section=integrations
[2]: https://app.datadoghq.com/incidents
[3]: /account_management/rbac/permissions
