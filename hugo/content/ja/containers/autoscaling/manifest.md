---
description: Datadog UI で公開されていないオプションにアクセスするため、YAML で DatadogPodAutoscaler カスタムリソースを構成します。
further_reading:
- link: /containers/autoscaling/
  tag: ドキュメント
  text: Kubernetes Autoscaling
- link: /containers/guide/manage-datadogpodautoscaler-with-argocd/
  tag: ドキュメント
  text: ArgoCD を使用して DatadogPodAutoscaler を管理する
- link: /containers/guide/manage-datdadogpodautoscaler-with-terraform/
  tag: ドキュメント
  text: Terraform を使用して DatadogPodAutoscaler を管理する
title: DatadogPodAutoscaler マニフェストリファレンス
---
`DatadogPodAutoscaler` (DPA) カスタムリソースは、単一の Kubernetes ワークロードのオートスケーリング動作を定義します。{{< ui >}}Export Recommendation{{< /ui >}} を備えた [Autoscaling UI][1] は、設定を始めるのに適した場所です。ワークロードを設定し、生成されたマニフェストをコピーしてください。マニフェストを直接編集することで、カスタムリソース定義 (CRD) のすべてのフィールドにアクセスできるため、DPA を通常の GitOps ワークフローの一部として扱うことができます。この場合、マニフェストがレビューおよびバージョン管理の対象となる唯一の信頼できる情報源となります。

このページでは、マニフェストで使用可能な設定オプションについて説明します。このページの例では、API バージョン `datadoghq.com/v1alpha2` を使用しています。

セットアップと前提条件については、「[Kubernetes Autoscaling][2]」を参照してください。そのページでは、Datadog Cluster Agent でのワークロードオートスケーリングと Admission Controller の有効化、必要な Agent バージョン、および [インプレース垂直スケーリング][3] の有効化について説明しています。

## マニフェストの構成 {#anatomy-of-a-manifest}

次の注釈付きスケルトンは、`DatadogPodAutoscaler` の構造を示しています。`targetRef` 以外のすべてのフィールドはオプションです。

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: my-app                      # required: conventionally the workload name
  namespace: my-namespace           # required: must match the target workload
  annotations:                      # optional
    ad.datadoghq.com/tags: '{"team": "my-team"}'   # optional: tags on this DPA's telemetry
spec:
  owner: Local                      # optional: Local = this manifest is the source of truth (use for GitOps)
                                    # Remote = created and managed from the Datadog UI

  targetRef:                        # required: the workload being autoscaled - one DPA per workload
    apiVersion: apps/v1
    kind: Deployment
    name: my-app

  applyPolicy:                      # optional
    mode: Apply                     # Apply | Preview (Preview = compute recommendations, change nothing)

    scaleUp:                        # optional: horizontal, upward
      strategy: Max                 # Max | Min | Disabled
      stabilizationWindowSeconds: 600
      rules:
        - type: Percent             # Percent | Pods
          value: 50
          periodSeconds: 120        # 1..3600

    scaleDown:                      # optional: horizontal, downward
      strategy: Max
      stabilizationWindowSeconds: 600
      rules:
        - type: Percent
          value: 10
          periodSeconds: 1800

    update:                         # optional: vertical
      strategy: Auto                # Auto | Disabled | TriggerRollout
      # resizePendingPeriod: 600    # see Vertical rollout timing
      # rolloutFallbackDelay: 900   # see Vertical rollout timing

  constraints:                      # optional
    minReplicas: 3
    maxReplicas: 100
    containers:                     # optional: per-container vertical configuration
      - name: "*"                   # "*" matches all containers
        enabled: true
        controlledResources: [cpu, memory]
        controlledValues: RequestsAndLimits   # RequestsAndLimits | RequestsOnly
        minAllowed:
          cpu: "500m"
          memory: 1Gi
        maxAllowed:
          cpu: "4"
          memory: 8Gi

  objectives:                       # optional: configures horizontal scaling (also used by multidimensional). Exactly one entry.
    - type: ContainerResource       # PodResource | ContainerResource | CustomQuery
      containerResource:
        container: my-app
        name: cpu                   # cpu | memory
        value:
          type: Utilization         # Utilization | AbsoluteValue
          utilization: 65

  fallback:                         # optional: in-cluster horizontal fallback if recommendations go stale
    horizontal:
      enabled: true
      direction: ScaleUp            # ScaleUp | ScaleDown | All (default ScaleUp)
      triggers:
        staleRecommendationThresholdSeconds: 600   # 100..3600, default 600

  options:                          # optional
    burstable: false                # true = remove CPU limits, keep CPU request recommendations
    outOfMemory:
      bumpUpRatio: "1.2"            # +20% memory limit after an OOMKill (default)
```

### サポートされているターゲットワークロード {#supported-target-workloads}

| `targetRef.kind` | `apiVersion` | ステータス |
|---|---|---|
| `Deployment` | `apps/v1` | サポート対象 |
| `Rollout` (Argo Rollouts) | `argoproj.io/v1alpha1` | サポート対象 |
| `StatefulSet` | `apps/v1` | サポート対象 |

Argo Rollout の場合、`targetRef` は管理対象の Deployment ではなく、Rollout 自体を指すように設定してください。

```yaml
  targetRef:
    apiVersion: argoproj.io/v1alpha1
    kind: Rollout
    name: my-app
```

### スケーリングモードの選択 {#choose-a-scaling-mode}

`objectives` と `applyPolicy.update.strategy` の組み合わせによって、DPA が水平方向、垂直方向、またはその両方にスケーリングするかどうかが決まります。

| `objectives` の設定 | `applyPolicy.update.strategy` | 結果のモード |
|---|---|---|
| yes | `Disabled` (または未設定) | 水平方向のみ |
| no | `Auto` | 垂直方向のみ |
| yes | `Auto` | 多次元 (両方) |

## コンテナの制約 {#container-constraints}

ほとんどの垂直方向のオプションは、`spec.constraints.containers[]` を通じて指定します。

| フィールド | 型 | デフォルト | 意味 |
|---|---|---|---|
| `name` | string、**必須** | - | コンテナ名。独自のエントリを持たないすべてのコンテナと一致させる場合は `"*"` を指定します (「[コンテナを除外する](#exclude-a-container)」を参照)。|
| `enabled` | bool | `true` | `false` にすると、このコンテナのリソースのオートスケーリングが無効になります。|
| `controlledResources` | 次のリスト: `cpu`、`memory` | `[cpu, memory]` | 垂直方向の推奨値を受け取るリソース。空のリストは `enabled: false` | と同等です。
| `controlledValues` | enum | `RequestsAndLimits` | 推奨値を requests _と_ limits の両方に書き込むか、requests のみに書き込むかを指定します。|
| `minAllowed` | resource map | - | コンテナの requests の下限 |
| `maxAllowed` | resource map | - | コンテナの requests の上限 |

`constraints.containers` を完全に省略した場合、リソーススケーリングは**すべての**コンテナに対して有効になり、上限と下限は設定されません。

## CPU とメモリを適正化する {#right-size-cpu-and-memory}

DPA が水平スケーリング (`objectives`) と垂直スケーリング (`update.strategy: Auto`) を組み合わせる場合、垂直方向の推奨値は**メモリのみ**に対して生成されます。CPU のリクエストと上限は変更されず、`VerticalAbleToRecommend` の状態は `Unknown` と表示される場合があります。

DPA が CPU を変更せずにメモリのみを適正化する場合は、これが理由です。これは、Quality of Servic (QoS) クラスの維持とは関係ありません。

`controlledResources` を使用して、垂直方向の推奨値を受け取るリソースを指定します。

| `controlledResources` | 生成される垂直方向の推奨値|
|---|---|
| 未設定 | メモリのみ (デフォルト)|
| `[memory]` | メモリのみ (未設定と同じ)|
| `[cpu, memory]` | **メモリと CPU** |
| `[cpu]` | CPU のみ |

詳細な例:

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: my-app
  namespace: my-namespace
spec:
  owner: Local
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-app
  applyPolicy:
    mode: Apply
    update:
      strategy: Auto              # required - without it, nothing vertical is applied
  constraints:
    minReplicas: 3
    maxReplicas: 60
    containers:
      - name: "*"
        controlledResources:
          - cpu                   # opts CPU into vertical rightsizing
          - memory
        controlledValues: RequestsAndLimits
  objectives:
    - type: ContainerResource
      containerResource:
        container: my-app
        name: cpu
        value:
          type: Utilization
          utilization: 65
```

この機能には、Datadog Cluster Agent 7.78.0 以降が必要です。古いバージョンでは、`controlledResources` フィールドは CRD によって受け入れられますが、効果はありません。

## バースト可能モードで CPU の上限を削除する{#remove-cpu-limits-with-burstable-mode}

CPU の上限の推奨値は、複数日にわたる継続的な使用率のパーセンタイルから算出されます。短いウォームアップ時のスパイク (JVM の起動時など) はこれらのパーセンタイルにほとんど影響を与えないため、推奨される CPU の上限が低すぎて、不適切なタイミングでアプリケーションがスロットリングされる可能性があります。メモリは、ピーク時のメモリ使用量が信頼できる上限となるため、同じ影響を受けません。

バースト可能モードでは、CPU の_リクエスト_の推奨値を適用しながら、**CPU の上限を完全に削除**します。

```yaml
apiVersion: datadoghq.com/v1alpha2
kind: DatadogPodAutoscaler
metadata:
  name: my-java-app
  namespace: my-namespace
spec:
  owner: Local
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: my-java-app
  applyPolicy:
    mode: Apply
    update:
      strategy: Auto
  options:
    burstable: true
```

`options.burstable` が設定されていない場合、Cluster Agent のクラスター全体に適用されるデフォルトが適用されます。単一のワークロードをデフォルトの動作から除外するには、明示的に `false` を設定します。

Pod への影響:

| | 変更前 | 変更後 |
|---|---|---|
| CPU リクエスト| `1` | `400m` (推奨値)|
| CPU 上限 | `2` | **削除** |
| メモリ リクエスト| `500Mi` | `450Mi` (推奨)|
| メモリ上限 | `2Gi` | `2Gi`、維持|

有効にする前に、次の点に注意してください。

- **Guaranteed** QoS の Pod は、**Burstable** QoS になります。これにより、ノードに負荷がかかっている場合の退避優先順位が変わります。
- CPU の上限がない場合、コンテナは利用可能なノード CPU を消費できます。カーネルの CPU シェアは引き続き適用されます。
- バースト可能モード**は、CPU の上限に関して** `controlledValues` よりも優先されます。両方が設定されている場合は、バースト可能モードが優先されます。

## OOMKill によるメモリ増加量を調整する{#tune-the-oomkill-memory-bump}

OOMKill が発生すると、メモリの上限は、その時点で有効な上限に対して 20%引き上げられます。この増加は直ちに適用され、ワークロードが安定するまで、その後の OOMKill が発生するたびに繰り返されます。

比率を変更するには、次のようにします。

```yaml
spec:
  options:
    outOfMemory:
      bumpUpRatio: "1.5"      # 1.2 = +20% (default), 1.5 = +50%
```

値は引用符で囲んでください。これは浮動小数点数ではなく、Kubernetes の quantity です。

**引き上げるタイミング:**メモリ使用量が以前のピークを大幅に上回る可能性があるワークロードについては、比率を引き上げます。増加量を大きくすると、適切なメモリ上限に早く到達し、ワークロードが安定する前に何度も連続して増加させる必要がなくなります。引き上げる際は、`minAllowed` でメモリの下限も設定し (「[コンテナごとの境界を設定する](#set-per-container-bounds)」を参照)、推奨値の更新サイクルの間に上限が安全な値を下回らないようにしてください。

## リクエストのみを適正化する{#right-size-requests-only}

上限を意図的に調整していて (バースト用のヘッドルーム、プラットフォーム要件、または QoS の保証など)、Datadog で**リクエスト**のみを適正化させたい場合は、`controlledValues: RequestsOnly` を使用します。

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        controlledResources: [cpu, memory]
        controlledValues: RequestsOnly     # limits are not right-sized
```

| `controlledValues` | リクエスト | 上限 |
|---|---|---|
| `RequestsAndLimits` (デフォルト) | 推奨 | 推奨 |
| `RequestsOnly` | 推奨 | 適正化されない。**ただし**Pod 仕様を有効に保つために上限を変更する必要がある場合を除く (下記参照)。|

注意が必要な相互作用:

-  のコンテナでは`request == limit`、リクエストを引き下げると Guaranteed QoS クラスが解除されます。Guaranteed が必要な場合は、`RequestsAndLimits`を使用してください。レコメンダーは `request == limit` のコンテナを明示的に処理します。
- バースト可能モードは、CPU の上限についてこれを上書きします (「[バースト可能モードで CPU の上限を削除する](#remove-cpu-limits-with-burstable-mode)」を参照)。
- **OOMKill の処理は、引き続きメモリ上限を調整します。**`RequestsOnly` は、メモリの引き上げを抑制しません。OOMKill が発生すると、メモリの上限が引き上げられ、それに伴ってリクエストも引き上げられる可能性があります (Kubernetes は、リクエストが上限を超える Pod を拒否します)。`RequestsOnly` は「上限が_適正化_されない」という意味であり、「上限が一切変更されない」という意味ではありません。「[OOMKill によるメモリ増加量を調整する](#tune-the-oomkill-memory-bump)」を参照してください。

組み合わせを選択する:

| 目的 | 設定 |
|---|---|
| すべてを適正化する | `controlledResources: [cpu, memory]` + `controlledValues: RequestsAndLimits` |
| リクエストを適正化し、上限は記述通りにする | `controlledValues: RequestsOnly` |
| メモリのみを適正化し、CPU はそのままにする | `controlledResources: [memory]` |
| CPU リクエストを適正化し、CPU の上限を設けない | `options.burstable: true` |
| コンテナを完全にそのままにする | `enabled: false` |

## コンテナごとの境界を設定する {#set-per-container-bounds}

`minAllowed` と `maxAllowed` は、レコメンダーが生成できるリソースリクエストの範囲を制限します。レイテンシーが重要なワークロードでは、これらの設定が推奨されます。また、推奨値のサイクルの間にメモリリクエストがが安全な最小値を下回らないようにするため、OOMKill のメモリ引き上げ比率を変更する場合 (「[OOMKill によるメモリ増加量を調整する](#tune-the-oomkill-memory-bump)」を参照) にも推奨されます。

```yaml
spec:
  constraints:
    minReplicas: 2
    maxReplicas: 100
    containers:
      - name: api
        enabled: true
        minAllowed:
          cpu: "1"
          memory: 1Gi
        maxAllowed:
          cpu: "4"
          memory: 5Gi
      - name: worker
        enabled: true          # no bounds - recommendations are unconstrained
```

## コンテナを除外する {#exclude-a-container}

垂直方向の推奨値、水平方向のシグナル、またはその両方からコンテナを除外できます。

### 垂直方向の推奨値からコンテナを除外する {#exclude-a-container-from-vertical-recommendations}

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        enabled: true
      - name: istio-proxy
        enabled: false          # resources for this container are never modified
```

同じ設定を明示的に指定することもできます。

```yaml
      - name: istio-proxy
        controlledResources: []   # empty list is equivalent to enabled: false
```

一般的なパターンは、既知のサイドカーを除くすべてをオートスケーリングすることです。

```yaml
spec:
  constraints:
    containers:
      - name: "*"
        enabled: true
        controlledResources: [cpu, memory]
      - name: istio-proxy
        enabled: false
```

**`"*"` と名前付きエントリの組み合わせ方:** `"*"` エントリは、名前付きエントリを**持たない**すべてのコンテナに適用されます。独自の名前付きエントリを持つコンテナには、その名前の下で宣言された設定のみが適用されます。この 2 つは **マージされない**ため、ワイルドカードの設定は一切適用されません。

上記の例では、`istio-proxy`は `enabled: false` のみが適用され、ワイルドカードで指定された`controlledResources` を継承しません。Pod 内の他のすべてのコンテナは、ワイルドカードエントリを使用します。

**注**: 境界を設定するためにのみ名前付きエントリを追加する場合は、引き続き適用するワイルドカード設定を再度指定してください。以下の例では、`my-app` はワイルドカードに設定された `RequestsOnly`ではなく、デフォルトの `RequestsAndLimits` にフォールバックします。

```yaml
      - name: "*"
        controlledValues: RequestsOnly
      - name: my-app
        maxAllowed:
          memory: 8Gi          # controlledValues is NOT inherited - repeat it if you want it
```

### 水平方向のシグナルからコンテナを除外する {#exclude-a-container-from-the-horizontal-signal}

`enabled: false`は _垂直方向_の動作のみを制御します。水平方向のスケーリングを判断するためのシグナルは別途選択します。サイドカーがスケーリングの判断に影響を与えやすいのは、この水平方向のスケーリングです。

```yaml
  objectives:
    # Recommended: scale on the application container's CPU
    - type: ContainerResource
      containerResource:
        container: my-app
        name: cpu
        value:
          type: Utilization
          utilization: 65
```

次の Pod レベルの設定では、サイドカーが存在する場合に誤解を招く結果が生じる可能性があります。

```yaml
  objectives:
    # Risky when sidecars are present: pod-level utilization is diluted by
    # sidecar requests, so a busy application container can appear idle.
    - type: PodResource
      podResource:
        name: cpu
        value:
          type: Utilization
          utilization: 65
```

**推奨**: Pod にサイドカーがある場合は、メインコンテナを対象とする `ContainerResource` を使用してください。`PodResource` は単一コンテナの Pod に使用してください。

## サイドカーを設定する {#configure-sidecars}

### 通常のサイドカー (`spec.containers`) {#ordinary-sidecars-speccontainers}

特別な対応は不要です。これらは他のコンテナと同様に、境界を設定したり、除外したり、対象にしたりできます。「[コンテナを除外する](#exclude-a-container)」を参照してください。


### ネイティブサイドカー (`restartPolicy: Always` を指定した `spec.initContainers`) {#native-sidecars-specinitcontainers-with-restartpolicy-always}

Kubernetes 1.29 以降では、`restartPolicy: Always` を指定した `initContainers` に、長時間実行されるサイドカーを宣言できます。これは [ネイティブサイドカー][4] パターンと呼ばれます。ネイティブサイドカーは、Pod のライフサイクル全体を通して実行されます。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app
spec:
  template:
    spec:
      initContainers:
        - name: log-shipper
          image: log-shipper:1.2
          restartPolicy: Always      # this is what makes it a native sidecar
          resources:
            requests: {cpu: 100m, memory: 128Mi}
            limits:   {memory: 256Mi}
      containers:
        - name: my-app
          image: my-app:4.5
          resources:
            requests: {cpu: "1", memory: 2Gi}
            limits:   {cpu: "2", memory: 4Gi}
```

**ネイティブサイドカーは完全にサポートされています。**これらは通常のコンテナとして扱われます。推奨値が生成および適用され、ワークロードのコンテナのリストに表示されるため、そこで設定や除外を行うことができます。他のコンテナとまったく同様に、`constraints.containers[]` で**名前**を指定して参照します。DPA の仕様に `initContainers` 用の個別のブロックはなく、`"*"` エントリもネイティブサイドカーに適用されます。

```yaml
spec:
  constraints:
    containers:
      - name: my-app
        controlledResources: [cpu, memory]
        controlledValues: RequestsAndLimits
      - name: log-shipper        # native sidecar, referenced by name
        enabled: false
```

注意点:

- `restartPolicy: Always` がネイティブサイドカーと通常の初期化コンテナを区別するポイントです。通常の初期化コンテナ (アプリケーション起動前に処理を完了する) はネイティブサイドカーではなく、DPA によって管理されません。
- **コストと削減額の数値は、ネイティブサイドカーの数を実際より少なくカウントしている可能性があります。**それらのリソースリクエストは個別の集計で報告されるため、ネイティブサイドカーを含むワークロードに対して表示されるコスト数値は、実際に観測された使用量と矛盾しているように見える場合があります。これはコスト表示のみに影響する既知の制限であり、推奨値には影響しません。
- **注入されたサイドカー** (Istio など) は、Pod レベルで mutating admission webhook によって追加されるため、Deployment マニフェストには表示されません。それでも対象として認識されます。コンテナのリストはワークロードマニフェストだけでなく、実行中の Pod から取得した情報をもとに同期されるためです。
- **オートスケーリングされたコンテナを Agent の収集対象から除外しないでください。**`DatadogPodAutoscaler` は、管理対象のコンテナについて Agent が収集するメトリクスに依存します。オートスケーリングの対象となるワークロード内のコンテナが Agent のコンテナ検出設定によって除外された場合、そのコンテナのメトリクスは存在しなくなり、適正化できません。オートスケーリングの対象となるワークロード内のすべてのコンテナが収集から除外されていないことを確認してください。包含および除外ルールの仕組みについては、「[コンテナディスカバリー管理][7]」を参照してください。

## その他のマニフェストオプション {#additional-manifest-options}

### プレビュー (dry-run) モード {#preview-dry-run-mode}

```yaml
spec:
  applyPolicy:
    mode: Preview     # recommendations are computed and visible in .status, but nothing is applied
```

一時的に停止するためのスイッチとして便利です。水平方向の設定が無効な場合でも、垂直方向の適正化は実行され続けます。`mode: Preview` を設定すると、修正が完了するまで両方を停止できます。

### 一方のスケーリング方向を無効にする {#disable-one-scaling-direction}

```yaml
spec:
  applyPolicy:
    scaleUp:
      strategy: Max
    scaleDown:
      strategy: Disabled     # never scale down
    update:
      strategy: Auto
```

垂直方向のみのスケーリングを行う場合は、`objectives` を省略し、「[スケーリングモードを選択する](#choose-a-scaling-mode)」のテーブルにあるように `update.strategy: Auto` を設定します。`objectives` がない場合、水平スケーリングには処理対象がないため、`scaleUp` と `scaleDown` を `Disabled` に設定する必要もありません。

### 垂直方向ロールアウトのタイミング {#vertical-rollout-timing}

コントローラーは、利用可能な最も影響の少ない方法で垂直方向の変更を適用し、その方法で処理が進まない場合はエスカレーションします。各ステップで待機する時間は、次の 2 つのフィールドで制御されます。

```yaml
spec:
  applyPolicy:
    update:
      strategy: Auto
      resizePendingPeriod: 600      # 1..3600 seconds
      rolloutFallbackDelay: 900     # 1..3600 seconds
```

| フィールド | 制御内容 |
|---|---|
| `resizePendingPeriod` | kubelet がリサイズを保留中 (受け付けられたものの処理が進行していない状態で、多くの場合ノードに余裕がないことが原因) と報告した場合に、Pod を退避させるまでの待機時間 |
| `rolloutFallbackDelay` | 退避が (PodDisruptionBudget などによって) ブロックされている場合、完全なロールアウトにフォールバックするまでの待機時間|

どちらもオプションであり、1 ～ 3600 秒の間で指定できます。設定しない場合は、コントローラーに組み込まれたデフォルトが使用されます。

- **`resizePendingPeriod` を引き上げる**: 退避のコストが高い (ウォームアップが長い、キャッシュが大きい、ドレインが遅い) 場合に適しています。古いサイズでの待機期間を長くすることで、再起動の回数を減らすことができます。
- **`rolloutFallbackDelay` を引き上げる**: PodDisruptionBudget の制約が厳しいワークロードで、一時的な予算制約によってすぐに完全なロールアウトにエスカレートされないようにします。
- **いずれかを引き下げる**: 再起動のコストが低く、推奨値をより早く反映させたい場合に適しています。

これらは変更が_どのように_適用されるかを制御するものであり、変更が_適用されるかどうか_を制御するものではありません。変更を完全に停止するには、`update.strategy: Disabled` または `applyPolicy.mode: Preview` を使用してください。これらのフィールドは [インプレース垂直スケーリング][3] に適用されます。クラスター全体での有効化および Kubernetes の要件については、概要を参照してください。

### ローカルフォールバックの調整{#local-fallback-tuning}

```yaml
spec:
  fallback:
    horizontal:
      enabled: true
      direction: ScaleUp          # default; use All to allow fallback scale-in as well
      triggers:
        staleRecommendationThresholdSeconds: 600    # 100..3600
```

フォールバックの推奨値は、Agent が収集したメトリクスをもとにクラスター内で計算されるため、Datadog がしきい値内に推奨値を提供できない場合でもスケーリングは継続されます。

この機能を使用するには、Cluster Agent とノード上の Agent の両方で、クラスター側の構成も必要です。「[Kubernetes Autoscaling][2]」を参照するか、[Datadog サポート][6] にお問い合わせください。

### 絶対値による目標値{#absolute-value-objectives}

使用率のパーセンテージではなく、絶対値を目標値にします。

```yaml
  objectives:
    - type: ContainerResource
      containerResource:
        container: my-app
        name: cpu
        value:
          type: AbsoluteValue
          absoluteValue: "1.5"     # target cores per pod
```

### カスタムクエリによる目標値{#custom-query-objectives}

CPU やメモリではなく、任意の Datadog メトリクスに基づいてスケーリングします。

```yaml
  objectives:
    - type: CustomQuery
      customQuery:
        window: 5m
        request:
          queries:
            - name: a
              source: Metrics
              metrics:
                query: "avg:my.queue.depth{service:my-app}"
        value:
          type: AbsoluteValue
          absoluteValue: "100"
```

`source` は`ApmMetrics` にすることもでき、`service`、`resourceName`、`operationName`、`stat` などのフィールドを指定できます。

カスタムクエリは、**水平スケーリングでのみ**サポートされています。カスタムクエリと垂直スケーリングの組み合わせは**サポートされていません**。これは、オートスケーラーが、任意のクエリに対してどの方向のスケーリングを行うべきかを判断できないためです。

### DPA のテレメトリにタグ付けする{#tag-a-dpas-telemetry}

```yaml
metadata:
  annotations:
    ad.datadoghq.com/tags: '{"team": "my-team", "tier": "critical"}'
```

これにより、この DPA に対して出力されるオートスケーリングのテレメトリにタグが追加されます。Cluster Agent が出力するメトリクスのリストについては、「[Datadog Cluster Agent インテグレーション][5]」を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/orchestration/scaling/workload
[2]: /ja/containers/autoscaling/
[3]: /ja/containers/autoscaling/#in-place-vertical-scaling
[4]: https://kubernetes.io/docs/concepts/workloads/pods/sidecar-containers/
[5]: /ja/integrations/datadog-cluster-agent/#metrics
[6]: /ja/help/
[7]: /ja/containers/guide/container-discovery-management/