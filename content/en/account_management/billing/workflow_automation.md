---
title: Workflow Automation
---

## Overview

Datadog [Workflow Automation][8] billing is based on the number of **workflow executions**, which are recorded whenever a published workflow runs---whether manually, programmatically, or automatically.

## Summary
- **Billing metric**: $0.10 per committed execution and $0.14 per on-demand execution
- **Scope**: All published executions billed, regardless of success/failure
- **Visibility**: Usage and cost breakdowns available in [Plan & Usage][1] 
- **Exceptions for certain SKUs**: 
    - CSM/DevSecOps SKUs include 5–20 executions per host
    - [Incident Management][9], [On-Call][10], and [App Builder][11] SKUs include free unlimited executions when triggered by events from these products. 

## Pricing Model

#### What is the billing metric for Workflow Automation?
Workflow Automation is billed **per execution**, meaning each complete workflow run counts toward your bill. There are two billing options:
- **Committed Executions**: $0.10 per execution (purchased in advance)
- **On-Demand Executions**: $0.14 per execution (pay-as-you-go)

#### What counts as a workflow execution?
A workflow execution refers to one full run of a published workflow, regardless of how many steps or actions it includes. Executions can be triggered through:
- Manual starts in the Datadog UI
- API or programmatic triggers
- Event-based triggers (monitors, incidents, etc.)
- Workflows triggered from other workflows
    - **Note**: If one workflow triggers another workflow, they are both counted for billing.

Unpublished (test or draft) runs are **not billed**.

#### Are all executions billed, even if they fail?
Yes. _All published executions are billed once they successfully start_, regardless of success or failure. This includes runs that:
- Fail due to an error
- Are interrupted or canceled
- Time out mid-run

Unpublished (test or draft) runs are **not billed**. If the execution is halted by rate-limiting or is unable to run due to an invalid configuration, the execution doesn't successfully start and is **not billed**. 

### How is usage tracked?
Execution usage is continuously tracked and visible in your [Datadog Plan & Usage page][1]. Under **Products**, select **Workflow** Executions for the filter. This is the best source of truth in your account for billing information. 

Further information can be found in the [Workflows Overview dashboard][2], but this dashboard does not reflect billing complexities, such as free allotments of workflows. This dashboard is based on execution metrics, before any billing considerations take place. 

## Included Workflow Allotments by SKU
Certain Datadog product SKUs include Workflow Automation allotments as part of their pricing:

  | SKU                       | Included Workflow Executions | Allotment Basis | 
  |---------------------------|------------------------------|-----------------|
  | [CSM Pro][3]              | 5 executions per host        | Monthly         |
  | [DevSecOps Pro][4]        | 5 executions per host        | Monthly         |
  | [CSM Enterprise][5]       | 20 executions per host       | Monthly         |
  | [DevSecOps Enterprise][6] | 20 executions per host       | Monthly         |

These included executions are automatically applied to your account each month and used before any committed or on-demand executions. They are not reflected in [your Plan & Usage page][1] and do not show up on your bill.

### Included Automations
Workflows triggered automatically or manually by events from the following products are **free** and included in their respective SKU pricing:
- [**Incident Management**][9]
- [**On-Call**][10]
- [**App Builder**][11]

This means that if your automation originates from one of these services (for example, a workflow triggered by an incident creation or an on-call handover), those executions **do not count** toward your Workflow Automation bill.

## Frequently Asked Questions

#### Q: Are test or draft runs billed?
No. Only **published workflow executions** are billed.

#### Q: Does pricing depend on the number of steps in a workflow?
No. Each complete workflow run counts as **one execution**, regardless of complexity.

#### Q: Can I track usage by workflow or team?
Yes. If workflows are tagged individually by team, you can see a breakdown in [Plan & Usage][1]. You can also fetch workflow execution information from the [Workflow Automation API][7].

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