---
title: Observe AI Gateway Activity
description: Review AI Gateway requests, tokens, spend, errors, and latency, then inspect requests in Agent Observability.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

<!-- vale Datadog.words_case_insensitive = NO -->

The [{{< ui >}}Overview{{< /ui >}}][3] page has two tabs for the selected time range:

- {{< ui >}}Cost{{< /ui >}}: total cost with pricing coverage, budget limits reached, and LLM calls, plus usage by cost, tokens, or LLM calls. View usage by day, or broken down by user, team, or application.
- {{< ui >}}Operations{{< /ui >}}: failed calls, provider accounts or models with failures, error categories, latency over time and by model, and provider prompt-cache metrics. {{< ui >}}Cache hit rate{{< /ui >}} is cache-read input tokens divided by total input tokens. {{< ui >}}Cache reuse{{< /ui >}} is cache reads per cache write.

The Overview counts LLM calls. Each retry or fallback attempt is one call.

<!-- vale Datadog.words_case_insensitive = YES -->

Charts break down requests and cost by model or provider.

To investigate a request:

1. Select a time range that contains the request.
2. Use the model or provider breakdown to find the affected traffic.
3. Click a bar or an error and select {{< ui >}}View traces{{< /ui >}}, or click a row in a ranking. The {{< ui >}}Traces{{< /ui >}} page opens with filters already set for that selection.
4. For a failed request, review its error type and trace, and the provider's error rate, before changing a routing rule or provider.

For available metrics and tags, see [AI Gateway metrics][16].

## Attribute and correlate requests

Attribute AI Gateway traffic to the application that sent it, add dimensions for cost and policy analysis, and connect requests to existing agent traces. Application tags, caller identity, team selection, sessions, and trace parents serve different purposes.

### Before you begin

- Complete [AI Gateway setup][correlation-1] and confirm that your caller can send a request.
- Review [data capture][correlation-2]. Attribution and operational metrics remain useful when prompt and response content is not recorded.
- If you want an AI Gateway span nested under an existing agent span, instrument the caller with [Agent Observability][correlation-3] and propagate its context.

### Choose attribution headers

| Header | Purpose |
|---|---|
| `x-dd-tag-ml_app` | Set the application name in Agent Observability. |
| `x-dd-tag-<KEY>` | Add a custom dimension, such as `project` or `workflow`, for filtering and matching policy scopes. |
| `x-ai-gateway-team` | Select a team the authenticated caller belongs to for team-scoped accounting and policies. |
| `x-session-id` | Associate related requests with a session. |
| Distributed trace headers | Continue the caller's trace context, including Agent Observability parent context when available. |

The authenticated Datadog credential determines caller identity. Setting a tag does not impersonate a user or grant model access. Team selection also does not grant model access.

Use non-sensitive, stable values for tags and sessions. Avoid prompts, email addresses, credentials, and other sensitive data in these headers.

### Attribute requests to an application

Set `x-dd-tag-ml_app` on requests from the same application. Without an explicit application name or propagated application context, AI Gateway traces appear under `datadog-ai-gateway`.

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

Use the AI Gateway hostname for your [Datadog site][correlation-4] and a model or routing rule the caller can use.

Do not use `x-dd-tag-model` or `x-dd-tag-provider` to describe a requested destination. AI Gateway reserves these dimensions and records the actual served model and provider.

Custom keys must start with a lowercase letter, followed by lowercase letters, digits, underscores, periods, slashes, or hyphens (`^[a-z][a-z0-9_./-]*$`). For header keys, avoid slashes because HTTP header names do not allow them. No separate tag-key length limit is defined; HTTP header size limits still apply. Keys in the reserved `_dd.*` namespace are ignored.

### Select a team

Add the following header with the slug of a team the caller belongs to:

```text
x-ai-gateway-team: <TEAM_SLUG>
```

The selection affects matching team budgets, rate limits, and data capture. Personal and organization-wide policies can still apply.

Without this header, a request can match budgets and rate limits for every team the caller directly belongs to. Its full cost counts against each matching team budget. A team data capture override requires explicit selection with the header. Check the [team selection errors][correlation-5] if the slug is invalid or the caller is not a member.

### Propagate trace context

Configure the caller's Datadog instrumentation to inject the active context into the outbound AI Gateway request. The caller must have an active Agent Observability span, such as an agent or workflow span, when it calls AI Gateway. For setup steps, see [Distributed tracing][correlation-8]. Preserve all headers the propagator produces through proxies and HTTP clients.

AI Gateway accepts Datadog trace propagation and W3C Trace Context. To nest an AI Gateway span under an Agent Observability span, the propagated context must include both the Agent Observability trace ID and parent span ID. An application name or an APM trace ID alone does not establish an Agent Observability parent. Without that context, each AI Gateway request starts its own trace. To group a run's requests, associate them with a session.

A request that can call more than one model, such as a Smart Routing rule or a rule with fallbacks, produces one trace with a workflow span. The routing decision, the routed model call, and any fallback attempts appear as children of that span.

If your integration already has an Agent Observability trace and parent span but does not use distributed trace propagation, send both IDs as request headers:

```text
x-dd-tag-llmobs_trace_id: <EXISTING_LLMOBS_TRACE_ID>
x-dd-tag-llmobs_parent_id: <EXISTING_LLMOBS_PARENT_SPAN_ID>
```

Use IDs from an existing span in the same Datadog organization. Do not generate unrelated IDs for each HTTP call. AI Gateway ignores an incomplete or malformed pair. When valid distributed Agent Observability parent context is also present, that context takes precedence over these two tags.

An explicit `x-dd-tag-ml_app` overrides an application name carried in propagated context. Use a consistent application name when you want to view the caller and AI Gateway spans together.

### Associate a session

Send the same `x-session-id` value for requests in a conversation or agent run. Use a distinct value for independent sessions:

```text
x-session-id: gateway-verification-session
```

Send one `x-session-id` value. Use valid UTF-8 without control characters and keep it within 256 bytes. Invalid values can prevent session association.

A session groups related activity in Agent Observability. In a routing rule, it also keeps the conversation on one destination. See [Sessions](/ai_gateway/routing/#sessions). A session does not establish a trace parent or grant access.

### Follow a known request

Use the overview to review request volume, token usage, cost, errors, and latency. To locate a specific request:

1. Send a harmless request with an application name and a custom tag value reserved for the verification.
2. Open [Agent Observability traces][correlation-traces].
3. Select the time range containing your request.
4. Filter for your application and custom tag.
5. Confirm the caller and served destination.
6. If you supplied parent context, open the trace to confirm the AI Gateway activity appears under the intended parent.
7. If you supplied a session, confirm its session association.
8. Check that recorded content matches the effective data capture setting. A metadata-only request should still have operational information without prompt and response text.

A routing rule can produce several provider attempts through retries or fallbacks. Inspect the attempt that served the response when comparing the requested alias with the actual provider and model. For aggregate definitions, see [AI Gateway metrics][correlation-7].

### Troubleshoot attribution

| Symptom | Check |
|---|---|
| Request appears under the default application | Verify the application header reaches AI Gateway and that you are viewing the correct time range. |
| Caller differs from the expected user | Check which Datadog credential the application actually sends. Caller tags do not change authentication. |
| Team accounting is unexpected | Review the selected team, direct memberships, and every matching budget or rate limit. |
| AI Gateway activity appears in a separate trace | Confirm the active Agent Observability parent exists and that the trace ID, parent span ID, and full distributed context reach AI Gateway. |
| Tag is missing | Check the key and value, avoid reserved dimensions, and confirm your client sends the header. |
| Prompt or response text is absent | Check the effective capture policy before treating missing content as an attribution problem. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[3]: https://app.datadoghq.com/llm/gateway
[16]: /llm_observability/investigate/metrics/#gateway-metrics

[correlation-1]: /ai_gateway/getting_started/
[correlation-2]: /ai_gateway/security/#configure-data-capture
[correlation-3]: /llm_observability/instrument/
[correlation-4]: /getting_started/site/
[correlation-5]: /ai_gateway/troubleshooting/#error-codes
[correlation-traces]: https://app.datadoghq.com/llm/traces
[correlation-7]: /llm_observability/investigate/metrics/#gateway-metrics
[correlation-8]: /llm_observability/instrument/sdk/#distributed-tracing
