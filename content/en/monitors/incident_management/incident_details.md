---
title: Incident Details Page
kind: documentation
description: Manage the context and work for an incident
further_reading:
- link: "dashboards/querying/#incident-management-analytics"
  tag: "Documentation"
  text: "Incident Management Analytics"
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Incident Management is not available on the Datadog {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

Every incident in Datadog has its own Incident Details page where you can manage your incident's property fields, signals, tasks, documents, responders, and notifications. An Incident Details page is available after you've [created a new incident][1]. The Incident Details page contains a global header for quick access to key actions, while the remaining body of the page is divided into different sections using tabs in order to group related incident data together. The first of these sections is the Overview.

## Global header

{{< img src="monitors/incidents/incident_global_header.jpeg" alt="Incident Global Header" style="width:80%;">}}

The global header provides access to the [Status and Severity][2] selectors, and links to your [Incident Integrations][3]. After you've moved an incident to the resolved status, an option appears in the header to generate a postmortem Notebook using a [postmortem template][4]. Configure your postmortem templates in Incident Settings to predefine the structure and content of your postmortems.

## Overview section

{{< img src="monitors/incidents/incident_overview.jpeg" alt="Incident Overview Section" style="width:80%;">}}

Use the Overview section to specify an incident's properties and define customer impact. 

By default, all incidents have the following properties:

* Root Cause
* Services
* Teams
* Detection Method

Additional property fields can be configured in your [Incident Settings][5] by using the `<KEY>:<VALUE>` pairs reporting in your Datadog metric tags. Assigning values to an incident's properties makes it easier to search for subsets of incidents on the [Incident Homepage][6] and to form queries when using [Incident Management Analytics][7].

If your incident is customer-facing, specify the details of the impact below the Properties section under the Impact heading:

1. Select *Yes* for `Customer Impact`.
2. Specify a start date and time for the impact.
3. Specify an end date and time for the impact or `Active` if the impact is still ongoing.
4. Describe the nature of the impact on customers in `Scope of impact`.

## Timeline section

{{< img src="monitors/incidents/incident_timeline.jpeg" alt="Incident Timeline" style="width:80%;">}}

The Incident Timeline is the primary source of information for the work done during an incident. As actions are performed, new cells are added to the timeline in chronological order to capture the changes made, the person who made the change, and the time the changes were made. 

### Content types

Each cell has its own content type that indicates the kind of information the cell contains:

|  Content type      | Description                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| Responder note     | A note manually written by an incident responder. Responder notes have the following sub-types:<br>- *Graph*: The responder note contains one or more Datadog graphs<br>- *Link*: The responder note contains a hyperlink<br>- *Code*: The responder note contains text wrapped in Markdown syntax for code blocks
| Incident update    | Any changes made to an incident's properties (including status and severity) or its impact.
| Integration update | Any changes made through the Incident Management product's [integrations][3].
| Task               | Any changes made to incident tasks in the Remediation section of the Incident Details page.
| Notification sent  | An update when a manual notification is sent by an incident responder.

Add responder notes directly to the timeline using the text box just underneath the tabs for switching between the different sections of the Incident Details page. Customize the timestamp of the responder note at creation time to capture important information that was relevant at an earlier point in time in the chronological order of the timeline. For responder notes you've authored, you can edit the content or timestamp, or delete the note entirely. You can also copy a link to a specific cell to share with teammates. Responder notes can be [added to the timeline from Slack][8].

For graph cells specifically, graph definitions are stored using share URLs for graphs if enabled in your [Organization Settings][9]. When a graph cell is added to the timeline, it has full interactive hover states as found in Dashboards, Notebooks, and other pages. After 24 hours of being added to the timeline, the graphs are replaced with static images capturing what the graph was displaying. This is to ensure that graphs that are displaying short retention data have backup images captured even after the live data in the graphs has expired.

By default, timeline cells are sorted in `oldest first` order, but this can be changed to `newest first` using the button at the top of the timeline.

## Remediation section

{{< img src="monitors/incidents/incident_remediation.jpeg" alt="Incident Remediation Section" style="width:80%;">}}

The Remediation section is place to store any documents or resources that are relevant to the remediation process of an incident, as well as an area to track key tasks for the remediation process. 

Documents can be added by pasting the document URL and giving the link a human-readable name for quick access.

Incident tasks are created directly in the Remediation section, as well as through Datadog's [Slack integration][10]. 

From the Remediation section, type in the description of your task in the creation text box. To assign a task to a Datadog user, type `@` in the description text box or by assigning it in the `Assignees` column after the task has been created. An incident task can have more than one assignee. After a task has been created, it can also be assigned a due date. 

As work for different tasks is finished, individual tasks can be marked as completed by clicking the checkbox to the left of the task's description. If you have a large number of tasks, you can filter them down by searching for key words or by hiding completed tasks from view.

## Notifications section

{{< img src="monitors/incidents/incident_notifications.jpeg" alt="Incident Notifications" style="width:80%;">}}

The Notifications section is where all stakeholder notifications for an incident are consolidated. Manually sent notifications can be created, saved as drafts, and sent directly from this page. Automated notifications sent by [Notification Rules][11] for the incident in question are also listed in this section.

To create a manual notification: 

1. Click the **+ New Notification** button in the top right of the section.
2. Enter your desired recipients. These can be any notification handle supported by Datadog including emails, Slack channels, PagerDuty handles, Webhooks, etc.
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
[8]: /integrations/slack/?tab=slackapplicationus#using-datadog-incidents
[9]: https://app.datadoghq.com/organization-settings/public-sharing/settings
[10]: /integrations/slack/?tab=slackapplicationus#manage-incident-tasks
[11]: /monitors/incident_management/incident_settings#rules
[12]: /monitors/incident_management/incident_settings#message-templates
[13]: /getting_started/incident_management
