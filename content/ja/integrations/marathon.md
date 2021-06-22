---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    marathon-overview: assets/dashboards/marathon-overview_dashboard.json
  logs:
    source: marathon
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views:
    marathon_processes: assets/saved_views/marathon_processes.json
  service_checks: assets/service_checks.json
categories:
  - configuration & deployment
  - containers
  - log collection
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/marathon/README.md'
display_name: Marathon
draft: false
git_integration_title: marathon
guid: 6af353ff-ecca-420a-82c0-a0e84cf0a35e
integration_id: marathon
integration_title: Marathon
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: marathon.
metric_to_check: marathon.apps
name: marathon
process_signatures:
  - start --master mesos marathon
public_title: Datadog-Marathon インテグレーション
short_description: 必要なメモリとディスク、インスタンス数などのアプリケーションメトリクスを追跡。
support: コア
supported_os:
  - linux
  - mac_os
---
## 概要

Agent の Marathon チェックを使用して、以下のことができます。

- すべてのアプリケーションの状態と健全性を追跡し、構成されているメモリ、ディスク、CPU、インスタンスを確認し、正常および異常なタスクの数を監視できます。
- キューに置かれたアプリケーションの数やデプロイの数を監視できます。

## セットアップ

### インストール

Marathon チェックは [Datadog Agent][1] パッケージに含まれています。Marathon マスターに追加でインストールする必要はありません。

### コンフィギュレーション

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

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

##### ログの収集

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
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                  |
| -------------------- | -------------------------------------- |
| `<インテグレーション名>` | `marathon`                             |
| `<初期コンフィギュレーション>`      | 空白または `{}`                          |
| `<インスタンスコンフィギュレーション>`  | `{"url": "https://%%host%%:%%port%%"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                                 |
| -------------- | ----------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "marathon", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][2]し、Checks セクションで `marathon` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "marathon" >}}


### イベント

Marathon チェックには、イベントは含まれません。

### サービスのチェック

**marathon.can_connect**:<br>
Agent が Marathon API に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/