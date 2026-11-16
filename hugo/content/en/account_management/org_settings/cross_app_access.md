---
title: Cross-App Access
description: Configure Cross-App Access so AI agents can call the Datadog API on behalf of users your organization authorized in Okta or Claude.
algolia:
  tags: ["cross-app access", "XAA", "Okta", "Claude", "Anthropic", "AI agent", "MCP", "ID-JAG"]
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

A trusted issuer gives the agent a short-lived token called an ID-JAG (Identity Assertion JWT Authorization Grant). The agent presents this token to Datadog, and Datadog exchanges it for an access token owned by the user who initiated the call. Datadog accepts ID-JAGs from two issuers: Okta and Claude.

Claude is the only agent that Cross-App Access supports, and it works with both issuers. Claude can play two separate roles. As the agent, Claude calls the Datadog API on behalf of the user. With Claude Auto-Connect, Claude is also the issuer and mints the ID-JAG that it presents to Datadog. You can trust one issuer or both.

## Values you exchange

Setup moves values in both directions between Datadog and the issuer. Confirm that you enter each one in the correct place. Use the table for the issuer you set up.

### Okta issuer

| Value                               | Direction         | Where you enter it |
| ----------------------------------- | ----------------- | ------------------ |
| Datadog organization UUID           | Datadog to Okta   | Datadog application, {{< ui >}}Machine Assignments{{< /ui >}} tab > {{< ui >}}Audience/tenant ID{{< /ui >}} |
| Agent client ID                     | Datadog to Okta   | AI Agent, {{< ui >}}Resource connections{{< /ui >}} > {{< ui >}}Client ID at resource{{< /ui >}} |
| Okta issuer URL                     | Okta to Datadog   | {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Cross-App Access{{< /ui >}} > {{< ui >}}Issuer URLs{{< /ui >}} |

### Claude issuer

| Value                     | Direction           | Where you enter it |
| ------------------------- | ------------------- | ------------------ |
| Datadog organization UUID | Datadog to Claude   | Datadog connector, {{< ui >}}Managed authorization{{< /ui >}} > {{< ui >}}Claude-issued{{< /ui >}} > {{< ui >}}Tenant ID{{< /ui >}} |
| Claude issuer URL         | Claude to Datadog   | {{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Cross-App Access{{< /ui >}} > {{< ui >}}Issuer URLs{{< /ui >}} |

## Prerequisites

For every issuer:

- You have the `org_management` permission in Datadog.
- Each user who uses Claude exists in your Datadog organization.
- Your organization is on a Claude Team or Enterprise plan.

For the Okta issuer:

- Your organization uses Okta for SAML single sign-on to Datadog. The Okta issuer resolves users through your existing SAML connection, so it does not work without one. See [Configure SAML single sign-on][1].
- Each user is assigned to both the Claude application and the Datadog application in Okta.
- Your Okta tenant has the {{< ui >}}AI Agent Identity Assertion{{< /ui >}} and {{< ui >}}Agent to Agent Connections{{< /ui >}} features enabled, and you have Okta Super Administrator access.

For the Claude issuer:

- You are an admin on your organization's Claude plan, with access to set up managed authorization.
- Each user's email address in Claude matches the email address provisioned for their Datadog user (their Datadog user handle). Datadog matches users on this value, so a user whose addresses differ cannot connect.

## Configure Cross-App Access in Datadog

Enable Cross-App Access in Datadog before you configure the issuer. Datadog rejects tokens for organizations that have not enabled Cross-App Access. If you use the Claude issuer, you add its issuer URL to Datadog during the Claude steps.

Navigate to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Cross-App Access{{< /ui >}}][2].

{{< img src="account_management/cross_app_access/cross-app-access-settings.png" alt="Cross-App Access settings page showing the enablement status, Issuer URLs list, Org UUID, and Supported agents table." style="width:100%;">}}

### Enable Cross-App Access

Click {{< ui >}}Enable{{< /ui >}}. This applies to your whole organization. Click {{< ui >}}Disable{{< /ui >}} to turn Cross-App Access off later.

### Add trusted issuers

Datadog accepts ID-JAGs only from the issuers in the {{< ui >}}Issuer URLs{{< /ui >}} list. Add one entry for each issuer you use.

| Issuer | Issuer URL to enter |
| ------ | ------------------- |
| Okta   | The issuer URL of your own Okta tenant, for example `https://<YOUR_OKTA_SUBDOMAIN>.okta.com`. See [Finish the setup for the Okta issuer](#finish-the-setup-for-the-okta-issuer). |
| Claude | The {{< ui >}}Issuer URL{{< /ui >}} shown in the Datadog connector in Claude, under {{< ui >}}Managed authorization{{< /ui >}} > {{< ui >}}Claude-issued{{< /ui >}}. See [Finish the setup for the Claude issuer](#finish-the-setup-for-the-claude-issuer). |

Every issuer URL must use `https` and must not contain a port, query, or fragment. Each issuer also has its own rules, and Datadog rejects a URL that breaks them:

- **Okta**: The URL must contain only a scheme and a host, with no path or trailing slash. The host must be a subdomain of `.okta.com`, `.oktapreview.com`, or `.okta-emea.com`. Datadog rejects the apex domain, so `example.okta.com` works and `okta.com` does not work.
- **Claude**: The URL must use the host `claude.ai` or `identity.anthropic.com`, followed by the path for your Claude organization. Datadog rejects subdomains of these hosts. Copy the URL exactly as Claude shows it.

### Remove trusted issuers

To stop trusting an issuer, remove it from the {{< ui >}}Issuer URLs{{< /ui >}} list. Datadog stops accepting new ID-JAGs from the issuer. Access tokens that Datadog already issued stay valid until they expire. To cut off access immediately, revoke the user's access to the application in [Mobile and Third-Party Access][6].

### Copy your organization UUID

Copy the value in the {{< ui >}}Org UUID{{< /ui >}} field. The issuer sends this value as the `aud_tenant` claim, which tells Datadog which organization a token targets when several organizations share one issuer. It is not the same as the company ID that Okta asks for elsewhere.

### Copy the agent client ID

The {{< ui >}}Supported agents{{< /ui >}} table lists every agent Datadog supports for Cross-App Access and the OAuth client ID each one uses. If you use the Okta issuer, copy the client ID for the agent you are setting up. The Claude issuer does not need it.

Datadog adds agents to this table as it supports them, so check the table rather than reusing a client ID from another source.

Click {{< ui >}}Manage App{{< /ui >}} on a row to open the scope settings for that agent. See [Control scopes in Datadog](#control-scopes-in-datadog).

## Finish the setup for the Claude issuer

If you use the Claude issuer, complete the following steps in Claude as an admin. See [Authorize MCP connectors for your entire organization][3] in the Claude Help Center for more details.

1. In Claude, navigate to [{{< ui >}}Organization settings{{< /ui >}} > {{< ui >}}Connectors{{< /ui >}}][4] and select **Datadog**.
2. On the {{< ui >}}Configuration{{< /ui >}} tab, click {{< ui >}}Set up{{< /ui >}} next to {{< ui >}}Managed authorization{{< /ui >}}.
3. In the {{< ui >}}Connect{{< /ui >}} step, under {{< ui >}}Identity source{{< /ui >}}, select {{< ui >}}Claude-issued{{< /ui >}}.
4. In the {{< ui >}}Tenant ID{{< /ui >}} field, enter the Datadog organization UUID you [copied from Datadog](#copy-your-organization-uuid). Claude does not need the agent client ID.
5. Copy the {{< ui >}}Issuer URL{{< /ui >}} shown under {{< ui >}}Claude-issued{{< /ui >}}, then add it to the {{< ui >}}Issuer URLs{{< /ui >}} list in Datadog. See [Add trusted issuers](#add-trusted-issuers).
6. Click {{< ui >}}Run test{{< /ui >}} and confirm that every step passes.
7. In the {{< ui >}}Roles{{< /ui >}} step, select who receives the Datadog connector. To pilot with one team, select only that team's custom role and leave the built-in roles cleared.
8. In the {{< ui >}}Scopes{{< /ui >}} step, select the Datadog scopes Claude can request. See [Control scopes in Datadog](#control-scopes-in-datadog).
9. Click {{< ui >}}Save & turn on{{< /ui >}}.

Users in the selected roles receive the Datadog connector the first time they sign in to Claude.

## Finish the setup for the Okta issuer

If you use the Okta issuer, complete the following steps in the Okta Admin Console as a Super Administrator. This section lists the values Datadog expects and the Okta fields they belong in. See [Okta's Cross-App Access documentation][5] for more details.

### Configure the Datadog application as a resource server

On your Datadog application, open the {{< ui >}}Machine Assignments{{< /ui >}} tab, select the {{< ui >}}Callers{{< /ui >}} tile, and click {{< ui >}}Edit{{< /ui >}} next to {{< ui >}}Cross App Access (XAA){{< /ui >}}. Enable XAA, then set {{< ui >}}Audience/tenant ID{{< /ui >}} to your Datadog organization UUID.

### Register Claude as an AI Agent

Create an AI Agent entry for Claude in Okta, then exchange keys with Anthropic. Anthropic signs the requests Okta receives, so Okta needs Anthropic's public key before it issues any token.

1. Create the AI Agent entry for Claude.
2. Assign owners to the agent. Okta requires an owner before you can activate it.
3. Send the AI Agent ID that Okta generates to Anthropic.
4. Add the public key that Anthropic returns to the AI Agent entry, on the {{< ui >}}Credentials{{< /ui >}} tab.

Until the public key is in place, token exchange fails even though every other value is correct. This exchange is manual, so start it early.

### Connect Claude to the Datadog application

On the Claude AI Agent, add the Claude SAML application as a delegated caller, then connect the agent to your Datadog application.

1. On the {{< ui >}}Delegations{{< /ui >}} tab, add the Claude SAML application as a caller.
2. On the {{< ui >}}Resource connections{{< /ui >}} tab, add a resource connection. Select {{< ui >}}Application{{< /ui >}} as the resource type, then select your Datadog application.
3. Set the following fields.

   | Okta field                | Value                                                                                                |
   | ------------------------- | ---------------------------------------------------------------------------------------------------- |
   | {{< ui >}}Client ID at resource{{< /ui >}} | The Claude client ID you copied from [{{< ui >}}Supported agents{{< /ui >}}](#copy-the-agent-client-id)          |
   | {{< ui >}}Scope Condition{{< /ui >}}       | {{< ui >}}Allow all{{< /ui >}}, the only supported value. See [Control scopes in Datadog](#control-scopes-in-datadog) |

4. Activate the agent from the {{< ui >}}Actions{{< /ui >}} menu.

### Add Datadog as a connector in Claude

1. In Claude, click the {{< ui >}}\+{{< /ui >}} icon at the bottom of any prompt, then click {{< ui >}}Add Connector{{< /ui >}}.
2. Find **Datadog** in the directory and enable the connector.
3. Complete the sign-in flow when prompted.

**Note**: Use the Datadog connector from the directory, not a custom connector.

## Control scopes in Datadog

Datadog is the enforcement point for scopes, whichever issuer you use. A scope that is not allowed in Datadog is never granted, regardless of what the token requests.

If you use Okta, set {{< ui >}}Scope Condition{{< /ui >}} to {{< ui >}}Allow all{{< /ui >}}. Okta does not filter scopes. With {{< ui >}}Allow all{{< /ui >}}, Okta copies whatever Claude requests into the token.

<div class="alert alert-warning">Do not enter a list of scopes in Okta. Okta rejects any token request that contains a scope outside the list, so the integration fails with an error instead of falling back to narrower access.</div>

If you use the Claude issuer, the scopes you select in Claude's {{< ui >}}Scopes{{< /ui >}} step limit what Claude requests. Datadog then grants only the requested scopes that are also allowed in Datadog. Datadog drops any other requested scope without failing the request.

To set the scopes Claude is allowed in Datadog:

1. Navigate to [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Mobile and Third-Party Access{{< /ui >}}][6]. You can also click {{< ui >}}Manage App{{< /ui >}} next to Claude in the {{< ui >}}Supported agents{{< /ui >}} table on the Cross-App Access page.
2. Select the Claude application, then select the {{< ui >}}Scopes{{< /ui >}} tab.
3. Use the {{< ui >}}Allowed{{< /ui >}} checkbox for each scope to control what Claude reaches.
4. Click {{< ui >}}Enable{{< /ui >}} to save.

**Note**: Adding or removing a scope affects every user in your organization, and removing a scope revokes existing authorizations that rely on it. See [Application Scope Management][7].

## Verify the configuration

Sign in to Claude as a user who meets the prerequisites for your issuer, then run a request that calls Datadog. A successful call confirms the full path: the issuer mints the token, Datadog accepts it, and Datadog resolves the user.

If a user signed in before you enabled Cross-App Access, have them sign out of Claude and sign back in. Sessions established earlier lack the identity token the agent needs.

If a Claude issuer request fails with a user resolution error, confirm the user's email address in Claude matches their Datadog user handle.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/saml/
[2]: https://app.datadoghq.com/organization-settings/cross-app-access
[3]: https://support.claude.com/en/articles/15537633-authorize-mcp-connectors-for-your-entire-organization
[4]: https://claude.ai/admin-settings/connectors
[5]: https://help.okta.com/oie/en-us/content/topics/apps/apps-cross-app-access.htm
[6]: https://app.datadoghq.com/organization-settings/oauth-applications
[7]: /account_management/org_settings/mobile_third_party_access/#application-scope-management
