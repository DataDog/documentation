---
aliases:
- /es/opentelemetry/otlp_metrics
- /es/opentelemetry/setup/intake_endpoint/otlp_metrics
- /es/opentelemetry/setup/agentless/metrics
further_reading:
- link: https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/
  tag: Sitio externo
  text: Configuración general del SDK de OpenTelemetry
- link: https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/
  tag: Sitio externo
  text: Especificación de variables de entorno de OpenTelemetry
- link: https://opentelemetry.io/docs/specs/otel/protocol/exporter/
  tag: Sitio externo
  text: Exportador del protocolo OpenTelemetry
- link: 'https://opentelemetry.io/docs/specs/otel/metrics/sdk_exporters/otlp/ '
  tag: Sitio externo
  text: Exportador de métricas OTLP
- link: /opentelemetry/guide/otlp_delta_temporality/
  tag: Documentación
  text: Configure la temporalidad delta en OpenTelemetry
- link: /metrics/otlp/?tab=summary#mapping
  tag: Documentación
  text: Asignación de métricas OTLP en Datadog
- link: https://www.datadoghq.com/blog/otlp-metrics-api/
  tag: Blog
  text: Incorpore métricas OTLP directamente en Datadog con la nueva API de métricas
    OTLP.
title: Punto de conexión de ingesta de métricas OTLP de Datadog
---
## Descripción general {#overview}

El punto de conexión de la API de ingesta de métricas del protocolo OpenTelemetry (OTLP) de Datadog permite que las aplicaciones, las plataformas administradas y los colectores de OpenTelemetry envíen métricas a Datadog a través de OTLP HTTP.

Utilice la configuración directa en esta página cuando necesite enviar métricas sin el [Datadog Agent][2] o un colector de OpenTelemetry. Para implementaciones de colector en producción, utilice [Configurar el colector de OpenTelemetry][1].

Este punto de conexión es particularmente útil en los siguientes escenarios:

- **Distribuciones de OpenTelemetry que utilizan exportadores OTLP**: Algunas distribuciones de OpenTelemetry, como [AWS Distro for OpenTelemetry (ADOT)][8], utilizan un exportador OTLP unificado. El punto de conexión de métricas OTLP permite que estas distribuciones envíen métricas a Datadog.

- **Restricciones técnicas al usar un Agent o un colector**: La ingesta directa es compatible con servicios administrados de terceros, aplicaciones en dispositivos de clientes y otros entornos donde ejecutar software adicional no es práctico.

<div class="alert alert-info">Si está enviando métricas desde una plataforma administrada (Cloudflare, Vercel, Heroku y otras), consulte <a href="/opentelemetry/setup/otlp_ingest/managed_platforms/">Plataformas administradas</a> para obtener la configuración correcta del punto de conexión.</div>

## Configuración {#configuration}

Para exportar datos de métricas OTLP al punto de conexión de ingesta de métricas OTLP de Datadog:

1. [Asegúrese de que solo se envíen métricas delta](#ensure-only-delta-metrics-are-sent).
1. [Configure el exportador HTTP OTLP](#configure-the-exporter).
   - Establezca el punto de conexión de ingesta de métricas OTLP de Datadog.
   - Configure los encabezados HTTP requeridos.
1. (Opcional) [Establezca el `dd-otel-metric-config` encabezado HTTP](#optional-configure-the-metric-translator) para configurar el comportamiento del traductor de métricas.

<div class="alert alert-info">A partir del 1 de septiembre de 2026, el punto de conexión de ingesta de métricas OTLP almacena histogramas exponenciales y de cubetas explícitas de forma nativa, manteniendo sus cubetas originales. Datadog calcula los percentiles a partir de esas cubetas. Metrics Summary y Metrics Explorer muestran el tipo de cada histograma: histograma explícito o histograma exponencial. Las consultas de distribución en sus métricas de histograma funcionan sin cambios. El punto de conexión ignora los <code>histograms</code> y <code>summaries</code> campos en el <a href="#optional-configure-the-metric-translator"><code>dd-otel-metric-config</code> encabezado</a>.</div>

### Configure el exportador {#configure-the-exporter}

Para enviar datos OTLP al punto de conexión de ingesta de métricas OTLP de Datadog, utilice el exportador HTTP de OTLP. Para métricas, el exportador admite tanto HTTP Protobuf como HTTP JSON. Se recomienda HTTP Protobuf para un mejor rendimiento.

El proceso difiere dependiendo de si está utilizando instrumentación automática o manual para OpenTelemetry.

<div class="alert alert-info">Según su <a href="/getting_started/site/">sitio de Datadog</a>, que es {{< region-param key=dd_datacenter code="true" >}}: Reemplace su punto de conexión con {{< region-param key="otlp_metrics_endpoint" code="true" >}} en los siguientes ejemplos.</div>

#### Asegúrese de que solo se envíen métricas delta {#ensure-only-delta-metrics-are-sent}

El punto de conexión de ingesta de métricas OTLP de Datadog solo acepta métricas **delta**. Si intenta enviar métricas **acumulativas** (el valor predeterminado en la mayoría de los SDK), recibirá un error. Asegúrese de configurar su OpenTelemetry SDK o Collector para producir métricas delta.

- Para [lenguajes compatibles][7], establezca la variable de entorno `OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` en `delta`.
- De lo contrario, establezca la preferencia de temporalidad en su código. Para obtener más información, lea [Configurar la temporalidad delta en OpenTelemetry][5].

#### Instrumentación automática {#automatic-instrumentation}

Si está utilizando [instrumentación automática de OpenTelemetry][3], establezca las siguientes variables de entorno:

```shell
export OTEL_EXPORTER_OTLP_METRICS_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT="{{< region-param key="otlp_metrics_endpoint" >}}"
export OTEL_EXPORTER_OTLP_METRICS_HEADERS="dd-api-key=${DD_API_KEY}"
export OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE="delta"
```

#### Instrumentación manual {#manual-instrumentation}

Si está utilizando instrumentación manual con SDK de OpenTelemetry, configure el exportador OTLP HTTP Protobuf mediante programación.

{{< tabs >}}
{{% tab "JavaScript" %}}

El exportador de JavaScript es [`@opentelemetry/exporter-metrics-otlp-proto`][100]. Para configurar el exportador, utilice el siguiente fragmento de código:

```javascript
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-proto');

const exporter = new OTLPMetricExporter({
  url: 'https://otlp.datadoghq.com/v1/metrics',
  temporalityPreference: AggregationTemporalityPreference.DELTA, // Ensure delta temporality
  headers: {
    'dd-api-key': process.env.DD_API_KEY,
    'dd-otel-metric-config': '{"resource_attributes_as_tags": true}',
  },
});
```

[100]: https://www.npmjs.com/package/@opentelemetry/exporter-metrics-otlp-proto

{{% /tab %}}

{{% tab "Java" %}}

El exportador de Java es [`OtlpHttpMetricExporter`][200]. Para configurar el exportador, utilice el siguiente fragmento de código:

```java
import io.opentelemetry.exporter.otlp.http.metrics.OtlpHttpMetricExporter;

OtlpHttpMetricExporter exporter = OtlpHttpMetricExporter.builder()
    .setEndpoint("https://otlp.datadoghq.com/v1/metrics")
    .setAggregationTemporalitySelector(
      AggregationTemporalitySelector.deltaPreferred()) // Ensure delta temporality
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-metric-config", "{\"resource_attributes_as_tags\": true}")
    .build();
```

[200]: https://javadoc.io/doc/io.opentelemetry/opentelemetry-exporter-otlp-http-metrics/

{{% /tab %}}

{{% tab "Go" %}}

El exportador de Go es [`otlpmetrichttp`][300]. Para configurar el exportador, utilice el siguiente fragmento de código:

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp"

metricExporter, err := otlpmetrichttp.New(
  ctx,
  otlpmetrichttp.WithEndpoint("otlp.datadoghq.com"),
  otlpmetrichttp.WithURLPath("/v1/metrics"),
      otlpmetrichttp.WithTemporalitySelector(deltaSelector), // Ensure delta temporality
  otlpmetrichttp.WithHeaders(
    map[string]string{
      "dd-api-key": os.Getenv("DD_API_KEY"),
      "dd-otel-metric-config": "{\"resource_attributes_as_tags\": true}",
    }),
)
```

[300]: https://pkg.go.dev/go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp

{{% /tab %}}

{{% tab "Python" %}}

El exportador de Python es [`OTLPMetricExporter`][400]. Para configurar el exportador, utilice el siguiente fragmento de código:

```python
from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter

exporter = OTLPMetricExporter(
    endpoint="https://otlp.datadoghq.com/v1/metrics",
    preferred_temporality=deltaTemporality, # Ensure delta temporality
    headers={
        "dd-api-key": os.environ.get("DD_API_KEY"),
        "dd-otel-metric-config": '{"resource_attributes_as_tags": true}',
    },
)
```

[400]: https://pypi.org/project/opentelemetry-exporter-otlp-proto-http/

{{% /tab %}}
{{< /tabs >}}

### (Opcional) Configure el traductor de métricas {#optional-configure-the-metric-translator}

Utilice el encabezado `dd-otel-metric-config` para configurar cómo se traducen y envían las métricas a Datadog. El encabezado JSON contiene los siguientes campos:

`resource_attributes_as_tags`
: **Tipo**: Booleano <br>
**Predeterminado**: `false` <br>
Si se establece en `true`, transforma todos los atributos de recursos en etiquetas de métricas, que luego se convierten en etiquetas.

`instrumentation_scope_metadata_as_tags`
: **Tipo**: Booleano <br>
**Predeterminado**: `false` <br>
Si se establece en `true`, agrega el nombre y la versión del contexto de instrumentación que creó una métrica a las etiquetas de la métrica.

`histograms.mode`
: **Tipo**: Cadena <br>
**Obsoleto**: Se ignora a partir del 1 de septiembre de 2026. Datadog almacena histogramas de forma nativa independientemente de esta configuración. <br>
Modo para exportar histogramas. Los valores válidos son:
  - `distributions`: envía histogramas como distribuciones de Datadog.
  - `counters`: envía histogramas como conteos de Datadog, una métrica por cubeta.
  - `nobuckets`: no envía métricas de histograma de cubeta.

`histograms.send_aggregation_metrics`
: **Tipo**: Booleano <br>
**Obsoleto**: Se ignora a partir del 1 de septiembre de 2026. Datadog no escribe métricas `.sum`, `.count`, `.min` y `.max` por separado. Consulte la métrica de histograma con la agregación coincidente en su lugar, como `count:<METRIC_NAME>{*}.as_count()`. <br>
Si se establece en `true`, escribe métricas `.sum`, `.count`, `.min` y `.max` adicionales para los histogramas.

`summaries.mode`
: **Tipo**: Cadena <br>
**Obsoleto**: Se ignora a partir del 1 de septiembre de 2026. <br>
Modo para exportar resúmenes OTLP. Los valores válidos son:
  - `noquantiles`: no envía métricas `.quantile`. Las métricas `.sum` y `.count` se siguen enviando.
  - `gauges`: envía métricas `.quantile` como indicadores etiquetados por el cuantil.

Por ejemplo:

```json
{
  "resource_attributes_as_tags": true,
  "instrumentation_scope_metadata_as_tags": true
}
```

## OpenTelemetry Collector {#opentelemetry-collector}

Si su distribución de OpenTelemetry Collector no incluye todos los componentes utilizados por la configuración de Collector recomendada por Datadog, configure el exportador HTTP OTLP en su propia distribución:

Estos ejemplos utilizan identificadores de componentes de OpenTelemetry Collector Contrib v0.154.0. Para otras versiones o distribuciones, utilice los identificadores que admita esa distribución.

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318

processors:
  cumulativetodelta: {}

exporters:
  otlp_http:
    metrics_endpoint: {{< region-param key="otlp_metrics_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      dd-otel-metric-config: '{"resource_attributes_as_tags": true}'

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [cumulativetodelta]
      exporters: [otlp_http]
```

Este ejemplo convierte las métricas acumulativas a la temporalidad delta requerida por el punto de conexión de ingesta. Agregue los receptores y procesadores requeridos por su distribución de Collector.

Para una implementación en producción que utilice OpenTelemetry Collector Contrib, utilice la [configuración recomendada de OpenTelemetry Collector][1]. También configura el procesamiento por lotes de la cola de envío, la detección de recursos, el etiquetado de métricas y el enriquecimiento de metadatos del servidor.

## Solución de problemas {#troubleshooting}

### Error: 403 Forbidden {#error-403-forbidden}

Si recibe un error `403 Forbidden` al enviar métricas al punto de conexión de ingesta de métricas OTLP de Datadog, esto indica uno de los siguientes problemas:

- La URL del punto de conexión es incorrecta para su organización.  
   **Solución**: Utilice la URL del punto de conexión correcta para su organización. Su sitio es {{< region-param key=dd_datacenter code="true" >}}, por lo que debe utilizar el {{< region-param key="otlp_metrics_endpoint" code="true" >}} punto de conexión.

### Error: 413 Request Entity Too Large {#error-413-request-entity-too-large}

Si recibe un error `413 Request Entity Too Large` al enviar métricas al punto de conexión de ingesta de métricas OTLP de Datadog, indica que el tamaño de la carga útil enviada por el exportador OTLP excede el límite de 512 KiB (comprimido) del punto de conexión de ingesta de métricas de Datadog.

Este error generalmente ocurre cuando el SDK de OpenTelemetry agrupa demasiados datos de telemetría en una sola carga útil de solicitud.

**Solución**: Reduzca el tamaño del lote de exportación del procesador por lotes del SDK. Por ejemplo, en el OpenTelemetry Java SDK, puede ajustar `BatchMetricExportProcessor`.

### Problema: Puntos de datos faltantes o valores de métricas inferiores a los esperados.{#issue-missing-datapoints-or-lower-than-expected-metric-values}

Si nota puntos de datos faltantes o valores de métricas inferiores a los esperados, puede deberse a que está enviando varios puntos de datos para una métrica que tienen la misma marca de tiempo (en segundos) y las mismas dimensiones. En tales casos, Datadog solo acepta el último punto de datos y los puntos de datos anteriores se descartan (el último en escribir gana). Datadog requiere que los datos de series temporales de una métrica sean únicos en el contexto de {timestamp + dimensions}.

**Solución**: Asegúrese de que sus puntos de datos de una métrica determinada en una marca de tiempo estén etiquetados de forma única. Por ejemplo, si envía varios puntos de datos para una métrica simultáneamente desde varias invocaciones de AWS Lambda, asegúrese de incluir identificadores únicos (como el ARN de Lambda) como atributos de recurso en sus métricas. Utilice la opción `resource_attributes_as_tags` para agregar estos atributos de recurso como etiquetas de métricas.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/collector_exporter/
[2]: /es/opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/reference/specification/glossary/#automatic-instrumentation
[5]: /es/opentelemetry/guide/otlp_delta_temporality/
[6]: /es/metrics/otlp/?tab=summary#mapping
[7]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables
[8]: https://aws-otel.github.io/docs/getting-started/lambda