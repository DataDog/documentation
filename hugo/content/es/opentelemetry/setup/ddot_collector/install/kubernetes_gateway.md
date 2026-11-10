---
code_lang: kubernetes_gateway
code_lang_weight: 2
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentación
  text: Utilice componentes personalizados de OpenTelemetry con el Datadog Agent
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralice y gobierne su canalización de OpenTelemetry con el gateway DDOT
- link: https://www.datadoghq.com/blog/otel-gateway-topology-view/
  tag: Blog
  text: Solucione problemas de gateways de OTel con Datadog Fleet Automation
- link: https://opentelemetry.io/docs/collector/deployment/gateway/
  tag: OpenTelemetry
  text: 'Implementación del Collector: Gateway'
- link: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/loadbalancingexporter
  tag: OpenTelemetry
  text: Exportador de balanceo de carga
- link: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/tailsamplingprocessor
  tag: OpenTelemetry
  text: Procesador de muestreo basado en seguimiento de las últimas líneas
title: Instale el Collector de DDOT como un Gateway en Kubernetes
type: multi-code-lang
---
<div class="alert alert-info">
Esta guía asume que usted está familiarizado con la implementación del Collector de DDOT como un DaemonSet. Para obtener más información, consulte <a href="/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset">Instale el Collector de DDOT como un DaemonSet en Kubernetes</a>.
</div>

## Descripción general {#overview}

El Collector de OpenTelemetry se puede implementar de varias maneras. El patrón *daemonset* es una implementación común donde una instancia del Collector se ejecuta en cada nodo de Kubernetes junto al Datadog Agent principal.

{{< img src="opentelemetry/embedded_collector/ddot_daemonset.png" alt="Diagrama de arquitectura del patrón daemonset del Collector de OpenTelemetry. Un clúster de Kubernetes contiene tres nodos. En cada nodo, una aplicación instrumentada con OpenTelemetry envía datos OTLP a un DaemonSet de Agent local. El DaemonSet de Agent luego reenvía estos datos directamente al backend de Datadog." style="width:100%;" >}}

El patrón [gateway][6] proporciona una opción de implementación adicional que utiliza un servicio de Collector centralizado e independiente. Esta capa de gateway puede realizar acciones como el muestreo basado en seguimiento de las últimas líneas, agregación, filtrado y enrutamiento antes de exportar los datos a uno o más backends, como Datadog. Actúa como un punto central para gestionar y aplicar políticas de observabilidad.

{{< img src="opentelemetry/embedded_collector/ddot_gateway_diagram.png" alt="Diagrama de arquitectura del patrón gateway del Collector de OpenTelemetry. Las aplicaciones envían datos OTLP a los DaemonSets de DDOT locales que se ejecutan en cada nodo. Los DaemonSets reenvían estos datos a un balanceador de carga central, el cual los distribuye a una implementación separada de pods de gateway de DDOT. Estos pods de gateway envían entonces los datos de telemetría a Datadog." style="width:100%;" >}}

Cuando habilite el gateway:
1.  Un Deployment de Kubernetes (`<RELEASE_NAME>-datadog-otel-agent-gateway-deployment`) gestiona los pods del **Collector gateway** independientes.
2.  Un Service de Kubernetes (`<RELEASE_NAME>-datadog-otel-agent-gateway`) expone los pods del gateway y proporciona balanceo de carga.
3.  Los pods del **DaemonSet Collector** existentes están configurados por defecto para enviar sus datos de telemetría al servicio del gateway en lugar de directamente a Datadog.

En un despliegue de gateway, adjunte la información del servidor antes de que la telemetría llegue al gateway. Para la configuración de hostname recomendada, consulte [Hostname and Tagging][12].

## Requisitos {#requirements}

Antes de comenzar, asegúrese de tener lo siguiente:

* **Cuenta de Datadog**:
    * Una [cuenta de Datadog][1].
    * Su [clave de API de Datadog][2].
* **Software**:
    * Un clúster de Kubernetes (v1.29+). EKS Fargate y GKE Autopilot no son compatibles.
    * [Helm][3] (v3+).
    ​* Versión 3.160.1+ del chart de Helm de Datadog o versión 1.23.0+ del Datadog Operator.
    * [kubectl][4].
* **Red**:
  {{% otel-network-requirements %}}

## Instalación y configuración {#installation-and-configuration}

Esta guía muestra cómo configurar el gateway del Collector DDOT utilizando el Datadog Operator o el chart de Helm.

<div class="alert alert-info">Esta instalación es necesaria tanto para las configuraciones de Datadog SDK + DDOT como de OpenTelemetry SDK + DDOT. Aunque el Datadog SDK implementa la API de OpenTelemetry, todavía requiere el DDOT Collector para procesar y reenviar métricas y registros de OTLP.</div>

Elija uno de los siguientes métodos de instalación:

- **Datadog Operator**: Un enfoque nativo de Kubernetes que reconcilia y mantiene automáticamente su configuración de Datadog. Informa el estado de la implementación, el estado de salud y los errores en el estado de su Custom Resource, y limita el riesgo de una configuración incorrecta gracias a opciones de configuración de nivel superior.
- **Helm chart**: Una forma sencilla de implementar el Datadog Agent. Proporciona capacidades de control de versiones, reversión y creación de plantillas, lo que hace que las implementaciones sean consistentes y más fáciles de replicar.

### Instale el Datadog Operator o Helm {#install-the-datadog-operator-or-helm}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Si aún no ha instalado el Datadog Operator, puede instalarlo en su clúster utilizando el Helm chart del Datadog Operator:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

Para obtener más información, consulte la [documentación del Datadog Operator][1].

[1]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/

{{% /tab %}}
{{% tab "Helm" %}}

Si aún no ha agregado el repositorio de Helm de Datadog, agréguelo ahora:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

Para obtener más información sobre las opciones de configuración de Helm, consulte el [README del chart de Helm de Datadog][1].

[1]: http://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md

{{% /tab %}}
{{< /tabs >}}

### Implementación del gateway con un DaemonSet {#deploying-the-gateway-with-a-daemonset}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Para comenzar, habilite tanto el gateway como el Collector de DaemonSet en su recurso `DatadogAgent`. Esta es la configuración más común.

Cree un archivo llamado `datadog-agent.yaml`:

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

Aplique la configuración:

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Para comenzar, habilite tanto el gateway como el Collector de DaemonSet en su archivo `values.yaml`. Esta es la configuración más común.

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

En este caso, el Collector de DaemonSet utiliza una configuración predeterminada que envía datos OTLP al servicio de Kubernetes del gateway:

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

El Collector del gateway utiliza una configuración predeterminada que escucha en los puertos del servicio y envía datos a Datadog:

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
<strong>Para usuarios de Helm:</strong> Configure <code>otelAgentGateway.affinity</code> o <code>otelAgentGateway.nodeSelector</code> para controlar la ubicación de los pods y ajuste <code>otelAgentGateway.replicas</code> para escalar el gateway.<br>
<strong>Para usuarios de tipo Operador:</strong> Utilice <code>override.otelAgentGateway.affinity</code>, <code>override.otelAgentGateway.nodeSelector</code>, y <code>override.otelAgentGateway.replicas</code> para estos ajustes.</div>

### Implementación de un gateway independiente {#deploying-a-standalone-gateway}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Si tiene una implementación de DaemonSet existente, puede implementar el gateway de forma independiente deshabilitando otros componentes:

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

Después de implementar el gateway, debe actualizar la configuración de sus Collectors de DaemonSet existentes para enviar datos al nuevo punto de conexión del servicio de gateway (por ejemplo, `http://datadog-gateway-otel-agent-gateway:4318`).

{{% /tab %}}
{{% tab "Helm" %}}

Si tiene una implementación de DaemonSet existente, puede implementar el gateway de forma independiente.

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

Después de implementar el gateway, debe actualizar la configuración de sus Collectors de DaemonSet existentes para enviar datos al nuevo punto de conexión del servicio de gateway (por ejemplo, `http://gw-only-otel-agent-gateway:4318`).

{{% /tab %}}
{{< /tabs >}}

### Personalización de las configuraciones del Collector {#customizing-collector-configurations}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Puede personalizar la configuración del Collector del gateway mediante ConfigMaps. Cree un ConfigMap con su configuración personalizada:

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

Luego, haga referencia a él en su recurso `DatadogAgent`:

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

Para ConfigMaps de varios elementos o configuración en línea, consulte los [ejemplos de DatadogAgent][1].

[1]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent

{{% /tab %}}
{{% tab "Helm" %}}

Puede anular las configuraciones predeterminadas tanto para los Collectors de DaemonSet como del gateway utilizando los valores `datadog.otelCollector.config` y `otelAgentGateway.config`, respectivamente.

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
Si establece <code>fullnameOverride</code>, el nombre del servicio de Kubernetes de la puerta de enlace se convierte en <code><fullnameOverride>-otel-agent-gateway</code>. Los puertos definidos en <code>otelAgentGateway.ports</code> se exponen en este servicio. Asegúrese de que estos puertos coincidan con la configuración del receptor OTLP en la puerta de enlace y la configuración del exportador OTLP en el DaemonSet.
</div>

{{% /tab %}}
{{< /tabs >}}

Las configuraciones de ejemplo utilizan TLS inseguro por simplicidad. Siga las [instrucciones de configtls de OTel][7] si desea habilitar TLS.

### Opciones de configuración avanzada {#advanced-configuration-options}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

El Datadog Operator proporciona opciones de configuración adicionales para el OTel Agent Gateway bajo `override.otelAgentGateway` (**NO** `features.otelAgentGateway` excepto `featureGates`):

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

Para obtener una referencia completa de todas las opciones disponibles, consulte la [documentación de configuración de DatadogAgent v2alpha1][1].

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}
{{% tab "Helm" %}}

Para implementaciones basadas en Helm, muchas de estas opciones de configuración avanzada se pueden establecer directamente en el archivo `values.yaml` bajo la sección `otelAgentGateway`. Para obtener una referencia completa, consulte el [README del chart de Helm de Datadog][1].

[1]: http://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md

{{% /tab %}}
{{< /tabs >}}

## Casos de uso avanzado {#advanced-use-cases}

### Muestreo basado en seguimiento de las últimas líneas con el exportador de balanceo de carga {#tail-sampling-with-the-load-balancing-exporter}

Un caso de uso principal para el gateway es el muestreo basado en seguimiento de las últimas líneas. Para asegurarse de que todos los spans de una traza determinada sean procesados por el mismo pod del gateway, utilice el **load balancing exporter** en sus DaemonSet Collectors. Este exportador enruta los spans de manera consistente según una clave, como `traceID`.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

El DaemonSet Collector se configura con el exportador `loadbalancing`, que utiliza el resolvedor de servicios de Kubernetes para descubrir y enrutar datos a los pods del gateway. El Collector del gateway utiliza el procesador `tail_sampling` para muestrear trazas según políticas definidas antes de exportarlas a Datadog.

**Nota**: Se requieren permisos RBAC para el resolvedor de k8s en el exportador de balanceo de carga.

Cree un ConfigMap para la configuración del DaemonSet Collector con el exportador de balanceo de carga:

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

Cree un ConfigMap para la configuración del Collector de la puerta de enlace con seguimiento de las últimas líneas:

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

Aplique la configuración de DatadogAgent:

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

Cree un ClusterRole para que el DaemonSet acceda a los endpoints:

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
Para asegurarse de que las estadísticas de APM se calculen en el 100% de sus trazas antes del muestreo, el <code>datadog/connector</code> se ejecuta en una canalización separada sin el <code>tail_sampling</code> procesador. El conector puede ejecutarse en el DaemonSet o en la capa de puerta de enlace.
</div>

{{% /tab %}}
{{% tab "Helm" %}}

En la configuración a continuación:

1.  El Collector de tipo daemonset (`datadog.otelCollector`) está configurado con el exportador `loadbalancing`, que utiliza el resolvedor de servicios de Kubernetes para descubrir y enrutar datos a los pods de la puerta de enlace.
2.  El Collector de puerta de enlace (`otelAgentGateway`) utiliza el procesador `tail_sampling` para muestrear trazas según políticas definidas antes de exportarlas a Datadog.

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
Para asegurarse de que las estadísticas de APM se calculen en el 100% de sus trazas antes del muestreo, el <code>datadog/connector</code> se ejecuta en una canalización separada sin el <code>tail_sampling</code> procesador. El conector puede ejecutarse en el DaemonSet o en la capa de puerta de enlace.
</div>

{{% /tab %}}
{{< /tabs >}}

### Uso de una imagen de Collector personalizada {#using-a-custom-collector-image}

Para utilizar una imagen de Collector personalizada para su puerta de enlace, especifique el repositorio y la etiqueta de la imagen. Si necesita instrucciones sobre cómo crear las imágenes personalizadas, consulte [Use Custom OpenTelemetry Components][5].

<div class="alert alert-info">
<strong>Nota:</strong> El Datadog Operator admite los siguientes formatos de nombre de imagen:
<ul>
  <li><code>name</code> - El nombre de la imagen (por ejemplo, <code>ddot-collector</code>)</li>
  <li><code>name:tag</code> - Nombre de la imagen con etiqueta (por ejemplo, <code>ddot-collector:{{% version key="ddot_gateway_version" %}}</code>)</li>
  <li><code>registry/name:tag</code> - Referencia completa de la imagen (por ejemplo, <code>gcr.io/datadoghq/ddot-collector:{{% version key="ddot_gateway_version" %}}</code>)</li>
</ul>
El <code>registry/name</code> el formato (sin etiqueta en el campo de nombre) <strong>no es compatible</strong> cuando se utiliza un separado <code>tag</code> campo. Incluya la referencia completa de la imagen con la etiqueta en el <code>name</code> campo, o utilice el nombre de la imagen con una etiqueta separada <code>tag</code> campo.
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

### Habilite el escalado automático con Horizontal Pod Autoscaler (HPA) {#enable-autoscaling-with-horizontal-pod-autoscaler-hpa}

La puerta de enlace DDOT Collector admite el escalado automático con la función Horizontal Pod Autoscaler (HPA) de Kubernetes.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

**Nota**: El Datadog Operator no administra directamente los recursos de HPA. Debe crear el recurso HPA por separado y configurarlo para que apunte a la implementación de OTel Agent Gateway.

Cree un recurso HPA:

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

Aplique la configuración de DatadogAgent con solicitudes/límites de recursos (necesarios para HPA):

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

Para habilitar HPA, configure `otelAgentGateway.autoscaling`:

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

Puede utilizar métricas de recursos (CPU o memoria), métricas personalizadas (pod u objeto de Kubernetes) o métricas externas como entradas de escalado automático. Para métricas de recursos, asegúrese de que el [servidor de métricas de Kubernetes][9] se esté ejecutando en su clúster. Para métricas personalizadas o externas, considere configurar el [proveedor de métricas del Datadog Cluster Agent][10].

### Implemente una puerta de enlace de varias capas {#deploying-a-multi-layer-gateway}

Para escenarios avanzados, puede implementar varias capas de puerta de enlace para crear una cadena de procesamiento.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Implemente cada capa como un recurso `DatadogAgent` independiente, comenzando desde la capa final y trabajando hacia atrás.

1.  **Implemente la capa 1 (capa final):** Esta capa recibe datos de la capa 2 y los exporta a Datadog.

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

2.  **Implemente la capa 2 (capa intermedia):** Esta capa recibe datos del DaemonSet y los exporta a la capa 1.

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

3.  **Implemente DaemonSet:** Configure el DaemonSet para exportar a la capa 2.

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

Implemente cada capa como una versión de Helm independiente, comenzando desde la capa final y trabajando hacia atrás.

1.  **Implemente la capa 1 (capa final):** Esta capa recibe datos de la capa 2 y los exporta a Datadog.

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

2.  **Implemente la capa 2 (capa intermedia):** Esta capa recibe datos del DaemonSet y los exporta a la capa 1.

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

3.  **Implemente DaemonSet:** Configure el DaemonSet para exportar a la capa 2.

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

## Visualizar pods de puerta de enlace en Fleet Automation {#view-gateway-pods-on-fleet-automation}

La puerta de enlace DDOT Collector incluye la [extensión de Datadog][11] de forma predeterminada. Esta extensión exporta información y configuraciones de compilación del Collector a Datadog, lo que le permite hacer un seguimiento de su canalización de telemetría desde Infrastructure Monitoring y Fleet Automation.

Para visualizar sus pods de la puerta de enlace:

1. Navegue a {{< ui >}}Integrations{{< /ui >}} > {{< ui >}}Fleet Automation{{< /ui >}}.

  {{< img src="opentelemetry/embedded_collector/fleet_automation2.png" alt="Página de Fleet Automation que muestra los pods de la puerta de enlace de DDOT" style="width:100%;" >}}

2. Seleccione un pod de la puerta de enlace para visualizar información detallada de la compilación y la configuración del Collector en ejecución.

  {{< img src="opentelemetry/embedded_collector/fleet_automation3.png" alt="Página de Fleet Automation que muestra la configuración del Collector de un pod de la puerta de enlace de DDOT" style="width:100%;" >}}

## Limitaciones conocidas {#known-limitations}

  * **Condición de carrera de inicio**: Al implementar el DaemonSet y la puerta de enlace en la misma versión, los pods del DaemonSet podrían iniciarse antes de que el servicio de la puerta de enlace esté listo, lo que provoca registros de error de conexión iniciales. El exportador OTLP vuelve a intentarlo automáticamente, por lo que estos registros pueden ignorarse de forma segura. Alternativamente, implemente la puerta de enlace primero y espere a que esté lista antes de implementar el DaemonSet.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://helm.sh
[4]: https://kubernetes.io/docs/tasks/tools/#kubectl
[5]: /es/opentelemetry/setup/ddot_collector/custom_components
[6]: https://opentelemetry.io/docs/collector/deployment/gateway/
[7]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/config/configtls
[9]: http://github.com/kubernetes-sigs/metrics-server
[10]: /es/containers/guide/cluster_agent_autoscaling_metrics/?tab=helm
[11]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/extension/datadogextension
[12]: /es/opentelemetry/config/hostname_tagging/#collector-exporting-through-a-gateway