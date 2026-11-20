---
title: Troubleshoot AI Gateway
description: Diagnose authentication failures, spending and rate limits, unavailable models, missing traces, and Gateway errors.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

## 401 or 403 responses

- Confirm that the credential is valid for the same Datadog organization and site as the base URL.
- Confirm that the user or service account and the credential scope allow `ai_gateway_usage`.
- Confirm that an access policy or the default policy allows that user or service account to use the requested model or routing rule.
- Send a personal access token or a service access token in the `Authorization: Bearer` header. Spell the scheme exactly `Bearer`, and do not send the token in the `x-api-key` header.
- For a coding agent signed in with a [subscription](/ai_gateway/providers/#use-subscription-providers), send a personal access token, not an application key, in the `dd-application-key` header.
- A `401` or `403` can also come from the model provider, for example when a provider key is revoked. That response has the provider's body and no `X-Ai-Gateway-Error-Code` header. Check the provider's integration account.

## 402 responses

Budgets in Block mode blocked every destination for the request. Review the budget's filters, tracked spend, and window on the [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Budgets{{< /ui >}}][9] page. AI Gateway falls back when a budget blocks one destination and another destination remains.

## 429 responses

- If the response includes `X-Ai-Gateway-Error-Code: gateway_rate_limit`, an AI Gateway [rate limit](/ai_gateway/spend_controls/#set-rate-limits) in Enforce mode rejected the request. Use the `X-Ai-Gateway-Ratelimit-Id` header to find the rule on the [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Rate limits{{< /ui >}}][15] page. Retry after the `Retry-After` duration.
- If the response includes `X-Ai-Gateway-Error-Code: gateway_concurrency_limit`, your organization has too many AI Gateway requests in progress at the same time. Retry after the time in `Retry-After`.
- If the response does not include `X-Ai-Gateway-Error-Code`, the model provider returned the `429`. Check the provider's rate limits for your account, or add a [fallback destination](/ai_gateway/routing/#fallback-behavior) on another provider.

## Model unavailable

- Check the exact `<PROVIDER_SLUG>/<MODEL_ID>` or `router/<RULE_SLUG>` value.
- Confirm that the model is discovered or manually added on the provider, and that it supports the operation you called.
- Confirm that an access policy or the default policy allows access to that provider and model.

A model that is available from the upstream provider might not be enabled on your AI Gateway provider.

## Request not visible in Agent Observability

Confirm the time range and organization, and that the request reached AI Gateway. Check the HTTP status and response body. AI Gateway does not write a span for a request it rejects before it selects a destination: authentication failures, malformed requests, an unknown model (`model_not_found`), a rejected `x-ai-gateway-team` header, and a routing rule the caller cannot use. A span can take up to a minute to appear. Spans include prompt and response content only when full capture applies to the request.

## Error codes

Errors that AI Gateway generates include the `X-Ai-Gateway-Error-Code` response header. For OpenAI and Anthropic, the same code is in the response body's `error.code` field. For Gemini, read the code from the header. Gemini's `error.code` is the numeric HTTP status.

Two cases carry no error code header. Authentication failures return HTTP `401` with the body `{"errors": ["Unauthorized"]}`. On a streamed request, an error that occurs after AI Gateway has started the response arrives as an error event in the stream.

A provider `4xx` or `5xx` response keeps its original status and does not include `X-Ai-Gateway-Error-Code`. On a translated request, AI Gateway returns the error body in the format of the API you called. Otherwise, the body is the provider's own. Those responses are not listed below.

The following list shows the HTTP status that AI Gateway returns with each `X-Ai-Gateway-Error-Code` value and what the code means. When an entry lists three HTTP statuses, they apply to OpenAI, Anthropic, and Gemini, in that order.

`invalid_gateway_team`
: HTTP `400`. `x-ai-gateway-team` is empty, repeated, or not a valid Datadog team slug.

`gateway_team_forbidden`
: HTTP `403`. The caller is not a member of the selected Datadog team.

`gateway_team_user_required`
: HTTP `403`. Team selection requires a Datadog user identity. A service access token without user context cannot select a team.

`gateway_team_unavailable`
: HTTP `503`. Datadog team membership could not be verified. Retry the request.

`gateway_rate_limit`
: HTTP `429`. A gateway [rate limit](/ai_gateway/spend_controls/#set-rate-limits) was exceeded. The response also sets `Retry-After`, `X-Ai-Gateway-Ratelimit-Id`, and `X-Ai-Gateway-Ratelimit-{Limit,Remaining,Reset}-<METRIC>`. For longer-window rejections, `X-Ai-Gateway-Ratelimit-Window` identifies the window. A provider `429` has no `X-Ai-Gateway-Error-Code`.

`gateway_concurrency_limit`
: HTTP `429`. Your organization has too many AI Gateway requests in progress at the same time. The response sets `Retry-After`. Retry after a request finishes.

`rate_limit_pricing_unavailable`
: HTTP `400`. A matching spend rate limit in Enforce mode applies, but AI Gateway has no price for the target model. OpenAI, Anthropic, and Gemini return HTTP `400`; Gemini uses the canonical status `FAILED_PRECONDITION`. Set a usable price for a model billed per token in the [{{< ui >}}Model Catalog{{< /ui >}}][11]. You can also choose a priced model or switch the rate limit to Alert mode.

`budget_exceeded`
: HTTP `402`. A matching AI Gateway budget is exhausted for the current period. OpenAI, Anthropic, and Gemini all return HTTP `402`. On Gemini, the canonical status is `FAILED_PRECONDITION`. Do not retry automatically. Increase the budget or wait for the window to reset.

`budget_pricing_unavailable`
: HTTP `400`. A matching budget in Block mode applies, but AI Gateway has no price for the target model, so it cannot count the request's cost. Set a custom price for the model in [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Models{{< /ui >}} > {{< ui >}}Model catalog{{< /ui >}}][11], or switch the budget to Alert-only.

`model_not_found`
: HTTP `400`. The request's model, router, or provider identifier does not resolve to a known target. Check for an unknown model, provider slug, or routing rule, or an empty or malformed identifier. The `message` says when the model is missing its `<PROVIDER_SLUG>/` or `router/` prefix. Otherwise, it does not say which identifier failed. A provider slug that is not configured, in the model prefix or the `x-ai-gateway-provider` header, also returns this code. Clients that already handle OpenAI's `model_not_found` code keep working.

`bad_request`
: HTTP `400`. A malformed request that AI Gateway rejected before dispatch, such as an invalid JSON body, an invalid category filter, or an unknown action. Use `message` to see which.

`request_too_large`
: HTTP `413`. The request body exceeds the 64 MiB limit.

`unsupported_operation`
: HTTP `400`. No eligible target supports the requested operation, for example a Responses field that no translator can map.

`websocket_not_supported`
: HTTP `426`. A `GET /responses` request, such as a Codex WebSocket connection, was rejected. AI Gateway serves OpenAI Responses only over `POST /responses`. Responses can be buffered or streamed with `stream: true`. In Codex, set `supports_websockets=false` for the AI Gateway provider.

`session_destination_unavailable`
: HTTP `409`. The request's session is pinned to a destination that can no longer serve it, for example because the destination was removed from the routing rule. The response sets `X-Should-Retry: false`. Start a new conversation with a new session ID. See [Session destination unavailable](/ai_gateway/routing/#session-destination-unavailable).

`no_eligible_target`
: HTTP `400`. Every target was refused, for different reasons. For example, one is over budget and another is rate-limited, unpriced, or not permitted. Check budgets, rate limits, pricing, and access for each destination of the routing rule.

`no_permitted_target`
: HTTP `403`. Every eligible target was denied by an access policy. The caller cannot reach any of them without a policy change. Do not retry.

`zdr_no_eligible_target`
: HTTP `400`. Your organization requires zero data retention, and none of the request's eligible targets qualifies for it. This is a configuration issue. Do not retry.

`zdr_requirement_unavailable`
: HTTP `503` (OpenAI) / `504` (Anthropic) / `503` (Gemini). The zero-data-retention requirement could not be read. This is transient. Retry the request.

`guardrail_violation`
: HTTP `422` (OpenAI) / `400` (Anthropic). An AI Guard policy attached in Block unsafe mode refused the request or its response. See [Apply AI Guard policies](/ai_gateway/security/#apply-ai-guard-policies).

`guardrail_unavailable`
: HTTP `422` (OpenAI) / `400` (Anthropic). AI Guard could not evaluate a request that an attachment in Block unsafe mode covers. See [Apply AI Guard policies](/ai_gateway/security/#apply-ai-guard-policies).

`config_error`
: HTTP `500`. A routing rule is misconfigured: a resolution cycle, an expansion limit, or an invalid rule. Contact [Datadog support][14].

`upstream_timeout`
: HTTP `504` (OpenAI, Anthropic, and Gemini). Every eligible upstream target was tried and the last attempt did not answer in time.

`upstream_unreachable`
: HTTP `500` / `500` / `503`. The connection to the provider failed (refused, reset, DNS, or TLS) or broke mid-response.

`provider_credentials_error`
: HTTP `500` / `500` / `503`. AI Gateway could not load or apply the provider credentials configured for your organization. This is not the Datadog personal access token or service access token. Check the provider's integration account.

`upstream_error`
: HTTP `500` / `500` / `503`. Any other upstream failure before a provider response. Also used when all targets failed with no more specific code.

`internal_error`
: HTTP `500`. An unclassified internal error. Contact [Datadog support][14] and include the response headers, the timestamp, and the model identifier. Do not send the `Authorization` header.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[9]: https://app.datadoghq.com/llm/gateway/budgets
[11]: https://app.datadoghq.com/llm/gateway/model-catalog
[14]: https://www.datadoghq.com/support/
[15]: https://app.datadoghq.com/llm/gateway/rate-limits
