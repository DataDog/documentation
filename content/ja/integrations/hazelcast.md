---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Hazelcast Overview: assets/dashboards/overview.json
  logs:
    source: hazelcast
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - キャッシュ
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/hazelcast/README.md'
display_name: Hazelcast
draft: false
git_integration_title: hazelcast
guid: b2c63c99-f955-4494-a171-494f9dcf7d1f
integration_id: hazelcast
integration_title: Hazelcast
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: hazelcast.
metric_to_check:
  - hazelcast.mc.license_expiration_time
  - hazelcast.instance.running
name: hazelcast
public_title: Datadog-Hazelcast インテグレーション
short_description: Hazelcast メンバーと管理センターを監視します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは [Hazelcast][1] v4.0+ を監視します。

## セットアップ

### インストール

Hazelcast チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `hazelcast.d/conf.yaml` ファイルを編集して、
   Hazelcast パフォーマンスデータの収集を開始します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル hazelcast.d/conf.yaml][1] を参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
   収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][2]で詳細な手順を参照してください。
    制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][3]までお問い合わせください。

2. [Agent を再起動します][4]。

##### ログの収集

1. Hazelcast は数々の多様な[ロギングアダプター][5]をサポートします。これは、`log4j2.properties` ファイルの例です。

   ```text
   rootLogger=file
   rootLogger.level=info
   property.filepath=/path/to/log/files
   property.filename=hazelcast

   appender.file.type=RollingFile
   appender.file.name=RollingFile
   appender.file.fileName=${filepath}/${filename}.log
   appender.file.filePattern=${filepath}/${filename}-%d{yyyy-MM-dd}-%i.log.gz
   appender.file.layout.type=PatternLayout
   appender.file.layout.pattern = %d{yyyy-MM-dd HH:mm:ss} [%thread] %level{length=10} %c{1}:%L - %m%n
   appender.file.policies.type=Policies
   appender.file.policies.time.type=TimeBasedTriggeringPolicy
   appender.file.policies.time.interval=1
   appender.file.policies.time.modulate=true
   appender.file.policies.size.type=SizeBasedTriggeringPolicy
   appender.file.policies.size.size=50MB
   appender.file.strategy.type=DefaultRolloverStrategy
   appender.file.strategy.max=100

   rootLogger.appenderRefs=file
   rootLogger.appenderRef.file.ref=RollingFile

   #Hazelcast specific logs.

   #log4j.logger.com.hazelcast=debug

   #log4j.logger.com.hazelcast.cluster=debug
   #log4j.logger.com.hazelcast.partition=debug
   #log4j.logger.com.hazelcast.partition.InternalPartitionService=debug
   #log4j.logger.com.hazelcast.nio=debug
   #log4j.logger.com.hazelcast.hibernate=debug
   ```

2. Datadog のインテグレーションパイプラインは、デフォルトで次の変換[パターン][6]をサポートします。

   ```text
   %d{yyyy-MM-dd HH:mm:ss} [%thread] %level{length=10} %c{1}:%L - %m%n
   ```

   フォーマットが異なる場合は、[インテグレーションパイプライン][7]を複製して編集してください。

3. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

4. 次のコンフィギュレーションブロックを `hazelcast.d/conf.yaml` ファイルに追加します。環境に基づいて、`path` パラメーターと `service` パラメーターの値を変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル hazelcast.d/conf.yaml][1] を参照してください。

   ```yaml
   logs:
     - type: file
       path: /var/log/hazelcast.log
       source: hazelcast
       service: <SERVICE>
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

5. [Agent を再起動します][4]。

[1]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/integrations/java/
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.hazelcast.org/docs/latest/manual/html-single/index.html#logging-configuration
[6]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
[7]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

##### メトリクスの収集

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][1]のガイドを参照してください。

##### ログの収集

Datadog Agent では、ログの収集がデフォルトで無効になっています。これを有効にするには、[Docker ログの収集][2]を参照してください。

| パラメーター      | 値                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hazelcast", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/ja/agent/docker/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、**JMXFetch** セクションで `hazelcast` を探します。

```text
========
JMXFetch
========
  Initialized checks
  ==================
    hazelcast
      instance_name : hazelcast-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

## 収集データ

### メトリクス
{{< get-metrics-from-git "hazelcast" >}}


### サービスのチェック

**hazelcast.can_connect**:<br>
Agent が監視対象の Hazelcast インスタンスに接続できず、メトリクスを収集できない場合は `CRITICAL` を返します。それ以外の場合は `OK` を返します。

**hazelcast.mc_cluster_state**:<br>
健全性チェックで示されたとおりに Hazelcast 管理センターの状態を表示します。

### イベント

Hazelcast には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。


[1]: https://hazelcast.org
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/