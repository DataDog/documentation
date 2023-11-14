---
title: Configure SCIM with Okta
kind: documentation
algolia:
  tags: ["scim", "identity provider", "IdP", "Okta"]
---

See the following instructions to synchronize your Datadog users with Okta using SCIM.

For prerequisites, capabilities, and limitations, see [SCIM][1].

## Select the Datadog application in the Okta application gallery

1. In your Okta portal, go to **Applications**
2. Click **Browse App Catalog**
3. Type "Datadog" in the search box
4. Select the Datadog application
5. Click **Add Integration**

**Note:** If you already have Datadog configured with Okta, select your existing Datadog application.

## Configure automatic user provisioning

1. In the application management screen, select **Provisioning** in the left panel
2. Click **Configuration API integration**.
3. Select **Enable API integration**.
3. Complete the **Credentials** section as follows:
    - **Base URL**: `https://app.datadoghq.com/api/v2/scim` **Note:** Use the appropriate subdomain for your site. To find your URL, see [Datadog sites][2].
    - **API Token**: Use a valid Datadog application key. You can create an application key on [your organization settings page][3]. To maintain continuous access to your data, use a [service account][4] application key.

{{< img src="/account_management/scim/okta-admin-credentials.png" alt="Okta Admin Credentials configuration screen">}}

5. Click **Test API Credentials**, and wait for the message confirming that the credentials are verified.
6. Click **Save**. The settings section appears.
7. Next to **Provisioning to App** , select **Edit** to enable the features:
    - **Create Users**
    - **Update User Attributes**
    - **Deactivate Users**
8. Under **Datadog Attribute Mappings**, you can find the mapping of Okta attributes to Datadog Attributes already pre-configured. You can re-map them if needed, but map the Okta values to the same set of Datadog values.

### Group attributes

Group mapping is not supported.

[1]: /account_management/scim/
[2]: /getting_started/site
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: /account_management/org_settings/service_accounts
