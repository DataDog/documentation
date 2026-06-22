---
title: User Provisioning with SCIM
description: Automate user provisioning and deprovisioning in Datadog using SCIM integration with Microsoft Entra ID and Okta identity providers.
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
SCIM is available with the Infrastructure Pro, Infrastructure Enterprise, and Startup plans.
</div>

## Overview

The System for Cross-domain Identity Management, or [SCIM][9], is an open standard that allows for the automation of user provisioning. Using SCIM, you can automatically provision and deprovision users in your Datadog organization in-sync with your organization's identity provider (IdP).

### Supported capabilities

- Create users in Datadog (Email verification is required for first login, see [email verification][1])
- Remove users in Datadog when they no longer require access
- Keep user attributes synchronized between the identity provider and Datadog
- Single sign-on to Datadog (recommended)
- Managed Teams: Create Datadog Teams from identity provider groups and keep membership of the Datadog Teams synchronized with group membership in the identity provider.
- Role provisioning: Provision a user's Datadog role (built-in or custom) from an identity provider attribute, and keep it synchronized. When the attribute changes in your identity provider, the user's Datadog role updates in real time.

#### Role provisioning behavior

When a SCIM request includes one or more roles, Datadog provisions only the roles that match a role in your organization. If none of the roles match, the user falls back to your organization's default role (Standard). Unmatched roles are logged to [Audit Trail][11].

SCIM is the source of truth for role assignment and takes precedence over [SAML role mappings][12]. SCIM role provisioning events are recorded in Audit Trail and as StatsD metrics.

Roles follow the SCIM multi-valued attribute convention defined in [RFC 7643][13]. Both Okta and Microsoft Entra ID support this mapping natively, with no custom scripting required. For setup instructions, see the documentation for your identity provider.

Datadog implements the SCIM server protocol. Datadog supports using SCIM with the Microsoft Entra ID and Okta identity providers. Other identity providers may work, but are not explicitly supported.

To configure SCIM for supported identity providers, see the documentation for your IdP:
- [Microsoft Entra ID][2]
- [Okta][3]

### Prerequisites

SCIM in Datadog is an advanced feature included in the Infrastructure Pro and Infrastructure Enterprise plans.

This documentation assumes your organization manages user identities using an identity provider.

Datadog strongly recommends that you use a service account application key when configuring SCIM to avoid any disruption in access. For further details, see [using a service account with SCIM][4].

When using SAML and SCIM together, Datadog strongly recommends disabling SAML just-in-time (JIT) provisioning to avoid discrepancies in access. Manage user provisioning through SCIM only.

## Using a service account with SCIM

To enable SCIM, you must use an [application key][5] to secure the connection between your identity provider and your Datadog account. A specific user or service account controls each application key.

If you use an application key tied to a user to enable SCIM and that user leaves your organization, their Datadog account becomes deprovisioned. That user-specific application key gets revoked, and you permanently break your SCIM integration, preventing users in your organization from accessing Datadog.

To avoid losing access to your data, Datadog strongly recommends that you create a [service account][6] dedicated to SCIM. Within that service account, create an application key to use in the SCIM integration.

The service account requires at minimum the `user_access_invite` and `user_access_manage` permissions. For the full list of required permissions, see the [SCIM API documentation][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/scim/#email-verification
[2]: /account_management/scim/azure
[3]: /account_management/scim/okta
[4]: /account_management/scim/#using-a-service-account-with-scim
[5]: /account_management/api-app-keys
[6]: /account_management/org_settings/service_accounts
[7]: https://app.datadoghq.com/organization-settings/users
[8]: /help/
[9]: https://scim.cloud/
[10]: /api/latest/scim/
[11]: /account_management/audit_trail/
[12]: /account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
[13]: https://www.rfc-editor.org/rfc/rfc7643.html#section-4.1.2
