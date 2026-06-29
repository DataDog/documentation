---
algolia:
  tags:
  - saml
aliases:
- /ja/guides/saml
description: Datadog の SAML 認証を、Active Directory、Auth0、Google、Okta、Microsoft Entra
  ID などのアイデンティティプロバイダーと連携して、安全なシングルサインオンを実現します。
further_reading:
- link: /account_management/multi_organization/
  tag: ドキュメント
  text: 複数のアカウントを持つチームとオーガニゼーションの構成
title: SAML を使用したシングルサインオン
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog for Government site では、SAML ログインのみをサポートします。</div>
{{< /site-region >}}

## 概要 {#overview}

Datadog アカウントに [SAML (Security Assertion Markup Language)][1] を構成することで、自分やチームメイト全員が SAML アイデンティティプロバイダーで構成された組織の Active Directory や LDAP などのアイデンティティストアに保存された資格情報を使用して、Datadog にログインすることができます。

**注**:

{{% site-region region="us,us3,us5,eu,ap1,ap2" %}}
- Datadog アカウントで SAML が有効化されていない場合は、[サポートチーム][2] に有効化を依頼してください。
{{% /site-region %}}
- このドキュメントは、SAML アイデンティティプロバイダー (IdP ) をすでに持っていることを前提としています。SAML IdP を持っていない場合は、[Active Directory][3]、[Auth0][4]、[Google][5]、[LastPass][6]、[Microsoft Entra ID][3]、[Okta][7]、[SafeNet][8] など、Datadog とインテグレーションしている IdP はいくつかあります。
- SAML 構成には、[Datadog 管理者][9] アクセスが必要です。

## SAML の構成 {#configuring-saml}

手順については、[SAML を使用したシングルサインオンの構成][2] を参照してください。

## SAML の使用 {#using-saml}

SAML が Datadog で構成され、IdP が Datadog からのリクエストを受け付けるように設定されると、ユーザーはログインできるようになります。

### SP 始動のログイン {#sp-initiated-login}

SP 始動、またはサービスプロバイダー始動とは、Datadog から始動するログインを意味します。ユーザーは、[SAML 構成ページ][4] の上部にあるステータスボックスに表示される {{< ui >}}Single Sign-on URL{{< /ui >}} を使用してログインします。この URL をロードすると、IdP に対して SAML 認証が開始されます。**注**: この URL は、アカウントで SAML が有効になっており、SP 始動のログインを使用していない限り、表示されません。

{{< img src="account_management/saml/saml_enabled_cropped.png" alt="SAML が有効であることの確認" >}}

ユーザーが SP 始動の SAML を通じてログインし、組織がカスタムサブドメインを持っていない場合、Datadog は追加のセキュリティを要求します。ユーザーはログインに必要な 1 回限りのメール確認コードを受け取ります。

### IdP 始動のログイン {#idp-initiated-login}

IdP 始動、またはアイデンティティプロバイダー始動とは、アプリポータルから始動するログインを意味します。ユーザーは、Google アプリのドロワーや Okta アプリポータルなど、アプリポータルのアプリアイコンをクリックしてログインします。SP 始動のログインを使用するユーザーは、アイデンティティプロバイダーの設定に応じて IdP 始動のログインを使用できる場合もあります。

## アサーションと属性 {#assertions-and-attributes}

ログインが発生すると、ユーザー認可を含む SAML アサーションがアイデンティティプロバイダーから Datadog に送信されます。

### 機能 {#capabilities}

* Datadog は、**SAML2** の **HTTP-POST** 連結をサポートします。
`urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST`。
* Datadog は、アサーションリクエストの **NameIDPolicy** の形式として `urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` を指定します。

### 要件 {#requirements}

* アサーションには署名が必要です。
* アサーションは暗号化できますが、暗号化されていないアサーションは許可されます。
* 詳細については、[Datadog のサービスプロバイダーメタデータ][3] を参照してください。ファイルにアクセスするには、Datadog にサインインする必要があります。

### サポートされている属性 {#supported-attributes}

属性は SAML アサーションに含めることができます。Datadog は `AttributeStatement` で 3 つの属性を検索します。

  1. **eduPersonPrincipalName**: 指定された場合、eduPersonPrincipalName は、ユーザーの Datadog ユーザー名に対応している必要があります。通常、ユーザー名はユーザーのメールアドレスです。
  2. **sn**: オプション。ユーザーの姓に設定されます。
  3. **givenName**: オプション。ユーザーの名に設定されます。

<div class="alert alert-info">Microsoft Entra ID IdP の場合、アサーション内で `sn` の代わりに属性 `surname` を使用してください。</div>

Datadog は、属性が URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` または基本 NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` を使用することを想定しています。各属性に使用される名前は、IdP が使用する NameFormat に依存します。

IdP が URI NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:uri` を使用するように構成されている場合は、次のようになります。

  1. **eduPersonPrincipalName**: IdP は属性名として `urn:oid:1.3.6.1.4.1.5923.1.1.1.6` を設定する必要があります。
  2. **sn**: IdP は属性名として `urn:oid:2.5.4.4` を設定する必要があります。
  3. **givenName**: IdP は属性名として `urn:oid:2.5.4.42` を設定する必要があります。

IdP が Basic NameFormat `urn:oasis:names:tc:SAML:2.0:attrname-format:basic` を使用するように構成されている場合は、次のようになります。

  1. **eduPersonPrincipalName**: IdP は属性名として `urn:mace:dir:attribute-def:eduPersonPrincipalName` を設定する必要があります。
  2. **sn**: IdP は属性名として `urn:mace:dir:attribute-def:sn` を設定する必要があります。
  3. **givenName**: IdP は属性名として `urn:mace:dir:attribute-def:givenName` を設定する必要があります。

AttributeStatement に **eduPersonPrincipalName** が存在する場合、この属性の値がユーザー名に使用されます。AttributeStatement に **eduPersonPrincipalName** が含まれていない場合、ユーザー名は Subject の NameID から取得されます。NameID は、`urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress` の形式を使用しなければなりません。

**sn** と **givenName** が提供されている場合は、Datadog プロファイルのユーザー名を更新するために使用されます。

## その他の機能 {#additional-features}

アイデンティティプロバイダーのレスポンスの属性を Datadog のロールやチームにマッピングするには、[SAML グループマッピング][5]を参照してください。

[SAML Configuration ダイアログ][4]で、以下の機能を有効にできます。

**注:** SAML コンフィギュレーションダイアログを表示するには、管理者アクセス許可が必要です。

### ジャストインタイム (JIT) プロビジョニング{#just-in-time-jit-provisioning}

JIT プロビジョニングを使用すると、初めてログインしようとしたときに Datadog 内にユーザーアカウントが作成されます。したがって、管理者がユーザーアカウントを 1 つずつ手動で作成する必要がなくなります。この場合、招待メールは送信されません。

組織によっては、すべてのユーザーを Datadog に招待したくない場合もあります。アカウントの SAML の動作を変更したい場合は、[Datadog サポート][2]にお問い合わせください。特定のユーザーを Datadog にアクセスさせたくない場合、IdP がアサーションを Datadog に送信しないように構成するかどうかは、組織次第です。

管理者は、新しい JIT ユーザーにデフォルトのロールを設定できます。デフォルトのロールは {{< ui >}}Standard{{< /ui >}} ですが、新しい JIT ユーザーを {{< ui >}}Read-Only{{< /ui >}} や {{< ui >}}Administrators{{< /ui >}}、またはカスタムロールとして追加することもできます。

<div class="alert alert-danger">
  <strong>重要:</strong> Role Mapping が有効になっている場合、JIT プロビジョニング時に設定されたロールよりも優先されます。適切な Group Attribute ステートメントがないと、ユーザーにロールが割り当てられず、Datadog へのアクセスを失う可能性があります。JIT プロビジョニング後にユーザーがロックアウトされるのを防ぐため、Mappings と JIT の両方を有効にする前に、マッピング定義を確認し、アサーションをチェックしてください。
</div>

{{< img src="account_management/saml/saml_jit_default.png" alt="saml JIT デフォルト" style="width:50%;" >}}

### IdP 始動のログイン {#idp-initiated-login-1}

Datadog URL がロードされると、ブラウザは、ユーザーが自分の資格情報を入力したカスタマー IdP にリダイレクトされ、IdP は Datadog に再度リダイレクトします。IdP によっては、最初に AuthnRequest を受け取らずに、直接 Datadog にアサーションを送信できます (IdP 始動のログイン)。

IdP 始動のログイン機能を有効にして構成を保存した後、アイデンティティプロバイダーのサービスプロバイダー (SP) メタデータの最新バージョンをダウンロードできます。新しい SP メタデータには、アサーションを送信するための、組織固有の異なる `AssertionConsumerService` エンドポイントが含まれています。

更新された SP メタデータを使用しないと、Datadog は組織とアサーションを関連付けることができず、SAML の応答には "InResponseTo" 属性がないというメッセージと共にエラーページが表示されます。

### SAML 限定 {#saml-strict}

{{< ui >}}Login Methods{{< /ui >}} UI で他のログインメソッドタイプを無効にすることで、組織を SAML 限定にすることができます。このオプションが設定されている場合、すべてのユーザーはデフォルトで SAML でログインする必要があります。既存のユーザー名とパスワードまたは Google OAuth ログインは機能しません。これにより、Datadog にアクセスできるすべてのユーザーが、Datadog アカウントにアクセスするために、会社のアイデンティティプロバイダーまたはディレクトリサービスで有効な資格情報を持っている必要があります。組織管理者は、ユーザーごとの[オーバーライド][6]を設定して、特定のユーザーが SAML 限定から免除されるようにすることができます。

### Datadog SP メタデータの自己更新 {#self-updating-datadog-sp-metadata}

特定の ID プロバイダー (Microsoft の ADFS など) は、Datadog から最新の SAML サービスプロバイダーメタデータをプルするように構成できます。Datadog で SAML を構成した後、SAML コンフィギュレーションページから組織のメタデータ URL を取得し、それを ID プロバイダーで使用して、変更が公開されるたびに最新のサービスプロバイダーメタデータを取得できます。

{{< img src="account_management/saml/saml_metadata_url.png" alt="SAML メタデータ URL" style="width:50%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://en.wikipedia.org/wiki/Security_Assertion_Markup_Language
[2]: /ja/account_management/saml/configuration
[3]: https://app.datadoghq.com/account/saml/metadata.xml
[4]: https://app.datadoghq.com/organization-settings/login-methods/saml
[5]: /ja/account_management/saml/mapping/
[6]: /ja/account_management/login_methods/#reviewing-user-overrides
[7]: https://developer.okta.com/docs/concepts/saml/
[8]: https://thalesdocs.com/sta/operator/applications/apps_saml/index.html
[9]: /ja/account_management/users/default_roles/