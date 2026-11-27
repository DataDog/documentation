---
algolia:
  tags:
  - C#
  - APM
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
- /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-framework
code_lang: dotnet-framework
code_lang_weight: 70
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: Documentación
  text: Conecte los registros de aplicaciones .NET a los rastreos
- link: /tracing/metrics/runtime_metrics/dotnet/
  tag: Documentación
  text: Métricas de tiempo de ejecución
- link: /serverless/azure_app_services/
  tag: Documentación
  text: Extensión de Microsoft Azure App Service
- link: /tracing/glossary/
  tag: Documentación
  text: Explore sus servicios, recursos y trazas
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: Blog
  text: Monitoreo de .NET con Datadog APM y rastreo distribuido
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: Blog
  text: Monitoree aplicaciones ASP.NET Core en contenedores
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/
  tag: Blog
  text: Monitoree aplicaciones ASP.NET Core en contenedores en AWS Fargate
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: Blog
  text: Optimice el rendimiento de su aplicación .NET con el Datadog Continuous Profiler
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Código fuente
  text: Ejemplos de instrumentación personalizada
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Código fuente
  text: Código fuente
title: Rastreo de aplicaciones .NET Framework
type: multi-code-lang
---
## Requisitos de compatibilidad {#compatibility-requirements}

### Entornos de ejecución de .NET Framework compatibles {#supported-net-framework-runtimes}

El .NET Tracer admite la instrumentación en .NET Framework >= 4.6.1.

Para obtener una lista completa de la compatibilidad de Datadog con bibliotecas y arquitecturas de procesador de .NET Framework (incluidas las versiones heredadas y de mantenimiento), consulte [Requisitos de compatibilidad][1].

## Instalación y primeros pasos {#installation-and-getting-started}

<div class="alert alert-tip">Datadog recomienda <a href="/tracing/trace_collection/single-step-apm/">Single Step Instrumentation</a> (SSI), que instala el SDK de .NET y gestiona su versión desde la configuración de su Datadog Agent, sin realizar cambios en el código de su aplicación. Utilice la configuración manual en esta página si <a href="/tracing/trace_collection/single-step-apm/compatibility/">SSI no es compatible con su entorno</a> o si necesita gestionar el SDK en el código de su aplicación.</div>

<div class="alert alert-info">
  Para configurar Datadog APM en entornos Serverless, como AWS Lambda o Azure Functions, consulte <a href="/serverless">Serverless</a>.
</div>

<div class="alert alert-danger">
  <strong>Nota:</strong> La instrumentación automática de Datadog depende de la API de perfilado de .NET CLR. Esta API permite solo un suscriptor (por ejemplo, Datadog APM). Para garantizar la máxima visibilidad, ejecute solo una solución de APM dentro de su entorno de aplicación.
</div>

### Instalación {#installation}

Antes de comenzar, asegúrese de haber [instalado y configurado el Agent][12].

1. [Instale el SDK.](#install-the-sdk)
3. [Habilite el SDK para su servicio.](#enable-the-sdk-for-your-service)
4. [Vea sus datos en vivo.](#view-your-live-data)

### Instale el SDK {#install-the-sdk}

Después de instalar y configurar su Datadog Agent, el siguiente paso es agregar el SDK directamente en la aplicación para instrumentarla. Lea más sobre [información de compatibilidad][1].

Instale el Datadog .NET Tracer en todo el equipo para instrumentar todos los servicios del equipo, o por aplicación para que los desarrolladores puedan administrar la instrumentación mediante las dependencias de la aplicación. Para ver las instrucciones de instalación en todo el equipo, haga clic en la pestaña Windows. Para ver las instrucciones de instalación por aplicación, haga clic en la pestaña NuGet.

{{< tabs >}}

{{% tab "Windows" %}}

Para instalar el .NET Tracer en todo el equipo:

1. Descargue el [instalador MSI de .NET Tracer][1]. Use el instalador MSI x64 si ejecuta Windows de 64 bits; este puede instrumentar aplicaciones tanto de 64 bits como de 32 bits. Elija el instalador x86 solo si está ejecutando Windows de 32 bits. A partir de la versión v3.0.0, solo se proporciona el instalador x64, ya que no admitimos sistemas operativos de 32 bits.

2. Ejecute el instalador MSI de .NET Tracer con privilegios de administrador.

También puede crear un script para la configuración de MSI ejecutando lo siguiente en PowerShell: `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-danger">
  <strong>Nota:</strong> Esta instalación no instrumenta aplicaciones que se ejecutan en IIS. Para las aplicaciones que se ejecutan en IIS, siga el proceso de instalación en todo el equipo para Windows.
</div>

Para instalar el .NET Tracer por aplicación:

1. Agregue el `Datadog.Trace.Bundle` [paquete NuGet][1] a su aplicación.


[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### Habilite el SDK para su servicio {#enable-the-sdk-for-your-service}

Para habilitar el .NET Tracer para su servicio, configure las variables de entorno requeridas y reinicie la aplicación.

Para obtener información sobre los diferentes métodos para configurar variables de entorno, consulte [Configuración de variables de entorno del proceso](#configuring-process-environment-variables).

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS) {#internet-information-services-iis}

1. El instalador MSI de .NET Tracer agrega todas las variables de entorno necesarias. No hay variables de entorno que necesite configurar.

2. Para instrumentar automáticamente las aplicaciones alojadas en IIS, detenga e inicie IIS por completo ejecutando los siguientes comandos como administrador:

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-danger">
     <strong>Nota:</strong> Utilice siempre los comandos anteriores para detener y reiniciar IIS por completo a fin de habilitar el SDK. Evite utilizar la aplicación de interfaz gráfica de IIS Manager o <code>iisreset.exe</code>.
   </div>


#### Servicios fuera de IIS {#services-outside-iis}

<div class="alert alert-danger">
  <strong>Nota:</strong> El tiempo de ejecución de .NET intenta cargar la biblioteca de .NET en <em>cualquier</em> proceso de .NET que se inicie con estas variables de entorno configuradas. Debe limitar la instrumentación solo a las aplicaciones que necesiten ser instrumentadas. <strong>No configure estas variables de entorno de forma global, ya que esto provoca que <em>todos</em> los procesos de .NET en el servidor sean instrumentados.</strong>
</div>

1. Establezca las siguientes variables de entorno requeridas para que la instrumentación automática se adjunte a su aplicación:

   ```
   COR_ENABLE_PROFILING=1
   ```
2. Para aplicaciones independientes y servicios de Windows, reinicie manualmente la aplicación.

{{% /tab %}}

{{% tab "NuGet" %}}

Siga las instrucciones del README del paquete, también disponible en el [`dd-trace-dotnet` repositorio][1].
Los ejemplos de Docker también están disponibles en el [repositorio][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment

{{% /tab %}}

{{< /tabs >}}

### Vea sus datos en vivo {#view-your-live-data}

Después de habilitar el .NET Tracer para su servicio:

1. Reinicie su servicio.

2. Genere carga en la aplicación.

3. En Datadog, navegue a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}APM Traces{{< /ui >}}][3].

## Configuración {#configuration}

Si es necesario, configure el SDK para enviar datos de telemetría de rendimiento de la aplicación, incluyendo la configuración de Unified Service Tagging. Lea [Configuración de la biblioteca][4] para obtener detalles.

## Instrumentación personalizada {#custom-instrumentation}

La instrumentación personalizada depende de su instrumentación automática e incluye pasos adicionales según el método:

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-danger">
<strong>Nota:</strong> A partir de la v3.0.0, la instrumentación personalizada requiere que también utilice la instrumentación automática. Debe intentar mantener sincronizadas las versiones de los paquetes de instrumentación automática y personalizada (por ejemplo, MSI y NuGet) y asegurarse de no mezclar versiones principales de los paquetes.
</div>

Para usar la instrumentación personalizada en su aplicación .NET:

1. Instrumente su aplicación usando instrumentación automática.
2. Agregue el `Datadog.Trace` [paquete NuGet][1] a su aplicación.
3. En el código de su aplicación, acceda al rastreador global a través de la propiedad `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

[1]: https://www.nuget.org/packages/Datadog.Trace

{{% /tab %}}

{{% tab "NuGet" %}}

Para usar la instrumentación personalizada en su aplicación .NET:

1. En el código de su aplicación, acceda al rastreador global a través de la propiedad `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

{{% /tab %}}

{{< /tabs >}}

Para obtener más información sobre cómo agregar tramos y etiquetas para instrumentación personalizada, consulte la [documentación de instrumentación personalizada de .NET][5].

## Configuración de variables de entorno del proceso {#configuring-process-environment-variables}

Para adjuntar la instrumentación automática a su servicio, establezca las variables de entorno requeridas antes de iniciar la aplicación. Consulte la sección [Habilite el SDK para su servicio](#enable-the-sdk-for-your-service) para identificar qué variables de entorno establecer según el método de instalación de .NET Tracer y siga los ejemplos a continuación para establecer correctamente las variables de entorno según el entorno de su servicio instrumentado.

<div class="alert alert-danger">
  <strong>Nota:</strong> El tiempo de ejecución de .NET intenta cargar la biblioteca de .NET en <em>cualquier</em> proceso de .NET que se inicie con estas variables de entorno configuradas. Debe limitar la instrumentación solo a las aplicaciones que necesiten ser instrumentadas. <strong>No configure estas variables de entorno de forma global, ya que esto provoca que <em>todos</em> los procesos de .NET en el servidor sean instrumentados.</strong>
</div>

#### Servicios de Windows {#windows-services}

{{< tabs >}}

{{% tab "Registry Editor" %}}

En el Registry Editor, cree un valor de cadena múltiple llamado `Environment` en la clave `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` y establezca los datos del valor en:

```text
COR_ENABLE_PROFILING=1
```

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Uso del Registry Editor para crear variables de entorno para un servicio de Windows" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value 'COR_ENABLE_PROFILING=1'
```
{{% /tab %}}

{{< /tabs >}}

#### IIS {#iis}

Después de instalar el MSI, no se necesita configuración adicional para instrumentar automáticamente sus sitios de IIS. Para establecer variables de entorno adicionales que sean heredadas por todos los sitios de IIS, realice los siguientes pasos:

1. Abra el Registry Editor, busque el valor de cadena múltiple llamado `Environment` en la clave `HKLM\System\CurrentControlSet\Services\WAS` y agregue las variables de entorno, una por línea. Por ejemplo, para agregar la inyección de registros y las métricas de tiempo de ejecución, agregue las siguientes líneas a los datos del valor:
   ```text
   DD_LOGS_INJECTION=true
   DD_RUNTIME_METRICS_ENABLED=true
   ```
2. Ejecute los siguientes comandos para reiniciar IIS:
   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="Uso del Registry Editor para crear variables de entorno para todos los sitios de IIS" >}}

#### Aplicaciones de consola {#console-applications}

Para instrumentar automáticamente una aplicación de consola, establezca las variables de entorno desde un archivo por lotes antes de iniciar su aplicación:

```bat
rem Set required environment variables
SET COR_ENABLE_PROFILING=1

rem (Optionally) Set additional Datadog environment variables, for example:
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/compatibility_requirements/dotnet-framework
[2]: /es/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /es/tracing/trace_collection/library_config/dotnet-framework/
[5]: /es/tracing/trace_collection/custom_instrumentation/dotnet/
[11]: /es/tracing/trace_collection/library_injection_local/
[12]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent