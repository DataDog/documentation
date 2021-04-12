---
aliases:
  - /ja/integrations/memcached
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    memcached: assets/dashboards/memcached_dashboard.json
    memcached_screenboard: assets/dashboards/memcached_screenboard.json
  logs:
    source: memcached
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - web
  - caching
  - autodiscovery
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/mcache/README.md'
display_name: Memcached
draft: false
git_integration_title: mcache
guid: b1c4033c-bf96-4456-be63-e74ff171f991
integration_id: memcached
integration_title: Memcache
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: memcache.
metric_to_check: memcache.uptime
name: mcache
process_signatures:
  - memcached
public_title: Datadog-Memcache インテグレーション
short_description: メモリ使用量、ヒット数、ミス数、エビクション数、フィルパーセンテージなどを追跡する。
support: コア
supported_os:
  - linux
  - mac_os
---
## 概要

Agent の Memcache チェックを使用して、Memcache のメモリ使用量、ヒット数、ミス数、エビクション数、フィルパーセンテージなどを追跡します。

## セットアップ

### インストール

Memcache チェックは [Datadog Agent][1] パッケージに含まれています。Memcache サーバーに追加でインストールする必要はありません。

### コンフィギュレーション

ホストで実行されている Agent 用にこのチェックを構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[コンテナ化](#containerized)セクションを参照してください。

#### メトリクスの収集

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

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

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mcache/datadog_checks/mcache/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/ja/tracing/send_traces/
[5]: https://docs.datadoghq.com/ja/tracing/setup/
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

| パラメーター            | 値                                 |
| -------------------- | ------------------------------------- |
| `<インテグレーション名>` | `mcache`                              |
| `<初期コンフィギュレーション>`      | 空白または `{}`                         |
| `<インスタンスコンフィギュレーション>`  | `{"url": "%%host%%","port": "11211"}` |

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

#### ログの収集

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

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/apm/?tab=java
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[4]: https://docs.datadoghq.com/ja/tracing/setup/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の `status` サブコマンドを実行][2]し、Checks セクションで `mcache` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "mcache" >}}


`mcache.d/conf.yaml` で `options.slabs: true` と設定している場合、チェックは `memcache.slabs.*` メトリクスのみを収集します。同様に、`options.items: true` と設定している場合、チェックは `memcache.items.*` メトリクスのみを収集します。

### イベント

Mcache チェックには、イベントは含まれません。

### サービスのチェック

**memcache.can_connect**:<br>
Agent が memcache に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][3]までお問合せください。

## その他の参考資料

- [Memcached 監視を使用した Web アプリケーションのスピードアップ][4]
- [DogStatsD を使用した Memcached パフォーマンスメトリクスの実装][5]
- [Redis または Memcached を使用した ElastiCache のパフォーマンスメトリクスの監視][6]


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[3]: https://docs.datadoghq.com/ja/help/
[4]: https://www.datadoghq.com/blog/speed-up-web-applications-memcached
[5]: https://www.datadoghq.com/blog/instrument-memcached-performance-metrics-dogstatsd
[6]: https://www.datadoghq.com/blog/monitoring-elasticache-performance-metrics-with-redis-or-memcached