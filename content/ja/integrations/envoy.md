---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Envoy - Overview: assets/dashboards/envoy_overview.json
  logs:
    source: envoy
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- cloud
- web
- log collection
- autodiscovery
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/envoy/README.md
display_name: Envoy
draft: false
git_integration_title: envoy
guid: 007f4e6c-ac88-411e-ad81-f0272539b5ff
integration_id: envoy
integration_title: Envoy
integration_version: 2.1.0
is_public: true
kind: インテグレーション
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

### インストール

Envoy チェックは [Datadog Agent][2] パッケージに含まれています。サーバーに追加でインストールする必要はありません。

#### Istio

[Istio][3] の一部として Envoy を使用している場合は、Envoy インテグレーションを構成して Istio プロキシメトリクスエンドポイントからのメトリクスを収集します。

```yaml
instances:
  - openmetrics_endpoint: localhost:15090/stats/prometheus
```

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

[管理エンドポイント][4]にルーティングし (Envoy が自身に接続)、`/stats` へのルートのみを持つリスナー /vhost を作成します。他のすべてのルートは静的/エラー応答を受け取ります。これにより、たとえば、認証用の L3 フィルターとの適切なインテグレーションも可能になります。

[envoy_secured_stats_config.json][5] のコンフィグ例:

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

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:

##### メトリクスの収集

1. Envoy のパフォーマンスデータの収集を開始するには、[Agent のコンフィギュレーションディレクトリ][1]のルートにある `conf.d/` フォルダーの `envoy.d/conf.yaml` ファイルを編集します。使用可能なすべてのコンフィギュレーションオプションについては、[サンプル envoy.d/conf.yaml][2] を参照してください。

    ```yaml
    init_config:

    instances:
        ## @param openmetrics_endpoint - string - required
        ## The URL exposing metrics in the OpenMetrics format.
        #
      - openmetrics_endpoint: http://localhost:8001/stats/prometheus

    ```

2. Datadog Agent が Envoy の[管理エンドポイント][3]にアクセスできるかを確認します。
3. [Agent を再起動します][4]。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

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

3. [Agent を再起動します][4]。

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/data/conf.yaml.example
[3]: https://www.envoyproxy.io/docs/envoy/latest/operations/admin
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                       |
| -------------------- | ------------------------------------------- |
| `<インテグレーション名>` | `envoy`                                     |
| `<初期コンフィギュレーション>`      | 空白または `{}`                               |
| `<インスタンスコンフィギュレーション>`  | `{"openmetrics_endpoint": "http://%%host%%:80/stats/prometheus"}` |
 **注**: 現行バージョンのチェック (1.26.0+) は、メトリクスの収集に [OpenMetrics][2] を使用し、これには Python 3 が必要です。Python 3 の使用が不可能なホストの場合や、このチェックのレガシーバージョンを使用する場合は、以下の[コンフィグ][3]を参照してください。

##### ログの収集

_Agent バージョン 6.0 以降で利用可能_

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][4]を参照してください。

| パラメーター      | 値                                              |
| -------------- | -------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "envoy", "service": "<サービス名>"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/integrations/openmetrics/
[3]: https://github.com/DataDog/integrations-core/blob/7.33.x/envoy/datadog_checks/envoy/data/conf.yaml.example
[4]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][6]し、Checks セクションで `envoy` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "envoy" >}}


各メトリクスによって送信されるタグのリストについては、[metrics.py][7] を参照してください。

### イベント

Envoy チェックには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "envoy" >}}


## トラブルシューティング

### 一般的な問題

#### エンドポイント `/server_info` に到達できません
- お使いの Envoy 環境でエンドポイントが利用不可能である場合、Envoy のコンフィギュレーションで `collect_server_info` オプションを無効化してエラーログを最小限に抑えます。

**注**: Envoy のバージョンデータは収集されません。

ご不明な点は、[Datadog のサポートチーム][8]までお問合せください。


[1]: https://www.envoyproxy.io
[2]: https://app.datadoghq.com/account/settings#agent
[3]: https://istio.io
[4]: https://www.envoyproxy.io/docs/envoy/latest/operations/admin
[5]: https://gist.github.com/ofek/6051508cd0dfa98fc6c13153b647c6f8
[6]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/envoy/datadog_checks/envoy/metrics.py
[8]: https://docs.datadoghq.com/ja/help/