---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - orchestration
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/README.md'
display_name: Cloud Foundry API
draft: false
git_integration_title: cloud_foundry_api
guid: 82e5b924-c8c3-4467-bfde-5838857b6447
integration_id: cloud-foundry-api
integration_title: Cloud Foundry API
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cloud_foundry_api.
metric_to_check: ''
name: cloud_foundry_api
public_title: Datadog-Cloud Foundry API インテグレーション
short_description: Cloud Foundry 監査イベントの収集。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、[Cloud Foundry API][1] にクエリを実行して監査イベントを収集し、Agent 経由で Datadog に送信します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Cloud Foundry API チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. Cloud Foundry API のデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `cloud_foundry_api.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル cloud_foundry_api.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `cloud_foundry_api` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cloud_foundry_api" >}}


### イベント

Cloud Foundry API インテグレーションは、構成された監査イベントを収集します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: http://v3-apidocs.cloudfoundry.org
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations
[3]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/datadog_checks/cloud_foundry_api/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/cloud_foundry_api/assets/service_checks.json
[8]: https://docs.datadoghq.com/ja/help