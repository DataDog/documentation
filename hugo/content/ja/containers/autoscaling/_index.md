---
aliases:
- /ja/containers/monitoring/autoscaling
description: Datadog のメトリクスとインテリジェントなスケーリング推奨事項を使用して、Kubernetes ワークロードを自動的にスケールする
further_reading:
- link: /infrastructure/containers/kubernetes_resource_utilization
  tag: ドキュメント
  text: Kubernetes リソース利用
- link: /account_management/rbac/permissions
  tag: ドキュメント
  text: Datadog ロールのアクセス許可
- link: /agent/remote_config/
  tag: ドキュメント
  text: Remote Configuration
- link: https://www.datadoghq.com/blog/autoscaling-custom-metrics
  tag: ブログ
  text: カスタムメトリクスに基づいた Kubernetes ワークロードのスケーリング
- link: https://www.datadoghq.com/blog/kubernetes-custom-query-autoscaling
  tag: ブログ
  text: カスタムクエリスケーリングを使用して Kubernetes ワークロードを最適化する
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: ブログ
  text: DDOT ゲートウェイを使用して、OpenTelemetry パイプラインを一元管理する
- link: https://www.datadoghq.com/blog/datadog-kubernetes-autoscaling/
  tag: ブログ
  text: Datadog Kubernetes Autoscaling を使用して、ワークロードのサイズを適切に調整し、コストを削減する
title: Kubernetes Autoscaling
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-info">
  この機能は、Datadog for Government ({{< region-param key="dd_datacenter" >}}) サイトでは利用できません。
</div>
{{< /site-region >}}

Datadog Kubernetes Autoscaling は、Kubernetes リソースを継続的にモニターし、即時のスケーリング推奨事項と Kubernetes ワークロードの多次元オートスケーリングを提供します。Datadog のウェブインターフェースを通じて、または `DatadogPodAutoscaler` カスタムリソースを使用してオートスケーリングを展開できます。

## 仕組み {#how-it-works}
Datadog は、リアルタイムおよび過去の利用率メトリクスと既存の Datadog Agent からのイベントシグナルを使用して推奨事項を作成します。その後、これらの推奨事項を確認し、デプロイすることを選択できます。

デフォルトで、Datadog Kubernetes Autoscaling は推定された CPU およびメモリコスト値を使用して、節約の機会と影響の見積もりを示します。Kubernetes Autoscaling を [Cloud Cost Management](#idle-cost-and-savings-estimates) と併用して、正確なインスタンスタイプコストに基づくレポートを取得することもできます。

自動ワークロードスケーリングは、ワークロードレベルでスケーリング動作を定義する `DatadogPodAutoscaler` カスタムリソースによって実現されています。Datadog Cluster Agent は、このカスタムリソースのコントローラーとして機能します。

**注:** 各クラスターは、Datadog Kubernetes Autoscaling で最適化された最大 1000 のワークロードを持つことができます。

### 互換性 {#compatibility}

- **ディストリビューション**: この機能は、Datadog の [サポートされている Kubernetes ディストリビューション][5]すべてと互換性があります。
- **ワークロードオートスケーリング**: この機能は、Horizontal Pod Autoscaler (HPA) および Vertical Pod Autoscaler (VPA) の代替です。Datadog は、Datadog Kubernetes Autoscaling を有効にする際に、ワークロードから HPA または VPA を削除することを推奨します。これらのワークロードは、アプリケーション内で自動的に特定されます。
**注:** HPA および/または VPA を保持しながら、`applyPolicy` セクションの `mode: Preview` で `DatadogPodAutoscaler` を作成することにより、Datadog Kubernetes Autoscaling を試すことができます。

### 要件 {#requirements}

- [Remote Configuration][1] は、組織レベルおよびターゲットクラスター内のエージェントの両方で有効にする必要があります。設定手順については、[Remote Configuration を有効にする][2]を参照してください。
- [Helm][3]、Datadog Agent 更新用。
- (Datadog Operator ユーザー向け) [`kubectl` CLI][4]、Datadog Agent 更新用。
- ライブオートスケーリングを使用している場合、Datadog は最新の Datadog Agent バージョンの使用を推奨します。これにより、最新の改善と最適化の利用が確保されます。スケーリングの推奨事項を利用するには、[Kubernetes State Core][9] の統合を有効にする必要があります。<br/><br/>

   | 機能 | 最小 Agent バージョン |
   |---------|----------------------|
   | アプリ内ワークロードスケーリングの推奨事項 | 7.50+ |
   | ライブワークロードスケーリング | 7.66.1+ |
   | Argo Rollout の推奨事項とオートスケーリング | 7.71+ |
   | クラスターオートスケーリング ([サインアップのプレビュー][10]) | 7.72+ |
   | インプレースの垂直ポッドサイズ変更 (オプトイン) | 7.78+ |
   | クラスタープロファイルのアクティベーション、ワークロードラベル | 7.78+ |
   | クラスタープロファイルのアクティベーション、ネームスペースラベル | 7.79+ |

- 以下のユーザー権限:
   - 組織管理 (Remote Configuration に必要)
   - API キーの書き込み (Remote Configuration に必要)
   - ワークロードスケーリングの書き込み
   - オートスケーリング管理
- (推奨) Linux カーネル v5.19+ および cgroup v2

## セットアップ {#setup}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Datadog Operator v1.16.0+ を使用していることを確認します。Datadog Operator をアップグレードするには

```shell
helm upgrade datadog-operator datadog/datadog-operator
```

2. `datadog-agent.yaml` 構成ファイルに次の内容を追加します。

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

3. [Admission Controller][1] は、Datadog Operator でデフォルトで有効になっています。無効にした場合は、次の強調表示された行を `datadog-agent.yaml` に追加して再度有効にしてください。

{{< highlight yaml "hl_lines=4-5" >}}
...
spec:
  features:
    admissionController:
      enabled: true
...
{{< /highlight >}}

4. 更新された `datadog-agent.yaml` 構成を適用してください。

```shell
kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

[1]: /ja/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{% tab "Helm" %}}

1. Agent および Cluster Agent v7.66.1+ を使用していることを確認します。`datadog-values.yaml` 構成ファイルに次の内容を追加します。

```yaml
datadog:
  autoscaling:
    workload:
      enabled: true
  kubernetesEvents:
    unbundleEvents: true
```

2. [Admission Controller][1] は、Datadog Helm チャートでデフォルトで有効になっています。無効にした場合は、次の強調表示された行を `datadog-values.yaml` に追加して再度有効にします。
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

4. 更新された `datadog-values.yaml` で Datadog Agent を再デプロイします。

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

[1]: /ja/containers/cluster_agent/admission_controller/

{{% /tab %}}
{{< /tabs >}}

### アイドルコストと節約の見積もり {#idle-cost-and-savings-estimates}

{{< tabs >}}
{{% tab "Cloud Cost Management を使用" %}}
[Cloud Cost Management][1] が組織内で有効になっている場合、Datadog Kubernetes Autoscaling は、監視対象インスタンスの正確な請求コストに基づいてアイドルコストと節約の見積もりを表示します。

[AWS][2]、[Azure][3]、または [Google Cloud][4] の Cloud Cost 設定手順を参照してください。

Cloud Cost Management データは Kubernetes Autoscaling を強化しますが、必須ではありません。Datadog のすべてのワークロード推奨事項とオートスケーリングの決定は、Cloud Cost Management なしでも有効で、機能します。

[1]: /ja/cloud_cost_management
[2]: /ja/cloud_cost_management/aws
[3]: /ja/cloud_cost_management/azure
[4]: /ja/cloud_cost_management/google_cloud
{{% /tab %}}

{{% tab "デフォルト" %}}
Cloud Cost Management が**無効**の場合、Datadog Kubernetes Autoscaling は次の数式と固定値を使用してアイドルコストと節約の見積もりを表示します。

**クラスターアイドル**:

```
  (cpu_capacity - max(cpu_usage, cpu_requests)) * core_rate_per_hour
+ (mem_capacity - max(mem_usage, mem_requests)) * memory_rate_per_hour
```

**ワークロードアイドル**:

```
  (max(cpu_usage, cpu_requests) - cpu_usage) * core_rate_per_hour
+ (max(mem_usage, mem_requests) - mem_usage) * memory_rate_per_hour
```

**固定値**:
- core_rate_per_hour = CPU コア時間あたり $0.0295
- memory rate_per_hour = メモリ GB 時間あたり $0.0053


_固定コスト値は、時間の経過とともに微調整される可能性があります。_
{{% /tab %}}
{{< /tabs >}}

## 使用方法 {#usage}

### リソースを特定して適切なサイズに調整する {#identify-resources-to-rightsize}

[オートスケーリング概要ページ][6]は、プラットフォームチームが組織全体の Kubernetes リソースの節約機会を理解し、主要なクラスターやネームスペースに絞り込むための出発点を提供します。

[セットアップページ][11]は、スケールする複数のワークロードを選択し、一括して最適化を管理するオプションを提供します。

[クラスターのスケーリングビュー][7]は、クラスターごとの合計アイドル CPU、合計アイドルメモリ、およびコストに関する情報を提供します。

クラスターをクリックすると、詳細情報と推定節約額でソートされたクラスターのワークロードのテーブルが表示されます。個々のアプリケーションまたはサービスの所有者である場合は、[ワークロードスケーリングリストビュー][8]から直接チームまたはサービス名でフィルタリングすることもできます。

これらのビューのいずれからでも、ワークロードの {{< ui >}}Optimize{{< /ui >}} をクリックしてスケーリングの推奨事項を確認し、その後、[ワークロードのオートスケーリングを有効にする](#enable-autoscaling-for-a-workload)へ進みます。

### ワークロードのオートスケーリングを有効にする {#enable-autoscaling-for-a-workload}

最適化するワークロードを特定した後、その {{< ui >}}Scaling Recommendation{{< /ui >}} を確認します。{{< ui >}}Configure Recommendation{{< /ui >}} をクリックして、有効にする前に制約を追加するかターゲット利用率レベルを調整します。

ワークロードのオートスケーリングを有効にする方法は 3 つあります。現在のワークロードのデプロイ方法に合ったパスを選択してください。

| パス | 最適 | 開始する場所 | 継続的な管理 |
|------|----------|-----------------|--------------------|
| **A. Datadog UI セットアップウィザード** | 迅速に開始し、即時の視覚的フィードバックで設定を反復するか、アプリケーションチームがより良いスケーリング構成の決定を行えるようにする | Datadog UI の[セットアップページ][11] | ワークロードの `DatadogPodAutoscaler` を UI またはクラスターから編集する |
| **B. `DatadogPodAutoscaler`マニフェストを作成する** | シッピング Kubernetes マニフェストの既存のワークフロー (`kubectl`、Helm、ArgoCD、Terraform、または他の GitOps ツール) | 手書きまたはテンプレート化された YAML を既存のツールで適用する | マニフェストを編集し、同じツールで再適用する |
| **C. [クラスタープロファイル](#cluster-profiles)ラベルを適用する** | 単一の共有ポリシーで多くのワークロードやネームスペースでオートスケーリングを有効にする | ワークロードまたはネームスペースにラベルを付ける: `autoscaling.datadoghq.com/profile` | プロファイルを編集して、管理するすべてのワークロードを更新するか、ラベルを変更することでワークロードをプロファイル間で移動する|

#### パス A: Datadog UI {#path-a-datadog-ui}

最も早い開始方法は、Datadog UI の[セットアップページ][11]です。ウィザードは次の 5 つのステップを案内します。クラスターの選択、Agent と権限の要件の確認、インストール方法の選択、スケーリングテンプレートの選択、デプロイ。ウィザードで利用可能なテンプレート:

- **コストを最適化する**: 高い CPU 利用率目標、積極的なスケールダウン、最低レプリカフロア。ステートレスでコスト要件が厳しいワークロードに最適です。
- **バランスを最適化する**: 中程度の利用率目標、バランスの取れたスケールアップとスケールダウン。ほとんどのステートレスワークロードに最適です。
- **パフォーマンスを最適化する**: 保守的な利用率目標、遅いスケールダウン、高いレプリカフロア。ステートフルまたは重要なサービスに最適です。
- **カスタマイズ**: 上記のいずれかから開始し、CPU ターゲット、レプリカ、および安定化ウィンドウを自分で調整します。

セットアップウィザードは、単一のワークロードでオートスケーリングを試したり、推奨事項を実際に体験したり、小規模なワークロードのセットをオンボーディングするのに最適です。(`Workload Scaling Write` および `Autoscaling Manage` 権限が必要です。)

#### パス B: GitOps {#path-b-gitops}

ワークロードをターゲットにする `DatadogPodAutoscaler` カスタムリソースを定義し、`kubectl apply`、Helm、ArgoCD、Terraform、または他の GitOps ツールであっても Kubernetes マニフェストを配信するためにすでに使用しているツールで適用します。マニフェストの作成は、配信メカニズムに関係なく同じです。コストの最適化、バランスの取れたスケーリング、垂直のみのサイズ変更、およびカスタムクエリの水平スケーリングをカバーする編集可能な開始点の[例の構成](#example-datadogpodautoscaler-configurations)を以下に示します。

ツール固有のガイドについては、次を参照してください。

- [ArgoCD を使用して DatadogPodAutoscaler を管理する][12]
- [Terraform を使用して DatadogPodAutoscaler を管理する][13]

### DatadogPodAutoscaler の構成例 {#example-datadogpodautoscaler-configurations}

以下の例は、さまざまなスケーリング戦略に対する一般的な `DatadogPodAutoscaler` 構成を示しています。これらを開始点として使用し、ワークロードの要件に合わせて値を調整します。UI でテンプレートを選択したい場合は、上記の [パス A](#path-a-datadog-ui-setup-wizard) に従います。

{{< tabs >}}
{{% tab "コストの最適化" %}}

負荷が減少した場合にコントローラーが迅速にキャパシティを削除する必要がある、ステートレスでコスト要件が厳しいワークロードにはこのテンプレートを選択します。定義される設定は、高い CPU 利用率ターゲット (85%) と積極的なスケールダウンルール、および単一レプリカの最小値が組み合わさっています。

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
            stabilizationWindowSeconds: 300
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

可用性を犠牲にせずに節約したい場合は、このテンプレートを選択します。これはほとんどのステートレスワークロードに適したデフォルトです。定義される設定は、中程度の CPU 利用率ターゲット (70%) で、保守的なスケールダウン (20% を 20 分ごと) と 2 つのレプリカの最小値が組み合わさっています。コントローラーは迅速にキャパシティを追加しますが、低速で削除します。

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
            stabilizationWindowSeconds: 600
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
{{% tab "垂直 CPU およびメモリ" %}}

ワークロードが水平にスケールできない場合や、レプリカ数を変更せずに純粋なサイズ調整を行いたい場合は、このテンプレートを選択します。一般的なケースは、シングルトンサービス、ステートフルワークロード、およびリーダー選出コンポーネントです。定義される設定は `scaleDown.strategy: Disabled` および `scaleUp.strategy: Disabled` で、CPU およびメモリの推奨事項を適用するために `update.strategy: Auto` のみが残ります。

デフォルトでは、コントローラーがロールアウトをトリガーすることによって垂直推奨を適用します (Pod を対比させて再作成)。Cluster Agent **7.78+** は、再起動せずに Pod の CPU およびメモリのリクエストと制限を更新する **インプレース Pod サイズ変更**もサポートしています。インプレースのサイズ変更はオプトイン: Cluster Agent で `autoscaling.workload.in_place_vertical_scaling.enabled: true` を設定します (または、環境変数 `DD_AUTOSCALING_WORKLOAD_IN_PLACE_VERTICAL_SCALING_ENABLED=true` を設定します)。

クラスターは `pods/resize` サブリソースも公開する必要があります。これは Kubernetes 1.33 以降のデフォルトで、`InPlacePodVerticalScaling` 機能ゲートはベータ版です。Kubernetes 1.27 から 1.32 では、機能ゲートが `kube-apiserver` およびすべての `kubelet` で有効にされる必要があります。

両方の前提条件を満たしている場合:

- **デフォルト**: `applyPolicy.update.strategy: Auto` (デフォルト) を持つワークロードはインプレースでサイズ変更されます。
- **フォールバック**: kubelet がサイズ変更を `Infeasible` として報告した場合、コントローラーはロールアウトにフォールバックします。
- **オプトアウト**: クラスター設定に関係なく、常にロールアウトベースの垂直スケーリングを使用するようにワークロードを強制するには、`applyPolicy.update.strategy: TriggerRollout` をその `DatadogPodAutoscaler` に設定します。

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

CPU とメモリが適切なスケーリングシグナルでない場合は、このテンプレートを選択します。例としては、バックログの深さでスケールするキューワーカーや、リクエストレイテンシーでスケールする API サービスが含まれます。定義する設定は `objectives` ブロックであり、これは利用率のパーセンテージの代わりに Datadog メトリクスクエリと `AbsoluteValue` ターゲットを参照します。例のクエリをワークロードに一致するものに置き換えます。

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
            stabilizationWindowSeconds: 600
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

`DatadogPodAutoscalerClusterProfile` は、`DatadogPodAutoscaler` テンプレートを保持するクラスタースコープのリソースです。Cluster Agent は、`autoscaling.datadoghq.com/profile` ラベルの `Deployment` および `StatefulSet` リソース (および 7.79 以降では、それらを含むネームスペース) をモニターし、一致するワークロードごとに管理された `DatadogPodAutoscaler` を作成します。1 つのプロファイルは多くのワークロードに適用されますが、1 つのワークロードは依然として 1 つの `DatadogPodAutoscaler` にマッピングされます。

クラスタープロファイルとワークロードレベルのラベルは、Datadog Cluster Agent 7.78.0 以降を必要とします。ネームスペースレベルのアクティベーション (ネームスペースにラベルを付けてすべてのサポートされているワークロードをプロファイルにオプトインさせる) は、Datadog Cluster Agent 7.79.0 以降を必要とします。古い Cluster Agent はプロファイルラベルを無視します。

#### 組み込みプロファイル {#built-in-profiles}

Cluster Agent には 3 つの組み込みプロファイルが用意されており、起動時にそれらが再作成されるため、使用するために CRD YAML をコミットする必要はありません。名前は予約されています。

| プロファイル | CPU ターゲット | 最小レプリカ | 動作プロファイル |
|---|---|---|---|
| `datadog-optimize-cost` | 85% | 1 | ステートレスでコスト要件が厳しいワークロード。迅速なスケールアップとスケールダウン (5 分の安定化ウィンドウ、2 分ごとに 50% のステップ)。|
| `datadog-optimize-balance` | 70% | 2 | ほとんどのステートレスワークロードのデフォルト。バランスの取れた 10 分の安定化ウィンドウ、保守的なスケールダウン (20 分ごとに 20% のステップ)。|
| `datadog-optimize-performance` | 60% | 3 | ステートフルまたはレイテンシー要件が厳しいワークロード。非常に保守的なスケールダウン (15 分の安定化ウィンドウ、30 分ごとに 10% のステップ)。|

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

ネームスペースでサポートされているすべてのワークロードでプロファイルを有効にするには、代わりにネームスペースにラベルを付けます (Cluster Agent 7.79.0 以降が必要です)。

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: production
  labels:
    autoscaling.datadoghq.com/profile: datadog-optimize-balance
```

#### カスタムプロファイル {#custom-profiles}

組み込みプロファイルがスケーリングポリシーに一致しない場合は、`DatadogPodAutoscalerClusterProfile` を作成します。プロファイルはクラスタースコープ化されているため、`--namespace` フラグなしで適用するか、構成リポジトリのクラスターレベルのレイヤーに配置します。

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
        stabilizationWindowSeconds: 300
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

同じラベルを使用してワークロードまたはネームスペースからカスタムプロファイルを参照します。

```yaml
metadata:
  labels:
    autoscaling.datadoghq.com/profile: cost-optimized-strict-floor
```

テンプレート本体は `DatadogPodAutoscaler` 仕様と同じフィールドを受け入れますが、`targetRef` は除きます (Cluster Agent が一致する各ワークロードにそれを埋めます)。`spec.template` の下に配置できるフィールドの完全な範囲については、上記の [ 例の構成 ](#example-datadogpodautoscaler-configurations) を参照してください。

#### アクティベーションの優先度 {#activation-precedence}

Cluster Agent 7.79.0 以降は、ネームスペースレベルのアクティベーション、`excluded` オプトアウト、およびそれらの間の優先度ルールを追加します。Cluster Agent 7.78.0 では、ワークロードレベルのラベルのみが読み取られます。ネームスペースや `excluded` の値に関する以下のルールは適用されません。

- **ワークロードラベルはネームスペースラベルよりも優先されます。**ネームスペースが `autoscaling.datadoghq.com/profile=ns-profile` とラベル付けされ、その内部のワークロードが `autoscaling.datadoghq.com/profile=workload-profile` とラベル付けされている場合、ワークロードは `workload-profile` を使用します。
- **`excluded` でオプトアウトします。**ワークロードに `autoscaling.datadoghq.com/profile: excluded` を設定すると、そのネームスペースがラベル付けされている場合に免除されます。これは、オプトインされているネームスペース内でステートフルまたは重要なワークロードに役立ちます。

  ```yaml
  apiVersion: apps/v1
  kind: StatefulSet
  metadata:
    name: payments-ledger
    namespace: production
    labels:
      autoscaling.datadoghq.com/profile: excluded
  ```

- **不明なプロファイル名は無視されます。**ワークロードまたはネームスペースが存在しないプロファイルを参照する場合、Cluster Agent は管理された `DatadogPodAutoscaler` を作成せず、エラーを報告しません。調整は、その名前のプロファイルが作成されるとすぐに割り当てを取得します。
- **調整は自動です。**ラベルの追加、変更、または削除は、数秒以内に管理された `DatadogPodAutoscaler` に伝播します。

#### サポートされているワークロードの種類 {#supported-workload-kinds}

プロファイルのアクティベーションは `Deployment` および `StatefulSet` をサポートします。他の種類 (例: Argo `Rollout`) については、[Path B: GitOps](#path-b-gitops) を使用して `DatadogPodAutoscaler` を直接作成します。

### 手動で推奨事項をデプロイする {#deploy-recommendations-manually}

オートスケーリングを有効にせずに Datadog の推奨事項を受け取りたい場合は、一度だけ手動で適用できます。Kubernetes のデプロイメントのためにリソースを構成する場合は、スケーリングの推奨事項で提案された値を使用します。{{< ui >}}Export Recommendation{{< /ui >}} をクリックして、生成された `kubectl patch` コマンドを見ることもできます。Datadog は推奨事項を継続的に更新しますが、クラスターが変更されるのは再適用する場合のみです。

## ワークロードを大規模に管理する {#manage-workloads-at-scale}

ワークロードがオートスケーリングされた後、2 日目の操作は `DatadogPodAutoscaler` リソースと Datadog UI を組み合わせて管理されます。

- **スケーリングテンプレートを変更します。**ワークロードの `DatadogPodAutoscaler` 仕様 (CPU ターゲット、レプリカの範囲、スケールアップおよびスケールダウンのルール) を直接編集するか、[ワークロードスケーリングリストビュー][8]から別のテンプレートを選択します。変更内容は次回の調整時に反映されます。
- **リソースを削除せずにオートスケーリングを一時停止します。**`applyPolicy.mode: Preview` を設定して、コントローラーが推奨事項を適用するのを防ぎながら `.status` で推奨事項を表示し続けます。これは、評価中に HPA または VPA と一緒に実行する場合に便利です。
- **ロールアウトをモニターします。**ワークロードスケーリングリストビューは、各ワークロードの推奨事項、最後に適用されたアクション、および調整エラーのライブステータスを表示します。
- **オートスケーリングをクリーンに削除します。**`DatadogPodAutoscaler` リソースを削除してオートスケーリングを停止します。既存の Pod リソースは最後に適用された値のままであり、ワークロードは次回のロールアウトで親コントローラー (デプロイメント、StatefulSet など) が指定するものに戻ります。

## リファレンス {#reference}

### 垂直の推奨事項の計算方法 {#how-vertical-recommendations-are-calculated}

Datadog は、過去 8 日間のコンテナ使用データを分析することによって、CPU およびメモリの垂直スケーリング推奨事項を計算します。各リソースに使用される方法は、そのリソースのリクエストが制限と等しいかどうかに依存し、[Kubernetes のサービス品質 (QoS) クラス][14]の概念を反映しています。CPU とメモリは独立して評価されます。ワークロードは CPU に Burstable 方式を使用してメモリに Guaranteed 方式を使用することが可能で、その逆も可能です。

#### メモリの推奨事項 {#memory-recommendations}

**Burstable** (メモリリクエストがメモリ制限よりも低い):

| | 計算方法 |
|---|---|
| **リクエストの推奨事項** | 過去 8 日間のメモリ使用量の **p95** に基づき、古いサンプルに荷重減衰を適用して、最近の使用パターンが優先されるようにします。**10% の安全マージン**が追加されます。|
| **制限の推奨事項** | 過去 8 日間に観測された**最大ピークメモリ使用量**に基づきます。**5% の安全マージン**が追加されます。|

**Guaranteed** (メモリリクエストがメモリ制限に等しい):

| | 計算方法 |
|---|---|
| **リクエストと制限の推奨事項** | 過去 8 日間に観測された**最大ピークメモリ使用量**に基づきます。**5% の安全マージン**が追加されます。**OOMKill** が検出された場合、将来メモリ不足が発生することを防ぐために追加の **20% の増加**が適用されます。|

**注:** ピークメモリ追跡は、8 日間のルックバックウィンドウ内に存在した任意のコンテナによって記録された最高メモリ使用量をキャプチャします。これは、ウィンドウの前にコンテナが開始された場合でもそのピーク使用量 (例: 起動時) が推奨事項で考慮されることを意味します。

#### CPU の推奨事項 {#cpu-recommendations}

**Burstable** (CPU リクエストが CPU 制限よりも低い):

| | 計算方法 |
|---|---|
| **リクエストの推奨事項** | 過去 8 日間の現在のリクエストに対する CPU 使用量の **p90** に基づき、古いサンプルに荷重減衰を適用して、最近の使用パターンが優先されるようにします。**10% の安全マージン**が追加されます。|
| **制限の推奨事項** | 過去 8 日間の現在のリクエストに対する CPU 使用率の **p95** に基づきます。**5% の安全マージン**が追加されます。結果として得られたリクエストの推奨事項が制限の推奨事項を超える場合、リクエストの値が両方に使用されます。|

**Guaranteed** (CPU リクエストが CPU 制限に等しい):

| | 計算方法 |
|---|---|
| **リクエストと制限の推奨事項** | は、過去 8 日間の現在のリクエストに対する CPU 使用率の **p95** に基づきます。**5% の安全マージン**が追加されます。|

#### 主要な設計原則 {#key-design-principles}

- **8 日間のルックバックウィンドウ**: すべての推奨事項は過去 8 日間の使用データを考慮し、週ごとのトラフィックパターンを捉えるのに十分な履歴を提供しつつ、変化に迅速に対応します。
- **荷重減衰**: Burstable クラスのリクエストの推奨事項 (CPU またはメモリ) では、古いサンプルの重みが減衰するため、推奨事項は最近の使用の変化により早く適応します。
- **安全マージン**: すべての推奨事項には、観測された使用量を上回る (5% から 10%) マージンが含まれており、予期しない使用量の急増に対してバッファを提供します。
- **OOMKill 応答**: メモリが Guaranteed クラス (リクエストが制限に等しい) で OOMKill が発生した場合、再発の可能性を減らすために 20% の増加が適用されます。
- **Guaranteed クラスの保存**: リソースのリクエストと制限が等しい場合、Datadog は両方に対してより保守的な (制限レベル) 計算を使用し、推奨事項がリクエストと制限の間にギャップを生じさせないようにします。

## 参考資料 {#further-reading}

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