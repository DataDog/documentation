---
aliases:
- /ja/containers/monitoring/autoscaling
cascade:
  site_support_id: containers_autoscaling
description: Datadog のメトリクスとインテリジェントなスケーリング推奨事項を使用して、Kubernetes ワークロードを自動的にスケールできます。
further_reading:
- link: /infrastructure/containers/kubernetes_resource_utilization
  tag: ドキュメント
  text: Kubernetes のリソース使用状況
- link: /account_management/rbac/permissions
  tag: ドキュメント
  text: Datadog のロール権限
- link: /agent/remote_config/
  tag: ドキュメント
  text: Remote Configuration
- link: https://www.datadoghq.com/blog/autoscaling-custom-metrics
  tag: ブログ
  text: カスタムメトリクスによる Kubernetes ワークロードのスケーリング
- link: https://www.datadoghq.com/blog/kubernetes-custom-query-autoscaling
  tag: ブログ
  text: カスタムクエリのスケーリングによる Kubernetes ワークロードの最適化
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: ブログ
  text: DDOT ゲートウェイを使用した OpenTelemetry パイプラインの一元化と管理
- link: https://www.datadoghq.com/blog/datadog-kubernetes-autoscaling/
  tag: ブログ
  text: Datadog Kubernetes Autoscaling によるワークロードのサイズ適正化とコスト削減
- link: https://www.datadoghq.com/architecture/kubernetes-workload-autoscaling-with-datadog/
  tag: アーキテクチャセンター
  text: Datadog による Kubernetes ワークロードの自動スケーリング
title: Kubernetes Autoscaling
---
Datadog Kubernetes Autoscaling は、Kubernetes リソースを継続的に監視し、即時のスケーリング推奨事項を提供するとともに、Kubernetes ワークロードの多次元自動スケーリングに対応します。オーとスケーリングをデプロイするには、Datadog ウェブインターフェースまたは `DatadogPodAutoscaler` カスタムリソースを使用できます。

## 仕組み {#how-it-works}
Datadog では、既存の Datadog Agent からのリアルタイムおよび履歴の利用状況メトリクスとイベントシグナルを使用して推奨事項を作成します。これらの推奨事項を確認し、デプロイするかどうかを選択できます。

デフォルトでは、Datadog Kubernetes Autoscaling は CPU およびメモリコストの推定値を使用して、節約の機会と推定される効果を示します。また、[Cloud Cost Management](#idle-cost-and-savings-estimates) とともに Kubernetes Autoscaling を使用して、正確なインスタンスタイプのコストに基づくレポートを取得することもできます。

自動化されたワークロードのスケーリングには、ワークロードごとにスケーリング動作を定義する `DatadogPodAutoscaler` カスタムリソースが活用されます。Datadog Cluster Agent は、このカスタムリソースのコントローラーとして機能します。

**注:** 各クラスターで、Datadog Kubernetes Autoscaling を使用して最大 1,000 個のワークロードを最適化できます。

### 互換性 {#compatibility}

- **ディストリビューション**: この機能には、Datadog が [サポートするすべての Kubernetes ディストリビューション][5] との互換性があります。
- **ワークロード自動スケーリング**: この機能は、Horizontal Pod Autoscaler (HPA) および Vertical Pod Autoscaler (VPA) の代替手段となります。Datadog Kubernetes Autoscaling を有効にしてワークロードを最適化する場合、Datadog ではそのワークロードから既存の HPA や VPA を削除することを推奨しています。これらのワークロードは、アプリケーション内で自動的に識別されます。
**注:** `DatadogPodAutoscaler` セクションの `mode: Preview` を使用して `applyPolicy`を作成すると、HPA や VPA を維持したまま Datadog Kubernetes Autoscaling を試すことができます。

### 要件 {#requirements}

- 組織レベルとターゲットクラスター内の Agent の両方で、[Remote Configuration][1] を有効にする必要があります。セットアップ手順については、[Remote Configuration の有効化][2] を参照してください。
- [Helm][3] (Datadog Agent を更新するために使用)。
- (Datadog Operator ユーザーの場合) [`kubectl` CLI][4] (Datadog Agent を更新するために使用)。
- ライブ自動スケーリングを使用する場合、Datadog では最新の Datadog Agent バージョンを使用することを推奨しています。これにより、最新の改善や最適化を利用できるようになります。スケーリングの推奨事項を利用するには、[Kubernetes State Core][9] インテグレーションを有効にする必要があります。<br/><br/>

   | 機能 | Agent の最小バージョン |
   |---------|----------------------|
   | アプリ内ワークロードスケーリングの推奨事項 | 7.50 以降 |
   | ライブワークロードスケーリング | 7.66.1 以降 |
   | Argo Rollout の推奨事項と自動スケーリング | 7.71 以降 |
   | クラスターの自動スケーリング ([プレビュー登録][10]) | 7.72 以降 |
   | インプレース垂直 Pod リサイズ (オプトイン) | 7.78 以降 |
   | クラスタープロファイルの有効化、ワークロードラベル | 7.78 以降 |
   | クラスタープロファイルの有効化、ネームスペースラベル | 7.79 以降 |

- 次のユーザー権限:
   - 組織管理 (Remote Configuration に必要)
   - API キーの書き込み (Remote Configuration に必要)
   - ワークロードスケーリングの書き込み
   - 自動スケーリングの管理
- (推奨) Linux カーネル v5.19 以降および cgroup v2

## セットアップ {#setup}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Datadog Operator v1.16.0 以降を使用していることを確認してください。Datadog Operator をアップグレードするには:

```shell
helm upgrade datadog-operator datadog/datadog-operator
```

2. `datadog-agent.yaml` 設定ファイルに次の要素を追加します。

```yaml
spec:
  features:
    autoscaling:
      workload:
        enabled: true
    eventCollection:
      unbundleEvents: true
  override:
    clusterAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
    nodeAgent:
      env:
        - name: DD_AUTOSCALING_FAILOVER_ENABLED
          value: "true"
```

3. [Admission Controller][1] は、Datadog Operator でデフォルトで有効にされます。無効にしている場合は、次の強調表示された行を `datadog-agent.yaml` に追加して再度有効にしてください。

{{< highlight yaml "hl_lines=4-5" >}}
...
spec:
  features:
    admissionController:
      enabled: true
...
{{< /highlight >}}

4. 更新後の `datadog-agent.yaml` の設定を適用します。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

[1]: /ja/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{% tab "Helm" %}}

1. Agent および Cluster Agent v7.66.1 以降を使用していることを確認してください。`datadog-values.yaml` 設定ファイルに次の要素を追加します。

```yaml
datadog:
  autoscaling:
    workload:
      enabled: true
  kubernetesEvents:
    unbundleEvents: true
```

2. [Admission Controller][1] は、Datadog Helm チャートでデフォルトで有効にされます。無効にしている場合は、次の強調表示された行を `datadog-values.yaml` に追加して再度有効にしてください。
{{< highlight yaml "hl_lines=5-6" >}}
...
clusterAgent:
  admissionController:
    enabled: true
...
{{< /highlight >}}

3. Helm バージョンを更新します。

```shell
helm repo update
```

4. 更新後の `datadog-values.yaml` を使用して Datadog Agent を再デプロイします。

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

[1]: /ja/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{< /tabs >}}

### アイドルコストと節約額の推定値 {#idle-cost-and-savings-estimates}

{{< tabs >}}
{{% tab "Cloud Cost Management を使用する場合" %}}
組織内で [Cloud Cost Management][1] が有効になっている場合、Datadog Kubernetes Autoscaling は監視対象の基盤となるインスタンスの実際の請求額に基づいて、アイドルコストと節約額の推定値を示します。

[AWS][2]、[Azure][3]、または [Google Cloud][4] での Cloud Cost 設定手順を参照してください。

Cloud Cost Management のデータは Kubernetes Autoscaling を強化しますが、必須ではありません。Datadog によるワークロード推奨事項と自動スケーリングの決定のすべては、Cloud Cost Management を使用しなくても有効であり、機能します。

[1]: /ja/cloud_cost_management
[2]: /ja/cloud_cost_management/aws
[3]: /ja/cloud_cost_management/azure
[4]: /ja/cloud_cost_management/google_cloud
{{% /tab %}}

{{% tab "デフォルト" %}}
Cloud Cost Management が**有効になっていない**場合、Datadog Kubernetes Autoscaling は、以下の計算式と固定値を使用して、アイドルコストと節約額の推定値を示します。

**クラスターのアイドル状態**:

```
  (cpu_capacity - max(cpu_usage, cpu_requests)) * core_rate_per_hour
+ (mem_capacity - max(mem_usage, mem_requests)) * memory_rate_per_hour
```

**ワークロードのアイドル状態**:

```
  (max(cpu_usage, cpu_requests) - cpu_usage) * core_rate_per_hour
+ (max(mem_usage, mem_requests) - mem_usage) * memory_rate_per_hour
```

**固定値**:
- core_rate_per_hour = CPU コアあたり $0.0295/時間
- memory rate_per_hour = メモリ GB あたり $0.0053/時間


_コストの固定値は、時間の経過とともに調整される場合があります。_
{{% /tab %}}
{{< /tabs >}}

## 使用量 {#usage}

### サイズを適正化すべきリソースを識別する{#identify-resources-to-rightsize}

プラットフォームチームが組織全体で Kubernetes リソースを節約する機会を把握し、主要なクラスターや名前空間に焦点を絞り込むには、[Autoscaling Summary ページ][6] が出発点となります。

[Setup ページ][11] には、スケーリング対象の複数のワークロードを選択し、最適化を一括で管理するためのオプションが用意されています。

[Cluster Scaling ビュー][7] には、クラスターごとのアイドル CPU の合計、アイドルメモリの合計、およびコストに関する情報が提示されます。

クラスターをクリックすると、詳細情報と、推定節約額でソートされたクラスターのワークロードのテーブルが表示されます。個々のアプリケーションまたはサービスの所有者は、[Workload Scaling リストビュー][8] から直接、チーム名またはサービス名でフィルタリングすることもできます。

これらのビューのいずれかで、ワークロードの {{< ui >}}Optimize{{< /ui >}} をクリックしてスケーリングの推奨事項を確認してから、[ワークロード自動スケーリングの有効化](#enable-autoscaling-for-a-workload)に進みます。

### ワークロード自動スケーリングの有効化 {#enable-autoscaling-for-a-workload}

最適化するワークロードを特定したら、その {{< ui >}}Scaling Recommendation{{< /ui >}} を確認します。有効化する前に、{{< ui >}}Configure Recommendation{{< /ui >}} をクリックして、制約を追加するか、目標の使用率レベルを調整します。

ワークロード自動スケーリングを有効にするには 3 つの方法があります。現在ワークロードをデプロイしている方法と一致するパスを選択してください。

| パス | 最適な用途 | 開始場所 | 継続的な管理 |
|------|----------|-----------------|--------------------|
| **A. Datadog UI セットアップウィザード** | 迅速に開始し、即時の視覚的フィードバックを得ながら設定を反復します。または、アプリケーションチームがより適切なスケーリング構成の決定を行えるよう支援します | Datadog UI の [Setup ページ][11] | UI またはクラスターからワークロードの `DatadogPodAutoscaler` を編集します |
| **B. `DatadogPodAutoscaler`マニフェストを作成する** | Kubernetes マニフェストをデプロイするための既存のワークフロー (`kubectl`、Helm、ArgoCD、Terraform、またはその他の GitOps ツール) | 既存のツールで適用される手書きの YAML またはテンプレート化された YAML | マニフェストを編集し、同じツールを使用して再適用します |
| **C. [クラスター プロファイル ](#cluster-profiles) ラベルを適用する** | 単一の共有ポリシーを使用して多数のワークロードまたは名前空間にわたって自動スケーリングを有効にします | ワークロードまたは名前空間に適用するラベル `autoscaling.datadoghq.com/profile` | プロファイルを編集して管理対象のすべてのワークロードを更新するか、ラベルを変更してプロファイル間でワークロードを移動します |

#### パス A: Datadog UI {#path-a-datadog-ui}

最も迅速に開始する方法は、Datadog UI の [Setup ページ][11] を使用することです。ウィザードが、クラスターの選択、Agent と権限の要件の確認、インストール方法の選択、スケーリングテンプレートの選択、デプロイという 5 つのステップを順を追って案内します。ウィザードで利用可能なテンプレート:

- **コストの最適化**: 高い CPU 使用率の目標、積極的なスケールダウン、最小限のレプリカ下限数。ステートレスでコスト重視のワークロードに最適です。
- **バランスの最適化**: 中程度の使用率の目標、高速スケールアップ、バランスの取れたスケールダウン。ほとんどのステートレスワークロードに最適です。
- **パフォーマンスの最適化**: 保守的な使用率の目標、高速スケールアップ、緩やかなスケールダウン、高めのレプリカ下限数。ステートフルなサービスや重要なサービスに最適です。
- **カスタマイズ**: 上記のいずれかから開始し、CPU の目標、レプリカ数、安定化の時間枠を自分で調整します。

単一のワークロードで自動スケーリングを試す場合、推奨設定を実際に適用する場合、または少数のワークロードをオンボーディングする場合には、Setup ウィザードが最適です。(`Workload Scaling Write` 権限と `Autoscaling Manage` 権限が必要です。)

#### パス B: GitOps {#path-b-gitops}

ワークロードをターゲットとする `DatadogPodAutoscaler` カスタムリソースを定義し、Kubernetes マニフェストのデプロイにすでに使用しているツール (`kubectl apply`、Helm、ArgoCD、Terraform、またはその他の GitOps ツールなど) を使用して、そのリソースを適用します。マニフェストの作成方法は、配信メカニズムに関係なく同じです。コスト最適化、バランスの取れたスケーリング、垂直方向のみのリサイズ、カスタムクエリによる水平スケーリングに対応する、すぐに編集できる開始点については、以下の[設定例](#example-datadogpodautoscaler-configurations)を参照してください。

ツール固有のガイドについては、以下を参照してください。

- [ArgoCD で DatadogPodAutoscaler を管理する][12]
- [Terraform で DatadogPodAutoscaler を管理する][13]

### DatadogPodAutoscaler の設定例 {#example-datadogpodautoscaler-configurations}

以下の例は、さまざまなスケーリング戦略における一般的な `DatadogPodAutoscaler` 設定を示しています。これらを開始点として使用し、ワークロードの要件に合わせて値を調整してください。UI でテンプレートを選択する方法を選ぶ場合は、上記の[パス A](#path-a-datadog-ui-setup-wizard) に従ってください。

{{< tabs >}}
{{% tab "コストの最適化" %}}

コントローラーが負荷の低下に応じて迅速に容量を削除する必要がある、ステートレスでコストに敏感なワークロードには、このテンプレートを選択してください。高く設定された CPU 使用率の目標 (85%) と、積極的なスケールダウンルール、および最小レプリカ数 1 の組み合わせを特徴としています。

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                # Aggressive: allow 50% reduction every 2 minutes
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 300
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 190
        update:
            strategy: Auto
    constraints:
        maxReplicas: 100
        # Allow scaling down to 1 replica for maximum savings
        minReplicas: 1
    objectives:
        # High utilization target to maximize cost efficiency
        - type: PodResource
          podResource:
            name: cpu
            value:
                type: Utilization
                utilization: 85
```

{{% /tab %}}
{{% tab "バランスの最適化" %}}

可用性を犠牲にせずにコスト削減を実現したい場合は、このテンプレートを選択してください。これは、ほとんどのステートレスワークロードに妥当なデフォルト設定です。中程度に設定された CPU 使用率の目標 (70%) と、保守的なスケールダウン、および最小レプリカ数 2 の組み合わせを特徴としています。コントローラーは容量を迅速に追加しますが、削除はゆっくりと行います。

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                # Conservative: allow only 20% reduction every 20 minutes
                - periodSeconds: 1200
                  type: Percent
                  value: 20
            stabilizationWindowSeconds: 600
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 130
        update:
            strategy: Auto
    constraints:
        maxReplicas: 100
        # Maintain at least 2 replicas for availability
        minReplicas: 2
    objectives:
        # Moderate utilization target balances cost and performance
        - type: PodResource
          podResource:
            name: cpu
            value:
                type: Utilization
                utilization: 70
```

{{% /tab %}}
{{% tab "CPU およびメモリの垂直リサイズ" %}}

ワークロードを水平方向にスケールできない場合や、レプリカ数を変更せずに純粋なサイズ適正化を行う場合は、このテンプレートを選択してください。一般的なケースとしては、シングルトンサービス、ステートフルなワークロード、リーダー選出コンポーネントなどが挙げられます。`scaleDown.strategy: Disabled` と `scaleUp.strategy: Disabled` の設定を特徴としています。つまり、`update.strategy: Auto` のみが有効にされて、CPU とメモリの推奨事項が適用されます。

デフォルトでは、コントローラーはロールアウト (Pod の退避と再作成) をトリガーすることで垂直方向の推奨事項を適用します。Cluster Agent **7.78 以降**は **インプレース Pod リサイズ**もサポートしており、Pod を再起動せずに CPU とメモリのリクエストおよび制限を更新します。インプレースリサイズはオプトインであり、これを使用するには Cluster Agent で `autoscaling.workload.in_place_vertical_scaling.enabled: true` を設定 (または環境変数 `DD_AUTOSCALING_WORKLOAD_IN_PLACE_VERTICAL_SCALING_ENABLED=true` を設定) する必要があります。

クラスターが `pods/resize` サブリソースを公開している必要もあります。これは、`InPlacePodVerticalScaling` フィーチャーゲートがベータ版となっている Kubernetes 1.33 以降のデフォルトです。Kubernetes 1.27 から 1.32 では、`kube-apiserver` とすべての `kubelet` でフィーチャーゲートを有効にする必要があります。

両方の前提条件が満たされている場合:

- **デフォルト**: `applyPolicy.update.strategy: Auto` (デフォルト) が設定されているワークロードはインプレースでリサイズされます。
- **フォールバック**: kubelet がリサイズを `Infeasible` として報告した場合、コントローラーはロールアウトにフォールバックします。
- **オプトアウト**: クラスターの設定に関係なく、ワークロードで常にロールアウトベースの垂直スケーリングを使用するように強制するには、その `applyPolicy.update.strategy: TriggerRollout` として`DatadogPodAutoscaler` を設定します。

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        # Horizontal scaling disabled; only vertical resizing
        scaleDown:
            strategy: Disabled
        scaleUp:
            strategy: Disabled
        update:
            strategy: Auto
    constraints:
        maxReplicas: 100
```

{{% /tab %}}
{{% tab "水平カスタムクエリ" %}}

CPU やメモリが適切なスケーリングシグナルではない場合は、このテンプレートを選択してください。該当する例としては、バックログの深さに基づいてスケールする必要があるキューワーカーや、リクエストのレイテンシに基づいてスケールする必要がある API サービスが挙げられます。`objectives` ブロックの設定で、Datadog メトリクスクエリと、使用率のパーセンテージではなく `AbsoluteValue` の目標を参照することを特徴としています。サンプルクエリを、実際のワークロードに一致するクエリに置き換えてください。

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
    name: <WORKLOAD_NAME>
    namespace: <NAMESPACE>
spec:
    targetRef:
        apiVersion: apps/v1
        kind: Deployment
        name: <WORKLOAD_NAME>
    owner: Local
    applyPolicy:
        mode: Apply
        scaleDown:
            rules:
                - periodSeconds: 1200
                  type: Percent
                  value: 20
            stabilizationWindowSeconds: 600
        scaleUp:
            rules:
                - periodSeconds: 120
                  type: Percent
                  value: 50
            stabilizationWindowSeconds: 130
        # Vertical updates disabled — horizontal only
        update:
            strategy: Disabled
    constraints:
        maxReplicas: 100
        minReplicas: 2
    objectives:
        - type: CustomQuery
          customQuery:
            # Replace with your own Datadog metric query
            request:
                formula: usage
                queries:
                    - name: usage
                      source: Metrics
                      metrics:
                        query: avg:redis.info.latency_ms{kube_cluster_name:<CLUSTER_NAME>,kube_namespace:<NAMESPACE>,kube_deployment:<WORKLOAD_NAME>}
            value:
                type: AbsoluteValue
                absoluteValue: 500M
            window: 5m0s
    fallback:
        horizontal:
            # With custom queries, local fallback is not activated by default
            enabled: false
            # Direction can be ScaleUp, ScaleDown or All
            direction: ScaleUp
            # When using custom queries, a CPU or Memory fallback objective is required
            objectives:
                - type: PodResource
                  podResource:
                    name: cpu
                    value:
                        type: Utilization
                        utilization: 70
            triggers:
                staleRecommendationThresholdSeconds: 600
```

{{% /tab %}}
{{< /tabs >}}

### クラスタープロファイル {#cluster-profiles}

`DatadogPodAutoscalerClusterProfile` は、`DatadogPodAutoscaler` テンプレートを保持する、クラスターをスコープとするリソースです。Cluster Agent は `Deployment` および `StatefulSet` リソースで (および 7.79 以降では、これらのリソースを含む名前空間で) `autoscaling.datadoghq.com/profile` ラベルを監視し、一致するすべてのワークロードについてマネージド `DatadogPodAutoscaler` を作成します。1 つのプロファイルが多数のワークロードに適用されますが、各ワークロードがマッピングされる `DatadogPodAutoscaler` は 1 つのみです。

クラスタープロファイルとワークロードレベルのラベルを使用するには、Datadog Cluster Agent 7.78.0 以降が必要です。名前空間レベルで有効化する (名前空間にラベルを付けて、その名前空間内でサポートされているすべてのワークロードをプロファイルにオプトインさせる) には、Datadog Cluster Agent 7.79.0 以降が必要です。古い Cluster Agent はプロファイルラベルを無視します。

#### 組み込みプロファイル {#built-in-profiles}

Cluster Agent には 3 つの組み込みプロファイルが付属しており、Agent が起動時にこれらのプロファイルを再作成します。したがって、プロファイルを使用するために CRD YAML をコミットする必要はありません。これらのプロファイル名は予約されています。

| プロファイル| CPU 使用率の目標| 最小レプリカ数| 動作のプロファイル|
|---|---|---|---|
| `datadog-optimize-cost` | 85% | 1 | 高い CPU 使用率の目標、積極的なスケールダウン、最小限のレプリカ下限数。ステートレスでコスト重視のワークロードに最適です。|
| `datadog-optimize-balance` | 70% | 2 | 中程度の使用率の目標、高速スケールアップ、バランスの取れたスケールダウン。ほとんどのステートレスワークロードに最適です。|
| `datadog-optimize-performance` | 60% | 3 | 保守的な使用率の目標、高速スケールアップ、穏やかなスケールダウン、高めのレプリカ下限値。ステートフルなサービスや重要なサービスに最適です。|

単一のワークロードでプロファイルを有効にするには、ワークロードの `metadata.labels` にラベルを追加します。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  namespace: production
  labels:
    autoscaling.datadoghq.com/profile: datadog-optimize-balance
spec:
  # ...rest of the Deployment spec
```

名前空間内のサポートされているすべてのワークロードでプロファイルを有効にするには、代わりに名前空間にラベルを付けます (Cluster Agent 7.79.0 以降が必要です)。

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    autoscaling.datadoghq.com/profile: datadog-optimize-balance
```

#### カスタムプロファイル {#custom-profiles}

組み込みのプロファイルがスケーリングポリシーと一致しない場合は、`DatadogPodAutoscalerClusterProfile` を作成します。プロファイルのスコープはクラスターに設定されるため、`--namespace` フラグなしで適用します (または、設定リポジトリのクラスターレベルのレイヤーに配置します)。

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscalerClusterProfile
metadata:
  name: cost-optimized-strict-floor
spec:
  template:
    applyPolicy:
      mode: Apply
      scaleUp:
        stabilizationWindowSeconds: 190
        rules:
          - type: Percent
            value: 50
            periodSeconds: 120
      scaleDown:
        stabilizationWindowSeconds: 300
        rules:
          - type: Percent
            value: 50
            periodSeconds: 120
    constraints:
      minReplicas: 1
    objectives:
      - type: PodResource
        podResource:
          name: cpu
          value:
            type: Utilization
            utilization: 85
```

同じラベルを使用して、ワークロードまたは名前空間からカスタムプロファイルを参照します。

```yaml
metadata:
  labels:
    autoscaling.datadoghq.com/profile: cost-optimized-strict-floor
```

テンプレート本体は `DatadogPodAutoscaler` 仕様と同じフィールドを受け入れますが、`targetRef`は除外されます (これは、Cluster Agent が一致する各ワークロードに取り込みます)。`spec.template` 内に配置できるフィールドの全範囲については、上記の[設定例](#example-datadogpodautoscaler-configurations)を参照してください。

#### 有効化の優先順位 {#activation-precedence}

Cluster Agent 7.79.0 以降では、名前空間レベルの有効化、`excluded` のオプトアウト、およびそれらの間の優先順位ルールが追加されています。Cluster Agent 7.78.0 では、ワークロードレベルのラベルのみが読み取られます。名前空間や`excluded`の値に関連する次のルールは適用されません。

- **ワークロードラベルは名前空間ラベルよりも優先されます。**名前空間に `autoscaling.datadoghq.com/profile=ns-profile` のラベルが付けられ、その名前空間内のワークロードに `autoscaling.datadoghq.com/profile=workload-profile` のラベルが付けられている場合、ワークロードは `workload-profile` を使用します。
- **`excluded` でオプトアウトします。**ラベルが付けられた名前空間内にある特定のワークロードを除外するには、そのワークロードに `autoscaling.datadoghq.com/profile: excluded` を設定します。これは、オプトインされた名前空間内にあるステートフルなワークロードや重要なワークロードに役立ちます。

  ```yaml
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: payments-ledger
    namespace: production
    labels:
      autoscaling.datadoghq.com/profile: excluded
  ```

- **不明なプロファイル名は無視されます。**存在しないプロファイルがワークロードや名前空間で参照されている場合、Cluster Agent はマネージド `DatadogPodAutoscaler` を作成せず、エラーも報告しません。その名前のプロファイルが作成されるとすぐに、調整プロセスによって割り当てが反映されます。
- **調整は自動的に行われます。**ラベルの追加、変更、または削除は、数秒以内にマネージド `DatadogPodAutoscaler` に反映されます。

#### サポートされているワークロードの種類 {#supported-workload-kinds}

プロファイルの有効化では、`Deployment` と `StatefulSet` をサポートしています。その他の種類 (例: Argo `Rollout`) については、[パス B: GitOps](#path-b-gitops) に従って `DatadogPodAutoscaler` を直接作成してください。

### 推奨事項を手動でデプロイする {#deploy-recommendations-manually}

自動スケーリングを有効にせずに Datadog の推奨事項を確認する必要がある場合、それらを 1 回に限って手動で適用できます。Kubernetes デプロイメントのリソースを設定する際は、スケーリングの推奨事項で提案された値を使用してください。{{< ui >}}Export Recommendation{{< /ui >}} をクリックして、生成された `kubectl patch` コマンドを表示することもできます。Datadog は推奨事項を継続的に更新しますが、クラスターが変更されるのは、推奨事項を再適用した場合のみです。

## ワークロードを大規模に管理する {#manage-workloads-at-scale}

ワークロードが自動的にスケールされた後、2 日目以降の運用は、`DatadogPodAutoscaler` リソースと Datadog UI の組み合わせによって管理されます。

- **スケーリングテンプレートを変更します。**ワークロードの `DatadogPodAutoscaler` 仕様 (CPU の目標、レプリカ数の上下限、スケールアップおよびスケールダウンのルール) を直接編集するか、[Workload Scaling リストビュー][8] で別のテンプレートを選択します。変更は次回の調整時に有効になります。
- **リソースを削除せずに自動スケーリングを一時停止します。**`applyPolicy.mode: Preview` を設定すると、コントローラーによる適用を防ぎながら、`.status`で推奨事項を表示し続けることができます。これは、評価中に HPA や VPA と並行して実行する場合に便利です。
- **ロールアウトを監視します。**[Workload Scaling リストビュー] には、各ワークロードの推奨事項、最後に適用されたアクション、および調整エラーのライブステータスが表示されます。
- **自動スケーリングをクリーンに削除します。**`DatadogPodAutoscaler`リソースを削除して、自動スケーリングを停止します。既存の Pod リソースは最後に適用された値のままとなり、ワークロードは次のロールアウト時に親コントローラー (Deployment、StatefulSet など) で指定された値に戻ります。

## リファレンス {#reference}

### 垂直方向の推奨値の計算方法{#how-vertical-recommendations-are-calculated}

Datadog は、過去 8 日間のコンテナ使用履歴データを分析することで、CPU とメモリの垂直スケーリングの推奨値を計算します。各リソースに使用される手法は、そのリソースのリクエストが制限と等しいかどうかによって異なり、[Kubernetes Quality of Service (QoS) クラス][14] の概念を反映しています。CPU とメモリは個別に評価されます。ワークロードでは、CPU には「バースト可能 (Burstable)」手法、メモリには「保証済み (Guaranteed)」手法 (またはその逆) を使用することができます。

#### メモリの推奨値 {#memory-recommendations}

**Burstable** (メモリリクエストがメモリ制限より低い場合):

| | 計算方法|
|---|---|
| **リクエストの推奨値** | 過去 8 日間のメモリ使用量の**p95**に基づきます。古いサンプルには減衰重みが適用されるため、最近の使用パターンが優先されます。その上で、**10% の安全マージン**が追加されます。|
| **制限の推奨値** | 過去 8 日間に観測された**最大ピークメモリ使用量**に基づきます。その上で、**5% の安全マージン**が追加されます。|

**Guaranteed** (メモリリクエストがメモリ制限と等しい場合):

| | 計算方法|
|---|---|
| **リクエストと制限の推奨値** | 過去 8 日間に観測された**最大ピークメモリ使用量**に基づきます。**5% の安全マージン**が追加されます。**OOMKill** が検出された場合、将来のメモリ不足イベントを防ぐために、さらに **20% の引き上げ**が適用されます。|

**注:** ピークメモリトラッキングは、8 日間のルックバックウィンドウ内に存在したすべてのコンテナによって記録された過去最大のメモリ使用量をキャプチャします。つまり、コンテナがそのウィンドウより前に開始された場合でも、そのピーク使用量 (起動時など) は推奨値に考慮されます。

#### CPU の推奨値 {#cpu-recommendations}

**Burstable** (CPU リクエストが CPU 制限より低い場合):

| | 計算方法|
|---|---|
| **リクエストの推奨値** | 現在のリクエストに対する過去 8 日間の CPU 使用量の **p90** に基づきます。古いサンプルには減衰重みが適用されるため、最近の使用パターンが優先されます。その上で、**10% の安全マージン**が追加されます。|
| **制限の推奨値** | 現在のリクエストに対する過去 8 日間の CPU 使用量の **p95** に基づきます。その上で、**5% の安全マージン**が追加されます。結果として得られたリクエストの推奨値が制限の推奨値を超えた場合は、両方にリクエストの値が使用されます。|

**Guaranteed** (CPU リクエストが CPU 制限と等しい場合):

| | 計算方法|
|---|---|
| **リクエストと制限の推奨値** | 現在のリクエストに対する過去 8 日間の CPU 使用量の **p95** に基づきます。その上で、**5% の安全マージン**が追加されます。|

#### 主要な設計原則 {#key-design-principles}

- **8 日間のルックバックウィンドウ**: すべての推奨事項は過去 8 日間の使用データを考慮しており、週単位のトラフィックパターンを把握するのに十分な履歴を提供しつつ、変化に対して迅速に対応します。
- **減衰重み付け**: Burstable クラスのリクエスト推奨値 (CPU またはメモリ) では、古いサンプルほど重みが小さくなるため、最近の使用パターンの変化に推奨値がより迅速に適応します。
- **安全マージン**: すべての推奨事項には、予期しないスパイクに対するバッファとして、観測された使用量に一定の余裕 (5〜10%) が設けられています。
- **OOMKill への対応**: メモリが Guaranteed クラス (リクエストと制限が等しい) である場合、OOMKill が発生すると、メモリ不足による障害の再発を減らすために 20% の引き上げが適用されます。
- **Guaranteed クラスの維持**: リソースのリクエストと制限が等しい場合、Datadog は両方に対してより保守的な (制限レベルの) 計算を使用し、リクエストと制限の間にギャップが生じないようにします。

## 参考文献 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/remote_config
[2]: /ja/agent/remote_config/?tab=configurationyamlfile#enable-remote-configuration
[3]: https://helm.sh/
[4]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[5]: /ja/containers/kubernetes/distributions
[6]: https://app.datadoghq.com/orchestration/scaling/summary
[7]: https://app.datadoghq.com/orchestration/scaling/cluster
[8]: https://app.datadoghq.com/orchestration/scaling/workload
[9]: /ja/integrations/kubernetes_state_core/
[10]: https://www.datadoghq.com/product-preview/kubernetes-cluster-autoscaling/
[11]: https://app.datadoghq.com/orchestration/scaling/setup
[12]: /ja/containers/guide/manage-datadogpodautoscaler-with-argocd/
[13]: /ja/containers/guide/manage-datdadogpodautoscaler-with-terraform/
[14]: https://kubernetes.io/docs/concepts/workloads/pods/pod-qos/