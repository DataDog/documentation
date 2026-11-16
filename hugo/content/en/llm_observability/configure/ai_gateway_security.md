---
title: Secure LLM Traffic with AI Gateway
description: Attach AI Guard policies to AI Gateway to monitor supported prompts and responses, block unsafe content, and detect sensitive data.
further_reading:
  - link: "/llm_observability/configure/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
  - link: "/security/ai_guard/policies/"
    tag: "Documentation"
    text: "Configure AI Guard policies"
---

## Overview

Attach an [AI Guard policy][1] to AI Gateway to evaluate supported LLM traffic. Use **Monitor only** to observe policy decisions, then select **Block unsafe** to enforce them. The policy defines what AI Guard detects; the Gateway attachment defines which traffic it evaluates and how Gateway handles the result.

Start with an attachment on a test routing rule before applying a policy across the organization.

## Prerequisites

- Complete the [AI Gateway prerequisites][2] and configure an accessible model or routing rule.
- To manage attachments, have the `ai_gateway_config_read` and `ai_gateway_config_write` permissions.
- To select a policy, have **AI Guard View** (`ai_guard_view`). To create or edit a policy, also have **AI Guard Write** (`ai_guard_write`). See [AI Guard permissions][3].
- The **same credential used to call AI Gateway** must allow both **AI Gateway Usage** (`ai_gateway_usage`) and **AI Guard Evaluate** (`ai_guard_evaluate`). Both the calling user or service account and the credential scope must permit these actions. An administrator's permissions do not grant evaluation access to an application's credential.

## Choose the attachment scope

| Target | Traffic evaluated |
|---|---|
| **Everything** | All Gateway requests without a route-specific attachment. This is the organization default. |
| **Route** | Requests sent to the selected routing rule, such as `router/support-assistant`. |

A route-specific attachment replaces the organization default for that route. The policies do not accumulate. The routing rule originally requested by the caller determines the attachment. This selection also applies to nested routing rules and fallback destinations.

## Attach a policy

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}}][4] and click {{< ui >}}Attach AI Guard policy{{< /ui >}}.
2. Under {{< ui >}}Target{{< /ui >}}, select {{< ui >}}Everything{{< /ui >}}, or select {{< ui >}}Route{{< /ui >}} and choose a routing rule.
3. Select an {{< ui >}}Existing policy{{< /ui >}}. To create a policy:
   1. Enter a {{< ui >}}New policy name{{< /ui >}}. Gateway policy names use the `datadog-ai-gateway.` prefix.
   2. Click {{< ui >}}Create in AI Guard{{< /ui >}} to open the policy editor.
   3. Configure and save the policy. For detection settings, see [Configure AI Guard policies][1].
   4. Return to the attachment form, click {{< ui >}}Refresh policy list{{< /ui >}}, and select the saved policy.
4. Under {{< ui >}}AI Gateway Action{{< /ui >}}, explicitly select {{< ui >}}Monitor only{{< /ui >}} or {{< ui >}}Block unsafe{{< /ui >}}. The form defaults to {{< ui >}}Block unsafe{{< /ui >}}.
5. Click {{< ui >}}Attach policy{{< /ui >}}. Review the saved target, policy, and action, then [verify the attachment](#verify-the-attachment) with test traffic.

To update an attachment, open it, change its settings, and click {{< ui >}}Save changes{{< /ui >}}. Allow configuration changes to propagate before checking fresh requests.

## Choose an action

| Action | Behavior |
|---|---|
| **Monitor only** | Evaluates supported prompt content asynchronously. Policy denials and sensitive-data findings do not block the model request. Responses are not evaluated. |
| **Block unsafe** | Evaluates supported prompt content before calling the model. Policy denials block the request. Also evaluates successful, buffered Chat Completions output before returning it. |

For a new UI attachment, **Block unsafe** also blocks sensitive-data findings. It refuses requests when an evaluator timeout, network error, or server error prevents evaluation. **Monitor only** allows these findings and evaluator availability failures to pass through.

Existing attachments can have different saved sensitive-data or evaluator-error settings. Editing an attachment without changing its action preserves those settings. Changing its action applies the behavior described above.

In **Block unsafe**, other failures can also prevent requests from completing. These include evaluation permission errors, unsupported content, invalid results, oversized evaluation payloads, and evaluator rate limits. A failed evaluation is different from a policy denial. See [Troubleshooting](#troubleshooting).

## Evaluation coverage

| Request API | Prompt evaluation | Response evaluation |
|---|---|---|
| OpenAI Chat Completions | Supported plain-text conversation content for buffered and streaming requests. | Successful buffered output in **Block unsafe**. |
| OpenAI Responses | Supported explicit plain-text input and instructions for buffered and streaming requests. | Not evaluated. |
| Anthropic Messages | Supported text input for buffered and streaming requests. | Not evaluated. |
| Native Gemini | Not supported by the Gateway AI Guard integration. | Not evaluated. |

Streamed output is not evaluated. Tool definitions, tool calls, and tool results are outside the Gateway AI Guard evaluation path. A request containing only tool content can skip evaluation because it has no supported text. Unsupported media, such as images or audio, can cause a refusal in **Block unsafe**.

A successful model response alone does not prove that AI Guard evaluated the request. Check the matching Gateway span for a completed evaluation.

### Sensitive data scanning

Configure [Sensitive Data Scanning][5] in the AI Guard policy. With a new UI attachment, **Monitor only** records findings without blocking, and **Block unsafe** blocks sensitive-data findings.

This Gateway integration does not redact content. An allowed request is not a redacted request. The broader AI Guard SDK and API capabilities do not establish Gateway coverage.

### Data capture and evaluation

[Gateway data capture][6] controls the prompt and response content recorded in Agent Observability. **Metadata only** does not disable AI Guard: Gateway still sends supported content to AI Guard for evaluation. Choose the capture setting and the AI Guard action separately.

## Verify the attachment

Use synthetic content and an isolated routing rule. Avoid changing an organization-wide attachment to test enforcement.

1. Create a dedicated AI Guard policy. Add a [custom rule][7] that denies a harmless test keyword such as `gatewayguardtest` in the last evaluated message.
2. Attach the policy to the test route with **Monitor only** explicitly selected.
3. Send a buffered Chat Completions request to the test route using the application's credential:

   ```shell
   curl -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/ai/v1/chat/completions" \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <DATADOG_ACCESS_TOKEN>" \
     -d '{
       "model": "router/<TEST_ROUTE_SLUG>",
       "stream": false,
       "messages": [{"role": "user", "content": "Reply with hello."}]
     }'
   ```

4. Confirm the request succeeds. In [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Overview{{< /ui >}}][8], follow the request into Agent Observability and check that prompt evaluation completed with an `ALLOW` decision.
5. Change the last message to `Reply briefly to gatewayguardtest.` and repeat the request. Confirm that the model request continues and prompt evaluation completes with `DENY`. A skipped or failed evaluation does not verify monitoring.
6. Change the attachment action to **Block unsafe**, save, and repeat the keyword request. For this Chat Completions request, expect HTTP `422` and `guardrail_violation` in both the `X-Ai-Gateway-Error-Code` header and the response's `error.code`. Confirm a completed prompt denial in the matching span.
7. Repeat the harmless request and confirm it still succeeds. This distinguishes selective enforcement from a credential, model-access, or evaluator failure.
8. Remove the temporary rule and restore the test attachment's original configuration.

Match the route, caller, and timestamp when reviewing evaluation evidence. For streaming, Responses, and Anthropic traffic, verify prompt coverage separately; this procedure does not prove output evaluation for those request types.

## Troubleshooting

| Symptom | Check |
|---|---|
| The policy is missing from the selector. | Confirm **AI Guard View**, check the `datadog-ai-gateway.` policy-name prefix, and refresh the policy list after saving in AI Guard. |
| Evaluation fails for an application's credential. | Confirm that both the principal and credential scope permit `ai_gateway_usage` and `ai_guard_evaluate`. |
| A request succeeds without an evaluation. | Check the requested route's effective attachment, supported API and content, and whether the evaluation completed asynchronously. No attachment means no Gateway AI Guard evaluation. |
| `guardrail_violation` | AI Guard denied evaluated content, or a sensitive-data finding triggered blocking. Inspect the evaluation decision. |
| `guardrail_unavailable` | Gateway could not complete a required evaluation. Check permission, payload, supported content, and evaluator availability. This code does not mean that unsafe content was detected. |
| A monitoring request is refused. | Check for errors resolving the attachment or policy. **Monitor only** allows findings from an evaluated policy; it does not bypass configuration errors or other Gateway controls. |

For Gateway AI Guard refusals, OpenAI-compatible requests return HTTP `422`; native Anthropic requests return HTTP `400`. Inspect `X-Ai-Gateway-Error-Code` to distinguish a policy violation from an unavailable evaluation.

[1]: /security/ai_guard/policies/
[2]: /llm_observability/configure/ai_gateway/#prerequisites
[3]: /security/ai_guard/setup/#permissions
[4]: https://app.datadoghq.com/llm/gateway/guardrails
[5]: /security/ai_guard/policies/#sensitive-data-scanning
[6]: /llm_observability/configure/ai_gateway/#configure-data-capture
[7]: /security/ai_guard/policies/#custom-rules
[8]: https://app.datadoghq.com/llm/gateway
