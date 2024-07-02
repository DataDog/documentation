---
aliases:
- /es/logs/languages/csharp
further_reading:
- link: https://www.datadoghq.com/blog/c-logging-guide/
  tag: Blog
  text: Cómo recopilar, personalizar y analizar logs de C#
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: Documentación
  text: Conectar logs y trazas (traces) de .NET
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus logs
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtén más información sobre el parseo
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus logs
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realizar análisis de logs
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: FAQ
  text: Guía para solucionar problemas relacionados con la recopilación de logs
- link: /glossary/#tail
  tag: Glosario
  text: Entrada de glosario para "tail" (cola)
kind: documentación
title: Recopilación de logs de C#
---

Para enviar tus logs C# a Datadog, utiliza una de las siguientes estrategias:

- [Registra los logs en un archivo y luego supervísalo con tu Datadog Agent](#file-tail-logging-with-the-datadog-agent).
- [Activa el registro de logs sin Agentl](#agentless-logging-with-apm).
- [Utiliza el receptor Serilog](#agentless-logging-with-serilog-sink).

Esta página incluye ejemplos de configuración de las bibliotecas de registro de logs `Serilog`, `NLog`, `log4net` y`Microsoft.Extensions.Logging` para cada una de las estrategias anteriores.

## Registrar logs en un archivo para supervisarlo con el Datadog Agent

Para recopilar logs de C#, lo más recomendable es que tus logs se registren en un archivo que luego puedas [supervisar][20] con tu Datadog Agent. De esta forma, el Agent enriquecerá los logs con metadatos adicionales.

Datadog recomienda configurar tu biblioteca de logs para que genere tus logs en formato JSON y así evitar la necesidad de crear [reglas de parseo personalizadas][1].

### Configurar tu logger

{{< tabs >}}
{{% tab "Serilog" %}}

Como muchas otras bibliotecas para .NET, Serilog permite hacer un registro de diagnóstico en los archivos, la consola y otros lugares. Esta estrategia se basa en una API limpia, compatible con las últimas plataformas .NET.

A diferencia de otras bibliotecas de registro de logs, Serilog se ha creado para proporcionar potentes datos de eventos estructurados.

Para instalar Serilog con NuGet, ejecuta el siguiente comando en la Package Manager Console:

```text
PM> Install-Package Serilog.Sinks.File
```

Luego, añade el siguiente código para iniciar el logger directamente en tu aplicación:

```csharp
// Instantiate the logger
var log = new LoggerConfiguration()  // using Serilog;

    // using Serilog.Formatting.Json;
    .WriteTo.File(new JsonFormatter(renderMessage: true), "log.json")

    // using Serilog.Formatting.Compact;
    // .WriteTo.File(new RenderedCompactJsonFormatter(), "log.json")

    .CreateLogger();

// An example
var position = new { Latitude = 25, Longitude = 134 };
var elapsedMs = 34;

log.Information("Processed {@Position} in {Elapsed:000} ms.", position, elapsedMs);
```

En el archivo `log.json`, confirma que una instancia del logger se ha creado correctamente:

- Si usas `JsonFormatter(renderMessage: true)`, busca el siguiente evento para confirmarlo:

```json
{
  "MessageTemplate": "Processed {@Position} in {Elapsed:000} ms.",
  "Level": "Information",
  "Timestamp": "2016-09-02T15:02:29.648Z",
  "Renderings": {"Elapsed": [{"Format": "000", "Rendering": "034"}]},
  "RenderedMessage":"Processed { Latitude: 25, Longitude: 134 } in 034 ms.",
  "Properties": {"Position": {"Latitude": 25, "Longitude": 134}, "Elapsed": 34}
}
```

- Si utilizas `RenderedCompactJsonFormatter()`, busca el siguiente evento para confirmarlo:

```json
{
  "@t": "2020-05-20T04:15:28.6898801Z",
  "@m": "Processed { Latitude: 25, Longitude: 134 } in 034 ms.",
  "@i": "d1eb2146",
  "Position": {"Latitude": 25, "Longitude": 134 },
  "Elapsed": 34
}
```

{{% /tab %}}
{{% tab "NLog" %}}

NLog es una plataforma de registro de logs para .NET con funcionalidades de gestión y de enrutamiento de logs ricos. Te puede ayudar a producir y gestionar logs de alta calidad para tu aplicación, independientemente de su tamaño o complejidad.

Para instalar NLog con NuGet, ejecuta el siguiente comando en la Package Manager Console:

```text
PM> Install-Package NLog
```

Una vez tengas la biblioteca en tu classpath, adjunta el siguiente formato a cualquier destino. Edita o añade un archivo `NLog.config` a la ruta raíz del proyecto. Luego copia y pega el siguiente código en (*los logs que se graban en el archivo `application-logs.json`*):

```xml
<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">

  <!--
  See https://github.com/nlog/nlog/wiki/Configuration-file
  for information on customizing logging rules and outputs.
   -->
  <targets async="true">
    <!-- Write logs as Json into a file -->
    <target name="json-file" xsi:type="File" fileName="application-logs.json">
      <layout xsi:type="JsonLayout">
        <attribute name="date" layout="${date:universalTime=true:format=o}" />
        <attribute name="level" layout="${level:upperCase=true}"/>
        <attribute name="message" layout="${message}" />
        <attribute name="exception" layout="${exception:format=ToString}" />
      </layout>
    </target>

  </targets>
  <rules>
    <!-- Log all events to the json-file target -->
    <logger name="*" writeTo="json-file" minlevel="Trace" />
  </rules>
</nlog>
```

Para activar tus primeros eventos y registrarlos en un log, añade lo siguiente a tu código:

```csharp
using NLog;

namespace Datadog
{
    class Program
    {
        // Initialize a logger
        private static Logger logger = LogManager.GetCurrentClassLogger();

        static void Main(string[] args)
        {
            // Log a simple debug message
            logger.Debug("This is my first step");

            // your code continues here ...
        }
    }
}
```

{{% /tab %}}
{{% tab "Log4Net" %}}
Log4Net es una plataforma de registro de logs .NET basada en Log4j con funciones de gestión y enrutamiento de logs ricos. Te ayuda a generar y gestionar logs de alta calidad para tu aplicación independientemente de su tamaño o complejidad.

Para instalar Log4Net, ejecuta el siguiente comando en la Package Manager Console:

```text
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

Una vez instalada la biblioteca, adjunta el siguiente formato a cualquier destino. Edita la `App.config` de tu proyecto y añade la siguiente sección:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>

  <configSections>
    <section name="log4net" type="log4net.Config.Log4NetConfigurationSectionHandler, log4net" />
  </configSections>

  <log4net>
    <root>
      <level value="DEBUG" />
      <appender-ref ref="JsonFileAppender" />
    </root>
    <appender name="JsonFileAppender" type="log4net.Appender.FileAppender">
      <threshold value="DEBUG"/>
      <file value="application-logs.json" />
      <encoding type="System.Text.UTF8Encoding" />
      <appendToFile value="true" />
      <layout type="log4net.Layout.SerializedLayout, log4net.Ext.Json">
        <decorator type="log4net.Layout.Decorators.StandardTypesDecorator, log4net.Ext.Json" />
        <default />
        <!--explicit default members-->
        <remove value="ndc" />
        <remove value="message" />
        <!--remove the default preformatted message member-->
        <member value="message:messageobject" />
        <!--add raw message-->
      </layout>
    </appender>
  </log4net>

  <!-- The rest of your configuration starts here ... -->
```

Crea instancias en tu logger y empieza a activar tus eventos:

```csharp
using log4net;

namespace Datadog
{
    class Program
    {
        // Get the current class logger
        private static ILog logger = LogManager.GetLogger(typeof(Program));

        static void Main(string[] args)
        {

           // Load the configure fom App.config
           XmlConfigurator.Configure();

           // Log a simple debug message
           logger.Debug("This is my first debug message");

           // your code continues here ...
        }
    }
}
```

Si has seguido las instrucciones, deberías ver el siguiente evento en tu archivo (por ejemplo en `C:\Projects\Datadog\Logs\log.json`):

```json
{
  "level": "DEBUG",
  "message": "This is my debug message",
  "date": "2016-05-24 15:53:35.7175",
  "appname": "Datadog.vshost.exe",
  "logger": "Datadog.Program",
  "thread": "10"
}
```

Si, a pesar de los beneficios de crear logs en JSON, quieres crearlos como cadenas sin formato, prueba a actualizar el `log4net conversion pattern` para parsear automáticamente tus logs con el pipeline de integración C# como se detalla a continuación:

```text
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

### Configurar el Datadog Agent

Cuando tengas la [recopilación de logs activada][2], configura la [recopilación de logs personalizada][3] para supervisar tus logs y enviarlos a Datadog.

1. Crea una carpeta `csharp.d/` en el [directorio de configuración del Agent][4]  `conf.d/`.
2. Crea un archivo `conf.yaml` en `csharp.d/` con el siguiente contenido:

    ```yaml
    init_config:

    instances:

    ##Log section
    logs:

      - type: file
        path: "<path_to_your_csharp_log>.log"
        service: <service_name>
        source: csharp
        sourcecategory: sourcecode
        # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
        #log_processing_rules:
        #  - type: multi_line
        #    name: new_log_start_with_date
        #    pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
    ```
3. Asegúrate de que el usuario del Agent tiene permisos de acceso de lectura al archivo de log.
4. [Reinicia el Agent][5].
5. Ejecuta el [subcomando de estado del Agent][6] y busca `csharp` en la sección `Checks` para confirmar que los logs se envían correctamente a Datadog.

Si los logs están en formato JSON, Datadog [parsea los mensajes del log][7] de forma automática para extraer sus atributos. Utiliza el [Log Explorer][8] para ver tus logs y solucionar problemas relacionados.

### Conectar tus servicios al conjunto de logs y trazas (traces)

Si tines APM activado para esta aplicación, conecta tus logs y trazas añadiendo automáticamente los ID de traza (trace) y los ID de tramo (span),
`env`, `service` y `version` a tus logs mediante [las siguientes instrucciones de APM para .NET][9]

**Nota**: Si el rastreador APM inyecta `service` en tus logs, este reemplazará al valor definido en la configuración del Agent.

## Registro de logs sin Agent con APM

Gracias a la biblioteca de instrumentación automática .NET de APM,  es posible crear un flujo de logs desde tu aplicación directamente a Datadog, sin hacer cambios en el código. De esta forma, los logs se envían directamente a Datadog, así que no podrás beneficiarte de [prestaciones como la limpieza de datos sensibles][10] que ofrece el Datadog Agent. Por esta razón, te recomendamos que registres los logs en un archivo que puedas supervisar cuando sea posible, aunque es cierto que el registro de logs sin Agent resulta útil en entornos no compatibles con este método (por ejemplo, si utilizas [Azure App Service][11]). Conviene recordar que podrás seguir limpiando los datos sensibles en el servidor con la ayuda de [Sensitive Data Scanner][12].

El registro de logs sin Agent (también denominado "envío directo de logs") es compatible con los siguientes entornos:
- Serilog (v1.0+)
- NLog (v2.1+)
- log4net (v1.0+)
- Microsoft.Extensions.Logging (2.0+)

No es necesario que modifiques el código de tu aplicación ni que instales dependencias adicionales.

<div class="alert alert-warning">
  <strong>Nota:</strong> Si utilizas log4net o NLog, debes configurar un appender (log4net) o un logger (NLog) para poder activar el registro de logs sin Agent. En esos casos, puedes añadir dependencias adicionales o utilizar <a href="/logs/log_collection/csharp/?tab=log4net#agentless-logging-with-serilog-sink">el registro de logs sin Agent con el receptor Serilog</a>.
</div>


### Configurar la biblioteca APM

El registro de logs sin Agent solo está disponible cuando se utiliza APM con instrumentación automática. Para empezar, instrumenta tu aplicación según se describe en los siguientes documentos:

- [Aplicaciones .NET Core/.NET 5+][13]
- [Aplicaciones .NET Framework][14]

Después de la instalación, verifica que estás recibiendo trazas correctamente.

### Activar el registro de logs sin Agent

Para activar el registro de logs sin Agent, define las siguientes variables de entorno:

`DD_API_KEY`
: Tu [clave API de Datadog][15] para enviar tus logs a Datadog.

`DD_SITE`
: El nombre de tu [sitio Datadog][16]. Elige uno de los siguientes ejemplos:<br>
**Ejemplo**: `datadoghq.com` (US1), `datadoghq.eu` (EU), `us3.datadoghq.com` (US3), `us5.datadoghq.com` (US5), `ddog-gov.com` (US1-FED) <br>
**Valor predeterminado**: `datadoghq.com` (US1)

`DD_LOGS_INJECTION`
: Activa [la conexión de logs y trazas][9]:<br>
**Valor predeterminado**: `true` <br>
Activado por omisión al utilizar el registro de logs sin Agent a partir de la versión 2.7.0 del Tracer.

`DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS`
: Permite el registro de logs sin Agent. Activa esta funcionalidad en tu entorno configurando `Serilog`, `NLog`, `Log4Net` o `ILogger` (para `Microsoft.Extensions.Logging`). Si utilizas varios entornos de registro de logs, utiliza una lista de variables separadas por punto y coma.<br>
**Ejemplo**: `Serilog;Log4Net;NLog`

<div class="alert alert-warning">
  <strong>Nota:</strong> Si utilizas un entorno de registro de errores junto con <code>Microsoft.Extensions.Logging</code>, lo normal es que debas utilizar el nombre del entorno. Por ejemplo, si utilizas <a href="https://github.com/serilog/serilog-extensions-logging">Serilog.Extensions.Logging</a>, deberías configurar <code>DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS=Serilog</code>.
</div>

Reinicia tu aplicación después de configurar las variables de entorno.

### Configuración adicional

Puedes personalizar algunos aspectos de la recopilación de logs sin Agent utilizando las siguientes variables de entorno:

`DD_LOGS_DIRECT_SUBMISSION_MINIMUM_LEVEL`
: Permite filtrar los logs por nivel _antes_ de enviarlos a Datadog. Define uno de los siguientes valores: `Verbose`, `Debug`, `Information`, `Warning`, `Error`, `Critical`. Se corresponden con los niveles equivalentes en los entornos de registros de errores.<br>
**Valor predeterminado**: `Information`

`DD_LOGS_DIRECT_SUBMISSION_HOST`
: Define el nombre del equipo host asociado a los logs. Si no se indica, el nombre de host se intentará encontrar de forma automática.<br>
**Valor predeterminado**: Se determina automáticamente.

`DD_LOGS_DIRECT_SUBMISSION_TAGS`
: Si se especifica, añade todas las etiquetas detalladas a los tramos generados. De lo contrario, se usa `DD_TAGS`.<br>
**Ejemplo**: `layer:api, team:intake`
Ten en cuenta que se utiliza una coma y un espacio como separador: `, `.

Los siguientes valores de configuración normalmente no se modifican, pero pueden definirse si fuera necesario.

{{< site-region region="us" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Define la URL a la que deberían enviarse los logs. De forma predeterminada, utiliza el dominio incluido en `DD_SITE`.<br>
**Valor predeterminado**: `https://http-intake.logs.datadoghq.com:443` (según `DD_SITE`)

{{< /site-region >}}

{{< site-region region="us3" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Define la URL a la que deberían enviarse los logs. De forma predeterminada, utiliza el dominio incluido en `DD_SITE`.<br>
**Valor predeterminado**: `https://http-intake.logs.us3.datadoghq.com:443` (según `DD_SITE`)

{{< /site-region >}}

{{< site-region region="us5" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Define la URL a la que deberían enviarse los logs. De forma predeterminada, utiliza el dominio incluido en `DD_SITE`.<br>
**Valor predeterminado**: `https://http-intake.logs.us5.datadoghq.com:443` (según `DD_SITE`)

{{< /site-region >}}

{{< site-region region="ap1" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Define la URL a la que deberían enviarse los logs. De forma predeterminada, utiliza el dominio incluido en `DD_SITE`.<br>
**Valor predeterminado**: `https://http-intake.logs.ap1.datadoghq.com:443` (según `DD_SITE`)

{{< /site-region >}}

{{< site-region region="eu" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Define la URL a la que deberían enviarse los logs. De forma predeterminada, utiliza el dominio incluido en `DD_SITE`.<br>
**Valor predeterminado**: `https://http-intake.logs.datadoghq.eu:443` (según `DD_SITE`)

{{< /site-region >}}

{{< site-region region="gov" >}}

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Define la URL a la que deberían enviarse los logs. De forma predeterminada, utiliza el dominio incluido en `DD_SITE`.<br>
**Valor predeterminado**: `https://http-intake.logs.ddog-gov.com:443` (según `DD_SITE`)

{{< /site-region >}}

`DD_LOGS_DIRECT_SUBMISSION_SOURCE`
: Define la regla de parseo para los logs enviados. Siempre debería definirse como `csharp`, de no ser que tengas un [pipeline personalizado][17].<br>
**Valor predeterminado**: `csharp`

`DD_LOGS_DIRECT_SUBMISSION_MAX_BATCH_SIZE`
: Define el número máximo de logs que se pueden enviar de una vez. Tiene en cuenta los [límites establecidos para la API][18].<br>
**Valor predeterminado**: `1000`

`DD_LOGS_DIRECT_SUBMISSION_MAX_QUEUE_SIZE`
: Define el número máximo de logs que se pueden mantener en la cola interna antes de empezar a eliminar mensajes de log.<br>
**Valor predeterminado**: `100000`

`DD_LOGS_DIRECT_SUBMISSION_BATCH_PERIOD_SECONDS`
: Define el tiempo de espera (en segundos) antes de comprobar si hay logs nuevos para enviar.<br>
**Valor predeterminado**: `1`

Si vas a usar la integración `Microsoft.Extensions.Logging`, puedes filtrar los logs enviados a Datadog con ayuda de las funcionalidades estándar integradas en `ILogger`. Utiliza la clave `"Datadog"` para identificar al proveedor de envío directo, y establece los niveles mínimos del log para un espacio de nombres. Por ejemplo, si añades lo siguiente a tu `appSettings.json`, evitarías que se enviaran logs con un nivel inferior a `Warning` a Datadog. Disponible a partir de la versión v2.20.0 de la biblioteca de rastreo .NET.

```json
{
  "Logging": {
    "Datadog": {
      "LogLevel": {
        "Microsoft.AspNetCore": "Warning"
      },
    }
  }
}
```

## Registro de logs sin Agent con el receptor Serilog

Si no es posible utilizar el registro de logs en un archivo para su posterior supervisión ni el registro de logs sin Agent con APM, y estás trabajando en un entorno `Serilog`, puedes utilizar el [receptor Serilog][19] de Datadog para enviar logs directamente a Datadog.

Instala el [receptor Serilog][19] de Datadog en tu aplicación, que envía eventos y logs a Datadog. De forma predeterminada, el receptor reenvía los logs a través de HTTPS en el puerto 443.
Ejecuta el siguiente comando en la Package Manager Console:

```text
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

Luego, inicia el logger directamente en tu aplicación. Asegúrate de [añadir tu `<API_KEY>`][15].

{{< site-region region="us" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.datadoghq.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="us3" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.us3.datadoghq.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="ap1" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.ap1.datadoghq.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="us5" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.us5.datadoghq.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="eu" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.datadoghq.eu" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="gov" >}}

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "https://http-intake.logs.ddog-gov.com" })
    .CreateLogger())
{
    // Some code
}
```

{{< /site-region >}}

{{< site-region region="us" >}}

También puedes reemplazar el comportamiento predeterminado y enviar los logs en TCP especificando manualmente las siguientes propiedades necesarias: `url`, `port`, `useSSL` y `useTCP`. De manera opcional, [especifica el `source`, `service`, `host` y las etiquetas personalizadas.][1]

Por ejemplo, para reenviar logs a la región Datadog US en TCP deberías utilizar la siguiente configuración del receptor:

```csharp
var config = new DatadogConfiguration(url: "intake.logs.datadoghq.com", port: 10516, useSSL: true, useTCP: true);
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs(
        "<API_KEY>",
        source: "<SOURCE_NAME>",
        service: "<SERVICE_NAME>",
        host: "<HOST_NAME>",
        tags: new string[] {"<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"},
        configuration: config
    )
    .CreateLogger())
{
    // Some code
}
```

[1]: /es/logs/log_configuration/attributes_naming_convention/#reserved-attributes

{{< /site-region >}}
{{< site-region region="eu" >}}

También puedes reemplazar el comportamiento predeterminado y enviar los logs en TCP especificando manualmente las siguientes propiedades necesarias: `url`, `port`, `useSSL` y `useTCP`. De manera opcional, [especifica el `source`, `service`, `host` y las etiquetas personalizadas.][1]

Por ejemplo, para reenviar logs a la región Datadog EU en TCP deberías utilizar la siguiente configuración del receptor:

```csharp
var config = new DatadogConfiguration(url: "tcp-intake.logs.datadoghq.eu", port: 443, useSSL: true, useTCP: true);
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs(
        "<API_KEY>",
        source: "<SOURCE_NAME>",
        service: "<SERVICE_NAME>",
        host: "<HOST_NAME>",
        tags: new string[] {"<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"},
        configuration: config
    )
    .CreateLogger())
{
    // Some code
}
```
[1]: /es/logs/log_configuration/attributes_naming_convention/#reserved-attributes

{{< /site-region >}}

Los nuevos logs se envían directamente a Datadog.

Como alternativa, desde la versión `0.2.0`, puedes configurar el receptor de Datadog utilizando un archivo `appsettings.json`con el paquete `Serilog.Setting.Configuration`.

En la matriz `Serilog.WriteTo`, añade una entrada para `DatadogLogs`. A continuación se muestra un ejemplo:

```json
"Serilog": {
  "Using": [ "Serilog.Sinks.Console", "Serilog.Sinks.Datadog.Logs" ],
  "MinimumLevel": "Debug",
  "WriteTo": [
    { "Name": "Console" },
    {
      "Name": "DatadogLogs",
      "Args": {
        "apiKey": "<API_KEY>",
        "source": "<SOURCE_NAME>",
        "host": "<HOST_NAME>",
        "tags": ["<TAG_1>:<VALUE_1>", "<TAG_2>:<VALUE_2>"],
      }
    }
  ],
  "Enrich": [ "FromLogContext", "WithMachineName", "WithThreadId" ],
  "Properties": {
    "Application": "Sample"
  }
}
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/logs/log_configuration/parsing
[2]: /es/agent/logs/?tab=tailfiles#activate-log-collection
[3]: /es/agent/logs/?tab=tailfiles#custom-log-collection
[4]: /es/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-configuration-directory
[5]: /es/agent/configuration/agent-commands/?tab=agentv6v7#restart-the-agent
[6]: /es/agent/configuration/agent-commands/?tab=agentv6v7#agent-status-and-information
[7]: /es/logs/log_configuration/parsing/?tab=matchers
[8]: /es/logs/explorer/#overview
[9]: /es/tracing/other_telemetry/connect_logs_and_traces/dotnet/
[10]: /es/agent/logs/advanced_log_collection
[11]: /es/serverless/azure_app_services
[12]: /es/sensitive_data_scanner/
[13]: /es/tracing/trace_collection/dd_libraries/dotnet-core
[14]: /es/tracing/trace_collection/dd_libraries/dotnet-framework
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: /es/getting_started/site/
[17]: /es/logs/log_configuration/pipelines/?tab=source
[18]: /es/api/latest/logs/#send-logs
[19]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[20]: /es/glossary/#tail