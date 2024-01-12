---
title: Enable SSO with Okta
kind: guide
---

Enabling Single Sign-On (SSO) with Okta as your identity provider allows you and your teammates to simplify authentication and log-in access to Cloudcraft.

This article will help you get set up if your identity provider is Okta. We have additional articles for other providers.

- [Enable SSO With Azure AD](https://help.cloudcraft.co/article/90-enable-sso-with-azure-ad)
- [Enable SSO With a Generic Identity Provider](https://help.cloudcraft.co/article/91-enable-sso-with-generic-idp)

For more general information on using SSO with Cloudcraft, check out [Enable SSO in Your Account](https://help.cloudcraft.co/article/88-enable-sso).

## Setting Up SAML/SSO

<section class="alert alert-info">
  <p>The SAML Enterprise SSO feature is only available for the Enterprise plan, and can only be configured by the Cloudcraft account Owner role.</p>
</section>

Head to **User → Security & SSO** inside Cloudcraft.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/security-and-sso.png" alt="Screenshot of a SAML Single Sign-On configuration interface with options for security settings and identity provider metadata upload." responsive="true" style="width:100%;">}}

The details you need to create a new application with Okta can be found in the **Cloudcraft service provider details** section.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/service-provider-details.png" alt="Screenshot of Cloudcraft service provider details for Identity Provider configuration with entity ID and assertion consumer service URL." responsive="true" style="width:100%;">}}

With this information in hand, head to Okta, log in as an administrator, and click the **Applications** menu.

Click the **Add Application** button, and then the green **Create New App** one.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/create-new-application.png" alt="Screenshot of an Okta dashboard focusing on the 'Create New App' button with navigational arrows pointing to it." responsive="true" style="width:100%;">}}

A new modal window will open; select **SAML 2.0** as the sign on method and click the green **Create** button.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/saml-integration.png" alt="Screenshot of a software interface for creating a new application integration with sign-on method options including Web, Secure Web Authentication, SAML 2.0, and OpenID Connect." responsive="true" style="width:100%;">}}

Here we are creating a new application for SAML integration. Enter **Cloudcraft** as the name of the application, leave everything else as is and click the **Next** button.

<section class="alert alert-info">
  <p>If you prefer to use an app logo, we have one that fit Okta's size restrictions <a href="https://static.cloudcraft.co/images/cloudcraft-okta-logo.png" title="Cloudcraft Logo" rel="noopener noreferrer" target="_new">over here</a>.</p>
</section>

{{< img src="cloudcraft/account-management/enable-sso-with-okta/general-saml-settings.png" alt="Cloudcraft logo displayed in app settings upload interface with clear labeling and file size requirements." responsive="true" style="width:100%;">}}

On the next prompt you will need to configure the SAML integration using the details provided by Cloudcraft.

The fields are mapped like this, with the first one being the label in Okta, and the second one being the label at Cloudcraft.

- Single sign on URL: Assertion Consumer Service URL
- Audience URI: Service Provider Entity ID

{{< img src="cloudcraft/account-management/enable-sso-with-okta/saml-settings.png" alt="Screenshot of SAML settings interface with fields for single sign-on URL and entity ID configuration." responsive="true" style="width:100%;">}}

Select **EmailAddress** on the **Name ID format** dropdown, and proceed to the next screen, picking **I'm an Okta customer adding an internal app** to answer the question "Are you a customer or partner?".

Click **Finish**.

Now the application is set up in Okta, you can assign your users to it and once you are done, navigate to the **Sign On** tab.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/sign-on-settings.png" alt="Screenshot displaying SAML 2.0 configuration settings in a Okta application integration interface." responsive="true" style="width:100%;">}}

You will see a blue link under the **View Setup Instructions** button, where you can download the file required for upload to Cloudcraft. Download the file to a convenient place and log out of Okta.

Head back to Cloudcraft, and upload your config file into the blue dotted box.

{{< img src="cloudcraft/account-management/enable-sso-with-okta/upload-metadata.png" alt="Successfully configured SAML Single Sign-On status with identity provider URL visible in security settings interface." responsive="true" style="width:100%;">}}

Lastly, toggle the **SAML Single Sign-On is enabled** option. Once you have verified that the SSO login is working as expected, if you prefer to have your users access Cloudcraft only via your identity provider, enable the **Strict mode** option.

We suggest testing the integration before telling your team about it, just to ensure that everything works as expected.

If you have any questions or trouble with the process, [get in touch with our support team](https://app.cloudcraft.co/app/support) and we will be happy to help.
