---
code_lang: kubernetes_gateway
code_lang_weight: 2
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: ドキュメント
  text: Datadog Agent でカスタム OpenTelemetry コンポーネントを使用する
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: ブログ
  text: DDOT ゲートウェイを使用して、OpenTelemetry パイプラインを一元管理します
- link: https://www.datadoghq.com/blog/otel-gateway-topology-view/
  tag: ブログ
  text: Datadog Fleet Automation で OTel ゲートウェイのトラブルシューティングを行う
- link: https://opentelemetry.io/docs/collector/deployment/gateway/
  tag: OpenTelemetry
  text: 'Collector デプロイメント: ゲートウェイ'
- link: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/loadbalancingexporter
  tag: OpenTelemetry
  text: ロードバランシングエクスポーター
- link: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/tailsamplingprocessor
  tag: OpenTelemetry
  text: テールサンプリングプロセッサー
title: Kubernetes にゲートウェイとして DDOT Collector をインストールする
type: multi-code-lang
---
<div class="alert alert-info">
このガイドでは、DDOT Collector を DaemonSet としてデプロイする方法を理解していることを前提としています。詳細については、<a href="/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset">DDOT Collector を Kubernetes に DaemonSet としてインストールする</a>を参照してください。
</div>

## 概要 {#overview}

OpenTelemetry Collector は、複数の方法でデプロイできます。*daemonset* パターンは、コア Datadog Agent とともに Collector インスタンスをすべての Kubernetes ノードで実行する、一般的なデプロイパターンです。

{{< img src="opentelemetry/embedded_collector/ddot_daemonset.png" alt="OpenTelemetry Collector の daemonset パターンのアーキテクチャ図。Kubernetes クラスターには 3 つのノードがあります。各ノードで、OpenTelemetry で計測されたアプリケーションが OTLP データをローカルの Agent DaemonSet に送信します。Agent DaemonSet は、このデータを Datadog バックエンドに直接転送します。" style="width:100%;" >}}

[gateway][6] パターンは、一元化されたスタンドアロンの Collector サービスを使用する追加のデプロイオプションを提供します。このゲートウェイ層は、データを Datadog などの 1 つ以上のバックエンドにエクスポートする前に、テールベースのサンプリング、集計、フィルタリング、ルーティングなどの処理を実行できます。これは、可観測性ポリシーを管理および適用するための中央ポイントとして機能します。

{{< img src="opentelemetry/embedded_collector/ddot_gateway_diagram.png" alt="OpenTelemetry Collector ゲートウェイパターンのアーキテクチャ図。アプリケーションは、各ノードで実行されているローカルの DDOT DaemonSets に OTLP データを送信します。DaemonSets はこのデータを中央のロードバランサーに転送し、ロードバランサーがそれを DDOT ゲートウェイ Pod の別のデプロイメントに分散します。これらのゲートウェイ Pod は、テレメトリデータを Datadog に送信します。" style="width:100%;" >}}

ゲートウェイを有効にする場合、
1.  Kubernetes Deployment (`<RELEASE_NAME>-datadog-otel-agent-gateway-deployment`) が、スタンドアロンの **ゲートウェイ Collector Pod** を管理します。
2.  Kubernetes Service (`<RELEASE_NAME>-datadog-otel-agent-gateway`) がゲートウェイ Pod を公開し、負荷分散を提供します。
3.  既存の **DaemonSet Collector Pod** は、テレメトリデータを Datadog に直接送信するのではなく、ゲートウェイサービスに送信するようにデフォルトで構成されています。

ゲートウェイデプロイメントでは、テレメトリがゲートウェイに到達する前にホスト情報を付加します。推奨されるホスト名の構成については、[ホスト名とタグ付け][12]を参照してください。

## 要件 {#requirements}

始める前に、以下があることを確認します。

* **Datadog アカウント**。
    * [Datadog アカウント][1]。
    * Datadog [API キー][2]。
* **ソフトウェア**:
    * Kubernetes クラスター (v1.29+)。EKS Fargate および GKE Autopilot はサポートされていません。
    * [Helm][3] (v3+)。
    * Datadog Helm チャートバージョン 3.160.1 以降、または Datadog Operator バージョン 1.23.0 以降。
    * [kubectl][4]。
* **ネットワーク**:
  {{% otel-network-requirements %}}

## インストールと構成 {#installation-and-configuration}

このガイドでは、Datadog Operator または Helm チャートを使用して DDOT Collector ゲートウェイを構成する方法を説明します。

<div class="alert alert-info">このインストールは、Datadog SDK + DDOT および OpenTelemetry SDK + DDOT 構成の両方に必要です。Datadog SDK は OpenTelemetry API を実装していますが、OTLP メトリクスとログを処理して転送するために DDOT Collector が必要です。</div>

以下のインストール方法のいずれかを使用します。

- **Datadog Operator**: Datadog の設定を自動的に調整して維持する Kubernetes ネイティブのアプローチです。カスタムリソースステータスでデプロイ状況、健全性、エラーを報告し、高度な構成オプションで構成ミスのリスクを抑えます。
- **Helm チャート**: Datadog Agent をデプロイするための簡単な方法です。バージョン管理、ロールバック、テンプレート機能を提供し、デプロイメントの一貫性を保ち、再現を容易にします。

### Datadog Operator または Helm をインストールする {#install-the-datadog-operator-or-helm}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator をまだインストールしていない場合は、Datadog Operator Helm チャートを使用してクラスターにインストールできます。

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

詳細については、[Datadog Operator のドキュメント][1]を参照してください。

[1]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/

{{% /tab %}}
{{% tab "Helm" %}}

Datadog Helm リポジトリをまだ追加していない場合は、今すぐ追加してください。

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

Helm の構成オプションの詳細については、[Datadog Helm チャート README][1] を参照してください。

[1]: http://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md

{{% /tab %}}
{{< /tabs >}}

### DaemonSet を使用してゲートウェイをデプロイする {#deploying-the-gateway-with-a-daemonset}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

開始するには、`DatadogAgent` リソースでゲートウェイと DaemonSet Collector の両方を有効にします。これが最も一般的なセットアップです。

`datadog-agent.yaml` という名前のファイルを作成します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    # Enable the Collector in the Agent DaemonSet
    otelCollector:
      enabled: true

    # Enable the standalone Gateway Deployment
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      # Number of replicas
      replicas: 3
      # Control placement of gateway pods
      nodeSelector:
        gateway: "true"
```

構成を適用します。

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

開始するには、`values.yaml` ファイルでゲートウェイと DaemonSet Collector の両方を有効にします。これが最も一般的なセットアップです。

```yaml
# values.yaml
targetSystem: "linux"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Enable the Collector in the Agent Daemonset
  otelCollector:
    enabled: true

# Enable the standalone Gateway Deployment
otelAgentGateway:
  enabled: true
  replicas: 3
  nodeSelector:
    # Example selector to place gateway pods on specific nodes
    gateway: "true"
```

{{% /tab %}}
{{< /tabs >}}

この場合、daemonset Collector は、OTLP データをゲートウェイの Kubernetes サービスに送信するデフォルト設定を使用します。

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
exporters:
  debug:
    verbosity: detailed
  otlphttp:
    endpoint: http://<release>-datadog-otel-agent-gateway:4318
    tls:
      insecure: true
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
  infraattributes:
    cardinality: 2
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [otlphttp, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector]
      processors: [infraattributes]
      exporters: [otlphttp]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [otlphttp]
```

ゲートウェイ Collector は、サービスのポートでリッスンし、データを Datadog に送信するデフォルト設定を使用します。

```yaml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
exporters:
  debug:
    verbosity: detailed
  datadog:
    api:
      key: ${env:DD_API_KEY}
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
extension:
  datadog:
    api:
      key: ${env:DD_API_KEY}
    deployment_type: gateway
service:
  pipelines:
    traces:
      receivers: [otlp]
      exporters: [datadog]
    metrics:
      receivers: [otlp]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      exporters: [datadog]
```

<div class="alert alert-tip">
<strong>Helm ユーザー向け:</strong> <code>otelAgentGateway.affinity</code> または <code>otelAgentGateway.nodeSelector</code> を構成して Pod の配置を制御し、 <code>otelAgentGateway.replicas</code> を調整してゲートウェイをスケールします。<br>
<strong>Operator ユーザー向け:</strong> これらの設定には <code>override.otelAgentGateway.affinity</code>、<code>override.otelAgentGateway.nodeSelector</code>、および <code>override.otelAgentGateway.replicas</code> を使用します。</div>

### スタンドアロンゲートウェイをデプロイする{#deploying-a-standalone-gateway}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

既存の DaemonSet デプロイメントがある場合は、他のコンポーネントを無効にすることで、ゲートウェイを個別にデプロイできます。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog-gateway
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      # Number of replicas
      replicas: 3
      # Control placement of gateway pods
      nodeSelector:
        gateway: "true"

    # Disable the Agent DaemonSet
    nodeAgent:
      disabled: true
    # Disable the Cluster Agent
    clusterAgent:
      disabled: true
```

ゲートウェイをデプロイした後、既存の DaemonSet Collector の構成を更新して、新しいゲートウェイサービスのエンドポイント (例: `http://datadog-gateway-otel-agent-gateway:4318`) にデータを送信するようにする必要があります。

{{% /tab %}}
{{% tab "Helm" %}}

既存の DaemonSet デプロイメントがある場合は、ゲートウェイを個別にデプロイできます。

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "gw-only"
agents:
  enabled: false
clusterAgent:
  enabled: false
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
otelAgentGateway:
  enabled: true
  replicas: 3
  nodeSelector:
    gateway: "true"
```

ゲートウェイをデプロイした後、既存の DaemonSet Collector の構成を更新して、新しいゲートウェイサービスのエンドポイント (例: `http://gw-only-otel-agent-gateway:4318`) にデータを送信するようにする必要があります。

{{% /tab %}}
{{< /tabs >}}

### Collector 構成のカスタマイズ{#customizing-collector-configurations}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

ConfigMap を使用して、ゲートウェイ Collector の構成をカスタマイズできます。カスタム構成を含む ConfigMap を作成します。

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-gateway-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
          http:
            endpoint: "0.0.0.0:4318"
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
      sending_queue:
        batch:
          flush_timeout: 10s
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [datadog]
        metrics:
          receivers: [otlp]
          exporters: [datadog]
        logs:
          receivers: [otlp]
          exporters: [datadog]
```

次に、それを `DatadogAgent` リソースで参照します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true
      # Reference the custom ConfigMap
      config:
        configMap:
          name: otel-gateway-config

  override:
    otelAgentGateway:
      replicas: 3
```

複数項目の ConfigMap またはインライン構成については、[DatadogAgent の例][1]を参照してください。

[1]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent

{{% /tab %}}
{{% tab "Helm" %}}

`datadog.otelCollector.config` および `otelAgentGateway.config` の値を使用して、DaemonSet Collector とゲートウェイ Collector の両方のデフォルト構成をそれぞれ上書きできます。

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "my-gw"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Enable and configure the DaemonSet Collector
  otelCollector:
    enabled: true
    config: |
      receivers:
        otlp:
          protocols:
            grpc:
              endpoint: "localhost:4317"
      exporters:
        otlp:
          endpoint: http://my-gw-otel-agent-gateway:4317
          tls:
            insecure: true
      service:
        pipelines:
          traces:
            receivers: [otlp]
            exporters: [otlp]
          metrics:
            receivers: [otlp]
            exporters: [otlp]
          logs:
            receivers: [otlp]
            exporters: [otlp]

# Enable and configure the gateway Collector
otelAgentGateway:
  enabled: true
  replicas: 3
  nodeSelector:
    gateway: "true"
  ports:
    - containerPort: 4317
      name: "otel-grpc"
  config: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
        sending_queue:
          batch:
            flush_timeout: 10s
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [datadog]
        metrics:
          receivers: [otlp]
          exporters: [datadog]
        logs:
          receivers: [otlp]
          exporters: [datadog]
```

{{% otel-infraattributes-prereq %}}

<div class="alert alert-info">
 <code>fullnameOverride</code>を設定すると、ゲートウェイの Kubernetes サービス名は <code><fullnameOverride>-otel-agent-gateway</code>になります。 <code>otelAgentGateway.ports</code> で定義されたポートが、このサービスで公開されます。これらのポートが、ゲートウェイの OTLP レシーバー構成および DaemonSet の OTLP エクスポーター構成と一致していることを確認してください。
</div>

{{% /tab %}}
{{< /tabs >}}

例の構成では、簡略化のために安全でない TLS を使用しています。TLS を有効にする場合は、[OTel configtls の手順][7]に従ってください。

### 高度な構成オプション {#advanced-configuration-options}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Datadog Operator は、`override.otelAgentGateway` の下に OTel Agent Gateway 用の追加の構成オプションを提供します (`features.otelAgentGateway` **ではなく** `featureGates` を除く):

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

      # Feature gates for OTel collector (feature-specific configuration)
      featureGates: "telemetry.UseLocalHostAsDefaultMetricsAddress"

  override:
    otelAgentGateway:
      # Number of replicas
      replicas: 3

      # Node selector for pod placement
      nodeSelector:
        kubernetes.io/os: linux
        gateway: "true"

      # Affinity configuration
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - weight: 100
            podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - datadog-otel-agent-gateway
              topologyKey: kubernetes.io/hostname

      # Tolerations for tainted nodes
      tolerations:
      - key: "dedicated"
        operator: "Equal"
        value: "otel-gateway"
        effect: "NoSchedule"

      # Priority class for scheduling
      priorityClassName: high-priority

      # Environment variables
      env:
      - name: OTEL_LOG_LEVEL
        value: "info"

      # Environment variables from ConfigMaps or Secrets
      envFrom:
      - configMapRef:
          name: otel-gateway-config

      # Custom image (optional)
      image:
        name: ddot-collector
        tag: "{{< version key="ddot_gateway_version" >}}"
        pullPolicy: IfNotPresent

      # Pod-level security context
      securityContext:
        runAsUser: 1000
        runAsGroup: 1000
        fsGroup: 1000

      # Configure resources
      containers:
        otel-agent:
          resources:
            requests:
              cpu: 200m
              memory: 512Mi
            limits:
              cpu: 500m
              memory: 1Gi

      # Additional labels and annotations
      labels:
        team: observability
      annotations:
        prometheus.io/scrape: "true"
```

利用可能なすべてのオプションの完全なリファレンスについては、[DatadogAgent v2alpha1 構成ドキュメント][1]を参照してください。

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}
{{% tab "Helm" %}}

Helm ベースのデプロイメントの場合、これらの高度な構成オプションの多くは、`values.yaml` ファイルの `otelAgentGateway` セクションで直接設定できます。詳細なリファレンスについては、[Datadog Helm chart README][1] を参照してください。

[1]: http://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md

{{% /tab %}}
{{< /tabs >}}

## 高度なユースケース {#advanced-use-cases}

### ロードバランシングエクスポーターを使用したテールサンプリング {#tail-sampling-with-the-load-balancing-exporter}

ゲートウェイの主なユースケースは、テールベースのサンプリングです。特定のトレースのすべてのスパンが同じゲートウェイ Pod によって処理されるようにするには、DaemonSet Collector で **ロードバランシングエクスポーター**を使用します。このエクスポーターは、`traceID` などのキーに基づいて一貫してスパンをルーティングします。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

DaemonSet Collector は `loadbalancing` エクスポーターで構成されており、Kubernetes サービスリゾルバーを使用してゲートウェイ Pod を検出し、データをルーティングします。ゲートウェイ Collector は `tail_sampling` プロセッサーを使用して、Datadog にエクスポートする前に定義されたポリシーに基づいてトレースをサンプリングします。

**注**: ロードバランシングエクスポーターの k8s リゾルバーには、RBAC 権限が必要です。

ロードバランシングエクスポーターを使用した DaemonSet Collector の構成を作成します。

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-daemonset-config
data:
  otel-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "localhost:4317"
    exporters:
      loadbalancing:
        routing_key: "traceID"
        protocol:
          otlp:
            tls:
              insecure: true
        resolver:
          k8s:
            service: datadog-otel-agent-gateway
            ports:
              - 4317
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [loadbalancing]
```

テールサンプリングを使用したゲートウェイ Collector の構成を作成します。

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-gateway-tailsampling-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    processors:
      tail_sampling:
        decision_wait: 10s
        policies:
          # Add your sampling policies here
          - name: sample-errors
            type: status_code
            status_code:
              status_codes: [ERROR]
          - name: sample-slow-traces
            type: latency
            latency:
              threshold_ms: 1000
    connectors:
      datadog/connector:
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
    service:
      pipelines:
        traces/sample:
          receivers: [otlp]
          processors: [tail_sampling]
          exporters: [datadog]
        traces:
          receivers: [otlp]
          exporters: [datadog/connector]
        metrics:
          receivers: [datadog/connector]
          exporters: [datadog]
```

DatadogAgent の構成を適用します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelCollector:
      enabled: true
      # Reference the custom DaemonSet config
      config:
        configMap:
          name: otel-daemonset-config
      # RBAC permissions for the k8s resolver
      rbac:
        create: true

    otelAgentGateway:
      enabled: true
      # Reference the custom gateway config
      config:
        configMap:
          name: otel-gateway-tailsampling-config

  override:
    otelAgentGateway:
      replicas: 3
```

エンドポイントにアクセスするための DaemonSet 用 ClusterRole を作成します。

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: otel-collector-k8s-resolver
rules:
- apiGroups: [""]
  resources: ["endpoints"] # for v0.139.0 and before
  verbs: ["get", "watch", "list"]
- apiGroups: ["discovery.k8s.io"]
  resources: ["endpointslices"] # for v0.140.0 and after
  verbs: ["get", "watch", "list"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: otel-collector-k8s-resolver
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: otel-collector-k8s-resolver
subjects:
- kind: ServiceAccount
  name: datadog-agent
  namespace: default
```

<div class="alert alert-warning">
サンプリング前にトレースの 100% で APM Stats が計算されるようにするため、 <code>datadog/connector</code> は <code>tail_sampling</code> プロセッサーを含まない別のパイプラインで実行されます。コネクターは、DaemonSet レイヤーまたはゲートウェイレイヤーのいずれかで実行できます。
</div>

{{% /tab %}}
{{% tab "Helm" %}}

以下の構成では、

1.  daemonset Collector (`datadog.otelCollector`)は `loadbalancing` エクスポーターで構成されており、Kubernetes サービスリゾルバーを使用してゲートウェイ Pod を検出し、データをルーティングします。
2.  ゲートウェイ Collector (`otelAgentGateway`) は `tail_sampling` プロセッサーを使用して、Datadog にエクスポートする前に定義されたポリシーに基づいてトレースをサンプリングします。

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "my-gw"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  otelCollector:
    enabled: true
    # RBAC permissions are required for the k8s resolver in the loadbalancing exporter
    rbac:
      create: true
      rules:
        - apiGroups: [""]
          resources: ["endpoints"] # for v0.139.0 and before
          verbs: ["get", "watch", "list"]
        - apiGroups: ["discovery.k8s.io"]
          resources: ["endpointslices"] # for v0.140.0 and after
          verbs: ["get", "watch", "list"]
    config: |
      receivers:
        otlp:
          protocols:
            grpc:
              endpoint: "localhost:4317"
      exporters:
        loadbalancing:
          routing_key: "traceID"
          protocol:
            otlp:
              tls:
                insecure: true
          resolver:
            k8s:
              service: my-gw-otel-agent-gateway
              ports:
                - 4317
      service:
        pipelines:
          traces:
            receivers: [otlp]
            exporters: [loadbalancing]

otelAgentGateway:
  enabled: true
  replicas: 3
  ports:
    - containerPort: 4317
      name: "otel-grpc"
  config: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    processors:
      tail_sampling:
        decision_wait: 10s
        policies: <Add your sampling policies here>
    connectors:
      datadog/connector:
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
    service:
      pipelines:
        traces/sample:
          receivers: [otlp]
          processors: [tail_sampling]
          exporters: [datadog]
        traces:
          receivers: [otlp]
          exporters: [datadog/connector]
        metrics:
          receivers: [datadog/connector]
          exporters: [datadog]
```

<div class="alert alert-warning">
サンプリング前にトレースの 100% で APM Stats が計算されるようにするため、 <code>datadog/connector</code> は <code>tail_sampling</code> プロセッサーを含まない別のパイプラインで実行されます。コネクターは、DaemonSet レイヤーまたはゲートウェイレイヤーのいずれかで実行できます。
</div>

{{% /tab %}}
{{< /tabs >}}

### カスタム Collector イメージの使用{#using-a-custom-collector-image}

ゲートウェイにカスタムビルドの Collector イメージを使用するには、イメージリポジトリとタグを指定します。カスタムイメージのビルド方法については、[カスタム OpenTelemetry コンポーネントの使用][5]を参照してください。

<div class="alert alert-info">
<strong>注:</strong> Datadog Operator は、以下のイメージ名の形式をサポートしています。
<ul>
  <li><code>name</code> - イメージ名 (例:<code>ddot-collector</code>)</li>
  <li><code>name:tag</code> - タグ付きイメージ名 (例:<code>ddot-collector:{{% version key="ddot_gateway_version" %}}</code>)</li>
  <li><code>registry/name:tag</code> - 完全なイメージ参照 (例:<code>gcr.io/datadoghq/ddot-collector:{{% version key="ddot_gateway_version" %}}</code>)</li>
</ul>
 <code>registry/name</code> 形式 (name フィールドにタグを含めない形式) は、別の <code>tag</code> フィールドを使用する場合は<strong>サポートされません</strong>。 <code>name</code> フィールドにタグ付きの完全なイメージ参照を含めるか、イメージ名と別の <code>tag</code> フィールドを使用してください。
</div>

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
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      image:
        name: <YOUR REPO>:<IMAGE TAG>
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
# values.yaml
targetSystem: "linux"
agents:
  enabled: false
clusterAgent:
  enabled: false
otelAgentGateway:
  enabled: true
  image:
    repository: <YOUR REPO>
    tag: <IMAGE TAG>
    doNotCheckTag: true
  ports:
    - containerPort: "4317"
      name: "otel-grpc"
  config: | <YOUR CONFIG>
```

{{% /tab %}}
{{< /tabs >}}

### Horizontal Pod Autoscaler (HPA) によるオートスケーリングを有効にする {#enable-autoscaling-with-horizontal-pod-autoscaler-hpa}

DDOT Collector ゲートウェイは、Kubernetes の Horizontal Pod Autoscaler (HPA) 機能によるオートスケーリングをサポートしています。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

**注**: Datadog Operator は、HPA リソースを直接管理しません。HPA リソースを個別に作成し、OTel Agent Gateway デプロイメントをターゲットにするように構成する必要があります。

HPA リソースを作成してください。

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: datadog-otel-agent-gateway-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: datadog-otel-agent-gateway
  minReplicas: 2
  maxReplicas: 10
  metrics:
  # Aim for high CPU utilization for higher throughput
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
  behavior:
    scaleUp:
      stabilizationWindowSeconds: 30
    scaleDown:
      stabilizationWindowSeconds: 60
```

リソースリクエスト/制限 (HPA に必要) を指定して DatadogAgent 構成を適用してください。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      replicas: 4  # Initial replicas, HPA will override based on metrics
      containers:
        otel-agent:
          resources:
            requests:
              cpu: 200m
              memory: 512Mi
            limits:
              cpu: 500m
              memory: 1Gi
```

{{% /tab %}}
{{% tab "Helm" %}}

HPA を有効にするには、`otelAgentGateway.autoscaling`を構成してください。

```yaml
# values.yaml
targetSystem: "linux"
agents:
  enabled: false
clusterAgent:
  enabled: false
otelAgentGateway:
  enabled: true
  ports:
    - containerPort: "4317"
      name: "otel-grpc"
  config: | <YOUR CONFIG>
  replicas: 4  # 4 replicas to begin with and HPA may override it based on the metrics
  autoscaling:
    enabled: true
    minReplicas: 2
    maxReplicas: 10
    metrics:
      # Aim for high CPU utilization for higher throughput
      - type: Resource
        resource:
          name: cpu
          target:
            type: Utilization
            averageUtilization: 80
    behavior:
      scaleUp:
        stabilizationWindowSeconds: 30
      scaleDown:
        stabilizationWindowSeconds: 60
```

{{% /tab %}}
{{< /tabs >}}

オートスケーリングの入力として、リソースメトリクス (CPU またはメモリ)、カスタムメトリクス (Kubernetes Pod または Object)、または外部メトリクスを使用できます。リソースメトリクスを使用する場合は、[Kubernetes metrics server][9] がクラスター内で実行されていることを確認してください。カスタムメトリクスまたは外部メトリクスについては、[Datadog Cluster Agent メトリクスプロバイダー][10]の構成を検討してください。

### マルチレイヤーゲートウェイをデプロイする {#deploying-a-multi-layer-gateway}

高度なシナリオでは、複数のゲートウェイレイヤーをデプロイして処理チェーンを作成できます。

{{< tabs >}}
{{% tab "Datadog Operator" %}}

各レイヤーを個別の `DatadogAgent` リソースとして、最終レイヤーから逆順にデプロイします。

1.  **レイヤー 1 (最終レイヤー) をデプロイ:** このレイヤーはレイヤー 2 から受信し、Datadog にエクスポートします。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog-gw-layer-1
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true
      config:
        configMap:
          name: gw-layer-1-config

  override:
    otelAgentGateway:
      replicas: 3
      nodeSelector:
        gateway: "gw-node-1"

    nodeAgent:
      disabled: true
    clusterAgent:
      disabled: true
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: gw-layer-1-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [datadog]
        metrics:
          receivers: [otlp]
          exporters: [datadog]
        logs:
          receivers: [otlp]
          exporters: [datadog]
```

2.  **レイヤー 2 (中間レイヤー) をデプロイ:** このレイヤーは DaemonSet から受信し、レイヤー 1 にエクスポートします。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog-gw-layer-2
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelAgentGateway:
      enabled: true
      config:
        configMap:
          name: gw-layer-2-config

  override:
    otelAgentGateway:
      replicas: 3
      nodeSelector:
        gateway: "gw-node-2"

    nodeAgent:
      disabled: true
    clusterAgent:
      disabled: true
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: gw-layer-2-config
data:
  otel-gateway-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "0.0.0.0:4317"
    exporters:
      otlp:
        endpoint: http://datadog-gw-layer-1-otel-agent-gateway:4317
        tls:
          insecure: true
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [otlp]
        metrics:
          receivers: [otlp]
          exporters: [otlp]
        logs:
          receivers: [otlp]
          exporters: [otlp]
```

3.  **DaemonSet をデプロイ:** DaemonSet がレイヤー 2 にエクスポートするように構成します。

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  features:
    otelCollector:
      enabled: true
      config:
        configMap:
          name: daemonset-layer2-config
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: daemonset-layer2-config
data:
  otel-config.yaml: |
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: "localhost:4317"
    exporters:
      otlp:
        endpoint: http://datadog-gw-layer-2-otel-agent-gateway:4317
        tls:
          insecure: true
    service:
      pipelines:
        traces:
          receivers: [otlp]
          exporters: [otlp]
        metrics:
          receivers: [otlp]
          exporters: [otlp]
        logs:
          receivers: [otlp]
          exporters: [otlp]
```

{{% /tab %}}
{{% tab "Helm" %}}

各レイヤーを個別の Helm リリースとして、最終レイヤーから逆順にデプロイします。

1.  **レイヤー 1 (最終レイヤー) をデプロイ:** このレイヤーはレイヤー 2 から受信し、Datadog にエクスポートします。

    ```yaml
    # layer-1-values.yaml
    targetSystem: "linux"
    fullnameOverride: "gw-layer-1"
    agents:
      enabled: false
    clusterAgent:
      enabled: false
    otelAgentGateway:
      enabled: true
      replicas: 3
      nodeSelector:
        gateway: "gw-node-1"
      ports:
        - containerPort: "4317"
          hostPort: "4317"
          name: "otel-grpc"
      config: |
        receivers:
          otlp:
            protocols:
              grpc:
                endpoint: "0.0.0.0:4317"
        exporters:
          datadog:
            api:
              key: <API Key>
        service:
          pipelines:
            traces:
              receivers: [otlp]
              exporters: [datadog]
            metrics:
              receivers: [otlp]
              exporters: [datadog]
            logs:
              receivers: [otlp]
              exporters: [datadog]
    ```

2.  **レイヤー 2 (中間レイヤー) をデプロイ:** このレイヤーは DaemonSet から受信し、レイヤー 1 にエクスポートします。

    ```yaml
    # layer-2-values.yaml
    targetSystem: "linux"
    fullnameOverride: "gw-layer-2"
    agents:
      enabled: false
    clusterAgent:
      enabled: false
    otelAgentGateway:
      enabled: true
      replicas: 3
      nodeSelector:
        gateway: "gw-node-2"
      ports:
        - containerPort: "4317"
          hostPort: "4317"
          name: "otel-grpc"
      config: |
        receivers:
          otlp:
            protocols:
              grpc:
                endpoint: "0.0.0.0:4317"
        exporters:
          otlp:
            endpoint: http://gw-layer-1-otel-agent-gateway:4317
            tls:
              insecure: true
        service:
          pipelines:
            traces:
              receivers: [otlp]
              exporters: [otlp]
            metrics:
              receivers: [otlp]
              exporters: [otlp]
            logs:
              receivers: [otlp]
              exporters: [otlp]
    ```

3.  **DaemonSet をデプロイ:** DaemonSet がレイヤー 2 にエクスポートするように構成します。

    ```yaml
    # daemonset-values.yaml
    targetSystem: "linux"
    datadog:
      apiKey: <DATADOG_API_KEY>
      appKey: <DATADOG_APP_KEY>
      otelCollector:
        enabled: true
        config: |
          receivers:
            otlp:
              protocols:
                grpc:
                  endpoint: "localhost:4317"
          exporters:
            otlp:
              endpoint: http://gw-layer-2-otel-agent-gateway:4317
              tls:
                insecure: true
          service:
            pipelines:
              traces:
                receivers: [otlp]
                exporters: [otlp]
              metrics:
                receivers: [otlp]
                exporters: [otlp]
              logs:
                receivers: [otlp]
                exporters: [otlp]
    ```

{{% /tab %}}
{{< /tabs >}}

## Fleet Automation でゲートウェイ Pod を表示する {#view-gateway-pods-on-fleet-automation}

DDOT Collector ゲートウェイには、デフォルトで [Datadog 拡張機能][11]が含まれています。この拡張機能は、Collector のビルド情報と構成を Datadog にエクスポートするため、Infrastructure Monitoring および Fleet Automation からテレメトリパイプラインを監視できます。

ゲートウェイ Pod を表示するには、

1. {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Fleet Automation{{< /ui >}} に移動します。

  {{< img src="opentelemetry/embedded_collector/fleet_automation2.png" alt="DDOT ゲートウェイ Pod を表示する Fleet Automation ページ" style="width:100%;" >}}

2. ゲートウェイ Pod を選択して、詳細なビルド情報と実行中の Collector 構成を表示する。

  {{< img src="opentelemetry/embedded_collector/fleet_automation3.png" alt="1 つの DDOT ゲートウェイ Pod の Collector 構成を表示する Fleet Automation ページ" style="width:100%;" >}}

## 既知の制限 {#known-limitations}

  * **起動時の競合状態**: DaemonSet とゲートウェイを同じリリースでデプロイする場合、ゲートウェイサービスが準備完了になる前に DaemonSet Pod が起動し、初期接続エラーログが発生することがあります。OTLP エクスポーターは自動的に再試行するため、これらのログは無視しても問題ありません。あるいは、ゲートウェイを先にデプロイし、ゲートウェイが準備完了するのを待ってから DaemonSet をデプロイしてください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://helm.sh
[4]: https://kubernetes.io/docs/tasks/tools/#kubectl
[5]: /ja/opentelemetry/setup/ddot_collector/custom_components
[6]: https://opentelemetry.io/docs/collector/deployment/gateway/
[7]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/configtls
[9]: http://github.com/kubernetes-sigs/metrics-server
[10]: /ja/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/datadogextension
[12]: /ja/opentelemetry/config/hostname_tagging/#collector-exporting-through-a-gateway