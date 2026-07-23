---
code_lang: kubernetes_gateway
code_lang_weight: 2
further_reading:
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: Blog
  text: Centralizar y controlar tu pipeline de OpenTelemetry con la puerta de enlace
    DDOT
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentación
  text: Uso de componentes personalizados de OpenTelemetry con el Datadog Agent
- link: https://opentelemetry.io/docs/collector/deployment/gateway/
  tag: OpenTelemetry
  text: 'Despliegue del recopilador: Puerta de enlace'
- link: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/loadbalancingexporter
  tag: OpenTelemetry
  text: Exportador de balanceos de carga
- link: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/tailsamplingprocessor
  tag: OpenTelemetry
  text: Procesador de muestreo del seguimiento
title: Instalar el recopilador de DDOT como puerta de enlace en Kubernetes
type: multi-code-lang
---

<div class="alert alert-info">
Esta guía asume que tienes conocimientos del despliegue del recopilador de DDOT como DaemonSet. Para obtener más información, consulta <a href="/opentelemetry/setup/ddot_collector/install/kubernetes_daemonset">Instalar el recopilador de DDOT como DaemonSet en Kubernetes</a>.
</div>

## Información general

El recopilador de OpenTelemetry puede desplegarse de varias formas. El patrón *daemonset* es un despliegue frecuente en el que una instancia del recopilador se ejecuta en cada nodo Kubernetes junto con el Datadog Agent principal.

{{< img src="opentelemetry/embedded_collector/ddot_daemonset.png" alt="Diagrama de arquitectura de un patrón daemonset del recopilador de OpenTelemetry. Un clúster Kubernetes contiene tres nodos. En cada nodo, una aplicación instrumentada con OpenTelemetry envía datos de OTLP a un DaemonSet del Agent local. El DaemonSet del Agent envía a continuación estos datos directamente al backend Datadog." style="width:100%;" >}}

El patrón de [puerta de enlace][6] proporciona una opción de despliegue adicional que utiliza un servicio de recopilador centralizado e independiente. Esta capa de puerta de enlace puede realizar acciones como el muestreo basado en el seguimiento, la agregación, el filtrado y el enrutamiento, antes de exportar los datos a uno o más backends como Datadog. Actúa como punto central para la gestión y la aplicación de políticas de observabilidad.

{{< img src="opentelemetry/embedded_collector/ddot_gateway.png" alt="Diagrama de arquitectura de un patrón de puerta de enlace del recopilador de OpenTelemetry. Las aplicaciones envían datos de OTLP a DaemonSets del Agent local que se ejecutan en cada nodo. Los DaemonSets reenvían estos datos a un balanceador de carga central, que los distribuye a un despliegue de pods del recopilador de puerta de enlace. Estos pods de puerta de enlace a continuación procesan y envían los datos de telemetría a Datadog." style="width:100%;" >}}

Al activar la puerta de enlace:
1.  Un despliegue Kubernetes (`<RELEASE_NAME>-datadog-otel-agent-gateway-deployment`) gestiona **pods del recopilador de puerta de enlace** independiente.
2.  Un servicio Kubernetes (`<RELEASE_NAME>-datadog-otel-agent-gateway`) expone los pods de puerta de enlace y proporciona un balanceo de carga.
3.  Los **pods del recopilador de DaemonSet** existentes están configurados por defecto para enviar tus datos de telemetría al servicio de puerta de enlace en lugar de directamente a Datadog.

## Requisitos

Antes de empezar, asegúrate de tener lo siguiente:

* **Cuenta de Datadog**:
    * Una [cuenta de Datadog][1].
    * Tu [clave de API][2] de Datadog.
* **Software**:
    * Un clúster Kubernetes (v1.29 o posterior). EKS Fargate y GKE Autopilot no son compatibles.
    * [Helm][3] (v3 o posterior).
    * Datadog Helm chart versión 3.160.1 o posterior o Datadog Operator versión 1.23.0 o posterior.
    * [kubectl][4].
* **Red**:
  {{% otel-network-requirements %}}

## Instalación y configuración

Esta guía muestra cómo configurar la puerta de enlace del recopilador de DDOT utilizando el Datadog Operator o Helm chart.

<div class="alert alert-info">Esta instalación es necesaria para las siguientes configuraciones de Datadog: SDK + DDOT y SDK OpenTelemetry + DDOT. Aunque el SDK Datadog implementa la API OpenTelemetry, sigue necesitando que el recopilador de DDOT procese y reenvíe métricas y logs de OTLP.</div>

Elige uno de los siguientes métodos de instalación:

- **Datadog Operator**: Estrategia nativa de Kubernetes que concilia y conserva automáticamente tu configuración de Datadog. Informa del estado del despliegue, de la salud y de los errores en su estado de recurso personalizado, y limita el riesgo de configuraciones incorrectas gracias a opciones de configuración de alto nivel.
- **Helm chart**: Forma sencilla de desplegar el Datadog Agent. Proporciona capacidades de versionado, rollback y plantillas, lo que hace que los despliegues sean consistentes y más fáciles de replicar.

### Instalar el Datadog Operator o Helm

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Si aún no has instalado el Datadog Operator, puedes instalarlo en tu clúster utilizando el Helm chart del Datadog Operator:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

Para obtener más información, consulta la [documentación del Datadog Operator][1].

[1]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/

{{% /tab %}}
{{% tab "Helm" %}}

Si aún no has añadido el repositorio Helm de Datadog, añádelo ahora:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

Para obtener más información sobre las opciones de configuración de Helm, consulta el [README Helm chart de Datadog][1].

[1]: http://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md

{{% /tab %}}
{{< /tabs >}}

### Despliegue de la puerta de enlace con un DaemonSet

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Para empezar, activa tanto la puerta de enlace como el recopilador de DaemonSet en tu recurso `DatadogAgent`. Esta es la configuración más frecuente.

Crea un archivo llamado `datadog-agent.yaml`:

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
    # Activar el recopilador en el DaemonSet del Agent
    otelCollector:
      enabled: true

    # Activar el despliegue de la puerta de enlace independiente
    otelAgentGateway:
      enabled: true

  override:
    otelAgentGateway:
      # Número de réplicas
      replicas: 3
      # Controlar el posicionamiento de pods de puerta de enlace
      nodeSelector:
        gateway: "true"
```

Aplica la configuración:

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Para empezar, activa tanto la puerta de enlace como el recopilador de DaemonSet en tu recurso `values.yaml`. Esta es la configuración más frecuente.

```yaml
# values.yaml
targetSystem: "linux"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Activar el recopilador en el DaemonSet del Agent
  otelCollector:
    enabled: true

# Activar el despliegue de la puerta de enlace independiente
otelAgentGateway:
  enabled: true
  replicas: 3
  nodeSelector:
    # Ejemplo de selector de posicionamiento de pods de puerta de enlace en nodos específicos
    gateway: "true"
```

{{% /tab %}}
{{< /tabs >}}

En este caso, el recopilador de DaemonSet utiliza una configuración por defecto que envía datos de OTLP al servicio Kubernetes de la puerta de enlace:

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

El recopilador de puerta de enlace utiliza una configuración por defecto que escucha en los puertos de servicio y envía datos a Datadog:

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
<strong>Para usuarios de Helm:</strong> Configura <code>otelAgentGateway.affinity</code> o <code>otelAgentGateway.nodeSelector</code> para controlar el posicionamiento de los pods y ajusta <code>otelAgentGateway.replicas</code> para escalar la puerta de enlace.<br>
<strong>Para usuarios del Operator:</strong> Utiliza <code>override.otelAgentGateway.affinity</code>, <code>override.otelAgentGateway.nodeSelector</code> y <code>override.otelAgentGateway.replicas</code> para esos parámetros.</div>

### Despliegue de una puerta de enlace independiente

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Si ya dispones de un despliegue de DaemonSet, puedes desplegar la puerta de enlace de forma independiente desactivando otros componentes:

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
      # Número de réplicas
      replicas: 3
      # Controlar el posicionamiento de pods de puerta de enlace
      nodeSelector:
        gateway: "true"

    # Desactivar el DaemonSet del Agent
    nodeAgent:
      disabled: true
    # Desactivar el Cluster Agent
    clusterAgent:
      disabled: true
```

Después de desplegar la puerta de enlace, debes actualizar la configuración de los recopiladores de DaemonSet existentes para enviar datos al nuevo endpoint del servicio de puerta de enlace (por ejemplo, `http://datadog-gateway-otel-agent-gateway:4318`).

{{% /tab %}}
{{% tab "Helm" %}}

Si ya dispones de un despliegue de DaemonSet, puedes desplegar la puerta de enlace de forma independiente.

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

Después de desplegar la puerta de enlace, debes actualizar la configuración de tus recopiladores DaemonSet existentes para enviar datos al nuevo endpoint del servicio de puerta de enlace (por ejemplo, `http://gw-only-otel-agent-gateway:4318`).

{{% /tab %}}
{{< /tabs >}}

### Personalización de las configuraciones del recopilador

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Puedes personalizar la configuración del recopilador de puerta de enlace utilizando ConfigMaps. Crea un ConfigMap con tu configuración personalizada:

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

A continuación, menciónalo en tu recurso `DatadogAgent`:

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
      # Mencionar el ConfigMap personalizado
      config:
        configMap:
          name: otel-gateway-config

  override:
    otelAgentGateway:
      replicas: 3
```

Para ConfigMaps de varios elementos o configuración en línea, consulta los [ejemplos de Datadog Agent][1].

[1]: https://github.com/DataDog/datadog-operator/tree/main/examples/datadogagent

{{% /tab %}}
{{% tab "Helm" %}}

Puedes anular las configuraciones por defecto de los recopiladores DaemonSet y puerta de enlace utilizando los valores `datadog.otelCollector.config` y `otelAgentGateway.config`, respectivamente.

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "my-gw"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  # Activar y configurar el recopilador de DaemonSet
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

# Activar y configurar el recopilador de puerta de enlace
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
Si configuras <code>fullnameOverride</code>, el nombre de servicio Kubernetes de la puerta de enlace se convierte en <code><fullnameOverride>-otel-agent-gateway</code>. Los puertos definidos en <code>otelAgentGateway.ports</code> están expuestos en este servicio. Asegúrate de que estos puertos coinciden con la configuración del receptor OTLP en la configuración de la puerta de enlace y del exportador OTLP en el DaemonSet.
</div>

{{% /tab %}}
{{< /tabs >}}

Las configuraciones de ejemplo utilizan TLS inseguro por simplicidad. Sigue las [instrucciones de OTel configtls][7] si quieres activar TLS.

### Opciones avanzadas de configuración

{{< tabs >}}
{{% tab "Datadog Operator" %}}

El Datadog Operator proporciona opciones de configuración adicionales para la puerta de enlace del Agent de OTel en `override.otelAgentGateway` (**NO** `features.otelAgentGateway`, excepto `featureGates`):

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

      # Puertas de funciones del recopilador de OTel (configuración específica de la función)
      featureGates: "telemetry.UseLocalHostAsDefaultMetricsAddress"

  override:
    otelAgentGateway:
      # Número de réplicas
      replicas: 3

      # Selector de nodo para el posicionamiento de pods
      nodeSelector:
        kubernetes.io/os: linux
        gateway: "true"

      # Configuración de afinidades
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

      # Tolerancias de nodos contaminados
      tolerations:
      - key: "dedicated"
        operator: "Equal"
        value: "otel-gateway"
        effect: "NoSchedule"

      # Clase de prioridad para la programación
      priorityClassName: high-priority

      # Variables de entorno
      env:
      - name: OTEL_LOG_LEVEL
        value: "info"

      # Variables de entorno de ConfigMaps or secretos
      envFrom:
      - configMapRef:
          name: otel-gateway-config

      # Imagen personalizada (opcional)
      image:
        name: ddot-collector
        tag: "{{< version key="ddot_gateway_version" >}}"
        pullPolicy: IfNotPresent

      # Contexto de seguridad a nivel de pod
      securityContext:
        runAsUser: 1000
        runAsGroup: 1000
        fsGroup: 1000

      # Configurar recursos
      containers:
        otel-agent:
          resources:
            requests:
              cpu: 200m
              memory: 512Mi
            limits:
              cpu: 500m
              memory: 1Gi

      # Etiquetas (labels) y anotaciones adicionales
      labels:
        team: observability
      annotations:
        prometheus.io/scrape: "true"
```

Para ver una referencia completa de todas las opciones disponibles, consulta la [documentación de configuración de Datadog Agent v2alpha1][1].

[1]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}
{{% tab "Helm" %}}

Para despliegues basados en Helm, muchas de estas opciones de configuración avanzadas pueden configurarse directamente en el archivo `values.yaml` en la sección `otelAgentGateway`. Para ver una referencia completa, consulta el [README Helm chart de Datadog][1].

[1]: http://github.com/DataDog/helm-charts/blob/main/charts/datadog/README.md

{{% /tab %}}
{{< /tabs >}}

## Casos de uso avanzados

### Muestreo del seguimiento con el exportador de balanceos de carga

Un caso de uso primario de la puerta de enlace es el muestreo basado en el seguimiento. Para garantizar que todos los tramos (spans) de una traza (trace) determinada sean procesados por el mismo pod de puerta de enlace, utiliza el **exportador de balanceos de carga** en tus recopiladores de DaemonSet. Este exportador enruta de forma consistente los tramos en función de una clave, como `traceID`.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

El recopilador de DaemonSet está configurado con el exportador de `loadbalancing`, que utiliza el resolver del servicio Kubernetes para detectar y enrutar datos a pods de puerta de enlace. El recopilador de puerta de enlace utiliza el procesador de `tail_sampling` para muestrear trazas en función de políticas definidas antes de exportarlas a Datadog.

**Nota**: Se requieren permisos de configuración del control de acceso basado en roles (RBAC) para el resolver de k8s en el exportador de balanceos de carga.

Crea un ConfigMap para la configuración del recopilador de DaemonSet con el exportador de balanceos de carga:

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

Crea un ConfigMap para la configuración del recopilador de puerta de enlace con el muestreo del seguimiento:

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
          # Añadir tus políticas de muestreo aquí
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

Aplica la configuración del Datadog Agent:

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
      # Mencionar la configuración personalizada del DaemonSet
      config:
        configMap:
          name: otel-daemonset-config
      # Permisos de RBAC para el resolver de k8s
      rbac:
        create: true

    otelAgentGateway:
      enabled: true
      # Mencionar la configuración personalizada de la puerta de enlace
      config:
        configMap:
          name: otel-gateway-tailsampling-config

  override:
    otelAgentGateway:
      replicas: 3
```

Crea un ClusterRole para que el DaemonSet acceda a los endpoints:

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: otel-collector-k8s-resolver
rules:
- apiGroups: [""]
  resources: ["endpoints"] # para la v0.139.0 y anteriores
  verbs: ["get", "watch", "list"]
- apiGroups: ["discovery.k8s.io"]
  resources: ["endpointslices"] # para la v0.140.0 y posteriores
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
Para asegurarse de que las estadísticas de APM se calculan en el 100% de tus trazas antes del muestreo, el <code>datadog/conector</code> se ejecuta en un pipeline separado sin el procesador <code>tail_sampling</code>. El conector puede ejecutarse en el DaemonSet o en la capa de la puerta de enlace.
</div>

{{% /tab %}}
{{% tab "Helm" %}}

En la configuración de abajo:

1.  El recopilador de DaemonSet (`datadog.otelCollector`) está configurado con el exportador de`loadbalancing`, que utiliza el resolver del servicio Kubernetes para detectar y enrutar datos a pods de puerta de enlace.
2.  El recopilador de puerta de enlace (`otelAgentGateway`) utiliza el procesador de `tail_sampling` para muestrear trazas basadas en políticas definidas antes de exportarlas a Datadog.

```yaml
# values.yaml
targetSystem: "linux"
fullnameOverride: "my-gw"
datadog:
  apiKey: <DATADOG_API_KEY>
  appKey: <DATADOG_APP_KEY>
  otelCollector:
    enabled: true
    # Los permisos de RBAC son necesarios para el resolver de k8s en el exportador de balanceo de cargas
    rbac:
      create: true
      rules:
        - apiGroups: [""]
          resources: ["endpoints"] # para la v0.139.0 y anteriores
          verbs: ["get", "watch", "list"]
        - apiGroups: ["discovery.k8s.io"]
          resources: ["endpointslices"] # para la v0.140.0 y posteriores
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
Para asegurarse de que las estadísticas de APM se calculan en el 100% de tus trazas antes del muestreo, el <code>datadog/conector</code> se ejecuta en un pipeline separado sin el procesador <code>tail_sampling</code>. El conector puede ejecutarse en el DaemonSet o en la capa de la puerta de enlace.
</div>

{{% /tab %}}
{{< /tabs >}}

### Utilizar una imagen personalizada del recopilador

Para utilizar una imagen personalizada del recopilador para tu puerta de enlace, especifica el repositorio de imágenes y la etiqueta (tag). Si necesitas instrucciones sobre cómo crear imágenes personalizadas, consulta [Uso de componentes personalizados de OpenTelemetry][5].

<div class="alert alert-info">
<strong>Nota:</strong> El Datadog Operator admite los siguientes formatos de nombre de imagen:
<ul>
  <li><code>name</code> - Nombre de imagen (por ejemplo, <code>ddot-collector</code>)</li>
  <li><code>name:tag</code> - Nombre de imagen con etiqueta (por ejemplo, <code>ddot-collector:{{% version key="ddot_gateway_version" %}}</code>)</li>
  <li><code>registry/name:tag</code> - Referencia completa de la imagen (por ejemplo, <code>gcr.io/datadoghq/ddot-collector:{{% version key="ddot_gateway_version" %}}</code>)</li>
</ul>
El formato del <code>registro/nombre</code> (sin etiqueta en el campo de nombre) no <strong>es compatible</strong> cuando se utiliza un campo de <code>etiqueta</code> diferente. Incluye la referencia completa de la imagen con etiqueta en el campo de <code>nombre</code> o utiliza el nombre de imagen con un campo de <code>etiqueta</code> diferente.
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

### Activar Autoscaling con Horizontal Pod Autoscaler (HPA)

La puerta de enlace del recopilador de DDOT admite el escalado automático con la función Kubernetes Horizontal Pod Autoscaler (HPA).

{{< tabs >}}
{{% tab "Datadog Operator" %}}

**Nota**: El Datadog Operator no gestiona directamente recursos HPA. Debes crear el recurso HPA por separado y configurarlo para que apunte al despliegue de la puerta de enlace del Agent de OpenTelemetry.

Crea un recurso HPA:

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
  # Intentar alcanzar un uso de CPU elevado para un mayor rendimiento
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

Aplica la configuración del Datadog Agent con solicitudes/límites de recursos (necesario para HPA):

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
      replicas: 4  # Réplicas iniciales, HPA sustituirá en función de las métricas
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

Para activar HPA, configura `otelAgentGateway.autoscaling`:

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
  replicas: 4  # 4 réplicas para empezar y HPA puede sustituir en función de las métricas
  autoscaling:
    enabled: true
    minReplicas: 2
    maxReplicas: 10
    metrics:
      # Intentar alcanzar un uso de CPU elevado para un mayor rendimiento
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

Puedes utilizar métricas de recursos (CPU o memoria), métricas personalizadas (pod u objeto Kubernetes) o métricas externas como entradas de escalado automático. Para las métricas de recursos, asegúrate de que el [servidor de métricas Kubernetes][9] se está ejecutando en tu clúster. Para métricas personalizadas o externas, considera configurar el [proveedor de métricas del Datadog Cluster Agent][10].

### Despliegue de una puerta de enlace de varias capas

Para escenarios avanzados, puedes desplegar varias capas de puerta de enlace para crear una cadena de procesamiento.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Despliega cada capa como un recurso `DatadogAgent` independiente, empezando por la última capa y trabajando hacia atrás.

1.  **Despliegue de la capa 1 (capa final):** Esta capa recibe de la capa 2 y exporta a Datadog.

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

2.  **Despliegue de la capa 2 (capa intermedia):** Esta capa recibe del DaemonSet y exporta a la capa 1.

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

3.  **Despliegue del DaemonSet:** Configura el DaemonSet para exportar a la capa 2.

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

Despliega cada capa como una versión separada de Helm, empezando por la última capa y trabajando hacia atrás.

1.  **Despliegue de la capa 1 (capa final):** Esta capa recibe de la capa 2 y exporta a Datadog.

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

2.  **Despliegue de la capa 2 (capa intermedia):** Esta capa recibe del DaemonSet y exporta a la capa 1.

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

3.  **Despliegue del DaemonSet:** Configura el DaemonSet para exportar a la capa 2.

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

## Visualizar pods de puerta de enlace en Fleet Automation

La puerta de enlace del recopilador de DDOT incluye la [extensión Datadog][11] por defecto. Esta extensión exporta información de compilación y configuraciones del recopilador a Datadog, lo que te permite monitorizar tu pipeline de telemetría desde Infrastructure Monitoring y Fleet Automation.

Para visualizar tus pods de puerta de enlace:

1. Ve a **Integrations > Fleet Automation** (Integraciones > Fleet Automation).

  {{< img src="opentelemetry/embedded_collector/fleet_automation2.png" alt="Página de Fleet Automation que muestra pods de puerta de enlace de DDOT" style="width:100%;" >}}

2. Selecciona un pod de puerta de enlace para ver información detallada sobre la compilación y la configuración del recopilador en ejecución.

  {{< img src="opentelemetry/embedded_collector/fleet_automation3.png" alt="Página de Fleet Automation que muestra la configuración del recopilador en un pod de puerta de enlace DDOT" style="width:100%;" >}}

## Limitaciones conocidas

  * **Condición de carrera de inicio**: Al desplegar el DaemonSet y la puerta de enlace en la misma versión, los pods del DaemonSet pueden iniciarse antes de que el servicio de puerta de enlace esté listo, provocando logs de error de conexión inicial. El exportador OTLP sigue reintentando automáticamente, por lo que estos logs pueden ser ignorados. También puedes desplegar primero la puerta de enlace y esperar a que esté lista antes de desplegar el DaemonSet.

## Referencias adicionales

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