---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - processing
  - log collection
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/rabbitmq/README.md'
display_name: RabbitMQ
git_integration_title: rabbitmq
guid: a790a556-fbaa-4208-9d39-c42c3d57084b
integration_id: rabbitmq
integration_title: RabbitMQ
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: rabbitmq.
metric_to_check: rabbitmq.queue.messages
name: rabbitmq
process_signatures:
  - rabbitmq
public_title: Datadog-RabbitMQ インテグレーション
short_description: キューサイズ、コンシューマーカウント、未承認メッセージなどを追跡 more.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![RabbitMQ ダッシュボード][1]

## 概要

このチェックは、Datadog Agent を通じて [RabbitMQ][2] を監視します。

* キューサイズ、コンシューマーカウント、未承認メッセージ、再配布メッセージなどのキューベースの統計を追跡できます。
* 待機プロセス、使用されたソケット、使用されたファイルディスクリプタなどのノードベースの統計を追跡できます。
* vhost の死活状態や接続数を監視できます。

これらは一例です。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][3]のガイドを参照してこの手順を行ってください。

### インストール

RabbitMQ チェックは [Datadog Agent][4] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィグレーション

RabbitMQ の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][5]のルートにある `conf.d/` フォルダーの `rabbitmq.d/conf.yaml` ファイルを編集します。使用可能なすべての構成オプションの詳細については、[サンプル rabbitmq.d/conf.yaml][6] を参照してください。

#### RabbitMQ の準備

RabbitMQ 管理プラグインを有効にします。詳細については、[RabbitMQ のドキュメント][7]を参照してください。

さらに、Agent ユーザーには、少なくとも `monitoring` タグと以下のアクセス許可が必要です。

| アクセス許可 | コマンド            |
|------------|--------------------|
| **conf**   | `^aliveness-test$` |
| **write**  | `^amq\.default$`   |
| **read**   | `.*`               |

次のコマンドで、デフォルトの vhost 用に Agent ユーザーを作成します。

```
rabbitmqctl add_user datadog <SECRET>
rabbitmqctl set_permissions  -p / datadog "^aliveness-test$" "^amq\.default$" ".*"
rabbitmqctl set_user_tags datadog monitoring
```

ここで、`/` はデフォルトのホストを表します。これを、指定した仮想ホスト名に設定してください。詳細については、[RabbitMQ のドキュメント][8]を参照してください。

#### メトリクスの収集

* [RabbitMQ のメトリクス](#metrics)の収集を開始するには、`rabbitmq.d/conf.yaml` ファイルに次の構成ブロックを追加します。

```
init_config:

instances:
  - rabbitmq_api_url: http://localhost:15672/api/
  #  username: <username> # RabbitMQ API が認証を必要とする場合。デフォルトは guest
  #  password: <password> # デフォルトは guest
  #  tag_families: true           # デフォルトは false
  #  vhosts:
  #    - <YOUR_VHOST>             # すべての vhost が必要な場合は設定しません
```

`vhosts` を設定しなかった場合、Agent は、すべての vhost に対して以下を送信します。

1. `rabbitmq.aliveness` サービスチェック
2. `rabbitmq.connections` メトリクス

`vhosts` を設定した場合、Agent は指定された vhost に対してのみ、このチェックとメトリクスを送信します。

`queues` と `nodes` にも同様に機能するオプションがあります。Agent は、デフォルトですべてのキューとノードをチェックしますが、リストまたは正規表現を指定してこれを制限できます。例については、[rabbitmq.d/conf.yaml][6] を参照してください。

構成オプション

| オプション                           | 必須 | 説明                                                                                                                                                                                                                                                                                                                                                                                                 |
|----------------------------------|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `rabbitmq_api_url`               | はい      | [RabbitMQ Managment Plugin][9] の API URL を指します。                                                                                                                                                                                                                                                                                                                                                |
| `tls_verify`                     | いいえ      |  `false` に設定すると、`rabbitmq_api_url` が https を使用する場合に TLS CERT チェーンの検証をスキップします。デフォルトは `true` です。                                                                                                                                                                                                                                                                                                                                              |
| `username`                       | いいえ       | ユーザー名。デフォルトは 'guest' です。                                                                                                                                                                                                                                                                                                                                                                              |
| `password`                       | いいえ       | パスワード。デフォルトは 'guest' です。                                                                                                                                                                                                                                                                                                                                                                               |
| `tag_families`                   | いいえ       | 正規表現一致に基づいてキュー「ファミリー」をタグ付け。デフォルトは false です。                                                                                                                                                                                                                                                                                                                                         |
| `nodes` または `nodes_regexes`       | いいえ       | これらのパラメーターを使用して、メトリクスを収集するノードを最大で 100 個指定します。100 ノード未満の場合、このパラメーターを設定する必要はありません。デフォルトでは、すべてのノードのメトリクスが収集されます。                                                                                                                                                                                            |
| `queues` または `queues_regexes`     | いいえ       | これらのパラメーターを使用して、メトリクスを収集するキューを最大で 200 個指定します。200 キュー未満の場合、このパラメーターを設定する必要はありません。デフォルトでは、すべてのキューのメトリクスが収集されます。vhosts を設定した場合は、キュー名に `vhost_name/queue_name` を設定します。`tag_families` を有効にした場合は、正規表現で最初にキャプチャされたグループが `queue_family` タグとして使用されます。 |
| `exchanges` または `exchanges_regex` | いいえ       | これらのパラメーターを使用して、メトリクスを収集するエクスチェンジを最大で 50 個指定します。50 エクスチェンジ未満の場合、このパラメーターを設定する必要はありません。デフォルトでは、すべてのエクスチェンジのメトリクスが収集されます。                                                                                                                                                                                  |
| `vhosts`                         | いいえ       | デフォルトでは、すべての vhost のリストが取得され、死活情報 API を使用してそれぞれがチェックされます。特定の vhost のみを監視する場合は、関心がある vhost のみをリストします。                                                                                                                                                                                                                              |

[Agent を再起動][10]すると、Datadog への RabbitMQ メトリクス、イベント、およびサービスチェックの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

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

4. [Agent を再起動します][10]。

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
* [RabbitMQ 監視のキーメトリクス][14]
* [RabbitMQ 監視ツールでメトリクスを収集][15]
* [Datadog を使用した RabbitMQ パフォーマンスの監視][16]

### よくあるご質問
* [タグファミリーに基づいて RabbitMQ キューをタグ付け][17]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/rabbitmq/images/rabbitmq_dashboard.png
[2]: https://www.rabbitmq.com
[3]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[4]: https://app.datadoghq.com/account/settings#agent
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[6]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/datadog_checks/rabbitmq/data/conf.yaml.example
[7]: https://www.rabbitmq.com/management.html
[8]: https://www.rabbitmq.com/rabbitmqctl.8.html#set_permissions
[9]: https://www.rabbitmq.com/management.html
[10]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/rabbitmq/metadata.csv
[13]: https://docs.datadoghq.com/ja/help
[14]: https://www.datadoghq.com/blog/rabbitmq-monitoring
[15]: https://www.datadoghq.com/blog/rabbitmq-monitoring-tools
[16]: https://www.datadoghq.com/blog/monitoring-rabbitmq-performance-with-datadog
[17]: https://docs.datadoghq.com/ja/integrations/faq/tagging-rabbitmq-queues-by-tag-family


{{< get-dependencies >}}