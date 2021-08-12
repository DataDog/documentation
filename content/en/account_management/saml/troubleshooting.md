---
title: SAML Troubleshooting
kind: documentation
description: Troubleshoot SAML issues for your Datadog account
further_reading:
- link: "https://www.samltool.com/online_tools.php"
  tag: "Developer Tools"
  text: "Identify your assertions with developer SAML tools"

---

## Overview

This page provides troubleshooting instructions for common errors in Security Assertion Markup Language (SAML) authentication. 

### I'm unable to update an IdP metadata file

If you have trouble logging in, capture your assertion by verifying that you have the appropriate values with a [SAML developer tool][1] such as OneLogin.

To validate your metadata file:

1. In OneLogin, navigate to **Validate** > **XML Against XSD Schema**.
2. Paste your metadata into the XML field and select **Metadata** in the XSD (schema file) field.
3. Click **Validate XML With the XSD Schema**.

## Group Mappings

When you login using SAML assertions, inspect the POST methods that pass attributes into Datadog.

To assign roles to users based on IdP `key:value` pair attributes, click **New Mapping**.

#### Enabling Mappings

When you enable Mappings, users who login with SAML to your Datadog account are stripped of their current roles and reassigned to new roles based on their mapping(s) and SAML assertions passed on by your identity provider (IdP). Users who login with SAML but do not have the matching values to a Datadog role are stripped of any and all role(s) and are not allowed to login.

To enable Mappings:

1. In the Datadog application, 

#### Disabling Mappings

When you disable Mappings, users are allowed to login with SAML and have the same roles they are assigned to—even if the group membership changed in your IdP.

### I’m not getting my role or I cannot login based on my role

Look at the role in your SAML assertion that correlates to a user attribute and group mapping in your IdP. Your group mappings in the Datadog application may appear differently in your IdP.

### Identity Provider errors

- If you encounter an issue in Google's Admin Console, see [SAML app error messages][2].
- If you encounter an issue in Active Directory, see [Debug SAML-based single sign-on to applications in Azure Active Directory][3].
- If you encounter an issue in Azure, see [An app page shows an error message after the user signs in][4].
- If you encounter an issue in LastPass, see the [Datadog App Integration][5].

### SAML errors

If you see that a SAML response is missing, verify that you initiated your IdP.

In your Okta application, navigate to **SAML Settings** > **Group Attribute Statements (optional)** and define a key with regular expression such as (.*). If this field is empty, nothing passes. 

### Identity Provider certificates

If you are unable to login to your account, a Datadog certificate or IdP certificate may have expired and rotated, prompting a general SAML error.

Some questions to help troubleshoot your certificate issue include:

- Are you unable to login to your account or also other accounts?
- Did something change in your SSO with SAML configuration recently? 
- Are you seeing issues in this IdP or also in other IdPs?
- Have you verified that you enabled Mappings?

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.samltool.com/attributes.php
[2]: https://support.google.com/a/answer/6301076
[3]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/debug-saml-sso-issues
[4]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/application-sign-in-problem-application-error
[5]: https://support.logmeininc.com/lastpass/help/datadog-app-integration
