---
description: OpenTelemetry Operator または Helm チャートを使用して、Kubernetes 上にスタンドアロンの Datadog
  Distribution of OpenTelemetry Collector をデプロイします。
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: ドキュメント
  text: DDOT でカスタム OpenTelemetry コンポーネントを使用する
title: スタンドアロン DDOT Collector を Kubernetes DaemonSet としてインストールする
---
{{< callout header="false" btn_hidden="true" >}}
OpenTelemetry ツールを使用したスタンドアロン DDOT Collector のインストールはプレビュー版です。
{{< /callout >}}

## 概要 {#overview}

このガイドに従って、OpenTelemetry Operator または Helm チャートを使用して Datadog Distribution of OpenTelemetry (DDOT) Collector をデプロイします。

<div class="alert alert-info">
  <strong>追加の OpenTelemetry コンポーネントが必要ですか？</strong>デフォルトのパッケージに含まれているもの以外のコンポーネントが必要な場合は、<a href="/opentelemetry/setup/ddot_collector/custom_components">カスタム OpenTelemetry コンポーネントを使用する</a>に従って、DDOT の機能を拡張してください。デフォルトで含まれているコンポーネントのリストについては、<a href="/opentelemetry/agent/#opentelemetry-collector-components">OpenTelemetry Collector コンポーネント</a>を参照してください。
</div>

## 要件 {#requirements}

このガイドの手順を実行するには、以下の準備が必要です。

**Datadog アカウント**:
1. まだお持ちでない場合は、[Datadog アカウントを作成][1]してください。
1. [Datadog API キー][2]を見つけるか、作成します。

**ソフトウェア**:
次のものをマシンにインストールして設定してください。

- Kubernetes クラスター (v1.29+)
- [Helm (v4+)][54]
- [kubectl][5]

**ネットワーク**:
| プロトコル | トランスポート | ポート |
|:---------|:----------|-----:|
| gRPC     | TCP       | 4317 |
| HTTP     | TCP       | 4318 |

## Datadog Distribution of the OpenTelemetry Collector のインストール {#install-the-datadog-distribution-of-the-opentelemetry-collector}

### インストール方法を選択する {#select-installation-method}

以下のインストール方法のいずれかを使用します。

- [OpenTelemetry Operator][55]: OTel Collector のセットアップを自動的に調整および維持する [Kubernetes ネイティブ][56]なアプローチです。
- [Helmチャート][4]: OTel Collector をデプロイするための簡単な方法です。

{{< tabs >}}
{{% tab "Operator" %}}
### OpenTelemetry Operator をインストールする {#install-the-opentelemetry-operator}

[OpenTelemetry Operator Helm チャート][1]を使用して、クラスターに OpenTelemetry Operator をインストールできます。

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
helm install opentelemetry-operator open-telemetry/opentelemetry-operator   \
     --set "manager.createRbacPermissions=true"                             \
     --set "manager.collectorImage.repository=datadog/ddot-collector"       \
     --set "manager.collectorImage.tag={{< version key="agent_version" >}}"
```

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">
FED の場合は、タグを <code>{{< version key="agent_version" >}}-fips</code> に設定して、FIPS 準拠の DDOT イメージを使用してください。
<a href="/agent/configuration/fips-compliance/">FIPS コンプライアンス</a>を参照してください。
</div>
{{% /site-region %}}

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-operator/README.md
{{% /tab %}}
{{% tab "Helm" %}}
### OpenTelemetry Helm リポジトリを追加する {#add-the-opentelemetry-helm-repository}

OpenTelemetry リポジトリを Helm リポジトリに追加するには:

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Datadog API キーを設定する {#set-up-datadog-api-key}

1. Datadog [API キー][2]を取得します。
1. 右側で選択されている **DATADOG SITE** (現在の値: **{{< region-param key="dd_site_name" >}}**) が実際の [Datadog サイト][52]と一致していることを確認してください。
1. API キーを Kubernetes シークレットとして保存します。
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>        \
     --from-literal site={{< region-param key="dd_site" >}}
   ```
   Replace `<DD_API_KEY>` with your actual Datadog API key.

### Configure the OTel Collector 

{{< tabs >}}
{{% tab "Operator" %}}
OTel Operator をデプロイした後、Collector のデプロイをトリガーする `OpenTelemetryCollector` リソースを作成します。

1. `node-collector.yaml` ファイルを使用して、`OpenTelemetryCollector` DaemonSet 構成を指定します。

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  name: node-collector
spec:
  # Deploy 1 instance per node, that will collect telemetry from that node's pods
  mode: daemonset
  command: ['otel-agent', 'run'] # Will no longer be necessary from 7.82.0 onwards
  config:
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    service:
      telemetry:
        resource:
          k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
  env:
    - name: DD_API_KEY
      valueFrom:
        secretKeyRef:
          key: api-key
          name: datadog-apikey
    - name: DD_SITE
      valueFrom:
        secretKeyRef:
          key: site
          name: datadog-apikey
    - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
      value: datadog,pprof,zpages,prometheus,infraattributes
    - name: K8S_CLUSTER_NAME
      value: <CLUSTER_NAME>
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
    - name: DD_OTEL_STANDALONE
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
    - name: DD_OTELCOLLECTOR_ENABLED
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{< /code-block >}}

`<CLUSTER_NAME>` は、実際のクラスターの名前に置き換えてください。

2. 目的のすべてのシグナルについて、OTLP レシーバーと Datadog エクスポーターを追加します。アプリケーションポッドが同じノードで実行されている Collector インスタンスに到達できるように、`hostPort` を使用してノード上の OTLP ポートを公開してください。

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
# [...]
spec:
  # [...]
  # Publish the OTLP ports on the node's network interface
  ports:
    - name: otlp-grpc
      port: 4317
      protocol: TCP
      hostPort: 4317
    - name: otlp-http
      port: 4318
      protocol: TCP
      hostPort: 4318
  config:
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
    # [...]
    service:
      # [...]
      pipelines:
        logs:
          receivers: ['otlp']
          exporters: ['datadog']
        metrics:
          receivers: ['otlp']
          exporters: ['datadog']
        traces:
          receivers: ['otlp']
          exporters: ['datadog']
{{< /code-block >}}

3. (オプション) 追加の機能を有効にします。

<div class="alert alert-warning">これらの機能を有効にすると、追加料金が発生する場合があります。<a href="https://www.datadoghq.com/pricing/">料金ページ</a>を確認し、進む前にカスタマーサクセスマネージャーに相談してください。</div>

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
spec:
  config:
    receivers:
      host_metrics:
        collection_interval: 15s
        scrapers:
          cpu: {}
          load: {}
          memory: {}
          network: {}
          disk: {}
      kubelet_stats:
        auth_type: serviceAccount
        collection_interval: 15s
        endpoint: ${env:K8S_NODE_NAME}:10250
        node: ${env:K8S_NODE_NAME}
        metric_groups:
          - pod
          - container
          - volume
    processors:
      infraattributes:
        cardinality: 2
      resource/add-cluster-name:
        attributes:
          - key: k8s.cluster.name
            value: ${env:K8S_CLUSTER_NAME}
            action: upsert
    connectors:
      datadog/connector:
        traces:
          compute_top_level_by_span_kind: true
          peer_tags_aggregation: true
          compute_stats_by_span_kind: true
    extensions:
      health_check:
        endpoint: "${env:K8S_POD_IP}:13133"
    # [...]
    service:
      # [...]
      extensions: ['health_check']
      pipelines:
        logs:
          # [...]
          processors: ['resource/add-cluster-name', 'infraattributes']
        metrics:
          receivers: ['host_metrics', 'otlp', 'kubelet_stats', 'datadog/connector']
          processors: ['resource/add-cluster-name', 'infraattributes']
          # [...]
        traces:
          # [...]
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog', 'datadog/connector']
  env:
    # [...]
    - name: K8S_POD_IP
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: status.podIP
    # K8S_NODE_NAME is added automatically by the operator
{{< /code-block >}}

4. (オプション) ノードのファイルシステムからコンテナログを収集します。

<div class="alert alert-warning">ログ収集を有効にすると、追加料金が発生する場合があります。<a href="https://www.datadoghq.com/pricing/">料金ページ</a>を確認し、進む前にカスタマーサクセスマネージャーに相談してください。</div>

`filelog` レシーバーは、ノードからコンテナログを読み取ります。Operator はホストパスを自動的にマウントしないため、ログディレクトリを読み取り専用ボリュームとして追加してください。

{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="true" >}}
spec:
  config:
    receivers:
      filelog:
        include:
          - /var/log/pods/*/*/*.log
        # Exclude the Collector's own logs to avoid a feedback loop
        exclude:
          - /var/log/pods/*_node-collector-collector-*_*/otc-container/*.log
        start_at: end
        include_file_path: true
        include_file_name: false
        retry_on_failure:
          enabled: true
        operators:
          - id: container-parser
            type: container
            max_log_size: 102400
    # [...]
    service:
      # [...]
      pipelines:
        logs:
          receivers: ['otlp', 'filelog']
          # [...]
  # Mount the node's log directories into the Collector pod (read-only)
  volumes:
    - name: varlogpods
      hostPath:
        path: /var/log/pods
    - name: varlibdockercontainers
      hostPath:
        path: /var/lib/docker/containers
  volumeMounts:
    - name: varlogpods
      mountPath: /var/log/pods
      readOnly: true
    - name: varlibdockercontainers
      mountPath: /var/lib/docker/containers
      readOnly: true
{{< /code-block >}}

{{% collapse-content title="完成した node-collector.yaml ファイル" level="p" %}}
`node-collector.yaml` ファイルは次のようになります。
{{< code-block lang="yaml" filename="node-collector.yaml" collapsible="false" >}}
apiVersion: opentelemetry.io/v1beta1
kind: OpenTelemetryCollector
metadata:
  name: node-collector
spec:
  # Deploy 1 instance per node, that will collect telemetry from that node's pods
  mode: daemonset
  command: ['otel-agent', 'run'] # Will no longer be necessary from 7.82.0 onwards
  # Publish the OTLP ports on the node's network interface
  ports:
    - name: otlp-grpc
      port: 4317
      protocol: TCP
      hostPort: 4317
    - name: otlp-http
      port: 4318
      protocol: TCP
      hostPort: 4318
  config:
    receivers:
      otlp:
        protocols:
          grpc:
            endpoint: 0.0.0.0:4317
          http:
            endpoint: 0.0.0.0:4318
      host_metrics:
        collection_interval: 15s
        scrapers:
          cpu: {}
          load: {}
          memory: {}
          network: {}
          disk: {}
      kubelet_stats:
        auth_type: serviceAccount
        collection_interval: 15s
        endpoint: ${env:K8S_NODE_NAME}:10250
        node: ${env:K8S_NODE_NAME}
        metric_groups:
          - pod
          - container
          - volume
      filelog:
        include:
          - /var/log/pods/*/*/*.log
        exclude:
          - /var/log/pods/*_node-collector-collector-*_*/otc-container/*.log
        start_at: end
        include_file_path: true
        include_file_name: false
        retry_on_failure:
          enabled: true
        operators:
          - id: container-parser
            type: container
            max_log_size: 102400
    processors:
      infraattributes:
        cardinality: 2
      resource/add-cluster-name:
        attributes:
          - key: k8s.cluster.name
            value: ${env:K8S_CLUSTER_NAME}
            action: upsert
    connectors:
      datadog/connector:
        traces:
          compute_top_level_by_span_kind: true
          peer_tags_aggregation: true
          compute_stats_by_span_kind: true
    exporters:
      datadog:
        api:
          key: ${env:DD_API_KEY}
          site: ${env:DD_SITE}
        sending_queue:
          batch:
            flush_timeout: 10s
    extensions:
      health_check:
        endpoint: "${env:K8S_POD_IP}:13133"
    service:
      telemetry:
        resource:
          k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
      extensions: ['health_check']
      pipelines:
        logs:
          receivers: ['otlp', 'filelog']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog']
        metrics:
          receivers: ['host_metrics', 'otlp', 'kubelet_stats', 'datadog/connector']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog']
        traces:
          receivers: ['otlp']
          processors: ['resource/add-cluster-name', 'infraattributes']
          exporters: ['datadog', 'datadog/connector']
  env:
    - name: DD_API_KEY
      valueFrom:
        secretKeyRef:
          key: api-key
          name: datadog-apikey
    - name: DD_SITE
      valueFrom:
        secretKeyRef:
          key: site
          name: datadog-apikey
    - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
      value: datadog,pprof,zpages,prometheus,infraattributes
    - name: K8S_CLUSTER_NAME
      value: <CLUSTER_NAME>
    - name: K8S_POD_IP
      valueFrom:
        fieldRef:
          apiVersion: v1
          fieldPath: status.podIP
    # K8S_NODE_NAME is added automatically by the operator
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
    - name: DD_OTEL_STANDALONE
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
    - name: DD_OTELCOLLECTOR_ENABLED
      value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  # Mount the node's log directories for the filelog receiver (read-only)
  volumes:
    - name: varlogpods
      hostPath:
        path: /var/log/pods
    - name: varlibdockercontainers
      hostPath:
        path: /var/lib/docker/containers
  volumeMounts:
    - name: varlogpods
      mountPath: /var/log/pods
      readOnly: true
    - name: varlibdockercontainers
      mountPath: /var/lib/docker/containers
      readOnly: true
{{< /code-block >}}

`<CLUSTER_NAME>` は、実際のクラスターの名前に置き換えてください。

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Helm" %}}
YAML ファイルを使用して、[Collector チャート][1]の Helm チャートパラメーターを指定します。

1. 空の `node-collector-values.yaml` ファイルを作成します。

```shell
touch node-collector-values.yaml
```

<div class="alert alert-info">指定されていないパラメーターには、<a href="https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-collector/values.yaml">values.yaml</a> のデフォルト値が使用されます。</div>

2. DaemonSet モードを選択し、DDOT をコレクターとして使用します。

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
mode: daemonset
image:
  repository: datadog/ddot-collector
  tag: {{< version key="agent_version" >}}
ports:
  jaeger-compact:
    enabled: false
  jaeger-grpc:
    enabled: false
  jaeger-thrift:
    enabled: false
  zipkin:
    enabled: false
# Can be removed from 7.82.0 onwards
command:
  name: opt/datadog-agent/embedded/bin/otel-agent
{{< /code-block >}}

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">FED の場合、 <code>tag: {{< version key="agent_version" >}}-fips</code> を設定して、FIPS 準拠の DDOT イメージを使用してください。<a href="/agent/configuration/fips-compliance/">FIPS コンプライアンス</a>を参照してください。</div>
{{% /site-region %}}

<div class="alert alert-info">Collector Helm チャートでは、デフォルトで各ノードの OTLP ポートを公開します (gRPC の場合は<code>hostPort: 4317</code> 、HTTP の場合は <code>hostPort: 4318</code> )。これにより、アプリケーションポッドは同じノードで実行されている Collector インスタンスに到達できます。<a href="#configure-the-application">アプリケーションを構成する</a>を参照してください。</div>

3. Datadog エクスポーターと API キーシークレットを構成します。

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
config:
  exporters:
    datadog:
      api:
        key: ${env:DD_API_KEY}
        site: ${env:DD_SITE}
      sending_queue:
        batch:
          flush_timeout: 10s
extraEnvs:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        key: api-key
        name: datadog-apikey
  - name: DD_SITE
    valueFrom:
      secretKeyRef:
        key: site
        name: datadog-apikey
  - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
    value: datadog,pprof,zpages,prometheus,infraattributes
  - name: K8S_CLUSTER_NAME
    value: <CLUSTER_NAME>
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
  - name: DD_OTEL_STANDALONE
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
  - name: DD_OTELCOLLECTOR_ENABLED
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
{{< /code-block >}}

`<CLUSTER_NAME>` は、実際のクラスターの名前に置き換えてください。

4. プリセットを有効にします。

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
presets:
  hostMetrics:
    enabled: true
  kubeletMetrics:
    enabled: true
  logsCollection:
    enabled: true
    includeCollectorLogs: false
{{< /code-block >}}

5. 目的のシグナルに対して、OTLP レシーバーを含むパイプラインを定義します。

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
config:
  # [...]
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
        http:
          endpoint: 0.0.0.0:4318
  service:
    pipelines:
      logs:
        receivers: ['otlp']
        exporters: ['datadog']
      metrics:
        receivers: ['otlp']
        exporters: ['datadog']
      traces:
        receivers: ['otlp']
        exporters: ['datadog']
    telemetry:
      resource:
        k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
{{< /code-block >}}

6. (オプション) 追加の Datadog 機能を有効にします。

<div class="alert alert-warning">これらの機能を有効にすると、追加料金が発生する場合があります。<a href="https://www.datadoghq.com/pricing/">料金ページ</a>を確認し、進む前にカスタマーサクセスマネージャーに相談してください。</div>

{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="true" >}}
config:
  # [...]
  processors:
    infraattributes:
      cardinality: 2
    resource/add-cluster-name:
      attributes:
        - key: k8s.cluster.name
          value: ${env:K8S_CLUSTER_NAME}
          action: upsert
  connectors:
    datadog/connector:
      traces:
        compute_top_level_by_span_kind: true
        peer_tags_aggregation: true
        compute_stats_by_span_kind: true
  service:
    pipelines:
      logs:
	    # [...]
        processors: ['resource/add-cluster-name', 'infraattributes']
      metrics:
        receivers: ['otlp', 'datadog/connector']
        processors: ['resource/add-cluster-name', 'infraattributes']
	    # [...]
      traces:
	    # [...]
        processors: ['resource/add-cluster-name', 'infraattributes']
        exporters: ['datadog', 'datadog/connector']
{{< /code-block >}}

{{% collapse-content title="完成した node-collector-values.yaml ファイル" level="p" %}}
`node-collector-values.yaml` ファイルは次のようになります。
{{< code-block lang="yaml" filename="node-collector-values.yaml" collapsible="false" >}}
mode: daemonset
# vvv To be removed from 7.82.0 onwards vvv
command:
  name: opt/datadog-agent/embedded/bin/otel-agent
# ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
image:
  repository: datadog/ddot-collector
  tag: {{< version key="agent_version" >}}
presets:
  hostMetrics: # Add an hostmetrics receiver to the metrics pipeline
    enabled: true
  kubeletMetrics: # Add a kubeletstats receiver to the metrics pipeline
    enabled: true
  logsCollection: # Add a filelog receiver to the logs pipeline
    enabled: true
    includeCollectorLogs: false
config:
  connectors:
    datadog/connector:
      traces:
        compute_top_level_by_span_kind: true
        peer_tags_aggregation: true
        compute_stats_by_span_kind: true
  exporters:
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
    resource/add-cluster-name:
      attributes:
        - key: k8s.cluster.name
          value: ${env:K8S_CLUSTER_NAME}
          action: upsert
  receivers:
    otlp:
      protocols:
        grpc:
          endpoint: 0.0.0.0:4317
        http:
          endpoint: 0.0.0.0:4318
  service:
    extensions:
      - health_check
    pipelines:
      logs:
        receivers:
          - otlp
        processors:
          - resource/add-cluster-name
          - infraattributes
        exporters:
          - datadog
      metrics:
        receivers:
          - otlp
          - datadog/connector
        processors:
          - resource/add-cluster-name
          - infraattributes
        exporters:
          - datadog
      traces:
        receivers:
          - otlp
        processors:
          - resource/add-cluster-name
          - infraattributes
        exporters:
          - datadog
          - datadog/connector
    telemetry:
      resource:
        k8s.cluster.name: ${env:K8S_CLUSTER_NAME}
extraEnvs:
  - name: DD_API_KEY
    valueFrom:
      secretKeyRef:
        key: api-key
        name: datadog-apikey
  - name: DD_SITE
    valueFrom:
      secretKeyRef:
        key: site
        name: datadog-apikey
  - name: DD_OTELCOLLECTOR_CONVERTER_FEATURES
    value: datadog,pprof,zpages,prometheus,infraattributes
  - name: K8S_CLUSTER_NAME
    value: <CLUSTER_NAME>
    # vvv Will no longer be necessary from 7.83.0 onwards vvv
  - name: DD_OTEL_STANDALONE
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    # vvv Will no longer be necessary from 7.82.0 onwards vvv
  - name: DD_OTELCOLLECTOR_ENABLED
    value: 'true'
    # ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
ports:
  jaeger-compact:
    enabled: false
  jaeger-grpc:
    enabled: false
  jaeger-thrift:
    enabled: false
  zipkin:
    enabled: false
{{< /code-block >}}

{{% /collapse-content %}}

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-collector/README.md
[2]: /ja/getting_started/site/
[3]: /ja/containers/guide/changing_container_registry/
{{% /tab %}}
{{< /tabs >}}

### Collector をデプロイする {#deploy-the-collector}

{{< tabs >}}
{{% tab "Operator" %}}
`node-collector.yaml` ファイルを適用して `OpenTelemetryCollector` リソースを作成します。Operator は Collector を DaemonSet としてデプロイし、ノードごとに 1 つのインスタンスを実行します。

```shell
kubectl apply -f node-collector.yaml
```
{{% /tab %}}
{{% tab "Helm" %}}
値ファイルを使用して OpenTelemetry Collector チャートをインストールします。

```shell
helm install node-collector open-telemetry/opentelemetry-collector -f node-collector-values.yaml
```

後で変更を適用するには、`helm upgrade node-collector open-telemetry/opentelemetry-collector -f node-collector-values.yaml` を実行します。
{{% /tab %}}
{{< /tabs >}}

## コアの Datadog Agent を DDOT と並行してインストールする {#install-the-core-datadog-agent-alongside-ddot}

スタンドアロンの DDOT Collector と同じノードでコアの Datadog Agent を実行したい場合 (たとえば、DDOT で OTLP 取り込みを処理しながら、コアの Agent からインフラストラクチャーのメトリクス、APM、ログを収集する場合など)、[Datadog Operator][57] を使用して個別にインストールできます。

デフォルトでは、Datadog Operator Helm チャートは、Operator がインストールされている名前空間にある <code>DatadogAgent</code> リソースのみを監視します (<code>watchNamespaces: []</code>)。Operator とは別の名前空間に <code>DatadogAgent</code> リソースがある場合は (たとえば、そのリソースを <code>OpenTelemetryCollector</code> リソースの名前空間から分離しておく場合など)、 <code>watchNamespaces</code> を設定して、 <code>DatadogAgent</code> リソースが作成される名前空間を含めてください。
<pre><code>helm upgrade datadog-operator datadog/datadog-operator \
  -n &lt;OPERATOR_NAMESPACE&gt; \
  --reuse-values \
  --set 'watchNamespaces[0]=&lt;DATADOG_AGENT_NAMESPACE&gt;'
</code></pre>
Operator が <code>DatadogAgent</code> リソースが作成される名前空間を監視していない場合、そのリソースは調整に失敗しますが、エラーも Kubernetes イベントも発生せず、問題を示すステータスの更新も行われません。

## Datadog にテレメトリを送信する {#send-your-telemetry-to-datadog}

テレメトリデータを Datadog に送信するには:

1. [アプリケーションをインスツルメントする](#instrument-the-application)
2. [アプリケーションを構成する](#configure-the-application)
3. [可観測性データを相関付けする](#correlate-observability-data)
4. [アプリケーションを実行する](#run-the-application)

### アプリケーションをインスツルメントする{#instrument-the-application}

[OpenTelemetry API を使用][12]してアプリケーションをインスツルメントします。

{{% collapse-content title="OpenTelemetry API でインスツルメントされたアプリケーションの例" level="p" %}}
例として、すでにインスツルメント済みの[カレンダーサンプルアプリケーション][9]を使用できます。次のコードは、OpenTelemetry のアノテーションと API を使用して [CalendarService.getDate()][10] メソッドをインスツルメントします。
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

アプリケーションコンテナは、同じノード上で実行されている DDOT Collector にデータを送信する必要があります。Collector は `hostPort` を使用してノード上の OTLP ポートを公開するため、アプリケーションはノードの IP アドレス (`status.hostIP`) を介してローカルの Collector に到達できます。

`OTEL_EXPORTER_OTLP_ENDPOINT`環境変数がまだ設定されていない場合は、アプリケーションの Deployment マニフェストファイルに追加してください。
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

[統合サービスタグ付け][14]により、Datadog 内の可観測性データ同士が結び付けられ、一貫性のあるタグを使用してメトリクス、トレース、ログを横断的に確認することができます。

コンテナ化された環境では、OpenTelemetry Resource Attributes 環境変数を使用して `env`、`service`、および `version` を設定します。DDOT Collector はこのタグ付け構成を検出し、コンテナから収集したデータに適用します。

アプリケーションのデプロイメントマニフェストに次の環境変数を追加します。

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

### アプリケーションを実行する {#run-the-application}

デプロイメントマニフェストで行った変更を適用するために、アプリケーションを再デプロイします。更新された構成が有効になると、メトリクス、トレース、ログに対する統合サービスタグ付けが完全に有効になります。

## Datadog で可観測性データを確認する {#explore-observability-data-in-datadog}

Datadog を使用して、アプリケーションの可観測性データを確認します。

### Fleet Automation {#fleet-automation}

Collector の構成を確認します。

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="[Fleet Automation] ページから Collector の構成を確認します。" style="width:100%;" >}}

### Live Container Monitoring {#live-container-monitoring}

Live Container Monitoring 機能を使用して、コンテナのヘルスを監視します。

{{< img src="/opentelemetry/embedded_collector/containers.png" alt="[Containers] ページからコンテナのヘルスを監視します。" style="width:100%;" >}}

### インフラストラクチャーノードのヘルス {#infrastructure-node-health}

ランタイムおよびインフラストラクチャーメトリクスを表示して、ノードのパフォーマンスを視覚化、監視、測定します。

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="[Host List] からランタイムおよびインフラストラクチャーメトリクスを表示します。" style="width:100%;" >}}

### ログ {#logs}

アプリケーションおよびシステムの運用を監視し、トラブルシューティングを行うにはログを確認します。

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Log Explorer からログを表示します。" style="width:100%;" >}}

### トレース {#traces}

アプリケーションが処理したリクエストの状態とパフォーマンスを把握するため、トレースとスパンを表示し、同じトレース内でインフラストラクチャーメトリクスを関連付けます。

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Trace Explorer からトレースを表示します。" style="width:100%;" >}}

### ランタイムメトリクス {#runtime-metrics}

アプリケーションのランタイム (JVM) メトリクスを監視します。

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="JVM Metrics ダッシュボードから JVM メトリクスを表示します。" style="width:100%;" >}}

### Collector のヘルスメトリクス {#collector-health-metrics}

DDOT Collector からメトリクスを表示し、Collector のヘルスを監視します。

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="OTel ダッシュボードから Collector のヘルスメトリクスを表示します。" style="width:100%;" >}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://opentelemetry.io/docs/platforms/kubernetes/helm/collector/
[5]: https://kubernetes.io/docs/tasks/tools/#kubectl
[9]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[10]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[12]: /ja/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[14]: /ja/getting_started/tagging/unified_service_tagging
[52]: /ja/getting_started/site/
[54]: https://helm.sh
[55]: https://opentelemetry.io/docs/platforms/kubernetes/operator/
[56]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[57]: /ja/getting_started/containers/datadog_operator/