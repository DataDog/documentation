---
title: Security and Data Capture in AI Gateway
description: Control whether AI Gateway spans include prompt and response content using data capture defaults and scoped overrides.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
  - link: "/llm_observability/data_governance/access_control/"
    tag: "Documentation"
    text: "Data Access Control in Agent Observability"
---

{{< callout url="https://www.datadoghq.com/product-preview/ai-gateway/" btn_hidden="false" header="Join the Preview!" >}}
AI Gateway is in Preview. Request access or contact your Customer Success Manager.
{{< /callout >}}

Before you begin, review the [AI Gateway prerequisites](/ai_gateway/getting_started/#prerequisites).

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

### Restrict who can view captured content

Data capture controls what AI Gateway records. It does not control who can read it: anyone in your organization who can view Agent Observability traces can open a Gateway span and read the prompts and responses it captured.

To keep Full capture for a workload and limit who can read its spans, place those spans in a [Restricted Dataset](/llm_observability/data_governance/access_control/) with Data Access Control. Capture keeps working, and users outside the teams or roles you grant can't see the spans.

A Restricted Dataset selects spans by a tag. Choose the tag that marks the workload:

| Boundary | How the workload sets it | Notes |
|---|---|---|
| Application name (`ml_app`) | Send `x-dd-tag-ml_app: <APPLICATION_NAME>` with each request. See [Attribute requests to an application](/ai_gateway/applications/#attribute-requests-to-an-application). | Recommended. Without the header, Gateway spans use `datadog-ai-gateway`, or the calling application's name when the caller propagates Agent Observability trace context. An `ml_app` filter is also the only one that restricts the application's evaluator configurations and managed prompts. |
| Another span tag | Send `x-dd-tag-<KEY>: <VALUE>`, for example `x-dd-tag-data_scope: restricted`. | Restricts traces only. Data Access Control uses one tag key for each telemetry type, so this works only if all of your organization's Agent Observability datasets use that key. If any already use `ml_app`, use the application name instead. |

To set up the restriction:

1. Choose the tag and value, and send the header from every request in the workload. Use lowercase letters, digits, hyphens, and underscores in the value.
2. Create the Restricted Dataset in [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Data Access Control{{< /ui >}}](https://app.datadoghq.com/organization-settings/data-access-controls). Select Agent Observability as the product, enter the tag and value, and grant access to the teams or roles that need to read the spans. Creating a Restricted Dataset requires the Datadog Admin role or the `user_access_manage` permission. If you don't have either, send your organization's administrator the tag, its value, and the teams or roles to grant.
3. Send a test request, then confirm with a user outside the granted teams and roles that the span is not visible. A Restricted Dataset whose filter matches no spans restricts nothing and shows no warning.

Access is granted to teams and roles, not to individual users. To limit access to one person, grant a team that has only that member and does not allow anyone in the organization to join.

Keep the following in mind:

- **Only tagged requests are restricted.** A request that omits the header is recorded under the default application and stays visible to everyone who can view traces. To avoid recording content outside the boundary, keep the organization default at Metadata only and create a Full capture override for the same user, team, or custom tag as the restricted workload.
- **Other products need their own restriction.** If the calling application also sends the same prompts and responses to APM traces or custom metrics, for example through OpenTelemetry, create Restricted Datasets with matching boundaries for those products. See [Data Access Control](/account_management/rbac/data_access/#agent-observability).
- **Monitors read all data.** A monitor evaluates with full access to data, so review who can create monitors on Agent Observability data.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
