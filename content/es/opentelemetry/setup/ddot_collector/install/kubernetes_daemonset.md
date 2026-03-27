---
aliases:
- /es/opentelemetry/agent/install_agent_with_collector
- /es/opentelemetry/setup/ddot_collector/install/kubernetes
code_lang: kubernetes_daemonset
code_lang_weight: 1
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentación
  text: Uso de componentes personalizados de OpenTelemetry con el Datadog Agent
title: Instalar el DDOT Collector como DaemonSet de Kubernetes
type: multi-code-lang
---

## Información general

Sigue esta guía para desplegar el Distribution of OpenTelemetry (DDOT) Collector como un DaemonSet de Kubernetes utilizando Helm o el Datadog Operator.

<div class="alert alert-info">
  <strong>¿Necesitas componentes adicionales de OpenTelemetry?</strong> Si necesitas otros componentes adicionales que no están incluidos en el paquete por defecto, consulta la sección <a href="/opentelemetry/setup/ddot_collector/custom_components">Uso de componentes personalizados de OpenTelemetry</a> para ampliar las funciones del Datadog Agent. Para obtener una lista de los componentes incluidos por defecto, consulta <a href="/opentelemetry/agent/#opentelemetry-collector-components">Componentes del OpenTelemetry Collector</a>.
</div>

## Requisitos

Para completar esta guía, necesitas lo siguiente:

**Cuenta de Datadog**:
1. [Crea una cuenta en Datadog ][1], si no tienes una.
1. Busca o crea tu [clave de API Datadog][2].

**Software**:
Instala y configura lo siguiente en tu máquina:

- Un clúster Kubernetes (v1.29 o posterior)
  - **Nota**: Los entornos EKS Fargate y GKE Autopilot no son compatibles.
- [Helm (v3 o posterior)][54]
- [kubectl][5]

**Red**: {{% otel-network-requirements %}}

## Instalar el Datadog Agent con el OpenTelemetry Collector

<div class="alert alert-info">Esta instalación es necesaria para las siguientes configuraciones de Datadog: SDK + DDOT y SDK OpenTelemetry + DDOT. Aunque el SDK Datadog implementa la API OpenTelemetry, sigue necesitando que el DDOT Collector procese y reenvíe métricas y logs de OTLP.</div>

### Seleccionar el método de instalación

Elige uno de los siguientes métodos de instalación:

- [Datadog Operator][55]: Un enfoque [nativo en Kubernetes][56] que automáticamente reconcilia y mantiene tu configuración de Datadog. Informa el estado del despliegue, el estado y los errores en su estado de recurso personalizado, y limita el riesgo de configuración errónea gracias a las opciones de configuración de nivel superior.
- [Helm chart][4]: Una forma sencilla de desplegar el Datadog Agent. Proporciona capacidades de versionado, reversión y plantillas, haciendo que los despliegues sean consistentes y más fáciles de replicar.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
### Instalar el Datadog Operator

Puedes instalar el Datadog Operator en tu clúster utilizando el [Helm chart del Datadog Operator][1]:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md
{{% /tab %}}
{{% tab "Helm" %}}
### Añadir el repositorio de Datadog Helm

Para añadir el repositorio de Datadog a tus repositorios de Helm:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Configurar la clave de API Datadog 

1. Obtener la [clave de API][2] Datadog.
1. Guarda la clave de API como secreto de Kubernetes:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```
   Sustituye `<DD_API_KEY>` por tu clave de API real de Datadog.

### Configurar el Datadog Agent

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Después de desplegar el Datadog Operator, crea el recurso `DatadogAgent` que activa el despliegue del Datadog Agent, el Cluster Agent y los ejecutores de checks de clústeres (si se utilizan) en tu clúster Kubernetes. El Datadog Agent se despliega como un DaemonSet, ejecutando un pod en cada nodo de tu clúster.

1. Utiliza el archivo `datadog-agent.yaml` para especificar la configuración de tu despliegue de `DatadogAgent`.

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

  - Sustituye `<CLUSTER_NAME>` por un nombre para tu clúster.
  - Sustituye `<DATADOG_SITE>` por tu [sitio Datadog][1]. Tu sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrate de seleccionar el **SITIO DATADOG** correcto a la derecha).

2. Activa el OpenTelemetry Collector:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  # Activar funciones
  features:
    otelCollector:
      enabled: true
{{< /code-block >}}

El Datadog Operator vincula automáticamente el OpenTelemetry Collector con los puertos `4317` (llamado `otel-grpc`) y `4318` (llamado `otel-http`) por defecto.

3. (Opcional) Habilita las funciones adicionales de Datadog:

<div class="alert alert-warning">La activación de estas funciones puede conllevar cargos adicionales. Consulta la <a href="https://www.datadoghq.com/pricing/">página de precios</a> y habla con tu asesor de clientes antes de continuar.</div>

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  # Activar funciones
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

Cuando actives funciones adicionales de Datadog, utiliza siempre los archivos de configuración de Datadog o del OpenTelemetry Collector en lugar de depender de las variables de entorno de Datadog.

**Nota**: A partir del Operator `v1.22.0`, el contenedor de DDOT utiliza la imagen `ddot-collector` en lugar de la imagen `-full` del Agent.
- Cuando sustituyas la etiqueta (tag) de imagen del Agent de nodo, utiliza una etiqueta (tag) >= `7.67.0` para que se programe el contenedor de OTel (la imagen `ddot-collector` solo se admite en >= `7.67.0`).
- La imagen `ddot-collector` no tiene la variante `-full`. Si necesitas una imagen `-full`, configura `spec.override.nodeAgent.image.name` como imagen del Agent completa (por ejemplo, `gcr.io/datadoghq/agent:7.72.1-full`).

[1]: /es/getting_started/site
[2]: /es/containers/guide/changing_container_registry/
{{% /tab %}}
{{% tab "Helm" %}}
Utiliza un archivo YAML para especificar los parámetros del gráfico de Helm para el [gráfico del Datadog Agent][1].

1. Crea un archivo `datadog-values.yaml` vacío:

```shell
touch datadog-values.yaml
```

<div class="alert alert-info">Los parámetros no especificados utilizan los valores predeterminados de <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml">values.yaml</a>.</div>

2. Configura el secreto de la clave de API Datadog:

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  site: <DATADOG_SITE>
  apiKeyExistingSecret: datadog-secret
{{< /code-block >}}

Configura `<DATADOG_SITE>` como tu [sitio Datadog][2]. De lo contrario, en forma predeterminada será `datadoghq.com`, el sitio US1.

3. Activa el OpenTelemetry Collector y configura los puertos esenciales:

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  otelCollector:
    enabled: true
    ports:
      - containerPort: "4317" # puerto por defecto para el receptor gRPC de OpenTelemetry.
        hostPort: "4317"
        name: otel-grpc
      - containerPort: "4318" # puerto por defecto para el receptor HTTP de OpenTelemetry
        hostPort: "4318"
        name: otel-http
{{< /code-block >}}

Configura el `hostPort` para exponer el puerto del contenedor a la red externa. Esto permite configurar el exportador OTLP para que apunte a la dirección IP del nodo donde está asignado el Datadog Agent.

Si no deseas exponer el puerto, puedes utilizar en su lugar el servicio del Agent:
   - Elimina las entradas <code>hostPort</code> de tu archivo <code>datadog-values.yaml</code>.
   - En el archivo de despliegue de tu aplicación (`deployment.yaml`), configura el exportador OTLP para utilizar el servicio del Agent:
      ```yaml
      env:
        - name: OTEL_EXPORTER_OTLP_ENDPOINT
          value: 'http://<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local'
        - name: OTEL_EXPORTER_OTLP_PROTOCOL
          value: 'grpc'
      ```

4. (Opcional) Habilita las funciones adicionales de Datadog:

<div class="alert alert-warning">La activación de estas funciones puede conllevar cargos adicionales. Consulta la <a href="https://www.datadoghq.com/pricing/">página de precios</a> y habla con tu asesor de clientes antes de continuar.</div>

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

Cuando actives funciones adicionales de Datadog, utiliza siempre los archivos de configuración de Datadog o del OpenTelemetry Collector en lugar de depender de las variables de entorno de Datadog.

5. (Opcional) Recopila etiquetas (labels) de pods y utilízalas como etiquetas (tags) para adjuntarlas a métricas, trazas (traces) y logs:

<div class="alert alert-warning">Las métricas personalizadas pueden afectar a la facturación. Consulta la <a href="https://docs.datadoghq.com/account_management/billing/custom_metrics">página de facturación de métricas personalizadas</a> para obtener más información.</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  podLabelsAsTags:
    app: kube_app
    release: helm_release
{{< /code-block >}}

{{% collapse-content title="Archivo datadog-values.yaml completo" level="p" %}}
Tu archivo `datadog-values.yaml` debería tener el siguiente aspecto:
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
[2]: /es/getting_started/site/
[3]: /es/containers/guide/changing_container_registry/
{{% /tab %}}
{{< /tabs >}}

### Configurar el OpenTelemetry Collector

{{< tabs >}}
{{% tab "Datadog Operator" %}}
El Datadog Operator proporciona un ejemplo de configuración del OpenTelemetry Collector que puedes utilizar como punto de partida. Si necesitas modificar esta configuración, el Datadog Operator tiene dos formas de proporcionar una configuración personalizada del Collector:

- **Configuración en línea**: Añade tu configuración personalizada del Collector directamente en el campo `features.otelCollector.conf.configData`.
- **Configuración basada en ConfigMap**: Almacena tu configuración del Collector en un ConfigMap y haz referencia a ella en el campo `features.otelCollector.conf.configMap`. Esta estrategia te permite mantener tu configuración del Collector desacoplada del recurso `DatadogAgent`.

####  Configuración en línea del Collector

En el siguiente fragmento, la configuración del Collector se coloca directamente debajo del parámetro `features.otelCollector.conf.configData`:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
  ...
  # Activar funciones
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

Al aplicar el archivo `datadog-agent.yaml` que contiene este recurso `DatadogAgent`, el Operator monta automáticamente la configuración del Collector en el DaemonSet del Agent.

{{% collapse-content title="Archivo datadog-agent.yaml completo con configuración del Collector en línea" level="p" %}}
El archivo `datadog-agent.yaml` completo con configuración del Collector en línea debería tener el siguiente aspecto:
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

  # Activar funciones
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

#### Configuración del Collector basada en ConfigMap

Para configuraciones más complejas o que se actualizan con frecuencia, almacenar la configuración del Collector en un ConfigMap puede simplificar el control de versiones.

1. Crea un ConfigMap que contenga tu configuración del Collector:

{{< code-block lang="yaml" filename="configmap.yaml" collapsible="false" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-config-map
  namespace: system
data:
  # debe llamarse otel-config.yaml
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

<div class="alert alert-danger">El campo de configuración del Collector en el ConfigMap debe llamarse <code>otel-config.yam</code>.</div>

2. Haz referencia al ConfigMap `otel-agent-config-map` en tu recurso `DatadogAgent` utilizando el parámetro `features.otelCollector.conf.configMap`:
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
  ...
  # Activar funciones
  funciones:
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

El Operator se monta automáticamente `otel-config.yaml` desde el ConfigMap en el DaemonSet del OpenTelemetry Collector del Agent.

{{% collapse-content title="Archivo datadog-agent.yaml completo con configuración del Collector en el ConfigMap" level="p" %}}
El archivo `datadog-agent.yaml` con configuración del Collector definido como ConfigMap debería tener el siguiente aspecto:
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

  # Activar funciones
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
  # debe llamarse otel-config.yaml
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
El gráfico de Helm de Datadog proporciona un ejemplo de configuración del OpenTelemetry Collector que puedes utilizar como punto de partida. Esta sección te guiará a través de los pipelines predefinidos y los componentes de OpenTelemetry incluidos.

Esta es la configuración completa del OpenTelemetry Collector en `otel-config.yaml`:

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

#### Componentes clave

Para enviar datos de telemetría a Datadog, se definen los siguientes componentes en la configuración:

{{< img src="/opentelemetry/embedded_collector/components-3.jpg" alt="Diagrama que describe el patrón de despliegue del Agent" style="width:100%;" >}}

##### Conector de Datadog

El [Conector de Datadog][6] calcula métricas de rastreo de Datadog APM.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
{{< /code-block >}}

##### Exportador de Datadog

El [Exportador de Datadog][7] exporta trazas, métricas y logs a Datadog.

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

**Nota**: Si no se especifica `key` o se define para un secreto, o si no se especifica `site`, el sistema utiliza los valores de la configuración del Agent principal. Por defecto, el Agent principal establece su sitio en `datadoghq.com` (US1).

##### Receptor Prometheus

El [Receptor Prometheus][8] recopila métricas del estado del OpenTelemetry Collector para el pipeline de métricas.

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

Para obtener más información, consulta la documentación de las [métricas de estado del Collector][8].

### Despliegue del Agent con el OpenTelemetry Collector

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Despliega el Datadog Agent con el archivo de configuración:

```shell
kubectl apply -f datadog-agent.yaml
```

Esto despliega el Datadog Agent como un DaemonSet con el DDOT OpenTelemetry Collector. El Collector se ejecuta en el mismo host que tu aplicación, siguiendo el [patrón de despliegue del Agent][1]. El [patrón de despliegue de la puerta de enlace][2] está en vista previa. Para consultar las instrucciones de instalación, consulta la [guía de instalación de la puerta de enlace DDOT Kubernetes][3].

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /es/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{% tab "Helm" %}}
Para instalar o actualizar el Datadog Agent con el OpenTelemetry Collector en tu entorno Kubernetes, utiliza uno de los siguientes comandos Helm:

- Para una configuración por defecto del OpenTelemetry Collector:
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog -f datadog-values.yaml
   ```

- Para una configuración personalizada del OpenTelemetry Collector:
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog \
     -f datadog-values.yaml \
     --set-file datadog.otelCollector.config=otel-config.yaml
   ```
   Este comando te permite especificar tu propio archivo `otel-config.yaml`.

Sustituye `<RELEASE_NAME>` por el nombre de la versión de Helm que estés utilizando.

<div class="alert alert-info">Es posible que aparezcan advertencias durante el proceso de despliegue. Estas advertencias pueden ignorarse.</div>

Este Helm chart despliega el Datadog Agent con el OpenTelemetry Collector como un DaemonSet. El Collector se despliega en el mismo host que tu aplicación, siguiendo el [patrón de despliegue del Agent][1]. El [patrón de despliegue de la puerta de enlace][2] está en vista Previa. Para consultar las instrucciones de instalación, consulta la [guía de instalación de la puerta de enlace DDOT Kubernetes][3].

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /es/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Diagrama de despliegue" level="p" %}}
{{< img src="/opentelemetry/embedded_collector/deployment-2.png" alt="Diagrama que representa el modelo de despliegue del Agent" style="width:100%;" >}}
{{% /collapse-content %}}

## Envía tu telemetría a Datadog

Para enviar tus datos de telemetría a Datadog:

1. [Instrumenta tu solicitud](#instrument-the-application)
2. [Configurar la aplicación](#configure-the-application)
3. [Correlacionar datos de observabilidad](#correlate-observability-data)
4. [Ejecutar tu aplicación](#run-the-application)

### Instrumentar la aplicación

Instrumenta tu aplicación [utilizando la API OpenTelemetry][12].

{{% collapse-content title="Ejemplo de aplicación instrumentada con la API OpenTelemetry" level="p" %}}
Como ejemplo, puedes utilizar la [aplicación de ejemplo de calendario][9] que ya está instrumentada. El siguiente código instrumenta el método [CalendarService.getDate()][10] utilizando anotaciones y API de OpenTelemetry:
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="false" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}
{{% /collapse-content %}}

### Configurar la aplicación

Tu contenedor de aplicaciones debe enviar datos al DDOT Collector en el mismo host. Dado que el Collector se ejecuta como DaemonSet, debes especificar el host local como endpoint de OTLP.

Si aún no se ha definido la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT`, añádela al archivo de manifiesto de despliegue de tu aplicación:
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

### Correlacionar los datos de observabilidad

El [etiquetado unificado de servicios][14] une los datos de observabilidad en Datadog para que puedas recorrer métricas, trazas y logs con etiquetas (tags) coherentes.

En entornos en contenedores, configura `env`, `service` y `version` utilizando las variables de entorno de atributos de recursos de OpenTelemetry. El DDOT Collector detecta esta configuración de etiquetado y la aplica a los datos que recopila de los contenedores.

Añade las siguientes variables de entorno al manifiesto de despliegue de tu aplicación:

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

<div class="alert alert-info">También puedes utilizar <a href="/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration">etiquetas (labels) de Kubernetes específicas de Datadog</a> para configurar el etiquetado unificado de servicios. No utilices ambas estrategias, ya que esto crea etiquetas (tags) duplicadas.</div>

### Ejecutar la aplicación

Vuelve a desplegar tu aplicación para aplicar los cambios realizados en el manifiesto de despliegue. Una vez que la configuración actualizada esté activa, el etiquetado unificado de servicios estará totalmente activado para tus métricas, trazas y logs.

## Explorar datos de observabilidad en Datadog

Utiliza Datadog para explorar los datos de observabilidad de tu aplicación.

### Automatización de flotas

Explora tu configuración del Datadog Agent y del Collector.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Consulta tu configuración del Datadog Agent y del Collector desde la página de Fleet Automation." style="width:100%;" >}}

### Monitorización de contenedores en directo

Monitoriza el estado de tu contenedor utilizando las funciones de monitorización de contenedores en directo.

{{< img src="/opentelemetry/embedded_collector/containers.png" alt="Monitoriza el estado de tu contenedor desde la página Contenedores." style="width:100%;" >}}

### Estado del nodo de la infraestructura

Consulta métricas de tiempo de ejecución y de infraestructura para visualizar, monitorizar y medir el rendimiento de tus nodos.

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="Consulta métricas de tiempo ejecución y de infraestructura desde la lista de hosts." style="width:100%;" >}}

### Logs

Consulta los logs para monitorizar y solucionar problemas de funcionamiento de la aplicación y el sistema.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Consulta logs desde el Explorador de logs." style="width:100%;" >}}

### Trazas

Consulta trazas (traces) y tramos (spans) para visualizar el estado y el rendimiento de las solicitudes procesadas por tu aplicación, con métricas de infraestructura correlacionadas en la misma traza.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Consulta trazas (traces) desde el Trace Explorer." style="width:100%;" >}}

### Métricas de tiempos de ejecución

Monitoriza las métricas de tiempo de ejecución (JVM) de tus aplicaciones.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="Consulta métricas de JVM desde el dashboard de métricas de JVM" style="width:100%;" >}}

### Métricas de estado del Collector

Visualiza las métricas del DDOT Collector para monitorizar el estado del Collector.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="Consulta métricas de estado del Collector desde el dashboard de OTel." style="width:100%;" >}}

## Referencias adicionales

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
[12]: /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[13]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/deploys/calendar/templates/deployment.yaml#L71-L72
[14]: /es/getting_started/tagging/unified_service_tagging
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
[52]: /es/getting_started/site/
[53]: /es/containers/guide/changing_container_registry/
[54]: https://helm.sh
[55]: /es/containers/datadog_operator
[56]: https://kubernetes.io/docs/concepts/extend-kubernetes/operator/
[57]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md