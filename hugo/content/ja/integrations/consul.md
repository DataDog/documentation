---
app_id: consul
categories:
- configuration & deployment
- containers
- log collection
- network
- notifications
- orchestration
custom_kind: integration
description: Consul のヘルス チェックにアラートを設定し、サービスとノードのマッピングを表示 … more.
further_reading:
- link: https://docs.datadoghq.com/integrations/guide/hcp-consul
  tag: documentation
  text: Datadog を使用した HCP Consul の監視
- link: https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog
  tag: blog
  text: Datadog で Consul のヘルスとパフォーマンスを監視
- link: https://www.datadoghq.com/blog/engineering/consul-at-datadog/
  tag: blog
  text: Consul at Datadog
- link: https://www.datadoghq.com/blog/consul-metrics/
  tag: blog
  text: Consul を監視するキー メトリクス
- link: https://www.datadoghq.com/blog/consul-monitoring-tools/
  tag: blog
  text: Consul 監視ツール
- link: https://www.datadoghq.com/blog/consul-datadog/
  tag: blog
  text: Consul を Datadog で監視する方法
integration_version: 5.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Consul
---
![Consul Dash](https://raw.githubusercontent.com/DataDog/integrations-core/master/consul/images/consul-dash.png)

## 概要

Datadog Agent は、以下のような多くのメトリクスを Consul ノードから収集します。

- Consul ピアの合計数
- サービス健全性 - 特定のサービスに対して、UP、PASSING、WARNING、CRITICAL なノードの数
- ノード健全性 - 特定のノードに対して、UP、PASSING、WARNING、CRITICAL なサービスの数
- ネットワーク座標系 - データセンター間およびデータセンター内のレイテンシー

_Consul_ Agent は DogStatsD を使ってさらに多くのメトリクスを提供できます。これらは、Consul に依存するサービスではなく、Consul 自体の内部健全性に関連するメトリクスです。以下のメトリクスがあります。

- Serf のイベントとメンバーフラップ
- Raft プロトコル
- DNS パフォーマンス

その他にも多数あります。

メトリクスに加えて、Datadog Agent は Consul の健全性チェックごとにサービスチェックを送信し、新しいリーダー選出ごとにイベントを送信します。

## セットアップ

### インストール

Datadog Agent の Consul チェックは [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest) パッケージに含まれているため、Consul ノードに追加でインストールする必要はありません。

### 設定

{{< tabs >}}

{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには

##### メトリクスの収集

1. Consul メトリクスの収集を開始するには、`conf.d/` フォルダーにある `consul.d/conf.yaml` ファイルを編集してください。[エージェントの設定ディレクトリ](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) のルートにあります。すべての設定オプションについては、[サンプル consul.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example) を参照してください。

   ```yaml
   init_config:

   instances:
     ## @param url - string - required
     ## Where your Consul HTTP server lives,
     ## point the URL at the leader to get metrics about your Consul cluster.
     ## Use HTTPS instead of HTTP if your Consul setup is configured to do so.
     #
     - url: http://localhost:8500
   ```

1. [Restart the Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

###### OpenMetrics

オプションで、`use_prometheus_endpoint` コンフィギュレーションオプションを有効にして、Consul Prometheus エンドポイントから追加のメトリクスセットを取得できます。

**注**: DogStatsD または Prometheus メソッドを使用し、同じインスタンスに両方を有効化しないようご注意ください。

1. Prometheus エンドポイントへメトリクスを公開するよう Consul を構成します。メインの Consul 構成ファイルのトップレベル `telemetry` キー配下に [`prometheus_retention_time`](https://www.consul.io/docs/agent/options#telemetry-prometheus_retention_time) を設定してください。

   ```conf
   {
     ...
     "telemetry": {
       "prometheus_retention_time": "360h"
     },
     ...
   }
   ```

1. Prometheus エンドポイントを使用するには、[Agent 構成ディレクトリ](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory) 直下の `conf.d/` フォルダーにある `consul.d/conf.yaml` を編集します。

   ```yaml
   instances:
       - url: <EXAMPLE>
         use_prometheus_endpoint: true
   ```

1. [Restart the Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### DogStatsD

Prometheus エンドポイントの代わりに、[DogStatsD](https://docs.datadoghq.com/developers/dogstatsd/) を使用して同じ追加メトリクスを Agent へ送信するよう Consul を構成できます。

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

1. メトリクスに正しいタグを付与するため、[Datadog Agent メイン構成ファイル](https://docs.datadoghq.com/agent/guide/agent-configuration-files/) `datadog.yaml` を更新し、以下の設定を追加してください。

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

1. [Restart the Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

   ```yaml
   logs_enabled: true
   ```

1. `consul.yaml` ファイルでこのコンフィギュレーションブロックを編集して、Consul ログを収集します。

   ```yaml
   logs:
     - type: file
       path: /var/log/consul_server.log
       source: consul
       service: myservice
   ```

   `path` パラメーターと `service` パラメーターの値を変更し、環境に合わせて構成してください。
   利用可能なすべての設定オプションについては、[サンプル consul.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example) を参照してください。

1. [Restart the Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

{{% /tab %}}

{{% tab "Containerized" %}}

#### コンテナ化

コンテナ化環境の場合は、パラメータの適用方法について [自動検出 インテグレーション テンプレート](https://docs.datadoghq.com/agent/kubernetes/integrations/) を参照してください。

##### メトリクスの収集

| パラメーター            | 値                              |
| -------------------- | ---------------------------------- |
| `<INTEGRATION_NAME>` | `consul`                           |
| `<INIT_CONFIG>`      | 空白または `{}`                      |
| `<INSTANCE_CONFIG>`  | `{"url": "https://%%host%%:8500"}` |

##### ログ収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent ではログ収集はデフォルトで無効になっています。有効にするには、[Kubernetes のログ収集](https://docs.datadoghq.com/agent/kubernetes/log/) を参照してください。

| パラメーター      | 値                                               |
| -------------- | --------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "consul", "service": "<サービス名>"}` |

{{% /tab %}}

{{< /tabs >}}

### 検証

[Agent の status サブコマンド](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) を実行し、Checks セクションで `consul` を探します。

**注**: Consul ノードでデバッグログが有効になっている場合は、Datadog Agent の通常のポーリングが Consul ログに以下を表示します。

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

| | |
| --- | --- |
| **consul.catalog.nodes_critical** <br>(gauge) | \[Integration\] 登録済みノードのうち service ステータスが `critical` のノード数<br>_node として表示_ |
| **consul.catalog.nodes_passing** <br>(gauge) | \[Integration\] 登録済みノードのうち service ステータスが `passing` のノード数<br>_node として表示_ |
| **consul.catalog.nodes_up** <br>(gauge) | \[Integration\] ノード数<br>_node として表示_ |
| **consul.catalog.nodes_warning** <br>(gauge) | \[Integration\] 登録済みノードのうち service ステータスが `warning` のノード数<br>_node として表示_ |
| **consul.catalog.services_count** <br>(gauge) | \[Integration\] service タグ、ノード名、ステータスなどの条件に一致する service 数をカウントするメトリクス。`sum by` アグリゲータでクエリします。<br>_service として表示_ |
| **consul.catalog.services_critical** <br>(gauge) | \[Integration\] ノード上の critical service 合計<br>_service として表示_ |
| **consul.catalog.services_passing** <br>(gauge) | \[Integration\] ノード上の passing service 合計<br>_service として表示_ |
| **consul.catalog.services_up** <br>(gauge) | \[Integration\] ノード上で登録されている service 合計<br>_service として表示_ |
| **consul.catalog.services_warning** <br>(gauge) | \[Integration\] ノード上の warning service 合計<br>_service として表示_ |
| **consul.catalog.total_nodes** <br>(gauge) | \[Integration\] Consul クラスターに登録されているノード数<br>_node として表示_ |
| **consul.check.up** <br>(gauge) | サービス チェックのステータスを表すメトリクス。0 = unavailable、1 = passing、2 = warning、3 = critical。|
| **consul.client.rpc** <br>(count) | \[DogStatsD\] \[Prometheus\] クライアント モードの Consul エージェントが Consul サーバーへ RPC リクエストを送信するたびにインクリメントされます。これは当該エージェントが Consul サーバーに与える負荷を示します。サーバーでは生成されず、クライアント モードのエージェントのみが生成します。<br>_request として表示_ |
| **consul.client.rpc.failed** <br>(count) | \[DogStatsD\] \[Prometheus\] クライアント モードの Consul エージェントが Consul サーバーへ RPC リクエストを送信し失敗したときにインクリメントされます<br>_request として表示_ |
| **consul.http.request** <br>(gauge) | \[DogStatsD\] 指定された HTTP リクエスト (メソッドとパス) を処理するのにかかった時間を計測します。README で説明されている DogStatsD マッパを使用すると、パスはタグにマッピングされ、service 名やキー名などの詳細は含まれません。これらのパスにはプレースホルダーとしてアンダースコアが含まれます (例: `http_method:GET, path:v1.kv._)`)<br>_millisecond として表示_ |
| **consul.http.request.count** <br>(count) | \[Prometheus\] 指定された HTTP リクエスト (メソッドとパス) を処理するのにかかった時間のカウント。パスとメソッドのラベルを含みます。パスには service 名やキー名などの詳細は含まれず、プレースホルダーとしてアンダースコアが含まれます (例: `path=v1.kv._)`)<br>_millisecond として表示_ |
| **consul.http.request.quantile** <br>(gauge) | \[Prometheus\] 指定された HTTP リクエスト (メソッドとパス) を処理するのにかかった時間の分位数。パスとメソッドのラベルを含みます。パスには service 名やキー名などの詳細は含まれず、プレースホルダーとしてアンダースコアが含まれます (例: `path=v1.kv._)`)<br>_millisecond として表示_ |
| **consul.http.request.sum** <br>(count) | \[Prometheus\] 指定された HTTP リクエスト (メソッドとパス) を処理するのにかかった時間の合計。パスとメソッドのラベルを含みます。パスには service 名やキー名などの詳細は含まれず、プレースホルダーとしてアンダースコアが含まれます (例: `path=v1.kv._)`)<br>_millisecond として表示_ |
| **consul.memberlist.degraded.probe** <br>(gauge) | \[DogStatsD\] \[Prometheus\] このメトリクスは Consul エージェントが低速プローブ レートで他エージェントへ障害検出を実行した回数をカウントします。エージェントは自身のヘルス メトリクスを指標とし、ヘルス スコアが低いほどノードは健全であることを示します。|
| **consul.memberlist.gossip.95percentile** <br>(gauge) | \[DogStatsD\] ランダムに選択されたノード集合へブロードキャストされたゴシップ (メッセージ) 数の p95<br>_message として表示_ |
| **consul.memberlist.gossip.avg** <br>(gauge) | \[DogStatsD\] ランダムに選択されたノード集合へブロードキャストされたゴシップ (メッセージ) 数の平均<br>_message として表示_ |
| **consul.memberlist.gossip.count** <br>(count) | \[DogStatsD\] \[Prometheus\] consul.memberlist.gossip のサンプル数|
| **consul.memberlist.gossip.max** <br>(gauge) | \[DogStatsD\] ランダムに選択されたノード集合へブロードキャストされたゴシップ (メッセージ) 数の最大値<br>_message として表示_ |
| **consul.memberlist.gossip.median** <br>(gauge) | \[DogStatsD\] ランダムに選択されたノード集合へブロードキャストされたゴシップ (メッセージ) 数の中央値<br>_message として表示_ |
| **consul.memberlist.gossip.quantile** <br>(gauge) | \[Prometheus\] ランダムに選択されたノード集合へブロードキャストされたゴシップ (メッセージ) 数の分位数<br>_message として表示_ |
| **consul.memberlist.gossip.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] ランダムに選択されたノード集合へブロードキャストされたゴシップ (メッセージ) 数の合計<br>_message として表示_ |
| **consul.memberlist.health.score** <br>(gauge) | \[DogStatsD\] \[Prometheus\] このメトリクスはプロトコルのソフト リアルタイム要件を満たす度合いに基づき、ノードが自身の健全性をどのように認識しているかを示します。値は 0〜8 で、0 は「完全に健全」を示します。詳細は Lifeguard ペーパー (セクション IV) を参照してください: https://arxiv.org/pdf/1707.00788.pdf|
| **consul.memberlist.msg.alive** <br>(count) | \[DogStatsD\] \[Prometheus\] ネットワーク レイヤーのメッセージ情報に基づいて、これまでに把握した稼働中の Consul エージェント数をカウントします。|
| **consul.memberlist.msg.dead** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul エージェントが他エージェントを dead ノードとしてマークした回数をカウントします<br>_message として表示_ |
| **consul.memberlist.msg.suspect** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul エージェントがゴシップ プロトコルのプローブ中に他エージェントを失敗と疑った回数|
| **consul.memberlist.probenode.95percentile** <br>(gauge) | \[DogStatsD\] 選択された Consul エージェントに対して 1 回の障害検出ラウンドを実行するのに要した時間の p95<br>_node として表示_ |
| **consul.memberlist.probenode.avg** <br>(gauge) | \[DogStatsD\] 選択された Consul エージェントに対して 1 回の障害検出ラウンドを実行するのに要した時間の平均<br>_node として表示_ |
| **consul.memberlist.probenode.count** <br>(count) | \[DogStatsD\] \[Prometheus\] consul.memberlist.probenode のサンプル数|
| **consul.memberlist.probenode.max** <br>(gauge) | \[DogStatsD\] 選択された Consul エージェントに対して 1 回の障害検出ラウンドを実行するのに要した時間の最大値<br>_node として表示_ |
| **consul.memberlist.probenode.median** <br>(gauge) | \[DogStatsD\] 選択された Consul エージェントに対して 1 回の障害検出ラウンドを実行するのに要した時間の中央値<br>_node として表示_ |
| **consul.memberlist.probenode.quantile** <br>(gauge) | \[Prometheus\] 選択された Consul エージェントに対して 1 回の障害検出ラウンドを実行するのに要した時間の分位数<br>_node として表示_ |
| **consul.memberlist.probenode.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] 選択された Consul エージェントに対して 1 回の障害検出ラウンドを実行するのに要した時間の合計<br>_node として表示_ |
| **consul.memberlist.pushpullnode.95percentile** <br>(gauge) | \[DogStatsD\] このエージェントと状態を交換した Consul エージェント数の p95<br>_node として表示_ |
| **consul.memberlist.pushpullnode.avg** <br>(gauge) | \[DogStatsD\] このエージェントと状態を交換した Consul エージェント数の平均<br>_node として表示_ |
| **consul.memberlist.pushpullnode.count** <br>(count) | \[DogStatsD\] \[Prometheus\] consul.memberlist.pushpullnode のサンプル数|
| **consul.memberlist.pushpullnode.max** <br>(gauge) | \[DogStatsD\] このエージェントと状態を交換した Consul エージェント数の最大値<br>_node として表示_ |
| **consul.memberlist.pushpullnode.median** <br>(gauge) | \[DogStatsD\] このエージェントと状態を交換した Consul エージェント数の中央値<br>_node として表示_ |
| **consul.memberlist.pushpullnode.quantile** <br>(gauge) | \[Prometheus\] このエージェントと状態を交換した Consul エージェント数の分位数|
| **consul.memberlist.pushpullnode.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] このエージェントと状態を交換した Consul エージェント数の合計|
| **consul.memberlist.tcp.accept** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul エージェントが受信 TCP ストリーム接続を受け入れた回数をカウントします<br>_connection として表示_ |
| **consul.memberlist.tcp.connect** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul エージェントが他エージェントと push/pull 同期を開始した回数をカウントします<br>_connection として表示_ |
| **consul.memberlist.tcp.sent** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul エージェントが TCP プロトコルで送信したバイト総数を計測します<br>_byte として表示_ |
| **consul.memberlist.udp.received** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul エージェントが UDP プロトコルで送受信したバイト総数を計測します<br>_byte として表示_ |
| **consul.memberlist.udp.sent** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul エージェントが UDP プロトコルで送受信したバイト総数を計測します<br>_byte として表示_ |
| **consul.net.node.latency.max** <br>(gauge) | \[Integration\] このノードから他のすべてのノードへの最大レイテンシー<br>_millisecond として表示_ |
| **consul.net.node.latency.median** <br>(gauge) | \[Integration\] このノードから他のすべてのノードへの中央値レイテンシー<br>_millisecond として表示_ |
| **consul.net.node.latency.min** <br>(gauge) | \[Integration\] このノードから他のすべてのノードへの最小レイテンシー<br>_millisecond として表示_ |
| **consul.net.node.latency.p25** <br>(gauge) | \[Integration\] このノードから他のすべてのノードへの P25 レイテンシー<br>_millisecond として表示_ |
| **consul.net.node.latency.p75** <br>(gauge) | \[Integration\] このノードから他のすべてのノードへの P75 レイテンシー<br>_millisecond として表示_ |
| **consul.net.node.latency.p90** <br>(gauge) | \[Integration\] このノードから他のすべてのノードへの P90 レイテンシー<br>_millisecond として表示_ |
| **consul.net.node.latency.p95** <br>(gauge) | \[Integration\] このノードから他のすべてのノードへの P95 レイテンシー<br>_millisecond として表示_ |
| **consul.net.node.latency.p99** <br>(gauge) | \[Integration\] このノードから他のすべてのノードへの P99 レイテンシー<br>_millisecond として表示_ |
| **consul.peers** <br>(gauge) | \[Integration\] ピア セット内のピア数|
| **consul.raft.apply** <br>(count) | \[DogStatsD\] \[Prometheus\] 発生している Raft トランザクション数<br>_transaction として表示_ |
| **consul.raft.commitTime.95percentile** <br>(gauge) | \[DogStatsD\] リーダーで Raft ログに新しいエントリをコミットするのに要する時間の p95<br>_millisecond として表示_ |
| **consul.raft.commitTime.avg** <br>(gauge) | \[DogStatsD\] リーダーで Raft ログに新しいエントリをコミットするのに要する時間の平均<br>_millisecond として表示_ |
| **consul.raft.commitTime.count** <br>(count) | \[DogStatsD\] \[Prometheus\] raft.commitTime のサンプル数|
| **consul.raft.commitTime.max** <br>(gauge) | \[DogStatsD\] リーダーで Raft ログに新しいエントリをコミットするのに要する時間の最大値<br>_millisecond として表示_ |
| **consul.raft.commitTime.median** <br>(gauge) | \[DogStatsD\] リーダーで Raft ログに新しいエントリをコミットするのに要する時間の中央値<br>_millisecond として表示_ |
| **consul.raft.commitTime.quantile** <br>(gauge) | \[Prometheus\] リーダーで Raft ログに新しいエントリをコミットするのに要する時間の分位数<br>_millisecond として表示_ |
| **consul.raft.commitTime.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] リーダーで Raft ログに新しいエントリをコミットするのに要する時間の合計<br>_millisecond として表示_ |
| **consul.raft.leader.dispatchLog.95percentile** <br>(gauge) | \[DogStatsD\] リーダーがログ エントリをディスクに書き込むのに要する時間の p95<br>_millisecond として表示_ |
| **consul.raft.leader.dispatchLog.avg** <br>(gauge) | \[DogStatsD\] リーダーがログ エントリをディスクに書き込むのに要する時間の平均<br>_millisecond として表示_ |
| **consul.raft.leader.dispatchLog.count** <br>(count) | \[DogStatsD\] \[Prometheus\] raft.leader.dispatchLog のサンプル数|
| **consul.raft.leader.dispatchLog.max** <br>(gauge) | \[DogStatsD\] リーダーがログ エントリをディスクに書き込むのに要する時間の最大値<br>_millisecond として表示_ |
| **consul.raft.leader.dispatchLog.median** <br>(gauge) | \[DogStatsD\] リーダーがログ エントリをディスクに書き込むのに要する時間の中央値<br>_millisecond として表示_ |
| **consul.raft.leader.dispatchLog.quantile** <br>(gauge) | \[Prometheus\] リーダーがログ エントリをディスクに書き込むのに要する時間の分位数<br>_millisecond として表示_ |
| **consul.raft.leader.dispatchLog.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] リーダーがログ エントリをディスクに書き込むのに要する時間の合計<br>_millisecond として表示_ |
| **consul.raft.leader.lastContact.95percentile** <br>(gauge) | \[DogStatsD\] フォロワーとのリースを最後に確認してから経過した時間の p95<br>_millisecond として表示_ |
| **consul.raft.leader.lastContact.avg** <br>(gauge) | \[DogStatsD\] フォロワーとのリースを最後に確認してから経過した時間の平均<br>_millisecond として表示_ |
| **consul.raft.leader.lastContact.count** <br>(count) | \[DogStatsD\] \[Prometheus\] raft.leader.lastContact のサンプル数|
| **consul.raft.leader.lastContact.max** <br>(gauge) | \[DogStatsD\] フォロワーとのリースを最後に確認してから経過した時間の最大値<br>_millisecond として表示_ |
| **consul.raft.leader.lastContact.median** <br>(gauge) | \[DogStatsD\] フォロワーとのリースを最後に確認してから経過した時間の中央値<br>_millisecond として表示_ |
| **consul.raft.leader.lastContact.quantile** <br>(gauge) | \[Prometheus\] フォロワーとのリースを最後に確認してから経過した時間の分位数<br>_millisecond として表示_ |
| **consul.raft.leader.lastContact.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] フォロワーとのリースを最後に確認してから経過した時間の合計<br>_millisecond として表示_ |
| **consul.raft.replication.appendEntries.logs** <br>(count) | \[DogStatsD\] \[Prometheus\] エージェントへ複製されたログ エントリ数 (リーダーのログとの差分を解消するため)<br>_entry として表示_ |
| **consul.raft.replication.appendEntries.rpc.count** <br>(count) | \[DogStatsD\] \[Prometheus\] append entries RFC がリーダー エージェントのログ エントリをフォロワー エージェントに複製するのに要した時間のカウント<br>_millisecond として表示_ |
| **consul.raft.replication.appendEntries.rpc.quantile** <br>(gauge) | \[Prometheus\] append entries RFC がリーダー エージェントのログ エントリをフォロワー エージェントに複製するのに要した時間の分位数<br>_millisecond として表示_ |
| **consul.raft.replication.appendEntries.rpc.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] append entries RFC がリーダー エージェントのログ エントリをフォロワー エージェントに複製するのに要した時間の合計<br>_millisecond として表示_ |
| **consul.raft.replication.heartbeat.count** <br>(count) | \[DogStatsD\] \[Prometheus\] appendEntries をピアに呼び出すのに要した時間のカウント<br>_millisecond として表示_ |
| **consul.raft.replication.heartbeat.quantile** <br>(gauge) | \[Prometheus\] appendEntries をピアに呼び出すのに要した時間の分位数<br>_millisecond として表示_ |
| **consul.raft.replication.heartbeat.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] appendEntries をピアに呼び出すのに要した時間の合計<br>_millisecond として表示_ |
| **consul.raft.state.candidate** <br>(count) | \[DogStatsD\] \[Prometheus\] 開始されたリーダー選挙の回数<br>_event として表示_ |
| **consul.raft.state.leader** <br>(count) | \[DogStatsD\] \[Prometheus\] 完了したリーダー選挙の回数<br>_event として表示_ |
| **consul.runtime.gc_pause_ns.95percentile** <br>(gauge) | \[DogStatsD\] Consul 起動以降の stop‑the‑world ガベージ コレクション (GC) ポーズに費やされたナノ秒数の p95<br>_nanosecond として表示_ |
| **consul.runtime.gc_pause_ns.avg** <br>(gauge) | \[DogStatsD\] Consul 起動以降の stop‑the‑world ガベージ コレクション (GC) ポーズに費やされたナノ秒数の平均<br>_nanosecond として表示_ |
| **consul.runtime.gc_pause_ns.count** <br>(count) | \[DogStatsD\] \[Prometheus\] consul.runtime.gc_pause_ns のサンプル数|
| **consul.runtime.gc_pause_ns.max** <br>(gauge) | \[DogStatsD\] Consul 起動以降の stop‑the‑world ガベージ コレクション (GC) ポーズに費やされたナノ秒数の最大値<br>_nanosecond として表示_ |
| **consul.runtime.gc_pause_ns.median** <br>(gauge) | \[DogStatsD\] Consul 起動以降の stop‑the‑world ガベージ コレクション (GC) ポーズに費やされたナノ秒数の中央値<br>_nanosecond として表示_ |
| **consul.runtime.gc_pause_ns.quantile** <br>(gauge) | \[Prometheus\] Consul 起動以降の stop‑the‑world ガベージ コレクション (GC) ポーズに費やされたナノ秒数の分位数<br>_nanosecond として表示_ |
| **consul.runtime.gc_pause_ns.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul 起動以降の stop‑the‑world ガベージ コレクション (GC) ポーズに費やされたナノ秒数の合計<br>_nanosecond として表示_ |
| **consul.serf.coordinate.adjustment_ms.95percentile** <br>(gauge) | \[DogStatsD\] ノード コーディネート 調整時間の p95 (ミリ秒)<br>_millisecond として表示_ |
| **consul.serf.coordinate.adjustment_ms.avg** <br>(gauge) | \[DogStatsD\] ノード コーディネート 調整時間の平均 (ミリ秒)<br>_millisecond として表示_ |
| **consul.serf.coordinate.adjustment_ms.count** <br>(count) | \[DogStatsD\] \[Prometheus\] consul.serf.coordinate.adjustment_ms のサンプル数|
| **consul.serf.coordinate.adjustment_ms.max** <br>(gauge) | \[DogStatsD\] ノード コーディネート 調整時間の最大値 (ミリ秒)<br>_millisecond として表示_ |
| **consul.serf.coordinate.adjustment_ms.median** <br>(gauge) | \[DogStatsD\] ノード コーディネート 調整時間の中央値 (ミリ秒)<br>_millisecond として表示_ |
| **consul.serf.coordinate.adjustment_ms.quantile** <br>(gauge) | \[Prometheus\] ノード コーディネート 調整時間の分位数 (ミリ秒)<br>_millisecond として表示_ |
| **consul.serf.coordinate.adjustment_ms.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] ノード コーディネート 調整時間の合計 (ミリ秒)<br>_millisecond として表示_ |
| **consul.serf.events** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul エージェントが serf イベントを処理するとインクリメントされます<br>_event として表示_ |
| **consul.serf.member.failed** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul エージェントが dead とマークされたときにインクリメントされます。これは、エージェントの過負荷、ネットワーク問題、または必須ポートで相互接続できない構成エラーを示す可能性があります。|
| **consul.serf.member.flap** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul エージェントが dead とマークされ、その後すぐに復帰した回数|
| **consul.serf.member.join** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul エージェントが join イベントを処理するとインクリメントされます<br>_event として表示_ |
| **consul.serf.member.left** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul エージェントがクラスターを離脱するとインクリメントされます|
| **consul.serf.member.update** <br>(count) | \[DogStatsD\] \[Prometheus\] Consul エージェントが更新されるとインクリメントされます|
| **consul.serf.msgs.received.95percentile** <br>(gauge) | \[DogStatsD\] serf メッセージ受信数の p95<br>_message として表示_ |
| **consul.serf.msgs.received.avg** <br>(gauge) | \[DogStatsD\] serf メッセージ受信数の平均<br>_message として表示_ |
| **consul.serf.msgs.received.count** <br>(count) | \[DogStatsD\] \[Prometheus\] serf メッセージ受信数のカウント|
| **consul.serf.msgs.received.max** <br>(gauge) | \[DogStatsD\] serf メッセージ受信数の最大値<br>_message として表示_ |
| **consul.serf.msgs.received.median** <br>(gauge) | \[DogStatsD\] serf メッセージ受信数の中央値<br>_message として表示_ |
| **consul.serf.msgs.received.quantile** <br>(gauge) | \[Prometheus\] serf メッセージ受信数の分位数<br>_message として表示_ |
| **consul.serf.msgs.received.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] serf メッセージ受信数の合計<br>_message として表示_ |
| **consul.serf.msgs.sent.95percentile** <br>(gauge) | \[DogStatsD\] serf メッセージ送信数の p95<br>_message として表示_ |
| **consul.serf.msgs.sent.avg** <br>(gauge) | \[DogStatsD\] serf メッセージ送信数の平均<br>_message として表示_ |
| **consul.serf.msgs.sent.count** <br>(count) | \[DogStatsD\] \[Prometheus\] serf メッセージ送信数のカウント|
| **consul.serf.msgs.sent.max** <br>(gauge) | \[DogStatsD\] serf メッセージ送信数の最大値<br>_message として表示_ |
| **consul.serf.msgs.sent.median** <br>(gauge) | \[DogStatsD\] serf メッセージ送信数の中央値<br>_message として表示_ |
| **consul.serf.msgs.sent.quantile** <br>(gauge) | \[Prometheus\] serf メッセージ送信数の分位数<br>_message として表示_ |
| **consul.serf.msgs.sent.sum** <br>(count) | \[DogStatsD\] \[Prometheus\] serf メッセージ送信数の合計<br>_message として表示_ |
| **consul.serf.queue.event.95percentile** <br>(gauge) | \[DogStatsD\] serf イベント キュー サイズの p95|
| **consul.serf.queue.event.avg** <br>(gauge) | \[DogStatsD\] serf イベント キュー サイズの平均|
| **consul.serf.queue.event.count** <br>(count) | \[DogStatsD\] \[Prometheus\] serf イベント キュー内のアイテム数|
| **consul.serf.queue.event.max** <br>(gauge) | \[DogStatsD\] serf イベント キュー サイズの最大値|
| **consul.serf.queue.event.median** <br>(gauge) | \[DogStatsD\] serf イベント キュー サイズの中央値|
| **consul.serf.queue.event.quantile** <br>(gauge) | \[Prometheus\] serf イベント キュー サイズの分位数|
| **consul.serf.queue.intent.95percentile** <br>(gauge) | \[DogStatsD\] serf インテント キュー サイズの p95|
| **consul.serf.queue.intent.avg** <br>(gauge) | \[DogStatsD\] serf インテント キュー サイズの平均|
| **consul.serf.queue.intent.count** <br>(count) | \[DogStatsD\] \[Prometheus\] serf インテント キュー内のアイテム数|
| **consul.serf.queue.intent.max** <br>(gauge) | \[DogStatsD\] serf インテント キュー サイズの最大値|
| **consul.serf.queue.intent.median** <br>(gauge) | \[DogStatsD\] serf インテント キュー サイズの中央値|
| **consul.serf.queue.intent.quantile** <br>(gauge) | \[Prometheus\] serf インテント キュー サイズの分位数|
| **consul.serf.queue.query.95percentile** <br>(gauge) | \[DogStatsD\] serf クエリ キュー サイズの p95|
| **consul.serf.queue.query.avg** <br>(gauge) | \[DogStatsD\] serf クエリ キュー サイズの平均|
| **consul.serf.queue.query.count** <br>(count) | \[DogStatsD\] \[Prometheus\] serf クエリ キュー内のアイテム数|
| **consul.serf.queue.query.max** <br>(gauge) | \[DogStatsD\] serf クエリ キュー サイズの最大値|
| **consul.serf.queue.query.median** <br>(gauge) | \[DogStatsD\] serf クエリ キュー サイズの中央値|
| **consul.serf.queue.query.quantile** <br>(gauge) | \[Prometheus\] serf クエリ キュー サイズの分位数|
| **consul.serf.snapshot.appendline.95percentile** <br>(gauge) | \[DogStatsD\] Consul エージェントが既存ログへエントリを追加する時間の p95<br>_millisecond として表示_ |
| **consul.serf.snapshot.appendline.avg** <br>(gauge) | \[DogStatsD\] Consul エージェントが既存ログへエントリを追加する時間の平均<br>_millisecond として表示_ |
| **consul.serf.snapshot.appendline.count** <br>(count) | \[DogStatsD\] \[Prometheus\] consul.serf.snapshot.appendline のサンプル数|
| **consul.serf.snapshot.appendline.max** <br>(gauge) | \[DogStatsD\] Consul エージェントが既存ログへエントリを追加する時間の最大値<br>_millisecond として表示_ |
| **consul.serf.snapshot.appendline.median** <br>(gauge) | \[DogStatsD\] Consul エージェントが既存ログへエントリを追加する時間の中央値<br>_millisecond として表示_ |
| **consul.serf.snapshot.appendline.quantile** <br>(gauge) | \[Prometheus\] Consul エージェントが既存ログへエントリを追加する時間の分位数<br>_millisecond として表示_ |
| **consul.serf.snapshot.compact.95percentile** <br>(gauge) | \[DogStatsD\] Consul エージェントがログをコンパクトする時間の p95 (スナップショットが十分大きい場合のみ実行)<br>_millisecond として表示_ |
| **consul.serf.snapshot.compact.avg** <br>(gauge) | \[DogStatsD\] Consul エージェントがログをコンパクトする時間の平均 (スナップショットが十分大きい場合のみ実行)<br>_millisecond として表示_ |
| **consul.serf.snapshot.compact.count** <br>(count) | \[DogStatsD\] \[Prometheus\] consul.serf.snapshot.compact のサンプル数|
| **consul.serf.snapshot.compact.max** <br>(gauge) | \[DogStatsD\] Consul エージェントがログをコンパクトする時間の最大値 (スナップショットが十分大きい場合のみ実行)<br>_millisecond として表示_ |
| **consul.serf.snapshot.compact.median** <br>(gauge) | \[DogStatsD\] Consul エージェントがログをコンパクトする時間の中央値 (スナップショットが十分大きい場合のみ実行)<br>_millisecond として表示_ |
| **consul.serf.snapshot.compact.quantile** <br>(gauge) | \[Prometheus\] Consul エージェントがログをコンパクトする時間の分位数 (スナップショットが十分大きい場合のみ実行)<br>_millisecond として表示_ |

DogStatsD が受信するメトリクスの説明については [Consul Telemetry ドキュメント](https://www.consul.io/docs/agent/telemetry.html) を参照してください。

ネットワーク レイテンシ メトリクスの計算方法については [Consul Network Coordinates ドキュメント](https://www.consul.io/docs/internals/coordinates.html) を参照してください。

### イベント

**consul.new_leader**:<br>
Datadog Agent は、Consul クラスターが新しいリーダーを選出すると、`prev_consul_leader`、`curr_consul_leader`、および `consul_datacenter` のタグを付けてイベントを送信します。

### サービス チェック

**consul.check**

サービスが稼働中であれば OK、問題があれば WARNING、停止していれば CRITICAL を返します。

_ステータス: ok, warning, critical, unknown_

**consul.up**

Consul サーバーが稼働中であれば OK、それ以外は CRITICAL を返します。

_Statuses: ok, critical_

**consul.can_connect**

Agent が Consul へ HTTP リクエストを送信できれば OK、できなければ CRITICAL を返します。

_Statuses: ok, critical_

**consul.prometheus.health**

メトリクス エンドポイントへアクセスできない場合は `CRITICAL`、それ以外は `OK` を返します。

_Statuses: ok, critical_

## トラブルシューティング

お問合せは、[Datadog サポート](https://docs.datadoghq.com/help/) まで。

## その他の参考資料

役立つドキュメント、リンク、記事:

- [HCP Consul を Datadog で監視](https://docs.datadoghq.com/integrations/guide/hcp-consul)
- [Datadog で Consul のヘルスとパフォーマンスを監視](https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog)
- [Consul at Datadog](https://engineering.datadoghq.com/consul-at-datadog)
- [Consul を監視するキー メトリクス](https://www.datadoghq.com/blog/consul-metrics/)
- [Consul 監視ツール](https://www.datadoghq.com/blog/consul-monitoring-tools/)
- [Consul を Datadog で監視する方法](https://www.datadoghq.com/blog/consul-datadog/)
- [Datadog CNM が Consul ネットワーキングをサポート](https://www.datadoghq.com/blog/monitor-consul-with-datadog-npm/)