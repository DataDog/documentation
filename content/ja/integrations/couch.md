---
aliases:
  - /ja/integrations/couchdb
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    couchdb: assets/dashboards/overview.json
  logs:
    source: couchdb
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    couchdb_processes: assets/saved_views/couchdb_processes.json
  service_checks: assets/service_checks.json
categories:
  - data store
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/couch/README.md
description: Apache CouchDB は、MapReduce 方式で JavaScript を使用してクエリおよびインデックスを作成できるドキュメント指向のデータベースです。
display_name: CouchDB
draft: false
git_integration_title: couch
guid: 9e7ed68c-669a-40f0-8564-548d49aa8098
integration_id: couchdb
integration_title: CouchDB
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: couch.
metric_to_check:
  - couchdb.couchdb.request_time.n
  - couchdb.couchdb.request_time
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

- CouchDB のキーメトリクスを視覚化できます。
- CouchDB のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

パフォーマンス上の理由から、現在使用している CouchDB バージョンはキャッシュされます。そのため、同じ Agent インスタンスを使用して、異なるバージョンの CouchDB インスタンスを監視することはできません。

## セットアップ

### インストール

CouchDB チェックは [Datadog Agent][2] パッケージに含まれています。CouchDB サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. CouchDB のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `couch.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル couch.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param server - string - required
     ## The Couch server's url.
     #
     - server: http://localhost:5984
   ```

    **注**: `db_include` と `db_exclude` を指定して、どのデータベースから Agent がメトリクスを収集する/しないを制御できます。

2. [Agent を再起動します][3]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

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
       service: couch
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル couch.d/conf.yaml][2] を参照してください。

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/couch/datadog_checks/couch/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                |
| -------------------- | ------------------------------------ |
| `<インテグレーション名>` | `couch`                              |
| `<初期コンフィギュレーション>`      | 空白または `{}`                        |
| `<インスタンスコンフィギュレーション>`  | `{"server": "http://%%host%%:5984"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "couchdb", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `couch` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "couch" >}}


### イベント

Couch チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "couch" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [Datadog を使用した CouchDB パフォーマンスの監視][5]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couch/images/couchdb_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog