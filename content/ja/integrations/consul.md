---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards: {}
  logs:
    source: consul
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - orchestration
  - configuration & deployment
  - notification
  - log collection
  - autodiscovery
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/consul/README.md'
display_name: Consul
draft: false
git_integration_title: consul
guid: ec1e9fac-a339-49a3-b501-60656d2a5671
integration_id: consul
integration_title: Consul
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: consul.
metric_to_check: consul.peers
name: consul
process_signatures:
  - consul agent
  - consul_agent
  - consul-agent
public_title: Datadog-Consul インテグレーション
short_description: Consul 健全性チェックのアラート、サービス/ノードマッピングの表示、その他
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Consul ダッシュ][1]

## 概要

Datadog Agent は、以下のような多くのメトリクスを Consul ノードから収集します。

- Consul ピアの合計数
- サービス健全性 - 特定のサービスに対して、UP、PASSING、WARNING、CRITICAL なノードの数
- ノード健全性 - 特定のノードに対して、UP、PASSING、WARNING、CRITICAL なサービスの数
- ネットワーク座標系 - データセンター間およびデータセンター内のレイテンシー

_Consul_ Agent は DogStatsD 経由でさらに多くのメトリクスを提供できます。これらは、Consul に依存するサービスではなく、Consul 自体の内部健全性に関連するメトリクスです。以下のメトリクスがあります。

- Serf のイベントとメンバーフラップ
- Raft プロトコル
- DNS パフォーマンス

その他にも多数あります。

メトリクスに加えて、Datadog Agent は Consul の健全性チェックごとにサービスチェックを送信し、新しいリーダー選出ごとにイベントを送信します。

## セットアップ

### インストール

Datadog Agent の Consul チェックは [Datadog Agent][2] パッケージに含まれています。Consul ノードに追加でインストールする必要はありません。

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. Consul のメトリクスの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `consul.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル consul.d/conf.yaml][2] を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Where your Consul HTTP Server Lives
     ## Point the URL at the leader to get metrics about your Consul Cluster.
     ## Remind to use https instead of http if your Consul setup is configured to do so.
     #
     - url: http://localhost:8500
   ```

2. [Agent を再起動します][3]。

Consul Agent をリロードすると、DogStatsD への追加の Consul メトリクスの送信が開始されます。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

2. Consul のログの収集を開始するには、次の構成ブロックを `consul.yaml` ファイルに追加します。

   ```yaml
   logs:
     - type: file
       path: /var/log/consul_server.log
       source: consul
       service: myservice
   ```

   `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。
   使用可能なすべてのコンフィギュレーションオプションについては、[サンプル consul.d/conf.yaml][2] を参照してください。

3. [Agent を再起動します][3]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                              |
| -------------------- | ---------------------------------- |
| `<インテグレーション名>` | `consul`                           |
| `<初期コンフィギュレーション>`      | 空白または `{}`                      |
| `<インスタンスコンフィギュレーション>`  | `{"url": "https://%%host%%:8500"}` |

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "consul", "service": "<サービス名>"}` |

#### DogStatsD

任意で、Agent を使用してデータを Consul から取得するのではなく、Consul から [DogStatsD][3] 経由で Agent に送信するよう構成することも可能です。

1. Consul のメインのコンフィギュレーションファイルで、最上位レベルの `telemetry` キーの下にネストした `dogstatsd_addr` を追加することで、DogStatsD メトリクスを送信するよう Consul を構成します。

    ```conf
    {
      ...
      "telemetry": {
        "dogstatsd_addr": "127.0.0.1:8125"
      },
      ...
    }
    ```

2. メトリクスが正しくタグ付けされるよう下記のコンフィギュレーションを追加し、[Datadog Agent のメインコンフィギュレーションファイル][4]である `datadog.yaml` を更新します。

   ```yaml
   # dogstatsd_mapper_cache_size: 1000  # default to 1000
   dogstatsd_mapper_profiles:
     - name: consul
       prefix: "consul."
       mappings:
         - match: 'consul\.http\.([a-zA-Z]+)\.(.*)'
           match_type: "regex"
           name: "consul.http.request"
           tags:
             method: "$1"
             path: "$2"
         - match: 'consul\.raft\.replication\.appendEntries\.logs\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.logs"
           tags:
             peer_id: "$1"
         - match: 'consul\.raft\.replication\.appendEntries\.rpc\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.appendEntries.rpc"
           tags:
             peer_id: "$1"
         - match: 'consul\.raft\.replication\.heartbeat\.([0-9a-f-]+)'
           match_type: "regex"
           name: "consul.raft.replication.heartbeat"
           tags:
             peer_id: "$1"
   ```

3. [Agent を再起動します][5]。

#### OpenMetrics

DogStatsD を使用する代わりに、`use_prometheus_endpoint` コンフィギュレーションオプションを有効にして、Prometheus エンドポイントから々メトリクスを取得できます。


**注**: DogStatsD メソッドまたは Prometheus メソッドのいずれかを使用し、同じインスタンスに両方を有効化しないようご注意ください。

1. Consul を構成し、Prometheus のエンドポイントにメトリクスを公開します。[`prometheus_retention_time`][6] を、メインの Consul コンフィギュレーションファイルの最上位レベルの `telemetry` キーにネストするよう設定します。

    ```conf
    {
      ...
      "telemetry": {
        "prometheus_retention_time": "360h"
      },
      ...
    }
    ```

2. Prometheus エンドポイントの使用を開始するには、[Agent のコンフィギュレーションディレクトリ][7]のルートにある `conf.d/` フォルダーで `consul.d/conf.yaml` ファイルを編集します。
    ```yaml
    instances:
        - url: <EXAMPLE>
          use_prometheus_endpoint: true
    ```

3. [Agent を再起動します][5]。

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[3]: https://docs.datadoghq.com/ja/developers/dogstatsd/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://www.consul.io/docs/agent/options#telemetry-prometheus_retention_time
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][3]し、Checks セクションで `consul` を探します。

**注**: Consul ノードでデバッグログが有効になっている場合は、Datadog Agent の通常のポーリングが Consul ログに表示されます。

```text
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/status/leader (59.344us) from=127.0.0.1:53768
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/status/peers (62.678us) from=127.0.0.1:53770
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/health/state/any (106.725us) from=127.0.0.1:53772
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/catalog/services (79.657us) from=127.0.0.1:53774
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/health/service/consul (153.917us) from=127.0.0.1:53776
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/coordinate/datacenters (71.778us) from=127.0.0.1:53778
2017/03/27 21:38:12 [DEBUG] http: Request GET /v1/coordinate/nodes (84.95us) from=127.0.0.1:53780
```

#### Consul Agent から DogStatsD へ

`netstat` を使用して、Consul のメトリクスも送信されていることを確認します。

```shell
$ sudo netstat -nup | grep "127.0.0.1:8125.*ESTABLISHED"
udp        0      0 127.0.0.1:53874         127.0.0.1:8125          ESTABLISHED 23176/consul
```

## 収集データ

### メトリクス
{{< get-metrics-from-git "consul" >}}


Consul Agent が DogStatsD に送信するメトリクスの詳細については、[Consul の Telemetry に関するドキュメント][4]を参照してください。

ネットワークレイテンシーメトリクスの計算方法については、[Consul のネットワーク座標系に関するドキュメント][5]を参照してください。

### イベント

**consul.new_leader**:<br>
Datadog Agent は、Consul クラスターが新しいリーダーを選出すると、`prev_consul_leader`、`curr_consul_leader`、および `consul_datacenter` のタグを付けてイベントを送信します。

### サービスのチェック

**consul.check**:<br>
Datadog Agent は、Consul の健全性チェックごとにサービスチェックを送信します。それぞれ以下のタグが付きます。

- `service:<name>`。Consul が `ServiceName` を報告する場合
- `consul_service_id:<id>`。Consul が `ServiceID` を報告する場合

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

## その他の参考資料

- [Datadog を使用した Consul の健全性とパフォーマンスの監視][7]
- [Datadog と Consul][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/consul/images/consul-dash.png
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[4]: https://www.consul.io/docs/agent/telemetry.html
[5]: https://www.consul.io/docs/internals/coordinates.html
[6]: https://docs.datadoghq.com/ja/help/
[7]: https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog
[8]: https://engineering.datadoghq.com/consul-at-datadog