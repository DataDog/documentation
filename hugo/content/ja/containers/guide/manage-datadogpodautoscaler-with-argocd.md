---
description: ArgoCD and GitOps を使用して Kubernetes Autoscaling の DatadogPodAutoscaler
  カスタムリソースをデプロイおよび管理する
further_reading:
- link: https://www.datadoghq.com/blog/kubernetes-autoscaling-datadog/
  tag: ブログ
  text: 'Kubernetes Autoscaling ガイド: ユースケースに適したソリューションを決定する'
- link: https://docs.datadoghq.com/containers/monitoring/autoscaling/
  tag: ドキュメント
  text: Datadog Kubernetes Autoscaling
- link: https://docs.datadoghq.com/agent/cluster_agent/
  tag: ドキュメント
  text: Datadog Cluster Agent
- link: https://argo-cd.readthedocs.io/
  tag: 外部サイト
  text: ArgoCD ドキュメント
- link: https://argo-cd.readthedocs.io/en/stable/user-guide/sync-waves/
  tag: 外部サイト
  text: ArgoCD 同期ウェーブ
- link: https://argo-cd.readthedocs.io/en/stable/user-guide/diffing/
  tag: 外部サイト
  text: ArgoCD 差分カスタマイズ
- link: https://argo-cd.readthedocs.io/en/stable/user-guide/sync-options/
  tag: 外部サイト
  text: ArgoCD 同期オプション
title: ArgoCD を使用した DatadogPodAutoscaler の管理
---
## 概要 {#overview}

DatadogPodAutoscaler (DPA) は、[Datadog Kubernetes Autoscaling (DKA)][1] を使用して Kubernetes ワークロードのオートスケーリングを可能にする Kubernetes カスタムリソース定義 (CRD) です。このガイドでは、ArgoCD と GitOps の原則を使用して DatadogPodAutoscaler リソースを管理し、オートスケーリング構成をデプロイする方法を説明します。

ArgoCD は、Kubernetes の宣言型 GitOps 継続的デリバリーツールです。Kubernetes マニフェストを含む Git リポジトリをモニターし、Git で定義された望ましい状態とクラスターを同期させます。このアプローチは、バージョン管理、監査証跡、およびオートスケーリングインフラストラクチャーの自動デプロイを提供します。

**大規模なオートスケーリングの有効化:** 共有ポリシーで多くのワークロードやネームスペースにオートスケーリングを展開するには、ワークロードごとに 1 つの `DatadogPodAutoscaler` を作成するのではなく、`autoscaling.datadoghq.com/profile` でワークロードやネームスペースにラベルを付けます。Kubernetes Autoscaling の概要にある[クラスタープロファイル][2]を参照してください。

## 前提条件 {#prerequisites}

始める前に、以下があることを確認します。

- **Kubernetes クラスター**: `kubectl` を使用してアクセスできる稼働中の Kubernetes クラスター (1.20 以降)
- **ArgoCD インストール済み**: クラスターにデプロイされ、CLI または UI 経由でアクセスできる ArgoCD
- **Datadog API 資格情報**: 有効な Datadog API キーおよびアプリケーションキー
- **Git リポジトリ**: マニフェストを保存するための Git リポジトリ

## プロジェクト構造 {#project-structure}

このガイドでは、適切な依存関係の作成とデプロイメントの順序を確実にするため、ArgoCD 同期ウェーブで App of Apps パターンを使用します。

```
.
├── argocd/
│   ├── root-app.yaml              # App of Apps controller
│   └── apps/
│       ├── datadog-operator.yaml  # ArgoCD Application for Operator
│       ├── datadog-agent.yaml     # ArgoCD Application for Agent
│       └── nginx-dka-demo.yaml    # ArgoCD Application for workload
├── manifests/
│   └── stage2-agent/
│       └── datadog-agent.yaml     # DatadogAgent custom resource
└── charts/
    └── nginx-dka-demo/
        ├── Chart.yaml
        ├── values.yaml
        └── templates/
            ├── deployment.yaml
            └── pod-autoscaler.yaml
```

## デプロイメントステージ {#deployment-stages}

Kubernetes カスタムリソース定義 (CRD) および ArgoCD を使用する際には、マルチステージデプロイメントアプローチが不可欠です。この順序付けられたアプローチは、プロセスの各ステージに必要な依存関係を確実に作成およびインストールするために必要です。

Kubernetes CRD を使用するカスタムリソースを作成するには、まずクラスターに Kubernetes CRD をインストールする必要があります。DatadogPodAutoscaler CRD は、ステージ 1 で Datadog Operator をインストールすると作成されます。ArgoCD は、これらの CRD が存在していなければそれらに依存するリソースを正常に同期できません。

ArgoCD は、アノテーションを通じてデプロイメントの順序を制御するために**同期ウェーブ**を使用します。同期ウェーブは昇順 (低い番号が先) で実行され、ArgoCD は次のウェーブに進む前にウェーブ内のすべてのリソースが正常であることを確認します。

1. **ステージ 1 (ウェーブ 0)**: Helm を使用した Datadog Operator (CRD を作成)
2. **ステージ 2 (ウェーブ 1)**: Datadog Kubernetes Autoscaling 用に構成された Datadog Agent
   - オートスケーリング要件が有効な DatadogAgent カスタムリソース
3. **ステージ 3 (ウェーブ 2)**: DatadogPodAutoscaler を使用したアプリケーションワークロード
   - デモネームスペース内の NGINX デプロイメント
   - NGINX のデプロイメントのオートスケーリング用 DatadogPodAutoscaler リソース

## 構成ファイルをセットアップする {#set-up-configuration-files}

まず、Git リポジトリを作成します。ArgoCD は Git からマニフェストを取得するため、ArgoCD Application のすべての `repoURL` 参照をリポジトリを指すように更新する必要があります。

プロセスの各ステージに対して以下の構成ファイルをセットアップします。

### ステージ 1: ルートアプリケーション (App of Apps) {#stage-1-root-application-app-of-apps}

ルートアプリケーションは、すべての子アプリケーションを管理する App of Apps コントローラーです。

{{< code-block lang="yaml" filename="argocd/root-app.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: dka-root
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://example.com/YOUR-USERNAME/dka-argocd-example
    targetRevision: HEAD
    path: argocd/apps
  destination:
    server: https://kubernetes.default.svc
    namespace: argocd
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
{{< /code-block >}}

### ステージ 2: Datadog Operator アプリケーション {#stage-2-datadog-operator-application}

この ArgoCD アプリケーションは、Helm を使用して Datadog Operator をデプロイします。これにより、必要な CRD が作成されます。

{{< code-block lang="yaml" filename="argocd/apps/datadog-operator.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: datadog-operator
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "0"
spec:
  project: default
  source:
    repoURL: https://helm.datadoghq.com
    targetRevision: 2.18.1
    chart: datadog-operator
  destination:
    server: https://kubernetes.default.svc
    namespace: datadog
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - ServerSideApply=true
{{< /code-block >}}

### ステージ 3: Datadog Agent アプリケーション {#stage-3-datadog-agent-application}

この ArgoCD アプリケーションは、DatadogAgent カスタムリソースをデプロイします。

{{< code-block lang="yaml" filename="argocd/apps/datadog-agent.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: datadog-agent
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "1"
spec:
  project: default
  source:
    repoURL: https://example.com/YOUR-USERNAME/dka-argocd-example
    targetRevision: HEAD
    path: manifests/stage2-agent
  destination:
    server: https://kubernetes.default.svc
    namespace: datadog
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
{{< /code-block >}}

DatadogAgent カスタムリソースマニフェストを作成します。

{{< code-block lang="yaml" filename="manifests/stage2-agent/datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  features:
    autoscaling:
      workload:
        enabled: true
    eventCollection:
      unbundleEvents: true
  global:
    site: datadoghq.com
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
      appSecret:
        secretName: datadog-secret
        keyName: app-key
    clusterName: minikube-dka-demo
    kubelet:
      tlsVerify: false
  override:
    clusterAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
    nodeAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
{{< /code-block >}}

### ステージ 4: DatadogPodAutoscaler を使用した NGINX アプリケーション {#stage-4-nginx-application-with-datadogpodautoscaler}

この ArgoCD アプリケーションは、Helm チャートを使用して DatadogPodAutoscaler を持つ NGINX ワークロードをデプロイします。

{{< code-block lang="yaml" filename="argocd/apps/nginx-dka-demo.yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: nginx-dka-demo
  namespace: argocd
  annotations:
    argocd.argoproj.io/sync-wave: "2"
spec:
  project: default
  source:
    repoURL: https:/example.com/YOUR-USERNAME/dka-argocd-example
    targetRevision: HEAD
    path: charts/nginx-dka-demo
  destination:
    server: https://kubernetes.default.svc
    namespace: nginx-dka-demo
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
      - CreateNamespace=true
      - RespectIgnoreDifferences=true
  ignoreDifferences:
    - group: apps
      kind: Deployment
      name: nginx
      namespace: nginx-dka-demo
      managedFieldsManagers:
        - datadog-cluster-agent
{{< /code-block >}}

`ignoreDifferences` エントリは `RespectIgnoreDifferences=true` とペアになり、ArgoCD に Datadog Cluster Agent がオートスケールされたワークロードに適用する変更を元に戻さないよう指示します。`managedFieldsManagers` フォームは Kubernetes のサーバーサイド適用フィールド所有権を活用するため、Datadog Cluster Agent が所有する任意のフィールド (レプリカ、`autoscaling.datadoghq.com/` のアノテーション、コンテナリソース) は自動的に保持されます。詳しい理由やグローバル構成の代替案については、[Datadog Cluster Agent がオートスケールされたワークロードを更新することを許可する](#allow-the-datadog-cluster-agent-to-update-autoscaled-workloads)を参照してください。

NGINX アプリケーションの Helm チャートを作成します。

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/Chart.yaml" >}}
apiVersion: v2
name: nginx-dka-demo
description: NGINX demo application with DatadogPodAutoscaler
type: application
version: 0.1.0
appVersion: "1.0"
{{< /code-block >}}

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/values.yaml" >}}
replicaCount: 3

image:
  repository: nginx
  tag: latest
  pullPolicy: IfNotPresent

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

service:
  type: ClusterIP
  port: 80

autoscaler:
  enabled: true
  minReplicas: 3
  maxReplicas: 100
  targetCPUUtilization: 70
  scaleUp:
    rules:
      - type: Percent
        value: 50
        periodSeconds: 120
    stabilizationWindowSeconds: 600
    strategy: Max
  scaleDown:
    rules:
      - type: Percent
        value: 20
        periodSeconds: 1200
    stabilizationWindowSeconds: 600
    strategy: Max
{{< /code-block >}}

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/templates/deployment.yaml" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx
  namespace: nginx-dka-demo
  labels:
    app: nginx
spec:
  replicas: {{ .Values.replicaCount }}
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
        imagePullPolicy: {{ .Values.image.pullPolicy }}
        ports:
        - containerPort: 80
        resources:
          {{- toYaml .Values.resources | nindent 10 }}
---
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
  namespace: nginx-dka-demo
spec:
  selector:
    app: nginx
  ports:
  - port: {{ .Values.service.port }}
    targetPort: 80
  type: {{ .Values.service.type }}
{{< /code-block >}}

{{< code-block lang="yaml" filename="charts/nginx-dka-demo/templates/pod-autoscaler.yaml" >}}
{{- if .Values.autoscaler.enabled }}
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: nginx
  namespace: nginx-dka-demo
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: nginx
  owner: Local
  constraints:
    minReplicas: {{ .Values.autoscaler.minReplicas }}
    maxReplicas: {{ .Values.autoscaler.maxReplicas }}
    containers:
    - name: nginx
      enabled: true
  objectives:
  - type: PodResource
    podResource:
      name: cpu
      value:
        type: Utilization
        utilization: {{ .Values.autoscaler.targetCPUUtilization }}
  applyPolicy:
    mode: Apply
    update:
      strategy: Auto
    scaleUp:
      strategy: {{ .Values.autoscaler.scaleUp.strategy }}
      stabilizationWindowSeconds: {{ .Values.autoscaler.scaleUp.stabilizationWindowSeconds }}
      rules:
      {{- toYaml .Values.autoscaler.scaleUp.rules | nindent 6 }}
    scaleDown:
      strategy: {{ .Values.autoscaler.scaleDown.strategy }}
      stabilizationWindowSeconds: {{ .Values.autoscaler.scaleDown.stabilizationWindowSeconds }}
      rules:
      {{- toYaml .Values.autoscaler.scaleDown.rules | nindent 6 }}
{{- end }}
{{< /code-block >}}

## Datadog Cluster Agent がオートスケールされたワークロードを更新することを許可する {#allow-the-datadog-cluster-agent-to-update-autoscaled-workloads}

`applyPolicy.mode: Apply` が `DatadogPodAutoscaler` に設定されている場合、Datadog Cluster Agent はターゲットワークロードを直接変更します。`spec.replicas`、コンテナリソースを更新し、`autoscaling.datadoghq.com/` プレフィックスの下にアノテーションを書き込み、その推奨事項と適用状態を追跡します。追加の ArgoCD 構成がない場合、ArgoCD はこれらの変更をドリフトと解釈し、`selfHeal: true` が有効な場合、毎回の同期でそれらを元に戻します。これにより、ArgoCD とオートスケーラーの間に競合が発生します。

この競合を防ぐ方法は 2 つあります。

- **アプリケーションごと:** オートスケールされたワークロードを含む各 ArgoCD `Application` に `ignoreDifferences` と `RespectIgnoreDifferences=true` を追加します。これは上記の [ステージ 4](#stage-4-nginx-application-with-datadogpodautoscaler) に示されています。
- **グローバル:**`argocd-cm` を一度構成すれば `ignoreDifferences` ルールがインスタンス内のすべてのアプリケーションに適用されます。

### サポートされているターゲットワークロードの種類 {#supported-target-workload-kinds}

`ignoreDifferences` 構成は、`DatadogPodAutoscaler` が `spec.targetRef` を通じてターゲットにできるすべてのワークロードの種類をカバーする必要があります。

| ワークロードの種類 | API グループ | 注 |
|---|---|---|
| `Deployment` | `apps` | |
| `StatefulSet` | `apps` | |
| `Rollout` | `argoproj.io` | Argo Rollouts も実行している場合にのみ適用 |

### アプリケーションごとの構成 {#per-application-configuration}

クラスター内でサーバー側の適用がアクティブかどうかに応じて、次のバリアントのいずれかを選択します。

#### バリアント 1: `managedFieldsManagers` (推奨) {#variant-1-managedfieldsmanagers-recommended}

`managedFieldsManagers` アプローチは、Datadog Cluster Agent が所有するすべてのフィールド (`spec.replicas`、コンテナリソース、およびすべてのアノテーション) を個別に列挙することなくカバーします。

{{< code-block lang="yaml" >}}
syncPolicy:
  automated:
    prune: true
    selfHeal: true
  syncOptions:
    - RespectIgnoreDifferences=true
ignoreDifferences:
  - group: apps
    kind: Deployment
    managedFieldsManagers:
      - datadog-cluster-agent
  - group: apps
    kind: StatefulSet
    managedFieldsManagers:
      - datadog-cluster-agent
  - group: argoproj.io
    kind: Rollout
    managedFieldsManagers:
      - datadog-cluster-agent
{{< /code-block >}}

これは、上記のステージ 4 の例で使用されるアプローチです。各アプリケーションに存在するワークロードタイプの `kind` エントリのみを含めます。

#### バリアント 2: `jqPathExpressions` (クライアント側の適用で動作) {#variant-2-jqpathexpressions-works-with-client-side-apply}

`jqPathExpressions` アプローチは、`autoscaling.datadoghq.com/` で始まるアノテーションのみを明示的にターゲットにし、クライアント側の適用と互換性があります。`ServerSideApply=true` が現在の環境で利用できない場合は、このバリアントを使用します。

{{< code-block lang="yaml" >}}
syncPolicy:
  automated:
    prune: true
    selfHeal: true
  syncOptions:
    - RespectIgnoreDifferences=true
ignoreDifferences:
  - group: apps
    kind: Deployment
    jqPathExpressions:
      - .metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
      - .spec.template.metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
  - group: apps
    kind: StatefulSet
    jqPathExpressions:
      - .metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
      - .spec.template.metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
  - group: argoproj.io
    kind: Rollout
    jqPathExpressions:
      - .metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
      - .spec.template.metadata.annotations | to_entries[] | select(.key | startswith("autoscaling.datadoghq.com")) | .key
{{< /code-block >}}

**制限:**このバリアントは `autoscaling.datadoghq.com/` アノテーションのみをカバーします。オートスケーラーが `spec.replicas` またはコンテナリソースリクエストを変更する場合は、それらのフィールドに対して別々の `jqPathExpressions` エントリを追加します。バリアント 1 (`managedFieldsManagers`) は、Cluster Agent が所有するすべてのフィールドを自動的にカバーすることでこのギャップを回避します。

### グローバルコンフィギュレーション {#global-configuration}

ArgoCD インスタンス内のすべてのアプリケーションに `ignoreDifferences` を一度適用するには、`resource.customizations.ignoreDifferences.<group>_<kind>` キーを使用して `argocd-cm` ConfigMap を構成します。

#### ConfigMap (kubectl または Kustomize インストール) {#configmap-kubectl-or-kustomize-installs}

{{< code-block lang="yaml" filename="argocd-cm patch" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: argocd-cm
  namespace: argocd
data:
  resource.customizations.ignoreDifferences.apps_Deployment: |
    managedFieldsManagers:
      - datadog-cluster-agent
  resource.customizations.ignoreDifferences.apps_StatefulSet: |
    managedFieldsManagers:
      - datadog-cluster-agent
  resource.customizations.ignoreDifferences.argoproj.io_Rollout: |
    managedFieldsManagers:
      - datadog-cluster-agent
{{< /code-block >}}

#### ArgoCD Helm チャートの値 {#argocd-helm-chart-values}

公式の `argo/argo-cd` Helm チャートを使用して ArgoCD をデプロイするユーザーについては、`configs.cm`の下に同じキーを追加します。

{{< code-block lang="yaml" filename="values.yaml" >}}
configs:
  cm:
    resource.customizations.ignoreDifferences.apps_Deployment: |
      managedFieldsManagers:
        - datadog-cluster-agent
    resource.customizations.ignoreDifferences.apps_StatefulSet: |
      managedFieldsManagers:
        - datadog-cluster-agent
    resource.customizations.ignoreDifferences.argoproj.io_Rollout: |
      managedFieldsManagers:
        - datadog-cluster-agent
{{< /code-block >}}

以下で値を適用します。

{{< code-block lang="bash" >}}
helm upgrade --install argocd argo/argo-cd -f values.yaml -n argocd
{{< /code-block >}}

#### 重要: `RespectIgnoreDifferences` はアプリケーションごとに引き続き必要 {#important-respectignoredifferences-is-still-required-per-application}

<div class="alert alert-warning">
グローバル <code>ignoreDifferences</code> 構成は ArgoCD UI での diff 表示を抑制するだけです。ArgoCD が同期中にそれらのフィールドを上書きするのを防ぐことはありません。オートスケールされたワークロードを含む各アプリケーションは、<strong><code>RespectIgnoreDifferences=true</code> も <code>syncOptions</code></strong>で設定する必要があります。この同期オプションのグローバルな同等物はありません。
</div>

各アプリケーションに個別に `RespectIgnoreDifferences=true` を設定するのを避けるため、プロジェクト内のすべてのアプリケーションがそれを継承するように `AppProject` レベルで定義します。

{{< code-block lang="yaml" >}}
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: default
  namespace: argocd
spec:
  syncPolicy:
    syncOptions:
      - RespectIgnoreDifferences=true
{{< /code-block >}}

または、`ApplicationSet` テンプレートを使用して、すべての生成されたアプリケーションに自動的に同期オプションを追加します。

### 使用するオプション {#which-option-to-use}

- **いくつかのオートスケールされたワークロード**: [アプリケーションごとの構成](#per-application-configuration)を使用します。構成はワークロードと同じ場所に保持されます。
- **多くのワークロードまたは ArgoCD 全体の標準化**: [グローバル構成](#global-configuration)をプロジェクトレベルまたは `ApplicationSet` レベルの `RespectIgnoreDifferences=true` と組み合わせて使用します。
- **混合環境 (すべてのワークロードがオートスケールされているわけではない)**: グローバル構成はインスタンス全体に適用するのが安全です。`managedFieldsManagers` ルールは、Datadog Cluster Agent フィールドの所有権がないワークロードに対しては動作しません。

## デプロイメント手順 {#deployment-instructions}

[構成ファイル](#set-up-configuration-files)を設定して Git リポジトリにプッシュした後、ArgoCD を使用してコンポーネントをデプロイするための手順に従います。

### Datadog シークレットを作成する {#create-datadog-secret}

`datadog` ネームスペースに Datadog API キーとアプリケーションキーを含む Kubernetes シークレットを作成します。

{{< code-block lang="bash" >}}
kubectl create namespace datadog
kubectl create secret generic datadog-secret \
  --from-literal=api-key=YOUR_API_KEY \
  --from-literal=app-key=YOUR_APP_KEY \
  -n datadog
{{< /code-block >}}

### ルートアプリケーションをデプロイする {#deploy-root-application}

App of Apps パターンを使用してすべての子アプリケーションを管理するルートアプリケーションをデプロイします。

{{< code-block lang="bash" >}}
kubectl apply -f argocd/root-app.yaml
{{< /code-block >}}

ArgoCD は現在、Git リポジトリをモニターし、同期ウェーブに基づいてすべてのアプリケーションを正しい順序で自動的にデプロイします。

### Datadog のクラスターでオートスケーリングを有効にする {#enable-autoscaling-on-the-cluster-in-datadog}

Datadog UI の [オートスケーリング設定ページ](https://app.datadoghq.com/orchestration/scaling/settings)に移動して、クラスターのオートスケーリングを有効にします。

### 同期ウェーブの進行状況を確認する {#verify-sync-wave-progression}

ArgoCD アプリケーションが順番に同期することを確認します。

{{< code-block lang="bash" >}}
kubectl get applications -n argocd
{{< /code-block >}}

すべてのアプリケーションが表示され、ウェーブ順に同期することを確認できるはずです。`datadog-operator` (ウェーブ 0)、次に `datadog-agent` (ウェーブ 1)、その後 `nginx-dka-demo` (ウェーブ 2)。

### デプロイメントを検証する {#validate-deployment}

Datadog Operator と CRD がデプロイされていることを確認します。

{{< code-block lang="bash" >}}
kubectl get crd | grep datadoghq
kubectl get pods -n datadog
{{< /code-block >}}

Datadog CRD が作成され、`datadog-operator` Pod が実行されていることを確認できるはずです。

Datadog Agent がデプロイされていることを確認します。

{{< code-block lang="bash" >}}
kubectl get datadogagent -n datadog
{{< /code-block >}}

`Running` 状態で Datadog Agent のカスタムリソースが作成されていることが確認できるはずです。また、Datadog Agent と `datadog-cluster-agent` ポッドが実行中であることも確認します。

{{< code-block lang="bash" >}}
kubectl get pods -n datadog
{{< /code-block >}}

DatadogPodAutoscaler のステータスをチェックします。

{{< code-block lang="bash" >}}
kubectl get datadogpodautoscaler -n nginx-dka-demo
kubectl describe datadogpodautoscaler nginx -n nginx-dka-demo
{{< /code-block >}}

おめでとうございます。GitOps を使用して Datadog Kubernetes Autoscaler によって管理されているワークロードがあります。

## クリーンアップ {#cleanup}

すべてのリソースを削除するには、ルートアプリケーションを削除します。この削除はすべての子アプリケーションに連鎖します。

{{< code-block lang="bash" >}}
kubectl delete application dka-root -n argocd
{{< /code-block >}}

または、アプリケーションを逆の順序で個別に削除します。

{{< code-block lang="bash" >}}
kubectl delete application nginx-dka-demo -n argocd
kubectl delete application datadog-agent -n argocd
kubectl delete application datadog-operator -n argocd
{{< /code-block >}}

Datadog シークレットを削除します。

{{< code-block lang="bash" >}}
kubectl delete secret datadog-secret -n datadog
{{< /code-block >}}

## トラブルシューティング {#troubleshooting}

### ArgoCD の同期障害 {#argocd-sync-failures}

アプリケーションステータスと同期エラーをチェックします。

{{< code-block lang="bash" >}}
kubectl describe application datadog-operator -n argocd
kubectl describe application datadog-agent -n argocd
kubectl describe application nginx-dka-demo -n argocd
{{< /code-block >}}

ArgoCD アプリケーションコントローラーのログを表示します。

{{< code-block lang="bash" >}}
kubectl logs -n argocd -l app.kubernetes.io/name=argocd-application-controller
{{< /code-block >}}

### CRD の可用性の問題 {#crd-availability-issues}

ArgoCD が CRD を認識できずに同期に失敗した場合、ウェーブ 0で Datadog Operator が正常にデプロイされていることを確認します。

{{< code-block lang="bash" >}}
kubectl get crd | grep datadoghq
kubectl get pods -n datadog
{{< /code-block >}}

同期ウェーブのアノテーションは適切な順序を保証しますが、アプリケーションを手動で更新することもできます。

{{< code-block lang="bash" >}}
argocd app sync datadog-agent
{{< /code-block >}}

### シークレットの構成に関する問題 {#secret-configuration-problems}

Datadog のシークレットが存在し、正しいキーを含んでいることを確認します。

{{< code-block lang="bash" >}}
kubectl get secret datadog-secret -n datadog
kubectl describe secret datadog-secret -n datadog
{{< /code-block >}}

シークレットには `api-key` と `app-key` のフィールドが含まれている必要があります。

### DatadogPodAutoscaler イベント {#datadogpodautoscaler-events}

スケーリングの決定やエラーについては DatadogPodAutoscaler イベントをチェックします。

{{< code-block lang="bash" >}}
kubectl get events -n nginx-dka-demo --sort-by='.lastTimestamp'
{{< /code-block >}}

### オートスケールされたワークロードが繰り返し元に戻す {#autoscaled-workload-keeps-reverting}

`selfHeal: true` が有効な場合、ArgoCD は約 3 分ごとに同期します。オートスケールされたワークロードの `spec.replicas` または `autoscaling.datadoghq.com/` のアノテーションが繰り返しリセットされる場合、次のいずれかを確認します。

1. **`RespectIgnoreDifferences=true` はアプリケーションの `syncOptions` から欠落しています**。このフラグがないと、ArgoCD は UI でのドリフトを隠すだけで、適用中にフィールドを上書きします。
2. **この `ignoreDifferences` エントリはワークロードと一致しません。**`group`、`kind`、`name`、および `namespace` がエントリ内でターゲットワークロードと正確に一致していることを確認します。
3. **`ServerSideApply=true`は、`managedFieldsManagers` を使用している場合には設定されていません**。サーバー側の適用がない場合、Kubernetes はフィールド所有権データベースを更新しないため、マネージャー名を一致させることができません。

サーバー側の適用がアクティブかどうか、また特定のフィールドを所有しているマネージャーを確認するには、次のコマンドを実行します。

{{< code-block lang="bash" >}}
kubectl get deployment <name> -n <namespace> -o yaml --show-managed-fields
{{< /code-block >}}

`manager: datadog-cluster-agent` と `operation: Apply` があるエントリを探します。そのリソースに対してそのようなエントリが存在しない場合、サーバー側の適用はアクティブではありません。

### Cluster Agent のログ {#cluster-agent-logs}

Cluster Agent のログでオートスケーリングに関連するメッセージをチェックします。

{{< code-block lang="bash" >}}
kubectl logs -n datadog -l agent.datadoghq.com/component=cluster-agent
{{< /code-block >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/containers/monitoring/autoscaling/
[2]: /ja/containers/monitoring/autoscaling/#cluster-profiles