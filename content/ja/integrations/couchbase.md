---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    couchbase: assets/dashboards/couchbase_dashboard.json
  logs:
    source: couchdb
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    couchbase_processes: assets/saved_views/couchbase_processes.json
  service_checks: assets/service_checks.json
categories:
- data store
- autodiscovery
- log collection
creates_events: false
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/couchbase/README.md
display_name: Couchbase
draft: false
git_integration_title: couchbase
guid: ba7ce7de-4fcb-4418-8c90-329baa6a5d59
integration_id: couchbase
integration_title: CouchBase
integration_version: 2.1.0
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: couchbase.
metric_to_check: couchbase.ram.used
name: couchbase
process_signatures:
- beam.smp couchbase
public_title: CouchBase インテグレーション
short_description: Couchbase のアクティビティとパフォーマンスのメトリクスを追跡およびグラフ化
support: コア
supported_os:
- linux
- mac_os
- windows
---



![Couchbase 読み取りバイト数][1]

## 概要

ビジー状態のバケットを特定したり、キャッシュミス率を追跡することができます。この Agent チェックは、以下のようなメトリクスを収集します。

- データによって使用されるハードディスクとメモリ
- 現在の接続数
- オブジェクトの総数
- 毎秒の操作数
- ディスク書き込みキューサイズ

その他にも多数あります。

## セットアップ

### インストール

Couchbase チェックは [Datadog Agent][2] パッケージに含まれています。Couchbase ノードに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. Couchbase のデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `couchbase.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル couchbase.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param server - string - required
     ## The server's url.
     #
     - server: http://localhost:8091
   ```

2. [Agent を再起動します][3]。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

   ```yaml
   logs_enabled: true
   ```

2. Couchbase のログの収集を開始するには、次の構成ブロックを `couchbase.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /opt/couchbase/var/lib/couchbase/logs/couchdb.log
       source: couchdb
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル couchbase.d/conf.yaml][2] を参照してください。

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                |
| -------------------- | ------------------------------------ |
| `<インテグレーション名>` | `couchbase`                          |
| `<初期コンフィギュレーション>`      | 空白または `{}`                        |
| `<インスタンスコンフィギュレーション>`  | `{"server": "http://%%host%%:8091"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][3]し、Checks セクションで `couchbase` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "couchbase" >}}


### イベント

Couchbase チェックは、クラスターのバランスが再調整されるたびに Datadog にイベントを送信します。

### サービスのチェック
{{< get-service-checks-from-git "couchbase" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。

## その他の参考資料

- [Couchbase のキーメトリクスの監視][5]。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couchbase/images/couchbase_graph.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog