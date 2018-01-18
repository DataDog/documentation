---
title: How do I configure Google as a SAML IdP?
kind: faq
further_reading:
- link: "/account_management/saml"
  tag: "Documentation"
  text: Configure SAML for your Datadog account
- link: "/account_management/multi_organization"
  tag: "Documentation"
  text: Configuring Teams & Organizations with Multiple Accounts
---

## Setting up Google as a SAML IdP

[Google instructions](https://support.google.com/a/answer/6087519?hl=en)

## For the "Service Provider Details"

**Pre-requisite**: IDP initiated SSO must be checked on DataDog SAML Configuration page

* **Application Name**: Can be anything
* **Description**: Can be anything
* **ACS URL**: Use the url shown under "Assertion Consumer Service URL" on https://app.datadoghq.com/saml/saml_setup (the one containing `/id/<COMPANY_ID>`). If there is more than one value shown for Assertion Consumer Service URL, only enter one of them here.
* **Entity ID**:  `<COMPANY_ID>` from ACS URL
* **Start URL**: Can be blank, or use the "Single Sign On Login URL" listed on https://app.datadoghq.com/saml/saml_setup and https://app.datadoghq.com/account/team
* **Signed Response**: Leave unchecked
* **Name ID**: "Basic Information" "Primary Email"

## For the "Attribute Mapping"

* "urn:oid:1.3.6.1.4.1.5923.1.1.1.6" "Basic Information" "Primary Email"

Also add:
* "urn:oid:2.5.4.4" "Basic Information" "Last Name"
* "urn:oid:2.5.4.42" "Basic Information" "First Name"

{{< img src="account_management/faq/ySPDetails.png" alt="ySPDetails" responsive="true" popup="true">}}

{{< img src="account_management/faq/zAttributeMapping.png" alt="zAttributeMapping" responsive="true" popup="true">}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}