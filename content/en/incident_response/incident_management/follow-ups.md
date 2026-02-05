---
title: Incident Follow-ups
description: Manage follow-up tasks defined during your incident response process.
aliases:
- /service_management/incident_management/follow-ups/
further_reading:
- link: "/service_management/incident_management/incident_settings"
  tag: "Documentation"
  text: "Incident Settings"
- link: "/service_management/incident_management/integrations/slack/"
  tag: "Documentation"
  text: "Integrate Slack with Datadog Incident Management"
---

## Overview

Incident follow-ups are tasks performed after an incident is resolved. During an incident investigation, your team might identify issues that need attention but aren't directly related to resolving the immediate problem. Rather than losing track of these items in the rush to restore service, you can capture them as follow-ups to address after the incident is resolved.

Common examples for creating follow-ups include:

- **Infrastructure improvements**: Misconfigured logs, missing alerts, or inadequate monitoring coverage discovered during the incident
- **Technical debt**: Code that needs refactoring, brittle systems that need hardening, or documentation that needs updating
- **Process improvements**: Gaps in runbooks, unclear escalation paths, or missing access permissions
- **Root cause fixes**: Underlying issues that require more time to address than the immediate mitigation

By capturing these items as follow-ups, your team can stay focused on incident resolution while ensuring important improvements aren't forgotten.

## Create and manage follow-ups

Follow-ups can be created at any point during an incident (even before it's resolved), allowing responders to document necessary work as they discover it. After resolution, you can [export follow-ups](#export-follow-ups) to Jira or Case Management to integrate them into your team's existing workflows.

**From Datadog**: Go to the incident's **Post-Incident** tab to view, create, edit, and track all follow-ups associated with the incident.

**From Slack**: In the incident channel, run `/datadog followup` to create a new follow-up or `/datadog followup list` to view and manage existing follow-ups. For more Slack commands, see [Integrate Slack with Datadog Incident Management][5].

## Export follow-ups

You can export follow-ups from Incident Management to either Case Management or Jira, allowing you to track and manage them within your team's existing workflows. You can export follow-ups manually or configure Incident Management to automatically export all follow-ups to a selected Case Management or Jira project.

To export follow-ups:
1. Navigate to [**Incident Management settings > Follow-Ups**][1].
1. Add or define an **export template**. An export template describes the way that Datadog can export and sync a follow-up.
1. The following export template types are supported:
   1. [Case Management](#case-management-exports)
   1. [Jira](#jira-exports)
1. When defining a template, you can configure how Datadog should set the fields on the resulting Datadog case or Jira issue, using variables provided by the follow-up and its incident. For example:
   * `{{ title }}` represents the incident's title
   * `{{ severity }}` represents the incident's severity
   * `{{ follow_up_description }}` represents the follow-up's description
   * `{{ follow_up_due_date }}` represents the follow-up's due date
1. (Optional) You can define how status is mapped between platforms to ensure that status changes stay synchronized across both platforms. Follow-ups have two statuses: **Open** and **Done**.

### Manual and automatic exports

After defining an export template, you have two options:

| Export Option      | Description                                                                                      | When to Use                                                                                      |
|--------------------|--------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------|
| **Manual export**  | Export individual follow-ups on demand from the incident's Post-Incident tab.                      | Use this if you prefer to selectively export only certain follow-ups.                            |
| **Automatic export** | Configure Incident Management to automatically export all follow-ups using the template whenever they're created. | Choose this if you want all follow-ups to be tracked in your external system by default.         |

### Case Management exports


When you export your follow-ups to [Case Management][2], you can manage, track, and analyze your follow-ups directly in Datadog. For example, you can:

* View all of the open follow-up cases assigned to a particular user in Datadog
* Create a Datadog dashboard that shows follow-up cases by team
* Automatically sync these cases to any external application with which Case Management integrates, including Jira and ServiceNow

When Datadog exports an incident follow-up to Case Management, it creates a case for the follow-up in the project you selected in the export template.

**Status syncing:** Datadog syncs the status between the follow-up and the case **in both directions**, following the mapping you defined in the export template.

**Assignee syncing:** Datadog syncs the assignee between the follow-up and the case **in both directions**. Because a case can have only one assignee, only the first assignee of the follow-up is added to it.


### Jira exports

To export follow-ups to Jira, you must first install the Jira integration. For more information, see [Integrate Jira with Datadog Incident Management][4].

When Datadog exports an incident follow-up to Jira, it creates a Jira issue for the follow-up in the project you selected in the export template.

**Status syncing:** When you close or open an incident follow-up, Datadog automatically syncs the status of the connected Jira issue based on the mapping you defined in the export template. **This is a one-way sync.**

Organizations that need two-way sync should export to a Case Management project that is configured for two-way sync with a Jira project.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/incidents/settings?section=follow-ups
[2]: /service_management/case_management
[4]: /integrations/jira/
[5]: /service_management/incident_management/integrations/slack/#slack-commands