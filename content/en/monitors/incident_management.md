---
title: Incident Management
kind: documentation
disable_toc: true
description: Create and manage incidents
---

{{< img src="monitors/incidents/incidents-top-1.png" alt="Incident Management"  style="width:80%;">}}

## Overview

Any event that may lead to a disruption in your organization’s services can be described as an incident, and it is often necessary to have a set framework for handling these events. Datadog’s Incident Management feature provides a system through which your organization can effectively identify and mitigate incidents. 

Incidents live in Datadog alongside the metrics, traces, and logs you are collecting. You can view and filter incidents that are relevant to you.

In the Datadog paradigm, any of the following are appropriate situations for declaring an incident:

* An issue is or may be impacting customers or services.
* You do not know whether you should call an incident. Notify other people and increase severity appropriately.

<div class="alert alert-warning">
<a href="https://app.datadoghq.com/incidents">Incident Management</a> is currently in beta and available to all customers. For more information, reach out to sales@datadoghq.com.
</div>

## Usage

Incident Management requires no installation. To view your incidents, go to the [Incidents][1] page for a feed of all ongoing incidents. You can configure additional fields that appear for all incidents in [Incident Settings][2].

### Creating an incident

You can declare an incident directly from a graph. You can also go to the upper right hand side of the Incidents page and click on “New Incident”. The following dialog box appears.

{{< img src="monitors/incidents/create-1-1.png" alt="New Incident"  style="width:80%;">}}

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

### Example workflow

#### 1. Discover an issue

Consider a scenario in which you are looking at a dashboard, and you notice that one particular service is showing an especially high error count. Using the Export button in the upper right of a widget, you can declare an incident.

{{< img src="monitors/incidents/workflow-1-graph-1.png" alt="From Graph"  style="width:80%;">}}

#### 2. Declare an incident and assemble your team

Use the New Incident modal to assemble your team and notify them. The graph from which you created the incident is automatically attached as a signal. Attach any other signals that would give your team the necessary context to begin resolving this issue. The Slack and PagerDuty integrations enable you to send notifications through those services.

{{< img src="monitors/incidents/workflow-2-modal-1.png" alt="New Incident"  style="width:60%;">}}

#### 3. Communicate and begin troubleshooting

If you have the [Datadog Slack app][3] installed, the Slack integration can automatically create a new channel dedicated to the incident, so you can consolidate communication with your team and begin troubleshooting.

For non-EU customers who use Slack, [sign up for beta access][4] to the Datadog Slack app. For EU customers who use Slack, stay informed about the Slack app by emailing support@datadoghq.com.

{{< img src="monitors/incidents/workflow-3-slack-1.png" alt="Communicate"  style="width:80%;">}}

#### 4. Update the incident

Update the incident as the situation evolves. Set the status to `Stable` to indicate the problem has been mitigated, and set the customer impact field so that your organization knows how this issue has affected customers. Then, set the status to `Resolved` once the incident is completely fixed. There is an optional fourth status, `Completed`, that can be used to track if all remediation steps are complete. This status can be enabled in [Incident Settings][2]. 

{{< img src="monitors/incidents/workflow-4-update-2.png" alt="Update Incident"  style="width:60%;">}}

You can update the status and severity in the `Properties` section of each incident.

As the status of an incident changes, Datadog tracks time-to-resolution as follows:

| Status Transition | Resolved Timestamp |
| ------------------ | -----------|
| `Active` to `Resolved`, `Active` to `Completed` | Current time |
| `Active` to `Resolved` to `Completed`, `Active` to `Completed` to `Resolved` | Unchanged |
| `Active` to `Completed` to `Active` to `Resolved` | Overridden on last transition |

#### 5. Follow up and learn from the incident

Link to a postmortem document, look back on exactly what went wrong, and add follow-up tasks. Postmortems created in Datadog [Notebooks][5] support live collaboration; to link to an existing notebook, click the plus under `Other Docs`. Click the linked notebook to edit with teammates in real-time.

{{< img src="monitors/incidents/workflow-5-postmortem-1.png" alt="Postmortem"  style="width:60%;">}}



[1]: https://app.datadoghq.com/incidents
[2]: https://app.datadoghq.com/incidents/settings
[3]: /integrations/slack/?tab=slackapplicationbeta#using-the-slack-app
[4]: https://app.datadoghq.com/incidents/ddslackapp
[5]: https://app.datadoghq.com/notebook/list
