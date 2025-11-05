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
<div class="alert alert-danger">政府機関向け Datadog サイトでは、SAML ログインのみがサポートされています。</div>
{{< /site-region >}}

## 概要

Datadog アカウントに [SAML (Security Assertion Markup Language)][1] を構成することにより、あなたやチームメンバー全員は、組織の Active Directory、LDAP、または SAML Identity Provider によって構成された他の ID ストアに保存されている認証情報を使用して Datadog にログインできるようになります。

**注:**

{{% site-region region="us,us3,us5,eu,ap1" %}}
- Datadog アカウントで SAML が有効になっていない場合は、[サポート][2]にお問い合わせの上、有効化を依頼してください。
- このドキュメントでは、既に SAML Identity Provider (IdP) をお持ちであることを前提としています。IdP をお持ちでない場合は、Datadog と統合された複数の IdP ([Active Directory][3]、[Auth0][4]、[Google][5]、[LastPass][6]、[Microsoft Entra ID][3]、[Okta][7]、および [SafeNet][8] など) があります。
- SAML の構成を行うには、[Datadog Administrator][9] のアクセス権限が必要です。
{{% /site-region %}}

{{% site-region region="gov" %}}
- このドキュメントでは、既に SAML Identity Provider (IdP) をお持ちであることを前提としています。IdP をお持ちでない場合は、Datadog と統合された複数の IdP ([Active Directory][3]、[Auth0][4]、[Google][5]、[LastPass][6]、[Microsoft Entra ID][3]、[Okta][7]、および [SafeNet][8] など) があります。
- SAML の構成を行うには、[Datadog Administrator][9] のアクセス権限が必要です。
{{% /site-region %}}

## SAML の構成

1. 構成を開始するには、IdP のドキュメントを参照してください。

* [Active Directory][10]
* [Auth0][11]
* [Google][13]
* [Microsoft Entra ID][12]
* [NoPassword][14]
* [Okta][15]
* [SafeNet][16]

2. Datadog アプリで、左下のユーザー名にカーソルを合わせて「Organization Settings」を選択します。[Login Methods][17] を選択し、SAML の下の **Configure** をクリックします。

3. **Choose File** ボタンをクリックして SAML Identity Provider から IdP メタデータをアップロードします。ファイルを選択した後、**Upload File** をクリックします。

**注:** IdP メタデータには ASCII 文字のみが含まれている必要があります。

4. Datadog の [Service Provider メタデータ][18]をダウンロードして、IdP に Datadog を Service Provider として認識させるように構成します。

5. IdP メタデータをアップロードして IdP を構成した後、**Upload and Enable** ボタンをクリックして Datadog で SAML を有効にします。
{{< img src="account_management/saml/saml_enable_cropped.png" alt="IdP メタデータをアップロードして SAML を構成します" >}}

6. IdP メタデータをアップロードしたら、**Login Methods** ページに戻り、デフォルトで SAML を `on` にします。

7. Datadog で SAML が構成され、IdP が Datadog からのリクエストを受け入れるように構成されたら、ユーザーは以下の方法でログインできます。

- **SP-initiated ログインを使用する場合** (Service Provider、つまり Datadog から開始されるログイン): [SAML Configuration ページ][19]の上部にあるステータスボックスで表示される **Single Sign-on URL** を使用します。**Single Sign-on URL** は [Team ページ][20]にも表示されます。この URL にアクセスすると、IdP に対する SAML 認証が開始されます。**注**: この URL は、アカウントで SAML が有効になっており SP-initiated ログインを使用している場合にのみ表示されます。
{{< img src="account_management/saml/saml_enabled_cropped.png" alt="SAML が有効であることを示す確認" >}}

- **IdP-initiated ログインを使用する場合** (Identity Provider、つまりあなたのアプリポータルから開始されるログイン): Google App Drawer や Okta App Portal などのアプリポータルでアプリのアイコンをクリックすることでログインします。一部のシナリオでは、SP-initiated ログイン URL を使用してログインするユーザーも IdP-initiated ログインを使用できますが、これは IdP の構成およびサポートによって異なります。

**注**: 複数の組織を持つアカウントで SAML を構成する場合は、[複数組織アカウントの管理][21]を参照してください。

## アサーションと属性

ログインが行われたとき、ユーザー認証を含む SAML アサーションが Identity Provider から Datadog に送信されます。

### 機能

* Datadog は **SAML2** 用の **HTTP-POST** バインディングをサポートしています。
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`
* Datadog は、アサーションリクエストにおける **NameIDPolicy** の形式として `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` を指定します。

### 要件

* アサーションは署名されている必要があります。
* アサーションは暗号化可能ですが、暗号化されていないアサーションも受け入れられます。
* 詳細については、[Datadog の Service Provider メタデータ][18]を参照してください。このファイルにアクセスするには、Datadog にサインインしている必要があります。

### サポートされている属性

属性は SAML アサーションに含まれる場合があります。Datadog は `AttributeStatement` 内の 3 つの属性を参照します。

1. **eduPersonPrincipalName**: 指定されている場合、eduPersonPrincipalName はユーザーの Datadog ユーザー名に対応している必要があります。ユーザー名は通常、ユーザーのメールアドレスです。
2. **sn**: この属性は任意で、ユーザーの姓を設定する必要があります。
3. **givenName**: この属性は任意で、ユーザーの名を設定する必要があります。

<div class="alert alert-info">Microsoft Entra ID IdP の場合、アサーション内で `sn` の代わりに `surname` 属性を使用してください。</div>

<mrk mid="49" mtype="seg">Datadog は、属性が URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` または基本 NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` を使用することを想定しています。</mrk><mrk mid="50" mtype="seg">各属性に使用される名前は、IdP が使用する NameFormat に依存します。</mrk>

IdP が URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` を使用するように構成されている場合は、次のようになります。

  1. **eduPersonPrincipalName**: IdP は属性名として `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` を設定する必要があります。
  2. **sn**: IdP は属性名として `urn:oid:2.5.4.4` を設定する必要があります。
  3. **givenName**: IdP は属性名として `urn:oid:2.5.4.42` を設定する必要があります。

IdP が基本 NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` を使用するように構成されている場合は、次のようになります。

  1. **eduPersonPrincipalName**: IdP は属性名として `urn:mace:dir:attribute-def:eduPersonPrincipalName` を設定する必要があります。
  2. **sn**: IdP は属性名として `urn:mace:dir:attribute-def:sn` を設定する必要があります。
  3. **givenName**: IdP は属性名として `urn:mace:dir:attribute-def:givenName` を設定する必要があります。

AttributeStatement に **eduPersonPrincipalName** が存在する場合、この属性の値がユーザー名に使用されます。AttributeStatement に **eduPersonPrincipalName** が含まれていない場合、ユーザー名は Subject の NameID から取得されます。NameID は、`urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` の形式を使用しなければなりません。

**sn** と **givenName** が提供されている場合は、Datadog プロファイルのユーザー名を更新するために使用されます。

## その他の機能

アイデンティティプロバイダーのレスポンスの属性を Datadog のロールやチームにマッピングするには、[SAML グループマッピング][22]を参照してください。

[SAML Configuration ダイアログ][19]で、以下の機能を有効にできます。

**注:** SAML コンフィギュレーションダイアログを表示するには、管理者アクセス許可が必要です。

### ジャストインタイム (JIT) プロビジョニング

JIT プロビジョニングを使用すると、初めてログインしようとしたときに Datadog 内にユーザーアカウントが作成されます。したがって、管理者がユーザーアカウントを 1 つずつ手動で作成する必要がなくなります。この場合、招待メールは送信されません。

組織によっては、すべてのユーザーを Datadog に招待したくない場合もあります。アカウントの SAML の動作を変更したい場合は、[Datadog サポート][2]に連絡してください。特定のユーザーを Datadog にアクセスさせたくない場合、IdP がアサーションを Datadog に送信しないように構成するかどうかは、組織次第です。

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
[3]: https://learn.microsoft.com/en-us/entra/architecture/auth-saml
[4]: https://auth0.com/docs/protocols/saml-protocol
[5]: https://cloud.google.com/architecture/identity/single-sign-on
[6]: https://support.logmeininc.com/lastpass/help/lastpass-admin-toolkit-using-single-sign-on-sso
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[9]: /ja/account_management/users/default_roles/
[10]: /ja/account_management/saml/activedirectory/
[11]: /ja/account_management/saml/auth0/
[12]: /ja/account_management/saml/entra/
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