---
title: Enable SSO
---

Enabling Single Sign-On (SSO) for your account allows you to simplify authentication and login access to Cloudcraft.

Cloudcraft supports SSO through these methods:

- **Datadog SSO**: Datadog SSO does not require any additional setup for new accounts. Select **Sign in with Datadog** on Cloudcraft's signup or login pages. [Contact the Cloudcraft support team][1] to enable this feature for existing
  accounts.
- **Google Workspace SSO**: Google SSO does not require any additional setup. Select **Sign in with Google** on Cloudcraft's signup or login pages.
- **SAML SSO**: Available for Cloudcraft Pro and Enterprise accounts, SAML SSO federates with your organization's existing identity provider, allowing your users to log in with their existing accounts and for your organization to centrally manage who has access to the application.

This article is all about SAML SSO and how to set it up in your account.

## Setting up SAML/SSO

<div class="alert alert-info">If you want to set up SSO for your account, <a href="https://app.cloudcraft.co/app/support" title="Contact the Cloudcraft support team">contact the Cloudcraft support team</a> to enable the feature.
After the feature is enabled, the account owner can complete the configuration.</div>

1. Go to **User** > **Security & SSO**.
2. Register Cloudcraft as a new application with your SAML identity provider. For detailed instructions, see the following articles:
    - [Enable SSO With Azure AD][2]
    - [Enable SSO With Okta][3]
    - [Enable SSO With a Generic Identity Provider][4]
3. Find the necessary details to create a new application with the identity provider in the same window.

{{< img src="cloudcraft/account-management/enable-sso/service-provider-details.png" alt="Cloudcraft SAML service provider integration settings" responsive="true" style="width:100%;">}}

4. After creating the application, return to Cloudcraft and upload the metadata file from the identity provider.
5. Select the **SAML Single Sign-On is enabled** option.
6. Enable the **Strict mode** option if you need to restrict access to Cloudcraft to only SAML SSO users.

## Additional features

Using SAML SSO with Cloudcraft enables additional benefits that are especially helpful when managing a large number of users.

### Just-in-time user provisioning

With **Just-in-Time User Provisioning**, Cloudcraft automatically creates user accounts when users sign in for the first time with a company email address, without requiring an invitation.

The option to change the default team that users join when they sign in for the first time can be found at the bottom of the **Security & Single Sign-On** page.

### Identity provider (IdP) initiated login

Allow signing in to Cloudcraft directly from your identity provider dashboard.

### Strict mode

With **Strict mode** enabled, all users must log in with SAML SSO. Existing username/password or Google Sign In logins are disabled.

Ensure the SAML SSO login is functioning correctly before enabling this option to avoid being locked out of your account.

[1]: https://app.cloudcraft.co/app/support
[2]: /cloudcraft/account-management/enable-sso-with-azure-ad/
[3]: /cloudcraft/account-management/enable-sso-with-okta/
[4]: /cloudcraft/account-management/enable-sso-with-generic-idp/
