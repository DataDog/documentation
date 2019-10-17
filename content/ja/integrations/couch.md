---
aliases:
  - /ja/integrations/couchdb
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/couch/README.md'
description: Apache CouchDB は、問い合わせ可能なドキュメント指向のデータベース indexed using JavaScript in a MapReduce fashion.
display_name: CouchDB
git_integration_title: couch
guid: 9e7ed68c-669a-40f0-8564-548d49aa8098
integration_id: couchdb
integration_title: CouchDB
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: couch.
metric_to_check: couchdb.couchdb.request_time
name: couch
process_signatures:
  - couchjs
public_title: Datadog-CouchDB インテグレーション
short_description: CouchDB のアクティビティとパフォーマンスのメトリクスを追跡およびグラフ化
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![CouchDB ダッシュボード][1]

## 概要

Datadog で CouchDB データをキャプチャすると、以下のことが可能です。

* CouchDB のキーメトリクスを視覚化できます。
* CouchDB のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

パフォーマンス上の理由から、現在使用している CouchDB バージョンはキャッシュされます。そのため、同じ Agent インスタンスを使用して、異なるバージョンの CouchDB インスタンスを監視することはできません。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

CouchDB チェックは [Datadog Agent][3] パッケージに含まれています。CouchDB サーバーに追加でインストールする必要はありません。

### コンフィグレーション

#### メトリクスの収集

1. CouchDB のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `couch.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル couch.d/conf.yaml][5] を参照してください。

2. [CouchDB のメトリクス](#metrics)の収集を開始するには、`couch.d/conf.yaml` ファイルに次の構成ブロックを追加します。

      ```yaml
      init_config:

      instances:
        - server: http://localhost:5984 # or wherever your CouchDB is listening
        #username: <your_username>
        #password: <your_password>
        #name: <A node's Erlang name> # Only for CouchDB 2.x
        #max_nodes_per_check: If no name is specified, the agent will scan all nodes up. As that may be very long, you can limit how many to collect per check. Default: 20
        #max_dbs_per_check. Maximum number of databases to report on. Default: 50
        #tags: A list of tags applied to all metrics collected. Tags may be simple strings or key-value pairs. Default: []
      ```

    オプションで、`db_whitelist` と `db_blacklist` を指定して、どのデータベースから Agent がメトリクスを収集する/しないを制御できます。

3. [Agent を再起動][6]すると、Datadog への CouchDB メトリクスの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

    ```yaml
      logs_enabled: true
    ```

2. CouchDB のログの収集を開始するには、次の構成ブロックを `couch.d/conf.yaml` ファイルに追加します。

    ```yaml
      logs:
          - type: file
            path: /var/log/couchdb/couch.log
            source: couchdb
            sourcecategory: database
            service: couch
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル couch.d/conf.yaml][5] を参照してください。

3. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `couch` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "couch" >}}


### イベント

Couch チェックには、イベントは含まれません。

### サービスのチェック

**couchdb.can_connect**:<br>
Agent が CouchDB に接続してメトリクスを収集できない場合は、`Critical` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

## その他の参考資料

* [Datadog を使用した CouchDB パフォーマンスの監視][10]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couch/images/couchdb_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/couch/metadata.csv
[9]: https://docs.datadoghq.com/ja/help
[10]: https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog


{{< get-dependencies >}}