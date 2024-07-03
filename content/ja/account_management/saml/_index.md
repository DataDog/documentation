---
algolia:
  tags:
  - saml
aliases:
- /ja/guides/saml
further_reading:
- link: /account_management/multi_organization/
  tag: Documentation
  text: Configuring Teams & Organizations with Multiple Accounts
title: Single Sign On With SAML
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog for Government site では、SAML ログインのみをサポートします。</div>
{{< /site-region >}}

## 概要

Configuring [SAML (Security Assertion Markup Language)][1] for your Datadog account lets you and all your teammates log in to Datadog using the credentials stored in your organization's Active Directory, LDAP, or other identity store that has been configured with a SAML Identity Provider.

**注**: 

{{% site-region region="us,us3,us5,eu,ap1" %}}
- Datadog アカウントで SAML が有効化されていない場合は、[サポートチーム][2]に有効化を依頼してください。
- このドキュメントは、SAML アイデンティティプロバイダー (IdP) をすでに持っていることを前提にしています。SAML IdP を持っていない場合は、 [Active Directory][3]、[Auth0][4]、[Azure][3]、[Google][5]、[LastPass][6]、[Okta][7]、[SafeNet][8] など、 Datadog とインテグレーションしている IdP はいくつかあります。
- SAML 構成には、[Datadog 管理者][9]アクセスが必要です。
{{% /site-region %}}

{{% site-region region="gov" %}}
- このドキュメントは、SAML アイデンティティプロバイダー (IdP) をすでに持っていることを前提にしています。SAML IdP を持っていない場合は、 [Active Directory][3]、[Auth0][4]、[Azure][3]、[Google][5]、[LastPass][6]、[Okta][7]、[SafeNet][8] など、 Datadog とインテグレーションしている IdP はいくつかあります。
- SAML 構成には、[Datadog 管理者][9]アクセスが必要です。
{{% /site-region %}}

## SAML の構成

1. 構成を開始するには、IdP のドキュメントを参照してください。

    * [Active Directory][10]
    * [Auth0][11]
    * [Azure][12]
    * [Google][13]
    * [NoPassword][14]
    * [Okta][15]
    * [SafeNet][16]

2. Datadog アプリで、左下のユーザー名にカーソルを合わせ、Organization Settings を選択します。[Login Methods][17] を選択し、SAML の下の **Configure** をクリックします。

3. **Choose File** ボタンをクリックして、SAML アイデンティティプロバイダーから IdP メタデータをアップロードします。ファイルを選択したら、**Upload File** をクリックします。

**注:** IdP メタデータには ASCII 文字のみを含める必要があります。

4. Datadog の[サービスプロバイダーメタデータ][18]をダウンロードして、Datadog をサービスプロバイダーとして認識するように IdP を構成します。

5. After you upload the IdP metadata and configure your IdP, enable SAML in Datadog by clicking the **Upload and Enable** button.
    {{< img src="account_management/saml/saml_enable_cropped.png" alt="Configure SAML by uploading your IdP metadata" >}}

6. IdP メタデータをアップロードした後、**Login Methods** ページに戻り、SAML をデフォルトで `on` にします。

7. SAML が Datadog で構成され、IdP が Datadog からのリクエストを受け付けるように設定されると、ユーザーはログインできるようになります。

   - **SP 始動のログインを使用する場合** (サービスプロバイダー、または Datadog から開始されるログイン): [SAML Configuration ページ][19]の上部にあるステータスボックスに表示される **Single Sign-on URL** を使用します。**Single Sign-on URL** は、[Team ページ][20]にも表示されます。この URL をロードすると、IdP に対して SAML 認証が開始されます。**注**: この URL は、アカウントで SAML が有効になっており、SP 始動のログインを使用していない限り、表示されません。
    {{< img src="account_management/saml/saml_enabled_cropped.png" alt="Confirmation that SAML Enabled" >}}

   - **IdP 始動のログインを使用する場合** (アイデンティティプロバイダー、またはアプリポータルからのログイン): Google アプリのドロワーや Okta アプリポータルなど、アプリポータルのアプリアイコンをクリックします。一部のシナリオでは、SP 始動のログイン URL でログインしたユーザーは、IdP 始動のログイン体験でも動作しますが、これはアイデンティティプロバイダーの構成とサポートに依存します。

**注**: 複数組織に SAML を構成する場合は、[複数組織アカウントの管理][21]を参照してください。

## アサーションと属性

ログインが発生すると、ユーザー認可を含む SAML アサーションがアイデンティティプロバイダーから Datadog に送信されます。

アサーションに関するいくつかの重要な注意事項:

* Datadog は、**SAML2** の **HTTP-POST** 連結をサポートします。
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`
* Datadog は、アサーションリクエストの **NameIDPolicy** の形式として `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` を指定します。
* アサーションには署名が必要です。
* Assertions can be encrypted, but unencrypted assertions are accepted.
* 詳細は [Datadog のサービスプロバイダーメタデータ][18]を参照してください。ファイルにアクセスするには、Datadog にサインインする必要があります。

属性は SAML アサーションに含めることができます。Datadog は `AttributeStatement` で 3 つの属性を検索します。

  1. <mrk mid="42" mtype="seg">**eduPersonPrincipalName**:</mrk> <mrk mid="43" mtype="seg">指定された場合、eduPersonPrincipalName は、ユーザーの Datadog ユーザー名に対応している必要があります。</mrk><mrk mid="44" mtype="seg">通常、ユーザー名はユーザーのメールアドレスです。</mrk>
  2. <mrk mid="45" mtype="seg">**sn**:</mrk> <mrk mid="46" mtype="seg">オプション。ユーザーの姓に設定されます。</mrk>
  3. <mrk mid="47" mtype="seg">**givenName**:</mrk> <mrk mid="48" mtype="seg">オプション。ユーザーの名に設定されます。</mrk>

<mrk mid="49" mtype="seg">Datadog は、属性が URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` または基本 NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` を使用することを想定しています。</mrk><mrk mid="50" mtype="seg">各属性に使用される名前は、IdP が使用する NameFormat に依存します。</mrk>

IdP が URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` を使用するように構成されている場合は、次のようになります。

  1. **eduPersonPrincipalName**: The IdP should set `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` as the name of the attribute.
  2. **sn**: The IdP should set `urn:oid:2.5.4.4` as the name of the attribute.
  3. **givenName**: The IdP should set `urn:oid:2.5.4.42` as the name of the attribute.

IdP が基本 NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` を使用するように構成されている場合は、次のようになります。

  1. **eduPersonPrincipalName**: The IdP should set `urn:mace:dir:attribute-def:eduPersonPrincipalName` as the name of the attribute.
  2. **sn**: The IdP should set `urn:mace:dir:attribute-def:sn` as the name of the attribute.
  3. **givenName**: The IdP should set `urn:mace:dir:attribute-def:givenName` as the name of the attribute.

If **eduPersonPrincipalName** exists in the AttributeStatement, the value of this attribute is used for the username. If **eduPersonPrincipalName** is not included in the AttributeStatement, the username is taken from the NameID in the Subject. The NameID must use the Format `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress`.

**sn** と **givenName** が提供されている場合は、Datadog プロファイルのユーザー名を更新するために使用されます。

## その他の機能

アイデンティティプロバイダーのレスポンスの属性を Datadog のロールやチームにマッピングするには、[SAML グループマッピング][22]を参照してください。

[SAML Configuration ダイアログ][19]で、以下の機能を有効にできます。

**注:** SAML コンフィギュレーションダイアログを表示するには、管理者アクセス許可が必要です。

### ジャストインタイム (JIT) プロビジョニング

JIT プロビジョニングを使用すると、初めてログインしようとしたときに Datadog 内にユーザーアカウントが作成されます。したがって、管理者がユーザーアカウントを 1 つずつ手動で作成する必要がなくなります。この場合、招待メールは送信されません。

Some organizations might not want to invite all of their users to Datadog. If you would like to make changes to how SAML works for your account, contact [Datadog support][2]. It is up to the organization to configure their IdP to not send assertions to Datadog if they don't want a particular user to access Datadog.

管理者は、新しい JIT ユーザーにデフォルトのロールを設定できます。デフォルトのロールは **Standard** ですが、新しい JIT ユーザーを **Read-Only** や **Administrators**、またはカスタムロールとして追加することもできます。

{{< img src="account_management/saml/saml_jit_default.png" alt="SAML JIT デフォルト" style="width:50%;" >}}

### IdP 始動のログイン

<mrk mid="89" mtype="seg">Datadog URL がロードされると、ブラウザは、ユーザーが自分の資格情報を入力したカスタマー IdP にリダイレクトされ、IdP は Datadog に再度リダイレクトします。</mrk><mrk mid="90" mtype="seg">IdP によっては、最初に AuthnRequest を受け取らずに、直接 Datadog にアサーションを送信できます (IdP 始動のログイン)。</mrk>

IdP 始動のログイン機能を有効にして構成を保存した後、アイデンティティプロバイダーのサービスプロバイダー (SP) メタデータの最新バージョンをダウンロードできます。新しい SP メタデータには、アサーションを送信するための、組織固有の異なる `AssertionConsumerService` エンドポイントが含まれています。

更新された SP メタデータを使用しないと、Datadog は組織とアサーションを関連付けることができず、SAML の応答には "InResponseTo" 属性がないというメッセージと共にエラーページが表示されます。

### SAML 限定

You can make your organization SAML Strict by disabling other login method types in the **Login Methods** UI. When this option is configured, all users must, by default, log in with SAML. An existing username/password or Google OAuth login does not work. This ensures that all users with access to Datadog must have valid credentials in your company's identity provider/directory service to access your Datadog account. Org administrators can set per-user [overrides][23] to allow certain users to be SAML Strict exempt.

### Datadog SP メタデータの自己更新

Certain Identity Providers (such as Microsoft's ADFS) can be configured to pull the latest SAML service provider metadata from Datadog. After you configure SAML in Datadog, you can get the metadata URL for your organization from the SAML Configuration page and use that with your Identity Provider to get the latest service provider metadata whenever changes are published.

{{< img src="account_management/saml/saml_metadata_url.png" alt="SAML メタデータ URL" style="width:50%;" >}}

## その他の参考資料

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