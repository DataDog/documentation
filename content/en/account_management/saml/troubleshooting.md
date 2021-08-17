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

This page provides troubleshooting instructions for common errors during Security Assertion Markup Language (SAML) authentication.

## IdP metadata file errors

If you are having trouble with updating your IdP metadata file, it is recommended to verify that the metadata file you are trying to upload is valid.

To validate your metadata file:

1. Choose a SAML validation tool, such as the [SAML developer tool][1] by OneLogin.
2. Paste your metadata into the XML field and select **Metadata** in the XSD (schema file) field.
3. Click **Validate XML With the XSD Schema**.

## Roles errors

When mappings are enabled, users logging in with SAML to a Datadog account will be stripped of their current roles and reassigned to new roles based on the details in their SAML assertion passed on from your Identity Provider, and the mappings set within Mappings settings.

Users who log in with SAML and do not have the values that map to a Datadog role will be stripped of all roles and will not be allowed to log in.

If you have group mappings set and are not able to see your roles, you group mappings in the Datadog application may appear differently in your IdP. To verify:

1. Retrieve your IdP's SAML assertion for your account. Use browser tooling, such as [extensions][6], to retrieve your SAML assertion.
2. Navigate to the Team page in the bottom left corner of the Datadog app.
3. Select the **Mappings** tab.
4. Compare the attributes provided by your IdP in your SAML assertion to the attributes set in the **Mappings** tab.
5. Resolve any discrepencies in either the Datadog Mappings settings, or within your IdP settings.

If you are having trouble logging in because of a role-based error, contact your Administrator to complete the troubleshooting steps above.

**Notes**: 

- Each IdP provides different types of attributes, and different ways to set attributes. For example, Azure uses [object IDs][7] for their attribute, or if you're using Okta, you must set attributes in [Okta settings][8]. Reference your IdP's attribute documentation for information.

- When you disable Mappings, users are allowed to login with SAML and have the same roles they are assigned to—even if the group membership changed in your IdP.

## Identity provider errors

- If you encounter an issue in Google's Admin Console, see [SAML app error messages][2].
- If you encounter an issue in Active Directory, see [Debug SAML-based single sign-on to applications in Azure Active Directory][3].
- If you encounter an issue in Azure, see [An app page shows an error message after the user signs in][4].
- If you encounter an issue in LastPass, see the [Datadog App Integration][5].

### Identity Provider certificates

If you are unable to login to your account, an IdP certificate may have expired and rotated, prompting a general SAML error. 

Some questions to ask yourself that can help narrow down whether you have a certificate issue:

- Are you the only account that is unable to log in? If the issue involves multiple accounts, it could be that an IdP-based certificate has expired or rotated.
- Did anything recently change in your SAML configuration?
- If your users are using multiple IdPs, are you seeing issues persists across multiple IdPs, or only one?
- Did you recently enable [Mappings](#roles-errors)?

## Support

If you are still experiencing errors regarding your SAML assertions or are having trouble logging into the Datadog app, contact [Datadog support][9].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.samltool.com/validate_xml.php
[2]: https://support.google.com/a/answer/6301076
[3]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/debug-saml-sso-issues
[4]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/application-sign-in-problem-application-error
[5]: https://support.logmeininc.com/lastpass/help/datadog-app-integration
[6]: https://www.samltool.com/saml_tools.php
[7]: https://docs.microsoft.com/en-us/azure/active-directory/cloud-sync/concept-attributes#attributes-and-expressions
[8]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-about-attribute-mappings.htm
[9]: https://www.datadoghq.com/support/
