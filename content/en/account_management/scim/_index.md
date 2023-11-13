---
title: User Provisioning with SCIM
kind: documentation
further_reading:
    - link: '/account_management/scim/azure/'
      tag: 'Documentation'
      text: 'Configure SCIM with Azure Active Directory'
algolia:
  tags: ["scim", "identity provider", "IdP"]
---

## Overview

The System for Cross-domain Identity Management, or SCIM, is an open standard that allows for the automation of user provisioning. Using SCIM, you can automatically provision and deprovision users in your Datadog organization in sync with your organization's identity provider (IdP).

### Supported capabilities

- Create users in Datadog (Email verification is required for first login, see [email verification][1])
- Remove users in Datadog when they no longer require access
- Keep user attributes synchronized between Azure AD and Datadog
- Single sign-on to Datadog (recommended)

Datadog supports using SCIM with the Azure Active Directory (Azure AD) IdP.

### Prerequisites

Using SCIM with Datadog requires an enterprise account.

This documentation assumes your organization manages user identities using an identity provider.

Datadog strongly recommends that you use a service account application key when configuring SCIM to avoid any disruption in access. For further details, see [using a service account with SCIM][2].

When using SAML and SCIM together, Datadog strongly recommends disabling SAML just-in-time (JIT) provisioning to avoid discrepancies in access. Manage user provisioning through SCIM only.

## Using a service account with SCIM

To enable SCIM, you must use an [application key][3] to secure the connection between your identity provider and your Datadog account. A specific user or service account controls each application key.

If you use an application key tied to a user to enable SCIM and that user leaves your organization, their Datadog account becomes deprovisioned. That user-specific application key gets revoked, and you permanently break your SCIM integration, preventing users in your organization from accessing Datadog.

To avoid losing access to your data, Datadog strongly recommends that you create a [service account][4] dedicated to SCIM. Within that service account, create an application key to use in the SCIM integration.

## Email verification

Creating a new user with SCIM triggers an email to the user. For first time access, you are required to login through the the invite link shared by email. The link is active for 30 days. If it expires, go to the [user settings page][5] and select a user to resend an invite link.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/scim/#email-verification
[2]: /account_management/scim/#using-a-service-account-with-scim
[3]: /account_management/api-app-keys
[4]: /account_management/org_settings/service_accounts
[5]: https://app.datadoghq.com/organization-settings/users
