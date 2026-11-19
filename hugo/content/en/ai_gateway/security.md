---
title: Security and Data Capture in AI Gateway
description: Apply AI Guard policies to AI Gateway traffic and control recorded prompt and response content with data capture defaults and overrides.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Before you begin, review the [AI Gateway prerequisites](/ai_gateway/getting_started/#prerequisites).

<!-- vale Datadog.headings = NO -->
## Apply AI Guard policies
<!-- vale Datadog.headings = YES -->

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">AI Guard isn't available in the {{< region-param key="dd_site_name" >}} site.</div>
{{< /site-region >}}

Attach an [AI Guard policy][ai_guard-1] to AI Gateway to evaluate supported LLM traffic. Use **Monitor only** to observe policy decisions, then select **Block unsafe** to enforce them. The policy defines what AI Guard detects; the Gateway attachment defines which traffic it evaluates and how Gateway handles the result.

For Gateway traffic, the attachment's **AI Gateway Action** controls whether a `DENY` stops the request, independently of the policy's **Enforcement mode**. A **Monitor only** attachment allows the request to continue even when the policy is set to **Block unsafe**. A **Block unsafe** attachment blocks a `DENY` even when the policy is set to **Monitor only**.

Start with an attachment on a test routing rule before applying a policy across the organization.

### Prerequisites

- Complete the [AI Gateway prerequisites][ai_guard-2] and configure an accessible model or routing rule.
- To manage attachments, have the `ai_gateway_config_read` and `ai_gateway_config_write` permissions.
- To select a policy, have **AI Guard View** (`ai_guard_view`). To create or edit a policy, also have **AI Guard Write** (`ai_guard_write`). See [AI Guard permissions][ai_guard-3].
- The **same credential used to call AI Gateway** must allow both **AI Gateway Usage** (`ai_gateway_usage`) and **AI Guard Evaluate** (`ai_guard_evaluate`). Both the calling user or service account and the credential scope must permit these actions. An administrator's permissions do not grant evaluation access to an application's credential.

### Choose the attachment scope

| Target | Traffic evaluated |
|---|---|
| **Everything** | All Gateway requests without a route-specific attachment. This is the organization default. |
| **Route** | Requests sent to the selected routing rule, such as `router/support-assistant`. |

A route-specific attachment replaces the organization default for that route. The policies do not accumulate. The routing rule originally requested by the caller determines the attachment. This selection also applies to nested routing rules and fallback destinations.

### Attach a policy

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}AI Guard{{< /ui >}}][ai_guard-4] and click {{< ui >}}Attach AI Guard policy{{< /ui >}}.
2. Under {{< ui >}}Target{{< /ui >}}, select {{< ui >}}Everything{{< /ui >}}, or select {{< ui >}}Route{{< /ui >}} and choose a routing rule.
3. Select an {{< ui >}}Existing policy{{< /ui >}}. To create a policy:
   1. Enter a {{< ui >}}New policy name{{< /ui >}}. Gateway policy names use the `datadog-ai-gateway.` prefix.
   2. Click {{< ui >}}Create in AI Guard{{< /ui >}} to open the policy editor.
   3. Configure and save the policy. For detection settings, see [Configure AI Guard policies][ai_guard-1].
   4. Return to the attachment form, click {{< ui >}}Refresh policy list{{< /ui >}}, and select the saved policy.
4. Under {{< ui >}}AI Gateway Action{{< /ui >}}, explicitly select {{< ui >}}Monitor only{{< /ui >}} or {{< ui >}}Block unsafe{{< /ui >}}. The form defaults to {{< ui >}}Block unsafe{{< /ui >}}.
5. Click {{< ui >}}Attach policy{{< /ui >}}. Review the saved target, policy, and action, then follow the steps in the [Verify the attachment](#verify-the-attachment) section.

To update an attachment, open it, change its settings, and click {{< ui >}}Save changes{{< /ui >}}. Allow configuration changes to propagate before checking fresh requests.

### Choose an action

| Action | Behavior |
|---|---|
| **Monitor only** | Evaluates supported prompt content asynchronously. Policy denials and sensitive-data findings do not block the model request. Responses are not evaluated. |
| **Block unsafe** | Evaluates supported prompt content before calling the model. Policy denials block the request. Also evaluates successful, buffered Chat Completions output before returning it. |

For an attachment created in the AI Gateway UI, **Block unsafe** also blocks sensitive-data findings. It refuses requests when an evaluator timeout, network error, or server error prevents evaluation. **Monitor only** allows these findings and evaluator availability failures to pass through.

Existing attachments can have different saved sensitive-data or evaluator-error settings. Editing an attachment without changing its action preserves those settings. Changing its action applies the behavior described above.

In **Block unsafe**, other failures can also prevent requests from completing. These include evaluation permission errors, unsupported content, invalid results, oversized evaluation payloads, and evaluator rate limits. A failed evaluation is different from a policy denial. See the [Troubleshooting](#troubleshooting) section.

### Evaluation coverage

| Request API | Prompt evaluation | Response evaluation |
|---|---|---|
| OpenAI Chat Completions | Supported plain-text conversation content for buffered and streaming requests. | Successful buffered output in **Block unsafe**. |
| OpenAI Responses | Supported explicit plain-text input and instructions for buffered and streaming requests. | Not evaluated. |
| Anthropic Messages | Supported text input for buffered and streaming requests. | Not evaluated. |
| Native Gemini | Prompt evaluation support is coming soon. | Not evaluated. |

Streamed output is not evaluated. Tool definitions, tool calls, and tool results are outside the Gateway AI Guard evaluation path. Support is coming soon. A request containing only tool content can skip evaluation because it has no supported text. Unsupported media, such as images or audio, can cause a refusal in **Block unsafe**.

A successful model response alone does not prove that AI Guard evaluated the request. Check the matching Gateway span for a completed evaluation.

#### Sensitive data scanning

Configure [sensitive data scanning][ai_guard-5] in the AI Guard policy. For an attachment created in the AI Gateway UI, **Monitor only** records findings without blocking, and **Block unsafe** blocks sensitive-data findings.

This Gateway integration does not redact content. An allowed request is not a redacted request. AI Guard [sensitive data redaction][ai_guard-9] supports direct SDK calls and the HTTP API. Gateway does not apply those redactions to the content it forwards.

#### Data capture and evaluation

[Gateway data capture][ai_guard-6] controls the prompt and response content recorded in Agent Observability. **Metadata only** does not disable AI Guard: Gateway still sends supported content to AI Guard for evaluation. Choose the capture setting and the AI Guard action separately.

### Verify the attachment

Use synthetic content and an isolated routing rule. Avoid changing an organization-wide attachment to test enforcement.

1. Create a dedicated AI Guard policy. Add a [custom rule][ai_guard-7] that denies a harmless test keyword such as `gatewayguardtest` in the last evaluated message.
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

4. Confirm the request succeeds. In [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Overview{{< /ui >}}][ai_guard-8], follow the request into Agent Observability and check that prompt evaluation completed with an `ALLOW` decision.
5. Change the last message to `Reply briefly to gatewayguardtest.` and repeat the request. Confirm that the model request continues and prompt evaluation completes with `DENY`. A skipped or failed evaluation does not verify monitoring.
6. Change the attachment action to **Block unsafe**, save, and repeat the keyword request. For this Chat Completions request, expect HTTP `422` and `guardrail_violation` in both the `X-Ai-Gateway-Error-Code` header and the response's `error.code`. Confirm a completed prompt denial in the matching span.
7. Repeat the harmless request and confirm it still succeeds. This distinguishes selective enforcement from a credential, model-access, or evaluator failure.
8. Remove the temporary rule and restore the test attachment's original configuration.

Match the route, caller, and timestamp when reviewing evaluation evidence. For streaming, Responses, and Anthropic traffic, verify prompt coverage separately; this procedure does not prove output evaluation for those request types.

### Troubleshooting

| Symptom | Check |
|---|---|
| The policy is missing from the selector. | Confirm **AI Guard View**, check the `datadog-ai-gateway.` policy-name prefix, and refresh the policy list after saving in AI Guard. |
| Evaluation fails for an application's credential. | Confirm that both the principal and credential scope permit `ai_gateway_usage` and `ai_guard_evaluate`. |
| A request succeeds without an evaluation. | Check the requested route's effective attachment, supported API and content, and whether the evaluation completed asynchronously. No attachment means no Gateway AI Guard evaluation. |
| `guardrail_violation` | AI Guard denied evaluated content, or a sensitive-data finding triggered blocking. Inspect the evaluation decision. |
| `guardrail_unavailable` | Gateway could not complete a required evaluation. Check permission, payload, supported content, and evaluator availability. This code does not mean that unsafe content was detected. |
| A monitoring request is refused. | Check for errors resolving the attachment or policy. **Monitor only** allows findings from an evaluated policy; it does not bypass configuration errors or other Gateway controls. |

For Gateway AI Guard refusals, OpenAI-compatible requests return HTTP `422`; native Anthropic requests return HTTP `400`. Inspect `X-Ai-Gateway-Error-Code` to distinguish a policy violation from an unavailable evaluation.

## Configure data capture

AI Gateway records supported inference requests in Agent Observability. Requests rejected before processing, such as authentication failures or malformed request bodies, might not appear there. The data capture mode controls whether a span includes prompt and response content.

There are two capture modes. **Metadata only** can optionally add *capture items*, which are the only extra detail it records. Each item is either *structure* (the shape of the conversation, such as which tools were called and the role of each message) or *counts* (numbers, such as how many tool calls happened or how large the tool results were). No item records conversation text.

| Mode | What is recorded |
|---|---|
| Metadata only (default) | Request and response metadata, such as the model, provider, status, latency, token usage, and cost. No prompt or response content. Optional capture items add structure and counts. |
| Full capture | Everything in Metadata only, plus prompt, response, reasoning, and tool content (tool arguments and results). All capture items apply. |

When a request has no capture setting, or AI Gateway can't read the configuration, the request uses Metadata only with no capture items.

### Capture items

Capture items apply only under Metadata only. An item can require other items, because it already reveals what those items record. When you select an item in the UI, AI Gateway also selects what it requires, and clearing an item clears the items that depend on it. The API rejects a set that breaks a dependency.

| Item | Kind | What it adds to the span | Requires |
|---|---|---|---|
| Tool usage counts (`tool_usage`) | Counts | The `tool_call_count` and `tool_result_count` metrics. | None |
| Tool output size (`tool_output_size`) | Counts | The `tool_output_estimated_tokens` and `tool_output_avg_estimated_tokens` metrics, and `tool_output_tokens` on each tool span. | Tool usage counts |
| Tool names (`tool_names`) | Structure | Each tool call and result, with its tool name, ID, and type. No arguments or result text. | Tool usage counts |
| Conversation shape (`conversation_shape`) | Structure | Every message with its role, and no text. | Tool usage counts |
| Input size by role (`input_size_by_role`) | Counts | An `input_estimated_tokens_<ROLE>` metric for each role, such as `system`, `user`, `assistant`, and `tool`. | Tool output size |
| Available tools (`available_tools`) | Structure | The names of the tools the request offered. No descriptions or schemas. | None |
| Generation settings (`generation_settings`) | Counts and structure | Numeric and enumerated settings, such as temperature, max tokens, top p, reasoning effort, and the finish reason. | None |

The following never reach a span under Metadata only, whichever items you select:

- Message, system prompt, and reasoning text
- Tool arguments and tool result text
- Tool descriptions and schemas
- Message IDs, and role names that a caller defined
- Parameters that can carry text, such as stop sequences, response schemas, tool choice, and logit bias

AI Gateway keeps a tool name, ID, or type only if it looks like an identifier (up to 128 letters, digits, and `_.:/-`). It keeps an enumerated request setting only if it is a value a provider defines.

Token counts for these items are estimates at 4 bytes per token, not tokenizer counts, and they don't replace the provider's usage and cost metrics. Tool calls are counted in the response. Tool results are counted since the model's previous turn, so summing a trace counts each result once. If AI Gateway can't decode a request or response, it reports no counts for that side instead of zeros.

AI Gateway also writes the item metrics to span metadata as `capture.<METRIC>`, for example `@meta.metadata.capture.tool_call_count`. The span's `capture.mode` and `capture.metadata` fields record the mode and the items that applied.

### What appears in Agent Observability spans

| Span detail | Metadata only | Metadata only with items | Full capture |
|---|---|---|---|
| Model, provider, status, latency | {{< X >}} | {{< X >}} | {{< X >}} |
| Token usage and cost | {{< X >}} | {{< X >}} | {{< X >}} |
| Tool call and result counts | | Tool usage counts | {{< X >}} |
| Tool output size | | Tool output size | {{< X >}} |
| Tool names and IDs | | Tool names | {{< X >}} |
| Message roles without text | | Conversation shape | {{< X >}} |
| Input size by role | | Input size by role | {{< X >}} |
| Names of available tools | | Available tools | {{< X >}} |
| Generation settings | | Generation settings | {{< X >}} |
| Prompt, response, and reasoning text | | | {{< X >}} |
| Tool arguments and results | | | {{< X >}} |

### Set the organization default and overrides

Set the organization default mode and items in {{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Org defaults{{< /ui >}}. To select Metadata only items, select {{< ui >}}Metadata only{{< /ui >}} and open {{< ui >}}Customize{{< /ui >}}.

To apply a different mode or different items to selected requests, create an override under {{< ui >}}Policies{{< /ui >}} > {{< ui >}}Data capture{{< /ui >}}. An override has a name, request filters, a mode, and, under Metadata only, its own items. An override does not inherit the organization default's items: an override set to Metadata only with no items records no items, even if the organization default selects some.

An override can match a user, team, model, provider, or custom tag. Every filter in an override must match, and each filter takes one value. To match alternatives, create separate overrides. Custom tags match the exact `x-dd-tag-<KEY>` header value. Model and provider filters match the actual destination, including destinations reached through routing rules and fallbacks.

A team capture override requires the `x-ai-gateway-team: <TEAM_SLUG>` header to select that team. Unlike team budgets and rate limits, a team capture override does not match a request based on team membership alone.

#### Precedence

1. If no override matches, the organization default mode and items apply.
2. If any matching override is Metadata only, the request uses Metadata only, even if the organization default or another matching override is Full capture.
3. Under Metadata only, an item applies only if every matching Metadata only override selects it. Full capture overrides don't narrow the items.
4. If every matching override is Full capture, the request uses Full capture.

Enabling Full capture, or a change that can expand Full capture to more traffic, asks you to confirm the change. Changing only Metadata only items never needs confirmation.

#### Example

An organization defaults to Metadata only with {{< ui >}}Tool usage counts{{< /ui >}}. A platform team wants full content for its own debugging, but wants one regulated customer's traffic to stay redacted. Create the following overrides:

| Override | Filters | Mode | Items |
|---|---|---|---|
| `platform-debug` | Team: `platform` | Full capture | None |
| `regulated` | Custom tag: `customer=acme` | Metadata only | Tool usage counts, Tool output size |

| Request | Mode and items |
|---|---|
| From another team with no tag | Metadata only, Tool usage counts (organization default) |
| Team `platform`, no tag | Full capture (`platform-debug`) |
| Team `platform`, tag `customer=acme` | Metadata only, Tool usage counts and Tool output size. Both overrides match, and the Metadata only override wins. Full capture overrides don't narrow items. |
| Other team, tag `customer=acme` | Metadata only, Tool usage counts and Tool output size (`regulated`) |

Send the `x-ai-gateway-team: platform` header to match the team filter, and `x-dd-tag-customer: acme` to match the tag.

Before you send sensitive prompts or responses, check the mode that applies to the request:

1. Review the organization default and any matching capture overrides.
2. Send a harmless test request with the same caller, team selection, custom tags, and model or routing rule as the workload.
3. Open the request's Gateway span and review the recorded fields.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[ai_guard-1]: /security/ai_guard/policies/
[ai_guard-2]: /ai_gateway/getting_started/#prerequisites
[ai_guard-3]: /security/ai_guard/setup/#permissions
[ai_guard-4]: https://app.datadoghq.com/llm/gateway/guardrails
[ai_guard-5]: /security/ai_guard/policies/#sensitive-data-scanning
[ai_guard-6]: /ai_gateway/security/#configure-data-capture
[ai_guard-7]: /security/ai_guard/policies/#custom-rules
[ai_guard-8]: https://app.datadoghq.com/llm/gateway
[ai_guard-9]: /security/ai_guard/sensitive_data_redaction/
