---
aliases:
- /es/opentelemetry/otlp_logs
- /es/opentelemetry/setup/intake_endpoint/otlp_logs
- /es/opentelemetry/setup/agentless/logs
further_reading:
- link: https://opentelemetry.io/docs/concepts/sdk-configuration/general-sdk-configuration/
  tag: Sitio externo
  text: Configuración general del SDK de OpenTelemetry
- link: https://opentelemetry.io/docs/reference/specification/sdk-environment-variables/
  tag: Sitio externo
  text: Especificación de variables de entorno de OpenTelemetry
- link: https://opentelemetry.io/docs/reference/specification/protocol/exporter/
  tag: Sitio externo
  text: Exportador del protocolo OpenTelemetry
title: Punto de conexión de ingesta de registros OTLP de Datadog
---
## Descripción general {#overview}

El punto de conexión de la API de ingesta de registros del protocolo OpenTelemetry (OTLP) de Datadog permite que las aplicaciones, las plataformas administradas y los colectores de OpenTelemetry envíen registros a Datadog a través de OTLP HTTP.

Utilice la configuración directa en esta página cuando necesite enviar registros sin el [Datadog Agent][2] o un colector de OpenTelemetry. Para implementaciones de colector en producción, utilice [Configurar el colector de OpenTelemetry][1].

<div class="alert alert-info">Si está enviando registros desde una plataforma administrada (Cloudflare, Vercel, Heroku y otras), consulte <a href="/opentelemetry/setup/otlp_ingest/managed_platforms/">Plataformas administradas</a> para obtener la configuración correcta del punto de conexión.</div>

## Configuración {#configuration}

Para enviar datos OTLP al punto de conexión de ingesta de registros OTLP de Datadog, debe configurar el exportador OTLP HTTP Protobuf. El proceso difiere dependiendo de si está utilizando instrumentación automática o manual para OpenTelemetry.

<div class="alert alert-info">Según su <a href="/getting_started/site/">sitio de Datadog</a>, que es {{< region-param key=dd_datacenter code="true" >}}: Reemplace <code>${YOUR_ENDPOINT}</code> con {{< region-param key="otlp_logs_endpoint" code="true" >}} en los siguientes ejemplos.</div>

#### Instrumentación automática {#automatic-instrumentation}

Si está utilizando [instrumentación automática de OpenTelemetry][3], establezca las siguientes variables de entorno:

```shell
export OTEL_EXPORTER_OTLP_LOGS_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_LOGS_ENDPOINT="${YOUR_ENDPOINT}" // Replace this with the correct endpoint
export OTEL_EXPORTER_OTLP_LOGS_HEADERS="dd-api-key=${DD_API_KEY}"
```

#### Instrumentación manual {#manual-instrumentation}

Si está utilizando instrumentación manual con SDK de OpenTelemetry, configure el exportador OTLP HTTP Protobuf mediante programación utilizando los siguientes ejemplos.

<div class="alert alert-info">La compatibilidad con registros del SDK de OpenTelemetry para JavaScript y Python está en desarrollo. Para conocer los estados más recientes, consulte <a href="https://opentelemetry.io/docs/languages/#status-and-releases">Estado y versiones de OpenTelemetry</a>.</div>

{{< tabs >}}
{{% tab "Java" %}}
El exportador de Java es `OtlpHttpLogRecordExporter`. Para configurar el exportador, utilice el siguiente fragmento de código:

```java
import io.opentelemetry.exporter.otlp.http.logs.OtlpHttpLogRecordExporter;

OtlpHttpLogRecordExporter exporter = OtlpHttpLogRecordExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}") // Replace this with the correct endpoint
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .build();
```
{{% /tab %}}

{{% tab "Go" %}}
El exportador de Go es `otlploghttp`. Para configurar el exportador, utilice el siguiente fragmento de código:

```go
import "go.opentelemetry.io/otel/exporters/otlp/otlplog/otlploghttp"

logExporter, err := otlploghttp.New(
    ctx,
    otlploghttp.WithEndpointURL("${YOUR_ENDPOINT}"), // Replace this with the correct endpoint, minus the URL path
    otlploghttp.WithURLPath("/v1/logs"),
    otlploghttp.WithHeaders(
        map[string]string{
            "dd-api-key": os.Getenv("DD_API_KEY"),
        }),
)
```
{{% /tab %}}
{{< /tabs >}}

## OpenTelemetry Collector {#opentelemetry-collector}

Si su distribución de OpenTelemetry Collector no incluye todos los componentes utilizados por la configuración de Collector recomendada por Datadog, configure el exportador HTTP OTLP en su propia distribución:

Estos ejemplos utilizan identificadores de componentes de OpenTelemetry Collector Contrib v0.154.0. Para otras versiones o distribuciones, utilice los identificadores que admita esa distribución.

```yaml
receivers:
  otlp:
    protocols:
      http:
        endpoint: 0.0.0.0:4318

exporters:
  otlp_http:
    logs_endpoint: {{< region-param key="otlp_logs_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}

service:
  pipelines:
    logs:
      receivers: [otlp]
      exporters: [otlp_http]
```

Agregue los receptores y procesadores requeridos por su distribución de Collector.

Para una implementación en producción que utilice OpenTelemetry Collector Contrib, utilice la [configuración recomendada de OpenTelemetry Collector][1]. También configura el procesamiento por lotes de la cola de envío, la detección de recursos y el enriquecimiento de metadatos del servidor.

## Configurar el procesamiento de registros (opcional) {#configure-log-processing-optional}

Utilice el encabezado `dd-otel-log-config` para configurar cómo Datadog procesa los registros OTLP en la ingesta. El valor del encabezado es un objeto JSON con los siguientes campos:

`keep_raw_message`
: **Tipo**: Booleano<br>
**Predeterminado**: `false`<br>
**Descripción**: De forma predeterminada, Datadog analiza un cuerpo de registro JSON en atributos de registro para que pueda buscar campos individuales (por ejemplo, `@key:value`) en lugar de ejecutar una búsqueda de texto completo en el mensaje. Si `keep_raw_message` se establece en `true`, Datadog no analiza el cuerpo y lo mantiene como una cadena en el atributo `message`. Utilice esta opción si realiza un análisis personalizado del mensaje de registro en una canalización de registros o si los campos en su cuerpo JSON entran en conflicto con los atributos de registro existentes.

Por ejemplo, para mantener los cuerpos de registro JSON como cadenas sin procesar:

```json
{
  "keep_raw_message": true
}
```

Establezca el encabezado en sus solicitudes OTLP junto con `dd-api-key`. Por ejemplo, con instrumentación automática:

```shell
export OTEL_EXPORTER_OTLP_LOGS_HEADERS="dd-api-key=${DD_API_KEY},dd-otel-log-config={\"keep_raw_message\":true}"
```

Para la instrumentación manual, agregue el encabezado en la configuración de su exportador. Por ejemplo, en Java:

```java
import io.opentelemetry.exporter.otlp.http.logs.OtlpHttpLogRecordExporter;

OtlpHttpLogRecordExporter exporter = OtlpHttpLogRecordExporter.builder()
    .setEndpoint("${YOUR_ENDPOINT}")
    .addHeader("dd-api-key", System.getenv("DD_API_KEY"))
    .addHeader("dd-otel-log-config", "{\"keep_raw_message\": true}")
    .build();
```

En un OpenTelemetry Collector, agregue el encabezado bajo el exportador `otlp_http` `headers`:

```yaml
exporters:
  otlp_http:
    logs_endpoint: {{< region-param key="otlp_logs_endpoint" >}}
    headers:
      dd-api-key: ${env:DD_API_KEY}
      dd-otel-log-config: '{"keep_raw_message": true}'
```

## Solución de problemas {#troubleshooting}

### Error: 403 Forbidden {#error-403-forbidden}

Si recibe un error `403 Forbidden` al enviar registros al punto de conexión de ingesta de registros OTLP de Datadog, esto indica un posible problema:

- La URL del punto de conexión es incorrecta para su organización.  
   **Solución**: Utilice la URL del punto de conexión correcta para su organización. Su sitio es {{< region-param key=dd_datacenter code="true" >}}, por lo que debe utilizar el {{< region-param key="otlp_logs_endpoint" code="true" >}} punto de conexión.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/collector_exporter/
[2]: /es/opentelemetry/otlp_ingest_in_the_agent/
[3]: https://opentelemetry.io/docs/specs/otel/glossary/#automatic-instrumentation