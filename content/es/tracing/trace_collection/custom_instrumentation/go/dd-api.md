---
aliases:
- /es/tracing/opentracing/go
- /es/tracing/manual_instrumentation/go
- /es/tracing/custom_instrumentation/go
- /es/tracing/setup_overview/custom_instrumentation/go
- /es/tracing/trace_collection/custom_instrumentation/go
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/go
code_lang: dd-api
code_lang_weight: 2
description: Instrumenta tu código con el rastreador Go Datadog APM.
further_reading:
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentación
  text: Conectar tus logs y trazas (traces)
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
title: Instrumentación personalizada de Go con la API de Datadog
type: multi-code-lang
---

<div class="alert alert-info">
Si aún no has leído las instrucciones de autoinstrumentación y configuración, empieza por las <a href="https://docs.datadoghq.com/tracing/setup/go/">instrucciones de configuración de Go</a>.
</div>

En esta página se detallan casos de uso comunes para añadir y personalizar la observabilidad con Datadog APM.

{{% tracing-go-v2 %}}

## Añadir etiquetas (tags)

Añade [etiquetas (de tramo (span)][1] personalizadas a tus [tramos][2] para personalizar tu observabilidad dentro de Datadog. Las etiquetas de tramo se aplican a tus trazas (traces) entrantes, lo que te permite correlacionar el comportamiento observado con información a nivel de código, como el nivel de comerciante, el importe del pago o el ID de usuario.

### Añadir etiquetas de tramos personalizadas

Añade [etiquetas][1] directamente a una interfaz `Span` llamando a `SetTag`:

```go
package main

import (
    "log"
    "net/http"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer" 
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Create a span for a web request at the /posts URL.
    span := tracer.StartSpan("web.request", tracer.ResourceName("/posts"))
    defer span.Finish()

    // Set tag
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
Si quieres añadir etiquetas de tramo adjuntas a un `Context`, llama a la función `SpanFromContext`:

```go
package main

import (
    "net/http"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Retrieve a span for a web request attached to a Go Context.
    if span, ok := tracer.SpanFromContext(r.Context()); ok {
        // Set tag
        span.SetTag("http.url", r.URL.Path)
    }
}
```

### Añadir etiquetas globalmente a todos los tramos

Añade [etiquetas][1] a todos los [tramos][2] configurando el rastreador con la opción `WithGlobalTag`:

```go
package main

import (
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func main() {
    tracer.Start(
        tracer.WithGlobalTag("datacenter", "us-1"),
        tracer.WithGlobalTag("env", "dev"),
    )
    defer tracer.Stop()
}
```

### Definir errores en un tramo

Para definir un error en uno de sus tramos, utiliza `tracer.WithError` como se indica a continuación:

```go
err := someOperation()
span.Finish(tracer.WithError(err))
```

## Añadir tramos

Si no utilizas la instrumentación de biblioteca compatible (consulta [Compatibilidad de bibliotecas][3]), puede que desees instrumentar manualmente tu código.

<div class="alert alert-info">
A diferencia de otras bibliotecas de rastreo de Datadog, al rastrear aplicaciones de Go, es recomendado que gestiones y pases explícitamente el contexto de Go de tus tramos. Este enfoque asegura relaciones de tramo precisas y un rastreo con sentido. Para más información, consulta la <a href="https://pkg.go.dev/context">documentación de la biblioteca de contexto de Go</a> o la documentación de cualquier biblioteca de terceros integrada con tu aplicación.
</div>

### Creación manual de un span (tramo)

Para crear spans (tramos) manualmente, utiliza el paquete `tracer` (consulta la [API v2 en godoc de Datadog][12]; para v1, consulte la [godoc v1][4]).

Puedes crear spans (tramos) de dos maneras:
- Inicia un secundario a partir de un span (tramo) existente con [`StartChild` para v2][13] o [`StartSpan` para v1][5]. 
- Inicia un span (tramo) desde un contexto con `StartSpanFromContext` (consulta los detalles de la API para [v2][14] o [v1][6]).

```go
//v2: Create a span with a resource name, which is the child of parentSpan.
span := parentSpan.StartChild("mainOp", tracer.ResourceName("/user"))

//v1: Create a span with a resource name, which is the child of parentSpan.
span := tracer.StartSpan("mainOp", tracer.ResourceName("/user"), tracer.ChildOf(parentSpan))

// v1 and v2: Create a span which will be the child of the span in the Context ctx, if there is a span in the context.
// Returns the new span, and a new context containing the new span.
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

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    span, ctx := tracer.StartSpanFromContext(r.Context(), "post.process")
    defer span.Finish()

    req, err := http.NewRequest("GET", "http://example.com", nil)
    req = req.WithContext(ctx)
    // Inject the span Context in the Request headers
    err = tracer.Inject(span.Context(), tracer.HTTPHeadersCarrier(req.Header))
    if err != nil {
        // Handle or log injection error
    }
    http.DefaultClient.Do(req)
}
```

A continuación, en el lado del servidor, para continuar la traza, inicia un nuevo [tramo][2] a partir del `Context` extraído:

```go
package main

import (
    "net/http"

    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func handler(w http.ResponseWriter, r *http.Request) {
    // Extract the span Context and continue the trace in this service
    sctx, err := tracer.Extract(tracer.HTTPHeadersCarrier(r.Header))
    if err != nil {
        // Handle or log extraction error
    }

    span := tracer.StartSpan("post.filter", tracer.ChildOf(sctx))
    defer span.Finish()
}
```

## Rastrear la configuración del cliente y el Agent

Existen configuraciones adicionales posibles tanto para el cliente de rastreo como para el Datadog Agent para la propagación del contexto con encabezados B3, así como para excluir recursos específicos del envío de trazas a Datadog en el caso que no desees estas trazas en métricas calculadas, como checks de estado.


### Propagación del contexto con extracción e inserción de cabeceras

Puedes configurar la propagación de contexto para trazas distribuidas al inyectar y extraer encabezados. Consulta [Propagación de contexto de traza][11] para obtener información.

### Filtrado de recursos

Las trazas se pueden excluir en función de su nombre de recurso, para eliminar el tráfico Synthetic, como los checks de estado, de la notificación de trazas a Datadog. Esta y otras configuraciones de seguridad y ajuste se pueden encontrar en la página de [Seguridad][9].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#span-tags
[2]: /es/tracing/glossary/#spans
[3]: /es/tracing/setup/go/#compatibility
[4]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer
[5]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpan
[6]: https://pkg.go.dev/gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer#StartSpanFromContext
[7]: /es/tracing/glossary/#trace
[9]: /es/tracing/security
[11]: /es/tracing/trace_collection/trace_context_propagation/
[12]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer
[13]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#StartSpan
[14]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/tracer#StartSpanFromContext