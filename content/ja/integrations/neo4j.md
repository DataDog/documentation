---
app_id: neo4j
app_uuid: f2657bb8-ded4-48f3-8095-f703cc203149
assets:
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: neo4j.page_cache_hits_total
      metadata_path: metadata.csv
      prefix: neo4j.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Neo4j
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: 不明
  sales_email: neo4j-cloud@neotechnology.com
  support_email: neo4j-cloud@neotechnology.com
categories:
- data store
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/neo4j/README.md
display_on_public_website: true
draft: false
git_integration_title: neo4j
integration_id: neo4j
integration_title: Neo4j
integration_version: 2.0.0
is_public: true
kind: integration
manifest_version: 2.0.0
name: neo4j
oauth: {}
public_title: Neo4j
short_description: Neo4j のメトリクスを収集する
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
  - Category::Data Store
  configuration: README.md#Setup
  description: Neo4j のメトリクスを収集する
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Neo4j
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