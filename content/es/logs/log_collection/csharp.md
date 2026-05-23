---
aliases:
- /es/logs/languages/csharp
further_reading:
- link: https://www.datadoghq.com/blog/c-logging-guide/
  tag: Blog
  text: Cómo recolectar, personalizar y analizar registros de C#
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: Documentación
  text: Conectando registros y trazas de .NET
- link: /logs/log_configuration/processors
  tag: Documentación
  text: Aprende a procesar tus registros
- link: /logs/log_configuration/parsing
  tag: Documentación
  text: Aprende más sobre el parseo
- link: /logs/explorer/
  tag: Documentación
  text: Aprende a explorar tus registros
- link: /logs/explorer/#visualize
  tag: Documentación
  text: Realiza análisis de registros
- link: /logs/faq/log-collection-troubleshooting-guide/
  tag: PREGUNTAS FRECUENTES
  text: Guía de solución de problemas de recolección de registros
- link: /glossary/#tail
  tag: Glosario
  text: Entrada del glosario para "tail"
- link: https://github.com/DataDog/serilog-sinks-datadog-logs/
  tag: Paquete de Github
  text: Paquete Serilog.Sinks.Datadog.Logs
title: Recolección de registros de C#
---
Para enviar tus registros de C# a Datadog, utiliza uno de los siguientes enfoques:

- [Registra en un archivo y luego sigue ese archivo con tu Agente de Datadog](#file-tail-logging-with-the-datadog-agent).
- [Habilita el registro sin agente](#agentless-logging-with-apm).
- [Usa el sumidero de Serilog](#agentless-logging-with-serilog-sink).

## Registro de seguimiento de archivos con el Agente de Datadog {#file-tail-logging-with-the-datadog-agent}

El enfoque recomendado para la recolección de logs en C# es enviar tus logs a un archivo y luego [tail][20] ese archivo con tu Agente de Datadog. Esto permite que el Agente de Datadog enriquezca los logs con metadatos adicionales.

Datadog recomienda encarecidamente configurar tu biblioteca de registros para producir tus registros en formato JSON para evitar la necesidad de [reglas de parseo personalizadas][1].

El registro de tipo file-tail soporta los siguientes frameworks:
- Serilog
- NLog
- log4net

### Configura tu logger {#configure-your-logger}

{{< tabs >}}
{{% tab "Serilog" %}}

Como muchas otras bibliotecas para .NET, Serilog proporciona registros de diagnóstico en archivos, la consola y en otros lugares. Tiene una API limpia y es portátil entre las plataformas recientes de .NET.

A diferencia de otras bibliotecas de registros, Serilog está construido con poderosos datos de eventos estructurados en mente.

Para instalar Serilog con NuGet, ejecuta el siguiente comando en la Consola del Administrador de Paquetes:

```text
PM> Install-Package Serilog.Sinks.File
```

Luego, agrega el siguiente código para inicializar el logger directamente en tu aplicación:

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

En el archivo `log.json`, confirma que el logger se haya instanciado correctamente:

- Si usas `JsonFormatter(renderMessage: true)`, busca el siguiente evento para confirmación:

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

- Si usas `RenderedCompactJsonFormatter()`, busca el siguiente evento para confirmación:

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

NLog es una plataforma de registros para .NET con ricas capacidades de enrutamiento y gestión de registros. Puede ayudarte a producir y gestionar registros de alta calidad para tu aplicación, sin importar su tamaño o complejidad.

Para instalar NLog usando NuGet, ejecuta el siguiente comando en la Consola del Administrador de Paquetes:

```text
PM> Install-Package NLog
```

Una vez que la biblioteca esté en tu classpath, adjunta el siguiente diseño a cualquier destino. Edita o agrega un `NLog.config` archivo en la ruta raíz del proyecto. Luego copia/pega el siguiente código en él (*Los registros se escriben en el archivo `application-logs.json`*):

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

Para activar y registrar tus primeros eventos, agrega esto a tu código:

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
Log4Net es una plataforma de registro para .NET inspirada en Log4j, con ricas capacidades de enrutamiento y gestión de registros. Puede ayudarte a producir y gestionar registros de alta calidad para tu aplicación, sin importar su tamaño o complejidad.

Para instalar Log4Net, ejecuta el siguiente comando en la Consola del Administrador de Paquetes:

```text
PM> Install-Package log4net
PM> Install-Package log4net.Ext.Json
```

Una vez que la biblioteca esté instalada, adjunta el siguiente diseño a cualquier destino. Edita el `App.config` de tu proyecto y agrega la siguiente sección:

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

Instancia tu registrador y comienza a activar tus eventos:

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

Si has seguido las instrucciones, deberías ver en tu archivo (por ejemplo `C:\Projects\Datadog\Logs\log.json`) el siguiente evento:

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

Si, a pesar de los beneficios de registrar en JSON, deseas registrar en formato de cadena sin procesar, intenta actualizar el `log4net conversion pattern` para analizar automáticamente tus registros con la integración de C# canalización de la siguiente manera:

```text
<param name="ConversionPattern" value="%date{yyyy-MM-dd HH:mm:ss.SSS} %level [%thread] %logger %method:%line - %message%n" />
```

{{% /tab %}}
{{< /tabs >}}

### Configura el Agente de Datadog {#configure-the-datadog-agent}

Una vez que [la recolección de registros esté habilitada][2], configura [la recolección de registros personalizada][3] para seguir tus archivos de registro y enviarlos a Datadog.

1. Crea una carpeta `csharp.d/` en el `conf.d/` [directorio de configuración del Agente][4].
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
3. Asegúrate de que el usuario del Agent tenga permisos de acceso de lectura al archivo de registro.
4. [Reinicia el Agent][5].
5. Ejecuta el [subcomando de estado del Agent][6] y busca `csharp` en la sección `Checks` para confirmar que los registros se envían correctamente a Datadog.

Si los registros están en formato JSON, Datadog automáticamente [analiza los mensajes de registro][7] para extraer los atributos de los registros. Utiliza el [Explorador de Registros][8] para ver y solucionar problemas en tus registros.

### Conecta tu servicio a través de registros y trazas {#connect-your-service-across-logs-and-traces}

Si APM está habilitado para esta aplicación, conecta tus registros y trazas añadiendo automáticamente los IDs de trazas, IDs de span,
`env`, `service`, y `version` a tus registros [siguiendo las instrucciones de APM .NET][9]

**Nota**: Si el SDK de Datadog inyecta `service` en tus registros, anula el valor establecido en la configuración del agente.

## Registro sin agente con APM {#agentless-logging-with-apm}

Es posible transmitir registros desde tu aplicación a Datadog directamente, sin realizar cambios en el código, utilizando la biblioteca de instrumentación automática de APM .NET. Este enfoque envía registros directamente a Datadog, por lo que no se beneficia de [funciones como el enmascaramiento de datos sensibles][10] que proporciona el Agente de Datadog. Por esa razón, recomendamos utilizar el seguimiento de las últimas líneas de archivos cuando sea posible, pero es útil en entornos donde esto no es posible (cuando se utiliza [Azure App Service][11] por ejemplo). Vale la pena mencionar que aún podrás confiar en las capacidades de enmascaramiento del lado del servidor realizadas por [Sensitive Data Scanner][12].

El registro sin agente (también conocido como "envío directo de registros") admite los siguientes marcos:
- Serilog (v1.0+)
- NLog (v2.1+)
- log4net (v1.0+)
- Microsoft.Extensions.Logging (2.0+)

No requiere modificar el código de tu aplicación, ni instalar dependencias adicionales en tu aplicación.

<div class="alert alert-danger">
  <strong>Nota:</strong> Si utilizas log4net o NLog, se debe configurar un appender (log4net) o un logger (NLog) para habilitar el registro sin agente. En esos casos, puedes agregar estas dependencias adicionales, o usar <a href="/logs/log_collection/csharp/?tab=log4net#agentless-logging-with-serilog-sink">registro sin agente con el sumidero de Serilog</a> en su lugar.
</div>


### Configura el SDK de Datadog {#configure-the-datadog-sdk}

El registro sin agente solo está disponible al usar APM con instrumentación automática. Para comenzar, instrumenta tu aplicación como se describe en los siguientes documentos:

- [aplicaciones .NET Core/.NET 5+][13]
- [aplicaciones .NET Framework][14]

Después de instalar, verifica que estás recibiendo trazas correctamente.

### Habilita el registro sin agente {#enable-agentless-logging}

Para habilitar el registro sin agente, establece las siguientes variables de entorno:

`DD_API_KEY`
: Tu [clave de API de Datadog][15] para enviar tus registros a Datadog.

`DD_SITE`
: El nombre de [tu sitio de Datadog][16]. Elige uno de los siguientes ejemplos:<br>
**Ejemplo**: `datadoghq.com` (US1), `datadoghq.eu` (EU), `us3.datadoghq.com` (US3), `us5.datadoghq.com` (US5), `ap1.datadoghq.com` (AP1), `ap2.datadoghq.com` (AP2), `ddog-gov.com` (US1-FED), `us2.ddog-gov.com` (US2-FED) <br>
**Predeterminado**: `datadoghq.com` (US1)

`DD_LOGS_INJECTION`
: Habilita [conectar registros y trazas][9]:<br>
**Predeterminado**: `true` <br>
Habilitado por defecto desde la versión 3.24.0 del Tracer.

`DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS`
: Habilita el registro sin agente. Habilita para tu marco de registro configurando a `Serilog`, `NLog`, `Log4Net` o `ILogger` (para `Microsoft.Extensions.Logging`). Si estás utilizando múltiples marcos de registro, utiliza una lista de variables separadas por punto y coma.<br>
**Ejemplo**: `Serilog;Log4Net;NLog`

<div class="alert alert-danger">
  <strong>Nota:</strong> Si está utilizando un logging framework en conjunto con <code>Microsoft.Extensions.Logging</code>, generalmente necesitará utilizar el nombre del framework. Por ejemplo, si está utilizando <a href="https://github.com/serilog/serilog-extensions-logging">Serilog.Extensions.Logging</a>, debe configurar <code>DD_LOGS_DIRECT_SUBMISSION_INTEGRATIONS=Serilog</code>.
</div>

Reinicie su aplicación después de configurar estas variables de entorno.

### Configuración adicional {#additional-configuration}

Puede personalizar aún más algunos aspectos de la recolección de registros sin agente utilizando las siguientes variables de entorno:

`DD_LOGS_DIRECT_SUBMISSION_MINIMUM_LEVEL`
: Permite filtrar registros por nivel _antes_ de enviarse a Datadog. Configure a uno de los siguientes valores: `Verbose`, `Debug`, `Information`, `Warning`, `Error`, `Critical`. Estos corresponden a los niveles equivalentes en los logging frameworks soportados.<br>
**Predeterminado**: `Information`

`DD_LOGS_DIRECT_SUBMISSION_HOST`
: Establezca el nombre del host asociado a los registros. Si no se proporciona, se intentará encontrar automáticamente el nombre del host.<br>
**Predeterminado**: Determinado automáticamente

`DD_LOGS_DIRECT_SUBMISSION_TAGS`
: Si se especifica, agrega todas las etiquetas indicadas a todos los tramos generados. Si no se proporciona, se utilizará `DD_TAGS` en su lugar.<br>
**Ejemplo**: `layer:api, team:intake`
Tenga en cuenta que el delimitador es una coma y un espacio: `, `.

Los siguientes valores de configuración generalmente no deben ser modificados, pero pueden establecerse si es necesario.

`DD_LOGS_DIRECT_SUBMISSION_URL`
: Establece la URL donde se deben enviar los registros. Utiliza el dominio proporcionado en `DD_SITE` por defecto.<br>
**Predeterminado**: `{{< region-param key=http_endpoint_full >}}:443` (based on `DD_SITE`)

`DD_LOGS_DIRECT_SUBMISSION_SOURCE`
: Establece la regla de parseo para los registros enviados. Siempre debe establecerse en `csharp`, a menos que tenga un [custom pipeline][17].<br>
**Predeterminado**: `csharp`

`DD_LOGS_DIRECT_SUBMISSION_MAX_BATCH_SIZE`
: Establece el número máximo de registros a enviar a la vez. Toma en cuenta los [límites establecidos para la API][18].<br>
**Predeterminado**: `1000`

`DD_LOGS_DIRECT_SUBMISSION_MAX_QUEUE_SIZE`
: Establece el número máximo de registros que se pueden mantener en la cola interna en un momento dado antes de descartar mensajes de registro.<br>
**Predeterminado**: `100000`

`DD_LOGS_DIRECT_SUBMISSION_BATCH_PERIOD_SECONDS`
: Establece el tiempo de espera (en segundos) antes de verificar nuevos registros para enviar.<br>
**Predeterminado**: `1`

Si está utilizando la integración `Microsoft.Extensions.Logging`, puede filtrar los registros enviados a Datadog utilizando las capacidades estándar integradas en `ILogger`. Utilice la clave `"Datadog"` para identificar el proveedor de envío directo y establecer los niveles mínimos de registro para cada espacio de nombres. Por ejemplo, agregar lo siguiente a su `appSettings.json` evitaría enviar cualquier registro con un nivel inferior a `Warning` a Datadog. Introducido en el SDK de .NET v2.20.0.

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

## Registro sin agente con el Serilog sink {#agentless-logging-with-serilog-sink}

<div class="alert alert-info">Desde <code>0.2.0</code>, puede configurar el Datadog sink utilizando un <code>appsettings.json</code> archivo con el <a href="https://github.com/serilog/serilog-settings-configuration"><code>Serilog.Setting.Configuration</code></a> package.
Para más información, consulte el paquete <a href="https://github.com/DataDog/serilog-sinks-datadog-logs/tree/master?tab=readme-ov-file#serilogsinksdatadoglogs">`Serilog.Sinks.Datadog.Logs`</a>.</div>

Si no es posible utilizar el seguimiento de las últimas líneas de archivos o el registro sin agente de APM, y está utilizando el framework `Serilog`, entonces puede usar el [Serilog sink de Datadog][19] para enviar registros directamente a Datadog.

Instale el [Serilog sink de Datadog][19] en su aplicación, que envía eventos y registros a Datadog. Por defecto, el sink reenvía los registros a través de HTTPS en el puerto 443.
Ejecute el siguiente comando en la Consola del Administrador de Paquetes:

```text
PM> Install-Package Serilog.Sinks.Datadog.Logs
```

Luego, inicialice el logger directamente en su aplicación. Asegúrese de [agregar su `<API_KEY>`][15].

```csharp
using (var log = new LoggerConfiguration()
    .WriteTo.DatadogLogs("<API_KEY>", configuration: new DatadogConfiguration(){ Url = "{{< region-param key="http_endpoint_full" >}}" })
    .CreateLogger())
{
    // Some code
}
```

Los nuevos registros ahora se envían directamente a Datadog.

## Lectura Adicional {#further-reading}

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