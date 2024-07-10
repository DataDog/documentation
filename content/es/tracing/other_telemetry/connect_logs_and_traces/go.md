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
kind: documentación
title: Correlación de logs y trazas de Go
type: multi-code-lang
---

## Inyección manual

La API de rastreador de Go permite imprimir información de tramo (span) junto con sentencias de log mediante el especificador de formato `%v`:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Crea un tramo para una solicitud web en la URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Anexa información del tramo a mensajes de log:
    log.Printf("my log message %v", span)
}
```

El ejemplo anterior ilustra cómo utilizar el contexto del tramo en el paquete `log` de la biblioteca estándar. Una lógica similar puede aplicarse también a paquetes de terceros.

**Nota**: Si no estás utilizando [una integración de log de Datadog][1] para analizar tus logs, las reglas personalizadas de parseo de log, deben asegurarse de que `dd.trace_id`, `dd.span_id`, `dd.service`, `dd.env` y `dd.version` se analizan como cadenas. Encontrarás más información en [Los logs correlacionados no aparecen en el panel de ID de traza][2].

## Inyección en logs de logrus

Hay disponible un hook para el paquete de logrus para vincular automáticamente tus logs y tramos.
El paquete está disponible en el rastreador de Go.

```go
package main

import (
    "github.com/sirupsen/logrus"

    dd_logrus "gopkg.in/DataDog/dd-trace-go.v1/contrib/sirupsen/logrus"
    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    // Opcional: Cambia el formato de log para usar JSON (Cf. Go Log Collection)
    logrus.SetFormatter(&logrus.JSONFormatter{})

    // Añade un hook de log de contexto de Datadog
    logrus.AddHook(&dd_logrus.DDContextLogHook{}) 

    // ...
}
```

Esto inyecta automáticamente el ID de traza a tus logs cuando logueas con el contexto.
```go
    // Loguear con el contexto
    logrus.WithContext(ctx).Info("Go logs and traces connected!")
```

## Lectura adicional

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: /es/logs/log_collection/go/#configure-your-logger
[2]: /es/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom