---
title: Enable SSO
---

Enabling Single Sign-On (SSO) for your account allows you to simplify authentication and login access to Cloudcraft.

Cloudcraft supports SSO via two methods:

- **Google/G Suite SSO:** Available for all users of Cloudcraft, including Free and Pro accounts. Google Sign In does not require any additional setup, simply select **Sign in with Google** on Cloudcraft's signup or login pages.
- **SAML Enterprise SSO:** Available for Cloudcraft Enterprise accounts, SAML SSO federates with your organization's existing identity provider, allowing your users to log in with their existing accounts and for your organization to centrally manage who has access to the application.

This article is all about SAML Enterprise SSO and how to set it up in your account.

## SAML/SSO のセットアップ

<div class="alert alert-info">The SAML Enterprise SSO feature is only available for the Enterprise plan, and can only be configured by the account owner.
</div>

1. Navigate to **User** > **Security & SSO**.
2. Next, register Cloudcraft as a new application with your SAML identity provider. For detailed instructions, see the following articles:
    - [Azure AD で SSO を有効にする][1]
    - [Enable SSO With Okta][2]
    - [Enable SSO With a Generic Identity Provider][3]
3. The details you need to create a new application with your identity provider can be found in the same modal window.

{{< img src="cloudcraft/account-management/enable-sso/service-provider-details.png" alt="Image provider metadata modal" responsive="true" style="width:100%;">}}

4. After creating the application, navigate back to Cloudcraft and upload the metadata file from your identity provider.
5. **SAML Single Sign-On is enabled** オプションを切り替えます。
6. ユーザーにアイデンティティプロバイダー経由でのみ Cloudcraft にアクセスさせたい場合は、**Strict mode** オプションを有効にします。

## その他の機能

Using SAML SSO with Cloudcraft enables some additional benefits that are especially helpful when managing a large number of users.

### Just-in-Time User Provisioning

With **Just-in-Time User Provisioning**, you can automatically create user accounts in Cloudcraft when signing in for users on your corporate email domain, without requiring an invitation.

You can change the default team that users join at the bottom of the **Security & Single Sign-On** page.

### Identity Provider (IdP) Initiated Login

Allow signing in to Cloudcraft directly from your identity provider dashboard.

### Strict Mode

With **Strict mode** enabled, all users must log in with SAML SSO. Existing username/password or Google Sign In logins are disabled.

Before enabling this option, make sure that the SAML SSO login is working properly so that you don't end up locking yourself out of your account.

[1]: /ja/cloudcraft/account-management/enable-sso-with-azure-ad/
[2]: /ja/cloudcraft/account-management/enable-sso-with-okta/
[3]: /ja/cloudcraft/account-management/enable-sso-with-generic-idp/