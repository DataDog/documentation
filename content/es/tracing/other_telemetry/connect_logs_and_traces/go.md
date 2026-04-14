---
aliases:
- /es/tracing/connect_logs_and_traces/go
code_lang: go
code_lang_weight: 30
description: Conecta tus logs y trazas (traces) de Go para correlacionarlos en Datadog.
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentación
  text: Instrumenta tu aplicación de forma manual para crear trazas.
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: Blog
  text: Correlacionar automáticamente logs de solicitud con trazas
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilita la solución de problemas con una correlación entre productos.
title: Correlación de logs y trazas de Go
type: multi-code-lang
---

## Inyección manual

La API del rastreador Go permite imprimir información de tramo (span) junto con sentencias de log mediante el especificador de formato `%v`:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer" // 1.x
    // "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer" // 2.x
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Append span info to log messages:
    log.Printf("my log message %v", span)
}
```

El ejemplo anterior ilustra cómo utilizar el contexto del tramo en el paquete `log` de la librería estándar. Una lógica similar puede aplicarse también a paquetes de terceros.

**Nota**: Si no estás utilizando una [integración de logs de Datadog][1] para analizar tus logs, las reglas personalizadas de análisis de logs deben garantizar que `dd.trace_id`, `dd.span_id`, `dd.service`, `dd.env` y `dd.version` se analizan como cadenas. Encontrarás más información en [Logs correlacionados no aparecen en el panel de ID de traza][2].

## Inyección en logs Logrus

Hay disponible un hook para el paquete de Logrus para vincular automáticamente tus logs y tramos.
El paquete está disponible en el rastreador Go.

```go
package main

import (
    "github.com/sirupsen/logrus"

    dd_logrus "gopkg.in/DataDog/dd-trace-go.v1/contrib/sirupsen/logrus" // 1.x
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer" // 1.x
    // dd_logrus "github.com/DataDog/dd-trace-go/contrib/sirupsen/logrus/v2" // 2.x
    // "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer" // 2.x
)

func main() {
    // Optional: Change log format to use JSON (Cf. Go Log Collection)
    logrus.SetFormatter(&logrus.JSONFormatter{})

    // Add Datadog context log hook
    logrus.AddHook(&dd_logrus.DDContextLogHook{})

    // ...
}
```

Esto inyecta automáticamente el ID de traza a tus logs cuando generas logs con el contexto.
```go
    // Log with the context
    logrus.WithContext(ctx).Info("Go logs and traces connected!")
```

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_collection/go/#configure-your-logger
[2]: /es/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
