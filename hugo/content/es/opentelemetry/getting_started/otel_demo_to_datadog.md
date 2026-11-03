---
algolia:
  tags:
  - opentelemetry
  - open telemetry
  - otel
  - opentelemetry demo
aliases:
- /es/opentelemetry/guide/otel_demo_to_datadog
- /es/opentelemetry/otel_demo_to_datadog
further_reading:
- link: /internal_developer_portal/catalog/
  tag: Documentación
  text: Catalog
- link: /tracing/trace_explorer/
  tag: Documentación
  text: Trace Explorer
- link: /tracing/trace_explorer/trace_queries/
  tag: Documentación
  text: Consultas de traza
- link: /error_tracking/
  tag: Documentación
  text: Error Tracking
title: Envío de datos de la demostración de OpenTelemetry a Datadog
---
## Descripción general {#overview}

<div class="alert alert-info">Este tutorial utiliza el Datadog Exporter y el Datadog Connector. Para nuevas configuraciones del Collector, Datadog recomienda la canalización OTLP en <a href="/opentelemetry/setup/collector_exporter/">Configurar el OpenTelemetry Collector</a>.</div>

La [demostración de OpenTelemetry][1] es una aplicación de demostración de microservicios desarrollada por la comunidad para demostrar OpenTelemetry (OTel)
la instrumentación y sus capacidades de observabilidad. Es una página web de comercio electrónico compuesta por múltiples microservicios que se comunican entre sí a través de HTTP y gRPC. Todos los servicios están instrumentados con OpenTelemetry y producen trazas, métricas y registros.

Esta página lo guía a través de los pasos necesarios para implementar el OpenTelemetry Demo y enviar sus datos a Datadog.

## Requisitos previos {#prerequisites}

Para completar esta guía, asegúrese de tener lo siguiente:

1. [Cree una cuenta de Datadog][2] si aún no lo ha hecho.
2. Busque o cree su [clave de Datadog API][3].
3. 6 GB de RAM libre para la aplicación.

Puede implementar la demostración OpenTelemetry usando Docker o Kubernetes (con Helm). Elija su método de implementación preferido y asegúrese de tener instaladas las herramientas necesarias:

{{< tabs >}}
{{% tab "Docker" %}}

- Docker
- Docker Compose v2.0.0+
- Make (opcional)

{{% /tab %}}

{{% tab "Kubernetes" %}}

- Kubernetes 1.24+
- Helm 3.9+
- Un clúster de Kubernetes activo con kubectl configurado para conectarse a él

{{% /tab %}}
{{< /tabs >}}

## Configuración e implementación del OpenTelemetry Demo {#configuring-and-deploying-the-demo}

### Clonación del repositorio {#cloning-the-repository}

Clone el `opentelemetry-demo` repositorio en su dispositivo:

```shell
git clone https://github.com/open-telemetry/opentelemetry-demo.git
```

### Configure el OpenTelemetry Collector {#configuring-the-opentelemetry-collector}

Para enviar los datos de telemetría del OpenTelemetry Demo a Datadog, necesita añadir los siguientes componentes a la configuración del OpenTelemetry Collector:

- `Resource Processor` es un componente `optional` pero recomendado que se utiliza para establecer el atributo de recurso `deployment.environment.name`, que Datadog asigna a la etiqueta `env`.
- `Datadog Connector` es responsable de calcular las métricas de traza de Datadog APM.
- `Datadog Exporter` es responsable de exportar trazas, métricas y registros a Datadog.
- `Datadog Extension` es un componente `optional` que le permite visualizar la configuración del OpenTelemetry Collector dentro del monitoreo de infraestructura. (Lea más en [Datadog Extension][13]).

Complete los siguientes pasos para configurar estos componentes.

{{< tabs >}}
{{% tab "Docker" %}}

1. Abra el repositorio de la demostración. Cree un archivo llamado `docker-compose.override.yml` en la carpeta raíz.

2. Abra el archivo creado. Pegue el siguiente contenido y establezca las variables de entorno [Datadog site][7] y [Datadog API key][8]:

    ```yaml
    services:
      otel-collector:
        command:
          - "--config=/etc/otelcol-config.yml"
          - "--config=/etc/otelcol-config-extras.yml"
          - "--feature-gates=datadog.EnableOperationAndResourceNameV2"
        environment:
          - DD_SITE_PARAMETER=<Your API Site>
          - DD_API_KEY=<Your API Key>
    ```

3. Para configurar el OpenTelemetry Collector, abra `src/otel-collector/otelcol-config-extras.yml` y añada lo siguiente al archivo:

    ```yaml
    extensions:
      datadog/extension:
        api:
          site: ${env:DD_SITE_PARAMETER}
          key: ${env:DD_API_KEY}
        http:
          endpoint: "localhost:9875"
          path: "/metadata"

    exporters:
      datadog:
        traces:
          compute_stats_by_span_kind: true
          trace_buffer: 500
        api:
          site: ${env:DD_SITE_PARAMETER}
          key: ${env:DD_API_KEY}
        sending_queue:
          batch:
            min_size: 10
            max_size: 100
            flush_timeout: 10s

    processors:
      resource:
        attributes:
          - key: deployment.environment.name
            value: "otel"
            action: upsert

    connectors:
      datadog/connector:
        traces:
          compute_stats_by_span_kind: true

    service:
      extensions: [datadog/extension]
      pipelines:
        traces:
          receivers: [otlp]
          processors: [resourcedetection, memory_limiter, resource, transform/sanitize_spans]
          exporters: [otlp_grpc/jaeger, debug, spanmetrics, datadog, datadog/connector]
        metrics:
          receivers: [datadog/connector, docker_stats, httpcheck/frontend-proxy, hostmetrics, nginx, otlp, postgresql, redis, spanmetrics]
          processors: [resourcedetection, memory_limiter, resource]
          exporters: [otlp_http/prometheus, debug, datadog]
        logs:
          receivers: [otlp]
          processors: [resourcedetection, memory_limiter, resource]
          exporters: [opensearch, debug, datadog]
    ```

    By default, the collector in the demo application merges the configuration from two files:

    - `src/otel-collector/otelcol-config.yml`: contains the default configuration for the collector.
    - `src/otel-collector/otelcol-config-extras.yml`: used to add extra configuration to the collector.

    <div class="alert alert-info">
    Al combinar valores YAML, los objetos se combinan y las matrices se reemplazan.
    Es por eso que hay más componentes especificados en las canalizaciones de los que realmente están configurados.
    La configuración anterior no reemplaza los valores configurados en el principal <code>otelcol-config</code> archivo.
    </div>

[7]: /es/getting_started/site/
[8]: https://app.datadoghq.com/organization-settings/api-keys/

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Cree un secreto llamado `dd-secrets` para almacenar los secretos del sitio de Datadog y la clave de API de Datadog:

    ```shell
    kubectl create secret generic dd-secrets --from-literal="DD_SITE_PARAMETER=<Your API Site>" --from-literal="DD_API_KEY=<Your API Key>"
    ```

2. Agregue el [Helm chart][4] de OpenTelemetry a su repositorio para administrar e implementar el OpenTelemetry Demo:

    ```shell
    helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
    ```

3. Cree un archivo llamado `my-values-file.yml` con el siguiente contenido:

    ```yaml
    opentelemetry-collector:
      extraEnvsFrom:
        - secretRef:
            name: dd-secrets
      config:
        extensions:
          datadog/extension:
            api:
              site: ${env:DD_SITE_PARAMETER}
              key: ${env:DD_API_KEY}
            http:
              endpoint: "localhost:9875"
              path: "/metadata"
        exporters:
          datadog:
            traces:
              compute_stats_by_span_kind: true
              trace_buffer: 500
            hostname: "otelcol-helm"
            api:
              site: ${env:DD_SITE_PARAMETER}
              key: ${env:DD_API_KEY}
            sending_queue:
              batch:
                min_size: 10
                max_size: 100
                flush_timeout: 10s

        processors:
          resource:
            attributes:
              - key: deployment.environment.name
                value: "otel"
                action: upsert

        connectors:
          datadog/connector:
            traces:
              compute_stats_by_span_kind: true

        service:
          extensions: [health_check, datadog/extension]
          pipelines:
            traces:
              processors: [memory_limiter, resource, resourcedetection, transform]
              exporters: [otlp/jaeger, debug, spanmetrics, datadog, datadog/connector]
            metrics:
              receivers: [datadog/connector, otlp, spanmetrics]
              processors: [memory_limiter, resource, resourcedetection, transform]
              exporters: [otlphttp/prometheus, debug, datadog]
            logs:
              processors: [memory_limiter, resource, resourcedetection, transform]
              exporters: [opensearch, debug, datadog]
    ```

    <div class="alert alert-info">
    Al combinar valores YAML, los objetos se combinan y las matrices se reemplazan.
    Es por eso que hay más componentes especificados en las canalizaciones de los que realmente están configurados.
    La configuración anterior no reemplaza los valores configurados en el principal <code>otelcol-config</code> archivo.
    </div>

[4]: https://opentelemetry.io/docs/demo/kubernetes-deployment/

{{% /tab %}}
{{< /tabs >}}

### Ejecución del OpenTelemetry Demo {#running-the-demo}

{{< tabs >}}
{{% tab "Docker" %}}

Si tiene make instalado, puede usar el siguiente comando para iniciar el OpenTelemetry Demo:

```shell
make start
```

Si no tiene `make` instalado, puede usar el comando `docker compose` directamente:

```shell
docker compose --env-file .env --env-file .env.override up --force-recreate --remove-orphans --detach
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Para implementar la aplicación del OpenTelemetry Demo en Kubernetes usando Helm, ejecute el siguiente comando:

```shell
helm install my-otel-demo open-telemetry/opentelemetry-demo --values my-values-file.yml
```

{{% /tab %}}
{{< /tabs >}}

## Navegación por la aplicación {#navigating-the-application}

Puede acceder a la interfaz web de Astronomy Shop para explorar la aplicación y observar cómo se generan los datos de telemetría.

{{< tabs >}}
{{% tab "Docker" %}}

Vaya a <http://localhost:8080>.

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Si está ejecutando un clúster local, necesita reenviar el puerto del proxy de frontend:

   ```shell
   kubectl port-forward svc/my-otel-demo-frontendproxy 8080:8080
   ```

2. Vaya a <http://localhost:8080>.

{{% /tab %}}
{{< /tabs >}}

## Correlación de datos de telemetría {#telemetry-data-correlation}

Los pasos de instrumentación utilizados en todos los servicios del OpenTelemetry Demo se pueden encontrar
en la documentación principal de OpenTelemetry.

Puede encontrar el lenguaje en el que se implementó cada servicio, así como su
documentación en la [tabla de referencia de características de lenguaje][10].

## Exploración de datos de OpenTelemetry en Datadog {#exploring-opentelemetry-data-in-datadog}

Cuando el OTel Demo está en ejecución, el generador de carga integrado simula tráfico en la aplicación.
Después de un par de segundos, puede ver los datos llegando a Datadog.

### Catalog {#catalog}

Visualizar todos los servicios que forman parte del OTel Demo:

1. Vaya a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Catalog{{< /ui >}}][11].

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog.png" alt="Visualizar la página de catálogo con la lista de servicios del OpenTelemetry Demo" style="width:90%;" >}}

2. Seleccione {{< ui >}}Map{{< /ui >}} para ver cómo están conectados los servicios. Cambie {{< ui >}}Map layout{{< /ui >}} a {{< ui >}}Cluster{{< /ui >}} o {{< ui >}}Flow{{< /ui >}} para visualizar el mapa en diferentes modos.

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog_flow.png" alt="Ver el flujo d Service Map con todos los servicios conectados" style="width:90%;" >}}

3. Seleccione la vista {{< ui >}}Catalog{{< /ui >}}, luego seleccione un servicio para ver un resumen del rendimiento en el panel lateral.

{{< img src="/getting_started/opentelemetry/otel_demo/software_catalog_service.png" alt="Visualizar resumen del rendimiento y guía de configuración de un servicio específico" style="width:90%;" >}}

### Trace Explorer {#trace-explorer}

Explore las trazas recibidas del OTel Demo:

1. Desde {{< ui >}}Performance{{< /ui >}} > {{< ui >}}Setup Guidance{{< /ui >}}, haga clic en {{< ui >}}View Traces{{< /ui >}} para abrir el Trace Explorer, con el servicio seleccionado aplicado como filtro.

{{< img src="/getting_started/opentelemetry/otel_demo/traces_view.png" alt="Vista de traza con todos los tramos indexados para el servicio de comprobación" style="width:90%;" >}}

2. Seleccione un tramo indexado para visualizar los detalles completos de la traza para esta transacción.

{{< img src="/getting_started/opentelemetry/otel_demo/trace_waterfall.png" alt="Vista de traza con todos los tramos que pertenecen a esa transacción específica" style="width:90%;" >}}

3. Navegue por las pestañas para visualizar detalles adicionales:
   - Métricas de infraestructura para los servicios que reportan métricas de servidor.
   - Métricas de tiempo de ejecución para los servicios que ya se han implementado.
   - Entradas de registro correlacionadas con esta traza.
   - Enlaces de tramos vinculados a esta traza.

### Consultas de traza {#trace-queries}

Datadog le permite filtrar y agrupar los datos de OpenTelemetry recibidos. Por ejemplo, para encontrar todas las transacciones de un usuario específico, puede usar Consultas de traza.

El OTel Demo envía `user.id` como etiquetas de tramos, por lo que puede usar esto para filtrar todas las transacciones activadas por el usuario:

1. Desde {{< ui >}}Info{{< /ui >}} en el panel lateral, pase el cursor sobre la línea con el ID de usuario, haga clic en el icono {{< ui >}}cog{{< /ui >}} y seleccione {{< ui >}}filter by @app.user.id:<user_id>{{< /ui >}}.

2. Elimine cualquier filtro anterior, dejando solo {{< ui >}}@app.user.id{{< /ui >}} aplicado para visualizar todas las transacciones que contienen tramos con el ID de usuario especificado.

{{< img src="/getting_started/opentelemetry/otel_demo/trace_query.png" alt="Consulta de traza que filtra todos los tramos que contienen un app.user.id específico" style="width:90%;" >}}

### Error Tracking {#error-tracking}

El OpenTelemetry Demo incluye un motor de Feature Flag para simular escenarios de error.

1. Navegue a [http://localhost:8080/feature][12] para administrar los escenarios disponibles. Consulte la [documentación del OpenTelemetry Demo][5] para obtener más detalles.
2. Después de que el OTel Demo comience a producir errores, puede visualizar y rastrear los servicios afectados en Datadog.

{{< img src="/getting_started/opentelemetry/otel_demo/error_tracking.png" alt="Vista de Error Tracking que muestra el error PaymentService Fail Feature Flag Enabled" style="width:90%;" >}}

### Configuración de OpenTelemetry Collector {#opentelemetry-collector-configuration}

La extensión de Datadog le permite visualizar la configuración de OpenTelemetry Collector dentro de Datadog en cualquiera de las siguientes páginas:

- [Infrastructure List][14].
- [Resource Catalog][15].

Al seleccionar el nombre de host donde se ejecuta el Collector, puede visualizar su configuración completa:

{{< img src="/getting_started/opentelemetry/otel_demo/collector_full_config.png" alt="Configuración de OpenTelemetry Collector renderizada dentro de Datadog" style="width:90%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-demo
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: https://app.datadoghq.com/organization-settings/api-keys/
[5]: https://opentelemetry.io/docs/demo/feature-flags/
[10]: https://opentelemetry.io/docs/demo/#language-feature-reference
[11]: https://app.datadoghq.com/services
[12]: http://localhost:8080/feature
[13]: /es/opentelemetry/integrations/datadog_extension/
[14]: https://app.datadoghq.com/infrastructure
[15]: https://app.datadoghq.com/infrastructure/catalog