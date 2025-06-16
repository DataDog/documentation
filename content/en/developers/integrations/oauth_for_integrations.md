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

For more information on Datadog's OAuth implementation, see the [Datadog OAuth2 documentation][1].

Publishing an OAuth client does not result in a published integration. Your integration only appears on the [Integrations page][16] after you've completed a separate publication process. For information on creating and publishing an integration, see [Build an integration][18].

## When to use OAuth in an integration

OAuth support is required for all partner-built SaaS integrations that directly submit data to, or query data from, Datadog's public [API endpoints][12]. OAuth does not apply to software deployed on-premises, or to Datadog Agent checks.

## Build an integration with OAuth

When building an integration with OAuth, you should select only the scopes needed by your application. After a customer consents to authorize your integration, all listed scopes become available to your application through a token.

You can include OAuth in a new integration (or add it to an existing integration) on the [Marketplace][2] or [Integrations][3] page by following the steps below. For existing integrations, note that there's no need to change your `app_uuid` in the `manifest.json`.

### Create an app from a template

1. Navigate to the [Datadog Developer Platform][4] and click **+New App**.

   You need to create an app for each integration OAuth client. Datadog ties this app to your integration once your integration is published.

2. Select a **Blank App** and add a name for your app.
3. Click **Create**.
4. In the **Basic Information** tab, complete the fields that populate in the details view.
5. Once you are ready to publish your OAuth client, click the **Mark Stable** button.
6. Click **Save**.

### Create an OAuth client

The client is the component of an application that enables users to authorize the application access to the customer's Datadog data. In order to gain access, the client requires the appropriate access token.

1. Navigate to the **OAuth & Permissions** tab under **Features** and click **New Confidential OAuth Client**.

   The OAuth clients you create for integrations are **confidential clients** that provide a client ID and client secret. The client you create in this step is a private version of the client, whose credentials you can use for testing. It allows only internal organization authorization. When a published version of this client is created, you receive a new set of credentials that enable authorization across any Datadog organization.

   <div class="alert alert-info">These credentials are never shown again after you create the client, so be sure to store them in a secure location.</div>

2. Enter your client information such as the name, description, redirect URIs, and onboarding URL.
3. Configure scopes for the OAuth client by searching for scopes and selecting their checkboxes in the **Requested** column.

   Scopes determine the types of data your app can access in the customer's Datadog account. This allows your integration to access the necessary scopes. Only request the minimum amount of scopes required for your use case, as more can be added later on as needed.

   In order to submit data into Datadog, the `api_keys_write` scope must be selected. This is a private scope that is only approved for integration partners and allows you to create an API key on the user's behalf, which you can use to send data into Datadog.

4. Click **Save Changes**.
5. After creating an OAuth client and assigning it scopes, you can implement the OAuth PKCE protocol in your integration, complete the authorization code grant flow, and start writing integration code utilizing the endpoints available through OAuth.

   In the authorization code grant flow, you receive an authorization code and refresh token, then exchange the code for an access token that can be used to access the data you want to pull from Datadog.

   For more information about implementing the OAuth protocol with Datadog, see [Datadog OAuth2][1]. For more information about building and publishing an integration, see the [Integrations developer documentation][5].

### Test the OAuth client

Once you have implemented the OAuth protocol, you should test your OAuth client to ensure that you can send data into Datadog, or pull data out, according to your use case.

**Note**: Until your integration tile is published, you can only authorize the OAuth client from your sandbox organization. This means that you can only send data into or pull data out of your sandbox account.

To test your OAuth client, complete the following steps:

#### Test that authorization is working properly

Ensure that you do not encounter any errors when going through the basic authorization flow.

   1. Navigate to the Developer Platform, click the Edit icon on your app, and open the **OAuth and Permissions** tab.
   2. Select your OAuth client, and click the  **Test Authorization** button on your client's details page.
   3. This directs you to the onboarding URL and starts the authorization flow that a customer takes. By clicking this button, the `domain` parameter is provided on the redirect to the `onboarding_url`.
   4. Go through the OAuth flow and authorize your integration.

#### Create an API Key

If your OAuth client requests the `api_keys_write` scope, ensure that you can successfully make a request to the `marketplace` endpoint with your token in the headers of the request. For more information, see [the OAuth2 Authorization Endpoints Reference][20].

If successful, this request returns an API key that you can find on the [API Keys Management page][10]. You must securely save this key to use it for submitting data into Datadog on behalf of the user. **You cannot access this API key value again after the initial request response**.

#### Test multiple Datadog sites

You cannot test other organizations with your testing client, but you can verify that your OAuth client works across multiple [Datadog sites][8] by copying your client into your EU sandbox and kicking off authorization.
   1. If you do not have access to a sandbox account on a different site, contact `ecosystems@datadog.com`.
   2. Export your app manifest from the organization in the *original* US1 Datadog site by navigating to the app you've created in the Developer Platform, clicking the Gear icon to the right of **Documentation**, and clicking **Export App Manifest**.
   3. In your EU sandbox organization, navigate to the Developer Platform and import your app manifest from Step 2.
   4. After successfully importing your manifest, navigate to the **OAuth & Permissions** tab to find your OAuth client, along with its client ID and client secret. Update your OAuth implementation to use these credentials.
   5. Navigate to the **Test Authorization** button, click it, and go through the OAuth flow.

After your OAuth client is published, you can test freely from other organizations.

##### Cross-regional support

To make OAuth work for users across all Datadog regions, you need to ensure that you're making the correct API calls based on a user's region. When the user kicks off authorization from the Datadog tile, a site parameter is sent on redirect from the onboarding URL. You use this site parameter in your calls to the authorization and token endpoints.

If a user kicks off authorization directly from your platform, this site parameter is not sent and the user is instead prompted to select their site on the Datadog authorization page.

Make sure you test calls to the Datadog API that match the user's region. For example, `https://trace.browser-intake-datadoghq.com` for US, and `https://public-trace-http-intake.logs.datadoghq.eu` for EU.

To see a list of destinations based on the Datadog site, go to the [Network traffic][19] page and use the **DATADOG SITE** selector on the right to switch regions.

### Confirm data flow for all scopes

Ensure that you are able to send data in, pull data out, or edit data for each scope you've requested.

### Publish the OAuth client

#### Create or update your pull request
In order to publish an OAuth client, you first need to open a pull request for your integration in either the [`integrations-extras`][5] or [Marketplace][6] GitHub repositories if you haven't already.

As a part of your pull request, complete the following steps:

1. Update your README file with an `## Uninstallation` section under `## Setup` that includes the following instructions (along with any custom instructions you would like to add):
   
   - Once this integration has been uninstalled, any previous authorizations are revoked. 
   - Additionally, ensure that all API keys associated with this integration have been disabled by searching for the integration name on the [API Keys page][10].
   
2. Update your `manifest.json` file to reference this new `## Uninstallation` section. This reference should appear directly beneath the support field:

   ```
   "support": "README.md#Support",
   "uninstallation": "README.md#Uninstallation",
   ```

#### Initiate publishing process in Developer Platform

To start the publishing process in the [Developer Platform][4]:

1. Navigate to the **Publishing** tab under **General** and click **Next: Send App Details to Datadog**. At the top of this tab, you receive your published client ID and secret. Your OAuth implementation needs to be updated to include these client credentials. **Note:** Save your client ID and client secret in a secure location. This information is not shown again.

2. Under the Integration Publishing section, follow the steps to add the OAuth client information to your pull request. This includes updating the `manifest.json` file and adding a file to the `assets` directory.

3. Add a link to the GitHub directory or pull request in the appropriate field.
4. Click **Finish & Send**.

Once an OAuth client is submitted for publishing, the team is notified. When your pull request is approved by all required parties and is ready to be merged, at that point your OAuth client gets published as well. Your integration tile is then published to your sandbox account (_not_ for all customers), and your OAuth client can then be authorized by any Datadog organization (not only your Sandbox organization).

At this point, Datadog recommends doing final testing with your OAuth client to ensure authorization is working smoothly.

#### Making changes after submitting your client for publishing

You cannot edit a published OAuth client directly, so only go through the publishing flow when everything has been tested and is ready to go. To make updates to the OAuth client after it has been submitted for publishing, you need to go through the publishing flow again and re-submit. **The published client credentials do not appear again**.

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

If your secret was leaked and needs to be rotated, contact [ecosystems@datadog.com][11]. Only one secret can be active at a time. After you regenerate your secret, the existing secret is deleted. Customers do not need to re-authorize the integration.

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
