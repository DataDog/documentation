---
app_id: rabbitmq
app_uuid: a10b582b-71ef-4773-b7b8-b7751c724620
assets:
  dashboards:
    rabbitmq: assets/dashboards/rabbitmq_dashboard.json
    rabbitmq_screenboard: assets/dashboards/rabbitmq_screenboard_dashboard.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: rabbitmq.queue.messages
      metadata_path: metadata.csv
      prefix: rabbitmq.
    process_signatures:
    - rabbitmq
    - rabbitmq-server
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: RabbitMQ
  logs:
    source: rabbitmq
  monitors:
    disk_usage: assets/monitors/disk_usage.json
    message_unacknowledge_rate_anomaly: assets/monitors/message_unacknowledge_rate_anomaly.json
  saved_views:
    pid_overview: assets/saved_views/status_overview.json
    rabbitmq_pattern: assets/saved_views/rabbitmq_pattern.json
    rabbitmq_processes: assets/saved_views/rabbitmq_processes.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- processing
- log collection
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/rabbitmq/README.md
display_on_public_website: true
draft: false
git_integration_title: rabbitmq
integration_id: rabbitmq
integration_title: RabbitMQ
integration_version: 3.3.1
is_public: true
kind: インテグレーション
manifest_version: 2.0.0
name: rabbitmq
oauth: {}
public_title: RabbitMQ
short_description: キューサイズ、コンシューマーカウント、未承認メッセージなどを追跡
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
  - Category::処理
  - Category::ログの収集
  configuration: README.md#Setup
  description: キューサイズ、コンシューマーカウント、未承認メッセージなどを追跡
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: RabbitMQ
---



![RabbitMQ ダッシュボード][1]

## 概要

このチェックは、Datadog Agent を通じて [RabbitMQ][2] を監視します。

- キューサイズ、コンシューマーカウント、未承認メッセージ、再配布メッセージなどのキューベースの統計を追跡できます。
- 待機プロセス、使用されたソケット、使用されたファイルディスクリプタなどのノードベースの統計を追跡できます。
- vhost の死活状態や接続数を監視できます。

これらは一例です。

## セットアップ

### APM に Datadog Agent を構成する

RabbitMQ チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

Rabbitmq は、[RabbitMQ Management Plugin][4] と [Rabbitmq Prometheus Plugin][5] という 2 つの方法でメトリクスを公開します。RabbitMQ インテグレーションは、この 2 つのプラグインをサポートしています。

#### RabbitMQ の準備

##### [RabbitMQ Prometheus Plugin][5]。

_注: Prometheus Plugin の収集メソッドは Python 3 が必要です。_

_RabbitMQ v3.8 から、[Rabbitmq Prometheus Plugin][5] がデフォルトで有効になり、インテグレーションは OpenMetricsV2 を使って HTTP API で通信を行います。_

インスタンス構成で `prometheus_plugin` セクションを設定します。`prometheus_plugin` オプションを使用する場合、Management Plugin に関連する設定は無視されます。

 ```yaml
 instances:
   - prometheus_plugin:
       url: http://<HOST>:15692
 ```

&nbsp;これにより、1 つの rabbitmq ノードで [`/metrics` エンドポイント][6]のスクレイピングが可能になります。

##### [RabbitMQ Management Plugin][4]。

プラグインを有効化します。Agent ユーザーは、少なくとも`monitoring`タグとこれらの必要な権限が必要です。

| アクセス許可 | コマンド            |
| ---------- | ------------------ |
| **conf**   | `^aliveness-test$` |
| **write**  | `^amq\.default$`   |
| **read**   | `.*`               |

次のコマンドで、デフォルトの vhost 用に Agent ユーザーを作成します。

```text
rabbitmqctl add_user datadog <シークレット>
rabbitmqctl set_permissions  -p / datadog "^aliveness-test$" "^amq\.default$" ".*"
rabbitmqctl set_user_tags datadog monitoring
```

ここで、`/` はデフォルトのホストを表します。これを、指定した仮想ホスト名に設定してください。詳細については、[RabbitMQ のドキュメント][7]を参照してください。

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. RabbitMQ メトリクスの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `rabbitmq.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションの詳細については、[サンプル rabbitmq.d/conf.yaml][2] を参照してください。

   **注**: Agent は、デフォルトですべてのキュー、vhost、ノードをチェックしますが、リストまたは正規表現を指定してこれを制限できます。例については、[rabbitmq.d/conf.yaml][2] を参照してください。

2. [Agent を再起動します][3]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. デフォルトのログファイルの場所を変更するには、`RABBITMQ_LOGS` 環境変数を設定するか、以下の行を RabbitMQ 構成ファイル (`/etc/rabbitmq/rabbitmq.conf`) に追加します。

   ```conf
     log.dir = /var/log/rabbit
     log.file = rabbit.log
   ```

2. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

3. RabbitMQ ログの収集を開始するには、`rabbitmq.d/conf.yaml` ファイルの `logs` セクションを編集します。

   ```yaml
   logs:
     - type: file
       path: /var/log/rabbit/*.log
       source: rabbitmq
       service: myservice
       log_processing_rules:
         - type: multi_line
           name: logs_starts_with_equal_sign
           pattern: "="
   ```

4. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

Datadog の [Docker コンテナオートディスカバリー][1]を活用することができます。Rabbitmq 固有の設定は、`auto_conf.yaml` の設定例を参照してください。

Kubernetes などのコンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                        |
| -------------------- | -------------------------------------------- |
| `<インテグレーション名>` | `rabbitmq`                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                |
| `<インスタンスコンフィギュレーション>`  | `{"prometheus_plugin": {"url": "%%host%%:15692"}}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][3]を参照してください。

| パラメーター      | 値                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "rabbitmq", "service": "rabbitmq", "log_processing_rules": [{"type":"multi_line","name":"logs_starts_with_equal_sign", "pattern": "="}]}` |

[1]: https://docs.datadoghq.com/ja/containers/docker/integrations/?tab=dockeradv2
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `rabbitmq` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "rabbitmq" >}}


### イベント

### サービスのチェック
{{< get-service-checks-from-git "rabbitmq" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][9]までお問い合わせください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [RabbitMQ 監視のキーメトリクス][10]
- [RabbitMQ 監視ツールでメトリクスを収集][11]
- [Datadog を使用した RabbitMQ パフォーマンスの監視][12]

### Prometheus Plugin 移行ガイド

以下の表は、Management プラグインから来るメトリクスを、Prometheus プラグインに相当するものにマッピングしたものです。

| Management Plugin メトリクス                                                    | Prometheus Plugin 相当                                                                                                                | エンドポイント            |
|----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|---------------------|
| rabbitmq.connections                                           | rabbitmq\_connections                                                                                                         |                     |
| rabbitmq.node.disk\_alarm                                      | rabbitmq\_alarms\_free\_disk\_space\_watermark                                                                                | /metrics            |
| rabbitmq.node.disk\_free                                       | rabbitmq\_disk\_space\_available\_bytes                                                                                       |                     |
| rabbitmq.node.fd\_used                                         | rabbitmq\_process\_open\_fds                                                                                                  |                     |
| rabbitmq.node.mem\_alarm                                       | rabbitmq\_alarms\_memory\_used\_watermark                                                                                     | /metrics            |
| rabbitmq.node.mem\_limit                                       | rabbitmq\_resident\_memory\_limit\_bytes                                                                                      |                     |
| rabbitmq.node.mem\_used                                        | rabbitmq\_process\_resident\_memory\_bytes                                                                                    |                     |
| rabbitmq.node.sockets\_used                                    | erlang\_vm\_port\_count                                                                                                       |                     |
| rabbitmq.overview.messages.confirm.count                       | rabbitmq\_global\_messages\_confirmed\_total                                                                                  |                     |
| rabbitmq.overview.messages.deliver\_get.count                  | rabbitmq\_global\_messages\_delivered\_get\_auto\_ack\_total + rabbitmq\_global\_messages\_delivered\_get\_manual\_ack\_total |                     |
| rabbitmq.overview.messages.publish.count                       | rabbitmq\_queue\_messages\_published\_total                                                                                   | /metrics            |
| rabbitmq.overview.messages.redeliver.count                     | rabbitmq\_global\_messages\_redelivered\_total                                                                                |                     |
| rabbitmq.overview.messages.return\_unroutable.count            | rabbitmq\_global\_messages\_unroutable\_returned\_total                                                                       |                     |
| rabbitmq.overview.object\_totals.channels                      | rabbitmq\_channels                                                                                                            |                     |
| rabbitmq.overview.object\_totals.connections                   | rabbitmq\_connections                                                                                                         |                     |
| rabbitmq.overview.object\_totals.consumers                     | rabbitmq\_global\_consumers                                                                                                   |                     |
| rabbitmq.overview.object\_totals.queues                        | rabbitmq\_queues                                                                                                              |                     |
| rabbitmq.overview.queue\_totals.messages.count                 | rabbitmq\_queue\_messages                                                                                                     | /metrics            |
| rabbitmq.overview.queue\_totals.messages\_ready.count          | rabbitmq\_queue\_messages\_ready                                                                                              | /metrics            |
| rabbitmq.overview.queue\_totals.messages\_unacknowledged.count | rabbitmq\_queue\_messages\_unacked                                                                                            | /metrics            |
| rabbitmq.queue.consumers                                       | rabbitmq\_queue\_consumers                                                                                                    | /metrics            |
| rabbitmq.queue.head\_message\_timestamp                        | rabbitmq\_queue\_head\_message\_timestamp                                                                                     | /metrics/per-object |
| rabbitmq.queue.memory                                          | rabbitmq\_queue\_process\_memory\_bytes                                                                                       | /metrics/per-object |
| rabbitmq.queue.message\_bytes                                  | rabbitmq\_queue\_messages\_ready\_bytes                                                                                       | /metrics/per-object |
| rabbitmq.queue.messages                                        | rabbitmq\_queue\_messages                                                                                                     | /metrics/per-object |
| rabbitmq.queue.messages.publish.count                          | rabbitmq\_queue\_messages\_published\_total                                                                                   | /metrics            |
| rabbitmq.queue.messages.redeliver.count                        | rabbitmq\_global\_messages\_redelivered\_total                                                                                |                     |
| rabbitmq.queue.messages\_ready                                 | rabbitmq\_queue\_messages\_ready                                                                                              |                     |
| rabbitmq.queue.messages\_unacknowledged                        | rabbitmq\_queue\_messages\_unacked                                                                                            |                     |

以下の Management プラグインのメトリクスは、私たちの知る限り、Prometheus プラグインに相当するものはありません。

- rabbitmq.connections.state
- rabbitmq.exchange.messages.ack.count
- rabbitmq.exchange.messages.ack.rate
- rabbitmq.exchange.messages.confirm.count
- rabbitmq.exchange.messages.confirm.rate
- rabbitmq.exchange.messages.deliver\_get.count
- rabbitmq.exchange.messages.deliver\_get.rate
- rabbitmq.exchange.messages.publish.count
- rabbitmq.exchange.messages.publish.rate
- rabbitmq.exchange.messages.publish\_in.count
- rabbitmq.exchange.messages.publish\_in.rate
- rabbitmq.exchange.messages.publish\_out.count
- rabbitmq.exchange.messages.publish\_out.rate
- rabbitmq.exchange.messages.redeliver.count
- rabbitmq.exchange.messages.redeliver.rate
- rabbitmq.exchange.messages.return\_unroutable.count
- rabbitmq.exchange.messages.return\_unroutable.rate
- rabbitmq.node.partitions
- rabbitmq.node.run\_queue
- rabbitmq.node.running
- rabbitmq.overview.messages.ack.count
- rabbitmq.overview.messages.ack.rate
- rabbitmq.overview.messages.confirm.rate
- rabbitmq.overview.messages.deliver\_get.rate
- rabbitmq.overview.messages.publish.rate
- rabbitmq.overview.messages.publish\_in.count
- rabbitmq.overview.messages.publish\_in.rate
- rabbitmq.overview.messages.publish\_out.count
- rabbitmq.overview.messages.publish\_out.rate
- rabbitmq.overview.messages.redeliver.rate
- rabbitmq.overview.messages.return\_unroutable.rate
- rabbitmq.overview.queue\_totals.messages.rate
- rabbitmq.overview.queue\_totals.messages\_ready.rate
- rabbitmq.overview.queue\_totals.messages\_unacknowledged.rate
- rabbitmq.queue.active\_consumers
- rabbitmq.queue.bindings.count
- rabbitmq.queue.messages.ack.count
- rabbitmq.queue.messages.ack.rate
- rabbitmq.queue.messages.deliver.count
- rabbitmq.queue.messages.deliver.rate
- rabbitmq.queue.messages.deliver\_get.count
- rabbitmq.queue.messages.deliver\_get.rate
- rabbitmq.queue.messages.publish.rate
- rabbitmq.queue.messages.rate
- rabbitmq.queue.messages.redeliver.rate
- rabbitmq.queue.messages\_ready.rate
- rabbitmq.queue.messages\_unacknowledged.rate

### よくあるご質問

- [タグファミリーに基づいて RabbitMQ キューをタグ付け][13]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/rabbitmq/images/rabbitmq_dashboard.png
[2]: https://www.rabbitmq.com
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://www.rabbitmq.com/management.html
[5]: https://www.rabbitmq.com/prometheus.html
[6]: https://www.rabbitmq.com/prometheus.html#default-endpoint
[7]: https://www.rabbitmq.com/rabbitmqctl.8.html#set_permissions
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://docs.datadoghq.com/ja/help/
[10]: https://www.datadoghq.com/blog/rabbitmq-monitoring
[11]: https://www.datadoghq.com/blog/rabbitmq-monitoring-tools
[12]: https://www.datadoghq.com/blog/monitoring-rabbitmq-performance-with-datadog
[13]: https://docs.datadoghq.com/ja/integrations/faq/tagging-rabbitmq-queues-by-tag-family/