---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    activemq: assets/dashboards/activemq_dashboard.json
    artemis: assets/dashboards/artemis_dashboard.json
  logs:
    source: activemq
  metrics_metadata: metadata.csv
  monitors:
    '[ActiveMQ Artemis] High disk store usage': assets/recommended_monitors/activemq_artemis_high_disk_store.json
    '[ActiveMQ Artemis] High unrouted messages': assets/recommended_monitors/activemq_artemis_unrouted_messages.json
  saved_views:
    activemq_processes: assets/saved_views/activemq_processes.json
  service_checks: assets/service_checks.json
categories:
  - log collection
  - processing
  - messaging
  - autodiscovery
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/activemq/README.md'
display_name: ActiveMQ
draft: false
git_integration_title: activemq
guid: 496df16d-5ad0-438c-aa2a-b8ba8ee3ae05
integration_id: activemq
integration_title: ActiveMQ
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: activemq.
metric_to_check:
  - activemq.queue.size
  - activemq.artemis.queue.message_count
name: activemq
process_signatures:
  - activemq
public_title: Datadog-ActiveMQ インテグレーション
short_description: ブローカーとキュー、プロデューサーとコンシューマーなどのメトリクスを収集。
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

ActiveMQ チェックは、ブローカーとキュー、プロデューサーとコンシューマーなどのメトリクスを収集します。

**注:** このチェックは ActiveMQ Artemis (今後の ActiveMQ バージョン `6`) もサポートし、`activemq.artemis` ネームスペースのメトリクスを報告します。このインテグレーションで提供されるメトリクスのリストについては、 [metadata.csv][1] をご参照ください。

**注**: バージョン 5.8.0 以前の ActiveMQ を実行している場合は、[Agent 5.10.x リリースのサンプルファイル][2]を参照してください。

## セットアップ

### インストール

Agent の ActiveMQ チェックは [Datadog Agent][3] パッケージに含まれています。ActiveMQ ノードに追加でインストールする必要はありません。

このチェックは、メトリクスを JMX 経由で収集するため、Agent が [jmxfetch][4] をフォークできるように、各ノード上に JVM が必要です。Oracle 提供の JVM を使用することをお勧めします。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. **ActiveMQ サーバーで [JMX Remote が有効になっている][1]ことを確認します。**
2. ActiveMQ に接続するように Agent を構成します。[Agent の構成ディレクトリ][2]のルートにある `conf.d/` フォルダーの `activemq.d/conf.yaml` を編集します。使用可能なすべての構成オプションの詳細については、[サンプル activemq.d/conf.yaml][3] を参照してください。デフォルトで収集されるメトリクスのリストについては、[`metrics.yaml` ファイル][4]を参照してください。

   ```yaml
   init_config:
     is_jmx: true
     collect_default_metrics: true

   instances:
     - host: localhost
       port: 1616
       user: username
       password: password
       name: activemq_instance
   ```

3. [Agent を再起動します][5]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. ActiveMQ のログ収集を開始するには、次のコンフィギュレーションブロックを `activemq.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/activemq.log"
       source: activemq
       service: "<SERVICE_NAME>"
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/audit.log"
       source: activemq
       service: "<SERVICE_NAME>"
   ```

3. [Agent を再起動します][5]。

[1]: https://activemq.apache.org/jmx.html
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                |
| -------------------- | ------------------------------------ |
| `<インテグレーション名>` | `activemq`                           |
| `<初期コンフィギュレーション>`      | 空白または `{}`                        |
| `<インスタンスコンフィギュレーション>`  | `{"host": "%%host%%","port":"1099"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                                  |
| -------------- | ------------------------------------------------------ |
| `<LOG_CONFIG>` | `{"source": "activemq", "service": "<YOUR_APP_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/?tab=containerinstallation#setup
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `activemq` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "activemq" >}}
  ActiveMQ Artemis フレーバーに関連付けられたメトリクスは、メトリクス名に `artemis` が含まれています。その他すべては ActiveMQ "classic" に報告されます。

### イベント

ActiveMQ チェックには、イベントは含まれません。

### サービスのチェック

**activemq.can_connect**:<br>
Agent が監視対象の ActiveMQ インスタンスに接続できず、メトリクスを収集できない場合は、`CRITICAL` が返されます。そうでない場合は `OK` が返されます。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [ActiveMQ のアーキテクチャとキーメトリクス][7]
- [ActiveMQ のメトリクスとパフォーマンスの監視][8]




## ActiveMQ XML インテグレーション

## 概要

ActiveMQ XML からメトリクスをリアルタイムに取得すると、以下のことが可能になります。

- ActiveMQ XML の状態を視覚化および監視できます。
- ActiveMQ XML のフェイルオーバーとイベントの通知を受けることができます。

## セットアップ

### インストール

ActiveMQ XML チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

ホストで実行中の Agent でこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#コンテナ化)セクションを参照してください。

<!-- xxx tabs xxx -->
<!-- xxx tab "ホスト" xxx -->

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

1. ご使用の統計 `url` で、[Agent のコンフィギュレーションディレクトリ][9]のルートにある `conf.d/` フォルダーの `activemq_xml.d/conf.yaml` を編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル activemq_xml.d/conf.yaml][10] を参照してください。

   **注**: ActiveMQ XML インテグレーションでは[カスタムメトリクス][11]を送信することができますが、これはお客様の[請求][12]に影響します。デフォルトでは、メトリクス数は 350 に制限されています。メトリクスの追加が必要な場合は、[Datadog のサポートチーム][6]にお問い合わせください。

2. [Agent を再起動します][13]。

##### ログの収集

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. ActiveMQ のログ収集を開始するには、次のコンフィギュレーションブロックを `activemq_xml.d/conf.yaml` または `activemq.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/activemq.log"
       source: activemq
       service: "<SERVICE_NAME>"
     - type: file
       path: "<ACTIVEMQ_BASEDIR>/data/audit.log"
       source: activemq
       service: "<SERVICE_NAME>"
   ```

3. [Agent を再起動します][13]。

<!-- xxz tab xxx -->
<!-- xxx tab "コンテナ化" xxx -->

#### コンテナ化

コンテナ環境の場合は、[JMX を使用したオートディスカバリー][14]のガイドを参照してください。

<!-- xxz tab xxx -->
<!-- xxz tabs xxx -->

### 検証

[Agent の status サブコマンドを実行][5]し、Checks セクションで `activemq_xml` を検索します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "activemq_xml" >}}


### イベント

ActiveMQ XML チェックには、イベントは含まれません。

### サービスのチェック

ActiveMQ XML チェックには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

- [ActiveMQ のメトリクスとパフォーマンスの監視][8]


[1]: https://github.com/DataDog/integrations-core/blob/master/activemq/metadata.csv
[2]: https://raw.githubusercontent.com/DataDog/dd-agent/5.10.1/conf.d/activemq.yaml.example
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://github.com/DataDog/jmxfetch
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/activemq-architecture-and-metrics
[8]: https://www.datadoghq.com/blog/monitor-activemq-metrics-performance
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[10]: https://github.com/DataDog/integrations-core/blob/master/activemq_xml/datadog_checks/activemq_xml/data/conf.yaml.example
[11]: https://docs.datadoghq.com/ja/developers/metrics/custom_metrics/
[12]: https://docs.datadoghq.com/ja/account_management/billing/custom_metrics/
[13]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[14]: https://docs.datadoghq.com/ja/agent/guide/autodiscovery-with-jmx/?tab=containerizedagent