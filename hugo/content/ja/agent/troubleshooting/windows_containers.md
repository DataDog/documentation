---
further_reading:
- link: /agent/docker/?tab=windows
  tag: ドキュメント
  text: Docker Agent
- link: /agent/kubernetes/
  tag: ドキュメント
  text: Kubernetes Agent
- link: /agent/troubleshooting/
  tag: ドキュメント
  text: Agent のトラブルシューティング
title: Windows Containers の問題
---
このページでは、Containerized Windows Applications Monitoring の既知の未解決の問題について説明します。

## 一般的な問題 {#common-issues}

Containerized Windows Applications Monitoring には、Datadog Agent 7.19 以降が必要です。

対応する OS のバージョンは以下の通りです。
- Windows Server 2019 (LTSC / 1809)
- Windows Server 2019 1909 (Agent 7.39 まで、Microsoft によるサポートが終了しているため)
- Windows Server 2019 2004 または 20H1 (Agent 7.39 まで、Microsoft によるサポートが終了しているため)
- Windows Server 2019 20H2 (Agent 7.33〜7.39、Microsoft によるサポートが終了しているため)
- Windows Server 2022 LTSC (Agent >=7.34)

Hyper-V 分離モードはサポートされていません。

ディスク、IO、およびネットワークのホストメトリクスは無効になっています。これらは Windows Server ではサポートされていないため、Agent チェックはデフォルトで無効になっています。

## Docker の問題 {#docker-issues}

ライブプロセスはコンテナに表示されません (Datadog Agent を除く)。

## Kubernetes の問題 {#kubernetes-issues}

ライブプロセスはコンテナに表示されません (Datadog Agent を除く)。

### 混在クラスター (Linux + Windows){#mixed-clusters-linux-windows}

混在クラスターに Datadog Agent をデプロイするには、Helm チャートの 2 つのインストールを異なる `targetSystem` で実行することが推奨されます。

Datadog Agent は `nodeSelector` を使用して、`targetSystem` に基づき Linux または Windows ノードを自動的に選択します。

ただし、Kube State メトリクス (デフォルトでインストール済み) はこの限りではなく、Kube State メトリクスが Windows ノードにスケジュールできない状況につながる可能性があります。

この問題を回避するには、3 つのオプションがあります。

* Windows ノードにテイントを設定する。Windows では、Agent は常に `node.kubernetes.io/os=windows:NoSchedule` テイントを許可します。
* Datadog Helm チャートの `values.yaml` を使用して、Kube State Metrics のノードセレクターを設定する。

   ```
   kube-state-metrics:
     nodeSelector:
       beta.kubernetes.io/os: linux // Kubernetes < 1.14
       kubernetes.io/os: linux // Kubernetes >= 1.14
   ```

* Kube State メトリクスを個別にデプロイし、`datadog.kubeStateMetricsEnabled` を `false` に設定する。

**注**: Datadog を 2 つインストール (`targetSystem: linux` と `targetSystem: windows`) する場合、Kube State Metrics が重複してデプロイされないよう、2 つ目のインストールでは `datadog.kubeStateMetricsEnabled` を `false` に設定してください。

一部のメトリクスは、Windows デプロイメントでは利用できません。「[利用可能なメトリクス](#limited-metrics-for-windows-deployments)」を参照してください。

#### Datadog Cluster Agent を使用した混在クラスター {#mixed-clusters-with-the-datadog-cluster-agent}

Cluster Agent v1.18 以降では、Datadog Cluster Agent でクラスターが混在する構成がサポートされます。

Windows ノードにデプロイされた Agent と Cluster Agent 間の通信を構成するには、次の `values.yaml` ファイルを使用してください。

```yaml
targetSystem: windows
existingClusterAgent:
  join: true
  serviceName: "<EXISTING_DCA_SERVICE_NAME>" # from the first Datadog Helm chart
  tokenSecretName: "<EXISTING_DCA_SECRET_NAME>" # from the first Datadog Helm chart

# Disable datadogMetrics deployment since it should have been already deployed with the first chart.
datadog-crds:
  crds:
    datadogMetrics: false
# Disable kube-state-metrics deployment
datadog:
  kubeStateMetricsEnabled: false
```

#### Windows デプロイでは構成オプションが制限されています {#limited-configuration-options-for-windows-deployments}

<div class="alert alert-info">Windows ノードでの Agent のデプロイは、 <code>DatadogAgent</code> リソース単体ではサポートされていません。</div>

Datadog Operator v1.30.0 以降、混在ノード (Windows および Linux) クラスターで Windows ノードのサポートが利用可能です。これを使用するには、`DatadogAgent` リソースに加えて、Windows を対象とした [DatadogAgentProfile](/containers/datadog_operator/datadog_agent_profiles) を追加してください。`DatadogAgentProfile` を使用していない場合は、[Helm チャート](/containers/kubernetes/installation/?tab=helm)を使用して Windows ノードに Agent をデプロイしてください。

一部の構成オプションは Windows では使用できません。以下は **サポートされていない**オプションのリストです。

| パラメーター                      | 理由 |
| --- | ----------- |
| `datadog.dogstatsd.useHostPID` |  Windows コンテナではホスト PID がサポートされていません |
| `datadog.dogstatsd.useSocketVolume` | Windows では Unix ソケットはサポートされていません |
| `datadog.dogstatsd.socketPath` |  Windows では Unix ソケットはサポートされていません |
| `datadog.processAgent.processCollection` |  ホスト/ほかのコンテナプロセスにアクセスできません |
| `datadog.systemProbe.seccomp` | システムプローブは Windows では使用できません |
| `datadog.systemProbe.seccompRoot` | システムプローブは Windows では使用できません |
| `datadog.systemProbe.debugPort` | システムプローブは Windows では使用できません |
| `datadog.systemProbe.enableConntrack` | システムプローブは Windows では使用できません |
| `datadog.systemProbe.bpfDebug` |  システムプローブは Windows では使用できません |
| `datadog.systemProbe.apparmor` |  システムプローブは Windows では使用できません |
| `agents.useHostNetwork` | Windows Containers ではホストネットワークがサポートされていません|

### APM または DogStatsD の HostPort{#hostport-for-apm-or-dogstatsd}

`HostPort` は、基盤となる OS バージョンおよび CNI プラグインに応じて、Kubernetes で部分的にサポートされています。
`HostPort` を機能させるための要件は以下の通りです。

* Windows Server バージョンは 1909 以降であること
* CNI プラグインが `portMappings` 機能に対応していること

現在、少なくとも 2 つの CNI プラグインがこの機能に対応しています。

* 公式の `win-bridge` プラグイン (バージョン 0.8.6 以降) – GKE が使用
* Azure CNI プラグイン – AKS が使用

セットアップがこの要件を満たさない場合、APM および DogStatsD はトレーサーと Agent の間にポッドツーポッドネットワーキングが構成されている場合にのみ機能します。

### Kubelet チェック {#kubelet-check}

Kubernetes のバージョンによっては、一部の Kubelet メトリクスが利用できない (または Kubelet チェックがタイムアウトする) 場合があります。
最適なエクスペリエンスのために、Datadog Agent v7.19.2 以降で以下のいずれかを使用してください。

* Kubelet v1.16.13 以降 (GKE では v1.16.11 以降)
* Kubelet v1.17.9 以降 (GKE では v1.17.6 以降)
* Kubelet v1.18.6 以降
* Kubelet v1.19 以降

### Windows デプロイメントの制限付きメトリクス {#limited-metrics-for-windows-deployments}

Windows コンテナでは、以下の `kubernetes.*` メトリクスが利用可能です。

* `kubernetes.cpu.usage.total`
* `kubernetes.containers.restarts`
* `kubernetes.containers.running`
* `kubernetes.cpu.capacity`
* `kubernetes.ephemeral_storage.usage`
* `kubernetes.kubelet.container.log_filesystem.used_bytes`
* `kubernetes.kubelet.network_plugin.latency.count`
* `kubernetes.kubelet.network_plugin.latency.quantile`
* `kubernetes.kubelet.network_plugin.latency.sum`
* `kubernetes.kubelet.runtime.errors`
* `kubernetes.kubelet.runtime.operations`
* `kubernetes.memory.capacity`
* `kubernetes.pods.running`
* `kubernetes.rest.client.latency.count`
* `kubernetes.rest.client.latency.sum`
* `kubernetes.rest.client.requests`
* `kubernetes.network.tx_bytes`
* `kubernetes.network.rx_bytes`
* `kubernetes.cpu.usage.total`
* `kubernetes.memory.working_set`
* `kubernetes.filesystem.usage`
* `kubernetes.filesystem.usage_pct`