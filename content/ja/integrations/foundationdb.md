---
app_id: foundationdb
app_uuid: 0ab23627-c6f5-4ec5-b42c-43b85dc26445
assets:
  dashboards:
    FoundationDB Latency Probe: assets/dashboards/foundationdb_latency_probe.json
    FoundationDB Processes and Utilization: assets/dashboards/foundationdb_processes_and_utilization.json
    FoundationDB Transactions and Queues: assets/dashboards/foundationdb_transactions_and_queues.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check:
      - foundationdb.processes
      - foundationdb.instances
      metadata_path: metadata.csv
      prefix: foundationdb.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10258
    source_type_name: FoundationDB
  logs:
    source: foundationdb
  monitors:
    FoundationDB Errors Logged: assets/monitors/errors_logged.json
    FoundationDB High Durability Lag: assets/monitors/high_durability_lag.json
    FoundationDB High Level Of Conflicted Transactions: assets/monitors/conflicts.json
    FoundationDB High Level Of Rejected Transactions: assets/monitors/rejections.json
    FoundationDB Log Queue Reaching Spill Threshold: assets/monitors/log_queue_spill.json
    FoundationDB Low Disk Space: assets/monitors/low_disk_space.json
    FoundationDB Read Latency Probe: assets/monitors/read_latency_probe.json
    FoundationDB Status Check: assets/monitors/service_check.json
    FoundationDB Transaction Commit Latency Probe: assets/monitors/transaction_commit_latency.json
    FoundationDB Transaction Start Latency Probe: assets/monitors/transaction_start_latency.json
  saved_views:
    all: assets/saved_views/all.json
    errors: assets/saved_views/errors.json
    errors_and_strong_warnings: assets/saved_views/errors_and_strong_warnings.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com (日本語対応)
  support_email: help@datadoghq.com
categories:
- data stores
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/foundationdb/README.md
display_on_public_website: true
draft: false
git_integration_title: foundationdb
integration_id: foundationdb
integration_title: FoundationDB
integration_version: 1.4.0
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: foundationdb
public_title: FoundationDB
short_description: FoundationDB インテグレーション
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
  - Category::Data Stores
  - Category::Log Collection
  configuration: README.md#Setup
  description: FoundationDB インテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: FoundationDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

このチェックでは、Datadog Agent を通じて [FoundationDB][1] を監視します。FoundationDB クラスターが健全であることを確認するほか、多数のメトリクスを収集し、オプションで FoundationDB トランザクションログも収集します。

## 計画と使用

チェックとメトリクスはどちらも FoundationDB クラスター全体に適用され、1 つのホストにのみインストールする必要があります。このホストは FoundationDB を実行しているホストである必要はなく、アクセス可能なホストであれば問題ありません。

### インフラストラクチャーリスト

FoundationDB チェックは [Datadog Agent][2] パッケージに含まれていますが、[FoundationDB クライアント][3]がインストールされている必要があります。

### ブラウザトラブルシューティング

{{< tabs >}}
{{% tab "ホスト" %}}

#### メトリクスベース SLO

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. FoundationDB メトリクスの収集を開始するには、Agent の構成ディレクトリのルートにある `conf.d/` フォルダ内の `foundationdb.d/conf.yaml` ファイルを編集します。
   使用可能なすべての構成オプションの詳細については、[サンプル foundationdb.d/conf.yaml][1] を参照してください。

2. チェックするクラスターは、[デフォルトの場所][2]にあるクラスターファイルを検索することで決定されます。クラスターファイルが他の場所にある場合は、
`cluster_file` プロパティを設定します。チェックインスタンスごとに監視できるクラスターは 1 つだけです。

3. クラスターが [TLS を使用するように構成されている][3]場合、構成にさらなるプロパティを設定する必要があります。これらのプロパティは、
そのようなクラスターに接続するために `fdbcli` に与えられる TLS 関連のオプションの名前に従います。

4. [Agent を再起動します][4]。

##### 収集データ

FoundationDB はデフォルトで XML ログを書き込みますが、Datadog インテグレーションは JSON ログを想定しています。そのため、FoundationDB に構成変更を行う必要があります。

1. `foundationdb.conf` ファイルを探します。`fdbserver` セクションで、
   キー `trace_format` を追加または変更して、値を `json` にします。
   また、`logdir` をメモしておきます。

    ```
    [fdbserver]
    ...
    logdir = /var/log/foundationdb
    trace_format = json
    ```

2. FoundationDB サーバーを再起動し、変更を有効にします。
   `logdir` にあるログが JSON で書き込まれていることを確認します。

3. `datadog.yaml` ファイルでログ収集が有効になっていることを確認します。

    ```yaml
    logs_enabled: true
    ```

4. `foundationdb.d/conf.yaml` ファイルで、`logs` セクションのコメントを解除し、
   パスを FoundationDB の構成ファイルにあるものに設定し、
   `*.json` を追加します。

    ```yaml
    logs:
      - type: file
        path: /var/log/foundationdb/*.json
        service: foundationdb
        source: foundationdb
    ```

5. Datadog Agent が、ディレクトリの一覧表示とそのファイルの読み取りに必要な権限を
   持っていることを確認します。

5. Datadog Agent を再起動します。

[1]: https://github.com/DataDog/integrations-core/blob/master/foundationdb/datadog_checks/foundationdb/data/conf.yaml.example
[2]: https://apple.github.io/foundationdb/administration.html#default-cluster-file
[3]: https://www.foundationdb.org/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。


##### メトリクスの収集

| パラメーター            | 値                                                      |
|----------------------|------------------------------------------------------------|
| `<INTEGRATION_NAME>` | `foundationdb`                                             |
| `<INIT_CONFIG>`      | 空白または `{}`                                              |
| `<INSTANCE_CONFIG>`  | `{}`                                                       |

##### 収集データ

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "foundationdb", "service": "<SERVICE_NAME>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}


### 検証

[Agent の status サブコマンドを実行][4]し、**Checks** セクションで `foundationdb` を探します。


## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "foundationdb" >}}


### ヘルプ

FoundationDB チェックには、イベントは含まれません。

## ヘルプ

ご不明な点は、[Datadog のサポートチーム][5]までお問い合わせください。


[1]: https://www.foundationdb.org/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://apple.github.io/foundationdb/downloads.html
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/