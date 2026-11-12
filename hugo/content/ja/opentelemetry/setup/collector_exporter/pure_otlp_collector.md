---
aliases:
- /ja/opentelemetry/setup/collector_exporter/oss_setup/
- /ja/opentelemetry/setup/collector_exporter/community_collector/
description: OTLP OpenTelemetry コレクターを使用して OpenTelemetry データを Datadog に送信する
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: 外部サイト
  text: Collector ドキュメント
- link: /opentelemetry/setup/collector_exporter/deploy
  tag: ドキュメント
  text: OpenTelemetry コレクターのデプロイ
- link: /opentelemetry/config/hostname_tagging
  tag: ドキュメント
  text: ホスト名とタグ付けの構成
private: true
title: OTLP OpenTelemetry コレクターのセットアップ
---
## 概要 {#overview}

OTLP OpenTelemetry コレクターを使用してトレース、メトリクス、およびログを Datadog に送信します。OTLP OpenTelemetry コレクターは、[OpenTelemetry Collector Contrib][1] ディストリビューションと標準の OpenTelemetry コンポーネントに基づいています。このセットアップでは、以下の主要コンポーネントを使用します。

- **OTLP HTTP エクスポーター**: テレメトリを Datadog の OTLP インテークエンドポイントに送信します。
- **スパンメトリクスコネクタ**: トレースデータから RED (Rate、Error、Duration) メトリクスを生成し、Service Catalog やサービスページなどの APM 機能を強化します。
- **リソース検出プロセッサー**: ホストとクラウドのリソース属性を検出します。これらの属性は、Datadog がホスト名の解決とタグ付けに使用します。

{{< img src="/opentelemetry/setup/oss-collector.png" alt="図: コード内の OpenTelemetry SDK が、OpenTelemetry コレクターと OTLP HTTP エクスポーターを実行しているホストに、OTLP を介してデータを送信し、このホストは Datadog の監視可能性プラットフォームにデータを転送します。" style="width:100%;" >}}

<div class="alert alert-warning">このセットアップはプレビュー版です。一部の Datadog 機能の動作は、Datadog エクスポーターのセットアップと異なる場合があります。たとえば、ホストメタデータの取り込みがサポートされるまでは、<a href="/infrastructure/list/">インフラストラクチャーリスト</a>に表示されるホストメタデータが少ない可能性があります。また、Kubernetes エクスプローラー関連のビューが空になる場合があります。</div>

## 前提条件 {#prerequisites}

このセットアップでは、ベアメタル、VM、Docker、および Kubernetes がサポートされています。サポートされているマネージド Kubernetes ディストリビューションには、Amazon EKS (Auto Mode を含む)、Google GKE (Standard および Autopilot)、Azure AKS (Automatic を含む) があります。

このセットアップでは、サーバーレスまたはタスクベースのコンテナランタイムや (ECS Fargate や AWS Lambda など) はサポートされていません。サポートされている Datadog 機能については、**OTel SDK + OTLP OTel コレクター** の [機能互換性表][7] を参照してください。

- [OpenTelemetry Collector Contrib][1] v0.154.0 以降
- [Datadog API キー][2]
- ご使用の [Datadog サイト][3] (例: `datadoghq.com` または `datadoghq.eu`)

## インストールと構成 {#install-and-configure}

### 1. OpenTelemetry Collector をダウンロードする {#1-download-the-opentelemetry-collector}

[リリースページ][100] から OpenTelemetry Collector Contrib ディストリビューションの最新リリースをダウンロードします。

### 2. コレクター構成を作成する {#2-create-the-collector-configuration}

`collector.yaml` という名前の構成ファイルを作成します。構成は環境によって異なります。セットアップに対応するタブを選択してください。

{{< tabs >}}
{{% tab "ホスト" %}}

ホスト (ベアメタルまたは VM) 上で直接実行される非コンテナ化コレクターにはこの構成を使用します。

コレクターを起動する前に、`DD_API_KEY` および `DD_SITE` 環境変数を設定します。

```yaml
receivers:
  # Receive telemetry from OpenTelemetry-instrumented applications
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  # Collect host system metrics (CPU, memory, disk, network); populates the Infrastructure List
  host_metrics:
    collection_interval: 10s
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      memory:
        metrics:
          system.memory.limit:
            enabled: true
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
          system.paging.usage:
            enabled: true
      disk: {}
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load: {}
      network: {}
      processes: {}

processors:
  # Detect host and cloud resource attributes for hostname resolution and tagging
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward/traces_sample: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  span_metrics:
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    add_resource_attributes: true
    histogram:
      exponential: {}
      unit: s
    dimensions:
      ## Unified Service Tagging
      - name: deployment.environment.name
      - name: service.version
      - name: http.response.status_code
      ## Container tags
      - name: container.id
      ## Host name inference
      - name: aws.ecs.launchtype
      - name: aws.ecs.task.arn
      - name: cloud.provider
      - name: cloud.account.id
      - name: host.id
      - name: host.name
      - name: k8s.node.name
      - name: k8s.cluster.name
      - name: azure.resourcegroup.name
      ## Peer service inference
      - name: aws.s3.bucket
      - name: db.namespace
      - name: messaging.destination.name
      - name: messaging.system
      - name: server.address
      ## Operation name inference
      - name: operation.name
      - name: http.request.method
      - name: http.method
      - name: db.system
      - name: messaging.operation
      - name: rpc.system
      - name: rpc.service
      - name: faas.invoked_provider
      - name: faas.invoked_name
      - name: faas.trigger
      - name: graphql.operation.type
      - name: network.protocol.name
      ## Resource name inference
      - name: resource.name
      - name: http.route
      - name: messaging.destination
      - name: rpc.method
      - name: graphql.operation.name
      - name: db.statement
      - name: db.query.text

exporters:
  # Send telemetry to Datadog's OTLP intake endpoints
  otlp_http:
    endpoint: https://otlp.${env:DD_SITE}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      # Map resource attributes and instrumentation scope metadata to Datadog metric tags
      dd-otel-metric-config: >-
        {
        "resource_attributes_as_tags": true,
        "instrumentation_scope_metadata_as_tags": true
        }
    compression: zstd
    compression_params:
      level: 3 # Must be set explicitly for zstd; the default uses the lowest compression level
    sending_queue:
      batch:
        sizer: bytes
        min_size: 2097152 # Start flushing batches at 2MiB (2 * 1024 * 1024)
        max_size: 4194304 # Split large batches at 4MiB (4 * 1024 * 1024)

extensions:
  # Report Collector metadata to Datadog for host enrichment
  datadog:
    api:
      site: ${env:DD_SITE}
      key: ${env:DD_API_KEY}
    deployment_type: daemonset

service:
  extensions:
    - datadog
  pipelines:
    logs:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, host_metrics]
      processors: [resource_detection, cumulativetodelta]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [forward/traces_sample, span_metrics]
    traces/sample:
      receivers: [forward/traces_sample]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/span_metrics:
      receivers: [span_metrics]
      exporters: [otlp_http]
  telemetry:
    # Route Collector self-monitoring metrics through its own pipelines
    metrics:
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: http://localhost:4318
```

クラウド固有の環境では、適切なリソース検出機能を追加してください。
- **Amazon EC2**: `detectors: [ec2, env, system]`
- **Google Cloud**: `detectors: [gcp, env, system]`
- **Azure**: `detectors: [azure, env, system]`

システムに関する追加メタデータを収集するためのオプションの構成については、[完全な構成ファイル][500] を参照してください。

[500]: https://github.com/DataDog/opentelemetry-examples/tree/experimental-oss-config/configurations/opentelemetry-collector

{{% /tab %}}

{{% tab "Docker" %}}

コンテナ化されたコレクターにはこの構成を使用します。`host_metrics` レシーバーでは、ホストファイルシステムを `/hostfs` にマウントする必要があります。

コレクターを起動する前に、以下の環境変数を設定します。

- `DD_API_KEY` と `DD_SITE`
- `OTEL_RESOURCE_ATTRIBUTES`: コレクターはコンテナ内からホスト情報を検出できないため、ここで指定してください (例: `host.name=<YOUR_HOST_NAME>`)。

```yaml
receivers:
  # Receive telemetry from OpenTelemetry-instrumented applications
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  # Collect host system metrics (CPU, memory, disk, network); populates the Infrastructure List
  # root_path maps to the host filesystem mounted at /hostfs
  host_metrics:
    root_path: /hostfs
    collection_interval: 10s
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      memory:
        metrics:
          system.memory.limit:
            enabled: true
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
          system.paging.usage:
            enabled: true
      disk: {}
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load: {}
      network: {}
      processes: {}

processors:
  # Detect host and cloud resource attributes for hostname resolution and tagging
  resource_detection:
    detectors: [env]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward/traces_sample: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  span_metrics:
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    add_resource_attributes: true
    histogram:
      exponential: {}
      unit: s
    dimensions:
      ## Unified Service Tagging
      - name: deployment.environment.name
      - name: service.version
      - name: http.response.status_code
      ## Container tags
      - name: container.id
      ## Host name inference
      - name: aws.ecs.launchtype
      - name: aws.ecs.task.arn
      - name: cloud.provider
      - name: cloud.account.id
      - name: host.id
      - name: host.name
      - name: k8s.node.name
      - name: k8s.cluster.name
      - name: azure.resourcegroup.name
      ## Peer service inference
      - name: aws.s3.bucket
      - name: db.namespace
      - name: messaging.destination.name
      - name: messaging.system
      - name: server.address
      ## Operation name inference
      - name: operation.name
      - name: http.request.method
      - name: http.method
      - name: db.system
      - name: messaging.operation
      - name: rpc.system
      - name: rpc.service
      - name: faas.invoked_provider
      - name: faas.invoked_name
      - name: faas.trigger
      - name: graphql.operation.type
      - name: network.protocol.name
      ## Resource name inference
      - name: resource.name
      - name: http.route
      - name: messaging.destination
      - name: rpc.method
      - name: graphql.operation.name
      - name: db.statement
      - name: db.query.text

exporters:
  # Send telemetry to Datadog's OTLP intake endpoints
  otlp_http:
    endpoint: https://otlp.${env:DD_SITE}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      # Map resource attributes and instrumentation scope metadata to Datadog metric tags
      dd-otel-metric-config: >-
        {
        "resource_attributes_as_tags": true,
        "instrumentation_scope_metadata_as_tags": true
        }
    compression: zstd
    compression_params:
      level: 3 # Must be set explicitly for zstd; the default uses the lowest compression level
    sending_queue:
      batch:
        sizer: bytes
        min_size: 2097152 # Start flushing batches at 2MiB (2 * 1024 * 1024)
        max_size: 4194304 # Split large batches at 4MiB (4 * 1024 * 1024)

extensions:
  # Report Collector metadata to Datadog for host enrichment
  datadog:
    api:
      site: ${env:DD_SITE}
      key: ${env:DD_API_KEY}
    deployment_type: daemonset

service:
  extensions:
    - datadog
  pipelines:
    logs:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, host_metrics]
      processors: [resource_detection, cumulativetodelta]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [resource_detection]
      exporters: [forward/traces_sample, span_metrics]
    traces/sample:
      receivers: [forward/traces_sample]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/span_metrics:
      receivers: [span_metrics]
      exporters: [otlp_http]
  telemetry:
    # Route Collector self-monitoring metrics through its own pipelines
    metrics:
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: http://localhost:4318
```

ホストファイルシステムをマウントしてコレクターを実行します。

```shell
docker run \
    -p 4317:4317 \
    -p 4318:4318 \
    -e DD_API_KEY \
    -e DD_SITE \
    -e OTEL_RESOURCE_ATTRIBUTES \
    -v /:/hostfs:ro \
    -v $(pwd)/collector.yaml:/etc/otelcol-contrib/config.yaml \
    otel/opentelemetry-collector-contrib:0.154.0 \
    --config /etc/otelcol-contrib/config.yaml
```

{{% /tab %}}

{{% tab "Kubernetes (DaemonSet)" %}}

非クラウド環境で Kubernetes DaemonSet としてデプロイされコレクターには、この構成を使用してください。これには、Kubernetes メタデータでテレメトリをエンリッチするための `k8s_attributes` プロセッサーと、ノード、Pod、コンテナ、およびボリュームのメトリクスを取得するための `kubelet_stats` レシーバーが含まれています。マネージド Kubernetes ディストリビューションでは、構成後に [マネージド Kubernetes ディストリビューション](#managed-kubernetes-distributions)で説明されている変更を適用してください。

コレクター Pod spec で以下の環境変数を設定します。その際、指定されている場合には Kubernetes downward API を使用してください。

- `DD_API_KEY` と `DD_SITE`
- `K8S_NODE_NAME`: `kubelet_stats` レシーバーによって使用される Kubernetes ノードの名前。`spec.nodeName` フィールドから設定してください。
- `MY_POD_IP`: `health_check` エクステンションによって使用される Pod IP。`status.podIP` フィールドから設定してください。
- `OTEL_RESOURCE_ATTRIBUTES`: コントローラーはコンテナ内からホスト名を特定できないため、ここにホスト情報を指定します (例: `k8s.node.name=$(K8S_NODE_NAME)`)。`$(VAR)` 構文は Kubernetes によって展開されるため、シェルではなく Pod spec でこれを設定してください。

ホストファイルシステムを `/hostfs` にマウントして、`host_metrics` レシーバーがホストメトリクスを収集できるようにします。

```yaml
receivers:
  # Receive telemetry from OpenTelemetry-instrumented applications
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318
  # Collect host system metrics (CPU, memory, disk, network); populates the Infrastructure List
  # root_path maps to the host filesystem mounted at /hostfs
  host_metrics:
    root_path: /hostfs
    collection_interval: 10s
    scrapers:
      cpu:
        metrics:
          system.cpu.utilization:
            enabled: true
          system.cpu.physical.count:
            enabled: true
          system.cpu.logical.count:
            enabled: true
          system.cpu.frequency:
            enabled: true
      memory:
        metrics:
          system.memory.limit:
            enabled: true
      paging:
        metrics:
          system.paging.utilization:
            enabled: true
          system.paging.usage:
            enabled: true
      disk: {}
      filesystem:
        metrics:
          system.filesystem.utilization:
            enabled: true
      load: {}
      network: {}
      processes: {}
  # Collect node, pod, container, and volume metrics from the kubelet
  kubelet_stats:
    collection_interval: 15s
    auth_type: "serviceAccount"
    endpoint: "${env:K8S_NODE_NAME}:10250"
    node: "${env:K8S_NODE_NAME}"
    insecure_skip_verify: true
    metric_groups:
      - node
      - pod
      - container
      - volume

processors:
  # Detect host and cloud resource attributes for hostname resolution and tagging
  resource_detection:
    detectors: [env, system]
    timeout: 2s
    override: true # Disable if incoming attributes (especially host.name) are verified correct
    system:
      resource_attributes:
        host.name:
          enabled: false # Containers report inaccurate host names
  # Convert cumulative metrics to delta temporality for Datadog
  cumulativetodelta: {}
  # Convert selected delta metrics to rates
  deltatorate:
    metrics:
      - k8s.pod.network.io
      - k8s.pod.network.errors
  # Enrich telemetry with Kubernetes pod and container metadata
  k8s_attributes:
    extract:
      otel_annotations: true
      metadata:
        - k8s.node.name
        - k8s.namespace.name
        - service.namespace
        - service.name
        - service.version
        - service.instance.id
        - k8s.deployment.name
        - k8s.replicaset.name
        - k8s.daemonset.name
        - k8s.statefulset.name
        - k8s.cronjob.name
        - k8s.job.name
        - k8s.pod.uid
        - k8s.pod.name
        - container.id
        - k8s.container.name
        - container.image.name
        - container.image.tag
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

connectors:
  # Separate trace processing from sampling so span metrics are computed on all traces
  forward/traces_sample: {}
  # Generate RED (Rate, Error, Duration) metrics from traces for APM
  span_metrics:
    aggregation_temporality: AGGREGATION_TEMPORALITY_DELTA
    add_resource_attributes: true
    histogram:
      exponential: {}
      unit: s
    dimensions:
      ## Unified Service Tagging
      - name: deployment.environment.name
      - name: service.version
      - name: http.response.status_code
      ## Container tags
      - name: container.id
      ## Host name inference
      - name: aws.ecs.launchtype
      - name: aws.ecs.task.arn
      - name: cloud.provider
      - name: cloud.account.id
      - name: host.id
      - name: host.name
      - name: k8s.node.name
      - name: k8s.cluster.name
      - name: azure.resourcegroup.name
      ## Peer service inference
      - name: aws.s3.bucket
      - name: db.namespace
      - name: messaging.destination.name
      - name: messaging.system
      - name: server.address
      ## Operation name inference
      - name: operation.name
      - name: http.request.method
      - name: http.method
      - name: db.system
      - name: messaging.operation
      - name: rpc.system
      - name: rpc.service
      - name: faas.invoked_provider
      - name: faas.invoked_name
      - name: faas.trigger
      - name: graphql.operation.type
      - name: network.protocol.name
      ## Resource name inference
      - name: resource.name
      - name: http.route
      - name: messaging.destination
      - name: rpc.method
      - name: graphql.operation.name
      - name: db.statement
      - name: db.query.text

exporters:
  # Send telemetry to Datadog's OTLP intake endpoints
  otlp_http:
    endpoint: https://otlp.${env:DD_SITE}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      # Map resource attributes and instrumentation scope metadata to Datadog metric tags
      dd-otel-metric-config: >-
        {
        "resource_attributes_as_tags": true,
        "instrumentation_scope_metadata_as_tags": true
        }
    compression: zstd
    compression_params:
      level: 3 # Must be set explicitly for zstd; the default uses the lowest compression level
    sending_queue:
      batch:
        sizer: bytes
        min_size: 2097152 # Start flushing batches at 2MiB (2 * 1024 * 1024)
        max_size: 4194304 # Split large batches at 4MiB (4 * 1024 * 1024)

extensions:
  # Required for Kubernetes liveness/readiness probes
  health_check:
    endpoint: ${env:MY_POD_IP}:13133
  # Report Collector metadata to Datadog for host enrichment
  datadog:
    api:
      site: ${env:DD_SITE}
      key: ${env:DD_API_KEY}
    deployment_type: daemonset

service:
  extensions:
    - health_check
    - datadog
  pipelines:
    logs:
      receivers: [otlp]
      processors: [k8s_attributes, resource_detection]
      exporters: [otlp_http]
    metrics:
      receivers: [otlp, host_metrics, kubelet_stats]
      processors: [k8s_attributes, resource_detection, cumulativetodelta, deltatorate]
      exporters: [otlp_http]
    traces:
      receivers: [otlp]
      processors: [k8s_attributes, resource_detection]
      exporters: [forward/traces_sample, span_metrics]
    traces/sample:
      receivers: [forward/traces_sample]
      # Add sampling processors here (for example, tail_sampling) before exporting traces
      exporters: [otlp_http]
    metrics/span_metrics:
      receivers: [span_metrics]
      exporters: [otlp_http]
  telemetry:
    # Route Collector self-monitoring metrics through its own pipelines
    metrics:
      readers:
        - periodic:
            exporter:
              otlp:
                protocol: http/protobuf
                endpoint: http://localhost:4318
```

この構成には、`pods`、`namespaces`、`nodes`、`nodes/stats`、および `replicasets` に対して `get`、`list`、および `watch` を許可する ClusterRole にバインドされた ServiceAccount が必要です。`k8s_attributes` プロセッサーは Pod メタデータを読み取り、`kubelet_stats` レシーバーは `nodes/stats` を読み取ります。[Kubernetes Attributes Processor のドキュメント][101] で RBAC セットアップの手順を参照し、リストされているルールに `nodes/stats` を追加してください。

#### マネージド Kubernetes ディストリビューション {#managed-kubernetes-distributions}

マネージド Kubernetes ディストリビューションでは、以前の構成の `resource_detection` プロセッサーを、ご使用の環境のバリアントに置き換えてください。クラウド検出機能がホスト情報を提供するため、`OTEL_RESOURCE_ATTRIBUTES` を設定する必要はありません。

##### Amazon EKS {#amazon-eks}

```yaml
processors:
  resource_detection:
    detectors: [eks, ec2, env, system]
    timeout: 15s
    override: true
    eks:
      resource_attributes:
        k8s.cluster.name: { enabled: true }
    ec2:
      tags: ['^kubernetes\.io/cluster/.*$']
    system:
      resource_attributes:
        host.name:
          enabled: false
```

`ec2` および `eks` 検出機能は、コンテナ内から IMDS エンドポイントにアクセスする必要があります。ノード起動テンプレートまたはアカウント設定で、IMDS トークンのホップ制限を 2 に設定してください。IMDS のレイテンシーを考慮して、`timeout` が `15s` に引き上げられています。

##### Amazon EKS Auto Mode {#amazon-eks-auto-mode}

```yaml
processors:
  resource_detection:
    detectors: [eks, env, system]
    timeout: 15s
    override: true
    eks:
      resource_attributes:
        k8s.cluster.name: { enabled: true }
        host.id: { enabled: true } # Required for host name inference
        cloud.account.id: { enabled: true }
        cloud.availability_zone: { enabled: true }
        cloud.region: { enabled: true }
        host.image.id: { enabled: true }
        host.type: { enabled: true }
      node_from_env_var: K8S_NODE_NAME
    system:
      resource_attributes:
        host.name:
          enabled: false
```

`eks` 検出機能には、`EC2:DescribeInstances` 権限を持つ IAM ロールをコレクターに割り当てる Pod Identity アソシエーションが必要です。

##### Google GKE {#google-gke}

```yaml
processors:
  resource_detection:
    detectors: [gcp, env, system]
    timeout: 2s
    override: true
    system:
      resource_attributes:
        host.name:
          enabled: false
```

古い GKE バージョンでは、`gcp` 検出機能がホスト名を返さない場合があります。その場合は、`OTEL_RESOURCE_ATTRIBUTES` の `host.name` にノード名を指定してください。

##### Azure AKS {#azure-aks}

```yaml
processors:
  resource_detection:
    detectors: [aks, azure, env, system]
    timeout: 2s
    override: true
    aks:
      resource_attributes:
        k8s.cluster.name: { enabled: true }
    system:
      resource_attributes:
        host.name:
          enabled: false
```

##### GKE Autopilot および AKS Automatic {#gke-autopilot-and-aks-automatic}

これらのモードでは、`/hostfs` のマウントやホストポートの使用は許可されません。GKE または AKS の `resource_detection` プロセッサーを使用し、以下の追加変更を行ってください。

- `receivers` ブロックと `metrics` パイプラインから `host_metrics` レシーバーを削除します。ノード、Pod、コンテナ、およびボリュームのメトリクスは、引き続き `kubelet_stats` レシーバーから取得されます。
- コレクターのホストポートを無効にし、代わりにノードローカルのサービスを介して公開します。[アプリケーションの構成](#4-configure-your-application)に示されているホスト IP ではなく、そのサービスでアプリケーションをポイントします。

各環境の完全な構成ファイルについては、[`opentelemetry-examples` リポジトリ][501] を参照してください。

[101]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor#role-based-access-control
[501]: https://github.com/DataDog/opentelemetry-examples/tree/experimental-oss-config/configurations/opentelemetry-collector

{{% /tab %}}

{{% tab "Kubernetes (Helm チャート)" %}}

[公式 OpenTelemetry コレクター Helm チャート][102] v0.147.1 以降を使用して、Kubernetes にコレクターを DaemonSet としてデプロイできます。以下の values ファイルは、必要なマウント、環境変数、および RBAC リソースを設定します。

1. Datadog API キーを使用して Kubernetes Secret を作成します。

   ```shell
   kubectl create secret generic datadog-secrets --from-literal=api-key='<YOUR_API_KEY>'
   ```

1. OpenTelemetry Helm リポジトリを追加します。

   ```shell
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   ```

1. 環境のサンプル values ファイルをダウンロードし、`values.yaml` として保存します。Datadog サイトが `datadoghq.com` でない場合は、インストール前に `DD_SITE` の値を `values.yaml` 更新してください。

   | 環境 | values ファイル |
   |---|---|
   | Kubernetes (非クラウド) | [`daemonset.yaml`][103] |
   | Amazon EKS | [`daemonset-eks.yaml`][104] |
   | Amazon EKS Auto Mode | [`daemonset-eks-auto.yaml`][105] |
   | Google GKE | [`daemonset-gke.yaml`][106] |
   | Google GKE Autopilot | [`daemonset-gke-autopilot.yaml`][107] |
   | Azure AKS | [`daemonset-aks.yaml`][108] |
   | Azure AKS Automatic | [`daemonset-aks-automatic.yaml`][109] |

   Amazon EKS では、必要な AWS 側の設定を values ファイルで構成することはできません。Helm の外部で以下を適用してください。

   - **Amazon EKS**: `ec2` および `eks` 検出機能は、コンテナ内から IMDS エンドポイントにアクセスする必要があります。ノード起動テンプレートまたはアカウント設定で、IMDS トークンのホップ制限を 2 に設定してください。
   - **Amazon EKS Auto Mode**: `eks` 検出機能には、`EC2:DescribeInstances` 権限を持つ IAM ロールをコレクターに割り当てる Pod Identity アソシエーションが必要です。

1. コレクターをインストールします。

   ```shell
   helm install otelcol open-telemetry/opentelemetry-collector --values values.yaml
   ```

[102]: https://github.com/open-telemetry/opentelemetry-helm-charts/tree/main/charts/opentelemetry-collector
[103]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset.yaml
[104]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset-eks.yaml
[105]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset-eks-auto.yaml
[106]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset-gke.yaml
[107]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset-gke-autopilot.yaml
[108]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset-aks.yaml
[109]: https://github.com/DataDog/opentelemetry-examples/blob/experimental-oss-config/configurations/opentelemetry-collector/helm-values/daemonset-aks-automatic.yaml

{{% /tab %}}
{{< /tabs >}}

### 3. コレクターを実行する {#3-run-the-collector}

コレクターを開始します。Docker または Kubernetes を使用している場合、実行コマンドは [コレクター構成を作成する](#2-create-the-collector-configuration)セクションに含まれています。

ホストインストールの場合は、以下を実行します。

```shell
DD_SITE={{< region-param key="dd_site" >}} DD_API_KEY=<YOUR_API_KEY> \
  otelcol-contrib --config collector.yaml
```

### 4. アプリケーションを構成する {#4-configure-your-application}

OpenTelemetry によりインスツルメントされたアプリケーションが、コレクターにデータ送信するように構成します。コレクターを指し示すように `OTEL_EXPORTER_OTLP_ENDPOINT` 環境変数を設定します。

{{< tabs >}}
{{% tab "ホスト" %}}

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
```
{{% /tab %}}

{{% tab "Docker" %}}
アプリケーションコンテナに以下の環境変数を設定します。

```
OTEL_EXPORTER_OTLP_ENDPOINT=http://<collector-hostname>:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```
両方のコンテナが同じネットワーク上にある必要があります。Docker Compose を使用している場合、これは自動的に処理されます。
{{% /tab %}}

{{% tab "Kubernetes" %}}
アプリケーションデプロイメントマニフェストで、ホスト IP を使用してエンドポイントを設定します。

```yaml
env:
  - name: HOST_IP
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP
  - name: OTEL_EXPORTER_OTLP_ENDPOINT
    value: "http://$(HOST_IP):4318"
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: "http/protobuf"
```
{{% /tab %}}
{{< /tabs >}}

アプリケーションの OpenTelemetry 構成で、`service.name`、`deployment.environment.name`、および`service.version` リソース属性を設定します。Datadog はこれらを [Unified Service Tagging][4] にマッピングします。Unified Service Tagging により、トレース、メトリクス、ログが相関付けられます。

## セットアップの確認{#verify-the-setup}

アプリケーションがコレクターにテレメトリを送信した後で、Datadog にデータが表示されることを確認してください。

1. Datadog で [{{< ui >}}APM{{< /ui >}}] > [{{< ui >}}Services{{< /ui >}}] (サービス) に移動し、`service.name` が表示されていることを確認します。
2. [{{< ui >}}APM{{< /ui >}}] > [{{< ui >}}Traces{{< /ui >}}] (トレース) を開き、サービスを検索します。
3. [{{< ui >}}Infrastructure{{< /ui >}}] (インフラストラクチャー) > [{{< ui >}}Host Map{{< /ui >}}] (ホストマップ) に移動し、コレクターを実行しているホストが表示されていることを確認します。
4. OTLP 経由でログを送信する場合は、[{{< ui >}}Logs Explorer{{< /ui >}}] に移動してサービス名を検索します。

## 主要コンポーネント {#key-components}

### スパンメトリクスコネクタ{#span-metrics-connector}

`span_metrics` コネクタは、トレースデータから RED メトリクスを生成します。これらのメトリクスは、Service Catalog、Service Page、Resource Page などの APM 機能を強化します。このコネクタは、Datadog がトレースからホストタグ、ピアサービス、オペレーション名を計算できるようにするディメンションで構成されています。

コンテナタグに関連するディメンションを含む、推奨構成に含まれるすべてのディメンションのリストについては、`opentelemetry-examples`リポジトリの [完全な構成ファイル][5] を参照してください。これらのファイルには、`- glob: container.**` などの glob パターンを使用してコンテナタグディメンションのグループを置き換える方法も示されています。

### OTLP HTTP エクスポーター {#otlp-http-exporter}

`otlp_http` エクスポーターは、テレメトリデータを Datadog の OTLP インテークエンドポイントに送信します。主な構成の詳細を以下に示します。

- **エンドポイント**: `https://otlp.<YOUR_DD_SITE>` (トレース、ログ、メトリクス)。
- **圧縮**: 帯域幅の使用量を削減するため、`zstd` が推奨されます。`zstd` を使用する場合は、デフォルトで最も低い圧縮レベルが使用されるため、`compression_params.level` を明示的に設定してください。
- **バッチ処理**: `sending_queue.batch` 設定では、2 MiB でフラッシュを開始し、4 MiB でシリアル化されたバッチを分割します。413 応答が返される場合は、これらのサイズを小さくしてください。

#### `dd-otel-metric-config`header {#dd-otel-metric-config-header}

`dd-otel-metric-config` ヘッダーは、メトリクスリクエストと共に送信される JSON ペイロードであり、Datadog が OTLP メトリクスをどのように処理するかを設定します。これは `otlp_http` エクスポーターの `headers` セクションで設定してください。

| フィールド | 型 | デフォルト | 説明 |
|---|---|---|---|
| `resource_attributes_as_tags` | Boolean | `false` | OTLP リソース属性を、出力されるメトリクスの Datadog タグとして伝播します。|
| `instrumentation_scope_metadata_as_tags` | Boolean | `false` | OTLP インスツルメンテーションスコープのメタデータ (スコープ名とバージョン) を、出力されるメトリクスのタグとして伝播します。|
| `trace_metrics.namespace` | String | `traces.span.metrics` | トレースから派生するメトリクスに適用されるネームスペースプレフィックス。|
| `trace_metrics.instrumentation_metrics_calc` | Boolean | `false` | `true` の場合、APM トレースメトリクスを強化するため、サポートされている HTTP インスツルメンテーションメトリクスをルーティングします。|
| `raw_instrumentation_metrics_drop` | Boolean | `false` | `true` の場合、APM トレースメトリクス用に生の HTTP インスツルメンテーションメトリクスをルーティングした後で、通常のメトリクスインテークからそれらのメトリクスを削除します。`trace_metrics.instrumentation_metrics_calc` が `true` の場合にのみ適用されます。|

インスツルメンテーションメトリクスを有効にした場合の例:

```json
{
  "trace_metrics": {
    "namespace": "myapp.traces",
    "instrumentation_metrics_calc": true
  },
  "raw_instrumentation_metrics_drop": false,
  "resource_attributes_as_tags": true,
  "instrumentation_scope_metadata_as_tags": false
}
```

<div class="alert alert-info">推奨される OTLP OTel コレクター構成では以下が使用されます。 <code>span_metrics</code> APM ビューを強化する RED メトリクスを生成するためのコネクタ。ここでの <code>trace_metrics.instrumentation_metrics_calc</code> および <code>raw_instrumentation_metrics_drop</code> フィールドは、HTTP インスツルメンテーションメトリクスから APM トレースメトリクスを派生させるセットアップ向けの代替構成をサポートしています。この <code>instrumentation_metrics_calc</code> を <code>span_metrics</code> コネクタとともに有効にしないでください。このようにすると、両方のソースからのトレースメトリクスが計算されるためです。</div>

### Datadog 拡張機能 {#datadog-extension}

`datadog` 拡張機能は、ホストエンリッチメントのためにコレクターメタデータを Datadog に送信します。テレメトリデータはエクスポートされません。すべてのテレメトリは、OTLP HTTP エクスポーターを経由して移動します。この拡張機能は [OpenTelemetry Collector Contrib][1] プロジェクトの一部であり、API キーの検証とデプロイメントタイプのレポートを行います。

### 累積 - デルタプロセッサー {#cumulative-to-delta-processor}

`cumulativetodelta` プロセッサーは、累積メトリクスをデルタ一時性に変換します。これは、OpenTelemetry メトリクスの場合の [Datadog 推奨の構成][6] です。

### Kubelet 統計レシーバー {#kubelet-stats-receiver}

Kubernetes デプロイメントでは、`kubelet_stats` レシーバーが各ノードの kubelet からノード、Pod、コンテナ、およびボリュームのメトリクスを収集します。`deltatorate` プロセッサーは、生成された Pod ネットワークメトリクスをレートに変換します。

### 自己監視テレメトリ {#self-monitoring-telemetry}

この構成では、コレクター自体のメトリクスがそのローカル OTLP レシーバー (`http://localhost:4318`) に送り返されます。これにより、コレクターの内部メトリクスは専用パイプラインを介してルーティングされるため、Datadog にエクスポートされる前にリソース属性でエンリッチされます。

## OTLP インテーク制限 {#otlp-intake-limits}

Datadog は、OTLP データを取り込む際に以下の制限を適用します。制限を超えたデータは、説明されているとおり拒否または削除されます。

**ペイロードサイズ**
: 各インテークエンドポイントには、リクエストごとの最大ペイロードサイズが設定されています。この制限を超えるリクエストは、`HTTP 413 Request Entity Too Large` 応答で拒否されます。413 エラーを受け取った場合は、バッチサイズを減らすか、より頻繁にフラッシュして、各リクエストが制限内に収まるようにしてください。各エンドポイントのペイロードサイズ制限については、[インテーク制限][8] を参照してください。

**ヒストグラムバケット数**
: 各ヒストグラムデータポイントは取り込み時に検証されます。バケットあたりの最大数 (単一バケット内の観測結果数) は 2,147,483,647 (2<sup>31</sup> − 1) です。いずれかのバケットがこの制限を超えると、データポイント全体が削除されます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib
[2]: /ja/account_management/api-app-keys/
[3]: /ja/getting_started/site/
[4]: /ja/getting_started/tagging/unified_service_tagging/
[5]: https://github.com/DataDog/opentelemetry-examples/tree/experimental-oss-config/configurations/opentelemetry-collector
[6]: /ja/opentelemetry/guide/otlp_delta_temporality/
[7]: /ja/opentelemetry/compatibility/
[8]: /ja/opentelemetry/setup/otlp_ingest/#intake-limits
[100]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest