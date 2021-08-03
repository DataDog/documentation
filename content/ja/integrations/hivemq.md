---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    HiveMQ: assets/dashboards/hivemq.json
  logs:
    source: hivemq
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - メッセージング
  - 処理
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/hivemq/README.md'
display_name: HiveMQ
draft: false
git_integration_title: hivemq
guid: 905e4d87-2777-4253-ad44-f91ee66ad888
integration_id: hivemq
integration_title: HiveMQ
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: hivemq.
metric_to_check: hivemq.messages.queued.count
name: hivemq
public_title: Datadog-HiveMQ インテグレーション
short_description: HiveMQ クラスターを監視します。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

[HiveMQ][1] は、接続された IoT デバイスと行き来するデータの高速で効率的かつ信頼性の高い移動のために設計された MQTT ベースのメッセージングプラットフォームです。MQTT 3.1、3.1.1、5.0 に準拠したブローカーです。

## セットアップ

### インストール

HiveMQ チェックは [Datadog Agent][2] パッケージに含まれています。
サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. HiveMQ パフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリの
   ルートにある `conf.d/` フォルダーの `hivemq.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル hivemq.d/conf.yaml][1] を参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
   収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][2]で詳細な手順を参照してください。
    制限以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][3]までお問い合わせください。

2. [Agent を再起動します][4]。

##### ログの収集

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

3. [Agent を再起動します][4]。

[1]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/integrations/java
[3]: https://docs.datadoghq.com/ja/help
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

##### メトリクスの収集

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][1]のガイドを参照してください。

##### ログの収集

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

## 収集データ

### メトリクス
{{< get-metrics-from-git "hivemq" >}}


### サービスのチェック
{{< get-service-checks-from-git "hivemq" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。


[1]: https://www.hivemq.com/hivemq/
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://docs.datadoghq.com/ja/help