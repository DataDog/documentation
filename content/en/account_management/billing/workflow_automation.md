---
title: Workflow Automation
---

## Overview

Datadog [Workflow Automation][8] billing is based on the number of **workflow executions**. Workflow executions are recorded whenever a published workflow runs, regardless of its run method (manually, programmatically, or automatically).

## Summary
- **Billing metric**: You incur a cost per committed execution or on-demand execution, depending on your billing plan. Specific pricing can be found on the [Workflow Automation pricing page][13].
- **Scope**: All published executions are billed, regardless of success/failure.
- **Visibility**: Usage and cost breakdowns are available in [Plan & Usage][1].
- **Exceptions for certain SKUs**: 
    - CSM/DevSecOps SKUs include 5-20 executions per host.
    - [Incident Management][9], [On-Call][10], and [App Builder][11] SKUs include free unlimited executions when triggered by events from these products. 

## Pricing model

### Definition of workflow execution
A workflow execution refers to one full run of a published workflow, regardless of how many steps or actions it includes. Executions can be triggered through:
- Manual starts in the Datadog UI
- API or programmatic triggers
- Event-based triggers (monitors, incidents, etc.)
- Workflows triggered from other workflows
    - **Note**: If one workflow triggers another workflow, they are both counted for billing.

Unpublished (test or draft) runs are **not billed**.

<div class="alert alert-info">
Failed executions are not exempt from billing. All published executions are billed once they successfully start, regardless of success or failure. This includes runs that:
<ul>
    <li> Fail due to an error.
    <li> Are interrupted or canceled.
    <li> Time out mid-run.
</ul>
</div>

### Billing metrics
Workflow Automation is billed **per execution**. This means that each complete workflow run counts toward your bill.

The two billing options are committed executions and on-demand executions. Committed executions are purchased in advance, while on-demand executions are billed as they occur. Prepaid executions cost less than on-demand executions.

### Usage tracking
The best source of truth for billing is on your [Datadog Plan & Usage page][1], where execution usage is continuously tracked. Under **Products**, select only **Workflow Executions** for the filter. If you have multiple Datadog orgs, you can filter for them under **Sub-Orgs**. You can also filter further by team or any other tag in the **Usage Attribution** tab.

Other sources of usage tracking that do not include billing metrics are the [Workflow Automation API][7] and the [Workflows Overview dashboard][2]. Through the API, you can view granular information such as [all instances of a given workflow][12]. The Workflows Overview dashboard is based on execution metrics, before any billing considerations take place. Additionally, the dashboard does not reflect billing complexities such as free allotments of workflows. 

## Included workflow allotments by SKU
Certain Datadog SKUs include Workflow Automation allotments as part of their pricing:

  | SKU                       | Included Workflow Executions | Allotment Basis | 
  |---------------------------|------------------------------|-----------------|
  | [CSM Pro][3]              | 5 executions per host        | Monthly         |
  | [DevSecOps Pro][4]        | 5 executions per host        | Monthly         |
  | [CSM Enterprise][5]       | 20 executions per host       | Monthly         |
  | [DevSecOps Enterprise][6] | 20 executions per host       | Monthly         |

These included executions are automatically applied to your account each month and used before any committed or on-demand executions. They are not reflected in [your Plan & Usage page][1] and do not show up on your bill.

### Included automations
Workflows triggered automatically or manually by events from the following products are **free** and included in their respective SKU pricing:
- [**Incident Management**][9]
- [**On-Call**][10]
- [**App Builder**][11]

This means that if your automation originates from one of these services, those executions **do not count** toward your Workflow Automation bill. For example, a workflow triggered by an incident creation or an on-call handover does not incur a cost.

[1]: https://app.datadoghq.com/billing/usage?selected_cost_products=workflow_execution
[2]: https://app.datadoghq.com/dash/integration/30994/workflows-overview?fromUser=false&refresh_mode=sliding&from_ts=1760203373269&to_ts=1762885373269&live=true
[3]: https://www.datadoghq.com/pricing/?product=cloud-security#products
[4]: https://www.datadoghq.com/pricing/?product=infrastructure-monitoring#products
[5]: https://www.datadoghq.com/pricing/?product=cloud-security#products
[6]: https://www.datadoghq.com/pricing/?product=infrastructure-monitoring#products
[7]: /api/latest/workflow-automation/
[8]: /actions/workflows/
[9]: /service_management/incident_management/
[10]: /service_management/on-call/
[11]: /actions/app_builder/
[12]: /api/latest/workflow-automation/#list-workflow-instances
[13]: https://www.datadoghq.com/pricing/?product=workflow-automation#products