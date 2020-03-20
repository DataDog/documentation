---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - log collection
  - autodiscovery
creates_events: true
ddtype: チェック
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/rabbitmq/README.md'
display_name: RabbitMQ
git_integration_title: rabbitmq
guid: a790a556-fbaa-4208-9d39-c42c3d57084b
integration_id: rabbitmq
integration_title: RabbitMQ
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: rabbitmq.
metric_to_check: rabbitmq.queue.messages
name: rabbitmq
process_signatures:
  - rabbitmq
public_title: Datadog-RabbitMQ インテグレーション
short_description: キューサイズ、コンシューマーカウント、未承認メッセージなどを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
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

RabbitMQ 管理プラグインを有効にします。詳細については、[RabbitMQ のドキュメント][4]を参照してください。さらに、Agent ユーザーには、少なくとも `monitoring` タグと以下のアクセス許可が必要です。

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

#### ホスト

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

##### メトリクスの収集

1. RabbitMQ メトリクスの収集を開始するには、[Agent の構成ディレクトリ][6]のルートにある `conf.d/` フォルダーの `rabbitmq.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル rabbitmq.d/conf.yaml][7] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param rabbit_api_url - string - required
     ## For every instance a 'rabbitmq_api_url' must be provided, pointing to the api
     ## url of the RabbitMQ Managment Plugin (http://www.rabbitmq.com/management.html).
     #
     - rabbitmq_api_url: http://localhost:15672/api/
   ```

   **注**: Agent は、デフォルトですべてのキュー、vhost、ノードをチェックしますが、リストまたは正規表現を指定してこれを制限できます。例については、[rabbitmq.d/conf.yaml][7] を参照してください。

2. [Agent を再起動します][8]。

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

3. RabbitMQ のログの収集を開始するには、次の構成ブロックを `rabbitmq.d/conf.yaml` ファイルに追加します。

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

4. [Agent を再起動します][8]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][9]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                        |
| -------------------- | -------------------------------------------- |
| `<INTEGRATION_NAME>` | `rabbitmq`                                   |
| `<INIT_CONFIG>`      | 空白または `{}`                                |
| `<INSTANCE_CONFIG>`  | `{"rabbitmq_api_url":"%%host%%:15672/api/"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Docker ログ収集のドキュメント][10]を参照してください。

| パラメーター      | 値                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "rabbitmq", "service": "rabbitmq", "log_processing_rules": {"type":"multi_line","name":"logs_starts_with_equal_sign", "pattern": "="}}` |

### 検証

[Agent の status サブコマンドを実行][11]し、Checks セクションで `rabbitmq` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "rabbitmq" >}}


Agent は、キュー名に基づいて `rabbitmq.queue.*` メトリクスをタグ付けし、ノード名に基づいて `rabbitmq.node.*` メトリクスをタグ付けします。

### イベント

パフォーマンス上の理由から、RabbitMQ チェックは、メトリクスの収集対象となるエクスチェンジ、キュー、ノードの数を制限します。この制限に近づくと、イベントストリームに警告レベルのイベントが送信されます。

エクスチェンジ、キュー、またはノードの数を増やす必要がある場合は、[Datadog のサポートチーム][13]までお問合せください。

### サービスのチェック

**rabbitmq.aliveness**:<br>
Agent は、すべての vhost (`vhosts` が構成されていない場合) または一部の vhost (`vhosts` が構成されている場合) にこのサービスチェックを送信します。各サービスチェックは、`vhost:<vhost_name>` でタグ付けされます。すべての死活情報チェックが失敗した場合は `CRITICAL` を返します。それ以外の場合は、`OK` を返します。

**rabbitmq.status**:<br>
Agent が RabbitMQ に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][13]までお問合せください。

## その他の参考資料

お役に立つドキュメント、リンクや記事:

### Datadog ブログ

- [RabbitMQ 監視のキーメトリクス][14]
- [RabbitMQ 監視ツールでメトリクスを収集][15]
- [Datadog を使用した RabbitMQ パフォーマンスの監視][16]

### よくあるご質問

- [タグファミリーに基づいて RabbitMQ キューをタグ付け][17]

[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/rabbitmq/images/rabbitmq_dashboard.png
[2]: https://www.rabbitmq.com
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://www.rabbitmq.com/management.html
[5]: https://www.rabbitmq.com/rabbitmqctl.8.html#set_permissions
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[7]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/conf.yaml.example
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations/
[10]: https://docs.datadoghq.com/ja/agent/docker/log/
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/metadata.csv
[13]: https://docs.datadoghq.com/ja/help
[14]: https://www.datadoghq.com/blog/rabbitmq-monitoring
[15]: https://www.datadoghq.com/blog/rabbitmq-monitoring-tools
[16]: https://www.datadoghq.com/blog/monitoring-rabbitmq-performance-with-datadog
[17]: https://docs.datadoghq.com/ja/integrations/faq/tagging-rabbitmq-queues-by-tag-family