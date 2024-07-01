---
title: Microsoft Active Directory Federation Services SAML IdP
aliases:
  - /account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp/
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Configure SAML for your Datadog account
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configuring Teams & Organizations with Multiple Accounts
---

The Datadog SAML integration for SSO provides a pathway for linking an organization to an external user management system so that credentials can be kept and managed in a central system. This doc is meant to be used as an add-on to the main [Single Sign On With SAML][1] documentation, which gives an overview of single sign-on from the Datadog perspective.

To begin configuration of SAML for Active Directory Federation Service (AD FS), see Microsoft's [Configure a SAML 2.0 provider for portals with AD FS][2] docs.

Once SAML is configured, users can login by using the link provided in the [SAML configuration page][3]. Keep in mind that users still need to be invited and activated before they're able to login. Be sure to invite new users by using the email address corresponding to their Active Directory user records; otherwise they may be denied as shown below.

{{< img src="account_management/saml/6TsPUla.png" alt="6TsPUla" style="width:60%;">}}

In most setups, a user's `user@domain` is their Microsoft login, but this is not enforced. You can confirm the email address used within the user record as shown below.

{{< img src="account_management/saml/0R81SaK.png" alt="0R81SaK" style="width:60%;">}}

For questions regarding Datadog in-app errors pertaining to SAML, contact [the Datadog support team][4]. For errors pertaining to AD FS SAML setup and errors, contact [Microsoft support][5].

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/saml/
[2]: https://docs.microsoft.com/en-us/powerapps/maker/portals/configure/configure-saml2-settings
[3]: https://app.datadoghq.com/saml/saml_setup
[4]: /help/
[5]: https://powerapps.microsoft.com/en-us/support/
