---
title: Custom OAuth Clients
description: "Create private OAuth clients in your Datadog organization so your own apps and AI agents can call the Datadog API and MCP server with short-lived, scoped tokens on behalf of each user."
algolia:
  tags: ['custom oauth clients', 'oauth', 'oauth2', 'authorization code', 'pkce', 'mcp', 'delegated auth']
further_reading:
- link: "/extend/authorization/oauth2_endpoints/"
  tag: "Documentation"
  text: "OAuth2 authorization endpoints reference"
- link: "/extend/authorization/oauth2_in_datadog/"
  tag: "Documentation"
  text: "OAuth2 in Datadog"
- link: "/account_management/personal-access-tokens/"
  tag: "Documentation"
  text: "Personal Access Tokens"
- link: "/account_management/service-access-tokens/"
  tag: "Documentation"
  text: "Service Access Tokens"
- link: "/account_management/audit_trail/"
  tag: "Documentation"
  text: "Audit Trail"
---

{{< callout url="#" btn_hidden="true" header="Custom OAuth Clients is in Preview">}}
Custom OAuth Clients is in Preview for selected organizations. To request access, contact your Customer Success Manager.
{{< /callout >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Custom OAuth Clients is not available for the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Custom OAuth Clients let you create private OAuth 2.0 clients in your Datadog organization. Use them to connect your own apps, internal tools, and AI agents to the Datadog API and the [Datadog MCP server][1]. You don't need to publish an app in the Datadog Marketplace.

Each user signs in with their own Datadog account and approves the access the client requests. The client gets a short-lived access token tied to that user. Compared to API and application keys:

- Every API call is attributed to the user who authorized it.
- Tokens are scoped to the permissions the client requests and the user holds.
- Access tokens are short-lived, and the client renews them with a refresh token.
- Admins can see and disable every custom client in one place.

A custom client belongs to the organization that created it. Only users in that organization can authorize it.

### Supported flow

Custom OAuth Clients in Preview support:

- The [Authorization Code grant][2], with PKCE using the `S256` method. PKCE is required.
- Refresh tokens.
- Confidential clients only. Each client has a client secret, so it must run on a backend that can keep the secret safe.
- Exact HTTPS redirect URIs.

The following are not supported in Preview:

- The Client Credentials grant (machine-to-machine access without a user).
- Public clients without a client secret.
- Custom-scheme or loopback (`http://localhost`) redirect URIs.
- Managing clients through the public API or Terraform. Use Organization Settings.

## Prerequisites

- Your organization is enrolled in the Preview.
- Your organization is on a Pro or Enterprise plan.
- You have the **Custom OAuth Clients Manage** (`org_custom_oauth_clients_manage`) permission. The Datadog Admin role has it by default. You can add it to a [custom role][3].

### Limits

| Plan       | Active custom clients per organization |
|------------|----------------------------------------|
| Pro        | 3                                      |
| Enterprise | 10                                     |

Disabled clients don't count toward the limit.

## Create a client

1. In Datadog, go to **Organization Settings** > **OAuth Clients** and open the **Custom Clients** tab.
2. Click **New Client**.
3. Enter a **Name** and a **Description**. Users see the name on the consent page.
4. Add one to ten **Redirect URIs**. Each must be an absolute HTTPS URI. Datadog compares redirect URIs exactly, including the path and any query string.
5. Select the **Scopes** the client can request. Choose only what your app needs. The list includes the API scopes and the MCP server scope that custom clients support.
6. Click **Create**.
7. Copy the **Client ID** and **Client Secret**, and store the secret in a secure place.

<div class="alert alert-warning">The client secret is shown only once. If you lose it, disable the client and create another one.</div>

Redirect URIs and the client secret can't be changed after you create the client. To change them, create another client and disable the old one.

## Connect your app

Your app uses the client ID and secret to run the standard Authorization Code flow with PKCE.

1. Send the user to the authorization endpoint with your client ID, an exact redirect URI, the scopes you need, a `state` value, and a PKCE `code_challenge` with `code_challenge_method=S256`:

   ```text
   https://{{< region-param key="dd_full_site" >}}/oauth2/v1/authorize
   ```

2. The user signs in to Datadog and reviews the consent page. It shows the client name and every scope the client requests.
3. After the user approves, Datadog redirects to your redirect URI with an authorization `code`.
4. Exchange the code for an access token and a refresh token. Authenticate with your client ID and secret, using HTTP Basic (`client_secret_basic`) or the request body (`client_secret_post`), and send the PKCE `code_verifier`:

   ```text
   https://api.{{< region-param key="dd_site" >}}/api/v2/oauth2/token
   ```

5. Call the Datadog API or the MCP server with the access token in the `Authorization: Bearer <ACCESS_TOKEN>` header.
6. When the access token expires, use the refresh token at the same token endpoint with `grant_type=refresh_token`.

For the full list of request parameters and responses, see [OAuth2 authorization endpoints][4].

### What a token can do

An access token can only use scopes that:

- the client is allowed to request,
- the user approved on the consent page, and
- the user's own Datadog role grants.

A user can't give an app more access than they have.

## Manage clients

On the **Custom Clients** tab, you can see each active client and when a user last authorized it. Use the filter to show disabled clients.

Click a client to open its details. From there you can:

- **Edit the name and description.**
- **Change scopes.** Removing a scope revokes the existing authorizations that include it. Users must authorize the client again to grant a scope you add.
- **Disable the client.**

### Disable a client

Disabling a client is permanent. After you disable it:

- Users can't authorize it.
- Datadog rejects requests that use its tokens, and it can't get new tokens.
- It can't be enabled again.

The disabled client stays in the list, so you keep its history. To restore access, create another client.

## Audit your clients

Datadog records an event in [Audit Trail][5] when an admin creates, updates, or disables a custom client. API calls made with a custom client's token are attributed to the user who authorized it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1
[3]: /account_management/rbac/
[4]: /extend/authorization/oauth2_endpoints/
[5]: /account_management/audit_trail/
