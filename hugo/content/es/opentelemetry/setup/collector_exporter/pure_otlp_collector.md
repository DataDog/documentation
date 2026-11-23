---
aliases:
- /es/opentelemetry/setup/collector_exporter/oss_setup/
- /es/opentelemetry/setup/collector_exporter/community_collector/
description: Envíe datos de OpenTelemetry a Datadog utilizando el OpenTelemetry Collector
  de OTLP
further_reading:
- link: https://opentelemetry.io/docs/collector/
  tag: Sitio externo
  text: Documentación del Collector
- link: /opentelemetry/setup/collector_exporter/deploy
  tag: Documentación
  text: Implemente el OpenTelemetry Collector
- link: /opentelemetry/config/hostname_tagging
  tag: Documentación
  text: Configure el nombre de servidor y el etiquetado
private: true
title: Configure el OpenTelemetry Collector de OTLP
---
## Descripción general {#overview}

Envíe trazas, métricas y logs a Datadog utilizando el OpenTelemetry Collector de OTLP, el cual se basa en la distribución [OpenTelemetry Collector Contrib][1] y en componentes estándar de OpenTelemetry. Esta configuración utiliza los siguientes componentes clave:

- **Exportador HTTP de OTLP**: Envía telemetría a los puntos de conexión de ingesta de OTLP de Datadog.
- **Conector de métricas de tramo**: Genera métricas RED (tasa, error, duración) a partir de datos de trazas para potenciar funciones de APM como el Service Catalog y la Service Page.
- **Procesador de detección de recursos**: Detecta atributos de recursos de servidor y nube, que Datadog utiliza para la resolución de nombres de servidor y el etiquetado.

{{< img src="/opentelemetry/setup/oss-collector.png" alt="Diagrama: El SDK de OpenTelemetry en el código envía datos a través de OTLP al servidor que ejecuta cualquier OpenTelemetry Collector con el exportador HTTP de OTLP, el cual los reenvía a la Plataforma de Observabilidad de Datadog." style="width:100%;" >}}

<div class="alert alert-warning">Esta configuración está en versión preliminar (Preview). Algunas funciones de Datadog pueden comportarse de manera diferente en comparación con la configuración del Datadog Exporter. Por ejemplo, la <a href="/infrastructure/list/">Lista de infraestructura</a> puede mostrar menos metadatos de servidor hasta que se finalice el soporte para la ingesta de metadatos de servidor y las vistas relacionadas con el Explorador de Kubernetes pueden estar vacías.</div>

## Requisitos previos {#prerequisites}

Esta configuración es compatible con bare metal, VM, Docker y Kubernetes. Las distribuciones de Kubernetes gestionadas compatibles incluyen Amazon EKS (incluido Auto Mode), Google GKE (Standard y Autopilot) y Azure AKS (incluido Automatic).

Esta configuración no es compatible con entornos de ejecución de contenedores sin servidor o basados en tareas, como ECS Fargate o AWS Lambda. Para conocer las funciones de Datadog compatibles, consulte la [tabla de compatibilidad de funciones][7] en **OTel SDK + OTLP OTel Collector**.

- [OpenTelemetry Collector Contrib][1] v0.154.0 o posterior
- Una [clave de Datadog API][2]
- Su [sitio de Datadog][3] (por ejemplo, `datadoghq.com` o `datadoghq.eu`)

## Instale y configure {#install-and-configure}

### 1. Descargue el OpenTelemetry Collector {#1-download-the-opentelemetry-collector}

Descargue la versión más reciente de la distribución OpenTelemetry Collector Contrib desde la [página de versiones][100].

### 2. Cree la configuración del Collector {#2-create-the-collector-configuration}

Cree un archivo de configuración llamado `collector.yaml`. La configuración varía según su entorno. Seleccione la pestaña que coincida con su configuración:

{{< tabs >}}
{{% tab "Servidor" %}}

Utilice esta configuración para un Collector sin contenedores que se ejecute directamente en un servidor (bare metal o VM).

Configure las variables de entorno `DD_API_KEY` y `DD_SITE` antes de iniciar el Collector.

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

Para entornos específicos de la nube, agregue el detector de detección de recursos adecuado:
- **Amazon EC2**: `detectors: [ec2, env, system]`
- **Google Cloud**: `detectors: [gcp, env, system]`
- **Azure**: `detectors: [azure, env, system]`

Consulte los [archivos de configuración completos][500] para obtener una configuración opcional para recopilar metadatos adicionales sobre el sistema.

[500]: https://github.com/DataDog/opentelemetry-examples/tree/experimental-oss-config/configurations/opentelemetry-collector

{{% /tab %}}

{{% tab "Docker" %}}

Utilice esta configuración para un Collector en contenedores. El receptor `host_metrics` requiere montar el sistema de archivos del servidor en `/hostfs`.

Configure las siguientes variables de entorno antes de iniciar el Collector:

- `DD_API_KEY` y `DD_SITE`
- `OTEL_RESOURCE_ATTRIBUTES`: El Collector no puede detectar información del servidor desde dentro de un contenedor, así que proporciónela aquí (por ejemplo, `host.name=<YOUR_HOST_NAME>`).

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

Ejecute el Collector con el sistema de archivos del servidor montado:

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

Utilice esta configuración para un Collector implementado como un DaemonSet de Kubernetes en un entorno que no sea de nube. Incluye el procesador `k8s_attributes` para enriquecer la telemetría con metadatos de Kubernetes y el receptor `kubelet_stats` para métricas de nodos, pods, contenedores y volúmenes. En una distribución de Kubernetes administrada, aplique los cambios descritos en [Distribuciones de Kubernetes administradas](#managed-kubernetes-distributions) después de la configuración.

Establezca las siguientes variables de entorno en la especificación del pod del Collector, utilizando la API descendente de Kubernetes donde se indique:

- `DD_API_KEY` y `DD_SITE`
- `K8S_NODE_NAME`: El nombre del nodo de Kubernetes, utilizado por el receptor `kubelet_stats`. Establézcala desde el campo `spec.nodeName`.
- `MY_POD_IP`: La IP del pod, utilizada por la extensión `health_check`. Establézcala desde el campo `status.podIP`.
- `OTEL_RESOURCE_ATTRIBUTES`: El Collector no puede determinar el nombre del servidor desde dentro de un contenedor, así que proporcione la información del servidor aquí (por ejemplo, `k8s.node.name=$(K8S_NODE_NAME)`). La sintaxis `$(VAR)` es expandida por Kubernetes, así que establézcala en la especificación del pod en lugar de en un shell.

Monte el sistema de archivos del servidor en `/hostfs` para que el receptor `host_metrics` pueda recopilar métricas del servidor.

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

Esta configuración requiere una ServiceAccount vinculada a un ClusterRole que otorgue `get`, `list`, y `watch` sobre `pods`, `namespaces`, `nodes`, `nodes/stats`, y `replicasets`. El procesador `k8s_attributes` lee los metadatos del pod, y el receptor `kubelet_stats` lee `nodes/stats`. Consulte la [documentación del procesador de atributos de Kubernetes][101] para obtener instrucciones de configuración de RBAC, y agregue `nodes/stats` a las reglas que enumera.

#### Distribuciones de Kubernetes administradas {#managed-kubernetes-distributions}

En una distribución de Kubernetes administrada, reemplace el procesador `resource_detection` en la configuración anterior con la variante para su entorno. Los detectores de nube proporcionan información del servidor, por lo que no necesita configurar `OTEL_RESOURCE_ATTRIBUTES`.

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

Los detectores `ec2` y `eks` necesitan acceso al punto de conexión de IMDS desde dentro de un contenedor. Establezca el límite de saltos del token de IMDS en 2 en su plantilla de inicio de nodos o en la configuración de su cuenta. El `timeout` se aumenta a `15s` para permitir la latencia de IMDS.

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

El detector `eks` requiere una asociación de Pod Identity que asigne al Collector un rol de IAM con el permiso `EC2:DescribeInstances`.

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

En versiones anteriores de GKE, es posible que el detector `gcp` no devuelva un nombre de servidor. Si eso sucede, proporcione el nombre del nodo como `host.name` en `OTEL_RESOURCE_ATTRIBUTES`.

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

##### GKE Autopilot y AKS Automatic {#gke-autopilot-and-aks-automatic}

Estos modos no permiten montar `/hostfs` ni usar puertos de servidor. Utilice el procesador `resource_detection` de GKE o AKS y luego realice estos cambios adicionales:

- Elimine el receptor `host_metrics` del bloque `receivers` y de la canalización `metrics`. Las métricas de nodo, pod, contenedor y volumen siguen proviniendo del receptor `kubelet_stats`.
- Deshabilite los puertos de servidor en el Collector y expóngalo a través de un Service local del nodo en su lugar. Apunte sus aplicaciones a ese Service en lugar de a la IP del servidor que se muestra en [Configure su aplicación](#4-configure-your-application).

Para obtener los archivos de configuración completos para cada entorno, consulte el [`opentelemetry-examples` repositorio][501].

[101]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/k8sattributesprocessor#role-based-access-control
[501]: https://github.com/DataDog/opentelemetry-examples/tree/experimental-oss-config/configurations/opentelemetry-collector

{{% /tab %}}

{{% tab "Kubernetes (Helm chart)" %}}

Puede implementar el Collector como un DaemonSet en Kubernetes utilizando el [chart de Helm oficial de OpenTelemetry Collector][102] v0.147.1 o posterior. Los archivos de valores a continuación configuran los montajes, las variables de entorno y los recursos RBAC requeridos.

1. Cree un secreto de Kubernetes con su clave de Datadog API:

   ```shell
   kubectl create secret generic datadog-secrets --from-literal=api-key='<YOUR_API_KEY>'
   ```

1. Agregue el repositorio de Helm de OpenTelemetry:

   ```shell
   helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
   ```

1. Descargue el archivo de valores de ejemplo para su entorno y guárdelo como `values.yaml`. Si su sitio de Datadog no es `datadoghq.com`, actualice el valor `DD_SITE` en `values.yaml` antes de instalar.

   | Entorno | Archivo de valores |
   |---|---|
   | Kubernetes (sin nube) | [`daemonset.yaml`][103] |
   | Amazon EKS | [`daemonset-eks.yaml`][104] |
   | Amazon EKS Auto Mode | [`daemonset-eks-auto.yaml`][105] |
   | Google GKE | [`daemonset-gke.yaml`][106] |
   | Google GKE Autopilot | [`daemonset-gke-autopilot.yaml`][107] |
   | Azure AKS | [`daemonset-aks.yaml`][108] |
   | Azure AKS Automatic | [`daemonset-aks-automatic.yaml`][109] |

   En Amazon EKS, los archivos de valores no pueden configurar los ajustes requeridos del lado de AWS. Aplique lo siguiente fuera de Helm:

   - **Amazon EKS**: Los detectores `ec2` y `eks` necesitan acceso al punto de conexión de IMDS desde dentro de un contenedor. Establezca el límite de saltos del token de IMDS en 2 en su plantilla de inicio de nodos o en la configuración de su cuenta.
   - **Amazon EKS Auto Mode**: El detector `eks` requiere una asociación de Pod Identity que asigne al Collector un rol de IAM con el permiso `EC2:DescribeInstances`.

1. Instale el Collector:

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

### 3. Ejecute el Collector {#3-run-the-collector}

Inicie el Collector. Si utiliza Docker o Kubernetes, el comando de ejecución se incluye en la sección [Cree la configuración del Collector](#2-create-the-collector-configuration).

Para instalaciones en servidor, ejecute:

```shell
DD_SITE={{< region-param key="dd_site" >}} DD_API_KEY=<YOUR_API_KEY> \
  otelcol-contrib --config collector.yaml
```

### 4. Configure su aplicación {#4-configure-your-application}

Configure su aplicación instrumentada con OpenTelemetry para enviar datos al Collector. Establezca la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` para que apunte al Collector:

{{< tabs >}}
{{% tab "Servidor" %}}

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
```
{{% /tab %}}

{{% tab "Docker" %}}
Establezca las siguientes variables de entorno en el contenedor de su aplicación:

```
OTEL_EXPORTER_OTLP_ENDPOINT=http://<collector-hostname>:4318
OTEL_EXPORTER_OTLP_PROTOCOL=http/protobuf
```
Ambos contenedores deben estar en la misma red. Si utiliza Docker Compose, esto se gestiona automáticamente.
{{% /tab %}}

{{% tab "Kubernetes" %}}
En el manifiesto de implementación de su aplicación, configure el punto de conexión utilizando la IP del servidor:

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

Establezca los atributos de recurso `service.name`, `deployment.environment.name` y `service.version` en la configuración de OpenTelemetry de su aplicación. Datadog asigna esto a [Unified Service Tagging][4], lo que correlaciona sus trazas, métricas y registros.

## Verifique la configuración {#verify-the-setup}

Después de que su aplicación envíe telemetría al Collector, verifique que los datos aparezcan en Datadog:

1. En Datadog, vaya a {{< ui >}}APM{{< /ui >}} > {{< ui >}}Services{{< /ui >}} y confirme que su `service.name` aparece.
2. Abra {{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}} y busque su servicio.
3. Vaya a {{< ui >}}Infrastructure{{< /ui >}} > {{< ui >}}Host Map{{< /ui >}} y confirme que aparece el servidor que ejecuta el Collector.
4. Si envía registros a través de OTLP, vaya a {{< ui >}}Logs Explorer{{< /ui >}} y busque el nombre de su servicio.

## Componentes clave {#key-components}

### Conector de métricas de tramo {#span-metrics-connector}

El conector `span_metrics` genera métricas RED a partir de datos de trazas. Estas métricas potencian las funciones de APM, incluyendo el Service Catalog, la Página de Servicio y la Página de recursos. El conector se configura con dimensiones que permiten a Datadog calcular etiquetas de servidor, servicios pares y nombres de operaciones a partir de sus trazas.

Para obtener una lista completa de las dimensiones incluidas en la configuración recomendada, incluidas las relacionadas con las etiquetas de contenedor, consulte los [archivos de configuración completos][5] en el repositorio `opentelemetry-examples`. Esos archivos también muestran cómo reemplazar grupos de dimensiones de etiquetas de contenedor con patrones glob, como `- glob: container.**`.

### Exportador OTLP HTTP {#otlp-http-exporter}

El exportador `otlp_http` envía datos de telemetría a los puntos de conexión de ingesta OTLP de Datadog. Detalles clave de configuración:

- **Punto de conexión**: `https://otlp.<YOUR_DD_SITE>` para trazas, registros y métricas.
- **Compresión**: `zstd` se recomienda para reducir el uso de ancho de banda. Al usar `zstd`, configure `compression_params.level` explícitamente, ya que el valor predeterminado utiliza el nivel de compresión más bajo.
- **Procesamiento por lotes**: La configuración de `sending_queue.batch` comienza a vaciarse a los 2 MiB y divide los lotes serializados a los 4 MiB. Si recibe una respuesta 413, reduzca estos tamaños.

#### `dd-otel-metric-config` header {#dd-otel-metric-config-header}

El header `dd-otel-metric-config` es una carga útil JSON enviada con solicitudes de métricas que configura cómo Datadog procesa las métricas OTLP. Configúrelo en la sección `headers` del exportador `otlp_http`.

| Campo | Tipo | Predeterminado | Descripción |
|---|---|---|---|
| `resource_attributes_as_tags` | Booleano | `false` | Propaga los atributos de recursos OTLP como etiquetas de Datadog en las métricas emitidas. |
Booleano | `instrumentation_scope_metadata_as_tags` | Propaga los metadatos del contexto de instrumentación OTLP (nombre y versión del contexto) como etiquetas en las métricas emitidas. | `false` |  |
| `trace_metrics.namespace` | Cadena | `traces.span.metrics` | Prefijo de espacio de nombres aplicado a las métricas derivadas de trazas. |
| `trace_metrics.instrumentation_metrics_calc` | Booleano | `false` | Cuando `true`, enruta las métricas de instrumentación HTTP compatibles para potenciar las métricas de trazas de APM. |
| `raw_instrumentation_metrics_drop` | Booleano | `false` | Cuando `true`, descarta las métricas de instrumentación HTTP sin procesar de la ingesta de métricas regular después de enrutarlas para las métricas de trazas de APM. Solo se aplica cuando `trace_metrics.instrumentation_metrics_calc` es `true`. |

Ejemplo con métricas de instrumentación habilitadas:

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

<div class="alert alert-info">La configuración recomendada del OTel Collector de OTLP utiliza el <code>span_metrics</code> conector para generar las métricas RED que potencian las vistas de APM. El <code>trace_metrics.instrumentation_metrics_calc</code> y <code>raw_instrumentation_metrics_drop</code> los campos admiten una configuración alternativa para configuraciones que derivan métricas de trazas de APM a partir de métricas de instrumentación HTTP en su lugar. No habilite <code>instrumentation_metrics_calc</code> junto con el <code>span_metrics</code> conector, ya que esto calcula métricas de trazas de ambas fuentes.</div>

### Extensión de Datadog{#datadog-extension}

La extensión `datadog` envía metadatos del Collector a Datadog para el enriquecimiento de servidores. No exporta datos de telemetría. Toda la telemetría fluye a través del exportador HTTP de OTLP. Esta extensión es parte del proyecto [OpenTelemetry Collector Contrib][1] y maneja la validación de claves de API y la generación de informes de tipo de implementación.

### Procesador de acumulativo a delta{#cumulative-to-delta-processor}

El procesador `cumulativetodelta` convierte métricas acumulativas a temporalidad delta, que es la [configuración recomendada por Datadog][6] para métricas de OpenTelemetry.

### Receptor de estadísticas de Kubelet {#kubelet-stats-receiver}

En implementaciones de Kubernetes, el receptor `kubelet_stats` recopila métricas de nodos, pods, contenedores y volúmenes del kubelet en cada nodo. El procesador `deltatorate` convierte las métricas de red de pod que produce a tasas.

### Telemetría de automonitoreo {#self-monitoring-telemetry}

La configuración envía las propias métricas del Collector de vuelta a su receptor OTLP local (`http://localhost:4318`). Esto enruta las métricas internas del Collector a través de sus propias canalizaciones para que se enriquezcan con atributos de recursos antes de ser exportadas a Datadog.

## Límites de ingesta de OTLP {#otlp-intake-limits}

Datadog aplica los siguientes límites al ingerir datos OTLP. Los datos que exceden un límite son rechazados o descartados según se indica.

**Tamaño de carga útil**
: Cada punto de conexión de ingesta aplica un tamaño máximo de carga útil por solicitud. Las solicitudes que superan el límite son rechazadas con una respuesta `HTTP 413 Request Entity Too Large`. Si recibe un 413, reduzca el tamaño del lote o vacíe con mayor frecuencia para que cada solicitud se mantenga por debajo del límite. Para conocer el límite de tamaño de carga útil de cada punto de conexión, consulte [Intake limits][8].

**Recuento de depósitos de histograma**
: Cada punto de datos de histograma se valida al momento de la ingesta, con un recuento máximo por depósito (la cantidad de observaciones en cualquier depósito individual) de 2,147,483,647 (2<sup>31</sup> − 1). Si algún depósito excede esto, se descarta todo el punto de datos.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-collector-contrib
[2]: /es/account_management/api-app-keys/
[3]: /es/getting_started/site/
[4]: /es/getting_started/tagging/unified_service_tagging/
[5]: https://github.com/DataDog/opentelemetry-examples/tree/experimental-oss-config/configurations/opentelemetry-collector
[6]: /es/opentelemetry/guide/otlp_delta_temporality/
[7]: /es/opentelemetry/compatibility/
[8]: /es/opentelemetry/setup/otlp_ingest/#intake-limits
[100]: https://github.com/open-telemetry/opentelemetry-collector-releases/releases/latest