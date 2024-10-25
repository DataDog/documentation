---
title: Legacy Okta SAML IdP configuration
aliases:
  - /account_management/faq/how-do-i-configure-okta-as-a-saml-idp/
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---

## Setup

Follow Okta's [Create custom SAML app integrations][1] instructions to configure Okta as a SAML IdP.

**Note**: Set up Datadog as an Okta application manually. Do not use the preconfigured Datadog application.

## General details

| Okta IDP Input Field        | Expected Value                                                                                                                 |
|-----------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| Single Sign On URL          | Assertion Consumer Service URL (Find this URL on the [Configure SAML page][2], in the *Assertion Consumer Service URL* field.) |
| Recipient URL               | Assertion Consumer Service URL (or click the *Use this for Recipient URL and Destination URL* checkbox)                        |
| Destination URL             | Assertion Consumer Service URL (or click the *Use this for Recipient URL and Destination URL* checkbox)                        |
| Audience URI (SP Entity ID) | Service Provider Entity ID (Find this ID on the [Configure SAML page][2], in the *Service Provider Entity ID* field.)         |
| Name ID Format              | EmailAddress                                                                                                                   |
| Response                    | Signed                                                                                                                         |
| Assertion Signature         | Signed                                                                                                                         |
| Signature Algorithm         | SHA256                                                                                                                         |
| Assertion Encryption        | Assertions can be encrypted, but unencrypted assertions are also accepted.                                                     |
| SAML Single Logout          | Disabled                                                                                                                       |
| authnContextClassRef        | PasswordProtectedTransport                                                                                                     |
| Honor Force Authentication  | Yes                                                                                                                            |
| SAML Issuer ID              | `http://www.okta.com/${org.externalKey}`                                                                                       |

## Attribute statements details

| Name       | Name Format (optional) | Value                                             |
|------------|------------------------|---------------------------------------------------|
| NameFormat | URI Reference          | `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` |
| sn         | URI Reference          | `user.lastName`                                   |
| givenName  | URI Reference          | `user.firstName`                                  |

## Group attribute statements (optional)

This is required only if you are using [AuthN Mapping][3].

| Name     | Name Format (optional) | Value                                                                                                                     |
|----------|------------------------|---------------------------------------------------------------------------------------------------------------------------|
| memberOf | Unspecified            | Matches regex `.*` (This method retrieves all groups. Contact your IDP administrator if this does not fit your use case.) |


Additional information on configuring SAML for your Datadog account is available on the [SAML documentation page][4].

In the event that you need to upload an `IDP.XML` file to Datadog before being able to fully configure the application in Okta, see [acquiring the idp.xml metadata file for a SAML template App article][5] for field placeholder instructions.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://help.okta.com/en-us/Content/Topics/Apps/Apps_App_Integration_Wizard_SAML.htm?cshid=ext_Apps_App_Integration_Wizard-saml
[2]: https://app.datadoghq.com/saml/saml_setup
[3]: /account_management/saml/mapping
[4]: /account_management/saml/
[5]: https://support.okta.com/help/s/article/How-do-we-download-the-IDP-XML-metadata-file-from-a-SAML-Template-App
