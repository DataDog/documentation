---
aliases:
- /ja/opentelemetry/agent/install_agent_with_collector
- /ja/opentelemetry/setup/ddot_collector/install/kubernetes
code_lang: kubernetes_daemonset
code_lang_weight: 1
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: よくあるご質問
  text: Datadog Agent でカスタム OpenTelemetry コンポーネントを使用する
title: DDOT Collector を Kubernetes DaemonSet としてインストールする
type: multi-code-lang
---
## 概要 {#overview}

このガイドに従って、Helm または Datadog Operator を使用して、Kubernetes DaemonSet として Datadog Distribution of OpenTelemetry (DDOT) Collector をデプロイします。

<div class="alert alert-info">
  <strong>追加の OpenTelemetry コンポーネントが必要ですか？</strong>デフォルトパッケージに含まれているコンポーネントを超えるコンポーネントが必要な場合は、<a href="/opentelemetry/setup/ddot_collector/custom_components">カスタム OpenTelemetry コンポーネントの使用</a>に従って、Datadog Agent の機能を拡張してください。デフォルトで含まれているコンポーネントのリストについては、<a href="/opentelemetry/agent/#opentelemetry-collector-components">OpenTelemetry Collector コンポーネント</a>を参照してください。
</div>

## 要件 {#requirements}

このガイドの手順を実行するには、以下の準備が必要です。

**Datadog アカウント**:
1. まだお持ちでない場合は、[Datadog アカウントを作成][1] してください。
1. [Datadog API キー][2] を見つけるか、作成します。

**ソフトウェア**:
次のものをマシンにインストールして設定してください:

- Kubernetes クラスター (v1.29+)
- [Helm (v3+)][54]
- [kubectl][5]

**ネットワーク**:{{% otel-network-requirements %}}

## OpenTelemetry Collector を使用して Datadog Agent をインストールする {#install-the-datadog-agent-with-opentelemetry-collector}

<div class="alert alert-info">このインストールは、Datadog SDK + DDOT および OpenTelemetry SDK + DDOT 構成の両方に必要です。Datadog SDK は OpenTelemetry API を実装していますが、OTLP メトリクスとログを処理して転送するために DDOT Collector が必要です。</div>

### インストール方法を選択する {#select-installation-method}

以下のインストール方法のいずれかを使用します。

- [Datadog Operator][55]: Datadog の設定を自動的に調整し維持する [Kubernetes ネイティブ][56] アプローチです。カスタムリソースステータスでデプロイ状況、健全性、エラーを報告し、高度なコンフィギュレーションオプションでコンフィギュレーションミスのリスクを抑えます。
- [Helm チャート][4]: Datadog Agent をデプロイするための簡単な方法です。バージョン管理、ロールバック、テンプレート機能を提供し、デプロイメントの一貫性を保ち、再現を容易にします。

{{< tabs >}}
{{% tab "Datadog Operator" %}}
### Datadog Operator をインストールする {#install-the-datadog-operator}

[Datadog Operator Helm チャート][1] を使用して、クラスターに Datadog Operator をインストールできます:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md
{{% /tab %}}
{{% tab "Helm" %}}
### Datadog Helm リポジトリを追加する {#add-the-datadog-helm-repository}

Datadog リポジトリを Helm リポジトリに追加するには:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Datadog API キーを設定する {#set-up-datadog-api-key}

1. Datadog [API キー][2] を取得します。
1. API キーを Kubernetes シークレットとして保存します:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```
   `<DD_API_KEY>`を実際の Datadog API キーに置き換えます。

### Datadog Agent を構成する {#configure-the-datadog-agent}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Datadog Operator をデプロイした後、Kubernetes クラスター内で Datadog Agent、Cluster Agent、および Cluster Checks Runners (使用する場合) のデプロイメントをトリガーする `DatadogAgent` リソースを作成します。Datadog Agent は DaemonSet としてデプロイされ、クラスターのすべてのノードでポッドを実行します。

1. `datadog-agent.yaml` ファイルを使用して、`DatadogAgent` デプロイメント構成を指定します。

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
   apiVersion: datadoghq.com/v2alpha1
   kind: DatadogAgent
   metadata:
     name: datadog
   spec:
     global:
       clusterName: <CLUSTER_NAME>
       site: <DATADOG_SITE>
       credentials:
         apiSecret:
           secretName: datadog-secret
           keyName: api-key
{{< /code-block >}}

  - `<CLUSTER_NAME>` をクラスターの名前に置き換えます。
  - `<DATADOG_SITE>` を自分の [Datadog サイト][1] に置き換えます。使用するサイトは {{< region-param key="dd_site" code="true" >}}(右側で正しい **DATADOG SITE** が選択されていることを確認してください。)

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">FIPS 準拠の Agent イメージを使用するには、FED 用に <code>useFIPSAgent: true</code> ( <code>spec.global</code> 下) を設定してください。<a href="/agent/configuration/fips-compliance/">FIPS コンプライアンス</a>を参照してください。</div>
{{% /site-region %}}

2. OpenTelemetry Collector を有効にします:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  # Enable Features
  features:
    otelCollector:
      enabled: true
{{< /code-block >}}

Datadog Operator は、デフォルトで OpenTelemetry Collector をポート `4317` (名前は `otel-grpc`) および `4318` (名前は `otel-http`) に自動的にバインドします。

3. (オプション) 追加の Datadog 機能を有効にします:

<div class="alert alert-warning">これらの機能を有効にすると、追加料金が発生する場合があります。<a href="https://www.datadoghq.com/pricing/">料金ページ</a>を確認し、進む前にカスタマーサクセスマネージャーに相談してください。</div>

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  # Enable Features
  features:
  ...
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
{{< /code-block >}}

追加の Datadog 機能を有効にする際は、Datadog 環境変数に依存するのではなく、必ず Datadog または OpenTelemetry Collector の設定ファイルを使用してください。

**注**: operator `v1.22.0` の時点で、DDOT コンテナは `-full` Agent イメージの代わりに `ddot-collector` イメージを使用します。
- ノード Agent イメージタグを上書きする場合は、OpenTelemetry コンテナがスケジュールされるように、タグ >= `7.67.0` を使用してください (`ddot-collector` イメージは >= `7.67.0` でのみサポートされています)。
- この `ddot-collector` イメージには `-full` バリアントはありません。`-full` イメージが必要な場合は、`spec.override.nodeAgent.image.name` を完全な Agent イメージ (例: `registry.datadoghq.com/agent:7.72.1-full`) に設定してください。

[1]: /ja/getting_started/site
[2]: /ja/containers/guide/changing_container_registry/
{{% /tab %}}
{{% tab "Helm" %}}
YAML ファイルを使用して、[Datadog Agent チャート][1] の Helm チャートパラメーターを指定します。

1. 空の `datadog-values.yaml` ファイルを作成します:

```shell
touch datadog-values.yaml
```

<div class="alert alert-info">未指定のパラメーターは <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml">values.yaml</a> のデフォルトを使用します。</div>

2. Datadog API キーシークレットを構成します:

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  site: <DATADOG_SITE>
  apiKeyExistingSecret: datadog-secret
{{< /code-block >}}

`<DATADOG_SITE>` を [Datadog サイト][2] に設定します。そうでない場合、デフォルトは `datadoghq.com`、US1 サイトになります。

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">FED の場合、FIPS 準拠の Agent イメージを使用するために、 <code>useFIPSAgent: true</code> を <code>datadog-values.yaml</code> のルートに設定してください。<a href="/agent/configuration/fips-compliance/">FIPS コンプライアンス</a>を参照してください。</div>
{{% /site-region %}}

3. OpenTelemetry Collector を有効にし、必須のポートを設定します:

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317" # default port for OpenTelemetry gRPC receiver.
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318" # default port for OpenTelemetry HTTP receiver
        hostPort: "4318"
        name: otel-http
{{< /code-block >}}

`hostPort` を設定して、コンテナポートを外部ネットワークに公開します。これにより、OTLP エクスポーターを設定して、Datadog Agent が割り当てられているノードの IP アドレスを指定できるようになります。

ポートを公開したくない場合は、代わりに Agent サービスを使用できます:
   -  <code>hostPort</code> のエントリを、 <code>datadog-values.yaml</code> ファイルから削除してください。
   - アプリケーションのデプロイメントファイル (`deployment.yaml`) で、OTLP エクスポーターを Agent サービスを使用するように設定します:
      ```yaml
      env:
        - name: OTEL_EXPORTER_OTLP_ENDPOINT
          value: 'http://<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local'
        - name: OTEL_EXPORTER_OTLP_PROTOCOL
          value: 'grpc'
      ```

4. (オプション) 追加の Datadog 機能を有効にします:

<div class="alert alert-warning">これらの機能を有効にすると、追加料金が発生する場合があります。<a href="https://www.datadoghq.com/pricing/">料金ページ</a>を確認し、進む前にカスタマーサクセスマネージャーに相談してください。</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  apm:
    portEnabled: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true
{{< /code-block >}}

追加の Datadog 機能を有効にする際は、Datadog 環境変数に依存するのではなく、必ず Datadog または OpenTelemetry Collector の設定ファイルを使用してください。

5. (オプション) ポッドラベルを収集し、それらをメトリクス、トレース、およびログに付与するタグとして使用します:

<div class="alert alert-warning">カスタムメトリクスは課金に影響する可能性があります。詳細については、<a href="https://docs.datadoghq.com/account_management/billing/custom_metrics">カスタムメトリクスの課金ページ</a>を参照してください。</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  podLabelsAsTags:
    app: kube_app
    release: helm_release
{{< /code-block >}}

{{% collapse-content title="完成した datadog-values.yaml ファイル" level="p" %}}
`datadog-values.yaml` ファイルは次のようになります:
{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="false" >}}
datadog:
  site: datadoghq.com
  apiKeyExistingSecret: datadog-secret

  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317"
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318"
        hostPort: "4318"
        name: otel-http
  apm:
    portEnabled: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true

  podLabelsAsTags:
    app: kube_app
    release: helm_release
   {{< /code-block >}}

{{% /collapse-content %}}

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[2]: /ja/getting_started/site/
[3]: /ja/containers/guide/changing_container_registry/
{{% /tab %}}
{{< /tabs >}}

### OpenTelemetry Collector を構成する {#configure-the-opentelemetry-collector}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Datadog Operator は、出発点として使用できるサンプルの OpenTelemetry Collector 構成を提供します。この構成を変更する必要がある場合、Datadog Operator はカスタム Collector 構成を提供する 2 つの方法をサポートしています:

- **インライン構成**: カスタム Collector 構成を `features.otelCollector.conf.configData` フィールドに直接追加します。
- **ConfigMap ベースの構成**: Collector 構成を ConfigMap に保存し、`features.otelCollector.conf.configMap` フィールドで参照します。このアプローチにより、Collector の構成を `DatadogAgent` リソースから切り離して保持できます。

####  インライン Collector 構成 {#inline-collector-configuration}

以下のスニペットでは、Collector の構成が `features.otelCollector.conf.configData` パラメータの直下に配置されています:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
  ...
  # Enable Features
  features:
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configData: |-
          receivers:
            prometheus:
              config:
                scrape_configs:
                  - job_name: "otelcol"
                    scrape_interval: 10s
                    static_configs:
                      - targets:
                          - 0.0.0.0:8888
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
                site: ${env:DD_SITE}
              sending_queue:
                batch:
                  flush_timeout: 10s
          processors:
            infraattributes:
              cardinality: 2
          connectors:
            datadog/connector:
              traces:
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
{{< /code-block >}}

{{% otel-infraattributes-prereq %}}

この `datadog-agent.yaml` ファイルに含まれる `DatadogAgent` リソースを適用すると、Operator は Collector の構成を Agent DaemonSet に自動的にマウントします。

{{% collapse-content title="インライン Collector 構成を含む datadog-agent.yaml ファイルが完成しました。" level="p" %}}
インライン Collector 構成を含む `datadog-agent.yaml` が完成したものは、次のようになります:
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  # Enable Features
  features:
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configData: |-
          receivers:
            prometheus:
              config:
                scrape_configs:
                  - job_name: "datadog-agent"
                    scrape_interval: 10s
                    static_configs:
                      - targets:
                          - 0.0.0.0:8888
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
                site: ${env:DD_SITE}
              sending_queue:
                batch:
                  flush_timeout: 10s
          processors:
            infraattributes:
              cardinality: 2
          connectors:
            datadog/connector:
              traces:
          service:
            pipelines:
              traces:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

#### ConfigMap ベースの Collector 構成 {#configmap-based-collector-configuration}

より複雑または頻繁に更新される構成の場合、Collector 構成を ConfigMap に保存することでバージョン管理が簡素化されることがあります。

1. Collector 構成を含む ConfigMap を作成します:

{{< code-block lang="yaml" filename="configmap.yaml" collapsible="false" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-config-map
  namespace: system
data:
  # must be named otel-config.yaml
  otel-config.yaml: |-
    receivers:
      prometheus:
        config:
          scrape_configs:
            - job_name: "datadog-agent"
              scrape_interval: 10s
              static_configs:
                - targets:
                    - 0.0.0.0:8888
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
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    processors:
      infraattributes:
        cardinality: 2
    connectors:
      datadog/connector:
        traces:
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
{{< /code-block >}}

<div class="alert alert-danger">ConfigMap 内の Collector 構成のフィールドは、次のように呼ばれる必要があります。 <code>otel-config.yaml</code>下の Pod テンプレートに追加してください。</div>

2. パラメータを使用して、`otel-agent-config-map` リソース内の `DatadogAgent` ConfigMap を参照します:`features.otelCollector.conf.configMap`
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
  ...
  # Enable Features
  features:
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configMap:
          name: otel-agent-config-map
{{< /code-block >}}

Operator は ConfigMap から `otel-config.yaml` を Agent の OpenTelemetry Collector DaemonSet に自動的にマウントします。

{{% collapse-content title="ConfigMap 内に Collector 構成を含む datadog-agent.yaml ファイルが完成しました。" level="p" %}}
ConfigMap として定義された Collector 構成を含む `datadog-agent.yaml` が完成したものは、次のようになります:
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key

  # Enable Features
  features:
    apm:
      enabled: true
    orchestratorExplorer:
      enabled: true
    processDiscovery:
      enabled: true
    liveProcessCollection:
      enabled: true
    usm:
      enabled: true
    clusterChecks:
      enabled: true
    otelCollector:
      enabled: true
      ports:
        - containerPort: 4317
          hostPort: 4317
          name: otel-grpc
        - containerPort: 4318
          hostPort: 4318
          name: otel-http
      conf:
        configMap:
          name: otel-agent-config-map
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-config-map
  namespace: system
data:
  # must be named otel-config.yaml
  otel-config.yaml: |-
    receivers:
      prometheus:
        config:
          scrape_configs:
            - job_name: "datadog-agent"
              scrape_interval: 10s
              static_configs:
                - targets:
                    - 0.0.0.0:8888
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
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    processors:
      infraattributes:
        cardinality: 2
    connectors:
      datadog/connector:
        traces:
    service:
      pipelines:
        traces:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Helm" %}}
Datadog Helm チャートは、出発点として使用できるサンプルの OpenTelemetry Collector 構成を提供します。このセクションでは、事前定義されたパイプラインと含まれている OpenTelemetry コンポーネントについて説明します。

これは `otel-config.yaml` における完全な OpenTelemetry Collector 構成です:

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 10s
          static_configs:
            - targets: ["0.0.0.0:8888"]
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
      site: ${env:DD_SITE}
    sending_queue:
      batch:
        flush_timeout: 10s
processors:
  infraattributes:
    cardinality: 2
connectors:
  datadog/connector:
    traces:
service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog]

{{< /code-block >}}

{{% otel-infraattributes-prereq %}}

{{% /tab %}}
{{< /tabs >}}

#### 主要コンポーネント {#key-components}

Datadog にテレメトリデータを送信するために、構成内で次のコンポーネントが定義されています:

{{< img src="/opentelemetry/embedded_collector/components-3.jpg" alt="Agent のデプロイメントパターンを示す図" style="width:100%;" >}}

##### Datadog コネクタ {#datadog-connector}

[Datadog コネクタ][6] は Datadog APM トレースメトリクスを計算します。

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
{{< /code-block >}}

##### Datadog エクスポーター {#datadog-exporter}

[Datadog エクスポーター][7] はトレース、メトリクス、およびログを Datadog にエクスポートします。

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: ${env:DD_SITE}
    sending_queue:
      batch:
        flush_timeout: 10s
{{< /code-block >}}

**注**: `key` が指定されていないかシークレットに設定されている場合、または `site` が指定されていない場合、システムはコア Agent の設定から値を使用します。デフォルトでは、コア Agent はサイトを `datadoghq.com` (US1) に設定します。

##### Prometheus レシーバー {#prometheus-receiver}

[Prometheus レシーバー][8] はメトリクスパイプラインのために OpenTelemetry Collector からヘルスメトリクスを収集します。

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 10s
          static_configs:
            - targets: ["0.0.0.0:8888"]
{{< /code-block >}}

詳細については、[コレクターのヘルスメトリクス][8] ドキュメントを参照してください。

### OpenTelemetry Collector を使用して Agent をデプロイする {#deploy-the-agent-with-the-opentelemetry-collector}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
構成ファイルを使用して Datadog Agent をデプロイします:

```shell
kubectl apply -f datadog-agent.yaml
```

これにより、DDOT OpenTelemetry Collector を使用して Datadog Agent が DaemonSet としてデプロイされます。Collector は、[Agent デプロイメントパターン][1] に従って、アプリケーションと同じホスト上で実行されます。[Gateway デプロイメントパターン][2] はプレビュー中です。インストール手順については、[DDOT Kubernetes Gateway インストールガイド][3] に従ってください。

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /ja/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{% tab "Helm" %}}
Kubernetes 環境で OpenTelemetry Collector を使用して Datadog Agent をインストールまたはアップグレードするには、次の Helm コマンドのいずれかを使用してください:

- デフォルトの OpenTelemetry Collector 構成の場合:
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog -f datadog-values.yaml
   ```

- カスタム OpenTelemetry Collector 構成の場合:
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog \
     -f datadog-values.yaml \
     --set-file datadog.otelCollector.config=otel-config.yaml
   ```
   このコマンドを使用すると、独自の `otel-config.yaml` ファイルを指定できます。

`<RELEASE_NAME>` を、使用している Helm リリース名に置き換えてください。

<div class="alert alert-info">デプロイメントプロセス中に警告が表示される場合があります。これらの警告は無視できます。</div>

この Helm チャートは、OpenTelemetry Collector を使用して Datadog Agent を DaemonSet としてデプロイします。Collector は、[Agent デプロイメントパターン][1] に従って、アプリケーションと同じホストにデプロイされます。[Gateway デプロイメントパターン][2] はプレビュー中です。インストール手順については、[DDOT Kubernetes Gateway インストールガイド][3] に従ってください。

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /ja/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="デプロイメント図" level="p" %}}
{{< img src="/opentelemetry/embedded_collector/deployment-2.png" alt="Agent のデプロイメントパターンを示す図" style="width:100%;" >}}
{{% /collapse-content %}}

## Datadog にテレメトリを送信する {#send-your-telemetry-to-datadog}

テレメトリデータを Datadog に送信するには:

1. [Instrument your application](#instrument-the-application)
2. [Configure the application](#configure-the-application)
3. [Correlate observability data](#correlate-observability-data)
4. [Run your application](#run-the-application)

### アプリケーションをインスツルメントする{#instrument-the-application}

[OpenTelemetry API を使用して][12] アプリケーションをインスツルメントします。

{{% collapse-content title="OpenTelemetry API でインスツルメントされたアプリケーションの例" level="p" %}}
例として、すでにインスツルメント済みの [カレンダーサンプルアプリケーション][9] を使用できます。以下のコードは、OpenTelemetry のアノテーションと API を使用して [CalendarService.getDate()][10] メソッドをインスツルメントします:
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="false" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}
{{% /collapse-content %}}

### アプリケーションを構成する {#configure-the-application}

アプリケーションコンテナは、同じホスト上の DDOT Collector にデータを送信する必要があります。Collector は DaemonSet として実行されるため、OTLP エンドポイントとしてローカルホストを指定する必要があります。

`OTEL_EXPORTER_OTLP_ENDPOINT`環境変数がまだ設定されていない場合は、アプリケーションの Deployment マニフェストファイルに追加してください:
   {{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
env:
  ...
  - name: HOST_IP
    valueFrom:
     fieldRef:
        fieldPath: status.hostIP
  - name: OTLP_GRPC_PORT
    value: "4317"
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: 'http://$(HOST_IP):$(OTLP_GRPC_PORT)'
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: 'grpc'
   {{< /code-block >}}

### 可観測性データを相関付けする {#correlate-observability-data}

[統合サービスタグ付け][14] により、Datadog 内の可観測性データ同士が結び付けられ、一貫性のあるタグを使用してメトリクス、トレース、ログを横断的に確認することができます。

コンテナ化された環境では、OpenTelemetry Resource Attributes 環境変数を使用して `env`、`service`、および `version` を設定します。DDOT Collector はこのタグ付け構成を検出し、コンテナから収集したデータに適用します。

アプリケーションのデプロイメントマニフェストに次の環境変数を追加する:

{{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  name: <SERVICE>
spec:
  template:
    spec:
      containers:
      - name: <SERVICE>
        env:
          - name: OTEL_SERVICE_NAME
            value: "<SERVICE>"
          - name: OTEL_RESOURCE_ATTRIBUTES
            value: "service.version=<VERSION>,deployment.environment.name=<ENV>"
{{< /code-block >}}

<div class="alert alert-info">また、<a href="/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration">Datadog 専用の Kubernetes ラベル</a>を使用して unified service tagging を構成することもできます。両方のアプローチは使用しないでください。重複したタグが作成されます。</div>

### アプリケーションを実行する {#run-the-application}

デプロイメントマニフェストで行った変更を適用するために、アプリケーションを再デプロイします。更新された構成が有効になると、メトリクス、トレース、ログに対して unified service tagging が完全に有効になります。

## Datadog で可観測性データを確認する {#explore-observability-data-in-datadog}

Datadog を使用して、アプリケーションの可観測性データを確認します。

### Fleet Automation {#fleet-automation}

Datadog Agent と Collector の構成を確認します。

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Fleet Automation ページから Agent と Collector の構成を確認します。" style="width:100%;" >}}

### Live container monitoring {#live-container-monitoring}

Live Container Monitoring 機能を使用して、コンテナのヘルスを監視します。

{{< img src="/opentelemetry/embedded_collector/containers.png" alt="Containers ページからコンテナのヘルスを監視します。" style="width:100%;" >}}

### インフラストラクチャーノードのヘルス {#infrastructure-node-health}

ランタイムおよびインフラストラクチャーメトリクスを表示して、ノードのパフォーマンスを視覚化、監視、測定します。

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="Host List からランタイムおよびインフラストラクチャーメトリクスを表示します。" style="width:100%;" >}}

### ログ {#logs}

アプリケーションおよびシステムの運用を監視し、トラブルシューティングを行うにはログを確認します。

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Log Explorer からログを表示します。" style="width:100%;" >}}

### トレース {#traces}

アプリケーションが処理したリクエストの状態とパフォーマンスを把握するため、トレースとスパンを表示し、同じトレース内でインフラストラクチャーメトリクスを関連付けます。

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Trace Explorer からトレースを表示します。" style="width:100%;" >}}

### ランタイムメトリクス {#runtime-metrics}

アプリケーションのランタイム (JVM) メトリクスを監視します。

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="JVM Metrics dashboard から JVM メトリクスを表示します。" style="width:100%;" >}}

### コレクターのヘルスメトリクス {#collector-health-metrics}

DDOT Collector からメトリクスを表示し、Collector のヘルスを監視します。

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="OTel dashboard からコレクターのヘルスメトリクスを表示します。" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md
[5]: https://kubernetes.io/docs/tasks/tools/#kubectl
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[8]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[9]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[10]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[11]: https://github.com/DataDog/datadog-agent/blob/386130a34dde43035c814f9a9b08bc72eb20e476/comp/otelcol/collector-contrib/impl/manifest.yaml
[12]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[13]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/deploys/calendar/templates/deployment.yaml#L71-L72
[14]: /ja/getting_started/tagging/unified_service_tagging
[15]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/deploys/calendar/templates/deployment.yaml#L75-L83
[16]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/filelogreceiver/README.md
[17]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/fluentforwardreceiver/README.md
[18]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/hostmetricsreceiver/README.md
[19]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/jaegerreceiver/README.md
[20]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/receiver/otlpreceiver/README.md
[21]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/prometheusreceiver/README.md
[22]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/receivercreator/README.md
[23]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/receiver/zipkinreceiver/README.md
[24]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/receiver/nopreceiver#readme
[25]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/attributesprocessor/README.md
[26]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/batchprocessor/README.md
[27]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/cumulativetodeltaprocessor/README.md
[28]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/filterprocessor/README.md
[29]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/groupbyattrsprocessor/README.md
[30]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/k8sattributesprocessor/README.md
[31]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/processor/memorylimiterprocessor/README.md
[32]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/probabilisticsamplerprocessor/README.md
[33]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/README.md
[34]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourceprocessor/README.md
[36]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/tailsamplingprocessor/README.md
[37]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/transformprocessor/README.md
[38]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/datadogexporter/README.md
[39]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/debugexporter/README.md
[40]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlpexporter/README.md
[41]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/otlphttpexporter/README.md
[42]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/exporter/sapmexporter/README.md
[43]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/exporter/nopexporter/README.md
[44]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/datadogconnector/README.md
[45]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/connector/spanmetricsconnector/README.md
[46]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/healthcheckextension/README.md
[47]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/observer/README.md
[48]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/extension/pprofextension/README.md
[49]: https://github.com/open-telemetry/opentelemetry-collector/blob/main/extension/zpagesextension/README.md
[50]: https://docs.docker.com/engine/install/
[51]: https://github.com/DataDog/datadog-agent/blob/main/comp/otelcol/collector-contrib/impl/manifest.yaml#L7
[52]: /ja/getting_started/site/
[53]: /ja/containers/guide/changing_container_registry/
[54]: https://helm.sh
[55]: /ja/containers/datadog_operator
[56]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[57]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md