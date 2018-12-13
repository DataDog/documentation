---
title: Single Sign On With SAML
kind: documentation
aliases:
  - /guides/saml
further_reading:
- link: "account_management/multi_organization"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---

**This documentation assumes that you already have a SAML Identity Provider up and running.**

Configuring [SAML (Security Assertion Markup Language)][1] for your Datadog account lets you and all your teammates log in to Datadog using the credentials stored in your organization's Active Directory, LDAP, or other identity store that has been configured with a SAML Identity Provider.

**Note**: Created users must accept email verification in order for SAML to work.

Here's a two-minute video walkthrough:

{{< wistia 2qe33x8h3v >}}

## Configure SAML

If you are a [Datadog Administrator][2], there is a [Configure SAML][3] option in the drop down menu that is accessed by hover over your username in the left-side navigation menu.

{{< img src="account_management/saml/saml_configure.png" alt="Saml Configure" responsive="true" style="width:50%;" >}}

That brings you to the **SAML Single Sign On Configuration** page:

1.  Upload the IdP Metadata from your SAML Identity provider by clicking the **Choose File** button.

    {{< img src="account_management/saml/saml_choose_file.png" alt="Saml choose file" responsive="true" >}}

    After you've chosen the file, click "Upload File".

2. Download Datadog's [Service Provider metadata][4] to configure your IdP to recognize Datadog as a Service Provider.

3. After you upload the IdP Meta-data and configure your IdP, enable SAML in Datadog by clicking the Enable button.
{{< img src="account_management/saml/saml_enable.png" alt="saml enable" responsive="true" >}}

Once SAML is configured in Datadog and your IdP is set up to accept requests from Datadog, users can log in by using the Single Sign On URL that is shown in the Status box at the top of the [SAML Configuration page][3].
{{< img src="account_management/saml/saml_enabled.png" alt="Saml Enabled" responsive="true" >}}

The Single Sign On URL is also displayed on the [Team page][5].
Loading this URL initiates a SAML authentication against your IdP. Note that the URL isn't displayed until SAML is enabled for your account.

## Datadog Service Provider Details

* Datadog supports the **HTTP-POST** binding for **SAML2**:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog specifies  `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` for the Format of the **NameIDPolicy** in Assertion Requests.
* Assertions must be signed.
* Assertions can be encrypted, but unencrypted assertions are accepted.
* [Datadog's SP Metadata][4].

##  Setting Attributes

Attributes may be included with the Assertion. Datadog looks for 3 Attributes in the AttributeStatement:

  1. **eduPersonPrincipalName**: If specified, the eduPersonPrincipalName must correspond to the user's Datadog username. The username is usually the user's email address.
  2. **sn**: This is optional, and should be set to the user's surname.
  3. **givenName**: This is optional, and should be set to the user's first, or given name.

Datadog expects that Attributes use the URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` or the Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`. The name used for each attribute depends on the NameFormat that your IdP uses.

If your IdP is configured to use the URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`:

  1. **eduPersonPrincipalName**: The IdP should set `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` as the Name of the Attribute
  2. **sn**: The IdP should set `urn:oid:2.5.4.4` as the Name of the Attribute
  3. **givenName**: The IdP should set `urn:oid:2.5.4.42` as the Name of the Attribute

If your IdP is configured to use the Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`:

  1. **eduPersonPrincipalName**: The IdP should set `urn:mace:dir:attribute-def:eduPersonPrincipalName` as the Name of the Attribute
  2. **sn**: The IdP should set `urn:mace:dir:attribute-def:sn` as the Name of the Attribute
  3. **givenName**: The IdP should set `urn:mace:dir:attribute-def:givenName` as the Name of the Attribute

If **eduPersonPrincipalName** exists in the AttributeStatement, the value of this attribute is used for the username. If **eduPersonPrincipalName** is not included in the AttributeStatement, the username is taken from the NameID in the Subject. The NameID must use the Format `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.

If **sn** and **givenName** are provided, they are used to update the user's name in their Datadog profile.

## Specific SAML IdP

For more information about configuring specific IdP's, refer to the following Knowledge Base articles:

* [Google][6]
* [Azure][7]
* [Microsoft Active Directory Federation Services][8]
* [NoPassword][9]
* [Okta][10]

## Additional Features

The following features can be enabled through the [SAML Configuration dialog][3].

### Just-in-Time (JIT) Provisioning

With Just-in-Time provisioning, a user is created within Datadog on the fly the first time they try to log in. This eliminates the need for administrators to manually create user accounts one at a time.

Some organizations might not want to invite all of their users to Datadog. If you would like to make changes to how SAML works for your account, [contact support][11].
It is up to the organization to configure their IdP to not send assertions to Datadog if they don't want a particular user to access Datadog.

Administrators in accounts using SAML can also set the default role for new Just-in-Time users.
The default role is **Standard**, but you can choose to add new JIT users as **Read-Only** or even **Administrators**.

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT Default" responsive="true" style="width:50%;" >}}

### IdP Initiated Login

When the Datadog url is loaded, the browser is redirected to the customer IdP where the user enters their credentials, then the IdP redirects back to Datadog. Some IdPs have the ability to send an assertion directly to Datadog without first getting an AuthnRequest (IdP Initiated Login).

After enabling the IdP Initiated Login feature (and waiting for caches to clear), you will need to get a new version of the SP Metadata. Your new SP Metadata will contain a different, organization-specific AssertionConsumerService endpoint to send assertions to.

If you do not use the updated SP Metadata, Datadog will not be able to associate the assertion with your organization and will display an error page with a message that the SAML response is missing the "InResponseTo" attribute.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /account_management/team/#datadog-user-roles
[3]: https://app.datadoghq.com/saml/saml_setup
[4]: https://app.datadoghq.com/account/saml/metadata.xml
[5]: https://app.datadoghq.com/account/team
[6]: /account_management/faq/how-do-i-configure-google-as-a-saml-idp
[7]: /account_management/faq/how-do-i-configure-azure-ad-as-a-saml-idp
[8]: /account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp
[9]: /account_management/faq/how-do-i-configure-nopassword-as-a-saml-idp
[10]: /account_management/faq/how-do-i-configure-okta-as-a-saml-idp
[11]: /help
