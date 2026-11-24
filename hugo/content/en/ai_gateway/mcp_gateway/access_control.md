---
title: Control MCP Server and Tool Access
description: Use server access and policies to decide who can use each MCP server and tool through MCP Gateway.
further_reading:
  - link: "/ai_gateway/mcp_gateway/"
    tag: "Documentation"
    text: "MCP Gateway"
  - link: "/ai_gateway/mcp_gateway/servers/"
    tag: "Documentation"
    text: "Register MCP Servers"
  - link: "/account_management/rbac/granular_access/"
    tag: "Documentation"
    text: "Granular access control"
---

{{< callout url="#" btn_hidden="true" header="false" >}}
MCP Gateway is in Preview.
{{< /callout >}}

MCP Gateway decides who can use each tool in two layers:

- **Server access** names the users, teams, and roles who can use a server. It applies to every tool on the server that no policy lists, including tools the server adds later.
- **Policies** list specific tools, from one or more servers, and name who can use them.

A tool in a policy follows only its policies. A tool in no policy follows its server access. MCP Gateway applies these rules each time a client lists tools or calls one.

## Before you begin

- Review the [MCP Gateway prerequisites](/ai_gateway/mcp_gateway/#prerequisites). You need `mcp_gateway_config_read` to view access and `mcp_gateway_config_write` to change it.
- [Register and connect](/ai_gateway/mcp_gateway/servers/) the servers you want to govern.
- Users who call tools need the `mcp_gateway_usage` permission in addition to the access described on this page.

## How access is decided

| Tool | Who can use it |
|---|---|
| No policy lists the tool | Users with **Runner** or **Editor** access to the tool's server |
| One or more policies list the tool | Users with **Runner** or **Editor** access to at least one of those policies |

A policy replaces server access for the tools it lists, in both directions:

- To restrict a tool on a server that many people can use, list the tool in a policy that names only the intended users. Everyone else loses that tool, including users who have access to the server.
- To share one tool from a restricted server, list the tool in a policy and name the users. They can use that tool and no other tool on the server.

Before you add a tool to a policy, check who uses it through server access today. Those users lose the tool unless a policy that lists it also names them.

### Access levels

Servers and policies use the same access levels:

| Access level | On a server | On a policy |
|---|---|---|
| **Viewer** | Cannot use the server's tools | Cannot use the policy's tools |
| **Runner** | Can use the server's tools that no policy lists | Can use the policy's tools |
| **Editor** | Can use the server's tools, change the server, and change who has access to it | Can use the policy's tools, and change the policy and who has access to it |

A new server is restricted to the person who created it. A new policy can be used only by the person who created it until you give others access. The creator of a policy is always one of its editors.

## Set server access

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}MCP Gateway{{< /ui >}} > {{< ui >}}Servers{{< /ui >}}][1] and open a server.
2. Open the {{< ui >}}Tools{{< /ui >}} tab. The panel at the top shows {{< ui >}}Server access: Whole organization{{< /ui >}} when the server has no access restrictions, and {{< ui >}}Server access: Restricted{{< /ui >}} when it has any.
3. Click {{< ui >}}Manage access{{< /ui >}}.
4. Add the users, teams, and roles who need the server, and choose an access level for each.
5. Save your changes.

To confirm who can use a server after you change its access, check the {{< ui >}}Who can use{{< /ui >}} column of the {{< ui >}}Server access{{< /ui >}} table on the [{{< ui >}}Policies{{< /ui >}}][2] page.

The same panel appears on the {{< ui >}}Access{{< /ui >}} step when you add a server.

## Create a policy

1. Go to [{{< ui >}}AI Gateway{{< /ui >}} > {{< ui >}}MCP Gateway{{< /ui >}} > {{< ui >}}Policies{{< /ui >}}][2] and click {{< ui >}}New policy{{< /ui >}}. Alternatively, select tools on a server's {{< ui >}}Tools{{< /ui >}} tab and click {{< ui >}}Create policy{{< /ui >}}.
2. Enter a {{< ui >}}Name{{< /ui >}} and, optionally, a {{< ui >}}Description{{< /ui >}}. The {{< ui >}}Slug{{< /ui >}} is suggested from the name and cannot be changed after you create the policy.
3. Under {{< ui >}}Tools{{< /ui >}}, click {{< ui >}}Add tools{{< /ui >}}. Choose a {{< ui >}}Server{{< /ui >}}, select its tools, and repeat for each server the policy covers.
4. Under {{< ui >}}Who can use these tools{{< /ui >}}, click {{< ui >}}Edit access{{< /ui >}}. Add the users, teams, and roles who need the tools, and give them **Runner** access. The summary reads {{< ui >}}Only you{{< /ui >}} until you add someone.
5. Click {{< ui >}}Create policy{{< /ui >}}.

The policy applies as soon as you create it.

<div class="alert alert-warning">When you create a policy, <strong>Restore Full Access</strong> in the access dialog removes every restriction from the new policy. Everyone in your organization can then use the policy's tools, and anyone with <code>mcp_gateway_config_write</code> can change or delete the policy.</div>

A policy can list only tools that MCP Gateway has already found on a server. If a tool is not offered, open the server's {{< ui >}}Tools{{< /ui >}} tab, click {{< ui >}}Refresh{{< /ui >}}, and try again.

## Change a policy

Open a policy from the {{< ui >}}Policies{{< /ui >}} page. The policy page shows its tools grouped by server, and who can use and edit it.

| Task | Steps |
|---|---|
| Change who can use the policy | Click {{< ui >}}Edit access{{< /ui >}}. |
| Add tools | Click {{< ui >}}Add tools{{< /ui >}}. |
| Remove a tool | Click the delete icon beside the tool. The tool follows its server access again, unless another policy lists it. |
| Delete the policy | Click {{< ui >}}Delete policy{{< /ui >}} and confirm. Its tools follow their server access again, unless another policy lists them. |

You can also change policies from a server's {{< ui >}}Tools{{< /ui >}} tab. Select one or more tools, then click {{< ui >}}Add to policy{{< /ui >}} or {{< ui >}}Remove from policy{{< /ui >}} and choose the policy.

If someone else changes a policy while you have it open, your change is refused. Reload the policy and try again.

## Review access

The {{< ui >}}Policies{{< /ui >}} page shows two tables:

- {{< ui >}}Policies{{< /ui >}}: Each policy with its servers, its number of tools, and who can use it. Filter by name or by server.
- {{< ui >}}Server access{{< /ui >}}: Each server with the number of tools that follow its server access and who can use them.

On a server's {{< ui >}}Tools{{< /ui >}} tab, the {{< ui >}}Access{{< /ui >}} column shows what decides access to each tool:

| Label | Meaning |
|---|---|
| {{< ui >}}Open{{< /ui >}} | No policy lists the tool, and the server's access includes your whole organization. |
| {{< ui >}}Restricted by server policy{{< /ui >}} | No policy lists the tool, and the server is restricted to specific users, teams, or roles. |
| {{< ui >}}In N policies{{< /ui >}} | One or more policies list the tool. Click the label to see the policies and who each one allows. |
| {{< ui >}}Server access{{< /ui >}} | The server lists the tool, but MCP Gateway has not recorded it yet. The tool follows its server access and cannot be added to a policy until the list is refreshed. |

## Required permissions

In addition to the `mcp_gateway_config_write` permission, each change requires **Editor** access to the resources it affects:

| Task | Editor access required on |
|---|---|
| Change a server's access | The server |
| Create a policy | Every server whose tools the policy lists |
| Add or remove a policy's tools | Every server whose tools you add or remove |
| Change who can use a policy | The policy |
| Delete a policy | The policy and every server whose tools it lists |

Adding or removing a policy's tools depends on the servers, not on the policy. An editor of a server can add that server's tools to any policy, or remove them from any policy.

## What users see

- **Listing tools**: A tool the user cannot use is left out of the list. A server with no tools the user can use is left out entirely.
- **Calling tools**: A call to a tool the user cannot use is refused as an unknown tool, the same response as for a tool name that matches no server. The reason is recorded on the tool call's span as the outcome `policy_denied` or `server_access_denied`. See [Tool call outcomes](/ai_gateway/mcp_gateway/observability/#tool-call-outcomes).
- **My servers**: The {{< ui >}}My servers{{< /ui >}} page lists the servers a user has **Runner** or **Editor** access to. A user who reaches a server's tools only through a policy sees those tools in their client, but does not see the server on {{< ui >}}My servers{{< /ui >}}.

MCP Gateway serves a tool only when its server is enabled and connected. For a server with per-user credentials, a user needs **Runner** or **Editor** access to the server to connect their own account, so a policy alone does not give them the server's tools.

If MCP Gateway cannot check a user's access, it lists and calls nothing for that request, and the client receives an upstream error.

## Tools that change on the server

- On a server with a shared credential, a tool that the server stops listing stays in its policies and is marked {{< ui >}}Missing{{< /ui >}}. No one can call it while the server does not list it. If the server lists the tool again, the policies apply again.
- A tool that is renamed on the server is a new tool. It follows server access under its new name until you add it to a policy, and the old name stays in the policy as {{< ui >}}Missing{{< /ui >}}. After a server renames tools, review the policies that list them.

## Verify access

Use a test server with a shared credential, and a test user who has `mcp_gateway_usage` and no access to that server.

1. As the test user, list tools through the [gateway URL](/ai_gateway/mcp_gateway/tools/). Confirm that the server's tools are not listed.
2. As an administrator, create a policy that lists one of the server's tools, and give the test user **Runner** access to the policy.
3. As the test user, list tools again. Confirm that the list includes the tool in the policy and no other tool from that server.
4. Call the tool and confirm that it returns a result. Call a second tool on the same server and confirm that the call is refused as an unknown tool.
5. As an administrator, remove the test user from the policy. Confirm that the tool is no longer listed for the test user.
6. Find the calls in [Agent Observability](/ai_gateway/mcp_gateway/observability/#find-tool-calls-in-agent-observability) and check each call's outcome.

## Limits

| Item | Limit |
|---|---|
| Policy name | 128 characters |
| Policy description | 1,024 characters |
| Policy slug | 1 to 64 lowercase letters, digits, and single hyphens, starting with a letter |
| Tools added or removed in one change | 500 |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/llm/gateway/mcp
[2]: https://app.datadoghq.com/llm/gateway/mcp/policies
