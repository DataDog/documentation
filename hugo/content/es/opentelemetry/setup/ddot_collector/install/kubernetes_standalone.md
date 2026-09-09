---
description: Implemente la distribución independiente de Datadog del Collector de
  OpenTelemetry (DDOT) en Kubernetes utilizando el OpenTelemetry Operator o el Helm
  chart.
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentación
  text: Utilice componentes personalizados de OpenTelemetry en DDOT
title: Instale el Collector DDOT independiente como un DaemonSet de Kubernetes
---
{{< callout header="false" btn_hidden="true" >}}
La instalación del Collector DDOT independiente con herramientas de OpenTelemetry está en versión preliminar.
{{< /callout >}}

## Descripción general {#overview}

Siga esta guía para implementar la distribución de Datadog de OpenTelemetry (DDOT) Collector utilizando el OpenTelemetry Operator o el Helm chart.

<div class="alert alert-info">
  <strong>¿Necesita componentes adicionales de OpenTelemetry?</strong> Si necesita componentes más allá de los incluidos en el paquete predeterminado, siga <a href="/opentelemetry/setup/ddot_collector/custom_components">Utilice componentes personalizados de OpenTelemetry</a> para ampliar las capacidades de DDOT. Para obtener una lista de los componentes incluidos de forma predeterminada, consulte <a href="/opentelemetry/agent/#opentelemetry-collector-components">Componentes del Collector de OpenTelemetry</a>.
</div>

## Requisitos {#requirements}

Para completar esta guía, necesita lo siguiente:

**Cuenta de Datadog**:
1. [Cree una cuenta de Datadog][1] si no tiene una.
1. Busque o cree su [clave de API de Datadog][2].

**Software**:
Instale y configure lo siguiente en su máquina:

- Un clúster de Kubernetes (v1.29+)
- [Helm (v4+)][54]
- [kubectl][5]

**Red**:
| Protocolo | Transporte | Puerto |
|:---------|:----------|-----:|
| gRPC     | TCP       | 4317 |
| HTTP     | TCP       | 4318 |

## Instale la distribución de Datadog del Collector de OpenTelemetry {#install-the-datadog-distribution-of-the-opentelemetry-collector}

### Seleccione el método de instalación {#select-installation-method}

Elija uno de los siguientes métodos de instalación:

- [Operador de OpenTelemetry][55]: un enfoque [nativo de Kubernetes][56] que reconcilia y mantiene automáticamente su configuración del OTel Collector.
- [Helm chart][4]: una forma sencilla de implementar OTel Collectors.

{{< tabs >}}
{{% tab "Operador" %}}
### Instale el OpenTelemetry Operator {#install-the-opentelemetry-operator}

Puede instalar el OpenTelemetry Operator en su clúster utilizando el [OpenTelemetry Operator Helm chart][1]:

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
Para FED, establezca la etiqueta en <code>{{< version key="agent_version" >}}-fips</code> para usar la imagen DDOT compatible con FIPS.
Consulte <a href="/agent/configuration/fips-compliance/">cumplimiento de FIPS</a>.
</div>
{{% /site-region %}}

[1]: https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-operator/README.md
{{% /tab %}}
{{% tab "Helm" %}}
### Agregue el repositorio de Helm de OpenTelemetry {#add-the-opentelemetry-helm-repository}

Para agregar el repositorio de OpenTelemetry a sus repositorios de Helm:

```shell
helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Configure la clave de API de Datadog {#set-up-datadog-api-key}

1. Obtenga la [clave de API][2] de Datadog.
1. Confirme que el **DATADOG SITE** seleccionado a la derecha (Valor actual: **{{< region-param key="dd_site_name" >}}**) corresponde a su [DATADOG SITE][52].
1. Almacene la clave de API como un secreto de Kubernetes:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>        \
     --from-literal site={{< region-param key="dd_site" >}}
   ```
   Replace `<DD_API_KEY>` with your actual Datadog API key.

### Configure the OTel Collector 

{{< tabs >}}
{{% tab "Operador" %}}
Después de implementar el OTel Operator, cree el recurso `OpenTelemetryCollector` que activa la implementación del Collector.

1. Utilice el archivo `node-collector.yaml` para especificar su configuración de daemonset `OpenTelemetryCollector`.

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

Reemplace `<CLUSTER_NAME>` con un nombre para su clúster.

2. Agregue un receptor OTLP y el exportador de Datadog para todas las señales deseadas. Publique los puertos OTLP en el nodo con `hostPort` para que los pods de la aplicación puedan llegar a la instancia del Collector que se ejecuta en el mismo nodo:

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

3. (Opcional) Habilite funciones adicionales:

<div class="alert alert-warning">Habilitar estas funciones puede generar cargos adicionales. Revise la <a href="https://www.datadoghq.com/pricing/">página de precios</a> y hable con su Gerente de Éxito del Cliente antes de continuar.</div>

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

4. (Opcional) Recopile registros de contenedor del sistema de archivos del nodo:

<div class="alert alert-warning">Habilitar la recopilación de registros puede generar cargos adicionales. Revise la <a href="https://www.datadoghq.com/pricing/">página de precios</a> y hable con su Gerente de Éxito del Cliente antes de continuar.</div>

El receptor `filelog` lee los registros de contenedor del nodo. Debido a que el Operador no monta rutas del servidor automáticamente, agregue los directorios de registro como volúmenes de solo lectura:

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

{{% collapse-content title="Archivo node-collector.yaml completado" level="p" %}}
Su archivo `node-collector.yaml` debería verse más o menos así:
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

Reemplace `<CLUSTER_NAME>` con un nombre para su clúster.

{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Helm" %}}
Use un archivo YAML para especificar los parámetros del Helm chart para el [Collector chart][1].

1. Cree un archivo `node-collector-values.yaml` vacío:

```shell
touch node-collector-values.yaml
```

<div class="alert alert-info">Los parámetros no especificados usan los valores predeterminados de <a href="https://github.com/open-telemetry/opentelemetry-helm-charts/blob/main/charts/opentelemetry-collector/values.yaml">values.yaml</a>.</div>

2. Elija el modo daemonset y use DDOT como el Collector:

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
<div class="alert alert-info">Para FED, establezca <code>tag: {{< version key="agent_version" >}}-fips</code> para usar la imagen DDOT compatible con FIPS. Consulte <a href="/agent/configuration/fips-compliance/">cumplimiento de FIPS</a>.</div>
{{% /site-region %}}

<div class="alert alert-info">El Helm chart del Collector publica los puertos OTLP en cada nodo por defecto (<code>hostPort: 4317</code> para gRPC y <code>hostPort: 4318</code> para HTTP), por lo que los pods de la aplicación pueden llegar a la instancia del Collector que se ejecuta en el mismo nodo. Consulte <a href="#configure-the-application">Configurar la aplicación</a>.</div>

3. Configure el exportador de Datadog y el secreto de la clave de API:

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

Reemplace `<CLUSTER_NAME>` con un nombre para su clúster.

4. Habilite los ajustes preestablecidos:

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

5. Defina las canalizaciones para las señales deseadas, con un receptor OTLP:

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

6. (Opcional) Habilite funciones adicionales de Datadog:

<div class="alert alert-warning">Habilitar estas funciones puede generar cargos adicionales. Revise la <a href="https://www.datadoghq.com/pricing/">página de precios</a> y hable con su Gerente de Éxito del Cliente antes de continuar.</div>

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

{{% collapse-content title="Archivo node-collector-values.yaml completado" level="p" %}}
Su archivo `node-collector-values.yaml` debería verse más o menos así:
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
[2]: /es/getting_started/site/
[3]: /es/containers/guide/changing_container_registry/
{{% /tab %}}
{{< /tabs >}}

### Implemente el Collector {#deploy-the-collector}

{{< tabs >}}
{{% tab "Operador" %}}
Aplique el archivo `node-collector.yaml` para crear el recurso `OpenTelemetryCollector`. El OpenTelemetry Operator implementa el Collector como un DaemonSet, ejecutando una instancia por nodo:

```shell
kubectl apply -f node-collector.yaml
```
{{% /tab %}}
{{% tab "Helm" %}}
Instale el Helm chart del OpenTelemetry Collector con su archivo de valores:

```shell
helm install node-collector open-telemetry/opentelemetry-collector -f node-collector-values.yaml
```

Para aplicar cambios posteriores, ejecute `helm upgrade node-collector open-telemetry/opentelemetry-collector -f node-collector-values.yaml`.
{{% /tab %}}
{{< /tabs >}}

## Instale el Datadog Agent principal junto con DDOT {#install-the-core-datadog-agent-alongside-ddot}

Si desea ejecutar el Datadog Agent principal en los mismos nodos que el Collector DDOT independiente (por ejemplo, para recopilar métricas de infraestructura, APM o registros a través del Agent principal mientras DDOT maneja la ingesta de OTLP), puede instalarlo por separado utilizando el [Datadog Operator][57].

De forma predeterminada, el Datadog Operator Helm chart observa <code>DatadogAgent</code> recursos solo en el espacio de nombres donde está instalado el Datadog Operator (<code>watchNamespaces: []</code>). Si el <code>DatadogAgent</code> recurso está en un espacio de nombres diferente al del Datadog Operator, por ejemplo, para mantenerlo separado del <code>OpenTelemetryCollector</code> espacio de nombres del recurso, establezca <code>watchNamespaces</code> para incluir el espacio de nombres donde el <code>DatadogAgent</code> recurso es creado:
<pre><code>helm upgrade datadog-operator datadog/datadog-operator \
  -n &lt;OPERATOR_NAMESPACE&gt; \
  --reuse-values \
  --set 'watchNamespaces[0]=&lt;DATADOG_AGENT_NAMESPACE&gt;'
</code></pre>
Si el Datadog Operator no observa el espacio de nombres donde el <code>DatadogAgent</code> recurso es creado, el recurso falla silenciosamente al reconciliarse, sin error, sin evento de Kubernetes y sin actualización de estado que indique el problema.

## Envíe su telemetría a Datadog {#send-your-telemetry-to-datadog}

Para enviar sus datos de telemetría a Datadog:

1. [Instrumente su aplicación](#instrument-the-application)
2. [Configure la aplicación](#configure-the-application)
3. [Correlacione los datos de observabilidad](#correlate-observability-data)
4. [Ejecute su aplicación](#run-the-application)

### Instrumente la aplicación {#instrument-the-application}

Instrumente su aplicación [usando la API de OpenTelemetry][12].

{{% collapse-content title="Ejemplo de aplicación instrumentada con la API de OpenTelemetry" level="p" %}}
Como ejemplo, puede usar la [aplicación de muestra Calendar][9] que ya está instrumentada para usted. El siguiente código instrumenta el método [CalendarService.getDate()][10] usando las anotaciones y la API de OpenTelemetry:
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="false" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}
{{% /collapse-content %}}

### Configure la aplicación {#configure-the-application}

El contenedor de su aplicación debe enviar datos al Collector de DDOT que se ejecuta en el mismo nodo. Debido a que el Collector publica los puertos OTLP en el nodo con `hostPort`, la aplicación puede comunicarse con el Collector local a través de la dirección IP del nodo (`status.hostIP`).

Si la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` aún no está configurada, agréguela al archivo de manifiesto de implementación de su aplicación:
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

### Correlacione los datos de observabilidad {#correlate-observability-data}

[Unified service tagging][14] vincula los datos de observabilidad en Datadog para que pueda navegar entre métricas, trazas y registros con etiquetas consistentes.

En entornos contenerizados, configure `env`, `service` y `version` utilizando variables de entorno de atributos de recursos de OpenTelemetry. El Collector de DDOT detecta esta configuración de etiquetado y la aplica a los datos que recopila de los contenedores.

Agregue las siguientes variables de entorno al manifiesto de implementación de su aplicación:

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

### Ejecute la aplicación {#run-the-application}

Vuelva a implementar su aplicación para aplicar los cambios realizados en el manifiesto de implementación. Una vez que la configuración actualizada esté activa, Unified Service Tagging estará completamente habilitado para sus métricas, trazas y registros.

## Explore los datos de observabilidad en Datadog {#explore-observability-data-in-datadog}

Utilice Datadog para explorar los datos de observabilidad de su aplicación.

### Fleet Automation {#fleet-automation}

Explore la configuración de su Collector.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Revise la configuración de su Collector desde la página de Fleet Automation." style="width:100%;" >}}

### Monitoreo en vivo de contenedor {#live-container-monitoring}

Haga un seguimiento del estado de sus contenedores utilizando las capacidades de Container Monitoring.

{{< img src="/opentelemetry/embedded_collector/containers.png" alt="Haga un seguimiento del estado de sus contenedores desde la página de Containers." style="width:100%;" >}}

### Estado de salud del nodo de infraestructura {#infrastructure-node-health}

Vea las métricas de tiempo de ejecución y de infraestructura para visualizar, monitorear y medir el rendimiento de sus nodos.

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="Vea las métricas de tiempo de ejecución y de infraestructura desde el Host List." style="width:100%;" >}}

### Registros {#logs}

Vea los registros para monitorear y solucionar problemas de las operaciones de la aplicación y del sistema.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Vea los registros desde el Log Explorer." style="width:100%;" >}}

### Trazas {#traces}

Visualice las trazas y los spans para observar el estado y el rendimiento de las solicitudes procesadas por su aplicación, con métricas de infraestructura correlacionadas en la misma traza.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Visualice las trazas desde el Trace Explorer." style="width:100%;" >}}

### Métricas de tiempo de ejecución {#runtime-metrics}

Monitoree las métricas de tiempo de ejecución (JVM) de sus aplicaciones.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="Visualice las métricas de JVM desde el JVM Metrics dashboard" style="width:100%;" >}}

### Métricas de salud del colector {#collector-health-metrics}

Visualice las métricas del DDOT Collector para hacer un seguimiento de la salud del Collector.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="Visualice las métricas de salud del Collector desde el OTel dashboard." style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://app.datadoghq.com/organization-settings/application-keys
[4]: https://opentelemetry.io/docs/platforms/kubernetes/helm/collector/
[5]: https://kubernetes.io/docs/tasks/tools/#kubectl
[9]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[10]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[12]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[14]: /es/getting_started/tagging/unified_service_tagging
[52]: /es/getting_started/site/
[54]: https://helm.sh
[55]: https://opentelemetry.io/docs/platforms/kubernetes/operator/
[56]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[57]: /es/getting_started/containers/datadog_operator/