---
title: Enable SSO with Azure AD
---

Enabling Single Sign-On (SSO) with Azure AD as your identity provider allows you to simplify authentication and login access to Cloudcraft.

This article helps you set up SSO if your identity provider is Azure AD. For other identity providers, see the following articles:

- [Enable SSO With Okta][1]
- [Enable SSO With a Generic Identity Provider][2]

For more general information on using SSO with Cloudcraft, check out [Enable SSO in Your Account][3].

## Setting up SAML/SSO

<div class="alert alert-info">The SAML Enterprise SSO feature is only available for the Enterprise plan, and can only be configured by the Cloudcraft Account Owner role.
</div>

1. In Cloudcraft, navigate to **User** > **Security & SSO**.
2. The details you need to create a new application with Azure can be found in the **Cloudcraft service provider details** section.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/service-provider-details.png" alt="Screenshot of Cloudcraft service provider details for Identity Provider configuration with entity ID and assertion consumer service URL." responsive="true" style="width:100%;">}}

3. Log in to Azure as an administrator.
4. Click the hamburger menu on the upper-left corner of the screen and select **Azure Active Directory**.
5. In the **Manage** section on the left menu, click **Enterprise applications**.
6. Click **New application** and select **Non-gallery application**.
7. Enter **Cloudcraft** as the name of the application, then click **Add**.

Next, configure the SAML integration using the details provided by Cloudcraft. 

1. In the **Getting started** section, select **Set up single sign on**, then click **SAML**.
2. Under the **Basic SAML Configuration** section, click **Edit**.
3. Enter the details provided by Cloudcraft. The fields are mapped as follows, with the first value being the label in Azure AD, and the second being the label in the Cloudcraft dialog.
    - **Identifier**: Service Provider Entity ID
    - **Reply URL**: Assertion Consumer Service URL
    - **Sign on URL**: Leave this blank to allow identity provider-initiated SSO

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/saml-settings.png" alt="Screenshot of the Basic SAML Configuration interface showing fields for Identifier (Entity ID) and Reply URL (Assertion Consumer Service URL)." responsive="true" style="width:80%;">}}

4. Click **Save** to return to the previous screen.
5. Under the **SAML Signing Certificate** section, select **Federation Metadata XML** and download the XML file to your computer.
6. Navigate back to Cloudcraft and upload your metadata XML file.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/upload-metadata.png" alt="Successfully configured SAML Single Sign-On status with identity provider URL visible in security settings interface." responsive="true" style="width:100%;">}}

7. Toggle the **SAML Single Sign-On is enabled** option.
8. Navigate back to the Azure portal.
9. Under the **Test single sign-on with Cloudcraft** section, click **Test** to test your integration.
10. If you prefer to have your users access Cloudcraft only via Azure AD, enable the **Strict mode** option, which disables all other login methods.

**Note**: To grant access to users in your organization, see [the Azure AD documentation][4].

[1]: /cloudcraft/account-management/enable-sso-with-okta/
[2]: /cloudcraft/account-management/enable-sso-with-generic-idp/
[3]: /cloudcraft/account-management/enable-sso/
[4]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal
[5]: https://app.cloudcraft.co/support
