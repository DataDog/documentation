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

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Budgets{{< /ui >}}][9] and click {{< ui >}}New Budget{{< /ui >}}.
2. Choose the traffic to match. Select {{< ui >}}Everything{{< /ui >}} to track all AI Gateway spend, or match a user, team, model, provider, or custom tag. Send a custom tag in an `x-dd-tag-<KEY>: <VALUE>` request header, for example `x-dd-tag-ai_agent: claudecode`. A request matches the budget when it includes every filter you selected. The form estimates historical matches and links to the matching spans in Agent Observability.
3. Enter a spend limit and select a {{< ui >}}Daily{{< /ui >}}, {{< ui >}}Weekly{{< /ui >}}, or {{< ui >}}Monthly{{< /ui >}} window. The window follows the UTC calendar.
4. Optional: Select {{< ui >}}Track existing usage for current period{{< /ui >}} if available for the selected budget configuration. This includes matching, priced usage already recorded in Agent Observability during the current window, including usage from before budget creation. After you save the budget, verify its starting spend. Requests still in progress or usage not yet recorded might be absent from that initial amount.
5. Choose an enforcement mode and a warning threshold, then save the budget.

| Enforcement mode | Behavior |
|---|---|
| Block | Matching requests are rejected with HTTP `402` until the window resets. |
| Alert-only | Requests continue. The monitor `AI Gateway budget: <BUDGET_NAME>` alerts at the warning threshold and at the limit. |

When a budget is scoped to a [Datadog team][13], it applies to requests from that team's members. To select a team, send `x-ai-gateway-team: <TEAM_SLUG>` with the slug of a team the caller belongs to. The header selects which team's budgets apply; matching personal and organization-wide budgets also apply. A request without the header matches the budgets of every team the caller directly belongs to, and its full cost counts against each of them. Team selection does not grant model access. See [Error codes](/ai_gateway/troubleshooting/#error-codes) for invalid or unauthorized team selections.

Datadog creates a [monitor][10] named `AI Gateway budget: <BUDGET_NAME>` for each budget and notifies the budget creator at the warning threshold and when the limit is reached. On the budget's details page, click the monitor icon next to {{< ui >}}Warning threshold{{< /ui >}} to change the recipients and message.

The budget list shows active budgets, tracked spend, budgets at risk, and **Untracked** spend that doesn't match a budget. By default, a budget counts matching spend after you create it. Use {{< ui >}}Track existing usage for current period{{< /ui >}} when available to include earlier matching usage in the budget's current-period spend. Use the Team, User, Model, Provider, and Tag filters to review coverage.

## Set rate limits

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Rate limits are in Preview. To enable them for your organization, contact your Customer Success Manager.
{{< /callout >}}

A rate limit caps how many requests, input tokens, or output tokens matching AI Gateway traffic can use per minute. Use rate limits to protect provider quota from runaway agents or scripts, share capacity between teams, or cap traffic to an expensive model. [Budgets](/ai_gateway/spend_controls/#set-budgets) cap spend over a day, week, or month; rate limits cap traffic within a minute.

### Create a rate limit

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Rate limits{{< /ui >}}][15] and click {{< ui >}}New Rate Limit{{< /ui >}}.
2. Choose the traffic to match. Leave the scope empty to cover all AI Gateway traffic in your organization, or match a user, team, model, provider, or custom tag. Send a custom tag in an `x-dd-tag-<KEY>: <VALUE>` request header. A request matches the rate limit when it includes every filter you selected.
3. Set at least one limit: {{< ui >}}Requests / minute{{< /ui >}}, {{< ui >}}Input tokens / minute{{< /ui >}}, or {{< ui >}}Output tokens / minute{{< /ui >}}.
4. Choose a mode, then save the rate limit.

| Mode | Behavior |
|---|---|
| Alert | Requests over the limit continue. The rate limit shows the {{< ui >}}Would limit{{< /ui >}} status. This is the default mode. |
| Enforce | New requests over the limit are rejected with HTTP `429`. Streaming responses that are already in progress finish. |

Start in Alert mode, review the {{< ui >}}Would limit{{< /ui >}} status for a few days, then switch to Enforce mode.

### How rate limits are counted

- Each limit applies to a rolling 60-second window, not to calendar minutes.
- All matching traffic shares one limit. For example, a team rate limit of 600 requests per minute allows 600 requests per minute for the whole team, not for each member.
- A request counts against every rate limit it matches. AI Gateway accepts it only if every matching rate limit in Enforce mode has available capacity.
- Tokens count when a response completes, so requests already in progress can take token usage over a limit.
- A team-scoped rate limit applies to requests that select the [Datadog team][13] with the header `x-ai-gateway-team: <TEAM_SLUG>`. Use the slug of a team the caller belongs to. Without the header, it applies to requests from users who directly belong to the team.
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
| `X-Ai-Gateway-Ratelimit-Limit-<METRIC>` | The per-minute limit that was exceeded. |
| `X-Ai-Gateway-Ratelimit-Remaining-<METRIC>` | `0`. |
| `X-Ai-Gateway-Ratelimit-Reset-<METRIC>` | Time until the request fits, for example `12s`. |

`<METRIC>` is `Requests`, `Input-Tokens`, or `Output-Tokens`, depending on which limit was exceeded. For example, a request that exceeds a requests-per-minute limit returns `X-Ai-Gateway-Ratelimit-Limit-Requests`.

Clients that retry on `429` should wait for the `Retry-After` duration before they retry.

### Monitor rate limit usage

The rate limit list shows current usage against each limit in the rolling 60-second window and its status. It also shows the number of requests limited in the last 15 minutes. Usage turns orange at 80% of a limit and red when the limit is reached.

| Status | Meaning |
|---|---|
| Within limit | Usage is below 80% of every limit. |
| Near limit | Usage is at 80% or more of at least one limit. |
| Limiting | An Enforce mode rate limit is full and rejects new requests. |
| Would limit | An Alert mode rate limit is full. Requests continue. |

The list also includes two summary rows. **Untracked** is traffic that no Enforce mode rate limit matches. **Total** is all AI Gateway traffic in your organization.

## Model pricing and cost accounting

AI Gateway uses model prices to estimate request cost, report spend, and enforce spending controls. Review the applied price before relying on a budget or spend rate limit, especially for manually added models and custom provider endpoints.

### Pricing prerequisites

- [AI Gateway access and a configured provider][pricing-1].
- The `ai_gateway_config_read` permission to inspect prices and `ai_gateway_config_write` to change them, with edit access to the provider.
- Your provider's rates if you need a custom price, expressed in USD per million tokens.
- [Datadog API credentials][pricing-2] for the API examples. The application key's principal and scope must allow the required permissions.

### Review a model's applied price

1. Open [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Model Catalog{{< /ui >}}][pricing-3].
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

Use the [AI Gateway API][pricing-4] to read or change pricing for a model on a specific provider account. `<PROVIDER_ID>` is the provider account's API ID, not its request slug. Get it from the matching provider's `data[].id` in the `GET /api/v2/providers` response. `<MODEL_ID>` is the canonical model ID within that provider. URL-encode it as a path component if it contains `/` or other reserved characters.

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

Review these response fields:

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
3. Open the request's Gateway span in Agent Observability. See [Verify the request][pricing-5] on the AI Gateway page. Compare the recorded token usage and estimated cost with the rates for the request's mode and context size.
4. If a budget covers the request, confirm its tracked spend increases after the response completes. For a per-value budget, inspect the instance matching the request's user, team, or tag values.
5. If you changed or removed an override, repeat with a new request and confirm the new effective price is used.

Gateway cost is an estimate based on recorded usage and the configured price. Provider bills can include contract terms, credits, subscription allowances, or charges outside the token rates. Use the provider's billing records to reconcile the final charge.

### Troubleshoot missing prices

| Symptom | Action |
|---|---|
| `budget_pricing_unavailable` | Check the resolved model's price. Requests covered by an enforced budget can fail with HTTP `400` when the price is unavailable. |
| A manually added model has no price | Configure the actual token rates for that model, if the provider bills per token. |
| Cost differs after applying a custom price | Check all four rate categories. Custom prices bypass the provider multiplier. |
| Pricing disappears after removing an override | Check whether the provider and canonical model have an automatic price. Restore valid custom rates if needed. |
| HTTP `400` with `rate_limit_pricing_unavailable` | Set a usable price for a model billed per token, choose a priced model, or switch the spend rate limit to Alert mode. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[9]: https://app.datadoghq.com/llm/gateway/budgets
[10]: /monitors/
[13]: /account_management/teams/manage/
[15]: https://app.datadoghq.com/llm/gateway/rate-limits

[pricing-1]: /ai_gateway/providers/#add-a-provider
[pricing-2]: /account_management/api-app-keys/
[pricing-3]: https://app.datadoghq.com/llm/gateway/model-catalog
[pricing-4]: /api/latest/ai-gateway/
[pricing-5]: /ai_gateway/getting_started/#verify-the-request
