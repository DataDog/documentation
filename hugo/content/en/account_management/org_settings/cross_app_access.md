---
title: Cross-App Access
description: Configure Cross-App Access so AI agents can call the Datadog API on behalf of users your organization authorized in Okta, Claude, or another trusted issuer.
algolia:
  tags: ["cross-app access", "XAA", "Okta", "Claude", "Anthropic", "OIDC", "AI agent", "MCP", "ID-JAG", "Identity Assertion JWT Authorization Grant", "Enterprise-Managed Authorization", "managed authorization", "SAML"]
further_reading:
    - link: '/mcp_server/setup/'
      tag: 'Documentation'
      text: 'Set up the Datadog MCP Server'
    - link: '/account_management/org_settings/mobile_third_party_access/'
      tag: 'Documentation'
      text: 'Mobile and Third-Party Access'
    - link: '/account_management/saml/'
      tag: 'Documentation'
      text: 'Configure SAML single sign-on'
    - link: 'https://datatracker.ietf.org/doc/draft-ietf-oauth-identity-assertion-authz-grant/'
      tag: 'External Site'
      text: 'Identity Assertion JWT Authorization Grant'
    - link: 'https://modelcontextprotocol.io/extensions/auth/enterprise-managed-authorization'
      tag: 'External Site'
      text: 'MCP Enterprise-Managed Authorization'
---

## Overview

Cross-App Access (XAA) lets AI agents call the Datadog API on behalf of users in your organization. Without it, every user authorizes the agent individually through a browser consent screen. With it, an administrator grants that access once, centrally, through a trusted issuer. Users still authorize as themselves, so Datadog applies their permissions and records their actions in the audit trail as usual.

### How it works

There are three roles in the XAA flow:

- **The agent** is the OAuth client that calls the Datadog API. The {{< ui >}}Supported agents{{< /ui >}} table on the Cross-App Access page lists the agents Datadog supports. Any of them works with an Okta or custom issuer. Claude Auto-Connect applies to Claude only, because Claude is both the issuer and the agent.
- **The trusted issuer** is the system that vouches for the user. It is either your SAML identity provider or Claude itself, through Claude Auto-Connect.
- **Datadog** owns the data, verifies the user's access, and issues the access token the agent uses.

Steps in the XAA flow:

1. The user asks the agent to retrieve information from Datadog.
2. The agent asks the issuer for a short-lived token called an ID-JAG (Identity Assertion JWT Authorization Grant), naming Datadog as the target.
3. The issuer verifies the user's identity and returns an ID-JAG.
4. The agent presents the ID-JAG to Datadog.
5. Datadog verifies the issuer's signature, confirms the user exists in your organization, and returns an access token scoped to the user's permissions and the agent's allowed scopes.
6. The agent calls the Datadog API with that access token.

Each product names this feature differently: Okta calls it Cross App Access, Claude calls it managed authorization, and the MCP specification calls it Enterprise-Managed Authorization. All three describe the same exchange.

### Permissions and auditing

Cross-App Access changes how the agent gets a token, not what the user can do or how Datadog records it.

- **Permissions**: the access token carries the user's own permissions. The agent cannot read or change anything the user cannot.
- **Scopes**: the token is also limited to the scopes you allow for the agent. Effective access is the overlap of the two. See the [Control scopes](#control-scopes) section.
- **Audit events**: Datadog records Cross-App Access authorizations in the [Audit Trail][4]. Actions the agent takes afterward are attributed to the user.

### Choose your issuer

Your choice of issuer shapes the rest of the setup, so make it before you start.

| If your organization                                                  | Use                              | What you set up                                                                       |
| --------------------------------------------------------------------- | -------------------------------- | ------------------------------------------------------------------------------------- |
| Uses Okta for SAML single sign-on to Datadog                          | **Okta**                         | Okta vouches for users, and you register the agent as an AI agent in Okta             |
| Wants Claude to manage the connection, with no identity provider work | **Claude** (Claude Auto-Connect) | Claude is both the issuer and the agent, and matches users by email address           |
| Uses another SAML identity provider that can issue ID-JAGs            | **Custom issuer**                | Your identity provider vouches for users, and you configure the token claims yourself |

You can trust more than one issuer. If you do, complete the setup for each.

## Prerequisites

Setting up XAA requires the `org_management` permission in Datadog, and each user of the agent must have a Datadog user account in your organization.

Requirements for the agent depend on which agent you use. For Claude, your organization must be on a Team or Enterprise plan, and you need admin access to set up managed authorization.

The remaining prerequisites depend on your issuer.

{{< tabs >}}
{{% tab "Okta" %}}

- Your organization uses Okta for SAML single sign-on to Datadog. The Okta issuer resolves users through your existing SAML connection, so it does not work without one. See [Configure SAML single sign-on][1].
- In Okta, each user is assigned to both the Okta application for your agent and the Okta application for Datadog.
- You have Okta Super Administrator access.

[1]: /account_management/saml/

{{% /tab %}}

{{% tab "Claude" %}}

- Each user's email address in Claude matches their Datadog user handle. Datadog matches users on this value, so a user whose addresses differ cannot connect.

{{% /tab %}}

{{% tab "Custom issuer" %}}

- Your organization uses SAML single sign-on to Datadog, and the issuer is your SAML identity provider. Datadog resolves users through the SAML identity in the token, so a custom issuer does not work without it. See [Configure SAML single sign-on][1].
- Your issuer returns ID-JAGs that meet the token requirements in the **Custom issuer** tab of the [Set up your issuer](#set-up-your-issuer) section.

[1]: /account_management/saml/

{{% /tab %}}
{{< /tabs >}}

## Configure Cross-App Access in Datadog

Start here, before you configure the issuer. Datadog rejects tokens for organizations that have not enabled Cross-App Access.

Navigate to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Cross-App Access{{< /ui >}}][1].

{{< img src="account_management/cross_app_access/cross-app-access-settings.png" alt="Cross-App Access settings page showing the enablement status, Issuer URLs list, Org UUID, and Supported agents table." style="width:100%;">}}

### Enable Cross-App Access

Click {{< ui >}}Enable{{< /ui >}}. This applies to your whole organization. Click {{< ui >}}Disable{{< /ui >}} to turn Cross-App Access off later.

### Add trusted issuers

Datadog accepts ID-JAGs only from the issuers in the {{< ui >}}Issuer URLs{{< /ui >}} list. Add one entry for each issuer you use. The [Set up your issuer](#set-up-your-issuer) section shows which URL to enter.

Every issuer URL must use `https` and a fully qualified, lowercase domain name, and must not contain an IP address, port, username, query, or fragment. Datadog accepts a token only when its `iss` claim matches the issuer URL exactly.

### Remove trusted issuers

To stop trusting an issuer, remove it from the {{< ui >}}Issuer URLs{{< /ui >}} list. Datadog stops accepting new ID-JAGs from the issuer. Access tokens that Datadog already issued stay valid until they expire. To cut off access immediately, revoke the user's access to the application in [Mobile and Third-Party Access][2].

### Copy your organization UUID

Copy the value in the {{< ui >}}Org UUID{{< /ui >}} field. The issuer sends this value as the `aud_tenant` claim, which tells Datadog which organization a token targets when several organizations share one issuer.

### Copy the agent client ID

The {{< ui >}}Supported agents{{< /ui >}} table lists every agent Datadog supports for Cross-App Access and the OAuth client ID each one uses. Some issuers need this client ID; the issuer's tab in the [Set up your issuer](#set-up-your-issuer) section says whether yours does. Datadog adds agents to this table as it supports them, so check the table rather than reusing a client ID from another source.

### Control scopes

Datadog is the enforcement point for scopes, whichever issuer you use. A scope that is not allowed in Datadog is never granted, regardless of what the token requests.

To set the scopes the agent is allowed in Datadog:

1. Navigate to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Mobile and Third-Party Access{{< /ui >}}][2]. You can also click {{< ui >}}Manage App{{< /ui >}} next to the agent in the {{< ui >}}Supported agents{{< /ui >}} table on the Cross-App Access page.
2. Select the agent's application, then select the {{< ui >}}Scopes{{< /ui >}} tab.
3. Use the {{< ui >}}Allowed{{< /ui >}} checkbox for each scope to control what the agent can request. Select {{< ui >}}Automatically allow new scopes{{< /ui >}} to grant new scopes as the agent requests them.
4. Click {{< ui >}}Enable{{< /ui >}} to save.

**Note**: Adding or removing a scope affects every user in your organization, and removing a scope revokes existing authorizations that rely on it. See [Application Scope Management][3].

## Set up your issuer

Open the tab for the issuer you picked in the [Choose your issuer](#choose-your-issuer) section.

Saving the issuer URL in Datadog does not confirm that the connection works. After you finish the setup, sign in to the agent as a user who meets the prerequisites and run a request that calls Datadog. A successful call confirms the full path: the issuer mints the token, Datadog accepts it, and Datadog resolves the user.

{{< tabs >}}
{{% tab "Okta" %}}

Use Okta as the issuer when your organization already signs in to Datadog through Okta. For Okta's side of the setup, see [Okta's Cross-App Access documentation][1].

#### Values you exchange

| Value                     | Direction       | Where you enter it                                                                                                    |
| ------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| Datadog organization UUID | Datadog to Okta | Okta application for Datadog, {{< ui >}}Machine Assignments{{< /ui >}} tab > {{< ui >}}Audience/tenant ID{{< /ui >}}  |
| Agent client ID           | Datadog to Okta | AI agent, {{< ui >}}Resource connections{{< /ui >}} tab, in the client ID field for your Okta application for Datadog |
| Okta issuer URL           | Okta to Datadog | See the [Add trusted issuers](#add-trusted-issuers) section                                                           |

The Datadog organization UUID is not the same as the company ID that Okta asks for elsewhere.

The Okta issuer URL is the issuer URL of your own Okta tenant, for example `https://<YOUR_OKTA_SUBDOMAIN>.okta.com`:

- The URL must contain only a scheme and a host, with no path or trailing slash.
- The host must be a subdomain of `.okta.com`, `.oktapreview.com`, or `.okta-emea.com`. Datadog rejects the apex domain, so `example.okta.com` works but `okta.com` does not.
- Okta custom authorization servers, whose issuer URLs contain a path such as `/oauth2/default`, are not supported.
- If your Okta org issues tokens from a custom domain, follow the **Custom issuer** tab instead.

#### Configure Okta

Complete the following steps in the Okta Admin Console as a Super Administrator. The Okta AI Agent administrator role does not have access to this configuration.

1. **Configure the Okta application for Datadog as a resource server.** On that application, open the {{< ui >}}Machine Assignments{{< /ui >}} tab, select the {{< ui >}}Callers{{< /ui >}} tile, and click {{< ui >}}Edit{{< /ui >}} next to {{< ui >}}Cross App Access (XAA){{< /ui >}}. Enable XAA. Set {{< ui >}}Audience/tenant ID{{< /ui >}} to the value from the [Copy your organization UUID](#copy-your-organization-uuid) section.

1. **Register the agent as an AI agent.** Navigate to {{< ui >}}Directory{{< /ui >}} > {{< ui >}}AI agents{{< /ui >}} and click {{< ui >}}Register AI agent{{< /ui >}}. Enter a name and description. Under {{< ui >}}User access and authentication{{< /ui >}} > {{< ui >}}App assigned to users to access this AI Agent{{< /ui >}}, select the agent's existing SAML application. The agent then appears in the {{< ui >}}AI agents{{< /ui >}} list with a staged status.

1. **Add the agent's credentials.** On the AI agent's {{< ui >}}Client registration{{< /ui >}} tab, configure the registration method the agent uses. See [Okta's Cross-App Access documentation][1] for the available methods and the values each one needs.

1. **Connect the agent to the Okta application for Datadog.** On the AI agent's {{< ui >}}Resource connections{{< /ui >}} tab, click {{< ui >}}Add resource connection{{< /ui >}} and select the Okta application for Datadog as the {{< ui >}}Application instance{{< /ui >}}.

    1. Set the agent's client ID registered in Datadog to the value from the [Copy the agent client ID](#copy-the-agent-client-id) section. Okta builds this field's label from the agent's name and the name of your Okta application for Datadog.
    1. Set {{< ui >}}Scopes{{< /ui >}} to {{< ui >}}Allow any scope{{< /ui >}}. Okta does not filter scopes: Okta copies whatever the agent requests into the token, and Datadog decides what to grant. See the [Control scopes](#control-scopes) section.
    1. Click {{< ui >}}Add{{< /ui >}}.

    <div class="alert alert-warning">Do not use {{< ui >}}Allow specific scopes{{< /ui >}}. Okta rejects any token request that contains a scope outside the list, so the integration fails with an error instead of falling back to narrower access.</div>

1. **Activate the agent.** On the AI agent page, select {{< ui >}}Activate{{< /ui >}} from the {{< ui >}}Actions{{< /ui >}} menu and wait for Okta to confirm.

1. **Add the Okta issuer URL to Datadog.** See the [Add trusted issuers](#add-trusted-issuers) section.

1. **Add Datadog as a connector in the agent.** The steps depend on the agent. In Claude, click the {{< ui >}}\+{{< /ui >}} icon at the bottom of any prompt, then click {{< ui >}}Add Connector{{< /ui >}}. Find **Datadog** in the directory, enable the connector, and complete the sign-in flow. Use the Datadog connector from the directory, not a custom connector.

#### Troubleshooting

- If token exchange fails while every value looks correct, confirm that the agent's credentials are active on the {{< ui >}}Client registration{{< /ui >}} tab. Okta issues no token until they are, and this is the most common cause of a failed first setup.
- If Okta rejects the token request with a scope error, confirm that {{< ui >}}Scopes{{< /ui >}} is set to {{< ui >}}Allow any scope{{< /ui >}} rather than a list of scopes.
- If Okta warns that the agent uses an outdated method for user sign-on, the agent was configured before Okta reorganized the Delegations tab into {{< ui >}}User access{{< /ui >}} and {{< ui >}}Machine access{{< /ui >}}. See [Okta's guidance on configuring AI agent-to-app with XAA][2]. An agent with a single SAML link keeps working without changes.
- Okta limits XAA within Single Sign-On to 250 ID-JAG tokens per user, per resource app, per month. Contact your Okta account team if your usage exceeds this limit.
- If a user signed in before you enabled Cross-App Access, have them sign out of the agent and sign back in. Sessions established earlier lack the identity token the agent needs.

[1]: https://help.okta.com/oie/en-us/content/topics/apps/apps-cross-app-access.htm
[2]: https://developer.okta.com/docs/guides/xaa-agent-to-app/main/

{{% /tab %}}

{{% tab "Claude" %}}

Use Claude as the issuer (Claude Auto-Connect) when you manage the Datadog connector centrally in Claude. See [Authorize MCP connectors for your entire organization][1] in the Claude Help Center for Claude's side of the setup.

#### Values you exchange

| Value                     | Direction         | Where you enter it                                                                                                                  |
| ------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Datadog organization UUID | Datadog to Claude | Datadog connector, {{< ui >}}Managed authorization{{< /ui >}} > {{< ui >}}Claude-issued{{< /ui >}} > {{< ui >}}Tenant ID{{< /ui >}} |
| Claude issuer URL         | Claude to Datadog | See the [Add trusted issuers](#add-trusted-issuers) section                                                                         |

Claude does not need the agent client ID.

The Claude issuer URL is the {{< ui >}}Issuer URL{{< /ui >}} shown in the Datadog connector in Claude, under {{< ui >}}Managed authorization{{< /ui >}} > {{< ui >}}Claude-issued{{< /ui >}}. It uses the host `claude.ai` or `identity.anthropic.com`, followed by the path for your Claude organization. Datadog rejects subdomains of these hosts. Copy the URL exactly as Claude shows it.

#### Configure Claude

Complete the following steps in Claude as an admin.

1. In Claude, navigate to [{{< ui >}}Organization settings{{< /ui >}} > {{< ui >}}Connectors{{< /ui >}}][2] and select **Datadog**.
1. On the {{< ui >}}Configuration{{< /ui >}} tab, click {{< ui >}}Set up{{< /ui >}} next to {{< ui >}}Managed authorization{{< /ui >}}.
1. In the {{< ui >}}Connect{{< /ui >}} step, under {{< ui >}}Identity source{{< /ui >}}, select {{< ui >}}Claude-issued{{< /ui >}}.
1. In the {{< ui >}}Tenant ID{{< /ui >}} field, enter the value from the [Copy your organization UUID](#copy-your-organization-uuid) section.
1. Copy the {{< ui >}}Issuer URL{{< /ui >}} shown under {{< ui >}}Claude-issued{{< /ui >}}, then add it to the {{< ui >}}Issuer URLs{{< /ui >}} list in Datadog. See the [Add trusted issuers](#add-trusted-issuers) section.
1. Click {{< ui >}}Run test{{< /ui >}} and confirm that every step passes.
1. In the {{< ui >}}Roles{{< /ui >}} step, select who receives the Datadog connector. To pilot with one team, select only that team's custom role and leave the built-in roles cleared.
1. In the {{< ui >}}Scopes{{< /ui >}} step, select the Datadog scopes Claude can request.
1. Click {{< ui >}}Save & turn on{{< /ui >}}.

Users in the selected roles receive the Datadog connector the first time they sign in to Claude.

The scopes you select in the {{< ui >}}Scopes{{< /ui >}} step limit what Claude requests. Datadog then grants only the requested scopes that are also allowed in Datadog, and drops any other requested scope without failing the request. See the [Control scopes](#control-scopes) section.

#### Troubleshooting

- If a request fails with a user resolution error, confirm the user's email address in Claude matches their Datadog user handle.
- If a user signed in before you enabled Cross-App Access, have them sign out of Claude and sign back in. Sessions established earlier lack the identity token the agent needs.

[1]: https://support.claude.com/en/articles/15537633-authorize-mcp-connectors-for-your-entire-organization
[2]: https://claude.ai/admin-settings/connectors

{{% /tab %}}

{{% tab "Custom issuer" %}}

A custom issuer is an identity provider, other than Okta and Claude, that issues ID-JAGs for users of your organization's SAML single sign-on. It is not a plain OIDC integration. Datadog uses the issuer's OpenID configuration only to find its signing keys. It identifies each user through the SAML identity in the token. An Okta org that issues tokens from a custom domain is a custom issuer.

#### Values you exchange

| Value                     | Direction         | Where you enter it                                                                                                    |
| ------------------------- | ----------------- | --------------------------------------------------------------------------------------------------------------------- |
| Datadog organization UUID | Datadog to issuer | The `aud_tenant` claim of the ID-JAG                                                                                  |
| Agent client ID           | Datadog to issuer | The `client_id` claim of the ID-JAG                                                                                   |
| Custom issuer URL         | Issuer to Datadog | See the [Add trusted issuers](#add-trusted-issuers) section                                                            |

The custom issuer URL is the `issuer` value from your issuer's `/.well-known/openid-configuration` document, entered character for character, including any path or trailing slash. Datadog rejects hostnames that belong to Datadog, internal-only names such as `.internal` or `.local`, and shared issuers that many unrelated tenants sign with, such as `https://accounts.google.com`.

#### Token requirements

The agent requests an ID-JAG from your issuer with OAuth 2.0 Token Exchange ([RFC 8693][2]), asking for the token type `urn:ietf:params:oauth:token-type:id-jag`. The agent then presents the ID-JAG to Datadog with the JWT bearer grant ([RFC 7523][3]). Configure your issuer and the agent for this exchange as described in their documentation.

Configure your issuer to issue ID-JAGs for Datadog that meet these requirements:

- **Discovery**: The issuer publishes `/.well-known/openid-configuration` under the issuer URL. Its `issuer` value matches the issuer URL you added in Datadog, and its `jwks_uri` is on the same host as the issuer. Datadog must be able to reach both over the public internet. Publish a signing key at the `jwks_uri` before you sign any token with it.
- **Signature**: The token's `typ` header is `oauth-id-jag+jwt`. The issuer signs the token with an asymmetric algorithm (RSA with a 2048-bit to 4096-bit key, ECDSA, or EdDSA) using a key it publishes at the `jwks_uri`. Include a `kid` header that matches the key.
- **Audience**: The `aud` claim is the Datadog authorization server URL for your Datadog site, {{< region-param key="mcp_xaa_issuer_url" code="true" >}}. The `aud_tenant` claim is the value from the [Copy your organization UUID](#copy-your-organization-uuid) section.
- **Client**: The `client_id` claim is the agent client ID from the [Copy the agent client ID](#copy-the-agent-client-id) section.
- **User**: The `sub_id` claim identifies the user by their SAML assertion, with `format` set to `saml-nameid`, `nameid` set to the user's Datadog handle, `nameid_format` set, and `issuer` set to the entity ID of the SAML identity provider configured for your Datadog organization.
- **Lifetime**: The token carries `exp`, `iat`, and a unique `jti`. Datadog rejects a `jti` it has already seen.

The following example shows the decoded header and payload of an ID-JAG that meets these requirements. Replace each placeholder with your own value, and replace `<DATADOG_MCP_URL>` with {{< region-param key="mcp_xaa_issuer_url" code="true" >}}.

Header:

```json
{
    "typ": "oauth-id-jag+jwt",
    "alg": "RS256",
    "kid": "<YOUR_SIGNING_KEY_ID>"
}
```

Payload:

```json
{
    "iss": "<YOUR_ISSUER_URL>",
    "aud": "<DATADOG_MCP_URL>",
    "aud_tenant": "<YOUR_DATADOG_ORG_UUID>",
    "client_id": "<AGENT_CLIENT_ID>",
    "sub_id": {
        "format": "saml-nameid",
        "nameid": "<USER_DATADOG_HANDLE>",
        "nameid_format": "urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress",
        "issuer": "<YOUR_SAML_IDP_ENTITY_ID>"
    },
    "jti": "<UNIQUE_TOKEN_ID>",
    "iat": 1762300000,
    "exp": 1762300300
}
```

#### Troubleshooting

- If Datadog rejects the token's SAML `issuer`, confirm it matches the identity provider configured in your Datadog organization's SAML settings exactly. One identity provider tenant can host several applications for Datadog, each with its own entity ID.
- If the user is not found, confirm `nameid` matches the user's Datadog handle exactly.

[2]: https://datatracker.ietf.org/doc/html/rfc8693
[3]: https://datatracker.ietf.org/doc/html/rfc7523

{{% /tab %}}
{{< /tabs >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/cross-app-access
[2]: https://app.datadoghq.com/organization-settings/oauth-applications
[3]: /account_management/org_settings/mobile_third_party_access/#application-scope-management
[4]: /account_management/audit_trail/
