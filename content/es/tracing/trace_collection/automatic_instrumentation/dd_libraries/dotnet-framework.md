---
aliases:
- /es/tracing/dotnet
- /es/tracing/languages/dotnet
- /es/tracing/setup/dotnet
- /es/tracing/setup_overview/dotnet
- /es/agent/apm/dotnet/
- /es/tracing/dotnet-framework
- /es/tracing/languages/dotnet-framework
- /es/tracing/setup/dotnet-framework
- /es/agent/apm/dotnet-framework/
- /es/tracing/setup_overview/dotnet-framework
- /es/tracing/setup_overview/setup/dotnet
- /es/tracing/setup_overview/setup/dotnet-framework
- /es/tracing/trace_collection/dd_libraries/dotnet-framework
code_lang: dotnet-framework
code_lang_weight: 70
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: Documentación
  text: Conectar logs de aplicaciones .NET con trazas (traces)
- link: /tracing/metrics/runtime_metrics/dotnet/
  tag: Documentación
  text: Métricas de tiempos de ejecución
- link: /serverless/azure_app_services/
  tag: Documentación
  text: Extensión del servicio de aplicaciones Microsoft Azure
- link: /tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: Blog
  text: Monitorización .NET con Datadog APM y rastreo distribuido
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: Blog
  text: Monitorización de aplicaciones contenedorizadas de ASP.NET Core
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/
  tag: Blog
  text: Monitorizar aplicaciones contenedorizadas de ASP.NET Core en AWS Fargate
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: Blog
  text: Optimizar el rendimiento de tu aplicación .NET con el Datadog Continuous Profiler
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Código fuente
  text: Ejemplos de instrumentación personalizada
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Código fuente
  text: Código fuente
kind: documentación
title: Rastreo de aplicaciones .NET Framework
type: lenguaje de código múltiple
---
## Requisitos de compatibilidad

### Tiempos de ejecución de .NET Framework compatibles

El rastreador de .NET es compatible con la instrumentación en .NET Framework 4.6.1 o anteriores.

Para ver una lista completa de las compatibilidades de la arquitectura de la biblioteca y del procesador de Datadog .NET Framework (incluyendo las versiones heredadas y de mantenimiento), consulta los [requisitos de compatibilidad][1].

## Para instalar y empezar a utilizar

<div class="alert alert-info">
    Para configurar Datadog APM en AWS Lambda, consulta el <strong><a href="/tracing/serverless_functions/">rastreo de funciones serverless</a></strong>en Azure App Service y también el <strong><a href="/serverless/azure_app_services/">rastreo en Azure App Service</a></strong>.
</div>

<div class="alert alert-warning">
 <strong>Nota:</strong> La instrumentación automática de Datadog se basa en la API de generación de perfiles CLR de .NET. Esta API sólo permite un suscriptor (por ejemplo, Datadog APM). Para garantizar la máxima visibilidad, ejecuta sólo una solución APM en tu entorno de aplicación. 
</div>

### Instalación

Antes de empezar, asegúrate de haber [instalado y configurado el Agent][12].

1. [Instala el rastreador.](#install-the-tracer)
3. [Activa el rastreador para tu servicio.](#enable-the-tracer-for-your-service)
4. [Visualiza tus datos en directo.](#view-your-live-data)

### Instalación del rastreador

Después de instalar y configurar tu Datadog Agent, el siguiente paso es añadir la biblioteca de rastreo directamente en la aplicación para instrumentarla. Consulta más bibliografía con [información sobre la compatibilidad][1].

Instala el rastreador de .NET de Datadog en toda la máquina para que se instrumenten todos los servicios de la máquina, o puedes instalarlo aplicación por aplicación para que los desarrolladores gestionen la instrumentación a través de las dependencias de la aplicación. Para ver más instrucciones sobre la instalación en toda la máquina, haz clic en la pestaña de Windows. Para ver más instrucciones sobre la instalación aplicación por aplicación, haz clic en la pestaña de NuGet.

{{< tabs >}}

{{% tab "Windows" %}}

Para instalar el rastreador de .NET en toda la máquina:

1. Descarga el [instalador MSI del rastreador de .NET][1]. Selecciona el instalador MSI que corresponda a la arquitectura del sistema operativo (x64 ó x86).

2. Ejecuta el instalador MSI del rastreador de .NET con privilegios administrativos.

También puedes aplicar un script para la configuración del MSI ejecutando lo siguiente en PowerShell: `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-warning">
  <strong>Nota:</strong> Esta instalación no instrumenta aplicaciones que se ejecutan en IIS. En el caso de aplicaciones que se ejecutan en IIS, sigue el proceso de Windows para la instalación en toda la máquina.
</div>

Para instalar el rastreador de .NET aplicación por aplicación:

1. Añade el [paquete NuGet][1] `Datadog.Trace.Bundle` a tu aplicación.


[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### Activación del rastreador para tu servicio

Para activar el rastreador de .NET para tu servicio, configura las variables de entorno necesarias y reinicia la aplicación.

Para obtener más información sobre los diferentes métodos de configurar variables de entorno, consulta [Proceso de configuración de variables de entorno](#configuring-process-environment-variables).

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS)

1. El instalador MSI del rastreador de .NET añade todas las variables de entorno necesarias. No necesitas configurar ninguna variable de entorno.

2. Para instrumentar aplicaciones alojadas en IIS automáticamente, ejecuta los siguientes comandos como administrador para detener e reiniciar IIS completamente:

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-warning">
     <strong>Note:</strong> Always use the commands above to completely stop and restart IIS to enable the tracer. Avoid using the IIS Manager GUI application or <code>iisreset.exe</code>.
   </div>


#### Servicios que no se encuentran en IIS

<div class="alert alert-info">Cuando inicias v2.14.0, no necesitas configurar <code>COR_PROFILER</code>, si ya has instalado el rastreador utilizando el MSI.</div>

1. Configura las siguientes variables de entorno, obligatorias para la instrumentación automática, a fin de adjuntarlas a tu aplicación:

   ```
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   ```
2. En el caso de aplicaciones y servicios de Windows independientes, debes reiniciar la aplicación manualmente.

{{% /tab %}}

{{% tab "NuGet" %}}

Sigue las instrucciones Readme (Léeme) del paquete, también disponibles en el repositorio [`dd-trace-dotnet`][1].
En el [repositorio][2], también hay ejemplos de Docker disponibles.



[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### Visualización en directo de tus datos

Después de activar el rastreador de .NET para tu servicio:

1. Reinicia tu servicio.

2. Crea la carga de la aplicación.

3. En Datadog, ve a [**APM** > **APM Traces* (APM** > **Trazas APM)][3].

## Configuración

Si es necesario, configura la biblioteca de rastreo para que envíe datos de telemetría sobre el rendimiento de la aplicación, incluida la configuración del etiquetado unificado de servicios. Para ver más detalles, consulta la [configuración de bibliotecas][4].

## Instrumentación personalizada

Tu configuración de la instrumentación personalizada depende de tu instrumentación automática e incluye pasos adicionales que dependen del método:

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-warning">
  <strong>Nota:</strong> Si estás utilizando la instrumentación automática y la personalizada, debes mantener sincronizadas las versiones del paquete (por ejemplo: MSI y NuGet).
</div>

Para utilizar la instrumentación personalizada en tu aplicación .NET:

1. Añade el [paquete NuGet][1] `Datadog.Trace` a tu aplicación.
2. En tu código de aplicación, accede al rastreador global a través de la propiedad de `Datadog.Trace.Tracer.Instance` para crear nuevos tramos (spans).


[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "NuGet" %}}

Para utilizar la instrumentación personalizada en tu aplicación .NET:

1. En tu código de aplicación, accede al rastreador global a través de la propiedad de `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

{{% /tab %}}

{{< /tabs >}}

Para obtener más información sobre cómo añadir tramos y etiquetas (tags) para la instrumentación personalizada, consulta la [documentación para la instrumentación personalizada de .NET][5].

## Configuración de variables de entorno para procesos

Para adjuntar la instrumentación automática a tu servicio, debes configurar las variables de entorno obligatorias antes de iniciar la aplicación. Consulta la sección [Activar el rastreador para tu servicio](#enable-the-tracer-for-your-service) para identificar las variables de entorno que debes configurar, dependiendo del método que has utilizado para instalar el rastreador de .NET y sigue los siguientes ejemplos para configurar las variables de entorno correctamente, según el entorno de tu servicio instrumentado.

### Windows

<div class="alert alert-info">Cuando inicias v2.14.0, no necesitas configurar <code>COR_PROFILER</code>, si ya has instalado el rastreador utilizando el MSI.</div>

#### Servicios de Windows

{{< tabs >}}

{{% tab "Registry Editor" (Editor de registro) %}}

En el Editor de registro, crea un valor de cadena múltiple llamado `Environment` en la clave `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` y configura los datos de valor como:

```text
COR_ENABLE_PROFILING=1
COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
```

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Uso del Editor de registro para crear variables de entorno para un servicio de Windows" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
[string[]] $v = @("COR_ENABLE_PROFILING=1", "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}")
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value $v
```
{{% /tab %}}

{{< /tabs >}}

#### IIS

Una vez instalado el MSI, no es necesaria ninguna configuración adicional para instrumentar tus sitios de IIS automáticamente. Sigue los siguientes pasos para configurar variables de entorno adicionales, heredadas por todos los sitios de IIS:

1. Abre el Editor de registro, busca el valor de cadena múltiple llamado `Environment` en la clave `HKLM\System\CurrentControlSet\Services\WAS` y añade las variables de entorno, una por cada línea. Por ejemplo, para añadir la inyección de logs y métricas de tiempos de ejecución, añade las siguientes líneas a los datos de valor:
   ```text
   DD_LOGS_INJECTION=true
   DD_RUNTIME_METRICS_ENABLED=true
   ```
2. Ejecuta los siguientes comandos para reiniciar los IIS:
   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="Uso del Editor de registro para crear variables de entorno para todos los sitios de IIS" >}}

#### Aplicaciones de consola

Para instrumentar una aplicación de consola automáticamente, antes de iniciar tu aplicación configura las variables de entorno desde un archivo de lote:

```bat
rem Configura variables de entorno
SET COR_ENABLE_PROFILING=1
rem Excepto v2.14.0 o superior y que se haya instalado el rastreador con el MSI
SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}

rem Configura variables de entorno de Datadog adicionales
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/compatibility_requirements/dotnet-framework
[2]: /es/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /es/tracing/trace_collection/library_config/dotnet-framework/
[5]: /es/tracing/trace_collection/custom_instrumentation/dotnet/
[11]: /es/tracing/trace_collection/library_injection_local/
[12]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent