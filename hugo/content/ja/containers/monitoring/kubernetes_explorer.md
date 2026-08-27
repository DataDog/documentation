---
aliases:
- /ja/infrastructure/containers/orchestrator_explorer
description: Datadog の Kubernetes Explorer ページを使用して、Pod や Deployment などの Kubernetes
  リソースを監視します。
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: ブログ
  text: アプリケーションが円滑に実行し続けるよう、Kubernetes オペレーターを監視する
- link: https://learn.datadoghq.com/courses/getting-started-k8s
  tag: ラーニングセンター
  text: Kubernetes オブザーバビリティ入門
title: Kubernetes Explorer
---
{{< img src="infrastructure/livecontainers/orch_ex.png" alt="Kubernetes Pod が表示されている Kubernetes エクスプロ－ラー。" style="width:80%;">}}

Datadog の [Kubernetes Explorer][1] を使用して、Pod、Deploymnet などの Kubernetes リソースの状態を監視できます。Deployment に含まれる失敗した Pod のリソース仕様の表示、ノードのアクティビティとログとの関連付け、リソース使用率の追跡、ワークロードの自動スケーリング、エラーの修正を行うこともできます。

<div class="alert alert-info">Datadog Agent を使用する場合、Kubernetes Explorer には Agent 7.27.0 以降および Cluster Agent 1.11.0 以降が必要です。Kubernetes 1.25 以降を使用する場合は、Cluster Agent 7.40.0 以降が必要です。</div>


## 構成 {#configuration}

### Kubernetes Explorer を有効にする {#enable-kubernetes-explorer}

Kubernetes Explorer は、ほとんどの Datadog Agent インストール環境で**デフォルトで有効**になっています。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator を使用して Datadog Agent をインストールすると、Kubernetes Explorer がデフォルトで有効になります。

Kubernetes Explorer が有効になっていることを確認するには、`datadog-agent.yaml` で `features.orchestratorExplorer.enabled` パラメーターが `true` に設定されていることを確認します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    orchestratorExplorer:
      enabled: true
```

{{% /tab %}}
{{% tab "Helm" %}}

[公式の Helm チャート][1] を使用して Datadog Agent をインストールすると、Kubernetes Explorer がデフォルトで有効になります。

Kubernetes Explorer が有効になっていることを確認するには、`datadog-values.yaml` ファイルで `orchestratorExplorer.enabled` パラメーターが `true` に設定されていることを確認します。

```yaml
datadog:
  clusterName: <CLUSTER_NAME>
  # (...)
  processAgent:
    enabled: true
  orchestratorExplorer:
    enabled: true
```

次に、Helm チャートをアップグレードします。

[1]: https://github.com/DataDog/helm-charts

{{% /tab %}}
{{% tab "手動" %}}
手動セットアップについては、[DaemonSet を使用した Kubernetes Explorer のセットアップ][1] を参照してください。

[1]: /ja/infrastructure/faq/set-up-orchestrator-explorer-daemonset

{{% /tab %}}
{{% tab "OpenTelemetry Collector" %}}

Datadog Agent の代わりにネイティブの OpenTelemetry パイプラインを使用して、Kubernetes Explorer にデータを取り込むことができます。このセットアップでは、[`k8sobjects`][1] レシーバーを使用して Kubernetes リソースデータを収集し、そのデータを [Datadog Exporter][2] の Orchestrator Explorer 機能によって転送します。

#### 前提条件 {#prerequisites}

- OpenTelemetry Collector Contrib [v0.154.0][3] 以降。
- OpenTelemetry Collector [Helm チャート][4] v0.156.2 以降。

#### 制限事項 {#limitations}

オープンソースの `k8sobjects` レシーバーは、クラスターの Kubernetes API サーバーにかなりの負荷をかける可能性があります。

推奨事項:

- [ストリーミングリストの改善][5] によって API サーバーへの影響を軽減している Kubernetes 1.33 以降を使用してください。
- 小規模なクラスターから開始してください。出発点としてリソースタイプごとのオブジェクト数を 5,000 未満に制限し、クラスターの健全性を監視しながら段階的にスケールアップします。

以下の手順で、Kubernetes Explorer に必要なコンポーネントについて説明します。Kubernetes インフラストラクチャーのメトリクスも収集する完全な参考例については、[Kubernetes メトリクス][6] を参照してください。

#### 1. Datadog API キーのシークレットを作成する {#1-create-a-datadog-api-key-secret}

Datadog API キーを保存するための Kubernetes シークレットを作成します。

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
```

#### 2. クラスターコレクターを構成する {#2-configure-the-cluster-collector}

このセットアップでは、OTel Collector を Kubernetes Deployment としてデプロイします。次の構成ブロックを含む `deployment-collector.yaml` ファイルを作成するか、これらの構成ブロックを OpenTelemetry Collector 値ファイルにマージします。

##### Collector イメージおよびモード {#collector-image-and-mode}

Contrib ディストリビューションを使用して、単一レプリカの Deployment として実行されるように Collecotr を設定します：

```yaml
mode: deployment
replicaCount: 1

image:
  repository: otel/opentelemetry-collector-contrib
  tag: 0.154.0
  pullPolicy: IfNotPresent

extraEnvs:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        name: datadog-secret
        key: api-key
```

##### Kubernetes オブジェクトの収集 {#kubernetes-objects-collection}

`kubernetesObjects` [プリセット][4] は、Kubernetes Explorer にデータを取り込むために必要となるサービスアカウント、RBAC 権限、および `k8sobjects` レシーバーのデフォルト値を自動的にプロビジョニングします。レシーバー `interval` を、Kubernetes Explorer に必要な `3m` にオーバーライドします。

```yaml
presets:
  kubernetesObjects:
    enabled: true
    watch: true

config:
  receivers:
    k8sobjects:
      interval: 3m
```

##### Datadog Exporter {#datadog-exporter}

Datadog Exporter で `orchestrator_explorer` オプションを有効にします。この設定により、Kubernetes オブジェクトデータが Kubernetes Explorer に送信されます。`<YOUR_DATADOG_SITE>` は、実際の [Datadog サイト][7] に置き換えてください。

```yaml
config:
  exporters:
    datadog:
      api:
        site: <YOUR_DATADOG_SITE>
        key: ${env:DD_API_KEY}
      orchestrator_explorer:
        enabled: true
```

##### プロセッサーとパイプライン {#processors-and-pipeline}

クラスターの UID と名前を検出するための [`resourcedetection`][8] プロセッサーを追加します。

- クラスターの UID (`k8s.cluster.uid`) を検出するには、`k8s_api` 検出器が必要です。
- クラスター名の検出は、ご利用のクラウドプロバイダーによって異なります。サポートされているプロバイダー (EKS、AKS、GCP) および必要な権限については、[`resourcedetection` プロセッサーのドキュメント][8] をご確認ください。
- ご使用のプロバイダーがサポートされていない場合は、`resource/add-cluster-name` プロセッサーを使用してクラスター名を手動で設定してください。`<YOUR_CLUSTER_NAME>` は、実際のクラスター名に置き換えてください。

次に、`logs` パイプライン内でコンポーネントを接続します。

次の例で、2 つの方法を示します。EKS、AKS、または GCP で実行する場合は、クラウドプロバイダーの例を使用してください。プロバイダーがサポートされていない場合は、手動フォールバックを使用してください。

**クラウドプロバイダーの検出 (EKS の例):**

```yaml
  processors:
    resourcedetection:
      detectors: [k8s_api, eks]
      override: false
      eks:
        resource_attributes:
          k8s.cluster.name:
            enabled: true

  service:
    pipelines:
      logs:
        receivers: [k8sobjects]
        processors: [resourcedetection]
        exporters: [datadog]
```

`eks` は、実際のプロバイダーの検出器 (`aks`、`gcp`) に置き換えてください。プロバイダー固有の設定については、[`resourcedetection` プロセッサーのドキュメント][8] を参照してください。

**手動フォールバック:**

`resourcedetection`プロセッサーがご使用のクラウドプロバイダーをサポートしていない場合は、クラスター名を手動で設定してください。`<YOUR_CLUSTER_NAME>` は、クラスター名に置き換えてください。

```yaml
  processors:
    resourcedetection:
      detectors: [k8s_api]
      override: false
    resource/add-cluster-name:
      attributes:
        - key: k8s.cluster.name
          value: <YOUR_CLUSTER_NAME>
          action: upsert

  service:
    pipelines:
      logs:
        receivers: [k8sobjects]
        processors: [resourcedetection, resource/add-cluster-name]
        exporters: [datadog]
```

#### 3. Helm を使用してデプロイする {#3-deploy-with-helm}

構成ファイルを使用して OpenTelemetry Collector をインストールします。

```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update

helm install deployment-collector open-telemetry/opentelemetry-collector \
  --values ./deployment-collector.yaml
```

#### 4. インストールを確認する {#4-verify-the-installation}

[Kubernetes Explorer][9] を開き、OpenTelemetry クラスター名でフィルタリングします。**[Custom Resources] (カスタムリソース) > [CRD]** セクションとともに、主要な Kubernetes リソースセクションのすべてにデータが取り込まれるはずです。**[Custom Resources] (カスタムリソース) > [Resources] (リソース)** セクションは、このセットアップではサポートされていません。

#### 5. Kubernetes Explorer でログ、メトリクス、トレースを関連付ける (オプション) {#5-correlate-logs-metrics-and-traces-with-kubernetes-explorer-optional}

Kubernetes リソースとそれぞれのリソースに関連するログ、メトリクス、トレースの間を移動するには、既存のコレクターパイプラインに [`k8sattributes`][10] プロセッサーと [`resourcedetection`][8] プロセッサーを追加します。`resourcedetection` の構成については、上記の[プロセッサーとパイプライン](#processors-and-pipeline)を参照してください。

```yaml
processors:
  k8sattributes:
    auth_type: "serviceAccount"
    extract:
      metadata:
        - k8s.pod.name
        - k8s.pod.uid
        - k8s.deployment.name
        - k8s.namespace.name
        - k8s.node.name
        - k8s.replicaset.name
        - k8s.statefulset.name
        - k8s.daemonset.name
        - k8s.cronjob.name
        - k8s.job.name
        - k8s.container.name
    pod_association:
      - sources:
          - from: resource_attribute
            name: k8s.pod.uid
      - sources:
          - from: resource_attribute
            name: k8s.pod.ip
      - sources:
          - from: resource_attribute
            name: k8s.pod.name
          - from: resource_attribute
            name: k8s.namespace.name
      - sources:
          - from: connection

service:
  pipelines:
    logs:
      processors: [k8sattributes, resourcedetection, ...]
    metrics:
      processors: [k8sattributes, resourcedetection, ...]
    traces:
      processors: [k8sattributes, resourcedetection, ...]
```

完全な参考例については、[DaemonSet コレクター構成][11] を参照してください。

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/k8sobjectsreceiver
[2]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.154.0
[4]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/opentelemetry-collector-0.156.2/charts/opentelemetry-collector
[5]: https://kubernetes.io/blog/2025/05/09/kubernetes-v1-33-streaming-list-responses/
[6]: /ja/opentelemetry/integrations/kubernetes_metrics/#setup
[7]: /ja/getting_started/site/
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor
[9]: https://app.datadoghq.com/orchestration/overview
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor
[11]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/daemonset-collector.yaml

{{% /tab %}}
{{% tab "OpenTelemetry Kube Stack" %}}

Datadog Agent の代わりに `opentelemetry-kube-stack` Helm チャートを使用して、Kubernetes Explorer にデータを取り込むことができます。

[`opentelemetry-kube-stack`][1] Helm チャートは、OpenTelemetry Operator をインストールし、コレクターを `OpenTelemetryCollector` カスタムリソース (CR) として管理します。Datadog で管理しているリファレンス [`values.yaml`][2] では、次の 2 つのコレクターを構成しています。

- **`cluster`** (Deployment): kube-state-metrics をスクレイピングするとともに Kubernetes オブジェクトを監視し、`orchestrator_explorer` が Kubernetes Explorer にデータを取り込めるようにします。
- **`daemon`**(DaemonSet): ホストおよび kubelet のメトリクスを収集し、アプリケーションテレメトリーデータ用の OTLP エンドポイントを公開します。

#### 前提条件 {#prerequisites-1}

- OpenTelemetry Kube Stack Helm チャート [0.20.1][3] 以降。
- OpenTelemetry Collector Contrib [v0.154.0][4] 以降 (基準値ファイルによって固定されています)。
- cert-manager (Operator の Admission Webhook に必要です)。

#### 制限事項 {#limitations-1}

オープンソースの `k8sobjects` レシーバーは、クラスターの Kubernetes API サーバーにかなりの負荷をかける可能性があります。

推奨事項:

- [ストリーミングリストの改善][5] によって API サーバーへの影響を軽減している Kubernetes 1.33 以降を使用してください。
- 小規模なクラスターから開始してください。出発点としてリソースタイプごとのオブジェクト数を 5,000 未満に制限し、クラスターの健全性を監視しながら段階的にスケールアップします。

#### クイックスタート (対話型インストーラー) {#quickstart-interactive-installer}

[`opentelemetry-examples`][6] リポジトリには、以下のすべての手順を処理する対話型インストーラーが同梱されています。`guides/kubernetes/configuration/opentelemetry-kube-stack/`から:

```sh
./install
```

インストーラーにより、Datadog API キー、[Datadog サイト][7]、Kubernetes プラットフォーム、およびデプロイメント環境の入力が求められます。EKS、GKE、AKS で、対応するリソース検出プリセットが有効になります。その他のプラットフォームの場合は、クラスター名の入力が求められます。その後、インストーラーが `opentelemetry-operator-system` 名前空間と `datadog-secret` を作成し、必要に応じて cert-manager をインストールするとともに、チャートをインストールまたはアップグレードします。

#### 値ファイルを使用してインストールする {#install-with-values-files}

上記の対話型インストーラーを使用しなかった場合は、以下の手順に従って手動でインストールします。

##### 1. cert-manager をインストールする (まだインストールされていない場合) {#1-install-cert-manager-if-not-already-present}

```sh
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager --create-namespace \
  --set crds.enabled=true
```

##### 2. Datadog シークレットを作成する {#2-create-the-datadog-secret}

`DD_SITE` を [Datadog サイト][7] に設定します (デフォルトでは `datadoghq.com` に設定されます)。

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
export DD_SITE="datadoghq.com"  # for example us3.datadoghq.com, datadoghq.eu

kubectl create namespace opentelemetry-operator-system \
  --dry-run=client -o yaml | kubectl apply -f -

kubectl create secret generic datadog-secret \
  --namespace opentelemetry-operator-system \
  --from-literal="api-key=$DD_API_KEY" \
  --from-literal="dd-site=$DD_SITE" \
  --dry-run=client -o yaml | kubectl apply -f -
```

##### 3. Deployment オーバーレイを作成する {#3-create-a-deployment-overlay}

リファレンス `values.yaml` がベースであり、Deployment 固有の設定 (クラスタープラットフォーム、環境、クラスター名) についてはオーバーレイファイルに記述します。`guides/kubernetes/configuration/opentelemetry-kube-stack/` から、プラットフォームに対応する例をコピーします。

```sh
mkdir -p deployment

# EKS, GKE, or AKS (resource detector auto-populates k8s.cluster.name):
cp examples/eks-deployment/values.yaml deployment/values.yaml
cp examples/gcp-deployment/values.yaml deployment/values.yaml
cp examples/aks-deployment/values.yaml deployment/values.yaml

# Other platforms (set the cluster name manually):
cp examples/manually-set-k8s-cluster-name/values.yaml deployment/values.yaml
```

EKS/GKE/AKS 以外のプラットフォームの場合は、`deployment/values.yaml` を編集し、`my_k8s_cluster` と `production` を実際のクラスター名とデプロイメント環境に置き換えます。

##### 4. リファレンスコレクターをデプロイする {#4-deploy-the-reference-collectors}

ベースの `values.yaml` とオーバーレイの両方を使用して、チャートをインストールまたはアップグレードします。

```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update

helm upgrade --install opentelemetry-kube-stack \
  open-telemetry/opentelemetry-kube-stack \
  --namespace opentelemetry-operator-system \
  --values ./values.yaml \
  --values ./deployment/values.yaml
```

コレクターは両方とも、デフォルトで `500m` の CPU 制限と `1Gi` のメモリ制限、および `200m` の CPU リクエストと `500Mi` のメモリリクエストに設定されます。大規模なクラスターの場合はスケールアップしてください。

#### インストールを確認する {#verify-the-installation}

[Kubernetes Explorer][8] を開き、クラスター名でフィルタリングします。**[Custom Resources] (カスタムリソース) > [CRD]** セクションとともに、主要な Kubernetes リソースセクションのすべてにデータが取り込まれるはずです。**[Custom Resources] (カスタムリソース) > [Resources] (リソース)** セクションは、このセットアップではサポートされていません。

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-kube-stack
[2]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/opentelemetry-kube-stack/values.yaml
[3]: https://github.com/open-telemetry/opentelemetry-helm-charts/releases/tag/opentelemetry-kube-stack-0.20.1
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.154.0
[5]: https://kubernetes.io/blog/2025/05/09/kubernetes-v1-33-streaming-list-responses/
[6]: https://github.com/DataDog/opentelemetry-examples/tree/main/guides/kubernetes/configuration/opentelemetry-kube-stack
[7]: /ja/getting_started/site/
[8]: https://app.datadoghq.com/orchestration/overview

{{% /tab %}}
{{< /tabs >}}

### リソースにカスタムタグを追加する {#add-custom-tags-to-resources}

フィルタリングを容易にするために、`DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 環境変数を使用して Kubernetes リソースにカスタムタグを追加できます。**これらのタグは、Kubernetes Explorer にのみ表示されます。**

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` 内で `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 環境変数を **2 回** 設定します。
- `agents.containers.processAgent.env` 内
- `clusterAgent.env`  内

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
  features:
    liveContainerCollection:
      enabled: true
    orchestratorExplorer:
      enabled: true
  override:
    agents:
      containers:
        processAgent:
          env:
            - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
              value: "tag1:value1 tag2:value2"
    clusterAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
```

その上で、新しい構成を適用します。

```bash
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-agent.yaml` 内で `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 環境変数を **2 回** 設定します。
- `processAgent.env` 内
- `clusterAgent.env`  内

```yaml
agents:
  containers:
    processAgent:
      env:
        - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
          value: "tag1:value1 tag2:value2"
clusterAgent:
  env:
    - name: "DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS"
      value: "tag1:value1 tag2:value2"
```

その上で、Helm チャートをアップグレードします。

{{% /tab %}}
{{% tab "DaemonSet" %}}

Process Agent コンテナと Cluster Agent コンテナの両方に環境変数を設定します。

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

## 使用方法 {#usage}

### ビュー {#views}

ページ左上隅の {{< ui >}}Select Resources{{< /ui >}} ドロップダウンメニューで、{{< ui >}}Pods{{< /ui >}}、{{< ui >}}Clusters{{< /ui >}}、{{< ui >}}Namespaces{{< /ui >}}、およびその他の Kubernetes リソースを切り替えます。

これらのビューのそれぞれに、ステータス、名前、Kubernetes ラベルなどのフィールドごとにデータを整理しやすくするためのデータテーブルと、Pod および Kubernetes クラスターの全体像を把握するための詳細なクラスター マップが含まれています。

**これらのビューのフィルタリング方法の詳細については、[クエリフィルターの詳細](#query-filter-details)を参照してください。**

{{< img src="infrastructure/livecontainers/orch_ex_replicasets.png" alt="サマリーモードの [Workloads] (ワークロード) > [Replica Sets] (レプリカセット) が表示されている、展開された状態の Orchestrator Explorer。" style="width:80%;">}}

#### 機能とファセットを基準にグループ化する {#group-by-functionality-and-facets}

タグ、Kubernetes ラベル、または Kubernetes アノテーションを基準に Pod をグループ化すると、ビューが集約された情報をより迅速に見つけられるようになります。ページ右上の [Group by] (グループ化の基準) バーを使用するか、特定のタグやラベルをクリックしてコンテキストメニューからグループ化機能を見つけることで、次のようにグループ化できます。

{{< img src="infrastructure/livecontainers/orch_ex_groupby.png" alt="チームに基づくグループ化の例" style="width:80%;">}}

また、ページ左側のファセットを使用してリソースをグループ化したり、最も注意すべきリソース (ステータスが CrashLoopBackOff の Pod など) をフィルタリングしたりすることもできます。

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="ステータスが CrashLoopBackOff の Pod をグループ化する例" video=true style="width:80%;">}}

### クラスターマップ {#cluster-map}

クラスターマップでは、Pod と Kubernetes クラスターの全体像を把握できます。グループとフィルターをカスタマイズして、すべてのリソースを 1 つの画面でまとめて表示できます。また、ノードの色付けに使用するメトリクスを選択することもできます。

クラスターマップ上の円やグループをクリックして詳細パネルを表示することで、リソースを調査できます。

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="カスタマイズしたグループとフィルターが適用されたクラスターマップ" video=true style="width:80%;">}}

### 情報パネル {#information-panel}

テーブルの行またはクラスターマップのオブジェクトをクリックすると、サイドパネルで特定のリソースに関する情報を表示できます。

{{< img src="infrastructure/livecontainers/orch_ex_panel.png" alt="サイドパネル内でプロセスが展開された状態のリソースビュー。" style="width:80%;">}}

サイドパネルの {{< ui >}}YAML{{< /ui >}} タブには、リソースの完全な定義が表示されます。**Agent バージョン 7.44.0** 以降では、過去 7 日間の定義の履歴も表示されます。時間の経過に伴う変更や、異なるバージョン間での変更を比較できます。表示されている時刻は、リソースに変更が適用されたおおよその時間です。

関連性のない多数の変更が表示されるのを防ぐため、次のフィールドのみに影響する更新は無視されます。

* metadata.resourceVersion
* metadata.managedFields
* metadata.generation
* metadata.annotations["kubernetes.io/config.seen"]
* status

{{< img src="infrastructure/livecontainers/orch_ex_manifest_history.png" alt="yaml 履歴機能を示す、サイドパネルのリソースビュー" style="width:80%;">}}

その他のタブには、選択したリソースのトラブルシューティングに役立つ詳細情報が表示されます。

* [**ログ**][2]: コンテナまたはリソースのログを確認できます。ログをクリックすると、ログエクスプローラーで関連するログが表示されます。
* [**APM**][3]: 日付、サービス、期間、メソッド、ステータスコードなどの情報を含め、コンテナまたはリソースのトレースを確認できます。
* [**メトリクス**][4]: コンテナまたはリソースのライブメトリクスを確認できます。このタブでは、グラフの全画面表示、スナップショットの共有、エクスポートを行うことができます。
* {{< ui >}}Processes{{< /ui >}}: このリソースのコンテナで実行されているすべてのプロセスを確認できます。
* {{< ui >}}Network{{< /ui >}}: 送信元、宛先、送受信ボリューム、スループットフィールドなどの情報を含め、コンテナまたはリソースのネットワークパフォーマンスを確認できます。{{< ui >}}Destination{{< /ui >}} フィールドを使用して `DNS` や `ip_type` のようなタグで検索するか、このビューの {{< ui >}}Group by{{< /ui >}} フィルターを使用して、`pod_name` や `service` のようなタグを基準にネットワークデータをグループ化します。
* [**イベント**][5]: リソースのすべての Kubernetes イベントを確認できます。
* {{< ui >}}Monitors{{< /ui >}}: このリソースに対してタグ付け/スコープ設定/グループ化されたモニターを確認できます。

リソースの詳細なダッシュボードを表示するには、このパネルの右上隅にある [View Dashboard] (ダッシュボードの表示) をクリックします。

{{< img src="infrastructure/livecontainers/view-pod-dashboard.png" alt="Live Containers 概要から Pod ダッシュボードへのリンク" style="width:80%;">}}

### リソース使用状況{#resource-utilization}

_[Resource Utilization][6]_ ページについては、こちらをご覧ください。

Kubernetes Explorer タブ内で、リソース使用状況に関するメトリクスの選択肢を確認できます。

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization.png" alt="コンテナリソース使用状況" style="width:80%;">}}

これらの列はすべて並べ替えに対応しており、リソース使用状況に基づいて個々のワークロードを特定するのに役立ちます。

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization_sorted_column.png" alt="コンテナリソース使用状況で並べ替えられた列" style="width:50%;">}}

## クエリフィルターの詳細{#query-filter-details}

ページ左上の [Group by] (グループ化の基準) 検索バーにクエリを入力することで、表示されるリソースを絞り込むことができます。

### 構文 {#syntax}

クエリフィルターは、用語と演算子からなります。例:

{{< img src="infrastructure/livecontainers/orch_syntax.png" alt="Orchestrator Explorer クエリフィルターの構文。" style="width:80%;">}}

#### 用語 {#terms}

利用可能な用語には複数の種類があります。

| 種類 | 例 |
|---|---|
| **タグ**: [タグを収集するエージェント][7] によってリソースに付加されます。Datadog が Kubernetes リソース用に生成する追加のタグもあります。| `datacenter:staging`、`tag#datacenter:staging`<br>_ (`tag#` はオプション)_ |
| **ラベル**: [リソースのメタデータ][8] から抽出されます。これらは通常、クラスターを整理する目的、およびセレクターを使用して特定のリソースをターゲットにする目的で使用されます。| `label#chart_version:2.1.0` |
| **アノテーション**: [リソースのメタデータ][9] から抽出されます。これらは通常、クラスター管理を支援するツールをサポートする目的で使用されます。| `annotation#checksum/configmap:a1bc23d4` |
| **メトリクス**: ワークロードリソース (Pod、Deployments など) に追加されます。使用状況に基づいてリソースを見つけることができます。サポートされているメトリクスを確認するには、[リソース使用状況フィルター](#resource-utilization-filters)を参照してください。| `metric#cpu_usage_pct_limits_avg15:>80%` |
| **文字列一致**: 一部の特定のリソース属性でサポートされています。以下を参照してください。<br>_注: 文字列一致ではキーと値の形式を使用しないため、一致させる属性を指定することはできません。_ | `"10.132.6.23"`(IP)、<br>`"9cb4b43f-8dc1-4a0e"` (UID)、<br>`web-api-3` (名前) |
| **フィールド**: [リソースのメタデータ][10] またはカスタムリソースのインデックス付きフィールドから抽出されます。| `field#metadata.creationTimestamp:>=4wk`、`field#metadata.deletionTimestamp:<=1hr`、`field#status.currentReplicas:3`、`field#status.conditions.Active.status:True` |

>  ***注**: 同じキーと値のペアがタグおよびラベル (またはアノテーション) の両方として見つかる場合があります。これはクラスターの構成方法に依存します。*

次のリソース属性は、任意の**文字列一致**でサポートされています。
- `metadata.name`
- `metadata.uid`
- IP アドレスの検索対象:
  - Pod
  - ノード (内部および外部)
  - Service (クラスター、外部、およびロードバランサー IP)

名前または IP でリソースを検索する場合、キーを指定する必要はありません。文字列検索に特定の特殊文字が含まれていない限り、引用符は不要です。

#### 比較演算子 {#comparators}

すべての用語で `:` 等価演算子を使用できます。[メトリクス値](#resource-utilization-filters)の用語では、数値を比較することもできます。

- `:>` (より大きい。例: `metric#cpu_usage_avg15:>0.9`)
- `:>=` (以上)
- `:<` (より小さい)
- `:<=` (以下)

#### 演算子 {#operators}

複数の用語を複雑なクエリに組み合わせるには、次の大文字と小文字を区別するブール演算子のいずれかを使用できます。

| 演算子 | 説明 | 例 |
|---|---|---|
| `AND` | **共通集合**: 両方の用語が選択されたイベントに含まれます (何も追加されない場合、デフォルトで AND が使用されます)| `a AND b`   |
| `OR` | **和集合**: いずれかの用語が選択されたイベントに含まれます                                             | `a OR b`   |
| `NOT` / `-` | **除外**: 次の用語がイベントに含まれません (個々の未加工テキスト検索に適用されます) | `a AND NOT b` または<br>`a AND -b` |
|  `( )` | **グループ化:** 用語を論理的にグループ化する方法を指定します。| `a AND (b OR c)` または<br>`(a AND b) or c` |

##### `OR` 値の省略形 {#or-value-shorthand}

同じキーを共有する複数の用語は、すべてが `OR` 演算子を使用している場合、1 つの用語にまとめることができます。たとえば、次のクエリがあるとします。

```
app_name:web-server OR app_name:database OR app_name:event-consumer
```

次のように短縮できます。

```
app_name:(web-server OR database OR event-consumer)
```

### ワイルドカード {#wildcards}

`*`ワイルドカードを用語の一部として使用し、値とキーの両方で部分一致によるフィルタリングを行うことができます。いくつかの例を挙げます。

- `kube_job:stats-*`: `stats-` で始まる `kube_deployment` タグ値を持つすべてのリソースを検索します。
- `pod_name:*canary`: `canary` で終わる `pod_name` 値を持つすべてのリソースを検索します。
- `label#release:*`: ラベルの値に関係なく、`release` ラベルを持つすべてのリソースを検索します。
- `-label#*.datadoghq.com/*`: Datadog にスコープが設定されたラベルを持たないリソースを検索します。
- `kube_*:*stats*canary`: 関連するリソースタグ (`kube_*`) を持ち、タグ値の途中に `stats` が含まれ、さらにタグ値が `canary` で終わるリソースを検索します。

### 抽出されたタグ {#extracted-tags}

ユーザーが Datadog エージェント内で [構成][7] したタグに加え、Datadog は検索やグループ化のニーズに役立つように、リソース属性に基づいて生成されたタグを挿入します。これらのタグは、関連がある場合に条件付きでリソースに追加されます。

#### すべてのリソース {#all-resources}

すべてのリソースには `kube_cluster_name` タグが付加され、名前空間が設定されたすべてのリソースには `kube_namespace` タグが付加されます。

さらに、リソースには `kube_<api_kind>:<metadata.name>` タグが含まれます。たとえば、`web-server-2` という名前の Deployment には `kube_deployment:web-server-2` タグが自動的に追加されます。

> **注**: このパターンにはいくつかの例外があります。
>
> - Pod は代わりに `pod_name` を使用します。
> - *VPA: `verticalpodautoscaler`*。
> - *HPA: `horizontalpodautoscaler`*。
> - *Persistent Volume Claim: `persistentvolumeclaim`*。

リソースに付加されているラベルに基づいて、次のタグも抽出されます。

| タグ | ソースラベル |
|---|---|
| `kube_app_name` | `app.kubernetes.io/name` |
| `kube_app_instance` | `app.kubernetes.io/instance` |
| `kube_app_version` | `app.kubernetes.io/version` |
| `kube_app_component` | `app.kubernetes.io/component` |
| `kube_app_part_of` | `app.kubernetes.io/part-of` |
| `kube_app_managed_by` | `app.kubernetes.io/managed-by` |
| `env` | `tags.datadoghq.com/env` |
| `version` | `tags.datadoghq.com/version` |
| `service` | `tags.datadoghq.com/service` |

#### リレーションシップ {#relationships}

関連するリソースには、互いにタグが付けられます。いくつかの例を挙げます。

- 「XYZ」Deployment に含まれる Pod には、`kube_deployment:xyz` タグが付加されます。
- Service「A」を指す Ingress には、`kube_service:a` タグが付加されます。

「親」リソースから生成されたリソース (Pod、Job など) には、`kube_ownerref_kind` タグと `kube_ownerref_name` タグが付加されます。

> **ヒント:** フィルタークエリのオートコンプリート機能を利用すると、利用可能な関連リソースタグを確認できます。`kube_` と入力して、どのような結果が提案されるかを確認してください。

#### Pod {#pods}

Pod には以下のタグが付加されます。

- `pod_name`
- `pod_phase` (マニフェストから抽出されます)
- `pod_status` (`kubectl`と同様に計算されます)

#### ワークロード {#workloads}

ワークロードリソース (Pod、Deployment、StatefulSet など) には、[Resources Utilization] ページでの対応状況を示す以下のタグが付加されます。

- `resource_utilization` (`supported` または`unsupported`)
- `missing_cpu_requests`
- `missing_cpu_limits`
- `missing_memory_requests`
- `missing_memory_limits`

#### 条件 {#conditions}

一部のリソースについては、特定の条件がタグとして抽出されます。たとえば、Deployment には `kube_condition_available` タグがあります。タグの形式は常に `kube_condition_<name>` であり、その値は `true` または `false` になります。

> **ヒント**: オートコンプリート機能を使用して特定のリソースタイプで利用可能な条件を見つけるには、`kube_condition` と入力し、結果を確認します。

#### リソース固有のタグ {#resource-specific-tags}

一部のリソースには、クラスターの環境に基づいて抽出される固有のタグがあります。上記の共有タグに加えて、以下のタグを利用できます。

| リソース | 抽出されるタグ |
|---|---|
| **クラスター** | `api_server_version`<br>`kubelet_version` |
| **カスタムリソース定義** & <br>**カスタムリソース** | `kube_crd_kind`<br>`kube_crd_group`<br>`kube_crd_version`<br>`kube_crd_scope`<br>`kube_crd_resource` |
| **名前空間** | `phase` |
| **ノード** | `kube_node_unschedulable`<br>`kube_node_kubelet_version`<br>`kube_node_kernel_version`<br>`kube_node_runtime_version`<br>`eks_fargate_node`<br>`node_schedulable`<br>`node_status` |
| **Persistent Volume** | `kube_reclaim_policy`<br>`kube_storage_class_name`<br>`pv_type`<br>`pv_phase` |
| **Persistent Volume Claim** | `pvc_phase`<br>`kube_storage_class_name` |
| **Pod** | `pod_name` (`kube_pod`の代わり)<br>`pod_phase` (マニフェストから抽出)<br>`pod_status` (`kubectl`と同様に計算) |
| **Service** | `kube_service_type`<br>`kube_service_port` |

### リソース使用状況フィルター {#resource-utilization-filters}

次のワークロードリソースは、リソース使用状況に関するメトリクスで拡充されます。

- クラスター
- ノード
- Pod

これらのメトリクスは、収集時に過去 15 分間の平均値に基づいて計算されます。メトリクス値でフィルタリングするには次のようにします。`metric#<metric_name><comparator><numeric_value>`。

- `metric_name`は利用可能なメトリクスです (下記を参照)
- `comparator` はサポートされている[比較演算子](#comparator)です。
- および`numeric_value`は浮動小数点値です。

Pod については、次のメトリクスが利用可能です。

| CPU | メモリ |
|---|---|
| `cpu_limits_avg15` | `mem_limits_avg15` |
| `cpu_requests_avg15` | `mem_requests_avg15` |
| `cpu_usage_avg15` | `mem_usage_avg15` |
| `cpu_usage_pct_limits_avg15` | `mem_usage_pct_limits_avg15` |
| `cpu_usage_pct_requests_avg15` | `mem_usage_pct_requests_avg15` |
| `cpu_waste_avg15` | `mem_waste_avg15` |

さらに、クラスターおよびノードでは、次のメトリクスが利用可能です。

- `cpu_usage_pct_alloc_avg15`
- `cpu_requests_pct_alloc_avg15`
- `mem_usage_pct_alloc_avg15`
- `mem_requests_pct_alloc_avg15`

#### メトリクスの単位{#metric-units}

CPU に関するメトリクスはコア数として保存されます。

メモリに関するメトリクスはバイト数として保存されます。

パーセント (`*_pct_*`) は浮動小数点数として保存されます。つまり、`0.0` は 0%、`1.0` は 100% です。値は、示された 2 つのメトリクスの比率を表します。たとえば、`cpu_usage_pct_limits_avg15` は `usage / limits` の値です。メトリクスの値は、リクエストの CPU 使用率 (パーセント) のように、100% を超える場合があります。

## 注意点と既知の問題 {#notes-and-known-issues}

* データは一定の間隔で自動的に更新されます。
* 1,000 個以上の Deployment または ReplicaSet があるクラスターでは、Cluster Agent によって CPU 使用率が上昇する場合があります。Helm チャートには、コンテナのスクラビングを無効にするオプションがあります。詳細については、[Helm チャートリポジトリ][11] を参照してください。

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/overview
[2]: /ja/logs
[3]: /ja/tracing
[4]: /ja/metrics
[5]: /ja/events
[6]: /ja/infrastructure/containers/kubernetes_resource_utilization
[7]: /ja/getting_started/tagging/assigning_tags/?tab=containerizedenvironments
[8]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
[9]: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/field-selectors/
[11]: https://github.com/DataDog/helm-charts/tree/master/charts/datadog