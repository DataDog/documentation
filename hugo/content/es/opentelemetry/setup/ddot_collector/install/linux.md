---
code_lang: linux
code_lang_weight: 4
further_reading:
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: Documentación
  text: Utilice componentes personalizados de OpenTelemetry con el Datadog Agent
title: Instale el DDOT Collector en Linux
type: multi-code-lang
---
## Descripción general {#overview}

Siga esta guía para instalar la distribución de OpenTelemetry de Datadog (DDOT) Collector en servidores bare-metal y máquinas virtuales basados en Linux.

## Requisitos {#requirements}

Para completar esta guía, necesita lo siguiente:

**Una cuenta de Datadog**:
1. [Cree una cuenta de Datadog][1] si no tiene una.
1. Busque o cree su [clave de Datadog API][2].

**Software**:
- Una distribución de Linux compatible (por ejemplo, Debian, Ubuntu, CentOS, RHEL, Fedora, SUSE).
- `curl` debe estar instalado para usar el script de instalación de una sola línea.

**Red**:

{{% otel-network-requirements %}}

## Instale el Datadog Agent con el OpenTelemetry Collector {#install-the-datadog-agent-with-opentelemetry-collector}

<div class="alert alert-info">Esta instalación es necesaria tanto para las configuraciones de Datadog SDK + DDOT como de OpenTelemetry SDK + DDOT. Aunque el Datadog SDK implementa la API de OpenTelemetry, todavía requiere el DDOT Collector para procesar y reenviar métricas y registros de OTLP.</div>

### Instalación {#installation}

Para instalar el DDOT Collector en un servidor Linux, utilice el siguiente comando de instalación de una sola línea:

```shell
DD_API_KEY=<DATADOG_API_KEY> DD_SITE="{{< region-param key="dd_site" >}}" DD_OTELCOLLECTOR_ENABLED=true DD_AGENT_MAJOR_VERSION=7 bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_agent7.sh)"
```

Este comando instala tanto el paquete principal del Datadog Agent como el DDOT Collector que se ejecuta junto a él.

**Nota**: Para el Agent v7.78+, si el Datadog Agent ya está instalado en el servidor, puede instalar el DDOT Collector por separado utilizando el siguiente comando:

```shell
sudo datadog-agent otel install
```

### Validación {#validation}


Ejecute el [comando de estado][3] del Agent para verificar la instalación.

```shell
sudo datadog-agent status
```
Una instalación exitosa devuelve un informe de estado del Agent que comienza con información del Agent como esta:

```text
====================
Agent (v7.x.x)
====================
  Status date: 2025-08-22 18:35:17.449 UTC (1755887717449)
  Agent start: 2025-08-22 18:16:27.004 UTC (1755886587004)
  Pid: 2828211
  Go Version: go1.24.6
  Python Version: 3.12.11
  Build arch: amd64
  Agent flavor: agent
  FIPS Mode: not available
  Log Level: info
```

También habrá una sección de estado {{< ui >}}OTel Agent{{< /ui >}} que incluye información de OpenTelemetry:

```text
==========
OTel Agent
==========

  Status: Running
  Agent Version: 7.x.x
  Collector Version: v0.129.0

  Receiver
  ==========================
    Spans Accepted: 0
    Metric Points Accepted: 1055
    Log Records Accepted: 0

  Exporter
  ==========================
    Spans Sent: 0
    Metric Points Sent: 1055
    Log Records Sent: 0
```

## Configure el Datadog Agent {#configure-the-datadog-agent}

### Habilite el DDOT Collector {#enable-the-ddot-collector}
El archivo de configuración para el Datadog Agent se instala automáticamente en `/etc/datadog-agent/datadog.yaml`. El script de instalación agrega los siguientes ajustes de configuración a `/etc/datadog-agent/datadog.yaml` para habilitar el DDOT Collector:

{{< code-block lang="yaml" filename="datadog-agent.yaml" collapsible="true" >}}
otelcollector:
  enabled: true
agent_ipc:
  port: 5009
  config_refresh_interval: 60
{{< /code-block >}}

DDOT vincula automáticamente el OpenTelemetry Collector a los puertos 4317 (grpc) y 4318 (http) de forma predeterminada.

### (Opcional) Habilite funciones adicionales de Datadog {#optional-enable-additional-datadog-features}

<div class="alert alert-warning">Habilitar estas funciones puede generar cargos adicionales. Revise la <a href="https://www.datadoghq.com/pricing/">página de precios</a> y hable con su Customer Success Manager antes de continuar.</div>

Para obtener una lista completa de las opciones disponibles, consulte el archivo de referencia totalmente comentado en `/etc/datadog-agent/datadog.yaml.example`. Alternativamente, consulte el [archivo de configuración de ejemplo del Agent para Linux][12] en GitHub.

Al habilitar funciones adicionales de Datadog, utilice siempre los archivos de configuración del Agente de Datadog o del OpenTelemetry Collector en lugar de depender de las variables de entorno de Datadog.

## Configure el OpenTelemetry Collector {#configure-the-opentelemetry-collector}

El script de instalación proporciona una configuración de ejemplo del OpenTelemetry Collector en `/etc/datadog-agent/otel-config.yaml` que puede utilizar como punto de partida.

Después de editar `datadog.yaml` o `otel-config.yaml`, [reinicie el Agent][14] para aplicar los cambios.

{{% collapse-content title="Archivo otel-config.yaml de ejemplo de la instalación" level="p" %}}
El `otel-config.yaml` de ejemplo de la instalación se verá parecido a esto:
{{< code-block lang="yaml" filename="otel-config.yaml" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 60s
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
      key: <DATADOG_API_KEY>
      site: <DATADOG_SITE>
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
      compute_top_level_by_span_kind: true
      peer_tags_aggregation: true
      compute_stats_by_span_kind: true
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
{{% /collapse-content %}}

#### Componentes clave {#key-components}

Para enviar datos de telemetría a Datadog, los siguientes componentes se definen en la configuración:

{{< img src="/opentelemetry/embedded_collector/components-3.jpg" alt="Diagrama que representa el patrón de implementación del Agent" style="width:100%;" >}}

##### Conector de Datadog {#datadog-connector}

El [conector de Datadog][4] calcula las métricas de traza de Datadog APM.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
connectors:
  datadog/connector:
    traces:
{{< /code-block >}}

##### Datadog Exporter {#datadog-exporter}

El [exportador de Datadog][5] exporta trazas, métricas y registros a Datadog.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
exporters:
  datadog:
    api:
      key: <DATADOG_API_KEY>
      site: <DATADOG_SITE>
    sending_queue:
      batch:
        flush_timeout: 10s
{{< /code-block >}}

**Nota**: Si `key` no se especifica o se establece como un secreto, o si `site` no se especifica, el sistema utiliza los valores de la configuración principal del Agent. De forma predeterminada, el Agent principal establece el sitio en `datadoghq.com` (US1).

##### Receptor de Prometheus {#prometheus-receiver}

El [receptor de Prometheus][6] recopila métricas de estado del OpenTelemetry Collector para la canalización de métricas.

{{< code-block lang="yaml" filename="otel-config.yaml" disable_copy="false" collapsible="true" >}}
receivers:
  prometheus:
    config:
      scrape_configs:
        - job_name: "otelcol"
          scrape_interval: 60s
          static_configs:
            - targets: ["0.0.0.0:8888"]
{{< /code-block >}}

Para obtener más información, consulte la documentación de [Métricas de estado del Collector][11].

## Envíe su telemetría a Datadog {#send-your-telemetry-to-datadog}

Para enviar sus datos de telemetría a Datadog:

1. [Instrumente su aplicación](#instrument-the-application)
2. [Configure la aplicación](#configure-the-application)
3. [Correlacione los datos de observabilidad](#correlate-observability-data)
4. [Ejecute su aplicación](#run-the-application)

### Instrumente la aplicación {#instrument-the-application}

Instrumente su aplicación [usando la API de OpenTelemetry][7].

{{% collapse-content title="Ejemplo de aplicación instrumentada con la API de OpenTelemetry" level="p" %}}
Como ejemplo, puede usar la [aplicación de muestra Calendar][8] que ya está instrumentada para usted. El siguiente código instrumenta el método [CalendarService.getDate()][9] usando las anotaciones y la API de OpenTelemetry:
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

Su aplicación debe enviar datos al DDOT Collector en el mismo servidor. Asegúrese de que la variable de entorno `OTEL_EXPORTER_OTLP_ENDPOINT` esté configurada en su aplicación.

Si utiliza la aplicación de ejemplo, [`run-otel-local.sh`][13] configura las variables de entorno necesarias y ejecuta la aplicación:
{{< code-block lang="bash" filename="run-otel-local.sh" disable_copy="true" collapsible="true" >}}
export OTEL_METRICS_EXPORTER="otlp"
export OTEL_LOGS_EXPORTER="otlp"
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4317"
export OTEL_EXPORTER_OTLP_PROTOCOL="grpc"
{{< /code-block >}}

### Correlacione los datos de observabilidad {#correlate-observability-data}

[Unified service tagging][10] vincula los datos de observabilidad en Datadog para que pueda navegar a través de métricas, trazas y registros con etiquetas consistentes.


En entornos bare-metal, `env`, `service` y `version` se configuran a través de las variables de entorno de los atributos de recursos de OpenTelemetry. El DDOT Collector detecta esta configuración de etiquetado y la aplica a los datos que recopila de las aplicaciones.

En la aplicación de ejemplo, esto se hace en `run-otel-local.sh`:
{{< code-block lang="bash" filename="run-otel-local.sh" disable_copy="true" collapsible="true" >}}
export OTEL_RESOURCE_ATTRIBUTES="service.name=my-calendar-service,service.version=1.0,deployment.environment.name=otel-test,host.name=calendar-host"
{{< /code-block >}}

### Ejecute la aplicación {#run-the-application}

Vuelva a implementar su aplicación para aplicar los cambios realizados en sus variables de entorno. Una vez que la configuración actualizada esté activa, el unified service tagging estará completamente habilitado para sus métricas, trazas y registros.

## Explore los datos de observabilidad en Datadog {#explore-observability-data-in-datadog}

Utilice Datadog para explorar los datos de observabilidad de su aplicación.

### Fleet Automation {#fleet-automation}

Explore las configuraciones de su Datadog Agent, DDOT y upstream OpenTelemetry Collector.

{{< img src="/opentelemetry/embedded_collector/fleet_automation.png" alt="Revise la configuración de su Agent y Collector desde la página de Fleet Automation." style="width:100%;" >}}

### Monitoreo de infraestructura {#infrastructure-monitoring}

Visualice las métricas de tiempo de ejecución y de infraestructura para visualizar, monitorear y medir el rendimiento de sus servidores.

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
[3]: /es/agent/configuration/agent-commands/#agent-status-and-information
[4]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/connector/datadogconnector
[5]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/exporter/datadogexporter
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/prometheusreceiver
[7]: /es/opentelemetry/instrument/api_support
[8]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[9]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[10]: /es/opentelemetry/correlate/
[11]: /es/opentelemetry/integrations/collector_health_metrics/
[12]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/example/datadog-agent_linux.yaml.example
[13]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/run-otel-local.sh
[14]: /es/agent/configuration/agent-commands/#restart-the-agent