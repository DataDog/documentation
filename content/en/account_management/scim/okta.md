---
title: SCIM provisionning with Okta
kind: documentation
algolia:
  tags: ["scim", "identity provider", "IdP", "Okta"]
---

## Overview

The System for Cross-domain Identity Management, or SCIM, is an open standard that allows for the automation of user provisioning. Using SCIM, you can automatically provision and deprovision users in your Datadog organization in sync with your organization's identity provider (IdP).

### Supported capabilities

- Create users in Datadog
- Remove users in Datadog when they no longer require access
- Keep user attributes synchronized between Okta and Datadog
- Single sign-on to Datadog (recommended)

Datadog supports using SCIM with the Okta Identity platform.

### Prerequisites

Using SCIM with Datadog requires an enterprise account.

This documentation assumes your organization manages user identities using an identity provider.

Datadog strongly recommends that you use a service account application key when configuring SCIM to avoid any disruption in access. For further details, see [using a service account with SCIM][1].

When using SAML and SCIM together, Datadog strongly recommends disabling SAML just-in-time (JIT) provisioning to avoid discrepancies in access. Manage user provisioning through SCIM only.

## Configure SCIM with Okta

### Select the Datadog to the Okta application gallery

1. In your Okta portal, go to **Applications**
2. Click **Browse App Catalog**
3. Type "Datadog" in the search box
4. Select the Datadog application
5. Click **Add Integration**

**Note:** If you already have Datadog configured with Okta, select your existing Datadog application.

### Configure automatic user provisioning

1. In the application management screen, select **Provisioning** in the left panel
2. Click **Configuration API integration**.
3. Select **Enable API integration**.
3. Complete the **Credentials** section as follows:
    - **Base URL**: `https://app.datadoghq.com/api/v2/scim` (Review your subdomain according to your site, see [Datadog sites][5])
    - **API Token**: Use a valid Datadog application key. You can create an application key on [your organization settings page][2]. To maintain continuous access to your data, use a [service account][3] application key.

{{< img src="/account_management/scim/okta-admin-credentials.png" alt="Okta Admin Credentials configuration screen">}}

5. Click **Test API Credentials**, and wait for the message confirming that the credentials are verified.
6. Click **Save**. The settings section appears.
7. Next to **Provisioning to App** , select **Edit** to enable the features:
    - **Create Users**
    - **Update User Attributes**
    - **Deactivate Users**
8. Under **Datadog Attribute Mappings** you can find the mapping of Okta attributes to Datadog Attributes already pre-configured. You can re-map them if needed, but they should always map to those exact value on the Datadog side.

#### Group attributes

Group mapping is not supported.

## Using a service account with SCIM

To enable SCIM, you must use an [application key][4] to secure the connection between your identity provider and your Datadog account. A specific user or service account controls each application key.

If you use an application key tied to a user to enable SCIM and that user leaves your organization, their Datadog account becomes deprovisioned. That user-specific application key gets revoked, and you permanently break your SCIM integration, preventing users in your organization from accessing Datadog.

To avoid losing access to your data, Datadog strongly recommends that you create a [service account][3] dedicated to SCIM. Within that service account, create an application key to use in the SCIM integration.

[1]: /account_management/scim/#using-a-service-account-with-scim
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /account_management/org_settings/service_accounts
[4]: /account_management/api-app-keys
[5]: /getting_started/site
