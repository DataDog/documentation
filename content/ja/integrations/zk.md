---
aliases:
  - /ja/integrations/zookeeper
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    zookeeper: assets/dashboards/zookeeper_dashboard.json
  logs:
    source: zookeeper
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    zookeeper_processes: assets/saved_views/zookeeper_processes.json
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
draft: false
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
![ZooKeeper ダッシュボード][1]

## 概要

ZooKeeper チェックは、クライアント接続とレイテンシーの追跡、未処理リクエスト数の監視などを行います。

## セットアップ

### インストール

ZooKeeper チェックは [Datadog Agent][2] パッケージに含まれています。ZooKeeper サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### ZooKeeper のホワイトリスト

バージョン 3.5 以降、ZooKeeper で [4 文字コマンド][4]をホワイトリストに登録する `4lw.commands.whitelist` パラメーターを利用できるようになりました ([ZooKeeper のドキュメント][3]を参照してください)。デフォルトでは、`srvr` だけがホワイトリストに登録されています。このインテグレーションは `stat` および `mntr` コマンドに基づいているため、これらのコマンドを ホワイトリストに登録してください。

#### SSL の有効化

ZooKeeper 3.5 で SSL 認証を使用できるようになりました。ZooKeeper での SSL 設定については、[ZooKeeper SSL ユーザーガイド][5]を参照してください。 

ZooKeeper で SSL の設定が完了すると、SSL を使用して Datadog Agent を構成し、ZooKeeper に接続できるようになります。JKS ファイルによってすでに認証設定が済んでいる場合は、次のステップに従って JKS ファイルを TLS/SSL コンフィギュレーション用の PEM ファイルに変換します。

次のコマンドの例は、JKS `truststore` ファイルと `keystore` ファイルが呼び出された場合を仮定しています。

- `server_truststore.jks`
- `server_keystore.jks` 
- `client_truststore.jks`
- `client_keystore.jks`

次の手順もまた、両サイドの `keystore` ファイルと `truststore` ファイルが、互いの証明書およびエイリアスの `server_cert` と `client_cert` を持っていると仮定しています。つまり、Java ZooKeeper クライアントがすでに ZooKeeper サーバーに接続できる状態です。
秘密キーにパスワードが設定されている場合は、コンフィグオプション `tls_private_key_password` の `config.yaml` ファイルにこのパスワードが含まれていることを確認してください。

JKS ファイルを PEM ファイルに変換するには

1. クライアントの truststore には信頼できるサーバーの証明書が含まれているため、`ca_cert.pem` ファイルを `client_truststore.jks` から取得します。
    ```
    keytool -exportcert -file ca_cert.pem -keystore client_truststore.jks -alias server_cert -rfc
    ```

2. クライアントの `keystore` にはエイリアス `client_cert` のクライアントの証明書が含まれているため、`cert.pem` ファイルを `client_keystore.jks` から取得します。
    ```
    keytool -importkeystore -srckeystore client_keystore.jks -destkeystore cert.p12 -srcstoretype jks -deststoretype pkcs12 -srcalias client_cert
    ```   

3. `openssl pkcs12` コマンドを実行します。これにより、クライアント証明書と証明書の秘密キーをエクスポートします。`tls_cert` コンフィグオプションにより、証明書と秘密キーを含む PEM ファイルを読み取って、パースできます。パスワード保護されていないファイルを取得するには、このコマンドに `-nodes` を追加します。
   ```
   openssl pkcs12 -in cert.p12 -out cert.pem
   ``` 

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. ZooKeeper の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `zk.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル zk.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

#### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. ZooKeeper はデフォルトで `log4j` ロガーを使用します。ファイルへのログ記録をアクティブにし、フォーマットをカスタマイズするには、`log4j.properties` ファイルを編集します。

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

[Agent の status サブコマンドを実行][6]し、Checks セクションで `zk` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "zk" >}}


#### 非推奨メトリクス

次のメトリクスは引き続き送信されますが、今後削除される予定です。

- `zookeeper.bytes_received`
- `zookeeper.bytes_sent`

### イベント

ZooKeeper チェックには、イベントは含まれません。

### サービスのチェック

**zookeeper.ruok**:<br>
監視対象ノードに `ruok` を送信します。`imok` 応答には `OK`、別の応答には `WARN`、応答がない場合は `CRITICAL` を返します。

**zookeeper.mode**:<br>
`zk.yaml` で `expected_mode` が構成されている場合、Agent はこのサービスチェックを送信します。ZooKeeper の実際のモードが `expected_mode` と一致する場合は `OK` を返し、それ以外の場合は `CRITICAL` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/zk/images/zk_dashboard.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_clusterOptions
[4]: https://zookeeper.apache.org/doc/r3.5.4-beta/zookeeperAdmin.html#sc_4lw
[5]: https://cwiki.apache.org/confluence/display/ZOOKEEPER/ZooKeeper+SSL+User+Guide
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/