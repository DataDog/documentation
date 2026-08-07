---
title: Enable SSO with Azure AD
---

Enabling Single Sign-On (SSO) with Azure AD as your identity provider allows you to simplify authentication and login access to Cloudcraft.

This article helps you set up SSO if your identity provider is Azure AD. For other identity providers, see the following articles:

- [Enable SSO With Okta][1]
- [Enable SSO With a Generic Identity Provider][2]

For more general information on using SSO with Cloudcraft, check out [Enable SSO in Your Account][3].

## Setting up SAML/SSO

<div class="alert alert-info">Only the account owner can configure the SAML SSO feature. If the account owner is unable to configure SSO, <a href="https://app.cloudcraft.co/app/support" title="Contact the Cloudcraft support team">contact the Cloudcraft support team</a> to enable this feature.
</div>

1. In Cloudcraft, navigate to {{< ui >}}User{{< /ui >}} > {{< ui >}}Security & SSO{{< /ui >}}.
2. The details you need to create a new application with Azure can be found in the {{< ui >}}Cloudcraft service provider details{{< /ui >}} section.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/service-provider-details.png" alt="Screenshot of Cloudcraft service provider details for Identity Provider configuration with entity ID and assertion consumer service URL." responsive="true" style="width:100%;">}}

3. Log in to Azure as an administrator.
4. Click the hamburger menu on the upper-left corner of the screen and select {{< ui >}}Azure Active Directory{{< /ui >}}.
5. In the {{< ui >}}Manage{{< /ui >}} section on the left menu, click {{< ui >}}Enterprise applications{{< /ui >}}.
6. Click {{< ui >}}New application{{< /ui >}} and select {{< ui >}}Non-gallery application{{< /ui >}}.
7. Enter **Cloudcraft** as the name of the application, then click {{< ui >}}Add{{< /ui >}}.

Next, configure the SAML integration using the details provided by Cloudcraft.

1. In the {{< ui >}}Getting started{{< /ui >}} section, select {{< ui >}}Set up single sign on{{< /ui >}}, then click {{< ui >}}SAML{{< /ui >}}.
2. Under the {{< ui >}}Basic SAML Configuration{{< /ui >}} section, click {{< ui >}}Edit{{< /ui >}}.
3. Enter the details provided by Cloudcraft. The fields are mapped as follows, with the first value being the label in Azure AD, and the second being the label in the Cloudcraft dialog.
    - {{< ui >}}Identifier{{< /ui >}}: Service Provider Entity ID
    - {{< ui >}}Reply URL{{< /ui >}}: Assertion Consumer Service URL
    - {{< ui >}}Sign on URL{{< /ui >}}: Leave this blank to allow identity provider-initiated SSO

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/saml-settings.png" alt="Screenshot of the Basic SAML Configuration interface showing fields for Identifier (Entity ID) and Reply URL (Assertion Consumer Service URL)." responsive="true" style="width:80%;">}}

4. Click {{< ui >}}Save{{< /ui >}} to return to the previous screen.
5. Under the {{< ui >}}SAML Signing Certificate{{< /ui >}} section, select {{< ui >}}Federation Metadata XML{{< /ui >}} and download the XML file to your computer.
6. Navigate back to Cloudcraft and upload your metadata XML file.

{{< img src="cloudcraft/account-management/enable-sso-with-azure-ad/upload-metadata.png" alt="Successfully configured SAML Single Sign-On status with identity provider URL visible in security settings interface." responsive="true" style="width:100%;">}}

7. Toggle the {{< ui >}}SAML Single Sign-On is enabled{{< /ui >}} option.
8. Navigate back to the Azure portal.
9. Under the {{< ui >}}Test single sign-on with Cloudcraft{{< /ui >}} section, click {{< ui >}}Test{{< /ui >}} to test your integration.
10. If you prefer to have your users access Cloudcraft only via Azure AD, enable the {{< ui >}}Strict mode{{< /ui >}} option, which disables all other login methods.

**Note**: To grant access to users in your organization, see [the Azure AD documentation][4].

[1]: /cloudcraft/account-management/enable-sso-with-okta/
[2]: /cloudcraft/account-management/enable-sso-with-generic-idp/
[3]: /cloudcraft/account-management/enable-sso/
[4]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/assign-user-or-group-access-portal
[5]: https://app.cloudcraft.co/support
