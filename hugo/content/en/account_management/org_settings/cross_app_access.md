---
title: Cross-App Access
description: Configure Cross-App Access so AI agents can call the Datadog API on behalf of users your organization authorized in Okta, Claude, or another OIDC identity provider.
algolia:
  tags: ["cross-app access", "XAA", "Okta", "Claude", "Anthropic", "OIDC", "AI agent", "MCP", "ID-JAG"]
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
---

## Overview

Cross-App Access (XAA) lets AI agents call the Datadog API on behalf of users your organization already authorized. Without it, every user authorizes the agent individually through a browser consent screen. With it, an administrator grants that access once, centrally, and users skip the per-user consent step.

A trusted issuer gives the agent a short-lived token called an ID-JAG (Identity Assertion JWT Authorization Grant). The agent presents this token to Datadog, and Datadog exchanges it for an access token owned by the user who initiated the call. Datadog accepts ID-JAGs from Okta, Claude, and any other OIDC-compliant identity provider that issues them.

Claude is the only agent that Cross-App Access supports, and it works with any of these issuers. Claude can play two separate roles. As the agent, Claude calls the Datadog API on behalf of the user. With Claude Auto-Connect, Claude is also the issuer and mints the ID-JAG that it presents to Datadog. You can trust more than one issuer.

## Prerequisites

For every issuer:

- You have the `org_management` permission in Datadog.
- Each user who uses Claude exists in your Datadog organization.
- Your organization is on a Claude Team or Enterprise plan.

Each issuer has additional prerequisites. See [Set up your issuer](#set-up-your-issuer).

## Configure Cross-App Access in Datadog

Enable Cross-App Access in Datadog before you configure the issuer. Datadog rejects tokens for organizations that have not enabled Cross-App Access.

Navigate to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Cross-App Access{{< /ui >}}][1].

{{< img src="account_management/cross_app_access/cross-app-access-settings.png" alt="Cross-App Access settings page showing the enablement status, Issuer URLs list, Org UUID, and Supported agents table." style="width:100%;">}}

### Enable Cross-App Access

Click {{< ui >}}Enable{{< /ui >}}. This applies to your whole organization. Click {{< ui >}}Disable{{< /ui >}} to turn Cross-App Access off later.

### Add trusted issuers

Datadog accepts ID-JAGs only from the issuers in the {{< ui >}}Issuer URLs{{< /ui >}} list. Add one entry for each issuer you use. Each issuer's tab in [Set up your issuer](#set-up-your-issuer) shows which URL to enter.

Every issuer URL must use `https` and a fully qualified, lowercase domain name, and must not contain an IP address, port, user name, query, or fragment. Datadog accepts a token only when its `iss` claim matches the issuer URL exactly.

### Remove trusted issuers

To stop trusting an issuer, remove it from the {{< ui >}}Issuer URLs{{< /ui >}} list. Datadog stops accepting new ID-JAGs from the issuer. Access tokens that Datadog already issued stay valid until they expire. To cut off access immediately, revoke the user's access to the application in [Mobile and Third-Party Access][2].

### Copy your organization UUID

Copy the value in the {{< ui >}}Org UUID{{< /ui >}} field. The issuer sends this value as the `aud_tenant` claim, which tells Datadog which organization a token targets when several organizations share one issuer.

### Copy the agent client ID

The {{< ui >}}Supported agents{{< /ui >}} table lists every agent Datadog supports for Cross-App Access and the OAuth client ID each one uses. Some issuers need this client ID; the issuer's tab in [Set up your issuer](#set-up-your-issuer) says whether yours does.

Datadog adds agents to this table as it supports them, so check the table rather than reusing a client ID from another source.

Click {{< ui >}}Manage App{{< /ui >}} on a row to open the scope settings for that agent. See [Control scopes in Datadog](#control-scopes-in-datadog).

## Set up your issuer

Select the issuer you use. If you trust more than one issuer, complete the setup for each.

{{< tabs >}}
{{% tab "Okta" %}}

#### Prerequisites

- Your organization uses Okta for SAML single sign-on to Datadog. The Okta issuer resolves users through your existing SAML connection, so it does not work without one. See [Configure SAML single sign-on][1].
- Each user is assigned to both the Claude application and the Datadog application in Okta.
- Your Okta tenant has the {{< ui >}}AI Agent Identity Assertion{{< /ui >}} and {{< ui >}}Agent to Agent Connections{{< /ui >}} features enabled, and you have Okta Super Administrator access.

#### Values you exchange

| Value                     | Direction       | Where you enter it |
| ------------------------- | --------------- | ------------------ |
| Datadog organization UUID | Datadog to Okta | Datadog application, {{< ui >}}Machine Assignments{{< /ui >}} tab > {{< ui >}}Audience/tenant ID{{< /ui >}} |
| Agent client ID           | Datadog to Okta | AI Agent, {{< ui >}}Resource connections{{< /ui >}} > {{< ui >}}Client ID at resource{{< /ui >}} |
| Okta issuer URL           | Okta to Datadog | {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Cross-App Access{{< /ui >}} > {{< ui >}}Issuer URLs{{< /ui >}} |

The Datadog organization UUID is not the same as the company ID that Okta asks for elsewhere.

#### Issuer URL

Enter the issuer URL of your own Okta tenant, for example `https://<YOUR_OKTA_SUBDOMAIN>.okta.com`.

- The URL must contain only a scheme and a host, with no path or trailing slash.
- The host must be a subdomain of `.okta.com`, `.oktapreview.com`, or `.okta-emea.com`. Datadog rejects the apex domain, so `example.okta.com` works and `okta.com` does not work.
- Okta custom authorization servers, whose issuer URLs contain a path such as `/oauth2/default`, are not supported.
- If your Okta org issues tokens from a custom domain, follow the **Custom OIDC provider** tab instead.

#### Configure Okta

Complete the following steps in the Okta Admin Console as a Super Administrator. See [Okta's Cross-App Access documentation][2] for more details.

1. **Configure the Datadog application as a resource server.** On your Datadog application, open the {{< ui >}}Machine Assignments{{< /ui >}} tab, select the {{< ui >}}Callers{{< /ui >}} tile, and click {{< ui >}}Edit{{< /ui >}} next to {{< ui >}}Cross App Access (XAA){{< /ui >}}. Enable XAA, then set {{< ui >}}Audience/tenant ID{{< /ui >}} to your [Datadog organization UUID](#copy-your-organization-uuid).

1. **Register Claude as an AI Agent.** Anthropic signs the requests Okta receives, so Okta needs Anthropic's public key before it issues any token. This exchange is manual, so start it early.
   1. Create the AI Agent entry for Claude.
   1. Assign owners to the agent. Okta requires an owner before you can activate it.
   1. Send the AI Agent ID that Okta generates to Anthropic.
   1. Add the public key that Anthropic returns to the AI Agent entry, on the {{< ui >}}Credentials{{< /ui >}} tab.

   Until the public key is in place, token exchange fails even though every other value is correct.

1. **Connect Claude to the Datadog application.**
   1. On the Claude AI Agent's {{< ui >}}Delegations{{< /ui >}} tab, add the Claude SAML application as a caller.
   1. On the {{< ui >}}Resource connections{{< /ui >}} tab, add a resource connection. Select {{< ui >}}Application{{< /ui >}} as the resource type, then select your Datadog application.
   1. Set {{< ui >}}Client ID at resource{{< /ui >}} to the Claude client ID from [{{< ui >}}Supported agents{{< /ui >}}](#copy-the-agent-client-id), and {{< ui >}}Scope Condition{{< /ui >}} to {{< ui >}}Allow all{{< /ui >}}, the only supported value.
   1. Activate the agent from the {{< ui >}}Actions{{< /ui >}} menu.

1. **Add the Okta issuer URL to Datadog.** See [Add trusted issuers](#add-trusted-issuers).

1. **Add Datadog as a connector in Claude.** In Claude, click the {{< ui >}}\+{{< /ui >}} icon at the bottom of any prompt, then click {{< ui >}}Add Connector{{< /ui >}}. Find **Datadog** in the directory, enable the connector, and complete the sign-in flow. Use the Datadog connector from the directory, not a custom connector.

#### Scopes

Set {{< ui >}}Scope Condition{{< /ui >}} to {{< ui >}}Allow all{{< /ui >}}. Okta does not filter scopes: with {{< ui >}}Allow all{{< /ui >}}, Okta copies whatever Claude requests into the token, and Datadog decides what to grant. See [Control scopes in Datadog](#control-scopes-in-datadog).

<div class="alert alert-warning">Do not enter a list of scopes in Okta. Okta rejects any token request that contains a scope outside the list, so the integration fails with an error instead of falling back to narrower access.</div>

[1]: /account_management/saml/
[2]: https://help.okta.com/oie/en-us/content/topics/apps/apps-cross-app-access.htm

{{% /tab %}}

{{% tab "Claude" %}}

#### Prerequisites

- You are an admin on your organization's Claude plan, with access to set up managed authorization.
- Each user's email address in Claude matches the email address provisioned for their Datadog user (their Datadog user handle). Datadog matches users on this value, so a user whose addresses differ cannot connect.

#### Values you exchange

| Value                     | Direction         | Where you enter it |
| ------------------------- | ----------------- | ------------------ |
| Datadog organization UUID | Datadog to Claude | Datadog connector, {{< ui >}}Managed authorization{{< /ui >}} > {{< ui >}}Claude-issued{{< /ui >}} > {{< ui >}}Tenant ID{{< /ui >}} |
| Claude issuer URL         | Claude to Datadog | {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Cross-App Access{{< /ui >}} > {{< ui >}}Issuer URLs{{< /ui >}} |

Claude does not need the agent client ID.

#### Issuer URL

Enter the {{< ui >}}Issuer URL{{< /ui >}} shown in the Datadog connector in Claude, under {{< ui >}}Managed authorization{{< /ui >}} > {{< ui >}}Claude-issued{{< /ui >}}. It uses the host `claude.ai` or `identity.anthropic.com`, followed by the path for your Claude organization. Copy it exactly as Claude shows it.

#### Configure Claude

Complete the following steps in Claude as an admin. See [Authorize MCP connectors for your entire organization][1] in the Claude Help Center for more details.

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

{{% tab "Custom OIDC provider" %}}

You can use any OIDC-compliant identity provider that issues ID-JAGs, including an Okta org on a custom domain.

#### Prerequisites

- Your organization uses SAML single sign-on to Datadog. Datadog resolves users through the SAML identity in the token, so a custom provider does not work without it. See [Configure SAML single sign-on][1].
- Your provider can issue ID-JAGs that meet the token requirements below.

#### Values you exchange

| Value                     | Direction           | Where you enter it |
| ------------------------- | ------------------- | ------------------ |
| Datadog organization UUID | Datadog to provider | The `aud_tenant` claim of the ID-JAG |
| Agent client ID           | Datadog to provider | The `client_id` claim of the ID-JAG |
| Provider issuer URL       | Provider to Datadog | {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Cross-App Access{{< /ui >}} > {{< ui >}}Issuer URLs{{< /ui >}} |

#### Issuer URL

Enter the `issuer` value from your provider's `/.well-known/openid-configuration` document, character for character, including any path or trailing slash.

Datadog rejects hostnames that belong to Datadog, internal-only names such as `.internal` or `.local`, and shared issuers that many unrelated tenants sign with, such as `https://accounts.google.com`.

#### Token requirements

Configure your provider to issue ID-JAGs for Datadog that meet these requirements:

- **Discovery**: The provider publishes `/.well-known/openid-configuration` under the issuer URL. Its `issuer` value matches the issuer URL you added in Datadog, and its `jwks_uri` is on the same host as the issuer. Datadog must be able to reach both over the public internet.
- **Signature**: The token's `typ` header is `oauth-id-jag+jwt`, and it is signed with an asymmetric algorithm (RSA with a 2048-bit to 4096-bit key, ECDSA, or EdDSA) using a key published at the `jwks_uri`.
- **Audience**: The `aud` claim is the Datadog authorization server URL for your Datadog site, {{< region-param key="mcp_xaa_issuer_url" code="true" >}}, and `aud_tenant` is your [Datadog organization UUID](#copy-your-organization-uuid).
- **Client**: The `client_id` claim is the agent client ID from the [{{< ui >}}Supported agents{{< /ui >}}](#copy-the-agent-client-id) table.
- **User**: The `sub_id` claim identifies the user by their SAML assertion, with `format` set to `saml-nameid`, `nameid` set to the user's Datadog handle, `nameid_format` set, and `issuer` set to the entity ID of the SAML identity provider configured for your Datadog organization.
- **Lifetime**: The token carries `exp`, `iat`, and a unique `jti`. Datadog rejects a `jti` it has already seen.

#### Troubleshooting

- If the token's SAML `issuer` is rejected, confirm it matches the identity provider configured in your Datadog organization's SAML settings exactly. One identity provider tenant can host several Datadog applications, each with its own entity ID.
- If the user isn't found, confirm `nameid` matches the user's Datadog handle exactly.

[1]: /account_management/saml/

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

Sign in to Claude as a user who meets the prerequisites for your issuer, then run a request that calls Datadog. A successful call confirms the full path: the issuer mints the token, Datadog accepts it, and Datadog resolves the user.

If a user signed in before you enabled Cross-App Access, have them sign out of Claude and sign back in. Sessions established earlier lack the identity token the agent needs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/cross-app-access
[2]: https://app.datadoghq.com/organization-settings/oauth-applications
[3]: /account_management/org_settings/mobile_third_party_access/#application-scope-management
