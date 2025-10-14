---
algolia:
  tags:
  - C#
  - APM
aliases:
- /es/tracing/trace_collection/otel_instrumentation/dotnet/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/dotnet
code_lang: otel
code_lang_weight: 2
description: Instrumenta tu aplicación .NET con la API OpenTelemetry para enviar trazas
  (traces) a Datadog.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: Instrumentación de .NET personalizada utilizando la API OpenTelemetry
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}

## Configuración

Para configurar OpenTelemetry para utilizar el proveedor de traza de Datadog:

1. Añade la instrumentación manual de OpenTelemetry deseada a tu código .NET siguiendo la [documentación de la Instrumentación manual de OpenTelemetry .NET][5]. **Nota**: Cuando esas instrucciones indiquen que tu código debe llamar al SDK de OpenTelemetry, llama a la biblioteca de rastreo de Datadog en su lugar.

2. Instala la biblioteca de rastreo Datadog .NET y activa el rastreador para tu [servicio .NET Framework][10] o tu [servicio .NET Core (y .NET v5 o posterior)][11]. **Vista previa**: también puedes hacerlo con la [instrumentación APM de un solo paso][13].

3. Establece la variable de entorno `DD_TRACE_OTEL_ENABLED` en `true`.

4. Ejecuta tu aplicación.

Datadog combina estos tramos de OpenTelemetry con otros tramos de Datadog APM en una traza única de tu aplicación. También es compatible con [la biblioteca de instrumentación de OpenTelemetry][8].

## Creación de tramos personalizados

Para crear tramos manualmente que inicien una nueva traza independiente:

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

// Start a new span
using (Activity? activity = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
            {
  activity?.SetTag("operation.name", "custom-operation");
               // Do something
            }

```

## Creación de tramos (spans)

Para crear tramos personalizados dentro de un contexto de traza existente:

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

using (Activity? parentScope = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
{
   parentScope?.SetTag("operation.name", "manual.sortorders");
   using (Activity? childScope = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
   {
       // Nest using statements around the code to trace
       childScope?.SetTag("operation.name", "manual.sortorders.child");
       SortOrders();
   }
}
```

## Añadir etiquetas (tags) al tramo

Añade etiquetas personalizadas a tus tramos para proporcionar un contexto adicional:

{{< highlight csharp "hl_lines=15" >}}
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

public class ShoppingCartController : Controller
{
    private IShoppingCartRepository _shoppingCartRepository;

    [HttpGet]
    public IActionResult Index(int customerId)
    {
      Activity? activity =
      Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>")

        // Añadir una etiqueta al tramo para su uso en la interfaz de usuario web de Datadog
        activity?.SetTag("customer.id", customerId.ToString());

        var cart = _shoppingCartRepository.Get(customerId);

        return View(cart);
    }
}
{{< /highlight >}}

## Errores de ajuste en tramos

Establece la información de error en un tramo cuando se produce un error durante su ejecución.

```csharp
try
{
    // do work that can throw an exception
}
catch(Exception e)
{
    activity?.SetTag("error", 1);
    activity?.SetTag("error.message", exception.Message);
    activity?.SetTag("error.stack", exception.ToString());
    activity?.SetTag("error.type", exception.GetType().ToString());
}
```

## Añadir eventos de tramo

<div class="alert alert-info">Para añadir eventos de tramo se requiere la versión 2.53.0 o superior del SDK.</div>

Puedes añadir eventos de tramos utilizando la API `AddEvent`. Este método requiere un `ActivityEvent` creado con un parámetro de `name` y acepta opcionalmente los parámetros `attributes` y `timestamp`. El método crea un nuevo evento de tramo con las propiedades especificadas y lo asocia al tramo correspondiente.

- **Nombre** [_obligatorio_]: una cadena que representa el nombre del evento.
- **Marca de tiempo** [_opcional_]: una marca de tiempo UNIX que representa la hora en que se produjo un evento. Se espera un objeto `DateTimeOffset`.
- **Atributos** [_opcional_]: cero o más pares clave-valor con las siguientes propiedades:
  - La clave debe ser una cadena no vacía.
  - El valor puede ser:
    - Un tipo primitivo: string, Boolean o number.
    - Una matriz homogénea de valores de tipo primitivo (por ejemplo, una matriz de cadenas).
  - Las matrices anidadas y las matrices que contienen elementos de distintos tipos de datos no están permitidas.

Los siguientes ejemplos muestran distintas formas de añadir eventos a un tramo:

```csharp
var eventTags = new ActivityTagsCollection
{
    { "int_val", 1 },
    { "string_val", "two" },
    { "int_array", new int[] { 3, 4 } },
    { "string_array", new string[] { "5", "6" } },
    { "bool_array", new bool[] { true, false } }
};

activity.AddEvent(new ActivityEvent("Event With No Attributes"));
activity.AddEvent(new ActivityEvent("Event With Some Attributes", DateTimeOffset.Now, eventTags));
```

Para obtener más información, consulta la especificación de [OpenTelemetry][15].

## Propagación del contexto con extracción e inserción de cabeceras

Puedes configurar la propagación de contexto para trazas distribuidas al inyectar y extraer encabezados. Consulta [Propagación de contexto de traza][14] para obtener información.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://opentelemetry.io/docs/instrumentation/net/manual/
[8]: https://opentelemetry.io/docs/instrumentation/net/libraries/
[10]: /es/tracing/trace_collection/dd_libraries/dotnet-framework/#installation-and-getting-started
[11]: /es/tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
[13]: /es/tracing/trace_collection/single-step-apm/
[14]: /es/tracing/trace_collection/trace_context_propagation/
[15]: https://opentelemetry.io/docs/specs/otel/trace/api/#add-events