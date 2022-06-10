---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Avi Vantage - Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors:
    Avi Vantage - Error Rate Monitor: assets/monitors/error_rate_monitor.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- network
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/avi_vantage/README.md
display_name: Avi Vantage
draft: false
git_integration_title: avi_vantage
guid: 9c3b3e3f-5e3d-49a4-8d35-4192b135a654
integration_id: avi-vantage
integration_title: Avi Vantage
integration_version: 3.1.0
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: avi_vantage.
metric_to_check:
- avi_vantage.controller_stats.avg_cpu_usage
- avi_vantage.pool_healthscore
- avi_vantage.service_engine_healthscore
- avi_vantage.virtual_service_healthscore
name: avi_vantage
public_title: Avi Vantage
short_description: Avi Vantage インスタンスの健全性とパフォーマンスを監視。
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックは、Datadog Agent を通じて [Avi Vantage][1] を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Avi Vantage チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. avi_vantage のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `avi_vantage.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル avi_vantage.d/conf.yaml][4] を参照してください。

2. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションの `avi_vantage` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "avi_vantage" >}}


### イベント

Avi Vantage には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

[1]: https://avinetworks.com/why-avi/multi-cloud-load-balancing/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/datadog_checks/avi_vantage/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/avi_vantage/assets/service_checks.json
[9]: https://docs.datadoghq.com/ja/help/