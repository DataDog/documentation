---
title: Use native Gemini and decision APIs with AI Gateway
description: Send native Gemini, OpenAI Decisions, and System One requests through Datadog AI Gateway with the operation supported by your provider model.
further_reading:
  - link: "/llm_observability/configure/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

Use a native API when your application needs its request and response format. AI Gateway accepts Gemini generateContent, OpenAI Decisions, and System One requests in addition to OpenAI Responses, Chat Completions, and Anthropic Messages.

## Before you begin

- Complete [AI Gateway setup][1] and configure a provider model that supports the operation you intend to call.
- Have a Datadog personal access token or service access token whose principal and scope allow `ai_gateway_usage`.
- Confirm that an [access policy][2] allows the provider model or routing rule.
- Review [data capture][3] before sending sensitive content. Native API support does not imply that every field or feature in the provider's API is supported.

Use the hostname for your [Datadog site][4]. Replace the placeholders in these examples with values from your Gateway provider and model configuration. Load your Datadog token from your secret manager into `DD_AI_GATEWAY_TOKEN`.

## Choose an endpoint

These paths include the `/ai` prefix:

| API | Gateway path | Model selection | Streaming |
|---|---|---|---|
| Gemini generateContent | `POST /ai/v1/publishers/<PROVIDER_SLUG>/models/<MODEL_ID>:generateContent` | Provider slug and model ID in the URL | Use `:streamGenerateContent` for streaming. |
| OpenAI Decisions | `POST /ai/v1/decisions` | `model` in the body | Non-streaming response. |
| System One | `POST /ai/v1/systemone` | `model` in the body | Non-streaming response. |

For Gemini, AI Gateway also accepts the `/ai/v1beta1/publishers/...` paths. Use the operation supported by the configured provider model. A catalog listing alone does not establish support for an inference operation.

<!-- vale Datadog.headings = NO -->
## Call Gemini generateContent
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

For streaming, replace `:generateContent` with `:streamGenerateContent` and use a client that consumes streaming responses. See the [Gemini inference reference][5] for provider request fields.

<!-- vale Datadog.headings = NO -->
## Call OpenAI Decisions
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

Read the corresponding answer in the response's `answers` array. The question's `name` identifies its answer. See the [OpenAI Decisions guide][6] for question types and accepted input.

<!-- vale Datadog.headings = NO -->
## Call System One
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

Do not set `stream: true`. AI Gateway rejects streaming System One requests. For a compatible custom endpoint, configure the provider's base URL so its `/systemone` path reaches the upstream operation.

AI Gateway preserves the native response format and uses reported token usage for accounting. It does not translate System One requests into OpenAI Decisions requests or the reverse. See the [System One reference][7] for upstream payload details.

## Verify a request

1. Send a harmless request with the operation your model supports.
2. Confirm that the response uses the expected native format.
3. Open [AI Gateway Overview][8], select the time range, and follow the request into Agent Observability.
4. Check the served provider and model, token usage, errors, and captured content according to the effective data capture setting.

If you use a routing rule with a body-based API, use `router/<RULE_SLUG>` as the `model` value and confirm that its destinations support that operation. Do not assume that a routing rule configured for chat also supports a decision API.

## Troubleshoot requests

| Symptom | Check |
|---|---|
| Gemini model or provider is not found | Use the Gateway provider slug in the publisher segment and the model ID belonging to that provider. |
| Operation is unsupported | Check the configured model's operations and use the matching endpoint. |
| A decision payload is rejected | Match the endpoint's schema: OpenAI Decisions uses `input` and a question array; System One uses `state` and a question map. |
| System One streaming is rejected | Remove `stream: true` and consume the non-streaming response. |
| Request is denied | Check token scope, model access, budgets, rate limits, and the [Gateway error code][9]. |

[1]: /llm_observability/configure/ai_gateway/#get-started
[2]: /llm_observability/configure/ai_gateway/#control-model-access
[3]: /llm_observability/configure/ai_gateway/#configure-data-capture
[4]: /getting_started/site/
[5]: https://cloud.google.com/vertex-ai/generative-ai/docs/model-reference/inference
[6]: https://developers.openai.com/api/docs/guides/decisions
[7]: https://docs.baseten.co/reference/inference-api/system-one
[8]: https://app.datadoghq.com/llm/gateway
[9]: /llm_observability/configure/ai_gateway/#error-codes
