---
aliases:
- /es/tracing/trace_collection/otel_instrumentation/go/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/go
code_lang: otel
code_lang_weight: 2
description: Instrumenta tu aplicación Go con la API de OpenTelemetry, para enviar
  trazas (traces) a Datadog.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
kind: documentación
title: Instrumentación personalizada de Go con la API de OpenTelemetry
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}

## Importaciones

Importa los siguientes paquetes para configurar el proveedor de traza de Datadog y los casos de uso que se muestran a continuación:

```go
import (
    "context"
    "log"
    "os"

    "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/ext"
    ddotel "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry"
    ddtracer "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/tracer"

    "go.opentelemetry.io/otel"
    "go.opentelemetry.io/otel/attribute"
)
```

## Configuración

Para configurar OpenTelemetry para utilizar el proveedor de traza de Datadog:

1. Añade la instrumentación manual de OpenTelemetry deseada a tu código Go siguiendo la [documentación de la Instrumentación manual de OpenTelemetry Go][5]. **Importante**: Cuando esas instrucciones indiquen que tu código debe llamar al SDK de OpenTelemetry, llama a la biblioteca de rastreo de Datadog en su lugar.

2. Instala el paquete de OpenTelemetry `go.opentelemetry.io/otel` utilizando el comando:

   ```shell
   go get go.opentelemetry.io/otel
   ```

3. Instala el paquete wrapper de Datadog OpenTelemetry `gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry` utilizando el comando:

   ```shell
   go get gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry
   ```

4. Importa paquetes en el código:

   ```go
   import (
     "go.opentelemetry.io/otel"
     ddotel "gopkg.in/DataDog/dd-trace-go.v1/ddtrace/opentelemetry"
   )
   ```

5. Crea un TracerProvider, proporcionando opcionalmente un conjunto de opciones, que son específicos de Datadog APM , y aplaza el método Shutdown, que detiene el rastreador:

   ```go
   provider := ddotel.NewTracerProvider()
   defer provider.Shutdown()
   ```

6. Utiliza la instancia TracerProvider con la API de OpenTelemetry para establecer el TracerProvider global:

   ```go
   otel.SetTracerProvider(provider)
   ```

7. Ejecuta tu aplicación.

Datadog combina estos tramos de OpenTelemetry con otros tramos de Datadog APM tramos en una única traza de tu aplicación.

## Añadir etiquetas al tramo

Añade etiquetas personalizadas a tus tramos para adjuntar metadatos y contexto adicionales a tus trazas.

```go
// Solo se puede hacer después de los pasos de configuración, como inicializar el rastreador.

// Iniciar un tramo.
ctx, span := t.Start(ctx, "read.file")
// Establece un atributo, o una etiqueta de la terminología de Datadog, en un tramo.
span.SetAttributes(attribute.String(ext.ResourceName, "test.json"))
```

### Añadir etiquetas globalmente a todos los tramos

Añade etiquetas a todos los tramos configurando el rastreador con la opción `WithGlobalTag`:

```go
// Aquí podemos aprovechar las opciones del rastreador de Datadog pasándolas a la función
// NewTracerProvider.
provider := ddotel.NewTracerProvider(
    ddtracer.WithGlobalTag("datacenter", "us-1"),
    ddtracer.WithGlobalTag("env", "dev"),
)
defer provider.Shutdown()

// Úsala con la API de OpenTelemetry para establecer el TracerProvider global.
otel.SetTracerProvider(provider)

// Inicia el rastreador con la API de OpenTelemetry.
t := otel.Tracer("")
```

### Configuración de errores en un tramo

Para establecer un error en un tramo, utiliza el método `setStatus` de la siguiente manera:

```go
// Inicia un tramo.
ctx, span := t.Start(context.Background(), "span_name")

...
// Establece un error en un tramo con 'span.SetAttributes'.
span.SetAttributes(attribute.String(ext.ErrorMsg, "error_message"))

// Alternativamente, es posible establecer un error en un tramo mediante las opciones de tramo final. 
EndOptions(sp, tracer.WithError(errors.New("persisted_option")))
sp.End()

```

## Añadir tramos

A diferencia de otras bibliotecas de rastreo de Datadog, al rastrear aplicaciones de Go, es recomendado que gestiones y pases explícitamente el contexto de Go de tus tramos. Este enfoque asegura relaciones de tramo precisas y un rastreo con sentido. Para más información, consulta la [documentación de la biblioteca de contexto de Go][16] o la documentación de cualquier biblioteca de terceros integrada con tu aplicación.

```go
// Solo se puede hacer después de los pasos de configuración.

// Aquí podemos aprovechar context.Context para pasar en opciones de tramo de inicio específicos de Datadog,
// como 'ddtracer.Measured()'
ctx, span := t.Start(
    ddotel.ContextWithStartOptions(context.Background(), ddtracer.Measured()), "span_name")

span.End()
```

## Rastrear la configuración del cliente y el Agent

Existen configuraciones adicionales que deben tenerse en cuenta tanto para el cliente de rastreo como para el Datadog Agent:
- Propagación del contexto con encabezados B3
- Excluye recursos específicos del envío de trazas a Datadog si no deseas incluir estas trazas en métricas calculadas, como checks de estado.


### Propagación de contexto con extracción e inyección de encabezados

Puedes configurar la propagación de contexto para trazas distribuidas al inyectar y extraer encabezados. Consulta [Propagación de contexto de traza][13] para obtener información.

### Filtrado de recursos

Las trazas se pueden excluir en función de su nombre de recurso, para eliminar el tráfico Synthetic, como los checks de estado, de la notificación de trazas a Datadog. Esta y otras configuraciones de seguridad y ajuste se pueden encontrar en la página de [Seguridad][14].


[1]: https://opentelemetry.io/docs/instrumentation/go/manual/#propagators-and-context
[2]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-processor
[3]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#span-exporter
[4]: https://opentelemetry.io/docs/reference/specification/trace/sdk/#id-generators
[5]: https://opentelemetry.io/docs/instrumentation/go/manual/
[6]: https://opentelemetry.io/docs/instrumentation/go/
[9]: /es/tracing/trace_collection/trace_context_propagation/go/
[12]: /es/opentelemetry/guide/otel_api_tracing_interoperability/
[13]: /es/tracing/trace_collection/trace_context_propagation/go/
[14]: /es/tracing/security
[15]: /es/tracing/glossary/#trace
[16]: https://pkg.go.dev/context