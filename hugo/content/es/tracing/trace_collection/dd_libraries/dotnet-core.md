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
  text: Monitoreo de .NET con Datadog APM y trazado distribuido
- link: https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/
  tag: Blog
  text: Monitorea aplicaciones ASP.NET Core en contenedores
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: Blog
  text: Despliega aplicaciones ASP.NET Core en Azure App Service
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: Blog
  text: Optimice el rendimiento de su aplicación .NET con el Continuous Profiler de
    Datadog
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Código fuente
  text: Ejemplos de instrumentación personalizada
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Código fuente
  text: Código fuente
title: Rastreo de aplicaciones .NET Core
type: multi-code-lang
---
## Requisitos de compatibilidad {#compatibility-requirements}

### Runtimes de .NET Core soportados {#supported-net-core-runtimes}

El Tracer de .NET soporta instrumentación en .NET Core 3.1, .NET 5, .NET 6, .NET 7, .NET 8, .NET 9 y .NET 10.

Para una lista completa del soporte de la biblioteca y arquitectura de procesadores de .NET Core de Datadog (incluyendo versiones heredadas y de mantenimiento), consulta [Requisitos de Compatibilidad][1].

## Instalación y primeros pasos {#installation-and-getting-started}

<div class="alert alert-info">
    Para configurar Datadog APM en entornos Serverless, como AWS Lambda o Azure Functions, consulte <a href="/serverless">Serverless</a>.
</div>

<div class="alert alert-danger">
  <strong>Nota:</strong> La instrumentación automática de Datadog se basa en la API de perfilado de .NET CLR. Esta API permite solo un suscriptor (por ejemplo, Datadog APM). Para garantizar la máxima visibilidad, ejecute solo una solución APM en su entorno de aplicación. 
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

Después de instalar y configurar su Agente de Datadog, el siguiente paso es agregar el SDK directamente en la aplicación para instrumentarla. Lea más sobre [información de compatibilidad][1].

Puede instalar el Tracer .NET de Datadog a nivel de máquina para que todos los servicios en la máquina estén instrumentados, o puede instalarlo de manera específica por aplicación para permitir que los desarrolladores gestionen la instrumentación a través de las dependencias de la aplicación. Para ver las instrucciones de instalación a nivel de máquina, haga clic en la pestaña de Windows o Linux. Para ver las instrucciones de instalación por aplicación, haga clic en la pestaña de NuGet.

{{< tabs >}}

{{% tab "Windows" %}}

Para instalar el .NET Tracer a nivel de máquina:

1. Descargue el [.NET Tracer MSI installer][1]. Utilice el instalador MSI x64 si está ejecutando Windows de 64 bits; esto puede instrumentar tanto aplicaciones de 64 bits como de 32 bits. Solo elija el instalador x86 si está ejecutando Windows de 32 bits. A partir de la versión 3.0.0, solo se proporciona el instalador x64, ya que no soportamos sistemas operativos de 32 bits.

2. Ejecute el instalador MSI del .NET Tracer con privilegios de administrador.

También puede automatizar la configuración de MSI ejecutando lo siguiente en PowerShell: `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Linux" %}}

Para instalar el .NET Tracer a nivel de máquina:

1. Descargue el último paquete de .NET Tracer [1] que sea compatible con su sistema operativo y arquitectura.

2. Ejecute uno de los siguientes comandos para instalar el paquete y crear el directorio de registro del .NET Tracer `/var/log/datadog/dotnet` con los permisos apropiados:

   Debian o Ubuntu
   : `sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb && /opt/datadog/createLogPath.sh`

   CentOS o Fedora
   : `sudo rpm -Uvh datadog-dotnet-apm<TRACER_VERSION>-1.x86_64.rpm && /opt/datadog/createLogPath.sh`

   Alpine u otras distribuciones basadas en musl
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz && sh /opt/datadog/createLogPath.sh`

   Otras distribuciones
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz && /opt/datadog/createLogPath.sh`

#### Contenedores esculpidos {#chiseled-containers}

Para instalar la traza .NET en imágenes de Docker esculpidas o sin distribución (sin un shell), utilice los siguientes comandos de Dockerfile:

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
  <strong>Nota:</strong> Esta instalación no instrumenta aplicaciones que se ejecutan en IIS. Para las aplicaciones que se ejecutan en IIS, siga el proceso de instalación a nivel de máquina de Windows.
</div>

Para instalar el .NET Tracer por aplicación:

1. Agregue el `Datadog.Trace.Bundle` [paquete de NuGet][1] a su aplicación.

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### Habilite el SDK para su servicio {#enable-the-sdk-for-your-service}

Para habilitar el .NET Tracer para su servicio, establezca las variables de entorno requeridas y reinicie la aplicación.

Para información sobre los diferentes métodos para establecer variables de entorno, consulte [Configurando variables de entorno del proceso](#configuring-process-environment-variables).

{{< tabs >}}

{{% tab "Windows" %}}

#### Servicios de Información de Internet (IIS) {#internet-information-services-iis}

1. El instalador MSI del .NET Tracer agrega todas las variables de entorno requeridas. No hay variables de entorno que necesite configurar.

   <div class="alert alert-danger">
     <strong>Nota:</strong> Debe establecer la <strong>.NET CLR versión</strong> para el grupo de aplicaciones en <strong>No Managed Code</strong> como lo recomienda <a href='https://learn.microsoft.com/aspnet/core/host-and-deploy/iis/advanced#create-the-iis-site'> Microsoft</a>.
   </div>

2. Para instrumentar automáticamente aplicaciones alojadas en IIS, detenga y reinicie completamente IIS ejecutando los siguientes comandos como administrador:

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-danger">
     <strong>Nota:</strong> Siempre utilice los comandos anteriores para detener y reiniciar completamente IIS para habilitar el SDK. Evite usar la aplicación GUI del Administrador de IIS o <code>iisreset.exe</code>.
   </div>


#### Servicios fuera de IIS {#services-not-in-iis}

1. Establezca las siguientes variables de entorno requeridas para que la instrumentación automática se conecte a su aplicación:

   ```
   CORECLR_ENABLE_PROFILING=1
   ```
2. Para aplicaciones independientes y servicios de Windows, reinicie manualmente la aplicación.

{{% /tab %}}

{{% tab "Linux" %}}

1. Establezca las siguientes variables de entorno requeridas para que la instrumentación automática se conecte a su aplicación:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
   DD_DOTNET_TRACER_HOME=/opt/datadog
   ```

2. Para aplicaciones independientes, reinicie manualmente la aplicación como lo haría normalmente.

{{% /tab %}}

{{% tab "NuGet" %}}

Siga las instrucciones en el archivo readme del paquete, también disponible en [`dd-trace-dotnet` repositorio][1].
Los ejemplos de Docker también están disponibles en el [repositorio][2].

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### Vea sus datos en vivo {#view-your-live-data}

Después de habilitar el .NET Tracer para su servicio:

1. Reinicie su servicio.

2. Cree carga de aplicación.

3. En Datadog, navegue a [**APM** > **Trazas de APM**][3].

## Configuración {#configuration}

Si es necesario, configure el SDK para enviar datos de telemetría de rendimiento de la aplicación según lo requiera, incluyendo la configuración de Etiquetado de Servicio Unificado. Lea [Configuración de la Biblioteca][4] para más detalles.

## Instrumentación personalizada {#custom-instrumentation}

La instrumentación personalizada depende de su instrumentación automática e incluye pasos adicionales dependiendo del método:

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-danger">
  <strong>Nota:</strong> A partir de la versión v3.0.0, la instrumentación personalizada requiere que también utilice la instrumentación automática. Debería esforzarse por mantener sincronizadas las versiones de los paquetes de instrumentación automática y personalizada (por ejemplo: MSI y NuGet), y asegurarse de no mezclar versiones principales de los paquetes.
</div>

Para usar la instrumentación personalizada en su aplicación .NET:

1. Instrumente su aplicación utilizando la instrumentación automática.
2. Agregue el `Datadog.Trace` [paquete de NuGet][1] a su aplicación.
3. En el código de su aplicación, acceda al rastreador global a través de la propiedad `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "Linux" %}}

<div class="alert alert-danger">
  <strong>Nota:</strong> A partir de la versión v3.0.0, la instrumentación personalizada requiere que también utilice la instrumentación automática. Debería esforzarse por mantener sincronizadas las versiones de los paquetes de instrumentación automática y personalizada (por ejemplo: MSI y NuGet), y asegurarse de no mezclar versiones principales de los paquetes.
</div>

Para usar la instrumentación personalizada en su aplicación .NET:
1. Instrumenta tu aplicación utilizando instrumentación automática.
2. Agrega el `Datadog.Trace` [paquete de NuGet][1] a tu aplicación.
3. En el código de su aplicación, acceda al trazador global a través de la propiedad `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "NuGet" %}}

Para usar la instrumentación personalizada en tu aplicación .NET:

1. En el código de tu aplicación, accede al trazador global a través de la propiedad `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

{{% /tab %}}

{{< /tabs >}}

Para más información sobre cómo agregar tramos y etiquetas para instrumentación personalizada, consulta la [documentación de instrumentación personalizada de .NET][5].

## Configurando variables de entorno del proceso {#configuring-process-environment-variables}

Para adjuntar instrumentación automática a tu servicio, debes establecer las variables de entorno requeridas antes de iniciar la aplicación. Consulta la sección [Habilitar el SDK para tu servicio](#enable-the-sdk-for-your-service) para identificar qué variables de entorno establecer según tu método de instalación del Tracer de .NET y sigue los ejemplos a continuación para establecer correctamente las variables de entorno según el entorno de tu servicio instrumentado.

### Windows {#windows}

<div class="alert alert-danger">
  <strong>Nota:</strong> El runtime de .NET intenta cargar la biblioteca de .NET en <em>cualquier</em> proceso de .NET que se inicie con estas variables de entorno establecidas. Debes limitar la instrumentación solo a las aplicaciones que necesitan ser instrumentadas. <strong>No establezcas estas variables de entorno globalmente, ya que esto causa que <em>todos</em> los procesos de .NET en el host sean instrumentados.</strong>
</div>

#### Servicios de Windows {#windows-services}

{{< tabs >}}

{{% tab "Editor del Registro" %}}

En el Editor del Registro, crea un valor de cadena múltiple llamado `Environment` en la clave `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` y establece los datos del valor en:

```text
CORECLR_ENABLE_PROFILING=1
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Usando el Editor del Registro para crear variables de entorno para un servicio de Windows" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value 'CORECLR_ENABLE_PROFILING=1'
```
{{% /tab %}}

{{< /tabs >}}

#### IIS {#iis}

Después de instalar el MSI, no se necesita configuración adicional para instrumentar automáticamente tus sitios de IIS. Para establecer variables de entorno adicionales que sean heredadas por todos los sitios de IIS, realiza los siguientes pasos:

1. Abre el Editor del Registro, busca el valor de cadena múltiple llamado `Environment` en la clave `HKLM\System\CurrentControlSet\Services\WAS`, y agrega las variables de entorno, una por línea. Por ejemplo, para agregar inyección de registros y métricas de tiempo de ejecución, agrega las siguientes líneas a los datos del valor:
   ```text
   DD_LOGS_INJECTION=true
   DD_RUNTIME_METRICS_ENABLED=true
   ```
2. Ejecuta los siguientes comandos para reiniciar IIS:
   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

{{< img src="tracing/setup/dotnet/RegistryEditorIIS.png" alt="Usando el Editor del Registro para crear variables de entorno para todos los sitios de IIS" >}}

#### Aplicaciones de consola {#console-applications}

Para instrumentar automáticamente una aplicación de consola, establece las variables de entorno desde un archivo por lotes antes de iniciar tu aplicación:

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

Para establecer las variables de entorno requeridas desde un archivo bash antes de iniciar tu aplicación:

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

<div class="alert alert-info">Si usas Alpine Linux, establece el <code>CORECLR_PROFILER_PATH</code> variable de entorno en una ruta para distribuciones basadas en musl: <code>linux-musl-x64/</code>.</div>

#### Contenedor Docker de Linux {#linux-docker-container}

Para establecer las variables de entorno requeridas en un contenedor Docker de Linux:

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

Al usar `systemctl` para ejecutar aplicaciones .NET como un servicio, puedes agregar las variables de entorno requeridas que se cargarán para un servicio específico.

1. Crea un archivo llamado `environment.env` que contenga:

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
2. En el archivo de configuración del servicio, haz referencia a esto como un [`EnvironmentFile`][1] en el bloque del servicio:

    ```ini
    [Service]
    EnvironmentFile=/path/to/environment.env
    ExecStart=<command used to start the application>
    ```
3. Reinicia el servicio .NET para que los ajustes de las variables de entorno surtan efecto.

#### `systemctl` (todos los servicios) {#systemctl-all-services}

<div class="alert alert-danger">
  <strong>Nota:</strong> El runtime de .NET intenta cargar la biblioteca de .NET en <em>cualquier</em> proceso de .NET que se inicie con estas variables de entorno establecidas. Debes limitar la instrumentación solo a las aplicaciones que necesitan ser instrumentadas. <strong>No establezcas estas variables de entorno globalmente, ya que esto causa que <em>todos</em> los procesos de .NET en el host sean instrumentados.</strong>
</div>

Al usar `systemctl` para ejecutar aplicaciones .NET como un servicio, también puedes establecer variables de entorno que se cargarán para todos los servicios ejecutados por `systemctl`.

1. Establece las variables de entorno requeridas ejecutando [`systemctl set-environment`][6]:

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
2. Verifica que las variables de entorno se hayan establecido ejecutando `systemctl show-environment`.

3. Reinicia el servicio .NET para que las variables de entorno surtan efecto.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/trace_collection/compatibility/dotnet-core
[2]: /es/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /es/tracing/trace_collection/library_config/dotnet-core/
[5]: /es/tracing/trace_collection/custom_instrumentation/dotnet/
[6]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[11]: /es/tracing/trace_collection/library_injection_local/
[12]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent