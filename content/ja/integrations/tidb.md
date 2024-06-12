---
app_id: tidb
app_uuid: 79e5c6d7-c494-4df7-98bc-c639e211c0b8
assets:
  dashboards:
    TiDB Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: tidb_cluster.tidb_executor_statement_total
      metadata_path: metadata.csv
      prefix: tidb_cluster
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10172
    source_type_name: TiDB
  logs:
    source: tidb
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: PingCAP
  sales_email: xuyifan02@pingcap.com
  support_email: xuyifan02@pingcap.com
categories:
- data stores
- cloud
- ログの収集
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/tidb/README.md
display_on_public_website: true
draft: false
git_integration_title: tidb
integration_id: tidb
integration_title: TiDB
integration_version: 2.1.0
is_public: true
manifest_version: 2.0.0
name: tidb
public_title: TiDB
short_description: TiDB クラスター用インテグレーション
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
  - Category::Cloud
  - Category::Log Collection
  configuration: README.md#Setup
  description: TiDB クラスター用インテグレーション
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: TiDB
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-extras -->


## 概要

[TiDB][1] クラスターを Datadog に接続すると、以下のことができます。

- クラスターの主要な TiDB メトリクスを収集する。
- TiDB/TiKV/TiFlash ログやスロークエリログなど、クラスターのログを収集する。
- 提供されたダッシュボードでクラスターのパフォーマンスを視覚化する。

> **注**:
>
> - このインテグレーションには TiDB 4.0 以降が必要です。 
> - TiDB Cloud の場合は、[TiDB Cloud インテグレーション][2]をご覧ください。

## 計画と使用

### インフラストラクチャーリスト

まず、[Datadog Agent をダウンロードして起動][3]します。

次に、TiDB チェックを手動でインストールします。[指示は環境によって異なります][4]。

`datadog-agent integration install -t datadog-tidb==<INTEGRATION_VERSION>` を実行します。

### ブラウザトラブルシューティング

##### メトリクスの収集

1. TiDB のパフォーマンスデータを収集するには、Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `tidb.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル tidb.d/conf.yaml][5] を参照してください。

  [サンプル tidb.d/conf.yaml][5] で構成されるのは、PD インスタンスのみです。TiDB クラスターのその他のインスタンスについては、手動で構成する必要があります。たとえば、、以下のようになります。

  ```yaml
  init_config:

  instances:

    - pd_metric_url: http://localhost:2379/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tidb_metric_url: http://localhost:10080/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tikv_metric_url: http://localhost:20180/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tiflash_metric_url: http://localhost:8234/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01

    - tiflash_proxy_metric_url: http://localhost:20292/metrics
      send_distribution_buckets: true
      tags:
        - cluster_name:cluster01
  ```

3. [Agent を再起動します][6]。

##### 収集データ

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. TiDB のログの収集を開始するには、次の構成ブロックを `tidb.d/conf.yaml` ファイルに追加します。

   ```yaml
   logs:
    # pd log
    - type: file
      path: "/tidb-deploy/pd-2379/log/pd*.log"
      service: "tidb-cluster"
      source: "pd"

    # tikv log
    - type: file
      path: "/tidb-deploy/tikv-20160/log/tikv*.log"
      service: "tidb-cluster"
      source: "tikv"

    # tidb log
    - type: file
      path: "/tidb-deploy/tidb-4000/log/tidb*.log"
      service: "tidb-cluster"
      source: "tidb"
      exclude_paths:
        - /tidb-deploy/tidb-4000/log/tidb_slow_query.log
    - type: file
      path: "/tidb-deploy/tidb-4000/log/tidb_slow_query*.log"
      service: "tidb-cluster"
      source: "tidb"
      log_processing_rules:
        - type: multi_line
          name: new_log_start_with_datetime
          pattern: '#\sTime:'
      tags:
        - "custom_format:tidb_slow_query"

    # tiflash log
    - type: file
      path: "/tidb-deploy/tiflash-9000/log/tiflash*.log"
      service: "tidb-cluster"
      source: "tiflash"
   ```

   クラスターのコンフィギュレーションに従って、`path` と `service` を変更します。

   次のコマンドを使用して、すべてのログパスを表示します。

   ```shell
   # show deploying directories
   tiup cluster display <YOUR_CLUSTER_NAME>
   # find specific logging file path by command arguments
   ps -fwwp <TIDB_PROCESS_PID/PD_PROCESS_PID/etc.>
   ```

3. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンド][7]を実行し、Checks セクションで `tidb` を探します。

## リアルユーザーモニタリング

### データセキュリティ
{{< get-metrics-from-git "tidb" >}}


> `metrics` コンフィギュレーションオプションを使用して TiDB クラスターから追加のメトリクスを収集することが可能です。

### ヘルプ

TiDB チェックには、イベントは含まれません。

### ヘルプ
{{< get-service-checks-from-git "tidb" >}}


## ヘルプ

### macOS で TiKV および TiFlash インスタンスに CPU とメモリのメトリクスがありません

以下のケースで、 TiKV および TiFlash の CPU とメモリのメトリクスが提供されていません。

- macOS で TiKV または TiFlash インスタンスを [tiup playground][10] で実行しています。
- 新しい Apple M1 マシンで TiKV または TiFlash インスタンスを [docker-compose upd][11] で実行しています。

### メトリクスが多すぎます

TiDB チェックでは、Datadog の `distribution` メトリクスタイプがデフォルトで有効になります。データのこの部分は非常に大きく、多くのリソースを消費する可能性があります。この動作は、`tidb.yml` ファイルで変更できます。

- `send_distribution_buckets: false`

Since there are many important metrics in a TiDB クラスターには多くの重要なメトリクスがあるため、TiDB チェックはデフォルトで `max_returned_metrics` を `10000` に設定します。必要に応じて、`tidb.yml` ファイルで `max_returned_metrics` を減少できます。

- `max_returned_metrics: 1000`

ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

[1]: https://docs.pingcap.com/tidb/stable
[2]: https://docs.datadoghq.com/ja/integrations/tidb_cloud/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/ja/agent/guide/community-integrations-installation-with-docker-agent
[5]: https://github.com/DataDog/integrations-extras/blob/master/tidb/datadog_checks/tidb/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6v7#restart-the-agent
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[8]: https://github.com/DataDog/integrations-extras/blob/master/tidb/metadata.csv
[9]: https://github.com/DataDog/integrations-extras/blob/master/tidb/assets/service_checks.json
[10]: https://docs.pingcap.com/tidb/stable/tiup-playground
[11]: https://github.com/DataDog/integrations-extras/tree/master/tidb/tests/compose
[12]: https://docs.datadoghq.com/ja/help/