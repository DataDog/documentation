---
aliases:
- /ja/agent/kubernetes/distributions
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
- link: https://www.datadoghq.com/blog/monitor-vsphere-tanzu-kubernetes-grid-with-datadog/
  tag: ブログ
  text: vSphere 上の Tanzu Kubernetes Grid を監視する
title: Kubernetes ディストリビューション
---

## 概要

このセクションの目的は、すべての主要な Kubernetes ディストリビューションに向けた特定の事項を文書化し、適切な基本コンフィギュレーションを提供することです。
これらのコンフィギュレーションをカスタマイズして、Datadog 機能を追加できます。

* [AWS Elastic Kubernetes Service (EKS)](#EKS)
* [Azure Kubernetes Service (AKS)](#AKS)
* [Google Kubernetes Engine (GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)
* [Oracle Container Engine for Kubernetes (OKE)](#OKE)
* [vSphere Tanzu Kubernetes Grid (TKG)](#TKG)

## AWS Elastic Kubernetes Service (EKS) {#EKS}

特殊なコンフィギュレーションは必要ありません。

ノードで AWS Bottlerocket OS を使用している場合、コンテナモニタリング (`containerd` チェック) を有効化するために以下を追加してください:

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  criSocketPath: /run/dockershim.sock
  env:
  - name: DD_AUTOCONFIG_INCLUDE_FEATURES
    value: "containerd"
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    criSocketPath: /run/dockershim.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
```

{{% /tab %}}
{{< /tabs >}}

## Azure Kubernetes Service (AKS) {#AKS}

AKS では、SSL 証明書の設定方法によって、`Kubelet` インテグレーションに特定の構成が必要です。また、オプションの [Admission Controller][3] 機能では、Webhook の照合時にエラーが発生しないよう、特定の構成が必要です。

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Agent 7.35 から必要です。以下の Kubelet 証明書に関する注記を参照してください。
  kubelet:
    tlsVerify: false

providers:
  aks:
    enabled: true
```

`providers.aks.enabled` オプションは、必要な環境変数 `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"` を設定します。

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: true
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```

{{% /tab %}}
{{< /tabs >}}

`kubelet.tlsVerify=false` は、環境変数 `DD_KUBELET_TLS_VERIFY=false` を設定して、サーバー証明書の検証を無効化することができます。

### AKS Kubelet 証明書

古いノードイメージのバージョンでは、AKS Kubelet 証明書のフォーマットに既知の問題があります。Agent 7.35 では、証明書に有効な Subject Alternative Name (SAN) が含まれていないため、`tlsVerify: false` を使用することが必要です。

AKS クラスター内のすべてのノードがサポートされているノードイメージのバージョンを使用している場合、Kubelet TLS Verification を使用できます。バージョンは、[2022-10-30 リリースについてここに記載されているバージョン][4]以上である必要があります。また、カスタム証明書パスのアドレスとマップにノード名を使用するように、Kubelet 構成を更新する必要があります。

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # サポートされているノードイメージのバージョンが必要です
  kubelet:
    host:
      valueFrom:
        fieldRef:
          fieldPath: spec.nodeName
    hostCAPath: /etc/kubernetes/certs/kubeletserver.crt

providers:
  aks:
    enabled: true
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: true
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    kubelet:
      host:
        fieldRef:
          fieldPath: spec.nodeName
      hostCAPath: /etc/kubernetes/certs/kubeletserver.crt
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```

{{% /tab %}}
{{< /tabs >}}

一部のセットアップで、ポッド内の `spec.nodeName` に対する DNS 解決が AKS で機能しないことがあります。これは、すべての AKS Windows ノードで報告されており、Linux ノードでカスタム DNS を使用して仮想ネットワークでクラスターをセットアップする場合です。この場合、最初に提供された AKS 構成を使用してください。Kubelet ホストパスの設定をすべて削除し (デフォルトは `status.hostIP`)、`tlsVerify: false` を使用します。この設定は**必須**です。

## Google Kubernetes Engine (GKE) {#GKE}

GKE は 2 つの異なる運用モードで構成することができます:

- **Standard**: クラスターの基盤となるインフラを管理し、ノードの構成を柔軟に変更することができます。
- **Autopilot**: GKEは、ノードやノードプールなどクラスターの基盤となるインフラのプロビジョニングおよび管理を行い、最適なクラスターを提供します。

お使いのクラスターの運用モードに応じて、Datadog Agent で異なる設定を行う必要があります。

### 標準的な方法

Agent 7.26 以降では、GKE 向けの特殊なコンフィギュレーションは不要です (`Docker` または `containerd` をお使いの場合)。

**注**: COS (Container Optimized OS) を使用する場合、eBPF ベースの `OOM Kill` と `TCP Queue Length` チェックが Helm チャートのバージョン 3.0.1 以降でサポートされるようになりました。これらのチェックを有効にするには、以下の設定を行います。
- `datadog.systemProbe.enableDefaultKernelHeadersPaths` を `false` にします。

### Autopilot

GKE Autopilot にはコンフィギュレーションが必要です（以下を参照）。

Datadog では、Agent コンテナにリソースの上限を指定することをおすすめします。Autopilot は、比較的低いデフォルトの上限 (50m CPU、100Mi メモリ) を設定するため、ご使用の環境によってはすぐに Agent コンテナが OOMKill に達する可能性があります。該当する場合は、Trace Agent および Process Agent のコンテナにもリソース上限を指定することをおすすめします。さらに、Agent が確実にスケジュールされるように、Agent の優先クラスを作成することができます。

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>

  # 新しい `kubernetes_state_core` チェックを有効化。
  kubeStateMetricsCore:
    enabled: true
  # kube-state-metrics チャートのデプロイを回避。
  # 新しい `kubernetes_state_core` における kube-state-metrics のデプロイは不要。
  kubeStateMetricsEnabled: false

agents:
  containers:
    agent:
      # Agent コンテナのリソース
      resources:
        requests:
          cpu: 200m
          memory: 256Mi

    traceAgent:
      # Trace Agent コンテナのリソース
      resources:
        requests:
          cpu: 100m
          memory: 200Mi

    processAgent:
      # Process Agent コンテナのリソース
      resources:
        requests:
          cpu: 100m
          memory: 200Mi

  priorityClassCreate: true

providers:
  gke:
    autopilot: true
```

{{% /tab %}}
{{< /tabs >}}


## Red Hat OpenShift {#Openshift}

OpenShift にはデフォルトで強化されたセキュリティ (SELinux、SecurityContextConstraints) が搭載されているため、特定のコンフィギュレーションが必要になります:
- Node Agent と Cluster Agent 用の SCC を作成
- OpenShift が CRI-O コンテナランタイムを使用しているため、特定の CRI ソケットパスが必要
- Kubelet API 証明書は、クラスター CA によって署名されない場合がある
- Node Agent を `master` および `infra` ノード上にスケジュールするための許容範囲が必要
- クラスター名には、クラウドプロバイダーが自動で取得されない値を設定

このコンフィギュレーションは OpenShift 3.11 および OpenShift 4をサポートしていますが、OpenShift 4 で最も良い状態で動作します。

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
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

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    logCollection:
      enabled: false
    liveProcessCollection:
      enabled: false
    liveContainerCollection:
      enabled: true
    apm:
      enabled: false
    cspm:
      enabled: false
    cws:
      enabled: false
    npm:
      enabled: false
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
      port: 8443
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
    criSocketPath: /var/run/crio/crio.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      serviceAccountName: datadog-agent-scc
      image:
        name: gcr.io/datadoghq/agent:latest
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/infra
          operator: Exists
          effect: NoSchedule
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

```yaml
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

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    logCollection:
      enabled: false
    liveProcessCollection:
      enabled: false
    liveContainerCollection:
      enabled: true
    apm:
      enabled: false
    cspm:
      enabled: false
    cws:
      enabled: false
    npm:
      enabled: false
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
    nodeAgent:
      image:
        name: gcr.io/datadoghq/agent:latest
      tolerations:
        - key: node-role.kubernetes.io/controlplane
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/etcd
          operator: Exists
          effect: NoExecute
```

{{% /tab %}}
{{< /tabs >}}

## Oracle Container Engine for Kubernetes (OKE) {#OKE}

特殊なコンフィギュレーションは必要ありません。

コンテナのモニタリングを有効にするには、以下を追加します (`containerd` check):

{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  criSocketPath: /run/dockershim.sock
  env:
  - name: DD_AUTOCONFIG_INCLUDE_FEATURES
    value: "containerd"
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    admissionController:
      enabled: false
    externalMetricsServer:
      enabled: false
      useDatadogMetrics: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    criSocketPath: /run/dockershim.sock
  override:
    clusterAgent:
      image:
        name: gcr.io/datadoghq/cluster-agent:latest
```

{{% /tab %}}
{{< /tabs >}}

その他の `values.yaml` のサンプルは [Helm チャートリポジトリ][1]を、
その他の `DatadogAgent` サンプルは [Datadog Operator リポジトリ][2]をご覧ください。

## vSphere Tanzu Kubernetes Grid (TKG) {#TKG}

TKG では、以下に示すような小さな構成変更が必要です。例えば、コントローラが `master` ノード上の Node Agent をスケジュールするために、許容量を設定することが必要です。


{{< tabs >}}
{{% tab "Helm" %}}

カスタム `values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    # Kubelet の証明書は自己署名なので、tlsVerify を false に設定します
    tlsVerify: false
  # `kube-state-metrics` 依存性チャートのインストールを無効化します。
  kubeStateMetricsEnabled: false
  # 新しい `kubernetes_state_core` のチェックを有効にします。
  kubeStateMetricsCore:
    enabled: true
# コントロールプレーンノードで Agent をスケジュールできるように許容範囲を追加します。
agents:
  tolerations:
    - key: node-role.kubernetes.io/master
      effect: NoSchedule
```

{{% /tab %}}
{{% tab "Operator" %}}

DatadogAgent Kubernetes Resource:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  features:
    eventCollection:
      collectKubernetesEvents: true
    kubeStateMetricsCore:
      enabled: true
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    kubelet:
      tlsVerify: false
  override:
    nodeAgent:
      tolerations:
        - key: node-role.kubernetes.io/master
          effect: NoSchedule
```

{{% /tab %}}
{{< /tabs >}}


{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/helm-charts/tree/main/examples/datadog
[2]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent/v2alpha1
[3]: /ja/containers/cluster_agent/admission_controller
[4]: https://github.com/Azure/AKS/releases/tag/2022-10-30