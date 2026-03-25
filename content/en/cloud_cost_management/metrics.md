---
title: Metrics
description: Understand every standard metric available in Cloud Cost Management, including cost types, usage metrics, and tag behavior.
further_reading:
- link: "/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
- link: "/cloud_cost_management/tags/"
  tag: "Documentation"
  text: "Tags in Cloud Cost Management"
- link: "/cloud_cost_management/allocation/container_cost_allocation/"
  tag: "Documentation"
  text: "Container Cost Allocation"
- link: "/cloud_cost_management/cost_changes/real_time_costs/"
  tag: "Documentation"
  text: "Real-Time Costs"
- link: "/cloud_cost_management/datadog_costs/"
  tag: "Documentation"
  text: "Datadog Costs"
- link: "/cloud_cost_management/setup/custom/"
  tag: "Documentation"
  text: "Custom Costs"
- link: "/cloud_cost_management/setup/saas_costs/"
  tag: "Documentation"
  text: "SaaS Cost Integrations"
---

## Overview

Cloud Cost Management transforms your cloud billing data into queryable metrics. This page documents every standard metric available, including what each metric measures, when to use it, and how tags differ between metric types.

For most use cases, start with **`all.cost`**. It combines amortized costs across every cloud provider, Datadog, and custom/SaaS costs into a single metric. When you need to drill into a specific provider (for example, to see provider-specific tags or analyze discount programs), switch to the provider-specific metric:

| Need | Metric |
|------|--------|
| **Total spend across everything** | `all.cost` |
| **AWS-specific analysis** | `aws.cost.net.amortized.shared.resources.allocated` |
| **Azure-specific analysis** | `azure.cost.amortized.shared.resources.allocated` |
| **GCP-specific analysis** | `gcp.cost.amortized.shared.resources.allocated` |
| **OCI-specific analysis** | `oci.cost.amortized` |
| **Datadog platform costs** | `datadog.cost.amortized` |
| **Custom/SaaS costs** | `custom.cost.amortized` or `saas.cost.{provider}.amortized` |

## Cost types

Every cloud provider reports costs in multiple ways. These are the main cost types:

**Amortized**: Upfront fees and recurring charges (like Reserved Instance fees or Savings Plan commitments) are spread evenly across the billing period. This produces smooth, predictable daily cost values. Available on all providers.

**Unblended**: Cost recorded at the time of usage, exactly as it appears on the invoice. One-time charges appear as spikes on the day they are billed. AWS only.

**On-demand**: What the resource would cost at public list pricing, ignoring all discounts, reservations, and savings plans. Useful for calculating how much you are saving through commitment programs, but not a reliable estimate of actual spend. Available on AWS, Azure, GCP, and OCI.

**Actual**: Azure's equivalent of unblended. Cash-basis accounting where reservation purchases appear on their purchase date. Reservation-covered usage shows as $0. Azure only.

**Blended**: An average rate across all linked accounts in an AWS Organization. Being deprecated. AWS only.

## Net costs

Metrics with `.net.` in the name (for example, `aws.cost.net.amortized`) apply privately negotiated enterprise discounts (EDP) directly to each line item. Without `.net.`, those discounts appear as separate line items with no resource tags.

Net metrics are only available if the customer has an active EDP with AWS. If not, the system falls back to the non-net equivalent.

## Container cost allocation

Metrics ending in `.shared.resources.allocated` distribute shared compute costs (EC2 instances, Azure VMs, GCP nodes) to individual Kubernetes pods or ECS tasks based on their resource requests. See [Container Cost Allocation][1] for setup instructions.

These metrics add container-level [tags][2] (`kube_namespace`, `kube_deployment`, `kube_cluster_name`, `allocated_resource`, and others) but **lose discount program tags** (savings plan ARNs, reservation ARNs, reservation dates). Use the base metric to analyze savings plan or reservation coverage.

Container allocation is available for AWS, Azure, and GCP.

## Usage metrics

Each cloud provider has a usage metric that reports consumption volume in the billing unit (GB-hours, instance-hours, requests, and so on).

<div class="alert alert-info">Always group by the unit tag when querying usage. Without it, you are summing incompatible units (for example, GB-hours + API calls).</div>

| Provider | Usage Metric | Group By |
|----------|-------------|----------|
| AWS | `aws.usage` | `aws_pricing_usage_unit` |
| Azure | `azure.usage` | `unitofmeasure` |
| GCP | `gcp.usage` | `pricingunit` |
| OCI | `oci.usage` | `pricingunit` |

The `pricingunit` tag is the cross-provider [FOCUS][3]-standard tag and is available on all providers. AWS and Azure also have their own provider-specific equivalents (`aws_pricing_usage_unit`, `unitofmeasure`).

## The `all.cost` metric

`all.cost` combines amortized costs from every provider into a single metric for multi-cloud visibility. For each provider, it selects the highest-quality metric available:

| Provider | Priority (first available wins) |
|----------|---------------------------------|
| AWS | `net.amortized.shared.resources.allocated` > `amortized.shared.resources.allocated` > `net.amortized` > `amortized` |
| Azure | `amortized.shared.resources.allocated` > `amortized` |
| GCP | `amortized.shared.resources.allocated` > `amortized` |
| OCI | `amortized.shared.resources.allocated` > `amortized` |
| Custom | `custom.cost.amortized` |
| Datadog | `datadog.cost.amortized` |

**Limitations:**
- No corresponding `all.usage` metric exists.
- Resource-level and discount program tags are dropped. See [Tags dropped on all.cost](#tags-dropped-on-allcost) below.
- Not available for Datadog Costs-only (CCM Lite) organizations.
- The UI automatically switches to a provider-specific metric when you filter by provider.

## Metrics by provider

### AWS

| Metric | Type | Description |
|--------|------|-------------|
| `aws.cost.amortized` | Cost | Amortized cost. Discounts appear as separate line items with no resource tags. Unused RI fees on 1st of month. |
| `aws.cost.net.amortized` | Cost | Amortized cost with EDP discounts applied directly to line items. Requires EDP. |
| `aws.cost.unblended` | Cost | Invoice-matching cost. SP covered usage offset by SP negation; net SP charges as recurring fees without resource tags. |
| `aws.cost.net.unblended` | Cost | Invoice-matching cost with EDP applied directly. Requires EDP. |
| `aws.cost.ondemand` | Cost | Public list pricing. Excludes all discounts, SPs, RIs, taxes, fees. See [On-demand caveats](#on-demand-caveats). |
| `aws.cost.blended` | Cost | Blended rate across linked accounts. Being deprecated. |
| `aws.usage` | Usage | Consumption volume. Group by `aws_pricing_usage_unit`. |
| `aws.cost.net.amortized.shared.resources.allocated` | Container | Net amortized with [container allocation][1]. **Best overall AWS metric.** |
| `aws.cost.amortized.shared.resources.allocated` | Container | Amortized with [container allocation][1]. Best when no EDP. |
| `aws.cost.net.unblended.shared.resources.allocated` | Container | Net unblended with [container allocation][1]. |
| `aws.cost.net.amortized.realtime.estimated` | Real-time | Estimated net amortized cost updated every 5 minutes. Preview feature, EC2 and K8s-on-EC2 only. See [Real-Time Costs][4]. |

### Azure

| Metric | Type | Description |
|--------|------|-------------|
| `azure.cost.amortized` | Cost | Amortized cost. Reservation/SP pre-payments distributed across usage (accrual basis). Reservation-covered items reflect pro-rated cost. |
| `azure.cost.actual` | Cost | Cash-basis cost. Reservations and SPs appear as separate line items on purchase date. Reservation-covered usage is NOT reported ($0). |
| `azure.cost.discounted.ondemand` | Cost | Azure list rate **after** privately negotiated discounts. Divide by `(1 - discount_rate)` for true public on-demand. See [On-demand caveats](#on-demand-caveats). |
| `azure.usage` | Usage | Consumption volume. Group by `unitofmeasure`. |
| `azure.cost.amortized.shared.resources.allocated` | Container | Amortized with [container allocation][1]. |

### GCP

| Metric | Type | Description |
|--------|------|-------------|
| `gcp.cost.amortized` | Cost | Total cost including promotion credits and Committed Use Discount (CUD) credits. |
| `gcp.cost.ondemand` | Cost | Public on-demand cost before all discounts. |
| `gcp.usage` | Usage | Consumption volume in pricing units. |
| `gcp.cost.amortized.shared.resources.allocated` | Container | Amortized with [container allocation][1]. |

### OCI (Oracle Cloud)

| Metric | Type | Description |
|--------|------|-------------|
| `oci.cost.amortized` | Cost | Effective cost with all applicable discounts included. |
| `oci.cost.ondemand` | Cost | Public on-demand cost before discounts. |
| `oci.usage` | Usage | Consumption volume. |

### Datadog

| Metric | Type | Description |
|--------|------|-------------|
| `datadog.cost.amortized` | Cost | Datadog platform product costs (Logs, APM, Infrastructure, and others) with commitment amortization. See [Datadog Costs][5]. |

### Custom costs

Costs uploaded through the [Custom Costs API][6] for non-cloud spend (internal services, tools, and others).

| Metric | Type | Description |
|--------|------|-------------|
| `custom.cost.amortized` | Cost | Total cost accrued over an interval. |
| `custom.cost.basis` | Cost | Cost at the time of usage. |
| `custom.usage_quantity` | Usage | Usage amount. |

### SaaS integrations

Built-in [SaaS cost integrations][7] generate three metrics per provider:

| Metric Pattern | Description |
|---------------|-------------|
| `saas.cost.{provider}.amortized` | Amortized cost |
| `saas.cost.{provider}.basis` | Cost basis |
| `saas.usage_quantity.{provider}` | Usage quantity |

See [SaaS Cost Integrations][7] for the full list of supported providers.

## Tag behavior

For a full overview of where tags come from and how they are enriched, see [Tags in Cloud Cost Management][2].

### Tags on container metrics

Switching from a base metric to its `.shared.resources.allocated` variant changes which [tags][2] are available.

**Tags added:** Kubernetes tags (`kube_namespace`, `kube_deployment`, `kube_daemon_set`, `kube_stateful_set`, `kube_cluster_name`, `kube_node`, `kube_service`, `kube_replica_set`, `kube_cronjob`, `kube_job`, and others), allocation tags (`allocated_resource`, `allocated_spend_type`, `allocation_metrics_type`), and ECS tags (`ecs_cluster_name`, `task_family`) when applicable.

**Tags removed:** Discount program tags (`aws_savings_plan_arn`, `aws_savings_plan_expiration_date`, `aws_savings_plan_start_date`, `aws_reservation_arn`, `aws_reservation_expiration_date`, `aws_reservation_start_date`, and other discount detail tags).

Use container metrics for workload-level cost analysis. Use base metrics for savings plan or reservation analysis.

### Tags dropped on `all.cost`

The `all.cost` metric normalizes data across providers by dropping provider-specific and high-cardinality tags.

**Dropped from all providers:**
`pod_name`, `hostname`, `host`, `kube_node_name`, `instance_id`, `instance-id`, `kube_node`, `dd_resource_key`

**AWS-specific drops:**
`aws_resource_id`, `line_item/resource_id`, `line_item/normalization_factor`, `aws`, `aws_reservation_arn`, `aws_reservation_expiration_date`, `aws_reservation_start_date`, `aws_savings_plan_arn`, `aws_savings_plan_expiration_date`, `aws_savings_plan_start_date`, plus all tags prefixed with `savings_plan/` or `reservation/`

**Azure-specific drops:**
`resourceid`, `resourcename`, `additionalinfo_vmname`, `name`, `benefitid`, `benefitname`, `additionalinfo_reservationid`, `reservationid`, `productordername`, `pricingmodel`, `productorderid`, `reservationname`, `additionalinfo_reservationorderid`

**GCP-specific drops:**
`pacific_time_usage_date`, `credits_id`, `credits_name`, `credits_full_name`, `resource_global_name`, `resource_name`, `name`, `internal-hostname`, `consumption_model_description`

**OCI-specific drops:**
`resourceid`, `resourcename`, `commitmentdiscountname`, `commitmentdiscountid`, `oci_referencenumber`, `oci_backreferencenumber`, `skuid`, `skupriceid`

## Working with CCM data

### Data latency and retention

- All cloud cost data is updated at least once per day, or whenever new data is available.
- Data for a given day is not considered complete until **48 hours** have passed.
- CCM retains and auto-backfills up to **15 months** of history.

### Querying

CCM metrics use the `cloud_cost` data source. They do **not** appear in the standard Metrics Summary page.

```
sum:<metric>{<filters>} by {<groups>}.rollup(sum, daily)
```

- API queries require `data_source: "cloud_cost"` or `use_cloud_cost: true`.
- Minimum granularity is **daily**. Always roll up to at least `.rollup(sum, daily)`.
- Tag values can be uppercase. Preserve original casing exactly.

### Monthly compared to daily aggregation

Discount fees and one-time charges (RI fees, SP upfront, refunds) post on specific days. This makes daily charts spiky and potentially misleading:
- Unused RI fees appear on the 1st of each month.
- SP upfront fees appear on the purchase date.

Use monthly aggregation for cost comparisons. If analyzing daily trends, exclude `tax`, `refund`, and `credit` charge types.

### On-demand caveats

- **AWS `aws.cost.ondemand`**: Line items may be categorized as `DiscountedUsage` or `SavingsPlanCoveredUsage`, but the cost value always reflects public list pricing. This can be confusing when grouping by charge type.
- **Azure `azure.cost.discounted.ondemand`**: This is not true public on-demand. It is the list rate after privately negotiated discounts. Divide by `(1 - negotiated_discount_rate)` for true on-demand.

### Calculating savings plan and RI coverage

Use **on-demand metrics** (not amortized) to calculate what percentage of spend is covered by commitment programs. Amortized metrics already include the discount, making coverage ratios inaccurate.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /cloud_cost_management/allocation/container_cost_allocation/
[2]: /cloud_cost_management/tags/
[3]: https://focus.finops.org/
[4]: /cloud_cost_management/cost_changes/real_time_costs/
[5]: /cloud_cost_management/datadog_costs/
[6]: /cloud_cost_management/setup/custom/
[7]: /cloud_cost_management/setup/saas_costs/
