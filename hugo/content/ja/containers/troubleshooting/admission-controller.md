---
further_reading:
- link: https://www.datadoghq.com/blog/auto-instrument-kubernetes-tracing-with-datadog/
  tag: ブログ
  text: Kubernetes トレーシングの自動インスツルメンテーション
- link: /containers/cluster_agent/admission_controller/
  tag: ドキュメント
  text: Cluster Agent Admission Controller
- link: /tracing/trace_collection/library_injection_local/?tab=kubernetes
  tag: ドキュメント
  text: Kubernetes ライブラリの注入
title: Admission Controller のトラブルシューティング
---

## 概要

このページでは、Datadog Cluster Agent の [Admission Controller][1] のトラブルシューティングを紹介します。

## 一般的な問題

### 既存のポッドの更新
Admission Controller は、Kubernetes クラスター内の新しいポッドの作成に対応します。ポッドの作成時に、Cluster Agent は Kubernetes からリクエストを受信し、ポッドにどのような変更を加えるか (もしあれば) の詳細を応答します。

したがって、**Admission Controller はクラスター内の既存のポッドを変更しません**。最近 Admission Controller を有効にしたり、その他の環境変更を行った場合は、既存のポッドを削除して Kubernetes に再作成させてください。これにより、Admission Controller がポッドを確実に更新します。

### ラベルとアノテーション
Cluster Agent は、作成されたポッドのラベルとアノテーションに応答します —そのポッドを作成したワークロード (デプロイメント、DaemonSet、CronJob など) には応答**しません**。ポッドテンプレートがこれを適宜参照するようにしてください。

例えば、以下のテンプレートでは [APM 構成のラベル][2]と[ライブラリ注入のアノテーション][3]を設定しています。

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

### アプリケーションポッドが作成されない

Admission Controller の注入モード (`socket`、`hostip`、`service`) は Cluster Agent の構成によって設定されます。例えば、Agent で `socket` モードを有効にしている場合、Admission Controller も `socket` モードを使用します。

GKE Autopilot または OpenShift を使用している場合は、特定の注入モードを使用する必要があります。

#### GKE Autopilot

GKE Autopilot は、`hostPath` を持つ `volumes` の使用を制限します。そのため、Admission Controller が `socket` モードを使用すると、ポッドは GKE Warden によってスケジューリングがブロックされます。

Helm チャートで GKE Autopilot モードを有効にすると、`socket` モードが無効になり、この現象が発生しなくなります。APM を有効にするには、ポートを有効にして、代わりに `hostip` または `service` メソッドを使用します。Admission Controller はデフォルトで `hostip` を使用します。

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

Autopilot に関する構成の詳細については、[Kubernetes Distributions][17] を参照してください。

#### OpenShift

OpenShift には `SecurityContextConstraints` (SCC) があり、これは `hostPath` を持つ `volume` など追加の権限を必要とするポッドをデプロイする際に必須です。Datadog コンポーネントは Datadog ポッド固有のアクティビティを許可するために SCC を使用してデプロイされますが、Datadog は他のポッド用の SCC は作成しません。Admission Controller がソケットベースの設定をアプリケーションポッドに追加することがあり、その結果ポッドのデプロイに失敗する場合があります。

OpenShift を使用している場合は、`hostip` モードを使用してください。以下の構成は、ソケットオプションを無効化することで `hostip` モードを有効にします。

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

OpenShift に関する構成の詳細については、[Kubernetes Distributions][18] を参照してください。

## Admission Controller のステータスの表示

Cluster Agent のステータス出力は、`MutatingWebhookConfiguration` 用の `datadog-webhook` が作成され、有効な証明書を持っていることを確認するための情報を提供します。

次のコマンドを実行します。

```bash
% kubectl exec -it <Cluster Agent Pod> -- agent status
```

出力は以下のようになります。

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

この出力は `default` ネームスペースにデプロイされた Cluster Agent に対するものです。`Service` と `Secret` は使用するネームスペースと一致している必要があります。

## Admission Controller のログの表示

デバッグログは Admission Controller が正しくセットアップされているかを確認するのに役立ちます。以下の構成で[デバッグログを有効にします][3]。

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

### `datadog-webhook` の検証

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

`datadog-webhook` の Webhook が正常に照合されていない場合は、[構成の説明][1]に従って Admission Controller が正しく有効になっていることを確認してください。

### 注入の検証

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

あるポッドの注入でエラーが発生した場合は、Datadog の構成とポッドの構成を Datadog サポートに連絡してください。

注入の試行が**どの**ポッドにも表示されない場合は、`mutateUnlabelled` 設定を確認し、ポッドのラベルが期待される値と一致していることを確認してください。これらが一致する場合、コントロールプレーン、Webhook、サービス間のネットワークに問題がある可能性があります。詳細は[ネットワーク](#networking)を参照してください。

## ネットワーキング

### ネットワークポリシー

Kubernetes の[ネットワークポリシー][5]は、ポッドへのトラフィックの異なるイングレス (受信) とイグレス (送信) のフローを制御するのに役立ちます。

ネットワークポリシーを使用している場合、Datadog は、このポートを介したポッドへの接続性を確保するために、Cluster Agent に対応するポリシーを作成することを推奨します。以下の構成でこれを行うことができます。

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

`flavor` を `kubernetes` に設定して `NetworkPolicy` リソースを作成します。

また、Cilium ベースの環境では、`flavor` を `cilium` に設定して `CiliumNetworkPolicy` リソースを作成します。

### Kubernetes ディストリビューションのネットワークのトラブルシューティング

ポッドが作成されると、Kubernetes クラスターはコントロールプレーンから `datadog-webhook` にリクエストを送信し、サービスを経由して、最後に Cluster Agent ポッドに到達します。このリクエストは、コントロールプレーンから Cluster Agent が存在するノードへの、Admission Controller ポート (`8000`) を介したインバウンド接続を必要とします。このリクエストが解決された後、Cluster Agent はポッドを変更して Datadog トレーサー用のネットワーク接続を構成します。

お使いの Kubernetes ディストリビューションによっては、セキュリティルールや Admission Controller の設定に追加要件が発生する場合があります。

#### Amazon Elastic Kubernetes Service (EKS)

EKS クラスターでは、デフォルトで Linux ベースのノードに Cluster Agent ポッドをデプロイできます。これらのノードとその EC2 インスタンスには、以下の[インバウンドルール][7]を持つ[セキュリティグループ][6]が必要です。
- **プロトコル**: TCP
- **ポート範囲**: `8000`、または `8000` をカバーする範囲
- **ソース**: クラスターのセキュリティグループ、またはクラスターの追加セキュリティグループの_いずれか_の ID。これらの ID は EKS コンソールの EKS クラスターの _Networking_ タブで確認できます。

このセキュリティグループルールは、コントロールプレーンがポート `8000` を介してノードとダウンストリームの Cluster Agent にアクセスすることを許可します。

複数の[管理ノードグループ][8]があり、それぞれに個別のセキュリティグループがある場合は、各セキュリティグループにこのインバウンドルールを追加します。

##### コントロールプレーンのロギング

ネットワーク構成を検証するには、API サーバーの [EKS コントロールプレーンのロギング][9]を有効にします。これらのログは [CloudWatch コンソール][10]で見ることができます。

次に、ポッドの一つを削除して Admission Controller 経由でリクエストを再トリガーします。リクエストが失敗すると、以下のようなログが表示されます。

```
W0908 <TIMESTAMP> 10 dispatcher.go:202] Failed calling webhook, failing open datadog.webhook.auto.instrumentation: failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
E0908 <TIMESTAMP> 10 dispatcher.go:206] failed calling webhook "datadog.webhook.auto.instrumentation": failed to call webhook: Post "https://datadog-cluster-agent-admission-controller.default.svc:443/injectlib?timeout=10s": context deadline exceeded
```

これらの失敗は、`default` ネームスペースにデプロイされた Cluster Agent に関連しています。使用するネームスペースに応じて DNS 名が調整されます。

また、`datadog.webhook.tags` や `datadodg.webhook.config` など、Admission Controller の他の Webhook での失敗が表示されることもあります。

**注:** EKS はクラスターの CloudWatch ロググループ内に 2 つのログストリームを生成することがよくあります。これらのタイプのログの両方を確認してください。

#### Azure Kubernetes Service (AKS)

[Admission Controller webhooks on AKS][11] を使用するには、以下の構成を使用します。

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

`providers.aks.enabled` オプションは環境変数 `DD_ADMISSION_CONTROLLER_ADD_AKS_SELECTORS="true"` を設定します。
{{% /tab %}}
{{< /tabs >}}

#### Google Kubernetes Engine (GKE)

[GKE プライベートクラスター][12]を使用している場合、コントロールプレーンからポート `8000` へのインバウンドアクセスを許可するようにファイアウォールルールを調整する必要があります。

[ファイアウォールルールを追加][13]して、ポート `8000` の TCP 経由のイングレスを許可します。

既存のルールを編集することもできます。デフォルトでは、クラスターのネットワークには `gke-<CLUSTER_NAME>-master` という名前のファイアウォールルールがあります。このルールの_ソースフィルター_に[クラスターのコントロールプレーンの CIDR ブロック][14]が含まれていることを確認してください。このルールを編集して、ポート `8000` のプロトコル `tcp` によるアクセスを許可します。

詳細については、GKE ドキュメントの[特定のユースケースのためのファイアウォールルールの追加][15]を参照してください。

#### Rancher

EKS クラスターまたはプライベート GKE クラスターで Rancher を使用している場合は、追加の構成が必要です。詳細については、Rancher ドキュメントの [Rancher Webhook - Common Issues][16] を参照してください。

**注**: Datadog の Admission Controller の Webhook は Rancher の Webhook と同じように動作するため、Datadog は Rancher の `9443` の代わりにポート `8000` にアクセスする必要があります。

##### Rancher と EKS
EKS クラスターで Rancher を使用するには、以下の構成で Cluster Agent ポッドをデプロイします。

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

##### Rancher と GKE
プライベート GKE クラスターで Rancher を使用するには、ポート `8000` で TCP 経由のインバウンドアクセスを許可するようファイアウォールルールを編集します。このページの [GKE](#google-kubernetes-engine-gke) セクションを参照してください。

## その他の参考資料

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