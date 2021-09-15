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
is_public: true
kind: インテグレーション
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: cilium.
metric_to_check: cilium.endpoint.count
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

1. Prometheus のメトリクスを `cilium-agent` と `cilium-operator` に対して有効にするには、Helm の値を `global.prometheus.enabled=true` に設定して Cilium をデプロイするか、次の手順に従います。

2. Prometheus のメトリクスを個別に有効にする

   - `cilium-agent` で、Cilium DaemonSet コンフィギュレーションの `args` セクションに `--prometheus-serve-addr=:9090` を追加します。

     ```yaml
     # [...]
     spec:
       containers:
         - args:
             - --prometheus-serve-addr=:9090
     ```



   - または、`cilium-operator` で、Cilium デプロイコンフィギュレーションの `args` セクションに `--enable-metrics` を追加します。

     ```yaml
     # [...]
     spec:
       containers:
         - args:
             - --enable-metrics
     ```

### コンフィギュレーション

{{< tabs >}}
{{% tab "Host" %}}

#### ホスト

ホストで実行中の Agent に対してこのチェックを構成するには:
1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `cilium.d/conf.yaml` ファイルを編集し、Cilium のパフォーマンスデータを収集します。使用可能なすべてのコンフィギュレーションオプションについては、[cilium.d/conf.yaml のサンプル][1]を参照してください。

   - `cilium-agent` メトリクスを収集するには、`agent_endpoint` オプションを有効にします。
   - `cilium-operator` メトリクスを収集するには、`operator_endpoint` オプションを有効にします。

2. [Agent を再起動します][2]。

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

2. [こちらのマニフェスト][3]のように、Docker ソケットを Datadog Agent にマウントします。Docker を使用していない場合は `/var/log/pods` ディレクトリをマウントします。

3. [Agent を再起動します][2]。

[1]: https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/conf.yaml.example
[2]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#create-manifest
{{% /tab %}}
{{% tab "Containerized" %}}

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][1]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                      |
|----------------------|------------------------------------------------------------|
| `<インテグレーション名>` | `cilium`                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                              |
| `<インスタンスコンフィギュレーション>`  | `{"agent_endpoint": "http://%%host%%:9090/metrics"}`       |

##### ログの収集

Datadog Agent で、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][2]を参照してください。

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "cilium-agent", "service": "cilium-agent"}` |

[1]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### 検証

[Agent の status サブコマンドを実行][4]し、Checks セクションで `cilium` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cilium" >}}


### イベント

Cilium には、イベントは含まれません。

### サービスのチェック
{{< get-service-checks-from-git "cilium" >}}


## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][5]までお問合せください。


[1]: https://cilium.io
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[5]: https://docs.datadoghq.com/ja/help/