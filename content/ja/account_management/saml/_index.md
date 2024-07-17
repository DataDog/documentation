---
algolia:
  tags:
  - saml
aliases:
- /ja/guides/saml
further_reading:
- link: /account_management/multi_organization/
  tag: Documentation
  text: 複数のアカウントを持つチームとオーガニゼーションの構成
title: SAML を使用したシングルサインオン
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">The Datadog for Government site only supports SAML login.</div>
{{< /site-region >}}

## Overview

Datadog アカウントに [SAML (Security Assertion Markup Language)][1] を構成することで、あなたやチームメイト全員が SAML アイデンティティプロバイダーで構成された組織の Active Directory や LDAP などのアイデンティティストアに保存された資格情報を使用して、Datadog にログインすることができます。

**Notes**: 

{{% site-region region="us,us3,us5,eu,ap1" %}}
- If you don't have SAML enabled on your Datadog account, reach out to [support][2] to enable it.
- This documentation assumes that you already have a SAML Identity Provider (IdP). If you do not have a SAML IdP, there are several IdPs that have integrations with Datadog such as [Active Directory][3], [Auth0][4], [Azure][3], [Google][5], [LastPass][6], [Okta][7], and [SafeNet][8].
- SAML configuration requires [Datadog Administrator][9] access.
{{% /site-region %}}

{{% site-region region="gov" %}}
- This documentation assumes that you already have a SAML Identity Provider (IdP). If you do not have a SAML IdP, there are several IdPs that have integrations with Datadog such as [Active Directory][3], [Auth0][4], [Azure][3], [Google][5], [LastPass][6], [Okta][7], and [SafeNet][8].
- SAML configuration requires [Datadog Administrator][9] access.
{{% /site-region %}}

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

3. Upload the IdP metadata from your SAML identity provider by clicking the **Choose File** button. After choosing the file, click **Upload File**.

**Note:** The IdP metadata must contain ASCII characters only.

4. Download Datadog's [Service Provider metadata][18] to configure your IdP to recognize Datadog as a Service Provider.

5. IdP メタデータをアップロードし、IdP を構成したら、**Upload and Enable** ボタンをクリックして Datadog で SAML を有効にします。
    {{< img src="account_management/saml/saml_enable_cropped.png" alt="IdP メタデータをアップロードして SAML を構成します" >}}

6. After uploading the IdP metadata, return to the **Login Methods** page and turn SAML `on` by default. 

7. Once SAML is configured in Datadog and your IdP is set up to accept requests from Datadog, users can log in:

   - **If using SP-initiated login** (Service Provider, or login initiated from Datadog): By using the **Single Sign-on URL** shown in the Status box at the top of the [SAML Configuration page][19]. The **Single Sign-on URL** is also displayed on the [Team page][20]. Loading this URL initiates a SAML authentication against your IdP. **Note**: This URL isn't displayed unless SAML is enabled for your account and you are using SP-initiated login.
    {{< img src="account_management/saml/saml_enabled_cropped.png" alt="SAML が有効であることの確認" >}}

   - **If using IdP-initiated login** (Identity Provider, or login initiated from your app portal): By clicking on the app icon in your app portal, for example in the Google App drawer or the Okta App Portal. In some scenarios users logging in with the SP-initiated login URL will also work with the IdP-initiated login experiences, but this depends on your Identity Provider's configuration and support.

**Note**: If you want to configure SAML for a multi-org, see [Managing Multiple-Organization Accounts][21].

## Assertions and attributes

When a login occurs, a SAML Assertion containing user authorization is sent from the identity provider to Datadog.

Some important notes on assertions:

* Datadog supports the **HTTP-POST** binding for **SAML2**:
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog specifies `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` for the format of the **NameIDPolicy** in assertion requests.
* Assertions must be signed.
* アサーションは暗号化できますが、暗号化されていないアサーションは許可されます。
* Reference [Datadog's Service Provider metadata][18] for more information. You must be signed in to Datadog to access the file.

Attributes may be included in a SAML Assertion. Datadog looks for three attributes in an `AttributeStatement`:

  1. **eduPersonPrincipalName**: If specified, the eduPersonPrincipalName must correspond to the user's Datadog username. The username is typically the user's email address.
  2. **sn**: This is optional, and should be set to the user's surname.
  3. **givenName**: This is optional, and should be set to the user's first, or given name.

Datadog expects that Attributes use the URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` or the Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`. The name used for each attribute depends on the NameFormat that your IdP uses.

If your IdP is configured to use the URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri`:

  1. **eduPersonPrincipalName**: IdP は属性名として `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` を設定する必要があります。
  2. **sn**: IdP は属性名として `urn:oid:2.5.4.4` を設定する必要があります。
  3. **givenName**: IdP は属性名として `urn:oid:2.5.4.42` を設定する必要があります。

If your IdP is configured to use the Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic`:

  1. **eduPersonPrincipalName**: IdP は属性名として `urn:mace:dir:attribute-def:eduPersonPrincipalName` を設定する必要があります。
  2. **sn**: IdP は属性名として `urn:mace:dir:attribute-def:sn` を設定する必要があります。
  3. **givenName**: IdP は属性名として `urn:mace:dir:attribute-def:givenName` を設定する必要があります。

AttributeStatement に **eduPersonPrincipalName** が存在する場合、この属性の値がユーザー名に使用されます。AttributeStatement に **eduPersonPrincipalName** が含まれていない場合、ユーザー名は Subject の NameID から取得されます。NameID は、`urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` の形式を使用しなければなりません。

If **sn** and **givenName** are provided, they are used to update the user's name in their Datadog profile.

## Additional features

To map attributes in your identity provider's response to Datadog roles and teams, see [SAML group mapping][22].

The following features can be enabled through the [SAML Configuration dialog][19]:

**Note:** You must have Admin permissions to see the SAML Configuration dialog.

### Just in time (JIT) provisioning

With JIT provisioning, a user is created within Datadog the first time they try to log in. This eliminates the need for administrators to manually create user accounts one at a time. The invitation email is not sent in this case.

組織によっては、すべてのユーザーを Datadog に招待したくない場合もあります。アカウントの SAML の動作を変更したい場合は、[Datadog サポート][2]に連絡してください。特定のユーザーを Datadog にアクセスさせたくない場合、IdP がアサーションを Datadog に送信しないように構成するかどうかは、組織次第です。

Administrators can set the default role for new JIT users. The default role is **Standard**, but you can choose to add new JIT users as **Read-Only**, **Administrators**, or any custom role.

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT Default" style="width:50%;" >}}

### IdP initiated login

When the Datadog URL is loaded, the browser is redirected to the customer IdP where the user enters their credentials, then the IdP redirects back to Datadog. Some IdPs have the ability to send an assertion directly to Datadog without first getting an AuthnRequest (IdP Initiated Login).

After enabling the IdP-initiated login feature and saving your configuration, you can download the latest version of the Service Provider (SP) metadata for your Identity Provider. Your new SP metadata contains a different, organization-specific `AssertionConsumerService` endpoint to send assertions to.

If you do not use the updated SP metadata, Datadog is not able to associate the assertion with your organization and displays an error page with a message that the SAML response is missing the "InResponseTo" attribute.

### SAML strict

**Login Methods** UI で他のログインメソッドタイプを無効にすることで、組織を SAML 限定にすることができます。このオプションが設定されている場合、すべてのユーザーはデフォルトで SAML でログインする必要があります。既存のユーザー名/パスワードまたは Google OAuth ログインは機能しません。これにより、Datadog にアクセスできるすべてのユーザーが、Datadog アカウントにアクセスするために、会社のアイデンティティプロバイダー/ディレクトリサービスで有効な資格情報を持っている必要があります。組織管理者は、ユーザーごとの[オーバーライド][23]を設定して、特定のユーザーが SAML 限定から免除されるようにすることができます。

### Self-updating Datadog SP metadata

特定の ID プロバイダー (Microsoft の ADFS など) は、Datadog から最新の SAML サービスプロバイダーメタデータをプルするように構成できます。Datadog で SAML を構成した後、SAML コンフィギュレーションページから組織のメタデータ URL を取得し、それを ID プロバイダーで使用して、変更が公開されるたびに最新のサービスプロバイダーメタデータを取得できます。

{{< img src="account_management/saml/saml_metadata_url.png" alt="SAML Metadata URL" style="width:50%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /ja/help/
[3]: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml
[4]: https://auth0.com/docs/protocols/saml-protocol
[5]: https://cloud.google.com/architecture/identity/single-sign-on
[6]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[9]: /ja/account_management/users/default_roles/
[10]: /ja/account_management/saml/activedirectory/
[11]: /ja/account_management/saml/auth0/
[12]: /ja/account_management/saml/azure/
[13]: /ja/account_management/saml/google/
[14]: /ja/account_management/saml/nopassword/
[15]: /ja/account_management/saml/okta/
[16]: /ja/account_management/saml/safenet/
[17]: https://app.datadoghq.com/organization-settings/login-methods
[18]: https://app.datadoghq.com/account/saml/metadata.xml
[19]: https://app.datadoghq.com/saml/saml_setup
[20]: https://app.datadoghq.com/account/team
[21]: /ja/account_management/multi_organization/#setting-up-saml
[22]: /ja/account_management/saml/mapping/
[23]: /ja/account_management/login_methods/#reviewing-user-overrides