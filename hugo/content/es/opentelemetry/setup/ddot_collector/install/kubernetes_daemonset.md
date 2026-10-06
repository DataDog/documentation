---
aliases:
- /es/opentelemetry/agent/install_agent_with_collector
- /es/opentelemetry/setup/ddot_collector/install/kubernetes
code_lang: kubernetes_daemonset
code_lang_weight: 1
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentación
  text: Utilice componentes personalizados de OpenTelemetry con el Datadog Agent
title: Instale el DDOT Collector como un DaemonSet de Kubernetes
type: multi-code-lang
---
## Descripción general {#overview}

Siga esta guía para implementar el Datadog Distribution of OpenTelemetry (DDOT) Collector como un DaemonSet de Kubernetes utilizando Helm o el Datadog Operator.

<div class="alert alert-info">
  <strong>¿Necesita componentes adicionales de OpenTelemetry?</strong> Si necesita componentes más allá de los incluidos en el paquete predeterminado, siga <a href="/opentelemetry/setup/ddot_collector/custom_components">Use Custom OpenTelemetry Components</a> para extender las capacidades del Datadog Agent. Para obtener una lista de los componentes incluidos de forma predeterminada, consulte <a href="/opentelemetry/agent/#opentelemetry-collector-components">Componentes del Collector de OpenTelemetry</a>.
</div>

## Requisitos {#requirements}

Para completar esta guía, necesita lo siguiente:

**Una cuenta de Datadog**:
1. [Cree una cuenta de Datadog][1] si no tiene una.
1. Busque o cree su [clave de Datadog API][2].

**Software**:
Instale y configure lo siguiente en su máquina:

- Un clúster de Kubernetes (v1.29+)
- [Helm (v3+)][54]
- [kubectl][5]

**Red**: {{% otel-network-requirements %}}

## Instale el Datadog Agent con el OpenTelemetry Collector {#install-the-datadog-agent-with-opentelemetry-collector}

<div class="alert alert-info">Esta instalación es necesaria tanto para las configuraciones de Datadog SDK + DDOT como de OpenTelemetry SDK + DDOT. Aunque el Datadog SDK implementa la API de OpenTelemetry, todavía requiere el DDOT Collector para procesar y reenviar métricas y registros de OTLP.</div>

### Seleccione el método de instalación {#select-installation-method}

Elija uno de los siguientes métodos de instalación:

- [Datadog Operator][55]: un enfoque [nativo de Kubernetes][56] que reconcilia y mantiene automáticamente su configuración de Datadog. Informa sobre el estado de la implementación, el estado de salud y los errores en el estado de "Custom Resource", y limita el riesgo de una configuración incorrecta gracias a opciones de configuración de nivel superior.
- [Helm chart][4]: una forma sencilla de implementar el Datadog Agent. Proporciona capacidades de control de versiones, reversión y creación de plantillas, lo que hace que las implementaciones sean consistentes y más fáciles de replicar.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
### Instale el Datadog Operator {#install-the-datadog-operator}

Puede instalar el Datadog Operator en su clúster utilizando el [Helm chart del Datadog Operator][1]:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md
{{% /tab %}}
{{% tab "Helm" %}}
### Agregue el repositorio de Helm de Datadog {#add-the-datadog-helm-repository}

Para agregar el repositorio de Datadog a sus repositorios de Helm:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Configure la clave de Datadog API {#set-up-datadog-api-key}

1. Obtenga la [clave de API][2] de Datadog.
1. Almacene la clave de API como un secreto de Kubernetes:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```
   Reemplace `<DD_API_KEY>` con su clave de Datadog API real.

### Configure el Datadog Agent {#configure-the-datadog-agent}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Después de implementar el Datadog Operator, cree el recurso `DatadogAgent` que activa la implementación del Datadog Agent, el Cluster Agent y los Cluster Checks Runners (si se utilizan) en su clúster de Kubernetes. El Datadog Agent se implementa como un DaemonSet, ejecutando un pod en cada nodo de su clúster.

1. Utilice el archivo `datadog-agent.yaml` para especificar su configuración de implementación `DatadogAgent`.

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

  - Reemplace `<CLUSTER_NAME>` con un nombre para su clúster.
  - Reemplace `<DATADOG_SITE>` con su [sitio de Datadog][1]. Su sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrese de que el {{< ui >}}DATADOG SITE{{< /ui >}} correcto esté seleccionado a la derecha.)

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">Para FED, también establezca <code>useFIPSAgent: true</code> en <code>spec.global</code> para usar la imagen del Agent compatible con FIPS. Consulte <a href="/agent/configuration/fips-compliance/">cumplimiento de FIPS</a>.</div>
{{% /site-region %}}

2. Habilite el OpenTelemetry Collector:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  # Enable Features
  features:
    otelCollector:
      enabled: true
{{< /code-block >}}

El Datadog Operator vincula automáticamente el OpenTelemetry Collector a los puertos `4317` (llamado `otel-grpc`) y `4318` (llamado `otel-http`) de forma predeterminada.

3. (Opcional) Habilite funciones adicionales de Datadog:

<div class="alert alert-warning">Habilitar estas funciones puede generar cargos adicionales. Revise la <a href="https://www.datadoghq.com/pricing/">página de precios</a> y hable con su Customer Success Manager antes de continuar.</div>

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

Al habilitar funciones adicionales de Datadog, utilice siempre los archivos de configuración del Agente de Datadog o del OpenTelemetry Collector en lugar de depender de las variables de entorno de Datadog.

**Nota**: A partir del operador `v1.22.0`, el contenedor DDOT usa la imagen `ddot-collector` en lugar de la imagen de Agent `-full`.
- Al anular la etiqueta de la imagen de Agent de nodo, use una etiqueta >= `7.67.0` para que el contenedor OTel esté programado (la imagen `ddot-collector` solo es compatible en >= `7.67.0`).
- La imagen `ddot-collector` no tiene una variante `-full`. Si necesita una imagen `-full`, establezca `spec.override.nodeAgent.image.name` en una imagen de Agent completa (por ejemplo, `registry.datadoghq.com/agent:7.72.1-full`).

[1]: /es/getting_started/site
[2]: /es/containers/guide/changing_container_registry/
{{% /tab %}}
{{% tab "Helm" %}}
Use un archivo YAML para especificar los parámetros del Helm chart para el [Datadog Agent chart][1].

1. Cree un archivo `datadog-values.yaml` vacío:

```shell
touch datadog-values.yaml
```

<div class="alert alert-info">Los parámetros no especificados usan los valores predeterminados de <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml">values.yaml</a>.</div>

2. Configure el secreto de la clave de Datadog API:

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  site: <DATADOG_SITE>
  apiKeyExistingSecret: datadog-secret
{{< /code-block >}}

Establezca `<DATADOG_SITE>` en su [sitio de Datadog][2]. De lo contrario, el valor predeterminado es `datadoghq.com`, el sitio US1.

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">Para FED, también establezca <code>useFIPSAgent: true</code> en la raíz de su <code>datadog-values.yaml</code> para usar la imagen del Agent compatible con FIPS. Consulte <a href="/agent/configuration/fips-compliance/">cumplimiento de FIPS</a>.</div>
{{% /site-region %}}

3. Habilite el OpenTelemetry Collector y configure los puertos esenciales:

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

Establezca el `hostPort` para exponer el puerto del contenedor a la red externa. Esto permite configurar el exportador OTLP para que apunte a la dirección IP del nodo donde está asignado el Datadog Agent.

Si no desea exponer el puerto, puede utilizar el servicio del Agent en su lugar:
   - Elimine las <code>hostPort</code> entradas de su <code>datadog-values.yaml</code> archivo.
   - En el archivo de despliegue de su aplicación (`deployment.yaml`), configure el exportador OTLP para utilizar el servicio del Agent:
      ```yaml
      env:
        - name: OTEL_EXPORTER_OTLP_ENDPOINT
          value: 'http://<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local'
        - name: OTEL_EXPORTER_OTLP_PROTOCOL
          value: 'grpc'
      ```

4. (Opcional) Habilite funciones adicionales de Datadog:

<div class="alert alert-warning">Habilitar estas funciones puede generar cargos adicionales. Revise la <a href="https://www.datadoghq.com/pricing/">página de precios</a> y hable con su Customer Success Manager antes de continuar.</div>

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

Al habilitar funciones adicionales de Datadog, utilice siempre los archivos de configuración del Agente de Datadog o del OpenTelemetry Collector en lugar de depender de las variables de entorno de Datadog.

5. (Opcional) Recopile etiquetas de pod y utilícelas como etiquetas para adjuntarlas a métricas, trazas y registros:

<div class="alert alert-warning">Las métricas personalizadas pueden afectar la facturación. Consulte la <a href="https://docs.datadoghq.com/account_management/billing/custom_metrics">página de facturación de métricas personalizadas</a> para obtener más información.</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  podLabelsAsTags:
    app: kube_app
    release: helm_release
{{< /code-block >}}

{{% collapse-content title="Archivo datadog-values.yaml completado" level="p" %}}
Su archivo `datadog-values.yaml` debería verse más o menos así:
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

### Configure el OpenTelemetry Collector {#configure-the-opentelemetry-collector}

Debido a que el DDOT Collector se ejecuta dentro del Datadog Agent, los atributos del nombre de host en la telemetría entrante pueden resolverse con un nombre diferente al del Agent. El procesador `infraattributes` puede aplicar el nombre de host del Agent en su lugar. Consulte [Hostname and Tagging][58] para obtener la configuración recomendada.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
El Datadog Operator proporciona una configuración de ejemplo del OpenTelemetry Collector que puede utilizar como punto de partida. Si necesita modificar esta configuración, el Datadog Operator admite dos formas de proporcionar una configuración personalizada del Collector:

- **Configuración en línea**: agregue su configuración personalizada del Collector directamente en el campo `features.otelCollector.conf.configData`.
- **Configuración basada en ConfigMap**: almacene la configuración de su Collector en un ConfigMap y haga referencia a ella en el campo `features.otelCollector.conf.configMap`. Este enfoque le permite mantener la configuración del Collector desacoplada del recurso `DatadogAgent`.

####  Configuración del Collector en línea {#inline-collector-configuration}

En el fragmento a continuación, la configuración del Collector se coloca directamente bajo el parámetro `features.otelCollector.conf.configData`:

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
            cumulativetodelta:
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
                processors: [infraattributes, cumulativetodelta]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
{{< /code-block >}}

{{% otel-infraattributes-prereq %}}

Cuando aplica el archivo `datadog-agent.yaml` que contiene este recurso `DatadogAgent`, el Operator monta automáticamente la configuración del Collector en el DaemonSet del Agent.

{{% collapse-content title="Archivo datadog-agent.yaml completado con la configuración del Collector en línea" level="p" %}}
El `datadog-agent.yaml` completado con la configuración del Collector en línea debería verse más o menos así:
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
            cumulativetodelta:
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
                processors: [infraattributes, cumulativetodelta]
                exporters: [debug, datadog]
              logs:
                receivers: [otlp]
                processors: [infraattributes]
                exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

#### Configuración del Collector basada en ConfigMap {#configmap-based-collector-configuration}

Para configuraciones más complejas o que se actualizan con frecuencia, almacenar la configuración del Collector en un ConfigMap puede simplificar el control de versiones.

1. Cree un ConfigMap que contenga la configuración de su Collector:

{{< code-block lang="yaml" filename="configmap.yaml" collapsible="false" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: otel-agent-config-map
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
      cumulativetodelta:
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
          processors: [infraattributes, cumulativetodelta]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
{{< /code-block >}}

<div class="alert alert-danger">El campo para la configuración del Collector en el ConfigMap debe llamarse <code>otel-config.yaml</code>.</div>

2. Haga referencia al ConfigMap `otel-agent-config-map` en su recurso `DatadogAgent` utilizando el parámetro `features.otelCollector.conf.configMap`:
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

El Operator monta automáticamente `otel-config.yaml` desde el ConfigMap en el DaemonSet del OpenTelemetry Collector del Agent.

{{% collapse-content title="Archivo datadog-agent.yaml completado con la configuración del Collector en el ConfigMap" level="p" %}}
El `datadog-agent.yaml` completado con la configuración del Collector definida como ConfigMap debería verse más o menos así:
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
      cumulativetodelta:
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
          processors: [infraattributes, cumulativetodelta]
          exporters: [debug, datadog]
        logs:
          receivers: [otlp]
          processors: [infraattributes]
          exporters: [debug, datadog]
{{< /code-block >}}
{{% /collapse-content %}}

{{% /tab %}}
{{% tab "Helm" %}}
El chart de Helm de Datadog proporciona una configuración de ejemplo del OpenTelemetry Collector que puede utilizar como punto de partida. Esta sección lo guía a través de las canalizaciones predefinidas y los componentes de OpenTelemetry incluidos.

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
  cumulativetodelta:
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
      processors: [infraattributes, cumulativetodelta]
      exporters: [datadog]
    logs:
      receivers: [otlp]
      processors: [infraattributes]
      exporters: [datadog]

{{< /code-block >}}

{{% otel-infraattributes-prereq %}}

{{% /tab %}}
{{< /tabs >}}

#### Componentes clave {#key-components}

Para enviar datos de telemetría a Datadog, los siguientes componentes se definen en la configuración:

{{< img src="/opentelemetry/embedded_collector/components-3.jpg" alt="Diagrama que representa el patrón de implementación del Agent" style="width:100%;" >}}

##### Conector de Datadog {#datadog-connector}

El [conector de Datadog][6] calcula las métricas de traza de Datadog APM.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
{{< /code-block >}}

##### Datadog Exporter {#datadog-exporter}

El [Datadog exporter][7] exporta trazas, métricas y registros a Datadog.

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

**Nota**: Si `key` no se especifica o se establece como un secreto, o si `site` no se especifica, el sistema utiliza los valores de la configuración principal del Agent. De forma predeterminada, el Agent principal establece el sitio en `datadoghq.com` (US1).

##### Receptor de Prometheus {#prometheus-receiver}

El [receptor de Prometheus][8] recopila métricas de estado del OpenTelemetry Collector para la canalización de métricas.

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

Para obtener más información, consulte la documentación de [Métricas de estado del OpenTelemetry Collector][8].

### Implemente Agent con OpenTelemetry Collector {#deploy-the-agent-with-the-opentelemetry-collector}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Implemente el Datadog Agent con el archivo de configuración:

```shell
kubectl apply -f datadog-agent.yaml
```

Esto implementa el Datadog Agent como un DaemonSet con el OpenTelemetry Collector de DDOT. El Collector se ejecuta en el mismo servidor que su aplicación, siguiendo el [patrón de implementación del Agent][1]. Para el [patrón de implementación de Gateway][2], siga la [guía de instalación de DDOT Kubernetes Gateway][3].

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /es/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{% tab "Helm" %}}
Para instalar o actualizar el Datadog Agent con OpenTelemetry Collector en su entorno de Kubernetes, utilice uno de los siguientes comandos de Helm:

- Para la configuración predeterminada de OpenTelemetry Collector:
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog -f datadog-values.yaml
   ```

- Para la configuración personalizada de OpenTelemetry Collector:
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog \
     -f datadog-values.yaml \
     --set-file datadog.otelCollector.config=otel-config.yaml
   ```
   Este comando le permite especificar su propio archivo `otel-config.yaml`.

Reemplace `<RELEASE_NAME>` con el nombre de la versión de Helm que esté utilizando.

<div class="alert alert-info">Es posible que vea advertencias durante el proceso de implementación. Estas advertencias pueden ignorarse.</div>

Este Helm chart implementa el Datadog Agent con OpenTelemetry Collector como un DaemonSet. El Collector se implementa en el mismo servidor que su aplicación, siguiendo el [patrón de implementación del Agent][1]. Para el [patrón de implementación de Gateway][2], siga la [guía de instalación de DDOT Kubernetes Gateway][3].

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /es/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Diagrama de implementación" level="p" %}}
{{< img src="/opentelemetry/embedded_collector/deployment-2.png" alt="Diagrama que representa el patrón de implementación del Agent" style="width:100%;" >}}
{{% /collapse-content %}}

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

El contenedor de su aplicación debe enviar datos al Collector de DDOT en el mismo servidor. Dado que el Collector se ejecuta como un DaemonSet, debe especificar el servidor local como el punto de conexión de OTLP.

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

<div class="alert alert-info">Alternativamente, puede usar <a href="/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration">etiquetas de Kubernetes específicas de Datadog</a> para configurar unified service tagging. No utilice ambos enfoques, ya que esto crea etiquetas duplicadas.</div>

### Ejecute la aplicación {#run-the-application}

Vuelva a implementar su aplicación para aplicar los cambios realizados en el manifiesto de implementación. Una vez que la configuración actualizada esté activa, unified service tagging estará completamente habilitado para sus métricas, trazas y registros.

## Explore los datos de observabilidad en Datadog {#explore-observability-data-in-datadog}

Utilice Datadog para explorar los datos de observabilidad de su aplicación.

### Fleet Automation {#fleet-automation}

Explore la configuración de su Datadog Agent y Collector.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Revise la configuración de su Agent y Collector desde la página de Fleet Automation." style="width:100%;" >}}

### Monitoreo en vivo de contenedor {#live-container-monitoring}

Haga un seguimiento del estado de sus contenedores utilizando las capacidades de Container Monitoring.

{{< img src="/opentelemetry/embedded_collector/containers.png" alt="Haga un seguimiento del estado de sus contenedores desde la página de Containers." style="width:100%;" >}}

### Estado de salud del nodo de infraestructura {#infrastructure-node-health}

Vea las métricas de tiempo de ejecución y de infraestructura para visualizar, monitorear y medir el rendimiento de sus nodos.

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="Visualice las métricas de tiempo de ejecución y de infraestructura desde la lista de servidores." style="width:100%;" >}}

### Registros {#logs}

Visualice los registros para monitorear y solucionar problemas de las operaciones del sistema y de la aplicación.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Visualice los registros desde el Log Explorer." style="width:100%;" >}}

### Trazas {#traces}

Visualice las trazas y los spans para observar el estado y el rendimiento de las solicitudes procesadas por su aplicación, con métricas de infraestructura correlacionadas en la misma traza.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Visualice las trazas desde el Trace Explorer." style="width:100%;" >}}

### Métricas de tiempo de ejecución {#runtime-metrics}

Monitoree las métricas de tiempo de ejecución (JVM) de sus aplicaciones.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="Visualice las métricas de JVM desde el JVM Metrics dashboard" style="width:100%;" >}}

### Métricas de estado del Collector {#collector-health-metrics}

Visualice las métricas del DDOT Collector para hacer un seguimiento del estado del Collector.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="Visualice las métricas de estado del Collector desde el OTel dashboard." style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

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
[58]: /es/opentelemetry/config/hostname_tagging/#ddot-collector-exporting-directly-to-datadog