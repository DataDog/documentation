---
aliases:
- /es/opentelemetry/agent/install_agent_with_collector
- /es/opentelemetry/setup/ddot_collector/install/kubernetes
code_lang: kubernetes_daemonset
code_lang_weight: 1
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentación
  text: Utiliza componentes personalizados de OpenTelemetry con Datadog Agent
title: Instalar el recolector DDOT como un DaemonSet de Kubernetes
type: multi-code-lang
---
## Resumen {#overview}

Sigue esta guía para desplegar la Datadog Distribution of OpenTelemetry (DDOT) Collector como un DaemonSet de Kubernetes utilizando Helm o Datadog Operator.

<div class="alert alert-info">
  <strong>¿Necesitas componentes adicionales de OpenTelemetry?</strong> Si necesitas componentes adicionales a los incluidos en el paquete predeterminado, sigue <a href="/opentelemetry/setup/ddot_collector/custom_components">Utiliza componentes personalizados de OpenTelemetry</a> para extender las capacidades de Datadog Agent. Para una lista de componentes incluidos por defecto, consulta <a href="/opentelemetry/agent/#opentelemetry-collector-components">componentes del recolector de OpenTelemetry</a>.
</div>

## Requisitos {#requirements}

Para completar esta guía, necesitas lo siguiente:

**Cuenta de Datadog**:
1. [Crea una cuenta de Datadog][1] si no tienes una.
1. Encuentra o crea tu [clave de API de Datadog][2].

**Software**:
Instala y configura lo siguiente en tu máquina:

- Un clúster de Kubernetes (v1.29+)
- [Helm (v3+)][54]
- [kubectl][5]

**Red**: {{% otel-network-requirements %}}

## Instala Datadog Agent con OpenTelemetry Collector {#install-the-datadog-agent-with-opentelemetry-collector}

<div class="alert alert-info">Esta instalación es necesaria para las configuraciones de Datadog SDK + DDOT y OpenTelemetry SDK + DDOT. Aunque el SDK de Datadog implementa la API de OpenTelemetry, aún requiere el recolector DDOT para procesar y enviar métricas y registros OTLP.</div>

### Selecciona el método de instalación {#select-installation-method}

Elige uno de los siguientes métodos de instalación:

- [Operador de Datadog][55]: Un enfoque [nativo de Kubernetes][56] que reconcilia y mantiene automáticamente tu configuración de Datadog. Informa el estado de despliegue, salud y errores en su estado de Recurso Personalizado, y limita el riesgo de mala configuración gracias a opciones de configuración de nivel superior.
- [Helm chart][4]: Una forma sencilla de desplegar el Agente de Datadog. Proporciona capacidades de versionado, retroceso y plantillas, haciendo que los despliegues sean consistentes y más fáciles de replicar.

{{< tabs >}}
{{% tab "Operador de Datadog" %}}
### Instala el Operador de Datadog {#install-the-datadog-operator}

Puedes instalar el Datadog Operator en tu clúster usando el [Helm chart del Datadog Operator][1]:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm install datadog-operator datadog/datadog-operator
```

[1]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/README.md
{{% /tab %}}
{{% tab "Helm" %}}
### Agrega el Repositorio de Helm de Datadog {#add-the-datadog-helm-repository}

Para agregar el repositorio de Datadog a tus repositorios de Helm:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
```

{{% /tab %}}
{{< /tabs >}}

### Configura la clave de API de Datadog {#set-up-datadog-api-key}

1. Obtén la [clave de API de Datadog][2].
1. Almacena la clave de API como un secreto de Kubernetes:
   ```shell
   kubectl create secret generic datadog-secret \
     --from-literal api-key=<DD_API_KEY>
   ```
   Reemplaza `<DD_API_KEY>` con tu clave de API de Datadog real.

### Configura Datadog Agent {#configure-the-datadog-agent}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Después de implementar el Datadog Operator, crea el recurso `DatadogAgent` que activa la implementación del Datadog Agent, Cluster Agent y Runners de Cluster Checks (si se utilizan) en tu clúster de Kubernetes. El Datadog Agent se implementa como un DaemonSet, ejecutando un pod en cada nodo de tu clúster.

1. Utiliza el archivo `datadog-agent.yaml` para especificar tu configuración de despliegue `DatadogAgent`

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

  - Reemplaza `<CLUSTER_NAME>` con un nombre para tu clúster.
  - Reemplaza `<DATADOG_SITE>` con tu [sitio de Datadog][1]. Tu sitio es {{< region-param key="dd_site" code="true" >}}. (Asegúrate de que se seleccione el **DATADOG SITE** correcto a la derecha.)

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">Para FED, también configura <code>useFIPSAgent: true</code> bajo <code>spec.global</code> para usar la imagen del Datadog Agent compatible con FIPS. Vea <a href="/agent/configuration/fips-compliance/">cumplimiento de FIPS</a>.</div>
{{% /site-region %}}

2. Habilite el recolector de OpenTelemetry:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
  # Enable Features
  features:
    otelCollector:
      enabled: true
{{< /code-block >}}

Datadog Operator vincula automáticamente el recolector de OpenTelemetry a los puertos `4317` (nombrado `otel-grpc`) y `4318` (nombrado `otel-http`) por defecto.

3. (Opcional) Habilita características adicionales de Datadog:

<div class="alert alert-warning">Habilitar estas características puede incurrir en cargos adicionales. Revisa la <a href="https://www.datadoghq.com/pricing/">página de precios</a> y habla con tu Gerente de Éxito del Cliente antes de continuar.</div>

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

Al habilitar características adicionales de Datadog, siempre utiliza los archivos de configuración de Datadog Agent o del recolector de OpenTelemetry en lugar de depender de las variables de entorno de Datadog.

**Nota**: A partir de Datadog Operator `v1.22.0`, el contenedor DDOT utiliza la imagen `ddot-collector` en lugar de la imagen de Datadog Agent `-full`.
- Al sobrescribir la etiqueta de imagen del Datadog Agent de nodo, utiliza una etiqueta >= `7.67.0` para que el contenedor OTel sea programado (la imagen `ddot-collector` solo es compatible con >= `7.67.0`).
- La imagen `ddot-collector` no tiene variante `-full`. Si necesitas una imagen `-full`, establece `spec.override.nodeAgent.image.name` como una imagen completa de Datadog Agent (por ejemplo, `registry.datadoghq.com/agent:7.72.1-full`).

[1]: /es/getting_started/site
[2]: /es/containers/guide/changing_container_registry/
{{% /tab %}}
{{% tab "Helm" %}}
Utiliza un archivo YAML para especificar los parámetros del Helm chart para el [Datadog Agent chart][1].

1. Crea un archivo `datadog-values.yaml` vacío:

```shell
touch datadog-values.yaml
```

<div class="alert alert-info">Los parámetros no especificados utilizan los valores predeterminados de <a href="https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml">values.yaml</a>.</div>

2. Configura el secreto de la clave de API de Datadog:

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  site: <DATADOG_SITE>
  apiKeyExistingSecret: datadog-secret
{{< /code-block >}}

Establece `<DATADOG_SITE>` en tu [sitio de Datadog][2]. De lo contrario, se establece en `datadoghq.com`, el sitio US1.

{{% site-region region="gov,gov2" %}}
<div class="alert alert-info">Para FED, también configura <code>useFIPSAgent: true</code> en la raíz de tu <code>datadog-values.yaml</code> para usar la imagen de Datadog Agent compatible con FIPS. Vea <a href="/agent/configuration/fips-compliance/">cumplimiento de FIPS</a>.</div>
{{% /site-region %}}

3. Habilita el recolector de OpenTelemetry y configura los puertos esenciales:

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

Establece el `hostPort` para exponer el puerto del contenedor a la red externa. Esto permite configurar el exportador OTLP para apuntar a la dirección IP del nodo donde se asigna Datadog Agent.

Si no deseas exponer el puerto, puedes utilizar el servicio de Datadog Agent en su lugar:
   - Elimina el <code>hostPort</code> entradas de tu <code>datadog-values.yaml</code> archivo.
   - En el archivo de despliegue de tu aplicación (`deployment.yaml`), configura el exportador OTLP para usar el servicio de Datadog Agent:
      ```yaml
      env:
        - name: OTEL_EXPORTER_OTLP_ENDPOINT
          value: 'http://<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local'
        - name: OTEL_EXPORTER_OTLP_PROTOCOL
          value: 'grpc'
      ```

4. (Opcional) Habilita características adicionales de Datadog:

<div class="alert alert-warning">Habilitar estas características puede incurrir en cargos adicionales. Revisa la <a href="https://www.datadoghq.com/pricing/">página de precios</a> y habla con tu Gerente de Éxito del Cliente antes de continuar.</div>

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

Al habilitar características adicionales de Datadog, siempre utilice los archivos de configuración del Agente de Datadog o del recolector de OpenTelemetry en lugar de depender de las variables de entorno de Datadog.

5. (Opcional) Recopilar etiquetas de pod y usarlas como etiquetas para adjuntar a métricas, trazas y registros:

<div class="alert alert-warning">Las métricas personalizadas pueden afectar la facturación. Consulte la <a href="https://docs.datadoghq.com/account_management/billing/custom_metrics">página de facturación de métricas personalizadas</a> para más información.</div>

{{< code-block lang="yaml" filename="datadog-values.yaml" collapsible="true" >}}
datadog:
  ...
  podLabelsAsTags:
    app: kube_app
    release: helm_release
{{< /code-block >}}

{{% collapse-content title="Archivo datadog-values.yaml completado" level="p" %}}
Tu `datadog-values.yaml` archivo debería verse algo así:
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

### Configura el recolector de OpenTelemetry {#configure-the-opentelemetry-collector}

{{< tabs >}}
{{% tab "Operador de Datadog" %}}
Datadog Operator proporciona una configuración de muestra del OpenTelemetry Collector que puedes usar como punto de partida. Si necesitas modificar esta configuración, Datadog Operator admite dos formas de proporcionar una configuración personalizada de OpenTelemetry Collector:

- **Configuración en línea**: Agrega tu configuración personalizada del OpenTelemetry Collector directamente en el campo `features.otelCollector.conf.configData`.
- **Configuración basada en ConfigMap**: Almacena la configuración de tu OpenTelemetry Collector en un ConfigMap y haz referencia a ella en el campo `features.otelCollector.conf.configMap`. Este enfoque te permite mantener la configuración del Collector desacoplada del recurso `DatadogAgent`.

####  Configuración en línea del Collector {#inline-collector-configuration}

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

Cuando apliques el archivo `datadog-agent.yaml` que contiene este recurso `DatadogAgent`, el Operador monta automáticamente la configuración del Collector en el DaemonSet del Agente.

{{% collapse-content title="Archivo datadog-agent.yaml completado con configuración del Collector en línea" level="p" %}}
El `datadog-agent.yaml` completado con configuración del Collector en línea debería verse algo así:
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

#### Configuración del Collector basada en ConfigMap {#configmap-based-collector-configuration}

Para configuraciones más complejas o que se actualizan con frecuencia, almacenar la configuración del Collector en un ConfigMap puede simplificar el control de versiones.

1. Crea un ConfigMap que contenga la configuración del Collector:

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

<div class="alert alert-danger">El campo para la configuración del Collector en el ConfigMap debe llamarse <code>otel-config.yaml</code>.</div>

2. Referencia el ConfigMap `otel-agent-config-map` en tu recurso `DatadogAgent` usando el parámetro `features.otelCollector.conf.configMap`:
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

El Operador monta automáticamente `otel-config.yaml` del ConfigMap en el DaemonSet del Collector de OpenTelemetry del Agente.

{{% collapse-content title="Archivo datadog-agent.yaml completado con la configuración del Collector en el ConfigMap" level="p" %}}
El `datadog-agent.yaml` completado con la configuración del Collector definida como ConfigMap debería verse algo así:
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
El Helm chart de Datadog ofrece una configuración de ejemplo del Collector de OpenTelemetry que puedes utilizar como punto de partida. Esta sección te guía a través de las canalizaciones predefinidas y los componentes de OpenTelemetry incluidos.

Esta es la configuración completa del Collector de OpenTelemetry en `otel-config.yaml`:

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

#### Componentes clave {#key-components}

Para enviar datos de telemetría a Datadog, los siguientes componentes están definidos en la configuración:

{{< img src="/opentelemetry/embedded_collector/components-3.jpg" alt="Diagrama que representa el patrón de despliegue del Agente" style="width:100%;" >}}

##### Conector de Datadog {#datadog-connector}

El [conector de Datadog][6] calcula las métricas de trazas de APM de Datadog.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
{{< /code-block >}}

##### Exportador de Datadog {#datadog-exporter}

El [exportador de Datadog][7] exporta trazas, métricas y registros a Datadog.

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

**Nota**: Si `key` no está especificado o se establece como un secreto, o si `site` no está especificado, el sistema utiliza valores de la configuración principal del Agente. Por defecto, el Agente principal establece el sitio en `datadoghq.com` (US1).

##### Receptor de Prometheus {#prometheus-receiver}

El [receptor de Prometheus][8] recopila métricas de salud del OpenTelemetry Collector para la canalización de métricas.

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

Para más información, consulte la documentación de [Métricas de Salud del Collector][8].

### Despliegue el Agente con el OpenTelemetry Collector {#deploy-the-agent-with-the-opentelemetry-collector}

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Despliega el Datadog Agent con el archivo de configuración:

```shell
kubectl apply -f datadog-agent.yaml
```

Esto despliega el Datadog Agent como un DaemonSet con el DDOT OpenTelemetry Collector. El Collector se ejecuta en el mismo servidor que tu aplicación, siguiendo el [Agent deployment pattern][1]. El [patrón de despliegue del Gateway][2] está en vista previa; para instrucciones de instalación, sigue la [guía de instalación del Gateway de DDOT en Kubernetes][3].

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /es/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{% tab "Helm" %}}
Para instalar o actualizar el Datadog Agent con OpenTelemetry Collector en tu entorno de Kubernetes, usa uno de los siguientes comandos de Helm:

- Para la configuración predeterminada del OpenTelemetry Collector:
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog -f datadog-values.yaml
   ```

- Para la configuración personalizada del OpenTelemetry Collector:
   ```shell
   helm upgrade -i <RELEASE_NAME> datadog/datadog \
     -f datadog-values.yaml \
     --set-file datadog.otelCollector.config=otel-config.yaml
   ```
   Este comando te permite especificar tu propio archivo `otel-config.yaml`.

Reemplaza `<RELEASE_NAME>` por el nombre de la release de Helm que estás utilizando.

<div class="alert alert-info">Puedes ver advertencias durante el proceso de despliegue. Puedes ignorar estas advertencias.</div>

Este Helm chart despliega el Datadog Agent como un DaemonSet con el OpenTelemetry Collector. El Collector se despliega en el mismo servidor que tu aplicación, siguiendo el [Agent deployment pattern][1]. El [patrón de despliegue del Gateway][2] está en vista previa; para instrucciones de instalación, sigue la [guía de instalación del Gateway de DDOT en Kubernetes][3].

[1]: https://opentelemetry.io/docs/collector/deployment/agent/
[2]: https://opentelemetry.io/docs/collector/deployment/gateway/
[3]: /es/opentelemetry/setup/ddot_collector/install/kubernetes_gateway/
{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Diagrama de despliegue" level="p" %}}
{{< img src="/opentelemetry/embedded_collector/deployment-2.png" alt="Diagrama que representa el patrón de despliegue del Agent." style="width:100%;" >}}
{{% /collapse-content %}}

## Envía tu telemetría a Datadog {#send-your-telemetry-to-datadog}

Para enviar tus datos de telemetría a Datadog:

1. [Instrumenta tu aplicación](#instrument-the-application)
2. [Configura la aplicación](#configure-the-application)
3. [Correlaciona los datos de observabilidad](#correlate-observability-data)
4. [Ejecuta tu aplicación](#run-the-application)

### Instrumenta la aplicación {#instrument-the-application}

Instrumenta tu aplicación [usando la API de OpenTelemetry][12].

{{% collapse-content title="Ejemplo de aplicación instrumentada con la API de OpenTelemetry" level="p" %}}
Como ejemplo, puedes usar la [aplicación de muestra de Calendario][9] que ya está instrumentada para ti. El siguiente código instrumenta el método [CalendarService.getDate()][10] utilizando las anotaciones y la API de OpenTelemetry:
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="false" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}
{{% /collapse-content %}}

### Configura la aplicación {#configure-the-application}

Tu contenedor de aplicación debe enviar datos al DDOT Collector en el mismo servidor. Dado que el Collector se ejecuta como un DaemonSet, necesitas especificar el servidor local como el punto de conexión de OTLP.

Si la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` no está ya configurada, añádela al archivo de manifiesto de despliegue de tu aplicación:
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

### Correlaciona los datos de observabilidad {#correlate-observability-data}

[unified service tagging][14] une los datos de observabilidad en Datadog para que puedas navegar a través de métricas, trazas y registros con etiquetas consistentes.

En entornos contenedorizados, establece `env`, `service` y `version` usando las variables de entorno de Atributos de Recursos de OpenTelemetry. El DDOT Collector detecta esta configuración de etiquetado y la aplica a los datos que recopila de los contenedores.

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

<div class="alert alert-info">Alternativamente, puedes usar <a href="/getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration">etiquetas específicas de Kubernetes de Datadog</a> para configurar el etiquetado de servicio unificado. No uses ambos enfoques, ya que esto crea etiquetas duplicadas.</div>

### Ejecuta la aplicación {#run-the-application}

Vuelve a implementar tu aplicación para aplicar los cambios realizados en el manifiesto de implementación. Una vez que la configuración actualizada esté activa, la Etiquetación de Servicio Unificada estará completamente habilitada para tus métricas, trazas y registros.

## Explora los datos de observabilidad en Datadog {#explore-observability-data-in-datadog}

Utiliza Datadog para explorar los datos de observabilidad de tu aplicación.

### Fleet Automation {#fleet-automation}

Explora la configuración de tu Datadog Agent y Collector.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Revisa la configuración de tu Datadog Agent y Collector desde la página de Fleet Automation." style="width:100%;" >}}

### Monitoreo de contenedores en vivo {#live-container-monitoring}

Monitorea la salud de tu contenedor utilizando las capacidades de Container Monitoring en vivo.

{{< img src="/opentelemetry/embedded_collector/containers.png" alt="Monitorea la salud de tu contenedor desde la página de Contenedores." style="width:100%;" >}}

### Salud de nodos de infraestructura {#infrastructure-node-health}

Visualiza métricas de tiempo de ejecución e infraestructura para observar, monitorear y medir el rendimiento de tus nodos.

{{< img src="/opentelemetry/embedded_collector/infrastructure.png" alt="Visualiza métricas de tiempo de ejecución e infraestructura desde la Host List." style="width:100%;" >}}

### Logs {#logs}

Visualiza registros para monitorear y solucionar problemas de las operaciones de la aplicación y del sistema.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="Visualiza registros desde el Log Explorer." style="width:100%;" >}}

### Trazas {#traces}

Visualiza trazas y tramos para observar el estado y rendimiento de las solicitudes procesadas por tu aplicación, con métricas de infraestructura correlacionadas en la misma traza.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="Visualiza trazas desde el Trace Explorer." style="width:100%;" >}}

### Métricas de tiempo de ejecución {#runtime-metrics}

Monitorea las métricas de tiempo de ejecución (JVM) de tus aplicaciones.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="Visualiza las métricas de JVM desde el JVM Metrics dashboard" style="width:100%;" >}}

### Métricas de salud del Collector {#collector-health-metrics}

Visualiza las métricas del DDOT Collector para monitorear la salud del Collector.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="Visualiza las métricas de salud del Collector desde el OTel dashboard." style="width:100%;" >}}

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