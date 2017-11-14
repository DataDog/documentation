---
title: How do I configure Google as a SAML IdP?
kind: faq
customnav: accountmanagementnav
---

## Setting up Google as a SAML IdP

Google instructions can be found at https://support.google.com/a/answer/6087519?hl=en

## For the "Service Provider Details"

* **Application Name**: Can be anything
* **Description**: Can be anything
* **ACS URL**: use the value shown under "Assertion Consumer Service URL" on https://app.datadoghq.com/saml/saml_setup. (e.g. https://app.datadoghq.com/account/saml/assertion). If there is more than one value shown for Assertion Consumer Service URL, only enter one of them here.
* **Entity ID**: https://app.datadoghq.com/account/saml/metadata.xml
* **Start URL**: Can be blank, or use the "Single Sign On Login URL" listed on https://app.datadoghq.com/saml/saml_setup and https://app.datadoghq.com/account/team
* **Signed Response**: Leave Un-checked
* **Name ID**: "Basic Information" "Primary Email"

## For the "Attribute Mapping"

* "urn:oid:1.3.6.1.4.1.5923.1.1.1.6" "Basic Information" "Primary Email"
You can also add:
* "urn:oid:2.5.4.4" "Basic Information" "Last Name"
* "urn:oid:2.5.4.42" "Basic Information" "First Name"

{{< img src="account_management/faq/ySPDetails.png" alt="ySPDetails" responsive="true" >}}

{{< img src="account_management/faq/zAttributeMapping.png" alt="zAttributeMapping" responsive="true" >}}
