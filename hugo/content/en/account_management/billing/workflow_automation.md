---
title: Workflow Automation
---

## Overview

Datadog [Workflow Automation][8] billing is based on the number of **workflow runs**. A run is recorded each time a published workflow is triggered, regardless of its trigger method (manually, programmatically, or automatically), except for the cases listed under [Included automations](#included-automations).

## Summary
- **Billing metric**: You incur a cost per committed run or on-demand run, depending on your billing plan. Specific pricing can be found on the [Workflow Automation pricing page][13].
- **Scope**: All published runs are billed, regardless of success/failure.
- **Visibility**: Usage and cost breakdowns are available in [Plan & Usage][1].
- **Included automations**: [Incident Management][9], [On-Call][10], [App Builder][11], and [Security][14] include free unlimited runs when triggered by events from these products.

## Pricing model

### Definition of workflow run {#definition-of-workflow-execution}
A workflow run is one full pass through of a published workflow, regardless of how many steps, actions, iterations, or retries it includes. Billing is recorded one time when a run starts. Runs that are rejected before starting—for example, due to spec validation errors, admission limits, or a workflow being marked inactive—are not billed. Runs can be triggered through:
- Manual starts in the Datadog UI
- API or programmatic triggers
- Event-based triggers (monitors, incidents, etc.)
- Workflows triggered from other workflows
    - **Note**: When a workflow triggers another workflow, billing is determined by the original (root) trigger of the chain. If the root trigger is a billed source (such as a monitor or API call), every workflow in the chain is billed. If the root trigger is a free source (for example, Incident Management, On-Call, App Builder, or Security), the entire chain is free, regardless of depth.

Unpublished (test or draft) runs are **not billed**.

<div class="alert alert-info">
Failed runs are not exempt from billing. All published runs are billed after they successfully start, regardless of success or failure. This includes runs that:
<ul>
    <li> Fail due to an error.
    <li> Are interrupted or canceled.
    <li> Time out mid-run.
</ul>
</div>

### Billing metrics
Workflow Automation is billed **per run**. This means that each workflow run counts toward your bill.

The two billing options are committed runs and on-demand runs. Committed runs are purchased in advance, while on-demand runs are billed as they occur. Prepaid runs cost less than on-demand runs.

### Usage tracking
The best source of truth for billing is on your [Datadog Plan & Usage page][1], where run usage is continuously tracked. Under {{< ui >}}Products{{< /ui >}}, select only {{< ui >}}Workflow Runs{{< /ui >}} for the filter. If you have multiple Datadog orgs, you can filter for them under {{< ui >}}Sub-Orgs{{< /ui >}}. You can also filter further by team or any other tag in the {{< ui >}}Usage Attribution{{< /ui >}} tab.

Other sources of usage tracking that do not include billing metrics are the [Workflow Automation API][7] and the [Workflows Overview dashboard][2]. Through the API, you can view granular information such as [all instances of a given workflow][12]. The Workflows Overview dashboard is based on run metrics, before any billing considerations take place. Additionally, the dashboard does not reflect billing complexities such as free included automations.

## Included automations
Workflows triggered automatically or manually by events from the following products are **free** and included in their respective SKU pricing:
- [**Incident Management**][9]
- [**On-Call**][10]
- [**App Builder**][11]
- [**Security**][14]

This means that if your automation originates from one of these services, those runs **do not count** toward your Workflow Automation bill. For example, a workflow triggered by an incident creation, an on-call handover, or a security signal does not incur a cost.

[1]: https://app.datadoghq.com/billing/usage?selected_cost_products=workflow_execution
[2]: https://app.datadoghq.com/dash/integration/30994/workflows-overview?fromUser=false&refresh_mode=sliding&from_ts=1760203373269&to_ts=1762885373269&live=true
[7]: /api/latest/workflow-automation/
[8]: /actions/workflows/
[9]: /incident_response/incident_management/
[10]: /incident_response/on-call/
[11]: /actions/app_builder/
[12]: /api/latest/workflow-automation/#list-workflow-instances
[13]: https://www.datadoghq.com/pricing/?product=workflow-automation#products
[14]: /security/
