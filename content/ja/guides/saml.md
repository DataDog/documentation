---
last_modified: 2015/04/02
translation_status: original
language: ja
title: Single Sign On With SAML
kind: guide
listorder: 14
sidebar:
  nav:
    - header: Guide to SAML SSO
    - text: SAML
      href: "#saml"
    - text: Configure SAML
      href: "#configure"
    - text: Service Provider Details
      href: "#spdetails"
    - text: Setting Attributes
      href: "#attrib"
---

This guide assumes that you already have a SAML Identity Provider up and running.

<h2 id="saml">SAML</h2>

Configuring <a href="http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language">SAML (Security Assertion Markup Language)</a> for your Datadog account will let you and all your teammates log in to Datadog using the credentials stored in your organization’s Active Directory, LDAP, or other identity store that has been configured with a SAML Identity Provider.

<h2 id="configure">Configure SAML</h2>

If you are a Datadog Admin, there is a “Configure SAML” option in the drop down menu that is accessed by clicking on your username in the upper right corner of the Datadog web page.


<img src="/static/images/saml_1.png" style="width:100%; border:1px solid #777777"/>


That brings you to the "SAML Single Sign On Configuration" page where you can:

1. Upload the IdP Metadata from your SAML Identity provider by clicking the "Choose File" button.
  <img src="/static/images/saml_choose_file.png" style="width:50%; border:1px solid #777777"/>
  After you've chosen the file, click "Upload File".
2. Datadog’s Service Provider metadata can be found at <a href="https://app.datadoghq.com/account/saml/metadata.xml">https://app.datadoghq.com/account/saml/metadata.xml</a>. You can use this SP Metadata to configure your IdP to recognize Datadog as a Service Provider.
3. After you upload the IdP Metadata and configure your IdP, you will need up enable SAML in Datadog by clicking the Enable SAML button.


<img src="/static/images/saml_enable.png" style="width:100%; border:1px solid #777777"/>


Once SAML is configured in Datadog and your IdP is set up to accept requests from Datadog, users can log in by using the Single Sign On URL that is shown in the Status box at the top of the SAML Configuration page.


<img src="/static/images/saml_enabled.png" style="width:100%; border:1px solid #777777"/>


The Single Sign On URL will also be displayed on the Team page. Loading this URL will initiate a SAML authentication against your IdP. Please note that the URL will not be displayed until SAML is enabled for your account.

<h2 id="spdetails">Datadog Service Provider Details</h2>

* Datadog supports the **HTTP-POST** binding for **SAML2**: `urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog will specify `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` for the Format of the **NameIDPolicy** in Assertion Requests.
* Assertions must be signed.
* Assertions can be encrypted, but unencrypted assertions will be accepted.
* Datadog’s SP Metadata can be found at <a href="https://app.datadoghq.com/account/saml/metadata.xml">https://app.datadoghq.com/account/saml/metadata.xml</a>.

<h2 id="attrib"> Setting Attributes </h2>
* Attributes may be included with the Assertion. Datadog looks for 3 Attributes in the AttributeStatement:
  1. **eduPersonPrincipalName**:  If specfified, the eduPersonPrincipalName must correspond to the user’s Datadog username.  The username is usually the user’s email address.
  2. **sn**: This is optional, and should be set to the user’s surname.
  3. **givenName**: This is optional, and should be set to the user’s first, or given name.
* Datadog expects that Attributes use the NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` or `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`.  The name used for each attribute will depend on the NameFormat that your IdP uses.
* If your IdP is configured to use the NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`:
 1. **eduPersonPrincipalName**: The IdP should set `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` as the Name of the Attribute
 2. **sn**: The IdP should set `urn:oid:2.5.4.4` as the Name of the Attribute
 3. **givenName**: The IdP should set `urn:oid:2.5.4.42` as the Name of the Attribute
* If your IdP is configured to use the NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`:
 1. **eduPersonPrincipalName**: The IdP should set `urn:mace:dir:attribute-def:eduPersonPrincipalName` as the Name of the Attribute
 2. **sn**: The IdP should set `urn:mace:dir:attribute-def:sn` as the Name of the Attribute
 3. **givenName**: The IdP should set `urn:mace:dir:attribute-def:givenName` as the Name of the Attribute
* If **eduPersonPrincipalName** exists in the AttributeStatement, the value of this attribute will be used for the username.  If **eduPersonPrincipalName** is not included in the AttributeStatement, the username will be taken from the NameID in the Subject.  The NameID must use the Format `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.
* If **sn** and **givenName** are provided, they will be used to update the user’s name in their Datadog profile.
