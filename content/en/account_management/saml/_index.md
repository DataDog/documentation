---
title: Single Sign On With SAML
description: Configure SAML authentication for Datadog with identity providers like Active Directory, Auth0, Google, Okta, and Microsoft Entra ID for secure single sign-on.
aliases:
  - /guides/saml
further_reading:
- link: "/account_management/multi_organization/"
  tag: "Documentation"
  text: "Configuring Teams & Organizations with Multiple Accounts"
algolia:
  tags: ['saml']
---
{{< site-region region="gov" >}}
<div class="alert alert-danger">The Datadog for Government site only supports SAML login.</div>
{{< /site-region >}}

## Overview

Configuring [SAML (Security Assertion Markup Language)][1] for your Datadog account lets you and all your teammates log in to Datadog using the credentials stored in your organization's Active Directory, LDAP, or other identity store that has been configured with a SAML Identity Provider.

**Notes**: 

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
- If you don't have SAML enabled on your Datadog account, reach out to [support][2] to enable it.
{{% /site-region %}}
- This documentation assumes that you already have a SAML Identity Provider (IdP). If you do not have a SAML IdP, there are several IdPs that have integrations with Datadog such as [Active Directory][3], [Auth0][4], [Google][5], [LastPass][6], [Microsoft Entra ID][3], [Okta][7], and [SafeNet][8].
- SAML configuration requires [Datadog Administrator][9] access.

## Configuring SAML

See [Configuring Single Sign-On With SAML][2] for instructions.

## Using SAML

After SAML is configured in Datadog and your IdP is set up to accept requests from Datadog, users can log in.

### SP-initiated login

SP-initiated, or Service Provider-initiated, means login initiated from Datadog. Users log in through the **Single Sign-on URL** shown in the status box at the top of the [SAML Configuration page][4]. Loading this URL initiates a SAML authentication against your IdP. **Note**: This URL only displays if SAML is enabled for your account and you are using SP-initiated login.

{{< img src="account_management/saml/saml_enabled_cropped.png" alt="Confirmation that SAML Enabled" >}}

When a user logs in through SP-initiated SAML and the organization does not have a custom subdomain, Datadog requires additional security. Users receive a one-time email verification code that is required to log in.

### IdP-initiated login

IdP-initiated, or Identity Provider-initiated, means login initiated from your app portal. Users log in by clicking on the app icon in your app portal, for example, in the Google App drawer or the Okta App Portal. Users of SP-initiated login may also be able to use IdP-initiated login, depending on your Identity Provider's configuration.

## Assertions and attributes

When a login occurs, a SAML Assertion containing user authorization is sent from the identity provider to Datadog.

### Capabilities

* Datadog supports the **HTTP-POST** binding for **SAML2**:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog specifies `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` for the format of the **NameIDPolicy** in assertion requests.

### Requirements

* Assertions must be signed.
* Assertions can be encrypted, but unencrypted assertions are accepted.
* Reference [Datadog's Service Provider metadata][3] for more information. You must be signed in to Datadog to access the file.

### Supported attributes

Attributes may be included in a SAML Assertion. Datadog looks for three attributes in an `AttributeStatement`:

  1. **eduPersonPrincipalName**: If specified, the eduPersonPrincipalName must correspond to the user's Datadog username. The username is typically the user's email address.
  2. **sn**: This is optional, and should be set to the user's surname.
  3. **givenName**: This is optional, and should be set to the user's first, or given name.

<div class="alert alert-info">For the Microsoft Entra ID IdP, use the attribute `surname` instead of `sn` in the assertion.</div>

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

## Additional features

To map attributes in your identity provider's response to Datadog roles and teams, see [SAML group mapping][5].

The following features can be enabled through the [SAML Configuration dialog][4]:

**Note:** You must have Admin permissions to see the SAML Configuration dialog.

### Just in time (JIT) provisioning

With JIT provisioning, a user is created within Datadog the first time they try to log in. This eliminates the need for administrators to manually create user accounts one at a time. The invitation email is not sent in this case.

Some organizations might not want to invite all of their users to Datadog. If you would like to make changes to how SAML works for your account, contact [Datadog support][2]. It is up to the organization to configure their IdP to not send assertions to Datadog if they don't want a particular user to access Datadog.

Administrators can set the default role for new JIT users. The default role is **Standard**, but you can choose to add new JIT users as **Read-Only**, **Administrators**, or any custom role.

<div class="alert alert-danger">
  <strong>Important:</strong> If Role Mapping is enabled, it takes priority over the roles set during JIT provisioning. Without the proper Group Attribute statements, users might end up without roles and lose access to Datadog. To prevent users from being locked out after JIT provisioning, make sure to review your mapping definitions and check your assertions before enabling both Mappings and JIT.
</div>

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT Default" style="width:50%;" >}}

### IdP initiated login

When the Datadog URL is loaded, the browser is redirected to the customer IdP where the user enters their credentials, then the IdP redirects back to Datadog. Some IdPs have the ability to send an assertion directly to Datadog without first getting an AuthnRequest (IdP Initiated Login).

After enabling the IdP-initiated login feature and saving your configuration, you can download the latest version of the Service Provider (SP) metadata for your Identity Provider. Your new SP metadata contains a different, organization-specific `AssertionConsumerService` endpoint to send assertions to.

If you do not use the updated SP metadata, Datadog is not able to associate the assertion with your organization and displays an error page with a message that the SAML response is missing the "InResponseTo" attribute.

### SAML strict

You can make your organization SAML Strict by disabling other login method types in the **Login Methods** UI. When this option is configured, all users must, by default, log in with SAML. An existing username and password, or Google OAuth login, does not work. This ensures that all users with access to Datadog must have valid credentials in your company's identity provider or directory service to access your Datadog account. Org administrators can set per-user [overrides][6] to allow certain users to be SAML Strict exempt.

### Self-updating Datadog SP metadata

Certain Identity Providers (such as Microsoft's ADFS) can be configured to pull the latest SAML service provider metadata from Datadog. After you configure SAML in Datadog, you can get the metadata URL for your organization from the SAML Configuration page and use that with your Identity Provider to get the latest service provider metadata whenever changes are published.

{{< img src="account_management/saml/saml_metadata_url.png" alt="SAML Metadata URL" style="width:50%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /account_management/saml/configuration
[3]: https://app.datadoghq.com/account/saml/metadata.xml
[4]: https://app.datadoghq.com/organization-settings/login-methods/saml
[5]: /account_management/saml/mapping/
[6]: /account_management/login_methods/#reviewing-user-overrides
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html