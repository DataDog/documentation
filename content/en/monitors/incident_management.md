---
title: Incident Management
kind: documentation
disable_toc: true
description: Create and manage incidents
---

{{< img src="monitors/incidents/incidents-top-1.png" alt="Incident Management"  style="width:80%;">}}

Any event that may lead to a disruption in your organization’s services can be described as an incident, and it is often necessary to have a set framework for handling these events. Datadog’s Incident Management product provides a system through which your organization can effectively identify and mitigate incidents. 

Incidents and outages can be managed in Datadog alongside the metrics, traces, logs, and other data you are collecting. You can view and filter incidents that are relevant to you and your team. 

In the Datadog paradigm, any of the following are appropriate situations for declaring an incident:

* An issue is or may be impacting customers or internal services.
* You do not know whether you should call an incident.

## Usage

Incident Management requires no installation. To view your incidents, go to the [Incidents][1] page to see a feed of all ongoing and resolved incidents. You can configure additional fields that appear for all incidents in [Incident Settings][2].

### Creating an incident

#### From a graph

You can declare an incident directly from a graph by clicking the export button on the graph and then clicking **Declare incident**. The incident creation modal appears, and the graph is added to the incident as a signal. 

{{< img src="monitors/incidents/from-a-graph.png" alt="Create in incident from a graph">}}

#### From the Clipboard

Use the beta [Datadog Clipboard][9] to gather multiple signals like monitors, graphs, security signals, logs, or any data in Datadog and to generate an incident. To add a graph to the clipboard, copy any graph, and then select Open Clipboard. Continuing adding all of the relevant graphs and monitors to the clipboard, select them, and then click Add to New Incident. Everything on the clipboard is added to the incident as a signal.

You can also add these signals to active incidents by scrolling down and selecting the incident ID.

{{< img src="monitors/incidents/from-clipboard.png" alt="Add a dashboard to the clipboard">}}

{{< img src="monitors/incidents/clipboard.png" alt="Create in incident from the clipboard">}}

**Note**: Data on the Clipboard can also be exported to a new or existing dashboard or a notebook in addition to an incident.

#### From a monitor

You can declare an incident directly from a monitor by clicking the export button on the graph and then clicking **Declare incident**. The incident creation modal appears, and the monitor is added into the incident as a signal.

{{< img src="monitors/incidents/from-a-graph.png" alt="Create in incident from a monitor">}}

#### From the incidents page

In the [incidents UI][1], click the **New Incident** button to create an incident.

#### From Slack

Once you have the [Datadog integration enabled on Slack][3], you can use `/datadog` to declare a new incident from any channel.

{{< img src="monitors/incidents/from-slack.png" alt="Create in incident from Slack">}}

If the user declaring the incident is a part of your Datadog account, then that user becomes the Incident Commander (IC) by default. If the person declaring an incident is not part of your Datadog account, then the IC is assigned to a generic `Slack app user`. The IC can be changed on the [incidents page][1] in the Datadog app.

Once you declare an incident from Slack, it generates an incident channel.

For more information about the Datadog Slack integration, see [the documentation][3].

### Describing the incident

No matter where you create an incident, it's important to describe it as thoroughly as possible to share the information with other people involved in your company's incident management process.

When you create an incident, an incident modal comes up. This modal has several core elements:

**Severity**: Denotes the severity of your incident, from SEV-1 (most severe) to SEV-5 (least severe). If your incident is under initial investigation, and you do not know the severity yet, select UNKNOWN.

* SEV-1: Critical impact
* SEV-2: High impact
* SEV-3: Moderate impact
* SEV-4: Low impact
* SEV-5: Minor issue
* UNKNOWN: Initial investigation

**Title**: Give your incident a descriptive title.

**Signals**: The reason(s) you are declaring the incident. These can be graphs, logs, or other key visuals.

**Incident commander**: This person is assigned as the leader of the incident investigation.

**Additional notifications**: Notify other teams or people.

Click on “Declare Incident” to finish creating your incident.

### Updating the incident

An incident’s status can be updated directly in the [overview page][1] of the incident or from Slack within the dedicated incident channel. To update an incident from Slack, use this slash command to pull up the update modal: `/datadog incident update`

### Incident remediation

## Example workflow

### 1. Discover an issue

Consider a scenario in which you are looking at a dashboard, and you notice that one particular service is showing an especially high error count. Using the Export button in the upper right of a widget, you can declare an incident.

{{< img src="monitors/incidents/workflow-1-graph-1.png" alt="From Graph"  style="width:80%;">}}

### 2. Declare an incident and assemble your team

Use the New Incident modal to assemble your team and notify them. The graph from which you created the incident is automatically attached as a signal. Attach any other signals that would give your team the necessary context to begin resolving this issue. The Slack and PagerDuty integrations enable you to send notifications through those services.

{{< img src="monitors/incidents/workflow-2-modal-1.png" alt="New Incident"  style="width:60%;">}}

### 3. Communicate and begin troubleshooting

If you have the [Datadog Slack app][3] installed, the Slack integration can automatically create a new channel dedicated to the incident, so you can consolidate communication with your team and begin troubleshooting.

For non-EU customers who use Slack, [sign up for beta access][4] to the Datadog Slack app. For EU customers who use Slack, stay informed about the Slack app by emailing support@datadoghq.com.

{{< img src="monitors/incidents/workflow-3-slack-1.png" alt="Communicate"  style="width:80%;">}}

### 4. Update the incident

Update the incident as the situation evolves. Set the status to `Stable` to indicate the problem has been mitigated, and set the customer impact field so that your organization knows how this issue has affected customers. Then, set the status to `Resolved` once the incident is completely fixed. There is an optional fourth status, `Completed`, that can be used to track if all remediation steps are complete. This status can be enabled in [Incident Settings][2]. 

{{< img src="monitors/incidents/workflow-4-update-2.png" alt="Update Incident"  style="width:60%;">}}

You can update the status and severity in the `Properties` section of each incident.

As the status of an incident changes, Datadog tracks time-to-resolution as follows:

| Status Transition | Resolved Timestamp |
| ------------------ | -----------|
| `Active` to `Resolved`, `Active` to `Completed` | Current time |
| `Active` to `Resolved` to `Completed`, `Active` to `Completed` to `Resolved` | Unchanged |
| `Active` to `Completed` to `Active` to `Resolved` | Overridden on last transition |

### 5. Follow up and learn from the incident

Link to a postmortem document, look back on exactly what went wrong, and add follow-up tasks. Postmortems created in Datadog [Notebooks][5] support live collaboration; to link to an existing notebook, click the plus under `Other Docs`. Click the linked notebook to edit with teammates in real-time.

{{< img src="monitors/incidents/workflow-5-postmortem-1.png" alt="Postmortem"  style="width:60%;">}}



[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[4]: https://app.datadoghq.com/incidents/ddslackapp
[5]: https://app.datadoghq.com/notebook/list
