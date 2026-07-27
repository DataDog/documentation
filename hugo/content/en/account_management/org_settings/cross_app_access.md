---
title: Cross-App Access
description: Configure Okta Cross-App Access so AI agents can call the Datadog API on behalf of users authorized in Okta.
algolia:
  tags: ["cross-app access", "XAA", "Okta", "AI agent", "MCP", "ID-JAG"]
further_reading:
    - link: '/account_management/org_settings/mobile_third_party_access/'
      tag: 'Documentation'
      text: 'Mobile and Third-Party Access'
    - link: '/account_management/saml/'
      tag: 'Documentation'
      text: 'Configure SAML single sign-on'
    - link: '/mcp_server/'
      tag: 'Documentation'
      text: 'Datadog MCP Server'
---

<div class="alert alert-info">Cross-App Access is in Preview.</div>

## Overview

Cross-App Access (XAA) lets AI agents call the Datadog API on behalf of users your organization already authorized in Okta. Without it, every user authorizes each agent individually through a browser consent screen. With it, your Okta administrator grants that access once, centrally, and users skip the per-user consent step.

Okta issues each agent a short-lived token called an ID-JAG (Identity Assertion Authorization Grant). The agent presents this token to Datadog, and Datadog exchanges it for an access token scoped to the user Okta named. Because Okta mints the token, your administrators control which agents reach Datadog and revoke that access from Okta.

Cross-App Access supports Okta as the identity provider.

## How it works

1. A user signs in to the agent through Okta single sign-on.
2. The agent requests an ID-JAG from Okta for the user.
3. The agent presents the ID-JAG to Datadog.
4. Datadog verifies the token signature against your Okta tenant, confirms the token targets your organization, and resolves the Okta user to a Datadog user.
5. Datadog issues an access token, and the agent calls the Datadog API with it.

Access tokens issued through this flow are short-lived. After one expires, the agent returns to Okta for a new token, which keeps Okta the central place to control agent access.

## Values you exchange

Setup moves values in both directions between Datadog and Okta. Two of them are issuer URLs that name different systems, so confirm you enter each one in the correct place.

| Value | Direction | Where you enter it |
|-------|-----------|--------------------|
| Public Org ID | Datadog to Okta | Datadog application in Okta, **Resource Server** tab, **Audience/tenant ID** |
| Agent client IDs | Datadog to Okta | Okta AI Agent, **Resource Connection**, **Client ID at resource** |
| Datadog resource URL and issuer URL | Datadog to Okta | Datadog application in Okta, **Resource Server** tab, **Resource URL** and **Issuer URL** |
| Okta tenant issuer URL | Okta to Datadog | Datadog, **Cross-App Access** page, **Okta issuer URL** |

## Prerequisites

Your organization uses Okta for SAML single sign-on to Datadog. Cross-App Access resolves users through your existing SAML connection, so it does not work without one. See [Configure SAML single sign-on][1].

The SAML application's **Name ID format** is set to `EmailAddress`, and the Name ID matches the user's Datadog handle. Datadog maps the Name ID in the token to a Datadog user handle. When these differ, token exchange fails for that user even though every other check passes.

Each user who uses an agent exists in your Datadog organization and is assigned to both the agent's Okta application and the Datadog application in Okta.

You have the `org_management` permission in Datadog. See [Role permissions][2].

Your Okta tenant has the **AI Agent Identity Assertion** and **Agent to Agent Connections** Early Access features enabled, and you have Okta Super Administrator access.

You completed the agent vendor's own onboarding, which includes exchanging a public key for your Okta AI Agent. For Claude, see the [Okta Cross-App Access beta participation guide][3].

## Configure Cross-App Access in Datadog

Complete the Datadog steps before the Okta steps. Datadog rejects tokens for organizations that have not enabled Cross-App Access, so configuring Okta first produces failures until you finish here.

1. Navigate to [**Organization Settings > Cross-App Access**][4].
2. Click **Enable**. This applies to your whole organization.
3. In **Okta issuer URL**, enter the issuer URL for your Okta tenant, for example `https://<YOUR_OKTA_SUBDOMAIN>.okta.com`. Click **Save**.
4. Copy the **Public Org ID**. You enter this in Okta.
5. Copy the client ID for each agent listed under **Registered client IDs**. You enter these in Okta.

{{< img src="account_management/cross_app_access/cross-app-access-settings.png" alt="The Cross-App Access page in Datadog organization settings, showing the enablement status, the Okta issuer URL field, the Public Org ID, and a table of registered client IDs for Claude and Cursor" style="width:100%;" >}}

Datadog derives the token signing keys location from the Okta issuer URL, so the value must be exact:

- Use `https`.
- Enter the bare host with no path, port, query string, fragment, username, or password.
- Use a subdomain of `.okta.com`, `.oktapreview.com`, or `.okta-emea.com`. Datadog rejects the apex domain, so `example.okta.com` works and `okta.com` does not.

Clearing the field and saving removes the issuer and stops Datadog from accepting tokens.

## Control what an agent can do

Scope each agent in Datadog rather than in Okta. Okta accepts scopes as free text, which makes values hard to discover and hard to keep consistent across agents. Datadog treats scopes as a defined catalog tied to the agent's OAuth client, so the same control applies to Cross-App Access and to standard OAuth authorizations.

To set the scopes an agent is allowed:

1. On the **Cross-App Access** page, click **Manage app** next to the agent. This opens its OAuth client on the [Mobile and Third-Party Access][5] page.
2. Select the **Scopes** tab.
3. Use the **Allowed** checkbox for each scope to control what the agent reaches.
4. Click **Enable** to save.

Adding or removing a scope affects every user in your organization, and removing a scope revokes existing authorizations that rely on it. See [Application Scope Management][6].

When Okta sends scopes in a token, Datadog grants the intersection of those scopes and the scopes allowed for that agent's OAuth client. Scopes set in Okta narrow what an agent reaches within what Datadog allows, and they do not widen it. An agent receives no access to a scope that is not allowed in Datadog, whatever the token requests.

## Finish the setup in Okta

Perform these steps in the Okta Admin Console as a Super Administrator. For the full agent-side procedure, including the public key exchange, see the [Okta Cross-App Access beta participation guide][3].

### Enable Cross-App Access on the Datadog application

1. Go to **Applications** and select your Datadog application.
2. Open the **Resource Server** tab.
3. Under **Access methods**, select **Cross-app access (XAA)**, then click **Edit**.
4. Select **Enable**.
5. In **Resource URL**, enter the resource URL for your Datadog site from the table below.
6. In **Issuer URL**, enter the issuer URL for your Datadog site from the table below.
7. In **Audience/tenant ID**, enter the **Public Org ID** you copied from Datadog.
8. Click **Save**.

| Datadog site | Resource URL | Issuer URL |
|--------------|--------------|------------|
| US1 | `https://mcp.datadoghq.com` | `https://mcp.datadoghq.com/v1/mcp` |
| US3 | `https://mcp.us3.datadoghq.com` | `https://mcp.us3.datadoghq.com/v1/mcp` |
| US5 | `https://mcp.us5.datadoghq.com` | `https://mcp.us5.datadoghq.com/v1/mcp` |
| EU1 | `https://mcp.datadoghq.eu` | `https://mcp.datadoghq.eu/v1/mcp` |
| AP1 | `https://mcp.ap1.datadoghq.com` | `https://mcp.ap1.datadoghq.com/v1/mcp` |
| AP2 | `https://mcp.ap2.datadoghq.com` | `https://mcp.ap2.datadoghq.com/v1/mcp` |

The issuer URL identifies the Datadog authorization server, not the token endpoint. Okta writes it into the `aud` claim of the tokens it issues, and Datadog accepts a token only when that claim matches. **Audience/tenant ID** carries your Public Org ID, which tells Datadog which organization the token targets when several organizations share one Okta tenant.

**Note**: Changing the issuer URL later requires deleting and recreating the Resource Connection described below.

### Confirm the SAML Name ID format

Skip this step for applications installed from the Okta Integration Network.

1. On the Datadog application, open the **Sign On** tab and confirm **Application username format** is Okta username, Email Address, or a custom value that supplies the user's email.
2. Open **General > SAML Settings** and confirm **Name ID Format** is `EmailAddress`.
3. If it differs, click **Edit**, set **Name ID Format** to `EmailAddress`, then click **Next** and **Finish**.

### Register the AI agent

1. Go to **Directory > AI Agents**.
2. Click **Register AI Agent**, then **Register Manually**.
3. Name the agent, for example `Claude (Requester App)`, and assign an owner.
4. Open the **Credentials** tab, copy the **AI Agent ID**, and send it to the agent vendor. Add the public key they return.

### Add the delegated caller

1. On the AI Agent, go to **Delegations** and click **Add Caller**.
2. Select the agent's SAML application, for example Claude, as a Requester.
3. Click **Add Caller**.

### Add the resource connection

1. Click **Add Resource Connection**, then **Application**.
2. Select your Datadog application.
3. In **Client ID at resource**, enter the Datadog client ID for this agent, which you copied from the **Registered client IDs** table.
4. Under **Scope Condition**, select **Allow all**, and control scopes from Datadog as described in [Control what an agent can do](#control-what-an-agent-can-do).

Repeat these steps for each agent, using that agent's own client ID.

### Activate the agent

Confirm the configuration checkmarks are green, then go to **Actions > Activate**.

## Enable the connector in the agent

Complete the setup in the agent's own administration console. The steps below apply to Claude. For other agents, see that vendor's documentation.

1. Go to **Settings > Connectors** in the Claude admin console.
2. Click **Add**, select **Custom**, then select **Web**.
3. Enter the Datadog MCP server URL: `https://mcp.datadoghq.com`.
4. Open **Advanced** and turn on **Enterprise managed authentication**.
5. Click **Save**.
6. Open the connector details and click **Test connection**.

The connection test reports each stage of the exchange separately, which narrows down where a failed setup breaks. See the troubleshooting table below.

## Verify the configuration

Sign in to the agent as a user assigned to both Okta applications, then run a request that calls Datadog. A successful call confirms the full path: Okta issues the token, Datadog accepts it, and Datadog resolves the user.

If a user signed in before you enabled Cross-App Access, have them sign out of the agent and sign back in through Okta. Sessions established earlier lack the identity token the agent needs.

## Troubleshooting

| Symptom | Cause |
|---------|-------|
| Token exchange fails for every user | Cross-App Access is disabled in Datadog, or the **Okta issuer URL** does not match the issuer in the token. |
| Datadog cannot identify the organization | The resource tenant identifier in Okta does not match your **Public Org ID**. |
| Signature verification fails | The **Okta issuer URL** points to a different Okta tenant than the one issuing tokens. |
| Token exchange fails for one agent but works for another | The **Client ID at resource** in that agent's Resource Connection does not match the client ID Datadog lists for it. |
| Token exchange fails after the token passes signature checks | The SAML issuer in the token does not match a SAML connection configured on your organization. |
| Token exchange fails for some users only | The Name ID for those users does not match their Datadog handle, or they do not exist in the Datadog organization. |
| Datadog rejects the issuer URL when saving | The value includes a path, port, query string, or fragment, uses `http`, or is not a subdomain of an accepted Okta domain. |
| The agent connects but cannot reach some data | The scope is not allowed for that agent's OAuth client in Datadog, or the scopes set in Okta exclude it. Access is the intersection of both. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/saml/
[2]: /account_management/rbac/permissions/
[3]: https://support.okta.com/help/s/article/claude-enterprise-managed-auth-with-okta-cross-app-access-xaa-beta-participation-guide
[4]: https://app.datadoghq.com/organization-settings/cross-app-access
[5]: /account_management/org_settings/mobile_third_party_access/
[6]: /account_management/org_settings/mobile_third_party_access/#application-scope-management
