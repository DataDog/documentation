---
aliases:
- /developers/integrations/oauth_for_data_integrations/
title: OAuth for Integrations
description: Use OAuth to authenticate integrations.
further_reading:
- link: "/developers/authorization/oauth2_in_datadog/"
  tag: "Documentation"
  text: "OAuth2 in Datadog"
- link: "/developers/integrations/"
  tag: "Documentation"
  text: "Build an integration"
- link: "https://www.datadoghq.com/blog/oauth/"
  tag: "Blog"
  text: "Authorize your Datadog integrations with OAuth"

---

## Overview

OAuth enables Datadog customers to securely authorize third-party access to their Datadog organization. This authorization allows integrations to push data into Datadog or pull data out from Datadog without the need for customers to input API or app keys anywhere. For example, a user can consent to provide an on-call notification tool with read access to their Datadog organization's monitors.

Note: This functionality is only available for approved Technology Partners intending on building integrations. OAuth clients for unofficial integration is not supported.

For more information on Datadog's OAuth implementation, see the [Datadog OAuth2 documentation][1].

Publishing an OAuth client does not result in a published integration. Your integration only appears on the [Integrations page][16] after you've completed a separate publication process. For information on creating and publishing an integration, see [Build an integration][18].

## When to use OAuth in an integration

OAuth support is required for all partner-built SaaS integrations that directly submit data to, or query data from, Datadog's public [API endpoints][12]. OAuth does not apply to software deployed on-premises, or to Datadog Agent checks.

You can include OAuth in a new integration (or add it to an existing integration) on the [Marketplace][2] or [Integrations][3] page by following the steps below.

### Create an OAuth client
Before setting up OAuth, follow the Integration Developer Platform documentation to:
1. Set up your integration and 
2. Choose "API with OAuth" as the configuration method. Then, procceed with the following steps. 

The client is the component of an application that enables users to authorize the application access to the customer's Datadog data. To gain access, the client requires the appropriate access token. 
1. Navigate to the **Configuration Method** tab under the **Configuration** section. Enter your client information such as the name, onboarding URL, and redirect URIs.
2. Click **Generate OAuth Client Secret**
3. **Copy and save** your Client Secret as it won't show again. You can regenerate a new secret if you lose it. <br>
The OAuth clients you create for integrations are confidential clients that provide a client ID and client secret. The client you create in this step is a private version of the client, whose credentials you can use for testing. It allows only internal organization authorization. When your integration is published, a published version of this client is created, and you will receive a new set of credentials that enable authorization across any Datadog organization.
4. Configure scopes for the OAuth client by searching for scopes and selecting their checkboxes in the Requested column.<br>
Scopes determine the types of data your app can access in the customer’s Datadog account. This allows your integration to access the necessary scopes. Only request the minimum amount of scopes required for your use case, as more can be added later on as needed.<br>
To submit data into Datadog, the **api_keys_write** scope must be selected. This is a private scope that is only approved for integration partners and allows you to create an API key on the user’s behalf, which you can use to send data into Datadog.
6. Click **Save Changes**.

For more information about implementing the OAuth protocol with Datadog, see [Datadog OAuth2][1]. For more information about building and publishing an integration, see the [Integrations developer documentation][5].

### Test the OAuth client

Once you have implemented the OAuth protocol, test your OAuth client to ensure that you can send data into Datadog, or pull data out, according to your use case.

**Note**: Until your integration tile is published, you can only authorize the OAuth client from your sandbox organization. This means that you can only send data into or pull data out of your sandbox account.

To test your OAuth client, complete the following steps:
1. Test that autorization is working properly
2. Create an API Key
3. Test multiple Datadog sites
4. Confirm cross-regional support
5. Confirm dataflow for all scopes
6. Submit your integration and OAuth client for review

#### Test that authorization is working properly

Once you have created an OAuth Client inside of the Configuration Method tab in the Developer Platform continue with the following steps, ensure that you do not encounter any errors when going through the basic authorization flow.
1. Select your OAuth client, and click **Test Authorization** on the details page. <br>
   This directs you to the onboarding URL and starts the authorization flow that a customer takes. By clicking this button, the 'domain' parameter is provided on the redirect to the 'onboarding_url'.
3. Go through the OAuth flow and authorize your integration.

#### Create an API Key

If your OAuth client requests the `api_keys_write` scope, ensure that you can successfully make a request to the `marketplace` endpoint with your token in the headers of the request. For more information, see [the OAuth2 Authorization Endpoints Reference][20].

If successful, this request returns an API key that you can find on the [API Keys Management page][10]. You must securely save this key to use it for submitting data into Datadog on behalf of the user. **You cannot access this API key value again after the initial request response**.

#### Test multiple Datadog sites

Testing across different [Datadog sites][8] is only available once your integration is available for preview in your developer sandbox after approval.
1. If you do not have access to a sandbox account on a different site, contact `ecosystems@datadog.com`.
2. Your integration will be made availabe in your other sandbox.
3. Connect the integration and go through the OAuth flow.


##### Confirm cross-regional support

To make OAuth work for users across all Datadog regions, you need to ensure that you're making the correct API calls based on a user's region. When the user kicks off authorization from the Datadog tile, a site parameter is sent on redirect from the onboarding URL. You use this site parameter in your calls to the authorization and token endpoints.

If a user kicks off authorization directly from your platform, this site parameter is not sent and the user is instead prompted to select their site on the Datadog authorization page.

Make sure you test calls to the Datadog API that match the user's region. For example, `https://trace.browser-intake-datadoghq.com` for US, and `https://public-trace-http-intake.logs.datadoghq.eu` for EU.

To see a list of destinations based on the Datadog site, go to the [Network traffic][19] page and use the **DATADOG SITE** selector on the right to switch regions.

#### Confirm data flow for all scopes

Ensure that you are able to send data in, pull data out, or edit data for each scope you've requested.

### Publish the OAuth client

#### Submit your Integration and OAuth client for review
After you’ve completed all the required fields for your integration, submit it for review. Upon submitting, you will receive a new set of credentials for the public version of your integration. **These credentials are not shown again. Copy them to a secure location.**
When your integration is approved by Datadog and is ready to be released, at that point your OAuth client gets published as well. Once published, your integration tile will be available in your sandbox account but not to any customers. Additionally, your OAuth client can be authorized by any Datadog organization, not just your Sandbox organization.
At this point, Datadog recommends doing final testing with your OAuth client to ensure authorization is working smoothly.

#### Making changes after submitting your client for publishing

You cannot edit a published OAuth client directly. To update the OAuth client after it has been published, you'll need to go through the publishing flow again and re-submit.

For more information about publishing your integration tile and creating your pull request, see the [Marketplace and Integrations documentation][7].

## Troubleshooting

### The list of API scopes does not include sending metrics, events, and logs

To send data to Datadog, use the `api_keys_write` scope when generating an API key on behalf of the user. For more information, see [Create an API key](#create-an-api-key).


### Invalid client ID

Error
: `invalid_request - Invalid client_id parameter value`

Until an OAuth client is published, you can only authorize the client from the account it was created in (the partner's sandbox account). This error occurs if you try to authorize the client outside of that account before the client is published.

If you've already published your OAuth client, remember to use the client ID and the client secret you were given at submission. The client secret was displayed only once, so if you've lost it, contact [ecosystems@datadog.com][11] for assistance.

### Forbidden errors

Error
: `{"errors":["Forbidden"]}`

This error might be related to an app key or an issue with your API authentication credentials.

#### App key use

OAuth clients use an `access_token` for authentication. Use the `access_token` to make calls to Datadog API endpoints by sending it as a part of the authorization header of your request:

```python
headers = {"Authorization": "Bearer {}".format(access_token)}
```

For more information, see [Implement the OAuth protocol][17].

### API requests

If you're getting a forbidden error when trying to make an API call to a specific endpoint and you've enabled the correct scope for that endpoint, it's possible your API key, session, or OAuth token is invalid or has expired.

#### API key and token expiration

Refresh tokens do not expire unless the user revokes authorization or the partner revokes the token. If the partner revokes the token, the user must reauthorize the integration to generate new refresh and access tokens. For more information, see the [OAuth2 Authorization Endpoints Reference][13].

#### Retrieving API keys in your partner sandbox account

After you create a key using the [api_keys/marketplace][14] endpoint, the key is returned in the response. The key cannot be regenerated or viewed again. Ensure you store the key securely for continuous data transmission. If you lose your API key, follow these steps to revoke and recreate it:

1. Navigate to the [Datadog API Keys Management page][15].
1. Look for the API key named `OAuth Client API Key` and select it.
1. Click **Revoke** to disable the API key.
1. Follow the steps in [Create an API key](#create-an-api-key) to create a new key.
1. Reinstall the integration and repeat the OAuth flow.


### Hostname/IP does not match certificate's altnames

Error
: `Hostname/IP does not match certificate's altnames`

When connecting to the Datadog API, do not include the subdomain in the API call. For example, use `datadoghq.eu` instead of `bigcorp.datadoghq.eu`.

### Mismatching redirect URI

Error
: `invalid_request - Mismatching redirect URI`

This error is usually the result of configuration differences between your testing client and your published client. Verify the following:
- Ensure you are using the correct `client_id` during authorization. For example, you might be using the `client_id` of your testing client instead of the client_id of your published client.
- Confirm you are using the correct redirect URI. For example, if your client is published, the redirect URI should match the one configured for production, and not the URI you used for testing.
- Ensure you are using the correct client. Use your testing client until the integration is published to your sandbox account.

### Applications with subdomains

Datadog does not support multi-tenanted applications where customers authorize using individual subdomains; instead, authorization is supported only through a single domain.

### OAuth with PKCE

Error
: `Invalid code or code verifier`

For issues with the PKCE OAuth flow, ensure the `content-type` header is correctly set to `application/json` or `application/x-www-form-urlencoded`.

### Regenerating client secrets and secret rotation

If your secret was leaked and needs to be rotated, contact [ecosystems@datadog.com][11]. Only one secret can be active at a time. After you regenerate your secret, the existing secret is deleted. You do not need to re-authorize the integration.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /developers/authorization/oauth2_in_datadog/
[2]: https://app.datadoghq.com/marketplace
[3]: https://app.datadoghq.com/integrations
[4]: https://app.datadoghq.com/apps
[5]: https://github.com/DataDog/integrations-extras/
[6]: http://github.com/DataDog/marketplace
[7]: /developers/integrations/marketplace_offering/#list-an-offering
[8]: /getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/oauth-applications
[10]: https://app.datadoghq.com/organization-settings/api-keys
[11]: mailto:ecosystems@datadog.com
[12]: /api/latest/using-the-api/
[13]: /developers/authorization/oauth2_endpoints/#exchange-authorization-code-for-access-token
[14]: /developers/authorization/oauth2_endpoints/#post-apiv2api_keysmarketplace
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: https://app.datadoghq.com/integrations
[17]: /developers/authorization/oauth2_in_datadog/#implement-the-oauth-protocol
[18]: /developers/integrations/
[19]: /agent/configuration/network/
[20]: /developers/authorization/oauth2_endpoints/?tab=apikeycreationendpoints
