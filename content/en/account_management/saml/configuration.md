---
title: Configuring Single Sign-On With SAML
description: Configure SAML authentication for Datadog with identity providers like Active Directory, Auth0, Google, Okta, and Microsoft Entra ID for secure single sign-on.
disable_toc: false
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Single Sign-On With SAML"
- link: "account_management/saml/mapping/"
  tag: "Documentation"
  text: "SAML Group Mapping"
algolia:
  tags: ['saml']
---

## Overview

This page covers how to enable single sign-on (SSO) with SAML in Datadog, as well as how enterprise customers can enable multiple SAML identity providers (IdPs).

**Notes**: 

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
- If you don't have SAML enabled on your Datadog account, reach out to [support][1] to enable it.
- This documentation assumes that you already have a SAML Identity Provider (IdP). If you do not have a SAML IdP, there are several IdPs that have integrations with Datadog such as [Active Directory][9], [Auth0][3], [Google][4], [LastPass][5], [Microsoft Entra ID][2], [Okta][6], and [SafeNet][7].
- SAML configuration requires [Datadog Administrator][8] access, or the `Org Management` permission if you're using custom roles.
{{% /site-region %}}

{{% site-region region="gov" %}}
- This documentation assumes that you already have a SAML Identity Provider (IdP). If you do not have a SAML IdP, there are several IdPs that have integrations with Datadog such as [Active Directory][9], [Auth0][3], [Google][4], [LastPass][5], [Microsoft Entra ID][2], [Okta][6], and [SafeNet][7].
- SAML configuration requires [Datadog Administrator][8] access, or the `Org Management` permission if you're using custom roles.
{{% /site-region %}}

## Configuring SAML

1. To begin configuration, see your IdP's documentation:

    * [Active Directory][9]
    * [Auth0][10]
    * [Google][12]
    * [Microsoft Entra ID][11]
    * [LastPass][13]
    * [Okta][14]
    * [SafeNet][15]

2. Download Datadog's [Service Provider metadata][17] to configure your IdP to recognize Datadog as a Service Provider.

3. In Datadog, hover over your username in the bottom left corner and select **Organization Settings**. Select [**Login Methods**][16] and click **Configure** under SAML.

4. Click **Add SAML**.

5. In the configuration modal:
    * Create a user-friendly name for this SAML provider. The name appears to end users when they choose a login method.
    * Upload the IdP metadata from your SAML identity provider by clicking **browse files** or dragging and dropping the XML metadata file onto the modal.
      <br>
      <div class="alert alert-info">The IdP metadata must contain ASCII characters only.</a></div>

    {{< img src="account_management/saml/saml_configure.png" alt="Configure SAML by uploading your IdP metadata" style="width:100%;" >}}

6. Click **Save**.

**Note**: To configure SAML for a multi-org, see [Managing Multiple-Organization Accounts][18].

## Configuring multiple SAML providers

Enterprise customers can have multiple SAML configurations per organization (up to three at the same time). This feature simplifies identity management across complex environments, such as during IdP changes, mergers, or contractor onboarding.

To configure additional SAML providers:

1. Navigate to **Organization Settings > Login Methods**. Under **SAML**, click **Update**, then **Add SAML**.
2. In the configuration modal:

    - Create a user-friendly name for this SAML provider. The name appears to end users when they choose a login method.
      <br>
      <div class="alert alert-info">All users can see and access all configured IdPs; there is no way to assign specific user groups to specific configurations. Setting clear and descriptive names for each provider helps users select the appropriate IdP during login. Also note that there is no way to set a default configuration.</a></div>
    - Upload the IdP metadata from your SAML identity provider by clicking **browse files** or dragging and dropping the XML metadata file onto the modal.
4. Click **Save**.

### Role mapping with multiple SAML providers

If you use SAML [role mapping][19] or [team mapping][20] and want to use the same mappings in any additional providers you add, make sure the attributes in the new IdP(s) match what is defined in your mappings. If you add a new IdP, make sure to either use the same attribute names as your existing IdP, or add new mappings that align with the new IdP's attributes to ensure roles and teams are assigned correctly when users log in with different IdPs.

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
[13]: /account_management/saml/lastpass/
[14]: /account_management/saml/okta/
[15]: /account_management/saml/safenet/
[16]: /account_management/login_methods/
[17]: https://app.datadoghq.com/account/saml/metadata.xml
[18]: /account_management/multi_organization/#setting-up-saml
[19]: /account_management/saml/mapping/#map-saml-attributes-to-datadog-roles
[20]: /account_management/saml/mapping/#map-saml-attributes-to-teams