---
title: Set and Enforce AI Gateway Budgets
description: Choose shared or per-value spending allowances, inspect usage, and adjust an AI Gateway budget for its active period.
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

## Overview

Use AI Gateway budgets to track spending over a UTC calendar day, week, or month. Choose a shared allowance for a group of callers, or give each matching user, team, model, provider, or tag value its own allowance.

For the basic creation workflow, see [Set budgets][1]. This guide covers scope, independent allowances, and changes to an active budget.

## Prerequisites

- [AI Gateway access and a configured provider][2].
- The `ai_gateway_config_read` permission to inspect budgets and `ai_gateway_config_write` to change them.
- [Datadog API credentials][3] for the API examples. The application key's principal and scope must allow the required permissions.
- A model with a usable price. Budget enforcement requires AI Gateway to calculate request cost. Check the price in the [Model Catalog][4].

## Choose a shared or per-value allowance

A budget's selector defines both the traffic it matches and how it groups spending. The [AI Gateway API][5] supports these selector dimensions:

| Dimension | Matches |
|---|---|
| `user_id` | The authenticated user's ID. |
| `team_id` | A matching Datadog team ID. Team selection follows the [Gateway team header rules][1]. |
| `model` | The resolved destination model, including a destination selected by routing or fallback. |
| `provider` | The resolved destination provider. |
| `tag:<KEY>` | A custom request tag, such as `tag:project` for the header `x-dd-tag-project`. |

Every selector entry must match. Within an entry, `values` accepts any of the listed values; omit it to accept any present value for that dimension.

Set `per_value` to control how the allowance is shared:

| Configuration | Result for a $100 monthly budget |
|---|---|
| All entries use `per_value: false` | All matching traffic shares $100. |
| `user_id` uses `per_value: true` | Each matching user has $100. |
| `user_id` and `tag:project` use `per_value: true` | Each distinct user and project combination has $100. |
| `tag:project` filters to `search`, and `user_id` uses `per_value: true` | Each user has $100 for traffic tagged `project:search`. |

A separate allowance is an **instance** of the budget. A per-value budget's base capacity is the allowance for each instance, not a total spending cap for the budget. Add a separate shared budget if you also need an overall cap.

A request missing a per-value dimension does not match that budget. For example, a budget split by `tag:project` does not cover requests without `x-dd-tag-project`. Review untracked spend and add a shared budget for coverage where needed.

### Create independent monthly allowances

The following request creates a $100 monthly allowance for each user sending requests tagged `project:search`. API amounts use microcents: **$1 = 100,000,000 microcents**. Replace the credentials before running the example. The site selector updates the API host.

```shell
curl -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/budgets" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  -d '{
    "data": {
      "type": "budgets",
      "attributes": {
        "name": "Monthly search allowance per user",
        "selector": [
          {"dim": "tag:project", "values": ["search"], "per_value": false},
          {"dim": "user_id", "per_value": true}
        ],
        "capacity_microcents": 10000000000,
        "window_policy": "MONTHLY",
        "warning_threshold": 0.9,
        "enforcement": "NOTIFY"
      }
    }
  }'
```

Use `DAILY`, `WEEKLY`, or `MONTHLY` for `window_policy`. `NOTIFY` (Alert-only in the UI) keeps requests flowing when an allowance is exhausted. `BLOCK` (Block in the UI) rejects new matching requests with HTTP `402`. Start with `NOTIFY` and review coverage before switching to `BLOCK`.

`enforcement` is required and has no default. `warning_threshold` is a fraction greater than `0` and at most `1`; it defaults to `0.9` (90%). Omitted `per_value` and `track_existing` fields default to `false`.

To include earlier matching usage from the same accounting window, set `track_existing: true`. This includes priced usage recorded in Agent Observability, with a separate starting amount for each instance. Verify the resulting spend after creation. Requests in progress or usage not yet recorded can be absent. Subscription-funded usage is excluded.

Historical usage cannot be imported for selectors that depend on tags removed or replaced in recorded spans, such as `tag:env` or `tag:ml_app`. This also applies to custom tag keys beginning with `gateway.`. Use application-specific custom tags, such as `project`, for historical accounting.

The API also rejects empty filter values and per-value lists with values that recorded spans cannot distinguish, such as `Prod` and `prod`. Team selectors require complete historical team accounting data. If validation cannot confirm these requirements, the API returns HTTP `400` for `track_existing` before saving the create or update. The field is not silently ignored.

## Inspect budget instances

Save the budget ID returned at creation. List its instances:

```shell
curl "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/budgets/<BUDGET_ID>/instances" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

For each instance, review `split_dims`, `spend_microcents`, and `effective_capacity_microcents`. Copy `instance_key` from this response when adjusting one instance; do not construct it from dimension values.

Use `GET /api/v2/budgets/<BUDGET_ID>/instances/summary` for aggregate spend and counts of instances approaching or exceeding their allowance. Use the `window` query parameter to inspect a previous accounting window. See the [API reference][5] for filters and pagination.

## Adjust an active budget

Choose whether a change should affect the base allowance for future periods or only the active period.

| Goal | API operation | Effect |
|---|---|---|
| Change the base allowance | `PATCH /api/v2/budgets/<BUDGET_ID>` with `capacity_microcents` | Changes the capacity for future periods. |
| Give one instance temporary capacity | `POST /api/v2/budgets/<BUDGET_ID>/instances/capacity` with `instance_key`, `capacity_microcents`, and optional `reason` | Changes only that instance's active-period allowance. |
| Change all existing instances for this period | `PATCH /api/v2/budgets/<BUDGET_ID>/current-period` with `capacity_microcents` and optional `reason` | Overrides the active period. For a per-value budget, affects existing instances only. |
| Reset one instance's spend | `POST /api/v2/budgets/<BUDGET_ID>/instances/reset` with `instance_key` and optional `reason` | Resets that instance's active-period spend and records the adjustment. |
| Reset spend for all active instances | `POST /api/v2/budgets/<BUDGET_ID>/current-period/reset` with optional `reason` | Resets spend for the active instances and records the adjustment. |

An active-period override expires when the period ends; the next period uses the base allowance. Resetting an instance's spend changes budget accounting, not the underlying requests or provider charges. Include a reason to explain the adjustment.

A fixed-scope budget uses the API's `user_id`, `team_id`, or `tags` fields without a `selector`. It has one shared allowance. For these budgets, `apply_to_current_period: true` on a definition update also changes the active allowance. Selector-based budgets reject this option; use the period or instance operations instead. An override for all existing instances returns HTTP `409` if no instances exist yet.

Scope and window policy cannot be changed on an existing budget. Create a replacement when either changes. Deleting a budget archives it and retains period history.

## Verify coverage and enforcement

Use a dedicated test tag and a small allowance to check the configuration before applying it to production traffic.

1. Send a request with the tag that the budget matches. Confirm the request succeeds and its cost appears in the expected instance.
2. For a per-value budget, send requests from two different matching users or tag values. Confirm they appear as separate instances.
3. Send a request without the split tag. Confirm it does not count against that budget, then check whether a shared budget covers it.
4. In Alert-only mode (`NOTIFY`), confirm requests continue after an allowance is exhausted. In Block mode (`BLOCK`), confirm a new matching request returns HTTP `402` with `budget_exceeded`.
5. Confirm another instance with available capacity can still send requests, unless a separate shared budget is also exhausted.

A request counts against every matching budget. An available personal allowance does not bypass an exhausted team or organization allowance. Responses already in progress can complete after an allowance is reached.

## Troubleshoot budget accounting

| Symptom | Check |
|---|---|
| Spend does not appear in an instance | Check the caller, team selection, tag spelling, and every selector entry. Check model pricing and allow time for completed requests to appear. |
| All callers consume the same allowance | Check that the dimension intended to have independent allowances uses `per_value: true`. |
| An allowance changed next period but not this period | Update the active instance or accounting period separately from the base capacity. |
| A request fails with `budget_pricing_unavailable` | Set a usable price for a model billed per token in the [Model Catalog][4], choose a priced model, or switch to Alert-only (`NOTIFY`). |
| Aggregate spend exceeds the base capacity | For a per-value budget, compare each instance to its own effective capacity. The base capacity is not the total cap. |

[1]: /llm_observability/configure/ai_gateway/#set-budgets
[2]: /llm_observability/configure/ai_gateway/#get-started
[3]: /account_management/api-app-keys/
[4]: https://app.datadoghq.com/llm/gateway/model-catalog
[5]: /api/latest/ai-gateway/
