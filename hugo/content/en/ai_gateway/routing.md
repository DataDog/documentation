---
title: Route Requests with AI Gateway
description: Create stable model aliases and configure fallback destinations with AI Gateway routing rules.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
  - link: "/ai_gateway/sessions/"
    tag: "Documentation"
    text: "AI Gateway sessions"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Before you begin, review the [AI Gateway prerequisites](/ai_gateway/getting_started/#prerequisites).

A routing rule gives callers a stable `router/<RULE_SLUG>` model value while the rule selects the destination. Use a routing rule to change models or providers without changing application code, and to add fallback destinations.

## Create a routing rule

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Routing{{< /ui >}}][7] and click {{< ui >}}New Routing Rule{{< /ui >}}.
2. Enter a lowercase slug. The page shows the resulting `router/<RULE_SLUG>` identifier.
3. Configure the first routing step. Select one model, use {{< ui >}}Weighted{{< /ui >}} to assign traffic shares across destinations, or select {{< ui >}}Another route{{< /ui >}} to link a routing rule. A model destination can use a specific provider account or any configured provider that serves that model.
4. Optional: Add fallback steps in priority order.
5. Review the {{< ui >}}Access{{< /ui >}} stage and choose who can call the routing rule. See [Control model access](/ai_gateway/access_control/).
6. Review and save the rule, then copy its identifier into the `model` field of your requests.

Configure [data capture](/ai_gateway/security/#configure-data-capture) through organization defaults and scoped overrides under {{< ui >}}Policies{{< /ui >}}.

## Model served by any provider

A model served by any configured provider considers all enabled providers in your organization that serve that model. Only providers permitted by the caller's [model access](/ai_gateway/access_control/) settings are eligible. AI Gateway tries those providers in slug order and sends each one its provider model ID.

## Fallback behavior

AI Gateway tries the next provider or fallback destination when the current one cannot serve the request or returns HTTP `401`, `402`, `403`, `408`, `429`, or `5xx`. A successful response, or any other `4xx` response (such as `400`, `404`, or `422`), is returned to the caller. If every attempt returns one of the fallback statuses, the caller receives the last of those responses. If no destination can serve the request, the request fails.

[Budgets](/ai_gateway/spend_controls/#set-budgets) in Block mode are checked per destination. If a budget blocks one destination, AI Gateway falls back to the next. If budgets block every destination, AI Gateway returns HTTP `402` until the budget window resets.

[Rate limits](/ai_gateway/spend_controls/#set-rate-limits) in Enforce mode are also checked per destination. A rate limit scoped to one model or provider makes AI Gateway fall back to the next destination. A rate limit that matches every destination, such as an organization-wide limit, returns HTTP `429`.

## Sessions and routing

A routing rule uses each request's [session](/ai_gateway/sessions/) to keep a conversation on one destination, so the provider's prompt cache stays warm and turns that depend on provider-side state reach the destination that holds it. To set a request's session, send the `x-session-id` header. Claude Code, Codex, and several other coding agents send their own session IDs. See [AI Gateway sessions](/ai_gateway/sessions/).

### Weighted routing steps

In a {{< ui >}}Weighted{{< /ui >}} step of a routing rule, weights divide sessions between destinations, not individual requests. AI Gateway computes an order of the step's destinations from the session and the weights. The same session always gets the same order, so its requests start at the same destination and reuse its prompt cache.

For example, with destination A at weight 70 and destination B at weight 30, about 70% of sessions start at A and 30% start at B. Weights are relative: 7 and 3 produce the same split as 70 and 30. Because each session has its own volume, the split of requests, tokens, or spend can differ from the weights.

When the first destination returns a [fallback status](#fallback-behavior), AI Gateway tries the next destination in the session's order, then the rule's later steps. Without session pinning, the next request of the session starts again at the session's first destination.

Weighted ordering applies to OpenAI Chat Completions, OpenAI Responses, Anthropic Messages, and Gemini requests. Other operations use the step's configured order.

A request without a session signal is ordered by a fingerprint of the conversation's opening content, so conversations with identical openings share a destination. See [Requests without a session](/ai_gateway/sessions/#requests-without-a-session). To use the step's configured order for a request instead, [opt out of session routing](/ai_gateway/sessions/#opt-out-of-session-routing).

OpenAI Responses requests need a session signal for weighted ordering. Without one, a weighted step uses its configured order, so every such request starts at the first destination listed in the step. The exception is a request that sets `store` to `false` and references no stored state: no `previous_response_id`, no `conversation`, and no input item that references a stored item. Such a request can be ordered by its opening-content fingerprint.

Without session pinning, changes to a weighted step, such as new weights or an added or removed destination, can move active sessions to another destination. Moving a session can cost a prompt-cache miss, or a failed request when the conversation depends on provider-side state.

### Session pinning

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Session pinning is in Preview. To enable it for your organization, contact your Customer Success Manager.
{{< /callout >}}

Session pinning remembers which destination served a session and sends the session's later requests there. It applies to requests that have a session signal and call a routing rule (`router/<RULE_SLUG>`). Requests to a specific model (`<PROVIDER_SLUG>/<MODEL_ID>`) are not pinned, because they have only one destination.

AI Gateway keeps one record per session, routing rule, and request format. The same session ID used with two routing rules, or with both `/chat/completions` and `/responses`, has a separate record for each.

A record is created by the session's first successful response and expires 4 hours after the session's last successful response. Each successful response resets the 4 hours. Failed requests do not extend or shorten it, and a session that keeps succeeding stays pinned with no maximum duration.

A pinned session is in one of two states:

| State | When | Routing |
|---|---|---|
| Preferred | The session holds no provider-side state. | AI Gateway tries the pinned destination first. If it returns a fallback status, AI Gateway continues through the rule's ordinary order, skipping the pinned destination. |
| Stateful | A request of the session carried or might have created provider-side state. | AI Gateway sends every request of the session to the pinned destination only, and never falls back to another destination. |

A session becomes stateful when a successful request might leave state that only its destination can use, and it stays stateful until its record expires. Examples include:

- OpenAI Responses requests that store responses (`store` is `true` or omitted), reference `previous_response_id`, a `conversation`, or a stored item, or request encrypted reasoning.
- Anthropic Messages requests with extended thinking enabled, or that carry thinking blocks, server web search or code execution tools, a code execution container, or uploaded files.
- Gemini requests with a `thinkingConfig`, thought signatures, a `cachedContent` reference, or a Files API or Cloud Storage file reference.
- Requests that reference uploaded files or stored audio by ID.
- Requests translated between API formats, when AI Gateway returns reasoning state that only the original destination can read.

Most coding agent sessions become stateful after their first response, because coding agents use extended thinking, stored responses, or encrypted reasoning.

#### Pinning, weights, and fallback

- **Weight and order changes**: Changing a routing rule's weights or order does not move pinned sessions. New sessions, and sessions whose record has expired, use the new configuration.
- **Fallback in a preferred session**: If the pinned destination fails and another destination serves the request, the session moves to the destination that served it, where its prompt cache is warm. The session stays there after the original destination recovers, until its record expires or a later fallback moves it again.
- **Errors in a stateful session**: If the pinned destination returns an error, AI Gateway returns that error instead of falling back. A [budget](/ai_gateway/spend_controls/#set-budgets) in Block mode or a [rate limit](/ai_gateway/spend_controls/#set-rate-limits) in Enforce mode that blocks the pinned destination returns its `402` or `429` response, even when another destination is within its limits.
- **Pinned destination no longer available**: If a stateful session's destination is removed from the routing rule, is no longer allowed by an [access policy](/ai_gateway/access_control/), or no longer supports the request's format, AI Gateway returns HTTP `409` with the `session_destination_unavailable` error code. See [Session destination unavailable](#session-destination-unavailable).

If AI Gateway cannot read or write a session's record, it routes the request as if session pinning were off, and does not fail the request.

#### Session destination unavailable

AI Gateway returns this error when a stateful session's pinned destination can no longer serve it:

| Field | Value |
|---|---|
| HTTP status | `409`. For Gemini, the error status is `ABORTED`. |
| `X-Ai-Gateway-Error-Code` header | `session_destination_unavailable` |
| `X-Should-Retry` header | `false`. The OpenAI and Anthropic SDKs, which retry `409` responses by default, read this header and do not retry. |
| Error message | `this conversation is bound to a provider destination that is no longer available; start a new conversation or session` |

Retrying the same request returns the same error. To recover, start a new conversation with a new session ID. The record expires 4 hours after the session's last successful response, and the session's requests then use ordinary routing. A request that carries the old destination's state, such as a `previous_response_id`, can still fail on the new destination.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[7]: https://app.datadoghq.com/llm/gateway/routing
