---
title: Incident Settings
description: Configure and customize your Incident Management experience
aliases:
- /monitors/incident_management/notification_rules
- /monitors/incident_management/incident_settings
---

## Overview

Use [Incident Settings][1] to customize aspects of the Incident Management experience for your entire organization. These settings enable you to align your usage of Incident Management with your existing processes.

## Incident types

Incident types allow you to apply different settings to different classes of incidents. The response for a security incident can be very different from the response for a service disruption. With incident types, you can customize each response. 

To create an incident type:
1. Navigate to the [Incidents Settings][1] page.
1. Click **Add Incident Type**.
1. Specify an Incident Type Name.
1. (Optional) Add a description.

## Global settings

| Setting     | Description    |
| ---  | ----------- |
| Analytics&nbsp;Dashboard | Customize the dashboard for the Analytics button on the Incidents homepage. By default, this links to the template Incident Management Overview dashboard for [Analytics][1]. |
| Monitor&nbsp;Automations| Create incident @-mentions that can be used in a [monitor's notification message][2] to automatically create incidents when the monitor triggers. |

## Customize incident response

{{< whatsnext desc="Set additional customizations on the following:">}}
    {{< nextlink href="/service_management/incident_management/incident_settings/information" >}}Information{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/incident_settings/integrations" >}}Integrations{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/follow-ups" >}}Follow-ups{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/incident_settings/notification_rules" >}}Notification Rules{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/incident_settings/property_fields" >}}Property Fields{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/incident_settings/responder_types" >}}Responder Types{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/incident_settings/templates" >}}Templates{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents/settings
[2]: /monitors/notify/
