---
title: Set and Enforce AI Gateway Rate Limits
description: Configure shared or per-value allowances for AI Gateway requests, tokens, and spend, then verify usage and enforcement.
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Rate limits are in Preview. Contact your Customer Success Manager to enable the rate limit capabilities your organization needs.
{{< /callout >}}

## Overview

Use rate limits to cap requests, input tokens, output tokens, or spend over rolling windows. A rule can share one allowance across matching traffic or give each matching user, team, model, provider, or tag value an independent allowance.

[Budgets][1] track spend over UTC calendar days, weeks, or months. Rate limits protect capacity over shorter rolling windows, including windows up to 24 hours.

## Prerequisites

- [AI Gateway access and a configured provider][2].
- The `ai_gateway_config_read` permission to inspect rate limits and `ai_gateway_config_write` to change them.
- [Datadog API credentials][3] for the API examples. The application key's principal and scope must allow the required permissions.
- A usable model price for enforced spend limits. Check the model in the [Model Catalog][4].

For the basic UI workflow and response headers, see [Set rate limits][5]. Longer windows and spend limits are configured through the [AI Gateway API][6]. The UI supports shared or per-value allowances for per-minute request and token limits.

## Choose the metric and window

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

Each metric and window pair must be unique. If a metric has more than one window, its allowance must increase as the window gets longer. For example, 60 requests per minute and 1,000 requests per hour are valid together.

## Choose shared or independent allowances

Use `selector` to define matching traffic and whether it shares capacity:

- `dim` identifies `user_id`, `team_id`, `model`, `provider`, or a custom `tag:<KEY>`.
- `values` restricts the dimension to the listed values. Omit it to match any present value.
- `per_value: false` pools traffic into a shared allowance.
- `per_value: true` gives each distinct matching value its own allowance.

Every selector entry must match. Multiple per-value dimensions create an allowance for each distinct combination. A request missing a per-value dimension does not match that rule. For example, a rule split by `tag:project` does not cover requests without an `x-dd-tag-project` header.

Model and provider dimensions use the resolved destination, including destinations selected through routing and fallback. Team matching follows the [Gateway team header rules][5]. Do not combine `selector` with the legacy `user_id`, `team_id`, or `tags` scope fields in the same API request.

A shared rule for a team with 600 requests per minute gives the team 600 requests in total. A rule split by user with the same amount gives each matching user 600 requests. Add a shared rule as well when you need an overall ceiling.

Your organization can have up to 100 active rules. A per-value rule counts as one rule; its instances do not each consume a rule.

### Create per-project allowances

The following example gives each project 60 requests per minute and 1,000 requests per hour. It starts in Alert mode so requests continue while you review the scope. Replace the credentials before running it. The site selector updates the API host.

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
        "window_limits": [{"metric": "requests", "window": "1h", "amount": 1000}],
        "mode": "ALERT"
      }
    }
  }'
```

Send `x-dd-tag-project: <PROJECT_NAME>` on inference requests. To pool all projects into one allowance instead, use `per_value: false`.

## Choose a mode and enforcement behavior

| Mode | Behavior |
|---|---|
| `ALERT` | Requests continue when an allowance is exhausted. Usage shows that the rule would limit traffic. This is the default. |
| `ENFORCE` | New requests over a limit return HTTP `429` with `gateway_rate_limit`. Streaming responses already in progress finish. |

Every matching rule applies. A request succeeds only when every matching enforced rule has capacity, including any shared ceiling above a per-value allowance.

Tokens and cost are accounted for after responses complete. Requests in progress can therefore take usage above an allowance. A spend limit requires a usable model price; enforced spend limits reject requests to unpriced targets with HTTP `400` and `X-Ai-Gateway-Error-Code: rate_limit_pricing_unavailable`. This applies to OpenAI, Anthropic, and Gemini requests; Gemini uses the canonical status `FAILED_PRECONDITION`.

## Inspect usage and instances

Save the rule ID returned at creation. For a per-value rule, inspect its active instances:

```shell
curl "https://api.{{< region-param key="dd_site" code="true" >}}/api/v2/rate-limits/<RATE_LIMIT_ID>/instances" \
  -H "DD-API-KEY: <DATADOG_API_KEY>" \
  -H "DD-APPLICATION-KEY: <DATADOG_APP_KEY>"
```

The instance list surfaces counters approaching a limit or recently limited, including counters that would have been limited in Alert mode. It is not a directory of every value that has ever sent traffic. Counters can take a few minutes to appear. Shared rules do not have per-value instance rows.

Use these endpoints to review broader usage:

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

See the [API reference][6] for query parameters and response fields.

## Update a rule

Use `PATCH /api/v2/rate-limits/<RATE_LIMIT_ID>` to change the name, mode, or allowances. Updates do not reset usage, so lowering an allowance can immediately put existing usage over the limit.

- Set a per-minute attribute to `0` to remove that limit; omit it or send `null` to leave it unchanged.
- A non-empty `window_limits` array replaces all existing longer-window limits. Include every longer-window limit you want to keep.
- Set `window_limits` to an empty array to remove the longer-window limits; omit it or send `null` to leave them unchanged.
- Keep at least one positive limit, with no more than four metric and window pairs in total.
- A selector cannot be changed after creation. Create a replacement rule when the matching or splitting dimensions change. Verify the replacement, then remove the original with `DELETE /api/v2/rate-limits/<RATE_LIMIT_ID>` to avoid enforcing both rules.

## Verify scope and enforcement

Create a separate test rule with a low request allowance, such as `requests_per_minute: 2`. Restrict it to the test values with this selector:

```json
[{"dim": "tag:project", "values": ["gateway-test-a", "gateway-test-b"], "per_value": true}]
```

Keep the test rule in Alert mode to start.

1. Send requests tagged `x-dd-tag-project: gateway-test-a` and `x-dd-tag-project: gateway-test-b` until each approaches its allowance. Allow a few minutes, then confirm separate instances appear.
2. Exceed the test allowance for one project in Alert mode. Confirm its usage indicates that requests would be limited while requests continue.
3. Change the rule to Enforce mode. Existing usage remains, so expect the next matching request over the allowance to return `429`.
4. Check the `X-Ai-Gateway-Error-Code: gateway_rate_limit` response header and the rule ID. A provider's `429` does not have this Gateway error header.
5. Confirm the other project still has capacity, unless a matching shared rule is also exhausted.
6. Wait for `Retry-After`, then confirm a matching request succeeds when capacity is available.

If traffic bypasses the rule, check the tag, caller, selected team, and every selector entry. If traffic is limited unexpectedly, inspect all matching rules and windows. AI Gateway limits are separate from provider limits, and a provider can return `429` even when Gateway capacity is available.

[1]: /llm_observability/configure/ai_gateway/#set-budgets
[2]: /llm_observability/configure/ai_gateway/#get-started
[3]: /account_management/api-app-keys/
[4]: https://app.datadoghq.com/llm/gateway/model-catalog
[5]: /llm_observability/configure/ai_gateway/#set-rate-limits
[6]: /api/latest/ai-gateway/
