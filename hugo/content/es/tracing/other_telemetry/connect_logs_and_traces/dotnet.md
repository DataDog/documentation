---
aliases:
- /es/tracing/connect_logs_and_traces/dotnet
code_lang: dotnet
code_lang_weight: 60
description: Conecte sus registros y trazas de .NET para correlacionarlos en Datadog.
further_reading:
- link: tracing/trace_collection/custom_instrumentation
  tag: Documentación
  text: Instrumente manualmente su aplicación para crear trazas.
- link: tracing/glossary/
  tag: Documentación
  text: Explore sus servicios, recursos y trazas.
- link: https://www.datadoghq.com/blog/request-log-correlation/
  tag: Blog
  text: Correlacione automáticamente los registros de solicitudes con las trazas.
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Guía
  text: Facilite la solución de problemas con la correlación entre productos.
title: Correlacionando Registros y Trazas de .NET
type: multi-code-lang
---
Puede configurar su biblioteca de registros y las configuraciones de trazado de .NET para que los ID de traza y de tramo se inyecten en los registros de la aplicación, proporcionándole datos de monitoreo del rendimiento de la aplicación correlacionados con los datos de registro.

Configure el .NET Tracer con [Unified Service Tagging][1] para la mejor experiencia y un contexto útil al correlacionar trazas y registros de la aplicación.

El .NET Tracer admite las siguientes bibliotecas de registros:
- [Serilog][2] (v1.4+)
- [log4net][3]
- [NLog][4]
- [Microsoft.Extensions.Logging][5] (agregado en v1.28.6)

## Configure la recolección de registros {#configure-log-collection}

Asegúrese de que la recolección de registros esté configurada en el Agente de Datadog y que la [configuración del Agente de Registros][15] para los archivos especificados a seguir esté configurada en `source: csharp` para que las canalizaciones de registros puedan parsear los archivos de registro. Para más información, consulta [Recolección de Registros en C#][7]. Si el `source` está configurado a un valor diferente de `csharp`, es posible que necesites agregar un [remapeador de trazas][8] a la canalización de procesamiento de registros apropiada para que la correlación funcione correctamente.

<div class="alert alert-danger">La recolección automática de registros solo funciona para registros formateados como JSON. Alternativamente, utilice reglas de parseo personalizadas.</div>

## Configure la inyección en los registros {#configure-injection-in-logs}

Para inyectar identificadores de correlación en sus mensajes de registro, siga las instrucciones para su biblioteca de registro.

<div class="alert alert-info">
  Vea los <a href="https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/AutomaticTraceIdInjection">ejemplos en dd-trace-dotnet</a> para más ejemplos.
</div>

{{< tabs >}}
{{% tab "Serilog" %}}

<div class="alert alert-danger">
  <strong>Nota: </strong>A partir de la versión 2.0.1 del .NET Tracer, la inyección automática para la biblioteca de registro Serilog requiere que la aplicación esté instrumentada con instrumentación automática.
</div>

Para inyectar automáticamente identificadores de correlación en sus mensajes de registro:

1. Configure el .NET Tracer con las siguientes configuraciones del Tracer:
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Habilite el trazado de instrumentación automática de su aplicación siguiendo las [instrucciones para instalar el .NET Tracer][1].

[1]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/dotnet-core/
{{% /tab %}}
{{% tab "log4net" %}}

<div class="alert alert-danger">
  <strong>Nota: </strong>A partir de la versión 1.29.0 del .NET Tracer, la inyección automática para la biblioteca de registro log4net requiere que la aplicación esté instrumentada con instrumentación automática.
</div>

Para inyectar automáticamente identificadores de correlación en sus mensajes de registro:

1. Configure el .NET Tracer con las siguientes configuraciones del tracer:
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Habilite el trazado de instrumentación automática de su aplicación siguiendo las [instrucciones para instalar el .NET Tracer][1].

3. Agregue `dd.env`, `dd.service`, `dd.version`, `dd.trace_id` y `dd.span_id` propiedades de registro en su salida. Esto se puede hacer incluyendo estas propiedades _individualmente_ o incluyendo _todas_ las propiedades de registro. Ambos enfoques se muestran en el siguiente código de ejemplo:

```xml
  <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
    <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
    <default />
    <!--explicit default members-->
    <remove value="ndc" />
    <!--remove the default preformatted message member-->
    <remove value="message" />
    <!--add raw message-->
    <member value="message:messageobject" />

    <!-- Include Datadog properties -->
    <!-- EITHER Include individual properties with value='<property_name>' -->
    <member value='dd.env' />
    <member value='dd.service' />
    <member value='dd.version' />
    <member value='dd.trace_id' />
    <member value='dd.span_id' />
    <!-- OR Include all properties with value='properties' -->
    <member value='properties'/>
  </layout>
```
Para ejemplos adicionales, consulte [el proyecto de inyección automática de ID de traza log4net][2] en GitHub.


[1]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/Log4NetExample/log4net.config
{{% /tab %}}
{{% tab "NLog" %}}

<div class="alert alert-danger">
  <strong>Nota: </strong>A partir de la versión 2.0.1 de .NET Tracer, la inyección automática para la biblioteca de registro NLog requiere que la aplicación esté instrumentada con instrumentación automática.
</div>

Para inyectar automáticamente identificadores de correlación en sus mensajes de registro:

1. Configure el .NET Tracer con las siguientes configuraciones del tracer:
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Habilite el trazado de instrumentación automática de su aplicación siguiendo las [instrucciones para instalar el .NET Tracer][1].

3. Habilite el contexto de diagnóstico mapeado (MDC), como se muestra en el siguiente código de ejemplo para NLog versión 5.0+:

```xml
  <!-- Add includeScopeProperties="true" to emit ScopeContext properties -->
  <layout xsi:type="JsonLayout" includeScopeProperties="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

Para NLog versión 4.6+:

```xml
  <!-- Add includeMdlc="true" to emit MDC properties -->
  <layout xsi:type="JsonLayout" includeMdlc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

Para NLog versión 4.5:

```xml
  <!-- Add includeMdc="true" to emit MDC properties -->
  <layout xsi:type="JsonLayout" includeMdc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```
Para ejemplos adicionales, consulte los proyectos de inyección automática de ID de traza utilizando [NLog 4.0][2], [NLog 4.5][3] o [NLog 4.6][4] en GitHub.


[1]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog40Example/NLog.config
[3]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog45Example/NLog.config
[4]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog46Example/NLog.config
{{% /tab %}}
{{% tab "Microsoft.Extensions.Logging" %}}
Para inyectar automáticamente identificadores de correlación en sus mensajes de registro:

1. Configure el .NET Tracer con las siguientes configuraciones del tracer:
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Habilite el trazado de instrumentación automática de su aplicación siguiendo las [instrucciones para instalar el .NET Tracer][1].

3. Habilite [los ámbitos de registro][2] para su proveedor de registro, como se muestra en el código de ejemplo. Solo los proveedores que admiten ámbitos de registro tendrán identificadores de correlación inyectados.

```csharp
Host.CreateDefaultBuilder(args)
    .ConfigureLogging(logging =>
    {
        logging.AddFile(opts =>
        {
            opts.IncludeScopes = true; // must include scopes so that correlation identifiers are added
            opts.FormatterName = "json";
        });
    }
```

Si hay una traza activa cuando se está escribiendo el registro, los IDs de traza y de span se inyectan automáticamente en los registros de la aplicación con las propiedades `dd_trace_id` y `dd_span_id`. Si no hay una traza activa, solo se inyectan las propiedades `dd_env`, `dd_service` y `dd_version`.

**Nota:** Si está utilizando una biblioteca de registro que reemplaza la implementación predeterminada de `LoggerFactory`, como los paquetes de [_Serilog.Extensions.Hosting_][3] o [_Serilog.Extensions.Logging_][4], siga las instrucciones específicas del marco (en este ejemplo, consulte **Serilog**).

Para ejemplos adicionales, consulte [el proyecto de inyección automática de ID de traza Microsoft.Extensions.Logging][5] en GitHub.


[1]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://docs.microsoft.com/aspnet/core/fundamentals/logging/#log-scopes-1
[3]: https://github.com/serilog/serilog-extensions-hosting
[4]: https://github.com/serilog/serilog-extensions-logging
[5]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/MicrosoftExtensionsExample/Program.cs
{{% /tab %}}
{{< /tabs >}}

A continuación, complete la configuración para la inyección automática o manual.

## Inyección automática {#automatic-injection}

Para habilitar la inyección automática del identificador de correlación, asegúrese de que `DD_LOGS_INJECTION` esté habilitado.

A partir de la versión 3.24.0, `DD_LOGS_INJECTION` está habilitado por defecto. Para versiones anteriores, configure `DD_LOGS_INJECTION=true` en las variables de entorno del .NET Tracer.

Para configurar el .NET Tracer con un método diferente, consulte [Configuración del .NET Tracer][6].

Después de configurar la inyección del identificador de correlación, consulte [Recopilación de registros en C#][7] para configurar su recopilación de registros.

**Nota:** Para correlacionar trazas con registros, es posible que necesite configurar un [remapeador de ID de traza][8] para analizar `dd_trace_id` como el ID de traza del registro. Consulte [Registros correlacionados que no aparecen en el panel de ID de traza][9] para más información.

<div class="alert alert-info">A partir de la versión 2.35.0, si <a href="/remote_configuration">Configuración Remota del Agente</a> está habilitada donde se ejecuta este servicio, puede configurar <code>DD_LOGS_INJECTION</code> en la interfaz de usuario del <a href="/internal_developer_portal/catalog/">Catálogo</a>.</div>

## Inyección manual {#manual-injection}

Si prefiere correlacionar manualmente sus trazas con sus registros, puede agregar identificadores de correlación a sus registros.

  | Clave requerida   | Descripción                                  |
  | -------------- | -------------------------------------------- |
  | `dd.env`       | Configure globalmente el `env` para el SDK. Por defecto es `""` si no se establece. |
  | `dd.service`   | Configure globalmente el nombre del servicio raíz. Por defecto es el nombre de la aplicación o el nombre del sitio de IIS si no se establece.  |
  | `dd.version`   | Configure globalmente `version` para el servicio. Por defecto es `""` si no se establece.  |
  | `dd.trace_id`  | ID de traza activa (representado como un número decimal de 64 bits) durante la declaración de registro. Por defecto, se establece en `0` si no hay traza.  |
  | `dd.span_id`   | ID de tramo activo (representado como un número decimal de 64 bits) durante la declaración de registro. Por defecto, se establece en `0` si no hay traza. |

**Nota:** Si no está utilizando una [Integración de Registro de Datadog][7] para analizar sus registros, las reglas de análisis de registros personalizadas deben analizar `dd.trace_id` y `dd.span_id` como cadenas. Para más información, consulte [Registros Correlacionados que No Aparecen en el Panel de ID de Traza][10].

**Nota**: Si está utilizando Serilog, Nlog o log4net a través de ILogger, consulte la sección Microsoft.Extensions.Logging para configurar estas propiedades utilizando `BeginScope()`.

Después de completar los [pasos iniciales](#getting-started), finalice su configuración manual de enriquecimiento de registros:

1. Agregue una referencia al [`Datadog.Trace` paquete NuGet][11] en su proyecto.

2. Utilice la `CorrelationIdentifier` API para recuperar identificadores de correlación y agregarlos al contexto de registro mientras un tramo está activo.

Por último, consulte [Colección de Registros en C#][7] para configurar su colección de registros.

Ejemplos:

{{< tabs >}}
{{% tab "Serilog" %}}

**Nota**: La biblioteca Serilog requiere que los nombres de las propiedades de los mensajes sean identificadores válidos de C#. Los nombres de propiedades requeridos son: `dd_env`, `dd_service`, `dd_version`, `dd_trace_id` y `dd_span_id`.

```csharp
using Datadog.Trace;
using Serilog.Context;

// there must be spans started and active before this block.
using (LogContext.PushProperty("dd_env", CorrelationIdentifier.Env))
using (LogContext.PushProperty("dd_service", CorrelationIdentifier.Service))
using (LogContext.PushProperty("dd_version", CorrelationIdentifier.Version))
using (LogContext.PushProperty("dd_trace_id", CorrelationIdentifier.TraceId.ToString()))
using (LogContext.PushProperty("dd_span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Log something
}
```

{{% /tab %}}
{{% tab "log4net" %}}

```csharp
using Datadog.Trace;
using log4net;

// there must be spans started and active before this block.
try
{
    LogicalThreadContext.Properties["dd.env"] = CorrelationIdentifier.Env;
    LogicalThreadContext.Properties["dd.service"] = CorrelationIdentifier.Service;
    LogicalThreadContext.Properties["dd.version"] = CorrelationIdentifier.Version;
    LogicalThreadContext.Properties["dd.trace_id"] = CorrelationIdentifier.TraceId.ToString();
    LogicalThreadContext.Properties["dd.span_id"] = CorrelationIdentifier.SpanId.ToString();

    // Log something

}
finally
{
    LogicalThreadContext.Properties.Remove("dd.env");
    LogicalThreadContext.Properties.Remove("dd.service");
    LogicalThreadContext.Properties.Remove("dd.version");
    LogicalThreadContext.Properties.Remove("dd.trace_id");
    LogicalThreadContext.Properties.Remove("dd.span_id");
}
```

{{% /tab %}}
{{% tab "NLog" %}}

```csharp
using Datadog.Trace;
using NLog;

// there must be spans started and active before this block.
using (MappedDiagnosticsLogicalContext.SetScoped("dd.env", CorrelationIdentifier.Env))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.service", CorrelationIdentifier.Service))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.version", CorrelationIdentifier.Version))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.trace_id", CorrelationIdentifier.TraceId.ToString()))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Log something
}
```

{{% /tab %}}
{{% tab "Microsoft.Extensions.Logging" %}}

```csharp
using Datadog.Trace;
using Microsoft.Extensions.Logging;

ILogger _logger;

// there must be spans started and active before this block.
using(_logger.BeginScope(new Dictionary<string, object>
{
    {"dd.env", CorrelationIdentifier.Env},
    {"dd.service", CorrelationIdentifier.Service},
    {"dd.version", CorrelationIdentifier.Version},
    {"dd.trace_id", CorrelationIdentifier.TraceId.ToString()},
    {"dd.span_id", CorrelationIdentifier.SpanId.ToString()},
}))
{
    // Log something
}
```

{{% /tab %}}
{{< /tabs >}}

Puede leer más sobre el uso de BeginScope para crear mensajes de registro estructurados para los siguientes proveedores de registro:
- Serilog: [La semántica de ILogger.BeginScope()][12]
- NLog: [Propiedades de NLog con Microsoft Extension Logging][13]
- log4net: [Usando BeginScope][14]

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging
[2]: http://serilog.net
[3]: https://logging.apache.org/log4net
[4]: http://nlog-project.org
[5]: https://docs.microsoft.com/en-us/dotnet/core/extensions/logging
[6]: /es/tracing/trace_collection/library_config/dotnet-core/#configuring-the-net-tracer
[7]: /es/logs/log_collection/csharp/
[8]: /es/logs/log_configuration/processors/trace_remapper/
[9]: /es/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=withlogintegration
[10]: /es/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[11]: https://www.nuget.org/packages/Datadog.Trace/
[12]: https://nblumhardt.com/2016/11/ilogger-beginscope/
[13]: https://github.com/NLog/NLog.Extensions.Logging/wiki/NLog-properties-with-Microsoft-Extension-Logging
[14]: https://github.com/huorswords/Microsoft.Extensions.Logging.Log4Net.AspNetCore#using-beginscope
[15]: /es/logs/log_collection/csharp/#configure-your-datadog-agent