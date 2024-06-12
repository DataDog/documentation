---
app_id: hivemq
app_uuid: ba1769d1-c71b-4cf1-8169-8ce3b66629dd
assets:
  dashboards:
    HiveMQ: assets/dashboards/hivemq.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: hivemq.messages.queued.count
      metadata_path: metadata.csv
      prefix: hivemq.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10101
    source_type_name: HiveMQ
  logs:
    source: hivemq
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- iot
- ログの収集
- メッセージキュー
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/hivemq/README.md
display_on_public_website: true
draft: false
git_integration_title: hivemq
integration_id: hivemq
integration_title: HiveMQ
integration_version: 1.8.0
is_public: true
manifest_version: 2.0.0
name: hivemq
public_title: HiveMQ
short_description: HiveMQ クラスターを監視します。
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::IoT
  - Category::Log Collection
  - Category::Message Queues
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: HiveMQ クラスターを監視します。
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: HiveMQ
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

[HiveMQ][1] は、接続された IoT デバイスと行き来するデータの高速で効率的かつ信頼性の高い移動のために設計された MQTT ベースのメッセージングプラットフォームです。MQTT 3.1、3.1.1、5.0 に準拠したブローカーです。

## 計画と使用

### インフラストラクチャーリスト

HiveMQ チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. HiveMQ パフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリの
   ルートにある `conf.d/` フォルダーの `hivemq.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル hivemq.d/conf.yaml][1] を参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、[ステータスページ][2]に表示されます。
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
   収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][3]で詳細な手順を参照してください。
   制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][4]までお問い合わせください。

2. [Agent を再起動します][5]。

##### 収集データ

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. 次のコンフィギュレーションブロックを `hivemq.d/conf.yaml` ファイルに追加します。環境に基づいて、`path` パラメーターと `service` パラメーターの値を変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル hivemq.d/conf.yaml][1] を参照してください。

   ```yaml
   logs:
     - type: file
       path: /var/log/hivemq.log
       source: hivemq
       service: <SERVICE>
       log_processing_rules:
         - type: multi_line
           name: log_start_with_date
           pattern: \d{4}\.\d{2}\.\d{2}
   ```

3. [Agent を再起動します][5]。

[1]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/integrations/java
[4]: https://docs.datadoghq.com/ja/help
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

##### メトリクスの収集

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][1]のガイドを参照してください。

##### 収集データ

Datadog Agent では、ログの収集がデフォルトで無効になっています。これを有効にするには、[Docker ログの収集][2]を参照してください。

| パラメーター      | 値                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hivemq", "service": "<サービス名>"}` |

### 検証

[Agent の status サブコマンドを実行][3]し、**JMXFetch** セクションで `hivemq` を探します。

```text
========
JMXFetch
========
  Initialized checks
  ==================
    hivemq
      instance_name : hivemq-localhost-9999
      message :
      metric_count : 46
      service_check_count : 0
      status : OK
```

[1]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[2]: https://docs.datadoghq.com/ja/agent/docker/log/
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
{{% /tab %}}
{{< /tabs >}}

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "hivemq" >}}


### ヘルプ
{{< get-service-checks-from-git "hivemq" >}}


## ヘルプ

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [Datadog で IoT アプリケーションを監視するために HiveMQ と OpenTelemetry を使用する][4]


[1]: https://www.hivemq.com/hivemq/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/ja/help
[4]: https://www.datadoghq.com/blog/hivemq-opentelemetry-monitor-iot-applications/