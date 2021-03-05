---
title: Logging Into the Mobile App When Using IdP-Initiated SAML
kind: documentation
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

## Using the Datadog Mobile App with your IdP-Initiated SAML (SSO) Provider
<div class="alert alert-warning">
Logging into the Datadog mobile app with IdP-initiated SAML is an opt-in feature. Reach out to [Support](https://docs.datadoghq.com/help/) to have the feature enabled for your account before you alter your SAML configuration.
</div>

In order to use the Datadog Mobile App with Identity Provider Initiated SAML you will need to pass an additional Relay State to Datadog in order to trigger the Mobile App landing page on login. When enabled all sign ins from SAML for that particular app will land on a page that page before proceeding. On Mobile devices with the Datadog Mobile App installed the App will capture the request and continue to sign in from the App.

# OneLogin
When configuring your OneLogin App, set the Relay State value on the **Application Details** page to `dd_m_idp`.
{{< img src="account_management/saml/one-login-mobile-idp-relay-state.png" alt="One Login's Application Details Page" >}}

# Okta
When configuring your Okta App, set the Default RelayState value on the "Configure SAML" page to "dd_m_idp".
{{< img src="account_management/saml/okta-mobile-idp-relay-state.png" alt="Okta's Application Details Page" >}}

# Google
When configuring your Google App for Work SAML App, set the **Start URL** under the Service Provider Details to `dd_m_idp`.
{{< img src="account_management/saml/google-mobile-idp-relay-state.png" alt="Google's Service Provider Details Page" >}}

# Troubleshooting
If you see a "403 Forbidden" error on login after configuring the Relay State - contact Support to ensure that the feature has been enabled for your organization.
