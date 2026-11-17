---
title: Send Requests through AI Gateway
description: Choose an AI Gateway endpoint, supported request format, and model identifier.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Send requests to the base URL for your [Datadog site][12]:

```text
https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1
```

[Authenticate requests](/ai_gateway/applications/#authenticate-requests) with a Datadog personal access token or service access token. For a complete request example, see [Get Started](/ai_gateway/getting_started/#send-a-request).

## Supported request formats

Append one of the following paths to the base URL. The operations available depend on the model and provider account; the provider page shows the operations and request examples for your account.

| Request format | Path |
|---|---|
| OpenAI Responses | `POST /responses` |
| OpenAI Chat Completions | `POST /chat/completions` |
| Anthropic Messages | `POST /messages` |

## Select a model

Set the `model` field in the request body to one of the following:

- `<PROVIDER_SLUG>/<MODEL_ID>` to call a model on a specific provider.
- `router/<RULE_SLUG>` to let a [routing rule](/ai_gateway/routing/) choose the destination.

## API translation

API translation lets an application keep its inference API while calling a model that supports another API. For example, a Responses client can call a model that accepts Anthropic Messages, and a Messages client can call a model that accepts Responses.

AI Gateway translates the request and returns the response in the client's API, including supported tool calls and server-sent events (SSE). Translation supports a subset of each API. Check the settings, tools, and conversation history your application uses before changing its target model.

### Choose a compatible target

1. [Configure a provider][translation-1] and review the operations listed for the model.
2. [Authenticate][translation-2] with a Datadog token that has `ai_gateway_usage` and access to the model or routing rule.
3. Keep the client's Gateway endpoint and request format. Set `model` to `<PROVIDER_SLUG>/<MODEL_ID>` or `router/<RULE_SLUG>`.
4. Use the following table to check whether Gateway can translate to a target's operation.

| Client request API | Supported target APIs through translation |
|---|---|
| OpenAI Responses | Anthropic Messages, OpenAI Chat Completions, Google `generateContent` |
| OpenAI Chat Completions | OpenAI Responses, Anthropic Messages, Google `generateContent` |
| Anthropic Messages | OpenAI Responses, OpenAI Chat Completions |
| Google `generateContent` | OpenAI Responses, OpenAI Chat Completions |

Translation is selected by API support, rather than provider name. A Gemini model exposed through an OpenAI-compatible Chat Completions endpoint can accept a Chat Completions request directly. Messages and Google `generateContent` do not translate directly to each other.

If a target supports the client's API, Gateway uses that API directly. For a Messages request to a target supporting both Responses and Chat Completions, Gateway prefers Responses to preserve supported reasoning continuation. Other translation targets are considered in the order of the model catalog's supported-operation list. Review the model's operations in its [provider configuration][translation-1]. This is separate from a routing rule's fallback order.

A [routing rule][translation-3] can select another destination if an operation or request setting cannot be translated. Each attempt starts with the original client request. If no destination accepts the operation or settings, Gateway returns HTTP `400` with the `unsupported_operation` error code and an explanation of the relevant field.

### Send a translated request

The following example sends Responses to a target that supports Anthropic Messages. Replace the model identifier with a configured target. Use the host for your [Datadog site][translation-4].

```shell
curl -i "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1/responses" \
  -H "Authorization: Bearer <DATADOG_ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -H "x-dd-tag-ml_app: translation-test" \
  -d '{
    "model": "<PROVIDER_SLUG>/<MODEL_ID>",
    "input": "Reply with exactly: Gateway connected.",
    "max_output_tokens": 128,
    "store": false
  }'
```

The response uses the Responses format. To request SSE, add `"stream": true` to the body and use `curl -N -i`. Inspect the response body and check the `X-Ai-Gateway-Translation-Warnings` response header for translation warnings.

Provider credentials remain configured on the Gateway provider. The application sends its Datadog token to Gateway.

### Check feature compatibility

Common supported features include user and assistant text, system instructions, custom functions, tool choice, and tool calls and results. Image support depends on the translation path. Output limits, temperature, top-p, reasoning controls, and JSON output depend on the API pair and model.

| Feature | What to check |
|---|---|
| Stored conversation history | Supply the complete supported history with each request. Translation does not resolve `previous_response_id` or server-stored conversations. |
| Background execution and prompt templates | Resolve templates in the application and use synchronous inference or SSE. Background jobs do not translate. |
| Multiple candidates, audio, and video | These are outside the supported translation subset. |
| Reasoning effort | Values map where supported, but the target model must accept the requested level. An explicit thinking-token budget is not equivalent to a reasoning-effort level. |
| Provider-specific settings | Settings such as Google safety configuration, cached content, or top-k can fail when the destination has no supported mapping. An unsupported mapping does not imply that the destination model lacks the capability. |
| Hosted tools | Support depends on the API pair. Hosted web search translates between Responses and Messages with supported search settings. Other server-side tools, compaction, and cross-API token-counting endpoints are unsupported. |
| Hosted search on Chat or Google targets | A declared search tool is omitted with `web_search_omitted`; a tool choice that requires hosted search fails translation. Check warnings before relying on search. |
| Response metadata | Google `generateContent` translation rejects nonempty Responses `metadata`, the `user` field, and the `safety_identifier` field. Client correlation context in `client_metadata` is separate and is omitted from translated Google and Chat requests. |

Disabled or empty settings such as `background: false`, `include: []`, and `truncation: "disabled"` are accepted without the `X-Ai-Gateway-Allow-Lossy-Translation` request header or a translation warning. They do not enable the corresponding service. Meaningful unsupported settings return a field-specific error.

#### Tools and conversation history

The application executes client-side tools and returns each result using the matching call identifier. Gateway translates the wire representation; it does not execute these tools.

Responses freeform custom tools, including Codex `apply_patch`, can target Messages, Chat Completions, or Google `generateContent`. Gateway represents each custom tool as a function with a string argument, then restores the custom-tool call for the Responses client. Tool namespaces and call/result associations are preserved.

Lark or regular-expression tool grammars become tool instructions without grammar enforcement. Gateway reports `custom_tool_grammar_relaxed`. On Messages targets, developer-role messages that appear after user or assistant messages become system instructions. This changes their position and role priority and produces `developer_messages_normalized`. Developer instructions that appear only before the first user or assistant message do not produce that warning.

Preserve supported assistant history, tool calls, and tool results between turns. Messages requests ending in an assistant prefill are rejected for translation. Do not assume that every client feature works because a text-only request succeeds.

#### Reasoning continuation

Reasoning history is specific to its originating model and target. Preserve opaque continuation data returned by Gateway without editing it.

- **Responses to Messages:** Send `"include": ["reasoning.encrypted_content"]` to receive replayable reasoning data. Include the returned reasoning items in the next request's history. Without the include, reasoning history is omitted on replay and reported as `reasoning_history_omitted`.
- **Messages to Responses:** Preserve the returned thinking blocks and signatures when sending subsequent turns.
- **Responses to Google:** Preserve the returned continuation item and the associated output items unchanged, then append the tool results or next user turn.
- **Ordinary Chat Completions targets:** Hidden model reasoning is not returned as replayable reasoning history. Requested Responses summaries or encrypted-reasoning output are omitted with warnings; unsupported reasoning history fails translation. Gemini models exposed through an OpenAI-compatible Chat Completions endpoint can preserve Google continuation state.

Keep the target stable for turns that depend on reasoning continuation. A routing change to another provider or model can invalidate existing continuation data and cause a request to fail. Test a complete tool loop with the target and routing configuration your application uses.

#### Structured output

For Responses requests targeting Messages or Chat Completions, `text.format.strict: true` supports a bounded JSON Schema subset. Gateway validates answer JSON against the original schema before returning a successful structured answer.

Supported schemas use an object root, explicit types or `anyOf`, closed objects with `additionalProperties: false`, scalar enums, properties, required fields, and one item schema for arrays. String lengths, numeric bounds and multiples, and array lengths are also validated. References, regular-expression or format constraints, other combinators, and unsupported keywords are rejected.

Limits include a 64 KiB format, 16 schema levels, 256 schema nodes, 16 `anyOf` branches, 256 enum values, and 1 MiB of answer JSON. For streams, only life cycle metadata is sent before validation; answer, reasoning, and tool output wait for terminal validation. This adds latency. Refusal, truncation, invalid JSON, or a schema violation returns an error. Gateway does not repair the answer.

Strict structured-output guarantees do not translate to Google `generateContent`. A non-strict schema can translate where supported, without providing the same guarantee.

### Handle translation warnings

Inspect the `X-Ai-Gateway-Translation-Warnings` response header for buffered and streaming requests. Warnings identify settings that were omitted, normalized, or relaxed. The warning depends on the API pair and settings that were used.

| Warning | Meaning |
|---|---|
| `parallel_tool_calls_relaxed` | The request opted into allowing multiple function calls on a Google target. |
| `custom_tool_grammar_relaxed` | A custom tool's grammar is included as instructions without grammar enforcement. |
| `developer_messages_normalized` | Developer-role messages after user or assistant messages became Messages system instructions. |
| `max_output_tokens_defaulted` | A Responses request omitted its output-token limit, so Gateway supplied a Messages limit from model metadata or a default. Set the limit explicitly to control it. |
| `cache_control_omitted` | Anthropic prompt-cache breakpoints could not be represented in Responses. Provider automatic caching is separate. |
| `prompt_cache_key_omitted` | The destination does not receive the source API's prompt-cache key. |
| `reasoning_summary_omitted` | An ordinary Chat target does not return the requested visible reasoning summary. |
| `reasoning_encrypted_content_omitted` | An ordinary Chat target does not return encrypted reasoning continuation. |
| `web_search_omitted` | The selected API cannot run the declared provider-hosted search tool. |

A successful request without a warning does not establish complete API equivalence. For example, Anthropic cache breakpoints are omitted silently when targeting Chat Completions.

#### Relax the single-call restriction for Google targets

A request with `parallel_tool_calls: false` and callable tools cannot translate to Google `generateContent` with the single-call guarantee intact. By default, Gateway rejects that translation if no native destination accepts it. A request without tools, or with `tool_choice: "none"`, does not need relaxation.

If your application can handle multiple calls in one turn, add the following request header:

```text
X-Ai-Gateway-Allow-Lossy-Translation: parallel_tool_calls
```

When Gateway relaxes the restriction, the response includes:

```text
X-Ai-Gateway-Translation-Warnings: parallel_tool_calls_relaxed
```

The opt-in accepts only `parallel_tool_calls`. It is not an option to ignore all unsupported fields. Boolean values, wildcards, repeated policies, and repeated headers are rejected. Gateway returns every call; the application must handle each one and send its result.

Responses to Messages preserves the single-call restriction without this opt-in. Native requests retain their original settings.

### Handle streaming failures

Read the stream through its terminal event. An HTTP `200` can precede a failure reported later in the stream. Partial output is not a completed answer.

| Client API | Failure after streaming has started |
|---|---|
| Anthropic Messages | An `event: error` event. |
| OpenAI Chat Completions | A `data: {"error": ...}` chunk without a success `[DONE]` marker. `error.code` is an integer HTTP status; `error.metadata.reason` contains the string error code. |
| OpenAI Responses | A `response.failed` event. |
| Google `generateContent` | An SSE data chunk with a top-level `error` object. Inspect its numeric `code`, canonical `status`, and `message` fields. |

For example, a Google streaming error can contain:

```text
data: {"error":{"code":503,"status":"UNAVAILABLE","message":"The upstream service is unavailable."}}
```

For a translated upstream HTTP error, Gateway preserves the status and relevant headers, such as `Retry-After`, and renders the error in the client's API. Native streams retain the provider's error behavior.

### Verify translation for your application

1. Start with a text request in your client's API, sent to the target model, with an explicit output-token limit.
2. Check the response format and translation-warning headers.
3. Test the features your application uses: a streamed answer, a complete tool call/result loop, structured output, and reasoning continuation where applicable.
4. Open [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Overview{{< /ui >}}][translation-5], then follow the trace to Agent Observability. Confirm the served provider and model. Billing uses the provider's reported usage.
5. If you use fallbacks, exercise each destination with the same request settings and history. A successful request against one destination does not prove the others are compatible.

See [Gateway troubleshooting][translation-6] for authentication, model access, and operation errors.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[12]: /getting_started/site/

[translation-1]: /ai_gateway/providers/#add-a-provider
[translation-2]: /ai_gateway/applications/#authenticate-requests
[translation-3]: /ai_gateway/routing/
[translation-4]: /getting_started/site/
[translation-5]: https://app.datadoghq.com/llm/gateway
[translation-6]: /ai_gateway/troubleshooting/
