---
aliases:
- /ja/infrastructure/containers/orchestrator_explorer
description: Datadog の Kubernetes エクスプローラーページを使用して、Pod やデプロイメントなどの Kubernetes リソースを監視します。
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-operator-performance
  tag: ブログ
  text: Kubernetes オペレーターを監視して、アプリケーションがスムーズに動作するようにします。
- link: https://learn.datadoghq.com/courses/getting-started-k8s
  tag: ラーニングセンター
  text: Kubernetes Observability の開始
title: Kubernetes エクスプローラー
---
{{< img src="infrastructure/livecontainers/orch_ex.png" alt="Kubernetes Pod が表示されている Kubernetes エクスプローラー。" style="width:80%;">}}

Datadog の [Kubernetes エクスプローラー][1]では、Pod やデプロイメントなどの Kubernetes リソースの状態を監視できます。デプロイメント内の失敗した Pod のリソース仕様を表示する、ノードのアクティビティを関連ログに関連付ける、リソース使用率を追跡する、ワークロードを自動的にスケーリングする、エラーを修正することもできます。

<div class="alert alert-info">Datadog Agent を使用する場合、Kubernetes エクスプローラーには Agent 7.27.0 以降および Cluster Agent 1.11.0 以降が必要です。Kubernetes 1.25 以降を使用している場合は、Cluster Agent 7.40.0 以降が必要です。</div>


## 構成{#configuration}

### Kubernetes エクスプローラーを有効にする {#enable-kubernetes-explorer}

ほとんどの Datadog Agent インストールでは、Kubernetes エクスプローラーは**デフォルトで有効**になっています。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator を使用して Datadog Agent をインストールする場合、Kubernetes エクスプローラーはデフォルトで有効になっています。

Kubernetes エクスプローラーが有効になっていることを確認するには、`datadog-agent.yaml` で `features.orchestratorExplorer.enabled` パラメーターが `true` に設定されていることを確認してください。

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

[公式 Helm チャート][1]を使用して Datadog Agent をインストールする場合、Kubernetes エクスプローラーはデフォルトで有効になっています。

Kubernetes エクスプローラーが有効になっていることを確認するには、`datadog-values.yaml` ファイルの `orchestratorExplorer.enabled` パラメーターが `true` に設定されていることを確認してください。

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
手動セットアップについては、「[DaemonSet を使用して Kubernetes エクスプローラーをセットアップする][1]」を参照してください。

[1]: /ja/infrastructure/faq/set-up-orchestrator-explorer-daemonset

{{% /tab %}}
{{% tab "OpenTelemetry コレクター" %}}

OTLP HTTP を介して Kubernetes リソースデータを Datadog に直接送信することで、Kubernetes エクスプローラーにデータを取り込むことができます。このセットアップでは、[`k8sobjects`][1] レシーバーと OpenTelemetry Collector の OTLP HTTP エクスポーターを使用します。

以下の手順では、関連するダッシュボードで使用されるメトリクスを収集することなく、エクスプローラーのリソースビューを有効にします。このセットアップでは、`kube-state-metrics` や Prometheus サーバーは必要ありません。それらのメトリクスを収集してエクスプローラーに取り込むには、代わりに「[OpenTelemetry による Kubernetes の監視][6]」の手順に従います。

{{< site-region region="gov,gov2" >}}<div class="alert alert-warning">この機能は {{< region-param key="dd_site_name" >}}では使用できません。</div>{{< /site-region >}}

#### 前提条件 {#prerequisites}

- OpenTelemetry Collector Contrib [v0.159.0][3] 以降。
- OpenTelemetry Collector [Helm チャート][4] v0.156.2 以降。
- [Datadog API キー][15]および [Datadog サイト][7]。

#### 制限事項 {#limitations}

オープンソースの `k8sobjects` レシーバーは、クラスターの Kubernetes API サーバーに多大な負荷をかける場合があります。[アップストリームの Informer ベースの移行][16]により、スケーラビリティの改善が追跡されます。

推奨:

- Kubernetes 1.33 以降をご利用ください。これには、API サーバーへの影響を軽減する[ストリーミングリストの改善][5]が含まれています。
- 小規模なクラスターから始めます。出発点として、リソースタイプごとのオブジェクト数は 5,000 未満に制限し、クラスターの健全性を監視しながら段階的にスケールアップします。

#### 1. Datadog シークレットを作成する {#1-create-a-datadog-secret}

Datadog API キーとサイトを設定し、Kubernetes シークレットを作成します。これらの手順では、シークレットと Collector の両方に `default` ネームスペースを使用します。

```sh
export DD_API_KEY="<YOUR_DATADOG_API_KEY>"
export DD_SITE="{{< region-param key="dd_site" >}}"

kubectl create secret generic datadog-secret \
  --namespace default \
  --from-literal="api-key=$DD_API_KEY" \
  --from-literal="dd-site=$DD_SITE"
```

#### 2. クラスターコレクターを構成する {#2-configure-the-cluster-collector}

以下の完全な Helm 値を使用して `deployment-collector.yaml` を作成します。`<YOUR_CLUSTER_NAME>` をクラスター名に置き換えます。

この構成では、1 つのコレクターをデプロイメントとして実行します。クラスター名が明示的に設定されるため、クラウドプロバイダーの検出は不要です。

```yaml
mode: deployment
replicaCount: 1

image:
  repository: otel/opentelemetry-collector-contrib
  tag: 0.159.0
  pullPolicy: IfNotPresent

extraEnvs:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        name: datadog-secret
        key: api-key
  - name: DD_SITE
    valueFrom:
      secretKeyRef:
        name: datadog-secret
        key: dd-site
  - name: K8S_NODE_NAME
    valueFrom:
      fieldRef:
        fieldPath: spec.nodeName

presets:
  kubernetesObjects:
    enabled: true
    watch: true

config:
  receivers:
    k8sobjects:
      interval: 3m

  processors:
    resource_detection:
      detectors: [k8s_api]
      override: false
    resource/add-cluster-name:
      attributes:
        - key: k8s.cluster.name
          value: "<YOUR_CLUSTER_NAME>"
          action: upsert

  exporters:
    otlp_http:
      endpoint: https://otlp.${env:DD_SITE}
      logs_endpoint: https://otlp.${env:DD_SITE}/v1/logs
      headers:
        dd-api-key: ${env:DD_API_KEY}
      compression: zstd
      compression_params:
        level: 3
      sending_queue:
        batch:
          sizer: bytes
          min_size: 2097152
          max_size: 4194304

  service:
    pipelines:
      logs:
        receivers: [k8sobjects]
        processors: [resource_detection, resource/add-cluster-name]
        exporters: [otlp_http]
```

`kubernetesObjects` プリセットは、レシーバー、サービスアカウント、および RBAC 権限を構成します。収集間隔は `3m` に、検出器は `k8s_api` にします。この検出器は `K8S_NODE_NAME` を使用してクラスター UID を識別します。`logs` パイプラインは Kubernetes リソースオブジェクトを OTLP 経由で送信しますが、アプリケーションログは収集しません。

##### クラスター名の自動検出 (オプション) {#automatic-cluster-name-detection-optional}

クラスター名を自動検出する場合は、デプロイ前に `deployment-collector.yaml` で以下の変更を行います。

1. プロバイダーの検出器を `resource_detection.detectors` に追加し、`k8s_api` を保持します。[EKS][12]、[AKS][13]、または [GKE][14] の構成および権限ガイダンスに従ってください (`k8s.cluster.name` リソース属性の有効化を含みます)。
2. `config.processors` と `logs` パイプラインの `processors` リストの両方から `resource/add-cluster-name` を削除します。

#### 3. Helmでデプロイする {#3-deploy-with-helm}

構成ファイルを使用して OpenTelemetry Collector をインストールします。

```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update

helm install deployment-collector open-telemetry/opentelemetry-collector \
  --namespace default \
  --values ./deployment-collector.yaml
```

#### 4. インストールを検証する {#4-verify-the-installation}

[Kubernetes エクスプローラー][9]を開いて、OpenTelemetry クラスター名でフィルタリングします。すべてのコア Kubernetes リソースセクションと、**[Custom Resources] (カスタムリソース) > [CRD]** の両方にデータが取り込まれます。**[Custom Resources] > [Resources] (リソース)** セクションは、このセットアップではサポートされていません。

#### 5. Kubernetes エクスプローラーでログ、メトリクス、トレースを関連付ける (オプション) {#5-correlate-logs-metrics-and-traces-with-kubernetes-explorer-optional}

このステップは、アプリケーションのテレメトリを受信するコレクターに適用されます。上記のエクスプローラー専用コレクターには適用されません。そのテレメトリを Kubernetes リソースと関連付けるには、それらのコレクターのパイプラインに [`k8sattributes`][10] プロセッサーと [`resourcedetection`][8] プロセッサーを追加します。エクスプローラーコレクターと同じクラスター名を使用してください。

以下のフラグメントは、プロセッサーの構成を示しています。アプリケーションテレメトリパイプライン内の既存のレシーバー、エクスポーター、プロセッサーはそのまま維持し、各パイプラインの `...` を他のプロセッサーに置き換えてください。

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

アプリケーションテレメトリコレクターのすべての例については、[DaemonSet コレクター構成][11]を参照してください。

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/k8sobjectsreceiver
[3]: https://github.com/open-telemetry/opentelemetry-collector-contrib/releases/tag/v0.159.0
[4]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/opentelemetry-collector-0.156.2/charts/opentelemetry-collector
[5]: https://kubernetes.io/blog/2025/05/09/kubernetes-v1-33-streaming-list-responses/
[6]: /ja/containers/kubernetes/opentelemetry/#setup
[7]: /ja/getting_started/site/
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor
[9]: https://app.datadoghq.com/orchestration/overview
[10]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor
[11]: https://github.com/DataDog/opentelemetry-examples/blob/main/guides/kubernetes/configuration/daemonset-collector.yaml
[12]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#amazon-eks
[13]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#azure-aks
[14]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/resourcedetectionprocessor#gcp-metadata
[15]: /ja/account_management/api-app-keys/#api-keys
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/pull/50392

{{% /tab %}}
{{% tab "OpenTelemetry Kube スタック" %}}

Datadog Agent の代わりに `opentelemetry-kube-stack` Helm チャートを使用して、Kubernetes エクスプローラーにデータを取り込むことができます。

<div class="alert alert-info">このタブに示す参照構成では、Datadog エクスポーターを使用しています。新規デプロイメントの場合は、「<strong>OpenTelemetry Collector</strong>」タブを使用して、OTLP HTTP 経由で Kubernetes リソースデータを Datadog に直接送信してください。</div>

[`opentelemetry-kube-stack`][1] Helm チャートは、OpenTelemetry Operator をインストールし、`OpenTelemetryCollector` CR (カスタムリソース) としてコレクターを管理します。Datadog には、次の 2 つのコレクターを構成するリファレンスの [`values.yaml`][2] が用意されています。

- **`cluster`** (デプロイメント): kube-state-metrics をスクレイピングし、Kubernetes オブジェクトを監視し、`orchestrator_explorer` を有効にして Kubernetes エクスプローラーにデータを取り込みます。
- **`daemon`**(DaemonSet): ホストおよび kubelet メトリクスを収集し、アプリケーションテレメトリーデータ用の OTLP エンドポイントを公開します。

{{< site-region region="gov,gov2" >}}<div class="alert alert-warning">この機能は {{< region-param key="dd_site_name" >}}では使用できません。</div>{{< /site-region >}}

#### 前提条件 {#prerequisites-1}

- OpenTelemetry Kube スタック Helm チャート [0.20.1][3] 以降。
- OpenTelemetry Collector Contrib [v0.154.0][4] 以降 (参照値ファイルにより固定)。
- cert-manager。オペレーターの Admission Webhook に必要です。

#### 制限事項 {#limitations-1}

オープンソースの `k8sobjects` レシーバーは、クラスターの Kubernetes API サーバーに多大な負荷をかける場合があります。

推奨:

- Kubernetes 1.33 以降をご利用ください。これには、API サーバーへの影響を軽減する[ストリーミングリストの改善][5]が含まれています。
- 小規模なクラスターから始めます。出発点として、リソースタイプごとのオブジェクト数は 5,000 未満に制限し、クラスターの健全性を監視しながら段階的にスケールアップします。

#### クイックスタート (対話形式のインストーラー) {#quickstart-interactive-installer}

[`opentelemetry-examples`][6] リポジトリには、以下のすべての手順を処理する対話形式のインストーラーが用意されています。`guides/kubernetes/configuration/opentelemetry-kube-stack/` から、以下を実行します。

```sh
./install
```

インストーラーから、Datadog API キー、[Datadog サイト][7]、Kubernetes プラットフォーム、およびデプロイ環境の入力を求められます。EKS、GKE、AKS の場合は、対応するリソース検出プリセットが有効になります。その他のプラットフォームの場合は、クラスター名の入力を求められます。入力すると、`opentelemetry-operator-system` ネームスペースと `datadog-secret` が作成され、必要に応じて cert-manager がインストールされ、チャートがインストールまたはアップグレードされます。

#### 値ファイルを使用したインストール {#install-with-values-files}

上記の対話形式のインストーラーを使用しなかった場合は、以下の手順に従って手動でインストールします。

##### 1. cert-manager をインストールする (まだインストールされていない場合) {#1-install-cert-manager-if-not-already-present}

```sh
helm repo add jetstack https://charts.jetstack.io
helm repo update

helm install cert-manager jetstack/cert-manager \
  --namespace cert-manager --create-namespace \
  --set crds.enabled=true
```

##### 2. Datadog シークレットを作成する {#2-create-the-datadog-secret}

[Datadog サイト][7] に `DD_SITE` を設定します (デフォルトは `datadoghq.com` です)。

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

リファレンスの `values.yaml` を基に作成します。デプロイメント固有の設定 (クラスタープラットフォーム、環境、クラスター名) はオーバーレイファイルに含まれています。`guides/kubernetes/configuration/opentelemetry-kube-stack/` から、ご使用のプラットフォームに合う例をコピーします。

```sh
mkdir -p deployment

# EKS, GKE, or AKS (resource detector auto-populates k8s.cluster.name):
cp examples/eks-deployment/values.yaml deployment/values.yaml
cp examples/gcp-deployment/values.yaml deployment/values.yaml
cp examples/aks-deployment/values.yaml deployment/values.yaml

# Other platforms (set the cluster name manually):
cp examples/manually-set-k8s-cluster-name/values.yaml deployment/values.yaml
```

EKS/GKE/AKS 以外のプラットフォームでは、`deployment/values.yaml` を編集し、`my_k8s_cluster` と `production` をご使用のクラスター名とデプロイメント環境に置き換えてください。

##### 4. リファレンスコレクターをデプロイする {#4-deploy-the-reference-collectors}

ベースとなる `values.yaml` とオーバーレイの両方を使用してチャートをインストールまたはアップグレードします。

```sh
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update

helm upgrade --install opentelemetry-kube-stack \
  open-telemetry/opentelemetry-kube-stack \
  --namespace opentelemetry-operator-system \
  --values ./values.yaml \
  --values ./deployment/values.yaml
```

どちらのコレクターもデフォルトで、CPU `500m`、メモリ `1Gi` の制限と、CPU `200m`、メモリ `500Mi` のリクエストに設定されます。より大規模なクラスターでは拡張してください。

#### インストールを検証する {#verify-the-installation}

[Kubernetes エクスプローラー][8]を開いて、ご使用のクラスター名でフィルタリングします。すべてのコア Kubernetes リソースセクションと、**[Custom Resources] (カスタムリソース) > [CRD]** の両方にデータが取り込まれます。**[Custom Resources] > [Resources] (リソース)** セクションは、このセットアップではサポートされていません。

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

フィルタリングを容易にするために、`DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 環境変数を使用して Kubernetes リソースにカスタムタグを追加できます。**これらのタグは Kubernetes エクスプローラーにのみ表示されます。**

{{< tabs >}}
{{% tab "Datadog Operator" %}}

`datadog-agent.yaml` の次の場所で、`DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 環境変数を **2 回**設定します。
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

`datadog-agent.yaml` の次の場所で、`DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS` 環境変数を **2 回**設定します。
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

Process Agent と Cluster Agent の両コンテナに環境変数を設定します。

```yaml
- name: DD_ORCHESTRATOR_EXPLORER_EXTRA_TAGS
  value: "tag1:value1 tag2:value2"
```

{{% /tab %}}
{{< /tabs >}}

## 使用方法 {#usage}

### ビュー {#views}

ページの左上隅にある [{{< ui >}}Select Resources{{< /ui >}}] (リソースの選択) ドロップダウンメニューで、[{{< ui >}}Pods{{< /ui >}}]、[{{< ui >}}Clusters{{< /ui >}}] (クラスター)、[{{< ui >}}Namespaces{{< /ui >}}] (ネームスペース)、およびその他の Kubernetes リソースを切り替えます。

それぞれのビューには、ステータス、名前、Kubernetes ラベルなどのフィールドごとにデータをよりよく整理するために役立つデータテーブルと、ポッドと Kubernetes クラスターの全体像を把握するための詳細なクラスターマップが含まれています。

**これらのビューのフィルタリング方法の詳細については、「[クエリフィルターの詳細](#query-filter-details)」を参照してください。**

{{< img src="infrastructure/livecontainers/orch_ex_replicasets.png" alt="オーケストレータエクスプローラーが開き、[Workloads] (ワークロード) > [Replica Sets] (レプリカセット) が[Summary] (サマリー) モードで表示されます。" style="width:80%;">}}

#### 機能およびファセットごとにグループ化する {#group-by-functionality-and-facets}

Pod をタグ、Kubernetes ラベル、または Kubernetes アノテーションでグループ化してビューを集約することで、情報をより迅速に見つけられるようになります。グループ化を行うには、ページ右上の [Group by] (グループ化) バーを使用するか、特定のタグやラベルをクリックして、以下に示すようなコンテキストメニューのグループ化機能を使用します。

{{< img src="infrastructure/livecontainers/orch_ex_groupby.png" alt="チーム別のグループ化の例" style="width:80%;">}}

また、ページの左側にあるファセットを利用することで、リソースをグループ化したり、ポッドステータスが CrashLoopBackOff のポッドなど、最も気になるリソースをフィルタリングすることができます。

{{< img src="infrastructure/livecontainers/crashloopbackoff.mp4" alt="CrashLoopBackOff Pod ステータスのグループ化の例" video=true style="width:80%;">}}

### クラスターマップ {#cluster-map}

クラスターマップでは、Pod と Kubernetes クラスターの全体像を把握できます。カスタマイズされたグループやフィルターを使って、すべてのリソースを 1 つの画面にまとめて表示し、ノードの色に対応するメトリクスを選択することができます。

サークルまたはグループをクリックして詳細パネルを表示し、クラスターマップからリソースを調べます。

{{< img src="infrastructure/livecontainers/cluster-map.mp4" alt="カスタマイズされたグループとフィルターが示されているクラスターマップ" video=true style="width:80%;">}}

### 情報パネル {#information-panel}

表内の任意の行、またはクラスターマップの任意のオブジェクトをクリックすると、特定のリソースに関する情報がサイドパネルに表示されます。

{{< img src="infrastructure/livecontainers/orch_ex_panel.png" alt="プロセスが開いている、サイドパネル内のリソースの表示。" style="width:80%;">}}

サイドパネルの [{{< ui >}}YAML{{< /ui >}}] タブには、リソースの完全な定義が示されます。**Agent バージョン 7.44.0** 以降では、7 日間の定義履歴も含まれます。時間の経過による変化や異なるバージョン間での変更を比較できます。表示されている時刻は、リソースに変更が適用されたおおよその時間です。

関連性のない変更が多数表示されることを防ぐために、以下のフィールドのみに影響する更新は無視されます。

* metadata.resourceVersion
* metadata.managedFields
* metadata.generation
* metadata.annotations["kubernetes.io/config.seen"]
* status

{{< img src="infrastructure/livecontainers/orch_ex_manifest_history.png" alt="yaml 履歴機能が示されている、サイドパネルのリソースの表示" style="width:80%;">}}

その他のタブには、選択したリソースのトラブルシューティングに関する詳細情報が示されます。

* [[**Logs**] (ログ)][2]: コンテナまたはリソースのログを表示します。ログをクリックすると、ログエクスプローラーで関連するログが表示されます。
* [[**APM**]][3]: コンテナまたはリソースのトレース (日付、サービス、期間、メソッド、トレースのステータスコードを含む) が表示されます。
* [[**Metrics**] (メトリクス)][4]: コンテナまたはリソースのライブメトリクスが表示されます。このタブでは、グラフを全画面表示したり、グラフのスナップショットを共有したり、グラフをエクスポートしたりすることができます。
* [{{< ui >}}Processes{{< /ui >}}] (プロセス): このリソースのコンテナで実行されているすべてのプロセスが表示されます
* [{{< ui >}}Network{{< /ui >}}] (ネットワーク): コンテナまたはリソースのネットワークパフォーマンスを表示します ([source] (送信元)、[destination] (送信先)、[sent and received volume] (送受信ボリューム)、[throughput] (スループット) の各フィールドを含む)。[{{< ui >}}Destination{{< /ui >}}] フィールドを使用して `DNS` や `ip_type` などのタグで検索するか、このビューの [{{< ui >}}Group by{{< /ui >}}] フィルターを使用して、`pod_name` や `service` などのタグでネットワークデータをグループ化します。
* [[**Events**] (イベント)][5]: リソースのすべての Kubernetes イベントを表示します。
* [{{< ui >}}Monitors{{< /ui >}}] (モニター): このリソースのタグ付けされた、スコープが設定された、またはグループ化されたモニターが表示されます。

このリソースの詳細なダッシュボードについては、このパネルの右上隅にある View Dashboard をクリックしてください。

{{< img src="infrastructure/livecontainers/view-pod-dashboard.png" alt="ライブコンテナの概要からの Pod ダッシュボードへのリンク" style="width:80%;">}}

### リソース使用率 {#resource-utilization}

_[Resource Utilization] (リソース使用率) ページについては、「[リソース使用率][6]」を参照してください_。

[Kubernetes Explorer] (Kubernetes エクスプローラー) タブでは、リソース使用率メトリクスの選択を確認することができます。

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization.png" alt="コンテナリソース使用率" style="width:80%;">}}

これらの列はすべてソートをサポートしており、リソース使用率に基づいて個々のワークロードを特定するのに役立ちます。

{{< img src="infrastructure/livecontainers/orch_ex_resource_utilization_sorted_column.png" alt="コンテナリソース使用率のソート済みの列" style="width:50%;">}}

## クエリフィルターの詳細 {#query-filter-details}

ページの左上にある [Filter by] (フィルター) 検索バーにクエリを入力することで、表示されるリソースを絞り込むことができます。

### 構文 {#syntax}

クエリフィルターは条件と演算子で構成されます。例:

{{< img src="infrastructure/livecontainers/orch_syntax.png" alt="オーケストレータエクスプローラークエリフィルターの構文。" style="width:80%;">}}

#### 条件 {#terms}

複数の種類の条件を使用できます。

| 種類 | 例 |
|---|---|
| **タグ**: [リソースを収集するエージェント][7]によってリソースに付与されます。Datadog が Kubernetes リソースに対して生成する追加のタグもあります。 | `datacenter:staging`、`tag#datacenter:staging`<br>_ (`tag#` はオプションです)_ |
| **ラベル**: [リソースのメタデータ][8]から抽出されます。これらは通常、クラスターを整理したり、セレクターを使用して特定のリソースをターゲットにしたりするために使用されます。| `label#chart_version:2.1.0` |
| **アノテーション**: [リソースのメタデータ][9]から抽出されます。これらは通常、クラスター管理の補助ツールとして使用されます。| `annotation#checksum/configmap:a1bc23d4` |
| **メトリクス**: ワークロードリソース (Pod、デプロイメントなど) に追加されます。使用率に基づいてリソースを検索できます。サポートされているメトリクスを確認するには、「[リソース使用率フィルター](#resource-utilization-filters)」を参照してください。| `metric#cpu_usage_pct_limits_avg15:>80%` |
| **文字列一致**: 一部の特定のリソース属性でサポートされています。以下を参照してください。<br>_注: 文字列一致ではキーと値の形式は使用されず、一致させる属性を指定することはできません。_ | `"10.132.6.23"`(IP)、<br>`"9cb4b43f-8dc1-4a0e"` (UID)、<br>`web-api-3` (名前) |
| **フィールド**: [リソースのメタデータ][10]またはカスタムリソースのインデックス付きフィールドから抽出されます。 | `field#metadata.creationTimestamp:>=4wk`、`field#metadata.deletionTimestamp:<=1hr`、`field#status.currentReplicas:3`、`field#status.conditions.Active.status:True` |

>  ***注**: 同じキーと値のペアがタグとラベル (またはアノテーション) の両方として見つかる場合があります。これはクラスターの構成方法によって異なります。*

以下のリソース属性は、任意の**文字列一致**でサポートされています。
- `metadata.name`
- `metadata.uid`
- 以下で検出された IP アドレス:
  - Pod
  - ノード (内部および外部)
  - サービス (クラスター、外部、およびロードバランサー IP)

リソースを名前または IP で検索する場合、キーを指定する必要はありません。文字列検索に特定の特殊文字が含まれていない限り、引用符は不要です。

#### 比較演算子 {#comparators}

すべての条件で `:` 等価演算子がサポートされます。[メトリクス値](#resource-utilization-filters)条件では、数値比較もサポートされています。

- `:>` より大きい (例: `metric#cpu_usage_avg15:>0.9`)
- `:>=` 以上
- `:<` より小さい
- `:<=` 以下

#### 演算子 {#operators}

複合クエリで複数の条件を組み合わせるには、以下の大文字と小文字を区別するブール演算子を使用します。

| 演算子 | 説明 | 例 |
|---|---|---|
| `AND` | **積**: 両方の条件を含むイベントが選択されます (何も追加しなければ、AND がデフォルトで採用されます)。 | `a AND b`   |
| `OR` | **和**: : いずれかの条件を含むイベントが選択されます。                                             | `a OR b`   |
| `NOT` / `-` | **除外**: 以下の条件はイベントに含まれません (個々の生テキスト検索に適用されます)。 | `a AND NOT b` または <br>`a AND -b` |
|  `( )` | **グループ化:** 条件を論理的にグループ化する方法を指定します。| `a AND (b OR c)` または <br>`(a AND b) or c` |

##### `OR` 値の省略形 {#or-value-shorthand}

同じキーを共有する複数の条件は、それらがすべて `OR` 演算子を使用している場合、単一の条件にまとめることができます。たとえば、次のクエリの場合は:

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
- `label#release:*`: 値に関係なく、`release` ラベルを持つすべてのリソースを検索します。
- `-label#*.datadoghq.com/*`: Datadog スコープのラベルを持たないリソースを検索します。
- `kube_*:*stats*canary`: 値の途中に `stats` が含まれ、かつ `canary` で終わる、関連リソースタグ (`kube_*`) を持つリソースを検索します。

### 抽出されたタグ {#extracted-tags}

Datadog Agent 内でユーザーが[構成][7]したタグに加え、リソース属性に基づいて生成されたタグが Datadog によって挿入されます。これは、検索やグループ化のニーズに役立ちます。これらのタグは、関連性がある場合に条件付きでリソースに追加されます。

#### すべてのリソース {#all-resources}

すべてのリソースには `kube_cluster_name` タグが追加され、すべてのネームスペースリソースには `kube_namespace` タグが追加されます。

さらに、リソースには `kube_<api_kind>:<metadata.name>` タグが含まれています。たとえば、`web-server-2` という名前のデプロイメントには、`kube_deployment:web-server-2` タグが自動的に追加されます。

> **注**: このパターンにはいくつかの例外があります。
>
> - Pod は代わりに `pod_name` を使用します。
> - *VPA: `verticalpodautoscaler`*。
> - *HPA: `horizontalpodautoscaler`*。
> - *永続ボリュームクレーム: `persistentvolumeclaim`*。

リソースに付与されたラベルに基づいて、以下のタグも抽出されます。

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

#### Relationships (関係) {#relationships}

関連リソースは、相互にタグ付けされます。以下はその例です。

- 「XYZ」デプロイメントの一部である Pod には、`kube_deployment:xyz` タグが付けられます。
- サービス「A」を指す Ingress には、`kube_service:a` タグが付けられます。

「親」リソースから生成されたリソース (Pod やジョブなど) には、`kube_ownerref_kind` タグと `kube_ownerref_name` タグが付けられます。

> **ヒント:** フィルタークエリのオートコンプリート機能を利用して、利用可能な関連リソースタグを見つけられます。`kube_` と入力して、どのような結果が提示されるか確認してください。

#### Pod {#pods}

Pod には以下のタグが付けられます。

- `pod_name`
- `pod_phase` (マニフェストから抽出)
- `pod_status` (`kubectl` と同様に計算)

#### ワークロード {#workloads}

ワークロードリソース (Pod、デプロイメント、ステートフルセットなど) には、[Resources Utilization] ページ内でサポートされていることを示す以下のタグが付与されます。

- `resource_utilization` (`supported` または `unsupported`)
- `missing_cpu_requests`
- `missing_cpu_limits`
- `missing_memory_requests`
- `missing_memory_limits`

#### 条件 {#conditions}

一部のリソースについては、特定の条件がタグとして抽出されます。たとえば、デプロイメントでは `kube_condition_available` タグが検出されます。タグの形式は常に `kube_condition_<name>` で、`true` または `false` の値をとります。

> **ヒント**: オートコンプリート機能を使用して、`kube_condition` と入力し、結果を確認することで、特定のリソースタイプで利用可能な条件を確認することができます。

#### リソース固有のタグ {#resource-specific-tags}

一部のリソースには、クラスターの環境に基づいて抽出される特定のタグがあります。上記の共有タグに加えて、以下のタグが利用可能です。

| リソース | 抽出されたタグ |
|---|---|
| **クラスター** | `api_server_version`<br>`kubelet_version` |
| **カスタムリソース定義**および<br>**カスタムリソース** | `kube_crd_kind`<br>`kube_crd_group`<br>`kube_crd_version`<br>`kube_crd_scope`<br>`kube_crd_resource` |
| **ネームスペース** | `phase` |
| **ノード** | `kube_node_unschedulable`<br>`kube_node_kubelet_version`<br>`kube_node_kernel_version`<br>`kube_node_runtime_version`<br>`eks_fargate_node`<br>`node_schedulable`<br>`node_status` |
| **永続ボリューム** | `kube_reclaim_policy`<br>`kube_storage_class_name`<br>`pv_type`<br>`pv_phase` |
| **永続ボリュームクレーム** | `pvc_phase`<br>`kube_storage_class_name` |
| **Pod** | `pod_name` (`kube_pod` の代わりに使用)<br>`pod_phase` (マニフェストから抽出)<br>`pod_status` (`kubectl` と同様に計算) |
| **サービス** | `kube_service_type`<br>`kube_service_port` |

### リソース使用率フィルター {#resource-utilization-filters}

以下のワークロードリソースは、リソース使用率メトリクスによって拡充されます。

- クラスター
- ノード
- Pod

これらのメトリクスは、過去 15 分間の平均値に基づいて、収集時に計算されます。`metric#<metric_name><comparator><numeric_value>` のように指定して、メトリクス値でフィルタリグできます。

- `metric_name`は利用可能なメトリクスです (下記を参照)。
- `comparator` はサポートされている[比較演算子](#comparator)です。
- `numeric_value` は浮動小数点値です。

Pod の場合は、以下のメトリクス名が利用可能です。

| CPU | メモリ |
|---|---|
| `cpu_limits_avg15` | `mem_limits_avg15` |
| `cpu_requests_avg15` | `mem_requests_avg15` |
| `cpu_usage_avg15` | `mem_usage_avg15` |
| `cpu_usage_pct_limits_avg15` | `mem_usage_pct_limits_avg15` |
| `cpu_usage_pct_requests_avg15` | `mem_usage_pct_requests_avg15` |
| `cpu_waste_avg15` | `mem_waste_avg15` |

また、クラスターおよびノードでは、以下のメトリクスが利用可能です。

- `cpu_usage_pct_alloc_avg15`
- `cpu_requests_pct_alloc_avg15`
- `mem_usage_pct_alloc_avg15`
- `mem_requests_pct_alloc_avg15`

#### メトリクス単位 {#metric-units}

CPU メトリクスは、コア数として保存されます。

メモリメトリクスは、バイト数として保存されます。

パーセント (`*_pct_*`) は浮動小数点数として保存され、`0.0` は 0%、`1.0` は 100% です。値は、示されている 2 つのメトリクスの比率です。たとえば、`cpu_usage_pct_limits_avg15` は `usage / limits` の値です。メトリクス値は、リクエストの CPU 使用率のパーセンテージのように、100% を超える場合があります。

## 注意事項と既知の問題 {#notes-and-known-issues}

* データは一定の間隔で自動的に更新されます。
* 1000 個以上のデプロイメントまたは ReplicaSets があるクラスターでは、Cluster Agent による CPU 使用率の上昇が見られる場合があります。Helm チャートには、コンテナのスクラビングを無効にするオプションがあります。詳細については、[Helm チャートリポジトリ][11]を参照してください。

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