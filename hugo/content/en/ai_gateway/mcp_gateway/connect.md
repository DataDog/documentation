---
title: Connect to MCP Servers
description: Find the MCP servers you can use through MCP Gateway, connect your own account where a server needs it, and add the gateway to your MCP client.
further_reading:
  - link: "/ai_gateway/mcp_gateway/"
    tag: "Documentation"
    text: "MCP Gateway"
  - link: "/ai_gateway/mcp_gateway/tools/"
    tag: "Documentation"
    text: "Call Tools"
---

{{< callout url="#" btn_hidden="true" header="false" >}}
MCP Gateway is in Preview.
{{< /callout >}}

The {{< ui >}}My servers{{< /ui >}} page shows the MCP servers your organization shares with you. Use it to connect your own account to servers that need one, and to copy the setup for an MCP client such as Cursor, Claude Code, or Codex.

## Before you begin

- You need the `mcp_gateway_usage` permission. See the [MCP Gateway prerequisites][3].
- An administrator must [register the servers][4] and [give you access][5] to them.
- Your MCP client must support remote MCP servers over HTTP, and MCP protocol version `2026-07-28` or later.

## Find your servers

Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}MCP Gateway{{< /ui >}} > {{< ui >}}My servers{{< /ui >}}][1].

- {{< ui >}}Your gateway URL{{< /ui >}} is one endpoint for every server you can use. Tools are namespaced by server slug.
- {{< ui >}}Servers you can use{{< /ui >}} shows one card for each server, with its name, description, status, and its own URL.

A server appears on the page when it is enabled and you have access to it. A server with a shared credential appears after an administrator connects it, and shows {{< ui >}}Connected{{< /ui >}}. You do not need to do anything else to use it. A server with per-user credentials shows {{< ui >}}Not connected{{< /ui >}} until you connect your own account.

## Connect your own account

A server with per-user credentials uses your own account on that server. Only you use the credential you connect. Your administrator and other users never see it.

### Connect with OAuth

1. On the server's card, click {{< ui >}}Authorize{{< /ui >}}.
2. Sign in at the server and approve access. Complete the sign-in within 30 minutes.
3. When you return to {{< ui >}}My servers{{< /ui >}}, confirm that a banner reports the server is connected and that the card shows {{< ui >}}Connected{{< /ui >}}.

To sign in again, for example after your access on the server changes, click {{< ui >}}Reauthorize{{< /ui >}}.

### Connect with an API key or a username and password

1. On the server's card, click {{< ui >}}Set credentials{{< /ui >}}.
2. Enter a value in every field, and click {{< ui >}}Connect{{< /ui >}}.

To replace a saved value, click {{< ui >}}Update credentials{{< /ui >}} and enter only the values you want to replace. Saved values are never shown. Fields with a saved value are marked {{< ui >}}Set{{< /ui >}}.

### Disconnect

Click {{< ui >}}Disconnect{{< /ui >}} and confirm. MCP Gateway deletes your credential for that server. You can connect again at any time.

## Add the gateway to your client

Click {{< ui >}}Add to client{{< /ui >}} next to {{< ui >}}Your gateway URL{{< /ui >}} to set up every server you can use, or click the add button on a server's card to set up that server alone. The panel shows the configuration for each client, with the URL for your [Datadog site][2].

The {{< ui >}}Datadog Site{{< /ui >}} selector on this page updates the host in the following examples ({{< region-param key="dd_site_name" >}}).

#### Cursor

Click {{< ui >}}Add to Cursor{{< /ui >}} in the panel, or add the server to `~/.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "datadog-gateway": {
      "url": "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/mcp"
    }
  }
}
```

#### Claude Code

Run the following command in your terminal:

```shell
claude mcp add --scope user --transport http datadog-gateway 'https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/mcp'
```

#### Codex

Add the server to `~/.codex/config.toml`:

```toml
[mcp_servers.datadog-gateway]
url = "https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/mcp"
```

#### Other clients

Add a remote MCP server with the following details:

```text
Name: datadog-gateway
Transport: HTTP
URL: https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/mcp
```

### Sign in

The client configuration contains no credential. MCP Gateway supports OAuth sign-in with Datadog: a client that supports MCP authorization finds the Datadog authorization server from the gateway URL and prompts you to sign in. For scripts and clients that cannot sign in with OAuth, see the [Authenticate][6] section of Call Tools Through MCP Gateway.

After you sign in, your client lists the tools of every server you can use, named `<SERVER_SLUG>__<TOOL_NAME>`.

### Connect to one server

To give a client the tools of one server, use that server's URL from its card. The URL adds the server's slug, and the client sees the server's tools under their own names:

```text
https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/mcp?slug=<SERVER_SLUG>
```

The panel names the client entry after the server's slug instead of `datadog-gateway`.

### Use search mode

If you can use many tools, loading every tool definition can fill your agent's context. In search mode, your agent sees four tools instead of every tool: `tool_search`, `list_tools`, `get_tool_definition`, and `execute_tool`. The agent searches for a tool, reads its definition, and runs it as needed.

To use search mode, add `search=true` to the URL:

```text
https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/mcp?search=true
https://ai-gateway.{{< region-param key="dd_site" code="true" >}}/mcp?slug=<SERVER_SLUG>&search=true
```

For how each tool behaves, see the [Search mode][7] section of Call Tools Through MCP Gateway.

## Troubleshooting

If a server is missing from {{< ui >}}My servers{{< /ui >}}, stays {{< ui >}}Not connected{{< /ui >}}, or its tools do not appear in your client, see the [MCP Gateway tool calls][8] section of Troubleshoot AI Gateway.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/gateway/mcp/portal
[2]: /getting_started/site/
[3]: /ai_gateway/mcp_gateway/#prerequisites
[4]: /ai_gateway/mcp_gateway/servers/
[5]: /ai_gateway/mcp_gateway/access_control/
[6]: /ai_gateway/mcp_gateway/tools/#authenticate
[7]: /ai_gateway/mcp_gateway/tools/#search-mode
[8]: /ai_gateway/troubleshooting/#mcp-gateway-tool-calls
