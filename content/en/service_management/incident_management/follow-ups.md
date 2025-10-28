---
title: Incident Follow-ups
description: Manage follow-up tasks defined during your incident response process.
further_reading:
- link: "/service_management/incident_management/incident_settings"
  tag: "Documentation"
  text: "Incident Settings"
---

## Overview

Incident follow-ups are tasks to be performed following an incident's resolution. Follow-ups are usually work items intended to improve the reliability of your systems or the effectiveness of your incident response process.

You can use Datadog Incident Management to define, manage, and track follow-up tasks for your incidents.

## Define follow-ups

Your incident responders can define incident follow-ups at any point during an incident.

When defining a follow-up or at any time later, you can add due date and multiple assignees.

## Export follow-ups

Incident Management can export and sync follow-ups to work management applications help you manage, track, and analyze your organization's follow-up work.

To do this, you must first define at least one **export template**. Export templates deterine the application to which Datadog writes the follow-up, as well as how Datadog syncs information to and from that application.

To define export templates, go to "Follow-ups" in [Incident Management settings][1] and define an **export template**. Two types of export templates are supported: **Case Management** and **Jira**.

When defining a template of either type, you can configure how Datadog should set the fields on the case or Jira issue, using variables provided by the follow-up and its incident. For example:

* `{{ title }}` represents the incident's title
* `{{ severity }}` represents the incident's severity
* `{{ follow_up_description }}` represents the follow-up's description
* `{{ follow_up_due_date }}` represents the follow-ups due date

You can also define how status is mapped on each side.

After defining an export template, you can configure Incident Management to automatically export all follow-ups using the template.

### Case Management exports

When you export your follow-ups to [Case Management][2], you can manage, track, and analyze your follow-ups directly in Datadog. For example, you can:

* View all of the open follow-up cases assigned to a particular user in Datadog
* Create a Datadog dashboard that shows follow-up cases by team
* Automatically sync these cases to any external application with which Case Management integrates, including Jira and ServiceNow

When Datadog exports an incident follow-up to Case Management, it creates a case for the follow-up in the project you selected in the export template.

**Status syncing:** Datadog syncs status between the follow-up and the case **in both directions**, following the mapping you defined in the export template.

**Assignee syncing:** Datadog syncs assignee between the follow-up and the case **in both directions**. Because a case can have only one assignee, only the first assignee of the follow-up is added to it.

### Jira exports

To export follow-ups to Jira, you must first install the Jira integration in your Datadog organization through the [Jira Integration tile][3]. For more information, see the [Jira integration][4] documentation.

When Datadog exports an incident follow-up to Jira, it creates a Jira issue for the follow-up in the project you selected in the export template.

**Status syncing:** When you close or open a incident follow-up, Datadog automatically syncs the status of connected Jira issue based on the mapping you defined in the export template. **This is a one-way sync.**

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /service_management/incident_management/incident_settings
[2]: /service_management/case_management
[3]: https://app.datadoghq.com/integrations/jira
[4]: /integrations/jira/
