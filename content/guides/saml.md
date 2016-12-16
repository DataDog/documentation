---
title: Single Sign On With SAML
kind: guide
listorder: 14

---
This guide assumes that you already have a SAML Identity Provider up and running.

## SAML

Configuring [SAML (Security Assertion Markup Language)](http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language) for your Datadog account will let you and all your teammates log in to Datadog using the credentials stored in your organization’s Active Directory, LDAP, or other identity store that has been configured with a SAML Identity Provider.

## Configure SAML
{: #configuresaml}
If you are a Datadog Admin, there is a “Configure SAML” option in the drop down menu that is accessed by clicking on your username in the upper right corner of the Datadog web page.
![](/static/images/saml_configure.png)

That brings you to the "SAML Single Sign On Configuration" page where you can:

1.  Upload the IdP Metadata from your SAML Identity provider by clicking the "Choose File" button.

    ![](/static/images/saml_choose_file.png)

    After you've chosen the file, click "Upload File".

2. Datadog’s [Service Provider metadata can be found here](https://app.datadoghq.com/account/saml/metadata.xml). You can use this SP Metadata to configure your IdP to recognize Datadog as a Service Provider.
3. After you upload the IdP Metadata and configure your IdP, you will need up enable SAML in Datadog by clicking the Enable button.
![][5]
Once SAML is configured in Datadog and your IdP is set up to accept requests from Datadog, users can log in by using the Single Sign On URL that is shown in the Status box at the top of the SAML Configuration page.
![][6]
The Single Sign On URL will also be displayed on the Team page. Loading this URL will initiate a SAML authentication against your IdP. Please note that the URL will not be displayed until SAML is enabled for your account.

   [4]: https://app.datadoghq.com/account/saml/metadata.xml
   [5]: /static/images/saml_enable.png
   [6]: /static/images/saml_enabled.png

## Datadog Service Provider Details
{: #ddspdetails}

* Datadog supports the **HTTP-POST** binding for **SAML2**:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog will specify `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` for the Format of the **NameIDPolicy** in Assertion Requests.
* Assertions must be signed.
* Assertions can be encrypted, but unencrypted assertions will be accepted.
* Datadog’s SP Metadata can be found at [https://app.datadoghq.com/account/saml/metadata.xml][7].

   [7]: https://app.datadoghq.com/account/saml/metadata.xml

##  Setting Attributes
{: #settingattributes}

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

For more information about configuring specific IdP's, refer to the following Knowledge Base articles:

* [Google](https://help.datadoghq.com/hc/en-us/articles/208139913-How-do-I-configure-Google-as-a-SAML-IdP-)
* [Microsoft Active Directory Federation Services](https://help.datadoghq.com/hc/en-us/articles/207425226-How-do-I-setup-Microsoft-Active-Directory-Federation-Services-as-a-SAML-IdP-)
* [NoPassword](https://help.datadoghq.com/hc/en-us/articles/211023623-How-do-I-configure-NoPassword-as-a-SAML-IdP-)
* [Okta](https://help.datadoghq.com/hc/en-us/articles/210132743-How-do-I-configure-Okta-as-a-SAML-IdP-)


## Additional Features
{: #additionalfeatures}
The following features can be enabled through the SAML Configuration dialog.

### Just in Time Provisioning (JIT Provisioning)
Normally users must be invited to Datadog, even for organizations with SAML enabled. If a user that has not been invited to Datadog logs in via an Org's IdP, the SAML assertion will be validated, but they will be redirected to a SAML Error page.

Some organizations might not want to have to invite all of their users to Datadog. If you would like to make changes to how SAML works for your account, contact support.

It is up to the organization to configure their IdP to not send assertions to Datadog if they don't want a particular user to access Datadog.

### IdP Initiated Login

The normal workflow is that when the Datadog url is loaded, the browser is redirected to the customer IdP, user types in credentials, then the IdP redirects back to Datadog. Some IdPs have the ability to send an assertion directly to Datadog without first getting an AuthnRequest (IdP Initiated Login).

In the normal setup, we won't know which org the assertion came from and this will result in an error page with a message saying that SAML Response is missing "InResponseTo" attribute.

After enabling the feature (and waiting for caches to clear) the customer will need to get a new version of the SP Metadata, which will have a different, org-specific AssertionConsumerService endpoint to send assertions to.


