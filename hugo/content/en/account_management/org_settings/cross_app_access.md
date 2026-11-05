---
title: Cross-App Access
description: Configure Cross-App Access so AI agents can call the Datadog API on behalf of users your organization authorized in Okta, Claude, or another trusted issuer.
algolia:
    tags:
        [
            'cross-app access',
            'XAA',
            'Okta',
            'Claude',
            'Anthropic',
            'OIDC',
            'AI agent',
            'MCP',
            'ID-JAG',
            'Identity Assertion JWT Authorization Grant',
            'Enterprise-Managed Authorization',
            'managed authorization',
            'SAML'
        ]
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

Connecting an AI agent to Datadog across an organization creates two problems. Administrators have no central control over which agents reach their data, and every user has to click through a consent screen before the agent works.

Cross-App Access (XAA) solves both. An administrator authorizes the agent centrally for the whole organization, through the identity provider the organization already runs, and users connect without being prompted.

What does not change is equally important: each user still acts as themselves. Datadog applies that user's own permissions to every call the agent makes, and the audit trail records the action under their name. Authorizing the agent centrally gives no one more access than they already have.

For example, an engineer asks Claude why a service is throwing errors. Claude queries Datadog as that engineer, returns only the data that engineer is allowed to see, and the query lands in the audit trail under their name. The engineer never sees a Datadog consent screen.

### Who this is for

Cross-App Access is for Datadog administrators rolling an AI agent out to a team or an entire organization, who want that access to follow the identity provider they already run. You need the `org_management` permission in Datadog and admin access to your identity provider.

If you are an individual connecting Claude to your own Datadog account, you do not need this page. Use the standard connector sign-in flow instead.

### How it works

Three parties take part:

- **The agent** is the OAuth client that calls the Datadog API, known as the MCP client in MCP terms. Claude is the only agent that supports Cross-App Access, and it works with any trusted issuer.
- **The trusted issuer** is the system that vouches for the user. It is either your identity provider or Claude itself.
- **Datadog** owns the data, decides which scopes the agent receives, and issues the access token the agent uses.

When a user asks the agent for something in Datadog:

1. The user signs in to the agent.
2. The agent asks the issuer for a short-lived token called an ID-JAG (Identity Assertion JWT Authorization Grant), naming Datadog as the target.
3. The issuer applies your access policy and signs the ID-JAG if the user is allowed.
4. The agent presents the ID-JAG to Datadog.
5. Datadog verifies the issuer's signature, resolves which Datadog user the token names, and returns an access token belonging to that user.
6. The agent calls the Datadog API with that access token.

Because the access token belongs to the user, every permission check and audit record behaves as though the user made the call directly.

Each product names this feature differently: Okta calls it Cross App Access, Claude calls it managed authorization, and the MCP specification calls it Enterprise-Managed Authorization. All three describe the same exchange.

### Choose your issuer

Your choice of issuer shapes the rest of the setup, so make it before you start.

| If your organization                                                  | Use                               | What you set up                                                                      |
| --------------------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------ |
| Uses Okta for SAML single sign-on to Datadog                          | **Okta**                          | Okta vouches for users, and you register Claude as an AI Agent in Okta               |
| Wants Claude to manage the connection, with no identity provider work | **Claude** (Claude Auto-Connect)  | Claude is both the issuer and the agent, and matches users by email address          |
| Uses another SAML identity provider that can issue ID-JAGs            | **Custom issuer**                 | Your identity provider vouches for users, and you configure the token claims yourself |

You can trust more than one issuer. If you do, complete the setup for each.

Whichever you choose, the path is the same: enable Cross-App Access in Datadog and add the issuer's URL, set up the issuer, choose which scopes the agent may use, then verify the result.

## Prerequisites

These apply whichever issuer you use:

- You have the `org_management` permission in Datadog.
- Each user of your AI agents exists in your Datadog organization.
- Your organization is on a Claude Team or Enterprise plan. Claude is the only agent that supports Cross-App Access, so this applies whichever issuer you use.

{{< tabs >}}
{{% tab "Okta" %}}

- Your organization uses Okta for SAML single sign-on to Datadog. The Okta issuer resolves users through your existing SAML connection, so it does not work without one. See [Configure SAML single sign-on][1].
- In Okta, each user is assigned to both the Okta application for Claude and the Okta application for Datadog.
- Your Okta tenant has the {{< ui >}}AI Agent Identity Assertion{{< /ui >}} and {{< ui >}}Agent to Agent Connections{{< /ui >}} features enabled, and you have Okta Super Administrator access.
- You are an admin on your organization's Claude plan. The last step of the Okta setup adds the Datadog connector in Claude.

[1]: /account_management/saml/

{{% /tab %}}

{{% tab "Claude" %}}

- You are an admin on your organization's Claude plan, with access to set up managed authorization.
- Each user's email address in Claude matches the email address provisioned for their Datadog user (their Datadog user handle). Datadog matches users on this value, so a user whose addresses differ cannot connect.

{{% /tab %}}

{{% tab "Custom issuer" %}}

- Your organization uses SAML single sign-on to Datadog, and the issuer is your SAML identity provider. Datadog resolves users through the SAML identity in the token, so a custom issuer does not work without it. See [Configure SAML single sign-on][1].
- Your issuer can issue ID-JAGs that meet the token requirements in the **Custom issuer** tab of [Set up your issuer](#set-up-your-issuer).

[1]: /account_management/saml/

{{% /tab %}}
{{< /tabs >}}

## Configure Cross-App Access in Datadog

Start here, before you configure the issuer. Datadog rejects tokens for organizations that have not enabled Cross-App Access.

This page is also where you collect two values your issuer needs, the organization UUID and the agent client ID, so keep it open while you work through [Set up your issuer](#set-up-your-issuer).

Navigate to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Cross-App Access{{< /ui >}}][1].

{{< img src="account_management/cross_app_access/cross-app-access-settings.png" alt="Cross-App Access settings page showing the enablement status, Issuer URLs list, Org UUID, and Supported agents table." style="width:100%;">}}

### Enable Cross-App Access

Click {{< ui >}}Enable{{< /ui >}}. This applies to your whole organization. Click {{< ui >}}Disable{{< /ui >}} to turn Cross-App Access off later.

### Add trusted issuers

Datadog accepts ID-JAGs only from the issuers in the {{< ui >}}Issuer URLs{{< /ui >}} list. Add one entry for each issuer you use. Each issuer's tab in [Set up your issuer](#set-up-your-issuer) shows which URL to enter.

Every issuer URL must use `https` and a fully qualified, lowercase domain name, and must not contain an IP address, port, user name, query, or fragment. Datadog accepts a token only when its `iss` claim matches the issuer URL exactly.

### Remove trusted issuers

To stop trusting an issuer, remove it from the {{< ui >}}Issuer URLs{{< /ui >}} list. Datadog stops accepting new ID-JAGs from the issuer. Access tokens that Datadog already issued stay valid until they expire. To cut off access immediately, revoke the user's access to the application in [Mobile and Third-Party Access][2].

Removing the issuer stops Datadog from accepting its tokens, but it does not change the agent's configuration. To retire a setup completely, also turn off managed authorization for the Datadog connector in Claude. Otherwise Claude keeps requesting tokens that Datadog rejects.

### Copy your organization UUID

Copy the value in the {{< ui >}}Org UUID{{< /ui >}} field. The issuer sends this value as the `aud_tenant` claim, which tells Datadog which organization a token targets when several organizations share one issuer.

### Copy the agent client ID

The {{< ui >}}Supported agents{{< /ui >}} table lists every agent Datadog supports for Cross-App Access and the OAuth client ID each one uses. Some issuers need this client ID; the issuer's tab in [Set up your issuer](#set-up-your-issuer) says whether yours does.

Datadog adds agents to this table as it supports them, so check the table rather than reusing a client ID from another source.

Click {{< ui >}}Manage App{{< /ui >}} on a row to open the scope settings for that agent. See [Control scopes in Datadog](#control-scopes-in-datadog).

## Set up your issuer

Open the tab for the issuer you picked in [Choose your issuer](#choose-your-issuer). Each tab covers the values you exchange, the issuer URL to use, the configuration steps, and how that issuer handles scopes.

{{< tabs >}}
{{% tab "Okta" %}}

Use Okta as the issuer when Okta is your SAML identity provider for Datadog. See [Okta's Cross-App Access documentation][2] for Okta's side of the setup.

#### Values you exchange

| Value                     | Direction       | Where you enter it                                                                                                    |
| ------------------------- | --------------- | --------------------------------------------------------------------------------------------------------------------- |
| Datadog organization UUID | Datadog to Okta | Okta application for Datadog, {{< ui >}}Machine Assignments{{< /ui >}} tab > {{< ui >}}Audience/tenant ID{{< /ui >}}  |
| Agent client ID           | Datadog to Okta | AI Agent, {{< ui >}}Resource connections{{< /ui >}} > {{< ui >}}Client ID at resource{{< /ui >}}                      |
| Okta issuer URL           | Okta to Datadog | {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Cross-App Access{{< /ui >}} > {{< ui >}}Issuer URLs{{< /ui >}} |

The Datadog organization UUID is not the same as the company ID that Okta asks for elsewhere.

#### Issuer URL

Enter the issuer URL of your own Okta tenant, for example `https://<YOUR_OKTA_SUBDOMAIN>.okta.com`.

- The URL must contain only a scheme and a host, with no path or trailing slash.
- The host must be a subdomain of `.okta.com`, `.oktapreview.com`, or `.okta-emea.com`. Datadog rejects the apex domain, so `example.okta.com` works and `okta.com` does not work.
- Okta custom authorization servers, whose issuer URLs contain a path such as `/oauth2/default`, are not supported.
- If your Okta org issues tokens from a custom domain, follow the **Custom issuer** tab instead.

#### Configure Okta

Complete the following steps in the Okta Admin Console as a Super Administrator.

1. **Configure the Okta application for Datadog as a resource server.** On that application, open the {{< ui >}}Machine Assignments{{< /ui >}} tab, select the {{< ui >}}Callers{{< /ui >}} tile, and click {{< ui >}}Edit{{< /ui >}} next to {{< ui >}}Cross App Access (XAA){{< /ui >}}. Enable XAA, then set {{< ui >}}Audience/tenant ID{{< /ui >}} to your [Datadog organization UUID](#copy-your-organization-uuid).

1. **Register Claude as an AI Agent.** Anthropic signs the requests Okta receives, so Okta needs Anthropic's public key before it issues any token. This exchange is manual, so start it early.
    1. Create the AI Agent entry for Claude.
    1. Assign owners to the agent. Okta requires an owner before you can activate it.
    1. Send the AI Agent ID that Okta generates to Anthropic.
    1. Add the public key that Anthropic returns to the AI Agent entry, on the {{< ui >}}Credentials{{< /ui >}} tab.

    Until the public key is in place, token exchange fails even though every other value is correct.

1. **Connect Claude to the Okta application for Datadog.**
    1. On the Claude AI Agent's {{< ui >}}Delegations{{< /ui >}} tab, add the Claude SAML application as a caller.
    1. On the {{< ui >}}Resource connections{{< /ui >}} tab, add a resource connection. Select {{< ui >}}Application{{< /ui >}} as the resource type, then select the Okta application for Datadog.
    1. Set {{< ui >}}Client ID at resource{{< /ui >}} to the Claude client ID from [{{< ui >}}Supported agents{{< /ui >}}](#copy-the-agent-client-id), and {{< ui >}}Scope Condition{{< /ui >}} to {{< ui >}}Allow all{{< /ui >}}, the only supported value.
    1. Activate the agent from the {{< ui >}}Actions{{< /ui >}} menu.

1. **Add the Okta issuer URL to Datadog.** See [Add trusted issuers](#add-trusted-issuers).

1. **Add Datadog as a connector in Claude.** In Claude, click the {{< ui >}}\+{{< /ui >}} icon at the bottom of any prompt, then click {{< ui >}}Add Connector{{< /ui >}}. Find **Datadog** in the directory, enable the connector, and complete the sign-in flow. Use the Datadog connector from the directory, not a custom connector.

#### Scopes

Set {{< ui >}}Scope Condition{{< /ui >}} to {{< ui >}}Allow all{{< /ui >}}. Okta does not filter scopes: with {{< ui >}}Allow all{{< /ui >}}, Okta copies whatever Claude requests into the token, and Datadog decides what to grant. See [Control scopes in Datadog](#control-scopes-in-datadog).

<div class="alert alert-warning">Do not enter a list of scopes in Okta. Okta rejects any token request that contains a scope outside the list. The integration then fails with an error instead of falling back to narrower access.</div>

#### Troubleshooting

- If token exchange fails while every value looks correct, confirm that Anthropic's public key is on the AI Agent's {{< ui >}}Credentials{{< /ui >}} tab. Okta issues no token until the key is in place, and this is the most common cause of a failed first setup.
- If Okta rejects the token request with a scope error, confirm that {{< ui >}}Scope Condition{{< /ui >}} is set to {{< ui >}}Allow all{{< /ui >}} rather than a list of scopes.
- If the agent is not activated, confirm that the AI Agent has an owner assigned. Okta does not allow activation without one.
- Saving the issuer URL in Datadog does not confirm that the connection works. Complete [Verify the configuration](#verify-the-configuration) before you roll the setup out.

[2]: https://help.okta.com/oie/en-us/content/topics/apps/apps-cross-app-access.htm

{{% /tab %}}

{{% tab "Claude" %}}

Use Claude as the issuer (Claude Auto-Connect) when you manage the Datadog connector centrally in Claude. See [Authorize MCP connectors for your entire organization][1] in the Claude Help Center for Claude's side of the setup.

#### Values you exchange

| Value                     | Direction         | Where you enter it                                                                                                                  |
| ------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Datadog organization UUID | Datadog to Claude | Datadog connector, {{< ui >}}Managed authorization{{< /ui >}} > {{< ui >}}Claude-issued{{< /ui >}} > {{< ui >}}Tenant ID{{< /ui >}} |
| Claude issuer URL         | Claude to Datadog | {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Cross-App Access{{< /ui >}} > {{< ui >}}Issuer URLs{{< /ui >}}               |

Claude does not need the agent client ID.

#### Issuer URL

Enter the {{< ui >}}Issuer URL{{< /ui >}} shown in the Datadog connector in Claude, under {{< ui >}}Managed authorization{{< /ui >}} > {{< ui >}}Claude-issued{{< /ui >}}. It uses the host `claude.ai` or `identity.anthropic.com`, followed by the path for your Claude organization. Copy it exactly as Claude shows it.

#### Configure Claude

Complete the following steps in Claude as an admin.

1. In Claude, navigate to [{{< ui >}}Organization settings{{< /ui >}} > {{< ui >}}Connectors{{< /ui >}}][2] and select **Datadog**.
1. On the {{< ui >}}Configuration{{< /ui >}} tab, click {{< ui >}}Set up{{< /ui >}} next to {{< ui >}}Managed authorization{{< /ui >}}.
1. In the {{< ui >}}Connect{{< /ui >}} step, under {{< ui >}}Identity source{{< /ui >}}, select {{< ui >}}Claude-issued{{< /ui >}}.
1. In the {{< ui >}}Tenant ID{{< /ui >}} field, enter your [Datadog organization UUID](#copy-your-organization-uuid).
1. Copy the {{< ui >}}Issuer URL{{< /ui >}} shown under {{< ui >}}Claude-issued{{< /ui >}}, then add it to the {{< ui >}}Issuer URLs{{< /ui >}} list in Datadog. See [Add trusted issuers](#add-trusted-issuers).
1. Click {{< ui >}}Run test{{< /ui >}} and confirm that every step passes.
1. In the {{< ui >}}Roles{{< /ui >}} step, select who receives the Datadog connector. To pilot with one team, select only that team's custom role and leave the built-in roles cleared.
1. In the {{< ui >}}Scopes{{< /ui >}} step, select the Datadog scopes Claude can request.
1. Click {{< ui >}}Save & turn on{{< /ui >}}.

Users in the selected roles receive the Datadog connector the first time they sign in to Claude.

#### Scopes

The scopes you select in Claude's {{< ui >}}Scopes{{< /ui >}} step limit what Claude requests. Datadog then grants only the requested scopes that are also allowed in Datadog, and drops any other requested scope without failing the request. See [Control scopes in Datadog](#control-scopes-in-datadog).

#### Troubleshooting

If a request fails with a user resolution error, confirm the user's email address in Claude matches their Datadog user handle.

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
| Custom issuer URL         | Issuer to Datadog | {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Cross-App Access{{< /ui >}} > {{< ui >}}Issuer URLs{{< /ui >}} |

#### Issuer URL

Enter the `issuer` value from your issuer's `/.well-known/openid-configuration` document, character for character, including any path or trailing slash.

Datadog rejects hostnames that belong to Datadog, internal-only names such as `.internal` or `.local`, and shared issuers that many unrelated tenants sign with, such as `https://accounts.google.com`.

#### How the agent gets the token

The agent requests an ID-JAG from your issuer with OAuth 2.0 Token Exchange ([RFC 8693][2]), asking for the token type `urn:ietf:params:oauth:token-type:id-jag`. The agent then presents the ID-JAG to Datadog with the JWT bearer grant ([RFC 7523][3]). Configure your issuer and the agent for this exchange as described in their documentation.

#### Token requirements

Configure your issuer to issue ID-JAGs for Datadog that meet these requirements:

- **Discovery**: The issuer publishes `/.well-known/openid-configuration` under the issuer URL. Its `issuer` value matches the issuer URL you added in Datadog, and its `jwks_uri` is on the same host as the issuer. Datadog must be able to reach both over the public internet. Publish a signing key at the `jwks_uri` before you sign any token with it.
- **Signature**: The token's `typ` header is `oauth-id-jag+jwt`. The issuer signs the token with an asymmetric algorithm (RSA with a 2048-bit to 4096-bit key, ECDSA, or EdDSA) using a key it publishes at the `jwks_uri`. Include a `kid` header that matches the key.
- **Audience**: The `aud` claim is the Datadog authorization server URL for your Datadog site, {{< region-param key="mcp_xaa_issuer_url" code="true" >}}, and `aud_tenant` is your [Datadog organization UUID](#copy-your-organization-uuid).
- **Client**: The `client_id` claim is the agent client ID from the [{{< ui >}}Supported agents{{< /ui >}}](#copy-the-agent-client-id) table.
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
- If the user isn't found, confirm `nameid` matches the user's Datadog handle exactly.

[2]: https://datatracker.ietf.org/doc/html/rfc8693
[3]: https://datatracker.ietf.org/doc/html/rfc7523

{{% /tab %}}
{{< /tabs >}}

## Control scopes in Datadog

Datadog is the enforcement point for scopes, whichever issuer you use. A scope that is not allowed in Datadog is never granted, regardless of what the token requests.

To set the scopes Claude is allowed in Datadog:

1. Navigate to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Mobile and Third-Party Access{{< /ui >}}][2]. You can also click {{< ui >}}Manage App{{< /ui >}} next to Claude in the {{< ui >}}Supported agents{{< /ui >}} table on the Cross-App Access page.
2. Select the Claude application, then select the {{< ui >}}Scopes{{< /ui >}} tab.
3. Use the {{< ui >}}Allowed{{< /ui >}} checkbox for each scope to control what Claude reaches.
4. Click {{< ui >}}Enable{{< /ui >}} to save.

**Note**: Adding or removing a scope affects every user in your organization, and removing a scope revokes existing authorizations that rely on it. See [Application Scope Management][3].

## Verify the configuration

Saving an issuer URL does not confirm that the connection works. Verify the setup before you roll it out.

If you use Claude as the issuer, click {{< ui >}}Run test{{< /ui >}} in the Datadog connector's {{< ui >}}Managed authorization{{< /ui >}} setup and confirm that every check passes. The Okta and custom issuer paths have no equivalent test, so verify those with a live request.

Sign in to Claude as a user who meets the prerequisites for your issuer, then run a request that calls Datadog. A successful call confirms the full path: the issuer mints the token, Datadog accepts it, and Datadog resolves the user.

If a user signed in before you enabled Cross-App Access, have them sign out of Claude and sign back in. Sessions established earlier lack the identity token the agent needs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/cross-app-access
[2]: https://app.datadoghq.com/organization-settings/oauth-applications
[3]: /account_management/org_settings/mobile_third_party_access/#application-scope-management
