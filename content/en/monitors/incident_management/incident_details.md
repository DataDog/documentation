---
title: Incident Management
kind: documentation
description: Create and manage incidents
further_reading:
- link: "dashboards/querying/#incident-management-analytics"
  tag: "Documentation"
  text: "Incident Management Analytics"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Incident Management is not available on the Datadog for Government site.</div>
{{< /site-region >}}

Every incident in Datadog has its own Incident Details page where you can manage your incident's property fields, signals, tasks, documents, responders, and notifications. An Incident Details page first becomes accessible after you've [created a new incident][1]. The Incident Details page contains a global header for quick access to key actions, while the remaining body of the page is divided into different sections using tabs in order to group related incident data together. The first of these sections is the Overview.

## Global Header

{{< img src="monitors/incidents/placeholder" alt="Placeholder"  style="width:80%;">}}

The Global Header gives you quick access to the [Status and Severity][2] selectors, and links to your [Incident Integrations][3]. After you've moved an incident to the Resolved status, an option will appear in the header for you to generate a Postmortem Notebook using a [Postmortem Template][4]. Postmortem Templates can be configured in your Incident Settings to predefine the structure and content of your postmortems so that you can create meaningful postmortems in a matter of seconds.

## Overview Section

{{< img src="monitors/incidents/placeholder" alt="Placeholder"  style="width:80%;">}}

The Overview Section is where you specify an incident's Properties and define its customer impact. 

By default, all incidents will have the following four Properties:

* Root Cause
* Services
* Teams
* Detection Method

Additional Property Fields can be configured in your [Incident Settings][5] by using the key:value pairs reporting in your Datadog metric tags. Assigning values to an incident's Properties makes it easier to search for subsets of incident in the [Incident Homepage][6] and to form more powerful queries when using [Incident Management Analytics][7].

If your incident is customer-facing, you can specify the details of the impact below your Properties under the Impact heading by:

1. Selecting *Yes* for `Customer Impact`
2. Specifying a start date and time for the impact
3. Specifying an end date and time for the impact or `Active` if the impact is still ongoing
4. Describing the nature of the impact on customers in `Scope of impact` 

## Timeline Section

{{< img src="monitors/incidents/placeholder" alt="Placeholder"  style="width:80%;">}}

The Incident Timeline is the primary source of truth for the history of work done during an incident. As actions are performed, new cells will be added to the Timeline in chronological order to capture what changes were made, who they were made by and when they were made. 

Each cell has its own Content Type that indicates what kind of information the cell contains. The Content Types are:

1. *Responder Note* - A note that was manually written by an incident responder. Responder Notes have the following sub-types:
   *  *Graph* - The Responder Note contains one or more Datadog Graphs
   *  *Link* - The Responder Note contains a hyperlink
   *  *Code* - The Responder Note contains text wrapped in the ``` Markdown syntax for code blocks
2. *Incident Update* - Any changes made to an incident's Properties (including Status and Severity) or its Impact
3. *Integration Update* - Any changes made through the Incident Management product's [integrations][3]
4. *Task* - Any changes made to Incident Tasks in the Remediation Section of the Incident Details Page
5. *Notification Sent* - An update when a manual notification is sent by an Incident Responder

You can add Responder Notes directly into the Timeline using the textbox just underneath the tabs for switching between the different sections of the Incident Details page. You can also customize the timestamp of the Responder Note at creation time to capture important information that was relevant at an earlier point in time in the chronological order of the Timeline. For Responder Notes you've authored, you can edit its content or timestamp, or delete the note entirely. You can also copy a link to a specifc cell to easily share with teammates. Responder Notes can also be [added to the Timeline from Slack][9].

For *Graph* cells specifically, graph definitions are stored using Share URLs for graphs if they are enabled in your [Organization Settings][8]. When a Graph cell is added to the Timeline, it will have the full interactive hover states as found in Dashboards, Notebooks, among other pages. After 24 hours of being added to the Timeline, the Graphs will be replaced with static images capturing what the graph was displaying. This is to ensure that graphs that are displaying short retention data have backup images captured even after the live data in the graphs has expired.

By default, Timeline cells will be sorted in `Oldest First` order, but this can be changed to `Newest First` using the button at the top of the Timeline.

## Remediation Section

{{< img src="monitors/incidents/placeholder" alt="Placeholder"  style="width:80%;">}}

The Remediation Section is where you can store any documents or resources that were relevant to the remediation process of an incident, as well as an area to track key tasks for the remediation process. 

Documents can be added by pasting the document URL and giving the link a human-readable name for quick access.

Incident Tasks can be created directly in the Remediation Section, as well as through Datadog's [Slack integration][10]. 

From the Remediation Section, type in the description of your task in the creation textbox. To assign a task to a Datadog user, type `@` in the description textbox or by assigning it in the `Assignees` column after the task has been created. An Incident Task can have more than one assignee. After a task has been created, it can also be assigned a due date. 

As work for different tasks is finished, individual tasks can be marked as completed by clicking the checkbox to the left of the task's description. If you have a large number of tasks, you can filter them down by searching for key words or by hiding completed tasks from view.

## Responders Section

<div class="alert alert-warning">
This feature is in open beta.
</div>

{{< img src="monitors/incidents/placeholder" alt="Placeholder"  style="width:80%;">}}

The Responders Section is where you form your response team by adding fellow Datadog users and assigning them a role to carry out in the process of resolving the incident. The three default roles provided by Datadog are:

1. `Incident Commander` - The individual responsible for leading the response team 
2. `Communications Lead` - The individual responsible for managing stakeholder communications throughout the lifecycle of the incident
3. `Responder` - An individual that is actively contribution to investigating an incident and resolving its underlying issue

**Note:** There must always be exactly one `Incident Commander` at all times during an incident. If there is only one responder in an incident, that individual will be assigned the `Incident Commander` role automatically. There is no limit to the number of individuals that are assigned the `Communications Lead` or `Responder` role in an incident.

If you add another individual as a responder, they will be notified through the email they have associated with their Datadog account. Anyone is able to change the role of a responder, but you can only remove an individual from an incident's Responders List if they have the general `Responder` role and have no activity in the incident. If there is already an `Incident Commander` assigned to an incident, assigning the `Incident Commander` role to another individual will transfer the role over to them. The previous `Incident Commander` will be reassigned the `Responder` role.

The Responders List also saves the date and time when an individual was originally added to the response team of an incident, as well as the date and time when they last contributed something to the Incident Timeline.

## Notifications Section

{{< img src="monitors/incidents/placeholder" alt="Placeholder"  style="width:80%;">}}

The Notifications Section is where all stakeholder notifications for an incident are consolidated. Manually sent notifications can be created, saved as drafts and sent directly from this page. Automated notifications sent by [Notification Rules][11] for the incident in question will also be listed in this section.

To create a manual notification: 

1. Click the **+ New Notification** button in the top right of the section
2. Enter your desired recipients (these can be any notification handle supported by Datadog including emails, Slack channels, PagerDuty handles, Webhooks, etc.)
3. Select a [Message Template][12]
4. Edit the title and message of your notification as necessary using Markdown and any supported incident template variable by typing `{{`. 
   * Template Variables are based on the properties of an incident. Before a message is sent, all template variables will be replaced by the corresponding value of the referenced property that is available to the message when it was sent.
5. Send your notification or save it as a draft 

The Notifications Sections is separated into lists: Drafts and Sent.

Both lists will display: 

1. The (intended) recipients of a notification 
2. The contents of the notification's message (as well as any renotification messages that were sent)
3. When the notification was last updated 
4. The original author of the notification

The Sent List will also display whether a notification was manually sent, or automatically sent by a Notification Rule. If the notification was automated, the rule that triggered the notification will be displayed.

## Ready to try it out?

Work through an example workflow in the [Getting Started with Incident Management][13] guide.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /monitors/incident_management/#creating-an-incident
[2]: /monitors/incident_management/#describing-the-incident
[3]: /monitors/incident_management/#integrations
[4]: /monitors/incident_management/incident_settings#postmortem-templates
[5]: https://app.datadoghq.com/incidents/settings#Property-Fields
[6]: https://app.datadoghq.com/incidents
[7]: /monitors/incident_management/incident_management_analytics
[8]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[9]: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[10]: /integrations/slack/?tab=slackapplicationus#manage-incident-tasks
[11]: /monitors/incident_management/incident_settings#rules
[12]: /monitors/incident_management/incident_settings#message-templates
[13]: /getting_started/incident_management
