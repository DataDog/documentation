---
title: Okta SAML Identity Provider Configuration
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---

## Overview

This page tells you how to set up the Datadog application in Okta. 

Before proceeding, make sure that you are using the latest version of the Datadog application:
1. In Okta, click **Applications**
1. Open the Datadog application
1. Select the **General** tab.
2. Look for a field labeled **SSO Base URL**

If **SSO Base URL** appears, you are using the latest version. If not, configure Okta using the [legacy instructions][1].

## Supported features

The Datadog Okta SAML integration supports the following:
- IdP-initiated SSO
- SP-initiated SSO
- JIT provisioning

For definitions of the terms above, see the Okta [glossary][2].

## Setup

The following instructions allow you to set up Okta as the SAML identity provider (IdP) for Datadog. Completing the setup process requires you to alternate between your Okta and Datadog accounts.

### In Okta
1. Log in to your Okta Admin dashboard
1. In the left navigation, click **Applications**
1. Click **Browse App Catalog**
1. Use the search bar to search for "Datadog"
1. Select the Datadog app for SAML and SCIM.
1. Click **Add Integration**. The General Settings dialog appears.
1. Populate the **SSO Base URL** field with your [Datadog website URL][3].
1. Click **Done**

**Note:** The SSO Base URL field accepts custom subdomains if you are not using a standard Datadog website URL.

Next, download the metadata details to upload to Datadog:
1. While in the settings dialog for the Datadog application in Okta, click the **Sign on** tab.
1. Scroll down until you see the **Metadata URL**.
1. Click **Copy**.
1. Open a new browser tab and paste the metadata URL into the address bar.
1. Use your browser to save the content of the metadata URL as an XML file.

### In Datadog



## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/faq/okta/
[2]: https://help.okta.com/en/prod/Content/Topics/Reference/glossary.htm
[3]: /getting_started/site/#access-the-datadog-site
