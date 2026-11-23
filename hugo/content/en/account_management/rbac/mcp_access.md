---
title: Access Control for MCP
description: "Control who can use the Datadog MCP Server, whether agents can write, and which actions each AI client can perform."
further_reading:
  - link: "/mcp_server/"
    tag: "Documentation"
    text: "Datadog MCP Server"
  - link: "/mcp_server/setup/"
    tag: "Documentation"
    text: "Set up the Datadog MCP Server"
  - link: "/account_management/rbac/permissions/"
    tag: "Documentation"
    text: "Datadog Role Permissions"
  - link: "/account_management/org_settings/mobile_third_party_access/"
    tag: "Documentation"
    text: "Mobile and Third-Party Access"
---

The [Datadog MCP Server][1] lets AI agents and clients, such as Claude Code, Cursor, and ChatGPT, read and act on Datadog data on behalf of a signed-in user. You can control which users can access the MCP Server, whether they can write through it, and which actions each AI client can perform, even when the user can perform those actions elsewhere in Datadog.

Datadog evaluates MCP access in layers. A request through the MCP Server succeeds only if every layer allows it:

| Layer | Control | Scope | Default |
|-------|---------|-------|---------|
| 1 | [{{< ui >}}MCP Access{{< /ui >}} organization setting](#enable-or-disable-the-datadog-mcp-server) | Entire organization | On |
| 2 | [{{< ui >}}MCP Write Access{{< /ui >}} organization setting](#enable-or-disable-mcp-write-access) | Entire organization | Off |
| 3 | [IP allowlist](#restrict-network-access) | Entire organization | Off |
| 4 | [{{< ui >}}MCP Read{{< /ui >}} and {{< ui >}}MCP Write{{< /ui >}} role permissions](#control-mcp-access-for-specific-users) | Per role | - Datadog Read Only role: MCP Read<br>- Datadog Standard and Admin roles: MCP Read and MCP Write |
| 5 | [OAuth application scopes](#restrict-actions-for-a-specific-ai-client), or [access token scopes](#scopes-apply-only-to-oauth-connections) for connections that don't use OAuth | Per AI client (OAuth) or per token | - OAuth: All requested scopes allowed<br>- Access tokens: Scopes selected when the token is created |
| 6 | [Standard Datadog access controls](#standard-access-controls-apply-to-mcp) | Per user, resource, and dataset | Same as in the Datadog UI and API |

The MCP Server never grants a user more access than they already have in Datadog. Each layer can only narrow access further.

## Enable or disable the Datadog MCP Server

The {{< ui >}}MCP Access{{< /ui >}} organization setting controls whether anyone in your organization can use the Datadog MCP Server. It is enabled by default.

When {{< ui >}}MCP Access{{< /ui >}} is disabled, no user can access any MCP functionality, regardless of their role permissions.

To change this setting, you must be an organization administrator.

1. Navigate to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}MCP{{< /ui >}}][2].
2. Toggle {{< ui >}}MCP Access{{< /ui >}} on or off.

## Enable or disable MCP write access

The {{< ui >}}MCP Write Access{{< /ui >}} organization setting controls whether agents can create, modify, or delete resources through the MCP Server. It is disabled by default.

When {{< ui >}}MCP Write Access{{< /ui >}} is disabled, the MCP Server hides write tools from all users, regardless of their role permissions. Read tools remain available to users with the {{< ui >}}MCP Read{{< /ui >}} permission.

To change this setting, you must be an organization administrator.

1. Navigate to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}MCP{{< /ui >}}][2].
2. Toggle {{< ui >}}MCP Write Access{{< /ui >}} on or off.

<div class="alert alert-info">Enabling {{< ui >}}MCP Write Access{{< /ui >}} does not let every user write. Each user also needs the {{< ui >}}MCP Write{{< /ui >}} permission and the standard write permission for the resource, such as {{< ui >}}Monitors Write{{< /ui >}}.</div>

## Restrict network access

To control which networks can connect to the Datadog MCP Server, enable the [IP allowlist][14]. When the IP allowlist is enabled, users cannot connect to the MCP Server from IP addresses outside the allowlist, even if they have the required permissions.

## Control MCP access for specific users

Use role permissions to give specific users different MCP access from the rest of your organization. To turn off MCP access or MCP write access for every user, use the [organization settings](#enable-or-disable-the-datadog-mcp-server) instead.

Two role permissions control MCP access:

| Permission | Internal name | Grants |
|------------|---------------|--------|
| {{< ui >}}MCP Read{{< /ui >}} | `mcp_read` | Use MCP tools that read data. |
| {{< ui >}}MCP Write{{< /ui >}} | `mcp_write` | Use MCP tools that create or modify resources. Requires {{< ui >}}MCP Write Access{{< /ui >}} to be enabled for the organization. |

By default, the Datadog Read Only role has {{< ui >}}MCP Read{{< /ui >}}, and the Datadog Standard and Admin roles have both {{< ui >}}MCP Read{{< /ui >}} and {{< ui >}}MCP Write{{< /ui >}}.

To give specific users MCP access that differs from the managed roles, assign them a [custom role][3]. For example, to let a group of users write in Datadog but only read through the MCP Server, create a custom role that includes {{< ui >}}MCP Read{{< /ui >}} but not {{< ui >}}MCP Write{{< /ui >}}, and assign it to those users.

1. Navigate to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Roles{{< /ui >}}][4].
2. Select a custom role, or click {{< ui >}}New Role{{< /ui >}} to create one.
3. Click {{< ui >}}Edit Role{{< /ui >}}.
4. Under {{< ui >}}MCP{{< /ui >}}, select or clear {{< ui >}}MCP Read{{< /ui >}} and {{< ui >}}MCP Write{{< /ui >}}.
5. Click {{< ui >}}Save{{< /ui >}}.

## Restrict actions for a specific AI client

Each AI client that connects to the MCP Server through OAuth, such as Claude Code, is registered as an OAuth application in your organization. Each application requests a set of scopes, which correspond to Datadog permissions.

Use [Application Scope Management][5] to remove scopes from an AI client's OAuth application. A removed scope blocks that action through the AI client, even if the user has permission to perform it elsewhere in Datadog. For example, a user with {{< ui >}}Dashboards Write{{< /ui >}} can still edit dashboards in the Datadog UI, but cannot edit them through Claude Code if you remove the `dashboards_write` scope from the Claude Code OAuth application.

Scope changes apply to every user in your organization who uses that AI client.

### Prerequisites

You need the Datadog Admin role, or a role with both the {{< ui >}}Org Authorized Apps Read{{< /ui >}} (`org_authorized_apps_read`) and {{< ui >}}Org Authorized Apps Write{{< /ui >}} (`org_authorized_apps_write`) permissions.

### Manage scopes

1. Navigate to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Mobile and Third-Party Access{{< /ui >}}][6].
2. Click the OAuth application for the AI client you want to restrict.
3. Click the {{< ui >}}Scopes{{< /ui >}} tab.
4. Clear the {{< ui >}}Allowed{{< /ui >}} checkbox for each scope you want to block.
5. Clear {{< ui >}}Automatically allow new scopes{{< /ui >}} so that scopes the AI client requests in the future are blocked until an administrator allows them.
6. Click {{< ui >}}Save{{< /ui >}}.

**Note**: Removing a scope revokes existing authorizations that include that scope. Affected users must reauthorize the AI client to regain access with the remaining allowed scopes. Adding a scope does not add it to existing authorizations; users must reauthorize to receive it.

### Example: Allow agents to write only to Notebooks

To let agents read data across Datadog but only write to Notebooks:

1. Enable {{< ui >}}MCP Write Access{{< /ui >}} for your organization.
2. Confirm that users have both the {{< ui >}}MCP Read{{< /ui >}} and {{< ui >}}MCP Write{{< /ui >}} permissions.
3. On the AI client's OAuth application, keep all read scopes and `notebooks_write` allowed, and clear the {{< ui >}}Allowed{{< /ui >}} checkbox for every other write scope.
4. Clear {{< ui >}}Automatically allow new scopes{{< /ui >}}, then click {{< ui >}}Save{{< /ui >}}.

Users can still perform other write actions in the Datadog UI, subject to their role permissions.

### Scopes apply only to OAuth connections

Application scopes restrict MCP connections that authenticate through OAuth. A user who configures an AI client with a personal or service access token, or with an API key and application key, bypasses the OAuth application's scopes. That connection has the access of the token or key instead.

When an AI client cannot use OAuth, such as on a server or in a CI environment, connect it with an access token:

- Use a [Personal Access Token (PAT)][7] for an individual user. Every PAT requires scopes and an expiration date, so the token carries only the permissions the agent needs and stops working when it expires.
- Use a [Service Access Token (SAT)][17] for a [service account][8] that has only the required permissions. Select only the scopes the agent needs. SATs can be created with no expiration, so set an expiration date unless the workflow requires a long-lived token.

<div class="alert alert-warning">Datadog does not recommend API and application keys for MCP connections. Application keys are unscoped by default and never expire. If an AI client uses an API key and application key, replace them with a PAT or SAT.</div>

To limit who can create these credentials, restrict the {{< ui >}}User App Keys{{< /ui >}} and {{< ui >}}Org App Keys Write{{< /ui >}} [permissions][16]. These permissions control PATs as well as application keys. Creating SATs also requires {{< ui >}}Service Account Write{{< /ui >}}.

## Keep credentials out of AI agent conversations

Never share a token, API key, or application key with an AI agent. This includes pasting a credential into a prompt, or asking an agent to write one into a configuration file. Anything you send to an agent becomes part of its context. The agent can repeat it in output, write it to files or logs, or send it to its model provider.

Instead:

- **Use OAuth** where your AI client supports it. The client obtains and stores credentials for you, so you never handle a secret.
- **Enter tokens in your MCP client's configuration yourself**, not through the agent. If your client can read header values from environment variables, store the token in an environment variable or a secrets manager and reference it from the configuration.
- **In CI and other automated environments**, store the token in the platform's secret store and inject it at runtime.

If a credential is exposed to an agent, revoke it and create a new one. See [What to do if an API or application key was exposed][18].

## Standard access controls apply to MCP

In addition to the MCP-specific controls on this page, the MCP Server follows the same access controls the user has everywhere else in Datadog. The MCP Server calls Datadog APIs with the caller's credentials: the signed-in user's, or the service account's when the connection uses a SAT. As a result:

- **Role permissions**: A user needs the standard permission for the underlying resource in addition to {{< ui >}}MCP Read{{< /ui >}} or {{< ui >}}MCP Write{{< /ui >}}. For example, creating a monitor through the MCP Server requires {{< ui >}}Monitors Write{{< /ui >}}. See [Role Based Access Control][9].
- **Restricted datasets**: [Data Access Control][10] and [log restriction queries][11] limit which logs, spans, and other telemetry the MCP Server returns to a user.
- **Restricted assets**: [Granular access controls][12] on dashboards, monitors, notebooks, and other resources apply to MCP requests. A user cannot view or edit a resource through the MCP Server if they cannot view or edit it in the Datadog UI.

## Audit MCP activity

Every MCP Server tool call is recorded in [Audit Trail][13] with the tool name, arguments, user identity, and client. See [Track tool calls in Audit Trail][15].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/
[2]: https://app.datadoghq.com/organization-settings/mcp
[3]: /account_management/rbac/?tab=datadogapplication#custom-roles
[4]: https://app.datadoghq.com/organization-settings/roles
[5]: /account_management/org_settings/mobile_third_party_access/#application-scope-management
[6]: https://app.datadoghq.com/organization-settings/oauth-applications
[7]: /account_management/personal-access-tokens/
[8]: /account_management/org_settings/service_accounts/
[9]: /account_management/rbac/
[10]: /account_management/rbac/data_access/
[11]: /logs/guide/logs-rbac-permissions/?tab=ui#create-a-restriction-query
[12]: /account_management/rbac/granular_access/
[13]: /account_management/audit_trail/
[14]: /account_management/org_settings/ip_allowlist/
[15]: /mcp_server/#track-tool-calls-in-audit-trail
[16]: /account_management/rbac/permissions/#api-and-application-keys
[17]: /account_management/service-access-tokens/
[18]: /account_management/api-app-keys/#what-to-do-if-an-api-or-application-key-was-exposed
