---
title: Integrate Jira with Datadog Incident Management
aliases:
- /service_management/incident_management/guides/jira
- /service_management/incident_management/integrations/jira/
- /incident_response/incident_management/integrations/jira/
further_reading:
- link: "integrations/jira/"
  tag: "Documentation"
  text: "Install the Jira Integration"
- link: "https://app.datadoghq.com/integrations/jira"
  tag: "App"
  text: "In-app Jira integration tile"
- link: "/incident_response/incident_management/post_incident/follow-ups"
  tag: "Documentation"
  text: "Export follow-ups to Jira"
---

## Overview

Jira is a work item and project tracking system for software teams. The Datadog Jira integration allows you to create Jira work items from Datadog incidents and sync data between the two platforms.

The Jira integration with Datadog Incident Management provides the following benefits:
- **Improved Visibility**: Ensure that all stakeholders are immediately informed about incidents, facilitating a quicker response.
- **Supporting Existing Workflows**: Integrate with your current processes, making it easier to plan work and manage priorities in Jira.
- **Flexible Mapping and Configuration**: With dynamic templates, you can map Datadog severities to Jira priorities, map incident statuses to Jira statuses, add custom labels, and define dynamic assignees.
- **Bidirectional Sync**: Teams can collaborate across Datadog and Jira simultaneously. When fields are configured for two-way sync, changes made in either platform are automatically reflected in the other.

## Prerequisites

To use automatic work item creation, install the integration through the [Jira Integration tile][1]. For more information, see the [Jira integration][2] documentation.

To enable bidirectional sync, you must also configure a Jira webhook. See [Configure a Jira webhook][3] for instructions.

## Setup

### Configuring Jira work item creation

1. On the [Integration Settings page][4], find the Jira integration.
2. Enable the **Automatically create a parent work item** toggle.
3. Select your Jira account, project, and work item type.
4. Optionally, add a condition to define when to automatically create a Jira work item. If left blank, a Jira work item is created for all new incidents.

### Configuring bidirectional sync

To sync fields between an incident and its linked Jira work item, enable the **Sync Data Between Incident Management and Jira** toggle. When enabled, a field configuration table appears.

<div class="alert alert-danger">To enable bidirectional sync, you must configure a Jira webhook. See <a href="/integrations/jira/#configure-a-jira-webhook">Configure a Jira webhook</a> for instructions.</a></div>

{{< img src="/incident_response/incident_management/setup_and_configuration/integrations/sync_between_incident_jira.png" alt="Field configuration table for syncing between Datadog Incident Management and Jira" style="width:80%;" >}}

For each field you want to sync, configure the following:
- **Jira field**: The Jira field to populate. You can use any standard or custom Jira field.
- **Incident field or custom value**: Select a pre-populated incident field (such as **Incident Title** or **Incident Commander**), or enter a custom value using `{{` to insert incident template variables. Dynamic variables work only with **string** [Jira field types][5].
- **Sync direction**: Choose **One-way sync** (Datadog to Jira only) or **Two-way sync** (bidirectional) for each field independently. Bidirectional sync supports **string**, **number**, and **date/datetime** [Jira field types][5].

To add fields beyond the defaults, click **Add custom field** and select a Jira field from the dropdown.

{{< collapse-content title="Sync comments" level="h4" >}}
To sync comments between the Datadog incident timeline and Jira, add <strong>Comments</strong> as a custom field. When set to <strong>Two-way sync</strong>, Jira comments appear as incident timeline entries, and incident timeline entries appear as Jira comments.
{{< /collapse-content >}}

{{< collapse-content title="Status and severity mappings" level="h4" >}}
Configure status and severity mappings to translate incident states and severities to Jira statuses and priorities. Each mapping can be set to <strong>One-way sync</strong> or <strong>Two-way sync</strong> independently.
{{< /collapse-content >}}

### Manually link additional work items

In addition to the automatically created parent work item, you can manually link additional Jira work items to an incident. These manually linked items appear alongside the auto-created work item in the incident view.

Manually created Jira work items are not synced with the incident.

### Save your settings

When you save changes to the configuration of an incident type that already has active incidents, the changes apply only to future incidents. Existing incidents are not updated retroactively.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/jira
[2]: /integrations/jira/
[3]: /integrations/jira/#configure-a-jira-webhook
[4]: https://app.datadoghq.com/incidents/settings?integration=jira&section=integrations
[5]: https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type
