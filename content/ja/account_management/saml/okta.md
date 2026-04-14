---
further_reading:
- link: /account_management/saml/
  tag: Documentation
  text: Datadog アカウントのための SAML の構成
- link: /account_management/multi_organization/
  tag: Documentation
  text: 複数のアカウントを持つチームとオーガニゼーションの構成
title: Okta の SAML アイデンティティプロバイダー構成
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
{{< region-param key="dd_site_name" >}} サイトでは、Okta アプリケーションカタログの事前構成された Datadog アプリケーションに関するこのページの指示を無視し、<a href="/account_management/faq/okta/">従来の手順</a>を使用して Okta で Datadog アプリケーションを手動で構成する必要があります。
</div>
{{% /site-region %}}

## 概要

このページでは、Okta における Datadog アプリケーションの設定方法について説明します。

続行する前に、最新バージョンの Datadog アプリケーションを使用していることを確認してください。
1. Okta で **Applications** をクリックします。
1. Datadog アプリケーションを開きます。
1. **General** タブを選択します。
1. **SSO Base URL** というフィールドを探します。

{{< img src="account_management/saml/okta/sso_base_url.png" alt="Okta における Datadog アプリケーションの構成、SSO Base URL をハイライト" style="width:80%;" >}}

SSO Base URL フィールドが見つからない場合は、[従来の手順][1]を使用して Okta を構成してください。

## 対応機能

Datadog の Okta SAML インテグレーションは以下をサポートしています。
- IdP 主導の SSO
- SP 主導の SSO
- JIT プロビジョニング

上記の用語の定義については、Okta の[用語集][2]を参照してください。

## 設定

以下の手順に従って、Okta を Datadog の SAML アイデンティティプロバイダー (IdP) として設定します。設定プロセスでは、Okta アカウントと Datadog アカウントを交互に操作する必要があります。

### Okta で

1. Okta の管理ダッシュボードにログインします。
1. 左側のナビゲーションで **Applications** をクリックします。
1. **Browse App Catalog** をクリックします。
1. 検索バーで "Datadog" を検索します。
1. SAML および SCIM 用の Datadog アプリを選択します。
1. **Add Integration** をクリックします。General Settings ダイアログが表示されます。
1. **SSO Base URL** フィールドにあなたの [Datadog Web サイト URL][3] を入力します。
1. **Done** をクリックします。

**注:** 標準の Datadog Web サイト URL を使用していない場合、SSO Base URL フィールドはカスタムサブドメインを受け入れます。

次に、Datadog にアップロードするためのメタデータ詳細をダウンロードします。
1. Okta の Datadog アプリケーションの設定ダイアログで、**Sign on** タブをクリックします。
1. **Metadata URL** が表示されるまでスクロールします。
1. **Copy** をクリックします。
1. 新しいブラウザタブを開き、アドレスバーにメタデータ URL を貼り付けます。
1. ブラウザを使用して、メタデータ URL の内容を XML ファイルとして保存します。

{{< img src="account_management/saml/okta/metadata_url.png" alt="Okta の Sign on 構成" style="width:80%;" >}}

### Datadog で

#### メタデータ詳細をアップロード

1. 組織設定の [Login Methods][4] に移動します。
1. SAML コンポーネントで、**Configure** または **Update** をクリックします (以前に SAML を構成したかどうかによります)。SAML 構成ページが表示されます。
1. **Choose File** をクリックし、先ほど Okta からダウンロードしたメタデータファイルを選択します。

{{< img src="account_management/saml/okta/choose_file.png" alt="Datadog の SAML 構成、メタデータアップロードボタンをハイライト" style="width:100%;" >}}

#### IdP 主導のログインを有効化

Datadog アプリケーションが正しく機能するためには、IdP 主導のログインを有効にする必要があります。

<div class="alert alert-info">IdP 主導のログインを有効化すると、ユーザーは Okta から Datadog にログインできます</div>

IdP によるログインを有効化するには、以下の手順を実行します。
1. [SAML 構成ページ][5]に移動します。
1. **Additional Features** の下で、**Identity Provider (IdP) Initiated Login** のチェックボックスをクリックします。コンポーネントに **Assertion Consumer Service URL** が表示されます。
1. Assertion Consumer Service URL の `/saml/assertion` の後のコンテンツがあなたの会社 ID です。この会社 ID をメモしておいてください。Okta で構成を完了するために入力する必要があります。
1. **Save Changes** をクリックします。

{{< img src="account_management/saml/okta/company_id.png" alt="Datadog における SAML 構成、Assertion Consumer Service URL の会社 ID 部分をハイライト" style="width:100%;" >}}

次の構成手順のために Okta に戻ります。

### Okta で

1. Okta 管理ダッシュボードに戻ります。
1. **Sign on** タブを選択します。
1. **Edit** をクリックします。
1. **Advanced Sign-on Settings** セクションまでスクロールダウンします。
1. あなたの会社 ID を **Company ID** フィールドに貼り付けます。会社 ID は `/id/xxxxx-xxxx-xxxx-xxxx-xxxxxxxxx` の形式になっているはずです。
1. **Save** をクリックします。

## サービスプロバイダー (SP) 主導のログイン

サービスプロバイダー主導のログイン (SP-initiated SSO) を使用して Datadog にログインするには、シングルサインオン (SSO) URL が必要です。SSO URL は、SAML 構成ページまたはメールで見つけることができます。

### SAML 構成ページ
Datadog の [SAML 構成ページ][5]で、SSO URL は **Single Sign-on URL** の見出しの横に表示されます。

### Email
1. 組織の Datadog Web サイト URL に移動します。
1. **Using Single Sign-On?** を選択します。
1. メールアドレスを入力し、**Next** をクリックします。
1. メールで送信されたメッセージを確認し、**Login URL** として記載されている SSO URL を探します。

いずれかの方法で SSO URL を見つけたら、ブックマークして後で参照できるようにしておいてください。

## SAML ロールマッピング

以下の手順に従って、Okta 属性を Datadog エンティティにマッピングします。この手順はオプションです。

1. Okta 管理ダッシュボードに移動します。
1. **Sign on** タブを選択します。
1. **Edit** をクリックします。
1. **Attributes** に[グループ属性ステートメント][6]を入力します。
1. Datadog で希望する[マッピング][7]を設定します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/faq/okta/
[2]: https://help.okta.com/en/prod/Content/Topics/Reference/glossary.htm
[3]: /ja/getting_started/site/#access-the-datadog-site
[4]: https://app.datadoghq.com/organization-settings/login-methods
[5]: https://app.datadoghq.com/organization-settings/login-methods/saml
[6]: /ja/account_management/faq/okta/#group-attribute-statements-optional
[7]: /ja/account_management/saml/mapping/