---
title: Observe MCP Tool Activity
description: Review MCP Gateway tool calls, errors, and latency, then inspect individual calls in Agent Observability and Audit Trail.
further_reading:
  - link: "/ai_gateway/mcp_gateway/"
    tag: "Documentation"
    text: "MCP Gateway"
  - link: "/llm_observability/"
    tag: "Documentation"
    text: "Agent Observability"
  - link: "/account_management/audit_trail/"
    tag: "Documentation"
    text: "Audit Trail"
---

{{< callout url="#" btn_hidden="true" header="false" >}}
MCP Gateway is in Preview.
{{< /callout >}}

MCP Gateway records the tool calls in your organization in two places:

- A span in Agent Observability, with the tool, server, caller, duration, and outcome
- An event in [Audit Trail][1], attributed to the user who made the call

The MCP Gateway {{< ui >}}Overview{{< /ui >}} page charts the spans. MCP Gateway never records a tool call's arguments or results.

## Before you begin

- You need the `mcp_gateway_config_read` permission to open the {{< ui >}}Overview{{< /ui >}} page. See the [MCP Gateway prerequisites][5].
- Tool calls appear after users [call tools][6] through MCP Gateway.

## Review the Overview page

Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}MCP Gateway{{< /ui >}} > {{< ui >}}Overview{{< /ui >}}][2] and set the date range in the page header. The date range defaults to the past week and is the page's only filter.

<!-- vale Datadog.words_case_insensitive = NO -->

Five cards summarize the selected period and compare it with the period of the same length before it:

| Card | Description |
|---|---|
| {{< ui >}}Tool calls{{< /ui >}} | The number of tool calls, including failed and refused calls. |
| {{< ui >}}Error rate{{< /ui >}} | The percentage of tool calls whose outcome is not `ok`. See the [Tool call outcomes](#tool-call-outcomes) section. |
| {{< ui >}}p95 latency{{< /ui >}} | The 95th percentile of tool call duration, as measured by MCP Gateway. |
| {{< ui >}}Active users{{< /ui >}} | The number of distinct users who called a tool. |
| {{< ui >}}Servers used{{< /ui >}} | The number of distinct servers that tool calls reached. |

The charts after the cards are grouped into three sections:

| Section | Chart | Description |
|---|---|---|
| {{< ui >}}Usage{{< /ui >}} | {{< ui >}}Tool calls over time{{< /ui >}} | Tool calls grouped by {{< ui >}}Server{{< /ui >}}, {{< ui >}}Tool{{< /ui >}}, or {{< ui >}}User{{< /ui >}} |
| {{< ui >}}Usage{{< /ui >}} | {{< ui >}}Top tools by calls{{< /ui >}} and {{< ui >}}Top users by calls{{< /ui >}} | The 10 most-called tools and the 10 users with the most calls |
| {{< ui >}}Errors{{< /ui >}} | {{< ui >}}Errors over time by type{{< /ui >}} | Failed calls grouped by outcome |
| {{< ui >}}Errors{{< /ui >}} | {{< ui >}}Error rate by server{{< /ui >}} | The percentage of each server's calls that failed |
| {{< ui >}}Latency{{< /ui >}} | {{< ui >}}Latency over time{{< /ui >}} | Average, p75, p90, and p95 tool call duration |
| {{< ui >}}Latency{{< /ui >}} | {{< ui >}}Latency by tool{{< /ui >}} | The 10 tools with the highest average duration |

<!-- vale Datadog.words_case_insensitive = YES -->

To investigate, click a chart series, a ranking row, or a table row. The Agent Observability {{< ui >}}Traces{{< /ui >}} page opens in a new tab, filtered to MCP Gateway tool calls for that selection.

### Interpret the Overview

- **Error rate**: The error rate counts every outcome except `ok`, so it is not a server health metric. It includes calls refused by server access or a policy, calls to unknown tools, calls with arguments the server rejected, and calls where the tool reported its own failure. To review server health, check the `upstream_error` and `timeout` series in {{< ui >}}Errors over time by type{{< /ui >}}.
- **Charts by server**: Calls that did not reach a server are left out. Refused calls and calls to unknown tools are not attributed to a server. {{< ui >}}Servers used{{< /ui >}}, {{< ui >}}Error rate by server{{< /ui >}}, and the {{< ui >}}Server{{< /ui >}} grouping exclude them, so the totals by server can be lower than {{< ui >}}Tool calls{{< /ui >}}.
- **Rankings**: The rankings are not weighted by volume. In {{< ui >}}Error rate by server{{< /ui >}}, a server with one call that failed ranks at 100%. {{< ui >}}Latency by tool{{< /ui >}} ranks by average duration, not by number of calls.
- **Latency**: The percentiles include calls that ended early. Refused calls and calls to unknown tools take little time and lower the percentiles.
- **Search mode**: Lookups are not counted as tool calls. This applies to `tool_search`, `list_tools`, and `get_tool_definition`. See the [Search mode][7] section of Call Tools Through MCP Gateway. A tool called through `execute_tool` is counted under the tool's own name.

## Find tool calls in Agent Observability

MCP Gateway writes one span of kind `tool` for each tool call, including calls it refuses. To find them, open [Agent Observability traces][3], select the view that shows all spans, and search for the MCP Gateway tag:

```text
dd.mcp_gateway_frntr:true
```

Add tags to narrow the search, for example `mcp_tool:<SERVER_SLUG>__<TOOL_NAME>` or `gateway_outcome:policy_denied`.

Each span is named for the tool, in the form `<SERVER_SLUG>__<TOOL_NAME>`. By default, spans appear under the `datadog-mcp-gateway` application. Spans are sent asynchronously and on a best-effort basis: a call can take some time to appear, and a span can be missing when MCP Gateway is under heavy load. When you need a record of each call, use Audit Trail, described in the [Review tool calls in Audit Trail](#review-tool-calls-in-audit-trail) section.

| Tag | Description |
|---|---|
| `mcp_tool` | The tool name in the form `<SERVER_SLUG>__<TOOL_NAME>`. This form is used even when the client connected to one server and called the tool by its own name. |
| `mcp_server_namespace` | The slug of the server that the call reached. Absent when the call did not reach a server. |
| `mcp_server_id` | The ID of the server that the call reached. Absent when the call did not reach a server. |
| `gateway_outcome` | How the call ended. See the [Tool call outcomes](#tool-call-outcomes) section. |
| `gateway_ingress` | `mcp` for the MCP endpoint, or `api` for the REST endpoints. |
| `gateway_scope` | `single` when the client connected to one server's URL, or `mux` otherwise. |
| `user_id`, `user_handle`, `user_email` | The user who made the call. |
| `error_type` | The outcome of a failed call. |
| `mcp_policy_decision` | `allow` or `deny`: the result of the access check. |
| `mcp_policy_id` | The ID of each [policy][8] that lists the tool. Absent when server access decided. |
| `mcp_tool_blocked` | `true` when a policy refused the call. |

### Tool call outcomes

Every outcome except `ok` marks the span as an error.

| Outcome | Meaning |
|---|---|
| `ok` | The server returned a successful result. |
| `tool_error` | The tool ran and reported its own failure. |
| `invalid_params` | The server rejected the call, for example because it has no tool with that name or it refused the arguments. |
| `timeout` | The call did not finish in time. |
| `upstream_error` | The server could not be reached or failed, the caller disconnected during the call, or MCP Gateway could not check the caller's access. |
| `not_found` | The tool name matches no tool the request could reach: it is malformed, on a server outside the servers the client chose, or uses a slug that no server has. |
| `ambiguous` | The slug in the tool name matches more than one server. |
| `server_access_denied` | No policy lists the tool, and the caller does not have access to the server. |
| `policy_denied` | One or more policies list the tool, and the caller has access to none of them. |

To tell a refusal from a tool that does not exist, check the outcome. The caller receives the same `unknown tool` response for `not_found`, `server_access_denied`, and `policy_denied`.

For a call that passed the access check, `mcp_policy_decision` is `allow`. When `mcp_policy_decision` is `deny` and the span has no `mcp_policy_id`, server access refused the call.

### Connect tool calls to your traces

To see a tool call inside the trace of the agent that made it, pass the agent's trace context with the request:

- If the calling application is instrumented with [Agent Observability][4] and propagates its trace context, the tool call's span appears under the calling span and under the caller's application.
- Otherwise, send both the `x-dd-tag-llmobs_trace_id` and `x-dd-tag-llmobs_parent_id` request headers to set the span's trace and parent.

To group related calls, send the `x-dd-tag-session_id` request header. MCP Gateway copies its value to the span's session ID. Values that are not well formed are ignored.

## Review tool calls in Audit Trail

MCP Gateway writes one [Audit Trail][1] event for each tool call, attributed to the user who made the call and, for a call made with an OAuth sign-in, to the OAuth client. The event message describes the result:

| Result | Message |
|---|---|
| The call succeeded | `<USER> successfully called tool '<TOOL>' through the MCP gateway` |
| A policy refused the call | `<USER> was refused by an MCP gateway policy when calling tool '<TOOL>' through the MCP gateway` |
| Any other failure | `<USER> failed to call tool '<TOOL>' through the MCP gateway` |

Only a policy refusal has its own message. A call refused by server access is recorded with the `failed to call` message, so check the event's outcome to tell a refusal from a failure.

To find these events, search Audit Trail for `through the MCP gateway`.

Each event includes the tool name, the tool's name on its server, the call's duration and outcome, the endpoint used, and, when the call reached a server, the server. The event does not include a trace ID. To match an event to its span, compare the user, tool name, and time.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/audit_trail/
[2]: https://app.datadoghq.com/llm/gateway/mcp/overview
[3]: https://app.datadoghq.com/llm/traces
[4]: /llm_observability/
[5]: /ai_gateway/mcp_gateway/#prerequisites
[6]: /ai_gateway/mcp_gateway/tools/
[7]: /ai_gateway/mcp_gateway/tools/#search-mode
[8]: /ai_gateway/mcp_gateway/access_control/
