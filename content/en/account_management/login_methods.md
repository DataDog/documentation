---
title: Configuring Login Methods
description: Enable or disable authentication methods like username/password, Google OAuth, and SAML for your Datadog organization with MFA enforcement options.
---

Login Methods determine how users may authenticate themselves and log into your Datadog organization. Using Login Methods to enable or disable the default login methods requires one of the following privileged access permissions:

- Datadog Admin Role
- Org Management (`org_management`) permission

When a login method is enabled by default, any user who is not explicitly denied access ([by a user login method override][1]) can use that login method to access Datadog, provided their username (their email address) matches the user that is invited to the organization.

The following login methods are available:

- Datadog Username and Password (also known as Standard)
    - Passwords must use at least 8 characters containing at least 1 number and 1 lowercase letter
- Sign in with Google
- [Sign in with SAML][2]

## Enabling or disabling a default login method

As an organization manager, you can enable or disable the default login methods for your organization. New organizations start with **Datadog Username and Password** and **Sign in with Google** enabled and configured for all organizations and users. After you configure SAML, **Sign in with SAML** is also enabled.

1. Navigate to [Login Methods][3].
2. Set the **Enabled by Default** setting for each method to `On` or `Off`, according to your organization's preference or policy requirements.
3. Confirm your selection.

**Note**: You cannot disable all login methods for an organization. At least one login method must be enabled by default for your organization.

## Requiring Multi-factor Authentication

For enhanced security, organization managers can enforce [Multi-factor Authentication][4] (MFA) for all users in the organization that log in with an email and password.

1. Navigate to [Login Methods][3].
2. Set the **Require Multi-Factor Authentication** setting to `On` or `Off`, according to your organization's preference or policy requirements.
3. Confirm your selection.

Setting **Require Multi-Factor Authentication** to `On` has two effects:
- Users that log in with an email and password must register a second authentication factor before accessing the organization.
- In Login Methods, a link to [**View users without MFA**][5] appears. Click on the link to see the users list, filtered on users without MFA.

The setting to require multi-factor authentication is independent of the default login method settings. Regardless of which login methods you enable by default, enforcing MFA requires a second authentication factor for users that log in with an email and password.

## Reviewing user overrides

Using overrides, you can change the available login methods for individual users. In the following example, **Sign in with Google** is Off by default in the organization, but one user has it enabled by having an override set.

{{< img src="account_management/login_methods_enabled_off.png" alt="Login method disabled, with user override enabled" style="width:80%;">}}

In [User Management][6], you can filter users by the override methods set, or view users who have the Default login methods enabled:

{{< img src="account_management/users/user_page_login_methods_override_view.png" alt="User Management view filtered to show users by login methods set." style="width:80%;">}}

You can edit the user's overrides or remove the override altogether to allow the user to only use the defaults. For more information see [Edit a user's login methods][1].

[1]: /account_management/users/#edit-a-users-login-methods
[2]: /account_management/saml/
[3]: https://app.datadoghq.com/organization-settings/login-methods
[4]: /account_management/multi-factor_authentication/
[5]: https://app.datadoghq.com/organization-settings/users?filter%5Ballowed_login_methods%5D=standard&filter%5Bmfa_enabled%5D=false&filter%5Bstatus%5D=Active
[6]: https://app.datadoghq.com/organization-settings/users
