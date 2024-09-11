---
title: SafeNet SAML IdP
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
---

## Setup

Follow the [main SAML configuration instructions][1], then see the [SafeNet Trusted Access for Datadog][2] docs to configure SafeNet as your SAML IdP.

## Datadog

* The IdP metadata is available in the SafeNet Trusted Access console by clicking the **Download Metadata** button.
* In Datadog, ensure the **Identity Provider (IdP) Initiated Login** box is checked.
* Datadog's [Service Provider metadata][3] is needed.

## Verify authentication

### Using STA console

Navigate to the Datadog login URL. Once redirected to the SafeNet Trusted Access sign-in page, enter your primary directory login information and approve the two-factor authentication. This redirects you back to Datadog after authentication.

**Note**: For IdP initiated mode, enter the **Assertion Consumer Service URL** found in Datadog on the SafeNet Trusted Access console.

### Using STA user portal

Navigate to the User Portal URL to log in to the STA User Portal dashboard. The dashboard shows you a list of applications to which you have access. Click on the Datadog application icon, which redirects you to Datadog after authentication.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/saml/#configure-saml
[2]: https://resources.safenetid.com/help/Datadog/Index.htm
[3]: https://app.datadoghq.com/account/saml/metadata.xml
