---
title: Dynamic Severity
aliases:
- /security/cloud_siem/detect_and_monitor/critical_assets/
products:
- name: Cloud SIEM
  url: /security/cloud_siem/
  icon: siem
- name: Workload Protection
  url: /security/workload_protection/
  icon: cloud-security-management
- name: App and API Protection
  url: /security/application_security/
  icon: app-sec
further_reading:
- link: /security/cloud_siem/detect_and_monitor/suppressions/
  tag: Documentation
  text: Suppressions
---

{{< product-availability >}}

## Overview

Dynamic Severity lets you adjust the severity of security signals based on the assets they affect. This helps analysts prioritize signals according to the business importance of the impacted asset by increasing, decreasing, or maintaining the default severity. For each asset, you can adjust severity levels, apply custom tags, and isolate changes to specific rules.

### How it works

- If multiple dynamic severity rules are set to adjust a security signal's severity levels, the signal automatically takes the higher severity level. For example, if one dynamic severity rule sets the severity to `MEDIUM` and another sets it to `HIGH`, the severity is `HIGH`.
- If multiple dynamic severity rules are set to perform the same action on a security signal's severity levels, the action only applies once. For example, if two separate dynamic severity rules are set to increase the severity level of a signal that's set to `MEDIUM`, it only increases once to `HIGH`, not again to `CRITICAL`.

## Create a dynamic severity rule

1. In Datadog, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Dynamic Severity{{< /ui >}}][1], then click {{< ui >}}Create Dynamic Severity Rule{{< /ui >}}. The Create Dynamic Severity Rule window opens.
1. Under {{< ui >}}Define Asset{{< /ui >}}, enter a query to define the asset.
1. Under {{< ui >}}Choose Severity Adjustment{{< /ui >}}, choose how you want to adjust the severity for security signals associated with the asset.
   - Choose {{< ui >}}Increase{{< /ui >}} or {{< ui >}}Decrease{{< /ui >}} to start with the default severity level, then increase or decrease the severity by one level.
   - Choose {{< ui >}}Maintain{{< /ui >}} to retain the default severity level.
   - Choose a specific severity level to always apply that severity level, regardless of the initial severity associated with the signal.
1. (Optional) Under {{< ui >}}Details{{< /ui >}}, add a description, tags, and teams to apply to the dynamic severity rule.
1. Under {{< ui >}}Select Detection Rules{{< /ui >}}, enter specific detection rules to narrow down the severity changes to. To apply the changes to all detection rules, set the query to `*`.
1. Click {{< ui >}}Save{{< /ui >}}. The Create Dynamic Severity Rule window closes and your dynamic severity rule appears in the table, where you can enable or disable it, or export the configuration as Terraform or JSON files.

## View the signals a dynamic severity rule affected

1. In Datadog, go to {{< ui >}}Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > [{{< ui >}}Dynamic Severity{{< /ui >}}][1].
1. Beside a dynamic severity rule, click the {{< ui >}}More Options{{< /ui >}} icon {{< img src="icons/kebab.png" inline="true" style="height:1em" >}}, then click {{< ui >}}Signals affected{{< /ui >}}. The Signals Explorer, prepopulated with a query to show the affected signals, opens in a new tab.

## View dynamic severity data in security signals

In every security signal that a dynamic severity rule has modified, an {{< ui >}}Adjusted Severity{{< /ui >}} pill indicates both the original and adjusted severity levels. You can hover over that pill to see what adjustment the dynamic severity rule applied:
{{< img src="security/security_monitoring/critical_assets_pill.png" alt="Adjusted Severity pill and pop-up, indicating that a CloudTrail signal's severity was increased from Low to Medium" style="width:50%;" >}}

On the {{< ui >}}JSON{{< /ui >}} tab of a security signal, you can also find the `critical_assets_data` object, which includes information about the dynamic severity rules associated with it, and how they affected the signal's severity.
<div class="alert alert-info">If a dynamic severity rule's severity level was overridden by a higher severity level, it may not appear in the <code>critical_assets_data</code> object.</div>

## Restrict edit permissions

{{% security-products/dynamic-severity-granular-access %}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/dynamic-severity
