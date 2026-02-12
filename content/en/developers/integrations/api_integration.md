---
aliases:
- /developers/integrations/oauth_for_data_integrations/
- /developers/integrations/oauth_for_integrations/
title: Create an API-based integration
description: Learn how to develop and publish a Datadog API integration.
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

This page guides Technology Partners through creating an official Datadog API integration. API integrations are best suited for SaaS-based vendors that can host a service to interact with the [Datadog API][1].

Most integrations submit [metrics][2], [logs][3], or [events][4], but you can also use other endpoints as needed, such as creating [incidents][5] or querying [users][6].

After your integration is published, it appears in Datadog as a tile. This tile is where users connect their accounts and can learn more about the integration.

## Requirements

- Your product must be generally available.
- Your product must host the source code that interacts with the Datadog API.
- Your integration must submit telemetry to Datadog.
- Your integration must implement OAuth for authorization (see below for more details).

## Building an API integration
These steps assume you've [joined the Datadog Partner Network][7], have access to a partner developer organization, and have [created a listing in the Developer Platform][16].

1. [Implement OAuth 2.0 for Datadog in your product](#implement-oauth).
2. [Add your OAuth client details in the Developer Platform](#add-oauth-details-in-the-developer-platform).
3. [Test OAuth in your partner developer organization](#test-oauth).

### Implement OAuth
OAuth 2.0 is an industry-standard authorization framework that enables secure access to Datadog APIs without exposing user credentials. It issues scoped, revocable tokens, offering stronger security and a better user experience than API or application keys.

<div class="alert alert-info">
OAuth is available only to approved Technology Partners developing official Datadog integrations. Standalone OAuth clients are not supported.
</div>

1. Determine the required [scopes][8] for your integration use case.
2. [Implement OAuth][9]. 
3. Ensure the following Datadog-specific concepts are accounted for:
    - Datadog organizations may be deployed in different regions, represented by the `domain` parameter (for example, `datadoghq.com`, `ap1.datadoghq.com`). This affects both the OAuth handshake and the API endpoints you use.
    - Some customers use a custom subdomain, represented by the `site` parameter (for example, `customsub.datadoghq.com`). This is only used in the OAuth handshake and doesn't affect API endpoints.
    - Your product must direct users to initiate the OAuth flow from Datadog, so Datadog can provide the `domain` and `site` parameters to your onboarding URL. These parameters are not included if the flow starts from your product.
    - To submit data to Datadog, your integration must request the `api_keys_write` scope and make an [API call during the OAuth handshake][10] to create an API key on behalf of the user.

### Add OAuth details in the Developer Platform
These steps assume you've already created a listing in the Developer Platform.

1. Navigate to the **Configuration Method** tab for your listing and select **API with OAuth**.
2. Enter your **OAuth Client Name** (this should match your integration name).
3. Enter your **Onboarding URL**. This is where users are redirected after clicking **Connect Accounts** from the Datadog integration tile to start the OAuth flow and associate their Datadog account with your product.
4. Add one or more **Redirect URIs**.
5. Click **Generate OAuth Client Secret** to create credentials for testing.
6. Record the client secret, as it is not displayed again.
7. Select the minimum scopes required for your integration.
    - **Note**: Enable the `api_keys_write` scope to submit data (such as metrics, logs, or events) to Datadog.
8. Click **Save Changes**.

### Test OAuth
Until your integration is published by Datadog, you can only test OAuth within your Datadog partner developer organization.

1. Click **Test Authorization** to simulate initiation from the Datadog integration tile. This replicates a redirect to your onboarding URL with the `domain` and `site` parameters.
2. Complete the OAuth flow using your Datadog partner developer organization.
3. Verify that your integration can submit, query, or interact with the Datadog API as needed.
4. After testing is complete and OAuth is working as expected, you're ready to submit your OAuth information with your listing. Before submitting:
    - Replace or remove any testing URLs from the **Onboarding URL** and **Redirect URIs** fields.
    - Upon submission in the Developer Platform, production client credentials are provided. Store the client secret securely, as it is not displayed again. 

## Troubleshooting

### The list of API scopes does not include sending metrics, events, and logs

To send data to Datadog, use the `api_keys_write` scope when generating an API key on behalf of the user. For more information, see Step 3 in [Implement OAuth](#implement-oauth).


### Invalid client ID

Error
: `invalid_request - Invalid client_id parameter value`

Until an OAuth client is published, you can only authorize the client from the partner developer organization it was created in. This error occurs if you try to authorize the client outside of that account before the client is published.

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

For more information, see [Implement the OAuth protocol][12].

### API requests

If you're getting a forbidden error when trying to make an API call to a specific endpoint and you've enabled the correct scope for that endpoint, it's possible your API key, session, or OAuth token is invalid or has expired.

#### API key and token expiration

Refresh tokens do not expire unless the user revokes authorization or the partner revokes the token. If the partner revokes the token, the user must reauthorize the integration to generate new refresh and access tokens. For more information, see the [OAuth2 Authorization Endpoints Reference][13].

#### Revoking and recreating API keys in your partner developer organization

When you create an API key using the [`/api/v2/api_keys/marketplace` endpoint][14], the key value is returned once in the reponse. For security reasons, it cannot be viewed or regenerated later. Make sure to store the key securely.

If your API key is lost or compromised, revoke and recreate it by following these steps:

1. Navigate to the [Datadog API Keys Management page][15].
2. Locate the API key named `OAuth Client API Key`.
3. Click **Revoke** to disable the existing key.
4. Reinstall your integration and complete the OAuth authorization flow again to generate a new key.

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
- Ensure you are using the correct client. Use your testing client until the integration tile is published to your partner developer organization.

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

[1]: /api/latest/using-the-api/
[2]: /api/latest/metrics/
[3]: /logs/faq/partner_log_integration/
[4]: /api/latest/events/
[5]: /api/latest/incidents/
[6]: /api/latest/users/
[7]: /developers/integrations/?tab=integrations#join-the-datadog-partner-network
[8]: /api/latest/scopes/
[9]: /developers/authorization/oauth2_in_datadog/
[10]: /developers/authorization/oauth2_endpoints/?tab=apikeycreationendpoints
[11]: mailto:ecosystems@datadog.com
[12]: /developers/authorization/oauth2_in_datadog/#implement-the-oauth-protocol
[13]: /developers/authorization/oauth2_endpoints/#exchange-authorization-code-for-access-token
[14]: /developers/authorization/oauth2_endpoints/?tab=apikeycreationendpoints#
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: /developers/integrations/build_integration/#create-a-listing
