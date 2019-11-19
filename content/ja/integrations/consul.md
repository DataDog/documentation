---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - containers
  - orchestration
  - configuration & deployment
  - notification
  - log collection
creates_events: true
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/consul/README.md'
display_name: Consul
git_integration_title: consul
guid: ec1e9fac-a339-49a3-b501-60656d2a5671
integration_id: consul
integration_title: Consul
is_public: true
kind: integration
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
short_description: Consul 健全性チェックのアラート、サービス/ノードマッピングの表示 much more.
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
![Consul ダッシュ][1]

## 概要

Datadog Agent は、以下のような多くのメトリクスを Consul ノードから収集します。

* Consul ピアの合計数
* サービス健全性 - 特定のサービスに対して、UP、PASSING、WARNING、CRITICAL なノードの数
* ノード健全性 - 特定のノードに対して、UP、PASSING、WARNING、CRITICAL なサービスの数
* ネットワーク座標系 - データセンター間およびデータセンター内のレイテンシー

_Consul_ Agent は DogStatsD 経由でさらに多くのメトリクスを提供できます。これらは、Consul に依存するサービスではなく、Consul 自体の内部健全性に関連するメトリクスです。以下のメトリクスがあります。

* Serf のイベントとメンバーフラップ
* Raft プロトコル
* DNS パフォーマンス

その他にも多数あります。

メトリクスに加えて、Datadog Agent は Consul の健全性チェックごとにサービスチェックを送信し、新しいリーダー選出ごとにイベントを送信します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Datadog Agent の Consul チェックは [Datadog Agent][3] パッケージに含まれています。Consul ノードに追加でインストールする必要はありません。

### コンフィグレーション

Consul の[メトリクス](#metric-collection)と[ログ](#log-collection)の収集を開始するには、[Agent の構成ディレクトリ][4]のルートにある `conf.d/` フォルダーの `consul.d/conf.yaml` ファイルを編集します。
使用可能なすべての構成オプションの詳細については、[サンプル consul.d/conf.yaml][5] を参照してください。

#### メトリクスの収集

1. [Consul のメトリクス](#metrics)の収集を開始するには、`consul.d/conf.yaml` ファイルに次の構成ブロックを追加します。

    ```yaml
    init_config:

    instances:
        # where the Consul HTTP Server Lives
        # use 'https' if Consul is configured for SSL
        - url: http://localhost:8500
          # again, if Consul is talking SSL
          # client_cert_file: '/path/to/client.concatenated.pem'

          # submit per-service node status and per-node service status?
          catalog_checks: true

          # emit leader election events
          self_leader_check: true

          network_latency_checks: true
    ```

    使用可能なすべての構成オプションの詳細については、[サンプル consul.d/conf.yaml][5] を参照してください。

2. [Agent を再起動][6]すると、Datadog への Consul メトリクスの送信が開始されます。

#### Consul Agent を DogStatsD に接続

Consul のメイン構成ファイルで、最上位レベルの `telemetry` キーの下に、`dogstatsd_addr` をネストして追加します。

```
{
  ...
  "telemetry": {
    "dogstatsd_addr": "127.0.0.1:8125"
  },
  ...
}
```

Consul Agent をリロードすると、DogStatsD への追加の Consul メトリクスの送信が開始されます。

#### ログの収集

**Agent 6.0 以上で使用可能**

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
    使用可能なすべての構成オプションの詳細については、[サンプル consul.d/conf.yaml][5] を参照してください。

3. [Agent を再起動します][6]。

### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `consul` を探します。

**注**: Consul ノードでデバッグログが有効になっている場合は、Datadog Agent の通常のポーリングが Consul ログに表示されます。

```
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


Consul Agent が DogStatsD に送信するメトリクスの詳細については、[Consul の Telemetry に関するドキュメント][10]を参照してください。

ネットワークレイテンシーメトリクスの計算方法については、[Consul のネットワーク座標系に関するドキュメント][11]を参照してください。

### イベント

**consul.new_leader**:<br>
Datadog Agent は、Consul クラスターが新しいリーダーを選出すると、`prev_consul_leader`、`curr_consul_leader`、および `consul_datacenter` のタグを付けてイベントを送信します。

### サービスのチェック

**consul.check**:<br>
Datadog Agent は、Consul の健全性チェックごとにサービスチェックを送信します。それぞれ以下のタグが付きます。

* `service:<name>`。Consul が `ServiceName` を報告する場合
* `consul_service_id:<id>`。Consul が `ServiceID` を報告する場合

## トラブルシューティング
ご不明な点は、[Datadog のサポートチーム][12]までお問合せください。

## その他の参考資料

* [Datadog を使用した Consul の健全性とパフォーマンスの監視][13]
* [Datadog と Consul][14]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/consul/images/consul-dash.png
[2]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[5]: https://github.com/DataDog/integrations-core/blob/master/consul/datadog_checks/consul/data/conf.yaml.example
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/consul/metadata.csv
[10]: https://www.consul.io/docs/agent/telemetry.html
[11]: https://www.consul.io/docs/internals/coordinates.html
[12]: https://docs.datadoghq.com/ja/help
[13]: https://www.datadoghq.com/blog/monitor-consul-health-and-performance-with-datadog
[14]: https://engineering.datadoghq.com/consul-at-datadog


{{< get-dependencies >}}