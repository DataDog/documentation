---
title: Controls
description: How to use Governance Console Controls to enforce consistent configurations and organizational best practices across a Datadog environment.
---

## Overview
Governance Console Controls audit and enforce organizational standards. You can use these controls to automate hygiene and quality tasks that typically require manual effort, such as managing unused API keys or enforcing tagging standards.

## Using controls

1. On the Governance Console [Controls][1] page, select a control. 
2. **Configure detection**.

   Under **Scope detections**, enter parameters to define the control's behavior. Datadog's defaults are based on best practices, but you can adjust the value of each parameter to relax or tighten the standard for your organization.

   <div class="alert alert-info">If you are using multiple Datadog sub-organizations, control behavior and scoping is defined per organization and does not span across organizations.</div>

   To verify your configuration, use the **Manual Mitigation** tab to see what is being detected by this control.

3. **Configure notifications**.
   
   Under **Notify users**, select your notification recipients and frequency. The notification email summarizes the control detections identified and unresolved, with a link back to the Governance Console control to review and mitigate.

4. **Configure enforcement**.

   When **Enforce control** is disabled, a control requires manual mitigation. Toggling on **Enforce control** enables automated enforcement actions. Automation allows administrators to automate cleanup activity without having to manually review and apply each change.

   For **Select automated mitigation**, select a mitigation. If you select **Manual** (default), the control detects noncompliant assets, and you can manually take actions based on these detections.

   To delay mitigation, enter a number of days under **Remediation Delay**. You can delay remediation for up to one week. This grants additional time for administrators to take additional actions before automatic enforcement occurs.

Use the **Manual Mitigation** tab to view all detections. Use the **History** tab 




## All available controls

Controls are organized by usage concern: security, cost optimization, and data hygiene.

{{% collapse-content title="Security" level="h3" expanded=false id="security" %}}

Security controls detect and correct configuration that could lead to increased risk of a security incident in your Datadog account.

Unused API Keys 
: Identifies API keys that have not been used within your specified time threshold, helping reduce security risks from dormant credentials. The default threshold is 30 days of inactivity, and can be adjusted.<br/><br/> 

  Enforcement automatically identifies and revokes inactive API keys to improve security and reduce potential attack surface.

Unused Application Keys
: Identifies application keys that have not been used within your specified time threshold, helping reduce security risks from dormant credentials. The default threshold is 30 days of inactivity, and can be adjusted. <br/><br/>

  Enforcement automatically identifies and revokes inactive application keys to improve security and reduce potential attack surface.

Roles Without Users
: Identifies roles that have no active users assigned to them, indicating potential cleanup opportunities.<br/><br/>

  _This control does not support enforcement._

Users in No Teams
: Identifies active users that are not in any teams, indicating potential cleanup opportunities.<br/><br/>

  _This control does not support enforcement._
{{% /collapse-content %}}

{{% collapse-content title="Cost optimization" level="h3" expanded=false id="cost-optimization" %}}

Cost optimization controls detect and correct configuration that could lead to increased spending on low value usage.

Unqueried Metrics
: Identifies monitors that contain invalid or broken @-mention handles, which may prevent notifications from reaching the intended recipients.dentifies metrics that are rarely or never queried and are not associated with any monitors, dashboards, SLOs, or notebooks, indicating potential cost savings opportunities. The default Metric Name Pattern includes all metrics, but can be adjusted to select a specific namespace or scope. The default Metric Lookback Period is 30 days of query activity, and can be adjusted.<br/><br/>

  Enforcement automatically removes unused metric tags using Metrics without Limits™ to optimize cardinality and reduce costs.

Inactive Metric Tags
: Identifies monitors that contain invalid or broken @-mention handles, which may prevent notifications from reaching the intended recipients.dentifies metric tags that are rarely or never queried and are not associated with any monitors, dashboards, SLOs, or notebooks, presenting opportunities to reduce cardinality and costs.<br/><br/>

  Enforcement automatically configures Metrics without Limits™ to allowlist only active tags on filtered metrics, optimizing cardinality and cost efficiency.

Synthetic Tests with Muted Monitors
: Identifies synthetic tests with muted monitors, which may indicate potential cost savings opportunities.<br/><br/>

  _This control does not support enforcement._
{{% /collapse-content %}}

{{% collapse-content title="Data hygiene" level="h3" expanded=false id="data-hygiene" %}}

Data hygiene controls detect and correct configuration that could lead to increased assets that are low quality or have unclear ownership.

Unused Dashboards
: Identifies dashboards that have not been viewed within your specified time threshold, helping maintain a clean and organized workspace. The default Dashboard Query includes all dashboards, but can be adjusted to select a specific scope of dashboards. The default Dashboard Activity Lookback Period is 30 days of query activity, and can be adjusted.<br/><br/>

  Enforcement automatically deletes dashboards to maintain a clean and organized workspace.

Inactive Log Pipelines
: Identifies inactive log pipelines that are either disabled or contain no processors, highlighting opportunities to keep the configuration clean.<br/><br/>

<!-- todo: how is this one enforced? -->

Dashboards Owned by Disabled Users
: Identifies dashboards whose owner is a disabled user, which may impact dashboard maintenance and updates. The default Dashboard Query includes all dashboards, but can be adjusted to select a specific scope of dashboards.<br/><br/>

  _This control does not support enforcement._

Dashboards Without Team Tags
: Identifies dashboards that lack a team tag, making it difficult to track ownership and maintain accountability. The default Dashboard Query includes all dashboards, but can be adjusted to select a specific scope of dashboards. The default Dashboard Activity Lookback Period is 30 days of query activity, and can be adjusted.<br/><br/>

  _This control does not support enforcement._

Notebooks Without Team Tags
: Identifies notebooks that lack a team tag, making it difficult to track ownership and maintain accountability. <br/><br/>

  _This control does not support enforcement._

Monitors Without Team Tags
: Identifies monitors that lack a team tag, making it difficult to track ownership and maintain accountability.<br/><br/>

  _This control does not support enforcement._

Monitors with Broken Notification Handles
: Identifies monitors that contain invalid or broken @-mention handles, which may prevent notifications from reaching the intended recipients.<br/><br/>

  _This control does not support enforcement._

  {{% /collapse-content %}}

[1]: https://app.datadoghq.com/governance/controls