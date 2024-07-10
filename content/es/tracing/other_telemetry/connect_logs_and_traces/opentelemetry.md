---
aliases:
- /es/tracing/connect_logs_and_traces/opentelemetry
code_lang: opentelemetry
code_lang_weight: 80
description: Conecta tus logs de aplicación y trazas de OpenTelemetry para correlacionarlos
  en Datadog
further_reading:
- link: /opentelemetry/otel_tracing/
  tag: Documentación
  text: Envío de trazas de OpenTelemetry a Datadog
- link: https://opentelemetry.io/docs/collector/
  tag: Sitio externo
  text: Documentación de Collector
- link: https://www.datadoghq.com/blog/opentelemetry-instrumentation/
  tag: Blog
  text: Asociación de Datadog con OpenTelemetry
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilita la solución de problemas con una correlación entre productos.
kind: documentación
title: Correlación de trazas y logs de OpenTelemetry
type: multi-code-lang
---

Conectar trazas (traces) y logs del SDK de lenguaje de OpenTelemetry dentro de Datadog es similar a conectar [trazas y logs del SDK de Datadog][1], con algunos pasos adicionales:

1. Las propiedades de OpenTelemetry `TraceId` y `SpanId` difieren de las convenciones de Datadog. Por lo tanto, es necesario traducir `TraceId` y `SpanId` de sus formatos de OpenTelemetry ([un entero sin signo de 128bit y un entero sin signo de 64bit representados como una cadena de 32-hex-caracteres y 16 caracteres hexadecimal en minúsculas, respectivamente][2]) a sus formatos de Datadog ([un entero de 64bit sin signo][3]).

2. Asegúrate de que tus logs se envíen como JSON, porque tus logs de nivel de lenguaje deben convertirse en atributos de Datadog para que funcione la correlación de log y traza.

Consulta los siguientes ejemplos para obtener información específica del lenguaje sobre cómo correlacionar tus trazas y logs de OpenTelemetry.

{{< tabs >}}
{{% tab "Python" %}}

Para correlacionar manualmente tus trazas con tus logs, parchea el módulo de registro que estés utilizando con un procesador que traduzca `trace_id` y `span_id` con formato de OpenTelemetry al formato de Datadog. El siguiente ejemplo utiliza la [biblioteca de registro de structlog][1]. Para otras bibliotecas de registro, puede ser más apropiado [modificar los ejemplos del SDK de Datadog ][2]. También puedes encontrar [un ejemplo de una aplicación Python instrumentada con OpenTelemetry con correlación de trazas y logs][3] en el repositorio `trace-examples` de GitHub.

```python
# ########## injection.py
from opentelemetry import trace

class CustomDatadogLogProcessor(object):
    def __call__(self, logger, method_name, event_dict):
        # Un ejemplo de agregar contexto de traza con formato de Datadog a logs
        # from: https://github.com/open-telemetry/opentelemetry-python-contrib/blob/b53b9a012f76c4fc883c3c245fddc29142706d0d/exporter/opentelemetry-exporter-datadog/src/opentelemetry/exporter/datadog/propagator.py#L122-L129 
        current_span = trace.get_current_span()
        if not current_span.is_recording():
            return event_dict

        context = current_span.get_span_context() if current_span is not None else None
        if context is not None:
            event_dict["dd.trace_id"] = str(context.trace_id & 0xFFFFFFFFFFFFFFFF)
            event_dict["dd.span_id"] = str(context.span_id)

        return event_dict        
# ##########

# ########## app.py
import .injection
import logging
import structlog
# Añade un formato personalizado para inyectar IDs de traza con formato de Datadog en logs
structlog.configure(
    processors=[
        injection.CustomDatadogLogProcessor(),
        structlog.processors.JSONRenderer(sort_keys=True)
    ],
)

log = structlog.getLogger()

log.info("Example log line with trace correlation info")
```



[1]: https://www.structlog.org/en/stable/standard-library.html
[2]: /es/tracing/other_telemetry/connect_logs_and_traces/python/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/python-microservice/ddlogging/injection.py#L3
{{% /tab %}}

{{% tab "Node.js" %}}

Para correlacionar manualmente tus trazas con tus logs, parchea el módulo de registro que estés utilizando con un procesador que traduzca `trace_id` y `span_id` con formato de OpenTelemetry al formato de Datadog. El siguiente ejemplo utiliza [la biblioteca de registro de winston][1]. Para otras bibliotecas de registro puede ser más apropiado [modificar los ejemplos del SDK de Datadog][2]. También puedes encontrar [un ejemplo de aplicación de Node.js instrumentada por OpenTelemetry con correlación de trazas y logs][3] en el repositorio `trace-examples` de GitHub.

```js
// ########## logger.js

// convertir a dd con:
// https://github.com/DataDog/dd-trace-js/blob/master/packages/dd-trace/src/id.js
const opentelemetry = require('@opentelemetry/api');
const winston = require('winston')

const tracingFormat = function () {
  return winston.format(info => {
    const span = opentelemetry.trace.getSpan(opentelemetry.context.active());
    if (span) {
      const { spanId, traceId } = span.spanContext();
      const traceIdEnd = traceId.slice(traceId.length / 2);
      info['dd.trace_id'] = BigInt(`0x${traceIdEnd}`).toString();
      info['dd.span_id'] = BigInt(`0x${spanId}`).toString();
    }
    return info;
  })();
}

module.exports = winston.createLogger({
  transports: [new winston.transports.Console],
  format: winston.format.combine(tracingFormat(), winston.format.json())
});

// ##########

// ########## index.js
//
// ...
// inicializar tu rastreador
// ...
// 
const logger = require('./logger') 
//
// usa el registrador en tu aplicación
logger.info("Example log line with trace correlation info")
```



[1]: https://github.com/winstonjs/winston
[2]: /es/tracing/other_telemetry/connect_logs_and_traces/nodejs/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/node-microservice/logger.js#L86
{{% /tab %}}

{{% tab "Ruby" %}}

Para correlacionar manualmente tus trazas con tus logs, parchea el módulo de registro que estés utilizando con un procesador que traduzca `trace_id` y `span_id` con formato de OpenTelemetry al formato de Datadog. El siguiente ejemplo utiliza [la biblioteca de registro estándar de Ruby][1]. Para aplicaciones de Rails u otras bibliotecas de registro, puede ser más apropiado [modificar los ejemplos del SDK de Datadog][2]. También puedes encontrar [un ejemplo de aplicación de Ruby instrumentada por OpenTelemetry con correlación de trazas y logs][3] en el repositorio `trace-examples` de GitHub.

```ruby
logger = Logger.new(STDOUT)
logger.progname = 'multivac'
original_formatter = Logger::Formatter.new
logger.formatter  = proc do |severity, datetime, progname, msg|
  current_span = OpenTelemetry::Trace.current_span(OpenTelemetry::Context.current).context

  dd_trace_id = current_span.trace_id.unpack1('H*')[16, 16].to_i(16).to_s
  dd_span_id = current_span.span_id.unpack1('H*').to_i(16).to_s

  if current_span
    "#{{datetime: datetime, progname: progname, severity: severity, msg: msg, 'dd.trace_id': dd_trace_id, 'dd.span_id': dd_span_id}.to_json}\n"
  else
    "#{{datetime: datetime, progname: progname, severity: severity, msg: msg}.to_json}\n"
  end
end

logger.info("Example log line with trace correlation info")
```




[1]: https://ruby-doc.org/stdlib-3.0.0/libdoc/logger/rdoc/index.html
[2]: /es/tracing/other_telemetry/connect_logs_and_traces/ruby/#manually-inject-trace-and-span-ids
[3]: https://github.com/DataDog/trace-examples/blob/98626d924f82666de60d6b2d6a65d87eebebdff1/opentelemetry/ruby-microservice/app.rb#L21-L35
{{% /tab %}}

{{% tab "Java" %}}

Para correlacionar manualmente tus trazas con tus logs, primero activa la [Instrumentación MDC del registrador openTelemetry-java-instrumentation][1]. A continuación, parchea el módulo de registro que estés utilizando con un procesador que traduzca `trace_id` y `span_id` con formato de OpenTelemetry al formato de Datadog. El siguiente ejemplo utiliza [Spring Boot y Logback][2]. Para otras bibliotecas de logs, puede ser más apropiado [modificar los ejemplos del SDK de Datadog][3].

```java
String traceIdValue = Span.current().getSpanContext().getTraceId();
String traceIdHexString = traceIdValue.substring(traceIdValue.length() - 16 );
long datadogTraceId = Long.parseUnsignedLong(traceIdHexString, 16);
String datadogTraceIdString = Long.toUnsignedString(datadogTraceId);

String spanIdHexString = Span.current().getSpanContext().getSpanId();
long datadogSpanId = Long.parseUnsignedLong(spanIdHexString, 16);
String datadogSpanIdString = Long.toUnsignedString(datadogSpanId);

logging.pattern.console = %d{yyyy-MM-dd HH:mm:ss} - %logger{36} - %msg dd.trace_id=%X{datadogTraceIdString} dd.span_id=%X{datadogSpanIdString} %n
```

Consulta [la recopilación de log de Java][4] para saber cómo enviar tus logs de Java a Datadog.

[1]: https://github.com/open-telemetry/opentelemetry-java-instrumentation/blob/main/docs/logger-mdc-instrumentation.md
[2]: https://docs.spring.io/spring-boot/docs/2.1.18.RELEASE/reference/html/boot-features-logging.html
[3]: /es/tracing/other_telemetry/connect_logs_and_traces/java/?tab=log4j2#manually-inject-trace-and-span-ids
[4]: /es/logs/log_collection/java/?tab=logback
{{% /tab %}}

{{% tab "PHP" %}}

Para la correlación de trazas y logs en PHP, modifica los [ejemplos PHP del SDK de Datadog][1] para incluir los pasos adicionales comentados anteriormente.

[Ponte en contacto con el soporte de Datadog][2] si tienes alguna pregunta.




[1]: /es/tracing/other_telemetry/connect_logs_and_traces/php/
[2]: /es/help/
{{% /tab %}}

{{% tab "Go" %}}

Para correlacionar manualmente tus trazas con tus logs, parchea el módulo de registro que estés utilizando con una función que traduzca `trace_id` y `span_id` con formato de OpenTelemetry al formato de Datadog. El siguiente ejemplo utiliza la [biblioteca de logrus][1].

```go
package main

import (
    "context"
    log "github.com/sirupsen/logrus"
    "go.opentelemetry.io/otel"
    "strconv"
)

func main() {
    ctx := context.Background()
    tracer := otel.Tracer("example/main")
    ctx, span := tracer.Start(ctx, "example")
    defer span.End()

    log.SetFormatter(&log.JSONFormatter{})

    standardFields := log.Fields{
        "dd.trace_id": convertTraceID(span.SpanContext().TraceID().String()),
        "dd.span_id":  convertTraceID(span.SpanContext().SpanID().String()),
        "dd.service":  "serviceName",
        "dd.env":      "serviceEnv",
        "dd.version":  "serviceVersion",
    }

    log.WithFields(standardFields).WithContext(ctx).Info("hello world")
}

func convertTraceID(id string) string {
    if len(id) < 16 {
        return ""
    }
    if len(id) > 16 {
        id = id[16:]
    }
    intValue, err := strconv.ParseUint(id, 16, 64)
    if err != nil {
        return ""
    }
    return strconv.FormatUint(intValue, 10)
}


```

[Ponte en contacto con el soporte de Datadog][2] si tienes alguna pregunta.



[1]: https://github.com/sirupsen/logrus
[2]: /es/help/
{{% /tab %}}

{{% tab ".NET" %}}

Para correlacionar manualmente trazas con logs, convierte `TraceId` y `SpanId` de OpenTelemetry al formato utilizado por Datadog. Añade esos IDs a tus logs bajo los atributos `dd.trace_id` y `dd.span_id`. El siguiente ejemplo utiliza la [biblioteca de Serilog][1] y muestra cómo convertir los IDs de traza y log de OpenTelemetry (`System.DiagnosticSource.Activity`) al formato requerido por Datadog:

```csharp
var stringTraceId = Activity.Current.TraceId.ToString();
var stringSpanId = Activity.Current.SpanId.ToString();

var ddTraceId = Convert.ToUInt64(stringTraceId.Substring(16), 16).ToString();
var ddSpanId = Convert.ToUInt64(stringSpanId, 16).ToString();

using (LogContext.PushProperty("dd.trace_id", ddTraceId))
using (LogContext.PushProperty("dd.span_id", ddSpanId))
{
    Serilog.Log.Logger.Information("Example log line with trace correlation info");
}
```


[1]: https://serilog.net/
{{% /tab %}}

{{< /tabs >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/other_telemetry/connect_logs_and_traces/
[2]: https://github.com/open-telemetry/opentelemetry-specification/blob/eeef21259a12d61100804eff2e12ba06523821c3/specification/trace/api.md#retrieving-the-traceid-and-spanid
[3]: /es/api/latest/tracing/#send-traces