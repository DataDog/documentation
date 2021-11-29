---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Scylla Overview: assets/dashboards/overview.json
  logs:
    source: Scylla
  metrics_metadata: metadata.csv
  monitors:
    '[Scylla] Server is shutting down': assets/monitors/instance_down.json
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - data store
  - ログの収集
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/scylla/README.md
display_name: Scylla
draft: false
git_integration_title: Scylla
guid: 875e4d62-831b-4929-bea1-57e5c7016d65
integration_id: Scylla
integration_title: Scylla
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: Scylla.
metric_to_check: scylla.node.operation_mode
name: Scylla
public_title: Datadog-Scylla インテグレーション
short_description: クラスターのリソース、レイテンシー、健全性などを追跡
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

Datadog-[Scylla][1] のインテグレーションは、デフォルトで公開されたメトリクスの大部分を収集します。その際、ユーザー特有のニーズを基づいて追加のグループをカスタマイズすることもできます。

Scylla は「ドロップインの Apache Cassandra 代替」として使用できる、オープンソースの NoSQL データストアです。Cassandra モデルを最新のハードウェアに対応するように再設計し、必要なクラスターのサイズを減らしながら理想的なスループットとパフォーマンスを向上させています。

## セットアップ

以下の手順に従って、このチェックをインストールし、ホストで実行中の Agent に対して構成します。

### インストール

Scylla チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

1. Scylla のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `scylla.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル scylla.d/conf.yaml][3] を参照してください。

2. [Agent を再起動します][4]。

##### ログの収集

Scylla には複数の出力モードがあり、実行中の環境に応じて異なります。アプリケーションによるログ生成の詳細は、[Scylla ドキュメント][5]を参照してください。

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

      ```yaml
       logs_enabled: true
     ```

2. `scylla.d/conf.yaml` ファイルのコメントを解除して、ログコンフィギュレーションブロックを編集します。環境に基づいて、 `type`、`path`、`service` パラメーターの値を変更してください。使用可能なすべての構成オプションの詳細については、[サンプル scylla.d/conf.yaml][3] を参照してください。

      ```yaml
       logs:
         - type: file
           path: <LOG_FILE_PATH>
           source: scylla
           service: <SERVICE_NAME>
           #To handle multi line that starts with yyyy-mm-dd use the following pattern
           #log_processing_rules:
           #  - type: multi_line
           #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
           #    name: new_log_start_with_date
     ```

3. [Agent を再起動します][4]。

Kubernetes 環境でログを収集する Agent を構成する追加の情報に関しては、[Datadog ドキュメント][6]を参照してください。

### 検証

[Agent の status サブコマンドを実行][7]し、Checks セクションで `scylla` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "scylla" >}}


### イベント

Scylla チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "scylla" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。


[1]: https://scylladb.com
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://github.com/DataDog/integrations-core/blob/master/scylla/datadog_checks/scylla/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.scylladb.com/getting-started/logging/
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-core/blob/master/scylla/metadata.csv
[9]: https://github.com/DataDog/integrations-core/blob/master/scylla/assets/service_checks.json
[10]: https://docs.datadoghq.com/ja/help/