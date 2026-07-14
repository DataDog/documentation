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

El generador de perfiles se incluye en las bibliotecas de rastreo de Datadog. Si ya estás utilizando [APM para recopilar trazas (traces)][5] para tu aplicación, puedes omitir la instalación de biblioteca e ir directamente a habilitar el generador de perfiles.

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

Tiempos de ejecución de .NET compatibles (aplicaciones de 64 bits)
.NET Framework 4.6.1 o superior<br/>
.NET Core 2.1, 3.1<br/>
.NET 5<br/>
.NET 6<br/>
.NET 7<br/>
.NET 8<br/>
.NET 9<br/>
.NET 10

<div class="alert alert-danger">
  <strong>Nota:</strong> Para los contenedores, <strong>se necesita más de un núcleo</strong>. Lee la <a href="/profiler/profiler_troubleshooting/dotnet#linux-containers">documentación de Solución de problemas</a> para obtener más detalles.
</div>

Lenguajes compatibles
: cualquier lenguaje dirigido al tiempo de ejecución de .NET, como C#, F# y Visual Basic.

Las siguientes funciones de generación de perfiles están disponibles en las siguientes versiones mínimas de la biblioteca `dd-trace-dotnet`:

| Función                    | Versión requerida de `dd-trace-dotnet`  | Versiones de tiempo de ejecución de .NET necesarias                                                           |
|----------------------------|------------------------------------|------------------------------------------------------------------------------------------|
| Perfiles de tiempo real        | 2.7.0+                             | Todas las versiones de tiempo de ejecución compatibles.                                                          |
| Perfiles de CPU              | 2.15.0+                            | Todas las versiones de tiempo de ejecución compatibles.                                                          |
| Consumo de CPU para la recopilación de elementos no usados         | 3.19.0+                            | .NET 5+                                                          |
| Perfiles de excepciones       | 2.31.0+                            | Todas las versiones de tiempo de ejecución compatibles.                                                          |
| Perfiles de asignación      | 3.12.0+ / 3.28.0+                  | .NET Framework (requiere Datadog Agent 7.51+ y 3.12.0+) / .NET 6+ (requiere 2.18.0+ pero Datadog recomienda .NET10 con 3.28+).   |
| Perfil de contención de bloqueo  | 2.49.0+                            | .NET Framework (requiere Datadog Agent 7.51+) y .NET 5+                                |
| Perfiles de heap en directo        | 3.28.0+                            | .NET 7+ pero Datadog recomienda .NET 10+.                                                                                  |
| [Traza para la Integración de perfiles][12]         | 2.30.0+                            | Todas las versiones de tiempo de ejecución compatibles.                                                          |
| [Perfiles de endpoint][13]  | 2.15.0+                            | Todas las versiones de tiempo de ejecución compatibles.                                                          |
| Cronología                  | 2.30.0+ (y 3.19.0+ para solicitudes HTTP salientes de más de 50 ms en beta y eventos de inicio/fin de subproceso)     | Todas las versiones de tiempo de ejecución compatibles (excepto .NET 5+, necesaria para los detalles de la recopilación de elementos no usados, y .NET 7+, necesario para las solicitudes HTTP salientes). |
| [Investigación de fugas de memoria][15] | 3.33.0+      | .NET 6+ (en vista previa)  |

- La creación de perfiles de asignaciones y retención de bloqueos para .NET Framework requiere que el Datadog Agent y las aplicaciones perfiladas se ejecuten en el mismo equipo.
- Debido a una limitación de .NET Framework, el perfil de asignaciones no muestra el tamaño de las asignaciones. En su lugar, solo muestra el recuento.
- Las asignaciones y la creación de perfiles en Live Heap están disponibles en .NET 10. Para otras versiones anteriores de .NET, la distribución estadística del muestreo de asignaciones podría no ser exacta, por lo que cabe esperar que los objetos más grandes se representen con mayor frecuencia.
- Continuous Profiler no es compatible con AWS Lambda.
- Continuous Profiler no es compatible con ARM64.

<div class="alert alert-danger">
  <strong>Nota:</strong> A diferencia de APM, Continuous Profiler no se activa por defecto cuando se instala el paquete de APM. Debes activarlo explícitamente para las aplicaciones que desees perfilar.
</div>

## Instalación

Asegúrate de que Datadog Agent v6+ está instalado y en funcionamiento. Datadog recomienda utilizar [Datadog Agent v7+][1]. El generador de perfiles se entrega junto con la biblioteca de rastreo (a partir de v2.8.0), por lo que si ya estás utilizando [APM para recopilar trazas][5] para tu aplicación, puedes omitir la instalación de la biblioteca e ir directamente a [Activación del generador de perfiles](#enabling-the-profiler).

En caso contrario, instala el generador de perfiles siguiendo los pasos que se indican a continuación, en función de tu sistema operativo.

<div class="alert alert-danger">
  <strong>Note:</strong> La instrumentación automática de Datadog se basa en la API de generación de perfiles de CLR de .NET. Dado que esta API solo permite un suscriptor, ejecuta solo una solución de APM en el entorno de tu aplicación.
</div>


Puedes instalar el generador de perfiles de Datadog .NET en toda la máquina para que todos los servicios de la máquina puedan ser instrumentados, o puedes instalarlo por aplicación para permitir a los desarrolladores gestionar la instrumentación a través de las dependencias de la aplicación. Para ver las instrucciones de instalación en toda la máquina, haz clic en la pestaña **Windows** o **Linux**. Para ver las instrucciones de instalación por aplicación, haz clic en la pestaña **NuGet**.

{{< tabs >}}

{{% tab "Linux with Single Step APM Instrumentation" %}}
1. Con la [instrumentación de APM en un solo paso][1], no hay nada más que instalar. Ve a [Activar el generador de perfiles](#enabling-the-profiler) para ver cómo activar el generador de perfiles para una aplicación.

<div class="alert alert-danger">
 <strong>Nota:</strong> Si APM ya estaba instalado manualmente, debe desinstalarlo eliminando las siguientes variables de entorno:<br />
  - <code>CORECLR_ENABLE_PROFILING</code><br />
  - <code>CORECLR_PROFILER</code><br />
  - <code>CORECLR_PROFILER_PATH</code><br />
  - El valor que apunta a <code>Datadog.</code> <code>Linux.ApiWrapper.x64.so</code> en <code>LD_PRELOAD</code><br /><br />
  Por ejemplo, si está configurando estas variables de entorno en su dockerfile para un servicio, debería eliminarlas para evitar conflictos con Single step (UI) / paso (generic) Instrumentation.
  Si estas variables de entorno aún están configuradas, se utilizará de forma silenciosa la versión correspondiente instalada anteriormente en lugar de la instalada con Single step (UI) / paso (generic) Instrumentation.
</div>


[1]: https://docs.datadoghq.com/es/tracing/trace_collection/automatic_instrumentation/single-step-apm
{{% /tab %}}

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
  <strong>Nota:</strong> Esta instalación no sirve para instrumentar las aplicaciones que se ejecutan en IIS (Internet Information Services). Para las aplicaciones que se ejecutan en IIS (Internet Information Services), sigue el proceso de instalación en toda la máquina de Windows.
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

## Activación del generador de perfiles

<div class="alert alert-danger">
  <strong>Nota</strong>: Datadog no recomienda habilitar el generador de perfiles a nivel de máquina o para todas las aplicaciones de IIS (Internet Information Services). Si lo has habilitado en toda la máquina, lee la <a href="/profiler/profiler_troubleshooting/?code-lang=dotnet#avoid-enabling-the-profiler-machine-wide">documentación de Solución de problemas</a> para obtener más información sobre la reducción de la sobrecarga asociada con la activación del generador de perfiles para todas las aplicaciones de sistema.
</div>

{{< tabs >}}

{{% tab "Linux with Single Step APM Instrumentation" %}}

2. Con la [instrumentación de APM en un solo paso][1], solo debe configurarse `DD_PROFILING_ENABLED` para activar el generador de perfiles para una aplicación.
   ```
   DD_PROFILING_ENABLED=1

   # other optional environment variables
   DD_ENV=production
   DD_VERSION=1.2.3
   ```

   Estos son los valores admitidos para la variable de entorno `DD_PROFILING_ENABLED`:

   | Value                         | Descripción                                                                                                           |
   | ----------------------------- | --------------------------------------------------------------------------------------------------------------------- |
   | `1` o `true`                 | Activar el generador de perfiles.                                                                                                |
   | `Auto`                        | Activa el generador de perfiles si y solo si (1) se ha creado una traza y (2) la aplicación dura más de 30 segundos. |
   | `0` o `false`                | Desactivar el generador de perfiles.                                                                                                 |

   <div class="alert alert-info">
     <strong>Note</strong>: The Auto value is aimed to avoid short lived processes without any trace. This feature is in Preview.
   </div>

[1]: https://docs.datadoghq.com/es/tracing/trace_collection/automatic_instrumentation/single-step-apm
{{% /tab %}}

{{% tab "Linux" %}}
3. Configura las siguientes variables de entorno, obligatorias para la instrumentación automática, a fin de adjuntarlas a tu aplicación:

   ```
   CORECLR_ENABLE_PROFILING=1
   CORECLR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   CORECLR_PROFILER_PATH=/opt/datadog/Datadog.Trace.ClrProfiler.Native.so
   DD_DOTNET_TRACER_HOME=/opt/datadog
   LD_PRELOAD=/opt/datadog/continuousprofiler/Datadog.Linux.ApiWrapper.x64.so
   DD_PROFILING_ENABLED=1

   # other optional environment variables
   DD_ENV=production
   DD_VERSION=1.2.3
   ```

4. En el caso de aplicaciones independientes, reinicia la aplicación manualmente como lo harías normalmente.

5. Opcional: Configura la [integración de código fuente][2] para conectar tus datos de generación de perfiles con tus repositorios Git.

6. Un par de minutos después de iniciar la aplicación, los perfiles aparecerán en la [página Datadog APM > Generador de perfiles][1]. Si no es así, consulta la guía [Solución de problemas][3].

[1]: https://app.datadoghq.com/profiling
[2]: /es/integrations/guide/source-code-integration/?tab=net
[3]: /es/profiler/profiler_troubleshooting/dotnet/
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

   # other optional environment variables
   DD_ENV=production
   DD_VERSION=1.2.3
   ```

   {{< img src="tracing/setup/dotnet/RegistryEditorCore.png" alt="Uso del Editor de registro para crear variables de entorno para una aplicación .NET Core en IIS" style="width:90%" >}}

   Para .NET Framework:
   ```text
   COR_ENABLE_PROFILING=1
   COR_PROFILER={846F5F1C-F9AE-4B07-969E-05C26BC060D8}
   DD_PROFILING_ENABLED=1

   # other optional environment variables
   DD_ENV=production
   DD_VERSION=1.2.3
   ```
   {{< img src="tracing/setup/dotnet/RegistryEditorFramework.png" alt="Uso del Editor de registro para crear variables de entorno para una aplicación .NET Framework en IIS" style="width:90%" >}}

   <strong>Nota</strong>: Las variables de entorno se aplican para <em>todas</em> las aplicaciones IIS. A partir de IIS 10, puedes establecer variables de entorno para cada aplicación IIS en el archivo<a href="https://docs.microsoft.com/en-us/iis/get-started/planning-your-iis-architecture/introduction-to-applicationhostconfig"><code>C:\Windows\System32\inetsrv\config\applicationhost.config</code>.</a> Consulta la <a href="https://docs.microsoft.com/en-us/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/">documentación de Microsoft</a> para más detalles.

4. Detiene e inicia completamente IIS ejecutando los siguientes comandos como administrador:

   ```cmd
   net stop /y was
   net start w3svc
   ```

   <div class="alert alert-danger">
     <strong>Note:</strong> Use <code>stop</code> and <code>start</code> commands. A reset or restart does not always work.
   </div>

5. Opcional: Configura la [integración de código fuente][2] para conectar tus datos de generación de perfiles con tus repositorios Git.

6. Un par de minutos después de iniciar la aplicación, los perfiles aparecerán en la [página Datadog APM > Generador de perfiles][1]. Si no es así, consulta la guía [Solución de problemas][3].

[1]: https://app.datadoghq.com/profiling
[2]: /es/integrations/guide/source-code-integration/?tab=net
[3]: /es/profiler/profiler_troubleshooting/dotnet/
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

   # other optional environment variables
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

   # other optional environment variables
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

4. Opcional: Configura la [integración de código fuente][2] para conectar tus datos de generación de perfiles con tus repositorios Git.

5. Un par de minutos después de iniciar la aplicación, los perfiles aparecerán en la [página Datadog APM > Generador de perfiles][1]. Si no es así, consulta la guía [Solución de problemas][3].

[1]: https://app.datadoghq.com/profiling
[2]: /es/integrations/guide/source-code-integration/?tab=net
[3]: /es/profiler/profiler_troubleshooting/dotnet/
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

   REM other optional environment variables
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

   REM other optional environment variables
   SET DD_ENV=production
   SET DD_VERSION=1.2.3

   REM start the application here
   ```

4. Opcional: Configura la [integración de código fuente][2] para conectar tus datos de generación de perfiles con tus repositorios Git.

5. Un par de minutos después de iniciar la aplicación, los perfiles aparecerán en la [página Datadog APM > Generador de perfiles][1]. Si no es así, consulta la guía [Solución de problemas][3].

[1]: https://app.datadoghq.com/profiling
[2]: /es/integrations/guide/source-code-integration/?tab=net
[3]: /es/profiler/profiler_troubleshooting/dotnet/
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

   # other optional environment variables
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

2. Sigue estas directrices de instalación ([Windows][1] o [Linux][2]) para configurar `DD_PROFILING_ENABLED=1` y habilitar el generador de perfiles.

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
| `DD_PROFILING_EXCEPTION_ENABLED` | Booleano        | Si se establece en `true`, activa la creación de perfiles de excepción. Por defecto es `false`.  |
| `DD_PROFILING_ALLOCATION_ENABLED` | Booleano        | Si se establece en `true`, activa la creación de perfiles de asignación (en Vista previa). Por defecto es `false`.  |
| `DD_PROFILING_LOCK_ENABLED` | Booleano        | Si se establece en `true`, habilita la creación de perfiles de contención de bloqueo. Por defecto es `false`.  |
| `DD_PROFILING_HEAP_ENABLED` | Booleano        | Si se establece en `true`, habilita el perfilado de heap en directo (en Vista Previa). Por defecto es `false`.  |
| `DD_PROFILING_GC_ENABLED` | Booleano        | Si se establece en `false`, se desactiva el perfil de recopilación de elementos no usados utilizado en la interfaz de usuario de Cronología. Por defecto es `true`.  |
| `DD_PROFILING_HTTP_ENABLED` | Booleano        | Si se establece en `true`, activa la generación de perfiles de solicitudes HTTP salientes utilizada en la interfaz de usuario de Cronología. Por defecto es `false`.  |
| `DD_PROFILING_HEAPSNAPSHOT_ENABLED` | Booleano        | Si se establece en `true`, permite la generación regular de un snapshot heap cuando se detecta un aumento en el consumo de memoria. Esto se utiliza en la [Interfaz de usuario de fuga de memoria][15]. Por defecto es `false`.  |


<div class="alert alert-danger">
<strong>Nota</strong>: Para las aplicaciones de IIS (Internet Information Services), debes configurar las variables de entorno en el registro (en nodos <code>HKLM\System\CurrentControlSet\Services\WAS</code> y <code>HKLM\System\CurrentControlSet\Services\W3SVC</code>) como se muestra en la <a href="?tab=windowsservices#installation">pestaña de Windows Service más arriba</a>. Las variables de entorno se aplican para <em>todas</em> las aplicaciones de IIS (Internet Information Services).
A partir de IIS 10, puedes establecer las variables de entorno para cada aplicación de IIS (Internet Information Services) en el archivo <a href="https://docs.microsoft.com/en-us/iis/get-started/planning-your-iis-architecture/introduction-to-applicationhostconfig"><code>C:\Windows\System32\inetsrv\config\applicationhost.config</code></a>. Lee la <a href="https://docs.microsoft.com/en-us/iis/configuration/system.applicationhost/applicationpools/add/environmentvariables/">documentación de Microsoft</a> para obtener más detalles.
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
[15]: /es/profiler/guide/solve-memory-leaks/