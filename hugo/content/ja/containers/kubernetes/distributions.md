---
aliases:
- /ja/agent/kubernetes/distributions
description: さまざまな Kubernetes ディストリビューションにおける Datadog Agent のプラットフォーム固有のインストールおよび設定手順
further_reading:
- link: agent/kubernetes/log
  tag: ドキュメント
  text: アプリケーションログを収集する
- link: /agent/kubernetes/apm
  tag: ドキュメント
  text: アプリケーショントレースを収集する
- link: /agent/kubernetes/prometheus
  tag: ドキュメント
  text: Prometheus メトリクスを収集する
- link: /agent/kubernetes/integrations
  tag: ドキュメント
  text: アプリケーションのメトリクスとログを自動的に収集する
- link: /agent/guide/autodiscovery-management
  tag: ドキュメント
  text: データ収集を特定のコンテナのサブセットのみに制限する
- link: /agent/kubernetes/tag
  tag: ドキュメント
  text: コンテナから出力されるすべてのデータにタグを割り当てる
- link: https://www.datadoghq.com/blog/monitor-vsphere-tanzu-kubernetes-grid-with-datadog/
  tag: ブログ
  text: vSphere 上の Tanzu Kubernetes Grid を監視する
title: Kubernetes ディストリビューション
---
## 概要{#overview}

このセクションでは、主要なすべての Kubernetes ディストリビューションの仕様を文書化し、適切な基本設定を紹介します。
これらの設定は、後で Datadog の機能を追加してカスタマイズできます。

* [AWS Elastic Kubernetes Service (EKS)](#EKS)
* [Azure Kubernetes Service (AKS)](#AKS)
* [Google Kubernetes Engine (GKE)](#GKE)
* [Red Hat OpenShift](#Openshift)
* [Rancher](#Rancher)
* [Oracle Container Engine for Kubernetes (OKE)](#OKE)
* [vSphere Kubernetes Service (VKS)](#VKS)
* [vSphere Tanzu Kubernetes Grid (TKG)](#TKG)

## AWS Elastic Kubernetes Service (EKS) {#EKS}

特定の構成は必要ありません。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

EKS クラスターでは、[Helm][1] を使用するか、[EKS アドオン][2] として Operator をインストールできます。

次の構成は、Agent が Datadog Operator と同じ名前空間にインストールされている場合、どちらのセットアップ (Helm または EKS アドオン) でも機能するように設計されています。

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
```

[1]:/ja/containers/kubernetes/installation/?tab=datadogoperator
[2]: /ja/agent/guide/operator-eks-addon

{{% /tab %}}

{{< /tabs >}}

## Azure Kubernetes Service (AKS) {#AKS}

### Admission Controller {#admission-controller}
オプションの [Admission Controller][1] 機能では、Webhook の調整時にエラーが発生しないよう、特定の構成が必要です。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes リソース:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  override:
    clusterAgent:
      containers:
        cluster-agent:
          env:
            - name: DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS
              value: "true"
```

`<DATADOG_SITE>` を [Datadog サイト][1] に置き換えてください。お客様のサイトは {{< region-param key="dd_site" code="true" >}}です (このページの右側で、お客様のアカウントに適したサイトが選択されていることを確認してください)。

[1]: /ja/getting_started/site
{{% /tab %}}
{{% tab "Helm" %}}

カスタムの `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>

providers:
  aks:
    enabled: true
```

`providers.aks.enabled` オプションは、必要な環境変数 `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"` を自動的に設定します。

{{% /tab %}}
{{< /tabs >}}

### Kubelet サーバー証明書のローテーション {#kubelet-serving-certificate-rotation}
クラスターで [Kubelet サーバー証明書のローテーション][13] が**有効になっていない**場合、Datadog Agent が Kubelet に接続できるように追加の構成を行う必要があります。Kubelet サーバー証明書のローテーションは、2025 年 7 月より後に更新されたノードプール上の Kubernetes クラスター 1.27 以降で有効になります。

ノードに `kubernetes.azure.com/kubelet-serving-ca=cluster` というラベルが付いている場合、この機能は有効になっています。以下を実行して、すべてのノードにこのラベルが付いていることを確認してください。

```shell
kubectl get nodes -L kubernetes.azure.com/kubelet-serving-ca
```

すべてのノードに `cluster` が表示されていることを確認してください。

#### Kubelet サーバー証明書のローテーションが有効でない場合 {#without-kubelet-serving-certificate-rotation}

Kubelet サーバー証明書のローテーションが有効になっていない場合は、次の Kubelet 設定を追加してください。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes リソース:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
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

カスタムの `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
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

これらの AKS ノードバージョンでは、AKS Kubelet 証明書を使用するために、前述の例のように Kubelet のホストを `spec.nodeName` に変更し、証明書の `hostCAPath` 場所も変更する必要があります。これにより、TLS 検証が有効になります。これらの変更を行わないと、Agent は Kubelet に接続できません。

<div class="alert alert-info">クラスターで Kubelet サーバー証明書のローテーションが有効になったら、この設定を削除してください。</div>

AKS クラスターをアップグレードすると、Kubelet サーバー証明書のローテーション機能が自動的に有効になる場合があります。上記の特別な設定を使用して証明書 `/etc/kubernetes/certs/kubeletserver.crt` を参照している場合、Datadog Agent に悪影響を及ぼす可能性があります。Kubelet サーバー証明書のローテーションが有効になると、この証明書は削除されるため、次の問題が発生します。

- Datadog Operator の場合、Kubelet に接続できないため、Agent コンテナは `Error` でシャットダウンし、`Error while getting hostname, exiting: unable to reliably determine the host name` がログに記録されます。
- Helm の場合、Agent Pod の起動が失敗し、警告イベント `MountVolume.SetUp failed for volume "kubelet-ca" : hostPath type check failed: /etc/kubernetes/certs/kubeletserver.crt is not a file` が発生します。

このような場合は、追加した Kubelet 設定を削除してください。

代替手段として、[TLS 検証なしで Kubelet に接続する](#without-tls-verification)こともできます。

### TLS 検証を行わない場合 {#without-tls-verification}

一部のクラスターでは、AKS 内の Pod 内から `spec.nodeName`に対する DNS 解決が機能しません。これは次のものに影響します。
 - Windows ノード
 - Linux ノード (カスタム DNS を使用する仮想ネットワーク内にクラスターが設定されている場合)

この場合、次の AKS 構成を使用して `tlsVerify: false` を設定し、Kubelet のホストパス (デフォルトは`status.hostIP`) の設定をすべて削除してください。同じ構成内で、**Kubelet ホストパスと `tlsVerify: false` の両方を設定しないでください**。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes リソース:

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
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

カスタムの `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    tlsVerify: false

providers:
  aks:
    enabled: true
```

{{% /tab %}}
{{< /tabs >}}

## Google Kubernetes Engine (GKE) {#GKE}

GKE は、2 つの異なる運用モードで構成できます。

- **Standard**: クラスターの基盤となるインフラストラクチャーを自分で管理するため、ノード構成を柔軟に行えます。
- **Autopilot**: GKE がノードやノードプールを含むクラスターの基盤となるインフラストラクチャーをプロビジョニングおよび管理するため、手間をかけずに最適化されたクラスターを利用できます。

クラスターの運用モードに応じて、Datadog Agent の構成方法が異なります。

### Standard {#standard}

Agent 7.26 以降、GKE では `Docker` または`containerd` のいずれを実行する場合でも、追加の構成は不要です。唯一の例外は、Helm チャートを使用する Container-Optimized OS (COS) です。Datadog Operator は GKE COS を自動的に検出します。

{{< tabs >}}
{{% tab "Helm" %}}

カスタムの `datadog-values.yaml`:

```yaml
providers:
  gke:
    cos: true
```

{{% /tab %}}
{{< /tabs >}}

### Autopilot {#autopilot}

GKE Autopilot には、次のような構成が必要です。

Datadog では、Agent コンテナのリソース制限を指定することを推奨しています。Autopilot は比較的低いデフォルト制限 (CPU 50m、メモリ 100Mi) を設定するため、環境によっては Agent コンテナがすぐに OOMKill される可能性があります。必要に応じて、Trace Agent、Process Agent、および System-Probe コンテナについてもリソース制限を指定してください。さらに、Agent が確実にスケジュールされるように、Agent 用の優先度クラスを作成することをお勧めします。

Agent `7.65.0+` および Helm チャートのバージョン`3.113.0+` では、Datadog では、Agent が API サーバーから Pod リストを取得するために `datadog.kubelet.useApiServer` を使用することを推奨しています。[非推奨の読み取り専用 kubelet ポート][12] は使用しないでください。


{{< tabs >}}
{{% tab "Helm" %}}

カスタムの `datadog-values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>

  # The site of the Datadog intake to send Agent data to (example: `us3.datadoghq.com`)
  # Default value is `datadoghq.com' (the US1 site)
  # Documentation: https://docs.datadoghq.com/getting_started/site/
  site: <DATADOG_SITE>

  # This option uses the API server to retrieve the node-level pod list from the API server.
  # This setting is necessary to migrate away from the deprecated read-only kubelet port.
  # Requires Agent 7.65.0+ and Datadog Helm chart version 3.113.0+.
  kubelet:
    useApiServer: true

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

    systemProbe:
      # resources for the System Probe container
      resources:
        requests:
          cpu: 100m
          memory: 400Mi

  priorityClassCreate: true

providers:
  gke:
    autopilot: true
```

{{% /tab %}}

{{% tab "Datadog Operator" %}}

Datadog Operator `1.27.0+` では、`experimental.agent.datadoghq.com/autopilot` アノテーションを使用して Autopilot モードを有効にします。Operator は、API サーバーを使用した Pod の検出や必要な WorkloadAllowlist など、GKE Autopilot に必要な設定を Agent に適用します。

カスタムの `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    experimental.agent.datadoghq.com/autopilot: "true"
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
    # The site of the Datadog intake to send Agent data to (example: `us3.datadoghq.com`)
    # Default value is `datadoghq.com' (the US1 site)
    # Documentation: https://docs.datadoghq.com/getting_started/site/
    site: <DATADOG_SITE>
  override:
    nodeAgent:
      containers:
        agent:
          resources:
            requests:
              cpu: 200m
              memory: 256Mi
        trace-agent:
          resources:
            requests:
              cpu: 100m
              memory: 200Mi
        process-agent:
          resources:
            requests:
              cpu: 100m
              memory: 200Mi
        system-probe:
          resources:
            requests:
              cpu: 100m
              memory: 400Mi
```

{{% /tab %}}
{{< /tabs >}}

### Spot Pod およびコンピューティングクラス {#spot-pods-and-compute-classes}

GKE Autopilot クラスターで [Spot Pod][10] を使用すると、対応するスポット GKE ノードに [Taint][9] が付与されます。Spot Pod を使用する場合、Agent DaemonSet に一致する Toleration を提供するために追加の構成が必要です。

{{< tabs >}}
{{% tab "Helm" %}}

```yaml
agents:
  #(...)
  # agents.tolerations -- Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
  tolerations:
  - effect: NoSchedule
    key: cloud.google.com/gke-spot
    operator: Equal
    value: "true"
```
{{% /tab %}}

{{% tab "Datadog Operator" %}}

```yaml
spec:
  override:
    nodeAgent:
      tolerations:
      - effect: NoSchedule
        key: cloud.google.com/gke-spot
        operator: Equal
        value: "true"
```
{{% /tab %}}
{{< /tabs >}}

同様に、特定のハードウェア要件を持つワークロードを実行するために [GKE Autopilot コンピューティングクラス][11] を使用する場合は、GKE Autopilot がこれらの特定のノードに適用する [Taint][9] に注意し、Agent DaemonSet に一致する Toleration を追加してください。対応する Pod の Toleration と同じものを設定することができます。たとえば、`Scale-Out` コンピューティングクラスの場合は、次のような Toleration を使用します。

{{< tabs >}}
{{% tab "Helm" %}}

```yaml
agents:
  #(...)
  # agents.tolerations -- Allow the DaemonSet to schedule on tainted nodes (requires Kubernetes >= 1.6)
  tolerations:
  - effect: NoSchedule
    key: cloud.google.com/compute-class
    operator: Equal
    value: Scale-Out
```
{{% /tab %}}

{{% tab "Datadog Operator" %}}

```yaml
spec:
  override:
    nodeAgent:
      tolerations:
      - effect: NoSchedule
        key: cloud.google.com/compute-class
        operator: Equal
        value: Scale-Out
```
{{% /tab %}}
{{< /tabs >}}


## Red Hat OpenShift {#Openshift}

OpenShift は、SELinux および SecurityContextConstraints (SCC) による強化されたセキュリティがデフォルトで設定されています。そのため、いくつかの固有の構成が必要になります。
- Node Agent および Cluster Agent に、権限が引き上げられた SCC アクセス権を付与します。
- Kubelet API 証明書がクラスター CA によって署名されていない場合があります。
- Node Agent を `master` および `infra` ノードにスケジュールするには、Toleration が必要です
- クラスター名は、クラウドプロバイダーから自動的に取得できないため、設定する必要があります
- *(オプション)* Agent がクラウドプロバイダーのメタデータサービス (IMDS) にリクエストを送信できるように、Node Agent に `hostNetwork: true` を設定します。

このコア構成は OpenShift 3.11 および OpenShift 4 をサポートしていますが、OpenShift 4 で最も適切に機能します。

さらに、ログ収集と APM にもそれぞれわずかに異なる要件があります。

APM および DogStatsD で Unix Domain Socket (UDS) を使用することも、OpenShift では可能です。ただし、Datadog はこれを推奨していません。この方法では、Datadog Agent Pod とアプリケーション Pod の**両方**に対する追加の特権アクセス許可と SCC アクセス権が必要になるためです。これらがないと、アプリケーション Pod のデプロイに失敗する可能性があります。Datadog では、これを回避するために UDS オプションを無効にすることを推奨しています。これにより、Admission Controller が APM 接続のための適切な [TCP/IP 設定][7] または [Service 設定][8] を挿入できるようになります。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

OpenShift で Datadog Operator を使用する場合、Datadog では、OpenShift Cluster Web コンソール内の OperatorHub から Operator Lifecycle Manager を使用して Datadog Operator をデプロイすることを推奨しています。[Operator のインストール手順][1] を参照してください。次の設定はそのセットアップで機能し、指定した ServiceAccount `datadog-agent-scc` に対して [ClusterRole と ClusterRoleBinding を使用した SCC へのアクセス権][2] が作成されます。この`DatadogAgent` 設定は、Datadog Operator と同じ名前空間にデプロイする必要があります。

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
  namespace: openshift-operators # set as the same namespace where the Datadog Operator was deployed
spec:
  features:
    logCollection:
      enabled: true
      containerCollectAll: true
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
    dogstatsd:
      unixDomainSocketConfig:
        enabled: false
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
    clusterName: <CLUSTER_NAME>
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      serviceAccountName: datadog-agent-scc
    nodeAgent:
      serviceAccountName: datadog-agent-scc
      hostNetwork: true
      securityContext:
        runAsUser: 0
        seLinuxOptions:
          level: s0
          role: system_r
          type: spc_t
          user: system_u
      tolerations:
        - key: node-role.kubernetes.io/master
          operator: Exists
          effect: NoSchedule
        - key: node-role.kubernetes.io/infra
          operator: Exists
          effect: NoSchedule
```

**注**: Operator を使用してデプロイする場合、ログ収集には `nodeAgent.securityContext.seLinuxOptions` のオーバーライドが必要です。ログ収集が有効になっていない場合は、このオーバーライドを省略できます。

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/install-openshift.md
[2]: https://docs.openshift.com/container-platform/4.10/authentication/managing-security-context-constraints.html#role-based-access-to-ssc_configuring-internal-oauth
{{% /tab %}}
{{% tab "Helm" %}}

次の設定は、Agent および Cluster Agent Service Account 用のカスタム SCC を作成します。

カスタムの `datadog-values.yaml`:

```yaml
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  clusterName: <CLUSTER_NAME>
  kubelet:
    tlsVerify: false
  apm:
    portEnabled: true
    socketEnabled: false
agents:
  podSecurity:
    securityContextConstraints:
      create: true
  useHostNetwork: true
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
```

{{% /tab %}}

{{< /tabs >}}

## Rancher {#Rancher}

Rancher のインストールは、標準の Kubernetes のインストールと似ており、必要なのはわずかな設定変更のみです。
- Node Agent を `controlplane` および `etcd` ノードにスケジュールするには、Toleration が必要です。
- クラスター名は、クラウドプロバイダーから自動的に取得できないため、設定する必要があります。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes リソース:

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
        name: registry.datadoghq.com/cluster-agent:latest
    nodeAgent:
      image:
        name: registry.datadoghq.com/agent:latest
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

カスタムの `datadog-values.yaml`:

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

特定の構成は必要ありません。

## vSphere Kubernetes Service (VKS) {#VKS}

VKS では、Datadog Agent がデプロイされる名前空間で、Privileged Pod Security Standard を使用する必要があります。Datadog Agent をデプロイする前に、`<namespace>` を、`datadog-agent` をデプロイする名前空間に置き換え、以下を実行します。

```shell
kubectl label --overwrite ns <namespace> \
  pod-security.kubernetes.io/enforce=privileged
```

次の設定を使用して、Kubernetes イベント収集と kube-state-metrics core を有効にし、自己署名証明書を使用している場合の Kubelet TLS 検証を無効にします。さらに、Agent がコントロールプレーンノードにスケジュールできるよう、Toleration を追加します。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes リソース:

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
    clusterName: <CLUSTER_NAME>
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

カスタムの `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    # Set tlsVerify to false since the Kubelet certificates are self-signed
    tlsVerify: false
  # Disable the `kube-state-metrics` dependency chart installation.
  kubeStateMetricsEnabled: false
  # Enable the new `kubernetes_state_core` check.
  kubeStateMetricsCore:
    enabled: true
# Add a toleration so that the agent can be scheduled on the control plane nodes.
agents:
  tolerations:
    - key: node-role.kubernetes.io/master
      effect: NoSchedule
```

{{% /tab %}}

{{< /tabs >}}

## vSphere Tanzu Kubernetes Grid (TKG) {#TKG}

TKG では、以下に示すいくつかの小さな設定変更が必要です。たとえば、コントローラーが `master` ノード上で Node Agent をスケジュールするには、Toleration の設定が必要です。


{{< tabs >}}
{{% tab "Datadog Operator" %}}

DatadogAgent Kubernetes リソース:

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
    clusterName: <CLUSTER_NAME>
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

カスタムの `datadog-values.yaml`:

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  kubelet:
    # Set tlsVerify to false since the Kubelet certificates are self-signed
    tlsVerify: false
  # Disable the `kube-state-metrics` dependency chart installation.
  kubeStateMetricsEnabled: false
  # Enable the new `kubernetes_state_core` check.
  kubeStateMetricsCore:
    enabled: true
# Add a toleration so that the agent can be scheduled on the control plane nodes.
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
[7]: /ja/containers/kubernetes/apm/?tab=tcp
[8]: /ja/tracing/guide/setting_up_apm_with_kubernetes_service
[9]: https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/
[10]: https://cloud.google.com/kubernetes-engine/docs/how-to/autopilot-spot-pods
[11]: https://cloud.google.com/kubernetes-engine/docs/concepts/autopilot-compute-classes
[12]: https://cloud.google.com/kubernetes-engine/docs/how-to/disable-kubelet-readonly-port
[13]: https://learn.microsoft.com/en-us/azure/aks/certificate-rotation#kubelet-serving-certificate-rotation