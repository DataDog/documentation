---
"app_id": "memcached"
"app_uuid": "711c00b1-c62c-4a50-867b-be1929950b2c"
"assets":
  "dashboards":
    "memcached": "assets/dashboards/memcached_dashboard.json"
    "memcached_screenboard": "assets/dashboards/memcached_screenboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "memcache.uptime"
      "metadata_path": "metadata.csv"
      "prefix": "memcache."
    "process_signatures":
    - "memcached"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "32"
    "source_type_name": "Memcached"
  "saved_views":
    "memcached_processes": "assets/saved_views/memcached_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "caching"
- "log collection"
- "tracing"
"custom_kind": "インテグレーション"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/mcache/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "mcache"
"integration_id": "memcached"
"integration_title": "Memcache"
"integration_version": "4.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "mcache"
"public_title": "Memcache"
"short_description": "メモリ使用量、ヒット数、ミス数、エビクション数、フィルパーセンテージなどを追跡する。"
"supported_os":
- "linux"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::キャッシュ"
  - "Category::ログの収集"
  - "Category::Tracing"
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "メモリ使用量、ヒット数、ミス数、エビクション数、フィルパーセンテージなどを追跡する。"
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Memcache"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## 概要

Agent の Memcache チェックを使用して、Memcache のメモリ使用量、ヒット数、ミス数、エビクション数、フィルパーセンテージなどを追跡します。

## セットアップ

### インストール

Memcache チェックは [Datadog Agent][1] パッケージに含まれています。Memcache サーバーに追加でインストールする必要はありません。

### 構成

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

Memcache サーバーを起動する際に、バインディングプロトコル `-B` を `binary` または `auto` に設定します。自動 (auto) がデフォルトです。

#### メトリクスの収集

{{< tabs >}}
{{% tab "ホスト" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

1. [Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `mcache.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル mcache.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## url used to connect to the Memcached instance.
     #
     - url: localhost
   ```

2. [Agent を再起動][3]すると、Datadog への Memcache メトリクスの送信が開始されます。

##### トレースの収集

Datadog APM は、Memcache と統合して分散システム全体のトレースを確認します。Datadog Agent v6 以降では、トレースの収集はデフォルトで有効化されています。トレースの収集を開始するには、以下の手順に従います。

1. [Datadog でトレースの収集を有効にします][4]。
2. [Memcache へのリクエストを作成するアプリケーションをインスツルメントします][5]。

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/tracing/send_traces/
[5]: https://docs.datadoghq.com/tracing/setup/
{{% /tab %}}
{{% tab "コンテナ化" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                 |
| -------------------- | ------------------------------------- |
| `<INTEGRATION_NAME>` | `mcache`                              |
| `<INIT_CONFIG>`      | 空白または `{}`                         |
| `<INSTANCE_CONFIG>`  | `{"url": "%%host%%","port": "11211"}` |

##### トレースの収集

コンテナ化されたアプリケーションの APM は、Agent v6 以降を実行するホストでサポートされていますが、トレースの収集を開始するには、追加のコンフィギュレーションが必要です。

Agent コンテナで必要な環境変数

| パラメーター            | 値                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

利用可能な環境変数とコンフィギュレーションの完全なリストについては、[Kubernetes アプリケーションのトレース][2]および [Kubernetes Daemon のセットアップ][3]を参照してください。

次に、[アプリケーションコンテナをインスツルメント][4]し、Agent コンテナの名前に `DD_AGENT_HOST` を設定します。

#### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. このコンフィギュレーションブロックを `mcache.d/conf.yaml` ファイルに追加すると、Memcached ログの収集を開始します。

   ```yaml
   logs:
     - type: file
       path: /var/log/memcached.log
       source: memcached
       service: mcache
   ```

    `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成します。

2. [Agent を再起動][5]して、変更を検証します。

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/kubernetes/apm/?tab=java
[3]: https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[4]: https://docs.datadoghq.com/tracing/setup/
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンド][2]を実行し、Checks セクションで `mcache` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mcache" >}}


`mcache.d/conf.yaml` で `options.slabs: true` と設定している場合、チェックは `memcache.slabs.*` メトリクスのみを収集します。同様に、`options.items: true` と設定している場合、チェックは `memcache.items.*` メトリクスのみを収集します。

### イベント

Mcache チェックには、イベントは含まれません。

### サービスチェック
{{< get-service-checks-from-git "mcache" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

- [Memcached 監視を使用した Web アプリケーションのスピードアップ][4]
- [DogStatsD を使用した Memcached パフォーマンスメトリクスの実装][5]
- [Redis または Memcached を使用した ElastiCache のパフォーマンスメトリクスの監視][6]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/help/
[4]: https://www.datadoghq.com/blog/speed-up-web-applications-memcached
[5]: https://www.datadoghq.com/blog/instrument-memcached-performance-metrics-dogstatsd
[6]: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached
