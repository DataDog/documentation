---
description: Datadog Cluster Agent Admission Controller およびライブラリインジェクションに関する一般的な問題のトラブルシューティング
further_reading:
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: ブログ
  text: Kubernetes トレーシングの自動インスツルメンテーション
- link: /containers/cluster_agent/admission_controller/
  tag: ドキュメント
  text: Cluster Agent Admission Controller
- link: /tracing/trace_collection/library_injection_local/?tab=kubernetes
  tag: ドキュメント
  text: Kubernetes ライブラリインジェクション
- link: https://www.datadoghq.com/architecture/instrument-your-app-using-the-datadog-operator-and-admission-controller/
  tag: アーキテクチャセンター
  text: Datadog Operator と Admission Controller を使用してアプリをインスツルメントする
title: Admission Controller のトラブルシューティング
---
## 概要 {#overview}

このページでは、Datadog Cluster Agent の [Admission Controller][1] に関するトラブルシューティングについて説明します。

## 一般的な問題 {#common-problems}

### 既存の Pod の更新 {#update-pre-existing-pods}
Admission Controller は、Kubernetes クラスター内で新しい Pod が作成されたときに処理を行います。Pod の作成時に、Cluster Agent は Kubernetes からリクエストを受け取り、Pod にどのような変更を加えるか (変更がある場合) の詳細を返します。

そのため、**Admission Controller はクラスター内の既存の Pod を変更しません**。Admission Controller を最近有効にした場合や、その他の環境変更を行った場合は、既存の Pod を削除し、Kubernetes に再作成させます。これにより、Admission Controller が Pod を確実に更新します。

### ラベルとアノテーション {#labels-and-annotations}
Cluster Agent は、作成された Pod のラベルとアノテーションに応答しますが、その Pod を作成したワークロード (Deployment、DaemonSet、CronJob など) には応答**しません**。Pod テンプレートがこれを適切に参照していることを確認します。

例えば、次のテンプレートでは、[APM 設定用のラベル][2] と [ライブラリインジェクション用のアノテーション][3] を設定します。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example-deployment
spec:
  #(...)  
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "true"
      annotations:
        admission.datadoghq.com/<LANGUAGE>-lib.version: <VERSION>
    spec:
      containers:
      #(...)
```

### アプリケーション Pod が作成されない {#application-pods-are-not-created}

Admission Controller のインジェクションモード (`socket`、`hostip`、`service`) は、Cluster Agent の設定で決まります。例えば、Agent で `socket` モードが有効になっている場合、Admission Controller も `socket` モードを使用します。

GKE Autopilot または OpenShift を使用している場合は、特定のインジェクションモードを使用する必要があります。

#### GKE Autopilot {#gke-autopilot}

GKE Autopilot は、`volumes` を持つ `hostPath` の使用を制限します。そのため、Admission Controller が `socket` モードを使用すると、Pod は GKE Warden によってスケジューリングをブロックされます。

Helm チャートで GKE Autopilot モードを有効にすると、これが発生しないように `socket` モードが無効になります。APM を有効にするには、ポートを有効にし、代わりに `hostip` または `service` メソッドを使用します。Admission Controller は、一致させるためにデフォルトで `hostip` に設定されます。

{{< tabs >}}
{{% tab "Helm" %}}

```yaml
datadog:
  apm:
    portEnabled: true
  #(...)

providers:
  gke:
    autopilot: true
```
{{% /tab %}}
{{< /tabs >}}

Autopilot に関する詳細な設定については、[Kubernetes ディストリビューション][17] を参照してください。

#### OpenShift {#openshift}

OpenShift には、`hostPath` を持つ `volume` など、追加の権限が必要な Pod をデプロイするために `SecurityContextConstraints` (SCC) があります。Datadog コンポーネントは、Datadog Pod 固有のアクティビティを許可するために SCC を使用してデプロイされますが、Datadog は他の Pod 用の SCC を作成しません。Admission Controller がソケットベースの構成をアプリケーション Pod に追加することで、デプロイに失敗する可能性があります。

OpenShift を使用している場合は、`hostip` モードを使用します。次の構成では、ソケットオプションを無効にして `hostip` モードを有効にします。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  features:
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
    dogstatsd:
      hostPortConfig:
        enabled: true
      unixDomainSocketConfig:
        enabled: false
```
あるいは、`features.admissionController.agentCommunicationMode` を `hostip` または `service` に直接設定することもできます。

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  apm:
    portEnabled: true
    socketEnabled: false
```
あるいは、`clusterAgent.admissionController.configMode` を `hostip` または `service` に直接設定することもできます。
{{% /tab %}}
{{< /tabs >}}

OpenShift に関する詳細な構成については、[Kubernetes ディストリビューション][18] を参照してください。

## Admission Controller のステータスの確認 {#view-admission-controller-status}

Cluster Agent のステータス出力には、`datadog-webhook` 用の `MutatingWebhookConfiguration` が作成され、有効な証明書があることを確認するための情報が表示されます。

次のコマンドを実行します。

```bash
% kubectl exec -it <Cluster Agent Pod> -- agent status
```

出力は次のようになります。

```
...
Admission Controller
====================
  
    Webhooks info
    -------------
      MutatingWebhookConfigurations name: datadog-webhook
      Created at: 2023-09-25T22:32:07Z
      ---------
        Name: datadog.webhook.auto.instrumentation
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injectlib
      ---------
        Name: datadog.webhook.config
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injectconfig
      ---------
        Name: datadog.webhook.tags
        CA bundle digest: f24b6c0c40feaad2
        Object selector: &LabelSelector{MatchLabels:map[string]string{admission.datadoghq.com/enabled: true,},MatchExpressions:[]LabelSelectorRequirement{},}
        Rule 1: Operations: [CREATE] - APIGroups: [] - APIVersions: [v1] - Resources: [pods]
        Service: default/datadog-admission-controller - Port: 443 - Path: /injecttags
  
    Secret info
    -----------
    Secret name: webhook-certificate
    Secret namespace: default
    Created at: 2023-09-25T22:32:07Z
    CA bundle digest: f24b6c0c40feaad2
    Duration before certificate expiration: 8643h34m2.557676864s
...
```

この出力は、`default` 名前空間にデプロイされた Cluster Agent に関連するものです。`Service` と `Secret` は、使用している名前空間と一致している必要があります。

## Admission Controller のログの確認 {#view-admission-controller-logs}

デバッグログは、Admission Controller が正しく構成されていることを確認するのに役立ちます。次の構成で [デバッグログを有効化][3] します。

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
    site: <DATADOG_SITE>
    logLevel: debug
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  logLevel: debug
```

{{% /tab %}}
{{< /tabs >}}

### 検証 `datadog-webhook` {#validate-datadog-webhook}

**ログの例**:

```
<TIMESTAMP> | CLUSTER | INFO | (pkg/clusteragent/admission/controllers/secret/controller.go:73 in Run) | Starting secrets controller for default/webhook-certificate
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:148 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:140 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:148 in enqueue) | Adding object with key datadog-webhook to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/util/kubernetes/apiserver/util.go:47 in func1) | Sync done for informer admissionregistration.k8s.io/v1/mutatingwebhookconfigurations in 101.116625ms, last resource version: 152728
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_v1.go:140 in reconcile) | The Webhook datadog-webhook was found, updating it
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:211 in reconcile) | The certificate is up-to-date, doing nothing. Duration before expiration: 8558h17m27.909792831s
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:174 in processNextWorkItem) | Secret default/webhook-certificate reconciled successfully
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/webhook/controller_base.go:176 in processNextWorkItem) | Webhook datadog-webhook reconciled successfully
```

`datadog-webhook` Webhook が正常に調整されたことを確認できない場合は、[構成手順][1] に従って Admission Controller が正しく有効になっていることを確認します。

### インジェクションの検証 {#validate-injection}

**ログの例**:

```
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:140 in enqueue) | Adding object with key default/webhook-certificate to the queue
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:211 in reconcile) | The certificate is up-to-date, doing nothing. Duration before expiration: 8558h12m28.007769373s
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/controllers/secret/controller.go:174 in processNextWorkItem) | Secret default/webhook-certificate reconciled successfully
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_TRACE_AGENT_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_DOGSTATSD_URL' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_ENTITY_ID' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/common.go:74 in injectEnv) | Injecting env var 'DD_SERVICE' into pod with generate name example-pod-123456789-
<TIMESTAMP> | CLUSTER | DEBUG | (pkg/clusteragent/admission/mutate/auto_instrumentation.go:336 in injectLibInitContainer) | Injecting init container named "datadog-lib-python-init" with image "gcr.io/datadoghq/dd-lib-python-init:v1.18.0" into pod with generate name example-pod-123456789-
```

特定の Pod のインジェクションでエラーが発生した場合は、Datadog の構成と Pod の構成を添えて Datadog サポートにお問い合わせください。

*いずれの* Pod に対してもインジェクションの試行が確認できない場合は、`mutateUnlabelled` の設定を確認し、Pod のラベルが想定される値と一致していることを確認します。これらが一致している場合は、コントロールプレーン、Webhook、サービス間のネットワークに問題がある可能性が高いです。詳細については、[ネットワーク](#networking)を参照してください。

## ネットワーク {#networking}

### ネットワークポリシー {#network-policies}

Kubernetes の [ネットワークポリシー][5] を使用すると、Pod へのさまざまなイングレス (インバウンド) およびエグレス (アウトバウンド) のトラフィックフローを制御できます。

ネットワークポリシーを使用している場合、Datadog では、このポート経由で Pod に接続できるように、Cluster Agent 用の対応するポリシーを作成することを推奨します。次の構成で設定できます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    #(...)
    networkPolicy:
      create: true
      flavor: kubernetes
```
{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  #(...)
  networkPolicy:
    create: true
    flavor: kubernetes
```
{{% /tab %}}
{{< /tabs >}}

`flavor` を `kubernetes` に設定して、`NetworkPolicy` リソースを作成します。

あるいは、Cilium ベースの環境では、`flavor` を `cilium` に設定して、`CiliumNetworkPolicy` リソースを作成します。

### Kubernetes ディストリビューションのネットワークトラブルシューティング {#network-troubleshooting-for-kubernetes-distributions}

Pod が作成されると、Kubernetes クラスターはコントロールプレーンから `datadog-webhook` へ、サービスを経由して、最終的に Cluster Agent Pod にリクエストを送信します。このリクエストには、コントロールプレーンから、Cluster Agent が配置されているノードへのインバウンド接続が必要です。接続には Admission Controller ポート (`8000`) を使用します。このリクエストが解決されると、Cluster Agent は Pod をミューテートして、Datadog SDK のネットワーク接続を構成します。
Admission Controller サービスはポート 443 でトラフィックを受信し、ポート 8000 で Cluster Agent Pod に転送します。

Kubernetes ディストリビューションによっては、セキュリティルールや Admission Controller の設定に追加の要件が必要になる場合があります。

#### Amazon Elastic Kubernetes Service (EKS) {#amazon-elastic-kubernetes-service-eks}

EKS クラスターでは、デフォルトで、Linux ベースの任意のノードに Cluster Agent Pod をデプロイできます。これらのノードとその EC2 インスタンスには、次の [インバウンドルール][7] を持つ [セキュリティグループ][6] が必要です。
- **プロトコル**: TCP
- **ポート範囲**: `8000`、または `8000` をカバーする範囲
- **ソース**: クラスターセキュリティグループまたはクラスターの追加セキュリティグループの_いずれか_の ID。これらの ID は、EKS コンソールの EKS クラスターの_ネットワーキング_タブで確認できます。

このセキュリティグループルールにより、コントロールプレーンはポート `8000` 経由でノードおよびダウンストリームの Cluster Agent にアクセスできるようになります。

複数の [マネージドノードグループ][8] があり、それぞれに異なるセキュリティグループがある場合は、各セキュリティグループにこのインバウンドルールを追加します。

##### コントロールプレーンのログ {#control-plane-logging}

ネットワーク構成を検証するには、API サーバーの [EKS コントロールプレーンログ][9] を有効にします。これらのログは [CloudWatch コンソール][10] で確認できます。

次に、Pod を 1 つ削除して、Admission Controller を介したリクエストを再度トリガーします。リクエストが失敗した場合は、次のようなログを確認できます。

```
W0908 <TIMESTAMP> 10 dispatcher.go:202] Failed calling webhook, failing open datadog.webhook.auto.instrumentation: failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
E0908 <TIMESTAMP> 10 dispatcher.go:206] failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
```

これらの失敗は、`default` 名前空間にデプロイされた Cluster Agent に関連しています。DNS 名は、使用されている名前空間に応じて変わります。

`datadog.webhook.tags` や `datadodg.webhook.config` など、他の Admission Controller Webhook でも失敗が発生する可能性があります。

**注:** EKS では、クラスターの CloudWatch ロググループ内に 2 つのログストリームが生成されることがあります。これらの種類のログについては、両方を確認してください。

#### Azure Kubernetes Service (AKS) {#azure-kubernetes-service-aks}

[AKS で Admission Controller Webhook を使用する][11] には、次の構成を使用します。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
kind: DatadogAgent
apiVersion: datadoghq.com/v2alpha1
metadata:
  name: datadog
spec:
  #(...)
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

```yaml
datadog:
  #(...)

providers:
  aks:
    enabled: true
```

`providers.aks.enabled` オプションは、環境変数 `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"` を設定します。
{{% /tab %}}
{{< /tabs >}}

#### Google Kubernetes Engine (GKE) {#google-kubernetes-engine-gke}

[GKE プライベートクラスター][12] を使用している場合は、コントロールプレーンからポート `8000` へのインバウンドアクセスを許可するようにファイアウォールルールを調整する必要があります。

[ファイアウォールルールを追加][13] して、ポート `8000` での TCP によるイングレスを許可します。

既存のルールを編集することもできます。デフォルトでは、クラスターのネットワークには `gke-<CLUSTER_NAME>-master` という名前のファイアウォールルールがあります。このルールの_ソースフィルタ_に、[クラスターのコントロールプレーンの CIDR ブロック][14] が含まれていることを確認してください。このルールを編集して、プロトコル `tcp` のポート `8000` でのアクセスを許可します。

詳細については、GKE ドキュメントの [特定のユースケース向けのファイアウォールルールの追加][15] を参照してください。

#### Rancher {#rancher}

Rancher を EKS クラスターまたはプライベート GKE クラスターで使用する場合は、追加の構成が必要です。詳細については、Rancher ドキュメントの [Rancher Webhook - 一般的な問題][16] を参照してください。

**注**: Datadog の Admission Controller Webhook は Rancher Webhook と同様に動作するため、Datadog には Rancher の `9443` ではなく、ポート `8000` へのアクセスが必要です。

##### Rancher と EKS {#rancher-and-eks}
Rancher を EKS クラスターで使用するには、次の構成で Cluster Agent Pod をデプロイします。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  override:
    clusterAgent:
      hostNetwork: true
```
{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  #(...)

clusterAgent:
  useHostNetwork: true
```
{{% /tab %}}
{{< /tabs >}}

また、このページの [Amazon EKS](#amazon-elastic-kubernetes-service-eks) セクションで説明されているように、セキュリティグループのインバウンドルールを追加する必要があります。

##### Rancher と GKE {#rancher-and-gke}
プライベート GKE クラスターで Rancher を使用するには、ファイアウォールルールを編集して、ポート `8000` での TCP によるインバウンドアクセスを許可します。このページの [GKE](#google-kubernetes-engine-gke) セクションを参照してください。

## 詳細情報 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/cluster_agent/admission_controller
[2]: /ja/containers/cluster_agent/admission_controller/#apm-and-dogstatsd
[3]: /ja/tracing/trace_collection/library_injection_local/?tab=kubernetes
[4]: /ja/agent/troubleshooting/debug_mode/
[5]: https://kubernetes.io/docs/concepts/services-networking/network-policies/#networkpolicy-resource
[6]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html
[7]: https://docs.aws.amazon.com/vpc/latest/userguide/security-group-rules.html#security-group-rule-components
[8]: https://docs.aws.amazon.com/eks/latest/userguide/managed-node-groups.html
[9]: https://docs.aws.amazon.com/eks/latest/userguide/control-plane-logs.html
[10]: https://console.aws.amazon.com/cloudwatch/home#logs:prefix=/aws/eks
[11]: https://docs.microsoft.com/en-us/azure/aks/faq#can-i-use-admission-controller-webhooks-on-aks
[12]: https://cloud.google.com/kubernetes-engine/docs/concepts/private-cluster-concept
[13]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#step_3_add_a_firewall_rule
[14]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#step_1_view_control_planes_cidr_block
[15]: https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters#add_firewall_rules
[16]: https://ranchermanager.docs.rancher.com/reference-guides/rancher-webhook#common-issues
[17]: /ja/containers/kubernetes/distributions/#autopilot
[18]: /ja/containers/kubernetes/distributions/#Openshift