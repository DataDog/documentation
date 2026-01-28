---
title: Integrate Google Chat with Datadog Incident Management
description: Manage Datadog incidents directly from Google Chat.
aliases:
- /service_management/incident_management/integrations/google_chat/
further_reading:
  - link: "/incident_response/incident_management/incident_settings/integrations"
    tag: "Documentation"
    text: "Incident Integrations Settings"
  - link: "/integrations/google-hangouts-chat"
    tag: "Documentation"
    text: "Google Chat Integration"
---

## Overview

The Google Chat integration for Datadog Incident Management connects your incident response workflows directly to Google Chat. When your team declares a Datadog incident, the integration automatically creates a Google Chat space for collaboration.

## Prerequisites

Install the integration through the [Google Chat Integration tile][1]. A Google Workspace administrator must configure delegated user permissions, set up a target audience, and add the target audience to the integration tile. For more information, see the [Google Chat integration][2] documentation.

## Declaring incidents from Google Chat

After you connect a Google Chat workspace to a Datadog organization, users can manage incidents using Google Chat slash commands.

Only Google Chat users who are connected to a Datadog organization can declare incidents. After an administrator sets up the Google Chat integration, users connect their Google Chat account to Datadog by running `/dd_account`.

To declare an incident, run the following in any Google Chat space:
```
/dd_incident
```
## Incident Spaces

You can configure Incident Management to automatically create a dedicated Google space for each incident that meets the criteria you define. Your responders can then manage the incident directly in Google Chat from the incident space.

To use incident spaces:

1. In Datadog, go to **[Incident Response > Incident Management > Settings > Integrations > Google Chat][3]** and enable **Automatically create Google Chat spaces for incidents**.

2. Select an **Organization** from the dropdown. If you don't see any options, reach out to your Google Workspace administrator to connect your Google organization to Datadog.
3. Select a **Target Audience** from the dropdown. **Default** is the default target audience set by your Google Workspace administrator, which could be a private or public target audience group. Reach out to your Google Workspace administrator if this is unclear.

4. The **Channel Name Template** you define determines how Datadog names the incident spaces it creates. The following variables are available in channel name templates:
   * `{{public_id}}`: Incident's numeric ID
   * `{{title}}`: Incident's title
   * `{{created}}`: Incident's creation date in format `MM_DD_YYYY`
   * `{{yyyy}}`: Incident's four-digit creation year
   * `{{mm}}`: Incident's two-digit creation month
   * `{{dd}}`: Incident's two-digit creation day of month
   * `{{severity}}`: Incident's severity
   * `{{random_adjective}}`: Random adjective
   * `{{random_noun}}`: Random noun
   * `{{slug}}`: Slug (when slug source is set to `servicenow`, this will display the ServiceNow record number)

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/google-hangouts-chat
[2]: /integrations/google-hangouts-chat/
[3]: https://app.datadoghq.com/incidents/settings?section=integrations
