---
title: Investigate Security Signals
disable_toc: false
aliases:
  - /security/cloud_siem/investigate_security_signals
further_reading:
  - link: "/cloud_siem/detection_rules/"
    tag: "Documentation"
    text: "Learn about the conditional logic of detection rules"
  - link: "https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/"
    tag: "Blog"
    text: "Monitor 1Password with Datadog Cloud SIEM"
  - link: "https://www.datadoghq.com/blog/cloud-siem-whats-new-rsa-2026"
    tag: "Blog"
    text: "What's new in Cloud SIEM: AI-powered investigations, enhanced threat intelligence, and scalable security operations"
---

## Overview

A Cloud SIEM security signal is created when Datadog detects a threat while analyzing logs against detection rules. View, search, filter, and correlate security signals in the Signals Explorer without needing to learn a dedicated query language. You can also assign security signals to yourself or another user in the Datadog platform. In addition to the Signals Explorer, you can configure [Notification Rules][1] to send signals to specific individuals or teams to keep them informed of issues.

You must have the `Security Signals Write` permission to modify a security signal, such as change the state and view signal action history in [Audit Trail][2]. See [Role Based Access Control][3] for more information about Datadog's default roles and granular role-based access control permissions available for Datadog Security in the Cloud Security.

## Signals explorer

In the Signals Explorer, use the facet panel or search bar to group and filter your signals. For example, you can view signals by [their severity](#view-signals-by-severity), [detection rules](#view-signals-by-detection-rules), and [MITRE ATT&CK](#view-signals-by-mitre-attck). After you have filtered your signals to your use case, create a [saved view][4] so that you can reload your query later.

### View signals by severity

To view all signals with specific severities, for example `HIGH` and `CRITICAL`, that are in the `open` or `under review` triage state, do one of the following:

- In the facet panel's {{< ui >}}Severity{{< /ui >}} section, select {{< ui >}}Critical{{< /ui >}}, {{< ui >}}High{{< /ui >}}, and {{< ui >}}Medium{{< /ui >}}. In the {{< ui >}}Signal State{{< /ui >}} section, make sure only {{< ui >}}open{{< /ui >}} and {{< ui >}}under_reviewed{{< /ui >}} are selected.
- In the search bar, enter `status:(high OR critical OR medium) @workflow.triage.state:(open OR under_review)`.

To add the column {{< ui >}}Signal State{{< /ui >}}, select the {{< ui >}}Options{{< /ui >}} button in the top right corner above the table and add the facet: `@workflow.triage.state`. This displays the signal status and allows you to sort by status through the header.

Use different visualizations to investigate the threat activity in your environment. For example, in the {{< ui >}}Visualize by{{< /ui >}} field, you can group signals by:

- {{< ui >}}Rules List{{< /ui >}} to see the volume and alerting trends across the different detection rules.
- {{< ui >}}Timeseries{{< /ui >}} to view signal trends over time.
- {{< ui >}}Top List{{< /ui >}} to see signals with the highest to lowest number of occurrences.
- {{< ui >}}Table{{< /ui >}} to see signals by the specified tag key (for example, `source`, `technique`, and so on).
- {{< ui >}}Pie Chart{{< /ui >}} to see the relative volume of each of the detection rules.

{{< img src="security/security_monitoring/investigate_security_signals/signal_list2.png" alt="The Signals Explorer showing signals categorized by detection rules" style="width:100%;" >}}

### View signals by detection rules

To view your signals based on detections rules, click {{< ui >}}Rules List{{< /ui >}} in the {{< ui >}}Visualize as{{< /ui >}} field under the search bar. Click on a rule to see the signals related to that rule. Click on a signal to see the signal details.

### View signals by MITRE ATT&CK

To view your signals by MITRE ATT&CK Tactic and Technique:
1. Select {{< ui >}}Table{{< /ui >}} in the {{< ui >}}Visualize as{{< /ui >}} field under the search bar, and group by {{< ui >}}Tactic{{< /ui >}}.
1. Click the plus icon next to the first group `by` to add a second group `by`, and select {{< ui >}}Technique{{< /ui >}} for it.
1. In the table, click one of the tactics or techniques to see options to further investigate and filter the signals. For example, you can view signals related to the tactic and technique and search for or exclude specific tactics and techniques.

{{< img src="security/security_monitoring/investigate_security_signals/tactics_techniques.png" alt="The Signals Explorer table showing a list of tactics and techniques" style="width:100%;" >}}

### Triage a single signal

1. In Datadog, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Cloud SIEM{{< /ui >}} > [{{< ui >}}Signals{{< /ui >}}][5].
1. Click on a security signal from the table.
1. In the {{< ui >}}What Happened{{< /ui >}} section, see the logs that matched the query. Hover over the query to see the query details.
    - You can also see specific information like username or network IP. In {{< ui >}}Rule Details{{< /ui >}}, click the funnel icon to create a suppression rule or add the information to an existing suppression. See [Create suppression rule][11] for more details.
1. In the {{< ui >}}Next Steps{{< /ui >}} section:
   1. Under {{< ui >}}Triage{{< /ui >}}, click the dropdown to change the triage status of the signal. The default status is `OPEN`.
      - `Open`: Datadog Security triggered a detection based on a rule, and the resulting signal is not yet resolved.
      - `Under Review`: During an active investigation, change the triage status to `Under Review`. From the `Under Review` state, you can move the status to `Archived` or `Open` as needed.
      - `Archived`: When the detection that caused the signal has been resolved, update the status to `Archived`. When a signal is archived, you can give a reason and description for future reference. If an archived issue resurfaces, or if further investigation is necessary, the status can be changed back to `Open`. All signals are locked 30 days after they have been created.</ul>
   1. Click {{< ui >}}Assign Signal{{< /ui >}} to assign a signal to yourself or another Datadog user.
   1. Under {{< ui >}}Take Action{{< /ui >}}, you can create a case, declare an incident, edit suppressions, or run workflows. Creating a case automatically sets the triage status to `Under Review`. For more information on associating cases with signals, see [Case Management](#case-management).

{{< img src="security/security_monitoring/investigate_security_signals/signal_side_panel.png" alt="The signal side panel of a compromised AWS IAM user access key showing two IP addresses and their locations" style="width:90%;" >}}

### Triage multiple signals

Use bulk actions to triage multiple signals. To use bulk actions, first search and filter your signals in the Signals Explorer, then:

1. Click on the checkbox to the left of the signals that you want to take a bulk action on. To select all signals in the Signals Explorer list, select the checkbox next to the {{< ui >}}Status{{< /ui >}} column header.
1. Click on the {{< ui >}}Bulk Actions{{< /ui >}} dropdown menu above the signals table and select the action you want to take.

**Note**: The Signals Explorer stops dynamically updating when performing a bulk action.

{{< img src="security/security_monitoring/investigate_security_signals/bulk_actions2.png" alt="The Signals Explorer showing the bulk action option" style="width:55%;" >}}

### Run Workflow Automation

Use Workflow Automation to carry out actions to help you investigate and remediate a signal. These actions can include:
- Block an IP address from your environment.
- Disable a user account.
- Look up an IP address with a third-party threat intelligence provider.
- Send Slack messages to your colleagues to get help with your investigation.

Click the {{< ui >}}Workflows{{< /ui >}} tab in the signal side panel to see which workflows were triggered for the signal and suggested Workflows to run. If you want to run a suggested Workflow, click {{< ui >}}Run Workflow{{< /ui >}}. See [How suggested Workflows are selected](#how-suggested-workflows-are-selected) for more information. If the workflow requires additional input variables, a dialog box appears and prompts you to enter any required values before proceeding.

If you don't see the Workflow you want to run in the list, click {{< ui >}}Search and Run Workflow{{< /ui >}}. In the workflow browser, search and select a workflow to run.

Alternatively, you can also select {{< ui >}}Run Workflows{{< /ui >}} in the {{< ui >}}Next Steps{{< /ui >}} section to search for and run a Workflow.

To trigger a workflow automatically for any security signal, see [Trigger a Workflow from a Security Signal][8] and [Automate Security Workflows with Workflow Automation][9] for more information.

#### How suggested Workflows are selected

To streamline incident response and reduce friction during triage, Cloud SIEM suggests Workflows that are relevant to the signal. The suggested Workflows are selected based on which ones have the highest tag similarity with the signal. Cloud SIEM uses the following information to suggest Workflows for a signal:

- **Tags automatically added from Blueprints, which are preconfigured flows**<br>
Workflows are a set of actions that are relevant to the platform, such as AWS CloudTrail. Workflows created from a Blueprint automatically have tags applied based on the source. For example, a workflow action such as "Shutdown virtual machine on AWS" has the `source` tag AWS CloudTrail.
- **Tags you added manually**<br>
You can customize which workflows are prioritized by manually adding tags to both Blueprint-derived and custom workflows.To ensure correct contextual matching, these tags should match those found on the signal, the logs that generated the alert, or the detection rule itself.
- **Tagging strategy**<br>
To ensure a workflow appears for a given signal, the workflow must include tags similar to those of the signal. A common signal tag is the signal's source or service. For example, signals from AWS resources are typically tagged with `source:cloudtrail`. By tagging a workflow with `source:cloudtrail`, the workflow is associated with signals related to AWS activity.<br>
If you want a Workflow to be suggested for a specific detection rule, tag the Workflow with that detection rule ID (for example, `ruleId:abc-123-xyz`).

When a signal is created:

- **Signals and workflows are matched using tags**<br>
When a security signal is created, Cloud SIEM checks the signal's tags, and matches them against tags defined in your existing workflows.
- **Relevant suggestions are made**<br>
A {{< ui >}}Suggested Workflows{{< /ui >}} section appears in the side panel. It shows the top three workflows based on tags that match closest to the tags on the signal. This ensures that suggested actions are context-aware and operationally relevant.

## Investigate

A signal contains important information to determine whether the threat detected is malicious. Additionally, you can add a signal to a case in [Case Management](#case-management) for further investigation.

### Logs

Click the {{< ui >}}Logs{{< /ui >}} tab to view the logs related to the signal. Click {{< ui >}}View All Related Logs{{< /ui >}} to see the related logs in Log Explorer.

### Entities

To investigate entities:

1. Click the {{< ui >}}Entities{{< /ui >}} tab to see entities related to the signal, such as users or IP addresses.
1. Click the down arrow next to {{< ui >}}View Related Logs{{< /ui >}} and:
    - Select {{< ui >}}View IP Dashboard{{< /ui >}} to see more information about the IP address in the IP Investigation dashboard.
    - Select {{< ui >}}View Related Signals{{< /ui >}} to open Signals Explorer and see the other signals associated with the IP address.
1. For cloud environment entities, such as an assumed role or IAM user, view the activity graph to see what other actions the user took. Click {{< ui >}}View in Investigator{{< /ui >}} to go to the Investigator to see more details.

### Related signals

Click the {{< ui >}}Related Signals{{< /ui >}} tab to see the related signals and information, such as fields and attributes, that the signals share. Click {{< ui >}}View All Related Activity{{< /ui >}} to see the signals in the Signals Explorer.

### Suppressions

To view the suppression rules for the detection rule that generated the signal, do one of the following:

- In the {{< ui >}}What Happened{{< /ui >}} section, hover your mouse over the funnel icon, then click {{< ui >}}Add Suppression{{< /ui >}}.
- In the {{< ui >}}Next Steps{{< /ui >}} section, click {{< ui >}}Edit Suppressions{{< /ui >}} to see the suppression section of that rule in the detection rule editor.
- Click the {{< ui >}}Suppressions{{< /ui >}} tab to see a list of suppressions, if there are any. Click {{< ui >}}Edit Suppressions{{< /ui >}} to go to the detection rule editor to see the suppression section of that rule.

## Collaborate

### Case Management

Sometimes you need more information than what is available in a single signal to investigate the signal. Use [Case Management][6] to collect multiple signals, create timelines, discuss with colleagues, and keep a notebook of the analysis and findings.

#### Create and manage cases from the Signals Explorer

In the [Signals Explorer][5], when you use the {{< ui >}}List{{< /ui >}} visualization, the {{< ui >}}Cases{{< /ui >}} column contains information about cases associated with signals. You can use that column to manage those cases:
- To manage cases for a single signal, use the {{< ui >}}Cases{{< /ui >}} column:
  - If the signal has cases associated with it, you can roll over the case ID to view information about them, open them in a new window, or unlink them from the signal.
  - If the signal doesn't have any cases associated with it, click the {{< ui >}}Create Case{{< /ui >}} icon to either create a case or select an existing case to associate with the signal. The Create Case window opens.
    - To create a case, in the {{< ui >}}Create Case{{< /ui >}} window, enter the {{< ui >}}Project{{< /ui >}}, {{< ui >}}Title{{< /ui >}}, {{< ui >}}Description{{< /ui >}}, and {{< ui >}}Assignee{{< /ui >}}, then click {{< ui >}}Create Case{{< /ui >}}.
    - To select an existing case, in the {{< ui >}}Create Case{{< /ui >}} window, click the {{< ui >}}Add to Existing Case{{< /ui >}} tab. Select a case and click {{< ui >}}Attach to an Existing Case{{< /ui >}}.
- To manage cases for multiple signals:
  1. Select the signals you want to link to a case.
  1. In the {{< ui >}}Bulk Actions{{< /ui >}} list that appears, click {{< ui >}}Create a Case{{< /ui >}} or {{< ui >}}Add to Existing Case{{< /ui >}}. The Create Case window opens.
     - To create a case, in the {{< ui >}}Create Case{{< /ui >}} window, enter the {{< ui >}}Project{{< /ui >}}, {{< ui >}}Title{{< /ui >}}, {{< ui >}}Description{{< /ui >}}, and {{< ui >}}Assignee{{< /ui >}}, then click {{< ui >}}Create Case{{< /ui >}}.
     - To select an existing case, in the {{< ui >}}Create Case{{< /ui >}} window, click the {{< ui >}}Add to Existing Case{{< /ui >}} tab. Select a case and click {{< ui >}}Attach to an Existing Case{{< /ui >}}.

When a user creates a case, the following automatic changes happen by default:
- The triage status is automatically set to `Under Review`.
- The assignee is set to that user.

To change these defaults, see [Manage default behavior for signals and security cases](#manage-default-behavior-for-signals-and-security-cases).

**Note**: If a case is determined to be critical after further investigation, click {{< ui >}}Declare Incident{{< /ui >}} in the case to escalate it to an incident.

#### Manage security-related cases

The [Cases][12] page allows you to view cases specifically for your security projects. You can filter cases so you only see the ones that are assigned to or created by you, or cases that have a specific status or are in a specific project. You can also star projects to make them easier to navigate to.

In the {{< ui >}}Security Signals{{< /ui >}} section for a case, you can view signals associated with it, and click {{< ui >}}Add Signals{{< /ui >}} to search for filters to associate with the case.

#### Manage default behavior for signals and security cases

On the Cloud SIEM [Security cases][13] settings page, you can manage the default behavior for signals and security cases, so you can save time when you connect signals and security cases with each other, manually or automatically. The settings you choose take effect immediately for all signals and security cases moving forward; they do not have any retroactive effect.

- **Case Project Settings**

  Select your default Cloud SIEM security case project, and other security projects to select from:
  - **Default SIEM Security Case Project**: Select the project to appear by default when you're connecting security cases to a project. This project also appears as the default project on the Cloud SIEM [Cases][12] page.
  - **Security Case project scoping**: Select up to 20 security case projects that you can choose from to connect security cases with.

- **Case Creation Defaults**

  When you create a case from one or more signals, you can choose to use values from the signal for the case, leave the values empty, or assign them static values, depending on the case field.
  <div class="alert alert-tip">Click <strong>Show signal to case correlation scheme</strong> to see how Datadog maps signal status to case status, and signal severity to case priority.</div>

- **Signal Attachment Settings**

  When you attach signals to a case, select the default values to assign to those signals.
  <div class="alert alert-tip">Click <strong>Show case to signal archive reason mapping</strong> to see how Datadog maps the reason for resolving the case to the reason for archiving the signal.</div>

  - **When being attached to a case**:
    - **Signal Status** and **Signal Assignee**: When you attach signals to a case, choose to either keep the signal status and assignee, or to assign specific values to them.
    - **Allow Override**: Turn on this toggle to allow to override existing values in those fields. If this toggle is off, the selected status and assignee apply only when those fields are empty.
  - **When updating a case**:
    - **Signal Status**: Choose to either assign a status to the signal that corresponds with the case, or to leave it as-is.

### Declare an incident

Whether it is based on a single signal or after an investigation of a case, certain malicious activity demands a response. You can declare incidents in Datadog to bring together developers, operations, and security teams to address a critical security event. [Incident Management][7] provides a framework and workflow to help teams effectively identify and mitigate incidents.

To declare an incident in the signal panel:

1. Click {{< ui >}}Declare Incident{{< /ui >}} in the {{< ui >}}Next Steps{{< /ui >}} section.
1. Fill out the incident template.

If you want to add the signal to an incident, click the down arrow next to {{< ui >}}Declare Incident{{< /ui >}} and select the incident you want to add the signal to. Click {{< ui >}}Confirm{{< /ui >}}.

### Threat intelligence

Datadog Cloud SIEM offers integrated threat intelligence provided by our threat intelligence partners. These feeds are constantly updated to include data about known suspicious activity (for example, IP addresses known to be used by malicious actors), so that you can quickly identify which potential threats to address.

Datadog automatically enriches all ingested logs for indicators of compromise (IOCs) from its threat intelligence feeds. If a log contains a match to a known IOC, a `threat_intel` attribute is appended to the log event to provide additional insights based on available intelligence.

The query to see all threat intelligence matches in the Security Signals Explorer is `@threat_intel.indicators_matched:*`. The following are additional attributes to query for threat intelligence:

- For `@threat_intel.results.category`: attack, corp_vpn, cryptomining, malware, residential_proxy, tor, scanner
- For `@threat_intel.results.intention`: malicious, suspicious, benign, unknown

{{< img src="security/security_monitoring/investigate_security_signals/threat_intel_results_categories.png" alt="The Signals Explorer showing a bar graph of signals broken down by the threat intel categories of residential proxy, corp_vpn, cryptomining, and malware" style="width:80%;" >}}

See the [Threat Intelligence][10] documentation for more information on threat intelligence feeds.

### Search by network IP attributes

When a suspicious activity is detected from your logs, determine whether the suspicious actor has interacted with your systems by searching for its network IP. Use the following query to search by IP attributes in the Log Explorer: `@network.ip.list:<IP address>`. The query searches IPs anywhere within the logs, including the tags, attributes, error, and message fields.

You can also launch this query directly from the signal panel:
1. Click on the IP address in the {{< ui >}}IPS{{< /ui >}} section.
2. Select {{< ui >}}View Logs with @network.client.ip:<ip_address>{{< /ui >}}.

{{< img src="security/security_monitoring/investigate_security_signals/search_logs_by_ip.png" alt="The signal panel showing the threat options for the selected IP address" style="width:90%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/notifications/rules/
[2]: /account_management/audit_trail/events/#cloud-security-platform-events
[3]: /account_management/rbac/
[4]: /logs/explorer/saved_views/
[5]: https://app.datadoghq.com/security/siem/signals
[6]: /incident_response/case_management/
[7]: /incident_response/incident_management/
[8]: /actions/workflows/trigger/#trigger-a-workflow-from-a-security-signal
[9]: /security/cloud_security_management/workflows/
[10]: /security/threat_intelligence
[11]: /security/suppressions/#create-a-suppression-rule
[12]: https://app.datadoghq.com/security/siem/cases
[13]: https://app.datadoghq.com/security/configuration/siem/case-management
