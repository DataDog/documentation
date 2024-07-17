---
aliases:
- /es/tracing/opentracing/go
- /es/tracing/manual_instrumentation/go
- /es/tracing/custom_instrumentation/go
- /es/tracing/setup_overview/custom_instrumentation/go
- /es/tracing/trace_collection/custom_instrumentation/go
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/go
code_lang: dd-api
code_lang_weight: 1
description: Instrumenta tu código con el rastreador de Datadog Go APM.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentación
  text: Conectar tu logs y trazas
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
kind: documentación
title: Instrumentación personalizada de Go con la API de Datadog
type: multi-code-lang
---
<div class="alert alert-info">
Si aún no has leído las instrucciones de autoinstrumentación y configuración, empieza por las <a href="https://docs.datadoghq.com/tracing/setup/go/">instrucciones de configuración de Go</a>.
</div>

En esta página, se detallan casos de uso comunes para añadir y personalizar la observabilidad con Datadog APM.

## Añadir etiquetas

Añade [etiquetas (tags) de tramo (span)][1] personalizadas a tus [tramos][2] para personalizar tu capacidad de observación dentro de Datadog. Las etiquetas de tramo se aplican a tus trazas entrantes, lo que te permite correlacionar el comportamiento observado con información a nivel de código, como el nivel de comerciante, el importe del pago o el ID de usuario.

### Añadir etiquetas de tramo personalizadas

Añade [etiquetas][1] directamente a una interfaz `Span` llamando a `SetTag`:

```go
package main

import (
    "log"
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Crear un tramo para una solicitud web en la URL /posts.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Establecer la etiqueta
    span.SetTag("http.url", r.URL.Path)
    span.SetTag("<TAG_KEY>", "<TAG_VALUE>")
}

func main() {
    tracer.Start(tracer.WithService("<SERVICE_NAME>"))
    defer tracer.Stop()
    http.HandleFunc("/posts", handler)
    log.Fatal(http.ListenAndServe(":8080", nil))
}
```

Las integraciones de Datadog hacen uso del tipo `Context` para propagar el [tramo][2] activo actual.
Si deseas añadir etiquetas de tramo adjuntas a un `Context`, llama a la función `SpanFromContext`:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Recupera un tramo para una solicitud web adjunta a un contexto de Go.
    if span, ok := tracer.SpanFromContext(r.Context()); ok {
        // Establecer etiqueta
        span.SetTag("http.url", r.URL.Path)
    }
}
```

### Añadir etiquetas globalmente a todos los tramos

Añade [etiquetas][1] a todos los [tramos][2] configurando el rastreador con la opción `WithGlobalTag`:

```go
package main

import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
    tracer.Start(
        tracer.WithGlobalTag("datacenter", "us-1"),
        tracer.WithGlobalTag("env", "dev"),
    )
    defer tracer.Stop()
}
```

### Configuración de errores en un tramo

Para establecer un error en uno de tus tramos, utiliza `tracer.WithError` como se indica a continuación:

```go
err := someOperation()
span.Finish(tracer.WithError(err))
```

## Añadir tramos

Si no utilizas la instrumentación de biblioteca compatible (consulta [Compatibilidad de bibliotecas][3]), puede que desees instrumentar manualmente tu código.

<div class="alert alert-info">
A diferencia de otras bibliotecas de rastreo de Datadog, al rastrear aplicaciones de Go, es recomendado que gestiones y pases explícitamente el contexto de Go de tus tramos. Este enfoque asegura relaciones de tramo precisas y un rastreo con sentido. Para más información, consulta la <a href="https://pkg.go.dev/context">documentación de la biblioteca de contexto de Go</a> o la documentación de cualquier biblioteca de terceros integrada con tu aplicación.
</div>

### Creación manual de un nuevo tramo

Para hacer uso de la instrumentación manual, utiliza el paquete `tracer` que está documentado en la [página godoc][4] de Datadog:

Hay dos funciones disponibles para crear tramos. Los detalles de la API están disponibles para `StartSpan` [aquí][5] y para `StartSpanFromContext` [aquí][6].

```go
//Crea un tramo con un nombre de recurso, que es el tramo secundario de parentSpan.
span := tracer.StartSpan("mainOp", tracer.ResourceName("/user"), tracer.ChildOf(parentSpan))

// Crea un tramos que será el tramo secundario del tramo en el contexto Context, si hay un tramo en el contexto.
// Devuelve el nuevo tramo y un nuevo contexto que contiene el nuevo tramo.
span, ctx := tracer.StartSpanFromContext(ctx, "mainOp", tracer.ResourceName("/user"))
```

### Trazas asíncronas

```go
func main() {
    span, ctx := tracer.StartSpanFromContext(context.Background(), "mainOp")
    defer span.Finish()

    go func() {
        asyncSpan := tracer.StartSpanFromContext(ctx, "asyncOp")
        defer asyncSpan.Finish()
        performOp()
    }()
}
```

### Rastreo distribuido

Crea una [traza][7] distribuida propagando manualmente el contexto de rastreo:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    span, ctx := tracer.StartSpanFromContext(r.Context(), "post.process")
    defer span.Finish()

    req, err := http.NewRequest("GET", "http://example.com", nil)
    req = req.WithContext(ctx)
    // Inyecta el tramo Context en los encabezados de solicitud
    err = tracer.Inject(span.Context(), tracer.HTTPHeadersCarrier(req.Header))
    if err != nil {
        // Error de inyección de error o identificador
    }
    http.DefaultClient.Do(req)
}
```

A continuación, en el lado del servidor, para continuar la traza, inicia un nuevo [tramo][2] a partir del `Context` extraído:

```go
package main

import (
    "net/http"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Extrae el tramo Context y continúa la traza en este servicio
    sctx, err := tracer.Extract(tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // Error de extracción de log o identificador
    }

    span := tracer.StartSpan("post.filter", tracer.ChildOf(sctx))
    defer span.Finish()
}
```

## Rastrear la configuración del cliente y el Agent

Existen configuraciones adicionales posibles tanto para el cliente de rastreo como para el Datadog Agent para la propagación del contexto con encabezados B3, así como para excluir recursos específicos del envío de trazas a Datadog en el caso que no desees estas trazas en métricas calculadas, como checks de estado.


### Propagación de contexto con extracción e inyección de encabezados

Puedes configurar la propagación de contexto para trazas distribuidas al inyectar y extraer encabezados. Consulta [Propagación de contexto de traza][11] para obtener información.

### Filtrado de recursos

Las trazas se pueden excluir en función de su nombre de recurso, para eliminar el tráfico Synthetic, como los checks de estado, de la notificación de trazas a Datadog. Esta y otras configuraciones de seguridad y ajuste se pueden encontrar en la página de [Seguridad][9].

## Lectura adicional

{{< nombre parcial="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#span-tags
[2]: /es/tracing/glossary/#spans
[3]: /es/tracing/setup/go/#compatibility
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpan
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpanFromContext
[7]: /es/tracing/glossary/#trace
[9]: /es/tracing/security
[11]: /es/tracing/trace_collection/trace_context_propagation/go/