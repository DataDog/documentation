---
aliases:
  - /ja/integrations/zookeeper
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: zookeeper
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - orchestration
  - notification
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/zk/README.md'
display_name: ZooKeeper
git_integration_title: zk
guid: 5519c110-5183-438e-85ad-63678c072ac7
integration_id: zookeeper
integration_title: ZooKeeper
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: zookeeper.
metric_to_check: zookeeper.connections
name: zk
process_signatures:
  - zkServer.sh start
  - java zoo.cfg
public_title: Datadog-ZooKeeper インテグレーション
short_description: クライアント接続とレイテンシーを追跡し、リクエストの遅延状況を把握。
support: コア
supported_os:
  - linux
  - mac_os
---
![Zookeeper ダッシュボード][1]

## 概要

Zookeeper チェックは、クライアント接続とレイテンシーの追跡、未処理リクエスト数の監視などを行います。

## セットアップ

### インストール

Zookeeper チェックは [Datadog Agent][2] パッケージに含まれています。Zookeeper サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### Zookeepr のホワイトリスト

バージョン 3.5 以降、Zookeeper で [4 文字コマンド][4]をホワイトリストに登録する `4lw.commands.whitelist` パラメーターを利用できるようになりました ([Zookeeper のドキュメント][3]を参照してください)。デフォルトでは、`srvr` だけがホワイトリストされています。このインテグレーションは `stat` および `mntr` コマンドに基づいているため、これらのコマンドを ホワイトリストに登録してください。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. Zookeeper の[メトリクス](#メトリクスの収集)と[ログ](#ログ収集)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `zk.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル zk.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Zookeeper はデフォルトで `log4j` ロガーを使用します。ファイルへのログ記録をアクティブにし、フォーマットをカスタマイズするには、`log4j.properties` ファイルを編集します。

   ```text
     # Set root logger level to INFO and its only appender to R
     log4j.rootLogger=INFO, R
     log4j.appender.R.File=/var/log/zookeeper.log
     log4j.appender.R.layout=org.apache.log4j.PatternLayout
     log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n
   ```

2. Datadog のインテグレーションパイプラインは、デフォルトで、次の変換パターンをサポートします。

   ```text
     %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
     %d [%t] %-5p %c - %m%n
     %r [%t] %p %c %x - %m%n
   ```

    別の形式に対応する場合は、インテグレーションパイプラインを複製して編集してください。

3. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

4. `zk.d/conf.yaml` の下部にある、コンフィギュレーションブロックのコメントを解除して編集します。

   ```yaml
   logs:
     - type: file
       path: /var/log/zookeeper.log
       source: zookeeper
       service: myapp
       #To handle multi line that starts with yyyy-mm-dd use the following pattern
       #log_processing_rules:
       #  - type: multi_line
       #    name: log_start_with_date
       #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
   ```

    `path` および `service` パラメーターの値を変更し、環境に合わせて構成します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル zk.d/conf.yaml][2] を参照してください。

5. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/zk/datadog_checks/zk/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                  |
| -------------------- | -------------------------------------- |
| `<インテグレーション名>` | `zk`                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                          |
| `<インスタンスコンフィギュレーション>`  | `{"host": "%%host%%", "port": "2181"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                           |
| -------------- | ----------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "zookeeper", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `zk` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "zk" >}}


#### 非推奨メトリクス

次のメトリクスは引き続き送信されますが、今後削除される予定です。

- `zookeeper.bytes_received`
- `zookeeper.bytes_sent`

### イベント

Zookeeper チェックには、イベントは含まれません。

### サービスのチェック

**zookeeper.ruok**:<br>
監視対象ノードに `ruok` を送信します。`imok` 応答には `OK`、別の応答には `WARN`、応答がない場合は `CRITICAL` を返します。

**zookeeper.mode**:<br>
`zk.yaml` で `expected_mode` が構成されている場合、Agent はこのサービスチェックを送信します。Zookeeper の実際のモードが `expected_mode` と一致する場合は `OK` を返し、それ以外の場合は `CRITICAL` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/zk/images/zk_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_clusterOptions
[4]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_4lw
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/