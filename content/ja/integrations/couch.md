---
app_id: couchdb
app_uuid: 0a7006e2-c76d-4ef0-8af7-347bad2db768
assets:
  dashboards:
    couchdb: assets/dashboards/CouchDB-overview_dashboard.json
    couchdb-v1: assets/dashboards/CouchDBv1-overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - couchdb.couchdb.request_time.n
      - couchdb.couchdb.request_time
      metadata_path: metadata.csv
      prefix: couchdb.
    process_signatures:
    - couchjs
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 20
    source_type_name: CouchDB
  logs:
    source: couchdb
  saved_views:
    couchdb_processes: assets/saved_views/couchdb_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data stores
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/couch/README.md
display_on_public_website: true
draft: false
git_integration_title: couch
integration_id: couchdb
integration_title: CouchDB
integration_version: 6.2.0
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: couch
public_title: CouchDB
short_description: CouchDB のアクティビティとパフォーマンスのメトリクスを追跡およびグラフ化
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::キャッシュ
  - Category::Data Stores
  - Category::ログの収集
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: CouchDB のアクティビティとパフォーマンスのメトリクスを追跡およびグラフ化
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: CouchDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![CouchDB ダッシュボード][1]

## 概要

Datadog で CouchDB データをキャプチャすると、以下のことが可能です。

- CouchDB のキーメトリクスを視覚化できます。
- CouchDB のパフォーマンスをアプリケーションの他の部分と関連付けることができます。

パフォーマンス上の理由から、現在使用している CouchDB バージョンはキャッシュされます。そのため、同じ Agent インスタンスを使用して、異なるバージョンの CouchDB インスタンスを監視することはできません。

## 計画と使用

### インフラストラクチャーリスト

CouchDB チェックは [Datadog Agent][2] パッケージに含まれています。CouchDB サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

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

##### 収集データ

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
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                |
| -------------------- | ------------------------------------ |
| `<INTEGRATION_NAME>` | `couch`                              |
| `<INIT_CONFIG>`      | 空白または `{}`                        |
| `<INSTANCE_CONFIG>`  | `{"server": "http://%%host%%:5984"}` |

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                |
| -------------- | ---------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "couchdb", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `couch` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "couch" >}}


### ヘルプ

Couch チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "couch" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [Datadog を使用した CouchDB パフォーマンスの監視][5]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couch/images/couchdb_dashboard.png
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/monitoring-couchdb-with-datadog