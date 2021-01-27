---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/neo4j/README.md'
display_name: Neo4j
draft: false
git_integration_title: neo4j
guid: a85ec8bb-e677-4089-ae8f-d1705c340131
integration_id: neo4j
integration_title: Neo4j
is_public: true
kind: インテグレーション
maintainer: help@neo4j.com
manifest_version: 1.0.0
metric_prefix: neo4j.
name: neo4j
public_title: Datadog-Neo4j インテグレーション
short_description: Neo4j Enterprise とのインテグレーションによりサーバーパフォーマンスを監視。
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Neo4j サービスからメトリクスをリアルタイムに取得して、以下のことができます。

- Neo4j の状態を視覚化および監視できます。
- Neo4j のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

Neo4j チェックは [Datadog Agent][1] パッケージに**含まれていません**。

### インストール

Agent v6.8 以降を使用している場合は、以下の手順に従って、ホストに Neo4j チェックをインストールしてください。[バージョン 6.8 以前の Agent][3] または [Docker Agent][4] でチェックをインストールする場合は、[コミュニティインテグレーションのインストール][2]に関する Agent のガイドを参照してください。

1. [Datadog Agent をダウンロードして起動][1]します。
2. 次のコマンドを実行して、Agent でインテグレーション Wheel をインストールします。

   ```shell
   datadog-agent integration install -t datadog-neo4j==<INTEGRATION_VERSION>
   ```

3. [他のパッケージ化されたインテグレーション][5]と同様にインテグレーションを構成します。

### コンフィギュレーション

1. Neo4j の[メトリクス](#メトリクスの収集)を収集するには、[Agent のコンフィギュレーションディレクトリ][6]のルートにある `conf.d/` フォルダーで `neo4j.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル neo4j.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

## 検証

[Agent の `status` サブコマンドを実行][9]し、Checks セクションで `neo4j` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "neo4j" >}}


### イベント

Neo4j チェックには、イベントは含まれません。

### サービスのチェック

この Neo4j チェックは、収集するすべてのサービスチェックに次のタグを付けます。

- `server_name:<server_name_in_yaml>`
- `url:<neo4j_url_in_yaml>`

`neo4j.can_connect`:
Agent が _monitoring_ エンドポイントから 200 を受信できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=agentpriorto68
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent/?tab=docker
[5]: https://docs.datadoghq.com/ja/getting_started/integrations/
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/datadog_checks/neo4j/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#service-status
[10]: https://github.com/DataDog/integrations-extras/blob/master/neo4j/metadata.csv
[11]: http://docs.datadoghq.com/help