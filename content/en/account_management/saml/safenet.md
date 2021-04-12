---
title: Configuring SafeNet as a SAML IdP
kind: documentation
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
---

## Setup

To follow the dedicated SafeNet instructions, see [SafeNet Trusted Access for Datadog][1].

## Datadog

Follow the [main SAML configuration instructions][2].

* The IdP metadata is available in the SafeNet Trusted Access console by clicking the **Download Metadata** button.
* In Datadog, ensure the **Identity Provider (IdP) Initiated Login** box is checked.
* Datadog’s [Service Provider metadata][3] is needed.

## SafeNet

1. Add an Application named `Datadog`.
2. Under **STA Setup**, click **Upload Datadog Metadata**.
3. On the **Metadata upload** window, click **Browse** to search and select the Datadog metadata obtained previously. The service provider metadata information displays under **Account Details**.
4. Click **Save Configuration** to save the details and activate the Datadog application in SafeNet Trusted Access.

## Verify authentication

### Using STA console

Navigate to the Datadog login URL. You are redirected to the SafeNet Trusted Access sign-in page. Enter your primary directory login information, approve the two-factor authentication, and you should be redirected to Datadog after authentication.

**Note**: For IdP initiated mode, enter the **Assertion Consumer Service URL** found in Datadog on the SafeNet Trusted Access console.

### Using STA user portal

Navigate to the User Portal URL to log in to the STA User Portal dashboard. The dashboard shows you a list of applications to which you have access. Click on the Datadog application icon, you are redirected to Datadog after authentication.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://resources.safenetid.com/help/Datadog/Index.htm
[2]: /account_management/saml/#configure-saml
[3]: https://app.datadoghq.com/account/saml/metadata.xml
