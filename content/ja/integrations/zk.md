---
aliases:
  - /ja/integrations/zookeeper
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - orchestration
  - notification
  - log collection
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
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: zookeeper.
metric_to_check: zookeeper.connections
name: zk
process_signatures:
  - zkServer.sh start
  - java zoo.cfg
public_title: Datadog-ZooKeeper インテグレーション
short_description: クライアント接続とレイテンシーを追跡し、リクエストの渋滞を把握 are backing up.
support: コア
supported_os:
  - linux
  - mac_os
---
![Zookeeper ダッシュボード][1]

## 概要

Zookeeper チェックは、クライアント接続とレイテンシーの追跡、未処理リクエスト数の監視などを行います。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Zookeeper チェックは [Datadog Agent][3] パッケージに含まれています。Zookeeper サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. Zookeeper の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `zk.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル zk.d/conf.yaml][5] を参照してください。

2. [Agent を再起動します][6]。

### Zookeepr ホワイトリスト
バージョン 3.5 から、Zookeeper には、[4 文字コマンド][8]をホワイトリストに登録する `4lw.commands.whitelist` パラメーターが提供されています ([Zookeeper のドキュメント][7]を参照)。デフォルトでは、`srvr` だけがホワイトリストに登録されています。このインテグレーションは `stat` コマンドと `mntr` コマンドに基づいているため、これらのコマンドをホワイトリストに登録してください。

#### メトリクスの収集

*  [Zookeeper のメトリクス](#metrics)の収集を開始するには、`zk.yaml` ファイルに次の構成ブロックを追加します。

```
init_config:

instances:
  - host: localhost
    port: 2181
    timeout: 3
```

* 使用可能なすべての構成オプションの詳細については、[サンプル zk.yaml][6] を参照してください。

* [Agent を再起動][6]すると、Datadog への Zookeeper メトリクスの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Zookeeper はデフォルトで `log4j` ロガーを使用します。ファイルへのログ記録をアクティブにし、フォーマットをカスタマイズするには、`log4j.properties` ファイルを編集します。

    ```
      # Set root logger level to INFO and its only appender to R
      log4j.rootLogger=INFO, R
      log4j.appender.R.File=/var/log/zookeeper.log
      log4j.appender.R.layout=org.apache.log4j.PatternLayout
      log4j.appender.R.layout.ConversionPattern=%d{yyyy-MM-dd HH:mm:ss} %-5p [%t] %c{1}:%L - %m%n
    ```

2. Datadog のインテグレーションパイプラインは、デフォルトで、次の変換パターンをサポートします。

    ```
      %d{yyyy-MM-dd HH:mm:ss} %-5p %c{1}:%L - %m%n
      %d [%t] %-5p %c - %m%n
      %r [%t] %p %c %x - %m%n
    ```

    別の形式に対応する場合は、インテグレーションパイプラインを複製して編集してください。

3. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

4. Zookeeper のログの収集を開始するには、次の構成ブロックを `zk.yaml` ファイルに追加します。

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

    使用可能なすべての構成オプションの詳細については、[サンプル zk.yaml][6] を参照してください。

5. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `zk` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "zk" >}}


#### 非推奨メトリクス

次のメトリクスは引き続き送信されますが、今後削除される予定です。
 * `zookeeper.bytes_received`
 * `zookeeper.bytes_sent`

### イベント
Zookeeper チェックには、イベントは含まれません。

### サービスのチェック

**zookeeper.ruok**:<br>
監視対象ノードに `ruok` を送信します。`imok` 応答には `OK`、別の応答には `WARN`、応答がない場合は `CRITICAL` を返します。

**zookeeper.mode**:<br>
`zk.yaml` で `expected_mode` が構成されている場合、Agent はこのサービスチェックを送信します。Zookeeper の実際のモードが `expected_mode` と一致する場合は `OK` を返し、それ以外の場合は `CRITICAL` を返します。

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/zk/images/zk_dashboard.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/zk/datadog_checks/zk/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[7]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_clusterOptions
[8]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_4lw
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/zk/metadata.csv
[11]: https://docs.datadoghq.com/ja/help


{{< get-dependencies >}}