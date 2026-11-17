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

## Native Gemini and decision APIs

Use a native API when your application needs its request and response format. AI Gateway accepts Gemini generateContent, OpenAI Decisions, and Baseten System One requests in addition to OpenAI Responses, Chat Completions, and Anthropic Messages.

OpenAI Decisions and Baseten System One are decision APIs: they evaluate an input against named questions and return a typed answer for each question.

### Before you begin

- Complete [AI Gateway setup][inference_apis-1] and configure a provider model that supports the operation you intend to call. Check the model's supported operations in its provider configuration.
- Have a Datadog personal access token or service access token whose principal and scope allow `ai_gateway_usage`.
- Confirm that an [access policy][inference_apis-2] allows the provider model or routing rule.
- Review [data capture][inference_apis-3] before sending sensitive content.

Use the hostname for your [Datadog site][inference_apis-4]. Replace the placeholders in these examples with values from your Gateway provider and model configuration. Load your Datadog token from your secret manager into `DD_AI_GATEWAY_TOKEN`.

### Choose an endpoint

The following paths start at the host `https://ai-gateway.{{< region-param key="dd_site" code="true" >}}`. They already include `/ai/v1`, so don't append them to the AI Gateway base URL:

| API | Gateway path | Model selection | Streaming |
|---|---|---|---|
| Gemini generateContent | `POST /ai/v1/publishers/<PROVIDER_SLUG>/models/<MODEL_ID>:generateContent` | Provider slug and model ID in the URL | Use `:streamGenerateContent` for streaming. |
| OpenAI Decisions | `POST /ai/v1/decisions` | `model` in the body | Non-streaming response. |
| System One | `POST /ai/v1/systemone` | `model` in the body | Non-streaming response. |

For Gemini, AI Gateway also accepts the `/ai/v1beta1/publishers/...` paths. Find your model in {{< ui >}}Model Catalog{{< /ui >}} and check its supported operations in the provider configuration before choosing an endpoint.

To use a routing rule with OpenAI Decisions or System One, set `model` to `router/<RULE_SLUG>`. For Gemini, use `/ai/v1/publishers/router/models/<RULE_SLUG>:generateContent` or its streaming variant. The rule's destinations must support the requested operation.

This guide covers the endpoints in the table. Native requests retain their provider-specific fields, such as tools and caching options. Follow the provider reference for the request schema and supported fields.

<!-- vale Datadog.headings = NO -->
### Call Gemini generateContent
<!-- vale Datadog.headings = YES -->

The URL's publisher segment is your **Gateway provider slug**, such as `production-vertex`. Use the canonical model ID from that provider's model configuration. Do not substitute the literal publisher name `google` unless it is also your Gateway provider slug.

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

AI Gateway requests server-sent events from the upstream provider; you don't need to add `?alt=sse` to the Gateway URL. See the [Gemini inference reference][inference_apis-5] for provider request fields.

<!-- vale Datadog.headings = NO -->
### Call OpenAI Decisions
<!-- vale Datadog.headings = YES -->

Use the Decisions API to evaluate shared input against typed questions. Select a model whose Gateway configuration supports OpenAI Decisions, and prefix its model ID with the Gateway provider slug:

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

Use System One with a configured Baseten or compatible custom endpoint that supports this operation. System One uses `state` and a map of named `questions`; it has a different payload from OpenAI Decisions.

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
5. Open the Gateway span. Check the served provider and model, token usage, errors, and captured content according to the effective data capture setting.

### Troubleshoot requests

For Gateway errors, inspect the `X-Ai-Gateway-Error-Code` response header. Provider validation errors can use different messages and response formats.

| Response or symptom | What to check |
|---|---|
| Gemini model or provider is not found | Use the Gateway provider slug in the publisher segment and the model ID belonging to that provider. |
| HTTP `400`, `unsupported_operation` | Check the configured model's supported operations and use the matching endpoint. |
| A decision payload is rejected | Match the endpoint's schema: OpenAI Decisions uses `input` and a question array; System One uses `state` and a question map. Read the provider's validation message for details. |
| System One HTTP `400`, `bad_request`, `invalid request body` | Send a valid JSON object with the System One request fields. |
| System One HTTP `400`, `bad_request`, `System One does not support streaming` | Remove `stream: true` and consume the non-streaming response. |
| Request is denied | Check token scope, model access, budgets, rate limits, and the [Gateway error code][inference_apis-9]. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[12]: /getting_started/site/

[inference_apis-1]: /ai_gateway/getting_started/
[inference_apis-2]: /ai_gateway/access_control/
[inference_apis-3]: /ai_gateway/security/#configure-data-capture
[inference_apis-4]: /getting_started/site/
[inference_apis-5]: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference
[inference_apis-6]: https://developers.openai.com/api/docs/guides/decisions
[inference_apis-7]: https://docs.baseten.co/reference/inference-api/system-one
[inference_apis-8]: https://app.datadoghq.com/llm/gateway
[inference_apis-9]: /ai_gateway/troubleshooting/#error-codes
