---
title: Configuring Okta as a SAML IdP
kind: documentation
aliases:
  - /account_management/faq/how-do-i-configure-okta-as-a-saml-idp/
disable_toc: true
further_reading:
- link: "account_management/saml"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "account_management/multi_organization"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---

It's recommended that you set up Datadog as an Okta application manually, as opposed to using a 'pre-configured' configuration.

[Consult the dedicated Okta documentation, to know how to Configure SAML 2.0 for Datadog][1] 

## General Details

* **Single Sign On URL**: https://app.datadoghq.com/account/saml/assertion
    (NOTE: If using IdP initiated login, use a public ID-specific URL which is generated after enabling IdP initiated login in Datadog. Find this URL at the '[Configure SAML][2]' page, in the 'Assertion Consumer Service URL' field. Example URL: `https://app.datadoghq.com/account/saml/assertion/id/` This also applies to the **Recipient URL** and the **Destination URL** fields respectively.)

* **Recipient URL**: https://app.datadoghq.com/account/saml/assertion (or check the box labeled "Use this for Recipient URL and Destination URL" in Okta)

* **Destination URL**: https://app.datadoghq.com/account/saml/assertion (or check the box labeled "Use this for Recipient URL and Destination URL" in Okta)

* **Audience URI (SP Entity ID)**: https://app.datadoghq.com/account/saml/metadata.xml

* **Default Relay State**: 

* **Name ID Format**: EmailAddress

* **Response**: Signed

* **Assertion Signature**: Signed

* **Signature Algorithm**: RSA_SHA256

* **Digest Algorithm**: SHA256
* **Assertion Encryption**: Assertions can be encrypted, but unencrypted assertions are also accepted.
* **SAML Single Logout**: Disabled
* **authnContextClassRef**: PasswordProtectedTransport
* **Honor Force Authentication**: Yes
* **SAML Issuer ID**: `http://www.okta.com/`

## Attribute Statements Details

* **NameFormat**: urn:oasis:names:tc:SAML:2.0:attrname-format:uri
* **sn**: user.lastName
* **givenName**: user.firstName

Additional Information on configuring SAML for your Datadog account can be found [on the dedicated SAML documentation page][3]:

In the event that you need to upload an `IDP.XML` file to Datadog before being able to fully configure the application in Okta, see [acquiring the idp.xml metadata file for a SAML template App article][4] for field placeholder instructions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://saml-doc.okta.com/SAML_Docs/How-to-Configure-SAML-2.0-for-DataDog.html
[2]: https://app.datadoghq.com/saml/saml_setup
[3]: /account_management/saml
[4]: https://support.okta.com/help/Documentation/Knowledge_Article/23445146-Acquiring-the-IDPXML-metadata-file-for-a-SAML-Template-App
