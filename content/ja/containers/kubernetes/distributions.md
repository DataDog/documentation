---
aliases:
- /ja/agent/kubernetes/distributions
further_reading:
- link: agent/kubernetes/log
  tag: Documentation
  text: Collect your application logs
- link: /agent/kubernetes/apm
  tag: Documentation
  text: Collect your application traces
- link: /agent/kubernetes/prometheus
  tag: Documentation
  text: Collect your Prometheus metrics
- link: /agent/kubernetes/integrations
  tag: Documentation
  text: Collect automatically your applications metrics and logs
- link: /agent/guide/autodiscovery-management
  tag: Documentation
  text: Limit data collection to a subset of containers only
- link: /agent/kubernetes/tag
  tag: Documentation
  text: Assign tags to all data emitted by a container
- link: https://www.datadoghq.com/blog/monitor-vsphere-tanzu-kubernetes-grid-with-datadog/
  tag: Blog
  text: Monitor Tanzu Kubernetes Grid on vSphere
title: Kubernetes distributions
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
{{% tab "Datadog Operator" %}}

In an EKS cluster, you can install the Operator using [Helm][1] or as an [EKS add-on][2].

The configuration below is meant to work with either setup (Helm or EKS add-on) when the Agent is installed in the same namespace as the Datadog Operator.

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

[1]:/ja/containers/kubernetes/installation/?tab=datadogoperator
[2]: /ja/agent/guide/operator-eks-addon

{{% /tab %}}
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

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

{{< /tabs >}}

## Azure Kubernetes Service (AKS) {#AKS}

AKS では、SSL 証明書の設定方法によって、`Kubelet` インテグレーションに特定の構成が必要です。また、オプションの [Admission Controller][1] 機能では、Webhook の照合時にエラーが発生しないよう、特定の構成が必要です。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

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

{{< /tabs >}}

`kubelet.tlsVerify=false` は、環境変数 `DD_KUBELET_TLS_VERIFY=false` を設定して、サーバー証明書の検証を無効化することができます。

### AKS Kubelet 証明書

古いノードイメージのバージョンでは、AKS Kubelet 証明書のフォーマットに既知の問題があります。Agent 7.35 では、証明書に有効な Subject Alternative Name (SAN) が含まれていないため、`tlsVerify: false` を使用することが必要です。

AKS クラスター内のすべてのノードがサポートされているノードイメージのバージョンを使用している場合、Kubelet TLS Verification を使用できます。バージョンは、[2022-10-30 リリースについてここに記載されているバージョン][2]以上である必要があります。また、カスタム証明書パスのアドレスとマップにノード名を使用するように、Kubelet 構成を更新する必要があります。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

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
{{< /tabs >}}

Using `spec.nodeName` keeps TLS verification. In some setups, DNS resolution for `spec.nodeName` inside Pods may not work in AKS. This has been reported on all AKS Windows nodes and when the cluster is setup in a Virtual Network using custom DNS on Linux nodes. In this case use the first AKS configuration provided: remove any settings for the Kubelet host path (defaults to `status.hostIP`) and use `tlsVerify: false`. This setting is **required**. Do NOT set the Kubelet host path and `tlsVerify: false` together.

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

Custom `datadog-values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>

  # The site of the Datadog intake to send Agent data to (example: `us3.datadoghq.com`)
  # Default value is `datadoghq.com' (the US1 site)
  # Documentation: https://docs.datadoghq.com/getting_started/site/
  site: <DATADOG_SITE>

agents:
  containers:
    agent:
      # resources for the Agent container
      resources:
        requests:
          cpu: 200m
          memory: 256Mi

    traceAgent:
      # resources for the Trace Agent container
      resources:
        requests:
          cpu: 100m
          memory: 200Mi

    processAgent:
      # resources for the Process Agent container
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

### Spot ポッドとインスタンス

GKE Autopilot クラスターで Spot ポッドを使用すると、GKE ノードに taint が導入されます。Spot ポッドを使用するには、Datadog Agent に許容範囲を与えるための追加の構成が必要です。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
      tolerations:
        - effect: NoSchedule
          key: cloud.google.com/gke-spot
          operator: Equal
          value: "true"
```
{{% /tab %}}
{{% tab "Helm" %}}
```yaml
agents:
  #(...)
  # agents.tolerations -- taint が適用されたノードで DaemonSet のスケジュールを可能にします (Kubernetes >= 1.6  が必要)
  tolerations:
  - effect: NoSchedule
    key: cloud.google.com/gke-spot
    operator: Equal
    value: "true"
```
{{% /tab %}}
{{< /tabs >}}

**Note**: Network Performance Monitoring is not supported for GKE Autopilot.

## Red Hat OpenShift {#Openshift}

OpenShift にはデフォルトで強化されたセキュリティ (SELinux、SecurityContextConstraints) が搭載されているため、特定のコンフィギュレーションが必要になります:
- Node Agent と Cluster Agent 用の SCC を作成
- OpenShift が CRI-O コンテナランタイムを使用しているため、特定の CRI ソケットパスが必要
- Kubelet API 証明書は、クラスター CA によって署名されない場合がある
- Node Agent を `master` および `infra` ノード上にスケジュールするための許容範囲が必要
- クラスター名には、クラウドプロバイダーが自動で取得されない値を設定

このコンフィギュレーションは OpenShift 3.11 および OpenShift 4をサポートしていますが、OpenShift 4 で最も良い状態で動作します。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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
      containers:
        cluster-agent:
          securityContext:
            readOnlyRootFilesystem: false
    nodeAgent:
      serviceAccountName: datadog-agent-scc
      securityContext:
        runAsUser: 0
        seLinuxOptions:
          level: s0
          role: system_r
          type: spc_t
          user: system_u
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

**注**: nodeAgent Security Context のオーバーライドは、`/var/run/datadog/apm/apm.socket` ソケットを使用したログ収集と APM トレース収集に必要です。これらの機能が有効になっていない場合は、このオーバーライドを省略できます。

{{% /tab %}}
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  criSocketPath: /var/run/crio/crio.sock
  # Depending on your DNS/SSL setup, it might not be possible to verify the Kubelet cert properly
  # If you have proper CA, you can switch it to true
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

{{< /tabs >}}

## Rancher {#Rancher}

Rancher installations are similar to vanilla Kubernetes installations, requiring only some minor configuration:
- Tolerations are required to schedule the Node Agent on `controlplane` and `etcd` nodes.
- The cluster name should be set as it cannot be retrieved automatically from the cloud provider.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

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

{{< /tabs >}}

## Oracle Container Engine for Kubernetes (OKE) {#OKE}

特殊なコンフィギュレーションは必要ありません。

コンテナのモニタリングを有効にするには、以下を追加します (`containerd` check):

{{< tabs >}}
{{% tab "Datadog Operator" %}}

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
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

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

{{< /tabs >}}

More `datadog-values.yaml` examples can be found in the [Helm chart repository][3].
More `datadog-agent.yaml` examples can be found in the [Datadog Operator repository][4].

## vSphere Tanzu Kubernetes Grid (TKG) {#TKG}

TKG では、以下に示すような小さな構成変更が必要です。例えば、コントローラが `master` ノード上の Node Agent をスケジュールするために、許容量を設定することが必要です。


{{< tabs >}}
{{% tab "Datadog Operator" %}}

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
{{% tab "Helm" %}}

Custom `datadog-values.yaml`:

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

{{< /tabs >}}


{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/cluster_agent/admission_controller
[2]: https://github.com/Azure/AKS/releases/tag/2022-10-30
[3]: https://github.com/DataDog/helm-charts/tree/main/examples/datadog
[4]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent/v2alpha1
[5]: /ja/getting_started/containers/datadog_operator
[6]: /ja/agent/guide/operator-eks-addon