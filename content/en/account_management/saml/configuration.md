---
title: Configuring Single Sign On With SAML
description: Configure SAML authentication for Datadog with identity providers like Active Directory, Auth0, Google, Okta, and Microsoft Entra ID for secure single sign-on.
disable_toc: false
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Single Sign On With SAML"
algolia:
  tags: ['saml']
---

## Overview

This page covers how to enable single sign-on (SSO) with SAML in Datadog, as well as how enterprise customers can enable multiple SAML identity providers (IdPs).

**Notes**: 

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
- If you don't have SAML enabled on your Datadog account, reach out to [support][1] to enable it.
- This documentation assumes that you already have a SAML Identity Provider (IdP). If you do not have a SAML IdP, there are several IdPs that have integrations with Datadog such as [Active Directory][2], [Auth0][3], [Google][4], [LastPass][5], [Microsoft Entra ID][2], [Okta][6], and [SafeNet][7].
- SAML configuration requires [Datadog Administrator][8] access.
{{% /site-region %}}

{{% site-region region="gov" %}}
- This documentation assumes that you already have a SAML Identity Provider (IdP). If you do not have a SAML IdP, there are several IdPs that have integrations with Datadog such as [Active Directory][2], [Auth0][3], [Google][4], [LastPass][5], [Microsoft Entra ID][2], [Okta][6], and [SafeNet][7].
- SAML configuration requires [Datadog Administrator][8] access.
{{% /site-region %}}

## Configuring SAML

1. To begin configuration, see your IdP's documentation:

    * [Active Directory][9]
    * [Auth0][10]
    * [Google][12]
    * [Microsoft Entra ID][11]
    * [NoPassword][13]
    * [Okta][14]
    * [SafeNet][15]

2. In the Datadog app, hover over your username in the bottom left corner and select Organization Settings. Select [Login Methods][16] and click on **Configure** under SAML.

3. Upload the IdP metadata from your SAML identity provider by clicking the **Choose File** button. After choosing the file, click **Upload File**.

**Note:** The IdP metadata must contain ASCII characters only.

4. Download Datadog's [Service Provider metadata][17] to configure your IdP to recognize Datadog as a Service Provider.

5. After you upload the IdP metadata and configure your IdP, enable SAML in Datadog by clicking the **Upload and Enable** button.
    {{< img src="account_management/saml/saml_enable_cropped.png" alt="Configure SAML by uploading your IdP metadata" >}}
    
6. After uploading the IdP metadata, return to the **Login Methods** page and turn SAML `on` by default. 

**Note**: To configure SAML for a multi-org, see [Managing Multiple-Organization Accounts][18].

## Configuring multiple SAML providers

Enterprise customers can have multiple SAML configurations per organization. This feature simplifies identity management across complex environments, such as during IdP changes, mergers, or contractor onboarding.

To configure additional SAML providers:

1. Navigate to **Organization Settings > Login Methods**. Under **SAML**, click **Update**, then **Add SAML**.
2. In the configuration modal, create a user-friendly name for this SAML provider. The name appears to end users when they choose a login method.
3. Upload the IdP metadata from your SAML identity provider by clicking **browse files** or dragging and dropping the XML metadata file onto the modal.

**Note:** The IdP metadata must contain ASCII characters only.

4. Click **Save**.

[1]: /help/
[2]: https://learn.microsoft.com/en-us/entra/architecture/auth-saml
[3]: https://auth0.com/docs/protocols/saml-protocol
[4]: https://cloud.google.com/architecture/identity/single-sign-on
[5]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[6]: https://developer.okta.com/docs/concepts/saml/
[7]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[8]: /account_management/users/default_roles/
[9]: /account_management/saml/activedirectory/
[10]: /account_management/saml/auth0/
[11]: /account_management/saml/entra/
[12]: /account_management/saml/google/
[13]: /account_management/saml/nopassword/
[14]: /account_management/saml/okta/
[15]: /account_management/saml/safenet/
[16]: /account_management/login_methods/
[17]: https://app.datadoghq.com/account/saml/metadata.xml
[18]: /account_management/multi_organization/#setting-up-saml