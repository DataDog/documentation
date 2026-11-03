---
aliases:
- /es/opentelemetry/otlp_endpoint
- /es/opentelemetry/setup/intake_endpoint/otlp_traces
- /es/opentelemetry/setup/agentless/traces
further_reading:
- link: https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/
  tag: Sitio externo
  text: Configuración general del SDK de OpenTelemetry
- link: https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/
  tag: Sitio externo
  text: Especificación de variables de entorno de OpenTelemetry
- link: 'https://opentelemetry.io/docs/reference/specification/protocol/exporter/ '
  tag: Sitio externo
  text: Exportador del protocolo OpenTelemetry
title: Punto de conexión de ingesta de trazas OTLP de Datadog
---
## Descripción general {#overview}

El punto de conexión de la API de ingesta de trazas del protocolo OpenTelemetry (OTLP) de Datadog permite que las aplicaciones, las plataformas administradas y los colectores de OpenTelemetry envíen trazas a Datadog a través de OTLP HTTP.

Utilice la configuración directa en esta página cuando necesite enviar trazas sin el [Datadog Agent][2] o un colector de OpenTelemetry. Para implementaciones de colector en producción, utilice [Configurar el colector de OpenTelemetry][1].

Para cargas de trabajo Serverless, consulte [OTLP Intake for Serverless][8]. Para plataformas administradas como Cloudflare, Vercel y Heroku, consulte [Ingesta OTLP para plataformas administradas][9].

<div class="alert alert-info">El punto de conexión de ingesta de trazas OTLP admite <code>http/protobuf</code> y <code>http/json</code> codificación. <code>grpc</code> no es compatible.</div>

## Configuración {#configuration}

Para exportar datos OTLP al punto de conexión de ingesta de trazas OTLP de Datadog:

1. [Configure el exportador OTLP HTTP Protobuf](#configure-the-exporter).
   - Establezca el punto de conexión de ingesta de trazas OTLP de Datadog.
   - Configure los encabezados HTTP requeridos.
1. (Opcional) [Establezca el `dd-otel-span-mapping`encabezado HTTP](#optional-map-or-filter-span-names) para asignar o filtrar tramos.

### Configure el exportador {#configure-the-exporter}

Para enviar datos OTLP al punto de conexión de ingesta de trazas OTLP de Datadog, necesita usar el exportador OTLP HTTP Protobuf. El proceso difiere dependiendo de si está utilizando instrumentación automática o manual para OpenTelemetry.

Las [métricas de traza][7] no se calculan de forma predeterminada para las trazas enviadas directamente al punto de conexión de ingesta de trazas OTLP de Datadog. Los siguientes ejemplos incluyen `compute_stats=true` para habilitar las métricas de traza.

#### Instrumentación automática {#automatic-instrumentation}

Si está utilizando [instrumentación automática de OpenTelemetry][3], establezca las siguientes variables de entorno:

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="{{< region-param key="otlp_trace_endpoint" >}}"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY},compute_stats=true"
```

#### Instrumentación manual {#manual-instrumentation}

Si está utilizando instrumentación manual con SDK de OpenTelemetry, configure el exportador OTLP HTTP Protobuf mediante programación.

<div class="alert alert-info">Según su <a href="/getting_started/site/">sitio de Datadog</a>, que es {{< region-param key=dd_datacenter code="true" >}}, reemplace <code>${YOUR_ENDPOINT}</code> con {{< region-param key="otlp_trace_endpoint" code="true" >}}.</div>

{{< tabs >}}
{{% tab "JavaScript" %}}

El exportador de JavaScript es [`exporter-trace-otlp-proto`][100]. Para configurar el exportador, utilice el siguiente fragmento de código:

```javascript
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto');  // OTLP http/protobuf exporter

const exporter = new OTLPTraceExporter({
  url: '${YOUR_ENDPOINT}', // Replace this with the correct endpoint
  headers: {
    'dd-api-key': process.env.DD_API_KEY,
    'dd-otel-span-mapping': '{span_name_as_resource_name: true}',
    'compute_stats': 'true',
  },
});
```
[100]: https://www.npmjs.com/package/@opentelemetry/exporter-trace-otlp-proto

{{% /tab %}}

{{% tab "Java" %}}

El exportador de Java es [`OtlpHttpSpanExporter`][200]. Para configurar el exportador, utilice el siguiente fragmento de código:

```java
import io.opentelemetry.exporter.otlp.http.trace.OtlpHttpSpanExporter;

OtlpHttpSpanExporter exporter = OtlpHttpSpanExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}") // Replace this with the correct endpoint
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-span-mapping", "{span_name_as_resource_name: true}")
    .addHeader("compute_stats", "true")
    .build();
```

[200]: https://javadoc.io/doc/io.opentelemetry/opentelemetry-exporter-otlp-http-trace/

{{% /tab %}}
{{% tab "Go" %}}

El exportador de Go es [`otlptracehttp`][300]. Para configurar el exportador, utilice el siguiente fragmento de código:

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp"

traceExporter, err := otlptracehttp.New(
	ctx,
	otlptracehttp.WithEndpoint("${YOUR_ENDPOINT}"), // Replace this with the correct endpoint
	otlptracehttp.WithURLPath("/v1/traces"),
	otlptracehttp.WithHeaders(
		map[string]string{
			"dd-api-key": os.Getenv("DD_API_KEY"),
			"dd-otel-span-mapping": "{span_name_as_resource_name: true}",
			"compute_stats": "true",
		}),
)
```

[300]: http://go.opentelemetry.io/otel/exporters/otlp/otlptrace/otlptracehttp

{{% /tab %}}
{{% tab "Python" %}}

El exportador de Python es [`OTLPSpanExporter`][400]. Para configurar el exportador, utilice el siguiente fragmento de código:

```python
from opentelemetry.exporter.otlp.proto.http.trace_exporter import OTLPSpanExporter

exporter = OTLPSpanExporter(
    endpoint="${YOUR_ENDPOINT}", # Replace this with the correct endpoint
    headers={
        "dd-api-key": os.environ.get("DD_API_KEY"),
        "dd-otel-span-mapping": "{span_name_as_resource_name: true}",
        "compute_stats": "true",
    },
)
```

[400]: https://pypi.org/project/opentelemetry-exporter-otlp-proto-http/

{{% /tab %}}
{{< /tabs >}}

### (Opcional) Asigne o filtre nombres de tramos {#optional-map-or-filter-span-names}

Utilice el encabezado `dd-otel-span-mapping` para configurar la asignación y el filtrado de tramos. El encabezado JSON contiene los siguientes campos:

- `ignore_resources`: Una lista de expresiones regulares para deshabilitar trazas según su nombre de recurso.
- `span_name_remappings`: Un mapa de nombres de tramos de Datadog a nombres preferidos.
- `span_name_as_resource_name`: Especifica si se debe usar el nombre del tramo de OpenTelemetry como el nombre de la operación del tramo de Datadog (predeterminado: true). Si es false, el nombre de la operación se deriva de una combinación del nombre del contexto de instrumentación y el tipo de tramo.

Por ejemplo:

```json
{
  "span_name_as_resource_name":false,
  "span_name_remappings":{
    "io.opentelemetry.javaagent.spring.client":"spring.client"
  },
  "ignore_resources":[
    "io.opentelemetry.javaagent.spring.internal"
  ]
}
```
## OpenTelemetry Collector {#opentelemetry-collector}

Configure la [configuración recomendada de OpenTelemetry Collector][10] para exportar trazas a este punto de conexión y generar métricas de traza de APM antes del muestreo.

## Solución de problemas {#troubleshooting}

### Error: 403 Forbidden {#error-403-forbidden}

Si recibe un error `403 Forbidden` al enviar trazas al punto de conexión de ingesta de trazas OTLP de Datadog, verifique que el punto de conexión coincida con su sitio de Datadog. Su sitio es {{< region-param key=dd_datacenter code="true" >}}, así que use el {{< region-param key="otlp_trace_endpoint" code="true" >}} punto de conexión.

### Error: 413 Request Entity Too Large {#error-413-request-entity-too-large}

Si recibe un error `413 Request Entity Too Large` al enviar trazas al punto de conexión de ingesta de trazas OTLP de Datadog, indica que el tamaño de la carga útil enviada por el exportador OTLP excede el límite de 15 MiB (sin comprimir) del punto de conexión de ingesta de trazas de Datadog.

Este error generalmente ocurre cuando el SDK de OpenTelemetry agrupa demasiados datos de telemetría en una sola carga útil de solicitud.

**Solución**: Reduzca el tamaño del lote de exportación del procesador de tramos por lotes del SDK. Aquí hay un ejemplo de cómo modificar el `BatchSpanProcessorBuilder` en el SDK de Java de OpenTelemetry:

```java
CopyBatchSpanProcessor batchSpanProcessor =
    BatchSpanProcessor
        .builder(exporter)
        .setMaxExportBatchSize(10)  // Default is 512
        .build();
```
Ajuste el valor de `setMaxExportBatchSize` según sus necesidades. Un valor más pequeño resulta en exportaciones más frecuentes con cargas útiles más pequeñas, lo que reduce la probabilidad de exceder el límite de 15 MiB.

### Advertencia: \"traces export: failed … 202 Accepted\" en Go {#warning-traces-export-failed-202-accepted-in-go}


Si está utilizando el SDK de Go de OpenTelemetry y ve un mensaje de advertencia similar a `traces export: failed … 202 Accepted`, se debe a un problema conocido en el exportador HTTP OTLP de OpenTelemetry para Go.

El exportador HTTP OTLP de OpenTelemetry para Go trata cualquier código de estado HTTP que no sea 200 como un error, incluso si la exportación tiene éxito ([Issue 3706][5]). En contraste, otros SDK de OpenTelemetry consideran cualquier código de estado en el rango [200, 300) como un éxito. El punto de conexión de ingesta de trazas OTLP de Datadog devuelve un código de estado `202 Accepted` para las exportaciones exitosas.

La comunidad de OpenTelemetry aún está discutiendo si otros códigos de estado `2xx` deben tratarse como éxitos ([Issue 3203][6]).

**Solución**: Si está utilizando el punto de conexión de ingesta de trazas OTLP de Datadog con el SDK de OpenTelemetry para Go, puede ignorar este mensaje de advertencia de forma segura. Sus trazas se están exportando correctamente a pesar de la advertencia.

### Problema: Nombres de operación de tramo inesperados {#issue-unexpected-span-operation-names}

Al utilizar el punto de conexión de ingesta de trazas OTLP de Datadog, es posible que note que los nombres de las operaciones de tramo son diferentes a los generados al utilizar el Datadog Agent o el OpenTelemetry Collector.

El punto de conexión de ingesta de trazas OTLP de Datadog tiene la opción `span_name_as_resource_name` establecida en `true` de forma predeterminada. Esto significa que Datadog utiliza el nombre del tramo de OpenTelemetry como nombre de la operación. Por el contrario, el Datadog Agent y el OpenTelemetry Collector tienen esta opción establecida en `false` de forma predeterminada.

Cuando `span_name_as_resource_name` se establece en `false`, el nombre de la operación se deriva de una combinación del nombre del contexto de instrumentación y el tipo de tramo. Por ejemplo, un nombre de operación podría aparecer como `opentelemetry.client`.

**Solución**: Si desea deshabilitar la opción `span_name_as_resource_name` en el punto de conexión de ingesta de trazas OTLP de Datadog para que coincida con el comportamiento del Datadog Agent o del OpenTelemetry Collector, siga estos pasos:

1. Consulte [Asignar o filtrar nombres de tramo](#optional-map-or-filter-span-names) en este documento.
1. Establezca la opción `span_name_as_resource_name` en `false` en el encabezado `dd-otel-span-mapping`.

Por ejemplo:

```json
jsonCopy{
  "span_name_as_resource_name": false,
  ...
}
```

Esto garantiza que los nombres de las operaciones de tramo sean consistentes en el punto de conexión de ingesta de trazas OTLP de Datadog, el Datadog Agent y el OpenTelemetry Collector.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/collector_exporter/
[2]: /es/opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/specs/otel/glossary/#automatic-instrumentation
[5]: https://github.com/open-telemetry/opentelemetry-go/issues/3706
[6]: https://github.com/open-telemetry/opentelemetry-specification/issues/3203
[7]: /es/tracing/metrics/
[8]: /es/opentelemetry/setup/otlp_ingest/serverless/
[9]: /es/opentelemetry/setup/otlp_ingest/managed_platforms/
[10]: /es/opentelemetry/setup/collector_exporter/