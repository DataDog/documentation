---
title: Comment configurer Google come IdP SAML?
kind: faq
disable_toc: true
further_reading:
- link: "account_management/saml"
  tag: "Documentation"
  text: Configurez SAML pour votre compte Datadog
- link: "account_management/multi_organization"
  tag: "Documentation"
  text: Configurez vos Teams et Organisations avec plusieurs comptes
---

### Setting up Google as a SAML IdP

[Please read the dedicated Google instructions][1]

### For the "Service Provider Details"

**Pre-requisite**: IDP initiated SSO must be checked on Datadog SAML Configuration page

* **Application Name**: Can be anything
* **Description**: Can be anything
* **ACS URL**: Use the url shown under "Assertion Consumer Service URL" on https://app.datadoghq.com/saml/saml_setup (the one containing `/id/`). If there is more than one value shown for Assertion Consumer Service URL, only enter one of them here.
* **Entity ID**:  `` from ACS URL
* **Start URL**: Can be blank, or use the "Single Sign On Login URL" listed on https://app.datadoghq.com/saml/saml_setup and https://app.datadoghq.com/account/team
* **Signed Response**: Leave unchecked
* **Name ID**: "Basic Information" "Primary Email"

### For the "Attribute Mapping"

* "urn:oid:1.3.6.1.4.1.5923.1.1.1.6" "Basic Information" "Primary Email"

Also add:

* "urn:oid:2.5.4.4" "Basic Information" "Last Name"
* "urn:oid:2.5.4.42" "Basic Information" "First Name"

{{< img src="account_management/faq/zAttributeMapping.png" alt="zAttributeMapping" responsive="true" popup="true" style="width:75%;">}}

### En apprendre plus

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://support.google.com/a/answer/6087519?hl=en