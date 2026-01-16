---
title: Okta SAML Identity Provider Configuration
description: Set up Okta as a SAML identity provider for Datadog with IdP and SP-initiated SSO, JIT provisioning, and role mapping configuration.
further_reading:
- link: "/account_management/saml/"
  tag: "Documentation"
  text: "Configure SAML for your Datadog account"
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    In the {{< region-param key="dd_site_name" >}} site, you must manually configure the Datadog application in Okta using the <a href="/account_management/faq/okta/">legacy instructions</a>. Ignore the instructions on this page about the preconfigured Datadog application in the Okta application catalog.
</div>
{{% /site-region %}}

## Overview

This page tells you how to set up the Datadog application in Okta. 

Before proceeding, make sure that you are using the latest version of the Datadog application:
1. In Okta, click **Applications**.
1. Open the Datadog application.
1. Select the **General** tab.
1. Look for a field labeled **SSO Base URL**.

{{< img src="account_management/saml/okta/sso_base_url.png" alt="Datadog application configuration in Okta, highlighting the SSO base URL" style="width:80%;" >}}

If you don't see the SSO Base URL field, configure Okta using the [legacy instructions][1].

## Supported features

The Datadog Okta SAML integration supports the following:
- IdP-initiated SSO
- SP-initiated SSO
- JIT provisioning

For definitions of the terms above, see the Okta [glossary][2].

## Setup

Set up Okta as the SAML identity provider (IdP) for Datadog with the following instructions. The setup process requires you to alternate between your Okta and Datadog accounts.

### Add the Datadog integration in Okta

1. Log in to your Okta admin dashboard.
1. In the left navigation, click **Applications**.
1. Click **Browse App Catalog**.
1. Use the search bar to search for "Datadog".
1. Select the Datadog app for SAML and SCIM.
1. Click **Add Integration**. The General Settings dialog appears.
1. Populate the **SSO Base URL** field with your [Datadog website URL][3].
1. Click **Done**.

**Note:** The SSO Base URL field accepts custom subdomains if you are not using a standard Datadog website URL.

Next, download the metadata details to upload to Datadog:
1. While in the settings dialog for the Datadog application in Okta, click the **Sign on** tab.
1. Scroll down until you see the **Metadata URL**.
1. Click **Copy**.
1. Open a new browser tab and paste the metadata URL into the address bar.
1. Use your browser to save the content of the metadata URL as an XML file.

{{< img src="account_management/saml/okta/metadata_url.png" alt="Sign on configuration in Okta" style="width:80%;" >}}

### Configure Datadog

#### Upload metadata details

1. Navigate to [Login Methods][4] under Organization Settings.
1. In the SAML component, click **Configure** or **Update**, depending on whether you have previously configured SAML. The SAML configuration page appears.
1. Click **Choose File**, and select the metadata file you previously downloaded from Okta.

{{< img src="account_management/saml/okta/choose_file.png" alt="SAML configuration in Datadog, highlighting metadata upload button" style="width:100%;" >}}

#### Activate IdP initiated login

For the Datadog application to function correctly, you must activate IdP initiated login.

<div class="alert alert-info">After you activate IdP initiated login, users can log in to Datadog from Okta</div>

To activate IdP initiated login, execute the following steps:
1. Navigate to the [SAML configuration page][5].
1. Under **Additional Features**, click the checkbox for **Identity Provider (IdP) Initiated Login**. The component displays the **Assertion Consumer Service URL**.
1. The content in the Assertion Consumer Service URL after `/saml/assertion` is your company ID. Enter this value with the `/id/` prefix in Okta to finalize your configuration.
1. Click **Save Changes**.

{{< img src="account_management/saml/okta/company_id.png" alt="SAML configuration in Datadog, highlighting the company ID portion of the assertion consumer service URL" style="width:100%;" >}}

Return to Okta for the next set of configuration steps.

### Add the company ID in Okta

1. Return to the Okta admin dashboard.
1. Select the **Sign on** tab.
1. Click **Edit**.
1. Scroll down to the **Advanced Sign-on Settings** section.
1. Paste your full company ID including the `/id/` prefix into the **Company ID** field (`/id/XXXXXX-XXXX-XXX-XXXX-XXXXXXX`).
1. Click **Save**.

## Service Provider (SP) initiated login

To log in to Datadog using service provider-initiated login (SP-initiated SSO), you need the single sign-on (SSO) URL. You can find your SSO URL in two ways: on the SAML configuration page, or through email.

### SAML configuration page
The Datadog [SAML configuration page][5] displays the SSO URL next to the **Single Sign-on URL** heading.

### Email
1. Navigate to the Datadog website URL for your organization.
1. Select **Using Single Sign-On?**.
1. Enter your email address, and click **Next**.
1. Check your email for a message containing the SSO URL, listed as **Login URL**.

After you find your SSO URL from either method, bookmark it for future reference.

## SAML role mapping

Follow the steps below to map Okta attributes to Datadog entities. This step is optional.

1. Navigate to the Okta admin dashboard.
1. Select the **Sign on** tab.
1. Click **Edit**.
1. Populate the **Attributes** with your [group attribute statements][6].
1. Set up your desired [mappings][7] in Datadog.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /account_management/faq/okta/
[2]: https://help.okta.com/en/prod/Content/Topics/Reference/glossary.htm
[3]: /getting_started/site/#access-the-datadog-site
[4]: https://app.datadoghq.com/organization-settings/login-methods
[5]: https://app.datadoghq.com/organization-settings/login-methods/saml
[6]: /account_management/faq/okta/#group-attribute-statements-optional
[7]: /account_management/saml/mapping/
