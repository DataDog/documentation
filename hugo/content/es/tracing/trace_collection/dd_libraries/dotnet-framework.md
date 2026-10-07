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
  text: Conectar los registros de la aplicación .NET a las trazas
- link: /tracing/metrics/runtime_metrics/dotnet/
  tag: Documentación
  text: Métricas de tiempo de ejecución
- link: /serverless/azure_app_services/
  tag: Documentación
  text: Extensión de Microsoft Azure App Service
- link: /tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
- link: https://www.datadoghq.com/blog/net-monitoring-apm/
  tag: Blog
  text: .NET monitoreo con Datadog APM y trazado distribuido
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: Blog
  text: Monitorea aplicaciones ASP.NET Core en contenedores
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-aws-fargate/
  tag: Blog
  text: Monitorea aplicaciones ASP.NET Core en contenedores en AWS Fargate
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: Blog
  text: Optimiza el rendimiento de tu aplicación .NET con el Continuous Profiler de
    Datadog
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Código fuente
  text: Ejemplos de instrumentación personalizada
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Código fuente
  text: Código fuente
title: Trazado de aplicaciones .NET Framework
type: multi-code-lang
---
## Requisitos de compatibilidad {#compatibility-requirements}

### Runtimes de .NET Framework soportados {#supported-net-framework-runtimes}

El trazador .NET soporta instrumentación en .NET Framework >= 4.6.1.

Para una lista completa de la biblioteca de .NET Framework de Datadog y el soporte de arquitectura de procesador (incluyendo versiones heredadas y de mantenimiento), consulta [Requisitos de Compatibilidad][1].

## Instalación y primeros pasos {#installation-and-getting-started}

<div class="alert alert-info">
  Para configurar Datadog APM en entornos Serverless, como AWS Lambda o Azure Functions, consulte <a href="/serverless">Serverless</a>.
</div>

<div class="alert alert-danger">
  <strong>Nota:</strong> La instrumentación automática de Datadog se basa en la API de perfilado de .NET CLR. Esta API permite solo un suscriptor (por ejemplo, Datadog APM). Para garantizar la máxima visibilidad, ejecute solo una solución APM en su entorno de aplicación.
</div>

### Instalación {#installation}

Antes de comenzar, asegúrese de haber [instalado y configurado el Agente][12].

1. [Instale el SDK.](#install-the-sdk)
3. [Habilite el SDK para su servicio.](#enable-the-sdk-for-your-service)
4. [Vea sus datos en vivo.](#view-your-live-data)

### Instale el SDK {#install-the-sdk}

Después de instalar y configurar su Agente de Datadog, el siguiente paso es agregar el SDK directamente en la aplicación para instrumentarla. Lea más sobre [información de compatibilidad][1].

Instale el trazador de Datadog .NET a nivel de máquina para que todos los servicios en la máquina estén instrumentados o a nivel de aplicación, para que los desarrolladores puedan gestionar la instrumentación a través de las dependencias de la aplicación. Para ver las instrucciones de instalación a nivel de máquina, haga clic en la pestaña de Windows. Para ver las instrucciones de instalación por aplicación, haga clic en la pestaña de NuGet.

{{< tabs >}}

{{% tab "Windows" %}}

Para instalar el trazador .NET a nivel de máquina:

1. Descargue el [.NET Tracer MSI installer][1]. Utilice el instalador MSI x64 si está ejecutando Windows de 64 bits; esto puede instrumentar tanto aplicaciones de 64 bits como de 32 bits. Solo elige el instalador x86 si estás ejecutando Windows de 32 bits. A partir de la versión 3.0.0, solo se proporciona el instalador x64, ya que no soportamos sistemas operativos de 32 bits.

2. Ejecuta el instalador MSI de .NET Tracer con privilegios de administrador.

También puedes automatizar la configuración de MSI ejecutando lo siguiente en PowerShell: `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-danger">
  <strong>Nota:</strong> Esta instalación no instrumenta aplicaciones que se ejecutan en IIS. Para aplicaciones que se ejecutan en IIS, sigue el proceso de instalación a nivel de máquina de Windows.
</div>

Para instalar el .NET Tracer por aplicación:

1. Agrega el `Datadog.Trace.Bundle` [paquete de NuGet][1] a tu aplicación.


[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### Habilita el SDK para tu servicio {#enable-the-sdk-for-your-service}

Para habilitar el .NET Tracer para tu servicio, establece las variables de entorno requeridas y reinicia la aplicación.

Para información sobre los diferentes métodos para establecer variables de entorno, consulta [Configuración de variables de entorno del proceso](#configuring-process-environment-variables).

{{< tabs >}}

{{% tab "Windows" %}}

#### Servicios de Información de Internet (IIS) {#internet-information-services-iis}

1. El instalador MSI de .NET Tracer agrega todas las variables de entorno requeridas. No hay variables de entorno que necesites configurar.

2. Para instrumentar automáticamente aplicaciones alojadas en IIS, detén y reinicia IIS completamente ejecutando los siguientes comandos como administrador:

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-danger">
     <strong>Nota:</strong> Siempre utiliza los comandos anteriores para detener y reiniciar completamente IIS para habilitar el SDK. Evita usar la aplicación GUI del Administrador de IIS o <code>iisreset.exe</code>.
   </div>


#### Servicios fuera de IIS {#services-outside-iis}

<div class="alert alert-danger">
  <strong>Nota:</strong> El runtime de .NET intenta cargar la biblioteca de .NET en <em>cualquier</em> proceso de .NET que se inicie con estas variables de entorno configuradas. Deberías limitar la instrumentación solo a las aplicaciones que necesitan ser instrumentadas. <strong>No configures estas variables de entorno globalmente, ya que esto causa que <em>todos</em> los procesos de .NET en el servidor sean instrumentados.</strong>
</div>

1. Configura las siguientes variables de entorno requeridas para que la instrumentación automática se adjunte a tu aplicación:

   ```
   COR_ENABLE_PROFILING=1
   ```
2. Para aplicaciones independientes y servicios de Windows, reinicia manualmente la aplicación.

{{% /tab %}}

{{% tab "NuGet" %}}

Sigue las instrucciones en el archivo readme del paquete, también disponible en [`dd-trace-dotnet` repositorio][1].
Los ejemplos de Docker también están disponibles en el [repositorio][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/blob/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment

{{% /tab %}}

{{< /tabs >}}

### Ve tus datos en vivo {#view-your-live-data}

Después de habilitar el .NET Tracer para tu servicio:

1. Reinicia tu servicio.

2. Crea carga de aplicación.

3. En Datadog, navega a [**APM** > **Trazas de APM**][3].

## Configuración {#configuration}

Si es necesario, configura el SDK para enviar datos de telemetría de rendimiento de la aplicación, incluyendo la configuración de Unified Service Tagging. Lee [Configuración de la Biblioteca][4] para más detalles.

## Instrumentación personalizada {#custom-instrumentation}

La instrumentación personalizada depende de su instrumentación automática e incluye pasos adicionales según el método:

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-danger">
<strong>Nota:</strong> A partir de la versión 3.0.0, la instrumentación personalizada requiere que también utilice la instrumentación automática. Debería esforzarse por mantener sincronizadas las versiones de los paquetes de instrumentación automática y personalizada (por ejemplo: MSI y NuGet), y asegurarse de no mezclar versiones principales de los paquetes.
</div>

Para utilizar la instrumentación personalizada en su aplicación .NET:

1. Instrumente su aplicación utilizando la instrumentación automática.
2. Agregue el `Datadog.Trace` [paquete de NuGet][1] a su aplicación.
3. En el código de su aplicación, acceda al rastreador global a través de la propiedad `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

[1]: https://www.nuget.org/packages/Datadog.Trace

{{% /tab %}}

{{% tab "NuGet" %}}

Para utilizar la instrumentación personalizada en su aplicación .NET:

1. En el código de su aplicación, acceda al rastreador global a través de la propiedad `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

{{% /tab %}}

{{< /tabs >}}

Para obtener más información sobre cómo agregar tramos y etiquetas para la instrumentación personalizada, consulte la [.NET Documentación de Instrumentación Personalizada][5].

## Configurando variables de entorno del proceso {#configuring-process-environment-variables}

Para adjuntar la instrumentación automática a su servicio, establezca las variables de entorno requeridas antes de iniciar la aplicación. Consulte la sección [Habilitar el SDK para su servicio](#enable-the-sdk-for-your-service) para identificar qué variables de entorno establecer según su método de instalación del Tracer .NET y siga los ejemplos a continuación para configurar correctamente las variables de entorno según el entorno de su servicio instrumentado.

<div class="alert alert-danger">
  <strong>Nota:</strong> El runtime de .NET intenta cargar la biblioteca de .NET en <em>cualquier</em> proceso de .NET que se inicie con estas variables de entorno configuradas. Deberías limitar la instrumentación solo a las aplicaciones que necesitan ser instrumentadas. <strong>No configures estas variables de entorno globalmente, ya que esto causa que <em>todos</em> los procesos de .NET en el host sean instrumentados.</strong>
</div>

#### Servicios de Windows {#windows-services}

{{< tabs >}}

{{% tab "Editor del Registro" %}}

En el Editor del Registro, cree un valor de cadena múltiple llamado `Environment` en la clave `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` y establezca los datos del valor en:

```text
COR_ENABLE_PROFILING=1
```

{{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Usando el Editor del Registro para crear variables de entorno para un servicio de Windows" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value 'COR_ENABLE_PROFILING=1'
```
{{% /tab %}}

{{< /tabs >}}

#### IIS {#iis}

Después de instalar el MSI, no se necesita configuración adicional para instrumentar automáticamente sus sitios de IIS. Para establecer variables de entorno adicionales que son heredadas por todos los sitios de IIS, realice los siguientes pasos:

1. Abra el Editor del Registro, busque el valor de cadena múltiple llamado `Environment` en la clave `HKLM\System\CurrentControlSet\Services\WAS`, y agregue las variables de entorno, una por línea. Por ejemplo, para agregar inyección de registros y métricas de tiempo de ejecución, agregue las siguientes líneas a los datos del valor:
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

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="Usando el Editor del Registro para crear variables de entorno para todos los sitios de IIS" >}}

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

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/compatibility_requirements/dotnet-framework
[2]: /es/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /es/tracing/trace_collection/library_config/dotnet-framework/
[5]: /es/tracing/trace_collection/custom_instrumentation/dotnet/
[11]: /es/tracing/trace_collection/library_injection_local/
[12]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent