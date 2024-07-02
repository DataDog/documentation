---
title: Investigate Security Signals
disable_toc: false
further_reading:
  - link: "/cloud_siem/detection_rules/"
    tag: "Documentation"
    text: "Learn about the conditional logic of detection rules"
  - link: "https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/"
    tag: "Blog"
    text: "Monitor 1Password with Datadog Cloud SIEM"
---

## Overview

A Cloud SIEM security signal is created when Datadog detects a threat while analyzing logs against detection rules. View, search, filter, and correlate security signals in the Signal Explorer without needing to learn a dedicated query language. You can also assign security signals to yourself or another user in the Datadog platform. In addition to the Signal Explorer, you can configure [Notification Rules][1] to send signals to specific individuals or teams to keep them informed of issues.

You must have the `Security Signals Write` permission to modify a security signal, such as change the state and view signal action history in [Audit Trail][2]. See [Role Based Access Control][3] for more information about Datadog's default roles and granular role-based access control permissions available for Datadog Security in the Cloud Security.

## Signal explorer
## Signal explorer

In the Signals Explorer, use the facet panel or search bar to group and filter your signals. For example, you can view signals by [their severity](#view-signals-by-severity), [detection rules](#view-signals-by-detection-rules), and [MITRE ATT&CK](#view-signals-by-mitre-attck). After you have filtered your signals to your use case, create a [saved view][4] so that you can reload your query later.

### View signals by severity

To view all signals with specific severities, for example `HIGH` and `CRITICAL`, that are in the `open` or `under review` triage state, do one of the following:
In the Signals Explorer, use the facet panel or search bar to group and filter your signals. For example, you can view signals by [their severity](#view-signals-by-severity), [detection rules](#view-signals-by-detection-rules), and [MITRE ATT&CK](#view-signals-by-mitre-attck). After you have filtered your signals to your use case, create a [saved view][4] so that you can reload your query later.

### View signals by severity

To view all signals with specific severities, for example `HIGH` and `CRITICAL`, that are in the `open` or `under review` triage state, do one of the following:

- In the facet panel's **Severity** section, select **Critical**, **High**, and **Medium**. In the **Signal State** section, make sure only **open** and **under_reviewed** are selected.
- In the search bar, enter `status:(high OR critical OR medium) @workflow.triage.state:(open OR under_review)`.

To add the column **Signal State**, select the **Options** button in the top right corner above the table and add the facet: `@workflow.triage.state`. This displays the signal status and allows you to sort by status through the header.

Use different visualizations to investigate the threat activity in your environment. For example, in the **Visualize by** field, you can group signals by:

- **Rules List** to see the volume and alerting trends across the different detection rules.
- **Timeseries** to view signal trends over time.
- **Top List** to see signals with the highest to lowest number of occurrences.
- **Table** to see signals by the specified tag key (for example, `source`, `technique`, and so on).
- **Pie Chart** to see the relative volume of each of the detection rules.
- **Rules List** to see the volume and alerting trends across the different detection rules.
- **Timeseries** to view signal trends over time.
- **Top List** to see signals with the highest to lowest number of occurrences.
- **Table** to see signals by the specified tag key (for example, `source`, `technique`, and so on).
- **Pie Chart** to see the relative volume of each of the detection rules.

{{< img src="security/security_monitoring/investigate_security_signals/signal_list2.png" alt="The Signal Explorer showing signals categorized by detection rules" style="width:100%;" >}}

### View signals by detection rules

To view your signals based on detections rules, click **Rules List** in the **Visualize as** field under the search bar. Click on a rule to see the signals related to that rule. Click on a signal to see the signal details.

### View signals by MITRE ATT&CK

To view your signals by MITRE ATT&CK Tactic and Technique:
1. Select **Table** in the **Visualize as** field under the search bar, and group by **Tactic**.
1. Click the plus icon next to the first group `by` to add a second group `by`, and select **Technique** for it.
1. In the table, click one of the tactics or techniques to see options to further drill down and filter the signals. For example, you can view signals related to the tactic and technique and search for or exclude specific tactics and techniques.

{{< img src="security/security_monitoring/investigate_security_signals/tactics_techniques.png" alt="The Signal Explorer table showing a list of tactics and techniques" style="width:100%;" >}}

## Triage security signals

You can triage a [single signal](#triage-a-single-signal) or [multiple signals](#triage-multiple-signals) at once and run [workflow automations](#run-workflow-automation) to help remediate the threat. During your investigation you can also [collaborate](#collaborate) with other team members using [Case Management](#case-management) or by [declaring an incident](#declare-an-incident).

### Triage a single signal

1. Navigate to [Cloud SIEM][5].
1. Click the **Signals** tab at the top of the page.
1. Click on a security signal from the table.
1. In the **What Happened** section, see the logs that matched the query. Hover over the query to see the query details.
    - You can also see specific information like username or network IP. Click the funnel icon to create a suppression rule or add the information to an existing suppression. See [Create suppression rule][11] for more details.
1. In the **Signal Status & Assignee** section:   
  a. Click the dropdown to change the triage status of the signal. The default status is `OPEN`.
      - `Open`: Datadog Security triggered a detection based on a rule, and the resulting signal is not yet resolved.
      - `Under Review`: During an active investigation, you can switch the signal state to `Under Review`. From the `Under Review` state, you can move the signal state to `Archived` or `Open` as needed.
      - `Archived`: When the detection that caused the signal has been resolved, you can transition it to the `Archived` state. If an archived issue resurfaces, or if further investigation is necessary, a signal can be changed back to an `Open` state within 30 days of being created.</ul>
  b. Click **Assign Signal** to assign a signal to yourself or another Datadog user.

### Triage multiple signals

Use bulk actions to triage multiple signals. To use bulk actions, first search and filter your signals in the Signal Explorer, then:

1. Click on the checkbox to the left of the signals that you want to take a bulk action on. To select all signals in the Signal Explorer list, select the checkbox next to the **Status** column header.
1. Click on the **Bulk Actions** dropdown menu above the signals table and select the action you want to take.

**Note**: The Signals Explorer stops dynamically updating when performing a bulk action.

{{< img src="security/security_monitoring/investigate_security_signals/bulk_actions2.png" alt="The Signal Explorer showing the bulk action option" style="width:55%;" >}}

### Run Workflow automation

Use Workflow Automations to carry out actions to help you investigate and remediate a signal. These actions can include:
- Blocking an IP address from your environment.
- Disabling a user account.
- Looking up an IP address with a third party threat intelligence provider.
- Sending slack messages to your colleagues to get help with your investigation.

In the signal side panel, click the **Workflows** tab to see which workflows were triggered for the signal. Click **Run Workflow** to manually trigger a workflow for the signal. You can also manually trigger a workflow from the **Next Steps** section at the top of the signal panel.

To trigger a Workflow automatically for any Security Signal, see [Trigger a Workflow from a Security Signal][8] and [Automate Security Workflows with Workflow Automation][9] for more information.

## Investigate

A signal contains important information to determine whether a signal is malicious or not. Additionally, you can add a signal to a case in Case Management for further investigation.

### Logs

Click the **Logs** tab to view the logs related to the signal. Click **View All Related Logs** to see the related logs in the Log Explorer.

### Entities

To investigate entities related to the signal:

1. Click the **Entities** tab to see entities related to the signal, such as IP addresses.
1. Click **View Related Logs** to see logs related to that entity in the Log Explorer.
1. Click the down arrow next to **View Relate Logs** and you can:   
    - Select **View IP Dashboard** to see more information about the IP address in the IP Investigation dashboard.
    - Select **View Related Signals** to open the Signals Explorer and see the other signals associated with the IP address.
1. For cloud environment entities, such as an assumed role or IAM user, click **View in Investigator** to go to the Investigator to get more details.

### Related signals

Click the **Related Signals** tab to see the related signals and what information, such as fields and attributes, the signals share. Click **View All Related Activity** to see the signals in the Signal Explorer.

### Suppressions

Do one of the following to view the suppression rules affecting the detection rule that generated the signal:

- Click the **Suppressions** tab to see a list of suppressions, if there are any. Click **Edit Suppressions** to go to the detection rule editor to see the suppression section of that rule.
- In the **Next Steps** section, click **Edit Suppressions** to go to the detection rule editor to see the suppression section of that rule.

## Collaborate

### Case Management

Sometimes you need more information than what is available in a single signal to investigate the signal. Use [Case Management][6] to collect multiple signals, create timelines, discuss with colleagues, and keep a notebook of the analysis and findings.

To create a case from a security signal:

1. Click **Create Case** in the **Next Steps** section to create a new case. If you want to add the signal to an existing case, click the down arrow next to **Create Case** and select **Add to an existing case**.
1. Fill in the information for the case.
1. Click **Create Case**.

The signal is automatically assigned to the user who created the case and the signal status is automatically changed to `Under Review`.

After a case is created, hover over the **Case** button to see the case associated with the signal.


**Note**: If a case is determined to be critical after further investigation, click **Declare Incident** in the case to escalate it to an incident.

### Declare an incident

Whether it is based on a single signal or after an investigation of a case, certain malicious activity demands a response. You can declare incidents in Datadog to bring together developers, operations, and security teams to address a critical security event. [Incident Management][7] provides a framework and workflow to help teams effectively identify and mitigate incidents.

To declare an incident in the signal panel:

1. Click **Declare Incident** in the **Next Steps** section.
1. Fill out the incident template.

If you want to add the signal to an incident, click the down arrow next to **Declare Incident** and select the incident you want to add the signal to. Click **Confirm**.

### Threat intelligence

Datadog Cloud SIEM offers integrated threat intelligence provided by our threat intelligence partners. These feeds are constantly updated to include data about known suspicious activity (for example, IP addresses known to be used by malicious actors), so that you can quickly identify which potential threats to address.

Datadog automatically enriches all ingested logs for indicators of compromise (IOCs) from our threat intelligence feeds. If a log contains a match to a known IOC, a `threat_intel` attribute is appendeded to the log event to provide additional insights based on available intelligence.

The query to see all threat intelligence matches in the Security Signals Explorer is `@threat_intel.indicators_matched:*`. The following are additional attributes to query for threat intelligence:

- For `@threat_intel.results.category`: attack, corp_vpn, cryptomining, malware, residential_proxy, tor, scanner
- For `@threat_intel.results.intention`: malicious, suspicious, benign, unknown

{{< img src="security/security_monitoring/investigate_security_signals/threat_intel_results_categories.png" alt="The Signal Explorer showing a bar graph of signals broken down by the threat intel categories of residential proxy, corp_vpn, cryptomining, and malware" style="width:80%;" >}}

See the [Threat Intelligence][10] documentation for more information on threat intelligence feeds.

### Search by network IP attributes

When a suspicious activity is detected from your logs, determine whether the suspicious actor has interacted with your systems by searching for its network IP. Use the following query to search by IP attributes in the Log Explorer: `@network.ip.list:<IP address>`. The query searches IPs anywhere within the logs, including the tags, attributes, error, and message fields.

You can also launch this query directly from the signal panel:
1. Click on the IP address in the **Context** section.
2. Select **View Logs with @network.client.ip:<ip_address>**.

{{< img src="security/security_monitoring/investigate_security_signals/threat_intel_view_logs.png" alt="The signal panel showing the threat options for the selected IP address" style="width:70%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/notifications/rules/
[2]: /account_management/audit_trail/events/#cloud-security-platform-events
[3]: /account_management/rbac/
[4]: /logs/explorer/saved_views/
[5]: https://app.datadoghq.com/security/home
[6]: /service_management/case_management/
[7]: /service_management/incident_management/
[8]: /service_management/workflows/trigger/#trigger-a-workflow-from-a-security-signal
[9]: /security/cloud_security_management/workflows/
[10]: /security/threat_intelligence
[11]: /security/suppressions/#create-a-suppression-rule