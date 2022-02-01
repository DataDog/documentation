---
title: Getting Started with Incident Management
kind: documentation
further_reading:
    - link: '/monitors/incident_management/datadog_clipboard'
      tag: 'Documentation'
      text: 'Datadog Clipboard'
    - link: 'https://www.youtube.com/watch?v=QIambwILy_M'
      tag: 'Video'
      text: 'Datadog on Incident Management'
    - link: '/monitors/incident_management'
      tag: 'Documentation'
      text: 'Incident Management'
    - link: 'https://www.datadoghq.com/blog/incident-response-with-datadog/'
      tag: 'Blog'
      text: 'Incident Management with Datadog'
    - link: '/monitors/incident_management/notification_rules'
      tag: 'Documentation'
      text: 'Notification Rules'
    - link: '/integrations/slack/?tab=slackapplicationus#using-datadog-incidents'
      tag: 'Documentation'
      text: 'Slack integration with incidents'
    - link: 'https://www.datadoghq.com/blog/incident-postmortem-process-best-practices/'
      tag: 'Blog'
      text: 'Best practices for writing incident postmortems'
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Incident Management is not available for your selected Datadog site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Datadog Incident Management is for tracking and communicating about an issue you've identified with your metrics, traces, or logs.

This guide walks you through using the Datadog site for declaring an incident, updating the incident as investigation and remediation progresses, and generating a postmortem when the incident has been resolved. The example assumes the [Slack integration][1] is enabled.

## Walking through an incident from issue detection to resolution

### Declaring an incident

**Scenario:** A monitor is alerting on a high number of errors which may be slowing down several services. It's unclear whether customers are being impacted.

This guide describes using the [Datadog Clipboard][2] to declare an incident.

1. Open the Clipboard: **Ctrl**/**Cmd** + **Shift** + **K**.

   Using the Clipboard, you can gather information from different sources, such as graphs, monitors, entire dashboards, or [notebooks][3]. This helps you provide as much information as possible when declaring an incident.

   For this guide, choose a graph from the _System - Metrics_ dashboard to copy to the Clipboard.

2. In the Datadog menu on the left-hand side, go to **Dashboard** > **Dashboard lists** and select **System - Metrics**.

3. Hover over one of the graphs and copy it to the Clipboard:

    a. **Ctrl**/**Cmd** + **C**

    or

    b. Click the **Export** icon on the graph and select **Copy**.

4. In the Datadog menu on the left-hand side, go to **Monitors** > **Manage Monitors** and select **[Auto] Clock in sync with NTP**.

5. Click **Add current page** to add the monitor to the Clipboard.

{{< img src="getting_started/incident_management/copy_to_clipboard.png" alt="Copy to Clipboard" responsive="true" style="width:100%;">}}

6. Click **Select All** and then **Add Selected Items To…**

7. Select **New Incident**.

8. Describe what's happening:
|                          |                                                                                                                                                                                                                                                                                                        |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Severity                 | Set to **Unknown** since it’s unclear whether customers are being impacted and how related services are being impacted. See the in-app description of what each severity level means and follow your team’s guidelines.                                                                                    |
| Title                    | Follow any naming conventions your team wants to use for incident titles. Because this is not a real incident, include the word `TEST` to make it clear that this is a test incident. An example title: `[TEST] My incident test`                                                                      |
| Signals                  | Signals are the reason you are declaring the incident. These can be graphs, logs, or other key visuals. The graph and the monitor you selected is already included but you can add additional signals. For example, copy the URL for this guide and add it using **Ctrl**/**Cmd** + **V**.                      |
| Incident Commander       | Leave this assigned to you. In an actual incident this would be assigned to the leader of the incident investigation. You or others can update who the incident commander is as the incident investigation progresses.                                                                                 |
| Additional Notifications | Leave blank because this is only a test, and you don’t want to alert anyone else or another service. For an actual incident, add people and services that should be notified to help with the investigation and remediation. You can send these notifications to Slack and PagerDuty as well. |

9. Click **Declare Incident** to create the incident.

   You can also declare an incident from a [graph][4], [monitor][5], or the [incidents API][6]. For APM users, you can click the **Siren** icon on any APM graph to declare an incident.

   {{< img src="getting_started/incident_management/apm_siren.png" alt="APM Siren" responsive="true" style="width:50%;">}}

    As part of the Slack integration, you can also use the `/datadog incident` shortcut to declare an incident and set the title, severity, and customer impact.

    After the incident has been created, you can add additional notifications by clicking on the _Notify_ button in the top right corner.

    {{< img src="getting_started/incident_management/notify_button.png" alt="Notify" responsive="true" style="width:100%;">}}

10. Click **Open Slack Channel** on the top left of the incident's page to go to the incident's Slack channel.

    {{< img src="getting_started/incident_management/open_slack_channel.png" alt="Open Slack Channel" responsive="true" style="width:60%;">}}

    A new Slack channel dedicated to the incident is automatically created for any new incident, so that you can consolidate communication with your team and begin troubleshooting. If your organization's Slack integration is set up to update a global incident channel, then the channel is updated with the new incident.

    In this example, you are the only one added to the new incident channel. When you add additional people or services in Additional Notifications for an actual incident, everyone is automatically added to the incident channel.

    If you don't have the Slack integration enabled, click **Link to Chat** to add the link to the chat service you are using to discuss the incident.

    You can also use **Link Video Call** to add a link to the call where discussions about the incident are happening.

### Troubleshooting and updating the incident

The Incident page has four main sections: _Overview_, _Timeline_, _Remediation_, and _Communication_. Update these sections as the incident progresses to keep everyone informed of the current status.

#### Overview

**Scenario:** After some investigation, you discover that the root cause is a host running out of memory. You've also been informed that a small subset of customers are being affected and seeing slow loading of pages. The first customer report came in 15 minutes ago. It is a SEV-3 incident.

In the _Overview_ section, you can update incident fields and customer impact as the investigation continues.

To update the severity level and root cause:

1. Click the **Overview** tab.

2. Click **Edit** in the _Properties_ box.

3. Click the _Severity_ dropdown and select **SEV-3**.

4. Add to the _Root Cause_ field: `TEST: Host is running out of memory.`

5. Select **Monitor** in the _Detection_ dropdown, because you were first alerted by a monitor on the issue.

6. Click **Save** to update the properties.

    From Slack, you can also update the title, severity, or status of an ongoing issue using the `/datadog incident update` command.

To update the customer impact:

1. Click **Edit** in the _Impact_ box.

2. Select **Yes** in the _Customer impact_ dropdown.

3. Change the timestamp to 15 minutes earlier, because that was when the first customer report came in.

4. Add to _Scope of impact_: `TEST: Some customers seeing pages loading slowly.`

5. Click **Save** to update the fields.

    The top of the incident page shows how long the customer impact has been going on. All changes made on the _Overview_ page are added to the _Timeline_.

#### Timeline

The _Timeline_ shows additions and changes to incident fields and information in chronological order.

1. Click the **Timeline** tab.

    The _Content Type_, _Important_, and _Responder_ filters allow you to show specific types of events.

2. Find the _Customer impact updated_ event and mark as _Important_ by clicking the flag icon.

    {{< img src="getting_started/incident_management/flag_event.png" alt="Flag Event" responsive="true" style="width:50%;">}}

    You can mark any event as _Important_ so that when you generate a postmortem after the incident has been resolved, you can choose to include only timeline events that are marked as _Important_.

3. Add a note to the timeline: `I found the host causing the issue.`

4. Hover over the note's event and click the pencil icon to change the timestamp of the note because you actually found the host causing the issue 10 minutes ago.

    {{< img src="getting_started/incident_management/edit_event_timestamp.png" alt="Event Timestamp" responsive="true" style="width:90%;">}}

5. Mark the note as **Important**.

6. Click **Open Slack Channel** to go back to the incident's Slack channel.

7. Post a message in the channel saying `I am working on a fix.`

8. Click the message's actions command icon (three dots on the right after hovering over a message).

9. Select **Add to Incident** to send the message to the timeline.

    {{< img src="getting_started/incident_management/add_from_slack.png" alt="Add from Slack" responsive="true" style="width:40%;">}}

    You can add any Slack comment in the incident channel to the timeline so that you can consolidate important communications related to the investigation and mitigation of the incident.

#### Remediation

**Scenario:** There's a notebook on how to handle this kind of issue, which includes tasks that need to be done to fix it.

 In the _Remediation_ section, you can keep track of documents and tasks for investigating the issue or for post-incident remediation tasks.

1. Click the **Remediation** tab.

2. Click the the plus icon (+) in the _Documents_ box and add a link to a Datadog notebook.

    All additions and updates to the _Documents_ section are added to the timeline as an _Incident Update_ type.

3. Add a task by adding a description of a task in the _Incident Tasks_ box, for example: `Run the steps in the notebook.`

4. Click **Create Task**.

5. Click **Assign To** and assign yourself the task.

6. Click **Set Due Date** and set the date for today.

    All task additions and changes are recorded in the _Timeline_.

    You can also add post-incident tasks in the _Remediation_ section to keep track of them.

#### Communications

**Scenario:** The issue has been mitigated, and the team is monitoring the situation. The incident status is stable.

In the _Communications_ section, you can send out a notification updating the status of the incident.

1. Navigate back to the _Overview_ section.

2. Click **Edit** in the _Properties_ box and change the status to _stable_.

3. Click **Save**.

4. Go to the _Communications_ tab.

5. Click **New Communication**.

    The default message has the incident's title in the subject and information about the current status of the incident in the body.

    In an actual incident you would send updates to the people involved in the incident. For this example, send a notification to yourself only.

6. Add yourself to _Add recipients_.

7. Click **Send**.

    You should receive an email with the message.

    You can create customized templates by clicking on **Manage Templates** > **New Template**. Group templates together using the _Category_ field.

### Resolution and postmortem

**Scenario:** It's been confirmed that the issue no longer impacts customers and that you've resolved the issue. The team wants a postmortem to look back on what went wrong.

1. Go to the _Overview_ section.

2. Click **Edit** in the _Impact_ box to update the customer impact.

3. Toggle the **Active** switch so that it's no longer active.

    You can also change the date and time for when the customer impact ended if it occurred earlier.

4. Click **Edit** in the _Properties_ box to update the status of the incident.

5. Change the status to _resolved_.

6. Click **Save**.

    When an incident's status is set to resolved, a _Generate Postmortem_ button appears at the top.

    {{< img src="getting_started/incident_management/generate_postmortem.png" alt="Generate Postmortem" responsive="true" style="width:80%;">}}

7. Click **Generate Postmortem**.

8. For the timeline section, select **Marked as Important** so that only the _Important_ events are added to the postmortem.

9. Click **Generate**.

    The postmortem is generated as a Datadog Notebook, and it includes the timeline events and resources referenced during the investigation and remediation. This makes it easier to review and further document what caused the issue and how to prevent it in the future. Datadog Notebook supports live collaboration so you can edit it with your teammates in real-time.

    If there are follow-up tasks that you and your team need to complete to ensure the issue doesn't happen again, add those and track them in the Remediation's _Incident Tasks_ section.

## Customizing your incident management workflow

Datadog Incident Management can be customized with different severity and status levels, based on your organization's needs, and also include additional information such as APM services and teams related to the incident. For more information, see this [section][7] of the Incident Management page.

You can also set up notification rules to automatically notify specific people or services based on an incident's severity level. For more information, see the [Notification Rules][8] documentation.

To customize Incident Management, go to the [incident settings page][9]. From the Datadog menu on the left-hand side, go to **Monitors** > **Incidents** (if you get an Incident Management welcome screen, click **Get Started**). Then on the top right corner, click **Settings**.

{{< img src="getting_started/incident_management/im_settings_button.png" alt="Settings" responsive="true" style="width:100%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/slack/
[2]: /monitors/incident_management/datadog_clipboard
[3]: /notebooks/#overview
[4]: /monitors/incident_management/#from-a-graph
[5]: /monitors/incident_management/#from-a-monitor
[6]: /api/latest/incidents/#create-an-incident
[7]: /monitors/incident_management/#status-levels
[8]: /monitors/incident_management/notification_rules
[9]: https://app.datadoghq.com/incidents/settings
