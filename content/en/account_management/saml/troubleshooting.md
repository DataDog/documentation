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

## Common errors

If you come across an error message such as `Arf. Unknown User`, `There are No Authn Mappings for this User`, `Assertion could not be validated`, `SAML NO HANDLE ERROR`, or `No active account for a user`, there may be an issue with your mappings configuration in Datadog and your configuration in your identity provider (IdP).  

- **There are No Authn Mappings for this User**: There is a mismatch with your mappings configuration in Datadog and your configuration in your IdP. See [Roles errors](#roles-errors) below.
- **Assertion could not be validated**: After enabling IdP initiated login in Datadog, the ACS URLs in your IdP configuration may be incorrect. Alternatively, your assertions may be unsigned. For more information, see [Assertions and attributes][1]. 
- **SAML NO HANDLE ERROR**: Your assertion may be missing the required `eduPersonPrincipalName` attribute. Confirm that this attribute is set in your configuration. 
- **No active account for a user**: Enabling JIT provisioning may result in the following `There is no active account for` errors.
  - When a user tries to log into a Datadog organization without JIT provisioning enabled or an email invitation, the `There is no active account for` error appears. 
  - When you send a new user an email invitation to join a Datadog organization with JIT provisioning enabled and they try to login through the IdP, the `There is no active account for` error appears. 
  - When you disable a user in a Datadog organization with JIT provisioning enabled and they try to login again through SAML, the `There is no active account for` error appears.
  - If you have not verified your email address with the verification email sent from Datadog, the `There is no active account for` error appears.

## IdP metadata file errors

If you are having trouble with updating your IdP metadata file, verify that the metadata file you are trying to upload is valid.

To validate your metadata file:

1. Choose a SAML validation tool, such as the [SAML developer tool][2] by OneLogin.
2. Paste your metadata into the XML field and select **Metadata** in the XSD (schema file) field.
3. Click **Validate XML With the XSD Schema**.

## Roles errors

When mappings are enabled, users logging in with SAML to a Datadog account are stripped of their current roles and reassigned to new roles based on the details in their SAML assertion passed on from your Identity Provider, and the mappings set within Mappings settings.

Users who log in with SAML and do not have the values that map to a Datadog role are stripped of all roles and are not allowed to log in.

{{< img src="account_management/saml/unknown_user_error.png" alt="No AuthNMappings for this user" style="width:80%;">}}

If you have group mappings set and are not able to see your roles, your group mappings in the Datadog application may appear differently in your IdP. To verify:

1. Retrieve your IdP's SAML assertion for your account. Use browser tooling, such as [extensions][3], to retrieve your SAML assertion.
2. Navigate to the Team page in the bottom left corner of Datadog.
3. Select the [**Mappings**][4] tab.
4. Compare the attributes provided by your IdP in your SAML assertion to the attributes set in the [**Mappings**][4] tab.
5. Resolve any discrepancies in either the Datadog Mappings settings, or within your IdP settings.

Discrepancies may occur when there is no match or a mismatch between the attribute key and value. For example, if you see a key value pair of `group` and `okta_sandbox_admin` in **Mappings**, you run into an issue because this pair is not included in the assertion sent over from your IdP. 

If you are having trouble logging in because of a role-based error, contact your Administrator to complete the troubleshooting steps above.

**Notes**: 

- Each IdP provides different types of attributes, and different ways to set attributes. For example, Azure uses [object IDs][5] for their attribute, or if you're using Okta, you must set attributes in [Okta settings][6]. Reference your IdP's attribute documentation for information.

- When you disable Mappings, users are allowed to login with SAML and have the same roles they are assigned to—even if the group membership changed in your IdP.

## Identity provider errors

If you encounter an error coming from your IdP such as Google, Active Directory, Azure, LastPass, Okta, and more:

- If you encounter an issue in Google's Admin Console, see [SAML app error messages][7].
- If you encounter an issue in Active Directory, see [Debug SAML-based single sign-on to applications in Azure Active Directory][8].
- If you encounter an issue in AuthO, see [Troubleshoot SAML Configurations][9].
- If you encounter an issue in Azure, see [An app page shows an error message after the user signs in][10].
- If you encounter an issue in Google, see [Datadog cloud application][11].
- If you encounter an issue in LastPass, see the [Datadog App Integration][12].
- If you encounter an issue in Okta, see [Receiving 404 error when attempting to sign into application][13].
- If you encounter an issue in SafeNet, see [SafeNet Trusted Access for Datadog][14].

### Identity provider certificates

If you are unable to login to your account, an IdP certificate may have expired and rotated, prompting a general SAML error. 

Some questions to ask yourself that can help narrow down whether you have a certificate issue:

- Are you the only account that is unable to log in? If the issue involves multiple accounts, it could be that an IdP-based certificate has expired or rotated.
- Did anything recently change in your SAML configuration?
- If your users are using multiple IdPs, are you seeing issues persists across multiple IdPs, or only one?
- Did you recently enable [Mappings](#roles-errors)?

## Support

If you are still having trouble logging into Datadog, contact [Datadog support][15]. 

In your message, provide a screen recording of your login process and include responses to the following questions: 

- Are you the only account that is unable to login or are all users unable to login?
- Which organization are you trying to login to and how are you trying to login?

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/account_management/saml/#assertions-and-attributes
[2]: https://www.samltool.com/validate_xml.php
[3]: https://www.samltool.com/saml_tools.php
[4]: https://app.datadoghq.com/organization-settings/mappings
[5]: https://docs.microsoft.com/en-us/azure/active-directory/cloud-sync/concept-attributes#attributes-and-expressions
[6]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-about-attribute-mappings.htm
[7]: https://support.google.com/a/answer/6301076
[8]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/debug-saml-sso-issues
[9]: https://auth0.com/docs/troubleshoot/troubleshoot-authentication/troubleshoot-saml-configurations
[10]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/application-sign-in-problem-application-error
[11]: https://support.google.com/a/answer/7553768
[12]: https://support.logmeininc.com/lastpass/help/datadog-app-integration
[13]: https://support.okta.com/help/s/article/Receiving-404-error-when-attempting-to-sign-into-application?language=en_US
[14]: https://resources.safenetid.com/help/Datadog/Index.htm
[15]: https://www.datadoghq.com/support/
