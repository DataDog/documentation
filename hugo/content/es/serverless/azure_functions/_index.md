---
further_reading:
- link: /serverless/guide/disable_serverless
  tag: Documentación
  text: Deshabilitar Serverless Monitoring
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=azure#azure-functions
  tag: Documentación
  text: Envíe trazas de Azure Functions a Datadog con OTLP
- link: http://datadoghq.com/blog/azure-well-architected-serverless-applications-best-practices/
  tag: Blog
  text: Cree aplicaciones sin servidor de Azure seguras y escalables con el Well-Architected
    Framework.
- link: https://www.datadoghq.com/blog/monitor-azure-functions-hosting-plans/
  tag: Blog
  text: Haga un seguimiento de Azure Functions en todos los planes de hospedaje con
    Datadog
title: Instale Serverless Monitoring para Azure Functions
---
## Descripción general {#overview}
Esta página explica cómo recopilar trazas, métricas de traza, métricas de tiempo de ejecución, métricas mejoradas y métricas personalizadas de sus Azure Functions. Las [métricas mejoradas][11] se distinguen con el espacio de nombres `azure.functions.enhanced.*`. Para recopilar métricas adicionales, instale la [integración de Datadog-Azure][5].

Aquí está la lista de entornos de ejecución, sistemas operativos (SO) y planes de hospedaje compatibles para el monitoreo de Azure Functions:
- **Entornos de ejecución**: .NET, Node.js, Python, Java
- **Sistemas operativos (SO)**: Windows, Linux
- **Planes de hospedaje**: Plan dedicado (App Service), plan Premium, plan de consumo, plan Flex Consumption

El método de instalación recomendado depende de la configuración de su Azure Function:
- Para Azure Functions de .NET en Windows que se ejecutan en planes dedicados/App Service o Premium: utilice la [extensión de APM de .NET de Datadog][9].
- Para todas las demás configuraciones (incluidos diferentes entornos de ejecución, sistemas operativos o planes de hospedaje): siga las instrucciones a continuación para instalar la Serverless Compatibility Layer.

## Configuración {#setup}

Si aún no lo ha hecho, instale la [integración de Datadog-Azure][5] para recopilar métricas y registros. Luego, instrumente su aplicación con los siguientes pasos:

{{< programming-lang-wrapper langs="nodejs,python,java,dotnet" >}}
{{< programming-lang lang="nodejs" >}}
1. **Instale las dependencias**. Ejecute los siguientes comandos:
   ```shell
   npm install @datadog/serverless-compat
   npm install dd-trace
   ```

   Datadog recomienda fijar las versiones de los paquetes y actualizar regularmente a las versiones más recientes tanto de `@datadog/serverless-compat` como de `dd-trace` para asegurarse de tener acceso a mejoras y correcciones de errores.

2. **Inicie la capa de compatibilidad Serverless de Datadog e inicialice el SDK de Node.js de Datadog**.
   
   Utilice la opción `--require` para cargar e inicializar la capa de compatibilidad Serverless y el SDK de Node.js de Datadog en un solo paso. Las opciones de Node en Azure Functions se pueden configurar con la variable de entorno `languageWorkers__node__arguments`.

   ```
   languageWorkers__node__arguments='--require @datadog/serverless-compat/init --require dd-trace/init'
   ```

3. **Configure el SDK de Datadog para Node.js**

   [Configuración del SDK de Node.js][1]

[1]:/es/tracing/trace_collection/library_config/nodejs
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}
1. **Instale las dependencias**. Ejecute los siguientes comandos:
   ```shell
   pip install datadog-serverless-compat
   pip install ddtrace
   ```

   Datadog recomienda usar las versiones más recientes de `datadog-serverless-compat` y `ddtrace` para asegurarse de tener acceso a mejoras y correcciones de errores.

2. **Inicie la capa de compatibilidad Serverless de Datadog e inicialice el SDK de Python de Datadog**. Agregue las siguientes líneas a su archivo de punto de entrada principal de la aplicación:

   ```python
   from datadog_serverless_compat import start
   start()

   import ddtrace.auto # noqa: E402, F401
   ```

3. **Configure el SDK de Python de Datadog**

   [Configuración del SDK de Python][1]

[1]:/es/tracing/trace_collection/library_config/python
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}
1. **Instale las dependencias**. Descargue los archivos JAR de Datadog e impleméntelos con su función:
   ```bash
   wget -O dd-java-agent.jar 'https://dtdg.co/latest-java-tracer'
   wget -O dd-serverless-compat-java-agent.jar 'https://dtdg.co/latest-serverless-compat-java-agent'
   ```
   Consulte el [Repositorio de Maven][1] de Datadog para cualquier versión específica de la capa de compatibilidad Serverless de Datadog.

   Datadog recomienda actualizar periódicamente a las versiones más recientes de `dd-serverless-compat-java-agent` y `dd-java-agent` para asegurarse de tener acceso a mejoras y correcciones de errores.

2. **Inicie la capa de compatibilidad Serverless de Datadog e inicialice el SDK de Java de Datadog**. Agregue los siguientes argumentos `-javaagent` a las opciones de la JVM:

   ```bash
   -javaagent:/path/to/dd-serverless-compat-java-agent.jar -javaagent:/path/to/dd-java-agent.jar
   ```

   **Nota**: la variable de entorno para establecer las opciones de la JVM depende del plan de hospedaje (por ejemplo, Consumption, Elastic Premium, Dedicated). Consulte la [guía para desarrolladores de Java en Azure Functions][2] para obtener más detalles sobre la variable de entorno adecuada para su plan de hospedaje.

3. **Configure el SDK de Java de Datadog**

   [Configuración del SDK de Java][3]

[1]: https://repo1.maven.org/maven2/com/datadoghq/dd-serverless-compat-java-agent/
[2]: https://learn.microsoft.com/en-us/azure/azure-functions/functions-reference-java?tabs=bash%2Cconsumption#customize-jvm
[3]: /es/tracing/trace_collection/library_config/java
{{< /programming-lang >}}
{{< programming-lang lang="dotnet" >}}
1. **Instale las dependencias**. Ejecute los siguientes comandos:
   ```shell
   dotnet package add Datadog.AzureFunctions
   ```

   Datadog recomienda actualizar regularmente a la última versión de `Datadog.AzureFunctions` para asegurarse de tener acceso a mejoras y correcciones de errores.

2. **Inicie la capa de compatibilidad Serverless de Datadog**.

   Si su aplicación de Azure Function utiliza el modelo de trabajador aislado (Isolated Worker), agregue las siguientes líneas a su archivo de punto de entrada principal de la aplicación:
   ```csharp
   Datadog.Serverless.CompatibilityLayer.Start();
   ```

   Si su aplicación de Azure Function utiliza el [modelo en proceso heredado][3], agregue una referencia de paquete NuGet a `Microsoft.Azure.Functions.Extensions`:
   ```shell
   dotnet package add Microsoft.Azure.Functions.Extensions
   ```

   Y agregue el siguiente archivo `.cs` a su aplicación:
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

3. **Configure la instrumentación automática**

   Si su aplicación de Azure Function se ejecuta en Windows, agregue las siguientes variables de entorno a su aplicación de Function:
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH_64=
   C:\home\site\wwwroot\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll

   CORECLR_PROFILER_PATH_32=
   C:\home\site\wwwroot\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll

   DD_DOTNET_TRACER_HOME=C:\home\site\wwwroot\datadog

   ```

   Si su aplicación de Azure Function se ejecuta en Linux, agregue las siguientes variables de entorno a su aplicación de Function:
   ```
   CORECLR_ENABLE_PROFILING=1

   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

   CORECLR_PROFILER_PATH=
      /home/site/wwwroot/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so

   DD_DOTNET_TRACER_HOME=/home/site/wwwroot/datadog

   ```

4. **Configure el SDK de .NET de Datadog**

   - [Configuración del SDK de .NET Core de Datadog][1]
   - [Configuración del SDK de .NET Framework de Datadog][2]

[1]: /es/tracing/trace_collection/library_config/dotnet-core
[2]: /es/tracing/trace_collection/library_config/dotnet-framework
[3]: https://learn.microsoft.com/en-us/azure/azure-functions/dotnet-isolated-in-process-differences
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

5. **Implemente su función**.

6. **Configure la ingesta de Datadog**. Agregue las siguientes variables de entorno a la configuración de la aplicación de su función:

   | Nombre | Valor |
   | ---- | ----- |
   | `DD_API_KEY` | Su [clave de Datadog API][1]. |
   | `DD_SITE` | Su [sitio de Datadog][2]. Por ejemplo, {{< region-param key=dd_site code="true" >}}. |
   | `DD_AZURE_RESOURCE_GROUP` | Su grupo de recursos de Azure. Solo es necesario para Azure Functions en el [plan Flex Consumption][8]. |

   {{% svl-tracing-env %}}

7. **Configure Unified Service Tagging**. Puede recopilar métricas de sus Azure Functions instalando la [integración de Datadog-Azure][5]. Para correlacionar estas métricas con sus trazas, primero establezca las etiquetas `env`, `service` y `version` en su recurso en Azure. Luego, configure las siguientes variables de entorno.

   | Nombre | Valor |
   | ---- | ----- |
   | `DD_ENV` | Cómo desea etiquetar su entorno para [Unified Service Tagging][7]. Por ejemplo, `prod`. |
   | `DD_SERVICE` | Cómo desea etiquetar su servicio para [Unified Service Tagging][7].  |
   | `DD_VERSION` | Cómo desea etiquetar su versión para [Unified Service Tagging][7]. |

## ¿Qué sigue? {#whats-next}

- Puede ver sus trazas de Azure Functions en [{{< ui >}}Trace Explorer{{< /ui >}}][3]. Busque el nombre del servicio que estableció en la variable de entorno `DD_SERVICE` para ver sus trazas.
- Puede usar la página [{{< ui >}}Serverless{{< /ui >}} > {{< ui >}}Azure Functions{{< /ui >}}][4] para ver sus trazas enriquecidas con telemetría recopilada por la [integración de Datadog-Azure][5].

## Profiling {#profiling}

<div class="alert alert-info">
El Continuous Profiler de Datadog está disponible en versión preliminar para Python y Node.js en Azure Functions.
</div>

Para habilitar el [Continuous Profiler][10], establezca la variable de entorno `DD_PROFILING_ENABLED=true`.

## Solución de problemas {#troubleshooting}

### Habilite registros de depuración {#enable-debug-logs}

Puede recopilar [registros de depuración][6] para la solución de problemas. Para configurar los registros de depuración, utilice las siguientes variables de entorno:

`DD_TRACE_DEBUG`
: Habilita (`true`) o deshabilita (`false`) el registro de depuración para el SDK de Datadog. El valor predeterminado es `false`.

  **Valores**: `true`, `false`

`DD_LOG_LEVEL`
: Establece el nivel de registro para la Capa de compatibilidad Serverless de Datadog. El valor predeterminado es `info`.

  **Valores**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off`

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/api-app-keys/#add-an-api-key-or-client-token
[2]: /es/getting_started/site
[3]: https://app.datadoghq.com/apm/traces
[4]: https://app.datadoghq.com/functions?cloud=azure&entity_view=function
[5]: /es/integrations/azure/
[6]: /es/tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
[7]: /es/getting_started/tagging/unified_service_tagging/
[8]: https://learn.microsoft.com/en-us/azure/azure-functions/flex-consumption-plan
[9]: /es/serverless/azure_functions/dotnet_extension/
[10]: /es/profiler/
[11]: /es/integrations/azure-functions/#metrics