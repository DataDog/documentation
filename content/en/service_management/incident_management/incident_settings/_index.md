---
title: Incident Settings
description: Configure and customize your Incident Management experience
aliases:
- /monitors/incident_management/notification_rules
- /monitors/incident_management/incident_settings
---

## Overview

Use [Incident Settings][1] to customize aspects of the Incident Management experience for your entire organization. Customizable settings in Datadog Incident Management offer several key benefits, including:
- Better alignment with existing processes which reduces the need for your team to learn entirely new procedures. 
- Personalized notifications and dynamic templates to create messages that are consistently accurate and contain relevant context, enabling quicker understanding and action by the recipients. 
- Tailored analytics and dashboards to provide valuable insights for historical analysis and optimization.

Save time during high-stress incidents and create an incident response strategy that matches your unique needs, leading to faster resolution times and thorough post-incident analysis.

## Incident types

Incident types allow you to apply different settings to different classes of incidents. The response for a security incident can be very different from the response for a service disruption, and with Incident types, you can customize each response. 

To create an incident type:
1. Navigate to the [Incidents Settings][1] page.
1. Click **Add Incident Type**.
1. Specify an Incident Type Name.
1. (Optional) Add a description.

## Global settings

| Setting     | Description    |
| ---  | ----------- |
| Analytics&nbsp;Dashboard | Customize the dashboard for the Analytics button on the Incidents homepage. By default, this links to the template Incident Management Overview dashboard for [Analytics][1]. |

## Customize incident response

{{< whatsnext desc="Set additional customizations on the following:">}}
    {{< nextlink href="/service_management/incident_management/incident_settings/information" >}}Information{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/incident_settings/integrations" >}}Integrations{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/incident_settings/notification_rules" >}}Notification Rules{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/incident_settings/property_fields" >}}Property Fields{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/incident_settings/responder_types" >}}Responder Types{{< /nextlink >}}
    {{< nextlink href="/service_management/incident_management/incident_settings/templates" >}}Templates{{< /nextlink >}}
{{< /whatsnext >}}

[1]: https://app.datadoghq.com/incidents/settings
