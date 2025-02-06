---
title: Dynamic Cost Allocation
description: "Monitor cost changes, thresholds, forecasts, and anomalies in your cloud costs."
further_reading:
- link: "https://docs.datadoghq.com/cloud_cost_management/?tab=aws#overview"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

{{< callout url="https://www.datadoghq.com/private-beta/cost-anomaly-detection/" btn_hidden="false" header="In Preview">}}
Dynamic Cost Allocation is in Preview. To request access, complete the form.
{{< /callout >}}

## Overview

Dynamic Cost Allocation enables you to efficiently manage and allocate cloud spending. By creating and leveraging rules based on various allocation methods, you can systematically distribute your cloud costs, enhancing cost transparency and optimizing cloud spend. 

This feature supports effective showback or chargeback practices by attributing costs such as untaggable line items and shared resources to relevant business dimensions. Tailor these allocations further with filters and partitioning options. Once allocated, track these costs easily in Datadog’s platform using the `allocated_by_rule` tag.

Dynamic cost allocation follows Tag Pipelines, enabling allocations based on user-defined tags. Costs are allocated on a daily basis, and can be applied to Cloud Cost metrics from AWS, GCP, and Azure. 

## Rule creation

Access the Custom Allocation Rules section under [Cloud Cost settings][1] to establish rules. Choose from the following allocation methods:


| Allocation Method | Description | Examples |
| ----------------  | ----------- | -------- |
| Proportional  | Costs are allocated based on the proportional spend of destination values. | Untagged support costs are allocated to teams `teamA`, `teamB`, and `teamC` based on their proportion of total spend, for example, on `aws_product:ec2`.|
| Even  | Costs are allocated evenly towards your destination tags. | Untagged support costs are allocated evenly to teams `teamA`, `teamB`, and `teamC`. |
| Custom Percentage  | Costs are allocated based on user-defined percentages for the destination tags. | Untagged support costs are allocated 50% to `teamA`, 25% to `teamB`, and 25% to `teamC`. |

### Specify what costs are included in the allocation
| Step | Required | Examples |
| ---- | ---- | ---- |
| Cost Provider | Yes | AWS, GCP, Azure |
| Define the costs to split (source) | Yes | `aws_product` is `support` `allocated_spend_type` is untagged |
| Define the destination | Yes | `team` is `teamA`, `teamB`, `teamC` |
| Filter by | Only applicable for Proportional and Even strategies, optional | `aws_product` is `ec2` |
| Partition costs by | Only applicable for Proportional and Even strategies, optional | `environment` is all values |
| Rule Name | Yes | allocate\_untagged\_support\_costs |


{{< tabs >}}
{{% tab "Proportional Allocation" %}}
You can apply filters to determine the basis for calculating proportions, where Datadog evaluates the relative contribution of each entity to the filtered cost. These proportions dictate the allocation, reflecting each entity's share. If no filters are applied, allocations default to overall spend proportions. In the example below, the cost filter is EC2 spending.

You can also specify how cost proportions should be partitioned to ensure segment-specific allocations. For example, if you partition your costs by `environment` using tags like `staging` and `production`, the proportions are calculated separately for each environment. This ensures allocations are based on the specific proportions within each partition.

{{% /tab %}}

{{% tab "Even Allocation" %}}

With the even strategy, costs are allocated evenly towards your destination tags, regardless of any other spend. Similarly to proportional allocation, you can further fine-tune your allocation by setting filters and partitions.


{{% /tab %}}

{{% tab "Custom Percentage Allocation" %}}
With the custom percentage strategy, you can define static custom percentages for the destination tags you select. For example, if you have 3 destinations (`teamA`, `teamB`, `teamC`) you can allocate 50% to `teamA`, 25% to `teamB`, and 25% to `teamC`.

{{% /tab %}}
{{< /tabs >}}

## Managing Rules
Rules can be modified and deleted in the Custom Allocation Rules section of the Cloud Cost settings page. All fields except for the rule name can be reconfigured.

## Visualize your Allocations
Changes to dynamic allocation rules may take up to 24 hours to be applied. Once applied, the new allocations can be seen throughout the Cloud Cost product. Dynamically allocated costs will also include an `allocated_by_rule` tag, denoting the rule name that applied the allocation.


[1]: https://app.datadoghq.com/cost/settings/custom-allocation-rules