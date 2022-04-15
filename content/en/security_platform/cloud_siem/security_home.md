---
title: Security Home
kind: documentation
further_reading:
- link: "cloud_siem/default_rules"
  tag: "Documentation"
  text: "Explore default log detection rules"
- link: "/security_platform/cloud_siem/log_detection_rules"
  tag: "Documentation"
  text: "Follow the creating new Cloud SIEM rules guide"
---

## Overview

The [Security Home][1] page is an entry point to your Cloud SIEM (Security Information and Event Management) environment. Readily access logs that are analyzed to detect threats, signals generated from [default][2] or [custom][3] log detection rules, and threats that require attention and remediation. See the status of logging sources and configure new sources in one location.

{{< img src="security_platform/security_monitoring/security_home/cloud_siem_home.png" alt="The Cloud SIEM Home page showing the number of logs analyzed, signals, and high/critical signals, along with AWS and Azure as log sources" >}}

## Analyzed logs

Get an overview of analyzed logs across all sources for a quick audit, or select **Logs Analyzed** to see a list of your analyzed logs in [Log Explorer][4] for a more granular investigation. In Log Explorer, filter by [log facets][5] or [aggregate your logs][6] to examine further into analyzed logs.

## Signals

Analyze the number of signals generated and the number of detection rules that are triggering signals, or select **Signals** to filter by log detection rules in the [Signals Explorer][7].

In the Signals Explorer, click on any rule with a generated signal to inspect the signal further. Select the **Rule Details** tab to see the rule's goals and strategies, and how to triage and respond to the [security signal][8], or click on any of the event attributes listed at the top of the panel or in the **Event Attributes** tab to [filter signals by attributes][8].

## Detect threats

With [real-time threat detection][9], if a rule is matched, Datadog evaluates the severity and whether anyone should be notified. See how many threats have been detected across all entities in your environment from the Security Home page. Select **High/Critical Signals** to see malicious entities in the Signals Explorer. Select any entity to analyze its generated signal for remediation and more details.

## Analyze sources

If a source is generating more signals or analyzing logs more frequently at any point in time, Datadog automatically flags this moment on a source's graph in the Sources Analyzed table to help you pinpoint potential threats and trends.

Click on any source, and select **View generated signals** or **View related logs** to see more details. If there is an out-of-the-box integration dashboard for the source, select **View integration's dashboard** to use the information for your investigations.

You can also configure new sources in this table. Click on the **Configure Source** button to set up log collection for a new source.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security/homepage
[2]: /security_platform/default_rules/#cat-cloud-siem
[3]: /security_platform/cloud_siem/log_detection_rules
[4]: /logs/explorer/
[5]: /logs/explorer/facets/#overview
[6]: /logs/explorer/group/
[7]: /security_platform/explorer
[8]: /security_platform/explorer#inspect-a-security-signal
[9]: https://www.datadoghq.com/blog/announcing-security-monitoring/#real-time-threat-detection
