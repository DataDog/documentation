---
app_id: scylla
app_uuid: 1d655820-3010-4ae3-8273-a3798321d4d4
assets:
  dashboards:
    Scylla Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: scylla.node.operation_mode
      metadata_path: metadata.csv
      prefix: scylla.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10087
    source_type_name: Scylla
  monitors:
    '[Scylla] Server is shutting down': assets/monitors/instance_down.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- caching
- data stores
- log collection
custom_kind: インテグレーション
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/scylla/README.md
display_on_public_website: true
draft: false
git_integration_title: scylla
integration_id: scylla
integration_title: Scylla
integration_version: 2.7.1
is_public: true
manifest_version: 2.0.0
name: scylla
public_title: Scylla
short_description: Track cluster resources, latencies, health, and much more.
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Caching
  - Category::Data Stores
  - Category::Log Collection
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  configuration: README.md#Setup
  description: Track cluster resources, latencies, health, and much more.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Scylla
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Datadog-[Scylla][1] のインテグレーションは、デフォルトで公開されたメトリクスの大部分を収集します。その際、ユーザー特有のニーズを基づいて追加のグループをカスタマイズすることもできます。

Scylla は「ドロップインの Apache Cassandra 代替」として使用できる、オープンソースの NoSQL データストアです。Cassandra モデルを最新のハードウェアに対応するように再設計し、必要なクラスターのサイズを減らしながら理想的なスループットとパフォーマンスを向上させています。

## セットアップ

以下の手順に従って、このチェックをインストールし、ホストで実行中の Agent に対して構成します。

### インストール

Scylla チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

### 構成

1. Edit the `scylla.d/conf.yaml` file, in the `conf.d/` folder at the root of your Agent's configuration directory to start collecting your scylla performance data. See the [sample scylla.d/conf.yaml][3] for all available configuration options. If you previously implemented this integration, see the [legacy example][4].

2. [Agent を再起動します][5]。

##### ログ収集

Scylla has different modes of outputting logs depending on the environment it's running in. See the [Scylla documentation][6] for more specifics on how the application generates logs.

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

3. [Agent を再起動します][5]。

Kubernetes 環境のログを有効にするには、[Kubernetes ログ収集][7]を参照してください。

### 検証

[Run the Agent's status subcommand][8] and look for `scylla` under the Checks section.

## 収集データ

### メトリクス
{{< get-metrics-from-git "scylla" >}}


### イベント

Scylla チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "scylla" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][11]までお問合せください。


[1]: https://scylladb.com
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://github.com/DataDog/integrations-core/blob/master/scylla/datadog_checks/scylla/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/7.50.x/scylla/datadog_checks/scylla/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.scylladb.com/getting-started/logging/
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/scylla/metadata.csv
[10]: https://github.com/DataDog/integrations-core/blob/master/scylla/assets/service_checks.json
[11]: https://docs.datadoghq.com/ja/help/