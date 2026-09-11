---
aliases:
- /es/tracing/opentracing/dotnet
- /es/tracing/manual_instrumentation/dotnet
- /es/tracing/custom_instrumentation/dotnet
- /es/tracing/setup_overview/custom_instrumentation/dotnet
- /es/tracing/trace_collection/custom_instrumentation/dotnet
- /es/tracing/trace_collection/custom_instrumentation/dd_libraries/dotnet
code_lang: dd-api
code_lang_weight: 1
description: Instrumenta manualmente tu aplicación .NET para enviar trazas (traces)
  personalizadas a Datadog.
further_reading:
- link: tracing/guide/instrument_custom_method
  tag: Guía
  text: Instrumentar un método personalizado para obtener una visibilidad profunda
    de tu lógica negocio
- link: tracing/other_telemetry/connect_logs_and_traces
  tag: Documentación
  text: Conecta tu logs y trazas juntos
- link: tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Código fuente
  text: Ejemplos de códigos de .NET
title: Instrumentación personalizada de .NET utilizando la API de Datadog
type: multi-code-lang
---

<div class="alert alert-info">
Si aún no has leído las instrucciones para la instrumentación y la instalación automáticas, empieza por las instrucciones de instalación de <a href="https://docs.datadoghq.com/tracing/setup/dotnet-core/">.NET/.NET Core</a> o <a href="https://docs.datadoghq.com/tracing/setup/dotnet-framework/">.NET Framework</a>.
</div>

En esta página se detallan casos de uso frecuentes para añadir y personalizar la observabilidad con Datadog APM . Para consultar una lista de los tiempos de ejecución compatibles, consulta [Requisitos de compatibilidad de .NET Framework][1] o [Requisitos de compatibilidad de .NET Core][2].

Hay varias formas de conseguir más que la [instrumentación automática por defecto][3]:

- [A través de la configuración](#instrument-methods-through-configuration), que no permite añadir etiquetas (tags) específicas.
- [A través de atributos](#instrument-methods-through-attributes), que permite personalizar los nombres de las operaciones y los recursos.
- [A través de un código personalizado](#custom-instrumentation-with-code), que te brinda el máximo control sobre los tramos (spans).

Puedes combinar estas soluciones entre sí para conseguir la instrumentación específica que desees. Sin embargo, primero debes instalar la instrumentación automática.

## Instrumentar métodos a través de configuración

Mediante la variable de entorno `DD_TRACE_METHODS`, puedes obtener visibilidad de los marcos no compatibles sin cambiar el código de la aplicación. Para obtener más detalles sobre el formato de entrada de `DD_TRACE_METHODS`, consulta las [Instrucciones de configuración de .NET Framework][8] o las [Instrucciones de configuración de .NET Core][9]. Por ejemplo, para instrumentar un método llamado `SaveSession` definido en el tipo `Store.Managers.SessionManager`, configura:

```ini
DD_TRACE_METHODS=Store.Managers.SessionManager[SaveSession]
```

El tramo resultante tiene un atributo `operationName` con el valor `trace.annotation` y un atributo `resourceName` con el valor `SaveSession`.

Si deseas personalizar los atributos de tramo y tienes la capacidad de modificar el código fuente, puedes, en cambio, [instrumentar métodos a través de atributos](#Instrument-methods-through-attributes).

## Instrumentar métodos a través de atributos

Añade `[Trace]` a los métodos de Datadog para rastrearlos cuando se ejecuten con la instrumentación automática. Si la instrumentación automática no está activada, este atributo no tiene ningún efecto en tu aplicación.

Los atributos `[Trace]` tienen por defecto el nombre de la operación `trace.annotation` y el nombre del recurso del método rastreado. Puedes configurar el **nombre de la operación** y el **nombre del recurso** como argumentos con nombre del atributo `[Trace]` para reflejar mejor lo que se está instrumentando. El nombre de la operación y el nombre del recurso son los únicos argumentos posibles que se pueden configurar para el atributo `[Trace]`. Por ejemplo:

```csharp
a través de Datadog.Trace.Annotations;

namespace Store.Managers
{
    public class SessionManager
    {
        [Trace(OperationName = "database.persist", ResourceName = "SessionManager.SaveSession")]
        public static void SaveSession()
        {
            // la implementación de tu método aquí
        }
    }
}
```

## Instrumentación personalizada con código

<div class="alert alert-info">
 <strong>Nota</strong>: Esta función requiere añadir el paquete NuGet de <a href="https://www.nuget.org/packages/Datadog.rastrear"><code>Datadog.Trace</code> </a> a tu aplicación. Proporciona una API para acceder directamente al rastreador y al tramo activo.
</div>

<div class="alert alert-danger">
 <strong>Nota</strong>: Cuando utilices el paquete NuGet de <code>Datadog.Trace</code> y la instrumentación automática, es importante que mantengas las versiones sincronizadas.
</div>

### Configuración de Datadog en código

Hay varias maneras de configurar tu aplicación: a través de variables de entorno, un archivo `web.config` o un archivo `datadog.json`, [como se describe en nuestra documentación][11]. El paquete NuGet de `Datadog.Trace` también te permite configurar ajustes en código.

Para sustituir los ajustes de la configuración, crea una instancia de `TracerSettings` y pásala al método estático `Tracer.Configure()`:

```csharp
a través de Datadog.Trace;

// Crear un objeto de configuración a través de las
// variables de entorno y fuentes de configuración
var settings existentes = TracerSettings.FromDefaultSources();

// Sustituir un valor
settings.GlobalTags.Add("SomeKey", "SomeValue");

// Sustituir la configuración del rastreador
Tracer.Configure(settings);
```

Al llamar a `Tracer.Configure()` se sustituye la configuración de todas las trazas (traces) siguientes, para la instrumentación personalizada y para la instrumentación automática.

<div class="alert alert-danger">
  Debes hacer la sustitución de la configuración <strong>una vez, lo antes posible</strong> en tu aplicación.
</div>

### Crear trazas/tramos personalizados

Además de la instrumentación automática, el atributo `[Trace]` y las configuraciones de `DD_TRACE_METHODS`, puedes personalizar tu observabilidad creando mediante programación tramos alrededor de cualquier bloque de código.

Para crear y activar un tramo personalizado, utiliza `Tracer.Instance.StartActive()`. Si ya hay una traza activa (cuando se crea mediante la instrumentación automática, por ejemplo), el tramo forma parte de la traza actual. Si no hay ninguna traza actual, se inicia una nueva.

<div class="alert alert-danger"><strong>Advertencia</strong>: Asegúrate de desechar el ámbito devuelto desde <code>StartActive</code>. Al desechar el ámbito, se cierra el tramo y se asegura de que la traza se descargue en Datadog una vez que se hayan cerrado todos sus tramos.
</div>

```csharp
a través de Datadog.Trace;

// Iniciar un nuevo tramo
a través del (ámbito de variable = Tracer.Instance.StartActive("custom-operation"))
{
    // Hacer algo
}
```

Añade [span tagss][5] personalizadas a tus [tramos][6] para personalizar tu capacidad de observación en Datadog. Las span tagss se aplican a tus trazas entrantes, lo que te permite correlacionar el comportamiento observado con información al nivel del código como el nivel del comercio, el importe del pago o el ID de usuario.

### Crear manualmente un nuevo tramo

Los tramos creados manualmente se integran automáticamente con los tramos de otros mecanismos de rastreo. En otras palabras, si ya se ha iniciado una traza, el tramo manual tiene al autor de la llamada como tramo primario. Del mismo modo, cualquier método rastreado al que se llame desde el bloque de código ajustado tiene al tramo manual como primario.

```csharp
a través de (var parentScope =
       Tracer.Instance.StartActive("manual.sortorders"))
{
    parentScope.Span.ResourceName = "<RESOURCE NAME>";
    a través de (var childScope =
           Tracer.Instance.StartActive("manual.sortorders.child"))
    {
        // Anidar a través de sentencias alrededor del código para rastrear
        childScope.Span.ResourceName = "<RESOURCE NAME>";
        SortOrders();
    }
}
```

### Añadir span tagss personalizadas

Añade etiquetas personalizadas a tus tramos correspondientes a cualquier valor dinámico dentro de tu código de aplicación como `customer.id`.

```csharp
a través de Datadog.Trace;

clase pública ShoppingCartController : Controller
{
    privado IShoppingCartRepository _shoppingCartRepository;

    [HttpGet]
    público IActionResult Index(int customerId)
    {
        // Accede al ámbito activo a través del rastreador global
        // Nota: Esto se puede anular si no hay ningún tramo activo
        ámbito de variable = Tracer.Instance.ActiveScope;

        si el (´ámbito!= nulo)
        {
            // Añade una etiqueta al tramo para el uso en la  interfaz de usuario web de Datadog
            scope.Span.SetTag("customer.id", customerId.ToString());
        }

        carrito de variable = _shoppingCartRepository.Get(customerId);

        devolver View(cart);
    }
}
```

### Configurar errores en un tramo

Para marcar los errores que se producen en tu código, utiliza el método `Span.SetException(Exception)`. El método marca el tramo como un error y añade [metadatos de tramo relacionados) ][5] para proporcionar información sobre la excepción.

```csharp
prueba
{
    // haz el trabajo que puede lanzar una excepción
}
catch(Exception e)
{
   span.SetException(e);
}
```

De esta manera se colocan las siguientes etiquetas en el tramo:
- `"error.msg":exception.Message`
- `"error.stack":exception.ToString()`
- `"error.type":exception.GetType().ToString()`

## Propagación del contexto con extracción e inserción de cabeceras

Puedes configurar la propagación del contexto para trazas distribuidas a través de la inserción y extracción de cabeceras. Lee [Propagación del contexto de trazas][12] para obtener información.

## Añadir etiquetas globalmente a todos tramos

Utiliza la variable de entorno `DD_TAGS` para configurar las etiquetas en todos los tramos generados para una aplicación. Esto puede ser útil para agrupar las estadísticas de tus aplicaciones, centros de datos o regiones en la interfaz de usuario de Datadog. Por ejemplo:

```ini
DD_TAGS=datacenter:njc,key2:value2
```

## Filtrado de recursos

Puedes excluir trazas en función del nombre del recurso para eliminar el tráfico de Synthetics como comprobaciones de estado. Para obtener más información sobre seguridad y configuraciones adicionales, consulta [Configurar el Datadog Agent o Tracer para la Seguridad de los datos][10].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/trace_collection/compatibility/dotnet-framework
[2]: /es/tracing/trace_collection/compatibility/dotnet-core
[3]: /es/tracing/trace_collection/dd_libraries/dotnet-core
[5]: /es/tracing/glossary/#span-tags
[6]: /es/tracing/glossary/#spans
[7]: /es/tracing/glossary/#trace
[8]: /es/tracing/trace_collection/library_config/dotnet-framework/#automatic-instrumentation-optional-configuration
[9]: /es/tracing/trace_collection/library_config/dotnet-core/#automatic-instrumentation-optional-configuration
[10]: /es/tracing/security
[11]: /es/tracing/trace_collection/library_config/dotnet-core/
[12]: /es/tracing/trace_collection/trace_context_propagation/dotnet/
