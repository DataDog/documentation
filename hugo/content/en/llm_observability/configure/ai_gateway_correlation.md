---
title: Correlate AI Gateway requests with applications and traces
description: Attribute Datadog AI Gateway traffic to applications, callers, teams, sessions, and parent traces, then verify requests in Agent Observability.
further_reading:
  - link: "/llm_observability/configure/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
  - link: "/llm_observability/investigate/metrics/"
    tag: "Documentation"
    text: "Agent Observability metrics"
---

Attribute Gateway traffic to the application that sent it, add dimensions for cost and policy analysis, and connect requests to existing agent traces. Application tags, caller identity, team selection, sessions, and trace parents serve different purposes.

## Before you begin

- Complete [AI Gateway setup][1] and confirm that your caller can send a request.
- Review [data capture][2]. Attribution and operational metrics remain useful when prompt and response content is not recorded.
- If you want a Gateway span nested under an existing agent span, instrument the caller with [Agent Observability][3] and propagate its context.

## Choose attribution headers

| Header | Purpose |
|---|---|
| `x-dd-tag-ml_app` | Set the application name in Agent Observability. |
| `x-dd-tag-<KEY>` | Add a custom dimension, such as `project` or `workflow`, for filtering and matching policy scopes. |
| `x-ai-gateway-team` | Select a team the authenticated caller belongs to for team-scoped accounting and policies. |
| `x-session-id` | Associate related requests with a session. |
| Distributed trace headers | Continue the caller's trace context, including Agent Observability parent context when available. |

The authenticated Datadog credential determines caller identity. Setting a tag does not impersonate a user or grant model access. Team selection also does not grant model access.

Use non-sensitive, stable values for tags and sessions. Avoid prompts, email addresses, credentials, and other sensitive data in these headers.

## Attribute requests to an application

Set `x-dd-tag-ml_app` on requests from the same application. Without an explicit application name or propagated application context, Gateway traces appear under `datadog-ai-gateway`.

The following request also adds a custom `project` tag. Load your Datadog token from your secret manager into `DD_AI_GATEWAY_TOKEN`:

```shell
curl -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1/responses" \
  -H "Authorization: Bearer $DD_AI_GATEWAY_TOKEN" \
  -H "Content-Type: application/json" \
  -H "x-dd-tag-ml_app: support-assistant" \
  -H "x-dd-tag-project: gateway-verification" \
  -d '{
    "model": "<PROVIDER_SLUG>/<MODEL_ID>",
    "input": "Reply with one word: ready."
  }'
```

Use the Gateway hostname for your [Datadog site][4] and a model or routing rule the caller can use.

Do not use `x-dd-tag-model` or `x-dd-tag-provider` to describe a requested destination. Gateway reserves these dimensions and records the actual served model and provider. Custom keys must follow Gateway's tag-key rules; keys in the reserved `_dd.*` namespace are ignored.

## Select a team

Add the following header with the slug of a team the caller belongs to:

```text
x-ai-gateway-team: <TEAM_SLUG>
```

The selection affects matching team budgets, rate limits, and data capture. Personal and organization-wide policies can still apply.

Without this header, a request can match budgets and rate limits for every team the caller directly belongs to. Its full cost counts against each matching team budget. A team data capture override requires explicit selection with the header. Check the [team selection errors][5] if the slug is invalid or the caller is not a member.

## Propagate trace context

Configure the caller's Datadog instrumentation to inject the active context into the outbound Gateway request. Preserve all headers the propagator produces through proxies and HTTP clients.

Gateway accepts Datadog trace propagation and W3C Trace Context. To nest a Gateway span under an Agent Observability span, the propagated context must include both the Agent Observability trace ID and parent span ID. An application name or an APM trace ID alone does not establish an Agent Observability parent.

If your integration already has an Agent Observability trace and parent span but does not use distributed trace propagation, send both IDs as request headers:

```text
x-dd-tag-llmobs_trace_id: <EXISTING_LLMOBS_TRACE_ID>
x-dd-tag-llmobs_parent_id: <EXISTING_LLMOBS_PARENT_SPAN_ID>
```

Use IDs from an existing span in the same Datadog organization. Do not generate unrelated IDs for each HTTP call. Gateway ignores an incomplete or malformed pair. When valid distributed Agent Observability parent context is also present, that context takes precedence over these two tags.

An explicit `x-dd-tag-ml_app` overrides an application name carried in propagated context. Use a consistent application name when you want to view the caller and Gateway spans together.

## Associate a session

Send the same `x-session-id` value for requests in a conversation or agent run. Use a distinct value for independent sessions:

```text
x-session-id: gateway-verification-session
```

Send one `x-session-id` value. Use valid UTF-8 without control characters and keep it within 256 bytes. Invalid values can prevent session association.

A session groups related activity. It does not establish a trace parent, grant access, or by itself pin a routing rule to one destination. Routing affinity and destination pinning are separate routing controls.

## Follow a known request

1. Send a harmless request with an application name and a custom tag value reserved for the verification.
2. Open [AI Gateway Overview][6] and select the time range containing your request.
3. Review request volume, token usage, cost, errors, and latency. Follow the **Traces** link into Agent Observability.
4. Filter for your application and custom tag. Confirm the caller and served destination.
5. If you supplied parent context, open the trace and confirm the Gateway activity appears under the intended parent. If you supplied a session, confirm its session association.
6. Check that recorded content matches the effective data capture setting. A metadata-only request should still have operational information without prompt and response text.

A routing rule can produce several provider attempts through retries or fallbacks. Inspect the attempt that served the response when comparing the requested alias with the actual provider and model. For aggregate definitions, see [AI Gateway metrics][7].

## Troubleshoot attribution

| Symptom | Check |
|---|---|
| Request appears under the default application | Verify the application header reaches Gateway and that you are viewing the correct time range. |
| Caller differs from the expected user | Check which Datadog credential the application actually sends. Caller tags do not change authentication. |
| Team accounting is unexpected | Review the selected team, direct memberships, and every matching budget or rate limit. |
| Gateway activity appears in a separate trace | Confirm the active Agent Observability parent exists and that both IDs and the full distributed context reach Gateway. |
| Tag is missing | Check the key and value, avoid reserved dimensions, and confirm your client sends the header. |
| Prompt or response text is absent | Check the effective capture policy before treating missing content as an attribution problem. |

[1]: /llm_observability/configure/ai_gateway/#get-started
[2]: /llm_observability/configure/ai_gateway/#configure-data-capture
[3]: /llm_observability/instrument/
[4]: /getting_started/site/
[5]: /llm_observability/configure/ai_gateway/#error-codes
[6]: https://app.datadoghq.com/llm/gateway
[7]: /llm_observability/investigate/metrics/#gateway-metrics
