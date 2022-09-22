---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Cilium Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- コンテナ
- ネットワーク
- security
- ログの収集
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cilium/README.md
display_name: Cilium
draft: false
git_integration_title: cilium
guid: 1d9db288-4678-4ede-9ba0-8b04a8ae31c2
integration_id: cilium
integration_title: Cilium
integration_version: 2.2.0
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cilium.
metric_to_check: cilium.endpoint.state
name: cilium
public_title: Datadog-Cilium インテグレーション
short_description: Agent のメトリクスと、クラスター全体のオペレーターメトリクスをポッドごとに収集
support: コア
supported_os:
- linux
- mac_os
- windows
---



## 概要

このチェックは、Datadog Agent を通じて [Cilium][1] を監視します。このインテグレーションにより、`cilium-agent` または `cilium-operator` からメトリクスを収集できます。

## セットアップ

ホストで実行されている Agent 用にこのチェックをインストールおよび構成する場合は、以下の手順に従ってください。コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照してこの手順を行ってください。

### インストール

Cilium チェックは [Datadog Agent][3] パッケージに含まれていますが、Prometheus のメトリクスを公開するための追加のセットアップが必要です。

1. `cilium-agent` と `cilium-operator` の両方で Prometheus のメトリクスを有効にするには、Cilium のバージョンに応じて以下の Helm の値を設定した状態で Cilium をデプロイします。
   * Cilium < v1.8.x:
     `global.prometheus.enabled=true`
   * Cilium >= v1.8.x および < v1.9.x:
     `global.prometheus.enabled=true` および `global.operatorPrometheus.enabled=true`
   * Cilium >= 1.9.x:
     `prometheus.enabled=true` および `operator.prometheus.enabled=true`

または、別途 Kubernetes のマニフェストで Prometheus のメトリクスを有効にします。

   - `cilium-agent` で、Cilium DaemonSet コンフィギュレーションの `args` セクションに `--prometheus-serve-addr=:9090` を追加します。

     ```yaml
     # [...]
     spec:
       containers:
         - args:
             - --prometheus-serve-addr=:9090
     ```

   - `cilium-operator` で、Cilium デプロイコンフィギュレーションの `args` セクションに `--enable-metrics` を追加します。

      ```yaml
      # [...]
      spec:
        containers:
          - args:
              - --enable-metrics
      ```

### コンフィギュレーション

{{< tabs >}}
{{< tab "Host" >}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:
1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `cilium.d/conf.yaml` ファイルを編集し、Cilium のパフォーマンスデータを収集します。使用可能なすべてのコンフィギュレーションオプションについては、[cilium.d/conf.yaml のサンプル][1]を参照してください。

   - `cilium-agent` メトリクスを収集するには、`agent_endpoint` オプションを有効にします。
   - `cilium-operator` メトリクスを収集するには、`operator_endpoint` オプションを有効にします。

    ```yaml  
        instances:

            ## @param use_openmetrics - boolean - optional - default: false
            ## Use the latest OpenMetrics V2 implementation for more features and better performance.
            ##
            ## Note: To see the configuration options for the legacy OpenMetrics implementation (Agent 7.33 or older),
            ## https://github.com/DataDog/integrations-core/blob/7.33.x/cilium/datadog_checks/cilium/data/conf.yaml.example
            #
          - use_openmetrics: true # Enables OpenMetrics V2

            ## @param agent_endpoint - string - optional
            ## The URL where your application metrics are exposed by Prometheus.
            ## By default, the Cilium integration collects `cilium-agent` metrics.
            ## One of agent_endpoint or operator_endpoint must be provided.
            #
            agent_endpoint: http://localhost:9090/metrics

            ## @param operator_endpoint - string - optional
            ## Provide instead of `agent_endpoint` to collect `cilium-operator` metrics.
            ## Cilium operator metrics are exposed on port 6942.
            #
            operator_endpoint: http://localhost:6942/metrics
   ```


**注**: デフォルトでは、conf.yaml.example の `use_openmetrics` オプションは有効になっています。OpenMetrics V1 の実装を使用する場合は、`use_openmetrics` 構成オプションを `false` に設定します。OpenMetrics V1 の構成パラメーターを見るには、[`conf.yaml.example` ファイル][2]を参照してください。

[OpenMetrics V2][3] についてはこちらをご覧ください。
2. [Agent を再起動します][4]。

##### ログの収集

Cilium には `cilium-agent` と `cilium-operator` の 2 種類のログがあります。

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、[DaemonSet コンフィギュレーション][1]でこれを有効にします。

   ```yaml
     # (...)
       env:
       #  (...)
         - name: DD_LOGS_ENABLED
             value: "true"
         - name: DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL
             value: "true"
     # (...)
   ```

2. Datadog Agent への Docker ソケットをマニフェストでマウントするか、Docker を使用していない場合は、`/var/log/pods` ディレクトリをマウントします。マニフェストの例については、[DaemonSet の Kubernetes インストール手順][5]を参照してください。

3. [Agent を再起動します][4]。

[1]: https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/conf.yaml.example
[2]: https://github.com/DataDog/integrations-core/blob/7.33.x/cilium/datadog_checks/cilium/data/conf.yaml.example
[3]: https://datadoghq.dev/integrations-core/base/openmetrics/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/ja/agent/kubernetes/?tab=daemonset#installation
{{< /tab >}}
{{< tab "Containerized" >}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集][2]を参照してください。

##### `cilium-agent` のメトリクスとログを収集するには

- メトリクスの収集

| パラメーター            | 値                                                      |
|----------------------|------------------------------------------------------------|
| `<インテグレーション名>` | `"cilium"`                                                 |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                              |
| `<インスタンスコンフィギュレーション>`  | `{"agent_endpoint": "http://%%host%%:9090/metrics", "use_openmetrics": "true"}` |

- ログの収集

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "cilium-agent", "service": "cilium-agent"}` |

##### `cilium-operator` のメトリクスとログを収集するには

- メトリクスの収集

| パラメーター            | 値                                                      |
|----------------------|------------------------------------------------------------|
| `<インテグレーション名>` | `"cilium"`                                                 |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                              |
| `<インスタンスコンフィギュレーション>`  | `{"operator_endpoint": "http://%%host%%:6942/metrics", "use_openmetrics": "true"}` |

- ログの収集

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "cilium-operator", "service": "cilium-operator"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{< /tab >}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `cilium` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cilium" >}}


### イベント

Cilium インテグレーションには、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "cilium" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。


[1]: https://cilium.io
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://app.datadoghq.com/account/settings#agent
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/