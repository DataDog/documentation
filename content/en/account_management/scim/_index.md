---
title: User Provisioning with SCIM
further_reading:
    - link: '/account_management/scim/azure/'
      tag: 'Documentation'
      text: 'Configure SCIM with Azure Active Directory'
    - link: 'account_management/scim/okta'
      tag: 'Documentation'
      text: 'Configure SCIM with Okta'
algolia:
  tags: ["scim", "identity provider", "IdP"]
---

<div class="alert alert-info">
SCIM is only available for the Enterprise plan.
</div>

## Overview

The System for Cross-domain Identity Management, or SCIM, is an open standard that allows for the automation of user provisioning. Using SCIM, you can automatically provision and deprovision users in your Datadog organization in sync with your organization's identity provider (IdP).

### Supported capabilities

- Create users in Datadog (Email verification is required for first login, see [email verification][1])
- Remove users in Datadog when they no longer require access
- Keep user attributes synchronized between the identity provider and Datadog
- Single sign-on to Datadog (recommended)

Datadog supports using SCIM with the Azure Active Directory (Azure AD) and Okta identity providers. To configure SCIM, see the documentation for your IdP:
- [Azure AD][2]
- [Okta][3]

### Prerequisites

SCIM in Datadog is an advanced feature included in the Enterprise plan.

This documentation assumes your organization manages user identities using an identity provider.

Datadog strongly recommends that you use a service account application key when configuring SCIM to avoid any disruption in access. For further details, see [using a service account with SCIM][4].

When using SAML and SCIM together, Datadog strongly recommends disabling SAML just-in-time (JIT) provisioning to avoid discrepancies in access. Manage user provisioning through SCIM only.

## Using a service account with SCIM

To enable SCIM, you must use an [application key][5] to secure the connection between your identity provider and your Datadog account. A specific user or service account controls each application key.

If you use an application key tied to a user to enable SCIM and that user leaves your organization, their Datadog account becomes deprovisioned. That user-specific application key gets revoked, and you permanently break your SCIM integration, preventing users in your organization from accessing Datadog.

To avoid losing access to your data, Datadog strongly recommends that you create a [service account][6] dedicated to SCIM. Within that service account, create an application key to use in the SCIM integration.

## Email verification

Creating a new user with SCIM triggers an email to the user. For first time access, you are required to log in through the the invite link shared by email. The link is active for 2 days. If it expires, go to the [user settings page][7] and select a user to resend an invite link.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/scim/#email-verification
[2]: /account_management/scim/azure
[3]: /account_management/scim/okta
[4]: /account_management/scim/#using-a-service-account-with-scim
[5]: /account_management/api-app-keys
[6]: /account_management/org_settings/service_accounts
[7]: https://app.datadoghq.com/organization-settings/users
