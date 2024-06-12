---
app_id: hazelcast
app_uuid: 00434289-3c74-4c25-8841-9e0c826510c2
assets:
  dashboards:
    Hazelcast Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - hazelcast.mc.license_expiration_time
      - hazelcast.instance.running
      metadata_path: metadata.csv
      prefix: hazelcast.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10095
    source_type_name: Hazelcast
  logs:
    source: hazelcast
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- data stores
- キャッシュ
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hazelcast/README.md
display_on_public_website: true
draft: false
git_integration_title: hazelcast
integration_id: hazelcast
integration_title: Hazelcast
integration_version: 3.2.0
is_public: true
manifest_version: 2.0.0
name: hazelcast
public_title: Hazelcast
short_description: Hazelcast メンバーと管理センターを監視します。
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Data Stores
  - Category::Caching
  - Category::Log Collection
  configuration: README.md#Setup
  description: Hazelcast メンバーと管理センターを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Hazelcast
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックは [Hazelcast][1] v4.0+ を監視します。

## 計画と使用

### インフラストラクチャーリスト

Hazelcast チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `hazelcast.d/conf.yaml` ファイルを編集して、
   Hazelcast パフォーマンスデータの収集を開始します。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル hazelcast.d/conf.yaml][1] を参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、[ステータスページ][2]に表示されます。
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
   収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][3]で詳細な手順を参照してください。
   制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][4]までお問い合わせください。

2. [Agent を再起動します][5]。

##### 収集データ

1. Hazelcast は数々の多様な[ロギングアダプター][6]をサポートします。これは、`log4j2.properties` ファイルの例です。

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

2. Datadog のインテグレーションパイプラインは、デフォルトで次の変換[パターン][7]をサポートします。

   ```text
   %d{yyyy-MM-dd HH:mm:ss} [%thread] %level{length=10} %c{1}:%L - %m%n
   ```

    フォーマットが異なる場合は、[インテグレーションパイプライン][8]を複製して編集してください。

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

5. [Agent を再起動します][5]。

[1]: https://github.com/DataDog/integrations-core/blob/master/hazelcast/datadog_checks/hazelcast/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/integrations/java/
[4]: https://docs.datadoghq.com/ja/help/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.hazelcast.org/docs/latest/manual/html-single/index.html#logging-configuration
[7]: https://logging.apache.org/log4j/2.x/manual/layouts.html#Patterns
[8]: https://docs.datadoghq.com/ja/logs/processing/#integration-pipelines
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

##### メトリクスの収集

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][1]のガイドを参照してください。

##### 収集データ

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

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "hazelcast" >}}


### ヘルプ
{{< get-service-checks-from-git "hazelcast" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][4]までお問合せください。



[1]: https://hazelcast.org
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/ja/help/