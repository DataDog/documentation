---
title: Security Signals Explorer
kind: documentation
description: "Search through all of your security signals and perform Security Analytics"
aliases:
  - /security_monitoring/explorer/
  - /cloud_siem/explorer/
further_reading:
  - link: "https://www.datadoghq.com/blog/announcing-security-monitoring/"
    tag: "Blog"
    text: "Learn more about Cloud SIEM"
  - link: "/cloud_siem/detection_rules/"
    tag: "Documentation"
    text: "Learn about the conditional logic of detection rules"
---

## Overview

From the [Security Signals Explorer][1], correlate and triage security signals. You can also access Cloud SIEM dashboards from this page.

In this view, you can:

- [Overview](#overview)
- [Explore your Security Signals](#explore-your-security-signals)
- [Inspect a Security Signal](#inspect-a-security-signal)
  - [Threat intelligence](#threat-intelligence)
  - [Anomaly detection](#anomaly-detection)
- [Visualize your security signals analytics](#visualize-your-security-signals-analytics)
- [Further Reading](#further-reading)

## Explore your Security Signals

The Security Signals search results are displayed in the Security Signals Table.

{{< img src="security_platform/security_monitoring/explorer/ss_table.png" alt="Security Signals Table"  >}}

Filter the contents of the table with the list of available facets. Configure the content of your Security Signals Table according to your needs and preferences with the **Options** button in the upper right.

## Inspect a Security Signal

Click on any Security Signal to open the Security Signal Panel and see more details about it.

{{< img src="security_platform/security_monitoring/explorer/signal_1.png" alt="Security Signal"  >}}

The details you need first when triaging an issue can be found in the top portion of the Security Signal Panel. From here, you can determine the severity of the signal, when it was generated, access the rule settings, and quickly share this signal to a teammate.

The first seen and last seen date are updated, if new data is made available from the past or the attack continues. In addition, any configured group bys on the detection rule are displayed in this section. This example detection rule is configured with a group by of `usr.name`. Finally, any tags which are set on the detection rule are displayed below the group bys.

{{< img src="security_platform/security_monitoring/explorer/signal_2.png" alt="Security Signal"  >}}

To better understand activity, the Security Signal Panel summarizes tags and attributes from all logs that trigger a signal so you can troubleshoot without having to pivot to Log Explorer. For example, you can determine at a glance the list of IPs attempting to log into a user account, or the AWS accounts and availability zones running the authentication service.

Below the overview of the signal are tabs with detailed information related to the signal:

- `Message` displays the text configured in the detection rule to help the person reviewing the signal understand the purpose of the signal and how to respond.

- `Event Attributes` are helpful when triaging and filtering security signals. For example, you may determine that a user or entity triggered a detection rule as part of their benign behavior, or that a compliance control shouldn't apply across all of your environments. Click on any attribute in Event Attributes tab to generate the dropdown menu and select **Never trigger signals for **`<value>`**** to customize what is visible within the Security Signals Explorer. You can also filter by or view logs related to an attribute from this menu.

  {{< img src="security_platform/security_monitoring/explorer/never_trigger_signal_option.png" alt="Option to never trigger a signal for a set value" >}}

- `Samples` includes a list of log samples to provide context on why the signal triggered. Click on any of the samples to see the full log.

- `Related Issues` includes a list of other signals which contain the same group by values to assist with triaging the signal.

### Threat intelligence

Datadog Cloud SIEM offers threat intelligence feeds curated by threat intelligence partners. These feeds are constantly updated to include data about known suspicious activity (for example, indicators of compromise or IOCs), so you can quickly identify which potential threats to address.

{{< img src="security_platform/security_monitoring/explorer/threat_intelligence.png" alt="Threat Intelligence in the Security Signals Explorer"  >}}

Datadog automatically implements threat intelligence by analyzing all ingested logs that have relevant attributes. If a log contains a compromise indication, such as an anonymized IP tied to a VPN, proxy, or Tor exit node, a `threat_intel` attribute is append to the log event to provide additional insights based on available intelligence.

The query to see all threat intelligence matches in the Security Signals Explorer is `@threat_intel.indicators_matched:*`. The following are additional attributes to query for threat intelligence:

* `@threat_intel.results.category “anonymizer”, “scanner”`
* `@threat_intel.results.intention “malicious”, “unknown”`
* `@threat_intel.results.subcategory options "proxy", "tor", "vpn"`
    **Note**: Proxy, Tor, and VPN subcategory attributes are provided only by threat intelligence partner IPinfo.

### Anomaly detection

If the Security Signal you are reviewing is generated by the Anomaly Detection method, a graph visualizes the anomaly. A bounding box on the right hand side of the graph shows where the anomaly is detected.

  {{< img src="security_platform/security_monitoring/explorer/anomaly-detection.png" alt="Anomaly detection graph" >}}

## Visualize your security signals analytics

Switch between the Security Signals Table and the Security Signals Analytics modes by clicking on the _Signal Mode_ button in the upper left corner of the page:

{{< img src="security_platform/security_monitoring/explorer/visualize_analytics1.png" alt="Visualize Analytics"  >}}

After Security Signals are generated by the Security Rules Engine, you can graph Security Signal queries and see maximums, minimums, percentiles, unique counts, and more.

Follow the [log graphing guide][2] to learn more about all the graphing options.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security
[2]: /logs/explorer/analytics/?tab=timeseries
