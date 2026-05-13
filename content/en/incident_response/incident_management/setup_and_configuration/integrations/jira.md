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

Jira is a work item and project tracking system for software teams. The Datadog Jira integration allows you to create work items from incidents in Datadog and view work items created in Jira as Datadog events.

The Jira integration with Datadog Incident Management provides you with the following benefits:
- **Improved Visibility**: Ensure that all stakeholders are immediately informed about incidents, facilitating a quicker response.
- **Supporting Existing Workflows**: Seamlessly integrate with your current processes, making it easier to plan work and manage priorities with Jira.
- **Flexible Mapping and Configuration**: With dynamic templates, you can map Datadog severities to Jira priorities, map incident statuses to Jira statuses, add custom labels, and define dynamic assignees.
- **Bidirectional Sync**: Changes made in Jira are automatically synced back to the corresponding Datadog incident, keeping both platforms up to date.

## Prerequisites

To use automatic work item creation, install the integration through the [Jira Integration tile][1]. For more information, see the [Jira integration][2] documentation.

## Setup

1. On the [Integration Settings page][3], find the Jira integration.
2. Click **Automatically create a parent work item for incidents** toggle to allow automatic Jira creation.
3. Select your Jira account, project, and work item type.
4. Add a condition to define when to automatically create a Jira work item. If this condition is left blank, a Jira work item is created for all new incidents.
5. For each Jira work item field, define whether the field should sync one-way or bidirectionally.
6. For one-way sync (Datadog Incident -> Jira Work Item), use the **Custom Value** field option to define a template with dynamic variables to populate Jira work item fields. Type `{{` to insert incident template variables into fields like **Summary**, **Reporter**, and **Description**. Dynamic variables work with **string**, **number**, **date/datetime** [Jira field types][5].
7. For bidirectional sync, **string**, **number**, **date/datetime** [Jira field types][5] fields are supported.
8. Configure status and severity mappings to bidirectionally sync incident states and severities with Jira statuses and priorities.
9. Click **Manually create new work items or link existing ones** toggle to allow manual Jira creation
10. Click **Link manually created work items to the parent work item in Jira** to link manually created Jira work items to the bidirectionally syncing Jira work item (if it exists).

As incidents are created, a work item is also created in the corresponding Jira instance. This Jira work item links to the incident in Datadog for reference.

The Jira work item is bidirectionally synced with the incident based on the template and mappings defined in the [Integration Settings page][3].

Manually created Jira work items are not synced with the incident.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/jira
[2]: /integrations/jira/
[3]: https://app.datadoghq.com/incidents/settings?integration=jira&section=integrations
[4]: https://app.datadoghq.com/incidents
[5]: https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type
