---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - モニター
  - オートディスカバリー
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/openmetrics/README.md'
display_name: OpenMetrics
draft: false
git_integration_title: openmetrics
guid: 3f67af75-6987-468c-99b3-5001ba5ab414
integration_id: openmetrics
integration_title: OpenMetrics
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
name: openmetrics
public_title: Datadog-OpenMetrics インテグレーション
short_description: OpenMetrics はメトリクスデータを公開するためのオープンな標準
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

任意の OpenMetrics エンドポイントからカスタムメトリクスを抽出します。

<div class="alert alert-warning">All the metrics retrieved by this integration are considered <a href="https://docs.datadoghq.com/metrics/custom_metrics">custom metrics</a>.</div>

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照してこの手順を行ってください。

### インストール

OpenMetrics チェックは、[Datadog Agent のバージョン 6.6.0 以降][2]にパッケージ化されています。

### コンフィギュレーション

[Agent の構成ディレクトリ][3]のルートにある `openmetrics.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル openmetrics.d/conf.yaml][4] を参照してください。

それぞれのインスタンスには、以下のパラメーターが必要です。

| パラメーター        | 説明                                                                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `prometheus_url` | Prometheus がアプリケーションメトリクスを公開する URL（一意でなければなりません）。                                                                                                                                                                                       |
| `namespace`      | すべてのメトリクスの先頭に追加するネームスペース。                                                                                                                                                                                                                                 |
| `metrics`        | カスタムメトリクスとして取得するメトリクスのリスト。各メトリクスを `metric_name` または `metric_name: renamed` としてリストに追加して、名前を変更します。一致するすべてのメトリクスを取得するには、ワイルドカードとして `*`（`metric*`）を使用します。**注**: ワイルドカードは、多くのカスタムメトリクスを送信する可能性があります。 |

その他の構成については、[Prometheus および OpenMetrics メトリクスの収集][5]を参照してください。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `openmetrics` を探します。

## 収集データ

### メトリクス

OpenMetrics チェックによって収集されたメトリクスはすべて、カスタムメトリクスとして Datadog に転送されます。

### イベント

OpenMetrics チェックには、イベントは含まれません。

### サービスのチェック

OpenMetrics チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

## その他の参考資料

- [OpenMetrics チェックの構成][8]
- [カスタム OpenMetrics チェックの書き方][9]

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/getting_started/integrations/prometheus/?tab=docker#configuration
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/openmetrics/datadog_checks/openmetrics/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/prometheus/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://docs.datadoghq.com/ja/agent/openmetrics/
[9]: https://docs.datadoghq.com/ja/developers/openmetrics/