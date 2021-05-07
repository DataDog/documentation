---
title: Security Home
kind: documentation
further_reading:
- link: "security_monitoring/default_rules"
  tag: "Documentation"
  text: "Explore default log dection rules"
- link: "/security_platform/security_monitoring/log_detection_rules"
  tag: "Documentation"
  text: "Follow the creating new Security Monitoring rules guide"
---

## Overview

The [Security Home][1] page is an entry point to your security monitoring environment. Readily access logs that are analyzed to detect threats, signals generated from [default][2] or [custom][3] log detection rules, and threats that require attention and remediation. See the status of logging sources and configure new sources in one location.

{{< img src="security_platform/security_monitoring/security_home/overview.png" alt="Security Home" width="75%">}}

## Logs Analyzed

Get a overview of analyzed logs across all sources for a quick audit, or select **Logs Analyzed** to see a list of your analyzed logs in [Logs Explorer][2] for a more granular investigation. In Logs Explorer, filter by [log facets][3] or [aggregate your logs][4] to drill down even further into analyzed logs.

## Signals Generated

Briefly analyze the number of signals generated and the amount of rules that are triggering signals, or select **Signals Generated** to filter by log detection rules in the [Signals Explorer][5].

In the Signals Explorer, click on any rule with a generated signal to inspect the signal further. Select the **Message** tab to learn how to [triage and respond to a generated signal][6], or click on any of the event attributes listed at the top of the panel or in the **Event Attributes** tab to [filter signals by attributes][6].

## Threats Detected

With [real-time threat detection][7], if a rule is matched, Datadog evaluates the severity and whether anyone should be notified. See how many threats have been detected across all entities in your environment from the Security Home page. Select **Threats Detected** to see malicious entities in the Signals Explorer. Select any entity to drill down into it's generated signal for remediation and more details.

## Sources Analyzed

If a source is generating more signals or analyzing logs more frequently at any point-in-time, Datadog automatically flags this moment on a source's graph in the Sources Analyzed table to help you pinpoint potential threats and trends.

Click on any bar in a graph or data within the table and select **View generated signals** or **View generated logs** to see more details.

You can also configure new sources in this table. Click on the **Configure Source** button to set up log collection for a new source.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/homepage
[2]: /security_platform/default_rules/
[3]: /security_platform/security_monitoring/log_detection_rules
[3]: /logs/explorer/
[3]: /logs/explorer/facets/#overview
[4]: /logs/explorer/#aggregate-and-measure
[5]: /security_platform/explorer
[6]: /security_platform/explorer#inspect-a-security-signal
[7]: https://www.datadoghq.com/blog/announcing-security-monitoring/#real-time-threat-detection


