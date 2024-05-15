---
app_id: datadog-cluster-agent
app_uuid: b6c2b71b-38c9-4769-86ad-516953849236
assets:
  dashboards:
    Datadog Cluster Agent - Overview: assets/dashboards/datadog_cluster_agent_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: datadog.cluster_agent.api_requests
      metadata_path: metadata.csv
      prefix: datadog.cluster_agent.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10108
    source_type_name: Datadog Cluster Agent
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- containers
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/README.md
display_on_public_website: true
draft: false
git_integration_title: datadog_cluster_agent
integration_id: datadog-cluster-agent
integration_title: Datadog Cluster Agent
integration_version: 3.1.0
is_public: true
kind: integration
manifest_version: 2.0.0
name: datadog_cluster_agent
public_title: Datadog Cluster Agent
short_description: Datadog Cluster Agent のメトリクスを追跡
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
  - Category::Containers
  configuration: README.md#Setup
  description: Datadog Cluster Agent のメトリクスを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Datadog Cluster Agent
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは、Datadog Agent を通じて [Datadog Cluster Agent][1] を監視します。

## 計画と使用

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インフラストラクチャーリスト

Datadog-Cluster-Agent チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

1. datadog_cluster_agent のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `datadog_cluster_agent.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル datadog_cluster_agent.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `datadog_cluster_agent` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "datadog_cluster_agent" >}}


### ヘルプ

Datadog_Cluster_Agent インテグレーションには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "datadog_cluster_agent" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://docs.datadoghq.com/ja/agent/cluster_agent/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/datadog_checks/datadog_cluster_agent/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/metadata.csv
[7]: https://github.com/DataDog/integrations-core/blob/master/datadog_cluster_agent/assets/service_checks.json
[8]: https://docs.datadoghq.com/ja/help/