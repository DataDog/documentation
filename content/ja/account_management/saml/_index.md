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
<div class="alert alert-warning">Datadog for Government site では、SAML ログインのみをサポートします。</div>
{{< /site-region >}}

## 概要

Datadog アカウントに対して [SAML (Security Assertion Markup Language)][1] を構成すると、あなたとあなたのチームの全員が、SAML イデンティティプロバイダーで構成されたあなたの組織の Active Directory、LDAP、または他の ID ストアに保存された資格情報を使って Datadog にログインできるようになります。

**注**: 

{{% site-region region="us,us3,us5,eu,ap1" %}}
- Datadog アカウントで SAML が有効化されていない場合は、[サポートチーム][1]に有効化を依頼してください。
- このドキュメントは、SAML アイデンティティプロバイダー (IdP) をすでに持っていることを前提にしています。SAML IdP を持っていない場合は、 [Active Directory][2]、[Auth0][3]、[Azure][2]、[Google][4]、[LastPass][5]、[Okta][6]、[SafeNet][7] など、 Datadog とインテグレーションしている IdP はいくつかあります。
- SAML 構成には、[Datadog 管理者][8]アクセスが必要です。

[1]: /ja/help/
[2]: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml
[3]: https://auth0.com/docs/protocols/saml-protocol
[4]: https://cloud.google.com/architecture/identity/single-sign-on
[5]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[6]: https://developer.okta.com/docs/concepts/saml/
[7]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[8]: /ja/account_management/users/default_roles/
{{% /site-region %}}

{{% site-region region="gov" %}}
- このドキュメントは、SAML アイデンティティプロバイダー (IdP) をすでに持っていることを前提にしています。SAML IdP を持っていない場合は、 [Active Directory][2]、[Auth0][3]、[Azure][2]、[Google][4]、[LastPass][5]、[Okta][6]、[SafeNet][7] など、 Datadog とインテグレーションしている IdP はいくつかあります。
- SAML 構成には、[Datadog 管理者][8]アクセスが必要です。

[2]: https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/auth-saml
[3]: https://auth0.com/docs/protocols/saml-protocol
[4]: https://cloud.google.com/architecture/identity/single-sign-on
[5]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[6]: https://developer.okta.com/docs/concepts/saml/
[7]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[8]: /ja/account_management/users/default_roles/
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

5. IdP メタデータをアップロードし、IdP を構成した後、**Upload and Enable** ボタンをクリックして Datadog で SAML を有効にします。
    {{< img src="account_management/saml/saml_enable.png" alt="SAML の有効化" >}}

6. IdP メタデータをアップロードした後、**Login Methods** ページに戻り、SAML をデフォルトで `on` にします。

7. SAML が Datadog で構成され、IdP が Datadog からのリクエストを受け付けるように設定されると、ユーザーはログインできるようになります。

   - **SP 始動のログインを使用する場合** (サービスプロバイダー、または Datadog から開始されるログイン): [SAML Configuration ページ][19]の上部にあるステータスボックスに表示される **Single Sign-on URL** を使用します。**Single Sign-on URL** は、[Team ページ][20]にも表示されます。この URL をロードすると、IdP に対して SAML 認証が開始されます。**注**: この URL は、アカウントで SAML が有効になっており、SP 始動のログインを使用していない限り、表示されません。
    {{< img src="account_management/saml/saml_enabled.png" alt="SAML の有効化" >}}

   - **IdP 始動のログインを使用する場合** (アイデンティティプロバイダー、またはアプリポータルからのログイン): Google アプリのドロワーや Okta アプリポータルなど、アプリポータルのアプリアイコンをクリックします。一部のシナリオでは、SP 始動のログイン URL でログインしたユーザーは、IdP 始動のログイン体験でも動作しますが、これはアイデンティティプロバイダーの構成とサポートに依存します。

**注**: 複数組織に SAML を構成する場合は、[複数組織アカウントの管理][21]を参照してください。

## アサーションと属性

ログインが発生すると、ユーザー認可を含む SAML アサーションがアイデンティティプロバイダーから Datadog に送信されます。

アサーションに関するいくつかの重要な注意事項:

* Datadog は、**SAML2** の **HTTP-POST** 連結をサポートします。
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`
* Datadog は、アサーションリクエストの **NameIDPolicy** の形式として `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` を指定します。
* アサーションには署名が必要です。
* アサーションは暗号化することができますが、暗号化されていないアサーションも受け入れられます。
* 詳細は [Datadog のサービスプロバイダーメタデータ][18]を参照してください。ファイルにアクセスするには、Datadog にサインインする必要があります。

属性は SAML アサーションに含めることができます。Datadog は `AttributeStatement` で 3 つの属性を検索します。

  1. <mrk mid="42" mtype="seg">**eduPersonPrincipalName**:</mrk> <mrk mid="43" mtype="seg">指定された場合、eduPersonPrincipalName は、ユーザーの Datadog ユーザー名に対応している必要があります。</mrk><mrk mid="44" mtype="seg">通常、ユーザー名はユーザーのメールアドレスです。</mrk>
  2. <mrk mid="45" mtype="seg">**sn**:</mrk> <mrk mid="46" mtype="seg">オプション。ユーザーの姓に設定されます。</mrk>
  3. <mrk mid="47" mtype="seg">**givenName**:</mrk> <mrk mid="48" mtype="seg">オプション。ユーザーの名に設定されます。</mrk>

<mrk mid="49" mtype="seg">Datadog は、属性が URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` または基本 NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` を使用することを想定しています。</mrk><mrk mid="50" mtype="seg">各属性に使用される名前は、IdP が使用する NameFormat に依存します。</mrk>

IdP が URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` を使用するように構成されている場合は、次のようになります。

  1. <mrk mid="52" mtype="seg">**eduPersonPrincipalName**:</mrk> <mrk mid="53" mtype="seg">IdP は、属性の名前を `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` に設定する必要があります。</mrk>
  2. <mrk mid="54" mtype="seg">**sn**:</mrk> <mrk mid="55" mtype="seg">IdP は、属性の名前を `urn:oid:2.5.4.4` に設定する必要があります。</mrk>
  3. <mrk mid="56" mtype="seg">**givenName**:</mrk> <mrk mid="57" mtype="seg">IdP は、属性の名前を `urn:oid:2.5.4.42` に設定する必要があります。</mrk>

IdP が基本 NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` を使用するように構成されている場合は、次のようになります。

  1. <mrk mid="59" mtype="seg">**eduPersonPrincipalName**:</mrk> <mrk mid="60" mtype="seg">IdP は、属性の名前を `urn:mace:dir:attribute-def:eduPersonPrincipalName` に設定する必要があります。</mrk>
  2. <mrk mid="61" mtype="seg">**sn**:</mrk> <mrk mid="62" mtype="seg">IdP は、属性の名前を `urn:mace:dir:attribute-def:sn` に設定する必要があります。</mrk>
  3. <mrk mid="63" mtype="seg">**givenName**:</mrk> <mrk mid="64" mtype="seg">IdP は、属性の名前を `urn:mace:dir:attribute-def:eduPersonPrincipalName` に設定する必要があります。</mrk>

<mrk mid="65" mtype="seg">**eduPersonPrincipalName** が AttributeStatement にある場合は、この属性の値がユーザー名として使用されます。</mrk><mrk mid="66" mtype="seg">**eduPersonPrincipalName** が AttributeStatement に含まれていない場合、ユーザー名は Subject の NameID から取得されます。</mrk><mrk mid="67" mtype="seg">NameID は、Format `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` を使用する必要があります。</mrk>

**sn** と **givenName** が提供されている場合は、Datadog プロファイルのユーザー名を更新するために使用されます。

## その他の機能

アイデンティティプロバイダーのレスポンスの属性を Datadog のロールやチームにマッピングするには、[SAML グループマッピング][22]を参照してください。

[SAML Configuration ダイアログ][19]で、以下の機能を有効にできます。

**注:** SAML コンフィギュレーションダイアログを表示するには、管理者アクセス許可が必要です。

### ジャストインタイム (JIT) プロビジョニング

JIT プロビジョニングを使用すると、初めてログインしようとしたときに Datadog 内にユーザーアカウントが作成されます。したがって、管理者がユーザーアカウントを 1 つずつ手動で作成する必要がなくなります。この場合、招待メールは送信されません。

<mrk mid="82" mtype="seg">組織によっては、一部のユーザーを Datadog に招待したくない場合があります。</mrk><mrk mid="83" mtype="seg">アカウントに対する SAML の動作を変更したい場合は、[Datadog のサポートチーム][2]にお問い合わせください。</mrk><mrk mid="84" mtype="seg">特定のユーザーが Datadog にアクセスできないようにする場合は、組織側で、Datadog にアサーションを送信しないように IdP を構成する必要があります。</mrk>

管理者は、新しい JIT ユーザーにデフォルトのロールを設定できます。デフォルトのロールは **Standard** ですが、新しい JIT ユーザーを **Read-Only** や **Administrators**、またはカスタムロールとして追加することもできます。

{{< img src="account_management/saml/saml_jit_default.png" alt="SAML JIT デフォルト" style="width:50%;" >}}

### IdP 始動のログイン

<mrk mid="89" mtype="seg">Datadog URL がロードされると、ブラウザは、ユーザーが自分の資格情報を入力したカスタマー IdP にリダイレクトされ、IdP は Datadog に再度リダイレクトします。</mrk><mrk mid="90" mtype="seg">IdP によっては、最初に AuthnRequest を受け取らずに、直接 Datadog にアサーションを送信できます (IdP 始動のログイン)。</mrk>

IdP 始動のログイン機能を有効にして構成を保存した後、アイデンティティプロバイダーのサービスプロバイダー (SP) メタデータの最新バージョンをダウンロードできます。新しい SP メタデータには、アサーションを送信するための、組織固有の異なる `AssertionConsumerService` エンドポイントが含まれています。

更新された SP メタデータを使用しないと、Datadog は組織とアサーションを関連付けることができず、SAML の応答には "InResponseTo" 属性がないというメッセージと共にエラーページが表示されます。

### SAML 限定

**Login Methods** UI で他のログインメソッドタイプを無効にすることで、組織を SAML 限定にすることができます。このオプションが設定されている場合、すべてのユーザーはデフォルトで SAML でログインする必要があります。既存のユーザー名/パスワードまたは Google OAuth ログインは機能しません。これにより、Datadog にアクセスできるすべてのユーザーが、Datadog アカウントにアクセスするために、会社のアイデンティティプロバイダー/ディレクトリサービスで有効な資格情報を持っている必要があります。組織管理者は、ユーザーごとの[オーバーライド][23]を設定して、特定のユーザーが SAML 限定から免除されるようにすることができます。

### Datadog SP メタデータの自己更新

特定の ID プロバイダー (Microsoft の ADFS など) は、Datadog から最新の SAML サービスプロバイダーメタデータをプルするように構成できます。Datadog で SAML を構成した後、SAML コンフィギュレーションページから組織のメタデータ URL を取得し、それを ID プロバイダーで使用して、変更が公開されるたびに最新のサービスプロバイダーメタデータを取得できます。

{{< img src="account_management/saml/saml_metadata_url.png" alt="SAML メタデータ URL" style="width:50%;" >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /ja/help/
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