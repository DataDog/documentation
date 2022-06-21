---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Silk - Overview: assets/dashboards/silk_overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    Latency high: assets/recommended_monitors/latency_high.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- cloud
- data store
- プロビジョニング
creates_events: true
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/silk/README.md
display_name: Silk
draft: false
git_integration_title: silk
guid: 75648ebe-8ce3-4b08-bba2-2f957a7e94fa
integration_id: silk
integration_title: Silk
integration_version: 1.1.0
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: silk.
metric_to_check: silk.system.capacity.free
name: silk
public_title: Silk
short_description: Silk のパフォーマンスとシステム統計情報を監視します。
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックは、Datadog Agent を通じて [Silk][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Silk チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. Silk のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `silk.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル silk.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `silk` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "silk" >}}


### イベント

Silk インテグレーションは、Silk サーバーから発信されるイベントを記録します。イベントレベルは以下のようにマッピングされます。

| Silk                      | Datadog                            |
|---------------------------|------------------------------------|
| `INFO`                    | `info`                             |
| `ERROR`                   | `error`                            |
| `WARNING`                 | `warning`                          |
| `CRITICAL`                | `error`                            |


### サービスのチェック
{{< get-service-checks-from-git "silk" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。


[1]: https://silk.us/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/silk/datadog_checks/silk/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/silk/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/silk/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/