---
title: Controls
description: How to use Governance Console Controls to enforce consistent configurations and organizational best practices across a Datadog environment.
further_reading:
- link: "https://www.datadoghq.com/blog/governance-console/"
  tag: "Blog"
  text: "Centralize observability management with Datadog Governance Console"
---

## Overview
Governance Console Controls audit and enforce organizational standards. You can use these controls to automate hygiene and quality tasks that typically require manual effort, such as managing unused API keys or enforcing tagging standards.

## Using controls

1. On the Governance Console [Controls][1] page, select a control. 
2. {{< ui >}}Configure detection{{< /ui >}}.

   Under {{< ui >}}Scope detections{{< /ui >}}, enter parameters to define the control's behavior. Datadog's defaults are based on best practices, but you can adjust the value of each parameter to relax or tighten the standard for your organization.

   <div class="alert alert-info">If you are using multiple Datadog sub-organizations, control behavior and scoping is defined per organization and does not span across organizations.</div>

   To verify your configuration, use the {{< ui >}}Manual Mitigation{{< /ui >}} tab to see what is being detected by this control.

3. {{< ui >}}Configure notifications{{< /ui >}}.
   
   Under {{< ui >}}Notify users{{< /ui >}}, select your notification recipients and frequency. The notification email summarizes identified and unresolved control detections and includes a link back to the Governance Console control to review and mitigate.
   


4. {{< ui >}}Configure automatic enforcement{{< /ui >}}.

   When {{< ui >}}Enforce control{{< /ui >}} is disabled, a control requires manual mitigation. Toggling on {{< ui >}}Enforce control{{< /ui >}} enables automated enforcement actions. Automation allows administrators to automate cleanup activity without having to manually review and apply each change.

   For {{< ui >}}Select automated mitigation{{< /ui >}}, select a mitigation. If you select {{< ui >}}Manual{{< /ui >}} (default), the control detects noncompliant assets, and you can manually take actions based on these detections. See [manual mitigation](#manual-mitigation).

   If you select {{< ui >}}Workflow{{< /ui >}}, search for and select an existing Datadog Workflow to run when the control detects noncompliant assets. See [workflow mitigation](#workflow-mitigation).

   After you select a workflow, use {{< ui >}}Edit{{< /ui >}} to view or edit the full workflow, or {{< ui >}}Change Associated Workflow{{< /ui >}} to select a different workflow.

   To delay mitigation, enter a number of days under {{< ui >}}Remediation Delay{{< /ui >}}. You can delay remediation for up to 1 week. This grants additional time for administrators to take additional actions before automatic enforcement occurs.

## Manual mitigation

Use the {{< ui >}}Manual Mitigation{{< /ui >}} tab to view all detections. 

{{< img src="account_management/governance_console/manual-mitigation-2.png" alt="The Manual Mitigation tab, showing a searchable list of detections. Each detection has three options: Delay mitigation, Ignore detection, Mitigate now." style="width:100%;" >}}

Hover over each detection for options:
- {{< ui >}}Delay mitigation{{< /ui >}}: Delay mitigation of this asset for up to 1 week. This grants additional time for the administrator or owner to take additional actions before automated enforcement takes place.
- {{< ui >}}Ignore detection{{< /ui >}}: Ignore this detection and remove it from consideration for mitigation.
- {{< ui >}}Mitigate now{{< /ui >}}: Noncompliant assets are mitigated according to the configuration of the control. This action applies only once, and does not carry over to incoming detections. Mitigation requires the associated permission for modifying that asset. If the control is configured with a workflow mitigation, this opens a confirmation screen instead of mitigating immediately. See [workflow mitigation](#workflow-mitigation).

## Workflow mitigation

Use {{< ui >}}Workflow{{< /ui >}} as a mitigation type to connect a control to an existing Datadog Workflow. Instead of relying on Datadog's built-in automated actions, you can trigger your own remediation workflow when a control detects noncompliant assets.

When a control is configured with a workflow, the workflow runs automatically if {{< ui >}}Enforce control{{< /ui >}} is enabled. You can also run the workflow on demand from the {{< ui >}}Manual Mitigation{{< /ui >}} tab.

To manually run a workflow mitigation:

1. On the {{< ui >}}Manual Mitigation{{< /ui >}} tab, select one or more detections.
2. Click {{< ui >}}Mitigate now{{< /ui >}}.
3. Review the confirmation screen, which shows the selected detections and the workflow that will run.
4. Type `Mitigate Detections` into the text box, then click {{< ui >}}Mitigate Detections{{< /ui >}} to run the workflow against the selected detections.

Workflow run status appears alongside each detection in the {{< ui >}}Manual Mitigation{{< /ui >}} tab.

## All available controls

Controls are organized by usage concern: security, cost optimization, and data hygiene.

{{% collapse-content title="Security" level="h3" expanded=false id="security" %}}

Security controls detect and correct configuration that could lead to increased risk of a security incident in your Datadog account.

{{< account_management/governance_controls usage_concern="Security" >}}
{{% /collapse-content %}}

{{% collapse-content title="Cost optimization" level="h3" expanded=false id="cost-optimization" %}}

Cost optimization controls detect and correct configuration that could lead to increased spending on low value usage.

{{< account_management/governance_controls usage_concern="Cost Optimization" >}}
{{% /collapse-content %}}

{{% collapse-content title="Data hygiene" level="h3" expanded=false id="data-hygiene" %}}

Data hygiene controls detect and correct configuration that could lead to increased assets that are low quality or have unclear ownership.

{{< account_management/governance_controls usage_concern="Data Hygiene" >}}
{{% /collapse-content %}}

[1]: https://app.datadoghq.com/governance/controls

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
