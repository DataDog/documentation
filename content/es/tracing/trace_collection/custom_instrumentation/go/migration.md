---
aliases:
- /es/tracing/trace_collection/custom_instrumentation/opentracing/go
description: Actualiza tu rastreador de Go de la v1 a la v2.
further_reading:
- link: tracing/trace_collection/custom_instrumentation/go/dd-api
  tag: Documentación
  text: Comienza con la v1 del rastreador de Go
title: Migrar a Go Tracer v2
---

## Información general

El Go Tracer v2 introduce mejoras en la API, un mejor rendimiento y una mayor compatibilidad con las prácticas de Go modernas. Representa la última versión estable de la biblioteca de rastreo de Go de Datadog.

## Compatibilidad

A la hora de decidir qué versión del Go Tracer utilizar, ten en cuenta las siguientes orientaciones:

- **Para nuevos proyectos**: Datadog recomienda utilizar la v2 para todos los nuevos proyectos.
- **Para proyectos existentes**: Datadog recomienda migrar las aplicaciones existentes a la v2 para aprovechar las mejoras y la continuación del soporte.

## Política de compatibillidad

Aunque la v1 sigue estando disponible, la v2 es la principal versión compatible de Datadog. Todas las versiones de la v1 a partir de la v1.74.0 no contendrán nuevas funciones y se considerarán versiones de transición. Estas versiones mantienen la API de la v1 pero utilizan la v2 en su interior. El uso de una versión v1 de transición junto con la v2 permite migrar los servicios gradualmente. 

Para más detalles sobre compatibilidad y soporte, consulta [Compatibilidad de la biblioteca de Go][2].

## Cambios específicos de los productos

Los diferentes productos de Datadog tienen consideraciones específicas a la hora de migrar de v1 a v2. Esto es lo que necesitas saber para cada uno de ellos.

### Rastreo

La API de rastreo de la v2 ofrece mejoras significativas al tiempo que mantiene una experiencia similar para los desarrolladores. La migración suele implicar la actualización de las rutas de importación y la adaptación a algunos cambios de la API.

Los marcos compatibles han cambiado entre la v1 y la v2 del Go Tracer.

Para más información, consulta [Compatibilidad de la biblioteca de Go][4].

### Generación de perfiles

Para el perfilador, sólo es necesario actualizar las rutas de importación. La funcionalidad de la API de creación de perfiles sigue siendo la misma entre v1 y v2.

### App and API Protection (AAP)

Los paquetes compatibles han cambiado entre la v1 y la v2 del Go Tracer.

Para más información, consulta [Compatibilidad de lenguajes y marcos de AAP][3].

### Software Composition Analysis (SCA)

Solo es necesario actualizar las rutas de importación. La compatibilidad del marco para SCA es la misma entre v1 y v2.

## Mejoras de la versión 2

El Go Tracer v2 introduce varias mejoras importantes:

- **Ruta de importación moderna**: pasa de `gopkg.in` a la ruta de importación estándar de GitHub para una mejor compatibilidad con los módulos de Go.
- **Diseño mejorado de la API**: proporciona una interfaz más intuitiva con mejor rendimiento y extensibilidad futura.
- **Huella de dependencia reducida**: aísla las integraciones para que solo tengas que pedir lo que necesitas.
- **Seguridad mejorada**: evita falsos positivos en las herramientas de escaneo de seguridad.
- **Mayor compatibilidad con OpenTelemetry**: incluye propagación de contexto de trazas W3C y compatibilidad con ID de traza de 128 bits.

## Instrucciones de migración

Datadog proporciona una herramienta de migración que gestiona automáticamente la mayoría de las actualizaciones de código al pasar de v1 a v2.

Para comprobar si hay actualizaciones, ejecuta el siguiente comando:

```shell
go install github.com/DataDog/dd-trace-go/tools/v2fix@latest
# In your repository's directory
v2fix .
```

Para aplicar todas las correcciones sugeridas, ejecuta:

```shell
v2fix -fix .
```

La herramienta realiza los siguientes cambios:

1. Actualiza las URLs de importación de `gopkg.in/DataDog/dd-trace-go.v1` a `github.com/DataDog/dd-trace-go/v2`.
2. Desplaza las importaciones de `ddtrace` a `ddtrace/tracer` cuando procede.
3. Convierte las llamadas a `Span` y `SpanContext` para utilizar valores concretos.
4. Sustituye las llamadas a `WithServiceName` no admitidas por `WithService`.
5. Actualiza las llamadas de `TraceID` a `TraceIDLower` para obtener IDs de trazas `uint64`.

## Cambios de última hora

### Cambios en la ruta de importación

Cambiar todas las importaciones de:
```go
import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
import "gopkg.in/DataDog/dd-trace-go.v1/profiler"
```

A:
```go
import "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"
import "github.com/DataDog/dd-trace-go/v2/profiler"
```

### Cambios en la estructura de los paquetes

La organización del paquete ha cambiado en la v2. Muchas funciones que antes estaban en `ddtrace` se han trasladado al paquete `ddtrace/tracer`. Aunque la herramienta de migración `v2fix` gestiona estos cambios automáticamente, es posible que tengas que actualizar manualmente algunas rutas de importación.

v1:
```go
import (
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace"
  "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"
)

func main() {
    tracer.Start()
      defer tracer.Stop()

      s := tracer.StartSpan("op")
      var ctx ddtrace.SpanContext = s.Context()
}
```

v2:
```go
import "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"

func main() {
    tracer.Start()
      defer tracer.Stop()

      s := tracer.StartSpan("op")
      var ctx *tracer.SpanContext = s.Context()
}
```

### Cambios en la API

Las mejoras de la API han hecho que cambien algunas funciones y tipos. Para más información, consulta la [página de godoc para dd-trace-go v2][1].

#### Tramos

`Span` y `SpanContext` se representan ahora como una estructura en lugar de una interfaz, lo que significa que las referencias a estos tipos deben utilizar un indicador. También se han trasladado al paquete `tracer`, por lo que se debe acceder a ellos utilizando `tracer.Span` en lugar de `ddtrace.Span`.

v1:
```go
var sp ddtrace.Span = tracer.StartSpan("opname")
var ctx ddtrace.SpanContext = sp.Context()
```

v2:
```go
var sp *tracer.Span = tracer.StartSpan("opname")
var ctx *tracer.SpanContext = sp.Context()
```

##### Interfaces ddtrace obsoletas

Todas las interfaces de `ddtrace` se han eliminado en favor de los tipos struct. Los nuevos tipos se han trasladado a `ddtrace/tracer`.

##### Constantes y opciones obsoletas

Se han eliminado las siguientes constantes y funciones:

- `ddtrace/ext.AppTypeWeb`
- `ddtrace/ext.CassandraQuery`
- `ddtrace/ext.CassandraBatch`
- `ddtrace/tracer.WithPrioritySampling`; el muestreo prioritario está activado por defecto.
- `ddtrace/tracer.WithHTTPRoundTripper`; utiliza `WithHTTPClient` en su lugar.

#### StartChild

Los tramos secundarios se inician con `StartChild` en lugar de `ChildOf`:

v1:
```go
import "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

func main() {
  tracer.Start()
    defer tracer.Stop()

    parent := tracer.StartSpan("op").Context()
    child := tracer.StartSpan("op", tracer.ChildOf(parent))
}
```

v2:
```go
import "github.com/DataDog/dd-trace-go/v2/ddtrace/tracer"

func main() {
  tracer.Start()
    defer tracer.Stop()

    parent := tracer.StartSpan("op")
    child := parent.StartChild("op")
}
```

#### ID de traza

En lugar de `uint64`, los IDs de traza se representan ahora como `string`. Este cambio permitirá la compatibilidad con los IDs de traza de 128 bits. Todavía se puede acceder al comportamiento antiguo utilizando el nuevo método `TraceIDLower()`, aunque se recomienda cambiar a los IDs de 128 bits.

v1:
```go
sp := tracer.StartSpan("opname")
fmt.Printf("traceID: %d\n", sp.Context().TraceID())
```

v2:
```go
sp := tracer.StartSpan("opname")
fmt.Printf("traceID: %s\n", sp.Context().TraceID()) //recommended for using 128-bit IDs
fmt.Printf("traceID: %d\n", sp.Context().TraceIDLower()) // for maintaining old behavior with 64-bit IDs
```

#### API de enlaces de tramo

`Span.AddSpanLink` ha pasado a llamarse `Span.AddLink`.

### Cambios en la configuración

#### WithService

La opción `WithServiceName` se ha sustituido por `WithService` por motivos de coherencia:
```go
// v1
tracer.Start(tracer.WithServiceName("my-service"))

// v2
ddtrace.Start(ddtrace.WithService("my-service"))
```
#### WithDogstatsdAddress

`tracer.WithDogstatsdAddress` se ha renombrado a `tracer.WithDogstatsdAddr`. Utiliza esta opción para especificar una dirección de DogStatsD diferente al iniciar el rastreador.

v1:
```go
tracer.Start(tracer.WithDogstatsdAddress("10.1.0.12:4002"))
```

v2:
```go
tracer.Start(tracer.WithDogstatsdAddr("10.1.0.12:4002"))
```

#### WithAgentURL

`tracer.WithAgentURL` establece la dirección por URL donde se encuentra el agent, además de la opción existente `WithAgentAddr`. Es útil para configuraciones en las que el agent está a la escucha de un socket de dominio Unix:

v2:
```go
tracer.Start(tracer.WithAgentURL("unix:///var/run/datadog/apm.socket"))
```

#### NewStartSpanConfig, WithStartSpanConfig y WithFinishConfig

Estas opciones funcionales para `ddtrace/tracer.Tracer.StartSpan` y `ddtrace/tracer.Span.Finish` reducen el número de llamadas (en forma de opción funcional) en los bucles activos al dar la libertad de preparar una configuración común para el tramo en las rutas activas.

v1:
```go
var err error
span := tracer.StartSpan(
    "operation",
    ChildOf(parent.Context()),
    Measured(),
    ResourceName("resource"),
    ServiceName(service),
    SpanType(ext.SpanTypeWeb),
    Tag("key", "value"),
)
defer span.Finish(tracer.NoDebugStack())
```

v2:
```go
cfg := tracer.NewStartSpanConfig(
    tracer.Measured(),
    tracer.ResourceName("resource"),
    tracer.ServiceName(service),
    tracer.SpanType(ext.SpanTypeWeb),
    tracer.Tag("key", "value"),
)
finishCfg := tracer.NewFinishConfig(
    NoDebugStack(),
)
// [...]
// Reuse the configuration in your hot path:
span := parent.StartChild("operation", tracer.WithStartSpanConfig(cfg))
defer span.Finish(tracer.WithFinishConfig(finishCfg))
```

#### API de muestreo simplificada

Se han suprimido las siguientes funciones en favor de `SpanSamplingRules` y `TraceSamplingRules`:

* `NameRule`
* `NameServiceRule`
* `RateRule`
* `ServiceRule`
* `SpanNameServiceMPSRule`
* `SpanNameServiceRule`
* `SpanTagsResourceRule`
* `TagsResourceRule`

Además, la etiqueta `ext.SamplingPriority` está obsoleta. Utiliza `ext.ManualKeep` y `ext.ManualDrop` en su lugar.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://pkg.go.dev/github.com/DataDog/dd-trace-go/v2/
[2]: /es/security/code_security/software_composition_analysis/setup_runtime/compatibility/go
[3]: /es/security/application_security/threats/setup/compatibility/go
[4]: /es/tracing/trace_collection/compatibility/go/#go-tracer-support