---
aliases:
- /ja/infrastructure/containers/orchestrator_explorer
description: Datadog の Kubernetes Explorer ページを使用して Pod や Deployment などの Kubernetes
  リソースを監視します。
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: ブログ
  text: Kubernetes オペレーターをモニターしてアプリケーションがスムーズに動作するようにする
- link: https://learn.datadoghq.com/courses/getting-started-k8s
  tag: ラーニングセンター
  text: Kubernetes Observability の開始
title: Kubernetes Explorer
---
{{< img src="infrastructure/livecontainers/orch_ex.png" alt="Kubernetes Pod が表示された Kubernetes Explorer。" style="width:80%;">}}

Datadog の [Kubernetes Explorer][1] を使用すると、Pod、Deployment、その他の Kubernetes リソースの状態を監視できます。Deployment 内の失敗した Pod のリソース仕様を表示したり、ノードのアクティビティを関連するログと関連付けたり、リソース使用状況を追跡したり、ワークロードを自動的にスケーリングしたり、エラーを修正したりすることもできます。

<div class="alert alert-info">Datadog Agent を使用する場合、Kubernetes Explorer には Agent 7.27.0 以降および Cluster Agent 1.11.0 以降が必要です。Kubernetes 1.25 以降を使用している場合は、Cluster Agent 7.40.0 以降が必要です。</div>


## 構成 {#configuration}

### Kubernetes Explorer を有効にする {#enable-kubernetes-explorer}

Kubernetes Explorer は、ほとんどの Datadog Agent インストールで**デフォルトで有効**になっています。

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

[公式の Helm チャート][1]を使用して Datadog Agent をインストールすると、Kubernetes Explorer がデフォルトで有効になります。

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
手動セットアップについては、[DaemonSet を使用した Kubernetes Explorer のセットアップ][1]を参照してください。

[1]: /ja/infrastructure/faq/set-up-orchestrator-explorer-daemonset

{{% /tab %}}
{{% tab "OpenTelemetry Collector" %}}

Datadog Agent の代わりに、ネイティブの OpenTelemetry パイプラインを使用して Kubernetes Explorer にデータを取り込むことができます。このセットアップでは、[`k8sobjects`][1] レシーバーを使用して Kubernetes リソースデータを収集し、[Datadog Exporter][2] の Orchestrator Explorer 機能を通じて転送します。

{{< site-region region="gov,gov2" >}}<div class="alert alert-warning">この機能は {{< region-param key="dd_site_name" >}}では利用できません。</div>{{< /site-region >}}

#### 前提条件 {#prerequisites}

- OpenTelemetry Collector Contrib [v0.154.0][3] 以降。
- OpenTelemetry Collector [Helm チャート][4] v0.156.2 以降。

#### 制限事項 {#limitations}

オープンソースの `k8sobjects` レシーバーは、クラスターの Kubernetes API サーバーに大きな負荷をかける可能性があります。

推奨事項:

- Kubernetes 1.33 以降を使用してください。これには、API サーバーへの影響を軽減する[ストリーミングリストの改善][5]が含まれています。
- 小規模なクラスターから開始してください。開始点として、リソースタイプごとのオブジェクト数を 5,000 未満に制限し、クラスターの健全性を監視しながら段階的にスケールアップします。

下記の手順では、Kubernetes Explorer の必須のコンポーネントについて説明します。Kubernetes インフラストラクチャーメトリクスも収集する完全なリファレンス例については、[Kubernetes メトリクス][6]を参照してください。

#### 1. Datadog API キーのシークレットを作成する {#1-create-a-datadog-api-key-secret}

Datadog API キーを保存するための Kubernetes シークレットを作成します。

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY
```

#### 2. クラスターコレクターを構成する {#2-configure-the-cluster-collector}

このセットアップでは、OTel Collector を Kubernetes Deployment としてデプロイします。次の構成ブロックを含む `deployment-collector.yaml` ファイルを作成するか、これらの構成ブロックを OpenTelemetry Collector の既存の値ファイルにマージします。

##### Collector のイメージとモード {#collector-image-and-mode}

Contrib ディストリビューションを使用して、Collector が単一レプリカの Deployment として実行されるように設定します。

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

`kubernetesObjects` [プリセット][4]は、Kubernetes エクスポーターにデータを取り込むために必要なサービスアカウント、RBAC 権限、および `k8sobjects` レシーバーのデフォルトを自動的にプロビジョニングします。レシーバーの `interval` を、Kubernetes Explorer に必要な `3m` にオーバーライドします。

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

##### Datadog エクスポーター {#datadog-exporter}

Datadog エクスポーターで `orchestrator_explorer` オプションを有効にします。この設定により、Kubernetes オブジェクトデータが Kubernetes Explorer に送信されます。`<YOUR_DATADOG_SITE>` は、実際の [Datadog サイト][7]に置き換えてください。

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

- クラスターの UID (`k8s.cluster.uid`) を検出するには `k8s_api` 検出器が必要です。
- クラスター名の検出は、クラウドプロバイダーによって異なります。サポートされているプロバイダー (EKS、AKS、GCP) と必要な権限については、[`resourcedetection` プロセッサーのドキュメント][8]を確認してください。
- サポートされていないプロバイダーの場合は、`resource/add-cluster-name` プロセッサーを使用して手動でクラスター名を設定します。`<YOUR_CLUSTER_NAME>` は、実際のクラスター名に置き換えてください。

次に、`logs` パイプラインでコンポーネントを接続します。

2 つのアプローチの例を次に示します。EKS、AKS、または GCP で実行している場合は、クラウドプロバイダーの例を使用してください。サポートされていないプロバイダーの場合は、手動フォールバックを使用してください。

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

`eks` は、実際のプロバイダーの検出器 (`aks`、`gcp`) に置き換えてください。プロバイダー固有の設定については、[`resourcedetection` プロセッサーのドキュメント][8]を参照してください。

**手動フォールバック:**

`resourcedetection` プロセッサーでサポートされていないクラウドプロバイダーの場合は、クラスター名を手動で設定します。`<YOUR_CLUSTER_NAME>` は、実際のクラスター名に置き換えてください。

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

#### 3. Helm でデプロイする {#3-deploy-with-helm}

構成ファイルを使用して OpenTelemetry Collector をインストールします。

```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update

helm install deployment-collector open-telemetry/opentelemetry-collector \
  --values ./deployment-collector.yaml
```

#### 4. インストールを確認する {#4-verify-the-installation}

[Kubernetes Explorer][9] を開き、OpenTelemetry クラスター名でフィルタリングします。主要なすべての Kubernetes リソースセクションと **[Custom Resources] (カスタムリソース) > [CRD]** にデータが取り込まれるはずです。**[Custom Resources] > [Resources] (リソース)** セクションは、このセットアップではサポートされていません。

#### 5. Kubernetes Explorer でログ、メトリクス、トレースを関連付ける (オプション) {#5-correlate-logs-metrics-and-traces-with-kubernetes-explorer-optional}

Kubernetes リソースとそれに関連するログ、メトリクス、トレースの間を移動するには、既存のコレクターパイプラインに [`k8sattributes`][10] プロセッサーと [`resourcedetection`][8] プロセッサーを追加します。`resourcedetection` の構成については、上記の[プロセッサーとパイプライン](#processors-and-pipeline)を参照してください。

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

完全なリファレンス例については、[DaemonSet コレクター構成][11]を参照してください。

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

Datadog Agent の代わりに、`opentelemetry-kube-stack` Helmチャートを使用して Kubernetes Explorer にデータを取り込むことができます。

[`opentelemetry-kube-stack`][1] Helm チャートは、OpenTelemetry Operator をインストールし、コレクターを `OpenTelemetryCollector` カスタムリソース (CR) として管理します。Datadog で管理しているリファレンス [`values.yaml`][2] では 2 つのコレクターを構成しています。

- **`cluster`** (Deployment): kube-state-metricsをスクレイピングし、Kubernetes オブジェクトを監視し、`orchestrator_explorer` が Kubernetes Explorer にデータを取り込めるようにします。
- **`daemon`**(DaemonSet): ホストおよび kubelet のメトリクスを収集し、アプリケーションテレメトリデータ用の OTLP エンドポイントを公開します。

{{< site-region region="gov,gov2" >}}<div class="alert alert-warning">この機能は {{< region-param key="dd_site_name" >}}では利用できません。</div>{{< /site-region >}}

#### 前提条件 {#prerequisites-1}

- OpenTelemetry Kube Stack Helm チャート [0.20.1][3] 以降。
- OpenTelemetry Collector Contrib [v0.154.0][4] 以降 (リファレンスの値ファイルで固定)。
- cert-manager (Operator の Admission Webhook に必要)。

#### 制限事項 {#limitations-1}

オープンソースの `k8sobjects` レシーバーは、クラスターの Kubernetes API サーバーに大きな負荷をかける可能性があります。

推奨事項:

- Kubernetes 1.33 以降を使用してください。これには、API サーバーへの影響を軽減する[ストリーミングリストの改善][5]が含まれています。
- 小規模なクラスターから開始してください。開始点として、リソースタイプごとのオブジェクト数を 5,000 未満に制限し、クラスターの健全性を監視しながら段階的にスケールアップします。

#### クイックスタート (対話型インストーラー) {#quickstart-interactive-installer}

[`opentelemetry-examples`][6] リポジトリには、下記のすべての手順を実行する対話型インストーラーが同梱されています。`guides/kubernetes/configuration/opentelemetry-kube-stack/` にあります。

```sh
./install
```

インストーラーにより、Datadog API キー、[Datadog サイト][7]、Kubernetes プラットフォーム、およびデプロイメント環境の入力が求めます。EKS、GKE、AKS の場合は、対応するリソース検出プリセットが有効になります。その他のプラットフォームの場合は、クラスター名の入力が求められます。その後、`opentelemetry-operator-system` 名前空間と `datadog-secret` が作成され、必要に応じて cert-manager がインストールされ、チャートがインストールまたはアップグレードされます。

#### 値ファイルを使用してインストールする {#install-with-values-files}

上記の対話型インストーラーを使用しなかった場合は、次の手順に従って手動でインストールしてください。

##### 1. cert-manager をインストールする (まだインストールされていない場合) {#1-install-cert-manager-if-not-already-present}

```sh
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager --create-namespace \
  --set crds.enabled=true
```

##### 2. Datadog シークレットを作成する {#2-create-the-datadog-secret}

`DD_SITE` を [Datadog サイト][7]に設定します (デフォルトは `datadoghq.com` です)。

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

##### 3. デプロイメントオーバーレイを作成する {#3-create-a-deployment-overlay}

リファレンス `values.yaml` をベースとして、デプロイメント固有の設定 (クラスタープラットフォーム、環境、クラスター名) をオーバーレイファイルに記述します。`guides/kubernetes/configuration/opentelemetry-kube-stack/` から、プラットフォームに対応する例をコピーします。

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

どちらのコレクターも、デフォルトでは `500m` の CPU と `1Gi` のメモリの制限、および `200m` の CPU と `500Mi` のメモリのリクエストに設定されています。大規模なクラスターの場合はスケールアップしてください。

#### インストールを確認する {#verify-the-installation}

[Kubernetes Explorer][8] を開き、クラスター名でフィルタリングします。主要なすべての Kubernetes リソースセクションと **[Custom Resources] (カスタムリソース) > [CRD]** にデータが取り込まれるはずです。**[Custom Resources] > [Resources] (リソース)** セクションは、このセットアップではサポートされていません。

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

### リソースにカスタムタグを追加する{#add-custom-tags-to-resources}

フィルタリングを容易にするために、`DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 環境変数を使用して Kubernetes リソースにカスタムタグを追加できます。**これらのタグは、Kubernetes Explorer にのみ表示されます。**

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` で `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 環境変数を **2 回**設定します。
- `agents.containers.processAgent.env`
- `clusterAgent.env` 

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

次に、新しい構成を適用します。

```bash
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

`datadog-agent.yaml` で `DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 環境変数を **2 回**設定します。
- `processAgent.env`
- `clusterAgent.env` 

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

次に、Helm チャートをアップグレードします。

{{% /tab %}}
{{% tab "DaemonSet" %}}

Process Agent コンテナと Cluster Agent コンテナの両方に環境変数を設定します。

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

## 使用方法{#usage}

### ビュー {#views}

ページ左上隅の {{< ui >}}Select Resources{{< /ui >}} ドロップダウンメニューで、{{< ui >}}Pods{{< /ui >}}、{{< ui >}}Clusters{{< /ui >}}、{{< ui >}}Namespaces{{< /ui >}}、およびその他の Kubernetes リソースを切り替えます。

これらの各ビューには、ステータス、名前、Kubernetes ラベルなどのフィールドごとにデータを整理しやすくするためのデータテーブルと、Pod および Kubernetes クラスターの全体像を把握するための詳細なクラスターマップが含まれています。

**これらのビューのフィルタリング方法の詳細については、[クエリフィルターの詳細](#query-filter-details)を参照してください。**

{{< img src="infrastructure/livecontainers/orch_ex_replicasets.png" alt="Orchestrator Explorer を開いて [Workloads] > [Replica Sets] をサマリーモードで表示" style="width:80%;">}}

#### 機能やファセットでグループ化する{#group-by-functionality-and-facets}

タグ、Kubernetes ラベル、または Kubernetes アノテーションで Pod をグループ化すると、集約されたビューで情報をより迅速に見つけられるようになります。ページ右上の [Group by] (グループ化の基準) バーを使用するか、特定のタグやラベルをクリックしてコンテキストメニューからグループ化機能を見つけ、次のようにグループ化できます。

{{< img src="infrastructure/livecontainers/orch_ex_groupby.png" alt="チームによるグループ化の例" style="width:80%;">}}

また、ページ左側のファセットを使用してリソースをグループ化したり、最も注意すべきリソース (ステータスが CrashLoopBackOff の Pod など) をフィルタリングしたりすることもできます。

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="CrashLoopBackOff Pod ステータスのグループ化の例" video=true style="width:80%;">}}

### クラスターマップ{#cluster-map}

クラスターマップを使用すると、Pod と Kubernetes クラスターの全体像を把握できます。カスタマイズされたグループとフィルターを使用してすべてのリソースを 1 つの画面でまとめて表示し、ノードの色付けに使用するメトリクスを選択できます。

クラスターマップ上の円やグループをクリックして詳細パネルを表示し、リソースを調査します。

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="カスタマイズされたグループとフィルターを備えたクラスターマップ" video=true style="width:80%;">}}

### 情報パネル{#information-panel}

テーブルの行またはクラスターマップのオブジェクトをクリックすると、サイドパネルで特定のリソースに関する情報を表示できます。

{{< img src="infrastructure/livecontainers/orch_ex_panel.png" alt="プロセスを開いた状態のサイドパネルでのリソース表示。" style="width:80%;">}}

サイドパネルの {{< ui >}}YAML{{< /ui >}} タブには、リソースの完全な定義が表示されます。**Agent バージョン 7.44.0** 以降では、7 日間の定義の履歴も含まれます。時間の経過に伴う変更や、異なるバージョン間での変更を比較できます。表示される時刻は、リソースに変更が適用されたおおよその時刻です。

関連性のない変更が大量に表示されるのを防ぐため、次のフィールドのみに影響する更新は無視されます。

* metadata.resourceVersion
* metadata.managedFields
* metadata.generation
* metadata.annotations["kubernetes.io/config.seen"]
* status

{{< img src="infrastructure/livecontainers/orch_ex_manifest_history.png" alt="yaml の履歴機能を示したサイドパネルでのリソース表示" style="width:80%;">}}

その他のタブには、選択したリソースのトラブルシューティングに役立つ詳細情報が表示されます。

* [**Logs** (ログ)][2]: コンテナまたはリソースのログが表示されます。ログをクリックすると、関連するログが Log Explorer で表示されます。
* [**APM**][3]: 日付、サービス、期間、メソッド、ステータスコードなど、コンテナまたはリソースのトレースが表示されます。
* [**Metrics** (メトリクス)][4]: コンテナまたはリソースのライブメトリクスが表示されます。このタブでは、グラフを全画面表示し、そのスナップショットを共有したりエクスポートしたりできます。
* {{< ui >}}Processes{{< /ui >}}: このリソースのコンテナで実行されているすべてのプロセスが表示されます。
* {{< ui >}}Network{{< /ui >}}: 送信元、送信先、送受信ボリューム、スループットのフィールドなど、コンテナまたはリソースのネットワークパフォーマンスが表示されます。{{< ui >}}Destination{{< /ui >}} フィールドを使用して `DNS` や `ip_type` のようなタグで検索するか、このビューの {{< ui >}}Group by{{< /ui >}} フィルターを使用して `pod_name` や `service` のようなタグごとにネットワークデータをグループ化します。
* [**Events** (イベント)][5]: リソースのすべての Kubernetes イベントが表示されます。
* {{< ui >}}Monitors{{< /ui >}}: このリソースに対してタグ付け、スコープ設定、またはグループ化されたモニターが表示されます。

このリソースの詳細なダッシュボードを表示するには、このパネルの右上隅にある [View Dashboard] (ダッシュボードの表示) をクリックします。

{{< img src="infrastructure/livecontainers/view-pod-dashboard.png" alt="ライブコンテナの概要からの Pod ダッシュボードへのリンク" style="width:80%;">}}

### リソース使用状況{#resource-utilization}

_[リソース使用状況][6]_ページについては、こちらをご覧ください。

Kubernetes Explorer タブ内で、各種のリソース使用状況メトリクスを参照できます。

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization.png" alt="コンテナリソース使用状況" style="width:80%;">}}

これらの列はすべて並べ替えに対応しており、リソース使用状況に基づいて個々のワークロードを特定するのに役立ちます。

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization_sorted_column.png" alt="コンテナリソース使用状況の並べ替え列" style="width:50%;">}}

## クエリフィルターの詳細{#query-filter-details}

ページ左上の [Filter by] (フィルターの基準) 検索バーにクエリを入力することで、表示されるリソースを絞り込むことができます。

### 構文 {#syntax}

クエリフィルターは条件と演算子で構成されます。例:

{{< img src="infrastructure/livecontainers/orch_syntax.png" alt="Orchestrator Explorer クエリフィルターの構文。" style="width:80%;">}}

#### 条件{#terms}

利用可能な条件のタイプは複数あります。

| タイプ | 例 |
|---|---|
| **タグ**: [タグを収集するエージェント][7]によってリソースに付与されます。Datadog が Kubernetes リソースに対して生成する追加のタグもあります。 | `datacenter:staging`、`tag#datacenter:staging`<br>_ (`tag#` はオプション)_ |
| **ラベル**: [リソースのメタデータ][8]から抽出されます。一般に、クラスターを整理し、セレクターを使用して特定のリソースをターゲットにするために使用されます。| `label#chart_version:2.1.0` |
| **アノテーション**: [リソースのメタデータ][9]から抽出されます。一般に、クラスター管理を支援するツールをサポートするために使用されます。| `annotation#checksum/configmap:a1bc23d4` |
| **メトリクス**: ワークロードリソース (Pod や Deployment など) に追加されます。使用状況に基づいてリソースを見つけることができます。サポートされているメトリクスを確認するには、[リソース使用状況フィルター](#resource-utilization-filters)を参照してください。| `metric#cpu_usage_pct_limits_avg15:>80%` |
| **文字列一致**: 一部の特定のリソース属性でサポートされています。下記を参照してください。<br>_注: 文字列一致ではキーと値の形式は使用されず、一致させる属性を指定することはできません。_ | `"10.132.6.23"`(IP)、<br>`"9cb4b43f-8dc1-4a0e"` (UID)、<br>`web-api-3` (名前) |
| **フィールド**: [リソースのメタデータ][10]またはカスタムリソースのインデックス付きフィールドから抽出されます。 | `field#metadata.creationTimestamp:>=4wk`、`field#metadata.deletionTimestamp:<=1hr`、`field#status.currentReplicas:3`、`field#status.conditions.Active.status:True` |

>  ***注**: 同じキーと値のペアがタグとラベル (またはアノテーション) の両方として見つかる場合があります。これはクラスターの構成方法に依存します。*

次のリソース属性は、任意の**文字列一致**でサポートされています。
- `metadata.name`
- `metadata.uid`
- 検出された IP アドレス:
  - Pod
  - ノード (内部および外部)
  - サービス (クラスター、外部、およびロードバランサーの IP)

名前または IP でリソースを検索する場合、キーを指定する必要はありません。文字列検索に特定の特殊文字が含まれていない限り、引用符は不要です。

#### 比較演算子 {#comparators}

すべての条件で `:` 等価演算子がサポートされています。[メトリクス値](#resource-utilization-filters)の条件では、数値比較もサポートされます。

- `:>` より大きい (例: `metric#cpu_usage_avg15:>0.9`)
- `:>=` 以上
- `:<` より小さい
- `:<=` 以下

#### 演算子 {#operators}

複合クエリで複数の条件を組み合わせるには、大文字と小文字を区別する次のブール演算子を使用します。

| 演算子 | 説明 | 例 |
|---|---|---|
| `AND` | **積**: 両方の条件を含むイベントが選択されます (何も追加しなければ、AND デフォルトでが使用されます)。 | `a AND b`   |
| `OR` | **和**: いずれかの条件を含むイベントが選択されます。                                             | `a OR b`   |
| `NOT` / `-` | **除外**: 指定した条件を含まないイベントが選択されます (個々の未加工のテキスト検索に適用されます)。 | `a AND NOT b` または<br>`a AND -b` |
|  `( )` | **グループ化**: 条件を論理的にグループ化する方法を指定します。| `a AND (b OR c)` または<br>`(a AND b) or c` |

##### `OR` の値の省略 {#or-value-shorthand}

同じキーを共有する複数の条件で、すべてが `OR` 演算子を使用している場合、単一の条件にまとめることができます。たとえば、次のクエリがあるとします。

```
app_name:web-server OR app_name:database OR app_name:event-consumer
```

次のように短縮できます。

```
app_name:(web-server OR database OR event-consumer)
```

### ワイルドカード {#wildcards}

`*` ワイルドカードを条件の一部として使用し、値とキーの両方で部分一致によるフィルタリングを行うことができます。以下はその例です。

- `kube_job:stats-*`: `stats-` で始まる `kube_deployment` タグ値を持つすべてのリソースを検索します。
- `pod_name:*canary`: `canary` で終わる `pod_name` 値を持つすべてのリソースを検索します。
- `label#release:*`: ラベルの値に関係なく、`release` ラベルを持つすべてのリソースを検索します。
- `-label#*.datadoghq.com/*`: Datadog のスコープ設定されたラベルを持たないリソースを検索します。
- `kube_*:*stats*canary`: 関連するリソースタグ (`kube_*`) を持ち、値の途中に `stats` が含まれ、`canary` で終わるリソースを検索します。

### 抽出されるタグ {#extracted-tags}

ユーザーが Datadog エージェント内で[設定][7]したタグに加えて、Datadog はリソース属性に基づいて生成されたタグを挿入します。これは、検索やグループ化のニーズに役立ちます。これらのタグは、関連がある場合に条件付きでリソースに追加されます。

#### すべてのリソース {#all-resources}

すべてのリソースに `kube_cluster_name` タグがあり、名前空間があるリソースにはさらに `kube_namespace` タグが追加されます。

さらに、リソースには `kube_<api_kind>:<metadata.name>` タグが含まれます。たとえば、`web-server-2` という名前の Deployment には `kube_deployment:web-server-2` タグが自動的に追加されます。

> **注**: このパターンにはいくつかの例外があります。
>
> - Pod には `pod_name` が代わりに使用されます。
> - *VPA: `verticalpodautoscaler`*。
> - *HPA: `horizontalpodautoscaler`*。
> - *Persistent Volume Claim: `persistentvolumeclaim`*。

リソースに付与されたラベルに基づいて、次のタグも抽出されます。

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

関連するリソースには互いのタグが付与されます。以下はその例です。

- 「XYZ」Deployment の一部である Pod には、`kube_deployment:xyz` タグが付与されます。
- Service「A」を指すイングレスには、`kube_service:a` タグが付与されます。

「親」リソースから生成されたリソース (Pod や Job など) には、`kube_ownerref_kind` タグと `kube_ownerref_name` タグが付与されます。

> **ヒント:** フィルタークエリのオートコンプリート機能を利用すると、利用可能な関連リソースタグを確認できます。`kube_` と入力して、どのような結果が提案されるかを確認してください。

#### Pod {#pods}

Pod には次のタグが付与されます。

- `pod_name`
- `pod_phase` (マニフェストから抽出)
- `pod_status` (`kubectl` と同様に計算)

#### ワークロード {#workloads}

ワークロードリソース (Pod、Deployment、StatefulSet など) には、リソース使用状況ページでの対応状況を示す次のタグが付与されます。

- `resource_utilization` (`supported` または `unsupported`)
- `missing_cpu_requests`
- `missing_cpu_limits`
- `missing_memory_requests`
- `missing_memory_limits`

#### 条件 {#conditions}

一部のリソースについては、特定の条件がタグとして抽出されます。たとえば、Deployment には `kube_condition_available` タグがあります。タグの形式は常に `kube_condition_<name>` で、値は `true` または `false` です。

> **ヒント**: オートコンプリート機能を使用し、`kube_condition` と入力して結果を確認することで、特定のリソースタイプで利用可能な条件を見つけることができます。

#### リソース固有のタグ {#resource-specific-tags}

一部のリソースには、クラスターの環境に基づいて抽出される固有のタグがあります。上記の共有タグに加えて、次のタグが利用可能です。

| リソース | 抽出されるタグ |
|---|---|
| **Cluster** | `api_server_version`<br>`kubelet_version` |
| **Custom Resource Definition**、<br>**Custom Resource** | `kube_crd_kind`<br>`kube_crd_group`<br>`kube_crd_version`<br>`kube_crd_scope`<br>`kube_crd_resource` |
| **Namespace** | `phase` |
| **Node** | `kube_node_unschedulable`<br>`kube_node_kubelet_version`<br>`kube_node_kernel_version`<br>`kube_node_runtime_version`<br>`eks_fargate_node`<br>`node_schedulable`<br>`node_status` |
| **Persistent Volume** | `kube_reclaim_policy`<br>`kube_storage_class_name`<br>`pv_type`<br>`pv_phase` |
| **Persistent Volume Claim** | `pvc_phase`<br>`kube_storage_class_name` |
| **Pod** | `pod_name` (`kube_pod` の代わり)<br>`pod_phase` (マニフェストから抽出)<br>`pod_status` (`kubectl` と同様に計算) |
| **Service** | `kube_service_type`<br>`kube_service_port` |

### リソース使用状況フィルター {#resource-utilization-filters}

次のワークロードリソースには、リソース使用状況メトリクスが付加されます。

- クラスター
- ノード
- Pod

これらのメトリクスは、収集時に過去 15 分間の平均値に基づいて計算されます。`metric#<metric_name><comparator><numeric_value>` の形式を使用してメトリクス値でフィルタリングできます。

- `metric_name`は利用可能なメトリクス (下記を参照)
- `comparator` はサポートされている[比較演算子](#comparator)
- `numeric_value` は浮動小数点値

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

CPU メトリクスはコア数として保存されます。

メモリメトリクスはバイト数として保存されます。

パーセント (`*_pct_*`) は浮動小数点数として保存され、`0.0` は 0%、`1.0` は 100% となります。値は、示された 2 つのメトリクスの比率です。たとえば、`cpu_usage_pct_limits_avg15` は `usage / limits` の値です。メトリクスの値は、リクエストの CPU 使用率 (パーセント) のように、100% を超える場合があります。

## 注意点と既知の問題{#notes-and-known-issues}

* データは一定の間隔で自動的に更新されます。
* 1000 個以上の Deployment または ReplicaSet があるクラスターでは、Cluster Agent による CPU 使用率の上昇が見られる場合があります。Helm チャートには、コンテナのスクラビングを無効にするオプションがあります。詳細については、[Helm チャートリポジトリ][11]を参照してください。

## 参考資料 {#further-reading}

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