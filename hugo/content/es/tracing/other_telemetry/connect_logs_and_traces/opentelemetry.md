---
aliases:
- /es/tracing/connect_logs_and_traces/opentelemetry
code_lang: opentelemetry
code_lang_weight: 80
description: Conecte los registros de su aplicación y las trazas de OpenTelemetry
  para correlacionarlos en Datadog
further_reading:
- link: /opentelemetry/setup/
  tag: Documentación
  text: Enviar datos de OpenTelemetry a Datadog
- link: https://opentelemetry.io/docs/collector/
  tag: Sitio externo
  text: Documentación del Collector
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: Blog
  text: La asociación de Datadog con OpenTelemetry
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilite la resolución de problemas con la correlación entre productos.
title: Correlación de trazas y registros de OpenTelemetry
type: multi-code-lang
---
## Descripción general {#overview}

La correlación de trazas y registros le permite investigar problemas navegando desde un tramo específico de una traza directamente a los registros que se generaron durante esa operación. Esto hace que la depuración sea más rápida e intuitiva al proporcionar el contexto exacto necesario para comprender un error o un problema de rendimiento.

## Requisitos {#requirements}

Antes de comenzar, asegúrese de haber configurado el [etiquetado de servicio unificado][1]. Esto es necesario para toda correlación de datos en Datadog.

## Configuración {#setup}

Para correlacionar trazas y registros de OpenTelemetry en Datadog, debe:

- **Inyecte el contexto de la traza**: El registrador de su aplicación debe estar configurado para enriquecer sus registros con el `trace_id` y el `span_id` de la traza activa. El enfoque recomendado es utilizar una biblioteca de registro o un appender compatible con OpenTelemetry. Estas herramientas capturan automáticamente el contexto de la traza activa e integran el `trace_id` y el `span_id` como campos de nivel superior en sus registros, lo cual es el método estándar para la correlación.

- **Envíe los registros a Datadog**: Sus registros, enriquecidos con el contexto de la traza, deben recopilarse y enviarse a Datadog.

### 1. Inyecte el contexto de la traza en sus registros {#1-inject-trace-context-into-your-logs}

Los siguientes ejemplos utilizan puentes de registro o instrumentación automática. Estas herramientas interceptan los registros de las bibliotecas de registro comunes (como `zap`, `Logback` y `Winston`), los convierten al modelo de datos de registros de OpenTelemetry y los reenvían al SDK de OpenTelemetry. Este proceso enriquece automáticamente los registros con el contexto de la traza activa.

Para aplicaciones completas y funcionales, consulte el [repositorio de ejemplos de OpenTelemetry de Datadog][2].

{{< tabs >}}
{{% tab "Go" %}}

Primero, asegúrese de tener un `LoggerProvider` de OpenTelemetry inicializado. Luego, utilícelo para crear su instancia de registrador `zap`:

```go
import "go.opentelemetry.io/contrib/bridges/otelzap"

// Replace your standard zap logger with the otelzap-backed one
logger := zap.New(otelzap.NewCore(
    "my-service-name",
    otelzap.WithLoggerProvider(loggerProvider),
))

// Now, logs written with this logger are automatically correlated
logger.Info("Processing user request")
```

Para ver cómo se configura el `LoggerProvider` en una aplicación completa, consulte el [ejemplo completo en Go en el repositorio de ejemplos][100].

[100]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/golang/calendar/main.go

{{% /tab %}}

{{% tab "Java" %}}

Para inyectar el contexto de la traza en Java, puede utilizar el OpenTelemetry Logback Appender. Agregue la dependencia `io.opentelemetry.instrumentation:opentelemetry-logback-appender-1.0` a su proyecto y configúrela en su `logback.xml`:

```xml
<configuration>
  <appender name="OpenTelemetry"
      class="io.opentelemetry.instrumentation.logback.appender.v1_0.OpenTelemetryAppender">
    <immediateFlush>true</immediateFlush>
  </appender>

  <root level="INFO">
    <appender-ref ref="OpenTelemetry"/>
  </root>
</configuration>
```

Para obtener una configuración de ejemplo completa y funcional, consulte el [ejemplo completo de Java en el repositorio de ejemplos][200].

[200]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/resources/logback.xml

{{% /tab %}}

{{% tab "Node.js" %}}

Para Node.js, utilice el paquete `@opentelemetry/instrumentation-winston` con [Winston][300] para inyectar automáticamente el contexto de la traza en sus registros. Instale los paquetes necesarios:

```shell
npm install winston @opentelemetry/instrumentation-winston
```

Luego, registre la instrumentación de Winston como parte de la configuración de su SDK de OpenTelemetry:

```javascript
const { WinstonInstrumentation } = require('@opentelemetry/instrumentation-winston');
const { NodeSDK } = require('@opentelemetry/sdk-node');

const sdk = new NodeSDK({
  instrumentations: [
    new WinstonInstrumentation(),
    // ... other instrumentations
  ],
});
sdk.start();
```

Después de registrar la instrumentación, cualquier registrador de Winston incluye automáticamente los campos `trace_id`, `span_id` y `trace_flags` cuando se emite un registro dentro de una traza activa:

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [new winston.transports.Console()],
});

// Logs emitted within a traced context automatically include trace_id and span_id
logger.info('Processing user request');
```

El mismo enfoque funciona con [Pino][301] utilizando el paquete `@opentelemetry/instrumentation-pino`.

[300]: https://github.com/winstonjs/winston
[301]: https://github.com/pinojs/pino

{{% /tab %}}
{{< /tabs >}}

### 2. Elija su canalización de registros {#2-choose-your-log-pipeline}

Una vez que sus registros estén instrumentados con el contexto de la traza, debe enviarlos a Datadog. El enfoque más sencillo es enviarlos directamente desde su aplicación al OpenTelemetry Collector utilizando OTLP. Sin embargo, también puede extraer registros de archivos o recopilarlos utilizando el Datadog Agent.

#### Enviar registros utilizando OTLP {#send-logs-using-otlp}

Este es el método más sencillo y directo. Su aplicación envía los registros directamente a un punto de conexión OTLP, evitando la complejidad de escribir en archivos locales y realizar su parseo.

Tanto el OpenTelemetry Collector como el Datadog Agent pueden recibir registros OTLP.

1. **Configure su aplicación para exportar registros utilizando OTLP**: En la configuración de su SDK de OpenTelemetry, configure un `LogRecordProcessor` para utilizar un `OTLPLogExporter`. El siguiente ejemplo muestra cómo hacer esto en Python:
   ```python
   # In your OTel SDK setup for Python
   import logging
   from opentelemetry.sdk._logs import LoggerProvider, LoggingHandler
   from opentelemetry.sdk._logs.export import BatchLogRecordProcessor
   from opentelemetry.exporter.otlp.proto.grpc._log_exporter import OTLPLogExporter
   
   # Configure the OTLP Log Exporter to send to your Collector
   # Note: The endpoint should point to your OpenTelemetry Collector.
   # The default port is 4317 for gRPC and 4318 for HTTP.
   exporter = OTLPLogExporter(endpoint="localhost:4317", insecure=True)
   
   log_provider = LoggerProvider()
   log_provider.add_log_record_processor(BatchLogRecordProcessor(exporter))
   
   # Attach to the root logger
   handler = LoggingHandler(logger_provider=log_provider)
   logging.getLogger().addHandler(handler)
   ```
2. **Configure el Collector para recibir y exportar registros OTLP**: En el `config.yaml` del Collector, habilite el receptor `otlp` y agréguelo a la canalización `logs`. Utilice la configuración del exportador HTTP de OTLP de [Configurar el Collector de OpenTelemetry][7]:
   ```yaml
   receivers:
     otlp:
       protocols:
         grpc:
         http:

   processors:
     resource_detection:
       detectors: [env, system]

   exporters:
     otlp_http:
       endpoint: https://otlp.${env:DD_SITE}
       headers:
         dd-api-key: ${env:DD_API_KEY}

   service:
     pipelines:
       logs:
         receivers: [otlp]
         processors: [resource_detection]
         exporters: [otlp_http]
   ```
   
#### Recopilar registros de archivos {#scrape-logs-from-files}

Este enfoque es útil si tiene el requisito de conservar archivos de registro locales por cumplimiento u otras herramientas.

Para que Datadog correlacione sus registros y trazas, sus archivos de registro deben contener campos específicos con el formato correcto:
- `trace_id`: El ID de traza. Debe ser una cadena hexadecimal en minúsculas de 32 caracteres.
- `span_id`: El ID del tramo. Debe ser una cadena hexadecimal en minúsculas de 16 caracteres.

El SDK de OpenTelemetry generalmente los proporciona en un formato sin procesar (como un número entero o una matriz de bytes), que debe formatearse en cadenas hexadecimales sin ningún <code>0x</code> prefijo.

##### Registros JSON {#json-logs}

1. **Configure su aplicación para generar registros JSON**: Utilice una biblioteca de registro estándar para escribir registros como JSON en un archivo o `stdout`. El siguiente ejemplo de Python utiliza la biblioteca estándar `logging`.
2. **Inyecte manualmente el contexto de la traza**: En el código de su aplicación, recupere el contexto del tramo actual y agregue el `trace_id` y el `span_id` a sus registros. El siguiente ejemplo de Python muestra cómo crear un `logging.Filter` personalizado para hacer esto automáticamente:

   ```python
   import logging
   import sys
   from opentelemetry import trace
   from pythonjsonlogger import jsonlogger

   # 1. Create a filter to inject trace context
   class TraceContextFilter(logging.Filter):
       def filter(self, record):
           span = trace.get_current_span()
           if span.is_recording():
               span_context = span.get_span_context()
               record.trace_id = f'{span_context.trace_id:032x}'
               record.span_id = f'{span_context.span_id:016x}'
           return True

   # 2. Configure a JSON logger
   logger = logging.getLogger("my-json-logger")
   logger.setLevel(logging.DEBUG)

   # 3. Add the filter to the logger
   logger.addFilter(TraceContextFilter())

   handler = logging.StreamHandler(sys.stdout)
   formatter = jsonlogger.JsonFormatter(
       '%(asctime)s %(name)s %(levelname)s %(message)s %(trace_id)s %(span_id)s'
   )
   handler.setFormatter(formatter)
   logger.addHandler(handler)

   # Logs will now contain the trace_id and span_id
   logger.info("Processing user request with trace context.")
   ```

3. **Configure el Collector para recopilar archivos de registro**: En el `config.yaml` de su Collector, habilite el receptor `filelog`. Configúrelo para encontrar sus archivos de registro y analizarlos como JSON.
   ```yaml
   receivers:
     filelog:
       include: [ /var/log/my-app/*.log ] # Path to your log files
       operators:
         - type: json_parser
           # The timestamp and severity fields should match your JSON output
           timestamp:
             parse_from: attributes.asctime
             layout: '%Y-%m-%d %H:%M:%S,%f'
           severity:
             parse_from: attributes.levelname
   # ... your logs pipeline ...
   ```

##### Registros que no son JSON {#non-json-logs}

Si su aplicación genera registros en un formato de texto sin formato o de clave-valor en lugar de JSON, aún puede correlacionarlos con las trazas. Debe inyectar manualmente el contexto de traza en la cadena de registro y configurar el Collector para extraerlo usando un `regex_parser`.

El siguiente ejemplo de Node.js utiliza Winston con un formateador personalizado para inyectar `trace_id` y `span_id` en una línea de registro de texto sin formato:

```javascript
const { trace, context } = require('@opentelemetry/api');
const winston = require('winston');

// Custom format that injects trace context into plain text logs
const traceFormat = winston.format((info) => {
  const span = trace.getSpan(context.active());
  if (span) {
    const spanContext = span.spanContext();
    info.trace_id = spanContext.traceId;
    info.span_id = spanContext.spanId;
  }
  return info;
});

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    traceFormat(),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, trace_id, span_id }) => {
      return `${timestamp} ${level} trace_id=${trace_id || '0'} span_id=${span_id || '0'} ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({ filename: '/var/log/my-app/app.log' })
  ],
});

// Output: 2025-01-15T12:00:00.000Z info trace_id=4bf92f3577b34da6a3ce929d0e0e4736 span_id=00f067aa0ba902b7 Processing request
logger.info('Processing request');
```

Luego, configure el receptor `filelog` del Collector con un `regex_parser` para extraer el contexto de traza de las líneas de registro de texto sin formato:

```yaml
receivers:
  filelog:
    include: [ /var/log/my-app/*.log ]
    operators:
      - type: regex_parser
        regex: '^(?P<timestamp>\S+) (?P<severity>\S+) trace_id=(?P<trace_id>[a-f0-9]+) span_id=(?P<span_id>[a-f0-9]+) (?P<body>.*)$'
        timestamp:
          parse_from: attributes.timestamp
          layout: '%Y-%m-%dT%H:%M:%S.%fZ'
        severity:
          parse_from: attributes.severity
        trace:
          trace_id:
            parse_from: attributes.trace_id
          span_id:
            parse_from: attributes.span_id
# ... your logs pipeline ...
```

Este enfoque funciona con cualquier biblioteca de registro o cualquier lenguaje. Los requisitos clave son:
- Incluya `trace_id` y `span_id` como campos analizables en su salida de registro.
- Configure el `regex_parser` del Collector para que coincida con su formato de registro y extraiga los campos de contexto de traza.

#### Recopile registros usando el Datadog Agent {#collect-logs-using-the-datadog-agent}

Si recopila registros directamente con el Datadog Agent (sin enviarlos a través del OpenTelemetry Collector), debe asegurarse de que los ID de traza estén presentes en sus registros.

- **Formato de ID de traza**: Datadog detecta automáticamente la convención `dd.trace_id` y `dd.span_id` utilizada por los SDK de Datadog, así como los estándares de OpenTelemetry `trace_id` y `span_id`. Consulte la [documentación de compatibilidad de OpenTelemetry][6] para obtener detalles sobre el estándar.

<div class="alert alert-info">Si su instrumentación de registro utiliza un nombre de atributo diferente para los ID de traza/tramo, debe asegurarse de que el atributo se agregue a la configuración de <a href="/logs/log_configuration/pipelines/?tab=traceid#preprocessing">Preprocesamiento para registros JSON</a> para que se reconozca como un ID de traza válido.</div>

- **Asignación de atributos**: El Datadog Agent no convierte automáticamente los atributos de recursos de OTel (por ejemplo, `service.name`) a las etiquetas estándar de Datadog. Es posible que deba reasignar manualmente estos atributos en su canalización de procesamiento de registros para mantener un etiquetado de servicio unificado.

## Ver datos correlacionados en Datadog {#view-correlated-data-in-datadog}

Después de que su aplicación envíe trazas, puede navegar entre ellas en Datadog.

### De una traza a registros {#from-a-trace-to-logs}

1. Navegue a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}Traces{{< /ui >}}][3].
2. Busque una traza de su servicio instrumentado y haga clic en ella.
3. Seleccione cualquier tramo en el gráfico de llama para ver sus detalles.
4. Haga clic en la pestaña {{< ui >}}Logs{{< /ui >}}.

Aquí puede ver todos los registros generados durante la ejecución de ese tramo específico.

### De un registro a una traza {#from-a-log-to-a-trace}

1. Navegue a [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Explorer{{< /ui >}}][4].
2. Busque y haga clic en una entrada de registro de su servicio instrumentado.
3. Haga clic en la pestaña {{< ui >}}Trace{{< /ui >}}.

Aquí puede ver un gráfico de llama de la traza asociada, con el tramo que generó el registro. 

Haga clic en {{< ui >}}View Trace in APM{{< /ui >}} para ir directamente a la traza completa de APM asociada con ese evento de registro, lo que le permite ver el contexto de toda la solicitud.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/opentelemetry/correlate/#prerequisite-unified-service-tagging
[2]: https://github.com/DataDog/opentelemetry-examples
[3]: https://app.datadoghq.com/apm/traces
[4]: https://app.datadoghq.com/logs
[5]: /es/logs/log_configuration/processors
[6]: https://opentelemetry.io/docs/specs/otel/compatibility/logging_trace_context/
[7]: /es/opentelemetry/setup/collector_exporter/