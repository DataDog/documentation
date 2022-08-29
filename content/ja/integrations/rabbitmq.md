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
- autodiscovery
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/rabbitmq/README.md
display_on_public_website: true
draft: false
git_integration_title: rabbitmq
integration_id: rabbitmq
integration_title: RabbitMQ
integration_version: 3.1.0
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
  - Category::オートディスカバリー
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

### インストール

RabbitMQ チェックは [Datadog Agent][3] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

#### RabbitMQ の準備

[RabbitMQ Management Plugin][4] を有効化します。Agent ユーザーは、少なくとも`monitoring`タグとこれらの必要な権限が必要です。

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

ここで、`/` はデフォルトのホストを表します。これを、指定した仮想ホスト名に設定してください。詳細については、[RabbitMQ のドキュメント][5]を参照してください。

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

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                        |
| -------------------- | -------------------------------------------- |
| `<インテグレーション名>` | `rabbitmq`                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                |
| `<インスタンスコンフィギュレーション>`  | `{"rabbitmq_api_url":"%%host%%:15672/api/","username": <ユーザー名>, "password": <パスワード>}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "rabbitmq", "service": "rabbitmq", "log_processing_rules": [{"type":"multi_line","name":"logs_starts_with_equal_sign", "pattern": "="}]}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `rabbitmq` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "rabbitmq" >}}


Agent は、キュー名に基づいて `rabbitmq.queue.*` メトリクスをタグ付けし、ノード名に基づいて `rabbitmq.node.*` メトリクスをタグ付けします。

### イベント

パフォーマンス上の理由から、RabbitMQ チェックは、メトリクスの収集対象となるエクスチェンジ、キュー、ノードの数を制限します。この制限に近づくと、イベントストリームに警告レベルのイベントが送信されます。

エクスチェンジ、キュー、またはノードの数を増やす必要がある場合は、[Datadog のサポートチーム][7]までお問合せください。

### サービスのチェック
{{< get-service-checks-from-git "rabbitmq" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][7]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

- [RabbitMQ 監視のキーメトリクス][8]
- [RabbitMQ 監視ツールでメトリクスを収集][9]
- [Datadog を使用した RabbitMQ パフォーマンスの監視][10]

### よくあるご質問

- [タグファミリーに基づいて RabbitMQ キューをタグ付け][11]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/rabbitmq/images/rabbitmq_dashboard.png
[2]: https://www.rabbitmq.com
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://www.rabbitmq.com/management.html
[5]: https://www.rabbitmq.com/rabbitmqctl.8.html#set_permissions
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/ja/help/
[8]: https://www.datadoghq.com/blog/rabbitmq-monitoring
[9]: https://www.datadoghq.com/blog/rabbitmq-monitoring-tools
[10]: https://www.datadoghq.com/blog/monitoring-rabbitmq-performance-with-datadog
[11]: https://docs.datadoghq.com/ja/integrations/faq/tagging-rabbitmq-queues-by-tag-family/