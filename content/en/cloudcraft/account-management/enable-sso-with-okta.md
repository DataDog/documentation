---
title: Enable SSO with Okta
---

Enabling Single Sign-On (SSO) with Okta as your identity provider allows you to simplify authentication and login access to Cloudcraft.

This article helps you set up SSO if your identity provider is Okta. For other identity providers, see the following articles:

- [Enable SSO With Azure AD][1]
- [Enable SSO With a Generic Identity Provider][2]

For general information on using SSO with Cloudcraft, check out [Enable SSO in Your Account][3].

## Setting Up SAML/SSO

<div class="alert alert-info">The SAML Enterprise SSO feature is only available for the Enterprise plan, and can only be configured by the Cloudcraft Account Owner role.
</div>

1. In Cloudcraft, navigate to **User** > **Security & SSO**.
2. The details you need to create a new application with Okta can be found in the **Cloudcraft service provider details** section.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/service-provider-details.png" alt="Screenshot of Cloudcraft service provider details for Identity Provider configuration with entity ID and assertion consumer service URL." responsive="true" style="width:100%;">}}

3. Log in to Okta as an administrator.
4. Click **Application**.
5. Click **Add Application**, then click **Create New App**.
6. Select **SAML 2.0** as the sign on method and click **Create**. 
7. Enter **Cloudcraft** as the name of the application and leave the remaining values as-is.
8. Click **Next**.

<div class="alert alert-info">If you prefer to use an app logo, you can use <a href="https://static.cloudcraft.co/images/cloudcraft-okta-logo.png" title="Cloudcraft Logo" rel="noopener noreferrer" target="_new">this logo</a> which adheres to Okta's size restrictions.
</div>

9. Next, configure the SAML integration using the details provided by Cloudcraft. The fields are mapped as follows, with the first one being the label in Okta, and the second one being the label at Cloudcraft.
    - **Single sign on URL**: Assertion Consumer Service URL
    - **Audience URI**: Service Provider Entity ID

{{< img src="cloudcraft/account-management/enable-sso-with-okta/saml-settings.png" alt="Screenshot of SAML settings interface with fields for single sign-on URL and entity ID configuration." responsive="true" style="width:80%;">}}

10. On the **Name ID format** dropdown, select **EmailAddress**.
11. Proceed to the next screen and select **I'm an Okta customer adding an internal app** to answer the question "Are you a customer or partner?".
12. Click **Finish**. Now that the application is set up in Okta, you can assign your users to it and once you're done, navigate to the **Sign On** tab.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/sign-on-settings.png" alt="Screenshot displaying SAML 2.0 configuration settings in a Okta application integration interface." responsive="true" style="width:80%;">}}

13. Under the **View Setup Instructions** button, click the blue link to download the file required for upload to Cloudcraft.
14. Navigate back to Cloudcraft and upload your config file.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/upload-metadata.png" alt="Successfully configured SAML Single Sign-On status with identity provider URL visible in security settings interface." responsive="true" style="width:80%;">}}

15. Toggle the **SAML Single Sign-On is enabled** option. 
16. If you prefer to have your users access Cloudcraft only via your identity provider, enable the **Strict mode** option.

[1]: /cloudcraft/account-management/enable-sso-with-azure-ad/
[2]: /cloudcraft/account-management/enable-sso-with-generic-idp/
[3]: /cloudcraft/account-management/enable-sso/
[4]: https://app.cloudcraft.co/app/support
