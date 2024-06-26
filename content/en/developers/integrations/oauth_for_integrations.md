---
aliases:
- /developers/integrations/oauth_for_data_integrations/
kind: documentation
title: OAuth for Integrations
description: Use OAuth to authenticate integrations.
---
{{< callout btn_hidden="true" >}}
  The Datadog Developer Platform is in beta. If you don't have access, contact apps@datadoghq.com.
{{< /callout >}} 

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

1. Navigate to the **Publishing** tab under **General**. At the top of this tab, you receive your published client ID and secret. Your OAuth implementation needs to be updated to include these client credentials. **Note:** Save your client ID and client secret in a secure location. This information is not shown again.

2. Under the Integration Publishing section, follow the steps to add your OAuth information to use below within your pull request. 

3. When opening a pull request for a **new integration** in `integrations-extras` or `Marketplace`, copy the `app_uuid` value under the Integration Publishing section and paste this within your manifest.json file under the `app_uuid` field. 

Once an OAuth client is submitted for publishing, the team is notified. When your pull request is approved by all required parties and is ready to be merged, at that point your OAuth client gets published as well. Your integration tile is then published to your sandbox account (_not_ for all customers), and your OAuth client can then be authorized by any Datadog organization (not only your Sandbox organization).

At this point, Datadog recommends doing final testing with your OAuth client to ensure authorization is working smoothly.

#### Making changes after submitting your client for publishing

You cannot edit a published OAuth client directly, so only go through the publishing flow when everything has been tested and is ready to go. To make updates to the OAuth client after it has been submitted for publishing, you need to go through the publishing flow again and re-submit. **The published client credentials do not appear again**.

For more information about publishing your integration tile and creating your pull request, see the [Marketplace and Integrations documentation][7].

## Further Reading

Additional helpful documentation, links, and articles:

- [OAuth 2.0 in Datadog][1]
- [Authorize your Datadog integrations with OAuth][11]

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
[11]: https://www.datadoghq.com/blog/oauth/
[12]: https://docs.datadoghq.com/api/latest/using-the-api/
