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

This page walks Technology Partners through creating an official Datadog API integration. API integrations are ideal for Technology Partners that are SaaS-based, and can host a service that interacts with the [Datadog API][12].

API integrations can submit and query data . API integrations commonly submit [metrics][22], [logs][23], and [events][24]. However, you may also interact with other endpoints as needed, such as creating [incidents][27] or querying [users][28].

## Requirements

- Your product must be Generally Available
- Your product must host the source code the submits or queries the Datadog API
- Your integration must send telemetry to Datadog
- Your integraiton must implement OAuth for authorization (see Step 6 for more details)

## Building an API integration
These steps assume you've [joined the Datadog Partner Network][29] and have access to a Datadog partner developer organization.

1. Implement the OAuth protocol in your product.
2. Configure OAuth client details in the Developer Platform.
3. Test OAuth in your partner developer organization.

#### Implement OAuth in your product
OAuth 2.0 is an industry-standard authorization framework that allows integrations to securely access Datadog APIs without requiring user credentials. It issues scoped, revocable access tokens, offering stronger security and a better user experience than API or application keys. 

1. Determine neccessary scopes. The full list can be found here.
2. Implement OAuth according to [these steps][1]. 
3. Confirm you've accounted for the Datadog-specific concepts:
    - A customer's Datadog organization may deployed in one of several datacenters, which is represented via the `domain` parameter (e.g., `datadoghq.com`, `ap1.datadoghq.com`, etc.). This is used in the OAuth handshake as well as determines the endpoint you should use when interacting with the Datadog API.
    - A customer may have a custom subdomain, which is represented in the `site` parameter (e.g., `customsub.datadoghq.com`). This parameter is only used in the OAuth handshake and doesn't affect endpoint values used for interacting with the Datadog API. 
    - Your product must direct users to initiate the OAuth flow from the Datadog side in order to receive the `domain` and `site` parameters to your onboarding URL. These parameters are not provided if the OAuth flow is initiated from your side.
    - In general, an API key is required to submit data to Datadog. This means if your integration is submitting data to Datadog, you'll need to request the `api_keys_write` scope and make an extra [API call during the OAuth handshake to create an API key][20] on behalf of the user.

#### Configure OAuth in the Developer Platform
These steps assume you've created an app listing in the Developer Platform.

1. Navigate to the "Configuration Method" tab for your app listing and select "API with OAuth".
2. Enter your OAuth client name. This should be the same as your integration name.
3. Enter your onboarding url. This is where your users will be redirected upon clicking "Connect Accounts" from the integration tile in Datadog.
4. Add one or more Redirect URIs.
5. Click **Generate OAuth Client Secret**. This will generate client credentials for testing.
6. Take note of your client secret for testing as it won't be displayed again.
7. Select the minimum scopes necessary for your integration. **Note**: Enable the `api_keys_write` scope to submit data (metrics, logs, events, etc.)to Datadog.
8. Click **Save Changes** for the scopes to take effect.

### Test 
Until the integration is published, you'll only be able to complete these testing steps in your Datadog partner developer organization.

1. Click **Test Authorization** to replicate initiation from the Datadog integration tile. This button replicates the `domain` and `site` parameter that will be sent to your onboarding URL.
2. Complete the OAuth flow using your Datadog partner developer organization.
3. Ensure that you are able to submit data, query data, or update data according to your integration's use case.
4. Once the OAuth flow is working as expected, you're ready to submit your OAuth information with the rest of your app listing. However, a couple notes before submitting:
    - Be sure to remove or replace any testing urls from the **Onboarding URL** and **Redirect URIs** fields.
    - Upon submission, you'll receive a product set of client credentials. Be prepared to store safely store the client secret as it will not be displayed again. 

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
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: https://app.datadoghq.com/integrations
[17]: /developers/authorization/oauth2_in_datadog/#implement-the-oauth-protocol
[20]: /developers/authorization/oauth2_endpoints/?tab=apikeycreationendpoints
[21]: https://docs.datadoghq.com/api/latest/using-the-api/
[22]: https://docs.datadoghq.com/api/latest/metrics/
[23]: https://docs.datadoghq.com/logs/faq/partner_log_integration/
[24]: https://docs.datadoghq.com/api/latest/events/
[25]: https://docs.datadoghq.com/api/latest/service-checks/
[26]: https://docs.datadoghq.com/tracing/guide/send_traces_to_agent_by_api/
[27]: https://docs.datadoghq.com/api/latest/incidents/
[28]: https://docs.datadoghq.com/api/latest/users/
[29] /developers/integrations/?tab=integrations#join-the-datadog-partner-network
