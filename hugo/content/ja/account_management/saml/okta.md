---
description: IdP 始動および SP 始動の SSO、JIT プロビジョニング、ロールマッピング構成を使用して、Okta を Datadog の SAML
  アイデンティティプロバイダーとして設定します。
further_reading:
- link: /account_management/saml/
  tag: ドキュメント
  text: Datadog アカウントのための SAML の構成
- link: /account_management/multi_organization/
  tag: ドキュメント
  text: 複数のアカウントを持つチームと組織の構成
title: Okta SAML アイデンティティプロバイダーの構成
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
    ここでの {{< region-param key="dd_site_name" >}} サイトでは、<a href="/account_management/faq/okta/">従来の手順</a>を使用して、Okta で Datadog アプリケーションを手動で構成する必要があります。Okta アプリケーションカタログにある事前構成済みの Datadog アプリケーションに関するこのページの手順は無視してください。
</div>
{{% /site-region %}}

## 概要 {#overview}

このページでは、Okta で Datadog アプリケーションを設定する方法を説明します。

続行する前に、最新バージョンの Datadog アプリケーションを使用していることを確認してください。
1. Okta で、{{< ui >}}Applications{{< /ui >}} をクリックします。
1. Datadog アプリケーションを開きます。
1. {{< ui >}}General{{< /ui >}} タブを選択します。
1. {{< ui >}}SSO Base URL{{< /ui >}} というラベルのフィールドを探します。

{{< img src="account_management/saml/okta/sso_base_url.png" alt="SSO ベース URL が強調表示された、Okta での Datadog アプリケーション構成" style="width:80%;" >}}

SSO Base URL フィールドが表示されない場合は、[従来の手順][1]を使用して Okta を構成します。

## サポートされる機能 {#supported-features}

Datadog Okta SAML インテグレーションは、以下をサポートしています。
- IdP 始動の SSO
- SP 始動の SSO
- JIT プロビジョニング

上記の用語の定義については、Okta の[用語集][2]を参照してください。

## セットアップ {#setup}

以下の手順に従って、Okta を Datadog の SAML アイデンティティプロバイダー (IdP) として設定します。セットアッププロセスでは、Okta アカウントと Datadog アカウントを交互に使用する必要があります。

<div class="alert alert-info">Okta から Datadog に送信されるメールアドレスは、Datadog のユーザーハンドルと完全に一致している必要があります。</div>

### Okta で Datadog インテグレーションを追加する {#add-the-datadog-integration-in-okta}

1. Okta 管理者ダッシュボードにログインします。
1. 左側のナビゲーションパネルで、{{< ui >}}Applications{{< /ui >}} をクリックします。
1. {{< ui >}}Browse App Catalog{{< /ui >}} をクリックします。
1. 検索バーを使用して「Datadog」を検索します。
1. SAML および SCIM の Datadog アプリを選択します。
1. {{< ui >}}Add Integration{{< /ui >}} をクリックします。General Settings ダイアログが表示されます。
1. {{< ui >}}SSO Base URL{{< /ui >}} フィールドに [Datadog ウェブサイト URL][3] を入力します。
1. {{< ui >}}Done{{< /ui >}} をクリックします。

**注:** 標準の Datadog ウェブサイト URL を使用していない場合、SSO Base URL フィールドでカスタムサブドメインを使用できます。

次に、Datadog にアップロードするためのメタデータの詳細をダウンロードします。
1. Okta の Datadog アプリケーションの設定ダイアログで、{{< ui >}}Sign on{{< /ui >}} タブをクリックします。
1. {{< ui >}}Metadata URL{{< /ui >}} が表示されるまで下にスクロールします。
1. {{< ui >}}Copy{{< /ui >}} をクリックします。
1. 新しいブラウザタブを開き、メタデータ URL をアドレスバーに貼り付けます。
1. ブラウザを使用して、メタデータ URL のコンテンツを XML ファイルとして保存します。

{{< img src="account_management/saml/okta/metadata_url.png" alt="Okta でのサインオン構成" style="width:80%;" >}}

### Datadog を構成する {#configure-datadog}

#### メタデータの詳細をアップロードする {#upload-metadata-details}

1. 組織の設定の下の[ログイン方法][4]に移動します。
1. SAML を以前に設定したかどうかに応じて、SAML コンポーネントで {{< ui >}}Configure{{< /ui >}} または {{< ui >}}Update{{< /ui >}} をクリックします。SAML 構成ページが表示されます。
1. {{< ui >}}Choose File{{< /ui >}} をクリックし、以前に Okta からダウンロードしたメタデータファイルを選択します。

{{< img src="account_management/saml/okta/choose_file.png" alt="メタデータのアップロードボタンが強調表示された、Datadog での SAML 構成" style="width:100%;" >}}

#### IdP 始動のログインを有効にする {#activate-idp-initiated-login}

Datadog アプリケーションを正しく機能させるには、IdP 始動のログインを有効にする必要があります。

<div class="alert alert-info">IdP 始動のログインを有効にすると、ユーザーは Okta から Datadog にログインできるようになります</div>

IdP 始動のログインを有効にするには、以下の手順を実行します。
1. [SAML 構成ページ][5]に移動します。
1. {{< ui >}}Additional Features{{< /ui >}}の下で、{{< ui >}}Identity Provider (IdP) Initiated Login{{< /ui >}} のチェックボックスをクリックします。コンポーネントに {{< ui >}}Assertion Consumer Service URL{{< /ui >}} が表示されます。
1. Assertion Consumer Service URL の `/saml/assertion` より後の部分が会社 ID です。この値に `/id/` プレフィックスを付けて Okta に入力し、構成を完了します。
1. {{< ui >}}Save Changes{{< /ui >}} をクリックします。

{{< img src="account_management/saml/okta/company_id.png" alt="Assertion Consumer Service URL の会社 ID 部分が強調表示された、Datadog での SAML 構成" style="width:100%;" >}}

次の構成手順に進むため、Okta に戻ります。

### Okta で会社 ID を追加する {#add-the-company-id-in-okta}

1. Okta 管理者ダッシュボードに戻ります。
1. {{< ui >}}Sign on{{< /ui >}} タブを選択します。
1. {{< ui >}}Edit{{< /ui >}} をクリックします。
1. {{< ui >}}Advanced Sign-on Settings{{< /ui >}} セクションまで下にスクロールします。
1. `/id/` プレフィックスを含む完全な会社 ID を {{< ui >}}Company ID{{< /ui >}} フィールド (`/id/XXXXXX-XXXX-XXX-XXXX-XXXXXXX`) に貼り付けます。
1. {{< ui >}}Save{{< /ui >}} をクリックします。

## サービスプロバイダー (SP) 始動のログイン {#service-provider-sp-initiated-login}

サービスプロバイダー始動のログイン (SP 始動の SSO) を使用して Datadog にログインするには、シングルサインオン (SSO) URL が必要です。SSO URL は、SAML 構成ページまたはメールという 2 つの方法で確認できます。

### SAML 構成ページ {#saml-configuration-page}
Datadog の [SAML 構成ページ][5]では、{{< ui >}}Single Sign-on URL{{< /ui >}} の見出しの横に SSO URL が表示されます。

### メール {#email}
1. 組織の Datadog ウェブサイト URL に移動します。
1. {{< ui >}}Using Single Sign-On?{{< /ui >}} を選択します。
1. メールアドレスを入力し、{{< ui >}}Next{{< /ui >}} をクリックします。
1. SSO URL が記載されたメールを確認します。{{< ui >}}Login URL{{< /ui >}} として記載されています。

いずれかの方法で SSO URL を取得したら、今後のためにブックマークしておきます。

## SAML ロールマッピング {#saml-role-mapping}

Datadog は SAML グループマッピングを使用して、Okta の属性を Datadog ロールとチームにマッピングします。このステップはオプションです。

**注**: ロールマッピングは SAML 経由でのみ利用可能です。SCIM は Okta からユーザーとチームをプロビジョニングしますが、ロールのマッピングは行いません。SCIM を設定するには、[Okta で SCIM を構成する][8]を参照してください。

1. Okta 管理者ダッシュボードに移動します。
1. {{< ui >}}Sign on{{< /ui >}} タブを選択します。
1. {{< ui >}}Edit{{< /ui >}} をクリックします。
1. {{< ui >}}Attributes{{< /ui >}} で、すべてのグループを取得するために、`memberOf` という名前のグループ属性ステートメントを、名前形式 {{< ui >}}Unspecified{{< /ui >}}、値 `.*` で追加します。スコープをさらに絞り込む必要がある場合は、IdP 管理者に連絡してください。
1. Datadog で目的の[マッピング][7]を設定します。

## 参考資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/faq/okta/
[2]: https://help.okta.com/en/prod/Content/Topics/Reference/glossary.htm
[3]: /ja/getting_started/site/#access-the-datadog-site
[4]: https://app.datadoghq.com/organization-settings/login-methods
[5]: https://app.datadoghq.com/organization-settings/login-methods/saml
[7]: /ja/account_management/saml/mapping/
[8]: /ja/account_management/scim/okta/