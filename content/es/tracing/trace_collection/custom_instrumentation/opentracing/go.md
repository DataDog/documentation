---
aliases:
- /es/tracing/setup_overview/open_standards/go
- /es/tracing/trace_collection/open_standards/go
- /es/tracing/trace_collection/opentracing/go/
code_lang: go
code_lang_weight: 30
description: ' Instrumentación de OpenTracing para Go'
title: Instrumentación de Go OpenTracing
type: multi-code-lang
---


Datadog es compatible con el estándar de OpenTracing. Para obtener más detalles e información, consulta la [API de OpenTracing][1], o consulta la información de configuración que aparece a continuación.

## Configuración

Importa el [paquete `opentracer`][2] para exponer el rastreador de Datadog como un rastreador de [OpenTracing][3] compatible.

Un ejemplo de uso básico:

```go
package main

import (
    "github.com/opentracing/opentracing-go"

    "github.com/DataDog/dd-trace-go/ddtrace/opentracer"
    "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
)

func main() {
    // Inicia el rastreador regular y devuélvelo como una interfaz opentracing.Tracer.
    // Puedes usar el mismo conjunto de opciones como lo harías normalmente con el rastreador de Datadog.
    t := opentracer.New(tracer.WithService("<SERVICE_NAME>"))

    // Detenlo con la llamada a Stop (Detener) para el paquete del rastreador.
    defer tracer.Stop()

    // Configura el rastreador de OpenTracing global.
    opentracing.SetGlobalTracer(t)

    // Usa la API de OpenTracing como siempre.
}
```

[1]: https://github.com/opentracing/opentracing-go
[2]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/ddtrace/opentracer
[3]: http://opentracing.io