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

{{< callout url="https://www.datadoghq.com/product-preview/custom-oauth-clients/" btn_hidden="false" header="Join the Preview!">}}
Custom OAuth Clients is in Preview for selected organizations. To request access, complete the signup form.
{{< /callout >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Custom OAuth Clients is not available for the selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Overview

Custom OAuth Clients let you create private OAuth 2.0 clients in your Datadog organization. Use them to connect your own apps, internal tools, and AI agents to the Datadog API and the [Datadog MCP server][1].

Custom clients are different from the apps in the Datadog Marketplace. A custom client belongs to the organization that created it. It isn't shared with other organizations, and only users in that organization can authorize it. Partners who build apps for other Datadog customers should keep using the [Datadog Marketplace][6].

Each user signs in with their own Datadog account and approves the access the client requests. The client gets a short-lived access token tied to that user. Compared to API and application keys:

- Every API call is attributed to the user who authorized it.
- Tokens are scoped to the permissions the client requests and the user holds.
- Access tokens are short-lived, and the client renews them with a refresh token.
- Admins can see and disable every custom client in one place.

### Supported flow

Custom OAuth Clients in Preview support:

- The [Authorization Code grant][2], with PKCE using the `S256` method. PKCE is required.
- Refresh tokens.
- Confidential clients only. Each client has a client secret, so it must run on a backend that can keep the secret safe.
- Exact HTTPS redirect URIs. An HTTPS `localhost` redirect URI works with an exact port, such as `https://localhost:8443/callback`.

The following are not supported in Preview:

- Public clients without a client secret.
- HTTP redirect URIs, including `http://localhost`.
- Managing clients through the public API or Terraform. Use Organization Settings.

## Prerequisites

- Your organization is enrolled in the Preview.
- Your organization is on a Pro or Enterprise plan.
- You have the **Custom OAuth Clients Manage** (`org_custom_oauth_clients_manage`) permission. See [Permissions](#permissions).

### Limits

| Plan       | Active custom clients per organization |
|------------|----------------------------------------|
| Pro        | 3                                      |
| Enterprise | 10                                     |

Organizations on other plans can't create custom clients. Disabled clients don't count toward the limit.

## Create a client

1. In Datadog, go to **Organization Settings** > **OAuth Clients** and open the **Custom Clients** tab.
2. Click **New Client**.
3. Enter a **Name** and a **Description**. Users see the name on the consent page.
4. Add up to 10 **Redirect URIs**. Each must be an absolute HTTPS URI without a fragment (`#`). Datadog compares redirect URIs exactly, including the port, path, and any query string.
5. Select the **Scopes** the client can request. Choose only what your app needs. The list includes the API scopes and the MCP server scope that custom clients support.
6. Click **Create**.
7. Copy the **Client ID** and **Client Secret**, and store the secret in a secure place.

<div class="alert alert-warning">The client secret is shown only once. If you lose it, create another client, move your app to it, and then disable the old one.</div>

Redirect URIs and the client secret can't be changed after you create the client. To change them, create another client and disable the old one.

## Connect your app

Your app uses the client ID and secret to run the standard Authorization Code flow with PKCE.

1. Send the user to the authorization endpoint with your client ID, an exact redirect URI, the scopes you need, a `state` value, and a PKCE `code_challenge` with `code_challenge_method=S256`. URL-encode each value. For example:

   ```text
   https://{{< region-param key="dd_full_site" >}}/oauth2/v1/authorize?response_type=code&client_id=<CLIENT_ID>&redirect_uri=https%3A%2F%2Fapp.example.com%2Foauth%2Fcallback&scope=dashboards_read%20monitors_read&state=<STATE>&code_challenge=<CODE_CHALLENGE>&code_challenge_method=S256
   ```

   Request only scopes the client has. If you leave out `scope`, or request only `mcp_all`, the consent page asks for all of the client's scopes. A scope the client doesn't have ends the flow with an `invalid_scope` error.

2. The user signs in to Datadog and reviews the consent page. It shows the client name and every scope the client requests.
3. After the user approves, Datadog redirects to your redirect URI with an authorization `code` and your `state` value. Check that `state` matches the value you sent before you continue.
4. Exchange the code for an access token and a refresh token at the token endpoint. Custom clients must use `/api/v2/oauth2/token`. Authenticate with your client ID and secret, and send the PKCE `code_verifier`. Use `--data-urlencode` so that values such as a redirect URI with a query string reach Datadog unchanged:

   ```shell
   curl -X POST "https://api.{{< region-param key="dd_site" >}}/api/v2/oauth2/token" \
     -u "<CLIENT_ID>:<CLIENT_SECRET>" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     --data-urlencode "grant_type=authorization_code" \
     --data-urlencode "code=<AUTHORIZATION_CODE>" \
     --data-urlencode "redirect_uri=<REDIRECT_URI>" \
     --data-urlencode "code_verifier=<CODE_VERIFIER>"
   ```

   The example uses HTTP Basic authentication (`client_secret_basic`). You can instead send `client_id` and `client_secret` in the request body (`client_secret_post`). If a request includes both, Datadog uses the HTTP Basic credentials.

5. Call the Datadog API or the MCP server with the access token in the `Authorization: Bearer <ACCESS_TOKEN>` header.
6. When the access token expires, exchange the refresh token for a new access token:

   ```shell
   curl -X POST "https://api.{{< region-param key="dd_site" >}}/api/v2/oauth2/token" \
     -u "<CLIENT_ID>:<CLIENT_SECRET>" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     --data-urlencode "grant_type=refresh_token" \
     --data-urlencode "refresh_token=<REFRESH_TOKEN>"
   ```

   Refresh tokens last 90 days. After a refresh token expires, the user must authorize the client again.

For the full list of request parameters and responses, see [OAuth2 authorization endpoints][4].

### Handle token errors

If the token endpoint rejects a request, check the `error` value:

- `invalid_grant` or `invalid_scope`: The user's authorization has ended, for example because an admin removed one of its scopes or the refresh token expired. Send the user through authorization again instead of retrying the request.
- `invalid_client`: The client ID or secret is wrong, or the client is disabled. Retrying doesn't help.

## Manage clients

The **Custom Clients** tab lists your organization's custom clients. For each client, it shows the status, client ID, number of scopes, creator, creation date, and the last time a user authorized it. Use the **Status** filter to show active or disabled clients.

{{< img src="account_management/custom_oauth_clients/custom-clients-list.png" alt="The Custom Clients tab in Organization Settings, showing one active custom client with its client ID, scopes, creator, creation date, and last authorization" style="width:100%;" >}}

Click a client to open its details. From there you can:

- **Change scopes.** Add or remove the scopes the client can request. A client must keep at least one scope. Removing a scope revokes the user authorizations that include it, so those users must authorize the client again. Users must also authorize the client again to grant a scope you add.
- **Disable the client.**

### Disable a client

Disabling a client is permanent. After you disable it:

- Users can't authorize it.
- It can't get new tokens or refresh existing ones. Access tokens that Datadog already issued can keep working until they expire.
- It can't be enabled again.

The disabled client stays in the list, so you keep its history. To restore access, create another client.

## Permissions

| Permission | Description |
|------------|-------------|
| `org_custom_oauth_clients_manage` | Create custom clients, change their scopes, and disable them |
| `org_custom_oauth_clients_read` | View custom clients |

The Datadog Admin Role has both permissions by default. The Datadog Standard Role and Datadog Read Only Role have neither. You can add them to a [custom role][3].

## Audit your clients

Datadog records an event in [Audit Trail][5] when an admin creates a custom client, changes its scopes, or disables it. It also records an event when a user authorizes a client. API calls made with a custom client's token are attributed to the user who authorized it.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/
[2]: https://datatracker.ietf.org/doc/html/rfc6749#section-4.1
[3]: /account_management/rbac/
[4]: /extend/authorization/oauth2_endpoints/
[5]: /account_management/audit_trail/
[6]: /extend/integrations/marketplace_offering/
