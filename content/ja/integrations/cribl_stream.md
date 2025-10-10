---
app_id: cribl-stream
app_uuid: 2ef15aea-af91-4769-940c-2b124e4d04a6
assets:
  dashboards:
    cribl_stream_overview: assets/dashboards/cribl_stream_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: cribl.logstream.health.outputs
      metadata_path: metadata.csv
      prefix: cribl.logstream.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10391
    source_type_name: Cribl
author:
  homepage: https://cribl.io
  name: Cribl
  sales_email: sales@cribl.io
  support_email: support@cribl.io
categories:
- AWS
- Azure
- クラウド
- incident-teams
- kubernetes
- Google Cloud
- ログの収集
- セキュリティ
- モニター
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/cribl_stream/README.md
display_on_public_website: true
draft: false
git_integration_title: cribl_stream
integration_id: cribl-stream
integration_title: Cribl Stream
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: cribl_stream
public_title: Cribl Stream
short_description: ベンダーに依存しないデータテレメトリーパイプラインで可観測性データを収集します
supported_os:
- linux
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::Windows
  - Submitted Data Type::Metrics
  - Category::AWS
  - Category::Azure
  - Category::Cloud
  - Category::Containers
  - Category::Kubernetes
  - Category::Google Cloud
  - Category::Log Collection
  - Category::Security
  - Category::Metrics
  - Offering::Integration
  configuration: README.md#Setup
  description: ベンダーに依存しないデータテレメトリーパイプラインで可観測性データを収集します
  media:
  - caption: 可観測性がすべてを変える
    image_url: images/observability_changes.png
    media_type: ビデオ
    vimeo_id: 567294419
  - caption: Datadog 用 Cribl Stream ダッシュボード
    image_url: images/cribl_dashboard_for_datadog.png
    media_type: image
  overview: README.md#Overview
  support: README.md#Support
  title: Cribl Stream
  uninstallation: README.md#Uninstallation
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要
[Cribl Stream][1] は、機械データのログ、インスツルメンテーションデータ、アプリケーションデータ、メトリクスをリアルタイムで処理し、任意の分析プラットフォームへ配信するのを支援します。次のようなことが可能です。

- 外部データソースからの情報を付加してデータを強化し、コンテキストを追加する
- 機密フィールドをマスク、難読化、または暗号化してデータを保護する
- パフォーマンスやコスト要件に応じてデータを最適化する

これはセルフホステッド版 Cribl Stream 向けの手順です。

標準で用意されているダッシュボードを使用すると、1 秒あたりのイベント数、1 秒あたりのバイト数、入力タイプ、出力タイプ、インフラメトリクスなどの基本メトリクスを用いて Stream のパフォーマンスを可視化できます。イベントまたはバイト数ごとの削減率をモニタリングし、検索パフォーマンスの向上や分析システムのライセンスおよびインフラコストの削減に役立てることができます。

## セットアップ
Cribl Stream の[内部メトリクス][2]を Datadog API に送信できます。

### インストール

#### Datadog
組織設定の [_API Keys_][3] に移動し、Cribl がデータを送信するための API キーを作成します。

#### Cribl
1. Cribl で _Quick Connects_ に移動し、_+Add Source_ ボタンをクリックします。
![step1][4]
2. _System Internal_ までスクロールし、_Cribl Internal_ にカーソルを合わせて _Select Existing_ を選択します。_CriblLogs_ と _CriblMetrics_ の両方を有効にします。
 - **注**: この 2 つのソースは **Routes** ではなく **Quick Connect** が有効になっている必要があります。
![step3][5]

3. _+Add Destination_ ボタンをクリックします。
4. _Datadog_ タイルまでスクロールし、_+Add New_ をクリックします。
5. 入力に名前を付けます (例: Cribl_Datadog)。
![step4][6]

6. 次に、_Datadog API Key_ を入力し、使用している Datadog サイトを選択します。
7. 必要に応じて Datadog タグや、メッセージフィールド、ソース、ホスト情報を追加します。詳細については [Cribl Datadog Destination のドキュメント][7]を参照してください。
8. _Save_ をクリックします。
10. _CriblMetrics_ を Datadog 宛先に接続するために _Passthru_ を選択します。
![step5][8]

![complete][9]

## アンインストール
Cribl Stream ダッシュボードの設定で [delete dashboard][10] オプションを使用して Cribl Stream ダッシュボードを削除できます。Datadog 宛先を Cribl Stream デプロイから削除することで、データ送信を停止します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "cribl_stream" >}}

### イベント
Cribl Stream インテグレーションにはイベントは含まれていません。
### サービスチェック
Cribl Stream インテグレーションにはサービスチェックは含まれていません。

## トラブルシューティング
サポートが必要ですか？[Cribl Support][12] までお問い合わせください。

[1]: https://cribl.io/stream
[2]: http://docs.cribl.io/logstream/sources-cribl-internal/
[3]: https://app.datadoghq.com/organization-settings/api-keys
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_1.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_3.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_4.png
[7]: https://docs.cribl.io/stream/destinations-datadog
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_6.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/cribl_stream/images/cribl_dd_5.png
[10]: https://docs.datadoghq.com/ja/dashboards/#delete-dashboard
[11]: https://github.com/DataDog/integrations-extras/blob/master/cribl_stream/metadata.csv
[12]: https://cribl.io/support