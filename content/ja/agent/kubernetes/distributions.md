---
title: Kubernetes ディストリビューション
kind: documentation
further_reading:
    - link: agent/kubernetes/log
      tag: ドキュメント
      text: アプリケーションログの収集
    - link: agent/kubernetes/host_setup
      tag: ドキュメント
      text: アプリケーショントレースの収集
    - link: /agent/kubernetes/prometheus
      tag: ドキュメント
      text: Prometheus メトリクスの収集
    - link: /agent/kubernetes/integrations
      tag: ドキュメント
      text: アプリケーションのメトリクスとログを自動で収集
    - link: /agent/guide/autodiscovery-management
      tag: ドキュメント
      text: データ収集をコンテナのサブセットのみに制限
    - link: /agent/kubernetes/tag
      tag: ドキュメント
      text: コンテナから送信された全データにタグを割り当て
---

## 概要

このセクションの目的は、すべての主要な Kubernetes ディストリビューションに向けた特定の事項を文書化し、適切な基本コンフィギュレーションを提供することです。
これらのコンフィギュレーションをカスタマイズして、Datadog 機能を追加できます。

* [AWS Elastic Kubernetes Service (EKS)](#EKS)
* [Azure Kubernetes Service (AKS)](#AKS)
* [Google Kubernetes Engine (GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)

## AWS Elastic Kubernetes Service (EKS) {#EKS}

特殊なコンフィギュレーションは必要ありません。

ノードで AWS Bottlerocket OS を使用している場合、コンテナモニタリング (`containerd` チェック) を有効化するために以下を追加してください:

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  criSocketPath: /run/dockershim.sock
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  credentials:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
  agent:
    config:
      criSocket:
        criSocketPath: /run/dockershim.sock
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
    apm:
      enabled: false
    process:
      enabled: true
      processCollectionEnabled: false
    log:
      enabled: false
    systemProbe:
      enabled: false
    security:
      compliance:
        enabled: false
      runtime:
        enabled: false
  clusterAgent:
    image:
      name: "gcr.io/datadoghq/cluster-agent:latest"
    config:
      externalMetrics:
        enabled: false
      admissionController:
        enabled: false
```

{{% /tab %}}
{{< /tabs >}}

## Azure Kubernetes Service (AKS) {#AKS}

AKS では、AKS 証明書の設定のため、`Kubelet` インテグレーション向けの特殊なコンフィギュレーションが必要となります。

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    host:
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
    hostCAPath: /etc/kubernetes/certs/kubeletserver.crt
    # tlsVerify: false # 提供されたコンフィギュレーションで Kubelet インテグレーションが失敗した場合
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  credentials:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
  agent:
    config:
      kubelet:
        host:
          fieldRef:
            fieldPath: spec.nodeName
        hostCAPath: /etc/kubernetes/certs/kubeletserver.crt
        # tlsVerify: false # 提供されたコンフィギュレーションで Kubelet インテグレーションが失敗した場合
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
    apm:
      enabled: false
    process:
      enabled: true
      processCollectionEnabled: false
    log:
      enabled: false
    systemProbe:
      enabled: false
    security:
      compliance:
        enabled: false
      runtime:
        enabled: false
  clusterAgent:
    image:
      name: "gcr.io/datadoghq/cluster-agent:latest"
    config:
      externalMetrics:
        enabled: false
      admissionController:
        enabled: false
```

{{% /tab %}}
{{< /tabs >}}

**注**: 設定の中には、ポッド内における `spec.nodeName` のDNS 解決が AKS で動作しない場合があります。
これはすべての AKS Windows ノード、および Linux ノードでカスタム DNS を使用してクラスターを Virtual Network で設定した場合に報告されています。
この場合は `tlsVerify: false` を使用する必要があります。

## Google Kubernetes Engine (GKE) {#GKE}

GKE は 2 つの異なる運用モードで構成することができます:

- **Standard**: クラスターの基盤となるインフラを管理し、ノードの構成を柔軟に変更することができます。
- **Autopilot**: GKEは、ノードやノードプールなどクラスターの基盤となるインフラのプロビジョニングおよび管理を行い、最適なクラスターを提供します。

お使いのクラスターの運用モードに応じて、Datadog Agent で異なる設定を行う必要があります。

### 標準的な方法

Agent 7.26 以降、GKE 向けの特殊なコンフィギュレーションは不要となりました (`Docker` および/または `containerd` をお使いの場合)。

**注**: COS (Container Optimized OS) をお使いの場合、Kernel  ヘッダーがないため eBPF ベースの `OOM Kill` および `TCP Queue Length` チェックはサポートされません。

### Autopilot

GKE Autopilot はより高度なセキュリティとノードへのアクセス制限を備えています。そのため、いくつかの特別なコンフィギュレーションが必要となります。

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>

  # 新しい `kubernetes_state_core` チェックを有効化します。
  kubeStateMetricsCore:
    enabled: true
  # kube-state-metrics チャートのデプロイを回避します。
  # 新しい `kubernetes_state_core` における kube-state-metrics のデプロイは不要になりました。
  kubeStateMetricsEnabled: false

providers:
  gke:
    autopilot: true
```

{{% /tab %}}
{{% tab "Operator" %}}

まだサポートされていません。Datadog perator v0.7.0 で利用可能となる予定です。

{{% /tab %}}
{{< /tabs >}}


## Red Hat OpenShift {#Openshift}

OpenShift にはデフォルトで強化されたセキュリティ (SELinux、SecurityContextConstraints) が搭載されているため、特定のコンフィギュレーションが必要になります:
- Node Agent と Cluster Agent 用の SCC を作成
- OpenShift が CRI-O コンテナランタイムを使用しているため、特定の CRI ソケットパスが必要
- Kubelet API 証明書がクラスター CA により署名されない場合も
- Node Agent を `master` および `infra` ノード上にスケジュールするための許容範囲が必要
- クラスター名には、クラウドプロバイダーが自動で取得されない値を設定

このコンフィギュレーションは OpenShift 3.11 および OpenShift 4をサポートしていますが、OpenShift 4 で最も良い状態で動作します。

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  criSocketPath: /var/run/crio/crio.sock
  # DNS/SSL の設定によっては、Kubelet 証明書を正しく検証できない場合も
  # 適切なCA があれば true に切り替え
  kubelet:
    tlsVerify: false
agents:
  podSecurity:
    securityContextConstraints:
      create: true
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/master
    operator: Exists
  - effect: NoSchedule
    key: node-role.kubernetes.io/infra
    operator: Exists
clusterAgent:
  podSecurity:
    securityContextConstraints:
      create: true
kube-state-metrics:
  securityContext:
    enabled: false
```

{{% /tab %}}
{{% tab "Operator" %}}

OpenShift で Datadog Operator を使用する場合、OperatorHub または RedHat Marketplace からインストールすることが推奨されています。
以下のコンフィギュレーションは、(SCC/ServiceAccountの設定のため)、この設定と合わせて、Agent が Datadog Operator と同じネームスペースにインストールされている場合を前提として動作します。

```
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  credentials:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
    apm:
      enabled: false
    process:
      enabled: true
      processCollectionEnabled: false
    log:
      enabled: false
    systemProbe:
      enabled: false
    security:
      compliance:
        enabled: false
      runtime:
        enabled: false
    rbac:
      serviceAccountName: datadog-agent-scc
    config:
      kubelet:
        tlsVerify: false
      criSocket:
        criSocketPath: /var/run/crio/crio.sock
        useCriSocketVolume: true
      tolerations:
      - effect: NoSchedule
        key: node-role.kubernetes.io/master
        operator: Exists
      - effect: NoSchedule
        key: node-role.kubernetes.io/infra
        operator: Exists
  clusterAgent:
    image:
      name: "gcr.io/datadoghq/cluster-agent:latest"
    config:
      externalMetrics:
        enabled: false
        port: 8443
      admissionController:
        enabled: false
```

{{% /tab %}}
{{< /tabs >}}

## Rancher {#Rancher}

Rancher のインストールは vanilla Kubernetes に近く、わずかなコンフィギュレーションのみで準備が完了します。
- Node Agent を `controlplane` および `etcd` ノード上にスケジュールするための許容範囲が必要
- クラスター名には、クラウドプロバイダーが自動で取得されない値を設定

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
agents:
  tolerations:
  - effect: NoSchedule
    key: node-role.kubernetes.io/controlplane
    operator: Exists
  - effect: NoExecute
    key: node-role.kubernetes.io/etcd
    operator: Exists
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```
apiVersion: datadoghq.com/v1alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  credentials:
    apiKey: <DATADOG_API_KEY>
    appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  agent:
    image:
      name: "gcr.io/datadoghq/agent:latest"
    apm:
      enabled: false
    process:
      enabled: true
      processCollectionEnabled: false
    log:
      enabled: false
    systemProbe:
      enabled: false
    security:
      compliance:
        enabled: false
      runtime:
        enabled: false
    config:
      kubelet:
        tlsVerify: false
      tolerations:
      - effect: NoSchedule
        key: node-role.kubernetes.io/controlplane
        operator: Exists
      - effect: NoExecute
        key: node-role.kubernetes.io/etcd
        operator: Exists
  clusterAgent:
    image:
      name: "gcr.io/datadoghq/cluster-agent:latest"
    config:
      externalMetrics:
        enabled: false
      admissionController:
        enabled: false
```

{{% /tab %}}
{{< /tabs >}}

その他の `values.yaml` のサンプルは [Helm チャートリポジトリ][1]を、
その他の `DatadogAgent` サンプルは [Datadog Operator リポジトリ][2]をご覧ください。

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/tree/master/examples/datadog
[2]: https://github.com/DataDog/datadog-operator/tree/master/examples/datadogagent
