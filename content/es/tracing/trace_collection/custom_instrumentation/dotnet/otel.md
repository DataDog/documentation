---
aliases:
- /es/tracing/trace_collection/otel_instrumentation/dotnet/
- /es/tracing/trace_collection/custom_instrumentation/otel_instrumentation/dotnet
code_lang: otel
code_lang_weight: 2
description: Instrumenta tu aplicación .NET con la API de OpenTelemetry, para enviar
  trazas (traces) a Datadog.
further_reading:
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: /opentelemetry/guide/otel_api_tracing_interoperability
  tag: Documentación
  text: Interoperabilidad de la API de OpenTelemetry e instrumentación de trazas de
    Datadog
title: Instrumentación personalizada de .NET con la API de OpenTelemetry
type: multi-code-lang
---

{{% otel-custom-instrumentation-lang %}}

## Configuración

Para configurar OpenTelemetry para utilizar el proveedor de traza de Datadog:

1. Añade la instrumentación manual de OpenTelemetry deseada a tu código .NET siguiendo la [documentación de la Instrumentación manual de OpenTelemetry .NET][5]. **Nota**: Cuando esas instrucciones indiquen que tu código debe llamar al SDK de OpenTelemetry, llama a la biblioteca de rastreo de Datadog en su lugar.

2. Instala la biblioteca de rastreo de .NET y activa el rastreador para tu [servicio .NET Framework][10] o tu [servicio .NET Core (y .NET 5+)][11]. **Fase beta**: puedes hacerlo opcionalmente con la [Instrumentación de paso único de APM][13].

3. Establece la variable de entorno `DD_TRACE_OTEL_ENABLED` en `true`.

4. Ejecuta tu aplicación.

Datadog combina estos tramos de OpenTelemetry con otros tramos de Datadog APM en una traza única de tu aplicación. También es compatible con [la biblioteca de instrumentación de OpenTelemetry][8].

## Creación de tramos personalizados

Para crear tramos manualmente que inicien una nueva traza independiente:

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

// Iniciar un nuevo tramo
using (Activity? activity = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
            {
  activity?.SetTag("operation.name", "custom-operation");
               // Hacer algo
            }

```

## Creación de tramos

Para crear tramos personalizados dentro de un contexto de traza existente:

```csharp
using OpenTelemetry.Resources;
using OpenTelemetry.Trace;

using (Activity? parentScope = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
{
   parentScope?.SetTag("operation.name", "manual.sortorders");
   using (Activity? childScope = Telemetry.ActivitySource.StartActivity("<RESOURCE NAME>"))
   {
       // Anidar con sentencias en el código para rastrear
       childScope?.SetTag("operation.name", "manual.sortorders.child");
       SortOrders();
   }
}
```

## Añadir etiquetas al tramo

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

        // Añadir una etiqueta al tramo para usarlo en la interfaz de usuario web de Datadog
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
    // hacer el trabajo que pueda arrojar una excepción
}
catch(Exception e)
{
    activity?.SetTag("error", 1);
    activity?.SetTag("error.msg", exception.Message);
    activity?.SetTag("error.stack", exception.ToString());
    activity?.SetTag("error.type", exception.GetType().ToString());
}
```

## Propagación de contexto con extracción e inyección de encabezados

Puedes configurar la propagación de contexto para trazas distribuidas al inyectar y extraer encabezados. Consulta [Propagación de contexto de traza][14] para obtener información.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[5]: https://opentelemetry.io/docs/instrumentation/net/manual/
[8]: https://opentelemetry.io/docs/instrumentation/net/libraries/
[10]: /es/tracing/trace_collection/dd_libraries/dotnet-framework/#installation-and-getting-started
[11]: /es/tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
[13]: /es/tracing/trace_collection/single-step-apm/
[14]: /es/tracing/trace_collection/trace_context_propagation/dotnet/