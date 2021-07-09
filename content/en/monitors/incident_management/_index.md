---
title: Incident Management
kind: documentation
description: Create and manage incidents
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Incident Management is not available on the Datadog for Government site.</div>
{{< /site-region >}}

{{< img src="monitors/incidents/workflow-1-graph-1.png" alt="From Graph"  style="width:80%;">}}

Any event that may lead to a disruption in your organization’s services can be described as an incident, and it is often necessary to have a set framework for handling these events. Datadog’s Incident Management feature provides a system through which your organization can effectively identify and mitigate incidents.

Incidents live in Datadog alongside the metrics, traces, and logs you are collecting. You can view and filter incidents that are relevant to you.

In the Datadog paradigm, any of the following are appropriate situations for declaring an incident:

* An issue is or may be impacting customers or services.
* You do not know whether you should call an incident. Notify other people and increase severity appropriately.

## Usage

Incident Management requires no installation. To view your incidents, go to the [Incidents][1] page to see a feed of all ongoing incidents.  You can configure additional fields that appear for all incidents in [Incident Settings][2].

### Creating an incident

#### From a graph

You can declare an incident directly from a graph by clicking the export button on the graph and then clicking **Declare incident**. The incident creation modal appears, and the graph is added to the incident as a signal.

{{< img src="monitors/incidents/from-a-graph.png" alt="Create in incident from a graph" style="width:80%;">}}

#### From the Clipboard

Use the Datadog Clipboard to gather multiple monitors and graphs and to generate an incident. To add a dashboard to the Clipboard, copy any graph, and then select **Open Clipboard**. Add all of the relevant graphs and monitors to the Clipboard and then click **Add to New Incident**. Everything on the Clipboard is added to the incident as a signal.

{{< img src="monitors/incidents/from-clipboard.png" alt="Add a dashboard to the clipboard" style="width:80%;">}}

{{< img src="monitors/incidents/clipboard.png" alt="Create in incident from the clipboard" style="width:80%;">}}

**Note**: In addition to exporting from an incident, data on the Clipboard can be exported to a new dashboard or a notebook.

#### From a monitor

You can declare an incident directly from a monitor by clicking **Declare incident**. The incident creation modal appears, and the monitor is added into the incident as a signal.

{{< img src="monitors/incidents/incident-from-monitor.png" alt="Create an incident from a monitor" style="width:80%;">}}

You can also add a monitor to an existing incident.

{{< img src="monitors/incidents/existing.png" alt="Add a monitor to an existing incident" style="width:80%;">}}

#### From the incidents page

In the [incidents UI][1], click the **New Incident** button to create an incident.

#### From Slack

Once you have the [Datadog integration enabled on Slack][3], from any Slack channel you can use the slash command `/datadog incident` to declare a new incident.

In the creation modal, you add a descriptive title, select whether customers were impacted (yes, no, or unknown) and select a severity level (1-5, unknown).

If the user declaring the incident has connected their Slack to their Datadog account, then, by default, that user will become the Incident Commander. The Incident Commander (IC) can be changed later in-app if necessary. If the person declaring an incident is not a member of a Datadog account, then the IC is assigned to a generic `Slack app user` and can be assigned to another IC in-app.

Read more about using the Datadog Slack App [here][4].

{{< img src="monitors/incidents/from-slack.png" alt="Create in incident from Slack" style="width:60%;">}}

If the user declaring the incident is a part of your Datadog account, then that user becomes the Incident Commander (IC) by default. If the person declaring an incident is not part of your Datadog account, then the IC is assigned to a generic `Slack app user`. The IC can be changed on the [incidents page][1] in the Datadog app.

Once you declare an incident from Slack, it generates an incident channel.

For more information about the Datadog Slack integration, check out [the docs][3].

For non-EU customers who use Slack, [sign up for beta access][5] to the Datadog Slack app. For EU customers who use Slack, stay informed about the Slack app by emailing support@datadoghq.com.

### Describing the incident

No matter where you create an incident, it's important to describe it as thoroughly as possible to share the information with other people involved in your company's incident management process.

When you create an incident, an incident modal comes up. This modal has several core elements:

**Severity Level**: Denotes the severity of your incident, from SEV-1 (most severe) to SEV-5 (least severe). If your incident is under initial investigation, and you do not know the severity yet, select UNKNOWN.

* SEV-1: Critical impact
* SEV-2: High impact
* SEV-3: Moderate impact
* SEV-4: Low impact
* SEV-5: Minor issue
* UNKNOWN: Initial investigation

**Note**: You can customize the description of each severity level to fit the requirements of your organization.

**Title**: Give your incident a descriptive title.

**Signals**: The reason(s) you are declaring the incident. These can be graphs, logs, or other key visuals.

**Incident commander**: This person is assigned as the leader of the incident investigation.

**Additional notifications**: Notify other teams or people.

Click on “Declare Incident” to finish creating your incident.

### Updating the incident and the incident timeline

An incident’s status can be updated directly in the [overview page][1] of the incident or from Slack within the dedicated incident channel. To update an incident from Slack, use this slash command to pull up the update modal: `/datadog incident update`

You can also update the impact section to specify if there was customer impact, the incident timeline, and whether or not it’s still active. This section also requires a description of the scope of impact to be completed.

In the incident header, you can see the incident's state, severity, timestamp, impact, and duration, as well as who has responded to the incident. You can also notify responders of updates. There are quick links to chat channels (if not using the Datadog Slack App, video conferencing, and attached postmortem (if one has been added).

Timeline data is automatically categorized, so you can use the facets to filter through timeline content. This is particularly useful for long incidents with longer investigations. This makes it easier for ICs and responders to filter through for who is involved, what progress has been made, and what’s already investigated. As the author of the timeline notes, you can edit the timestamps and message notes as they are created. You can also flag timeline calls to highlight them to other people monitoring the incident.

#### Status levels

The default includes the statuses **Active**, **Stable**, and **Resolved**. **Completed** can be enabled or disabled. You can customize the description of each status level to fit the requirements of your organization.

* Active: Incident affecting others.
* Stable: Incident no longer affecting others, but investigations incomplete.
* Resolved: Incident no longer affecting others and investigations complete.
* Completed: All remediation complete.

As the status of an incident changes, Datadog tracks time-to-resolution as follows:

| Status Transition | Resolved Timestamp |
| ------------------ | -----------|
| `Active` to `Resolved`, `Active` to `Completed` | Current time |
| `Active` to `Resolved` to `Completed`, `Active` to `Completed` to `Resolved` | Unchanged |
| `Active` to `Completed` to `Active` to `Resolved` | Overridden on last transition |

#### Assessment fields

Assessment fields are the metadata and context that you can define per incident. These fields are [key:value metric tags][6]. These field keys are added in settings, and the values are then available when you are assessing the impact of an incident on the overview page. For example, you can add an Application field. The following fields are available for assessment in all incidents:

* **Root Cause**: This text field allows you to enter the description of the root cause, triggers, and contributing factors of the incident.
* **Detection Method**: Specify how the incident was detected with these default options: customer, employee, monitor, other, or unknown.
* **Services**: If you have APM configured, your APM services are available for incident assessment. To learn more about configuring your services in APM, see [the docs][7].
    * If you are not using Datadog APM, you can upload service names as a CSV. Any values uploaded via CSV are only be available within Incident Management for incident assessment purposes.
    * Datadog deduplicates service names case-insensitively, so if you use "My Service" or "my service", only the manually added one is shown.
    * Datadog overrides APM service names in favor of the manually uploaded list.
    * Note that if the service is an APM service and no metrics are posted in the past seven days, it does not appear in the search results.
    * Further integrate with Datadog products and accurately assess service impact. The Services property field is automatically populated with APM services for customers using Datadog APM
* **Teams**: Populated from a CSV upload. Any values uploaded via CSV are only available within Incident Management for incident assessment purposes.

## Integrations

In addition to integrating with [Slack][3], Incident Management also integrates with:

- [PagerDuty][8] to send incident notifications to PagerDuty.
- [Jira][9] to create a Jira ticket for an incident.
- [Webhooks][10] to send incident notifications using webhooks (for example, [sending SMS to Twilio][11]).

## Ready to try it out?

Work through an example workflow in the [Getting Started with Incident Management][12] guide.

[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[4]: /integrations/slack/
[5]: https://app.datadoghq.com/incidents/ddslackapp
[6]: /getting_started/tagging/assigning_tags?tab=noncontainerizedenvironments#overview
[7]: /tracing/#2-instrument-your-application
[8]: /integrations/pagerduty/
[9]: /integrations/jira/
[10]: /integrations/webhooks/
[11]: /integrations/webhooks/#sending-sms-through-twilio
[12]: /getting_started/incident_management
