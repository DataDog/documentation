---
code_lang: dotnet
code_lang_weight: 60
further_reading:
- link: /tracing/troubleshooting
  tag: Documentación
  text: Solucionar problemas de APM
title: Solucionar problemas del generador de perfiles .NET
type: lenguaje de código múltiple
---

## Perfiles faltantes en la página de búsqueda de perfiles

Si has configurado el generador de perfiles y no ves perfiles en la página de búsqueda de perfiles, aquí tienes algunas cosas que puedes comprobar, dependiendo de tu sistema operativo.

{{< tabs >}}

{{% tab "Linux" %}}

1. Comprueba que el Agent está instalado y en funcionamiento.

2. Comprueba que el generador de perfiles se ha cargado desde el cargador de logs:

   1. Abre el archivo de logs `dotnet-native-loader-dotnet-<pid>` en la carpeta `/var/log/datadog`.

   2. Busca `CorProfiler::Initialize: Continuous Profiler initialized successfully.` cerca del final. Si ese mensaje no está presente, habilita la depuración de logs configurando la variable de entorno `DD_TRACE_DEBUG` para la aplicación.

   3. Reinicie la aplicación.

   4. Abre el archivo de logs `dotnet-native-loader-dotnet-<pid>` en la carpeta `/var/log/datadog`.

   5. Busca la entrada `#Profiler`.

   6. Comprueba las siguientes líneas para asegurarte de que se ha cargado la biblioteca del generador de perfiles:
      ```
      [...] #Profiler
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x64;.\Datadog.Profiler.Native.dll
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x86;.\Datadog.Profiler.Native.dll
      [...] DynamicDispatcherImpl::LoadConfiguration: [PROFILER] Loading: .\Datadog.Profiler.Native.dll [AbsolutePath=/opt/datadog/linux-x64/./Datadog.Tracer.Native.so]
      [...] [PROFILER] Creating a new DynamicInstance object
      [...] Load: /opt/datadog/linux-x64/./Datadog.Tracer.Native.so
      [...] GetFunction: DllGetClassObject
      [...] GetFunction: DllCanUnloadNow
      ```

3. Comprueba el resultado de la exportación de perfiles:

   1. Si la depuración de logs no se ha habilitado en el paso 2.2, configura la variable de entorno `DD_TRACE_DEBUG` como `true` para la aplicación y reiníciala.

   2. Abre el archivo de logs `DD-DotNet-Profiler-Native-<Application Name>-<pid>` en la carpeta `/var/log/datadog`.

   3. Busca las entradas `libddprof error: Failed to send profile.`: este mensaje significa que no puede ponerse en contacto con el Agent. Asegúrate de que `DD_TRACE_AGENT_URL` está configurado en la URL del Agent correcta. Para obtener más información, consulta [Habilitar la configuración del generador de perfiles .NET][1].

   4. Si el mensaje `Failed to send profile` no está presente, busca las entradas `The profile was sent. Success?`.

      El siguiente mensaje significa que el perfil se ha enviado correctamente:
      ```
      true, Http code: 200
      ```

   5. Comprueba los otros códigos HTTP para ver si contienen errores, como 403, debido a una clave de API inválida.

4. Sólo para los perfiles CPU o Wall Time faltantes, comprueba que el gestor de señales de Datadog para el recorrido del stack tecnológico no ha sido reemplazado:

   1. Abre el archivo de logs `DD-DotNet-Profiler-Native-<Application Name>-<pid>` en la carpeta `/var/log/datadog`.

   2. Busca estos dos mensajes:
      - `Profiler signal handler was replaced again. It will not be restored: the profiler is disabled.`
      - `Fail to restore profiler signal handler.`

   3. Si uno de estos mensajes está presente, significa que el código de la aplicación o un código de terceros está reinstalando repetidamente su propio gestor de señales encima del gestor de señales de Datadog. Para evitar más conflictos, se deshabilitan los generadores de perfiles CPU y Wall Time.

   Ten en cuenta que puede aparecer el siguiente mensaje, pero este no afecta a la generación de perfiles Datadog: `Profiler signal handler has been replaced. Restoring it.` Esto sólo indica que el gestor de señales de Datadog se vuelve a instalar cuando se sobrescribe.

[1]: /es/profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}

{{% tab "Windows" %}}

El directorio de logs del generador de perfiles por defecto es `%ProgramData%\Datadog .NET Tracer\logs\`. Antes de la versión 2.24, el directorio por defecto era `%ProgramData%\Datadog-APM\logs\DotNet`.

1. Comprueba que Agent está instalado, en funcionamiento y que es visible en el panel de servicios de Windows.

2. Comprueba que el generador de perfiles se ha cargado desde el cargador de logs:

   1. Abre el archivo de logs `dotnet-native-loader-<Application Name>-<pid>` en la carpeta de logs por defecto.

   2. Busca `CorProfiler::Initialize: Continuous Profiler initialized successfully.` cerca del final. Si el mensaje `initialized successfully` no está presente, habilita los logs de depuración configurando la variable de entorno `DD_TRACE_DEBUG` para la aplicación.

   3. Reinicie la aplicación.

   4. Abre el archivo de logs `dotnet-native-loader-<Application Name>-<pid>` en la carpeta de logs por defecto.

   5. Busca la entrada `#Profiler`.

   6. Comprueba las siguientes líneas para asegurarte de que se ha cargado la biblioteca del generador de perfiles:
      ```
      [...] #Profiler
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x64;.\Datadog.Profiler.Native.dll
      [...] PROFILER;{BD1A650D-AC5D-4896-B64F-D6FA25D6B26A};win-x86;.\Datadog.Profiler.Native.dll
      [...] DynamicDispatcherImpl::LoadConfiguration: [PROFILER] Loading: .\Datadog.Profiler.Native.dll [AbsolutePath=C:\Program Files\Datadog\.NET Tracer\win-x64\Datadog.Profiler.Native.dll]
      [...] [PROFILER] Creating a new DynamicInstance object
      [...] Load: C:\Program Files\Datadog\.NET Tracer\win-x64\Datadog.Profiler.Native.dll
      [...] GetFunction: DllGetClassObject
      [...] GetFunction: DllCanUnloadNow
      ```

3. Comprueba el resultado de la exportación de perfiles:

   1. Si la depuración de logs no se ha habilitado en el paso 2.2, configura la variable de entorno `DD_TRACE_DEBUG` como `true` para la aplicación y reiníciala.

   2. Abre el archivo de logs `DD-DotNet-Profiler-Native-<Application Name>-<pid>` en la carpeta de logs por defecto.

   3. Busca las entradas `libddprof error: Failed to send profile.`: este mensaje significa que no puede ponerse en contacto con el Agent. Asegúrate de que `DD_TRACE_AGENT_URL` está configurado en la URL del Agent correcta. Para obtener más información, consulta [Habilitar la configuración del generador de perfiles .NET][1].

   4. Si el mensaje `Failed to send profile` no está presente, busca las entradas `The profile was sent. Success?`.

      El siguiente mensaje significa que el perfil se ha enviado correctamente:
      ```
      true, Http code: 200
      ```

   5. Comprueba los otros códigos HTTP para ver si contienen errores, como 403, debido a una clave de API inválida.

[1]: /es/profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}

{{< /tabs >}}

Si no, activa el [modo de depuración][1] y [abre un ticket de asistencia][2] con los archivos de depuración y la siguiente información:
- Tipo y versión del sistema operativo (por ejemplo, Windows Server 2019 o Ubuntu 20.04).
- Tipo y versión del tiempo de ejecución (por ejemplo, .NET Framework 4.8 o .NET Core 6.0).
- Tipo de aplicación (por ejemplo, aplicación web que se ejecuta en IIS).


## Reducción de la sobrecarga al utilizar el generador de perfiles

Los [distintos tipos de perfiles][3] tienen una sobrecarga fija de CPU y de memoria, por lo que *cuanto más se perfilen las aplicaciones, mayor será la sobrecarga*.

### Para evitar habilitar el generador de perfiles en toda la máquina

Datadog no recomienda habilitar el generador de perfiles a nivel de la máquina o para todos los grupos de aplicaciones IIS. Para reducir la cantidad de recursos utilizados por el generador de perfiles, puedes:
- Aumentar los recursos asignados, como incrementar los núcleos de CPU.
- Perfilar sólo aplicaciones específicas configurando entornos en archivos por lotes, en lugar de ejecutar directamente la aplicación.
- Reducir el número de grupos de IIS que se perfilan (sólo es posible en IIS v10 o posterior).
- Deshabilita el perfilado del tiempo de pared con el parámetro `DD_PROFILING_WALLTIME_ENABLED=0`.

### Contenedores Linux

El valor exacto puede variar, pero el coste fijo de las sobrecargas significa que la sobrecarga relativa del generador de perfiles puede ser significativa en contenedores muy pequeños. Para evitar esta situación, el generador de perfiles está deshabilitado en contenedores con menos de un núcleo. Puedes anular el umbral de un núcleo configurando la variable de entorno `DD_PROFILING_MIN_CORES_THRESHOLD` con un valor inferior a 1. Por ejemplo, un valor de `0.5` permite que el generador de perfiles se ejecute en un contenedor con al menos 0,5 núcleos.
Sin embargo, en ese caso habrá un aumento del consumo de CPU, incluso para servicios inactivos, ya que los hilos del generador de perfiles siempre exploran los hilos de la aplicación. Cuanto menor sea el número de núcleos disponibles, más aumentará el consumo de CPU. 

Deshabilitar el generador de perfiles de tiempo de pared con el parámetro `DD_PROFILING_WALLTIME_ENABLED=0` disminuye el consumo de CPU por del generador de perfiles. Si esto no es suficiente, aumenta los núcleos de CPU disponibles para tus contenedores.

### Deshabilitar el generador de perfiles

Dado que el rastreo de APM también se basa en la API de generación de perfiles CLR, si quieres dejar de recopilar perfiles .NET pero seguir recibiendo trazas (traces), configura las siguientes variables de entorno para deshabilitar únicamente la generación de perfiles.

```
 DD_PROFILING_ENABLED=0 
 CORECLR_ENABLE_PROFILING=1
```

## No hay tiempo de CPU o Wall porque la aplicación en Linux se cuelga

Si una aplicación se cuelga o deja de responder en Linux, las muestras de tiempo de CPU y Wall ya no están disponibles. Sigue estos pasos:

1. Abre el archivo de logs `DD-DotNet-Profiler-Native-<Application Name>-<pid>` en la carpeta `/var/log/datadog/dotnet`.

2. Busca `StackSamplerLoopManager::WatcherLoopIteration - Deadlock intervention still in progress for thread ...`. Si este mensaje no está presente, el resto no se aplica.

3. Si se encuentra el mensaje, significa que el mecanismo de recorrido del stack tecnológico podría estar bloqueado. Para investigar el problema, descarta los stacks tecnológicos de llamadas de todos los hilos de la aplicación. Por ejemplo, para hacer esto con el depurador gdb:

   1. Instala gdb.

   2. Ejecuta el siguiente comando:
      ```
      gdb -p <process id> -batch -ex "thread apply all bt full" -ex "detach" -ex "quit"
      ```

   3. Envía el resultado al [servicio de asistencia de Datadog][2].


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/troubleshooting/#tracer-debug-logs
[2]: /es/help/
[3]: /es/profiler/profile_types/?code-lang=dotnet