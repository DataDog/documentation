---
aliases:
- /developers/integrations/oauth_for_data_integrations/
title: OAuth for Integrations
description: Use OAuth to authenticate integrations.
further_reading:
- link: "/developers/authorization/oauth2_in_datadog/"
  tag: "Documentation"
  text: "OAuth2 in Datadog"
- link: "https://www.datadoghq.com/blog/oauth/"
  tag: "Blog"
  text: "Authorize your Datadog integrations with OAuth"

---

## Overview

OAuth enables Datadog customers to securely authorize third-party access to their Datadog organization. This authorization allows integrations to push data into Datadog or pull data out from Datadog without the need for customers to input API or app keys anywhere. For example, a user can consent to provide an on-call notification tool with read access to their Datadog organization's monitors.

For more information on Datadog's OAuth implementation, see the [Datadog OAuth2 documentation][1].

## When to use OAuth in an integration

OAuth support is required for all partner-built SaaS integrations that directly submit data to, or query data from, Datadog's public [API endpoints][12]. OAuth does not apply to software deployed on-premises, or to Datadog Agent checks. 

## Build an integration with OAuth

When building an integration with OAuth, you should only select the scopes to which your application needs access. After a customer consents to authorize your integration, all listed scopes become available to your application through a token.

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

   The OAuth clients you create for integrations are **confidential clients** that provide a client ID and client secret. The client you create in this step is a private version of the client, whose credentials you can use for testing. When a published version of this client is created, you will receive a new set of credentials. **These credentials are never shown again after you create the client, so be sure to store them in a secure location.**

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
If your OAuth client requests the `api_keys_write` scope, ensure that you can successfully make a request to the `marketplace_create_api` endpoint with your token in the headers of the request.

If successful, this request returns an API key that you can find on the [API Keys Management page][10]. You must securely save this key to use it for submitting data into Datadog on behalf of the user. **You cannot access this API key value again after the initial request response**.

#### Test multiple Datadog sites
Test that your OAuth client can work across multiple [Datadog sites][8] by kicking off authorization from your EU Datadog sandbox organization.
   1. If you do not have access to a sandbox account on a different site, contact `ecosystems@datadog.com`.
   2. Export your app manifest from the organization in the *original* US1 Datadog site by navigating to the app you've created in the Developer Platform, clicking the Gear icon to the right of **Documentation**, and clicking **Export App Manifest**.
   3. In your EU sandbox organization, navigate to the Developer Platform and import your app manifest from Step 2.
   4. After successfully importing your manifest, navigate to the **OAuth & Permissions** tab to find your OAuth client, along with its client ID and client secret. Update your OAuth implementation to use these credentials.
   5. Navigate to the **Test Authorization** button, click it, and go through the OAuth flow.

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
       - ```
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

### The scopes for sending metrics, events and logs are not listed in the list of scopes

To send data into Datadog, select the  `api_keys_write` scope, which creates an API Key on behalf of the user. Use that API key to make calls to the Datadog API.

### API Keys & Tokens



**A:** 
**Q: Does the api key or refresh tokens expire?**

**A:** Refresh tokens do not expire unless the user revokes authorization or the partner revokes the token. If the partner revokes the refresh token, the user must re-authorize the integration to generate new refresh and access tokens. For reference: ![][image1][OAuth2 Authorization Endpoints Reference](https://docs.datadoghq.com/developers/authorization/oauth2_endpoints/?tab=tokenendpoints#exchange-authorization-code-for-access-token)

**Q: How do I find my API key again?**

**A:** After calling the [api\_keys/marketplace](https://docs.datadoghq.com/developers/authorization/oauth2_endpoints/?tab=apikeycreationendpoints#post-apiv2api_keysmarketplace) endpoint, you’ll receive the API Key in the response. Note: You won’t be able to view it again or regenerate it. You will need to store the response so it can be used to send data continuously.

If you lost the API Key in the testing phase, partners can follow the steps to revoke the API Key in their Partner Sandbox Account: 

1. Go to your  [Datadog API Keys Management page](https://app.datadoghq.com/organization-settings/api-keys)   
2. Click on the API Key that was created with the POST request  
3. Select “Revoke” to revoke the API Key. Note: The API key will have "OAuth Client API Key" in the name.    
4. Once revoked, the API Key will be disabled and you will repeat the post request to create a new API Key. 

Once revoked, you will need to follow the steps to re-install the integration and go through the OAuth flow again. 

### OAuth Testing & Errors

**Q: We are testing our OAuth client with another account, but we’re getting the following error:**

invalid\_request \- Invalid client\_id parameter value

**A:** You can only authorize the OAuth client from the account it was created in (partner's sandbox account). This error will occur if you try to authorize outside of that account until the client is published.

 

**Q: I am getting a forbidden error because I don’t have an app key to send data via the api**

A: The app key is replaced by the access token. Use the access\_token to make API calls, and for endpoints requiring an API key, use the created API key with the access token in the authorization header:

headers \= {"Authorization": "Bearer {}".format(access\_token)}.

 **Q: As we are conducting our final testing of the published client, we see the following error: {"errors": \["invalid\_request \- Mismatching redirect URI."\]}** 

**A:** This likely has to do with configuration differences in your testing client vs. your published client. Here are a few things that can cause this issue:

* You are trying to use your published client before the integration has been published to your sandbox. You will need to use your testing client until the integration has been merged to your sandbox account.   
* Using the incorrect client\_id in your authorization request (likely using the client\_id of your testing client instead of the client\_id of your published client)  
* Using the incorrect redirect\_uri in your authorization request (you may be using the staging redirect\_uri that you were using for testing, rather than your prod one)

**Q: We are seeing an error when making an API call to orgs with subdomains.**  

A: When connecting to the Datadog API, do not include the subdomain in the API call. For example, use datadoghq.eu instead of bigcorp.datadoghq.eu. Although the site parameter returns the subdomain, when you make calls/connect to the Datadog API, you should not be including the sub-domain, only the regional site. 

**Q: I’m getting a “Forbidden” error when trying to make an API call/request to a specific endpoint, even though I’ve enabled the scope corresponding to that endpoint**

A: This can happen if the API key, session, or OAuth token is invalid or expired. Ensure they are valid.

**Q: We've just started working on our Datadog integration and ran into an OAuth flow problem with PKCE. I've tried running the authorize and token endpoints manually and getting the same error "Invalid code or code verifier".**

A: Ensure the content-type header is set to “application/json” or “application/x-www-form-urlencoded” 

### General Troubleshooting

**Q: How do we support users in other sites? How can we know what a customer’s Datadog site is?**

**A:** To make OAuth work for users across all Datadog regions, you will need to ensure that you’re making the correct API calls based on the users region. When the user kicks off authorization from the Datadog tile, a site parameter is sent on redirect from the onboarding\_url. You will use this site parameter in your calls to the Authorize and Token endpoints. **Please note that if a user kicks off authorization directly from your platform, this site parameter will not be sent, and the user will be prompted to select their site on the Datadog authorize page.**

 Additionally, Your calls to the Datadog API must match the user’s region, i.e. https://trace.browser-intake-datadoghq.com for US, vs. https://public-trace-http-intake.logs.datadoghq.eu for EU.

 

**Q:** **Is there a way to test multiple orgs and different regions prior to publishing?**

**A:** You cannot test other organizations with your testing client. You can [test in other regions](https://docs.datadoghq.com/developers/integrations/oauth_for_integrations/#test-multiple-datadog-sites) by copying your client into your EU sandbox to make sure that the flow works, but you will need to get your OAuth client published before testing other organizations. 

Note: Once we publish the OAuth client, we will publish the tile in your org only. Once published, you’ll be able to test freely from outside organizations.

 

**Q: What's the difference between publishing an OAuth client and publishing the integration?**

**A:** When implementing OAuth with Datadog you'll be working with two OAuth clients:

1. Your testing client. This is created as soon as you click "Create Confidential Client" in the Developer Platform. This client only allows for authorization within your own organization.   
2. Your published client. This is created after you click "Kick off publishing process" in the Publishing tab of the Developer Platform. You'll receive a new Client ID and Client Secret, and this will be what you'll use in your own production environment so that any Datadog organization can authorize your integration once it's completed.

If you delete your client and create a new one in the Developer Platform, that new one will be a testing client, and will not be able to be authorized from outside of your organization. In order to be able to authorize from other organizations, you will need to go through the publishing process to create a published client. 

Just because you have a published OAuth client, does not mean that you have a published integration. An integration is published when all customers can see the tile appear on the [Integrations page](https://app.datadoghq.com/integrations). There's a separate process to create and publish that tile which you [can read more about here](https://docs.datadoghq.com/developers/marketplace/offering) (even though the article is titled Marketplace offerings, the instructions apply for free integration offerings as well). 

[image1]: <data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAA2dJREFUOE9tkm1Mk1cUx//3Pu2wtlA2xNICQmumILRu6nQRzZhR1AWjIdPJsrkgTHDLwrLND8uyxfnJOecnN8YGmvhSC27wYeLLB50R2BJddJSiolI6kLYCHRT6/rzc5blLWLbsfDq5OeeX87vnEPwnyssPapbMLtMjqSyQmZTDCM0lhFkJpTYmK4UMZBEVaFdL3+6P1FZSu+zsaqqhOxmQL2iIWdAI5lRcWggCAxgTGIBNbyyF3piGru8HICZlEEI6W/qrqzigzu6sYQwnrPYs1B9Zi3AogUstd1G63gLLYiOSMRFLVi3E4M1xePtDuNDsUdt6Wz3V6/4GOJwbwMjVj89sgs2RBf+jMLLzDdCmCXNyiaiI04duIcuix8WWuyACfRTuo0XnsUsm++zOIgUYqDu8lq55pQCj96dANRQ5hemYGI0gx5qBeETED8d+R0+HF7KsgApkysjE/KPuPVFSW9L+DIjk0xm06VWNyxHwhlHxVjG87hB3/rRtMwSBwNMbwKmDtzA1HgOhJEVFqfC7e28GyL6VzVo5ZRgEI9bNNcXY8a6dj59KyFBkhnl6DZjCMOmPou/6GFxf3FbNGajoaHXv8RBVtLb0XA/AykrKzHi/qRyEv/4Tk2NRfPthD7a/Y8fxxm7IkqJCKls91V28tM5xzsUU9pqgodjWUILK+lJEppMYH42goOhpMAbcufYY6md2d3qR96yRhQIx9wfNLz/HAfUrXEeklHJAzQ2ZaTh8eRsSUQndHUNzKqu3LoKpIIMrqRNdPTsY/PG3oTwOaFjp2i8mlW/UXNVo/PolhCfjCPpmUbzGNOfy8PYELLYMtB29g3k6zZ+9zuECDthb6qogUK7Y15nx+ieroEgMmSYdBnqDWLExj19fbFbEoVcvQdBSrvdipXW6u+OBnQPeXu4sWZCb7vmsfQsfMeibwfhIhDubbUYcf+8GntIJCHhn5qYp224L/do5tJEDap5vzy5cnDF24OQGrc6g5UU/NXkgpmT8cW8KjwenkZ1nQJZlPvSZaeqW5CfDs/GBXwJVHKDegkAzP2/4qszuWJ9bqb5db3s4MT2Z8IsJOT0SToWf+Ga8EyMz/nhUCqaSoo8pdASSvu9fG2eMGft7/MeG3aEXfnY9aAqFY6dMMOFLd0WMqMfzP/EXZwB/OTeZMwAAAAAASUVORK5CYII=>



## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/developers/authorization/oauth2_in_datadog/
[2]: https://app.datadoghq.com/marketplace
[3]: https://app.datadoghq.com/integrations
[4]: https://app.datadoghq.com/apps
[5]: https://github.com/DataDog/integrations-extras/
[6]: http://github.com/DataDog/marketplace
[7]: https://docs.datadoghq.com/developers/integrations/marketplace_offering/#list-an-offering
[8]: https://docs.datadoghq.com/getting_started/site/
[9]: https://app.datadoghq.com/organization-settings/oauth-applications
[10]: https://app.datadoghq.com/organization-settings/api-keys
[12]: https://docs.datadoghq.com/api/latest/using-the-api/
