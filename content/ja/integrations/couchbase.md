---
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
  - 'https://github.com/DataDog/integrations-core/blob/master/couchbase/README.md'
display_name: Couchbase
git_integration_title: couchbase
guid: ba7ce7de-4fcb-4418-8c90-329baa6a5d59
integration_id: couchbase
integration_title: CouchBase
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: couchbase.
metric_to_check: couchbase.ram.used
name: couchbase
process_signatures:
  - beam.smp couchbase
public_title: Datadog-CouchBase インテグレーション
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

* データによって使用されるハードディスクとメモリ
* 現在の接続数
* オブジェクトの総数
* 毎秒の操作数
* ディスク書き込みキューサイズ

その他にも多数あります。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Couchbase チェックは [Datadog Agent][3] パッケージに含まれています。Couchbase ノードに追加でインストールする必要はありません。

### コンフィグレーション

1. Couchbase のパフォーマンス[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `couchbase.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル couchbase.d/conf.yaml][5] を参照してください。

#### メトリクスの収集

1.  [Couchbase のメトリクス](#metrics)の収集を開始するには、`couchbase.d/conf.yaml` ファイルに次の構成ブロックを追加します。

      ```
      init_config:

      instances:
        - server: http://localhost:8091 # or wherever your Couchbase is listening
          #username: <your_username>
          #password: <your_password>
      ```

2. [Agent を再起動][6]すると、Datadog への Couchbase メトリクスの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

    ```yaml
      logs_enabled: true
    ```

2. Apache のログの収集を開始するには、次の構成ブロックを `couchbase.d/conf.yaml` ファイルに追加します。

    ```yaml
      logs:
          - type: file
            path: /var/log/couchdb/couch.log
            source: couchdb
            service: couchbase
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。
    使用可能なすべての構成オプションの詳細については、[サンプル couchbase.d/conf.yaml][5] を参照してください。

3. [Agent を再起動します][6]。


### 検証

[Agent の `status` サブコマンドを実行][7]し、Checks セクションで `couchbase` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "couchbase" >}}


### イベント

Couchbase チェックは、クラスターのバランスが再調整されるたびに Datadog にイベントを送信します。

### サービスのチェック

- `couchbase.can_connect`:

Agent が Couchbase に接続してメトリクスを収集できない場合は、`Critical` を返します。

- `couchbase.by_node.cluster_membership`:

ノードがフェイルオーバーした場合は、`Critical` を返します。
ノードがクラスターに追加され、バランスの再調整を待っている場合は、`Warning` を返します。
それ以外の場合は、`OK` を返します。

- `couchbase.by_node.health_status`:

ノードが正常でない場合は、`Critical` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][9]までお問合せください。

## その他の参考資料


* [Couchbase のキーメトリクスの監視][10]。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/couchbase/images/couchbase_graph.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/couchbase/datadog_checks/couchbase/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/couchbase/metadata.csv
[9]: https://docs.datadoghq.com/ja/help
[10]: https://www.datadoghq.com/blog/monitoring-couchbase-performance-datadog


{{< get-dependencies >}}