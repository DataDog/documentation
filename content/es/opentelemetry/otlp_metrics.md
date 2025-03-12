---
further_reading:
- link: https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/
  tag: Sitio externo
  text: Configuración general de OpenTelemetry SDK
- link: https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/
  tag: Sitio externo
  text: Especificación de variable de entorno de OpenTelemetry
- link: https://opentelemetry.io/docs/specification/protocol/exporter/
  tag: Sitio externo
  text: Exportador de protocolo de OpenTelemetry
- link: 'https://opentelemetry.io/docs/specs/otel/metrics/sdk_exporters/otlp/ '
  tag: Sitio externo
  text: Exportador de métricas de OTLP
- link: /opentelemetry/guide/otlp_delta_temporality/
  tag: Documentación
  text: Configurar la temporalidad delta en OpenTelemetry
- link: /metrics/otlp/?tab=summary#mapping
  tag: Documentación
  text: Asignación de métricas de OTLP en Datadog
private: true
title: Entrada de punto de conexión de métricas de Datadog OTLP
---

{{< callout header="false" btn_hidden="true">}}
  El punto de conexión de entrada de métricas de Datadog OTLP está en la vista previa.
{{< /callout >}}

{{< site-region region="ap1,gov" >}}
<div class="alert alert-warning">El punto de conexión de entrada de métricas de Datadog OTLP no es compatible con el <a href="/getting_started/site">sitio Datadog </a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

## Información general

El punto de conexión de la API de entrada de las métricas del protocolo de OpenTelemetry (OTLP) de Datadog te permite enviar métricas directamente a Datadog. Con esta función, no necesitas ejecutar el [Datadog Agent ][2] ni el [OpenTelemetry Collector + exportador de Datadog][1].

Es posible que prefieras esta opción si buscas una configuración sencilla y deseas enviar métricas directamente a Datadog sin utilizar el Datadog Agent ni OpenTelemetry Collector.

Este punto de conexión es especialmente útil en las siguientes situaciones:

- **Distribuciones de OpenTelemetry incompatibles con el exportador de Datadog**: Algunas distribuciones de OpenTelemetry, como la [AWS Distro for OpenTelemetry (ADOT)][8], han eliminado los exportadores específicos del proveedor en favor de un exportador OTLP unificado. El punto de conexión de métricas de OTLP permite que estas distribuciones envíen métricas directamente a Datadog sin problemas.

- **Limitaciones técnicas mediante la utilización del exportador Datadog o el Agent**: Ideal para situaciones en las que la instalación de un software adicional es poco práctica o restrictiva, como servicios gestionados por terceros (por ejemplo, Vercel), aplicaciones en dispositivos de clientes o entornos que requieran pipelines de observabilidad, ágiles y sin el Agent. El punto de conexión de métricas de OTLP permite la ingestión directa de métricas de OTLP en estas situaciones.

## Configuración

Para exportar datos de métricas de OTLP al punto de conexión de entrada de métricas de Datadog OTLP:

1. [Asegúrate de que sólo se envíen métricas delta](#ensure-only-delta-metrics-are-sent).
1. [Configura el exportador HTTP OTLP](#configure-the-exporter).
   - Configura el punto de conexión de entrada de métricas de Datadog OTLP.
   - Configura los encabezados de HTTP necesarios.
1. (Opcional) [Configura el encabezado de HTTP `dd-otel-metric-config` ](#optional-configure-the-metric-translator) para configurar el comportamiento del traductor de métricas.

### Configurar el exportador

Para enviar datos de OTLP al punto de conexión de entrada de métricas de Datadog OTLP, utiliza el exportador OTLP HTTP. Para las métricas, el exportador es compatible con HTTP Protobuf y con HTTP JSON. Se recomienda HTTP Protobuf para un mejor rendimiento.

El proceso difiere según si utilizas la instrumentación automática o manual para OpenTelemetry.

<div class="alert alert-info">Basado en tu <a href="/getting_started/site/">sitio Datadog </a>, que es {{< region-param key=dd_datacenter code="true" >}}: Sustituye tu punto de conexión con {{< region-param key="otlp_metrics_endpoint" code="true" >}} en los siguientes ejemplos.</div>

#### Asegúrate de que sólo se envíen las métricas delta

Las métricas de Datadog OTLP sólo aceptan métricas **delta**. Si intentas enviar métricas **acumulativas** (el valor predeterminado en la mayoría de los SDK), recibirás un error. Asegúrate de configurar tu OpenTelemetry SDK o Collector para producir métricas delta.

- Para [lenguajes admitidos][7], configura la variable de entorno`OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE` en `delta`.
- De lo contrario, configura la preferencia de temporalidad en tu código. Para más información, lee [Configurar la temporalidad delta en OpenTelemetry][5].

#### Instrumentación automática

Si utilizas la [instrumentación automática de OpenTelemetry][3], configura las siguientes variables de entorno:

```shell
export OTEL_EXPORTER_OTLP_METRICS_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_METRICS_ENDPOINT="{{< region-param key="otlp_metrics_endpoint" >}}"
export OTEL_EXPORTER_OTLP_METRICS_HEADERS="dd-api-key=${DD_API_KEY},dd-otlp-source=${YOUR_SITE}"
export OTEL_EXPORTER_OTLP_METRICS_TEMPORALITY_PREFERENCE="delta"
```

#### Instrumentación manual

Si utilizas la Instrumentación manual con OpenTelemetry SDK, configura el exportador OTLP HTTP Protobuf mediante programación.

{{< tabs >}}
{{% tab "JavaScript" %}}

El exportador JavaScript es [`@opentelemetry/exporter-metrics-otlp-proto`][100]. Para configurar el exportador, utiliza el siguiente fragmento de código:

```javascript
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-proto');

const exporter = new OTLPMetricExporter({
  url: 'https://api.datadoghq.com/api/intake/otlp/v1/metrics',
  temporalityPreference: AggregationTemporalityPreference.DELTA, // Ensure delta temporality
  headers: {
    'dd-api-key': process.env.DD_API_KEY,
    'dd-otel-metric-config': '{resource_attributes_as_tags: true}',
    'dd-otlp-source': '${YOUR_SITE}', // Replace this with the correct site
  },
});
```

[100]: https://www.npmjs.com/package/@opentelemetry/exporter-metrics-otlp-proto

{{% /tab %}}

{{% tab "Java" %}}

El exportador Java es [`OtlpHttpMetricExporter`][200]. Para configurar el exportador, utiliza el siguiente fragmento de código:

```java
import io.opentelemetry.exporter.otlp.http.metrics.OtlpHttpMetricExporter;

OtlpHttpMetricExporter exporter = OtlpHttpMetricExporter.builder()
    .setEndpoint("https://api.datadoghq.com/api/intake/otlp/v1/metrics")
    .setAggregationTemporalitySelector(
            AggregationTemporalitySelector.deltaPreferred()) // Ensure delta temporality
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-metric-config", "{resource_attributes_as_tags: true}")
    .addHeader("dd-otlp-source", "${YOUR_SITE}") // Replace this with the correct site
    .build();
```

[200]: https://javadoc.io/doc/io.opentelemetry/opentelemetry-exporter-otlp-http-metrics/

{{% /tab %}}

{{% tab "Go" %}}

El exportador Go es [`otlpmetrichttp`][300]. Para configurar el exportador, utiliza el siguiente fragmento de código:

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp"

metricExporter, err := otlpmetrichttp.New(
    ctx,
    otlpmetrichttp.WithEndpoint("api.datadoghq.com"),
    otlpmetrichttp.WithURLPath("/api/intake/otlp/v1/metrics"),
      otlpmetrichttp.WithTemporalitySelector(deltaSelector), // Ensure delta temporality
    otlpmetrichttp.WithHeaders(
        map[string]string{
            "dd-api-key": os.Getenv("DD_API_KEY"),
            "dd-otel-metric-config": "{resource_attributes_as_tags: true}",
      "dd-otlp-source": "${YOUR_SITE}", // Replace this with the correct site
        }),
)
```

[300]: https://pkg.go.dev/go.opentelemetry.io/otel/exporters/otlp/otlpmetric/otlpmetrichttp

{{% /tab %}}

{{% tab "Python" %}}

El exportador Python es [`OTLPMetricExporter`][400]. Para configurar el exportador, utiliza el siguiente fragmento de código:

```python
from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter

exporter = OTLPMetricExporter(
    endpoint="https://api.datadoghq.com/api/intake/otlp/v1/metrics",
    preferred_temporality=deltaTemporality, # Ensure delta temporality
    headers={
        "dd-api-key": os.environ.get("DD_API_KEY"),
        "dd-otel-metric-config": "{resource_attributes_as_tags: true}",
        "dd-otlp-source": "${YOUR_SITE}" # Replace this with the correct site
    },
)
```

[400]: https://pypi.org/project/opentelemetry-exporter-otlp-proto-http/

{{% /tab %}}
{{< /tabs >}}

### (Opcional) Configurar el traductor de métricas 

Utiliza el encabezado `dd-otel-metric-config` para configurar cómo se traducen y se envían las métricas a Datadog. El encabezado JSON contiene los siguientes campos:

`resource_attributes_as_tags`
: **Tipo**: Booleano <br>
**Predeterminado**: `false` <br>
Si se configura en `true`, transforma todos los atributos de los recursos en etiquetas de métricas, que a su vez se convierten en etiquetas (tags).

`instrumentation_scope_metadata_as_tags`
: **Tipo**: Booleano <br>
**Predeterminado**: `false` <br>
Si se configura en `true`, añade el nombre y la versión del contexto de la instrumentación que creó una métrica a las etiquetas (tags) de métricas.

`histograms.mode`
: **Tipo**: Cadena <br>
Modo de exportación de los histogramas. Los valores válidos son los siguientes:
  - `distributions`: envía histogramas como distribuciones de Datadog (recomendado).
  - `counters`envía histogramas como counts de Datadog, una métrica por cubo.
  - `nobuckets`: no envía ninguna métrica de histrograma de cubo.

`histograms.send_aggregation_metrics`
: **Tipo**: Booleano <br>
Si se configura en `true`, escribe `.sum`, `.count`, `.min` y `.max` métricas adicionales para los histogramas.

`summaries.mode`
: **Tipo**: Cadena <br>
Modo de exportación de los resúmenes de OTLP. Los valores válidos son los siguientes:
  - `noquantiles`: no envía `.quantile` métricas. `.sum` y `.count` se siguen enviando métricas.
  - `gauges`: envía `.quantile` métricas como indicadores etiquetados por el cuantil.

Por ejemplo:

```json
{
  "resource_attributes_as_tags": true,
  "instrumentation_scope_metadata_as_tags": true,
  "histograms": {
    "mode": "distributions",
    "send_aggregation_metrics": true
  },
  "summaries": {
    "mode": "gauges"
  }
}
```

## OpenTelemetry Collector

Si utilizas una distribución de OpenTelemetry Collector que no admite el exportador Datadog, puedes configurar el [`otlphttpexporter`][4] para exportar métricas al punto de conexión de entrada de métricas de Datadog OTLP.

Por ejemplo, tu archivo `config.yaml` tendría este aspecto:

```yaml
...
exporters:
  otlphttp:
    metrics_endpoint: {{< region-param key="otlp_metrics_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      dd-otel-metric-config: "{resource_attributes_as_tags: true}"
      dd-otlp-source: "${YOUR_SITE}", # Replace this with the correct site
...

service:
  pipelines:
    metrics:
      receivers: [otlp]
      processors: [batch, cumulativetodelta]
      exporters: [otlphttp]
```
<div class="alert alert-info">Obsérvese el procesador <code>cumulativetodelta</code> en el pipeline, que convierte las métricas acumulativas en métricas delta. Las métricas delta son necesarias para el punto de conexión de entrada de métricas de OTLP. Para más información, consulta <a href="/opentelemetry/guide/otlp_delta_temporality/">Configurar la temporalidad delta en OpenTelemetry</a>.</div>

## Solucionar problemas

### Error 403 Prohibido

Si recibes un error `403 Forbidden` al enviar métricas al punto de conexión de entrada de métricas de Datadog OTLP, indica uno de los siguientes problemas:

- La clave de API pertenece a una organización que no está autorizada a acceder al punto de conexión de entrada de métricas de Datadog OTLP.
  **Solución**: Verifica que estés utilizando una clave de API de una organización que esté autorizada para acceder al punto de conexión de entrada de métricas de Datadog OTLP.

- Falta el encabezado `dd-otlp-source` o tiene un valor incorrecto.
   **Solución**: Asegúrate de que el encabezado `dd-otlp-source` esté configurado con el valor correcto para tu sitio. Deberías haber recibido un valor enumerado permitido para este encabezado de Datadog si eres socio de la plataforma.

- La URL del punto de conexión es incorrecto para tu organización.
   **Solución**: Utiliza la URL del punto de conexión correcto para tu organización. Tu sitio es {{< region-param key=dd_datacenter code="true" >}}, por lo que debes utilizar el punto de conexión {{< region-param key="otlp_metrics_endpoint" code="true" >}}.

### Error: 413 Entidad de solicitud demasiado grande

Si recibes un error `413 Request Entity Too Large` al enviar métricas al punto de conexión de entrada de métricas de Datadog OTLP, indica que el tamaño de la carga útil enviada por el exportador OTLP excede el límite del punto conexión de entrada de métricas de Datadog de 500 KB para cargas útiles sin comprimir o 5 MB para cargas útiles comprimidas después de la descompresión.

Este error suele producirse cuando los lotes de SDK de OpenTelemetry agrupa demasiados datos de telemetría en una única carga útil de solicitud.

**Solución**: Reduce el tamaño del lote de exportación del procesador de lotes del SDK. Por ejemplo, en el SDK de OpenTelemetry Java, puedes ajustar `BatchMetricExportProcessor`.

### Problema: Falta de puntos de datos o valores de las métricas inferiores a los previstos

Si observas que faltan puntos de datos o que los valores de métricas son inferiores a los previstos, puede deberse a que estás enviando varios puntos de datos para una métrica que tienen la misma marca de tiempo (en segundos) y las mismas dimensiones. En tales casos, Datadog sólo acepta el último punto de datos y los anteriores se descartan (la última escritura gana). Datadog requiere que los datos de la serie temporal de una métrica sean únicos en el contexto de {marca de tiempo + dimensiones}.

**Solución**: Asegúrate de que tus puntos de datos de una determinada métrica en una marca de tiempo estén etiquetados de forma única. Por ejemplo, si envías varios puntos de datos para una métrica simultáneamente desde varias invocaciones de AWS Lambda, asegúrate de incluir identificadores únicos (como el ARN de Lambda) como atributos de recursos en tus métricas. Utiliza la opción `resource_attributes_as_tags` para añadir estos atributos de recursos como etiquetas (tags) de métricas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/collector_exporter/
[2]: /es/opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/reference/specification/glossary/#automatic-instrumentation
[4]: https://github.com/open-telemetry/opentelemetry-collector/tree/main/exporter/otlphttpexporter
[5]: /es/opentelemetry/guide/otlp_delta_temporality/
[6]: /es/metrics/otlp/?tab=summary#mapping
[7]: https://github.com/open-telemetry/opentelemetry-specification/blob/main/spec-compliance-matrix.md#environment-variables
[8]: https://aws-otel.github.io/docs/getting-started/lambda