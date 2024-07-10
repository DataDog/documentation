---
app_id: zendesk
app_uuid: 8943eea8-230f-4b1b-9895-8d60d5593e7b
assets:
  dashboards:
    zendesk: assets/dashboards/zendesk_overview.json
  integration:
    auto_install: false
    events:
      creates_events: true
    metrics:
      check:
      - zendesk.ticket.count
      metadata_path: metadata.csv
      prefix: zendesk
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 146
    source_type_name: Zendesk
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- metrics
- log collection
- event management
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: zendesk
integration_id: zendesk
integration_title: Zendesk
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: zendesk
public_title: Zendesk
short_description: Zendesk はカスタマーサービスとサポートチケットの SaaS です。
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Metrics
  - Category::ログの収集
  - Category::Event Management
  configuration: README.md#Setup
  description: Zendesk はカスタマーサービスとサポートチケットの SaaS です。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Zendesk
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-internal-core -->
{{< img src="integrations/zendesk/zendesk_dash.png" alt="Zendesk ダッシュボード" popup="true">}}

## 概要

Zendesk は、お客様からの問い合わせを受け付け、追跡、応答するためのカスタマーサービスおよびサポートチケットプラットフォームです。このインテグレーションを有効にすると、Datadog でチケットメトリクスを確認したり、Datadog からチケットを作成および更新することができます。

Zendesk と統合して、以下のことができます。

- ステータス、ユーザー、満足度に基づいてチケットカウントメトリクスを監視し、グラフ化できます。
- 新しい Zendesk チケットが開かれるたびに、Datadog イベントを受け取ることができます。
- モニター通知で `@zendesk` メンションを使用してチケットを作成および更新します。
- [監査ログ][1]を収集することで、データ保持を管理し、[Cloud SIEM][2] の検出ルールを活用します。

## 計画と使用

### インフラストラクチャーリスト

このインテグレーションをインストールするには、Zendesk API トークンを生成します。

1. 左メニューの _Admin_ 歯車アイコンをクリックし、メニュー項目リストの _Channels_ セクションで _API_ を選択して API 設定ページに移動します。
2. トークンアクセスが有効になっていない場合は、有効にします。
3. プラス記号をクリックして新しいトークンを作成します。
4. API トークンの説明に、「Datadog-Zendesk Integration」などのわかりやすい内容を設定します。
5. API トークンをコピーします。**_重要_**: トークンは保存すると表示されなくなるため、一時的に保存しておく必要があります。
6. _Save_ をクリックします。

インテグレーションを完了するには、[Datadog][3] でユーザー情報を入力します。

1. [Zendesk インテグレーションタイル][4]に移動し、_Configuration_ タブをクリックします。
2. Zendesk ドメインを入力します。これは、`zendesk.com` の前に表示されるテキストです。たとえば、Zendesk URL が `https://my-company.zendesk.com` の場合、ドメインは `my-company` です。
3. Zendesk ユーザー名を入力します。
4. 上の手順 5 で受け取った Zendesk API トークンを入力します。
5. Install Integration ボタンをクリックします。

#### Zendesk RUM アプリのインストール

Datadog [リアルユーザーモニタリング][5]を使用すると、アプリのユーザーセッションを表示して、エンドユーザーのパフォーマンスとエラーを理解し、ボトルネックを特定し、長期的なユーザー分析の傾向を分析することができます。

Datadog RUM アプリを使用すると、サポートスタッフは、現在選択されている Zendesk チケットを作成したユーザーにリンクされている最近の Datadog RUM セッションを表示することができます。

{{< img src="integrations/zendesk/zendesk_rum_app_1.png" alt="Zendesk RUM アプリ" popup="true">}}

1. インテグレーションについては、[インストール手順][6]に従ってください。
2. Zendesk Marketplace の [Datadog RUM アプリ][7]に移動し、`Install` をクリックします。
3. アプリのインストール設定を構成します。
   1. Datadog API キーとアプリケーションキーは、[組織設定][8]にあります。これらのキーをそれぞれ貼り付けます。
   2. [Zendesk インテグレーションタイル][9] に移動し、**RUM App Settings** タブの下にある `Secret Key` をコピーします。このキーをアプリの `Secret Key` 設定の下に貼り付けます。
   3. [Datadog サイト][10]を入力します。例: `us1`、`eu1`、`us3`、`us5`、`ap1` または `fed`
4. [Zendesk インテグレーションタイル][9]に移動します。
5. **RUM App Settings** タブで、ドロップダウンリストからユーザーバインディングの値を選択します。これは、アプリが Zendesk チケットリクエスターから RUM セッションをクエリする際に使用するユーザー属性です。
6. **Save** をクリックします。
7. アカウントの Zendesk チケットに移動し、Datadog RUM サイドバーアプリをクリックして、ユーザーの RUM セッションを表示します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "zendesk" >}}


### ヘルプ

このインテグレーションは、新しい Zendesk チケットが開かれるたびにイベントを生成します。

{{< img src="integrations/zendesk/zendesk_event.png" alt="Datadog イベントエクスプローラーの Zendesk イベント" popup="true">}}

### ヘルプ

Zendesk インテグレーションには、サービスのチェック機能は含まれません。

## 機能

### チケットを作成

Zendesk チケットを作成してグループに割り当てることができます。まず、Datadog の [Zendesk インテグレーションタイル][4]でグループ名を追加し、次に Datadog モニターやアノテーションで `@zendesk-group-name` と入力します。たとえば、チケットを作成して _Support_ という Zendesk グループに割り当てるには、グループを追加して `@zendesk-support` と入力します。

## その他の参考資料

- ブログ記事: [Zendesk と Datadog セッションリプレイでユーザーが直面する問題を視覚的に再生する][12]

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

[1]: https://developer.zendesk.com/api-reference/ticketing/account-configuration/audit_logs/
[2]: https://app.datadoghq.com/security/home
[3]: https://app.datadoghq.com
[4]: https://app.datadoghq.com/account/settings#integrations/zendesk
[5]: https://docs.datadoghq.com/ja/real_user_monitoring/
[6]: https://docs.datadoghq.com/ja/integrations/zendesk/#installation
[7]: https://www.zendesk.com/marketplace/apps/support/993138/datadog/
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: https://app.datadoghq.com/integrations/zendesk
[10]: https://docs.datadoghq.com/ja/getting_started/site/
[11]: https://github.com/DataDog/dogweb/blob/prod/integration/zendesk/zendesk_metadata.csv
[12]: https://www.datadoghq.com/blog/zendesk-session-replay-integration/
[13]: https://docs.datadoghq.com/ja/help/