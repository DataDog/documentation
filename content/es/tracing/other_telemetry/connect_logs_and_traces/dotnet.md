---
aliases:
- /es/tracing/connect_logs_and_traces/dotnet
code_lang: dotnet
code_lang_weight: 60
description: Conecta tu logs y trazas (traces) de .NET para correlacionarlos en Datadog.
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
title: Correlación de logs y trazas de .NET
type: multi-code-lang
---

Puedes establecer tu biblioteca de registro y las configuraciones de rastreo de .NET para que los IDs de traza y tramo se inyecten en los logs de aplicación, lo que te proporcionará datos de monitorización del rendimiento de la aplicación correlacionados con los datos de log.

Configura el .NET Tracer con el [etiquetado de servicios unificado][1] para obtener la mejor experiencia y un contexto útil al correlacionar las trazas y logs de aplicación.

.NET Tracer admite las siguientes bibliotecas de registro:
- [Serilog][2] (v1.4+)
- [log4net][3]
- [NLog][4]
- [Microsoft.Extensions.Logging][5] (añadido en v1.28.6)

## Configuración de la recopilación de logs

Asegúrate de que la recopilación de log está configurada en el Datadog Agent y que la [configuración del Logs Agent][15] para los archivos especificados a la cola esté establecida en `source: csharp`, de modo que los pipelines de log puedan analizar los archivos de log. Para obtener más información, consulta [Recopilación de logs de C#][7]. Si `source` se establece en un valor distinto de `csharp`, es posible que tengas que añadir un [reasignador de traza][8] al pipeline de procesamiento de log apropiado para que la correlación funcione correctamente.

<div class="alert alert-warning"><strong>Nota:</strong> La recopilación automática de log solo funciona para logs con formato JSON. Como alternativa, utiliza reglas personalizadas de parseo.</div>

## Configuración de la inyección en logs

Para inyectar identificadores de correlación en tus mensajes de log, sigue las instrucciones de tu biblioteca de registro.

<div class="alert alert-info">
  <div class="alert-info">Consulta los <a href="https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/AutomaticTraceIdInjection">ejemplos en dd-trace-dotnet</a> para ver más ejemplos.</div>
  </div>
</div>

{{< tabs >}}
{{% tab "Serilog" %}}

<div class="alert alert-warning">
 <strong>Nota: </strong>A partir de la versión 2.0.1 de .NET Tracer, la inyección automática para la biblioteca de registro de Serilog requiere que la aplicación esté instrumentada con la instrumentación automática.
</div>

Para inyectar automáticamente identificadores de correlación en tus mensajes de log:

1. Configura el .NET Tracer con la siguiente configuración del rastreador:
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Activa el rastreo de instrumentación automática de tu aplicación siguiendo las [instrucciones para instalar .NET Tracer][1].

[1]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/dotnet-core/
{{% /tab %}}
{{% tab "log4net" %}}

<div class="alert alert-warning">
 <strong>Nota: </strong>A partir de la versión 1.29.0 de .NET Tracer, la inyección automática para la biblioteca de registro log4net requiere que la aplicación esté instrumentada con la instrumentación automática.
</div>

Para inyectar automáticamente identificadores de correlación en tus mensajes de log:

1. Configura el .NET Tracer con la siguiente configuración del rastreador:
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Activa el rastreo de instrumentación automática de tu aplicación siguiendo las [instrucciones para instalar .NET Tracer][1].

3. Añade las propiedades de log `dd.env`, `dd.service`, `dd.version`, `dd.trace_id` y `dd.span_id` en tu salida de registro. Puedes hacer esto al incluir estas propiedades _individualmente_ o al incluir _todas_ las propiedades de log. Ambos enfoques se muestran en el siguiente código de ejemplo:

```xml
  <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
    <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
    <default />
    <!--miembros explícitos por defecto-->
    <remove value="ndc" />
    <!--elimina el miembro del mensaje preformateado por defecto-->
    <remove value="message" />
    <!--añade mensajes sin formato-->
    <member value="message:messageobject" />

    <!-- Incluye propiedades de Datadog -->
    <!-- Incluye propiedades individuales con value='<property_name>' -->
    <member value='dd.env' />
    <member value='dd.service' />
    <member value='dd.version' />
    <member value='dd.trace_id' />
    <member value='dd.span_id' />
    <!-- O incluye todas las propiedades con value='properties' -->
    <member value='properties'/>
  </layout>
```
Para ver ejemplos adicionales, consulta [el proyecto de inyección automática de ID de traza de log4net][2] en GitHub.


[1]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/Log4NetExample/log4net.config
{{% /tab %}}
{{% tab "NLog" %}}

<div class="alert alert-warning">
 <strong>Nota: </strong>A partir de la versión 2.0.1 de .NET Tracer, la inyección automática para la biblioteca de registro de NLog requiere que la aplicación esté instrumentada con la instrumentación automática.
</div>

Para inyectar automáticamente identificadores de correlación en tus mensajes de log:

1. Configura el .NET Tracer con la siguiente configuración del rastreador:
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Activa el rastreo de instrumentación automática de tu aplicación siguiendo las [instrucciones para instalar .NET Tracer][1].

3. Habilita el contexto de diagnóstico asignado (MDC), como se muestra en el siguiente código de ejemplo para NLog versión 5.0+:

```xml
  <!-- Añade includeScopeProperties="true" para emitir propiedades ScopeContext -->
  <layout xsi:type="JsonLayout" includeScopeProperties="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

Para NLog versión 4.6+:

```xml
  <!-- Añade includeMdlc="true" para emitir propiedades MDC -->
  <layout xsi:type="JsonLayout" includeMdlc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```

Para NLog versión 4.5:

```xml
  <!-- Añade includeMdc="true" para emitir propiedades MDC -->
  <layout xsi:type="JsonLayout" includeMdc="true">
    <attribute name="date" layout="${longdate}" />
    <attribute name="level" layout="${level:upperCase=true}"/>
    <attribute name="message" layout="${message}" />
    <attribute name="exception" layout="${exception:format=ToString}" />
  </layout>
```
Para ver ejemplos adicionales, consulta los proyectos de inyección automática de ID de traza utilizando [NLog 4.0][2], [NLog 4.5][3], o [NLog 4.6][4] en GitHub.


[1]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog40Example/NLog.config
[3]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog45Example/NLog.config
[4]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/NLog46Example/NLog.config
{{% /tab %}}
{{% tab "Microsoft.Extensions.Logging" %}}
Para inyectar automáticamente identificadores de correlación en tus mensajes de log:

1. Configura el .NET Tracer con la siguiente configuración del rastreador:
    - `DD_ENV`
    - `DD_SERVICE`
    - `DD_VERSION`

2. Activa el rastreo de instrumentación automática de tu aplicación siguiendo las [instrucciones para instalar .NET Tracer][1].

3. Activa [contextos de log][2] para tu proveedor de registro, como se muestra en el código de ejemplo. Solo los proveedores que admiten contextos de log tendrán identificadores de correlación inyectados.

```csharp
Host.CreateDefaultBuilder(args)
    .ConfigureLogging(logging =>
    {
        logging.AddFile(opts =>
        {
            opts.IncludeScopes = true; // debes incluir contextos para que se añadan identificadores de correlación
            opts.FormatterName = "json";
        });
    }
```

Si hay una traza activa cuando se está escribiendo el log, los IDs de traza y tramo se inyectan automáticamente en la aplicación de logs con las propiedades `dd_trace_id` y `dd_span_id`. Si no hay una traza activa, solo se inyectan las propiedades `dd_env`, `dd_service` y `dd_version`.

**Nota:** Si estás utilizando una biblioteca de registro que reemplaza el despliegue`LoggerFactory` por defecto como los paquetes [_Serilog.Extensions.Hosting_][3] o [_Serilog.Extensions.Logging_][4], sigue las instrucciones específicas del marco (en este ejemplo, ve **Serilog**).

Para obtener ejemplos adicionales, consulta [el proyecto de inyección de ID de traza automática Microsoft.Extensions.Logging][5] en GitHub.


[1]: https://docs.datadoghq.com/es/tracing/trace_collection/dd_libraries/dotnet-core/
[2]: https://docs.microsoft.com/aspnet/core/fundamentals/logging/#log-scopes-1
[3]: https://github.com/serilog/serilog-extensions-hosting
[4]: https://github.com/serilog/serilog-extensions-logging
[5]: https://github.com/DataDog/dd-trace-dotnet/blob/master/tracer/samples/AutomaticTraceIdInjection/MicrosoftExtensionsExample/Program.cs
{{% /tab %}}
{{< /tabs >}}

A continuación, completa la configuración para la inyección automática o manual.

## Inyección automática

El último paso para activar la inyección automática de identificadores de correlación es:

1. Activa `DD_LOGS_INJECTION=true` en las variables de entorno del .NET Tracer. Para configurar el .NET Tracer con un método diferente, consulta [Configuración de .NET Tracer][6].

Después de configurar la inyección del identificador de correlación, consulta [Recopilación de log de C#][7] para configurar tu recopilación de log.

**Nota:** Para correlacionar trazas con logs, puede que necesites configurar un [reasignador de ID de traza][8] para analizar `dd_trace_id` como el ID de traza del log. Consulta [Los logs correlacionados no aparecen en el panel de ID de traza][9] para obtener más información.

<div class="alert alert-info"><strong>Fase beta</strong>: a partir de la versión 2.35.0, si <a href="/agent/remote_config/">la configuración remota del Agent</a> está habilitada donde se ejecuta este servicio, puedes establecer <code>DD_LOGS_INJECTION</code> en la interfaz de usuario del <a href="/tracing/service_catalog">Catálogo de servicios</a>.</div>

## Inyección manual

Si prefieres correlacionar manualmente tus trazas con tus logs, puedes añadir identificadores de correlación a tus logs.

  | Clave requerida   | Descripción                                  |
  | -------------- | -------------------------------------------- |
  | `dd.env`       | Configura globalmente el `env` para el rastreador. Por defecto es `""` si no se configura. |
  | `dd.service`   | Configura globalmente el nombre raíz del servicio. Por defecto es el nombre de la aplicación o el nombre del sitio IIS si no está configurado.  |
  | `dd.version`   | Configura globalmente `version` para el servicio. Por defecto es `""` si no se configura.  |
  | `dd.trace_id`  | ID activo de traza durante la sentencia de log. Por defecto `0` si no hay traza.  |
  | `dd.span_id`   | ID activo de tramo durante la sentencia de log. Por defecto `0` si no hay traza. |

**Nota:** Si no utilizas [la integración de log de Datadog][7] para analizar tus logs, las reglas personalizadas de parseo de log deben analizar `dd.trace_id` y `dd.span_id` como cadenas. Para obtener más información, consulta [Los Logs correlacionados no aparecen en el panel de ID de traza][10].

**Nota**: Si estás utilizando Serilog, Nlog o log4net a través de ILogger, consulta la sección Microsoft.Extensions.Logging para configurar estas propiedades con `BeginScope()`.

Después de completar los [pasos de introducción](#getting-started), termina tu configuración de mejora de log manual:

1. Haz referencia al [paquete `Datadog.Trace` de NuGet][11] en tu proyecto.

2. Utiliza la API `CorrelationIdentifier` para recuperar identificadores de correlación y añadirlos al contexto de log mientras esté activo un tramo.

Por último, consulta [Recopilación de log de C#][7] para configurar tu recopilación de log.

Ejemplos:

{{< tabs >}}
{{% tab "Serilog" %}}

**Nota**: La biblioteca de Serilog requiere que los nombres de las propiedades de los mensajes sean identificadores C# válidos. Los nombres de propiedades obligatorios son: `dd_env`, `dd_service`, `dd_version`, `dd_trace_id` y `dd_span_id`.

```csharp
using Datadog.Trace;
using Serilog.Context;

// deben haber tramos iniciados y activos antes de este bloque.
using (LogContext.PushProperty("dd_env", CorrelationIdentifier.Env))
using (LogContext.PushProperty("dd_service", CorrelationIdentifier.Service))
using (LogContext.PushProperty("dd_version", CorrelationIdentifier.Version))
using (LogContext.PushProperty("dd_trace_id", CorrelationIdentifier.TraceId.ToString()))
using (LogContext.PushProperty("dd_span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Loguear algo
}
```

{{% /tab %}}
{{% tab "log4net" %}}

```csharp
using Datadog.Trace;
using log4net;

// deben haber tramos iniciados y activos antes de este bloque.
try
{
    LogicalThreadContext.Properties["dd.env"] = CorrelationIdentifier.Env;
    LogicalThreadContext.Properties["dd.service"] = CorrelationIdentifier.Service;
    LogicalThreadContext.Properties["dd.version"] = CorrelationIdentifier.Version;
    LogicalThreadContext.Properties["dd.trace_id"] = CorrelationIdentifier.TraceId.ToString();
    LogicalThreadContext.Properties["dd.span_id"] = CorrelationIdentifier.SpanId.ToString();

    // Loguear algo.

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

// deben haber tramos iniciados y activos antes de este bloque.
using (MappedDiagnosticsLogicalContext.SetScoped("dd.env", CorrelationIdentifier.Env))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.service", CorrelationIdentifier.Service))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.version", CorrelationIdentifier.Version))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.trace_id", CorrelationIdentifier.TraceId.ToString()))
using (MappedDiagnosticsLogicalContext.SetScoped("dd.span_id", CorrelationIdentifier.SpanId.ToString()))
{
    // Loguear algo.
}
```

{{% /tab %}}
{{% tab "Microsoft.Extensions.Logging" %}}

```csharp
using Datadog.Trace;
using Microsoft.Extensions.Logging;

ILogger _logger;

// deben haber tramos iniciados y activos antes de este bloque.
using(_logger.BeginScope(new Dictionary<string, object>
{
    {"dd.env", CorrelationIdentifier.Env},
    {"dd.service", CorrelationIdentifier.Service},
    {"dd.version", CorrelationIdentifier.Version},
    {"dd.trace_id", CorrelationIdentifier.TraceId.ToString()},
    {"dd.span_id", CorrelationIdentifier.SpanId.ToString()},
}))
{
    // Loguear algo.
}
```

{{% /tab %}}
{{< /tabs >}}

Puedes obtener más información sobre el uso de BeginScope para crear mensajes estructurados de log para los siguientes proveedores de log:
- Serilog: [la semántica de ILogger.BeginScope()][12]
- NLog: [propiedades de NLog con Microsoft Extension Logging][13]
- log4net: [con BeginScope][14]

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/unified_service_tagging
[2]: http://serilog.net
[3]: https://logging.apache.org/log4net
[4]: http://nlog-project.org
[5]: https://docs.microsoft.com/en-us/dotnet/core/extensions/logging
[6]: /es/tracing/trace_collection/library_config/dotnet-core/#configuring-the-net-tracer
[7]: /es/logs/log_collection/csharp/
[8]: /es/logs/log_configuration/processors/?tab=ui#trace-remapper
[9]: /es/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=withlogintegration
[10]: /es/tracing/troubleshooting/correlated-logs-not-showing-up-in-the-trace-id-panel/?tab=custom
[11]: https://www.nuget.org/packages/Datadog.Trace/
[12]: https://nblumhardt.com/2016/11/ilogger-beginscope/
[13]: https://github.com/NLog/NLog.Extensions.Logging/wiki/NLog-properties-with-Microsoft-Extension-Logging
[14]: https://github.com/huorswords/Microsoft.Extensions.Logging.Log4Net.AspNetCore#using-beginscope
[15]: /es/logs/log_collection/csharp/#configure-your-datadog-agent