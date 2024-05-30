---
title: Configure SCIM with Okta
kind: documentation
algolia:
  tags: ["scim", "identity provider", "IdP", "Okta"]
---

See the following instructions to synchronize your Datadog users with Okta using SCIM.

For the capabilities and limitations of this feature, see [SCIM][1].

## Prerequisites

SCIM in Datadog is an advanced feature included in the Enterprise plan.

This documentation assumes your organization manages user identities using an identity provider.

Datadog strongly recommends that you use a service account application key when configuring SCIM to avoid any disruption in access. For further details, see [using a service account with SCIM][2].

When using SAML and SCIM together, Datadog strongly recommends disabling SAML just-in-time (JIT) provisioning to avoid discrepancies in access. Manage user provisioning through SCIM only.

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
    - **Base URL**: `https://{{< region-param key="dd_full_site" >}}/api/v2/scim` **Note:** Use the appropriate subdomain for your site. To find your URL, see [Datadog sites][3].
    - **API Token**: Use a valid Datadog application key. You can create an application key on [your organization settings page][4]. To maintain continuous access to your data, use a [service account][5] application key.

{{< img src="/account_management/scim/okta-admin-credentials.png" alt="Okta Admin Credentials configuration screen">}}

5. Click **Test API Credentials**, and wait for the message confirming that the credentials are verified.
6. Click **Save**. The settings section appears.
7. Next to **Provisioning to App** , select **Edit** to enable the features:
    - **Create Users**
    - **Update User Attributes**
    - **Deactivate Users**
8. Under **Datadog Attribute Mappings**, find the mapping of Okta attributes to Datadog attributes already pre-configured. You can re-map them if needed, but map the Okta values to the same set of Datadog values.

### Group attributes

Group mapping is not supported.

[1]: /account_management/scim/
[2]: /account_management/scim/#using-a-service-account-with-scim
[3]: /getting_started/site
[4]: https://app.datadoghq.com/organization-settings/application-keys
[5]: /account_management/org_settings/service_accounts
