---
title: Cross-App Access
description: Configure Okta Cross-App Access so AI agents can call the Datadog API on behalf of users authorized in Okta.
algolia:
  tags: ["cross-app access", "XAA", "Okta", "AI agent", "MCP", "ID-JAG"]
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

Cross-App Access (XAA) lets AI agents call the Datadog API on behalf of users your organization already authorized in Okta. Without it, every user authorizes the agent individually through a browser consent screen. With it, your Okta administrator grants that access once, centrally, and users skip the per-user consent step.

Okta issues the agent a short-lived token called an ID-JAG (Identity Assertion JWT Authorization Grant). The agent presents this token to Datadog, and Datadog exchanges it for an access token owned by the user who initiated the call. Because Okta mints the token, your administrators grant and revoke Datadog access for AI agents from Okta.

In Preview, Cross-App Access supports Okta as the only identity provider and Claude as the only agent.

## Values you exchange

Setup moves values in both directions between Datadog and Okta. Two of them are issuer URLs that name different systems, so confirm you enter each one in the correct place.

| Value                     | Direction       | Where you enter it |
| ------------------------- | --------------- | ------------------ |
| Datadog organization UUID | Datadog to Okta | Datadog application in Okta: {{< ui >}}Machine Assignments{{< /ui >}} > {{< ui >}}Callers{{< /ui >}} > {{< ui >}}Cross App Access (XAA){{< /ui >}} > {{< ui >}}Audience/tenant ID{{< /ui >}} |
| Datadog issuer URL        | Datadog to Okta | Datadog application in Okta: {{< ui >}}Machine Assignments{{< /ui >}} > {{< ui >}}Callers{{< /ui >}} > {{< ui >}}Cross App Access (XAA){{< /ui >}} > {{< ui >}}Issuer URL{{< /ui >}}. The Datadog application from the Okta Integration Network fills this in. |
| Datadog resource URL      | Datadog to Okta | Claude AI agent in Okta: {{< ui >}}Resource connections{{< /ui >}} > {{< ui >}}Resource indicator{{< /ui >}} |
| Agent client ID           | Datadog to Okta | Claude AI agent in Okta: {{< ui >}}Resource connections{{< /ui >}} > {{< ui >}}AI agent's client ID registered in this app{{< /ui >}} |
| Okta issuer URL           | Okta to Datadog | Datadog: {{< ui >}}Organization Settings > Cross-App Access{{< /ui >}}, {{< ui >}}Issuer URL{{< /ui >}} |

## Prerequisites

- Your organization uses Okta for SAML single sign-on to Datadog. Cross-App Access resolves users through your existing SAML connection, so it does not work without one. See [Configure SAML single sign-on](/account_management/saml/).
- Each user who uses Claude exists in your Datadog organization and, in Okta, is assigned to both the Claude AI agent and the Datadog application.
- You have the `org_management` permission in Datadog. To configure Cross-App Access through the API instead of the UI, you also need a [Personal Access Token](/account_management/personal-access-tokens/) (PAT), used as `DD_TOKEN` in the examples.
- Your Okta org runs Okta Identity Engine and subscribes to Single Sign-On, and you have Okta Super Administrator access. Under Single Sign-On, Okta limits Cross App Access to 250 ID-JAG tokens per user, per resource application, per month. See [Okta's Cross App Access documentation](https://help.okta.com/oie/en-us/content/topics/apps/apps-config-xaa-connection.htm) for the current limits.

## Configure Cross-App Access in Datadog

Complete the Datadog steps before the Okta steps. Datadog rejects tokens for organizations that have not enabled Cross-App Access, so configuring Okta first produces failures until you finish here.

Navigate to [{{< ui >}}Organization Settings > Cross-App Access{{< /ui >}}](https://app.datadoghq.com/organization-settings/cross-app-access).

{{< img src="account_management/cross_app_access/cross-app-access-settings.png" alt="Cross-App Access page in Organization Settings, showing the enablement status, the Issuer URL field, the Org UUID, and the Registered client IDs table" style="width:100%;">}}

### Enable Cross-App Access

Click {{< ui >}}Enable{{< /ui >}}. This applies to your whole organization. Click {{< ui >}}Disable{{< /ui >}} to turn Cross-App Access off later.

### Set your Okta issuer URL

In the {{< ui >}}Issuer URL{{< /ui >}} field, enter the issuer URL of your own Okta tenant, then click {{< ui >}}Save{{< /ui >}}. Datadog derives the location of the token signing keys from this value, so it must be exact.

The issuer URL must meet all of the following, or Datadog rejects it:

- Use `https`.
- Use a subdomain of `.okta.com`, `.oktapreview.com`, or `.okta-emea.com`. Datadog rejects the apex domain, so `example.okta.com` works and `okta.com` does not work.

Click {{< ui >}}Remove{{< /ui >}} to unset the issuer. Datadog stops accepting tokens after you remove it.

Enter your Okta org URL, such as `https://example.okta.com`. Okta issues ID-JAGs from its org authorization server, so the URL of a custom authorization server, such as `https://example.okta.com/oauth2/default`, does not work. Datadog accepts only Okta domains, so a custom URL domain, such as `https://login.example.com`, does not work either. If your Okta org uses a custom URL domain, make sure Okta issues tokens for Claude with the Okta URL as the issuer.

### Copy your organization UUID

Copy the value in the {{< ui >}}Org UUID{{< /ui >}} field. Okta sends this value as the `aud_tenant` claim, which tells Datadog which organization a token targets when several organizations share one Okta tenant. It is not the same as the company ID that Okta asks for elsewhere.

### Copy the agent client ID

The {{< ui >}}Registered client IDs{{< /ui >}} table lists every agent Datadog supports for Cross-App Access and the OAuth client ID each one uses. Copy the client ID for the agent you are setting up. You will enter it in Okta as {{< ui >}}AI agent's client ID registered in this app{{< /ui >}}.

Datadog adds agents to this table as it supports them, so check the table rather than reusing a client ID from another source.

Click {{< ui >}}Manage app{{< /ui >}} on a row to open the scope settings for that agent. See [Control scopes in Datadog](#control-scopes-in-datadog).

{{% collapse-content title="Optional: configure with the API" level="h3" expanded=false %}}

Use these calls to script the setup. They do the same thing as the {{< ui >}}Enable{{< /ui >}} button and the {{< ui >}}Issuer URL{{< /ui >}} field. Both require a PAT with the `org_management` permission.

Enable Cross-App Access by setting the `mcp_cross_app_access_enabled` org config to `true`. To turn it off later, send the same request with `"value": false`.

```shell
curl -X PATCH "{{< region-param key="dd_api" >}}/api/v2/org_configs/mcp_cross_app_access_enabled" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DD_TOKEN}" \
  -d '{
    "data": {
      "type": "org_configs",
      "attributes": {
        "value": true
      }
    }
  }'
```

Set the Okta issuer URL. The same validation rules apply, and a value that breaks them returns `400`. Sending an empty string unsets the issuer.

```shell
curl -X PUT "{{< region-param key="dd_api" >}}/api/v2/login/org_configs/mcp_cross_app_access_issuer_url" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${DD_TOKEN}" \
  -d '{
    "data": {
      "type": "org_config",
      "attributes": {
        "issuer_url": "https://<YOUR_OKTA_SUBDOMAIN>.okta.com"
      }
    }
  }'
```

To read your organization UUID from the API, call [{{< region-param key="dd_api" >}}/api/v2/current_user](https://app.datadoghq.com/api/v2/current_user) with an active session in the target organization. The UUID is the `id` of the `orgs` entry in the `included` array.

{{% /collapse-content %}}

## Finish the setup in Okta

Complete the setup in the Okta Admin Console as a Super Administrator. This section lists the values Datadog expects and the Okta fields they belong in. See [Okta's Cross-App Access documentation](https://help.okta.com/oie/en-us/content/topics/apps/apps-cross-app-access.htm) for more details. 

### Configure the Datadog application as a resource application

Use the Datadog application from the Okta Integration Network, the one you use for SAML single sign-on to Datadog.

1. In the Okta Admin Console, navigate to {{< ui >}}Applications and Resources > Applications{{< /ui >}} and select your Datadog application.
2. Open the {{< ui >}}Machine Assignments{{< /ui >}} tab and select the {{< ui >}}Callers{{< /ui >}} tile.
3. Click {{< ui >}}Edit{{< /ui >}} next to {{< ui >}}Cross App Access (XAA){{< /ui >}}, then select {{< ui >}}Enable{{< /ui >}}.
4. Check the following fields, then click {{< ui >}}Save{{< /ui >}}.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
<p>The values below match your selected <a href="/getting_started/site/">Datadog site</a> ({{< region-param key="dd_site_name" >}}). To see the values for another site, use the {{< ui >}}Datadog Site{{< /ui >}} selector on the right side of this page.</p>
<table>
<thead><tr><th>Okta field</th><th>Value</th></tr></thead>
<tbody>
<tr><td>{{< ui >}}Issuer URL{{< /ui >}}</td><td>{{< region-param key="mcp_xaa_issuer_url" code="true" >}}. The Okta Integration Network application sets this value.</td></tr>
<tr><td>{{< ui >}}Audience/tenant ID{{< /ui >}}</td><td>Your Datadog organization UUID</td></tr>
<tr><td>{{< ui >}}Scopes{{< /ui >}}</td><td>The Okta Integration Network application sets these values. See <a href="#control-scopes-in-datadog">Control scopes in Datadog</a>.</td></tr>
</tbody>
</table>
{{< /site-region >}}

The issuer URL identifies the Datadog authorization server, not the token endpoint. Okta writes it into the `aud` claim of the tokens it issues, and Datadog accepts a token only when that claim matches.

**Note**: Changing the issuer URL later requires deleting and recreating the resource connection described in [Connect Claude to the Datadog application](#connect-claude-to-the-datadog-application).

### Register Claude as an AI agent

Register Claude as an AI agent in Okta, then exchange keys with Anthropic. Anthropic signs the requests Okta receives, so Okta needs Anthropic's public key before it issues any token.

1. Navigate to {{< ui >}}Directory > AI Agents{{< /ui >}} and click {{< ui >}}Register AI Agent{{< /ui >}}.
2. Under {{< ui >}}Profile{{< /ui >}}, enter a name and description, then click {{< ui >}}Next{{< /ui >}}.
3. Under {{< ui >}}User access and authentication{{< /ui >}} > {{< ui >}}Allow users to access this agent{{< /ui >}}, select {{< ui >}}Select an existing app{{< /ui >}}, select your Claude application, then click {{< ui >}}Next{{< /ui >}}. Okta does not let you change this link later without deleting and recreating the agent.
4. Assign owners to the agent. Okta requires an owner before you can activate it.
5. Send the client ID that Okta generates for the agent to Anthropic.
6. On the {{< ui >}}Client registration{{< /ui >}} tab, click {{< ui >}}Configure{{< /ui >}} next to the public/private key method, click {{< ui >}}Add public key{{< /ui >}}, and paste the public key that Anthropic returns. Then activate the method.
7. On the {{< ui >}}User access{{< /ui >}} tab, assign the users and groups who use Claude.

Until the public key is in place, token exchange fails even though every other value is correct. This exchange is manual, so start it early.

### Connect Claude to the Datadog application

1. In {{< ui >}}Directory > AI Agents{{< /ui >}}, select the Claude agent.
2. On the {{< ui >}}Resource connections{{< /ui >}} tab, click {{< ui >}}Add resource connection{{< /ui >}}.
3. Under {{< ui >}}Application{{< /ui >}} > {{< ui >}}Application instance{{< /ui >}}, select your Datadog application, then select {{< ui >}}Enable{{< /ui >}}.
4. Set the following fields, then click {{< ui >}}Add{{< /ui >}}.

   | Okta field | Value |
   | ---------- | ----- |
   | {{< ui >}}Resource indicator{{< /ui >}} | {{< region-param key="mcp_xaa_resource_url" code="true" >}} |
   | {{< ui >}}AI agent's client ID registered in this app{{< /ui >}} | The Claude client ID you copied from [{{< ui >}}Registered client IDs{{< /ui >}}](#copy-the-agent-client-id) |
   | {{< ui >}}Scopes{{< /ui >}} | {{< ui >}}Allow any scope{{< /ui >}}, the only supported value. See [Control scopes in Datadog](#control-scopes-in-datadog) |

5. Activate the agent from the {{< ui >}}Actions{{< /ui >}} menu.

## Control scopes in Datadog

{{< ui >}}Allow any scope{{< /ui >}} is the only supported {{< ui >}}Scopes{{< /ui >}} option on the resource connection for Cross-App Access. Set it in Okta, then restrict what Claude reaches from Datadog.

With {{< ui >}}Allow any scope{{< /ui >}}, Okta copies the scopes Claude requests into the token, which makes Datadog the enforcement point.

<div class="alert alert-warning">Do not select {{< ui >}}Allow specific scopes{{< /ui >}} or {{< ui >}}Disallow specific scopes{{< /ui >}} in Okta. Okta rejects any token request that contains a scope outside the allowed set, so the integration fails with an error instead of falling back to narrower access.</div>

To set the scopes Claude is allowed:

1. Navigate to [{{< ui >}}Organization Settings > Mobile and Third-Party Access{{< /ui >}}](https://app.datadoghq.com/organization-settings/mobile-third-party-access). You can also click {{< ui >}}Manage app{{< /ui >}} next to Claude in the {{< ui >}}Registered client IDs{{< /ui >}} table on the Cross-App Access page.
2. Select the Claude application, then select the {{< ui >}}Scopes{{< /ui >}} tab.
3. Use the {{< ui >}}Allowed{{< /ui >}} checkbox for each scope to control what Claude reaches.
4. Click {{< ui >}}Enable{{< /ui >}} to save.

Adding or removing a scope affects every user in your organization, and removing a scope revokes existing authorizations that rely on it. See [Application Scope Management](/account_management/org_settings/mobile_third_party_access/#application-scope-management).

A scope that is not allowed in Datadog is never granted, regardless of what the token requests.

## Add Datadog as a connector in Claude

1. In Claude, click the {{< ui >}}\+{{< /ui >}} icon at the bottom of any prompt, then click {{< ui >}}Add Connector{{< /ui >}}.
2. Find **Datadog** in the directory and enable the connector.
3. Complete the sign-in flow when prompted.

Use the Datadog connector from the directory, not a custom connector.

## Verify the configuration

Sign in to Claude as a user assigned to both the Claude AI agent and the Datadog application in Okta, then run a request that calls Datadog. A successful call confirms the full path: Okta issues the token, Datadog accepts it, and Datadog resolves the user.

If a user signed in before you enabled Cross-App Access, have them sign out of Claude and sign back in through Okta. Sessions established earlier lack the identity token the agent needs.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
