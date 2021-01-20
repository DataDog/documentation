---
title: SAML を使用したシングルサインオン
kind: documentation
aliases:
  - /ja/guides/saml
further_reading:
  - link: /account_management/multi_organization/
    tag: Documentation
    text: 複数のアカウントを持つチームとオーガニゼーションの構成
---
**このドキュメントは、SAML ID プロバイダー (IdP) が既に稼働中であることを前提としています。**

Datadog アカウントに対して [SAML (Security Assertion Markup Language)][1] を構成すると、SAML IdP が構成された Active Directory、LDAP などのオーガニゼーションの ID ストアに保存されている資格情報を使用してすべてのチームメンバーが Datadog にログインできるようになります。

**注**: Datadog アカウントで SAML が有効化されていない場合は、[サポートチーム][2]に有効化を依頼してください。

2 分間のビデオをご覧ください。

{{< wistia 2qe33x8h3v >}}

## SAML の構成

左側ナビゲーションメニューでユーザー名にマウスを置くとドロップダウンメニューが表示されますが、[Datadog 管理者][3]の場合は、ここに [Configure SAML][4] オプションがあります。

{{< img src="account_management/saml/saml_configure.png" alt="SAML 構成"  style="width:50%;" >}}

このオプションを選択すると、**SAML Single Sign On Configuration** ページが表示されます。

1. **Choose File** ボタンをクリックして、SAML IdP から IdP メタデータをアップロードします。

    {{< img src="account_management/saml/saml_choose_file.png" alt="SAML ファイルの選択"  >}}

    ファイルを選択したら、**Upload File** をクリックします。

2. Datadog の[サービスプロバイダーメタデータ][5]をダウンロードして、Datadog をサービスプロバイダーとして認識するように IdP を構成します。

3. IdP メタデータをアップロードし、IdP を構成したら、**Enable** ボタンをクリックして Datadog で SAML を有効にします。
{{< img src="account_management/saml/saml_enable.png" alt="SAML の有効化"  >}}

Datadog で SAML を構成し、Datadog からのリクエストを受け付けるように IdP のセットアップが完了したら、ユーザーは [SAML Configuration ページ][4]上部のステータスボックスに表示される**シングルサインオン URL** からログインできます。
{{< img src="account_management/saml/saml_enabled.png" alt="有効化された SAML" >}}

<mrk mid="26" mtype="seg">シングルサインオン URL は、[Team ページ][6]にも表示されます。</mrk><mrk mid="27" mtype="seg">この URL をロードすると、IdP に対する SAML 認証が開始されます。</mrk><mrk mid="28" mtype="seg">**注**:</mrk> <mrk mid="29" mtype="seg">この URL は、アカウントで SAML が有効にならないと表示されません。</mrk>

<mrk mid="30" mtype="seg">**注**:</mrk> <mrk mid="31" mtype="seg">マルチオーガニゼーションに対して SAML を構成する必要がある場合は、[マルチオーガニゼーションに関するドキュメント][7]を参照してください。</mrk>

## SAML 属性の Datadog ロールへのマッピング

Access Management アクセス許可を持つユーザーは、ユーザーの SAML 属性に基づき、Datadog のロールを割り当てまたは削除することができます。

1. Teams で Mappings タブをクリックします。

2. **New Mapping** ボタンをクリックします。

3. 既存の Datadog ロール（デフォルトまたはカスタム）と関連付ける SAML ID プロバイダーのキー/値ペアを指定します。たとえば、`member_of` 属性に `Development` の値を持つすべてのユーザーに `Devs` という Datadog のカスタムロールを割り当てたい場合は、以下のようにします。

    {{< img src="account_management/saml/create_mapping.png" alt="SAML の Datadog ロールへのマッピング作成"  >}}

4. まだの場合は、**Enable Mappings** をクリックしてマッピングを有効化します。

指定された ID プロバイダー属性を持つユーザーがログインすると、自動的に Datadog ロールが割り当てられます。同様に、ユーザーの ID プロバイダー属性が削除されると、ロールへのアクセスも失います（別のマッピングが追加された場合を除く）。

<div class="alert alert-warning">
  <strong>重要:</strong> いずれのマッピングにも一致<i>しない</i>ユーザーは、それまで割り当てられていたロールを失い、SAML で組織にログインすることができなくなります。マッピング定義をよく確認してください。 
</div>

マッピングに変更を加えるには鉛筆アイコンを、マッピングを削除する場合はゴミ箱アイコンをクリックします。この操作はマッピングのみに適用され、ID プロバイダー属性または Datadog ロールへの影響はありません。

`authn_mappings` エンドポイントを使用して、SAML 属性の Datadog ロールへのマッピングを作成および変更することも可能です。詳しくは、[フェデレーション認証からロールマッピング API へ][8] をご確認ください。

## Datadog サービスプロバイダーの詳細

* Datadog は、**SAML2** の **HTTP-POST** 連結をサポートします。
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`
* Datadog は、アサーションリクエストの **NameIDPolicy** の形式として `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` を指定します。
* アサーションには署名が必要です。
* アサーションは暗号化できますが、暗号化されていないアサーションも許可されます。
* [Datadog の SP メタデータ][5]を参照してください。

## 属性の設定

<mrk mid="40" mtype="seg">アサーションに属性を含めることができます。</mrk><mrk mid="41" mtype="seg">Datadog は、AttributeStatement で次の 3 つの属性を探します。</mrk>

  1. <mrk mid="42" mtype="seg">**eduPersonPrincipalName**:</mrk> <mrk mid="43" mtype="seg">指定された場合、eduPersonPrincipalName は、ユーザーの Datadog ユーザー名に対応している必要があります。</mrk><mrk mid="44" mtype="seg">通常、ユーザー名はユーザーのメールアドレスです。</mrk>
  2. <mrk mid="45" mtype="seg">**sn**:</mrk> <mrk mid="46" mtype="seg">オプション。ユーザーの姓に設定されます。</mrk>
  3. <mrk mid="47" mtype="seg">**givenName**:</mrk> <mrk mid="48" mtype="seg">オプション。ユーザーの名に設定されます。</mrk>

<mrk mid="49" mtype="seg">Datadog は、属性が URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` または基本 NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` を使用することを想定しています。</mrk><mrk mid="50" mtype="seg">各属性に使用される名前は、IdP が使用する NameFormat に依存します。</mrk>

IdP が URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` を使用するように構成されている場合は、次のようになります。

  1. <mrk mid="52" mtype="seg">**eduPersonPrincipalName**:</mrk> <mrk mid="53" mtype="seg">IdP は、属性の名前を `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` に設定します。</mrk>
  2. <mrk mid="54" mtype="seg">**sn**:</mrk> <mrk mid="55" mtype="seg">IdP は、属性の名前を `urn:oid:2.5.4.4` に設定します。</mrk>
  3. <mrk mid="56" mtype="seg">**givenName**:</mrk> <mrk mid="57" mtype="seg">IdP は、属性の名前を `urn:oid:2.5.4.42` に設定します。</mrk>

IdP が基本 NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` を使用するように構成されている場合は、次のようになります。

  1. <mrk mid="59" mtype="seg">**eduPersonPrincipalName**:</mrk> <mrk mid="60" mtype="seg">IdP は、属性の名前を `urn:mace:dir:attribute-def:eduPersonPrincipalName` に設定します。</mrk>
  2. <mrk mid="61" mtype="seg">**sn**:</mrk> <mrk mid="62" mtype="seg">IdP は、属性の名前を `urn:mace:dir:attribute-def:sn` に設定します。</mrk>
  3. <mrk mid="63" mtype="seg">**givenName**:</mrk> <mrk mid="64" mtype="seg">IdP は、属性の名前を `urn:mace:dir:attribute-def:eduPersonPrincipalName` に設定します。</mrk>

<mrk mid="65" mtype="seg">**eduPersonPrincipalName** が AttributeStatement にある場合は、この属性の値がユーザー名として使用されます。</mrk><mrk mid="66" mtype="seg">**eduPersonPrincipalName** が AttributeStatement にない場合、ユーザー名は Subject の NameID から取得されます。</mrk><mrk mid="67" mtype="seg">NameID は、Format `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` を使用する必要があります。</mrk>

**sn** と **givenName** が提供されている場合は、Datadog プロファイルのユーザー名を更新するために使用されます。

## 個別の SAML IdP

個別の IdP の構成方法については、以下のドキュメントを参照してください。

* [アクティブディレクトリ][9]
* [Auth0][10]
* [Azure][11]
* [Google][12]
* [NoPassword][13]
* [Okta][14]
* [SafeNet][15]

## その他の機能

[SAML Configurationダイアログ][4]で、以下の機能を有効にできます。

### ジャストインタイム (JIT) プロビジョニング

JIT プロビジョニングを使用すると、初めてログインしようとしたときに Datadog 内にユーザーアカウントが作成されます。したがって、管理者がユーザーアカウントを 1 つずつ手動で作成する必要がなくなります。この場合、招待メールは送信されません。

<mrk mid="82" mtype="seg">オーガニゼーションによっては、一部のユーザーを Datadog に招待したくない場合があります。</mrk><mrk mid="83" mtype="seg">アカウントに対する SAML の動作を変更したい場合は、[Datadog のサポートチーム][2]にお問い合わせください。</mrk><mrk mid="84" mtype="seg">特定のユーザーが Datadog にアクセスできないようにする場合は、オーガニゼーション側で、Datadog にアサーションを送信しないように IdP を構成する必要があります。</mrk>

<mrk mid="85" mtype="seg">管理者は、新しい JIT ユーザーにデフォルトのロールを設定できます。</mrk><mrk mid="86" mtype="seg">デフォルトのロールは「**標準**」ですが、新しい JIT ユーザーを「**読み取り専用**」や「**管理者**」として追加することもできます。</mrk>

{{< img src="account_management/saml/saml_jit_default.png" alt="SAML JIT デフォルト"  style="width:50%;" >}}

### IdP 始動のログイン

<mrk mid="89" mtype="seg">Datadog URL がロードされると、ブラウザは、ユーザーが自分の資格情報を入力したカスタマー IdP にリダイレクトされ、IdP は Datadog に再度リダイレクトします。</mrk><mrk mid="90" mtype="seg">IdP によっては、最初に AuthnRequest を受け取らずに、直接 Datadog にアサーションを送信できます (IdP 始動のログイン)。</mrk>

<mrk mid="91" mtype="seg">IdP 始動のログイン機能を有効にしたら (さらにキャッシュがクリアされるまで待った後に)、新しいバージョンの SP メタデータを取得する必要があります。</mrk><mrk mid="92" mtype="seg">新しい SP メタデータには、アサーションの送信先となるオーガニゼーション固有の AssertionConsumerService エンドポイントが含まれます。</mrk>

更新された SP メタデータを使用しないと、Datadog はオーガニゼーションとアサーションを関連付けることができず、SAML の応答には "InResponseTo" 属性がないというメッセージと共にエラーページが表示されます。

### SAML 限定

<mrk mid="95" mtype="seg">SAML 限定モードを有効にした場合、すべてのユーザーが SAML でログインする必要があります。</mrk><mrk mid="96" mtype="seg">それまでのユーザー名/パスワードまたは Google OAuth ログインは機能しません。</mrk><mrk mid="97" mtype="seg">Datadog へのアクセス権を持つすべてのユーザーは、Datadog アカウントにアクセスするために自社の IdP/ディレクトリサービスに有効な資格情報を持っている必要があります。</mrk>

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /ja/help/
[3]: /ja/account_management/users/default_roles/
[4]: https://app.datadoghq.com/saml/saml_setup
[5]: https://app.datadoghq.com/account/saml/metadata.xml
[6]: https://app.datadoghq.com/account/team
[7]: /ja/account_management/multi_organization/#setting-up-saml
[8]: /ja/account_management/authn_mapping/
[9]: /ja/account_management/saml/activedirectory/
[10]: /ja/account_management/saml/auth0/
[11]: /ja/account_management/saml/azure/
[12]: /ja/account_management/saml/google/
[13]: /ja/account_management/saml/nopassword/
[14]: /ja/account_management/saml/okta/
[15]: /ja/account_management/saml/safenet/