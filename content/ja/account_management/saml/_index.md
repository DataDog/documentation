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
<div class="alert alert-warning">Datadog for Government サイトは SAML ログインのみをサポートしています。</div>
{{< /site-region >}}

## 概要

Datadog アカウントで [SAML (Security Assertion Markup Language)][1] を設定すると、組織の Active Directory、LDAP、その他 SAML アイデンティティ プロバイダーと連携するアイデンティティ ストアに保存されている資格情報を使用して、あなたとチーム メイト全員が Datadog にログインできます。

**注:**

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
- Datadog アカウントで SAML が有効になっていない場合は、[サポート][2] までお問い合わせください。
- 本ドキュメントでは、すでに SAML アイデンティティ プロバイダー (IdP) をお持ちであることを前提としています。SAML IdP をお持ちでない場合は、[Active Directory][3]、[Auth0][4]、[Google][5]、[LastPass][6]、[Microsoft Entra ID][3]、[Okta][7]、[SafeNet][8] など、Datadog と連携する複数の IdP があります。
- SAML の設定には [Datadog Administrator][9] 権限が必要です。
{{% /site-region %}}

{{% site-region region="gov" %}}
- 本ドキュメントでは、すでに SAML アイデンティティ プロバイダー (IdP) をお持ちであることを前提としています。SAML IdP をお持ちでない場合は、[Active Directory][3]、[Auth0][4]、[Google][5]、[LastPass][6]、[Microsoft Entra ID][3]、[Okta][7]、[SafeNet][8] など、Datadog と連携する複数の IdP があります。
- SAML の設定には [Datadog Administrator][9] 権限が必要です。
{{% /site-region %}}

## SAML の設定

1. 設定を開始するには、ご利用 IdP のドキュメントを参照してください。

    * [Active Directory][10]
    * [Auth0][11]
    * [Google][13]
    * [Microsoft Entra ID][12]
    * [NoPassword][14]
    * [Okta][15]
    * [SafeNet][16]

2. Datadog アプリで左下のユーザー名にカーソルを合わせ、Organization Settings を選択します。次に [Login Methods][17] を選択し、SAML の **Configure** をクリックします。

3. **Choose File** をクリックして IdP メタデータ ファイルをアップロードします。ファイルを選択したら **Upload File** をクリックします。

**注:** IdP メタデータは ASCII 文字のみである必要があります。

4. Datadog をサービス プロバイダーとして認識させるために、Datadog の [Service Provider メタデータ][18] をダウンロードして IdP を設定します。

5. IdP メタデータをアップロードし、IdP を設定したら、Datadog で **Upload and Enable** ボタンをクリックして SAML を有効化します。
    {{< img src="account_management/saml/saml_enable_cropped.png" alt="IdP メタ データをアップロードして SAML を設定" >}}

6. IdP メタデータをアップロード後、**Login Methods** ページに戻り、デフォルトで SAML を `on` にします。

**注記:** マルチ オーガニゼーションで SAML を設定する場合は、[複数組織アカウントの管理][21] を参照してください。

## SAML の使用

SAML が Datadog で設定され、IdP が Datadog からの要求を受け入れるよう設定されると、ユーザーはログインできます。

### SP‑initiated ログイン

SP‑initiated (サービス プロバイダー開始) とは、Datadog から開始されるログインです。ユーザーは [SAML Configuration ページ][19] 上部のステータス ボックスに表示される **Single Sign‑on URL** からログインします。**Single Sign‑on URL** は [Team ページ][20] にも表示されます。この URL にアクセスすると IdP への SAML 認証が開始されます。**注:** この URL は、SAML がアカウントで有効になっており、SP‑initiated ログインを使用している場合にのみ表示されます。

{{< img src="account_management/saml/saml_enabled_cropped.png" alt="SAML が有効化されたことの確認" >}}

組織にカスタム サブドメインがない状態で SP‑initiated SAML を介してユーザーがログインする場合、Datadog は追加のセキュリティを要求します。ユーザーはログイン時に必要となるワンタイム メール認証コードを受け取ります。

### IdP‑initiated ログイン

IdP‑initiated (アイデンティティ プロバイダー開始) とは、アプリ ポータルから開始されるログインです。ユーザーは Google App ドロワーや Okta App Portal などのアプリ ポータルにあるアプリアイコンをクリックしてログインします。IdP の設定によっては、SP‑initiated ログインを利用するユーザーも IdP‑initiated ログインを使用できる場合があります。

## アサーションと属性

ログインが発生すると、ユーザー認可情報を含む SAML アサーションがアイデンティティ プロバイダーから Datadog に送信されます。

### 機能

* Datadog は **SAML2** 用の **HTTP‑POST** バインディング
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST` をサポートします。
* Datadog はアサーション要求で **NameIDPolicy** のフォーマットに `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` を指定します。

### 要件

* アサーションは署名されている必要があります。
* アサーションは暗号化することもできますが、暗号化されていないアサーションも受け付けます。
* 詳細は [Datadog の Service Provider メタデータ][18] を参照してください (ファイルにアクセスするには Datadog にサインインしている必要があります)。

### サポートされる属性

SAML アサーションには属性を含めることができます。Datadog は `AttributeStatement` 内で次の 3 つの属性を確認します。

  1. **eduPersonPrincipalName**: 指定されている場合、eduPersonPrincipalName はユーザーの Datadog ユーザー名 (通常はメール アドレス) に対応している必要があります。
  2. **sn**: 任意。ユーザーの姓を設定します。
  3. **givenName**: 任意。ユーザーの名 (ファースト ネーム) を設定します。

<div class="alert alert-info">Microsoft Entra ID IdP をご利用の場合、アサーションでは `sn` の代わりに `surname` 属性を使用してください。</div>

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

<div class="alert alert-warning">
  <strong>重要:</strong> Role Mapping が有効になっている場合、JIT プロビジョニング時に設定されたロールよりも優先されます。適切な Group Attribute ステートメントがないと、ユーザーにロールが割り当てられず、Datadog へのアクセスを失う可能性があります。JIT プロビジョニング後にユーザーがロックアウトされるのを防ぐため、Mappings と JIT の両方を有効にする前に、マッピング定義を確認し、アサーションをチェックしてください。
</div>

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