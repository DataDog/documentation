---
title: Single Sign On With SAML
kind: documentation
aliases:
  - /guides/saml
further_reading:
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">The Datadog for Government site only supports SAML login.</div>
{{< /site-region >}}

## Overview

Configuring [SAML (Security Assertion Markup Language)][1] for your Datadog account lets you and all your teammates log in to Datadog using the credentials stored in your organization's Active Directory, LDAP, or other identity store that has been configured with a SAML Identity Provider.

**Notes**: 

- If you don't have SAML enabled on your Datadog account, reach out to [support][2] to enable it.
- This documentation assumes that you already have a SAML Identity Provider (IdP). If you do not have a SAML IdP, there are several IdPs that have integrations with Datadog such as [Active Directory][3], [Auth0][4], [Azure][3], [Google][5], [LastPass][6], [Okta][7], and [SafeNet][8].
- SAML configuration requires [Datadog Administrator][9] access.

## Configuring SAML

1. To begin configuration, see your IdP's documentation:

    * [Active Directory][10]
    * [Auth0][11]
    * [Azure][12]
    * [Google][13]
    * [NoPassword][14]
    * [Okta][15]
    * [SafeNet][16]

2. In the Datadog app, hover over your username in the bottom left corner and select Organization Settings. Select [Login Methods][17] and click on **Configure** under SAML.

3. Upload the IdP Metadata from your SAML Identity provider by clicking the **Choose File** button. After choosing the file, click **Upload File**.

4. Download Datadog's [Service Provider metadata][18] to configure your IdP to recognize Datadog as a Service Provider.

5. After you upload the IdP Meta-data and configure your IdP, enable SAML in Datadog by clicking the **Upload and Enable** button.
    {{< img src="account_management/saml/saml_enable.png" alt="saml enable"  >}}
    
6. After uploading the IdP metadata, return to the **Login Methods** page and turn SAML `on` by default. 

7. Once SAML is configured in Datadog and your IdP is set up to accept requests from Datadog, users can log in:

   - **If using SP-initiated login** (Service Provider, or login initiated from Datadog): By using the **Single Sign-on URL** shown in the Status box at the top of the [SAML Configuration page][19]. The **Single Sign-on URL** is also displayed on the [Team page][20]. Loading this URL initiates a SAML authentication against your IdP. **Note**: This URL isn't displayed unless SAML is enabled for your account and you are using SP-initiated login.
    {{< img src="account_management/saml/saml_enabled.png" alt="Saml Enabled"  >}}

   - **If using IdP-initiated login** (Identity Provider, or login initiated from your app portal): By clicking on the app icon in your app portal, for example in the Google App drawer or the Okta App Portal. In some scenarios users logging in with the SP-initiated login URL will also work with the IdP-initiated login experiences, but this depends on your Identity Provider's configuration and support.

**Note**: If you want to configure SAML for a multi-org, see [Managing Multiple-Organization Accounts][21].

## Assertions and attributes

When a login occurs, a SAML Assertion containing user authorization is sent from the identity provider to Datadog.

Some important notes on assertions:

* Datadog supports the **HTTP-POST** binding for **SAML2**:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog specifies `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` for the format of the **NameIDPolicy** in assertion requests.
* Assertions must be signed.
* Assertions can be encrypted, but unencrypted assertions are accepted.
* Reference [Datadog's Service Provider metadata][18] for more information. You must be signed in to Datadog to access the file.

Attributes may be included in a SAML Assertion. Datadog looks for three attributes in an `AttributeStatement`:

  1. **eduPersonPrincipalName**: If specified, the eduPersonPrincipalName must correspond to the user's Datadog username. The username is typically the user's email address.
  2. **sn**: This is optional, and should be set to the user's surname.
  3. **givenName**: This is optional, and should be set to the user's first, or given name.

Datadog expects that Attributes use the URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` or the Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`. The name used for each attribute depends on the NameFormat that your IdP uses.

If your IdP is configured to use the URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`:

  1. **eduPersonPrincipalName**: The IdP should set `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` as the name of the attribute.
  2. **sn**: The IdP should set `urn:oid:2.5.4.4` as the name of the attribute.
  3. **givenName**: The IdP should set `urn:oid:2.5.4.42` as the name of the attribute.

If your IdP is configured to use the Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`:

  1. **eduPersonPrincipalName**: The IdP should set `urn:mace:dir:attribute-def:eduPersonPrincipalName` as the name of the attribute.
  2. **sn**: The IdP should set `urn:mace:dir:attribute-def:sn` as the name of the attribute.
  3. **givenName**: The IdP should set `urn:mace:dir:attribute-def:givenName` as the name of the attribute.

If **eduPersonPrincipalName** exists in the AttributeStatement, the value of this attribute is used for the username. If **eduPersonPrincipalName** is not included in the AttributeStatement, the username is taken from the NameID in the Subject. The NameID must use the Format `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.

If **sn** and **givenName** are provided, they are used to update the user's name in their Datadog profile.

## Mapping SAML attributes to Datadog roles

With Datadog, you can map attributes in your IdP's response to Datadog roles. Users with the Access Management permission can assign or remove Datadog roles based on a user's SAML-assigned attributes.

It’s important to understand what is sent in an assertion before turning on mappings as mappings require correct attributes. Every IdP has specific mappings. For example, Azure works with object IDs, and Okta requires you to set attributes in [Okta settings][22]. Datadog recommends cross-referencing with [built-in browser tooling][23] such as Chrome Dev Tools or browser extensions and [validating your SAML assertions][24] **before** creating mappings.

1. [Cross-reference][23] and [validate][24] your SAML assertion to understand your IdP's attributes.

2. Go to **Organization Settings** and click the **SAML Group Mappings** tab.

3. Click **New Mapping**.

4. Specify the SAML identity provider `key-value` pair that you want to associate with an existing Datadog role (either default or custom). **Note**: These entries are case-sensitive.

   For example, if you want all users whose `member_of` attribute has a value of `Development` to be assigned to a custom Datadog role called `Devs`:

    {{< img src="account_management/saml/create_mapping.png" alt="Creating a SAML mapping to Datadog Role"  >}}

   **Note**: Every identity provider is different. Some allow you to set your attribute key or label. Others provide one by default. Datadog recommends you use an assertion inspector on your login to view the details of your particular assertion to understand how your Identity Provider is sending your group membership.

5. If you have not already done so, enable mappings by clicking **Enable Mappings**.

When a user logs in who has the specified identity provider attribute, they are automatically assigned the Datadog role. Likewise, if someone has that identity provider attribute removed, they lose access to the role (unless another mapping adds it).

<div class="alert alert-warning">
  <strong>Important:</strong> If a user does <i>not</i> match any mapping, they lose any roles they had previously and are prevented from logging into the org with SAML. Double-check your mapping definitions and inspect your own assertions before enabling Mappings to prevent any scenarios where your users are unable to login.
</div>

You can make changes to a mapping by clicking the **pencil** icon or removing it by clicking the **garbage** icon. These actions affect only the mapping, not the identity provider attributes or the Datadog roles.

Alternatively, you can create and change mappings of SAML attributes to Datadog roles with the `authn_mappings` endpoint. For more information, see [Federated Authentication to Role Mapping API][25].

## Additional features

The following features can be enabled through the [SAML Configuration dialog][19]:

**Note:** You must have Admin permissions to see the SAML Configuration dialog.

### Just in time (JIT) provisioning

With JIT provisioning, a user is created within Datadog the first time they try to log in. This eliminates the need for administrators to manually create user accounts one at a time. The invitation email is not sent in this case.

Some organizations might not want to invite all of their users to Datadog. If you would like to make changes to how SAML works for your account, contact [Datadog support][2]. It is up to the organization to configure their IdP to not send assertions to Datadog if they don't want a particular user to access Datadog.

Administrators can set the default role for new JIT users. The default role is **Standard**, but you can choose to add new JIT users as **Read-Only** or even **Administrators**.

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT Default" style="width:50%;" >}}

### IdP initiated login

When the Datadog URL is loaded, the browser is redirected to the customer IdP where the user enters their credentials, then the IdP redirects back to Datadog. Some IdPs have the ability to send an assertion directly to Datadog without first getting an AuthnRequest (IdP Initiated Login).

After enabling the IdP-initiated login feature and saving your configuration, you can download the latest version of the SP Metadata for your Identity Provider. Your new SP metadata contains a different, organization-specific `AssertionConsumerService` endpoint to send assertions to.

If you do not use the updated SP Metadata, Datadog is not able to associate the assertion with your organization and displays an error page with a message that the SAML response is missing the "InResponseTo" attribute.

### SAML strict

You can make your organization SAML Strict by disabling other login method types in the the **Login Methods** UI. When this option is configured, all users must, by default, log in with SAML. An existing username/password or Google OAuth login does not work. This ensures that all users with access to Datadog must have valid credentials in your company’s identity provider/directory service to access your Datadog account. Org administrators can set per-user [overrides][26] to allow certain users to be SAML Strict exempt.

### Self-updating Datadog SP Metadata

Certain Identity Providers (such as Microsoft's ADFS) can be configured to pull the latest SAML service provider metadata from Datadog. After you configure SAML in Datadog, you can get the metadata URL for your organization from the SAML Configuration page and use that with your Identity Provider to get the latest service provider metadata whenever changes are published.

{{< img src="account_management/saml/saml_metadata_url.png" alt="SAML Metadata URL" style="width:50%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /help/
[3]: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml
[4]: https://auth0.com/docs/protocols/saml-protocol
[5]: https://cloud.google.com/architecture/identity/single-sign-on
[6]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://help.safenetid.com/operator/Content/STA/Apps/Apps_SAML.htm
[9]: /account_management/users/default_roles/
[10]: /account_management/saml/activedirectory/
[11]: /account_management/saml/auth0/
[12]: /account_management/saml/azure/
[13]: /account_management/saml/google/
[14]: /account_management/saml/nopassword/
[15]: /account_management/saml/okta/
[16]: /account_management/saml/safenet/
[17]: https://app.datadoghq.com/organization-settings/login-methods
[18]: https://app.datadoghq.com/account/saml/metadata.xml
[19]: https://app.datadoghq.com/saml/saml_setup
[20]: https://app.datadoghq.com/account/team
[21]: /account_management/multi_organization/#setting-up-saml
[22]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm
[23]: https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US
[24]: https://www.samltool.com/validate_response.php
[25]: /account_management/authn_mapping/
[26]: /account_management/login_methods/#reviewing-user-overrides
