---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- data store
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neo4j/README.md
display_name: Neo4j
draft: false
git_integration_title: neo4j
guid: a85ec8bb-e677-4089-ae8f-d1705c340131
integration_id: neo4j
integration_title: Neo4j
integration_version: 2.0.0
is_beta: false
is_public: true
kind: integration
maintainer: neo4j-cloud@neotechnology.com
manifest_version: 1.0.0
metric_prefix: neo4j.
metric_to_check: neo4j.page_cache_hits_total
name: neo4j
public_title: Datadog-Neo4j インテグレーション
short_description: Neo4j のメトリクスを収集する
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックは、Datadog Agent を介して [neo4j][1] を監視するものです。
この Agent を介して送信されるメトリクスとチェックを確認してください。Neo4j 4.0 以降では、複数のデータベースをサポートしているため、一部のメトリクスとチェックは公開されなくなりました。

## セットアップ


ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

neo4j チェックをホストにインストールするには

1. [Datadog Agent][3] をダウンロードしてインストールします。
2. neo4j チェックをホストにインストールするには

   ```shell
   datadog-agent integration install -t datadog-neo4j==<INTEGRATION_VERSION>
   ```


### コンフィギュレーション

1. neo4j のパフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `neo4j.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[neo4j.d/conf.yaml のサンプル][4]を参照してください。

2. neo4j_url は host に置き換えられました。更新の際には host を使用するようにしてください。

3. [Agent を再起動します][5]。

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `neo4j` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "neo4j" >}}


### サービスのチェック

サービスチェック `neo4j.prometheus.health` はベースチェックで送信されます

### イベント

neo4j には、イベントは含まれません。

## トラブルシューティング


ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。

[1]: https://neo4j.com/
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/datadog_checks/neo4j/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/metadata.csv
[8]: https://docs.datadoghq.com/ja/help