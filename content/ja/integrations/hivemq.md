---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    HiveMQ: assets/dashboards/hivemq.json
  logs:
    source: hivemq
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

#### ホスト

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

##### メトリクスの収集

1. HiveMQ パフォーマンスデータの収集を開始するには、Agent のコンフィギュレーションディレクトリの
   ルートにある `conf.d/` フォルダーの `hivemq.d/conf.yaml` ファイルを編集します。
   使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル hivemq.d/conf.yaml][3] を参照してください。

   このチェックでは、インスタンスあたりのメトリクス数が 350 に制限されています。返されたメトリクスの数は、情報ページに表示されます。
   以下で説明する構成を編集することで、関心があるメトリクスを指定できます。
    収集するメトリクスをカスタマイズする方法については、[JMX チェックのドキュメント][4]で詳細な手順を参照してください。
   制限数以上のメトリクスを監視する必要がある場合は、[Datadog のサポートチーム][5]までお問い合わせください。

2. [Agent を再起動します][6]。

##### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. 次のコンフィギュレーションブロックを `hivemq.d/conf.yaml` ファイルに追加します。環境に基づいて、`path` パラメーターと `service` パラメーターの値を変更してください。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル hivemq.d/conf.yaml][3] を参照してください。

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

3. [Agent を再起動します][6]。

#### コンテナ化

##### メトリクスの収集

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][7]のガイドを参照してください。

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集][8]を参照してください。

| パラメーター      | 値                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "hivemq", "service": "<サービス名>"}` |

### 検証

[Agent の status サブコマンドを実行][9]し、**JMXFetch** セクションで `hivemq` を探します。

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

## 収集データ

### メトリクス
{{< get-metrics-from-git "hivemq" >}}


### サービスのチェック

**hivemq.can_connect**:<br>
Agent が監視対象の HiveMQ インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

### イベント

HiveMQ には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。

[1]: https://www.hivemq.com/hivemq/
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://github.com/DataDog/integrations-core/blob/master/hivemq/datadog_checks/hivemq/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/integrations/java
[5]: https://docs.datadoghq.com/ja/help
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent
[8]: https://docs.datadoghq.com/ja/agent/docker/log/
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[10]: https://github.com/DataDog/integrations-core/blob/master/hivemq/metadata.csv