---
aliases:
- /es/tracing/profiler/enabling/dotnet/
code_lang: dotnet
code_lang_weight: 60
further_reading:
- link: getting_started/profiler
  tag: Documentación
  text: Empezando con el generador de perfiles
- link: profiler/profile_visualizations
  tag: Documentación
  text: Más información sobre las visualizaciones de perfiles disponibles
- link: profiler/profiler_troubleshooting/dotnet
  tag: Documentación
  text: Solucionar los problemas que surjan al utilizar el generador de perfiles
- link: https://www.datadoghq.com/blog/dotnet-datadog-continuous-profiler/
  tag: Blog
  text: Optimiza el rendimiento de tu apliación .NET con el Datadog Continuous Profiler
title: Activación de .NET Profiler
type: multi-code-lang
---

El generador de perfiles se incluye en las bibliotecas de rastreo de Datadog. Si ya estás utilizando [APM para recopilar trazas (traces)][5] para tu aplicación, puedes omitir la instalación de librería e ir directamente a habilitar el generador de perfiles.

## Requisitos

Para obtener un resumen de las versiones mínimas y recomendadas del tiempo de ejecución y del rastreador en todos los lenguajes, consulta [Versiones de lenguaje y rastreadores compatibles][14].

Sistemas operativos compatibles con .NET Framework
: Windows 10<br/>
Windows Server a partir de la versión 2012

Sistemas operativos compatibles con .NET Core y .NET 5+
: Linux con glibc 2.17+ (por ejemplo, CentOS 7+) y basado en musl (Alpine) <br/>
Windows 10<br/>
Windows Server a partir de la versión 2012

Serverless
: Azure App Server Windows y Linux: aplicaciones web solamente, las aplicaciones de función no son compatibles

Tiempos de ejecución .NET compatibles (aplicaciones de 64 bits)
.NET Framework 4.6.1 o posterior<br/>
.NET Core 2.1, 3.1<br/>
.NET 5<br/>
.NET 6<br/>
.NET 7<br/>
.NET 8

<div class="alert alert-danger">
 <strong>Nota:</strong> Para los contenedores, se requiere <strong>al menos un núcleo</strong>. Consulta la <a href="/profiler/profiler_troubleshooting/dotnet#linux-containers">documentación para Solucionar problemas</a> para obtener más detalles.
</div>

Lenguajes compatibles
: cualquier lenguaje dirigido al tiempo de ejecución de .NET, como C#, F# y Visual Basic.

Las siguientes funciones de generación de perfiles están disponibles en las siguientes versiones mínimas de la librería `dd-trace-dotnet`:

| Función                   | Versión requerida de `dd-trace-dotnet`  | Versiones de tiempo de ejecución de .NET necesarias                                                           |
|---------------------------|------------------------------------|------------------------------------------------------------------------------------------|
| Perfiles de tiempo real       | 2.7.0+                             | Todas las versiones de tiempo de ejecución compatibles.                                                          |
| Perfiles de CPU             | 2.15.0+                            | Todas las versiones de tiempo de ejecución compatibles.                                                          |
| Perfiles de excepciones      | 2.31.0+                            | Todas las versiones de tiempo de ejecución compatibles.                                                          |
| Perfiles de asignación     | Fase beta, 2.18.0+                      | .NET 6+                                                                                  |
| Perfil de contención de bloqueo | 2.49.0+                            | .NET Framework de fase beta (requiere Datadog Agent 7.51+) y .NET 5+                           |
| Perfiles de heap en directo       | Fase beta, 2.22.0+                      | .NET 7+                                                                                  |
| [Hotspots de código][12]       | 2.7.0+                             | Todas las versiones de tiempo de ejecución compatibles.                                                          |
| [Perfiles de endpoint][13]  | 2.15.0+                            | Todas las versiones de tiempo de ejecución compatibles.                                                          |
| Cronología                  | 2.30.0+                            | Todas las versiones de tiempo de ejecución compatibles (excepto .NET 5+, necesario para los detalles de la recopilación de elementos no usados). |

## Instalación

Asegúrate de que Datadog Agent v6+ está instalado y en funcionamiento. Datadog recomienda utilizar [Datadog Agent v7+][1]. El generador de perfiles se entrega junto con la librería de rastreo (a partir de v2.8.0), por lo que si ya estás utilizando [APM para recopilar trazas][5] para tu aplicación, puedes omitir la instalación de la librería e ir directamente a [Activación del generador de perfiles](#enabling-the-profiler).

En caso contrario, instala el generador de perfiles siguiendo los pasos que se indican a continuación, en función de tu sistema operativo.

<div class="alert alert-danger">
 <strong>Nota:</strong> La instrumentación automática de Datadog se basa en la API de perfiles de .NET CLR. Dado que esta API solo permite un suscriptor, ejecuta solo una solución de APM en tu entorno de aplicación.
</div>


Puedes instalar Datadog .NET Profiler en toda la máquina para que todos los servicios de la máquina puedan ser instrumentados, o puedes instalarlo por aplicación para permitir a los desarrolladores gestionar la instrumentación a través de las dependencias de la aplicación. Para ver las instrucciones de instalación en toda la máquina, haz clic en la pestaña **Windows** o **Linux**. Para ver las instrucciones de instalación por aplicación, haz clic en la pestaña **NuGet**.

{{< tabs >}}

{{% tab "Linux" %}}
Para instalar .NET Profiler en toda la máquina:

1. Descarga el [paquete del rastreador .NET][1] más reciente que sea compatible con tu sistema operativo y tu arquitectura.

2. Ejecuta uno de los siguientes comandos para instalar el paquete y crear el directorio de logs `/var/log/datadog/dotnet` del rastreador .NET con los permisos apropiados:

   Debian o Ubuntu
   : `sudo dpkg -i ./datadog-dotnet-apm_<TRACER_VERSION>_amd64.deb && sudo /opt/datadog/createLogPath.sh`

   CentOS 7+ o Fedora
   : `sudo rpm -Uvh datadog-dotnet-apm<TRACER_VERSION>-1.x86_64.rpm && sudo /opt/datadog/createLogPath.sh`

   Alpine u otras distribuciones basadas en musl
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm<TRACER_VERSION>-musl.tar.gz && sudo sh /opt/datadog/createLogPath.sh`

   Otras distribuciones
   : `sudo tar -C /opt/datadog -xzf datadog-dotnet-apm-<TRACER_VERSION>.tar.gz && sudo /opt/datadog/createLogPath.sh`


[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "Windows" %}}

Para instalar .NET Profiler en toda la máquina:

1. Instala o actualiza a la última versión, utilizando el [instalador MSI de .NET Monitoring][1]. Continuous Profiler admite Windows de 64 bits, por lo que necesitas el archivo como `datadog-dotnet-apm-<VERSION>-x64.msi`.

2. Ejecuta el instalador con privilegios de administrador.

[1]: https://github.com/DataDog/dd-trace-dotnet/releases
{{% /tab %}}

{{% tab "NuGet" %}}

<div class="alert alert-danger">
  <strong>Nota:</strong> Esta instalación no instrumenta aplicaciones que se ejecutan en IIS. En el caso de aplicaciones que se ejecutan en IIS, sigue el proceso de Windows para la instalación en toda la máquina.
</div>

Para instalar el .NET Profiler por aplicación:

1. Añade el [paquete NuGet][1] `Datadog.Trace.Bundle` a tu aplicación.

[1]: https://www.nuget.org/packages/Datadog.Trace.Bundle
{{% /tab %}}

{{% tab "Azure App Service" %}}

<div class="alert alert-danger">
 <strong>Nota:</strong> Solo se admiten aplicaciones web. Las funciones no son compatibles.
</div>

Para instalar el .NET Profiler por aplicación web:
1. Instala la extensión APM de Azure App Service Datadog [para Windows][1] o utiliza la [configuración de Linux][2] para tu aplicación web.

[1]: /es/serverless/azure_app_services/azure_app_services_windows/?tab=net#installation
[2]: /es/serverless/azure_app_services/azure_app_services_linux/?tab=nodenetphppython#setup
{{% /tab %}}

{{< /tabs >}}

<br>

## Habilitación del generador de perfiles

<div class="alert alert-info">
 <strong>Nota</strong>: Datadog no recomienda habilitar el generador de perfiles a nivel de máquina o para todas las aplicaciones IIS. Si lo has habilitado a nivel de máquina, consulta la <a href="/profiler/profiler_troubleshooting/?code-lang=dotnet#avoid-enabling-the-profiler-machine-wide">documentación para solucionar problemas</a> para obtener información sobre cómo reducir la sobrecarga asociada a la habilitación del generador de perfiles para todas las aplicaciones del sistema.
</div>

{{< tabs >}}
{{% tab "Linux" %}}
3. Configura las siguientes variables de entorno, obligatorias para la instrumentación automática, a fin de adjuntarlas a tu aplicación:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
   DD_DOTNET_TRACER_HOME=/opt/datadog
   LD_PRELOAD=/opt/datadog/continuousprofiler/Datadog.Linux.ApiWrapper.x64.so
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```

4. En el caso de aplicaciones independientes, reinicia la aplicación manualmente como lo harías normalmente.

5. Uno o dos minutos después de iniciar tu aplicación, tus perfiles aparecerán en la página [Datadog APM > Generador de perfiles][1].

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}

{{% tab "Linux con instrumentación de un solo paso" %}}

1. Con la [instrumentación de un solo paso][2], establece las siguientes variables de entorno requeridas para que la instrumentación automática se adjunte a tu aplicación:

   ```
   LD_PRELOAD=/opt/datadog/apm/library/dotnet/continuousprofiler/Datadog.Linux.ApiWrapper.x64.so
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```

2. En el caso de aplicaciones independientes, reinicia la aplicación manualmente como lo harías normalmente.

3. Uno o dos minutos después de iniciar tu aplicación, tus perfiles aparecerán en la página [Datadog APM > Generador de perfiles][1].

[1]: https://app.datadoghq.com/profiling
[2]: https://docs.datadoghq.com/es/tracing/trace_collection/automatic_instrumentation/?tab=singlestepinstrumentationbeta
{{% /tab %}}

{{% tab "Internet Information Services (IIS)" %}}

3. Establece las variables de entorno necesarias en configurar y activar el generador de perfiles.
 Para habilitar el generador de perfiles para aplicaciones IIS, es necesario establecer la variable de entorno `DD_PROFILING_ENABLED` en el registro bajo los nodos `HKLM\System\CurrentControlSet\Services\WAS` y `HKLM\System\CurrentControlSet\Services\W3SVC`.

   <div class="alert alert-info">A partir de la versión 2.14.0, no es necesario configurar <code>CORECLR_PROFILER</code> o <code>COR_PROFILER</code> si has instalado el rastreador mediante el MSI.</div>

   **Con el editor de registro:**

   En el editor de registro, modifica el valor de cadena múltiple llamado `Environment` en los nodos `HKLM\System\CurrentControlSet\Services\WAS` y `HKLM\System\CurrentControlSet\Services\W3SVC` y establece los datos de valor como sigue:

   Para .NET Core y .NET 5+:
   ```text
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```

   {{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Uso del Editor de registro para crear variables de entorno para una aplicación .NET Core en IIS" style="width:90%" >}}

   Para .NET Framework:
   ```text
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Uso del Editor de registro para crear variables de entorno para una aplicación .NET Framework en IIS" style="width:90%" >}}

   <strong>Nota</strong>: Las variables de entorno se aplican para <em>todas</em> las aplicaciones IIS. A partir de IIS 10, puedes establecer variables de entorno para cada aplicación IIS en el archivo</a><code>C:\Windows\System32\inetsrv\config\applicationhost.config</code>.</a> Consulta la <a href="https://docs.microsoft.com/en-us/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/">documentación de Microsoft</a> para más detalles.

4. Detiene e inicia completamente IIS ejecutando los siguientes comandos como administrador:

   ```cmd
   net stop /y was
   net start w3svc
   ```

   <div class="alert alert-danger">
     <strong>Note:</strong> Use <code>stop</code> and <code>start</code> commands. A reset or restart does not always work.
   </div>

5. Uno o dos minutos después de iniciar tu aplicación, tus perfiles aparecerán en la página [Datadog APM > Generador de perfiles][1].

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}

{{% tab "Servicios de Windows" %}}
3. Establece las variables de entorno necesarias para configurar y habilitar el generador de perfiles. Para habilitar el generador de perfiles para tu servicio, es necesario establecer la variable de entorno `DD_PROFILING_ENABLED` en la clave de Registro asociada al servicio. Si el generador de perfiles se ejecuta solo (el rastreador está desactivado), puedes añadir opcionalmente las variables de entorno `DD_SERVICE`, `DD_ENV` y `DD_VERSION`.

   <div class="alert alert-info">A partir de la versión 2.14.0, no es necesario configurar <code>CORECLR_PROFILER</code> o <code>COR_PROFILER</code> si has instalado el rastreador mediante el MSI.</div>

   **Con el editor de registro:**

   En el Editor de registro, crea un valor de cadena múltiple llamado `Environment` en la clave `HKLM\System\CurrentControlSet\Services\MyService` y configura los datos de valor como:

   Para .NET Core y .NET 5+:
   ```text
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_SERVICE=MyService
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Uso del Editor de registro para crear variables de entorno para un servicio de Windows" style="width:90%" >}}

   Para .NET Framework:
   ```text
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1
   DD_SERVICE=MyService
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Uso del Editor de registro para crear variables de entorno para un servicio de Windows" style="width:90%" >}}

   **Con un script PowerShell:**

   Para .NET Core y .NET 5+:
   ```powershell
   [string[]] $v = @(
       "CORECLR_ENABLE_PROFILING=1",
       "CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}",
       "DD_PROFILING_ENABLED=1",
       "DD_SERVICE=MyService",
       "DD_ENV=production",
       "DD_VERSION=1.2.3"
   )
   Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\MyService -Name Environment -Value $v
   ```

   Para .NET Framework:
   ```powershell
   [string[]] $v = @(
       "COR_ENABLE_PROFILING=1",
       "COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}",
       "DD_PROFILING_ENABLED=1",
       "DD_SERVICE=MyService",
       "DD_ENV=production",
       "DD_VERSION=1.2.3"
   )
   Set-ItemProperty HKLM:SYSTEM\CurrentControlSet\Services\MyService -Name Environment -Value $v
   ```

4. Uno o dos minutos después de iniciar tu aplicación, tus perfiles aparecerán en la página [Datadog APM > Generador de perfiles][1].

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}

{{% tab "Aplicaciones independientes de Windows" %}}

<div class="alert alert-info">A partir de la versión 2.14.0, no es necesario configurar <code>CORECLR_PROFILER</code> o <code>COR_PROFILER</code> si has instalado el rastreador mediante el MSI.</div>

3. Establece las variables de entorno necesarias para configurar y habilitar el generador de perfiles para una aplicación que no sea un servicio, como consola, ASP.NET (Core), Windows Forms o WPF. Para habilitar el generador de perfiles para aplicaciones independientes, es necesario establecer la variable de entorno `DD_PROFILING_ENABLED`. Si el generador de perfiles se ejecuta solo (el rastreador está desactivado), puedes establecer opcionalmente las variables de entorno `DD_SERVICE`, `DD_ENV` y `DD_VERSION`. El método recomendado consiste en crear un archivo por lotes que las establezca e inicie la aplicación, y ejecutar la aplicación utilizando el archivo por lotes.

   Para .NET Core y .NET 5+:
   ```cmd
   SET CORECLR_ENABLE_PROFILING=1
   SET CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   SET DD_PROFILING_ENABLED=1
   SET DD_SERVICE=MyService
   SET DD_ENV=production
   SET DD_VERSION=1.2.3

   REM start the application here
   ```

   Para .NET Framework:
   ```cmd
   SET COR_ENABLE_PROFILING=1
   SET COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   SET DD_PROFILING_ENABLED=1
   SET DD_SERVICE=MyService
   SET DD_ENV=production
   SET DD_VERSION=1.2.3

   REM start the application here
   ```

4. Uno o dos minutos después de iniciar tu aplicación, tus perfiles aparecerán en la página [Datadog APM > Generador de perfiles][1].

[1]: https://app.datadoghq.com/profiling
{{% /tab %}}

{{% tab "NuGet" %}}

2. Establece las siguientes variables de entorno necesarias para que la generación de perfiles se adjunte a tu aplicación:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=<System-dependent path>
   DD_PROFILING_ENABLED=1
   LD_PRELOAD=<System-dependent path>
   DD_SERVICE=MyService
   DD_ENV=production
   DD_VERSION=1.2.3
   DD_DOTNET_TRACER_HOME=<APP_DIRECTORY>/datadog
   ```

   El valor para el parámetro `<APP_DIRECTORY>` es la ruta al directorio que contiene los archivos `.dll` de la aplicación. El valor de la variable de entorno `CORECLR_PROFILER_PATH` varía en función del sistema en el que se ejecute la aplicación:

   Sistema operativo y arquitectura de proceso | Valor CORECLR_PROFILER_PATH | Valor LD_PRELOAD
   ------------------------------------------|-------------------------------------|---------------------------
   Alpine Linux x64 | `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Trace.ClrProfiler.Native.so`| `<APP_DIRECTORY>/datadog/linux-musl-x64/Datadog.Linux.ApiWrapper.x64.so`
   Linux x64 | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Trace.ClrProfiler.Native.so` | `<APP_DIRECTORY>/datadog/linux-x64/Datadog.Linux.ApiWrapper.x64.so`
   Linux ARM64 | `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Trace.ClrProfiler.Native.so`| `<APP_DIRECTORY>/datadog/linux-arm64/Datadog.Linux.ApiWrapper.x64.so`
   Windows x64 | `<APP_DIRECTORY>\datadog\win-x64\Datadog.Trace.ClrProfiler.Native.dll` | N/A
   Windows x86 | `<APP_DIRECTORY>\datadog\win-x86\Datadog.Trace.ClrProfiler.Native.dll` | N/A

3. Para las imágenes de Docker que se ejecutan en Linux, configura la imagen para ejecutar el script `createLogPath.sh`:

   ```
   RUN /<APP_DIRECTORY>/datadog/createLogPath.sh
   ```

   Los ejemplos de Docker están disponibles en el [repositorio `dd-trace-dotnet`][1].

4. Para aplicaciones independientes, reinicia manualmente la aplicación.

[1]: https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples/NugetDeployment
{{% /tab %}}

{{% tab "Azure App Service" %}}

2. Sigue estas directrices de instalación ([Windows][1] o [Linux][2]) para configurar `DD_PROFILING_ENABLED:true` y habilitar el generador de perfiles.

[1]: /es/serverless/azure_app_services/azure_app_services_windows/?tab=net#installation
[2]: /es/serverless/azure_app_services/azure_app_services_linux/?tab=nodenetphppython#setup
{{% /tab %}}

{{< /tabs >}}


## Configuración

Puede configurar el generador de perfiles utilizando las siguientes variables de entorno. Ten en cuenta que la mayoría de estos ajustes también se aplican a la configuración del rastreador. Reinicia la aplicación después de cambiar cualquiera de estos ajustes.

| Variable de entorno                             | Tipo          | Descripción                                                                                      |
| ------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------ |
| `DD_ENV`                   | Cadena        | El nombre de [entorno][3], por ejemplo, `production`. Si no se establece, será `unspecified-environment` |
| `DD_SERVICE`               | Cadena        | El nombre de [servicio][3], por ejemplo, `web-backend`. Si no se especifica, .NET Profiler intenta determinar el nombre de servicio automáticamente a partir del nombre de la aplicación (ensamblado de entrada de proceso o nombre de proceso).    |
| `DD_VERSION`               | Cadena        | La [versión][3] de tu servicio. Si no se establece, será `unspecified-version` |
| `DD_TAGS`                  | Cadena        | Las etiquetas para aplicar a un perfil cargado. Debe ser un lista de `<key>:<value>` separados por comas como: `layer:api,team:intake`.   |
| `DD_AGENT_HOST`            | Cadena        | Establece el host al que se envían los perfiles (el host que ejecuta el Agent). Puede ser un nombre de host o una dirección IP. Se ignora si `DD_TRACE_AGENT_URL` está configurado. Por defecto es `localhost`.  |
| `DD_TRACE_AGENT_PORT`      | Cadena        | Establece el puerto al que se envían los perfiles (el puerto en el que el Agent escucha conexiones). Se ignora si `DD_TRACE_AGENT_URL` está configurado. Por defecto es`8126`.  |
| `DD_TRACE_AGENT_URL`       | Cadena        | Establece el endpoint de la URL donde se envían los perfiles. Sustituye a `DD_AGENT_HOST` y `DD_TRACE_AGENT_PORT` si están definidos. Por defecto es `http://<DD_AGENT_HOST>:<DD_TRACE_AGENT_PORT>`.  |
| `DD_TRACE_DEBUG`           | Booleano        | Activa o desactiva el registro de depuración (podría ayudar en caso de investigación para solucionar problemas). Los valores válidos son: `true` o `false`. Por defecto es `false`.  |
| `DD_PROFILING_LOG_DIR`     | Cadena        | Establece el directorio para logs de .NET Profiler. Por defecto es `%ProgramData%\Datadog .NET Tracer\logs\`. (Antes de v2.24, el directorio por defecto era `%ProgramData%\Datadog-APM\logs\`)  |
| `DD_PROFILING_ENABLED`     | Booleano        | Si se establece en `true`, activa el .NET Profiler. Por defecto es `false`.  |
| `DD_PROFILING_WALLTIME_ENABLED` | Booleano        | Si se establece en `false`, desactiva la generación de perfiles de tiempo real. Por defecto es `true`.  |
| `DD_PROFILING_CPU_ENABLED` | Booleano        | Si se establece en `false`, desactiva la generación de perfiles de CPU. Por defecto es `true`.  |
| `DD_PROFILING_EXCEPTION_ENABLED` | Booleano        | Si se establece en `true`, activa la generación de perfiles de excepciones (fase beta). Por defecto es `false`.  |
| `DD_PROFILING_ALLOCATION_ENABLED` | Booleano        | Si se establece en `true`, activa el perfil de asignaciones (fase beta). Por defecto es `false`.  |
| `DD_PROFILING_LOCK_ENABLED` | Booleano        | Si se establece en `true`, habilita el perfil de contención de bloqueo (fase beta). Por defecto es `false`.  |
| `DD_PROFILING_HEAP_ENABLED` | Booleano        | Si se establece en `true`, habilita el perfil de heap en directo (fase beta). Por defecto es `false`.  |
| `DD_PROFILING_GC_ENABLED` | Booleano        | Si se establece en `false`, se desactiva el perfil de recopilación de elementos no usados utilizado en la interfaz de usuario de Cronología. Por defecto es `true`.  |

<div class="alert alert-danger">
<strong>Note</strong>: Para las aplicaciones IIS, debes establecer las variables de entorno en el registro (en nodos <code>HKLM\System\CurrentControlSet\Services\WAS</code> y <code>HKLM\System\CurrentControlSet\Services\W3SVC</code>) como se muestra en la pestaña <a href="?tab=windowsservices#installation">Windows Service anterior</a>. Las variables de entorno se aplican a <em>todas</em> las aplicaciones de IIS.
Desde IIS 10, puedes establecer variables de entorno para cada aplicación IIS en el archivo <a href="https://docs.microsoft.com/en-us/iis/get-started/planning-your-iis-architecture/introduction-to-applicationhostconfig"><code>C:\Windows\System32\inetsrv\config\applicationhost.config</code>.</a> Consulta la <a href="https://docs.microsoft.com/en-us/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/">documentación de Microsoft</a> para obtener más detalles.
</div>

<br>

## Referencias adicionales

La guía [Empezando con el generador de perfiles][4] toma un ejemplo de servicio con un problema de rendimiento y te muestra cómo utilizar Continuous Profiler para comprender y solucionar el problema.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/getting_started/profiler/
[5]: /es/tracing/trace_collection/
[12]: /es/profiler/connect_traces_and_profiles/#identify-code-hotspots-in-slow-traces
[13]: /es/profiler/connect_traces_and_profiles/#break-down-code-performance-by-api-endpoints
[14]: /es/profiler/enabling/supported_versions/
