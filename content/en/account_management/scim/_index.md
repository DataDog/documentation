---
title: User Provisioning with SCIM
kind: documentation
algolia:
  tags: ["scim", "identity provider", "IdP"]
---

## Overview

The System for Cross-domain Identity Management, or SCIM, is an open standard that allows for the automation of user provisioning. Using SCIM, you can automatically provision and deprovision users in your Datadog organization in sync with your organization's identity provider (IdP).

### Supported capabilities

- Create users in Datadog (Email verification is required for first login, see [email verification][5])
- Remove users in Datadog when they no longer require access
- Keep user attributes synchronized between Azure AD and Datadog
- Single sign-on to Datadog (recommended)

Datadog supports using SCIM with the Azure Active Directory (Azure AD) IdP.

### Prerequisites

Using SCIM with Datadog requires an enterprise account.

This documentation assumes your organization manages user identities using an identity provider.

Datadog strongly recommends that you use a service account application key when configuring SCIM to avoid any disruption in access. For further details, see [using a service account with SCIM][1].

When using SAML and SCIM together, Datadog strongly recommends disabling SAML just-in-time (JIT) provisioning to avoid discrepancies in access. Manage user provisioning through SCIM only.

## Configure SCIM with Azure Active Directory

### Add Datadog to the Azure AD application gallery

1. In your Azure portal, go to **Azure Active Directory** -> **Enterprise Applications**
2. Click **New Application** -> **Create your own application**
3. Type "Datadog" in the search box
4. Select the Datadog application from the gallery
5. Enter a name
6. Click **Create**

**Note:** If you already have Datadog configured with Azure AD for SSO, go to **Enterprise Applications** and select your existing Datadog application.

### Configure automatic user provisioning

1. In the application management screen, select **Provisioning** in the left panel
2. In the **Provisioning Mode** menu, select **Automatic**
3. Open **Admin Credentials**
4. Complete the **Admin Credentials** section as follows:
    - **Tenant URL**: `https://app.datadoghq.com/api/v2/scim`
    - **Secret Token**: Use a valid Datadog application key. You can create an application key on [your organization settings page][2]. To maintain continuous access to your data, use a [service account][3] application key.

{{< img src="/account_management/scim/admin-credentials.png" alt="Azure AD Admin Credentials configuration screen">}}

5. Click **Test Connection**, and wait for the message confirming that the credentials are authorized to enable provisioning.
6. Click **Save**. The mapping section appears. See the following section to configure mapping.

### Attribute mapping

#### User attributes

1. Expand the **Mappings** section
2. Click **Provision Azure Active Directory Users**
3. Set **Enabled** to **Yes**
4. Click the **Save** icon
5. Under **Target Object actions**, ensure Create, Update, and Delete actions are selected
6. Review the user attributes that are synchronized from Azure AD to Datadog in the attribute mapping section. Set the following mappings:
| Azure Active Directory Attribute | Datadog Attribute              |
|----------------------------------|--------------------------------|
| `userPrincipalName`              | `userName`                     |
| `Not([IsSoftDeleted])`           | `active`                       |
| `jobTitle`                       | `title`                        |
| `mail`                           | `emails[type eq "work"].value` |
| `displayName`                    | `name.formatted`               |

   {{< img src="/account_management/scim/ad-users.png" alt="Attribute mapping configuration, Provision Azure Active Directory Users">}}

7. After you set your mappings, click **Save**.

#### Group attributes

Group mapping is not supported.

## Using a service account with SCIM

To enable SCIM, you must use an [application key][4] to secure the connection between your identity provider and your Datadog account. A specific user or service account controls each application key.

If you use an application key tied to a user to enable SCIM and that user leaves your organization, their Datadog account becomes deprovisioned. That user-specific application key gets revoked, and you permanently break your SCIM integration, preventing users in your organization from accessing Datadog.

To avoid losing access to your data, Datadog strongly recommends that you create a [service account][3] dedicated to SCIM. Within that service account, create an application key to use in the SCIM integration.

## Email verification

Creating a new user with SCIM triggers an email to the user. For first time access, you are required to login through the the invite link shared by email. The link is active for 30 days. If it expires, go to the [user settings page][6] and select a user to resend an invite link.

[1]: /account_management/scim/#using-a-service-account-with-scim
[2]: https://app.datadoghq.com/organization-settings/application-keys
[3]: /account_management/org_settings/service_accounts
[4]: /account_management/api-app-keys
[5]: /account_management/scim/#email-verification
[6]: https://app.datadoghq.com/organization-settings/users
