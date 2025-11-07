---
aliases:
- /es/tracing/dotnet-core
- /es/tracing/languages/dotnet-core
- /es/tracing/setup/dotnet-core
- /es/agent/apm/dotnet-core/
- /es/tracing/setup/dotnet-core
- /es/tracing/setup_overview/dotnet-core
- /es/tracing/setup_overview/setup/dotnet-core
- /es/tracing/trace_collection/dd_libraries/dotnet-core
code_lang: dotnet-core
code_lang_weight: 60
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
  text: Monitorización de aplicaciones contenedorizadas ASP.NET Core
- link: https://www.datadoghq.com/blog/deploy-dotnet-core-azure-app-service/
  tag: Blog
  text: Despliegue de aplicaciones ASP.NET Core en Azure App Service
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: Blog
  text: Optimizar el rendimiento de tu aplicación .NET con el Datadog Continuous Profiler
- link: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples
  tag: Código fuente
  text: Ejemplos de instrumentación personalizada
- link: https://github.com/DataDog/dd-trace-dotnet
  tag: Código fuente
  text: Código fuente
title: Rastreo de aplicaciones .NET Core
type: lenguaje de código múltiple
---

## Requisitos de compatibilidad

### Tiempos de ejecución .NET Core compatibles

El rastreador de .NET es compatible con la instrumentación en .NET Core 3.1, .NET 5, .NET 6, .NET 7, .NET 8 y .NET 9.

Para ver la lista completa de los requisitos de compatibilidad de la librería .NET Core y de la arquitectura de procesadores de Datadog (incluidas las versiones heredadas y de mantenimiento), consulta los [requisitos de compatibilidad][1].

## Para instalar y empezar a utilizar

<div class="alert alert-info">
    Para configurar Datadog APM en AWS Lambda, consulta el <strong><a href="/tracing/serverless_functions/">rastreo de funciones serverless</a></strong>en Azure App Service y también el <strong><a href="/serverless/azure_app_services/">rastreo en Azure App Service</a></strong>.
</div>

<div class="alert alert-danger">
 <strong>Nota:</strong> La instrumentación automática de Datadog se basa en la API de generación de perfiles CLR de .NET. Esta API sólo permite un suscriptor (por ejemplo, Datadog APM). Para garantizar la máxima visibilidad, ejecuta sólo una solución APM en tu entorno de aplicación.
</div>

<div class="alert alert-info">
  Para instrumentar aplicaciones recortadas, haz referencia al paquete <a href="https://www.nuget.org/packages/Datadog.Trace.Trimming/">Datadog.Trace.Trimming</a> de NuGet en tu proyecto.
</div>

### Instalación

Antes de empezar, asegúrate de haber [instalado y configurado el Agent][12].

1. [Instala el rastreador.](#install-the-tracer)
2. [Activa el rastreador para tu servicio.](#enable-the-tracer-for-your-service)
3. [Visualiza tus datos en directo.](#view-your-live-data)

### Instalación del rastreador

Después de instalar y configurar tu Datadog Agent, el siguiente paso es añadir la librería de rastreo directamente en la aplicación para instrumentarla. Consulta más bibliografía con [información sobre la compatibilidad][1].

Puedes instalar el rastreador .NET de Datadog en toda la máquina para que se instrumenten todos los servicios de la máquina, o puedes instalarlo aplicación por aplicación para que los desarrolladores gestionen la instrumentación a través de las dependencias de la aplicación. Para ver más instrucciones sobre la instalación en toda la máquina, haz clic en la pestaña de Windows o Linux. Para ver más instrucciones sobre la instalación aplicación por aplicación, haz clic en la pestaña de NuGet.

{{< tabs >}}

{{% tab "Windows" %}}

Para instalar el rastreador .NET en toda la máquina:

1. Descarga el [instalador de .NET Tracer MSI][1]. Utiliza el instalador MSI x64 si estás ejecutando Windows de 64 bits; éste puede instrumentar tanto aplicaciones de 64 bits como de 32 bits. Elige el instalador x86 sólo si estás ejecutando Windows de 32 bits. A partir de la versión 3.0.0, sólo se proporciona el instalador x64, ya que no admitimos sistemas operativos de 32 bits.

2. Ejecuta el instalador MSI del rastreador .NET con privilegios administrativos.

También puedes aplicar un script para la configuración del MSI ejecutando lo siguiente en PowerShell: `Start-Process -Wait msiexec -ArgumentList '/qn /i datadog-apm.msi'`

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Linux" %}}

Para instalar el rastreador .NET en toda la máquina:

1. Descarga el [paquete del rastreador .NET][1] más reciente que sea compatible con tu sistema operativo y tu arquitectura.

2. Ejecuta uno de los siguientes comandos para instalar el paquete y crear el directorio de logs `/var/log/datadog/dotnet` del rastreador .NET con los permisos apropiados:

   Debian o Ubuntu
   : `sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb && /opt/datadog/createLogPath.sh`

   CentOS o Fedora
   : `sudo rpm -Uvh datadog-dotnet-apm<TRACER_VERSION>-1.x86_64.rpm && /opt/datadog/createLogPath.sh`

   Alpine u otras distribuciones basadas en musl
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>-musl.tar.gz && sh /opt/datadog/createLogPath.sh`

   Otras distribuciones
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz && /opt/datadog/createLogPath.sh`

#### Contenedores cincelados

Para instalar el rastreador .NET en imágenes cinceladas o distroless Docker (sin shell), utiliza los siguientes comandos de archivos Docker:

- Utiliza `ADD` para colocar los archivos del rastreador en el contenedor.
- Utiliza `COPY --chown=$APP_UID` con una carpeta vacía como origen para crear la ruta de los logs.

Por ejemplo, en tu archivo Docker:

```dockerfile
ADD datadog-dotnet-apm-<TRACER_VERSION>.tar.gz /opt/datadog/
COPY --chown=$APP_UID --from=<OTHER_STAGE> /empty/ /var/log/datadog/dotnet/
```

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-danger">
  <strong>Nota:</strong> Esta instalación no instrumenta aplicaciones que se ejecutan en IIS. En el caso de aplicaciones que se ejecutan en IIS, sigue el proceso de Windows para la instalación en toda la máquina.
</div>

Para instalar el rastreador .NET aplicación por aplicación:

1. Añade el [paquete NuGet][1] `Datadog.Trace.Bundle` a tu aplicación.

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{< /tabs >}}

### Activación del rastreador para tu servicio

Para activar el rastreador .NET para tu servicio, configura las variables de entorno necesarias y reinicia la aplicación.

Para obtener más información sobre los diferentes métodos de configurar variables de entorno, consulta la [Proceso de configuración de variables de entorno](#configuring-process-environment-variables).

{{< tabs >}}

{{% tab "Windows" %}}

#### Internet Information Services (IIS)

1. El instalador MSI del rastreador .NET añade todas las variables de entorno necesarias. No necesitas configurar ninguna variable de entorno.

   <div class="alert alert-danger">
     <strong>Note:</strong> You must set the <strong>.NET CLR version</strong> for the application pool to <strong>No Managed Code</strong> as recommended by <a href='https://learn.microsoft.com/aspnet/core/host-and-deploy/iis/advanced#create-the-iis-site'> Microsoft</a>.
   </div>

2. Para instrumentar aplicaciones alojadas en IIS automáticamente, ejecuta los siguientes comandos como administrador para detener e reiniciar IIS completamente:

   ```cmd
   net stop /y was
   net start w3svc
   # Also, start any other services that were stopped when WAS was shut down.
   ```

   <div class="alert alert-danger">
     <strong>Note:</strong> Always use the commands above to completely stop and restart IIS to enable the tracer. Avoid using the IIS Manager GUI application or <code>iisreset.exe</code>.
   </div>


#### Servicios que no se encuentran en IIS

1. Configura las siguientes variables de entorno, obligatorias para la instrumentación automática, a fin de adjuntarlas a tu aplicación:

   ```
   CORECLR_ENABLE_PROFILING=1
   ```
2. En el caso de aplicaciones y servicios de Windows independientes, debes reiniciar la aplicación manualmente.

{{% /tab %}}

{{% tab "Linux" %}}

1. Configura las siguientes variables de entorno, obligatorias para la instrumentación automática, a fin de adjuntarlas a tu aplicación:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
   DD_DOTNET_TRACER_HOME=/opt/datadog
   ```

2. En el caso de aplicaciones independientes, reinicia la aplicación manualmente como lo harías normalmente.

{{% /tab %}}

{{% tab "NuGet" %}}

Sigue las instrucciones Readme (Léeme) del paquete, también disponibles en el repositorio [`dd-trace-dotnet`][1].
En el [repositorio][2], también hay ejemplos de Docker disponibles.

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/docs/Datadog.Trace.Bundle/README.md
[2]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{< /tabs >}}

### Visualización en directo de tus datos

Después de activar el rastreador .NET para tu servicio:

1. Reinicia tu servicio.

2. Crea la carga de la aplicación.

3. En Datadog, ve a [**APM** > **APM Traces* (APM** > **Trazas APM)][3].

## Configuración

Si es necesario, configura la librería de rastreo para que envíe datos de telemetría sobre el rendimiento de la aplicación, según sea necesario, incluida la configuración del etiquetado unificado de servicios. Para ver más detalles, consulta la [configuración de librerías][4].

## Instrumentación personalizada

La instrumentación personalizada depende de tu instrumentación automática e incluye pasos adicionales según el método:

{{< tabs >}}

{{% tab "Windows" %}}

<div class="alert alert-danger">
  <strong>Nota:</strong> A partir de la versión 3.0.0, la instrumentación personalizada requiere el uso de la instrumentación automática. Debes intentar mantener sincronizadas las versiones automáticas y personalizadas del paquete de instrumentación (por ejemplo: MSI y NuGet) y asegurarte de no mezclar versiones principales de paquetes.
</div>

Para utilizar la instrumentación personalizada en tu aplicación .NET:

1. Instrumenta tu aplicación utilizando la instrumentación automática.
2. Añade el [paquete NuGet][1] `Datadog.Trace` a tu aplicación.
3. En tu código de aplicación, accede al rastreador global a través de la propiedad de `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "Linux" %}}

<div class="alert alert-danger">
  <strong>Nota:</strong> A partir de la versión 3.0.0, la instrumentación personalizada requiere el uso de la instrumentación automática. Debes intentar mantener sincronizadas las versiones automáticas y personalizadas del paquete de instrumentación (por ejemplo: MSI y NuGet) y asegurarte de no mezclar versiones principales de paquetes.
</div>

Para utilizar la instrumentación personalizada en tu aplicación .NET:
1. Instrumenta tu aplicación utilizando la instrumentación automática.
2. Añade el [paquete NuGet][1] `Datadog.Trace` a tu aplicación.
3. En tu código de aplicación, accede al rastreador global a través de la propiedad de `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

[1]: https://www.nuget.org/packages/Datadog.Trace
{{% /tab %}}

{{% tab "NuGet" %}}

Para utilizar la instrumentación personalizada en tu aplicación .NET:

1. En tu código de aplicación, accede al rastreador global a través de la propiedad de `Datadog.Trace.Tracer.Instance` para crear nuevos tramos.

{{% /tab %}}

{{< /tabs >}}

Para obtener más información sobre cómo añadir tramos y etiquetas (tags) para la instrumentación personalizada, consulta la [documentación para la instrumentación personalizada de .NET][5].

## Configuración de variables de entorno para procesos

Para adjuntar la instrumentación automática a tu servicio, debes configurar las variables de entorno obligatorias antes de iniciar la aplicación. Consulta la sección [Activar el rastreador para tu servicio](#enable-the-tracer-for-your-service) para identificar las variables de entorno que debes configurar, dependiendo del método que has utilizado para instalar el rastreador .NET y sigue los siguientes ejemplos para configurar las variables de entorno correctamente, según el entorno de tu servicio instrumentado.

### Windows

<div class="alert alert-danger">
  <strong>Nota:</strong> El tiempo de ejecución de .NET intenta cargar la librería de .NET en <em>cualquier</em> proceso de .NET que se inicia con estas variables de entorno configuradas. Deberías limitar la instrumentación a solo las aplicaciones que deben instrumentarse. <strong>No configures estas variables de entorno de forma global ya que esto causará la instrumentación de <em>todos</em> los procesos de .NET en el host.</strong>
</div>

#### Servicios de Windows

{{< tabs >}}

{{% tab "Registry Editor (Editor de registro)" %}}

En el Editor de registro, crea un valor de cadena múltiple llamado `Environment` en la clave `HKLM\System\CurrentControlSet\Services\<SERVICE NAME>` y configura los datos de valor como:

```text
CORECLR_ENABLE_PROFILING=1
```

{{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Uso del Editor de registro para crear variables de entorno para un servicio de Windows" >}}

{{% /tab %}}

{{% tab "PowerShell" %}}

```powershell
Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\<SERVICE NAME> -Name Environment -Value 'CORECLR_ENABLE_PROFILING=1'
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
rem Set required environment variables
SET CORECLR_ENABLE_PROFILING=1

rem (Optional) Set additional Datadog environment variables, for example:
SET DD_LOGS_INJECTION=true
SET DD_RUNTIME_METRICS_ENABLED=true

rem Start application
dotnet.exe example.dll
```

### Linux

#### Script de bash

Para configurar las variables de entorno obligatorias desde un archivo bash antes de iniciar tu aplicación:

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

<div class="alert alert-info"> Si utilizas Alpine Linux, configura la variable de entorno <code>CORECLR_PROFILER_PATH</code> en una ruta para distribuciones basadas en musl: <code>linux-musl-x64/</code>.</div>

#### Contenedor Docker de Linux

Para configurar las variables de entorno obligatorias en un contenedor Docker de Linux:

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

#### `systemctl` (por servicio)

Cuando utilizas `systemctl` para ejecutar aplicaciones .NET como un servicio, puedes añadir las variables de entorno necesarias para que se carguen para un servicio específico.

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
2. En el archivo de configuración del servicio, haz referencia a esto como un [`EnvironmentFile`][1] en el bloque de servicios:

    ```ini
    [Service]
    EnvironmentFile=/path/to/environment.env
    ExecStart=<command used to start the application>
    ```
3. Reinicia el sevicio .NET para que la configuración de la variable de entorno se aplique.

#### `systemctl` (todos los servicios)

<div class="alert alert-danger">
  <strong>Nota:</strong> El tiempo de ejecución de .NET intenta cargar la librería de .NET en <em>cualquier</em> proceso de .NET que se inicia con estas variables de entorno configuradas. Deberías limitar la instrumentación a solo las aplicaciones que deben instrumentarse. <strong>No configures estas variables de entorno de forma global ya que esto causará la instrumentación de <em>todos</em> los procesos de .NET en el host.</strong>
</div>

Cuando utilizas `systemctl` para ejecutar aplicaciones .NET como un servicio, también puedes configurar variables de entorno para que se carguen para todos los servicios que ejecuta `systemctl`.

1. Ejecuta [`systemctl set-environment`][6] para configurar las variables de entorno obligatorias:

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
2. Ejecuta `systemctl show-environment` para verificar que se hayan configurado las variables de entorno.

3. Reinicia el servicio de .NET para aplicar las variables de entorno.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/trace_collection/compatibility/dotnet-core
[2]: /es/agent/
[3]: https://app.datadoghq.com/apm/traces
[4]: /es/tracing/trace_collection/library_config/dotnet-core/
[5]: /es/tracing/trace_collection/custom_instrumentation/dotnet/
[6]: https://www.freedesktop.org/software/systemd/man/systemctl.html#set-environment%20VARIABLE=VALUE%E2%80%A6
[11]: /es/tracing/trace_collection/library_injection_local/
[12]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent
