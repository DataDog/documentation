---
title: Enable SSO with Azure AD
kind: guide
---

Enabling Single Sign-On (SSO) with Azure AD as your identity provider allows you and your teammates to simplify authentication and log-inaccess to Cloudcraft.

This article will help you get set up if your identity provider is Azure AD. We have additional articles for other providers.

- [Enable SSO With Okta](https://help.cloudcraft.co/article/89-enable-sso-with-okta)
- [Enable SSO With a Generic Identity Provider](https://help.cloudcraft.co/article/91-enable-sso-with-generic-idp)

For more general information on using SSO with Cloudcraft, check out [Enable SSO in Your Account](https://help.cloudcraft.co/article/88-enable-sso).

## Setting up SAML/SSO

<section class="alert alert-info">
  <p>The SAML Enterprise SSO feature is only available for the Enterprise plan, and can only be configured by the Cloudcraft account Owner role.</p>
</section>

Head to **User → Security & SSO** inside Cloudcraft.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/security-and-sso.png" alt="Screenshot of a SAML Single Sign-On configuration interface with options for security settings and identity provider metadata upload." responsive="true" style="width:100%;">}}

The details you need to create a new application with Azure can be found in the **Cloudcraft service provider details** section.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/service-provider-details.png" alt="Screenshot of Cloudcraft service provider details for Identity Provider configuration with entity ID and assertion consumer service URL." responsive="true" style="width:100%;">}}

With this information in hand, head to the Azure portal and log in as an administrator.

Click the hamburger menu on the top left of your screen for the portal menu to appear, and then select the **Azure Active Directory** menu item.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/azure-portal-menu.png" alt="Screenshot of Azure cloud services dashboard highlighting the active directory option." responsive="true" style="width:100%;">}}

Now that we are in the directory, look for the **Manage** section on the left menu, and click on **Enterprise applications**.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/enterprise-applications.png" alt="Screenshot of a user interface for cloud software management highlighting the 'Enterprise applications' menu option." responsive="true" style="width:100%;">}}

Click the **New application** button on the page that opens and then select the **Non-gallery application** item.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/new-application.png" alt="Screenshot of Azure Active Directory enterprise applications interface with an option for new applications." responsive="true" style="width:100%;">}}

Here we are creating a new application for SAML integration. Enter **Cloudcraft** as the name of the application and click the blue **Add** button at the bottom of your screen.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/application-name.png" alt="Screenshot of a web interface for adding a new application named Cloudcraft with an arrow pointing towards the Add button." responsive="true" style="width:100%;">}}

On the next prompt you will need to configure the SAML integration using the details provided by Cloudcraft. In the **Getting started** section, select the **Set up single sign on** option, and then **SAML**.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/setup-single-sign-on.png" alt="Step-by-step guide interface for setting up single sign-on with an arrow pointing at the setup option." responsive="true" style="width:100%;">}}

In the next page, click the **Edit** button in the **Basic SAML Configuration** section and enter the details provided by Cloudcraft.

The fields are mapped as below, with the first value being the label in Azure AD, and the second being the label in the Cloudcraft dialog.

- Identifier: Service Provider Entity ID
- Reply URL: Assertion Consumer Service URL
- Sign on URL: Leave empty to allow identity provider initiated SSO

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/saml-settings.png" alt="Screenshot of the Basic SAML Configuration interface showing fields for Identifier (Entity ID) and Reply URL (Assertion Consumer Service URL)." responsive="true" style="width:100%;">}}

Once you are done filling in the details, click the **Save** button to save your work and return to the previous screen.

Under the **SAML Signing Certificate** section you will see several options for download. Choose the **Federation Metadata XML** one and download the file to a convenient place on your computer.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/metadata-xml.png" alt="Screenshot of SAML Signing Certificate information with active status and download options for federation metadata in a web application interface." responsive="true" style="width:100%;">}}

Head back to Cloudcraft, and upload your metadata XML file into the blue dotted box.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/upload-metadata.png" alt="Successfully configured SAML Single Sign-On status with identity provider URL visible in security settings interface." responsive="true" style="width:100%;">}}

Lastly, toggle the **SAML Single Sign-On is enabled** option, and head back to the Azure portal. Click the **Test** button under the **Test single sign-on with Cloudcraft** section to test your integration.

Now is a good time to grant access to all the relevant users within your organization. You can find instructions on how to do that [in the Azure AD documentation](https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal).

Once you have verified that the SSO login is working as expected, if you prefer to have your users access Cloudcraft only via Azure AD, enable the **Strict mode** option, which disables all other login methods.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/strict-mode.png" alt="SAML Single Sign-On settings enabled with strict mode active in security configuration panel." responsive="true" style="width:100%;">}}

We suggest testing the integration before announcing it to your team, to ensure that everything works as expected.

If you have any questions or trouble with the process, [get in touch with our support team](https://app.cloudcraft.co/support) and we will be happy to help.
