---
title: Global Lift
description: Understand how an experiment affects your metric totals across your entire user population.
aliases:
  - /product_analytics/experimentation/global_lift/
  - /experiments/global_lift
  - /experiments/global_lift/
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-product-analytics/"
  tag: "Blog"
  text: "Make data-driven design decisions with Product Analytics"
- link: "/experiments/reading_results/"
  tag: "Documentation"
  text: "Reading Experiment Results"
- link: "/experiments/defining_metrics/"
  tag: "Documentation"
  text: "Create Experiment Metrics"
---

## Overview

Experiments typically enroll only a subset of your users. Global lift answers the question: if you released this change out to all eligible users, how would your overall metric totals change?

For example, if an experiment shows a 10% lift in revenue per user but the experiment's eligible population accounts for only 20% of your total revenue, the estimated impact on global revenue is approximately 2%. This is useful when deciding whether to ship a change: a treatment that looks impressive within an experiment may have a smaller impact on business-level totals if it applies to a narrow audience.

Datadog reports global lift alongside _coverage_, a factor that quantifies how much of your overall metric value comes from the eligible population. Global lift is the product of coverage and the experiment's observed (local) lift.

## User populations

Every experiment divides your user base into three groups:

| Population | Description |
|---|---|
| **Ineligible** | Users who were never eligible (wrong page, targeting criteria not met, or other eligibility conditions). Their behavior is not affected by any rollout decision. |
| **Eligible, not enrolled** | Users who met the eligibility criteria but were excluded due to traffic exposure settings. |
| **Enrolled** | Users assigned to the treatment or control variant. |

Global lift focuses on the eligible population—enrolled users plus users who were eligible but not enrolled—and estimates the metric impact if that population were entirely switched from control to treatment. If the treatment were fully released, the eligible population would capture all users who would interact with it.

## Coverage

Coverage is the estimated proportion of your global metric total that would come from the eligible population if the control experience were rolled out to all eligible users. The formula is:

```
Coverage = FER_C / TM_C
```

| Symbol | Definition |
|---|---|
| `FER_C` | Estimated metric total for the full eligible population under a control-only rollout |
| `TM_C` | Estimated global metric total under a control-only rollout |

These values are estimated from observed experiment data:

```
FER_C = X_C / (p_C × t_exp)

TM_C  = TM − TEM + (X_C / p_C)
```

| Symbol | Definition |
|---|---|
| `X_C` | Observed metric total in the control variant |
| `X_T` | Observed metric total in the treatment variant |
| `TEM` | Observed experiment metric total: `X_T + X_C` |
| `TM` | Observed metric total across all users (enrolled and non-enrolled) |
| `t_exp` | Fraction of eligible users enrolled in the experiment |
| `p_C` | Fraction of enrolled users assigned to the control variant |

**Intuition for `FER_C`:** The control variant is a representative sample of the eligible population. The fraction of eligible users that ended up in the control group is `p_C × t_exp`, so dividing `X_C` by that fraction scales the control group's metric total up to the full eligible population.

**Intuition for `TM_C`:** Start from the observed global total (`TM`), remove the enrolled users' observed contribution (`TEM`), and replace it with what those users would have generated under full control (`X_C / p_C`). The ineligible users' contribution remains unchanged.

## Global lift

Global lift is the product of coverage and the experiment's local lift:

```
Global lift = Coverage × Local lift
```

Local lift is the relative per-subject lift measured within the experiment:

```
                (Average metric value per treatment subject) − (Average metric value per control subject)
Local lift =  ──────────────────────────────────────────────────────────────────────────────────────────
                                  (Average metric value per control subject)
```

### Example

Consider an experiment with the following observed values:

- 50/50 traffic split (p_C = 0.5)
- All eligible users are enrolled (t_exp = 1.0)
- Control revenue: $100 (`X_C`)
- Treatment revenue: $110 (`X_T`)
- Total revenue across all users: $1,010 (`TM`)

The global lift calculation proceeds as follows:

| Step | Calculation | Value |
|---|---|---|
| `TEM` | $100 + $110 | $210 |
| `FER_C` | $100 / (0.5 × 1.0) | $200 |
| `TM_C` | $1,010 − $210 + ($100 / 0.5) | $1,000 |
| Coverage | $200 / $1,000 | 20% |
| Local lift | ($110 − $100) / $100 | 10% |
| **Global lift** | 20% × 10% | **2%** |

In other words, rolling this treatment out to all eligible users would increase total revenue by 2%, from $1,000 (the control-only counterfactual) to $1,020.

## Supported metrics

Global lift is calculated for these aggregation types: `count` and `sum`.

**Note**: Closed (windowed) metrics—those that restrict fact values to a time window relative to assignment—are not supported for global lift.

## Further reading
{{< partial name="whats-next/whats-next.html" >}}
