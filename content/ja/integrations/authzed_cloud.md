---
app_id: authzed-cloud
app_uuid: 01957258-b7bc-701c-b7f5-1ae15bba0209
assets:
  dashboards:
    Authzed Cloud Overview: assets/dashboards/authzed_cloud_overview.json
  integration:
    auto_install: true
    metrics:
      check:
      - authzed_cloud.metrics.up
      metadata_path: metadata.csv
      prefix: authzed_cloud
    process_signatures: []
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 42246681
    source_type_name: authzed_cloud
    supports_ddr_coordinated_failover: false
author:
  homepage: https://authzed.com
  name: AuthZed
  sales_email: sales@authzed.com
  support_email: support@authzed.com
  vendor_id: authzed
categories:
- 開発ツール
- security
- クラウド
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/authzed_cloud/README.md
display_on_public_website: true
draft: false
git_integration_title: authzed_cloud
integration_id: authzed-cloud
integration_title: AuthZed Cloud
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: authzed_cloud
public_title: AuthZed Cloud
short_description: AuthZed Cloud は、セキュリティ上重要なアプリケーションの権限を作成・管理するためのオープン コア型 データベース
  システムです。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Developer Tools
  - Category::Security
  - Category::Cloud
  - Offering::Integration
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Submitted Data Type::Metrics
  configuration: README.md#Setup
  description: AuthZed Cloudは、セキュリティ上重要なアプリケーションの権限を作成・管理するためのオープンコア型データベースシステムです。
  media:
  - caption: ダッシュボード例
    image_url: images/dd-dashboard.png
    media_type: image
  - caption: AuthZed Cloud の管理 UI
    image_url: images/management-ui.png
    media_type: image
  - caption: SpiceDB スキーマ プレイグラウンド
    image_url: images/playground.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: AuthZed Cloud
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[Authzed Cloud][1] は、セキュリティ上重要なアプリケーションの権限を作成・管理するためのオープン コア型 データベース システムで、[Google Zanzibar][2] に着想を得ています。

開発者は、権限の要件をモデル化したスキーマを定義します。次に、公式またはコミュニティ メンテナンスのクライアント ライブラリを使用してスキーマを適用し、データベースにデータを挿入します。開発者はこのデータを照会することで、アプリケーション内で効率的に権限をチェックできます。

Authzed Cloud のメトリクスにより、開発者や SRE は、リクエスト レイテンシー、キャッシュ メトリクス (サイズやヒット/ミス率など)、データ ストア接続およびクエリ パフォーマンスを含むデプロイメントを監視できます。これらのメトリクスは、パフォーマンス問題の診断や SpiceDB クラスターのパフォーマンスの微調整に役立ちます。

これらのメトリクスを Datadog に送信することで、ユーザーは既存の可観測性スタックを活用し、Authzed Cloud のメトリクスを他のシステム イベントと相関付けできます。

## セットアップ

Datadog のインテグレーションは、AuthZed Dashboard の Permission System の「Settings」タブで利用できます。

1.  ダッシュボードのホーム ページに移動します。
2.  メトリクスの送信先となる Permission System を選択します。
2.  **Settings** タブをクリックします。
3.  設定 UI の **Datadog Metrics** ブロックまで下にスクロールします。
4.  Datadog アカウントの **API キー**を入力します。
5.  デフォルトと異なる場合は、[Datadog サイト][3]を入力します。
6.  **Save** をクリックします。

ダッシュボードのレイテンシー グラフに p50、p95、p99 のレイテンシーが正しく表示されるようにするには、**Metrics Summary** ビューで `authzed.grpc.server_handling` メトリクスの **Percentiles** を **ON** にする必要があります。 

その後まもなく、Datadog へのメトリクス送信が始まるはずです。反映されない場合は、[サポート][4]までご連絡ください。

## アンインストール

Datadog のインテグレーションは、AuthZed Dashboard の Permission System の **Settings** タブで利用できます。

1.  ダッシュボードのホームページに移動します。
2.  メトリクスの送信先となる Permission System を選択します。
2.  **Settings** タグをクリックします。
3.  設定 UI の **Datadog Metrics** ブロックまで下へスクロールします。
4.  **Remove** をクリックします。

これにより、AuthZed Cloud クラスターの Datadog インテグレーションが無効になります。処理には数分かかる場合があります。

## サポート

ご不明な点は、[AuthZed のサポートチーム][5]にお問い合わせください。


[1]: https://authzed.com/products/authzed-dedicated
[2]: https://authzed.com/zanzibar
[3]: https://docs.datadoghq.com/ja/getting_started/site/
[4]: https://app.datadoghq.com/support@authzed.com
[5]: mailto:support@authzed.com