---
title: Configuring Login Methods
kind: documentation
---

Login Methods determine how users may authenticate themselves and log into your Datadog organization. Using Login Methods to enable or disable the default login methods requires one of the following privileged access permissions:

- Datadog Admin Role
- Org Management (`org_management`) permission
- Edit Login Methods (`edit_login_methods`) permission

When a login method is enabled by default, any user who is not explicitly denied access ([by a user login method override][1]) can use that login method to access Datadog, provided their username (their email address) matches the user that is invited to the organization.

The following login methods are available:

- Datadog Username and Password (also known as Standard)
- Sign in with Google
- Sign in with SAML

## Enabling or disabling a default login method

As an organization manager you can enable or disable the default login methods for your organization. New organizations start with **Datadog Username and Password** and **Sign in with Google** enabled and configured for all organizations and users. After you configure SAML, **Sign in with SAML** is also enabled.

1. Navigate to [Login Methods][2].
2. Set the **Enabled by Default** setting for each method to `On` or `Off`, according to your organization's preference or policy requirements.
3. Confirm your selection.

**Note**: You cannot disable all login methods for an organization. At least one login method must be enabled by default for your organization.

## Reviewing user overrides

Using overrides, you can change the available login methods for individual users. In the following example, **Sign in with Google** is Off by default in the organization, but one user has it enabled by having an override set.

{{< img src="account_management/login_methods_disabled_overrides_set.png" alt="Login method disabled, with user override enabled" style="width:80%;">}}

In [User Management][3], you can filter users by the override methods set, or view users who have the Default login methods enabled:

{{< img src="account_management/users/user_page_login_methods_override_view.png" alt="User Management view filtered to login override methods enabled." style="width:80%;">}}

You can edit the user's overrides or remove the override altogether to allow the user to only use the defaults. For more information see [Edit a user's login methods][1].

[1]: /account_management/users/#edit-a-users-login-methods
[2]: https://app.datadoghq.com/organization-settings/login-methods
[3]: https://app.datadoghq.com/organization-settings/users
