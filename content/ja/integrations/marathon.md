---
app_id: marathon
app_uuid: fe9a038e-3948-4646-9a1c-ea1f1cc59977
assets:
  dashboards:
    marathon-overview: assets/dashboards/marathon-overview_dashboard.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: marathon.apps
      metadata_path: metadata.csv
      prefix: marathon.
    process_signatures:
    - start --master mesos marathon
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 82
    source_type_name: Marathon
  logs:
    source: marathon
  saved_views:
    marathon_processes: assets/saved_views/marathon_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- configuration & deployment
- containers
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/marathon/README.md
display_on_public_website: true
draft: false
git_integration_title: marathon
integration_id: marathon
integration_title: Marathon
integration_version: 2.3.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: marathon
public_title: Marathon
short_description: 必要なメモリとディスク、インスタンス数などのアプリケーションメトリクスを追跡。
supported_os:
- linux
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Category::構成 & デプロイ
  - Category::コンテナ
  - Category::ログの収集
  configuration: README.md#Setup
  description: 必要なメモリとディスク、インスタンス数などのアプリケーションメトリクスを追跡。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Marathon
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Agent の Marathon チェックを使用して、以下のことができます。

- すべてのアプリケーションの状態と健全性を追跡し、構成されているメモリ、ディスク、CPU、インスタンスを確認し、正常および異常なタスクの数を監視できます。
- キューに置かれたアプリケーションの数やデプロイの数を監視できます。

## 計画と使用

### インフラストラクチャーリスト

Marathon チェックは [Datadog Agent][1] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `marathon.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル marathon.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     # the API endpoint of your Marathon master; required
     - url: "https://<SERVER>:<PORT>"
       # if your Marathon master requires ACS auth
       #   acs_url: https://<SERVER>:<PORT>

       # the username for Marathon API or ACS token authentication
       username: "<USERNAME>"

       # the password for Marathon API or ACS token authentication
       password: "<PASSWORD>"
   ```

   `username` と `password` の関数は `acs_url` を構成するかどうかに依存します。構成した場合、Agent はこれらを使用して ACS に認証トークンを要求し、それを使用して Marathon API に対する認証を行います。構成しない場合、Agent は `username` と `password` を使用して直接 Marathon API に対する認証を行います。

2. [Agent を再起動します][3]。

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Marathon は logback を使用するため、カスタムログ形式を指定できます。Datadog では、Marathon から提供されるデフォルトの形式と Datadog 推奨の形式の 2 つの形式がサポートされ、すぐに使用できます。次の例のように、ファイルアペンダーを構成に追加し、`$PATTERN$` を選択した形式に置き換えます。

   - Marathon のデフォルト形式: `[%date] %-5level %message \(%logger:%thread\)%n`
   - Datadog の推奨形式: `%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n`

   ```xml
     <?xml version="1.0" encoding="UTF-8"?>

     <configuration>
         <shutdownHook class="ch.qos.logback.core.hook.DelayingShutdownHook"/>
         <appender name="stdout" class="ch.qos.logback.core.ConsoleAppender">
             <encoder>
                 <pattern>[%date] %-5level %message \(%logger:%thread\)%n</pattern>
             </encoder>
         </appender>
         <appender name="async" class="ch.qos.logback.classic.AsyncAppender">
             <appender-ref ref="stdout" />
             <queueSize>1024</queueSize>
         </appender>
         <appender name="FILE" class="ch.qos.logback.core.FileAppender">
             <file>/var/log/marathon.log</file>
             <append>true</append>
             <!-- set immediateFlush to false for much higher logging throughput -->
             <immediateFlush>true</immediateFlush>
             <encoder>
                 <pattern>$PATTERN$</pattern>
             </encoder>
         </appender>
         <root level="INFO">
             <appender-ref ref="async"/>
             <appender-ref ref="FILE"/>
         </root>
     </configuration>
   ```

3. Marathon のログの収集を開始するには、次の構成ブロックを `marathon.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/marathon.log
       source: marathon
       service: "<SERVICE_NAME>"
   ```

4. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/marathon/datadog_checks/marathon/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `marathon`                             |
| `<INIT_CONFIG>`      | 空白または `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%:%%port%%"}` |

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                 |
| -------------- | ----------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "marathon", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][2]し、Checks セクションで `marathon` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "marathon" >}}


### ヘルプ

Marathon チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "marathon" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。



[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/