---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Cilium Overview: assets/dashboards/overview.json
  logs: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - コンテナ
  - ネットワーク
  - security
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-core/blob/master/cilium/README.md'
display_name: Cilium
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

#### ホスト
1. Agent のコンフィギュレーションディレクトリのルートにある `conf.d/` フォルダーの `cilium.d/conf.yaml` ファイルを編集し、Cilium のパフォーマンスデータを収集します。使用可能なすべてのコンフィギュレーションオプションについては、[cilium.d/conf.yaml のサンプル][4]を参照してください。

   - `cilium-agent` メトリクスを収集するには、`agent_endpoint` オプションを有効にします。
   - `cilium-operator` メトリクスを収集するには、`operator_endpoint` オプションを有効にします。

2. [Agent を再起動します][5]。

##### ログの収集

Cilium には `cilium-agent` と `cilium-operator` の 2 種類のログがあります。

1. Datadog Agent で、ログの収集はデフォルトで無効になっています。以下のように、[DaemonSet コンフィギュレーション][4]でこれを有効にします。

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

2. [こちらのマニフェスト][6]のように、Docker ソケットを Datadog Agent にマウントします。Docker を使用していない場合は `/var/log/pods` ディレクトリをマウントします。

3. [Agent を再起動します][5]。

#### コンテナ化

コンテナ環境の場合は、[オートディスカバリーのインテグレーションテンプレート][2]のガイドを参照して、次のパラメーターを適用してください。

##### メトリクスの収集

| パラメーター            | 値                                                      |
|----------------------|------------------------------------------------------------|
| `<インテグレーション名>` | `cilium`                                                   |
| `<初期コンフィギュレーション>`      | 空白または `{}`                                              |
| `<インスタンスコンフィギュレーション>`  | `{"agent_endpoint": "http://%%host%%:9090/metrics"}`       |

##### ログの収集

Datadog Agent では、ログの収集はデフォルトで無効になっています。有効にする方法については、[Kubernetes ログ収集のドキュメント][7]を参照してください。

| パラメーター      | 値                                     |
|----------------|-------------------------------------------|
| `<LOG_CONFIG>` | `{"source": "cilium-agent", "service": "cilium-agent"}` |


### 検証

[Agent の status サブコマンドを実行][8]し、Checks セクションで `cilium` を探します。

## 収集データ

### メトリクス
{{< get-metrics-from-git "cilium" >}}


### サービスのチェック

`cilium.prometheus.health`: Agent がメトリクスのエンドポイントに到達できない場合は `CRITICAL` を返します。それ以外の場合は、`OK` を返します。

### イベント

Cilium には、イベントは含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][10]までお問合せください。

[1]: https://cilium.io
[2]: https://docs.datadoghq.com/ja/agent/kubernetes/integrations/
[3]: https://docs.datadoghq.com/ja/agent/
[4]: https://github.com/DataDog/integrations-core/blob/master/cilium/datadog_checks/cilium/data/conf.yaml.example
[5]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/ja/agent/kubernetes/daemonset_setup/?tab=k8sfile#create-manifest
[7]: https://docs.datadoghq.com/ja/agent/kubernetes/log/
[8]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-status-and-information
[9]: https://github.com/DataDog/integrations-core/blob/master/cilium/metadata.csv
[10]: https://docs.datadoghq.com/ja/help/