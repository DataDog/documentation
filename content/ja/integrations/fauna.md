---
app_id: fauna
app_uuid: 2be7cc0c-a21f-43ad-b2b7-3f41a98ad299
assets:
  dashboards:
    Fauna Overview: assets/dashboards/fauna_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21173861
    source_type_name: Fauna
  oauth: assets/oauth_clients.json
author:
  homepage: https://fauna.com/
  name: Fauna
  support_email: support@fauna.com
categories:
- クラウド
- data stores
- ログの収集
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/fauna/README.md
display_on_public_website: true
draft: false
git_integration_title: fauna
integration_id: fauna
integration_title: Fauna
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: fauna
public_title: Fauna
short_description: Fauna のクエリログを Datadog にインポートします。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Category::Cloud
  - Category::Data Stores
  - Category::Log Collection
  - Offering::Integration
  - Submitted Data Type::Logs
  configuration: README.md#Setup
  description: Fauna のクエリログを Datadog にインポートします。
  media:
  - caption: Fauna ダッシュボード概要
    image_url: images/fauna_dashboard_overview.png
    media_type: image
  - caption: Fauna ダッシュボードグラフ
    image_url: images/fauna_dashboard_2.png
    media_type: image
  - caption: Fauna ダッシュボードログ
    image_url: images/fauna_dashboard_logs.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Fauna
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

Fauna は、フルマネージドかつ分散型のドキュメント・リレーショナルデータベースです。このインテグレーションを使用すると、Fauna データベースのクエリログを Datadog にストリーミングできます。これによりクエリをリアルタイムで確認でき、クエリに関する以下の情報を参照できます。
1. Fauna コスト指標
   1. Read Ops
   2. Write Ops
   3. Compute Ops
2. クエリ時間
3. クエリサイズ指標
   1. リクエストとレスポンスのサイズ
4. クエリの形状 (Query shape)
   1. 個人を特定できる情報 (PII) を除外したリクエスト本文全体
5. クエリのレスポンスコード

利用可能なログフィールドの全リストについては、[Fauna Query Log Record Format][1] を参照してください。

## セットアップ

### インストール

1. [Fauna インテグレーション タイル][2] の「Connect Accounts」ボタンをクリックし、OAuth フローを開始して Fauna と Datadog のアカウントを接続します。
2. その後、Fauna にリダイレクトされるので、接続したいアカウントでログインします。既に Fauna アカウントにログインしている場合は、この手順をスキップできます。
3. Fauna の「Create Integration」ページにリダイレクトされるので、Datadog にログをストリーミングしたいリージョングループやデータベースを選択します。選択したら **Create** をクリックしてください。
4. Datadog に移動したら、**Authorize** をクリックし、Fauna がデータベースのクエリログを送信するために使用する API キーを作成することを許可します。

このフローが完了すると、[Fauna Integrations Page][3] にリダイレクトされ、アクティブなインテグレーションが表示されます。

次の 10 分以内に、設定したリージョングループやデータベースに対して発行されたクエリのログが [Fauna Overview Dashboard][4] に表示され始めます。
上記のクエリは [Datadog Log Explorer][5] の ‘fauna’ サービスの欄にも表示され始めるはずです。

### 構成

Fauna インテグレーションでは以下の設定が可能です。

1. どのリージョングループのクエリログを Datadog に送信するか
   1. リージョングループがインテグレーションで有効になっている場合、そのリージョングループ内のすべてのデータベースのクエリログが送信されます。
2. どのデータベースからクエリログを送信するか
3. インテグレーションの状態 (アクティブまたは一時停止)
一時停止するとログは送信されません。

[Fauna Integrations Page][3] で設定内容を変更したり、インテグレーションを削除したりできます。

設定内容が [Fauna Overview Dashboard][4] と [Datadog Log Explorer][5] に反映されるまで最大 10 分ほどかかる場合があります。

### 検証

正しく設定されていれば、10 分以内に [Fauna Overview Dashboard][4] でログが確認できるほか、[Datadog Log Explorer][5] の ‘fauna’ サービスにもログが表示されるようになります。

### アンインストール
 - [Fauna Integrations Page][3] にアクセスして Datadog インテグレーションを削除できます。
 - このインテグレーションをアンインストールすると、それ以前に与えられた認可は全て取り消されます。
 - また、[API Keys ページ][6]でインテグレーション名を検索して、このインテグレーションに紐付けられた全ての API キーが無効になったことを確認してください。

## 収集データ

### Logs

Fauna は、インテグレーションで設定されたデータベース内のすべてのクエリのログを含みます。
インテグレーションがリージョングループで構成されている場合は、そのリージョングループ内のすべてのデータベースのクエリログが含まれます。

## トラブルシューティング

サポートが必要な場合は [Fauna サポート][7]にお問い合わせください。

[1]: https://docs.fauna.com/fauna/current/tools/query_log/reference/log_reference
[2]: https://app.datadoghq.com/integrations/fauna
[3]: https://dashboard.fauna.com/resources/integrations
[4]: https://app.datadoghq.com/dashboard/lists?q=Fauna%20Overview
[5]: https://docs.datadoghq.com/ja/logs/explorer/
[6]: https://app.datadoghq.com/organization-settings/api-keys
[7]: mailto:support@fauna.com