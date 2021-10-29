---
title: Configuring Login Methods
kind: documentation
---

Login Methods are how users are able to authenticate themselves and log into your Datadog Organization. The Login Methods interface allows users with the Privileged Access permission, such as users with the Datadog Admin Role, to enable and disable the Default Login Methods for users in their organization. 

When a Login Method is enabled by default any user who is not explicitly denied access ([via an user login method override][1]) can use this Login Method to access Datadog so long as their username (their email address) matches the user who is invited to the Organization.

There are three login methods available to Datadog Organizations:

- Datadog Username and Password (also known as Standard)
- Sign in with Google
- Sign in with SAML

## Enabling or Disabling a Default Login Method ##

From the Login Methods interface, Organization Managers can choose to enable, or disable the Default Login Methods for your Organization. All new Organizations start with Datadog Username and Password and Signing in with Google are enabled and configured for all organizations and users. Once you've configured SAML that login method will also be enabled.

1. Navigate to the [Login Methods interface][2]
{{< img src="account_management/login_methods_all_enabled.png" alt="User Login Method update" style="width:80%;">}}
2. Select the appropriate state for the Login Method to match your organization's preference or policy requirements.
3. Confirm your selection.
{{< img src="account_management/login_methods_disable_confirmation.png" alt="User Login Method update" style="width:80%;">}}

Note: You cannot disable all Login Methods for an Organization. At least one Login Method must be enabled by Default for your organization.

## Reviewing User Overrides ##

In circumstances where an override has been set, you can example in the below image the Login Method for "Google" is disabled by default for users of the organiztion, but one user has the method enabled by having an override set.

{{< img src="account_management/login_methods_disabled_overrides_set.png" alt="Login Method disabled, with User Override enabled" style="width:80%;">}}

When navigating to the [User Management interface][3] you can filter users by the override methods set, or view users who have the Default login methods enabled:

{{< img src="account_management/users/user_page_login_methods_override_view.png" alt="User Management view filtered to login override methods enabled." style="width:80%;">}}

If necessary you can edit the user's overrides or remove the override altogether to allow the user to only use the defaults. See the documentation about managing the [User's override method][1].

[1]: /account_management/users/#edit-a-users-login-methods
[2]: https://app.datadoghq.com/organization-settings/login-methods
[3]: https://app.datadoghq.com/organization-settings/users
