---
title: Control AI Gateway Spend and Usage
description: Configure budgets and rate limits, review matching traffic, and monitor spending and usage.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Before you begin, review the [AI Gateway prerequisites](/ai_gateway/getting_started/#prerequisites).

## Set budgets

A budget tracks spend for matching AI Gateway traffic over a UTC calendar day, week, or month. It can block requests when the limit is reached.

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Budgets{{< /ui >}}][9] and click {{< ui >}}New budget{{< /ui >}}.
2. Choose the traffic to match. Select {{< ui >}}Everything{{< /ui >}} to track all AI Gateway spend, or match a user, team, model, provider, or custom tag. Send a custom tag in an `x-dd-tag-<KEY>: <VALUE>` request header, for example `x-dd-tag-ai_agent: claudecode`. A request matches the budget when it includes every filter you selected. The form estimates historical matches and links to the matching spans in Agent Observability.
3. Enter a spend limit and select a {{< ui >}}Daily{{< /ui >}}, {{< ui >}}Weekly{{< /ui >}}, or {{< ui >}}Monthly{{< /ui >}} window. The window follows the UTC calendar.
4. Review {{< ui >}}Track existing usage for current period{{< /ui >}}, which is selected by default when it is available for the budget configuration. It includes matching, priced usage already recorded in Agent Observability during the current window, including usage from before budget creation. After you save the budget, verify its starting spend. Requests still in progress or usage not yet recorded might be absent from that initial amount. Clear the option to count only spend from after you create the budget.
5. Choose an enforcement mode and a warning threshold, then save the budget.

| Enforcement mode | Behavior |
|---|---|
| Block | Matching requests are rejected with HTTP `402` until the window resets. |
| Alert-only | Requests continue. The monitor `AI Gateway budget: <BUDGET_NAME>` alerts at the warning threshold and at the limit. |

When a budget is scoped to a [Datadog team][13], it applies to requests from that team's members. To select a team, send `x-ai-gateway-team: <TEAM_SLUG>` with the slug of a team the caller belongs to. The header selects which team's budgets apply; matching personal and organization-wide budgets also apply. A request without the header matches the budgets of every team the caller directly belongs to, and its full cost counts against each of them. Team selection does not grant model access. See [Error codes](/ai_gateway/troubleshooting/#error-codes) for invalid or unauthorized team selections.

Datadog creates a [monitor][10] named `AI Gateway budget: <BUDGET_NAME>` for each budget and notifies the budget creator at the warning threshold and when the limit is reached. On the budget's details page, click the monitor icon next to {{< ui >}}Warning threshold{{< /ui >}} to change the recipients and message.

The budget list shows active budgets, tracked spend, budgets at risk, and **Untracked** spend that doesn't match a budget. A budget created in the UI includes earlier matching usage from the current period when {{< ui >}}Track existing usage for current period{{< /ui >}} is selected, which is the default. A budget created through the API counts only spend from after you create it unless you set `track_existing`. Use the Team, User, Model, Provider, and Tag filters to review coverage.

### Budget prerequisites

- [AI Gateway access and a configured provider][budgets-2].
- The `ai_gateway_config_read` permission to inspect budgets and `ai_gateway_config_write` to change them.
- [Datadog API credentials][budgets-3] for the API examples. The application key's principal and scope must allow the required permissions.
- A model with a usable price. Budget enforcement requires AI Gateway to calculate request cost. Check the price in the [Model Catalog][budgets-4].

### Choose a shared or per-value allowance

A budget's selector defines both the traffic it matches and how it groups spending. The [AI Gateway API][budgets-5] supports the following selector dimensions:

| Dimension | Matches |
|---|---|
| `user_id` | The authenticated user's ID. |
| `team_id` | A matching Datadog team ID. Team selection follows the [AI Gateway team header rules][budgets-1]. |
| `model` | The resolved destination model, including a destination selected by routing or fallback. |
| `provider` | The resolved destination provider. |
| `tag:<KEY>` | A custom request tag, such as `tag:project` for the header `x-dd-tag-project`. |

Every selector entry must match. Within an entry, `values` accepts any of the listed values. With `per_value: true`, omit `values` to accept any present value for that dimension. An entry with neither `values` nor `per_value: true` is ignored, and a selector with no remaining entries matches all traffic.

Set `per_value` to control how the allowance is shared:

| Configuration | Result for a $100 monthly budget |
|---|---|
| All entries use `per_value: false` | All matching traffic shares $100. |
| `user_id` uses `per_value: true` | Each matching user has $100. |
| `user_id` and `tag:project` use `per_value: true` | Each distinct user and project combination has $100. |
| `tag:project` filters to `search`, and `user_id` uses `per_value: true` | Each user has $100 for traffic tagged `project:search`. |

A separate allowance is an **instance** of the budget. A per-value budget's base capacity is the allowance for each instance, not a total spending cap for the budget. Add a separate shared budget if you also need an overall cap.

A request missing a per-value dimension does not match that budget. For example, a budget split by `tag:project` does not cover requests without `x-dd-tag-project`. Review untracked spend and add a shared budget for coverage where needed.

#### Create independent monthly allowances

API amounts use microcents: **$1 = 100,000,000 microcents**. Replace the credentials before running the example. The site selector updates the API host. The following request creates a $100 monthly allowance for each user sending requests tagged `project:search`:

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

In the request body:

- `enforcement` is required and has no default.
- `warning_threshold` is a fraction greater than `0` and at most `1`. It defaults to `0.9` (90%).
- `per_value` and `track_existing` default to `false` when omitted.

To include earlier matching usage from the same accounting window, set `track_existing: true`. This includes priced usage recorded in Agent Observability, with a separate starting amount for each instance. Verify the resulting spend after creation. Requests in progress or usage not yet recorded can be absent. Subscription-funded usage is excluded.

Historical usage cannot be imported for selectors that depend on tags removed or replaced in recorded spans, such as `tag:env` or `tag:ml_app`. This also applies to custom tag keys beginning with `gateway.`. Use application-specific custom tags, such as `project`, for historical accounting.

The API also rejects empty filter values and per-value lists with values that recorded spans cannot distinguish, such as `Prod` and `prod`. Team selectors require complete historical team accounting data. If validation cannot confirm these requirements, the API returns HTTP `400` for `track_existing` before saving the create or update. This check applies to selector-based budgets. In other cases, a failed import still returns success and the budget starts at zero, so verify the starting spend.

### Inspect budget instances

Save the budget ID returned at creation. List its instances:

```shell
curl "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/budgets/<BUDGET_ID>/instances" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

For each instance, review `split_dims`, `spend_microcents`, and `effective_capacity_microcents`. Copy `instance_key` from this response when adjusting one instance; do not construct it from dimension values.

Use `GET /api/v2/budgets/<BUDGET_ID>/instances/summary` for aggregate spend and counts of instances approaching or exceeding their allowance. Use the `window` query parameter to inspect a previous accounting window. See the [API reference][budgets-5] for filters and pagination.

### Adjust an active budget

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

### Verify coverage and enforcement

Use a dedicated test tag and a small allowance to check the configuration before applying it to production traffic.

1. Send a request with the tag that the budget matches. Confirm the request succeeds and its cost appears in the expected instance.
2. For a per-value budget, send requests from two different matching users or tag values. Confirm they appear as separate instances.
3. Send a request without the split tag. Confirm it does not count against that budget, then check whether a shared budget covers it.
4. In Alert-only mode (`NOTIFY`), confirm requests continue after an allowance is exhausted. In Block mode (`BLOCK`), confirm a new matching request returns HTTP `402` with `budget_exceeded`.
5. Confirm another instance with available capacity can still send requests, unless a separate shared budget is also exhausted.

A request counts against every matching budget. An available personal allowance does not bypass an exhausted team or organization allowance. Responses already in progress can complete after an allowance is reached.

### Troubleshoot budget accounting

| Symptom | Check |
|---|---|
| Spend does not appear in an instance | Check the caller, team selection, tag spelling, and every selector entry. Check model pricing and allow time for completed requests to appear. |
| All callers consume the same allowance | Check that the dimension intended to have independent allowances uses `per_value: true`. |
| An allowance changed next period but not this period | Update the active instance or accounting period separately from the base capacity. |
| A request fails with `budget_pricing_unavailable` | Set a usable price for a model billed per token in the [Model Catalog][budgets-4], choose a priced model, or switch to Alert-only (`NOTIFY`). |
| Aggregate spend exceeds the base capacity | For a per-value budget, compare each instance to its own effective capacity. The base capacity is not the total cap. |

## Set rate limits

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Rate limits are in Preview. To enable them for your organization, contact your Customer Success Manager.
{{< /callout >}}

A rate limit caps matching AI Gateway requests, input tokens, output tokens, or spend over a rolling window. Use rate limits to protect provider quota from runaway agents or scripts, share capacity between teams, or cap traffic to an expensive model. [Budgets](/ai_gateway/spend_controls/#set-budgets) cap spend over a day, week, or month; rate limits cap traffic over a rolling minute. Windows longer than a minute, up to 24 hours, are enabled per organization during the Preview. To request them, contact your Customer Success Manager.

### Create a rate limit

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Rate limits{{< /ui >}}][15] and click {{< ui >}}New rate limit{{< /ui >}}.
2. Choose the traffic to match. Leave the scope empty to cover all AI Gateway traffic in your organization, or match a user, team, model, provider, or custom tag. Send a custom tag in an `x-dd-tag-<KEY>: <VALUE>` request header. A request matches the rate limit when it includes every filter you selected.
3. Set at least one limit: {{< ui >}}Requests / minute{{< /ui >}}, {{< ui >}}Input tokens / minute{{< /ui >}}, or {{< ui >}}Output tokens / minute{{< /ui >}}.
4. Choose a mode, then save the rate limit.

| Mode | Behavior |
|---|---|
| Alert | Requests over the limit continue. The rate limit shows the {{< ui >}}Would limit{{< /ui >}} status. This is the default mode. |
| Enforce | New requests over the limit are rejected with HTTP `429`. Streaming responses that are already in progress finish. |

Start in Alert mode, review the {{< ui >}}Would limit{{< /ui >}} status for a few days, then switch to Enforce mode.

### How rate limits are counted

- Per-minute limits apply to a rolling 60-second window. Longer windows are also available. See [Choose the metric and window](#choose-the-metric-and-window).
- A shared rule pools matching traffic into one allowance. For example, a shared team rule of 600 requests per minute gives the whole team 600 requests. Per-value rules give each matching value its own allowance.
- A request counts against every rate limit it matches. AI Gateway accepts it only if every matching rate limit in Enforce mode has available capacity.
- Tokens and cost count when a response completes, so requests already in progress can take usage over a limit.
- A rate limit scoped to a [Datadog team][13] applies to requests that select that team with the header `x-ai-gateway-team: <TEAM_SLUG>`. Use the slug of a team the caller belongs to. Without the header, it applies to requests from users who directly belong to the team.
- If a request falls back to another destination, it counts once against each rate limit.
- Your organization can have up to 100 active rate limits. Changes apply within a few seconds.
- If AI Gateway cannot check a rate limit, it accepts the request.

AI Gateway rate limits are separate from your model provider's rate limits. A request can stay under every AI Gateway rate limit and still receive a `429` from the provider.

### Rate-limited responses

When a rate limit in Enforce mode rejects a request, AI Gateway returns HTTP `429` with the `gateway_rate_limit` error code. The response uses the error format of the API you called (OpenAI, Anthropic, or Gemini). The response includes these headers:

| Header | Value |
|---|---|
| `Retry-After` | Seconds until the request fits within the rate limit. |
| `X-Ai-Gateway-Error-Code` | `gateway_rate_limit`. A provider `429` does not include this header. |
| `X-Ai-Gateway-Ratelimit-Id` | The ID of the rate limit that rejected the request. |
| `X-Ai-Gateway-Ratelimit-Window` | The longer rolling window that was exceeded, such as `1h`. Absent when a per-minute limit rejected the request. |
| `X-Ai-Gateway-Ratelimit-Limit-<METRIC>` | The allowance that was exceeded. |
| `X-Ai-Gateway-Ratelimit-Remaining-<METRIC>` | `0`. |
| `X-Ai-Gateway-Ratelimit-Reset-<METRIC>` | Time until the request fits, for example `12s`. |

`<METRIC>` is `Requests`, `Input-Tokens`, `Output-Tokens`, or `Cost`, depending on which limit was exceeded. `Cost` header values are in microcents ($1 = 100,000,000 microcents). For example, a request that exceeds a requests-per-minute limit returns `X-Ai-Gateway-Ratelimit-Limit-Requests`.

Clients that retry on `429` should wait for the `Retry-After` duration before they retry.

### Monitor rate limit usage

The rate limit list shows rolling-minute usage and status for each rule. It also shows requests limited in the last 15 minutes. Usage turns orange at 80% of a limit and red when the limit is reached.

| Status | Meaning |
|---|---|
| Within limit | Usage is below 80% of every limit. |
| Near limit | Usage is at 80% or more of at least one limit. |
| Limiting | An Enforce mode rate limit is full and rejects new requests. |
| Would limit | An Alert mode rate limit is full. Requests continue. |

When at least one rate limit exists, the list also includes an **Untracked** row for traffic that no Enforce mode rate limit matches.

### Rate limit prerequisites

- [AI Gateway access and a configured provider][rate_limits-2].
- The `ai_gateway_config_read` permission to inspect rate limits and `ai_gateway_config_write` to change them.
- [Datadog API credentials][rate_limits-3] for the API examples. The application key's principal and scope must allow the required permissions.
- A usable model price for enforced spend limits. Check the model in the [Model Catalog][rate_limits-4].

For the basic UI workflow and response headers, see [Set rate limits][rate_limits-5]. Longer windows and spend limits are configured through the [AI Gateway API][rate_limits-6]. Longer windows must be enabled for your organization. Without them, the API returns HTTP `400` with `rate_limit_windows_disabled`. The UI supports shared or per-value allowances for per-minute request and token limits.

### Choose the metric and window

A rate limit can contain up to four metric and window pairs, counting both per-minute and longer-window limits.

| Metric | Per-minute attribute | Longer-window `metric` | Unit |
|---|---|---|---|
| Requests | `requests_per_minute` | `requests` | Requests |
| Input tokens | `input_tokens_per_minute` | `input_tokens` | Tokens |
| Output tokens | `output_tokens_per_minute` | `output_tokens` | Tokens |
| Spend | `cost_microcents_per_minute` | `cost` | Microcents: $1 = 100,000,000 microcents |

Per-minute limits use a rolling 60-second window. For `window_limits`, choose `5m`, `15m`, `30m`, `1h`, `3h`, `6h`, `12h`, or `24h`. These are rolling windows, not calendar periods. Usage leaves each window in the following increments, so capacity can return up to one increment after the window duration:

| Window | Increment |
|---|---|
| `5m` | 30 seconds |
| `15m` | 1 minute |
| `30m` | 2 minutes |
| `1h` | 5 minutes |
| `3h` | 15 minutes |
| `6h` | 30 minutes |
| `12h` and `24h` | 1 hour |

Follow `Retry-After` when retrying.

Each metric and window pair must be unique. If a metric has more than one window, its allowance must increase as the window gets longer. For example, 60 requests per minute and 1000 requests per hour are valid together.

### Choose shared or independent allowances

Use `selector` to define matching traffic and whether it shares capacity:

- `dim` identifies `user_id`, `team_id`, `model`, `provider`, or a custom `tag:<KEY>`.
- `values` restricts the dimension to the listed values. With `per_value: true`, omit it to match any present value. An entry with neither `values` nor `per_value: true` is ignored.
- `per_value: false` pools traffic into a shared allowance.
- `per_value: true` gives each distinct matching value its own allowance.

Every selector entry must match. Multiple per-value dimensions create an allowance for each distinct combination. A request missing a per-value dimension does not match that rule. For example, a rule split by `tag:project` does not cover requests without an `x-dd-tag-project` header.

Model and provider dimensions use the resolved destination, including destinations selected through routing and fallback. Team matching follows the [AI Gateway team header rules][rate_limits-5]. Do not combine `selector` with the legacy `user_id`, `team_id`, or `tags` scope fields in the same API request.

A shared rule for a team with 600 requests per minute gives the team 600 requests in total. A rule split by user with the same amount gives each matching user 600 requests. Add a shared rule as well when you need an overall ceiling.

Your organization can have up to 100 active rules. A per-value rule counts as one rule; its instances do not each consume a rule.

#### Create per-project allowances

The example starts in Alert mode so requests continue while you review the scope. Replace the credentials before running it. The site selector updates the API host. The following example gives each project 60 requests per minute:

```shell
curl -X POST "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/rate-limits" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  -d '{
    "data": {
      "type": "rate-limits",
      "attributes": {
        "name": "Per-project request allowance",
        "selector": [{"dim": "tag:project", "per_value": true}],
        "requests_per_minute": 60,
        "mode": "ALERT"
      }
    }
  }'
```

Send `x-dd-tag-project: <PROJECT_NAME>` on inference requests. To pool specific projects into one allowance instead, list them in `values` and set `per_value: false`. If longer windows are enabled for your organization, add `window_limits`, for example `[{"metric": "requests", "window": "1h", "amount": 1000}]`.

### Choose a mode and enforcement behavior

| Mode | Behavior |
|---|---|
| `ALERT` | Requests continue when an allowance is exhausted. Usage shows that the rule would limit traffic. This is the default. |
| `ENFORCE` | New requests over a limit return HTTP `429` with `gateway_rate_limit`. Streaming responses already in progress finish. |

Every matching rule applies. A request succeeds only when every matching enforced rule has capacity, including any shared ceiling above a per-value allowance.

Tokens and cost are accounted for after responses complete. Requests in progress can therefore take usage above an allowance. A spend limit requires a usable model price; enforced spend limits reject requests to unpriced targets with HTTP `400` and `X-Ai-Gateway-Error-Code: rate_limit_pricing_unavailable`. This applies to OpenAI, Anthropic, and Gemini requests; Gemini uses the canonical status `FAILED_PRECONDITION`.

### Inspect usage and instances

Save the rule ID returned at creation. For a per-value rule, inspect its active instances:

```shell
curl "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/rate-limits/<RATE_LIMIT_ID>/instances" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

The instance list surfaces counters approaching a limit or recently limited, including counters that would have been limited in Alert mode. It is not a directory of every value that has ever sent traffic. Counters can take a few minutes to appear. Shared rules do not have per-value instance rows.

Use the following endpoints to review broader usage:

| Endpoint | Purpose |
|---|---|
| `GET /api/v2/rate-limits/usage` | Usage across rules, with untracked and total traffic. |
| `GET /api/v2/rate-limits/<RATE_LIMIT_ID>/instances/summary` | Summary of active instances for one rule. |
| `GET /api/v2/rate-limits/instances/summary` | Instance summaries across rules. |

Interpret the response metadata before treating an empty result as inactivity:

- `usage_known: false` means usage was not read, rather than confirmed as zero.
- `scope_restricted: true` means your permissions restrict the visible scope and instance details.
- `truncated: true` means the summary does not cover every matching instance.

The numeric request, token, and cost fields in usage and instance responses describe the rolling one-minute window. Do not interpret them as the usage for a longer window. For a longer-window rejection, inspect `X-Ai-Gateway-Ratelimit-Window` and `Retry-After`.

See the [API reference][rate_limits-6] for query parameters and response fields.

### Update a rule

Use `PATCH /api/v2/rate-limits/<RATE_LIMIT_ID>` to change the name, mode, or allowances. Updates do not reset usage, so lowering an allowance can immediately put existing usage over the limit.

- Set a per-minute attribute to `0` to remove that limit; omit it or send `null` to leave it unchanged.
- A non-empty `window_limits` array replaces all existing longer-window limits. Include every longer-window limit you want to keep.
- Set `window_limits` to an empty array to remove the longer-window limits; omit it or send `null` to leave them unchanged.
- Keep at least one positive limit, with no more than four metric and window pairs in total.
- A selector cannot be changed after creation. Create a replacement rule when the matching or splitting dimensions change. Verify the replacement, then remove the original with `DELETE /api/v2/rate-limits/<RATE_LIMIT_ID>` to avoid enforcing both rules.

### Verify scope and enforcement

Create a separate test rule with a low request allowance, such as `requests_per_minute: 2`. Restrict it to the test values with the following selector:

```json
[{"dim": "tag:project", "values": ["gateway-test-a", "gateway-test-b"], "per_value": true}]
```

Keep the test rule in Alert mode to start.

1. Send requests tagged `x-dd-tag-project: gateway-test-a` and `x-dd-tag-project: gateway-test-b` until each approaches its allowance. Allow a few minutes, then confirm separate instances appear.
2. Exceed the test allowance for one project in Alert mode. Confirm its usage indicates that requests would be limited while requests continue.
3. Change the rule to Enforce mode. Existing usage remains, so expect the next matching request over the allowance to return `429`.
4. Check the `X-Ai-Gateway-Error-Code: gateway_rate_limit` response header and the rule ID. A provider's `429` does not have this AI Gateway error header.
5. Confirm the other project still has capacity, unless a matching shared rule is also exhausted.
6. Wait for `Retry-After`, then confirm a matching request succeeds when capacity is available.

If traffic bypasses the rule, check the tag, caller, selected team, and every selector entry. If traffic is limited unexpectedly, inspect all matching rules and windows. AI Gateway limits are separate from provider limits, and a provider can return `429` even when AI Gateway capacity is available.

## Model pricing and cost accounting

AI Gateway uses model prices to estimate request cost, report spend, and enforce spending controls. Review the applied price before relying on a budget or spend rate limit, especially for manually added models and custom provider endpoints.

### Pricing prerequisites

- [AI Gateway access and a configured provider][pricing-1].
- The `ai_gateway_config_read` permission to inspect prices and `ai_gateway_config_write` to change them, with edit access to the provider.
- Your provider's rates if you need a custom price, expressed in USD per million tokens.
- [Datadog API credentials][pricing-2] for the API examples. The application key's principal and scope must allow the required permissions.

### Review a model's applied price

1. Open [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Models{{< /ui >}} > {{< ui >}}Model catalog{{< /ui >}}][pricing-3].
2. Find the model and its provider account. The same model can have a different price on another provider account.
3. Review its pricing status. Click {{< ui >}}Set Pricing{{< /ui >}} for a model without a price. For a model with an automatic price or existing override, click {{< ui >}}Override{{< /ui >}}.
4. In {{< ui >}}Model pricing{{< /ui >}}, review the {{< ui >}}Applied price{{< /ui >}} and the available rate tables. Check input, output, cache-read, and cache-write rates, and any context-size or service-tier conditions.

An automatic price can vary with the request's context size, mode, or service tier. A rate table's condition explains when that price applies. Check those conditions before comparing the displayed rates with a provider bill.

A missing price is different from a zero price. An explicit zero rate means that token category is free under your configuration; an unpriced model has no usable price for cost accounting.

### Set a custom price

Use a custom price when your contract differs from the automatic price or the model has no automatic price.

1. In the [Model Catalog][pricing-3], find the model and provider account. Click {{< ui >}}Set Pricing{{< /ui >}} if it has no price, or {{< ui >}}Override{{< /ui >}} otherwise. Enter the token rates that apply to your provider agreement.
2. Review all token categories, including cached input. Use zero only when that category has no charge.
3. Click {{< ui >}}Save{{< /ui >}}, then reopen the pricing dialog to confirm the applied price.

For several models with the same rates, select their rows and click {{< ui >}}Set Pricing{{< /ui >}}. Review the selected model and provider pairs before clicking {{< ui >}}Apply Pricing{{< /ui >}}. A bulk change applies the same price configuration to each selected pair.

Custom rates are used as entered. The provider's cost multiplier does not also apply to a custom price. For automatically detected prices, the multiplier adjusts the cost; for example, `0.8` represents 80% of the automatic price. Confirm the effective rates for the specific model after changing either setting.

#### Set a custom price with the API

Use the [AI Gateway API][pricing-4] to read or change pricing for a model on a specific provider account. `<PROVIDER_ID>` is the provider account's API ID, not its request slug. Get it from the matching provider's `data[].id` in the `GET /api/v2/providers` response. `<MODEL_ID>` is the canonical model ID within that provider. URL-encode it as a path component if it contains reserved characters. Model IDs that contain `/` are not supported by this endpoint.

Replace the identifiers, credentials, and rate placeholders before running this example. Enter each rate as a number in USD per million tokens. The site selector updates the API host:

```shell
curl -X PUT "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/providers/<PROVIDER_ID>/models/<MODEL_ID>/pricing" \
  -H "Content-Type: application/json" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>" \
  -d '{
    "data": {
      "type": "model-pricing",
      "attributes": {
        "pricing_config": {
          "version": 1,
          "source": {"type": "custom"},
          "rates": {
            "non_cached_input_cost_per_mtok": <INPUT_RATE>,
            "cache_write_cost_per_mtok": <CACHE_WRITE_RATE>,
            "cache_read_cost_per_mtok": <CACHE_READ_RATE>,
            "output_cost_per_mtok": <OUTPUT_RATE>
          }
        }
      }
    }
  }'
```

For custom pricing, supply all four rates as finite, nonnegative numbers. Do not use a token price to approximate a model billed by audio duration: per-token overrides cannot represent per-minute audio charges.

### Remove an override

To return to the available automatic price, open the model's pricing dialog and click {{< ui >}}Remove Override{{< /ui >}}. With the API, use:

```shell
curl -X DELETE "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/providers/<PROVIDER_ID>/models/<MODEL_ID>/pricing" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

After removal, inspect the applied price again. Removing an override does not guarantee that an automatic price exists. If none is available, the model becomes unpriced.

### Inspect price availability

Read the effective pricing state for a model with:

```shell
curl "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/providers/<PROVIDER_ID>/models/<MODEL_ID>/pricing" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

Review the following response fields:

| Field | What to check |
|---|---|
| `status` | `priced` means a usable price exists; `unpriced` means it does not. |
| `effective_source` | Whether the applied price comes from an override or automatic pricing. |
| `cost_multiplier` | The multiplier applied to the effective rates. Custom prices use `1`. |
| `unpriced_reason` and `unpriced_description` | Why pricing is unavailable. |
| `automatic_pricing` | Automatic rates, conditions, source, validation timestamps, and `stale` status when available. |
| `blocks_budgeted_requests` | Whether an enforced budget blocks requests because pricing is unavailable. |
| `duration_priced` | Whether the provider bills by audio duration, which token overrides cannot represent. |

A stale automatic price can be a last-known price rather than a newly validated rate. Review its source and timestamps before using it to explain a cost change.

### Verify cost accounting

1. Record the model's applied rates and multiplier.
2. Send a small request through AI Gateway using that provider and model. Add a custom tag header, such as `x-dd-tag-pricing_check: <VALUE>`, to find the request again.
3. Open the request's AI Gateway span in Agent Observability. See [Verify the request][pricing-5] on the AI Gateway page. Compare the recorded token usage and estimated cost with the rates for the request's mode and context size.
4. If a budget covers the request, confirm its tracked spend increases after the response completes. For a per-value budget, inspect the instance matching the request's user, team, or tag values.
5. If you changed or removed an override, repeat with a new request and confirm the new effective price is used.

AI Gateway cost is an estimate based on recorded usage and the configured price. Provider bills can include contract terms, credits, subscription allowances, or charges outside the token rates. Use the provider's billing records to reconcile the final charge.

### Troubleshoot missing prices

| Symptom | Action |
|---|---|
| A request fails with `budget_pricing_unavailable` | Check the resolved model's price. Requests covered by an enforced budget can fail with HTTP `400` when the price is unavailable. |
| A manually added model has no price | Configure the actual token rates for that model, if the provider bills per token. |
| Cost differs after applying a custom price | Check all four rate categories. Custom prices bypass the provider multiplier. |
| Pricing disappears after removing an override | Check whether the provider and canonical model have an automatic price. Restore valid custom rates if needed. |
| A request returns HTTP `400` with `rate_limit_pricing_unavailable` | Set a usable price for a model billed per token, choose a priced model, or switch the spend rate limit to Alert mode. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[9]: https://app.datadoghq.com/llm/gateway/budgets
[10]: /monitors/
[13]: /account_management/teams/manage/
[15]: https://app.datadoghq.com/llm/gateway/rate-limits

[budgets-1]: /ai_gateway/spend_controls/#set-budgets
[budgets-2]: /ai_gateway/getting_started/
[budgets-3]: /account_management/api-app-keys/
[budgets-4]: https://app.datadoghq.com/llm/gateway/model-catalog
[budgets-5]: /api/latest/ai-gateway/
[rate_limits-1]: /ai_gateway/spend_controls/#set-budgets
[rate_limits-2]: /ai_gateway/getting_started/
[rate_limits-3]: /account_management/api-app-keys/
[rate_limits-4]: https://app.datadoghq.com/llm/gateway/model-catalog
[rate_limits-5]: /ai_gateway/spend_controls/#set-rate-limits
[rate_limits-6]: /api/latest/ai-gateway/

[pricing-1]: /ai_gateway/providers/#add-a-provider
[pricing-2]: /account_management/api-app-keys/
[pricing-3]: https://app.datadoghq.com/llm/gateway/model-catalog
[pricing-4]: /api/latest/ai-gateway/
[pricing-5]: /ai_gateway/getting_started/#verify-the-request
