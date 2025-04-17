---
further_reading:
- link: /opentelemetry/agent/agent_with_custom_components
  tag: Documentation
  text: Uso de componentes personalizados de OpenTelemetry con el Datadog Agent
private: true
title: Instalar el Datadog Agent con el OpenTelemetry Collector integrado
---

{{< callout url="https://www.datadoghq.com/private-beta/agent-with-embedded-opentelemetry-collector/" btn_hidden="false" header="Join the Preview!">}}
  El Datadog Agent con el OpenTelemetry Collector integrado está en fase previa. Para solicitar acceso, rellena este formulario.
{{< /callout >}}

## Información general

Sigue esta guía para instalar el Datadog Agent con el OpenTelemetry Collector utilizando Helm.

<div class="alert alert-info">Si necesitas componentes de OpenTelemetry más allá de los que se proporcionan en el paquete predeterminado, consulta <a href="/opentelemetry/agent/agent_with_custom_components">Uso de componentes de OpenTelemetry personalizados</a> para traer tus propios componentes de Otel y ampliar las capacidades del Datadog Agent. Para ver la lista de los componentes incluidos por defecto, consulta <a href="#included-components">Componentes incluidos</a>.</div>

## Requisitos

Para completar esta guía, necesitas lo siguiente:

**Cuenta de Datadog**:
1. [Crea una cuenta en Datadog ][1], si no tienes una.
1. Busca o crea tu [clave de API Datadog][2].
1. Busca o crea tu [clave de aplicación Datadog][3].

**Software**:
Instala y configura lo siguiente en tu máquina:

- Un clúster Kubernetes (v1.29 o posterior)
  - **Nota**: Los entornos EKS Fargate no son compatibles
- [Helm (v3 o posterior)][54]
- [Docker][50]
- [kubectl][5]

## Instalar el Datadog Agent con el OpenTelemetry Collector

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

### Configurar la API de Datadog y las claves de aplicación

1. Obtén [claves de API][2] y [claves de aplicación][3] Datadog.
1. Almacena las claves como un secreto en Kubernetes:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY> \
     --from-literal app-key=<DD_APP_KEY>
   ```
   Sustituye `<DD_API_KEY>` y `<DD_APP_KEY>` por tus claves de aplicación y la API de Datadog reales.

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
         appSecret:
           secretName: datadog-secret
           keyName: app-key
{{< /code-block >}}

  - Sustituye `<CLUSTER_NAME>` por un nombre para tu clúster.
  - Sustituye `<DATADOG_SITE>` por tu [sitio Datadog][1]. Tu sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrate de seleccionar el **SITIO DATADOG** correcto a la derecha).

2. Cambia la imagen del Datadog Agent para utilizar compilaciones con el OpenTelemetry Collector integrado:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  ...
  override:
    # Node Agent configuration
    nodeAgent:
      image:
        name: "gcr.io/datadoghq/agent:{{< version key="agent_tag" >}}"
        pullPolicy: Always
{{< /code-block >}}

<div class="alert alert-info">Esta guía utiliza un ejemplo de aplicación Java. El sufijo <code>-jmx</code> en la etiqueta (tag) de la imagen habilita las utilidades JMX. Para aplicaciones que no sean Java, utiliza {{< version key="agent_tag" code="true" >}} en su lugar.<br> Para obtener más información, consulta la <a href="/containers/guide/autodiscovery-with-jmx/?tab=helm">guía de la integración Autodiscovery y JMX</a>.</div>

Por defecto, la imagen del Agent se extrae de Google Artifact Registry (`gcr.io/datadoghq`). Si Artifact Registry no es accesible en la región de tu despliegue, [utiliza otro registro][2].

3. Activa el OpenTelemetry Collector:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  ...
  # Enable Features
  features:
    otelCollector:
      enabled: true
{{< /code-block >}}

El Datadog Operator vincula automáticamente el OpenTelemetry Collector con los puertos `4317` (llamado `otel-grpc`) y `4318` (llamado `otel-http`) por defecto.

Para anular explícitamente los puertos por defecto, utiliza el parámetro `features.otelCollector.ports`:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
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
{{< /code-block >}}

<div class="alert alert-warning">Cuando configures los puertos <code>4317</code> y <code>4318</code>, debes utilizar los nombres por defecto <code>otel-grpc</code> y <code>otel-http</code> respectivamente para evitar conflictos de puertos.</div>

4. (Opcional) Habilita las funciones adicionales de Datadog:

<div class="alert alert-danger">La activación de estas funciones puede conllevar gastos adicionales. Consulta la <a href="https://www.datadoghq.com/pricing/">página de precios</a> y habla con tu CSM antes de continuar.</div>

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

{{% collapse-content title="Completed datadog-agent.yaml file" level="p" %}}
Your `datadog-agent.yaml` file should look something like this:
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
      appSecret:
        secretName: datadog-secret
        keyName: app-key

  override:
    # Node Agent configuration
    nodeAgent:
      image:
        name: "gcr.io/datadoghq/agent:{{< version key="agent_tag" >}}"
        pullPolicy: Always

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
{{< /code-block >}}
{{% /collapse-content %}}

[1]: /es/getting_started/site
[2]: /es/containers/guide/changing_container_registry/
{{% /tab %}}
{{% tab "Helm" %}}
Utiliza un archivo YAML para especificar los parámetros del Helm chart para el [Datadog Agent chart][1].

1. Crea un archivo `datadog-values.yaml` vacío:

```shell
touch datadog-values.yaml
```

<div class="alert alert-info">Los parámetros no especificados utilizan los valores por defecto del <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml">values.yaml</a>.</div>

2. Configura la API de Datadog y los secretos de las claves de aplicación:

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  site: <DATADOG_SITE>
  apiKeyExistingSecret: datadog-secret
  appKeyExistingSecret: datadog-secret
  logLevel: info
{{< /code-block >}}

Configura `<DATADOG_SITE>` como tu [sitio Datadog][2]. De lo contrario, por defecto será `datadoghq.com`, el sitio US1.

<div class="alert alert-warning">El valor del parámetro de nivel de log <code>datadog.logLevel</code> debe configurarse en minúsculas. Los niveles de logs válidos son: <code>rastreo</code>, <code>depuración</code>, <code>información</code>, <code>advertencia</code>, <code>error</code>, <code>crítico</code>, <code>desactivado</code>.</div>

3. Cambia la etiqueta (tag) de la imagen del Datadog Agent para utilizar compilaciones con el OpenTelemetry Collector integrado:

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
agents:
  image:
    repository: gcr.io/datadoghq/agent
    tag: {{< version key="agent_tag" >}}
    doNotCheckTag: true
...
{{< /code-block >}}

<div class="alert alert-info">Esta guía utiliza un ejemplo de aplicación Java. El sufijo <code>-jmx</code> en la etiqueta (tag) de la imagen habilita las utilidades JMX. Para aplicaciones que no sean Java, utiliza {{< version key="agent_tag" code="true" >}} en su lugar.<br> Para obtener más información, consulta la <a href="/containers/guide/autodiscovery-with-jmx/?tab=helm">guía de la integración Autodiscovery y JMX</a>.</div>

Por defecto, la imagen del Agent se extrae de Google Artifact Registry (`gcr.io/datadoghq`). Si Artifact Registry no es accesible en la región de tu despliegue, [utiliza otro registro][4].

4. Habilita el recopilador de OpenTelemetry y configura los puertos esenciales:

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

5. (Opcional) Habilita las funciones adicionales de Datadog:

<div class="alert alert-danger">La activación de estas funciones puede conllevar gastos adicionales. Consulta la <a href="https://www.datadoghq.com/pricing/">página de precios</a> y habla con tu CSM antes de continuar.</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  apm:
    portEnabled: true
    peer_tags_aggregation: true
    compute_stats_by_span_kind: true
    peer_service_aggregation: true
  orchestratorExplorer:
    enabled: true
  processAgent:
    enabled: true
    processCollection: true
{{< /code-block >}}

6. (Opcional) Reúne las etiquetas (labels) de los pods y utilízalas como etiquetas (tags) para fijarlas a métricas, trazas (traces) y logs:

<div class="alert alert-danger">Las métricas personalizadas pueden afectar a la facturación. Consulta la <a href="https://docs.datadoghq.com/account_management/billing/custom_metrics">página de facturación de métricas personalizadas</a> para obtener más información.</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  podLabelsAsTags:
    app: kube_app
    release: helm_release
{{< /code-block >}}

{{% collapse-content title="Completed datadog-values.yaml file" level="p" %}}
Your `datadog-values.yaml` file should look something like this:
{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="false" >}}
agents:
  image:
    repository: gcr.io/datadoghq/agent
    tag: {{< version key="agent_tag" >}}
    doNotCheckTag: true

datadog:
  site: datadoghq.com
  apiKeyExistingSecret: datadog-secret
  appKeyExistingSecret: datadog-secret
  logLevel: info

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
    peer_tags_aggregation: true
    compute_stats_by_span_kind: true
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
- **Configuración basada en ConfigMap**: Almacena tu configuración del Collector en un ConfigMap y haz referencia a ella en el campo `features.otelCollector.conf.configMap`. Este enfoque te permite mantener tu configuración del Collector desacoplada del recurso `DatadogAgent`.

####  Configuración en línea del Collector

En el siguiente fragmento, la configuración del Collector se coloca directamente debajo del parámetro `features.otelCollector.conf.configData`:

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
          processors:
            infraattributes:
              cardinality: 2
            batch:
              timeout: 10s
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
                processors: [infraattributes, batch]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes, batch]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes, batch]
                exporters: [debug, datadog]
{{< /code-block >}}

Al aplicar el archivo `datadog-agent.yaml` que contiene este recurso `DatadogAgent`, el Operator monta automáticamente la configuración del Collector en el DaemonSet del Agent.

{{% collapse-content title="Completed datadog-agent.yaml file" level="p" %}}
Completed `datadog-agent.yaml` with inline Collector configuration should look something like this:
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
      appSecret:
        secretName: datadog-secret
        keyName: app-key

  override:
    # Node Agent configuration
    nodeAgent:
      image:
        name: "gcr.io/datadoghq/agent:{{< version key="agent_tag" >}}"
        pullPolicy: Always

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
          processors:
            infraattributes:
              cardinality: 2
            batch:
              timeout: 10s
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
                processors: [infraattributes, batch]
                exporters: [debug, datadog, datadog/connector]
              metrics:
                receivers: [otlp, datadog/connector, prometheus]
                processors: [infraattributes, batch]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes, batch]
                exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

#### Configuración del Collector basada en ConfigMap

Para configuraciones más complejas o que se actualizan con frecuencia, almacenar la configuración del Collector en un ConfigMap puede simplificar el control de versiones.

1. Crea un ConfigMap que contenga tu configuración del Collector :

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
    processors:
      infraattributes:
        cardinality: 2
      batch:
        timeout: 10s
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
          processors: [infraattributes, batch]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes, batch]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes, batch]
          exporters: [debug, datadog]
{{< /code-block >}}

<div class="alert alert-warning">El campo de configuración del Collector en el ConfigMap debe llamarse <code>otel-config.yaml</code>.</div>

2. Haz referencia al ConfigMap `otel-agent-config-map` en tu recurso `DatadogAgent` utilizando el parámetro `features.otelCollector.conf.configMap`:
{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="false" >}}
  ...
  # Activar funciones
  características:
    otelCollector:
      activado: true
      puertos:
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

El Operator monta automáticamente `otel-config.yaml` desde el ConfigMap en el DaemonSet del OpenTelemetry Collector del Agent.

{{% collapse-content title="Completed datadog-agent.yaml file" level="p" %}}
Completed `datadog-agent.yaml` with Collector configuration defined as ConfigMap should look something like this:
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
      appSecret:
        secretName: datadog-secret
        keyName: app-key

  override:
    # Node Agent configuration
    nodeAgent:
      image:
        name: "gcr.io/datadoghq/agent:{{< version key="agent_tag" >}}"
        pullPolicy: Always

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
    processors:
      infraattributes:
        cardinality: 2
      batch:
        timeout: 10s
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
          processors: [infraattributes, batch]
          exporters: [debug, datadog, datadog/connector]
        metrics:
          receivers: [otlp, datadog/connector, prometheus]
          processors: [infraattributes, batch]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes, batch]
          exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Helm" %}}
El Helm chart de Datadog proporciona un ejemplo de configuración del OpenTelemetry Collector que puedes utilizar como punto de partida. Esta sección te guiará a través de los pipelines predefinidos y los componentes de OpenTelemetry incluidos.

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
processors:
  infraattributes:
    cardinality: 2
  batch:
    timeout: 10s
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
      processors: [infraattributes, batch]
      exporters: [datadog, datadog/connector]
    metrics:
      receivers: [otlp, datadog/connector, prometheus]
      processors: [infraattributes, batch]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes, batch]
      exporters: [datadog]

{{< /code-block >}}

{{% /tab %}}
{{< /tabs >}}

#### Componentes clave

Para enviar datos de telemetría a Datadog, se definen los siguientes componentes en la configuración:

{{< img src="/opentelemetry/embedded_collector/components.png" alt="Diagrama que describe el patrón de despliegue del Agent" style="width:100%;" >}}

##### Conector de Datadog

El [Conector de Datadog][6] calcula métricas de rastreo de Datadog APM.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
{{< /code-block >}}

##### Exportador de Datadog

El [Exportador de Datadog][7] exporta trazas, métricas y logs a Datadog.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
exporters:
  datadog:
    api:
      key: ${env:DD_API_KEY}
      site: ${env:DD_SITE}
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

Esta acción despliega el Datadog Agent como un DaemonSet con el OpenTelemetry Collector integrado. El Collector se ejecuta en el mismo host que tu aplicación, siguiendo el [patrón de despliegue del Agent][1]. El [patrón de despliegue Gateway][2] no es compatible.

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
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

Este Helm chart despliega el Datadog Agent con el OpenTelemetry Collector como un DaemonSet. El Collector se despliega en el mismo host de tu aplicación, siguiendo el [patrón de despliegue del Agent][1]. El [patrón de despliegue Gateway][2] no es compatible.

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Deployment diagram" level="p" %}}
{{< img src="/opentelemetry/embedded_collector/deployment.png" alt="Diagrama que describe el patrón de despliegue del Agent" style="width:100%;" >}}
{{% /collapse-content %}}

## Envío de tu telemetría a Datadog

Para enviar tus datos de telemetría a Datadog:

1. [Instrumenta tu solicitud](#instrument-the-application)
2. [Configura la aplicación](#configure-the-application)
3. [Correlaciona datos de observabilidad](#correlate-observability-data)
4. [Ejecuta tu aplicación](#run-the-application)

### Instrumentar la aplicación

Instrumenta tu aplicación [utilizando la API OpenTelemetry][12].

Como ejemplo, puedes utilizar la [aplicación Calendario de ejemplo][9] que ya está instrumentada para ti.

1. Clona el repositorio `opentelemetry-examples` en tu dispositivo:
   ```shell
   git clone https://github.com/DataDog/opentelemetry-examples.git
   ```
1. Ve al directorio `/calendar`:
   ```shell
   cd opentelemetry-examples/apps/rest-services/java/calendar
   ```
1. El siguiente código instrumenta el método [CalendarService.getDate()][10] utilizando las anotaciones y la API de OpenTelemetry:
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="true" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}

### Configurar la aplicación

Para configurar tu contenedor de aplicación, asegúrate de que se utiliza el nombre de host del endpoint OTLP correcto. El Datadog Agent con el OpenTelemetry Collector se despliega como DaemonSet, por lo que es necesario apuntar al host actual.

El contenedor de la aplicación Calendario ya está configurado con la variable de entorno correcta `OTEL_EXPORTER_OTLP_ENDPOINT` [como se define en el Helm chart][13]:

1. Ve al archivo de manifiesto del despliegue de la aplicación Calendario:
   ```shell
   ./deploys/calendar/templates/deployment.yaml
   ```
1. Las siguientes variables de entorno configuran el endpoint OTLP:
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

El [Etiquetado unificado de servicios][14] une los datos de observabilidad en Datadog para que puedas recorrer métricas, trazas y logs con etiquetas coherentes.

En este ejemplo, la aplicación Calendario ya está configurada con el etiquetado unificado de servicios [como se define en el Helm chart][15]:

1. Ve al archivo de manifiesto del despliegue de la aplicación Calendario:
   ```shell
   ./deploys/calendar/templates/deployment.yaml
   ```
1. Las siguientes variables de entorno configuran el endpoint OTLP:
   {{< code-block lang="yaml" filename="deployment.yaml" disable_copy="true" collapsible="true" >}}
env:
  ...
  - name: OTEL_SERVICE_NAME
    value: {{ include "calendar.fullname" . }}
  - name: OTEL_K8S_NAMESPACE
    valueFrom:
      fieldRef:
        apiVersion: v1
        fieldPath: metadata.namespace
  - name: OTEL_K8S_NODE_NAME
    valueFrom:
      fieldRef:
        apiVersion: v1
        fieldPath: spec.nodeName
  - name: OTEL_K8S_POD_NAME
    valueFrom:
      fieldRef:
        apiVersion: v1
        fieldPath: metadata.name
  - name: OTEL_EXPORTER_OTLP_PROTOCOL
    value: 'grpc'
  - name: OTEL_RESOURCE_ATTRIBUTES
    value: >-
      service.name=$(OTEL_SERVICE_NAME),
      k8s.namespace.name=$(OTEL_K8S_NAMESPACE),
      k8s.node.name=$(OTEL_K8S_NODE_NAME),
      k8s.pod.name=$(OTEL_K8S_POD_NAME),
      k8s.container.name={{ .Chart.Name }},
      host.name=$(OTEL_K8S_NODE_NAME),
      deployment.environment=$(OTEL_K8S_NAMESPACE)
   {{< /code-block >}}

### Ejecutar la aplicación

Para empezar a generar y enviar datos de observabilidad a Datadog, necesitas desplegar la aplicación Calendario con el SDK de OpenTelemetry utilizando Helm.

1. Ejecuta el siguiente comando `helm` desde la carpeta `calendar/`:
```shell
helm upgrade -i <CALENDAR_RELEASE_NAME> ./deploys/calendar/
```
1. Este Helm chart despliega la aplicación Calendario de ejemplo como un ReplicaSet.
1. Para probar que la aplicación Calendario funciona correctamente, ejecuta el siguiente comando desde otra ventana de terminal:
   ```shell
   curl localhost:9090/calendar
   ```
1. Comprueba que recibes una respuesta tal como:
   ```text
   {"date":"2024-12-30"}
   ```
Cada llamada a la aplicación Calendario tiene como resultado el reenvío de métricas, trazas y logs al backend Datadog.

## Explorar datos de observabilidad en Datadog

Utiliza Datadog para explorar los datos de observabilidad de la aplicación Calendario de ejemplo.

### Automatización de flotas

Explora tu configuración del Datadog Agent y del Collector.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Consulta tu configuración del Datadog Agent y del Collector desde la página Automatización de flotas." style="width:100%;" >}}

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

Consulta trazas y tramos para visualizar el estado y el rendimiento de las solicitudes procesadas por tu aplicación, con métricas de infraestructura correlacionadas en la misma traza.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Consulta trazas desde el Explorador de logs." style="width:100%;" >}}

### Métricas de tiempos de ejecución

Monitoriza las métricas de tiempo de ejecución (JVM) de tus aplicaciones.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="Consulta métricas de JVM desde el dashboard de métricas de JVM" style="width:100%;" >}}

### Métricas de estado del Collector

Consulta métricas del Collector incorporado para monitorizar el estado del Collector.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="Consulta métricas de estado del Collector desde el dashboard de OTel." style="width:100%;" >}}

## Componentes incluidos

De forma predeterminada, el Datadog Agent con collector integrado se entrega con los siguientes componentes del collector. También puedes ver la lista en [formato YAML][11].

{{% collapse-content title="Receptores" level="p" %}}

- [filelogreceiver][16]
- [fluentforwardreceiver][17]
- [hostmetricsreceiver][18]
- [jaegerreceiver][19]
- [otlpreceiver][20]
- [prometheusreceiver][21]
- [receivercreator][22]
- [zipkinreceiver][23]
- [nopreceiver][24]

{{% /collapse-content %}}

{{% collapse-content title="Procesadores" level="p" %}}

- [attributesprocessor][25]
- [batchprocessor][26]
- [cumulativetodeltaprocessor][27]
- [filterprocessor][28]
- [groupbyattributeprocessor][29]
- [k8sattributesprocessor][30]
- [memorylimiterprocessor][31]
- [probabilisticsamplerprocessor][32]
- [resourcedetectionprocessor][33]
- [resourceprocessor][34]
- [routingprocessor][35]
- [tailsamplingprocessor][36]
- [transformprocessor][37]

{{% /collapse-content %}}

{{% collapse-content title="Exportadores" level="p" %}}

- [datadogexporter][38]
- [debugexporter][39]
- [otlpexporter][40]
- [otlphttpexporter][41]
- [sapmexporter][42]
- [nopexporter][43]

{{% /collapse-content %}}

{{% collapse-content title="Conectores" level="p" %}}

- [datadogconnector][44]
- [spanmetricsconnector][45]

{{% /collapse-content %}}

{{% collapse-content title="Extensiones" level="p" %}}

- [healthcheckextension][46]
- [observer][47]
- [pprofextension][48]
- [zpagesextension][49]

{{% /collapse-content %}}

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
[35]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/routingprocessor
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
