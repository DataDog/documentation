---
title: Windows コンテナ問題
kind: ドキュメント
further_reading:
- link: /agent/docker/?tab=windows
  tag: Documentation
  text: Docker Agent
- link: /agent/kubernetes/
  tag: Documentation
  text: Kubernetes Agent
- link: /agent/troubleshooting/
  tag: Agent のトラブルシューティング
  text: Agent のトラブルシューティング
---

このページでは、Containerized Windows Applications Monitoring の既知の未解決の問題について説明します。

## 一般的な問題

Containerized Windows Applications Monitoring には、Datadog Agent 7.19+ が必要です。

サポートされている OS バージョンは、Windows Server 2019 (LTSC) とバージョン 1909 (SAC) です。

Hyper-V 分離モードはサポートされていません。

ディスク、IO、およびネットワークのホストメトリクスは無効になっています。これらは Windows Server ではサポートされていないため、Agent チェックはデフォルトで無効になっています。

## Docker の問題

ライブプロセスはコンテナに表示されません (Datadog Agent を除く)。

## Kubernetes の問題

ライブプロセスはコンテナに表示されません (Datadog Agent を除く)。

### 複合クラスター (Linux + Windows)

複合クラスターに Datadog Agent をデプロイするには、Helm チャートの 2 つのインストールを異なる `targetSystem` で実行することが推奨されます。

Datadog Agent は `nodeSelector` を使用して、`targetSystem` に基づき Linux または Windows ノードを自動的に選択します。

ただし、Kube State メトリクス (デフォルトでインストール済み) が Windows ノードにスケジュールできない状況につながるような場合は、この限りではありません。

この問題を回避するには、3 つのオプションがあります。

* Windows ノードに taint を適用します。Windows では、Agent は常に `node.kubernetes.io/os=windows:NoSchedule` taint を許可します。
* Datatog Helm チャート `values.yaml` を使用して、Kube State メトリクスノードセレクタを設定します。

```
kube-state-metrics:
  nodeSelector:
    beta.kubernetes.io/os: linux // Kubernetes < 1.14
    kubernetes.io/os: linux // Kubernetes >= 1.14
```

* `datadog.kubeStateMetricsEnabled` を `false` に設定し、Kube State メトリクスを別途デプロイします。

**注**: 2 つの Datadog インストール (`targetSystem: linux`、`targetSystem: windows`) を使用する場合、2 つ目のインストールで `datadog.kubeStateMetricsEnabled` を必ず `false` に設定してください。Kube State メトリクスのインスタンスを 2 つデプロイしないようにするためです。

### APM または DogStatsD の HostPort 

`HostPort` は、基となる OS バージョンおよび CNI プラグインにより、Kubernetes で一部サポートされています。
`HostPort` が正常に動作するための要件は以下のとおりです。

* Windows Server バージョン 1909 以降
* CNI プラグインが `portMappings` 機能に対応

現在、少なくとも 2 つの CNI プラグインがこの機能に対応しています。

* `win-bridge` 公式プラグイン (バージョン 0.8.6 以降) - GKE が使用
* Azure CNI プラグイン - AKS が使用

セットアップがこの要件を満たさない場合、APM および DogStatsD はトレーサーと Agent の間にポッドツーポッドネットワーキングが構成されている場合にのみ機能します。

### Kubelet チェック

ご使用の Kubernetes バージョンによっては、Kubelet メトリクスの一部をご利用いただけない (または Kubelet チェックがタイムアウトする) ことがあります。
最適にご利用いただくため、以下をご使用ください。

* Kubelet 1.16.13 以降 (GKE では 1.16.11)
* Kubelet 1.17.9 以降 (GKE では 1.17.6)
* Kubelet 1.18.6 以降
* Kubelet 1.19 以降

Agent バージョン 7.19.2 以降

Windows では、ご利用いただけない `kubernetes.*` があります。以下のリストでご利用可能なものをご確認ください。

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
