---
title: Google SAML IdP
aliases:
  - /account_management/faq/how-do-i-configure-google-as-a-saml-idp/
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---

## Setting up Google as a SAML IdP

[See the dedicated Google instructions][1]

## Service provider details

As a prerequisite, **IDP initiated SSO** must be checked on the Datadog [SAML configuration page][2].

Application Name
: Can be anything

Description
: Can be anything

ACS URL
: Use the URL shown under **Assertion Consumer Service URL** on the [SAML setup page][2] (the one containing `/id/`). If there is more than one value shown for Assertion Consumer Service URL, only enter one of them here.

Entity ID
: Use the URL shown under **Entity ID** on the [SAML setup page][2].

Start URL
: Can be blank, or use the **Single Sign On Login URL** listed on the [SAML setup page][2].

Signed Response
: Leave unchecked

Name ID
: Select **Basic Information** and **Primary Email**

## Attribute mapping

* "urn:oid:1.3.6.1.4.1.5923.1.1.1.6" "Basic Information" "Primary Email"

Also add:

* "urn:oid:2.5.4.4" "Basic Information" "Last Name"
* "urn:oid:2.5.4.42" "Basic Information" "First Name"

{{< img src="account_management/saml/zAttributeMapping.png" alt="zAttributeMapping" style="width:75%;">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/a/answer/7553768
[2]: https://app.datadoghq.com/saml/saml_setup
