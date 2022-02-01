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

If you come across an error message such as `Arf. Unknown User`, `There are No Authn Mappings for this User`, `Assertion could not be validated`, `SAML NO HANDLE ERROR`, or `No active account for a user`, there may be an issue with your mappings configuration in Datadog or in your identity provider (IdP) configuration. See the error below to resolve.

### There are no authn mappings for this user

There is a mismatch with your mappings configuration in Datadog and your configuration in your IdP. See [Roles errors](#roles-errors).

### Assertion could not be validated

After enabling IdP initiated login in Datadog, the [Assertion Consumer Service (ACS) URLs][1] in your IdP configuration may be incorrect. Alternatively, your assertions may be unsigned. For more information, see [Assertions and attributes][2].

### SAML no handle error

Your assertion may be missing the required `eduPersonPrincipalName` attribute. Confirm that this attribute is set in your configuration. For more information, see [Assertions and attributes][2].

### No active account for a user

This error can occur as a result of the following scenarios:
  - If you've enabled Just-In-Time (JIT) provisioning, and a user still sees this error when trying to log in, check to see if you have already sent an email invitation to this user prior to enabling JIT. JIT does not apply to users who have already been invited. To resolve this, have the user accept the email invitation. Or, if the invitation has expired, have the admin send a new invitation.
  - If a user is no longer enabled in a Datadog organization that has JIT provisioning enabled and they try to log in again through SAML and the `There is no active account for error` occurs, re-enable the user in [User settings][3].

## IdP metadata file errors

If you are having trouble updating your IdP metadata file, verify that the metadata file you are trying to upload is valid.

To validate your metadata file:

1. Choose a SAML validation tool, such as the [SAML developer tool][4] by OneLogin.
2. Paste your metadata into the XML field and select **Metadata** in the XSD (schema file) field.
3. Click **Validate XML With the XSD Schema**.

## Roles errors

When mappings are enabled, users logging in with SAML to a Datadog account are stripped of their current roles and reassigned to new roles based on the details in their SAML assertion passed on from your IdP.

Users who log in with SAML and do not have the values that map to a Datadog role are stripped of all roles and are not allowed to log in.

{{< img src="account_management/saml/unknown_user_error.png" alt="No AuthNMappings for this user" style="width:80%;">}}

If you have group mappings set and are not able to see your roles, your group mappings in the Datadog application may appear differently in your IdP. To verify:

1. Retrieve your IdP's SAML assertion for your account. Use browser tooling, such as [extensions][5], to retrieve your SAML assertion. For example:

  ```xml
  <saml2:Attribute Name="member_of"
                             NameFormat="urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified"
                             >
                <saml2:AttributeValue xmlns:xs="http://www.w3.org/2001/XMLSchema"
                                      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                                      xsi:type="xs:string"
                                      >name_of_your_group_goes_here</saml2:AttributeValue>
  </saml2:Attribute>
  ```

2. Navigate to your profile and select **Organization Settings** in the bottom left corner of Datadog.
3. Select [**SAML Group Mappings**][6].
4. Compare the attributes provided by your IdP in your SAML assertion to the attributes set in the [**SAML Group Mappings**][6] tab.

  {{< img src="account_management/saml/saml_mappings_example.png" alt="SAML mappings in Datadog" style="width:80%;">}}

5. Resolve any discrepancies in either the Datadog SAML Group Mappings settings, or within your IdP settings. For example, if `memberof` is a set attribute in Datadog, and it's `member_Of` in your SAML assertion, resolve accordingly.

Discrepancies may occur when there is no match or a mismatch between the attribute key and value. For example, if you see a key value pair of `memberOf` and `name_of_your_group_goes_here` in **SAML Group Mappings**, you run into an issue because this pair is not included in the assertion sent over from your IdP.

If you are having trouble logging in because of a role-based error, contact your Administrator to complete the troubleshooting steps above.

**Notes**:

- Each IdP provides different types of attributes, and different ways to set attributes. For example, Azure uses [object IDs][7] for their attribute, or if you're using Okta, you must set attributes in [Okta settings][8]. Reference your IdP's attribute documentation for information.

- When you disable **SAML Group Mappings**, users are allowed to log in with SAML and have the same roles they are assigned to—even if the group membership changed in your IdP.

## Identity provider (IdP) errors

If you encounter an error coming from your IdP such as Google, Active Directory, Azure, LastPass, Okta, and more:

- If you encounter an issue in Google's Admin Console, see [SAML app error messages][9].
- If you encounter an issue in Active Directory, see [Debug SAML-based single sign-on to applications in Azure Active Directory][10].
- If you encounter an issue in AuthO, see [Troubleshoot SAML Configurations][11].
- If you encounter an issue in Azure, see [An app page shows an error message after the user signs in][12].
- If you encounter an issue in Google, see [Datadog cloud application][13].
- If you encounter an issue in LastPass, see the [Datadog App Integration][14].
- If you encounter an issue in Okta, see [Receiving 404 error when attempting to sign into application][15].
- If you encounter an issue in SafeNet, see [SafeNet Trusted Access for Datadog][16].

### Identity provider certificates

If you are unable to log in to your account, an IdP certificate may have expired and rotated, prompting a general SAML error.

Some questions to ask yourself that can help narrow down whether you have a certificate issue:

- Are you the only account that is unable to log in? If the issue involves multiple accounts, it could be that an IdP-based certificate has expired or rotated.
- Did anything recently change in your SAML configuration?
- If your users are using multiple IdPs, are the issues persisting across multiple IdPs, or only one?
- Did you recently enable [**SAML Group Mappings**](#roles-errors)?

To resolve, ensure IdP certificates are up-to-date within your IdP's settings and that you have uploaded the most recent metadata file from your IdP in Datadog.

## Support

If you are still having trouble logging into Datadog, contact [Datadog support][17].

In your message, provide a screen recording of your login process and include responses to the following questions:

- Are you the only account that is unable to log in or are all users unable to log in?
- Which organization are you trying to log in to and how are you trying to log in?

Before reaching out to Datadog support, contact your Administrator. You may need to also reach out your identity provider to resolve login issues.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/login-methods/saml
[2]: https://docs.datadoghq.com/account_management/saml/#assertions-and-attributes
[3]: https://app.datadoghq.com/organization-settings/users
[4]: https://www.samltool.com/validate_xml.php
[5]: https://www.samltool.com/saml_tools.php
[6]: https://app.datadoghq.com/organization-settings/mappings
[7]: https://docs.microsoft.com/en-us/azure/active-directory/cloud-sync/concept-attributes#attributes-and-expressions
[8]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-about-attribute-mappings.htm
[9]: https://support.google.com/a/answer/6301076
[10]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/debug-saml-sso-issues
[11]: https://auth0.com/docs/troubleshoot/troubleshoot-authentication/troubleshoot-saml-configurations
[12]: https://docs.microsoft.com/en-us/azure/active-directory/manage-apps/application-sign-in-problem-application-error
[13]: https://support.google.com/a/answer/7553768
[14]: https://support.logmeininc.com/lastpass/help/datadog-app-integration
[15]: https://support.okta.com/help/s/article/Receiving-404-error-when-attempting-to-sign-into-application?language=en_US
[16]: https://resources.safenetid.com/help/Datadog/Index.htm
[17]: https://www.datadoghq.com/support/
