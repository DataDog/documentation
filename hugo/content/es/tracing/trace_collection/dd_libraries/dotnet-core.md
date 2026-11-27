---
algolia:
  tags:
  - C#
  - APM
aliases:
- /es/tracing/dotnet-core
- /es/tracing/languages/dotnet-core
- /es/tracing/setup/dotnet-core
- /es/agent/apm/dotnet-core/
- /es/tracing/setup/dotnet-core
- /es/tracing/setup_overview/dotnet-core
- /es/tracing/setup_overview/setup/dotnet-core
- /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/dotnet-core
code_lang: dotnet-core
code_lang_weight: 60
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/dotnet/
  tag: Documentación
  text: Conecte los registros de la aplicación .NET a los rastreos
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
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: Blog
  text: Implementar aplicaciones ASP.NET Core en Azure App Service
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: Blog
  text: Optimice el rendimiento de su aplicación .NET con el Datadog Continuous Profiler
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Código fuente
  text: Ejemplos de instrumentación personalizada
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Código fuente
  text: Código fuente
- link: https://learn.datadoghq.com/courses/configure-manage-apm-sdk
  tag: Centro de aprendizaje
  text: Configure y administre el SDK de APM para sus aplicaciones
title: Rastreo de aplicaciones .NET Core
type: multi-code-lang
---
## Requisitos de compatibilidad {#compatibility-requirements}

### Entornos de ejecución de .NET Core compatibles {#supported-net-core-runtimes}

El .NET Tracer admite la instrumentación en .NET Core 3.1, .NET 5, .NET 6, .NET 7, .NET 8, .NET 9 y .NET 10.

Para obtener una lista completa de la compatibilidad de Datadog con bibliotecas de .NET Core y arquitecturas de procesador (incluidas las versiones heredadas y de mantenimiento), consulte [Requisitos de compatibilidad][1].

## Instalación y primeros pasos {#installation-and-getting-started}

<div class="alert alert-tip">Datadog recomienda <a href="/tracing/trace_collection/single-step-apm/">Single Step Instrumentation</a> (SSI), que instala el SDK de .NET y gestiona su versión desde la configuración de su Datadog Agent, sin realizar cambios en el código de su aplicación. Utilice la configuración manual en esta página si <a href="/tracing/trace_collection/single-step-apm/compatibility/">SSI no es compatible con su entorno</a> o si necesita gestionar el SDK en el código de su aplicación.</div>

<div class="alert alert-info">
    Para configurar Datadog APM en entornos Serverless, como AWS Lambda o Azure Functions, consulte <a href="/serverless">Serverless</a>.
</div>

<div class="alert alert-danger">
  <strong>Nota:</strong> La instrumentación automática de Datadog depende de la .NET CLR Profiling API. Esta API permite solo un suscriptor (por ejemplo, Datadog APM). Para garantizar la máxima visibilidad, ejecute solo una solución de APM dentro de su entorno de aplicación. 
</div>

<div class="alert alert-info">
  Para instrumentar aplicaciones recortadas, haga referencia al paquete NuGet <a href="https://www.nuget.org/packages/Datadog.Trace.Trimming/">Datadog.Trace.Trimming</a> en su proyecto.
</div>

### Instalación {#installation}

Antes de comenzar, asegúrese de haber [instalado y configurado el Agent][12].

1. [Instale el SDK.](#install-the-sdk)
2. [Habilite el SDK para su servicio.](#enable-the-sdk-for-your-service)
3. [Vea sus datos en vivo.](#view-your-live-data)

### Instale el SDK {#install-the-sdk}

Después de instalar y configurar su Datadog Agent, el siguiente paso es agregar el SDK directamente en la aplicación para instrumentarla. Lea más sobre [información de compatibilidad][1].

Puede instalar el Datadog .NET Tracer en toda la máquina para que todos los servicios en la máquina estén instrumentados, o puede instalarlo por aplicación para permitir que los desarrolladores gestionen la instrumentación a través de las dependencias de la aplicación. Para ver las instrucciones de instalación en toda la máquina, haga clic en la pestaña Windows o Linux. Para ver las instrucciones de instalación por aplicación, haga clic en la pestaña NuGet.

{{< tabs >}}

{{% tab "Windows" %}}

Para instalar el .NET Tracer en toda la máquina:

1. Descargue el [instalador MSI de .NET Tracer][1]. Utilice el instalador MSI x64 si está ejecutando Windows de 64 bits; esto puede instrumentar aplicaciones tanto de 64 bits como de 32 bits. Elija el instalador x86 solo si está ejecutando Windows de 32 bits. A partir de la v3.0.0, solo se proporciona el instalador x64, ya que no admitimos sistemas operativos de 32 bits.

2. Ejecute el instalador MSI de .NET Tracer con privilegios de administrador.

También puede crear un script para la configuración del MSI ejecutando lo siguiente en PowerShell: `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Linux" %}}

Para instalar el .NET Tracer en toda la máquina:

1. Descargue el [paquete de .NET Tracer][1] más reciente que sea compatible con su sistema operativo y arquitectura.

2. Ejecute uno de los siguientes comandos para instalar el paquete y crear el directorio de registros del rastreador de .NET `/var/log/datadog/dotnet` con los permisos adecuados:

   Debian o Ubuntu
   : `sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb && /opt/datadog/createLogPath.sh`

   CentOS o Fedora
   : `sudo rpm -Uvh datadog-dotnet-apm<TRACER_VERSION>-1.x86_64.rpm && /opt/datadog/createLogPath.sh`

   Alpine u otras distribuciones basadas en musl
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz && sh /opt/datadog/createLogPath.sh`

   Otras distribuciones
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz && /opt/datadog/createLogPath.sh`

#### Contenedores chiseled {#chiseled-containers}

Para instalar .NET Tracer en imágenes de Docker chiseled o distroless (sin shell), utilice los siguientes comandos de Dockerfile:

- Utilice `ADD` para colocar los archivos del SDK en el contenedor.
- Utilice `COPY --chown=$APP_UID` con una carpeta vacía como fuente para crear la ruta de los registros.

Por ejemplo, en su Dockerfile:

```dockerfile
ADD datadog-dotnet-apm-<TRACER_VERSION>.tar.gz /opt/datadog/
COPY --chown=$APP_UID --from=<OTHER_STAGE> /empty/ /var/log/datadog/dotnet/
```

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-danger">
  <strong>Nota:</strong> Esta instalación no instrumenta aplicaciones que se ejecutan en IIS. Para las aplicaciones que se ejecutan en IIS, siga el proceso de instalación en toda la máquina para Windows.
</div>

Para instalar el .NET Tracer por aplicación:

1. Agregue el `Datadog.Trace.Bundle` [paquete NuGet][1] a su aplicación.

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### Habilite el SDK para su servicio {#enable-the-sdk-for-your-service}

Para habilitar el .NET Tracer para su servicio, establezca las variables de entorno requeridas y reinicie la aplicación.

Para obtener información sobre los diferentes métodos para establecer variables de entorno, consulte [Configuración de variables de entorno de proceso](#configuring-process-environment-variables).

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS) {#internet-information-services-iis}

1. El instalador MSI de .NET Tracer agrega todas las variables de entorno requeridas. No hay variables de entorno que necesite configurar.

   <div class="alert alert-danger">
     <strong>Nota:</strong> Debe establecer <strong>.NET CLR version</strong> del grupo de aplicaciones en <strong>No Managed Code</strong>, como recomienda <a href='https://learn.microsoft.com/aspnet/core/host-and-deploy/iis/advanced#create-the-iis-site'> Microsoft</a>.
   </div>

2. Para instrumentar automáticamente las aplicaciones alojadas en IIS, detenga e inicie IIS por completo ejecutando los siguientes comandos como administrador:

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-danger">
     <strong>Nota:</strong> Utilice siempre los comandos anteriores para detener y reiniciar IIS por completo a fin de habilitar el SDK. Evite usar la aplicación de interfaz gráfica de IIS Manager o <code>iisreset.exe</code>.
   </div>


#### Servicios que no están en IIS {#services-not-in-iis}

1. Establezca las siguientes variables de entorno requeridas para que la instrumentación automática se conecte a su aplicación:

   ```
   CORECLR_ENABLE_PROFILING=1
   ```
2. Para aplicaciones independientes y servicios de Windows, reinicie la aplicación manualmente.

{{% /tab %}}

{{% tab "Linux" %}}

1. Establezca las siguientes variables de entorno requeridas para que la instrumentación automática se conecte a su aplicación:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
   DD_DOTNET_TRACER_HOME=/opt/datadog
   ```

2. Para aplicaciones independientes, reinicie la aplicación manualmente como lo haría normalmente.

{{% /tab %}}

{{% tab "NuGet" %}}

Siga las instrucciones del archivo readme del paquete, también disponibles en el [`dd-trace-dotnet` repositorio][1].
Los ejemplos de Docker también están disponibles en el [repositorio][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### Vea sus datos en vivo {#view-your-live-data}

Después de habilitar el .NET Tracer para su servicio:

1. Reinicie su servicio.

2. Genere carga de aplicación.

3. En Datadog, navegue a [{{< ui >}}APM{{< /ui >}} > {{< ui >}}APM Traces{{< /ui >}}][3].

## Configuración {#configuration}

Si es necesario, configure el SDK para enviar datos de telemetría de rendimiento de la aplicación según lo requiera, incluyendo la configuración de Unified Service Tagging. Lea [Configuración de la biblioteca][4] para obtener detalles.

## Instrumentación personalizada {#custom-instrumentation}

La instrumentación personalizada depende de su instrumentación automática e incluye pasos adicionales según el método:

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-danger">
  <strong>Nota:</strong> A partir de la v3.0.0, la instrumentación personalizada requiere que también use instrumentación automática. Debe intentar mantener sincronizadas las versiones de los paquetes de instrumentación automática y personalizada (por ejemplo: MSI y NuGet) y asegurarse de no mezclar versiones principales de los paquetes.
</div>

Para usar la instrumentación personalizada en su aplicación .NET:

1. Instrumente su aplicación usando instrumentación automática.
2. Agregue el `Datadog.Trace` [paquete NuGet][1] a su aplicación.
3. En el código de su aplicación, acceda al rastreador global a través de la propiedad `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "Linux" %}}

<div class="alert alert-danger">
  <strong>Nota:</strong> A partir de la v3.0.0, la instrumentación personalizada requiere que también use instrumentación automática. Debe intentar mantener sincronizadas las versiones de los paquetes de instrumentación automática y personalizada (por ejemplo: MSI y NuGet) y asegurarse de no mezclar versiones principales de los paquetes.
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

Para adjuntar la instrumentación automática a su servicio, debe establecer las variables de entorno requeridas antes de iniciar la aplicación. Consulte la sección [Habilitar el SDK para su servicio](#enable-the-sdk-for-your-service) para identificar qué variables de entorno establecer según su método de instalación de .NET Tracer y siga los ejemplos a continuación para establecer correctamente las variables de entorno según el entorno de su servicio instrumentado.

### Windows {#windows}

<div class="alert alert-danger">
  <strong>Nota:</strong> El tiempo de ejecución de .NET intenta cargar la biblioteca de .NET en <em>cualquier</em> proceso de .NET que se inicie con estas variables de entorno establecidas. Debe limitar la instrumentación solo a las aplicaciones que necesiten ser instrumentadas. <strong>No establezca estas variables de entorno globalmente, ya que esto provoca que <em>todos</em> los procesos de .NET en el servidor sean instrumentados.</strong>
</div>

#### Servicios de Windows {#windows-services}

{{< tabs >}}

{{% tab "Registry Editor" %}}

En Registry Editor, cree un valor de cadena múltiple llamado `Environment` en la clave `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` y establezca los datos del valor en:

```text
CORECLR_ENABLE_PROFILING=1
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Uso de Registry Editor para crear variables de entorno para un servicio de Windows" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value 'CORECLR_ENABLE_PROFILING=1'
```
{{% /tab %}}

{{< /tabs >}}

#### IIS {#iis}

Después de instalar el MSI, no se necesita configuración adicional para instrumentar automáticamente sus sitios de IIS. Para establecer variables de entorno adicionales que sean heredadas por todos los sitios de IIS, realice los siguientes pasos:

1. Abra Registry Editor, busque el valor de cadena múltiple llamado `Environment` en la clave `HKLM\System\CurrentControlSet\Services\WAS` y agregue las variables de entorno, una por línea. Por ejemplo, para agregar la inyección de registros y las métricas de tiempo de ejecución, agregue las siguientes líneas a los datos del valor:
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

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="Uso de Registry Editor para crear variables de entorno para todos los sitios de IIS" >}}

#### Aplicaciones de consola {#console-applications}

Para instrumentar automáticamente una aplicación de consola, establezca las variables de entorno desde un archivo por lotes antes de iniciar su aplicación:

```bat
rem Set required environment variables
SET CORECLR_ENABLE_PROFILING=1

rem (Optional) Set additional Datadog environment variables, for example:
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

### Linux {#linux}

#### Script de Bash {#bash-script}

Para establecer las variables de entorno requeridas desde un archivo bash antes de iniciar su aplicación:

```bash
# Set required environment variables
export CORECLR_ENABLE_PROFILING=1
export CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
export CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
export DD_DOTNET_TRACER_HOME=/opt/datadog

# (Optional) Set additional Datadog environment variables, for example:
export DD_LOGS_INJECTION=true
export DD_RUNTIME_METRICS_ENABLED=true

# Start your application
dotnet example.dll
```

<div class="alert alert-info"> Si está utilizando Alpine Linux, establezca la <code>CORECLR_PROFILER_PATH</code> variable de entorno en una ruta para distribuciones basadas en musl: <code>linux-musl-x64/</code>.</div>

#### Contenedor de Docker de Linux {#linux-docker-container}

Para establecer las variables de entorno requeridas en un contenedor de Docker de Linux:

  ```docker
  # Set required environment variables
  ENV CORECLR_ENABLE_PROFILING=1
  ENV CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
  ENV CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
  ENV DD_DOTNET_TRACER_HOME=/opt/datadog

  # (Optional) Set additional Datadog environment variables, for example:
  ENV DD_LOGS_INJECTION=true
  ENV DD_RUNTIME_METRICS_ENABLED=true

  # Start your application
  CMD ["dotnet", "example.dll"]
  ```

#### `systemctl` (por servicio) {#systemctl-per-service}

Cuando utilice `systemctl` para ejecutar aplicaciones de .NET como un servicio, puede agregar las variables de entorno requeridas para que se carguen para un servicio específico.

1. Cree un archivo llamado `environment.env` que contenga:

    ```ini
    # Set required environment variables
    CORECLR_ENABLE_PROFILING=1
    CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    DD_DOTNET_TRACER_HOME=/opt/datadog

    # (Optional) Set additional Datadog environment variables, for example:
    DD_LOGS_INJECTION=true
    DD_RUNTIME_METRICS_ENABLED=true
    ```
2. En el archivo de configuración del servicio, haga referencia a esto como un [`EnvironmentFile`][1] en el bloque del servicio:

    ```ini
    [Service]
    EnvironmentFile=/path/to/environment.env
    ExecStart=<command used to start the application>
    ```
3. Reinicie el servicio de .NET para que la configuración de las variables de entorno surta efecto.

#### `systemctl` (todos los servicios) {#systemctl-all-services}

<div class="alert alert-danger">
  <strong>Nota:</strong> El tiempo de ejecución de .NET intenta cargar la biblioteca de .NET en <em>cualquier</em> proceso de .NET que se inicie con estas variables de entorno establecidas. Debe limitar la instrumentación solo a las aplicaciones que necesiten ser instrumentadas. <strong>No establezca estas variables de entorno globalmente, ya que esto provoca que <em>todos</em> los procesos de .NET en el servidor sean instrumentados.</strong>
</div>

Cuando utilice `systemctl` para ejecutar aplicaciones de .NET como un servicio, también puede establecer variables de entorno para que se carguen para todos los servicios ejecutados por `systemctl`.

1. Establezca las variables de entorno requeridas ejecutando [`systemctl set-environment`][6]:

    ```bash
    # Set required environment variables
    systemctl set-environment CORECLR_ENABLE_PROFILING=1
    systemctl set-environment CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
    systemctl set-environment CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
    systemctl set-environment DD_DOTNET_TRACER_HOME=/opt/datadog

    # (Optional) Set additional Datadog environment variables, for example:
    systemctl set-environment DD_LOGS_INJECTION=true
    systemctl set-environment DD_RUNTIME_METRICS_ENABLED=true
    ```
2. Verifique que las variables de entorno se hayan establecido ejecutando `systemctl show-environment`.

3. Reinicie el servicio de .NET para que las variables de entorno surtan efecto.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/trace_collection/compatibility/dotnet-core
[2]: /es/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /es/tracing/trace_collection/library_config/dotnet-core/
[5]: /es/tracing/trace_collection/custom_instrumentation/dotnet/
[6]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[11]: /es/tracing/trace_collection/library_injection_local/
[12]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent