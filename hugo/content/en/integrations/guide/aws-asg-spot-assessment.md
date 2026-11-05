---
title: Assess AWS Autoscaling Groups for Spot Migration
description: Identify AWS autoscaling groups to evaluate for Spot migration, compare estimated savings, and review compatible instance types.
further_reading:
- link: "integrations/amazon_web_services/"
  tag: "Documentation"
  text: "AWS integration"
- link: "cloud_cost_management/setup/aws/"
  tag: "Documentation"
  text: "Set up AWS Cloud Cost Management"
---

<div class="alert alert-info">
Spot migration assessment is in Preview. Contact <a href="/help/">Datadog Support</a> to request access.
</div>

## Overview

Use the Spot migration assessment to identify Amazon EC2 autoscaling groups (ASGs) to evaluate for a move from On-Demand Instances to Spot Instances. Compare estimated monthly savings, review Spot potential, and inspect compatible replacement instance types across connected AWS accounts and regions.

The assessment uses collected AWS resources, up to 30 days of ASG metrics, and AWS pricing and interruption data. When available, Cloud Cost Management provides the current compute cost baseline.

Spot potential helps prioritize groups for investigation. Before migrating, validate that the application can tolerate interruptions and run on the suggested instance types. The assessment does not change AWS resources.

## Before you begin

1. [Connect the AWS accounts][1] that contain the ASGs.
2. Enable resource collection for those accounts and regions, using the [AWS integration's resource collection permissions][2]. The assessment needs ASG information and the EC2 launch settings used by those groups.
3. In the AWS integration's **Metric Collection** tab, enable the `AWS/AutoScaling` namespace. Check that metric filters include `aws.autoscaling.group_in_service_instances`.
4. Recommended for history-based estimates: [enable group metrics in AWS][3], including `GroupInServiceInstances`. Without running-instance history, estimates can use configured desired capacity.

Cloud Cost Management is optional. Without cost data for an ASG, the assessment uses public On-Demand prices for its current cost estimate. Collecting `AWS/EC2` metrics is not required for this assessment.

Estimates are most representative with a full 30 days of history. Missing instance history does not prevent every assessment: when possible, estimates use the ASG's configured desired capacity instead.

## Find groups to evaluate

1. Open [Spot migration assessment][4]. If the page is unavailable for your organization, contact [Datadog Support][5].
2. Check the **Assessed** timestamp to see when the assessment was last updated. Results describe the latest completed assessment and do not update in real time as AWS resources change.
3. Filter by AWS account, region, or Spot candidacy, or search for an ASG by name.
4. Review the estimated monthly savings and **Spot potential** for each group.
5. Select an ASG to open its details.

The assessment focuses on running groups configured to use only On-Demand Instances. Groups already configured for Spot, groups using weighted capacity or attribute-based instance selection, and groups without enough resource or market data can be absent. The table is not a complete inventory of all ASGs.

Groups with insufficient capacity are hidden by default. Select **Show ASGs outside migration scope** when that option appears to inspect them.

### Interpret the rating

| Spot potential | How to use it |
| --- | --- |
| **HIGH** | The available replacement types, interruption data, and estimated savings make the group worth evaluating for Spot. Validate application behavior before migrating. |
| **MEDIUM** | Review the assessment's supporting evidence and assumptions before deciding whether to proceed. |
| **LOW** | Review the explanation in the detail panel. The group can lack enough instances, compatible replacement diversity, or positive estimated savings. |

A high rating does not guarantee Spot capacity or application resilience. Missing history or a single availability zone alone does not prove a group is unsuitable for Spot.

## Review a group

Use the detail panel to inspect:

- **Monthly costs**: Compare the current baseline with the projected cost and estimated savings.
- **Projected cost at your Spot mix**: Adjust the Spot percentage to compare cost scenarios.
- **Spot pricing by instance type**: Review suggested types, public hourly prices, availability zones, and interruption risk.
- **Spot potential**: Review the evidence behind the rating, including observed capacity, load balancer attachment, and replacement diversity.
- **Instance and cost history**: Inspect running-instance and compute-cost history when data is available.

Replacement types are screened for hardware compatibility with the current instance types. Validate AMI support, application performance, storage, and network requirements before using them. Configure several suitable instance types so AWS has more capacity options.

Interruption risk comes from [AWS Spot Instance Advisor][6] and describes historical interruption ranges. It does not predict whether a specific instance is interrupted. Consider using more than one availability zone and follow [AWS Spot best practices][7] when planning a migration.

## Understand savings estimates

The default scenario models **50% Spot and 50% On-Demand** capacity. Monthly estimates use 730 hours and the observed average running-instance count when available. Without that history, the public-price estimate assumes configured desired capacity runs for the month.

The current cost baseline depends on data availability:

| Baseline | What it represents |
| --- | --- |
| **Current monthly** | Monthly compute cost estimated from recorded net amortized AWS costs in Cloud Cost Management, without custom cost adjustments. |
| **Modeled current monthly** | Estimated compute cost at public On-Demand prices, adjusted by the **On-Demand discount** you enter. |

Projected cost combines the remaining share of the current baseline with public Spot prices for the replacement types. For example, assume a $1000 current monthly baseline and a $400 estimate for the same capacity entirely on Spot. At 50% Spot, projected cost is $700 and estimated monthly savings are $300.

For public-price estimates, enter an effective **On-Demand discount** to compare Spot against discounted On-Demand rates. This control does not apply another discount to Cloud Cost Management costs. A discount that removes positive savings can change Spot potential to **LOW**.

Adjust **your Spot mix** in the detail panel to explore other percentages. This changes the projected cost for that scenario; Spot potential continues to reflect the default 50% scenario.

Public price estimates use Linux pricing and exclude software licensing charges. Estimates cover compute costs and do not guarantee a reduction in the AWS bill. The Cloud Cost Management scenario assumes commitments freed by migration can be used elsewhere. Review Savings Plans and Reserved Instance utilization before acting on estimated savings.

## Troubleshoot missing or older results

| What you see | What to check |
| --- | --- |
| **Assessment is being prepared** | A completed assessment is not available yet. Check resource collection and permissions, then return after an assessment completes. |
| An ASG is missing | Clear table filters and check the option to show groups outside migration scope. Verify account and region collection, running instances, and supported group configuration. Missing launch settings, pricing, or interruption data can prevent an assessment. |
| No running-instance history | Verify AWS group metric publication and Datadog collection of `aws.autoscaling.group_in_service_instances`. Newly enabled collection does not provide a full 30-day history immediately. |
| Public-price estimates instead of Cloud Cost Management costs | Verify [AWS Cloud Cost Management setup][8] and cost data attributed to the ASG for the assessment period. Public pricing is the fallback when usable cost data is unavailable. |
| A history chart is absent | Charts are hidden when data is unavailable. Available cost history can still appear without running-instance history. |
| **Stale** results | The displayed assessment is more than 48 hours old. Check collection settings and contact [Datadog Support][5] if results remain stale. Refreshing the page reads the latest completed assessment. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/integrations/aws/
[2]: /integrations/amazon_web_services/#resource-collection
[3]: https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-metrics.html#as-enable-group-metrics
[4]: https://app.datadoghq.com/integrations/amazon-web-services/spot-assessment
[5]: /help/
[6]: https://aws.amazon.com/ec2/spot/instance-advisor/
[7]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-best-practices.html
[8]: /cloud_cost_management/setup/aws/
