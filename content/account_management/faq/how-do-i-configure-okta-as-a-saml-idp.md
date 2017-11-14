---
title: How do I configure Okta as a SAML IdP?
kind: faq
customnav: accountmanagementnav
---

It's recommended that you set up Datadog as an Okta app manually, as opposed to using a 'preconfigured' configuration.

## General Details

* **Single Sign On URL**: https://app.datadoghq.com/account/saml/assertion (    NOTE: If using IdP initiated login you'll need to use a public ID-specific URL which is generated after enabling IdP initiated login in Datadog. You can find this URL at the '[Configure SAML](https://app.datadoghq.com/saml/saml_setup)' page, in the 'Assertion Consumer Service URL' field. Example URL: "https://app.datadoghq.com/account/saml/assertion/id/<PUBLIC_ID>" This will also apply to the 'Recipient URL' and the 'Destination URL' fields respectively.)

* **Recipient URL**: https://app.datadoghq.com/account/saml/assertion (or check the box labeled "Use this for Recipient URL and Destination URL" in Okta)

* **Destination URL**: https://app.datadoghq.com/account/saml/assertion (or check the box labeled "Use this for Recipient URL and Destination URL" in Okta)

* **Audience URI (SP Entity ID)**: https://app.datadoghq.com/account/saml/metadata.xml

* **Default Relay State**: <not required/leave blank>

* **Name ID Format**: EmailAddress

* **Response**: Signed

* **Assertion Signature**: Signed

* **Signature Algorithm**: RSA_SHA256

* **Digest Algorithm**: SHA256
* **Assertion Encryption**: <Assertions can be encrypted, but unencrypted assertions will also be accepted>
* **SAML Single Logout**: Disabled
* **authnContextClassRef**: PasswordProtectedTransport
* **Honor Force Authentication**: Yes
* **SAML Issuer ID**: `http://www.okta.com/<OKTA_ENTITY_ID>``

## Attribute Statements Details

* **NameFormat**: urn:oasis:names:tc:SAML:2.0:attrname-format:uri
* **sn**: user.lastName
* **givenName**: user.firstName

Additional Information on configuring SAML for your Datadog account can be found [here](/account_management/saml):

In the event that you need to upload an IDP.XML file to Datadog before being able to fully configure the app in Okta, see [HERE](https://support.okta.com/help/Documentation/Knowledge_Article/23445146-Acquiring-the-IDPXML-metadata-file-for-a-SAML-Template-App) for field placeholder instructions.