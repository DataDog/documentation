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

**Note**: If you don't have SAML enabled on your Datadog account, reach out to [support][2] to enable it.

Here's a two-minute video walkthrough:

{{< wistia 2qe33x8h3v >}}

## Setup

{{< tabs >}}
{{% tab "IdP initiated login" %}}

An Identity Provider-initiated (IdP) login incurs that you are using your IdP to log into Datadog, whether that is from the Datadog login landing page (for example, Google SSO) or logging in directly to your IdP and selecting Datadog from their service, which then routes you to Datadog.

1. To begin IdP-initiated SAML setup, see your IdP's documentation:

    * [Active Directory][1]
    * [Auth0][2]
    * [Azure][1]
    * [Google][3]
    * [LastPass][4]
    * [Okta][4]
    * [SafeNet][5]

2. Upload your IdP metadata by clicking the **Choose File** button. After choosing the file, click **Upload File**.

3. Configure your service provider in your IdP with the following details:
    - ACS url
    - Entity ID
    - Attributes to pass through
      - Required attributes: Handle, Name ID

4. After you upload the IdP metadata and configured your IdP, enable SAML in Datadog by clicking the **Enable** button.

    {{< img src="account_management/saml/saml_enable.png" alt="saml enable" style="width:80%;">}}

5. (Optional) Enable the Identity Provider (IdP Initiated Login) option under Additional Features in the Configure SAML tab.

    When the Datadog URL is loaded, the browser is redirected to the IdP where you can enter your credentials, then the IdP redirects back to Datadog. Some IdPs have the ability to send an assertion directly to Datadog without first getting an AuthnRequest (IdP Initiated Login).

    After enabling the IdP Initiated Login feature (and waiting for caches to clear), you need to retrieve a new version of the SP Metadata. Your new SP Metadata contains a different, organization-specific AssertionConsumerService endpoint to send assertions to.

    If you do not use the updated SP Metadata, Datadog is not able to associate the assertion with your organization and displays an error page with a message that the SAML response is missing the "InResponseTo" attribute.

6. Once SAML is configured in Datadog and through your IdP, you can select Datadog from your IdP's dashboard, use the **Single Sign-on URL** shown in the Status box at the top of the [SAML Configuration page][6], or select your IdP's log in button on the Datadog login page (for example, **Sign in with Google**).

    {{< img src="account_management/saml/sso.png" alt="Sign in with Google" style="width:80%;">}}

**Note**: If you want to configure SAML for a multi-org, see the [Managing Multiple-Organization Accounts documentation][7].


[1]: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml
[2]: https://auth0.com/docs/protocols/saml-protocol
[3]: https://cloud.google.com/architecture/identity/single-sign-on
[4]: https://developer.okta.com/docs/concepts/saml/
[5]: https://help.safenetid.com/operator/Content/STA/Apps/Apps_SAML.htm
[6]: https://app.datadoghq.com/saml/saml_setup
[7]: /account_management/multi_organization/#setting-up-saml
{{% /tab %}}

{{% tab "SP login" %}}

Service Provider-initiated (SP) login incurs that you're using Datadog to issue a SAML request to your IdP. Datadog then redirects your browser to your IdP for authentication.

To begin SP-initiated SAML setup:

1. Navigate to the **SAML Single Sign On Configuration** page by hovering over your username at the bottom of the left-side navigation menu and click **Configure SAML**.

2. Upload your IdP metadata by clicking the **Choose File** button. After choosing the file, click **Upload File**.

3. Download Datadog's [Service Provider metadata][1] to configure your IdP to recognize Datadog as a Service Provider.

4. Configure your service provider in your IdP with the following details:
    - ACS url
    - Entity ID
    - Attributes to pass through
      - Required attributes: Handle, Name ID

5. After you upload the IdP metadata and configured your IdP, enable SAML in Datadog by clicking the **Enable** button.

    {{< img src="account_management/saml/saml_enable.png" alt="SAML enabled" >}}

5. Once SAML is configured in Datadog and your IdP is set up to accept requests from Datadog, you can log in by using the **Single Sign-on URL** shown in the Status box at the top of the [SAML Configuration page][2]. The **Single Sign-on URL** is also displayed on the [Team page][3]. Loading this URL initiates a SAML authentication against your IdP. **Note**: This URL isn't displayed unless SAML is enabled for your account.

**Note**: If you want to configure SAML for a multi-org, see the [Managing Multiple-Organization Accounts documentation][4].


[1]: https://app.datadoghq.com/account/saml/metadata.xml
[2]: https://app.datadoghq.com/saml/saml_setup
[3]: https://app.datadoghq.com/account/team
[4]: /account_management/multi_organization/#setting-up-saml
{{% /tab %}}
{{< /tabs >}}

## Assertions and attributes

When a login occurs, a SAML Assertion containing user authorization is sent from the identity provider to Datadog.

Some important notes on assertions:

* Datadog supports the **HTTP-POST** binding for **SAML2**:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog specifies `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` for the format of the **NameIDPolicy** in assertion requests.
* Assertions must be signed.
* Assertions can be encrypted, but unencrypted assertions are accepted.
* Reference [Datadog's SP Metadata][3] for more information.

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

It’s important to understand what is sent in an assertion before turning on mappings as mappings require correct attributes. Every IdP has specific mappings. For example, Azure works with object IDs, and Okta requires you to set attributes in [Okta settings][4]. Datadog recommends cross-referencing with [built-in browser tooling][5] such as Chrome Dev Tools or browser extensions and [validating your SAML assertions][6] **before** creating mappings.

1. [Cross-reference][5] and [validate][6] your SAML assertion to understand your IdP's attributes.

2. Go to Teams and click the **Mappings** tab.

3. Click **New Mapping**.

4. Specify the SAML identity provider `key-value` pair that you want to associate with an existing Datadog role (either default or custom). **Note**: These entries are case-sensitive.

   For example, if you want all users whose `member_of` attribute has a value of `Development` to be assigned to a custom Datadog role called `Devs`:

    {{< img src="account_management/saml/create_mapping.png" alt="Creating a SAML mapping to Datadog Role"  >}}

5. If you have not already done so, enable mappings by clicking **Enable Mappings**.

When a user logs in who has the specified identity provider attribute, they are automatically assigned the Datadog role. Likewise, if someone has that identity provider attribute removed, they lose access to the role (unless another mapping adds it).

<div class="alert alert-warning">
  <strong>Important:</strong> If a user does <i>not</i> match any mapping, they lose any roles they had previously and are prevented from logging into the org with SAML. Double-check your mapping definitions.
</div>

You can make changes to a mapping by clicking the **pencil** icon or removing it by clicking the **garbage** icon. These actions affect only the mapping, not the identity provider attributes or the Datadog roles.

Alternatively, you can create and change mappings of SAML attributes to Datadog roles with the `authn_mappings` endpoint. For more information, see [Federated Authentication to Role Mapping API][7].

## Additional features

The following features can be enabled through the [SAML Configuration dialog][8]:

**Note:** You must have Admin permissions to see the SAML Configuration dialog.

### Just in time (JIT) provisioning

With JIT provisioning, a user is created within Datadog the first time they try to log in. This eliminates the need for administrators to manually create user accounts one at a time. The invitation email is not sent in this case.

Some organizations might not want to invite all of their users to Datadog. If you would like to make changes to how SAML works for your account, contact [Datadog support][2]. It is up to the organization to configure their IdP to not send assertions to Datadog if they don't want a particular user to access Datadog.

Administrators can set the default role for new JIT users. The default role is **Standard**, but you can choose to add new JIT users as **Read-Only** or even **Administrators**.

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT Default" style="width:50%;" >}}

### SAML strict

With SAML strict mode enabled, all users must log in with SAML. An existing username/password or Google OAuth login does not work. This ensures that all users with access to Datadog must have valid credentials in your company’s identity provider/directory service to access your Datadog account.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /help/
[3]: https://app.datadoghq.com/account/saml/metadata.xml
[4]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm
[5]: https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US
[6]: https://www.samltool.com/validate_response.php
[7]: /account_management/authn_mapping/
[8]: https://app.datadoghq.com/saml/saml_setup
