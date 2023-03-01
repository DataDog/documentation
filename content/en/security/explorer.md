---
title: Security Signals Explorer
kind: documentation
description: "Search through all of your security signals and perform Security Analytics"
aliases:
  - /security_monitoring/explorer/
  - /cloud_siem/explorer/
  - /security_platform/explorer
further_reading:
  - link: "https://www.datadoghq.com/blog/announcing-security-monitoring/"
    tag: "Blog"
    text: "Learn more about Cloud SIEM"
  - link: "/cloud_siem/detection_rules/"
    tag: "Documentation"
    text: "Learn about the conditional logic of detection rules"
  - link: "https://www.datadoghq.com/blog/secure-serverless-applications-with-datadog-asm/"
    tag: "Blog"
    text: "Secure serverless applications with Datadog ASM"
---

## Overview

From the [Security Signals Explorer][1], correlate and triage security signals. You can also access [Cloud SIEM][2], [Posture Management][3], [Workload Security][4], and [Application Security Management][5] dashboards from this page.

## Explore your Security Signals

The Security Signals search results are displayed in the Security Signals Table.

{{< img src="security/security_monitoring/explorer/security_signals_table.png" alt="The Security Signals table showing two account takeover signals" >}}

Filter the contents of the table with the list of available facets. Configure the content of your Security Signals Table according to your needs and preferences with the **Options** button in the upper right.

## Inspect a Security Signal

Click on any Security Signal to open the Security Signal Panel and see more details about it.

{{< img src="security/security_monitoring/explorer/signal_panel.png" alt="The Security Signal panel showing a critical signal for AWS S3 Public access block removed" style="width:80%;" >}}

The details and actions you need first when triaging an issue can be found in the top portion of the Security Signal Panel. From here, you can determine the severity of the signal, when it was generated, access the rule settings, change the state of the signal and quickly share or assign this signal to a teammate.

The first seen and last seen date are updated, if new data is made available from the past or the attack continues. For Cloud SIEM and Cloud Workload Security signals, a "What Happened" section is displayed in the Overview tab and any configured group bys or rule customizations related to the detection rule is displayed. This example detection rule is configured with a group by of `usr.name`. Finally, any tags which are set on the detection rule are displayed below the group bys in the header for CSPM findings and in the Context section for Cloud SIEM and Cloud Workload Security signals.

To better understand activity, the Security Signal Panel summarizes tags and attributes from all logs that trigger a signal so you can troubleshoot without having to pivot to Log Explorer. For example, in the Context section, you can determine at a glance the list of IPs attempting to log into a user account, or the AWS accounts and availability zones running the authentication service.

Below the header of Cloud SIEM and Cloud Workload Security signals are tabs with detailed information related to the signal:

- `Overview` displays why the rule generated a security signal in the What Happened section, including group by tag and customization based on rule type. In addition, context information and JSON associated to the signal is displayed.
- `Rule Details` displays rule details, such as the text configured in the detection rule to help the person reviewing the signal understand the purpose of the signal and how to respond. The users can also pivot into rule modification, such as modifying suppression queries for the rule.
- `Logs` includes a visualization and list of log samples to provide context on why the signal triggered. Click on any of the samples in the table to see the full log.
- `Related Signals` are displayed as a timeline of other signals which contain the same group by values to assist with triaging the signal.
- `Suggested Actions (beta)` provides investigation queries, related dashboards, and links to cloud provider consoles based on Security Signal characteristics that guide investigations and provide insights to a resolution.

Below the header of Cloud Security Posture Management signals are tabs with detailed information related to the signal:
- `Message` displays the text configured in the detection rule to help the person reviewing the signal understand the purpose of the signal and how to respond.
- `Findings` includes a list of each resource that has been evaluated by the rule.
- `Related Issues` includes a list of other signals which contain the same group by values to assist with triaging the signal.

### Threat intelligence

Datadog Cloud SIEM offers threat intelligence feeds curated by threat intelligence partners. These feeds are constantly updated to include data about known suspicious activity (for example, indicators of compromise or IOCs), so you can quickly identify which potential threats to address.

{{< img src="security/security_monitoring/explorer/threat_intel.png" alt="Threat Intelligence in the Security Signals Explorer" style="width:85%;" >}}

Datadog automatically implements threat intelligence by analyzing all ingested logs that have relevant attributes. If a log contains a compromise indication, such as an anonymized IP tied to a VPN, proxy, or Tor exit node, a `threat_intel` attribute is append to the log event to provide additional insights based on available intelligence.

The query to see all threat intelligence matches in the Security Signals Explorer is `@threat_intel.indicators_matched:*`. The following are additional attributes to query for threat intelligence:

* `@threat_intel.results.category “anonymizer”, “scanner”`
* `@threat_intel.results.intention “malicious”, “unknown”`
* `@threat_intel.results.subcategory options "proxy", "tor", "vpn"`
    **Note**: Proxy, Tor, and VPN subcategory attributes are provided only by threat intelligence partner IPinfo.

### Search by network IP attributes

When Datadog Cloud SIEM detects suspicious activity from your logs, determine whether the suspicious actor has interacted with your systems by searching for its network IP. Use the following query to search by IP attributes in the Log Explorer: `@network.ip.list:<IP address>`. The query searches IPs anywhere within the logs, including the tags, attributes, error, and message fields.

{{< img src="security/security_monitoring/explorer/network_ip_list.png" alt="The log explorer showing the result of a search using the network.ip.list attribute" style="width:80%;" >}}

### Anomaly detection

If the Security Signal you are reviewing is generated by the Anomaly Detection method, a graph visualizes the anomaly. A bounding box on the right hand side of the graph shows where the anomaly is detected.

  {{< img src="security/security_monitoring/explorer/anomaly-detection.png" alt="Anomaly detection graph" >}}


### Process ancestry tree in CWS signals

Datadog Cloud Workload Security signals come equipped with a process ancestry tree to detect potentially malicious activity in your systems. Identify any suspicious processes and determine the extent of an attack for better investigation and remediation.

  {{< img src="security/cws/ProcessTree.png" alt="Process Tree waterfall graph" >}}

The waterfall structure shows the consecutive executions of child processes associated with contextual information. The metadata for each process helps you gain more visibility into the system activity and spot security breaches.
Key types of information:
* `command line` to identify which Unix utility the process spawned.
* `environment variables` to determine if the process inherited any sensitive information.
* `command line arguments` to collect any identifying data used by an attacker while the process was running.


## Visualize your security signals analytics

Switch between the Security Signals Table and the Security Signals Analytics modes by clicking on the _Signal Mode_ button in the upper left corner of the page:

{{< img src="security/security_monitoring/explorer/analytics.png" alt="The Signals Explorer page showing the signals in a bar graph grouped by technique" style="width:85%;" >}}

After Security Signals are generated by the Security Rules Engine, you can graph Security Signal queries and see maximums, minimums, percentiles, unique counts, and more.

Follow the [log graphing guide][6] to learn more about all the graphing options.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security
[2]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Log%20Detection%22
[3]: https://app.datadoghq.com/security/compliance
[4]: https://app.datadoghq.com/security?query=%40workflow.rule.type%3A%22Workload%20Security%22
[5]: https://app.datadoghq.com/security/appsec/signals?query=%40workflow.rule.type%3A%22Application%20Security%22
[6]: /logs/explorer/analytics/?tab=timeseries
