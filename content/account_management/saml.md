---
title: Single Sign On With SAML
kind: documentation
autotocdepth: 2
aliases:
  - /guides/saml
customnav: accountmanagementnav
further_reading:
- link: "/account_management/multi_account"
  tag: "Documentation"
  text: Configuring Teams & Organizations with Multiple Accounts
---

**This documentation assumes that you already have a SAML Identity Provider up and running.**

Configuring [SAML (Security Assertion Markup Language)](http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) for your Datadog account will let you and all your teammates log in to Datadog using the credentials stored in your organization’s Active Directory, LDAP, or other identity store that has been configured with a SAML Identity Provider.

## Configure SAML

If you are a [Datadog Administrators](/account_management/team/#datadog-user-roles), there is a **Configure SAML** option in the drop down menu that is accessed by clicking on your username in the upper right corner of the [Datadog web page](https://app.datadoghq.com/saml/saml_setup).

{{< img src="account_management/saml/saml_configure.png" alt="Saml Configure" responsive="true" popup="true">}}

That brings you to the **SAML Single Sign On Configuration** page:

1.  Upload the IdP Metadata from your SAML Identity provider by clicking the **Choose File** button.

    {{< img src="account_management/saml/saml_choose_file.png" alt="Saml choose file" responsive="true" popup="true">}}

    After you've chosen the file, click "Upload File".

2. Datadog’s [Service Provider metadata can be found here](https://app.datadoghq.com/account/saml/metadata.xml). Use this SP Metadata to configure your IdP to recognize Datadog as a Service Provider.

3. After you upload the IdP Meta-data and configure your IdP, enable SAML in Datadog by clicking the Enable button.
{{< img src="account_management/saml/saml_enable.png" alt="saml enable" responsive="true" popup="true">}}
Once SAML is configured in Datadog and your IdP is set up to accept requests from Datadog, users can log in by using the Single Sign On URL that is shown in the Status box at the top of the [SAML Configuration page](https://app.datadoghq.com/saml/saml_setup).
{{< img src="account_management/saml/saml_enabled.png" alt="Saml Enabled" responsive="true" popup="true">}}

The Single Sign On URL will also be displayed on the [Team page](https://app.datadoghq.com/account/team).  
Loading this URL will initiate a SAML authentication against your IdP. Note that the URL will not be displayed until SAML is enabled for your account.

## Datadog Service Provider Details


* Datadog supports the **HTTP-POST** binding for **SAML2**:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog will specify `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` for the Format of the **NameIDPolicy** in Assertion Requests.
* Assertions must be signed.
* Assertions can be encrypted, but unencrypted assertions will be accepted.
* Datadog’s SP Metadata can be found [here](https://app.datadoghq.com/account/saml/metadata.xml).

##  Setting Attributes

* Attributes may be included with the Assertion. Datadog looks for 3 Attributes in the AttributeStatement:
1. **eduPersonPrincipalName**: If specified, the eduPersonPrincipalName must correspond to the user’s Datadog username. The username is usually the user’s email address.
2. **sn**: This is optional, and should be set to the user’s surname.
3. **givenName**: This is optional, and should be set to the user’s first, or given name.
* Datadog expects that Attributes use the NameFormat
`urn:oasis:names:tc:SAML:2.0:attrname-format:uri` or `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`. The name used for each attribute will depend on the NameFormat that your IdP uses.
* If your IdP is configured to use the NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`:
1. **eduPersonPrincipalName**: The IdP should set `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` as the Name of the Attribute
2. **sn**: The IdP should set `urn:oid:2.5.4.4` as the Name of the Attribute
3. **givenName**: The IdP should set `urn:oid:2.5.4.42` as the Name of the Attribute
* If your IdP is configured to use the NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`:
1. **eduPersonPrincipalName**: The IdP should set `urn:mace:dir:attribute-def:eduPersonPrincipalName` as the Name of the Attribute
2. **sn**: The IdP should set `urn:mace:dir:attribute-def:sn` as the Name of the Attribute
3. **givenName**: The IdP should set `urn:mace:dir:attribute-def:givenName` as the Name of the Attribute
* If **eduPersonPrincipalName** exists in the AttributeStatement, the value of this attribute will be used for the username. If **eduPersonPrincipalName** is not included in the AttributeStatement, the username will be taken from the NameID in the Subject. The NameID must use the Format `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.
* If **sn** and **givenName** are provided, they will be used to update the user’s name in their Datadog profile.

## Specific SAML IdP

For more information about configuring specific IdP's, refer to the following Knowledge Base articles:&

* [Google](/account_management/faq/how-do-i-configure-google-as-a-saml-idp)
* [Microsoft Active Directory Federation Services](/account_management/faq/how-do-i-setup-microsoft-active-directory-federation-services-as-a-saml-idp)
* [NoPassword](/account_management/faq/how-do-i-configure-nopassword-as-a-saml-idp)
* [Okta](/account_management/faq/how-do-i-configure-okta-as-a-saml-idp)


## Additional Features

The following features can be enabled through the [SAML Configuration dialog](https://app.datadoghq.com/saml/saml_setup).

### Just-in-Time (JIT) Provisioning 

With Just-in-Time provisioning, a user will be created within Datadog on the fly the first time they try to log in. This eliminates the need for administrators to manually create user accounts one at a time.

Some organizations might not want to invite all of their users to Datadog. If you would like to make changes to how SAML works for your account, [contact support](/help).  
It is up to the organization to configure their IdP to not send assertions to Datadog if they don't want a particular user to access Datadog.

Administrators in accounts using SAML can also set the default role for new Just-in-Time users.  
The default role is currently **Standard**, but you can choose to add new JIT users as **Read-Only** or even **Administrators**. 

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT Default" responsive="true" popup="true">}}

### IdP Initiated Login

When the Datadog url is loaded, the browser is redirected to the customer IdP, user types in credentials, then the IdP redirects back to Datadog. Some IdPs have the ability to send an assertion directly to Datadog without first getting an AuthnRequest (IdP Initiated Login).

In the normal setup, we won't know which organization the assertion came from and this will result in an error page with a message saying that SAML Response is missing "InResponseTo" attribute.

After enabling the feature (and waiting for caches to clear) the customer will need to get a new version of the SP Metadata, which will have a different, organization-specific AssertionConsumerService endpoint to send assertions to.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}