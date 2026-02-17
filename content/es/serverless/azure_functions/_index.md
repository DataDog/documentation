---
further_reading:
- link: /serverless/guide/disable_serverless
  tag: Documentación
  text: Desactivar Serverless Monitoring
- link: http://datadoghq.com/blog/azure-well-architected-serverless-applications-best-practices/
  tag: Blog
  text: Crea aplicaciones serverless seguras y escalables de Azure con el marco bien
    diseñado
title: Instala la Serverless Monitoring para Azure Functions
---

## Información general
En esta page (página), se explica cómo recopilar traces (trazas), métricas de traces (trazas), métricas de tiempo de ejecución y métricas personalizadas de tus Azure Functions. Para recopilar métricas adicionales, instala la [Integración de Datadog y Azure][5].

## Configuración

Si aún no lo has hecho, instala la [Integración de Datadog y Azure][5] para recopilar métricas y logs. A continuación, instrumenta tu aplicación con los siguientes steps (UI) / pasos (generic):

{{< programming-lang-wrapper langs="nodejs,python,java,dotnet" >}}
{{< programming-lang lang="nodejs" >}}
1. **Instalar dependencias**. Ejecuta los siguientes comandos:
   ```shell
   npm install @datadog/serverless-compat
   npm install dd-trace
   ```

   Datadog recomienda anclar las versiones de paquete y actualizar periódicamente a las últimas versiones de `@datadog/serverless-compat` y de `dd-trace` para asegurarte de tener acceso a las mejoras y correcciones de errores.

2. **Iniciar la capa de compatibilidad serverless de Datadog e inicializar el rastreador de Node.js de Datadog**. Añade las siguientes líneas al archivo de punto de entrada de tu aplicación principal (por ejemplo, `app.js`):

   ```js
   require('@datadog/serverless-compat').start();

   // This line must come before importing any instrumented module.
   const tracer = require('dd-trace').init()
   ```

3. **Configurar el rastreador de Node.js de Datadog**

   [Configuración de la biblioteca de rastreo de Node.js][1]

[1]:/es/tracing/trace_collection/library_config/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
1. **Instalar dependencias**. Ejecuta los siguientes comandos:
   ```shell
   pip install datadog-serverless-compat
   pip install ddtrace
   ```

   Datadog recomienda utilizar las últimas versiones de `datadog-serverless-compat` y de `ddtrace` para asegurarte de tener acceso a las mejoras y correcciones de errores.

2. **Iniciar la capa de compatibilidad serverless de Datadog e inicializar el rastreador de Python de Datadog**. Añade las siguientes líneas al archivo de punto de entrada de tu aplicación principal:

   ```python
   from datadog_serverless_compat import start
   import ddtrace.auto

   start()
   ```

3. **Configurar el rastreador de Python de Datadog **

   [Configuración de la biblioteca de rastreo de Python][1]

[1]:/es/tracing/trace_collection/library_config/python
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
1. **Instalar dependencias**. Descarga los JAR de Datadog y despliégalos con tu función:
   ```bash
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   wget -O dd-serverless-compat-java-agent.jar 'https://dtdg.co/latest-serverless-compat-java-agent'
   ```
   Consulta el [Repositorio de Maven][1] de Datadog para cualquier versión específica de la capa de compatibilidad serverless de Datadog.

   Datadog recomienda actualizar periódicamente las versiones más recientes de `dd-serverless-compat-java-agent` y `dd-java-agent` para garantizar el acceso a las mejoras y correcciones de errores.

2. **Iniciar la capa de compatibilidad serverless de Datadog e inicializar el rastreador Java de Datadog**. Añade los siguientes argumentos `-javaagent` a las opciones de JVM:

   ```bash
   -javaagent:/path/to/dd-serverless-compat-java-agent.jar -javaagent:/path/to/dd-java-agent.jar
   ```

   **Nota**: La variable de entorno para configurar las opciones de JVM depende del plan de alojamiento (por ejemplo, Consumo, Elastic Premium, Dedicado). Consulta la [guía para el desarrollador de Java de Azure Functions][2] para obtener más detalles sobre la variable de entorno adecuada para tu plan de alojamiento.

3. **Configurar el rastreador de Java de Datadog**

   [Configuración de la biblioteca de rastreo de Java][3]

[1]: https://repo1.maven.org/maven2/com/datadoghq/dd-serverless-compat-java-agent/
[2]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-java?tabs=bash%2Cconsumption#customize-jvm
[3]: /es/tracing/trace_collection/library_config/java
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
1. **Instalar dependencias**. Ejecuta los siguientes comandos:
   ```shell
   dotnet package add Datadog.AzureFunctions
   ```

   Datadog recomienda actualizar periódicamente a la última versión de `Datadog.AzureFunctions` para asegurarte de tener acceso a las mejoras y correcciones de errores.

2. **Iniciar la capa de compatibilidad serverless de Datadog**.

   Si tu aplicación de Azure Function utiliza el modelo Isolated Worker, añade las siguientes líneas a tu archivo de punto de entrada de la aplicación principal:
   ```csharp
   Datadog.Serverless.CompatibilityLayer.Start();
   ```

   Si tu aplicación de Azure Function utiliza el modelo en contenedor, añade una referencia de paquete de NuGet a `Microsoft.Azure.Functions.Extensions`:
   ```shell
   dotnet package add Microsoft.Azure.Functions.Extensions
   ```

   Y añade el siguiente archivo `.cs` a tu aplicación:
   ```csharp
   using Datadog.Serverless;
   using Microsoft.Azure.Functions.Extensions.DependencyInjection;

   [assembly: FunctionsStartup(typeof(MyFunctionApp.Startup))]

   namespace MyFunctionApp
   {
      public class Startup : FunctionsStartup
      {
         public override void Configure(IFunctionsHostBuilder builder)
         {
               Datadog.Serverless.CompatibilityLayer.Start();
         }
      }
   }
   ```

3. **Configurar instrumentación automática**

   Si tu aplicación de Azure Function se ejecuta en Windows, añade las siguientes variables de entorno a tu aplicación de Function:
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH_64=
   C:\home\site\wwwroot\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll

   CORECLR_PROFILER_PATH_32=
   C:\home\site\wwwroot\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll

   DD_DOTNET_TRACER_HOME=C:\home\site\wwwroot\datadog

   ```

   Si tu aplicación de Azure Function se ejecuta en Linux, añade las siguientes variables de entorno a tu aplicación de Function:
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH=
      /home/site/wwwroot/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so

   DD_DOTNET_TRACER_HOME=/home/site/wwwroot/datadog

   ```

4. **Configurar el rastreador de .NET de Datadog**

   - [Configuración de la biblioteca de rastreo de .NET Core][1]
   - [Configuración de la biblioteca de rastreo de .NET Framework][2]

[1]:/es/tracing/trace_collection/library_config/dotnet-core
[2]:/es/tracing/trace_collection/library_config/dotnet-framework
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

5. **Desplegar tu función**.

6. **Configurar la entrada de Datadog**. Añade las siguientes variables de entorno a la configuración de la aplicación de tus funciones:

   | Nombre | Valor |
   | ---- | ----- |
   | `DD_API_KEY` | Tu [clave de API de Datadog][1]. |
   | `DD_SITE` | Tu [sitio Datadog][2]. Por ejemplo, {{< region-param key=dd_site code="true" >}}. |
   | `DD_AZURE_RESOURCE_GROUP` | Tu grupo de recursos de Azure. Solo es necesario para Azure Functions en el [plan Flex Consumption][8]. |

7. **Configurar el etiquetado de servicios unificados**. Puedes recopilar métricas de tus funciones de Azure mediante la instalación de la [integración de Datadog y Azure][5]. Para correlacionar estas métricas con tus traces (trazas), primero configura las etiquetas `env`, `service` y `version` en tu recurso en Azure. A continuación, configura las siguientes variables de entorno.

   | Nombre | Valor |
   | ---- | ----- |
   | `DD_ENV` | Cómo deseas etiquetar tu variable de entorno para el [Etiquetado de servicios unificados][7]. Por ejemplo, `prod`. |
   | `DD_SERVICE` | Cómo deseas etiquetar tu servicio para el [Etiquetado de servicios unificados][7].  |
   | `DD_VERSION` | Cómo deseas etiquetar tu versión para el [Etiquetado de servicios unificados][7]. |

## ¿Qué toca hacer ahora?

- Puedes ver tus traces (trazas) de Azure Functions en [Trace Explorer][3]. Busca el nombre del servicio que configuraste en la variable de entorno `DD_SERVICE` para ver tus trazas.
- Puedes utilizar la page (página) [Serverless > Azure Functions][4] para ver tus traces (trazas) enriquecidas con telemetría recogida por la [integración  de Azure y Datadog][5].

## Solucionar problemas

### Activa logs de depuración

Puedes recopilar [logs de depuración][6] para solucionar problemas. Para configurar los logs de depuración, utiliza las siguientes variables de entorno:

`DD_TRACE_DEBUG`
: Activa (`true`) o desactiva (`false`) el registro de depuración para la biblioteca de Datadog Tracing. El valor predeterminado es `false`.

  **Valores**: `true`, `false`

`DD_LOG_LEVEL`
: Configura el nivel de registro para la capa de compatibilidad serverless de Datadog. El valor predeterminado es `info`.

  **Valores**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off`

[1]: /es/account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /es/getting_started/site
[3]: https://app.datadoghq.com/apm/traces
[4]: https://app.datadoghq.com/functions?cloud=azure&entity_view=function
[5]: /es/integrations/azure/
[6]: /es/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[7]: /es/getting_started/tagging/unified_service_tagging/
[8]: https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-plan