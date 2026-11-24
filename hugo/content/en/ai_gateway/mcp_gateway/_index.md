---
title: MCP Gateway
description: Give agents and coding assistants governed access to your organization's MCP servers through one Datadog endpoint.
further_reading:
  - link: "/ai_gateway/"
    tag: "Documentation"
    text: "AI Gateway"
  - link: "/account_management/rbac/permissions/"
    tag: "Documentation"
    text: "Datadog role permissions"
  - link: "/account_management/audit_trail/"
    tag: "Documentation"
    text: "Audit Trail"
---

{{< callout url="#" btn_hidden="true" header="false" >}}
MCP Gateway is in Preview.
{{< /callout >}}

MCP Gateway puts your organization's [Model Context Protocol (MCP)][1] servers behind one Datadog endpoint. An administrator registers each server once, stores its credentials in Datadog, and decides who can use the server and which of its tools. Users add one URL to their MCP client, sign in with Datadog, and call the tools they are allowed to use.

Because every tool call passes through one control point, you can:

- Give agents and coding assistants one URL for every approved MCP server
- Keep server credentials in Datadog instead of in each user's client configuration
- Control who can use each server, down to individual tools, with [server access and policies](/ai_gateway/mcp_gateway/access_control/)
- Let users connect their own accounts to servers that need per-user credentials
- Review tool calls, errors, and latency on the [Overview](/ai_gateway/mcp_gateway/observability/) page, in Agent Observability, and in Audit Trail

MCP Gateway is part of AI Gateway, but it handles different traffic. AI Gateway routes model requests to LLM providers at `/ai/v1`. MCP Gateway routes tool calls to MCP servers at `/mcp`. MCP Gateway has its own permissions and its own pages under {{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}MCP Gateway{{< /ui >}}. It is also separate from the [Datadog MCP Server][2], which gives agents access to your Datadog data.

## How it works

1. An administrator [registers an MCP server](/ai_gateway/mcp_gateway/servers/) with its URL, a short slug, and an authentication method.
2. The administrator connects a shared credential that every permitted user calls through, or lets each user connect their own account.
3. The administrator sets [who can use the server and its tools](/ai_gateway/mcp_gateway/access_control/).
4. Users [add the gateway URL to their MCP client](/ai_gateway/mcp_gateway/connect/) and sign in with Datadog.
5. MCP Gateway lists the tools each user can use, named `<SERVER_SLUG>__<TOOL_NAME>`, and forwards each call to the server with the stored credential.
6. MCP Gateway records each tool call as a span in Agent Observability and as an event in Audit Trail.

## Key concepts

| Concept | Description |
|---|---|
| Server | An upstream MCP server registered in your organization, either from the list of Datadog-supported servers or by URL. |
| Slug | A short, unique identifier for a server. MCP Gateway prefixes each tool name with the slug of its server, such as `grafana__search`. |
| Shared credential | One credential, connected by an administrator, that every user with access to the server calls through. |
| Per-user credential | A credential that each user connects for themselves. Each user's calls use their own account on the server. |
| Server access | The users, teams, and roles who can use a server. It applies to every tool on the server that no policy lists. |
| Policy | A named list of tools, from one or more servers, and the people who can use them. A tool listed in a policy follows only its policies. |
| Gateway URL | The MCP endpoint that clients connect to. One URL covers every server a user can use, and each server also has its own URL. |

## Prerequisites

- MCP Gateway Preview access for your Datadog organization.
- A Datadog role with the MCP Gateway permissions that match your task:

  | Permission | Allows |
  |---|---|
  | `mcp_gateway_usage` | Use MCP servers through MCP Gateway: open {{< ui >}}My servers{{< /ui >}}, connect your own credentials, and list and call tools. |
  | `mcp_gateway_config_read` | View the MCP Gateway configuration: the {{< ui >}}Overview{{< /ui >}}, {{< ui >}}Servers{{< /ui >}}, and {{< ui >}}Policies{{< /ui >}} pages. |
  | `mcp_gateway_config_write` | Administer the MCP Gateway configuration: add, change, and delete servers and policies. |

MCP Gateway permissions are separate from the `ai_gateway_*` permissions. A user with `mcp_gateway_usage` and no configuration permission sees only {{< ui >}}My servers{{< /ui >}} in the {{< ui >}}MCP Gateway{{< /ui >}} section. To assign permissions, see [Role Based Access Control][3].

## Guides

| Task | Guide |
|---|---|
| Add an MCP server, connect its credential, and check its tools | [Register MCP Servers](/ai_gateway/mcp_gateway/servers/) |
| Decide who can use each server and tool | [Control Server and Tool Access](/ai_gateway/mcp_gateway/access_control/) |
| Connect your own account and set up an MCP client | [Connect to MCP Servers](/ai_gateway/mcp_gateway/connect/) |
| List and call tools from an MCP client or a script | [Call Tools](/ai_gateway/mcp_gateway/tools/) |
| Review tool calls, errors, and latency | [Observe MCP Tool Activity](/ai_gateway/mcp_gateway/observability/) |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://modelcontextprotocol.io/
[2]: /mcp_server/
[3]: /account_management/rbac/
