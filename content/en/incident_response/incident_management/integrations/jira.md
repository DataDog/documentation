---
title: Integrate Jira with Datadog Incident Management
aliases:
- /service_management/incident_management/guides/jira
- /service_management/incident_management/integrations/jira/
further_reading:
- link: "integrations/jira/"
  tag: "Documentation"
  text: "Install the Jira Integration"
- link: "https://app.datadoghq.com/integrations/jira"
  tag: "App"
  text: "In-app Jira integration tile"
- link: "/incident_response/incident_management/follow-ups"
  tag: "Documentation"
  text: "Export follow-ups to Jira"

---

## Overview

Jira is an issue and project tracking system for software teams. The Datadog Jira integration allows you to create issues from incidents in Datadog and view issues created in Jira as Datadog events.

The Jira integration with Datadog Incident Management provides you with the following benefits:
- **Improved Visibility**: Ensure that all stakeholders are immediately informed about incidents, facilitating a quicker response.
- **Supporting Existing Workflows**: Seamlessly integrate with your current processes, making it easier to plan work and manage priorities with Jira.
- **Customization at Your Fingertips**: With dynamic templates, you can map Datadog severities to Jira priorities, map incident statuses to Jira statuses, add custom labels, define dynamic assignees, and more.

## Prerequisites

To use automatic ticket creation, install the integration through the [Jira Integration tile][1]. For more information, see the [Jira integration][2] documentation.

## Setup

1. On the [Integration Settings page][3], find the Jira integration.
2. Click the toggle for **Enable Jira issue creation** to allow manual or automatic Jira creation.
3. Select your Jira account, project, and issue type.
4. Add a condition to define when to automatically create a Jira issue. If this condition is left blank, a Jira issue is created for all new incidents.
5. Define a template with dynamic variables to drive the content of the Jira ticket. Type `{{` to use incident template variables for fields like Summary, Reporter, and Description. Dynamic variables only work for **string** [Jira field types][5].

{{< img src="service_management/incidents/guide/jira/incident_jira_settings.png" alt="Jira integration settings showing account configuration, conditional creation rules, and Jira properties with template variables" style="width:80%;" >}}

6. Configure status and severity mappings to sync incident states and severities to Jira statuses and priorities.

{{< img src="service_management/incidents/guide/jira/incident_jira_mappings.png" alt="Jira status and severity mappings showing incident states mapped to Jira statuses and severity levels mapped to Jira priorities" style="width:80%;" >}}

As incidents are created, an issue is also created in the corresponding Jira instance. This Jira issue links to the incident in Datadog for reference.
The Jira issue is synced with the incident based on the template and mappings defined in the [Integration Settings page][3].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/jira
[2]: /integrations/jira/
[3]: https://app.datadoghq.com/incidents/settings?integration=jira&section=integrations
[4]: https://app.datadoghq.com/incidents
[5]: https://developer.atlassian.com/platform/forge/manifest-reference/modules/jira-custom-field-type
