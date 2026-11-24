---
title: Send Requests through AI Gateway
description: Choose an AI Gateway endpoint, supported request format, and model identifier.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

Every request to AI Gateway needs a Datadog credential, the base URL for your Datadog site, and a model identifier. For a complete request example, see [Get Started](/ai_gateway/getting_started/#send-a-request). To set up a specific client, such as Claude Code, Codex, or an SDK, see [Connect Applications](/ai_gateway/applications/).

## Authenticate requests

AI Gateway accepts the following Datadog credentials. The user or service account and the credential scope must allow `ai_gateway_usage`.

For Claude Code and Codex, [Trajectory](/ai_gateway/applications/#connect-claude-code-and-codex-with-trajectory) signs you in to Datadog, so you do not need a long-lived token for them.

| Credential | Request headers |
|---|---|
| [Personal access token][requests-1] | `Authorization: Bearer <PERSONAL_ACCESS_TOKEN>` |
| [Personal access token][requests-1], for coding agents signed in with a [subscription](/ai_gateway/providers/#use-subscription-providers) | `dd-application-key: <PERSONAL_ACCESS_TOKEN>` |
| [Service access token (SAT)][requests-2] | `Authorization: Bearer <SERVICE_ACCESS_TOKEN>` |
| [Workload Identity Federation][requests-3] token | `Authorization: Bearer <WIF_TOKEN>` |

Coding agents signed in with a subscription send two headers:

- `Authorization`: The subscription credential, which AI Gateway passes through to the subscription vendor.
- `dd-application-key`: Your Datadog personal access token, which AI Gateway uses to authenticate you.

Despite its name, `dd-application-key` takes a personal access token, not an application key.

For service workloads, use a service access token. For workloads running in AWS, you can [authenticate with Workload Identity Federation](/ai_gateway/applications/#authenticate-aws-workloads-with-workload-identity-federation) instead, with no Datadog secret to store or rotate. Store credentials in your application's secret manager and keep them out of source control and logs.

## Base URL

Send requests to the base URL for your Datadog site, followed by the path of the [request format](#supported-request-formats):

```text
https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1
```

Clients that add `/v1` to the base URL themselves, such as Claude Code and the Anthropic SDK, use `https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai` instead.

The URLs on this page match the site chosen in the {{< ui >}}Datadog Site{{< /ui >}} selector. To find your site, see [Datadog sites][12].

## Request headers

AI Gateway reads these request headers. Clients set them through their own header settings, such as `ANTHROPIC_CUSTOM_HEADERS` in Claude Code, `http_headers` in Codex, or `default_headers` in an SDK.

| Header | Required | Purpose |
|---|---|---|
| `Authorization: Bearer <TOKEN>` | Yes | Your Datadog credential. See [Authenticate requests](#authenticate-requests). |
| `dd-application-key: <PERSONAL_ACCESS_TOKEN>` | For subscription agents | Your Datadog personal access token, when `Authorization` carries a [subscription](/ai_gateway/providers/#use-subscription-providers) credential. |
| `x-ai-gateway-provider: <PROVIDER_SLUG>` | No | Sends a model ID without its provider prefix to this provider. Ignored for `router/<RULE_SLUG>` models. |
| `x-ai-gateway-team: <TEAM_SLUG>` | No | Attributes the request to a team you belong to. See [Select a team](/ai_gateway/applications/#select-a-team). |
| `x-dd-tag-ml_app: <APPLICATION_NAME>` | No | Names the application in Agent Observability. See [Attribute requests to an application](/ai_gateway/applications/#attribute-requests-to-an-application). |
| `x-dd-tag-<KEY>: <VALUE>` | No | Adds a custom tag that budgets, rate limits, and data capture overrides can match. |
| `x-session-id: <SESSION_ID>` | No | Identifies the conversation, so routing keeps it on one destination. Coding agents send their own session IDs. See [Sessions](/ai_gateway/routing/#sessions). |

## Supported request formats

Append one of the following paths to the [base URL](#base-url). The operations available depend on the model and provider account; the provider page shows the operations and request examples for your account.

| Request format | Method and path | Notes |
|---|---|---|
| OpenAI Responses | `POST /responses` | |
| OpenAI Chat Completions | `POST /chat/completions` | |
| Anthropic Messages | `POST /messages` | |
| Gemini generateContent | `POST /publishers/<PROVIDER_SLUG>/models/<MODEL_ID>:generateContent`, or `:streamGenerateContent` to stream | Also accepted under `/ai/v1beta1`. See [Native Gemini and decision APIs](#native-gemini-and-decision-apis). |
| Gemini rawPredict | `POST /publishers/<PROVIDER_SLUG>/models/<MODEL_ID>:rawPredict`, or `:streamRawPredict` to stream | Anthropic Messages body, for Claude models on Vertex AI. Not translated. See [Native Gemini and decision APIs](#native-gemini-and-decision-apis). |
| Decisions | `POST /decisions` | |
| System One | `POST /systemone` | |

A format that AI Gateway accepts still has to be supported by the provider and model that serve the request. AI Gateway translates between some formats, but not all formats translate into each other. Check the operations listed for the model on its provider page, and see [API translation](#api-translation).

A request in the Anthropic Messages format must include the `anthropic-version` header. AI Gateway adds the header only when it translates a request from another format into Messages.

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
3. Keep the client's AI Gateway endpoint and request format. Set `model` to `<PROVIDER_SLUG>/<MODEL_ID>` or `router/<RULE_SLUG>`.
4. Use the following table to check whether AI Gateway can translate to a target's operation.

| Client request API | Supported target APIs through translation |
|---|---|
| OpenAI Responses | Anthropic Messages, OpenAI Chat Completions, Google `generateContent` |
| OpenAI Chat Completions | OpenAI Responses, Anthropic Messages, Google `generateContent` |
| Anthropic Messages | OpenAI Responses, OpenAI Chat Completions |
| Google `generateContent` | OpenAI Responses, OpenAI Chat Completions |

Translation is selected by API support, rather than provider name. A Gemini model exposed through an OpenAI-compatible Chat Completions endpoint can accept a Chat Completions request directly. Messages and Google `generateContent` do not translate directly to each other.

If a target supports the client's API, AI Gateway uses that API directly. For a Messages request to a target supporting both Responses and Chat Completions, AI Gateway prefers Responses to preserve supported reasoning continuation. Other translation targets are considered in the order of the model catalog's supported-operation list. Review the model's operations in its [provider configuration][translation-1]. This is separate from a routing rule's fallback order.

A [routing rule][translation-3] can select another destination if an operation or request setting cannot be translated. Each attempt starts with the original client request. If no destination accepts the operation or settings, AI Gateway returns HTTP `400` with the `unsupported_operation` error code and an explanation of the relevant field.

### Send a translated request

Replace the model identifier with a configured target, and use the host for your [Datadog site][translation-4]. The following example sends Responses to a target that supports Anthropic Messages:

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

Provider credentials remain configured on the AI Gateway provider. The application sends its Datadog token to AI Gateway.

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
| Hosted search on targets that cannot run it, such as Chat or Google targets | A declared search tool is omitted with `web_search_omitted`; a tool choice that requires hosted search fails translation. Check warnings before relying on search. |
| Response metadata | Google `generateContent` translation rejects nonempty Responses `metadata`, the `user` field, and the `safety_identifier` field. Client correlation context in `client_metadata` is separate and is omitted from translated Google and Chat requests. |

Disabled or empty settings such as `background: false`, `include: []`, and `truncation: "disabled"` are accepted without the `X-Ai-Gateway-Allow-Lossy-Translation` request header or a translation warning. They do not enable the corresponding service. Meaningful unsupported settings return a field-specific error.

#### Tools and conversation history

The application executes client-side tools and returns each result using the matching call identifier. AI Gateway translates the wire representation; it does not execute these tools.

Responses freeform custom tools, including Codex `apply_patch`, can target Messages, Chat Completions, or Google `generateContent`. AI Gateway represents each custom tool as a function with a string argument, then restores the custom-tool call for the Responses client. Tool namespaces and call/result associations are preserved.

Lark or regular-expression tool grammars become tool instructions without grammar enforcement. AI Gateway reports `custom_tool_grammar_relaxed`. On Messages targets, developer-role messages that appear after user or assistant messages become system instructions. This changes their position and role priority and produces `developer_messages_normalized`. Developer instructions that appear only before the first user or assistant message do not produce that warning.

Preserve supported assistant history, tool calls, and tool results between turns. Messages requests ending in an assistant prefill are rejected for translation. Do not assume that every client feature works because a text-only request succeeds.

#### Reasoning continuation

Reasoning history is specific to its originating model and target. Preserve opaque continuation data returned by AI Gateway without editing it.

- **Responses to Messages:** Send `"include": ["reasoning.encrypted_content"]` to receive replayable reasoning data. Include the returned reasoning items in the next request's history. Without the include, reasoning history is omitted on replay and reported as `reasoning_history_omitted`.
- **Messages to Responses:** Preserve the returned thinking blocks and signatures when sending subsequent turns.
- **Responses to Google:** Preserve the returned continuation item and the associated output items unchanged, then append the tool results or next user turn.
- **Ordinary Chat Completions targets:** Hidden model reasoning is not returned as replayable reasoning history. Requested Responses summaries or encrypted-reasoning output are omitted with warnings; unsupported reasoning history fails translation. Gemini models exposed through an OpenAI-compatible Chat Completions endpoint can preserve Google continuation state.

Keep the target stable for turns that depend on reasoning continuation. A routing change to another provider or model can invalidate existing continuation data and cause a request to fail. Test a complete tool loop with the target and routing configuration your application uses.

#### Structured output

For Responses requests targeting Messages or Chat Completions, `text.format.strict: true` supports a bounded JSON Schema subset. AI Gateway validates answer JSON against the original schema before returning a successful structured answer.

Supported schemas use an object root, explicit types or `anyOf`, closed objects with `additionalProperties: false`, scalar enums, properties, required fields, and one item schema for arrays. String lengths, numeric bounds and multiples, and array lengths are also validated. References, regular-expression or format constraints, other combinators, and unsupported keywords are rejected.

Limits include a 64 KiB format, 16 schema levels, 256 schema nodes, 16 `anyOf` branches, 256 enum values, and 1 MiB of answer JSON. For streams, only life cycle metadata is sent before validation; answer, reasoning, and tool output wait for terminal validation. This adds latency. Refusal, truncation, invalid JSON, or a schema violation returns an error. AI Gateway does not repair the answer.

Strict structured-output guarantees do not translate to Google `generateContent`. A non-strict schema can translate where supported, without providing the same guarantee.

### Handle translation warnings

Inspect the `X-Ai-Gateway-Translation-Warnings` response header for buffered and streaming requests. Warnings identify settings that were omitted, normalized, or relaxed. The warning depends on the API pair and settings that were used.

| Warning | Meaning |
|---|---|
| `parallel_tool_calls_relaxed` | The request opted into allowing multiple function calls on a Google target. |
| `custom_tool_grammar_relaxed` | A custom tool's grammar is included as instructions without grammar enforcement. |
| `developer_messages_normalized` | Developer-role messages after user or assistant messages became Messages system instructions. |
| `max_output_tokens_defaulted` | A Responses request omitted its output-token limit, so AI Gateway supplied a Messages limit from model metadata or a default. Set the limit explicitly to control it. |
| `cache_control_omitted` | Anthropic prompt-cache breakpoints could not be represented in Responses. Provider automatic caching is separate. |
| `prompt_cache_key_omitted` | The destination does not receive the source API's prompt-cache key. |
| `reasoning_summary_omitted` | An ordinary Chat target does not return the requested visible reasoning summary. |
| `reasoning_encrypted_content_omitted` | An ordinary Chat target does not return encrypted reasoning continuation. |
| `web_search_omitted` | The selected API cannot run the declared provider-hosted search tool. |

A successful request without a warning does not establish complete API equivalence. For example, Anthropic cache breakpoints are omitted silently when targeting Chat Completions.

#### Relax the single-call restriction for Google targets

A request with `parallel_tool_calls: false` and callable tools cannot translate to Google `generateContent` with the single-call guarantee intact. By default, AI Gateway rejects that translation if no native destination accepts it. A request without tools, or with `tool_choice: "none"`, does not need relaxation.

If your application can handle multiple calls in one turn, add the following request header:

```text
X-Ai-Gateway-Allow-Lossy-Translation: parallel_tool_calls
```

When AI Gateway relaxes the restriction, the response includes:

```text
X-Ai-Gateway-Translation-Warnings: parallel_tool_calls_relaxed
```

The opt-in accepts only `parallel_tool_calls`. It is not an option to ignore all unsupported fields. Boolean values, wildcards, repeated policies, and repeated headers are rejected. AI Gateway returns every call; the application must handle each one and send its result.

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

For a translated upstream HTTP error, AI Gateway preserves the status and relevant headers, such as `Retry-After`, and renders the error in the client's API. Native streams retain the provider's error behavior.

### Verify translation for your application

1. Start with a text request in your client's API, sent to the target model, with an explicit output-token limit.
2. Check the response format and translation-warning headers.
3. Test the features your application uses: a streamed answer, a complete tool call/result loop, structured output, and reasoning continuation where applicable.
4. Open [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Overview{{< /ui >}}][translation-5], then follow the trace to Agent Observability. Confirm the served provider and model. Billing uses the provider's reported usage.
5. If you use fallbacks, exercise each destination with the same request settings and history. A successful request against one destination does not prove the others are compatible.

See [AI Gateway troubleshooting][translation-6] for authentication, model access, and operation errors.
## Native Gemini and decision APIs

Use a native API when your application needs its request and response format. AI Gateway accepts Gemini generateContent, Gemini rawPredict, OpenAI Decisions, and Baseten System One requests in addition to OpenAI Responses, Chat Completions, and Anthropic Messages.

OpenAI Decisions and Baseten System One are decision APIs: they evaluate an input against named questions and return a typed answer for each question.

### Before you begin

- Complete [AI Gateway setup][inference_apis-1] and configure a provider model that supports the operation you intend to call. Check the model's supported operations in its provider configuration.
- Have a Datadog personal access token or service access token whose principal and scope allow `ai_gateway_usage`.
- Confirm that an [access policy][inference_apis-2] allows the provider model or routing rule.
- Review [data capture][inference_apis-3] before sending sensitive content.

Use the hostname for your [Datadog site][inference_apis-4]. Replace the placeholders in these examples with values from your AI Gateway provider and model configuration. Load your Datadog token from your secret manager into `DD_AI_GATEWAY_TOKEN`.

### Choose an endpoint

The following paths start at the host `https://ai-gateway.{{< region-param key="dd_site" code="true" >}}`. They already include `/ai/v1`, so don't append them to the AI Gateway base URL:

| API | AI Gateway path | Model selection | Streaming |
|---|---|---|---|
| Gemini generateContent | `POST /ai/v1/publishers/<PROVIDER_SLUG>/models/<MODEL_ID>:generateContent` | Provider slug and model ID in the URL | Use `:streamGenerateContent` for streaming. |
| Gemini rawPredict | `POST /ai/v1/publishers/<PROVIDER_SLUG>/models/<MODEL_ID>:rawPredict` | Provider slug and model ID in the URL | Use `:streamRawPredict` for streaming. |
| OpenAI Decisions | `POST /ai/v1/decisions` | `model` in the body | Non-streaming response. |
| System One | `POST /ai/v1/systemone` | `model` in the body | Non-streaming response. |

Gemini rawPredict serves Claude models on Vertex AI: the request body uses the Anthropic Messages format, and AI Gateway does not translate it. For Gemini, AI Gateway also accepts the `/ai/v1beta1/publishers/...` paths. Find your model in {{< ui >}}Model Catalog{{< /ui >}} and check its supported operations in the provider configuration before choosing an endpoint.

To use a routing rule with OpenAI Decisions or System One, set `model` to `router/<RULE_SLUG>`. For Gemini, use `/ai/v1/publishers/router/models/<RULE_SLUG>:generateContent` or its streaming variant. The rule's destinations must support the requested operation.

This guide covers the endpoints in the table. Native requests retain their provider-specific fields, such as tools and caching options. Follow the provider reference for the request schema and supported fields.

<!-- vale Datadog.headings = NO -->
### Call Gemini generateContent
<!-- vale Datadog.headings = YES -->

The URL's publisher segment is your **AI Gateway provider slug**, such as `production-vertex`. Use the canonical model ID from that provider's model configuration. Do not substitute the literal publisher name `google` unless it is also your AI Gateway provider slug. For example:

```shell
curl -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1/publishers/<PROVIDER_SLUG>/models/<MODEL_ID>:generateContent" \
  -H "Authorization: Bearer $DD_AI_GATEWAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "role": "user",
      "parts": [{"text": "Explain a rolling request limit in one sentence."}]
    }]
  }'
```

Keep the Gemini `contents` and `parts` structure. The model is selected in the URL, so this example does not use an OpenAI-style `model` field in the body. The response retains the Gemini format.

For streaming, use `:streamGenerateContent`. The `-N` option disables curl's output buffering so events appear as they arrive:

```shell
curl -N -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1/publishers/<PROVIDER_SLUG>/models/<MODEL_ID>:streamGenerateContent" \
  -H "Authorization: Bearer $DD_AI_GATEWAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "role": "user",
      "parts": [{"text": "Explain a rolling request limit in one sentence."}]
    }]
  }'
```

AI Gateway requests server-sent events from the upstream provider; you don't need to add `?alt=sse` to the AI Gateway URL. See the [Gemini inference reference][inference_apis-5] for provider request fields.

<!-- vale Datadog.headings = NO -->
### Call OpenAI Decisions
<!-- vale Datadog.headings = YES -->

Use the Decisions API to evaluate shared input against typed questions. Select a model whose AI Gateway configuration supports OpenAI Decisions, and prefix its model ID with the AI Gateway provider slug:

```shell
curl -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1/decisions" \
  -H "Authorization: Bearer $DD_AI_GATEWAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<PROVIDER_SLUG>/<MODEL_ID>",
    "input": "I was charged twice for my order.",
    "questions": [{
      "type": "choice",
      "name": "department",
      "instructions": "Select the team that should handle this request.",
      "choices": [{"value": "billing"}, {"value": "technical"}]
    }]
  }'
```

Read the corresponding answer in the response's `answers` array. The question's `name` identifies its answer. See the [OpenAI Decisions guide][inference_apis-6] for question types and accepted input.

<!-- vale Datadog.headings = NO -->
### Call System One
<!-- vale Datadog.headings = YES -->

Use System One with a configured Baseten, TypeSafe, or compatible custom endpoint that supports this operation. System One uses `state` and a map of named `questions`, which is a different payload from OpenAI Decisions. For example:

```shell
curl -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1/systemone" \
  -H "Authorization: Bearer $DD_AI_GATEWAY_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "<PROVIDER_SLUG>/<MODEL_ID>",
    "state": "Please refund the duplicate charge.",
    "questions": {
      "department": {
        "type": "choice",
        "instructions": "Select the team that should handle this request.",
        "criteria": {
          "billing": "Billing, payments, and refunds",
          "technical": "Technical support"
        }
      }
    }
  }'
```

Do not set `stream: true`. AI Gateway rejects streaming System One requests. For a compatible custom endpoint, AI Gateway appends `/systemone` to the provider's configured base URL to form the upstream endpoint.

AI Gateway preserves the native response format and uses reported token usage for accounting. It does not translate System One requests into OpenAI Decisions requests or the reverse. See the [System One reference][inference_apis-7] for upstream payload details.

### Verify a request

1. Send a harmless request with the operation your model supports.
2. Confirm that the response uses the expected native format.
3. Open [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Overview{{< /ui >}}][inference_apis-8] and select the time range containing your request.
4. Click the model or a request bar to open {{< ui >}}Traces{{< /ui >}} with the corresponding filters.
5. Open the AI Gateway span. Check the served provider and model, token usage, errors, and captured content according to the effective data capture setting.

### Troubleshoot requests

For AI Gateway errors, inspect the `X-Ai-Gateway-Error-Code` response header. Provider validation errors can use different messages and response formats.

| Response or symptom | What to check |
|---|---|
| Gemini model or provider is not found | Use the AI Gateway provider slug in the publisher segment and the model ID belonging to that provider. |
| HTTP `400`, `unsupported_operation` | Check the configured model's supported operations and use the matching endpoint. |
| A decision payload is rejected | Match the endpoint's schema: OpenAI Decisions uses `input` and a question array; System One uses `state` and a question map. Read the provider's validation message for details. |
| System One HTTP `400`, `bad_request`, `invalid request body` | Send a valid JSON object with the System One request fields. |
| System One HTTP `400`, `bad_request`, `System One does not support streaming` | Remove `stream: true` and consume the non-streaming response. |
| Request is denied | Check token scope, model access, budgets, rate limits, and the [AI Gateway error code][inference_apis-9]. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[12]: /getting_started/site/

[translation-1]: /ai_gateway/providers/#add-a-provider
[translation-2]: /ai_gateway/requests/#authenticate-requests
[translation-3]: /ai_gateway/routing/
[translation-4]: /getting_started/site/
[translation-5]: https://app.datadoghq.com/llm/gateway
[translation-6]: /ai_gateway/troubleshooting/
[inference_apis-1]: /ai_gateway/getting_started/
[inference_apis-2]: /ai_gateway/access_control/
[inference_apis-3]: /ai_gateway/security/#configure-data-capture
[inference_apis-4]: /getting_started/site/
[inference_apis-5]: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference
[inference_apis-6]: https://developers.openai.com/api/docs/guides/decisions
[inference_apis-7]: https://docs.baseten.co/reference/inference-api/system-one
[inference_apis-8]: https://app.datadoghq.com/llm/gateway
[inference_apis-9]: /ai_gateway/troubleshooting/#error-codes
[requests-1]: /account_management/personal-access-tokens/
[requests-2]: /account_management/service-access-tokens/
[requests-3]: /account_management/workload_identity_federation/
