---
title: Signals Explorer
aliases:
  - /security_platform/cspm/signals_explorer
  - /security/cspm/signals_explorer
  - /security/misconfigurations/signals_explorer
further_reading:
- link: "security/default_rules"
  tag: "Documentation"
  text: "Explore default cloud configuration compliance rules"
- link: "security/cspm/frameworks_and_benchmarks"
  tag: "Documentation"
  text: "Learn about supported frameworks and industry benchmarks"
---

<div class="alert alert-warning">Due to <a href="/security/upcoming_changes_notification_rules">changes in how notification rules are configured</a>, cloud configuration and infrastructure configuration signals will be deprecated in the second half of 2025.</div>

## Overview

In addition to reviewing and fixing cloud misconfigurations directly in the [Misconfigurations Findings page][1], you can set notifications for failed misconfigurations, and configure signals to correlate and triage misconfigurations in the same place as real-time threats that are generated by [Cloud SIEM][2] and [Workload Protection][3].

## Reduce alert fatigue with security posture signals

Signals are security alerts that Datadog generates and displays in the [Signals Explorer][4]. Security posture signals trigger when Datadog generates `evaluation:fail` misconfigurations for a cloud or infrastructure configuration rule.

A selection of rules that have a 'high' or 'critical' severity level are enabled to generate signals by default. For lower severity compliance rules, select the *Trigger a security signal* toggle to begin generating signals. You can also use this toggle to disable compliance rules from generating signals at any point in time.

{{< img src="security/cspm/signals_explorer/Notifications.png" style="width:100%;">}}

In order to consume misconfigurations in logical groupings and mitigate the potential for alert fatigue, you have full flexibility to change how signals are triggered for each individual resource, such as every time a resource fails a rule in a new cloud account or each time a resource is misconfigured in a service. You can also trigger by any Datadog facet. Regardless of which grouping logic you choose for signal generation, opening a signal always displays the up-to-date list of misconfigurations that are failing for this rule.

{{< img src="security/cspm/signals_explorer/Signals.png" style="width:100%;">}}

Click on any security posture signal to open a side panel for more details:

{{< img src="security/cspm/signals_explorer/Sidepanel.png" style="width:75%;">}}

The top portion of the misconfigurations side panel displays key information about where the misconfiguration(s) are occurring: on an individual resource, a service, or an entire cloud account.

{{< img src="security/cspm/signals_explorer/Top.png" style="width:75%;">}}

Below is the message for the rule, including a description of misconfiguration and instructions for how to remediate the issue.

{{< img src="security/cspm/signals_explorer/Message.png" style="width:75%;">}}

The next tab in the bottom section of the side panel displays all misconfigurations that are triggering this signal. This list always shows the current state of your infrastructure, meaning if you fixed 3 of 10 misconfigured security groups since the signal first triggered, Datadog will display 7 failed security groups rather than display misconfigurations that no longer are in violation.

{{< img src="security/cspm/signals_explorer/Findings.png" style="width:75%;">}}

**Note**: If using a grouping other than resource ID, the signal triggers the first time a misconfiguration meets the grouping criteria, and is not re-triggered each time a new resource in this same grouping (for example, the same service or account) fail this rule. This is done intentionally so as to avoid re-triggering signals each time a new cloud resource fails a rule. If you would like to receive an alert each time a cloud resource fails a rule, change the *group by* in the rule to `@resource_type`.

The related issues tab shows other compliance rules that have triggered signals on the same logic grouping—the same resource, service, or cloud account—and resource type (for example, security group).

{{< img src="security/cspm/signals_explorer/Related.png" style="width:75%;">}}

At the top of the side panel, you can configure the rule or send a notification to your colleagues by email, Slack, Microsoft Teams, PagerDuty, ServiceNow, Jira, webhooks, and more.

{{< img src="security/cspm/signals_explorer/Final.png" style="width:75%;">}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/cloud_security_management/misconfigurations/findings/
[2]: /security/cloud_siem/
[3]: /security/workload_protection/
[4]: https://app.datadoghq.com/security
