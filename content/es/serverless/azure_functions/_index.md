---
title: Instala la monitorización serverless para Azure Functions
---

## Información general
En este Page ( página) se explica cómo recopilar trazas, métricas de trace (traza), métricas de tiempo de ejecución y métricas personalizadas de sus Azure Functions. Para recopilar métricas adicionales, instale la [Datadog integración de Azure][5].

## Configuración

{{< programming-lang-wrapper langs="nodejs,python,java,dotnet" >}}
{{< programming-lang lang="nodejs" >}}
1. **Instala dependencias**. Ejecuta los siguientes comandos:
   ```shell
   npm install @datadog/serverless-compat
   npm install dd-trace
   ```

   Datadog recomienda anclar las versiones de paquete y actualizar periódicamente a las últimas versiones de `@datadog/serverless-compat` y de `dd-trace` para asegurarte de tener acceso a las mejoras y correcciones de errores.

2. **Inicie la capa de compatibilidad sin servidor Datadog e inicialice el trazador Node.js Datadog **. Añade las siguientes líneas al archivo de punto de entrada de tu aplicación principal (por ejemplo, `app.js`):

   ```js
   require('@datadog/serverless-compat').start();

   // This line must come before importing any instrumented module. 
   const tracer = require('dd-trace').init()
   ```

3. **Configurar el trazador Datadog Node.js**

   [Configuración de la biblioteca de seguimiento de Node.js][1]

[1]:/es/tracing/trace_collection/library_config/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
1. **Instala dependencias**. Ejecuta los siguientes comandos:
   ```shell
   pip install datadog-serverless-compat
   pip install ddtrace
   ```

   Datadog recomienda utilizar las últimas versiones de `datadog-serverless-compat` y de `ddtrace` para asegurarte de tener acceso a las mejoras y correcciones de errores.

2. **Inicie Datadog Serverless Compatibility Layer e inicialice Datadog Python tracer**. Añade las siguientes líneas al archivo de punto de entrada de tu aplicación principal:

   ```python
   from datadog_serverless_compat import start
   import ddtrace.auto

   start()
   ```

3. **Configurar el trazador Python Datadog **

   [Configuración de la biblioteca de seguimiento de Python][1]

[1]:/es/tracing/trace_collection/library_config/python
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
1. **Instalar dependencias**. Descarga los JAR de Datadog y despliégalos con tu función:
   ```bash
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   wget -O dd-serverless-compat-java-agent.jar 'https://dtdg.co/latest-serverless-compat-java-agent'
   ```
   Ver Datadog's [Maven Repository][1] para cualquier versión específica de Datadog Serverless Compatibility Layer.

   Datadog recomienda actualizar periódicamente las versiones más recientes de `dd-serverless-compat-java-agent` y `dd-java-agent` para garantizar el acceso a las mejoras y correcciones de errores.

2. **Inicie la capa de compatibilidad sin servidor Datadog e inicialice el rastreador Java Datadog **. Añade los siguientes argumentos `-javaagent` a las opciones de la JVM.:

   ```bash
   -javaagent:/path/to/dd-serverless-compat-java-agent.jar -javaagent:/path/to/dd-java-agent.jar
   ```

   **Nota**: la variable de entorno para establecer las opciones de JVM depende del plan de alojamiento (por ejemplo, Consumo, Elastic Premium, Dedicado). Consulte [Azure Functions Java developer guide][2] para obtener más detalles sobre la variable de entorno adecuada para su plan de alojamiento.

3. **Configurar el trazador Java Datadog **

   [Configuración de la biblioteca de seguimiento de Java][3]

[1]: https://repo1.maven.org/maven2/com/datadoghq/dd-serverless-compat-java-agent/
[2]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-java?tabs=bash%2Cconsumption#customize-jvm
[3]: /es/tracing/trace_collection/library_config/java
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
1. **Instala dependencias**. Ejecuta los siguientes comandos:
   ```shell
   dotnet package add Datadog.Azure.Functions
   ```

   Datadog recomienda actualizar periódicamente a la última versión de `Datadog.AzureFunctions` para asegurarse de tener acceso a las mejoras y correcciones de errores.

2. **Inicie la capa de compatibilidad sin servidor Datadog **.

   Si su aplicación Azure Function utiliza el modelo Isolated Worker, añada las siguientes líneas a su archivo de punto de entrada de la aplicación principal:
   ```csharp
   Datadog.Serverless.CompatibilityLayer.Start();
   ```

   Si su aplicación Azure Function utiliza el modelo In-Process, añada una referencia de paquete NuGet a `Microsoft.Azure.Functions.Extensions`:
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

3. **Configurar Instrumentación Automática**

   Si su aplicación Azure Function se ejecuta en Windows, añada las siguientes variables de entorno a su aplicación Function:
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH_64=
   C:\home\site\wwwroot\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll

   CORECLR_PROFILER_PATH_32=
   C:\home\site\wwwroot\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll

   DD_DOTNET_TRACER_HOME=C:\home\site\wwwroot\datadog

   ```

   Si su aplicación Azure Function se ejecuta en Linux, añada las siguientes variables de entorno a su aplicación Function:
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH=
      /home/site/wwwroot/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so

   DD_DOTNET_TRACER_HOME=/home/site/wwwroot/datadog

   ```

4. **Configurar el trazador Datadog.NET**

   - [Configuración de la biblioteca de rastreo de .NET Core][1]
   - [Configuración de la biblioteca de seguimiento de .NET Framework][2]

[1]:/es/tracing/trace_collection/library_config/dotnet-core
[2]:/es/tracing/trace_collection/library_config/dotnet-framework
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

5. **Despliega tu función**.

6. **Configura Datadog Intake**. Añade las siguientes variables de entorno a la configuración de la aplicación de tus funciones:

   | Nombre | Valor |
   | ---- | ----- |
   | `DD_API_KEY` | Tu [clave de API Datadog][1]. |
   | `DD_SITE` | Tu [sitio Datadog][2]. Por ejemplo, {{< region-param key=dd_site code="true" >}}. |

7. **Configure el etiquetado de servicios unificados**. Puede recopilar métricas de sus funciones de Azure instalando la integración de Azure [Datadog ][5]. Para correlacionar estas métricas con sus trazas, primero configure las etiquetas `env`, `service`, y `version` en su recurso en Azure. A continuación, configura las siguientes variables de entorno.

   | Nombre | Valor |
   | ---- | ----- |
   | `DD_ENV` | Cómo quiere etiquetar su env para [Unified Service Tagging][7]. Por ejemplo, `prod`. |
   | `DD_SERVICE` | Cómo desea etiquetar su servicio para [Unified Service Tagging][7].  |
   | `DD_VERSION` | Cómo desea etiquetar su versión para [Etiquetado de Servicio Unificado][7]. |

## ¿Qué toca hacer ahora?

- Puede ver sus trazas de Azure Functions en [trace (traza) Explorer ][3]. Busque el nombre del servicio que estableció en la variable de entorno `DD_SERVICE` para ver sus trazas.
- Puedes utilizar [Serverless > Azure Functions][4] Page ( página) para ver tus trazas enriquecidas con telemetría recogida por la [Datadog Azure integration][5].

## Solucionar problemas

### Activa logs de depuración

Puede recopilar [registros de depuración][6] para solucionar problemas. Para configurar los registros de depuración, utilice las siguientes variables de entorno:

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