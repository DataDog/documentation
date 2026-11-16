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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[9]: https://app.datadoghq.com/llm/gateway/budgets
[10]: /monitors/
[13]: /account_management/teams/manage/
[15]: https://app.datadoghq.com/llm/gateway/rate-limits
