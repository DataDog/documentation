---
assets:
  dashboards:
    Hive Overview: assets/dashboards/overview.json
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/hive/README.md'
display_name: Hive
git_integration_title: hive
guid: 3faee302-f293-45de-9eb8-ba6b7fa052a3
integration_id: hive
integration_title: Hive
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: hive.
metric_to_check: hive.server.memory.total.used
name: hive
public_title: Datadog-Hive インテグレーション
short_description: HiveServer2 と Hive MetaStore から、さまざまな JMX メトリクスを収集
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、[Hive][1] の Hive Metastore と HiveServer2 という 2 つの部分を監視します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Hive チェックは [Datadog Agent][3] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィグレーション

1. Hive Metastore と HiveServer2 のメトリクスを有効にするには、[`HIVE_HOME/conf/hive-site.xml`][4] にある Hive 構成ファイルを編集して、以下のプロパティを追加します。

    ```
    <property>
      <name>hive.metastore.metrics.enabled</name>
      <value>true</value>
    </property>
    <property>
      <name>hive.server2.metrics.enabled</name>
      <value>true</value>
    </property>
    ```

2. HiveServer2、Hive Metastore、またはその両方の JMX リモート接続を有効にします。たとえば、以下のように `HADOOP_CLIENT_OPTS` 環境変数を設定します。

    ```
    export HADOOP_CLIENT_OPTS="$HADOOP_CLIENT_OPTS -Dcom.sun.management.jmxremote \
    -Dcom.sun.management.jmxremote.authenticate=false -Dcom.sun.management.jmxremote.ssl=false \
    -Dcom.sun.management.jmxremote.port=8808"
    ```

    次に、HiveServer2 または Hive Metastore を再起動します。Hive Metastore と HiveServer2 が同じ JMX 接続を共有することはできません。

3. Hive パフォーマンスデータの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダーの `hive.d/conf.yaml` ファイルを編集します。
     使用可能なすべての構成オプションの詳細については、[サンプル hive.d/conf.yaml][5] を参照してください。

    このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
    収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][6]で詳細な手順を参照してください。制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][7]までお問い合わせください。

4. [Agent を再起動します][8]。

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` でこれを有効にする必要があります。

    ```yaml
      logs_enabled: true
    ```

2. Hive のログの収集を開始するには、次の構成ブロックを `hive.d/conf.yaml` ファイルに追加します。

    ```
      logs:
        - type: file
          path: /tmp/<USER>/hive.log
          source: hive
          service: <SERVICE_NAME>
          log_processing_rules:
            - type: multi_line
              name: new_log_start_with_date
              pattern: \d{4}\-\d{2}\-\d{2}
    ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。使用可能なすべての構成オプションの詳細については、[サンプル hive.d/conf.yaml][5] を参照してください。

3. [Agent を再起動します][8]。

### 検証

[Agent の status サブコマンドを実行][9]し、Checks セクションで `Hive` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "hive" >}}


### サービスのチェック

 **hive.can_connect**:<br>
Agent が監視対象の HiveServer2/Hive Metastore インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` が返されます。そうでない場合は `OK` が返されます。

### イベント

Hive チェックには、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。


[1]: https://cwiki.apache.org/confluence/display/Hive/Home
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://docs.datadoghq.com/ja/agent
[4]: https://cwiki.apache.org/confluence/display/Hive/Configuration+Properties#ConfigurationProperties-Metrics
[5]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/integrations/java
[7]: https://docs.datadoghq.com/ja/help
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/hive/metadata.csv


{{< get-dependencies >}}