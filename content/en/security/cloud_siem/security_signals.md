---
title: Security Signals
kind: documentation
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

A Cloud SIEM security signal is created when Datadog detects a threat based on a security rule. View, search, filter, and correlate security signals in the Signal Explorer without needing to learn a dedicated query language. You can either monitor signals from Datadog Security, or configure [Notification Rules][1] to send signals to third-party tools. Signals can be assigned to yourself or another user in the Datadog platform.

You must have the `Security Signals Write` permission to modify a security signal, such as change the state and view signal action history in the [Audit Trail][2]. See [Role Based Access Control][3] for more information about Datadog's default roles and granular role-based access control permissions available for Datadog Security in the Cloud Security.

## View signals by status in the Signal Explorer

The Security Signal Explorer displays all signals that your role permits you to view. Select **Security Signals** and filter the signals as follows:

1. To add the column **Signal State**, select the **Options** button in the top right corner above the table and add the facet: `@workflow.triage.state`. This displays signal status and allows you to sort by status through the header.
2. To search through signals by state, use the following search syntax `@workflow.triage.state:` and include the state (`open`, `under_review`, or `archived`) to filter on in the query.
3.You can also select the **Signal State** facet on the facet panel to filter on signals using facets.

## Investigate a signal

To change a signal's state, follow the instructions below:

1. Navigate to [Cloud SIEM][4].
1. Click **Signals**.
1. Select a security signal from the table.
1. To assign a signal to yourself or another Datadog user, navigate to the user profile icon with the plus sign in the top right corner of the signal side panel.
1. To update the status of the security signal, navigate to the top left corner of the signal side panel and select the status you want from the dropdown menu. The default status is `Open`.
    - **Open**: Datadog Security triggered a detection based on a rule, and the resulting signal is not yet resolved.
    - **Under Review**: During an active investigation, you can switch the signal state to **Under Review**. From the **Under Review** state, you can move the signal state to **Archived** or **Open** as needed.
    - **Archived**: When the detection that caused the signal has been resolved, you can transition it to the **Archived** state. If an archived issue resurfaces, or if further investigation is necessary, a signal can be changed back to an **Open** state within 30 days of being created.

### Declare an incident

Any security signal warning of a possible disruption to your organization's services can be considered an incident. It is often necessary to have a set framework for handling these threats. [Incident Management][5] provides a system to effectively identify and mitigate incidents.

To declare an incident:

1. Click the **Escalate Investigation** dropdown menu.
2. Select **Declare incident**.

### Case Management

You can create a case from a Cloud SIEM security signal to track, triage, and investigate your signals.

1. Click the **Escalate Investigation** dropdown menu.
2. Select **Create a case** to start a security investigation.
3. If a case is determined to be critical after further investigation, click **Declare Incident** in the case to escalate it to an incident. See [Case Management][6] for more information.

### Workflow automation

You can trigger a Workflow automatically for any Security Signal. You can also manually trigger a Workflow from a Cloud SIEM Security Signal. See [Trigger a Workflow from a Security Signal][7] for more information.

### Threat intelligence

Datadog Cloud SIEM's threat intelligence feeds are curated by threat intelligence partners. These feeds are constantly updated to include data about known suspicious activity (for example, indicators of compromise or IOCs), so you can quickly identify which potential threats to address.

Datadog automatically implements threat intelligence by analyzing all ingested logs that have relevant attributes. If a log contains a compromise indication, such as an anonymized IP tied to a VPN, proxy, or Tor exit node, a `threat_intel` attribute is appended to the log event to provide additional insights based on available intelligence.

The query to see all threat intelligence matches in the Security Signals Explorer is `@threat_intel.indicators_matched:*.` The following are additional attributes to query for threat intelligence:

- `@threat_intel.results.category "anonymizer", "scanner"``
- `@threat_intel.results.intention "malicious", "unknown"``
- `@threat_intel.results.subcategory options "proxy", "tor", "vpn"`
    **Note**: Proxy, Tor, and VPN subcategory attributes are provided only by threat intelligence partner IPinfo.

### Search by network IP attributes

When a suspicious activity is detected from your logs, determine whether the suspicious actor has interacted with your systems by searching for its network IP. Use the following query to search by IP attributes in the Log Explorer: `@network.ip.list:<IP address>`. The query searches IPs anywhere within the logs, including the tags, attributes, error, and message fields.

{{< img src="security/security_monitoring/explorer/network_ip_list.png" alt="The log explorer showing the result of a search using the network.ip.list attribute" style="width:80%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/notifications/rules/
[2]: /account_management/audit_trail/events/#cloud-security-platform-events
[3]: /account_management/rbac/
[4]: https://app.datadoghq.com/security/home
[5]: /service_management/incident_management/
[6]: /service_management/case_management/
[7]: /service_management/workflows/trigger/#trigger-a-workflow-from-a-security-signal
