---
title: Register MCP Servers
description: Add an MCP server to MCP Gateway, choose how it authenticates, connect a credential, and review its tools.
further_reading:
  - link: "/ai_gateway/mcp_gateway/"
    tag: "Documentation"
    text: "MCP Gateway"
  - link: "/ai_gateway/mcp_gateway/access_control/"
    tag: "Documentation"
    text: "Control Server and Tool Access"
---

{{< callout url="#" btn_hidden="true" header="false" >}}
MCP Gateway is in Preview.
{{< /callout >}}

Register an MCP server to make its tools available through MCP Gateway. You can add a server from the list of Datadog-supported servers or by URL. For each server, you choose how MCP Gateway authenticates to it and who provides the credential.

## Before you begin

- Review the [MCP Gateway prerequisites][2]. You need `mcp_gateway_config_read` to view servers and `mcp_gateway_config_write` to add or change them.
- Have the server's URL. It must use `https` and a public hostname.
- Have a credential for the server: an OAuth account, an API key or other header value, or a username and password. For a credential that every user shares, use a service or team account, not a personal one.
- Choose the settings that you cannot change after you create the server: its URL, slug, authentication method, and who provides the credential.

## Add a server

Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}MCP Gateway{{< /ui >}} > {{< ui >}}Servers{{< /ui >}}][1]. The page lists your organization's servers with their status, credential type, and access.

### Add a Datadog-supported server

The {{< ui >}}Datadog-supported servers{{< /ui >}} section lists servers whose URL and authentication settings Datadog maintains. Use the search and the category filters to find a server.

1. Click the server's name or {{< ui >}}Manage{{< /ui >}}.
2. Review the {{< ui >}}Server URL{{< /ui >}}, {{< ui >}}Authentication{{< /ui >}}, {{< ui >}}Categories{{< /ui >}}, and {{< ui >}}Status{{< /ui >}}, then click {{< ui >}}Add server{{< /ui >}}.
3. If the server URL contains a tenant, enter your {{< ui >}}Tenant{{< /ui >}}. A tenant is 1 to 63 lowercase letters, digits, and hyphens, and starts and ends with a letter or digit.
4. Enter a {{< ui >}}Gateway slug{{< /ui >}}, and continue with the [Choose credentials](#choose-credentials) section.

Datadog sets the name, description, and URL of a Datadog-supported server, and its authentication method is OAuth. Your organization can add each Datadog-supported server one time. To register a second instance of the same service, add it as a custom server. A server whose status is {{< ui >}}Deprecated{{< /ui >}} does not accept new connections.

### Add a custom server

1. Click {{< ui >}}Add custom server{{< /ui >}}.
2. Enter a {{< ui >}}Display name{{< /ui >}} and, optionally, a {{< ui >}}Description{{< /ui >}}.
3. Enter the {{< ui >}}MCP server URL{{< /ui >}}. See the [URL requirements](#url-requirements) section.
4. Review the {{< ui >}}Gateway slug{{< /ui >}}, which is suggested from the display name. Edit it if it does not meet the requirements in the [Slug requirements](#slug-requirements) section, for example if it starts with a digit.
5. Click {{< ui >}}Next{{< /ui >}}.

#### URL requirements

The server URL must:

- Use `https`
- Have a public hostname
- Contain no credentials and no fragment
- Be at most 2,048 characters long
- Not already be registered in your organization

IP addresses, single-label hostnames, local names such as `.internal` and `.local`, and Datadog domains are not accepted as hostnames.

#### Slug requirements

MCP Gateway joins the slug and each tool name with two underscores to build the tool names that clients see, such as `grafana__search`. The slug also identifies the server in its own gateway URL. A slug must:

- Be unique in your organization
- Be 1 to 12 characters long
- Contain only lowercase letters, digits, and single hyphens
- Start with a letter and end with a letter or digit
- Not be `mcp` or `health`, which are reserved

## Choose credentials

On the {{< ui >}}Credentials{{< /ui >}} step, choose an {{< ui >}}Authentication method{{< /ui >}}:

| Method | What you provide |
|---|---|
| {{< ui >}}OAuth{{< /ui >}} (default) | Nothing at this step. You, or each user, sign in at the server after it is added. The server's authorization server must support dynamic client registration or client ID metadata documents for a public client, and must issue refresh tokens. |
| {{< ui >}}API key or headers{{< /ui >}} | 1 to 16 headers. Each header has a {{< ui >}}Header name{{< /ui >}}, an optional {{< ui >}}Prefix{{< /ui >}} such as `Bearer `, and a secret {{< ui >}}Value{{< /ui >}}. |
| {{< ui >}}Basic{{< /ui >}} | A {{< ui >}}Username{{< /ui >}} and a {{< ui >}}Password{{< /ui >}}. |

Then choose who provides the credential:

- {{< ui >}}Shared credential{{< /ui >}}: You connect one credential for your organization. Every user with access to the server calls its tools through that credential, so the server sees one account. Use a service or team account.
- {{< ui >}}Per-user credential{{< /ui >}}: Each user connects their own account on the [{{< ui >}}My servers{{< /ui >}}][3] page. The server sees each user's own account, and you do not enter a credential.

Click {{< ui >}}Add server{{< /ui >}}. MCP Gateway creates the server at this point. If you leave the remaining steps, the server stays in the {{< ui >}}Servers{{< /ui >}} list and you can finish its setup from its page.

MCP Gateway never displays a saved secret. Fields with a saved value are marked {{< ui >}}Set{{< /ui >}}.

## Connect and test the server

For a server with a shared credential:

- **OAuth**: Click {{< ui >}}Authorize{{< /ui >}} and sign in at the server. When you return to Datadog, the {{< ui >}}Shared credential{{< /ui >}} panel shows {{< ui >}}Authorized{{< /ui >}}. To sign in again later, click {{< ui >}}Reauthorize{{< /ui >}}.
- **API key or headers, or Basic**: MCP Gateway saves the values you entered and connects the server. The panel shows {{< ui >}}Connected{{< /ui >}}. To rotate a secret, enter only the values you want to replace and click {{< ui >}}Update credentials{{< /ui >}}. Fields you leave blank keep their saved values.

For a server with per-user credentials, the panel shows {{< ui >}}Your credential{{< /ui >}}, where you can connect your own account. Other users connect theirs on the {{< ui >}}My servers{{< /ui >}} page. See the [Connect your own account][4] section of Connect to MCP Servers.

After the server is connected, click {{< ui >}}Test{{< /ui >}}. A side panel shows {{< ui >}}Connection succeeded{{< /ui >}} with the response time, protocol version, server version, and website that the server reported, or {{< ui >}}Test failed{{< /ui >}} with a reason.

## Review the server's tools

The {{< ui >}}Tools{{< /ui >}} step and the server's {{< ui >}}Tools{{< /ui >}} tab list the tools that the server reports through its credential, with each tool's description and access. Click a tool to see its description and input schema. Click {{< ui >}}Refresh{{< /ui >}} to list the tools again.

Until a credential is connected, the tab shows {{< ui >}}No credentials yet{{< /ui >}}. On a server with per-user credentials, the list uses your own connection.

## Set access

A new server is restricted to the person who created it. No one else can use its tools, and other administrators cannot change or delete it, until you give them access. On the {{< ui >}}Access{{< /ui >}} step, or later on the server's {{< ui >}}Tools{{< /ui >}} tab, click {{< ui >}}Manage access{{< /ui >}}. See [Control Server and Tool Access][5].

Click {{< ui >}}Finish{{< /ui >}} to open the server's page.

## Manage a server

Open a server from the {{< ui >}}Servers{{< /ui >}} list to see its {{< ui >}}Details{{< /ui >}}, {{< ui >}}Credentials{{< /ui >}}, and {{< ui >}}Tools{{< /ui >}} tabs. To change a server, you need `mcp_gateway_config_write` and {{< ui >}}Editor{{< /ui >}} access to that server.

| Task | Steps |
|---|---|
| Rename a server | On the {{< ui >}}Details{{< /ui >}} tab, edit the {{< ui >}}Display name{{< /ui >}} or {{< ui >}}Description{{< /ui >}} and click {{< ui >}}Save changes{{< /ui >}}. The URL and slug are read-only. |
| Turn a server off | Turn off the {{< ui >}}Enabled{{< /ui >}} toggle. MCP Gateway stops serving the server's tools and hides it from {{< ui >}}My servers{{< /ui >}}. Its credentials and settings are kept, so you can turn it on again later. |
| Rotate a credential | On the {{< ui >}}Credentials{{< /ui >}} tab, click {{< ui >}}Reauthorize{{< /ui >}} or {{< ui >}}Update credentials{{< /ui >}}. |
| Delete a server | Click {{< ui >}}Delete server{{< /ui >}} and confirm. Deleting a server removes its credentials and every user's connection to it. To use a different URL, slug, or authentication method, delete the server and add it again. |

### Server status

| Status | Meaning |
|---|---|
| {{< ui >}}Ready{{< /ui >}} | A shared credential is connected, or the server uses per-user credentials. A server with per-user credentials shows {{< ui >}}Ready{{< /ui >}} before any user has connected, because each user connects their own account. |
| {{< ui >}}Not connected{{< /ui >}} | The server uses a shared credential that is not connected yet. MCP Gateway does not serve its tools. |
| {{< ui >}}Disabled{{< /ui >}} | The {{< ui >}}Enabled{{< /ui >}} toggle is off. |

## Limits

MCP Gateway applies the following limits to each registered server:

| Item | Limit |
|---|---|
| Display name | 128 characters |
| Description | 1,024 characters |
| Slug | 12 characters |
| Server URL | 2,048 characters |
| Headers per server | 16 |
| Header prefix | An authentication scheme of up to 20 letters and hyphens, followed by a space |
| Secret value | 8,192 bytes, with no control characters |
| Tools listed from one server | 1,500 tools or 4,000,000 bytes |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/gateway/mcp
[2]: /ai_gateway/mcp_gateway/#prerequisites
[3]: /ai_gateway/mcp_gateway/connect/
[4]: /ai_gateway/mcp_gateway/connect/#connect-your-own-account
[5]: /ai_gateway/mcp_gateway/access_control/
