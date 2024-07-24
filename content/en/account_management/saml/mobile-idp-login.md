---
title: The Datadog Mobile App with IdP Initiated SAML
is_public: true
aliases:
  - /account_management/faq/how-do-i-use-the-mobile-app-with-saml/
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---

## Setup

In order to use the Datadog mobile app with Identity Provider (IdP) Initiated SAML, you need to pass an additional Relay State through to Datadog to trigger the mobile app landing page on login. Once enabled, all sign ins from SAML for that particular app land on a the interstitial page before proceeding.

- On **mobile devices** with the Datadog mobile app installed, users should **first log in with their identity provider using their mobile browser** (see the example with Google, below). Then, the app automatically captures the request and allows the user to sign in.

{{< img src="account_management/saml/google_idp_tile_sml.png" style="width:60%; background:none; border:none; box-shadow:none;" alt="Google IDP relay state" >}}

- On **Desktop devices** or devices where the app is not installed, the user needs to click "Use the Datadog Website" to proceed.

{{< img src="account_management/saml/datadog-mobile-idp-saml-landing-page.png" alt="Datadog Mobile SAML Interstitial" >}}

## Providers

**Note:** Datadog IdP Initiated SAML works with most identity providers. If you run into trouble while configuring your identity provider with the Datadog Mobile App, contact [Datadog support][1]. 

### OneLogin

When configuring your OneLogin app, set the Relay State value on the **Application Details** page to `dd_m_idp`.
{{< img src="account_management/saml/one-login-mobile-idp-relay-state.png" alt="One Login's Application Details Page" >}}

### Okta

When configuring your Okta app, set the Default RelayState value on the **Configure SAML** page to `dd_m_idp`.
{{< img src="account_management/saml/okta-mobile-idp-relay-state.png" alt="Okta's Configure SAML page" >}}

### Google

When configuring your Google app for SAML, set the **Start URL** under the Service Provider Details to `dd_m_idp`.
{{< img src="account_management/saml/google-mobile-idp-relay-state.png" alt="Google's Service Provider Details Page" >}}

## Troubleshooting

If you see a `403 Forbidden` error on login after configuring the Relay State, contact [Support][1] to ensure that the feature has been enabled for your organization.

[1]: /help/
