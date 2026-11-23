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
---

<div class="alert alert-info">Outcomes is in Preview.</div>

## Overview

Cloud Cost Management (CCM) Outcomes help you understand your unit economics. An outcome divides a slice of your spend by the result that spend produces, such as tokens processed, active users, or completed orders, and tracks the cost per unit over time.

With Outcomes, you can:

- Measure the **return on investment** of a feature, product, or AI tool by tracking its cost per result.
- Track **efficiency trends** over time. For example, confirm that your cost per 1M tokens decreases after you switch models.
- Compare **cost per unit** across providers, teams, or services to find where spend is most and least efficient.
- Start from **suggested outcomes** that Datadog creates from your cost data, or **create your own** to match the metrics your business cares about.

## View outcomes

Navigate to [**Cloud Cost > Plan > Outcomes**][1] to see your organization's outcomes.

{{< img src="cloud_cost/planning/outcomes-overview.png" alt="The Outcomes page in Cloud Cost Management showing suggested outcomes such as cost per 1M OpenAI tokens, cost per 1M Anthropic tokens, cost per Anthropic user, and cost per OpenAI user" style="width:100%;" >}}

Each outcome card shows:

- **Cost per unit**: The current cost per outcome for the selected time frame, for example `$14.98 / 1M tokens`.
- **Change versus previous period**: The percentage change in cost per unit. A decrease (green, downward arrow) means each unit costs less than in the previous period. An increase (red, upward arrow) means each unit costs more.
- **Trend graph**: The cost per unit over time. Hover over the graph to see the value at a point in time.
- **Created by**: Whether Datadog suggested the outcome or a user in your organization created it.

### Suggested outcomes

Datadog suggests outcomes based on the cost data available in your organization. For example, if you have [AI Costs][2] set up for OpenAI or Anthropic, suggestions can include:

- Cost per 1M OpenAI tokens
- Cost per 1M Anthropic tokens
- Cost per OpenAI user
- Cost per Anthropic user

{{< img src="cloud_cost/planning/outcomes-suggested-card.png" alt="A suggested outcome card for cost per 1M Anthropic tokens, showing a 47% decrease compared to the previous period, a trend graph, and a Start tracking button" style="width:70%;" >}}

On a suggested outcome card:

- Click {{< ui >}}Start tracking{{< /ui >}} to add the outcome to your organization's tracked outcomes.
- Click {{< ui >}}Dismiss{{< /ui >}} to hide a suggestion that isn't relevant to you.

## Create an outcome

To create an outcome:

1. Navigate to [**Cloud Cost > Plan > Outcomes**][1].
1. Click {{< ui >}}New Outcome{{< /ui >}}.
1. {{< ui >}}Name the feature to track{{< /ui >}}: Enter a descriptive name, such as `Cost per active Anthropic user`.
1. {{< ui >}}Define the cost{{< /ui >}}: Scope the costs that make up the numerator of the ratio.
   - Use {{< ui >}}Simple filtering{{< /ui >}} to select values from dropdowns, such as {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Org Type{{< /ui >}}, {{< ui >}}Model{{< /ui >}}, or {{< ui >}}User{{< /ui >}}. Click {{< ui >}}+ Filter{{< /ui >}} to filter on additional tags.
   - Use {{< ui >}}Advanced filtering{{< /ui >}} to write a cost query directly.
1. {{< ui >}}Define the outcome{{< /ui >}}: Query the metric that represents the outcome, which becomes the denominator of the ratio.
   - (Optional) Enter a {{< ui >}}Display label{{< /ui >}}, such as `Anthropic user`. Datadog uses the label to describe the unit, for example `$810.03 per Anthropic user`.
   - Build the query with the metric query editor. Click {{< ui >}}Add Query{{< /ui >}} to combine more than one metric, and {{< ui >}}Add Formula{{< /ui >}} to combine them with a formula.
1. {{< ui >}}Add tags{{< /ui >}}: Assign the outcome to one or more teams so the right owners can find and track it.
1. Review the {{< ui >}}Preview{{< /ui >}} panel, then click {{< ui >}}Save{{< /ui >}}.

{{< img src="cloud_cost/planning/outcomes-create.png" alt="The outcome editor with steps to name the feature, define the cost by filtering on provider and org type, define the outcome with a metric query, and add tags, next to a preview of the total cost and cost per Anthropic user" style="width:100%;" >}}

The {{< ui >}}Preview{{< /ui >}} panel updates as you edit and shows:

- **Total cost**: The cost that matches your filters for the selected time frame, graphed alongside the outcome metric.
- **Cost per outcome**: The total cost divided by the outcome value, for example `$37.3k / 46 Anthropic users = $810.03 per Anthropic user`.

## Use cases

### AI costs: Measure cost per active user of an AI tool

Your organization has an enterprise Anthropic plan. You want to know what each active user costs and whether the cost per user rises as adoption grows.

1. {{< ui >}}Name the feature to track{{< /ui >}}: `Cost per active Anthropic user`.
1. {{< ui >}}Define the cost{{< /ui >}}: With {{< ui >}}Simple filtering{{< /ui >}}, set {{< ui >}}Provider{{< /ui >}} to `Anthropic` and {{< ui >}}Org Type{{< /ui >}} to `enterprise`.
1. {{< ui >}}Define the outcome{{< /ui >}}: Set the {{< ui >}}Display label{{< /ui >}} to `Anthropic user`. Query your Anthropic token usage metric, sum it by the user tag (for example, `user_name`), and apply `count_nonzero`. This counts the users with any usage in the time frame.
1. {{< ui >}}Add tags{{< /ui >}}: Assign the outcome to the team that owns your AI tooling budget.

The result shows the cost per active user over time, for example `$810.03 per Anthropic user`. Use this outcome to:

- Spot cost per user rising faster than adoption, which can point to heavy usage concentrated in a small group of users.
- Compare cost per user across AI providers by creating an outcome for each provider, such as `Cost per active OpenAI user`.
- Inform license and seat planning conversations with real usage data.

To measure cost efficiency per request instead of per user, track **cost per 1M tokens**. Use the same cost filter and a token count metric as the outcome. A falling cost per 1M tokens can confirm that a change, such as moving workloads to a smaller model, reduced cost without reducing usage.

### Cloud infrastructure costs: Measure cost per completed order

Your e-commerce checkout service runs on cloud compute and a managed database. Infrastructure spend grows every month, and you want to know if the growth reflects more business or less efficiency.

1. {{< ui >}}Name the feature to track{{< /ui >}}: `Cost per completed order`.
1. {{< ui >}}Define the cost{{< /ui >}}: Filter costs to the resources that serve checkout, for example with a `service:checkout` tag. To include shared infrastructure, use {{< ui >}}Advanced filtering{{< /ui >}} to combine multiple tags.
1. {{< ui >}}Define the outcome{{< /ui >}}: Set the {{< ui >}}Display label{{< /ui >}} to `order`. Query the metric that counts completed orders, such as a custom metric that your application emits for each successful checkout.
1. {{< ui >}}Add tags{{< /ui >}}: Assign the outcome to the team that owns the checkout service.

The result shows how much infrastructure spend each order requires. Use this outcome to:

- Separate healthy growth from waste. If total cost rises but cost per order stays flat, spend is scaling with demand. If cost per order rises, investigate recent changes for inefficiencies.
- Measure the impact of optimizations, such as rightsizing or commitment purchases, in business terms.
- Report infrastructure efficiency to finance and product stakeholders in a unit they understand.

The same approach works for other business outcomes, such as cost per merged pull request, cost per successful chat session, or cost per API request.

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
