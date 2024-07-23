---
title: Enable SSO
---

Enabling Single Sign-On (SSO) for your account allows you to simplify authentication and login access to Cloudcraft.

Cloudcraft supports SSO via three methods:

- **Datadog SSO:** Available for all users of Cloudcraft, including Free accounts. Datadog SSO does not require any additional setup for new accounts, simply select **Sign in with Datadog** on Cloudcraft's signup or login pages. For existing accounts, [reach out to support][1] to enable this feature.
- **Google/G Suite SSO:** Available for all users of Cloudcraft, including Free accounts. Google SSO does not require any additional setup, simply select **Sign in with Google** on Cloudcraft's signup or login pages.
- **SAML SSO:** Available for Cloudcraft Pro and Enterprise accounts, SAML SSO federates with your organization's existing identity provider, allowing your users to log in with their existing accounts and for your organization to centrally manage who has access to the application.

This article is all about SAML SSO and how to set it up in your account.

## Setting up SAML/SSO

<div class="alert alert-info">The SAML SSO feature can only be configured by the account owner. If you're the account owner and still can't configure SSO, <a href="https://app.cloudcraft.co/app/support" title="Contact Cloudcraft's support team">reach out to support</a> to enable this feature.</div>

1. Navigate to **User** > **Security & SSO**.
2. Next, register Cloudcraft as a new application with your SAML identity provider. For detailed instructions, see the following articles:
    - [Enable SSO With Azure AD][2]
    - [Enable SSO With Okta][3]
    - [Enable SSO With a Generic Identity Provider][4]
3. The details you need to create a new application with your identity provider can be found in the same modal window.

{{< img src="cloudcraft/account-management/enable-sso/service-provider-details.png" alt="Image provider metadata modal" responsive="true" style="width:100%;">}}

4. After creating the application, navigate back to Cloudcraft and upload the metadata file from your identity provider.
5. Toggle the **SAML Single Sign-On is enabled** option.
6. If you prefer to have your users access Cloudcraft only via your identity provider, enable the **Strict mode** option.

## Additional features

Using SAML SSO with Cloudcraft enables some additional benefits that are especially helpful when managing a large number of users.

### Just-in-Time User Provisioning

With **Just-in-Time User Provisioning**, you can automatically create user accounts in Cloudcraft when signing in for users on your corporate email domain, without requiring an invitation.

You can change the default team that users join at the bottom of the **Security & Single Sign-On** page.

### Identity Provider (IdP) Initiated Login

Allow signing in to Cloudcraft directly from your identity provider dashboard.

### Strict Mode

With **Strict mode** enabled, all users must log in with SAML SSO. Existing username/password or Google Sign In logins are disabled.

Before enabling this option, make sure that the SAML SSO login is working properly so that you don't end up locking yourself out of your account.

[1]: https://app.cloudcraft.co/app/support
[2]: /cloudcraft/account-management/enable-sso-with-azure-ad/
[3]: /cloudcraft/account-management/enable-sso-with-okta/
[4]: /cloudcraft/account-management/enable-sso-with-generic-idp/
