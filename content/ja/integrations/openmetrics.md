---
app_id: openmetrics
app_uuid: 302b841e-8270-4ecd-948e-f16317a316bc
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: OpenMetrics
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- モニター
- オートディスカバリー
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/openmetrics/README.md
display_on_public_website: true
draft: false
git_integration_title: openmetrics
integration_id: openmetrics
integration_title: OpenMetrics
integration_version: 2.2.2
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: openmetrics
oauth: {}
public_title: OpenMetrics
short_description: OpenMetrics はメトリクスデータを公開するためのオープンな標準
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Monitoring
  - Category::Autodiscovery
  configuration: README.md#Setup
  description: OpenMetrics はメトリクスデータを公開するためのオープンな標準
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: OpenMetrics
---



## 概要

任意の OpenMetrics エンドポイントからカスタムメトリクスを抽出します。

<div class="alert alert-warning">All the metrics retrieved by this integration are considered <a href="https://docs.datadoghq.com/developers/metrics/custom_metrics">custom metrics</a>.</div>

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

OpenMetrics チェックは、[Datadog Agent のバージョン 6.6.0 以降][2]にパッケージ化されています。

### コンフィギュレーション

[Agent の構成ディレクトリ][3]のルートにある `openmetrics.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル openmetrics.d/conf.yaml][4] を参照してください。

それぞれのインスタンスには、以下のパラメーターが必要です。

| パラメーター        | 説明                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `openmetrics_endpoint` | OpenMetrics がアプリケーションメトリクスを公開する URL（一意でなければなりません）。                                                                                                                         |
| `namespace`      | すべてのメトリクスの先頭に追加するネームスペース。                                                                                                                                                                                                                                 |
| `metrics`        | カスタムメトリクスとして取得するメトリクスのリスト。各メトリクスを `metric_name` または `metric_name: renamed` としてリストに追加して、名前を変更します。メトリクスは正規表現として解釈されます。一致するすべてのメトリクスを取得するには、ワイルドカードとして `.*`（`metric.*`）を使用します。**注**: 正規表現は、多くのカスタムメトリクスを送信する可能性があります。 |

**注**: これは Datadog Agent バージョン 7.32.0 時点の新しいデフォルトの OpenMetrics チェックの例です。以前にこのインテグレーションを実装したことがある場合は、[レガシーの例][5]を参照してください。

**注**: Datadog Agent v7.32.0 から、[OpenMetrics 仕様標準][6]に準拠し、`_total` で終わるカウンター名は、サフィックス `_total` を除いて指定する必要があります。例えば、`promhttp_metric_handler_requests_total` を収集するには、メトリクス名 `promhttp_metric_handler_requests` を指定します。これにより、メトリクス名に `.count` を付加した `promhttp_metric_handler_requests.count` が Datadog に送信されます。

**注**: このチェックは、1 インスタンスあたり 2000 メトリクスの制限があります。返されたメトリクスの数は、Datadog Agent の [status コマンド][7]を実行した際に表示されます。構成を編集することで、関心のあるメトリクスを指定することができます。収集するメトリクスのカスタマイズ方法については、[Prometheus および OpenMetrics メトリクスの収集][8]で詳しく説明しています。より多くのメトリクスを監視する必要がある場合は、[Datadog サポート][9]にお問い合わせください。

その他のコンフィギュレーションについては、[Prometheus および OpenMetrics メトリクスの収集][8]を参照してください。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `openmetrics` を探します。

## 収集データ

### メトリクス

OpenMetrics チェックによって収集されたメトリクスはすべて、カスタムメトリクスとして Datadog に転送されます。

### イベント

OpenMetrics チェックには、イベントは含まれません。

### サービスのチェック

OpenMetrics チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

### 高いカスタムメトリクスの課金

OpenMetrics の構成において、`metrics` オプションに一般的なワイルドカード値を使用すると、カスタムメトリクスの課金に大きな影響を及ぼします。

Datadog では、より正確な収集のために、特定のメトリクス名またはメトリクス名の部分一致を使用することを推奨しています。

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

- [OpenMetrics チェックの構成][10]
- [カスタム OpenMetrics チェックの書き方][11]

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/getting_started/integrations/prometheus/?tab=docker#configuration
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[5]: https://github.com/DataDog/integrations-core/blob/7.30.x/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[6]: https://github.com/OpenObservability/OpenMetrics/blob/main/specification/OpenMetrics.md#suffixes
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/ja/getting_started/integrations/prometheus/
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://docs.datadoghq.com/ja/agent/openmetrics/
[11]: https://docs.datadoghq.com/ja/developers/openmetrics/