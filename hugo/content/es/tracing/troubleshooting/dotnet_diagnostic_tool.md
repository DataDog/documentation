---
description: Utiliza la herramienta de diagnóstico dd-dotnet para solucionar problemas
  de configuración del rastreo .NET y de conectividad del Agent.
title: Uso de la herramienta de diagnóstico de .NET para solucionar problemas
---

Si tu aplicación no produce trazas como esperabas después de instalar el rastreador de .NET, ejecuta la herramienta de diagnóstico `dd-dotnet` descrita en esta página para obtener información básica para solucionar problemas. Te ayudará a determinar problemas con tu configuración, como variables de entorno faltantes, instalación incompleta o un Agent inaccesible.

La herramienta de diagnóstico `dd-dotnet` se incluye con la biblioteca de rastreo a partir de la versión 2.42.0. Se encuentra en la carpeta de instalación de la biblioteca de rastreo y se añade automáticamente a la `PATH` del sistema para poder invocarla desde cualquier lugar.

## Instalación de `dd-trace`

**Esta sección es para versiones del rastreador anteriores a la 2.42.0.**

Las versiones anteriores del rastreador no incluían la herramienta `dd-dotnet`. Puedes instalar la herramienta `dd-trace` en su lugar. Sus características y sintaxis son similares a las de `dd-dotnet`.

Puedes instalar `dd-trace` de una de las siguientes maneras:

- Con el SDK de .NET ejecutando el comando:
   ```
   dotnet tool install -g dd-trace
   ```
- Descargando la versión adecuada:
    * Win-x64: [https://dtdg.co/dd-trace-dotnet-win-x64][1]
    * Linux-x64: [https://dtdg.co/dd-trace-dotnet-linux-x64][2]
    * Linux-musl-x64 (Alpine): [https://dtdg.co/dd-trace-dotnet-linux-musl-x64][3]

- O descargándola [de la página de versiones de github][4].

Cuando invoques los comandos de las secciones siguientes, asegúrate de sustituir `dd-dotnet` por `dd-trace`.

## Diagnóstico del proceso

Para la mayoría de las aplicaciones, utiliza los diagnósticos del proceso para encontrar el problema. 

1. Asegúrate de que la aplicación se está ejecutando y obtén el ID (pid) de proceso. 

   Para obtener el pid de un proceso de Windows, abre el Administrador de tareas, abre la pestaña **Details** (Detalles), y busca la columna PID. También puedes ejecutar el comando `tasklist /FI "IMAGENAME eq target.exe"`donde `target.exe` es el nombre del proceso.

   Para obtener el pid de un proceso en Linux, ejecuta el comando `ps aux | grep target` donde `target` es el nombre del proceso (el pid suele ser `1` cuando se ejecuta en un contenedor de Docker).

2. Pasa el pid a la herramienta dd-dotnet:
   ```
   dd-dotnet check process <pid>
   ```
   Ejecuta los checks de configuración básica y muestra recomendaciones si encuentras algún problema.

Ejemplo de salida sin problemas:
```bash
$ dd-dotnet check process 35888

Running checks on process 35888
Process name: SimpleApp

---- STARTING TRACER SETUP CHECKS -----
Target process is running with .NET Core
1. Checking Modules Needed so the Tracer Loads:
 [SUCCESS]: The native library version 2.42.0.0 is loaded into the process.
 [SUCCESS]: The tracer version 2.42.0.0 is loaded into the process.
2. Checking DD_DOTNET_TRACER_HOME and related configuration value:
 [SUCCESS]: DD_DOTNET_TRACER_HOME is set to 'C:\git\dd-trace-dotnet-2\shared\bin\monitoring-home\win-x64\..' and the
directory was found correctly.
3. Checking CORECLR_PROFILER_PATH and related configuration value:
 [SUCCESS]: The environment variable CORECLR_PROFILER_PATH_32 is set to the correct value of
C:\git\dd-trace-dotnet-2\shared\bin\monitoring-home\win-x86\Datadog.Trace.ClrProfiler.Native.dll.
 [SUCCESS]: The environment variable CORECLR_PROFILER_PATH_64 is set to the correct value of
C:\git\dd-trace-dotnet-2\shared\bin\monitoring-home\win-x64\Datadog.Trace.ClrProfiler.Native.dll.
4. Checking CORECLR_PROFILER and related configuration value:
 [SUCCESS]: The environment variable CORECLR_PROFILER is set to the correct value of
{846F5F1C-F9AE-4B07-969E-05C26BC060D8}.
5. Checking CORECLR_ENABLE_PROFILING and related configuration value:
 [SUCCESS]: The environment variable CORECLR_ENABLE_PROFILING is set to the correct value of 1.

---- CONFIGURATION CHECKS -----
1. Checking if tracing is disabled using DD_TRACE_ENABLED.
 [INFO]: DD_TRACE_ENABLED is not set, the default value is true.
2. Checking if profiling is enabled using DD_PROFILING_ENABLED.
 [INFO]: DD_PROFILING_ENABLED is not set, the continuous profiler is disabled.

---- DATADOG AGENT CHECKS -----
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a
configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.48.0
 [SUCCESS]: No issue found with the target process.
```

Ejemplo de salida con problemas:
```bash
$ dd-dotnet check process 4464

Running checks on process 4464
Process name: SimpleApp

---- STARTING TRACER SETUP CHECKS -----
Target process is running with .NET Core
1. Checking Modules Needed so the Tracer Loads:
 [WARNING]: The native loader library is not loaded into the process
 [WARNING]: The native tracer library is not loaded into the process
 [WARNING]: Tracer is not loaded into the process
2. Checking DD_DOTNET_TRACER_HOME and related configuration value:
 [WARNING]: DD_DOTNET_TRACER_HOME is set to 'C:\Program Files\Datadog\.NET Tracer\' but the directory does not exist.
3. Checking CORECLR_PROFILER_PATH and related configuration value:
 [FAILURE]: The environment variable CORECLR_PROFILER_PATH_32 is set to C:\Program Files\Datadog\.NET
Tracer\win-x86\Datadog.Trace.ClrProfiler.Native.dll but the file is missing or you don't have sufficient permission.
 [FAILURE]: The environment variable CORECLR_PROFILER_PATH_64 is set to C:\Program Files\Datadog\.NET
Tracer\win-x64\Datadog.Trace.ClrProfiler.Native.dll but the file is missing or you don't have sufficient permission.
4. Checking CORECLR_PROFILER and related configuration value:
 [SUCCESS]: The environment variable CORECLR_PROFILER is set to the correct value of
{846F5F1C-F9AE-4B07-969E-05C26BC060D8}.
5. Checking CORECLR_ENABLE_PROFILING and related configuration value:
 [FAILURE]: The environment variable CORECLR_ENABLE_PROFILING should be set to '1' (current value: not set)
6. Checking if process tracing configuration matches Installer or Bundler:
Installer/MSI related documentation:
https://docs.datadoghq.com/tracing/trace_collection/dd_libraries/dotnet-core/?tab=windows#install-the-tracer
 [FAILURE]: Unable to find Datadog .NET Tracer program, make sure the tracer has been properly installed with the MSI.
 [WARNING]: The registry key SOFTWARE\Classes\CLSID\{846F5F1C-F9AE-4B07-969E-05C26BC060D8}\InprocServer32 is missing. If
using the MSI, make sure the installation was completed correctly try to repair/reinstall it.
 [WARNING]: The registry key SOFTWARE\Classes\Wow6432Node\CLSID\{846F5F1C-F9AE-4B07-969E-05C26BC060D8}\InprocServer32 is
missing. If using the MSI, make sure the installation was completed correctly try to repair/reinstall it.
 ```


## Diagnóstico IIS

Para una aplicación IIS, puedes obtener diagnósticos más exhaustivos con el siguiente comando, donde `<FULL SITE NAME>` es el nombre del sitio en IIS seguido del nombre de la aplicación:

```
dd-dotnet check iis "<FULL SITE NAME>"
```

Debido a que los grupos de aplicaciones se inician lentamente en IIS, asegúrate de que el sitio ha recibido al menos una solicitud antes de ejecutar el comando.

**Recuerda entrecomillar el nombre si contiene espacios.**

Por ejemplo, el nombre completo del sitio para la aplicación que se muestra a continuación es `Default Web Site/WebApplication1`:

{{< img src="tracing/troubleshooting/IISManager.png" alt="Gestor de IIS">}}

El comando para ejecutar diagnósticos de IIS en esta aplicación es:
```
dd-dotnet check iis "Default Web Site/WebApplication1"
```

Para instrumentar la aplicación raíz del sitio, ejecuta:
```
dd-dotnet check iis "Default Web Site"
```

El comando `check iis` incluye diagnósticos de proceso, por lo que ejecuta checks de configuración básica y muestra recomendaciones si encuentra algún problema.

Ejemplo de salida sin problemas:
```bash
$ dd-dotnet check iis "Default Web Site/WebFormsTestApp"

Fetching IIS application "Default Web Site/WebFormsTestApp".
Inspecting worker process 39852

---- STARTING TRACER SETUP CHECKS -----
Target process is running with .NET Framework
1. Checking Modules Needed so the Tracer Loads:
 [SUCCESS]: The native library version 2.42.0.0 is loaded into the process.
 [SUCCESS]: The tracer version 2.42.0.0 is loaded into the process.
2. Checking DD_DOTNET_TRACER_HOME and related configuration value:
 [SUCCESS]: DD_DOTNET_TRACER_HOME is set to 'C:\Program Files\Datadog\.NET Tracer\' and the directory was found
correctly.
3. Checking COR_PROFILER_PATH and related configuration value:
 [SUCCESS]: The environment variable COR_PROFILER_PATH_32 is set to the correct value of C:\Program Files\Datadog\.NET
Tracer\win-x86\Datadog.Trace.ClrProfiler.Native.dll.
 [SUCCESS]: The environment variable COR_PROFILER_PATH_64 is set to the correct value of C:\Program Files\Datadog\.NET
Tracer\win-x64\Datadog.Trace.ClrProfiler.Native.dll.
4. Checking COR_PROFILER and related configuration value:
 [SUCCESS]: The environment variable COR_PROFILER is set to the correct value of {846F5F1C-F9AE-4B07-969E-05C26BC060D8}.
5. Checking COR_ENABLE_PROFILING and related configuration value:
 [SUCCESS]: The environment variable COR_ENABLE_PROFILING is set to the correct value of 1.

---- CONFIGURATION CHECKS -----
1. Checking if tracing is disabled using DD_TRACE_ENABLED.
 [INFO]: DD_TRACE_ENABLED is not set, the default value is true.
2. Checking if profiling is enabled using DD_PROFILING_ENABLED.
 [INFO]: DD_PROFILING_ENABLED is not set, the continuous profiler is disabled.

---- DATADOG AGENT CHECKS -----
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a
configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.48.0
Found Datadog.Trace version 2.42.0.0 in the GAC
 [SUCCESS]: No issue found with the IIS site.
```

Ejemplo de salida con problemas:
```bash
$ dd-dotnet check iis "Default Web Site/WebFormsTestApp"

Fetching IIS application "Default Web Site/WebFormsTestApp".
Inspecting worker process 35152

---- STARTING TRACER SETUP CHECKS -----
Target process is running with .NET Framework
1. Checking Modules Needed so the Tracer Loads:
 [SUCCESS]: The native library version 2.42.0.0 is loaded into the process.
 [SUCCESS]: The tracer version 2.42.0.0 is loaded into the process.
2. Checking DD_DOTNET_TRACER_HOME and related configuration value:
 [SUCCESS]: DD_DOTNET_TRACER_HOME is set to 'C:\Program Files\Datadog\.NET Tracer\' and the directory was found
correctly.
3. Checking COR_PROFILER_PATH and related configuration value:
 [SUCCESS]: The environment variable COR_PROFILER_PATH_32 is set to the correct value of C:\Program Files\Datadog\.NET
Tracer\win-x86\Datadog.Trace.ClrProfiler.Native.dll.
 [SUCCESS]: The environment variable COR_PROFILER_PATH_64 is set to the correct value of C:\Program Files\Datadog\.NET
Tracer\win-x64\Datadog.Trace.ClrProfiler.Native.dll.
4. Checking COR_PROFILER and related configuration value:
 [SUCCESS]: The environment variable COR_PROFILER is set to the correct value of {846F5F1C-F9AE-4B07-969E-05C26BC060D8}.
5. Checking COR_ENABLE_PROFILING and related configuration value:
 [SUCCESS]: The environment variable COR_ENABLE_PROFILING is set to the correct value of 1.

---- CONFIGURATION CHECKS -----
1. Checking if tracing is disabled using DD_TRACE_ENABLED.
 [INFO]: DD_TRACE_ENABLED is not set, the default value is true.
2. Checking if profiling is enabled using DD_PROFILING_ENABLED.
 [INFO]: DD_PROFILING_ENABLED is not set, the continuous profiler is disabled.

---- DATADOG AGENT CHECKS -----
Detected agent url: http://127.0.0.1:8126/. Note: this url may be incorrect if you configured the application through a
configuration file.
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.48.0
 [FAILURE]: The Datadog.Trace assembly could not be found in the GAC. Make sure the tracer has been properly installed
with the MSI.
```

## Diagnóstico de conectividad del Agent

Si no deseas ejecutar checks para una aplicación específica, sino que solo deseas probar la conexión al Agent, ejecuta:
```
dd-dotnet check agent <url>
```

Este comando envía una solicitud al Agent y busca errores. Si se omite el parámetro opcional `url`, la localización del Agent se determina a partir de las variables de entorno. Los protocolos admitidos son `http://` o `unix://` (para domain sockets).

Ejemplo de salida sin problemas:
```bash
$ dd-dotnet check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
Detected agent version 7.48.0
 [SUCCESS]: Connected successfully to the Agent.
```

Ejemplo de salida con problemas:
```bash
$ dd-dotnet check agent

No Agent URL provided, using environment variables
Connecting to Agent at endpoint http://127.0.0.1:8126/ using HTTP
 [FAILURE]: Error connecting to Agent at http://127.0.0.1:8126/: System.Net.Http.HttpRequestException: No connection
could be made because the target machine actively refused it. (127.0.0.1:8126)
```

Lee [Errores de conexión][5] para obtener más información sobre los problemas de conectividad del Agent.


[1]: https://dtdg.co/dd-trace-dotnet-win-x64
[2]: https://dtdg.co/dd-trace-dotnet-linux-x64
[3]: https://dtdg.co/dd-trace-dotnet-linux-musl-x64
[4]: https://github.com/DataDog/dd-trace-dotnet/releases
[5]: /es/tracing/troubleshooting/connection_errors/?code-lang=dotnet#