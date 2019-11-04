---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - cloud
  - web
  - log collection
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/envoy/README.md'
display_name: Envoy
git_integration_title: envoy
guid: 007f4e6c-ac88-411e-ad81-f0272539b5ff
integration_id: envoy
integration_title: Envoy
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: envoy.
metric_to_check: envoy.server.uptime
name: envoy
public_title: Datadog-Envoy インテグレーション
short_description: Envoy はオープンソースのエッジ/サービスプロキシを提供
support: コア
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

このチェックは、[Envoy][1] から分散型システムの可観測性メトリクスを収集します。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][15]のガイドを参照してこの手順を行ってください。

### インストール

Envoy チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

#### Istio 経由の場合

Envoy を [Istio][3] の一部として使用している場合は、Envoy の[管理エンドポイント][4]にアクセスするために、Istio の [proxyAdminPort][5] を設定する必要があります。

#### 標準的な方法

`/stats` エンドポイントをセットアップする方法は 2 つあります。

##### セキュリティ保護なしの統計エンドポイント

以下に、Envoy の管理構成例を示します。

```yaml
admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
```

##### セキュリティ保護ありの統計エンドポイント

管理エンドポイントにルーティングし (Envoy が自身に接続)、`/stats` へのルートのみを持つリスナー /vhost を作成します。他のすべてのルートは静的/エラー応答を受け取ります。これにより、たとえば、認証用の L3 フィルターとの適切なインテグレーションも可能になります。

以下に、構成例を示します ([こちらの gist][6] から抜粋)。

```yaml
admin:
  access_log_path: /dev/null
  address:
    socket_address:
      protocol: TCP
      address: 127.0.0.1
      port_value: 8081
static_resources:
  listeners:
    - address:
        socket_address:
          protocol: TCP
          address: 0.0.0.0
          port_value: 80
      filter_chains:
        - filters:
            - name: envoy.http_connection_manager
              config:
                codec_type: AUTO
                stat_prefix: ingress_http
                route_config:
                  virtual_hosts:
                    - name: backend
                      domains:
                        - "*"
                      routes:
                        - match:
                            prefix: /stats
                          route:
                            cluster: service_stats
                http_filters:
                  - name: envoy.router
                    config:
  clusters:
    - name: service_stats
      connect_timeout: 0.250s
      type: LOGICAL_DNS
      lb_policy: ROUND_ROBIN
      hosts:
        - socket_address:
            protocol: TCP
            address: 127.0.0.1
            port_value: 8001
```

### コンフィグレーション

1. Envoy のパフォーマンスデータの収集を開始するには、[Agent の構成ディレクトリ][7]のルートにある `conf.d/` フォルダーの `envoy.d/conf.yaml` ファイルを編集します。
  使用可能なすべての構成オプションの詳細については、[サンプル envoy.d/conf.yaml][8] を参照してください。

2. Datadog Agent が Envoy の[管理エンドポイント][4]にアクセスできるかを確認します。

3. [Agent を再起動します][9]。

| 設定            | 説明                                                                                                                                                                |
| ---                | ---                                                                                                                                                                        |
| `stats_url`        | (必須) 管理統計エンドポイント (例: `http://localhost:80/stats`)。未使用のメトリクスを `0` として報告せずに無視する場合は、末尾に `?usedonly` を追加します。 |
| `tags`             | このインスタンスに適用するカスタムタグのリスト。                                                                                                                           |
| `metric_whitelist` | 正規表現のリスト。                                                                                                                                             |
| `metric_blacklist` | 正規表現のリスト。                                                                                                                                             |
| `cache_metrics`    | ホワイトリスト/ブラックリストの結果をキャッシュして CPU 使用率を減らし、代わりに多少のメモリを使用します (デフォルトは `true`)。                                                       |
| `username`         | Basic 認証を使用する場合に、認証に使用するユーザー名。                                                                                                                    |
| `password`         | Basic 認証を使用する場合に、認証に使用するパスワード。                                                                                                                    |
| `tls_verify`       | これは、Envoy に接続する際に TLS 証明書を検証するようにチェックに指示します。デフォルトは `true` です。TLS 証明書の検証を無効にする場合は、`false` に設定します。    |
| `skip_proxy`       | `true` の場合、チェックは有効なプロキシ設定をバイパスして、Envoy に直接到達しようとします。                                                                              |
| `timeout`          | ネットワークリクエストのカスタムタイムアウト (秒単位。デフォルトは 20)。                                                                                                          |

#### メトリクスの絞り込み

メトリクスは、正規表現 `metric_whitelist` または `metric_blacklist` を使用して絞り込むことができます。両方を使用した場合は、生成されたセットに対して、最初にホワイトリストが適用され、次にブラックリストが適用されます。

絞り込みはタグの抽出前に行われるため、一部のタグでは、メトリクスを保持するかどうか、または無視するかどうかを決定することもできます。すべてのメトリクスとタグの完全なリストについては、[metrics.py][10] を参照してください。以下では、Envoy メトリクスのタグ付けの例を説明します。

```python
...
'cluster.grpc.success': {
    'tags': (
        ('<CLUSTER_NAME>', ),
        ('<GRPC_SERVICE>', '<GRPC_METHOD>', ),
        (),
    ),
    ...
},
...
```

ここには、`('<CLUSTER_NAME>')`、`('<GRPC_SERVICE>', '<GRPC_METHOD>')`、空の `()` の `3` つのタグシーケンスがあります。シーケンスの数は、存在するメトリクスの要素数に正確に対応します。このメトリクスでは、`cluster`、`grpc`、`success` の `3` つの要素があります。Envoy では、各要素を `.` で区切るため、最終的なメトリクス名は次のようになります。

`cluster.<CLUSTER_NAME>.grpc.<GRPC_SERVICE>.<GRPC_METHOD>.success`

クラスター名と grpc サービスだけに関心がある場合は、以下をホワイトリストに追加します。

`^cluster\.<CLUSTER_NAME>\.grpc\.<GRPC_SERVICE>\.`

#### ログの収集

**Agent 6.0 以上で使用可能**

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、`datadog.yaml` ファイルでこれを有効にします。

    ```yaml
      logs_enabled: true
    ```

2. 次に、下部にある `logs` 行のコメントを解除して、`envoy.d/conf.yaml` を編集します。ログの `path` を Envoy ログファイルの正しいパスで更新してください。

    ```yaml
      logs:
        - type: file
          path: /var/log/envoy.log
          source: envoy
          service: envoy
    ```

3. [Agent を再起動します][9]。

### 検証

[Agent の status サブコマンドを実行][11]し、Checks セクションで `envoy` を探します。

## 収集データ
### メトリクス
{{< get-metrics-from-git "envoy" >}}


各メトリクスによって送信されるタグのリストについては、[metrics.py][13] を参照してください。

### イベント

Envoy チェックには、イベントは含まれません。

### サービスのチェック

**envoy.can_connect**:<br>
Agent が Envoy に接続してメトリクスを収集できない場合は、`CRITICAL` を返します。それ以外の場合は、`OK` を返します。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][14]までお問合せください。


[1]: https://www.envoyproxy.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://istio.io
[4]: https://www.envoyproxy.io/docs/envoy/latest/operations/admin
[5]: https://istio.io/docs/reference/config
[6]: https://gist.github.com/ofek/6051508cd0dfa98fc6c13153b647c6f8
[7]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/data/conf.yaml.example
[9]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#start-stop-and-restart-the-agent
[10]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/metrics.py
[11]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/?tab=agentv6#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/envoy/metadata.csv
[13]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/metrics.py
[14]: https://docs.datadoghq.com/ja/help
[15]: https://docs.datadoghq.com/ja/agent/autodiscovery/integrations


{{< get-dependencies >}}