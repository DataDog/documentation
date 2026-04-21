---
title: Critical Assets
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

You can identify critical assets to customize the security signals associated with them. You can customize severity levels, apply custom tags, and isolate changes to specific rules, so you can get the information you need from the signals you see.

### How it works

- If multiple critical assets are set to adjust a security signal's severity levels, the signal automatically takes the higher severity level. For example, if one critical asset sets the severity to `MEDIUM` and another sets it to `HIGH`, the severity is `HIGH`.
- If multiple critical assets are set to perform the same action on a security signal's severity levels, the action only applies once. For example, if two separate critical assets are set to increase the severity level of a signal that's set to `MEDIUM`, it only increases once to `HIGH`, not again to `CRITICAL`.

## Create a critical asset

1. In Datadog, go to **Security** > **Settings** > [**Critical Assets**][1], then click **Create Critical Asset**. The Create Critical Asset window opens.
1. Under **Define Asset**, enter a query to define the asset.
1. Under **Choose Severity Adjustment**, choose how you want to adjust the severity for security signals associated with the asset.
   - Choose **Increase** or **Decrease** to start with the default severity level, then increase or decrease the severity by one level.
   - Choose **Maintain** to retain the default severity level.
   - Choose a specific severity level to always apply that severity level, regardless of the initial severity associated with the signal.
1. (Optional) Under **Details**, add a description, tags, and teams to apply to the critical asset.
1. Under **Select Detection Rules**, enter specific detection rules to narrow down the severity changes to. To apply the changes to all detection rules, set the query to `*`.
1. Click **Save**. The Create Critical Asset window closes and your critical asset appears in the table, where you can enable or disable it, or export the critical asset configuration as Terraform or JSON files.

## View the signals a critical asset affected

1. In Datadog, go to **Security** > **Settings** > [**Critical Assets**][1].
1. Beside a critical asset, click the **More Options** icon {{< img src="icons/kebab.png" inline="true" style="height:1em" >}}, then click **Signals affected**. The Signals Explorer, pre-populated with a query to show the affected signals, opens in a new tab.

## View critical asset data in security signals
 
In every security signal that a critical asset has modified, an **Adjusted Severity** pill indicates both the original and adjusted severity levels. You can hover over that pill to see what adjustment the critical asset applied:
{{< img src="security/security_monitoring/critical_assets_pill.png" alt="Adjusted Severity pill and pop-up, indicating that a Cloudtrail signal's severity was increased from Low to Medium" style="width:50%;" >}}

On the **JSON** tab of a security signal, you can also scroll down to the `critical_assets_data` object, which includes information on critical assets associated with it, and how they affected the signal's severity.
<div class="alert alert-info">If a critical asset's severity score was overridden by a higher severity score, it may not appear in the <code>critical_assets_data</code> object.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/critical-assets