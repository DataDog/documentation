---
aliases:
- /ja/guides/saml
further_reading:
- link: /account_management/multi_organization/
  tag: Documentation
  text: 複数のアカウントを持つチームとオーガニゼーションの構成
kind: documentation
title: SAML を使用したシングルサインオン
---
{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog for Government site では、SAML ログインのみをサポートします。</div>
{{< /site-region >}}

## 概要

Datadog アカウントに [SAML (Security Assertion Markup Language)][1] を構成すると、SAML IdP が構成された Active Directory、LDAP などのオーガニゼーションの ID ストアに保存されている資格情報を使用してすべてのチームメンバーが Datadog にログインできるようになります。

**注**:

- Datadog アカウントで SAML が有効化されていない場合は、[サポートチーム][2]に有効化を依頼してください。
- このドキュメントは、SAML ID プロバイダー (IdP) をすでに使用中であることを前提としています。SAML IdP をお持ちでない場合、Datadog とインテグレーションが可能な IdP ([Active Directory][3]、[Auth0][4]、[Azure][3]、[Google][5]、[LastPass][6]、[Okta][7]、[SafeNet][8] など) をご利用ください。
- SAML のコンフィギュレーションには [Datadog 管理者][9]アクセスが必要です。

## SAML の構成

1. 構成を開始する前に、IdP のドキュメントをご確認ください。

    * [Active Directory][10]
    * [Auth0][11]
    * [Azure][12]
    * [Google][13]
    * [NoPassword][14]
    * [Okta][15]
    * [SafeNet][16]

2. Datadog アプリで、左下のユーザー名にカーソルを合わせて Organization Settings を選択します。[Login Methods][17] を選択し、SAML の **Configure** をクリックします。

3. **Choose File** ボタンをクリックして、SAML IdP から IdP メタデータをアップロードします。ファイルを選択したら、**Upload File** をクリックします。

4. Datadog の[サービスプロバイダーメタデータ][18]をダウンロードして、Datadog をサービスプロバイダーとして認識するように IdP を構成します。

5. IdP メタデータをアップロードし、IdP を構成したら、**Enable** ボタンをクリックして Datadog で SAML を有効にします。
    {{< img src="account_management/saml/saml_enable.png" alt="saml 有効化"  >}}

6. Datadog で SAML を構成し、Datadog からのリクエストを受け付けるように IdP をセットアップしたら、ユーザーはログインできます。

   - **SP 始動のログイン** (サービスプロバイダー、または Datadog から始動されたログイン) を使用する場合: [SAML Configuration ページ][19]上部のステータスボックスに表示される**シングルサインオン URL** を使用してログインできます。**シングルサインオン URL** は、[Team ページ][20]にも表示されます。この URL をロードすると、IdP に対する SAML 認証が開始されます。**注**: この URL は、アカウントで SAML が有効になっていて、SP 始動のログインを使用していないと表示されません。
    {{< img src="account_management/saml/saml_enabled.png" alt="Saml 有効"  >}}

   - **IdP 始動のログインを使用する場合** (ID プロバイダー、またはアプリポータルから始動されたログイン): アプリポータル (Google アプリドロワーや Okta アプリポータルなど) のアプリアイコンをクリックしてログインできます。一部のシナリオでは、SP 始動のログイン URL を使用してログインするユーザーは、IdP 始動のログインエクスペリエンスでも機能しますが、これは ID プロバイダーのコンフィギュレーションとサポートによって異なります。

**注**: マルチオーガニゼーションに対して SAML を構成する場合は、[マルチオーガニゼーションアカウントの管理][21]を参照してください。

## アサーションと属性

ログインが発生すると、ユーザー認証を含む SAML アサーションが IP プロバイダーから Datadog へ送信されます。.

アサーションに関する重要事項:

* Datadog は、**SAML2** の **HTTP-POST** 連結をサポートします。
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`.
* Datadog  は、アサーションリクエストの **NameIDPolicy** の形式として `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` を指定します。
* アサーションには署名が必要です。
* アサーションは暗号化できますが、暗号化されていないアサーションも許可されます。
* 詳細は、[Datadog  の SP メタデータ][18]を参照してください。

SAML アサーションに属性を含めることができます。Datadog は、`AttributeStatement` で次の 3 つの属性を探します。

  1. **eduPersonPrincipalName**: 指定された場合、eduPersonPrincipalName は、ユーザーの Datadog ユーザー名に対応している必要があります。通常、ユーザー名はユーザーのメールアドレスです。
  2. **sn**: オプション。ユーザーの姓に設定されます。
  3. **givenName**: オプション。ユーザーの名に設定されます。

Datadog は、属性が URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` または基本 NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` を使用することを想定しています。各属性に使用される名前は、IdP が使用する NameFormat に依存します。

IdP が URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` を使用するように構成されている場合は、次のようになります。

  1. **eduPersonPrincipalName**: IdP は、属性の名前を `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` に設定します。
  2. **sn**: IdP は、属性の名前を `urn:oid:2.5.4.4` に設定します。
  3. **givenName**: IdP は、属性の名前を `urn:oid:2.5.4.42` に設定します。

IdP が基本 NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` を使用するように構成されている場合は、次のようになります。

  1. **eduPersonPrincipalName**: IdP は、属性の名前を `urn:mace:dir:attribute-def:eduPersonPrincipalName` に設定します。
  2. **sn**: IdP は、属性の名前を `urn:mace:dir:attribute-def:sn` に設定します。
  3. **givenName**: IdP は、属性の名前を `urn:mace:dir:attribute-def:givenName` に設定します。

**eduPersonPrincipalName** が AttributeStatement にある場合は、この属性の値がユーザー名として使用されます。**eduPersonPrincipalName** が AttributeStatement に含まれない場合、ユーザー名は Subject の NameID から取得されます。NameID は、Format `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` を使用する必要があります。

**sn** と **givenName** が提供されている場合は、Datadog プロファイルのユーザー名を更新するために使用されます。

## SAML 属性の Datadog ロールへのマッピング

Datadog で、IdP の応答の属性を Datadog ロールにマッピングできます。Access Management 権限を持つユーザーは、ユーザーの SAML 属性に基づき、Datadog のロールを割り当てまたは削除することができます。

マッピングには正しい属性が必要なため、マッピングを有効にする前にアサーションで送信される内容を理解することが重要です。各 IdP には特定のマッピングがあります。たとえば、Azure はオブジェクト ID と機能し、Okta の場合は [Okta 設定][22]で属性を設定する必要があります。Datadog では、マッピングを作成する**前に** Chrome Dev Tools またはブラウザの拡張機能などの[内蔵ブラウザツール][23]で相互参照し、[SAML アサーションを検証][24]することをおすすめします。

1. SAML アサーションを[相互参照][23]および[検証][24]して、IdP の属性を理解します。

2. **Organization Settings** に移動し、**SAML Group Mappings** タブをクリックします。

3. **New Mapping** をクリックします。

4. 既存の Datadog ロール（デフォルトまたはカスタム）と関連付ける SAML ID プロバイダーの `key-value` ペアを指定します。**注**: このエントリは大文字/小文字を区別します。

   たとえば、`member_of` 属性に `Development` の値を持つすべてのユーザーに `Devs` という Datadog のカスタムロールを割り当てたい場合は、以下のようにします。

    {{< img src="account_management/saml/create_mapping.png" alt="SAML の Datadog ロールへのマッピング作成"  >}}


   **注**: すべての ID プロバイダーは異なります。属性キーまたはラベルを設定できるプロバイダーもあります。デフォルトで 1 つを提供するプロバイダーもあります。ログイン時にアサーションインスペクターを使用して特定のアサーションの詳細を表示し、ID プロバイダーがグループメンバーシップを送信する方法を理解することをお勧めします。

5. まだの場合は、**Enable Mappings** をクリックしてマッピングを有効化します。

指定された ID プロバイダー属性を持つユーザーがログインすると、自動的に Datadog ロールが割り当てられます。同様に、ユーザーの ID プロバイダー属性が削除されると、ロールへのアクセスも失います（別のマッピングが追加された場合を除く）。

<div class="alert alert-warning">
  <strong>重要:</strong> いずれのマッピングにも一致<i>しない</i>ユーザーは、それまで割り当てられていたロールを失い、SAML でオーガニゼーションにログインすることができなくなります。ユーザーがログインできないシナリオを防ぐために、マッピングを有効にする前に、マッピング定義を再確認し、独自のアサーションを調べてください。
</div>

マッピングに変更を加えるには**鉛筆**アイコンを、マッピングを削除する場合は**ゴミ箱**アイコンをクリックします。この操作はマッピングのみに適用され、ID プロバイダー属性または Datadog ロールへの影響はありません。

`authn_mappings` エンドポイントを使用して、SAML 属性の Datadog ロールへのマッピングを作成および変更することも可能です。詳しくは、[フェデレーション認証からロールマッピング API へ][25]をご確認ください。

## その他の機能

[SAML Configuration ダイアログ][19]で、以下の機能を有効にできます。

**注:** SAML コンフィギュレーションダイアログを表示するには、管理者アクセス許可が必要です。

### ジャストインタイム (JIT) プロビジョニング

JIT プロビジョニングを使用すると、初めてログインしようとしたときに Datadog 内にユーザーアカウントが作成されます。したがって、管理者がユーザーアカウントを 1 つずつ手動で作成する必要がなくなります。この場合、招待メールは送信されません。

<mrk mid="82" mtype="seg">オーガニゼーションによっては、一部のユーザーを Datadog に招待したくない場合があります。</mrk><mrk mid="83" mtype="seg">アカウントに対する SAML の動作を変更したい場合は、[Datadog のサポートチーム][2]にお問い合わせください。</mrk><mrk mid="84" mtype="seg">特定のユーザーが Datadog にアクセスできないようにする場合は、オーガニゼーション側で、Datadog にアサーションを送信しないように IdP を構成する必要があります。</mrk>

管理者は、新しい JIT ユーザーにデフォルトのロールを設定できます。デフォルトのロールは **Standard** ですが、新しい JIT ユーザーを **Read-Only** や **Administrators** として追加することもできます。

{{< img src="account_management/saml/saml_jit_default.png" alt="SAML JIT デフォルト" style="width:50%;" >}}

### IdP 始動のログイン

<mrk mid="89" mtype="seg">Datadog URL がロードされると、ブラウザは、ユーザーが自分の資格情報を入力したカスタマー IdP にリダイレクトされ、IdP は Datadog に再度リダイレクトします。</mrk><mrk mid="90" mtype="seg">IdP によっては、最初に AuthnRequest を受け取らずに、直接 Datadog にアサーションを送信できます (IdP 始動のログイン)。</mrk>

IdP 始動のログイン機能を有効にしてコンフィギュレーションを保存した後、ID プロバイダーの SP メタデータの最新バージョンをダウンロードできます。新しい SP メタデータには、アサーションを送信するための、オーガニゼーション固有の異なる `AssertionConsumerService` エンドポイントが含まれています。

更新された SP メタデータを使用しないと、Datadog はオーガニゼーションとアサーションを関連付けることができず、SAML の応答には "InResponseTo" 属性がないというメッセージと共にエラーページが表示されます。

### SAML 限定

**Login Methods** UI で他のログインメソッドタイプを無効にすることで、オーガニゼーションを SAML 限定にすることができます。このオプションが設定されている場合、すべてのユーザーはデフォルトで SAML でログインする必要があります。既存のユーザー名/パスワードまたは Google OAuth ログインは機能しません。これにより、Datadog にアクセスできるすべてのユーザーが、Datadog アカウントにアクセスするために、会社の ID プロバイダー/ディレクトリサービスで有効な資格情報を持っている必要があります。オーガニゼーション管理者は、ユーザーごとのオーバーライドを設定して、特定のユーザーが SAML 限定から免除されるようにすることができます。

### 自己更新 Datadog SP メタデータ

特定の ID プロバイダー (Microsoft の ADFS など) は、Datadog から最新の SAML サービスプロバイダーメタデータをプルするように構成できます。Datadog で SAML を構成した後、SAML コンフィギュレーションページからオーガニゼーションのメタデータ URL を取得し、それを ID プロバイダーで使用して、変更が公開されるたびに最新のサービスプロバイダーメタデータを取得できます。

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
[8]: https://help.safenetid.com/operator/Content/STA/Apps/Apps_SAML.htm
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
[22]: https://help.okta.com/en/prod/Content/Topics/users-groups-profiles/usgp-add-custom-user-attributes.htm
[23]: https://support.okta.com/help/s/article/How-to-View-a-SAML-Response-in-Your-Browser-for-Troubleshooting?language=en_US
[24]: https://www.samltool.com/validate_response.php
[25]: /ja/account_management/authn_mapping/