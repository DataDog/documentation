---
aliases:
- /es/logs/languages/csharp
further_reading:
- link: https://www.datadoghq.com/blog/c-logging-guide/
  tag: Blog
  text: Cómo recopilar, personalizar y analizar registros de C#
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: Documentación
  text: Conexión de registros y trazas de .NET
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprenda a procesar sus registros
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Obtenga más información sobre el parseo
- link: /logs/explorer/
  tag: Documentación
  text: Aprenda a explorar sus registros
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realizar análisis de registros
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: PREGUNTAS FRECUENTES
  text: Guía de solución de problemas de recopilación de registros
- link: /glossary/#tail
  tag: Glosario
  text: Entrada del glosario para "seguimiento de las últimas líneas"
- link: https://github.com/DataDog/serilog-sinks-datadog-logs/
  tag: Paquete de GitHub
  text: Paquete Serilog.Sinks.Datadog.Logs
title: Recopilación de registros de C#
---
Para enviar sus registros de C# a Datadog, utilice uno de los siguientes enfoques:

- [Registre los datos en un archivo y luego realice el seguimiento de las últimas líneas de ese archivo con su Datadog Agent](#file-tail-logging-with-the-datadog-agent).
- [Habilite el registro Agentless](#agentless-logging-with-apm).
- [Utilice el sink de Serilog](#agentless-logging-with-serilog-sink).

## Recopilación de registros mediante el seguimiento de las últimas líneas de un archivo con el Datadog Agent {#file-tail-logging-with-the-datadog-agent}

El enfoque recomendado para recopilar registros de C# es guardarlos en un archivo y luego [realizar el seguimiento de las últimas líneas][20] de ese archivo con su Datadog Agent. Esto permite que el Datadog Agent enriquezca los registros con metadatos adicionales.

Datadog recomienda encarecidamente configurar su biblioteca de registro para que genere sus registros en formato JSON a fin de evitar la necesidad de [reglas de parseo personalizadas][1].

La recopilación de registros mediante el seguimiento de las últimas líneas de un archivo es compatible con los siguientes frameworks:
- Serilog
- NLog
- log4net

### Configure su logger {#configure-your-logger}

{{< tabs >}}
{{% tab "Serilog" %}}

Al igual que muchas otras bibliotecas para .NET, Serilog proporciona registro de diagnóstico en archivos, la consola y otros lugares. Tiene una API limpia y es portátil entre las plataformas .NET recientes.

A diferencia de otras bibliotecas de registro, Serilog está diseñado para trabajar con potentes datos estructurados de eventos.

Para instalar Serilog con NuGet, ejecute el siguiente comando en la Package Manager Console:

```text
PM> Install-Package Serilog.Sinks.File
```

Luego, agregue el siguiente código para inicializar el registrador directamente en su aplicación:

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

En el archivo `log.json`, confirme que el registrador se haya instanciado correctamente:

- Si usa `JsonFormatter(renderMessage: true)`, busque el siguiente evento para confirmar:

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

- Si usa `RenderedCompactJsonFormatter()`, busque el siguiente evento para confirmar:

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

NLog es una plataforma de registro para .NET con capacidades avanzadas de enrutamiento y gestión de registros. Puede ayudarle a producir y gestionar registros de alta calidad para su aplicación, independientemente de su tamaño o complejidad.

Para instalar NLog usando NuGet, ejecute el siguiente comando en la Package Manager Console:

```text
PM> Install-Package NLog
```

Una vez que la biblioteca esté en su classpath, adjunte el siguiente diseño a cualquier destino. Edite o agregue un archivo `NLog.config` a la ruta raíz del proyecto. Luego, copie y pegue el siguiente código en él (*Los registros se escriben en el archivo `application-logs.json`*):

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

Para activar y registrar sus primeros eventos, agregue esto a su código:

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
Log4Net es una plataforma de registro para .NET inspirada en Log4j con capacidades avanzadas de enrutamiento y gestión de registros. Puede ayudarle a producir y gestionar registros de alta calidad para su aplicación, independientemente de su tamaño o complejidad.

Para instalar Log4Net, ejecute el siguiente comando en la Package Manager Console:

```text
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

Una vez que la biblioteca esté instalada, adjunte el siguiente diseño a cualquier destino. Edite el `App.config` de su proyecto y agregue la siguiente sección:

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

Instancie su registrador y comience a generar sus eventos:

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

Si ha seguido las instrucciones, debería ver en su archivo (por ejemplo, `C:\Projects\Datadog\Logs\log.json`) el siguiente evento:

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

Si, a pesar de los beneficios de registrar en JSON, desea registrar en formato de cadena sin procesar, intente actualizar el `log4net conversion pattern` para analizar automáticamente sus logs con el Pipeline de integración de C# de la siguiente manera:

```text
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

### Configure el Datadog Agent {#configure-the-datadog-agent}

Una vez que [la recopilación de logs esté habilitada][2], configure la [recopilación de logs personalizada][3] para realizar el seguimiento de las últimas líneas de sus archivos de log y enviarlos a Datadog.

1. Cree una carpeta `csharp.d/` en el `conf.d/` [directorio de configuración del Agent][4].
2. Cree un archivo `conf.yaml` en `csharp.d/` con el siguiente contenido:

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
3. Asegúrese de que el usuario del Agent tenga permisos de acceso de lectura al archivo de log.
4. [Reinicie el Agent][5].
5. Ejecute el [subcomando de estado del Agent][6] y busque `csharp` en la sección {{< ui >}}Checks{{< /ui >}} para confirmar que los logs se envían correctamente a Datadog.

Si los logs están en formato JSON, Datadog [analiza automáticamente los mensajes de log][7] para extraer los atributos de log. Utilice el [Log Explorer][8] para ver y solucionar problemas de sus logs.

### Conecte su servicio a través de logs y trazas {#connect-your-service-across-logs-and-traces}

Si APM está habilitado para esta aplicación, conecte sus logs y trazas agregando automáticamente identificadores de traza, identificadores de tramo,
`env`, `service` y `version` a sus logs [siguiendo las instrucciones de APM .NET][9]

**Nota**: Si el SDK de Datadog inyecta `service` en sus logs, anula el valor establecido en la configuración del agente.

## Registro Agentless con APM {#agentless-logging-with-apm}

Es posible transmitir logs desde su aplicación a Datadog directamente, sin realizar cambios en el código, utilizando la biblioteca de instrumentación automática de APM para .NET. Este enfoque envía los logs directamente a Datadog, por lo que no se beneficia de [características como la depuración de datos confidenciales][10] que proporciona el Datadog Agent. Por esa razón, recomendamos usar el registro mediante seguimiento de las últimas líneas de archivos siempre que sea posible, pero es útil en entornos donde esto no es posible (cuando se usa [Azure App Service][11], por ejemplo). Vale la pena señalar que aún podrá confiar en las capacidades de depuración del lado del servidor realizadas por [Sensitive Data Scanner][12].

El registro Agentless (también conocido como "envío directo de registros") es compatible con los siguientes frameworks:
- Serilog (v1.0+)
- NLog (v2.1+)
- log4net (v1.0+)
- Microsoft.Extensions.Logging (2.0+)

No requiere modificar el código de su aplicación ni instalar dependencias adicionales en su aplicación.

<div class="alert alert-danger">
  <strong>Nota:</strong> Si usa log4net o NLog, se debe configurar un appender (log4net) o un logger (NLog) para habilitar el registro Agentless. En esos casos, puede agregar estas dependencias adicionales o usar <a href="/logs/log_collection/csharp/?tab=log4net#agentless-logging-with-serilog-sink">el registro Agentless con el sink de Serilog</a> en su lugar.
</div>


### Configure el SDK de Datadog {#configure-the-datadog-sdk}

El registro Agentless solo está disponible cuando se usa APM con instrumentación automática. Para comenzar, instrumente su aplicación como se describe en los siguientes documentos:

- [Aplicaciones .NET Core/.NET 5+][13]
- [Aplicaciones .NET Framework][14]

Después de la instalación, verifique que esté recibiendo trazas correctamente.

### Habilite el registro Agentless {#enable-agentless-logging}

Para habilitar el registro Agentless, establezca las siguientes variables de entorno:

`DD_API_KEY`
: Su [clave de API de Datadog][15] para enviar sus logs a Datadog.

`DD_SITE`
: El nombre de [su sitio de Datadog][16]. Elija uno de los siguientes ejemplos:<br>
**Ejemplo**: `datadoghq.com` (US1), `datadoghq.eu` (EU), `us3.datadoghq.com` (US3), `us5.datadoghq.com` (US5), `ap1.datadoghq.com` (AP1), `ap2.datadoghq.com` (AP2), `ddog-gov.com` (US1-FED), `us2.ddog-gov.com` (US2-FED) <br>
**Predeterminado**: `datadoghq.com` (US1)

`DD_LOGS_INJECTION`
: Habilita la [conexión de logs y trazas][9]:<br>
**Predeterminado**: `true` <br>
Habilitado de forma predeterminada a partir de la versión 3.24.0 del Tracer.

`DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS`
: Habilita el registro Agentless. Habilítelo para su framework de registro configurándolo en `Serilog`, `NLog`, `Log4Net` o `ILogger` (para `Microsoft.Extensions.Logging`). Si utiliza varios frameworks de registro, use una lista de variables separadas por punto y coma.<br>
**Ejemplo**: `Serilog;Log4Net;NLog`

<div class="alert alert-danger">
  <strong>Nota:</strong> Si utiliza un framework de registro junto con <code>Microsoft.Extensions.Logging</code>, generalmente necesitará usar el nombre del framework. Por ejemplo, si utiliza <a href="https://github.com/serilog/serilog-extensions-logging">Serilog.Extensions.Logging</a>, debe configurar <code>DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS=Serilog</code>.
</div>

Reinicie su aplicación después de configurar estas variables de entorno.

### Configuración adicional {#additional-configuration}

Puede personalizar aún más algunos aspectos de la recopilación de registros Agentless mediante las siguientes variables de entorno:

`DD_LOGS_DIRECT_SUBMISSION_MINIMUM_LEVEL`
: Permite filtrar registros por nivel _antes_ de que se envíen a Datadog. Establezca uno de los siguientes valores: `Verbose`, `Debug`, `Information`, `Warning`, `Error`, `Critical`. Estos corresponden a los niveles equivalentes en los frameworks de registro compatibles.<br>
**Predeterminado**: `Information`

`DD_LOGS_DIRECT_SUBMISSION_HOST`
: Establezca el nombre del servidor asociado con los registros. Si no se proporciona, se intentará encontrar automáticamente el nombre del servidor.<br>
**Predeterminado**: Determinado automáticamente

`DD_LOGS_DIRECT_SUBMISSION_TAGS`
: Si se especifica, añade todas las etiquetas especificadas a todos los spans generados. Si no se proporciona, se utilizará `DD_TAGS` en su lugar.<br>
**Ejemplo**: `layer:api, team:intake`
Tenga en cuenta que el delimitador es una coma y un espacio en blanco: `, `.

Los siguientes valores de configuración generalmente no deben modificarse, pero pueden establecerse si es necesario.

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Establece la URL donde deben enviarse los registros. Utiliza el dominio proporcionado en `DD_SITE` de forma predeterminada.<br>
**Predeterminado**: `{{< region-param key=http_endpoint_full >}}:443` (based on `DD_SITE`)

`DD_LOGS_DIRECT_SUBMISSION_SOURCE`
: Establece la regla de parseo para los registros enviados. Debe establecerse siempre en `csharp`, a menos que tenga un [pipeline personalizado][17].<br>
**Predeterminado**: `csharp`

`DD_LOGS_DIRECT_SUBMISSION_MAX_BATCH_SIZE`
: Establece el número máximo de registros que se enviarán a la vez. Tiene en cuenta los [límites establecidos para la API][18].<br>
**Predeterminado**: `1000`

`DD_LOGS_DIRECT_SUBMISSION_MAX_QUEUE_SIZE`
: Establece el número máximo de registros que se conservarán en la cola interna en cualquier momento antes de descartar los mensajes de registro.<br>
**Predeterminado**: `100000`

`DD_LOGS_DIRECT_SUBMISSION_BATCH_PERIOD_SECONDS`
: Establece el tiempo de espera (en segundos) antes de buscar nuevos registros para enviar.<br>
**Predeterminado**: `1`

Si utiliza la integración `Microsoft.Extensions.Logging`, puede filtrar los registros enviados a Datadog mediante las capacidades estándar integradas en `ILogger`. Utilice la clave `"Datadog"` para identificar al proveedor de envío directo y establezca los niveles de registro mínimos para cada espacio de nombres. Por ejemplo, añadir lo siguiente a su `appSettings.json` evitaría el envío de cualquier registro con un nivel inferior a `Warning` a Datadog. Introducido en el SDK de .NET v2.20.0.

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

## Registro Agentless con Serilog sink {#agentless-logging-with-serilog-sink}

<div class="alert alert-info">Desde <code>0.2.0</code>, puede configurar el sink de Datadog utilizando un <code>appsettings.json</code> archivo con el paquete <a href="https://github.com/serilog/serilog-settings-configuration"><code>Serilog.Setting.Configuration</code></a>.
Para obtener más información, consulte el paquete <a href="https://github.com/DataDog/serilog-sinks-datadog-logs/tree/master?tab=readme-ov-file#serilogsinksdatadoglogs"><code>Serilog.Sinks.Datadog.Logs</code></a>.</div>

Si no es posible utilizar el registro mediante seguimiento de las últimas líneas de archivos o el registro APM Agentless, y está utilizando el framework `Serilog`, puede utilizar el [Serilog sink][19] de Datadog para enviar registros directamente a Datadog.

Instale el [Datadog Serilog sink][19] en su aplicación, que envía eventos y registros a Datadog. De forma predeterminada, el sink reenvía los registros a través de HTTPS en el puerto 443.
Ejecute el siguiente comando en Package Manager Console:

```text
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

Luego, inicialice el registrador directamente en su aplicación. Asegúrese de [agregar su `<API_KEY>`][15].

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "{{< region-param key="http_endpoint_full" >}}" })
    .CreateLogger())
{
    // Some code
}
```

Los nuevos registros ahora se envían directamente a Datadog.

## Lecturas adicionales {#further-reading}

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
[12]: /es/security/sensitive_data_scanner/
[13]: /es/tracing/trace_collection/dd_libraries/dotnet-core
[14]: /es/tracing/trace_collection/dd_libraries/dotnet-framework
[15]: https://app.datadoghq.com/organization-settings/api-keys
[16]: /es/getting_started/site/
[17]: /es/logs/log_configuration/pipelines/?tab=source
[18]: /es/api/latest/logs/#send-logs
[19]: https://www.nuget.org/packages/Serilog.Sinks.Datadog.Logs
[20]: /es/glossary/#tail