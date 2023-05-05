---
title: User Provisioning with SCIM
kind: guide
---

## Overview

The System for Cross-domain Identity Management, or SCIM, is an open standard that allows for the automation of user provisioning. Using SCIM, your can automatically provision and deprovision users in your Datadog organization in sync with your organization's identity provider (IdP).

### Prerequisites

Datadog strongly recommends that you use a service account application key when configuring SCIM to avoid any disruption in access. For further details, see [using a service account with SCIM][1].

This documentation assumes your organization manages user identities using an identity provider. 

Datadog supports using SCIM with the Azure Active Directory (Azure AD) IdP.

## Configuring SCIM with Azure Active Directory

### Create a Datadog application in Azure AD

1. In your Azure portal, go to **Azure Active Directory** -> **Enterprise Applications**
1. Click **New Application** -> **Create your own application**
1. Type "Datadog" in the search box
1. Select the Datadog application from the gallery 
1. Enter a name
1. Click **Create**

{{< img src="/account_management/guide/scim/create-datadog.png" alt="Azure AD app gallery">}}

**Note:** If you already have Datadog configured with Azure AD for SSO, go to **Enterprise Applications** and select your existing Datadog application.

### Configure provisioning

1. In the application management screen, select **Provisioning** in the left panel
1. In the **Provisioning Mode** menu, select **Automatic**
1. Open **Admin Credentials**
1. Complete the **Admin Credentials** section as follows:
    - **Authentication Method**: Bearer Authentication
    - **Tenant URL**: `https://app.datadoghq.com/api/v2/scim?aadOptscim062020`
    - **Secret Token**: Use a valid Datadog application key. To maintain continuous access to your data, use a [service account][2] application key.
1. Click **Test Connection** and wait for the message that confirms that the credentials are authorized to enable provisioning.
1. Click **Save**.

{{< img src="/account_management/guide/scim/admin-credentials.png" alt="Azure AD Admin Credentials configuration screen">}}

### Attribute mapping

#### User attributes

1. In the application management screen, select **Provisioning** in the left panel
1. Expand the **Mappings** section
1. Click **Provision Azure Active Directory Users**
1. Set **Enabled** to **Yes**
1. Click the **Save** icon

{{< img src="/account_management/guide/scim/ad-users.png" alt="Attribute mapping configuration, Provision Azure Active Directory Users">}}

#### Group attributes

1. In the application management screen, select **Provisioning** in the left panel
1. Expand the **Mappings** section
1. Click **Provision Azure Active Directory Groups**
1. Set **Enabled** to **No**
1. Click the **Save** icon

{{< img src="/account_management/guide/scim/ad-groups.png" alt="Attribute mapping configuration, Provision Azure Active Directory Groups">}}

## Using a service account with SCIM

To enable SCIM, you must use an [application key][3] to secure the connection between your identity provider and your Datadog account. A specific user or service account controls each application key.

If you use an application key tied to a user to enable SCIM and that user leaves your organization, their Datadog account becomes deprovisioned. That user-specific application key gets revoked, and you permanently break your SCIM integration, preventing users in your organization from accessing Datadog.

To avoid losing access to your data, Datadog strongly recommends that you create a [service account][2] dedicated to SCIM. Within that service account, create an application key to use in the SCIM integration.

[1]: /account_management/guide/scim/#using-a-service-account-with-scim
[2]: /account_management/org_settings/service_accounts
[3]: /account_management/api-app-keys
