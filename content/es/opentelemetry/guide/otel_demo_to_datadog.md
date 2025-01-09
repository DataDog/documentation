---
algolia:
  tags:
  - opentelemetry
  - open telemetry
  - otel
  - opentelemetry demo
further_reading:
- link: /service_catalog/
  tag: Documentación
  text: Catálogo de servicios
- link: /tracing/trace_explorer/
  tag: Documentación
  text: Trace Explorer
- link: /tracing/trace_explorer/trace_queries/
  tag: Documentación
  text: Consultas de trazas
- link: /error_tracking/
  tag: Documentación
  text: Rastreo de errores
title: Envío de datos desde OpenTelemetry Demo a Datadog
---

## Información general

La [OpenTelemetry Demo][1] es una aplicación de demostración de microservicios desarrollada por la comunidad para demostrar la instrumentación de OpenTelemetry (OTel)
y sus capacidades de observabilidad. Se trata de una página web de comercio electrónico compuesto por múltiples microservicios que se comunican entre sí a través de HTTP y gRPC. Todos los servicios están instrumentados con OpenTelemetry y producen trazas, métricas y logs.

Esta página te guiará a través de los pasos necesarios para desplegar la OpenTelemetry Demo y enviar sus datos a Datadog.

## Requisitos previos

Para completar esta guía, asegúrate de tener lo siguiente:

1. [Crea una cuenta en Datadog ][2] si aún no lo has hecho.
2. Busca o crea tu [clave de API de Datadog][3].
3. 6 GB de RAM libre para la aplicación.

Puedes desplegar la demostración con Docker o Kubernetes (con Helm). Elige el método de despliegue que prefieras y asegúrate de tener instaladas las herramientas necesarias:

{{< tabs >}}
{{% tab "Docker" %}}

- Docker
- Docker Compose v2.0.0+
- Make (opcional)

{{% /tab %}}

{{% tab "Kubernetes" %}}

- Kubernetes 1.24+
- Helm 3.9+

{{% /tab %}}
{{< /tabs >}}

## Configuración y despliegue de la demostración

### Clonación del repositorio

Clona el repositorio `opentelemetry-demo` en tu dispositivo:

```shell
git clone https://github.com/open-telemetry/opentelemetry-demo.git
```

### Configuración de OpenTelemetry Collector

Para enviar los datos de telemetría de la demostración a Datadog es necesario añadir tres componentes a la configuración de OpenTelemetry Collector:

- `Resource Processor` es un componente `optional` que es recomendado, utilizado para establecer la etiqueta `env` para Datadog.
- `Datadog Connector` se encarga de calcular métricas de traza de Datadog APM.
- `Datadog Exporter` se encarga de exportar trazas, métricas y logs a Datadog.

Completa los siguientes pasos para configurar estos tres componentes.

{{< tabs >}}
{{% tab "Docker" %}}

1. Abre el repositorio de demostración. Crea un archivo llamado `docker-compose.override.yml` en la carpeta raíz.

2. Abre el archivo creado. Pega el siguiente contenido y configura las variables de entorno del [sitio de Datadog][7] y la [clave de API de Datadog][8]:

    ```yaml
    services: 
      otelcol:
        command: 
          - "--config=/etc/otelcol-config.yml"
          - "--config=/etc/otelcol-config-extras.yml"
          - "--feature-gates=exporter.datadogexporter.UseLogsAgentExporter"
        environment:
          - DD_SITE_PARAMETER=<Your API Site>
          - DD_API_KEY=<Your API Key>
    ```

3. Para configurar el OpenTelemetry Collector, abre `src/otelcollector/otelcol-config-extras.yml` y añade lo siguiente al archivo:

    ```yaml
    exporters:
      datadog:
        traces:
          span_name_as_resource_name: true
          trace_buffer: 500
        hostname: "otelcol-docker"
        api:
          site: ${DD_SITE_PARAMETER}
          key: ${DD_API_KEY}

    processors:
      resource:
        attributes:
          - key: deployment.environment
            value: "otel"
            action: upsert

    connectors:
      datadog/connector:
        traces:
          span_name_as_resource_name: true

    service:
      pipelines:
        traces:
          processors: [resource, batch]
          exporters: [otlp, debug, spanmetrics, datadog, datadog/connector]
        metrics:
          receivers: [docker_stats, httpcheck/frontendproxy, otlp, prometheus, redis, spanmetrics, datadog/connector]
          processors: [resource, batch]
          exporters: [otlphttp/prometheus, debug, datadog]
        logs:
          processors: [resource, batch]
          exporters: [opensearch, debug, datadog]
    ```

    Por defecto, el Collector de la aplicación de demostración fusiona la configuración de dos archivos:

    - `src/otelcollector/otelcol-config.yml`: contiene la configuración por defecto para el Collector.
    - `src/otelcollector/otelcol-config-extras.yml`: utilizado para añadir más configuración al Collector.

    <div class="alert alert-info">
    When merging YAML values, objects are merged and arrays are replaced.
    That's why there are more components specified in the pipelines than actually configured.
    The previous configuration does not replace the values configured in the main <code>otelcol-config</code> file.
    </div>

[7]: /es/getting_started/site/
[8]: https://app.datadoghq.com/organization-settings/api-keys/

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Crea un secreto llamado `dd-secrets` para almacenar los secretos del sitio de Datadog y la clave de API:

    ```shell
    kubectl create secret generic dd-secrets --from-literal="DD_SITE_PARAMETER=<Your API Site>" --from-literal="DD_API_KEY=<Your API Key>"
    ```

2. Añade el [Helm chart][4] de OpenTelemetry a tu repositorio para gestionar y desplegar la OpenTelemetry Demo:

    ```shell
    helm repo add open-telemetry https://open-telemetry.github.io/opentelemetry-helm-charts
    ```

3. Crea un archivo llamado `my-values-file.yml` con el siguiente contenido:

    ```yaml
    opentelemetry-collector:
      extraEnvsFrom:
        - secretRef:
            name: dd-secrets
      config:
        exporters:
          datadog:
            traces:
              span_name_as_resource_name: true
              trace_buffer: 500
            hostname: "otelcol-helm"
            api:
              site: ${DD_SITE_PARAMETER}
              key: ${DD_API_KEY}

        processors:
          resource:
            attributes:
              - key: deployment.environment
                value: "otel"
                action: upsert

        connectors:
          datadog/connector:
            traces:
              span_name_as_resource_name: true

        service:
          pipelines:
            traces:
              processors: [resource, batch]
              exporters: [otlp, debug, spanmetrics, datadog, datadog/connector]
            metrics:
              receivers: [httpcheck/frontendproxy, otlp, redis, spanmetrics, datadog/connector]
              processors: [resource, batch]
              exporters: [otlphttp/prometheus, debug, datadog]
            logs:
              processors: [resource, batch]
              exporters: [opensearch, debug, datadog]
    ```

    <div class="alert alert-info">
    When merging YAML values, objects are merged and arrays are replaced.
    That's why there are more components specified in the pipelines than actually configured.
    The previous configuration does not replace the values configured in the main <code>otelcol-config</code> file.
    </div>

[4]: https://opentelemetry.io/docs/demo/kubernetes-deployment/

{{% /tab %}}
{{< /tabs >}}

### Ejecución de la demostración

{{< tabs >}}
{{% tab "Docker" %}}

Si tienes make instalado, puedes usar el siguiente comando para iniciar la demostración:

```shell
make start
```

Si no tienes instalado `make`, puedes utilizar directamente el comando `docker compose`:

```shell
docker compose up --force-recreate --remove-orphans --detach
```

{{% /tab %}}

{{% tab "Kubernetes" %}}

Para desplegar la aplicación de demostración en Kubernetes con Helm, ejecuta el siguiente comando:

```shell
helm install my-otel-demo open-telemetry/opentelemetry-demo --values my-values-file.yml
```

{{% /tab %}}
{{< /tabs >}}

## Navegación por la aplicación

Puedes acceder a la interfaz de usuario web de Astronomy Shop para explorar la aplicación y observar cómo se generan los datos de telemetría.

{{< tabs >}}
{{% tab "Docker" %}}

Ve a <http://localhost:8080>.

{{% /tab %}}

{{% tab "Kubernetes" %}}

1. Si estás ejecutando un clúster local, debes redirigir el puerto al proxy de frontend:

   ```shell
   kubectl port-forward svc/my-otel-demo-frontendproxy 8080:8080
   ```

2. Ve a <http://localhost:8080>.

{{% /tab %}}
{{< /tabs >}}

## Correlación de datos telemétricos

Los pasos de instrumentación utilizados en todos los servicios de la demostración se pueden encontrar
en la documentación principal de OpenTelemetry.

Puedes encontrar el lenguaje en el que se ha implementado cada servicio así como su
documentación en la [tabla de referencia de característica de lenguaje][10].

## Exploración de los datos de OpenTelemetry en Datadog

Cuando se ejecuta OTel Demo, el generador de carga incorporado simula el tráfico en la aplicación.
Al cabo de un par de segundos puedes ver los datos que llegan a Datadog.

### Catálogo de servicios

Ver todos los servicios que forman parte de OTel Demo:

1. Ve a [**APM** > **Service Catalog**][11] (APM > Catálogo de servicios).

{{< img src="/getting_started/opentelemetry/otel_demo/service_catalog.png" alt="Ver la página del Catálogo de servicios con la lista de los servicios desde la aplicación de OpenTelemetry Demo" style="width:90%;" >}}

2. Selecciona **Map** (Mapa) para ver cómo están conectados los servicios. Cambia la **Map layout** (Disposición del mapa) a **Cluster** (Clúster) o **Flow** (Flujo) para ver el mapa en distintos modos.

{{< img src="/getting_started/opentelemetry/otel_demo/service_catalog_flow.png" alt="Ver Flujo de mapa de servicios con todos los servicios conectados" style="width:90%;" >}}

3. Selecciona la vista **List** (Lista) y, a continuación, selecciona un servicio para ver un resumen del rendimiento en el panel lateral.

{{< img src="/getting_started/opentelemetry/otel_demo/service_catalog_service.png" alt="Ver un resumen de la guía de rendimiento y configuración de un servicio específico" style="width:90%;" >}}

### Trace Explorer

Explora las trazas recibidas de OTel Demo:

1. Desde **Performance** > **Setup Guidance** (Rendimiento > Guía de configuración), haz clic en **View traces** (Ver trazas) para abrir el Trace Explorer, con el servicio seleccionado aplicado como filtro.

{{< img src="/getting_started/opentelemetry/otel_demo/traces_view.png" alt="Vista de trazas con todos los tramos indexados para el servicio de pago" style="width:90%;" >}}

2. Selecciona un tramo (span) indexado para ver los detalles completos de traza de esta transacción.

{{< img src="/getting_started/opentelemetry/otel_demo/trace_flamegraph.png" alt="Vista de traza con todos los tramos que pertenecen a esa transacción específica" style="width:90%;" >}}

3. Navega por las pestañas para ver detalles adicionales:
   - Métricas de infraestructura para los servicios que informan métricas de host.
   - Métricas de tiempo de ejecución para los servicios que ya se han implementado.
   - Entradas de log correlacionadas con esta traza.
   - Enlaces de tramo vinculados a esta traza.

### Consultas de trazas

Datadog te permite filtrar y agrupar los datos de OpenTelemetry recibidos. Por ejemplo, para encontrar todas las transacciones de un usuario específico, puedes utilizar Consultas de traza.

La OTel Demo envía `user.id` como etiquetas de tramo, por lo que puedes utilizarlo para filtrar todas las transacciones activadas por el usuario:

1. Desde **Info** (Información) en el panel lateral, pasa el ratón por encima de la línea con el ID de usuario, haz clic en el icono de **engranaje** y selecciona **filter by @app.user.id:** (filtrar por @app.user.id:).

2. Elimina cualquier filtro anterior, dejando solo **@app.user.id** aplicado para ver todas las transacciones que contengan tramos con el ID de usuario especificado.

{{< img src="/getting_started/opentelemetry/otel_demo/trace_query.png" alt="Consulta de traza que filtra todos los tramos que contienen un app.user.id específico" style="width:90%;" >}}

### Rastreo de errores

La OpenTelemetry Demo incluye [flagd][5], un motor de evaluación de indicadores de características para simular escenarios de error.

1. Abre el archivo `src/flagd/demo.flagd.json` y establece `defaultVariant` en `on` para uno de los casos. Consulta la [documentación de OpenTelemetry Demo][6] para ver los casos disponibles.
2. Cuando la demostración empiece a producir errores, podrás visualizar y localizar los servicios afectados en Datadog.

{{< img src="/getting_started/opentelemetry/otel_demo/error_tracking.png" alt="Vista de rastreo de errores que muestra el error PaymentService Fail Feature Flag Enabled" style="width:90%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/open-telemetry/opentelemetry-demo
[2]: https://www.datadoghq.com/free-datadog-trial/
[3]: https://app.datadoghq.com/organization-settings/api-keys/
[5]: https://flagd.dev/
[6]: https://opentelemetry.io/docs/demo/feature-flags/
[10]: https://opentelemetry.io/docs/demo/#language-feature-reference
[11]: https://app.datadoghq.com/services