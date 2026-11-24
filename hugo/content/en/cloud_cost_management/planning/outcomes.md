---
title: Outcomes
description: Measure unit economics by pairing cloud and AI spend with the business outcomes it produces in Cloud Cost Management.
further_reading:
- link: "/cloud_cost_management/planning/"
  tag: "Documentation"
  text: "Planning"
- link: "/cloud_cost_management/ai_costs/"
  tag: "Documentation"
  text: "AI Costs"
- link: "/cloud_cost_management/planning/budgets"
  tag: "Documentation"
  text: "Budgets"
- link: "/cloud_cost_management/tags/"
  tag: "Documentation"
  text: "Tags"
- link: "/metrics/custom_metrics/"
  tag: "Documentation"
  text: "Custom Metrics"
---

<div class="alert alert-info">Outcomes is in Preview.</div>

## Overview

Outcomes measures the cost of each result your spend produces, such as tokens processed, active users, or completed orders. Total cloud spend tells you how much you're paying, but not what you're getting for it. A rising bill can mean your product is growing, or it can mean your infrastructure is getting less efficient. Outcomes connects your spend to the value it creates, so you can understand your {{< tooltip text="unit economics" tooltip="The cost to deliver one unit of value, such as one order, one active user, or one million tokens." >}}.

With Outcomes, you can:

- Understand the return on investment of a feature, product, or AI tool
- Track whether your cost per unit improves or worsens over time
- Compare efficiency across providers, teams, and services
- Start from suggested outcomes, or create your own to match the metrics your business cares about

## Getting started

Use Outcomes to understand what your spend delivers.

1. Go to [**Cloud Cost > Plan > Outcomes**][1].
2. Review the outcomes your organization is tracking, along with any [suggested outcomes](#suggested-outcomes) from Datadog.
3. Start tracking the suggestions that matter to you, or [create your own outcome](#create-an-outcome) for a feature or service you want to measure.
4. Investigate outcomes where the cost per unit is rising, and share results with finance and product teams to inform planning decisions. For examples, see [Use cases](#use-cases).

## View outcomes

The Outcomes page shows each outcome your organization tracks as a card, so you can see at a glance how much each unit of value costs and which way it's trending.

{{< img src="cloud_cost/planning/outcomes-overview-1.png" alt="The Outcomes page grouped by team, showing tracked outcomes such as cost per customer support ticket, cost per PR merged, and cost per active Anthropic user, each with its cost per unit, change from the previous period, and a trend graph" style="width:100%;" >}}

Each card shows:

- {{< ui >}}Cost per unit{{< /ui >}}: The cost of each outcome during the selected time frame.
  - _Example: `$14.98 / 1M tokens` means you spent $14.98 for every million tokens processed._
- {{< ui >}}vs. previous period{{< /ui >}}: The percentage change in cost per unit compared to the previous period.
- {{< ui >}}Trend graph{{< /ui >}}: The cost per unit over time. Hover over the graph to see the value on a given day.
- {{< ui >}}Created by{{< /ui >}}: Whether Datadog suggested the outcome or someone in your organization created it, along with any teams or tags assigned to it.

## Suggested outcomes

If you've set up [AI Costs][2] for OpenAI or Anthropic, you might see suggestions such as cost per 1M OpenAI tokens, cost per 1M Anthropic tokens, cost per OpenAI user, and cost per Anthropic user.

{{< img src="cloud_cost/planning/outcomes-suggested-1.png" alt="Suggested outcomes created by Datadog, including cost per 1M OpenAI tokens, cost per 1M Anthropic tokens, cost per Anthropic user, and cost per OpenAI user, each with Dismiss and Start tracking buttons" style="width:100%;" >}}

Click {{< ui >}}Start tracking{{< /ui >}} to add a suggestion to your organization's outcomes, or click {{< ui >}}Dismiss{{< /ui >}} to hide one that isn't relevant to you.

## Create an outcome

Custom outcomes let you measure the value of anything you spend money on. Instead of exporting cost and usage data into a spreadsheet to calculate cost per unit by hand, you can pair a slice of your spend with any metric in Datadog and track the ratio over time.

1. Go to [**Cloud Cost > Plan > Outcomes**][1] and click {{< ui >}}New Outcome{{< /ui >}}.
2. {{< ui >}}Name the feature to track{{< /ui >}}: Give your outcome a descriptive name, such as `Cost per active Anthropic user`.
3. {{< ui >}}Define the cost{{< /ui >}}: Choose the costs you want to measure. Use {{< ui >}}Simple filtering{{< /ui >}} to pick values such as {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Org Type{{< /ui >}}, or {{< ui >}}Model{{< /ui >}}, and click {{< ui >}}+ Filter{{< /ui >}} to add more tags. For more control, use {{< ui >}}Advanced filtering{{< /ui >}} to write a cost query.
4. {{< ui >}}Define the outcome{{< /ui >}}: Query the metric that represents the result you're paying for, such as merged pull requests, successful chat sessions, or active users.
5. {{< ui >}}Add tags{{< /ui >}}: Assign the outcome to the [{{< ui >}}Teams{{< /ui >}}][4] that own it, and add any {{< ui >}}Tags{{< /ui >}} you want to filter by, so the right people can find and track it.
6. Check the {{< ui >}}Preview{{< /ui >}} panel, then click {{< ui >}}Save Outcome{{< /ui >}}.

{{< img src="cloud_cost/planning/outcomes-create-1.png" alt="The outcome editor with steps to name the feature, define the cost by filtering on provider and org type, define the outcome with a metric query, and add teams and tags, next to a preview of the total cost and cost per Anthropic user" style="width:100%;" >}}

_Example: $37,300 in enterprise Anthropic spend across 46 active users works out to $809.92 per Anthropic user._

## Add outcomes to dashboards and notebooks

Add outcomes to [dashboards][7] and [notebooks][8] to track your unit economics alongside the operational metrics that drive them. For example, place cost per completed order next to checkout latency and error rates, so you can see how performance changes affect what each order costs.

## Use cases

### Understand the cost of each AI user

Your organization pays for an enterprise Anthropic plan, and adoption is growing. Finance wants to know what each active user costs, and whether that cost holds steady as more people start using it.

To answer this, create an outcome named `Cost per active Anthropic user`. Under {{< ui >}}Define the cost{{< /ui >}}, set {{< ui >}}Provider{{< /ui >}} to `Anthropic` and {{< ui >}}Org Type{{< /ui >}} to `enterprise`. Under {{< ui >}}Define the outcome{{< /ui >}}, query your Anthropic token usage metric, sum it by the user tag (such as `user_name`), and apply [`count_nonzero`][5] to count everyone who used it during the time frame. Set the display label to `Anthropic user`.

The outcome shows what each active user costs over time. If cost per user climbs faster than adoption, a small group of heavy users might be driving most of the spend. Create a matching outcome for each AI provider to compare them side by side, and use the results to guide license and seat planning.

If you care more about efficiency than headcount, track cost per 1M tokens instead. A falling cost per 1M tokens after you move workloads to a smaller model confirms that the change reduced cost without reducing usage.

### Understand the cost of each order

Your checkout service runs on cloud compute and a managed database, and its infrastructure bill grows every month. You want to know whether that growth comes from more orders or from less efficient infrastructure.

To answer this, create an outcome named `Cost per completed order`. Under {{< ui >}}Define the cost{{< /ui >}}, filter to the resources that serve checkout, such as those tagged `service:checkout`. Under {{< ui >}}Define the outcome{{< /ui >}}, query the [custom metric][6] your application emits for each completed order, and set the display label to `order`.

If total cost rises but cost per order stays flat, your spend is scaling with demand. If cost per order rises, look for recent changes that made your infrastructure less efficient. You can also use this outcome to show the business impact of optimizations, such as rightsizing or new commitments, in a unit that finance and product teams understand.

The same approach works for any result you can measure in Datadog, such as cost per merged pull request, cost per successful chat session, or cost per API request.

## Permissions

| Action | Required Permission |
|--------|---------------------|
| View outcomes | `cloud_cost_management_read` |
| Create, edit, or delete an outcome | `cloud_cost_management_write` |

For the full list of CCM permissions, see the [Permissions documentation][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/plan/outcomes
[2]: /cloud_cost_management/ai_costs/
[3]: /cloud_cost_management/setup/permissions
[4]: /account_management/teams/
[5]: /dashboards/functions/count/
[6]: /metrics/custom_metrics/
[7]: /dashboards/
[8]: /notebooks/
