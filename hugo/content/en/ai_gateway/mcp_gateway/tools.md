---
title: Call Tools Through MCP Gateway
description: List and call the tools of your organization's MCP servers through the MCP Gateway endpoint, from an MCP client or a script.
further_reading:
  - link: "/ai_gateway/mcp_gateway/"
    tag: "Documentation"
    text: "MCP Gateway"
  - link: "/ai_gateway/mcp_gateway/connect/"
    tag: "Documentation"
    text: "Connect to MCP Servers"
  - link: "/ai_gateway/mcp_gateway/observability/"
    tag: "Documentation"
    text: "Observe MCP Tool Activity"
---

{{< callout url="#" btn_hidden="true" header="false" >}}
MCP Gateway is in Preview.
{{< /callout >}}

MCP Gateway is an MCP server that combines the tools of your organization's registered servers for the user who calls it. It lists the tools the caller can use, forwards each call to the right server with the stored credential, and returns the server's result. Your client never receives the server's credential.

## Before you begin

- The caller needs the `mcp_gateway_usage` permission. See the [MCP Gateway prerequisites][3].
- At least one [registered][4], enabled, and connected server that the caller [can use][5].
- To set up an MCP client instead of sending requests yourself, see [Connect to MCP Servers][6].

## Endpoints

The {{< ui >}}Datadog Site{{< /ui >}} selector on this page updates the host. Use the MCP Gateway URL for your [Datadog site][1] ({{< region-param key="dd_site_name" >}}):

```text
https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/mcp
```

| Endpoint | Use |
|---|---|
| `POST /mcp` | The MCP endpoint, for MCP clients. |
| `GET /mcp/api/tools` | REST endpoint that lists tools, for scripts. See the [REST endpoints](#rest-endpoints) section. |
| `POST /mcp/api/tools/<TOOL_NAME>` | REST endpoint that calls a tool, for scripts. See the [REST endpoints](#rest-endpoints) section. |

The MCP endpoint uses the Streamable HTTP transport and is stateless: it keeps no session between requests. It requires MCP protocol version `2026-07-28` or later, which it reads from the `MCP-Protocol-Version` request header. MCP Gateway serves tools only. It does not serve MCP resources or prompts.

## Authenticate

Send credentials in request headers. The caller must have the `mcp_gateway_usage` permission on every endpoint.

| Credential | Header |
|---|---|
| OAuth access token from signing in with Datadog | `Authorization: Bearer <ACCESS_TOKEN>` |
| [Personal access token][2] | `Authorization: Bearer <PERSONAL_ACCESS_TOKEN>` |
| API key and application key | `dd-api-key: <API_KEY>` and `dd-application-key: <APPLICATION_KEY>` |

MCP clients that support MCP authorization sign in with OAuth without further configuration. A request to `/mcp` without credentials returns HTTP `401` with a `WWW-Authenticate` header that names the OAuth protected resource metadata document:

```text
https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/.well-known/oauth-protected-resource/mcp
```

The document names the Datadog authorization server that the client signs in with.

## Choose which tools a client sees

On the MCP endpoint, query parameters choose the servers and the tool names a client sees:

| URL | Servers | Tool names |
|---|---|---|
| `/mcp` | Every server the caller can use | `<SERVER_SLUG>__<TOOL_NAME>` |
| `/mcp?slug=<SERVER_SLUG>` | One server | The server's own tool names |
| `/mcp?slug=<SLUG_1>,<SLUG_2>` | The named servers, up to 20 | `<SERVER_SLUG>__<TOOL_NAME>` |
| Any of the previous URLs with `search=true` | The same servers | Four tools, described in the [Search mode](#search-mode) section |

The parameter is `slug`, singular. If a slug matches no server the caller can use, listing tools fails with `unknown server slug`. A call to a tool on a server outside the chosen servers is refused as an unknown tool.

## List tools

`tools/list` returns up to 100 tool definitions per page, sorted by name. When more tools remain, the result includes a `nextCursor` value. Send it as the cursor of the next request.

The following example lists tools with a personal access token:

```shell
curl -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/mcp" \
  -H "Authorization: Bearer <PERSONAL_ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "MCP-Protocol-Version: 2026-07-28" \
  -H "Mcp-Method: tools/list" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/list",
    "params": {
      "_meta": {
        "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        "io.modelcontextprotocol/clientCapabilities": {}
      }
    }
  }'
```

A successful response arrives as `text/event-stream`, with the JSON-RPC result in one `message` event. An error returned with HTTP `400` arrives as `application/json`.

MCP Gateway lists a server's tools when the server is enabled, connected, and the caller can use it. For a server with per-user credentials, the caller's own account must be connected. Tools the caller cannot use are left out. Input schemas and tool annotations are passed through unchanged.

MCP Gateway leaves out a tool when:

- Its name is not 1 to 128 ASCII letters, digits, underscores, hyphens, and periods
- Its name is longer than 128 characters after the server slug is added
- It repeats the name of an earlier tool from the same server

## Call a tool

Call a tool with `tools/call` and the name that `tools/list` returned. Add the `Mcp-Name` header with the tool name, and put the tool name and its arguments in `params`:

```shell
curl -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/mcp" \
  -H "Authorization: Bearer <PERSONAL_ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -H "MCP-Protocol-Version: 2026-07-28" \
  -H "Mcp-Method: tools/call" \
  -H "Mcp-Name: <SERVER_SLUG>__<TOOL_NAME>" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "<SERVER_SLUG>__<TOOL_NAME>",
      "arguments": {},
      "_meta": {
        "io.modelcontextprotocol/protocolVersion": "2026-07-28",
        "io.modelcontextprotocol/clientCapabilities": {}
      }
    }
  }'
```

MCP Gateway checks the caller's access to that tool, forwards the call to its server with the stored credential, and returns the server's result. A result in which the tool reports its own failure (`isError`) is passed through as a result, not as a protocol error.

A tool call has 30 seconds in total. A tool that takes longer than about 25 seconds to answer fails with an upstream error.

## Search mode

With `search=true`, `tools/list` returns four tools instead of every tool definition. Use search mode when an agent has access to more tools than fit comfortably in its context.

| Tool | Description |
|---|---|
| `tool_search` | Ranks tools against a `query` by name, title, description, and input parameter names and descriptions, and returns the best matches first. `limit` is 1 to 20, and defaults to 5. The query is at most 1,024 bytes and 64 words. Matching is by whole word, so search for the words a tool is likely to use. |
| `list_tools` | Returns tool names grouped by server slug, 1,000 names per page. |
| `get_tool_definition` | Returns the full definition of one tool. |
| `execute_tool` | Calls a tool by `name` with its `arguments`. The call follows the same access checks and returns the same result as `tools/call`. |

In search mode, call tools through `execute_tool`. A direct `tools/call` for a server's tool is refused as an unknown tool. Search mode uses the same tool names that `tools/list` shows for the same URL without `search=true`.

Search mode applies to the MCP endpoint only.

## REST endpoints

Scripts that do not speak MCP can use the REST endpoints. They need no JSON-RPC envelope and no MCP protocol version.

List tools, one page at a time:

```shell
curl "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/mcp/api/tools" \
  -H "Authorization: Bearer <PERSONAL_ACCESS_TOKEN>"
```

To get the next page, pass the `nextCursor` value from the response in the `cursor` query parameter.

Call a tool with its arguments as the JSON request body:

```shell
curl -X POST "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/mcp/api/tools/<SERVER_SLUG>__<TOOL_NAME>" \
  -H "Authorization: Bearer <PERSONAL_ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{"<ARGUMENT_NAME>": "<ARGUMENT_VALUE>"}'
```

The REST endpoints differ from the MCP endpoint in the following ways:

- They always cover every server the caller can use, with `<SERVER_SLUG>__<TOOL_NAME>` names. The `slug` and `search` query parameters are ignored.
- The request body is a JSON object of at most 1 MiB. An empty body means no arguments.
- Errors are returned as HTTP statuses, with the body `{"error": {"code": <CODE>, "message": "<MESSAGE>"}}`.
- Requests time out after 60 seconds.

## Errors

A call refused by server access or a policy returns the same `unknown tool` response as a call to a tool name that matches no server. For the error that each endpoint returns in each case, and for tools that are missing from the list, see the [MCP Gateway tool calls][7] section of Troubleshoot AI Gateway.

## Limitations

MCP Gateway has the following limitations:

- MCP Gateway serves tools only.
- Request and result metadata (`_meta`) is not forwarded between the client and the server. This includes progress tokens, so tools cannot report progress.
- A server cannot request input from the user during a tool call.
- Tool annotations, such as `readOnlyHint`, are the server's own claims. MCP Gateway passes them to the client unchanged and does not use them to decide access. Review a server's tools before you let a client approve them automatically.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/site/
[2]: /account_management/personal-access-tokens/
[3]: /ai_gateway/mcp_gateway/#prerequisites
[4]: /ai_gateway/mcp_gateway/servers/
[5]: /ai_gateway/mcp_gateway/access_control/
[6]: /ai_gateway/mcp_gateway/connect/
[7]: /ai_gateway/troubleshooting/#mcp-gateway-tool-calls
