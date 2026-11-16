---
code_lang: dotnet
code_lang_weight: 60
further_reading:
- link: /tracing/troubleshooting
  tag: Documentación
  text: Solución de problemas de APM
title: Solución de problemas del generador de perfiles .NET
type: multi-code-lang
---
## Perfiles faltantes en la página de búsqueda de perfiles {#missing-profiles-in-the-profile-search-page}

Si ha configurado el generador de perfiles y no ve perfiles en la página de búsqueda de perfiles, aquí hay cosas que debe verificar, según el sistema operativo.

{{< tabs >}}

{{% tab "Linux con instrumentación de Single Step APM" %}}

1. Compruebe que el Agent esté instalado y en ejecución.

2. Compruebe que el generador de perfiles se haya cargado desde el registro del cargador:

   1. Abra el registro `dotnet-native-loader-dotnet-<pid>` en la carpeta `/var/log/datadog`.

   2. Busque `CorProfiler::Initialize: Continuous Profiler initialized successfully.` cerca del final. Si ese mensaje no aparece, habilite los registros de depuración configurando la variable de entorno `DD_TRACE_DEBUG` para la aplicación.

   3. Reinicie la aplicación.

   4. Abra el registro `dotnet-native-loader-dotnet-<pid>` en la carpeta `/var/log/datadog`.

   5. Busque la entrada `#Profiler`.

   6. Compruebe las siguientes líneas para asegurarse de que la biblioteca del generador de perfiles se haya cargado:
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

3. Compruebe el resultado de la exportación de perfiles:

   1. Si los registros de depuración no se habilitaron en el paso 2.2, configure la variable de entorno `DD_TRACE_DEBUG` en `true` para la aplicación y reiníciela.

   2. Abra el registro `DD-DotNet-Profiler-Native-<Application Name>-<pid>` en la carpeta `/var/log/datadog`.

   3. Busque entradas `libddprof error: Failed to send profile.`: este mensaje significa que no puede comunicarse con el agente. Asegúrese de que `DD_TRACE_AGENT_URL` esté configurado con la URL del Agent correcta. Consulte [Enabling the .NET Profiler-Configuration][4] para obtener más información.

   4. Si el mensaje `Failed to send profile` no está presente, busque las entradas `The profile was sent. Success?`.

      El siguiente mensaje significa que el perfil se ha enviado correctamente:
      ```
      true, Http code: 200
      ```

   5. Verifique los otros códigos HTTP para detectar posibles errores, como 403 para una clave de API no válida.

4. Solo para perfiles de tiempo de CPU o de pared faltantes, verifique que el controlador de señales de Datadog para el recorrido de pila no haya sido reemplazado:

   1. Abra el archivo de registro `DD-DotNet-Profiler-Native-<Application Name>-<pid>` en la carpeta `/var/log/datadog`.

   2. Busque estos dos mensajes:
      - `Profiler signal handler was replaced again. It will not be restored: the profiler is disabled.`
      - `Fail to restore profiler signal handler.`

   3. Si uno de estos mensajes está presente, significa que el código de la aplicación o un código de terceros está reinstalando repetidamente su propio controlador de señales sobre el controlador de señales de Datadog. Para evitar cualquier conflicto adicional, los generadores de perfiles de tiempo de CPU y de pared están deshabilitados.

   Tenga en cuenta que el siguiente mensaje podría aparecer, pero no afecta la generación de perfiles de Datadog: `Profiler signal handler has been replaced. Restoring it.` Esto solo indica que el controlador de señales de Datadog se reinstala cuando fue sobrescrito.

5. Confirme que las siguientes variables de entorno no estén configuradas:
   - `CORECLR_ENABLE_PROFILING`
   - `CORECLR_PROFILER`
   - `CORECLR_PROFILER_PATH`
   - El valor que apunta a `Datadog.Linux.ApiWrapper.x64.so` en `LD_PRELOAD`
   
   Si estas variables se han configurado, elimínelas de sus scripts o Dockerfile. De lo contrario, se utiliza una versión anterior del generador de perfiles instalada manualmente.

6. Verifique que el valor de `DD_PROFILING_ENABLED` esté configurado en `1` o `Auto`. Si se configura en `Auto`, el generador de perfiles genera perfiles solo si se cumplen ambas condiciones siguientes:
   - Se creó una traza
   - La aplicación se ejecutó durante más de 30 segundos
Si se establece en otro valor o no se establece en absoluto, el generador de perfiles se deshabilita.

[4]: /es/profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}
{{% tab "Linux" %}}

1. Compruebe que el Agent esté instalado y en ejecución.

2. Compruebe que el generador de perfiles se haya cargado desde el registro del cargador:

   1. Abra el registro `dotnet-native-loader-dotnet-<PID>` en la carpeta `/var/log/datadog`.

   2. Busque `CorProfiler::Initialize: Continuous Profiler initialized successfully.` cerca del final. Si ese mensaje no aparece, habilite los registros de depuración configurando la variable de entorno `DD_TRACE_DEBUG` para la aplicación.

   3. Reinicie la aplicación.

   4. Abra el registro `dotnet-native-loader-dotnet-<pid>` en la carpeta `/var/log/datadog`.

   5. Busque la entrada `#Profiler`.

   6. Compruebe las siguientes líneas para asegurarse de que la biblioteca del generador de perfiles se haya cargado:
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

3. Verifique que el valor de `DD_PROFILING_ENABLED` esté establecido en `1`; si no está establecido o tiene otro valor, el generador de perfiles se deshabilita.

4. Verifique el resultado de la exportación de perfiles:

   1. Si los registros de depuración no se habilitaron en el paso 2.b, establezca la variable de entorno `DD_TRACE_DEBUG` en `true` para la aplicación y reiníciela.

   2. Abra el registro `DD-DotNet-Profiler-Native-<Application Name>-<pid>` en la carpeta `/var/log/datadog`.

   3. Busque entradas `libddprof error: Failed to send profile.`: este mensaje significa que no puede comunicarse con el agente. Asegúrese de que `DD_TRACE_AGENT_URL` esté configurado con la URL del Agent correcta. Consulte [Enabling the .NET Profiler-Configuration][4] para obtener más información.

   4. Si el mensaje `Failed to send profile` no está presente, busque las entradas `The profile was sent. Success?`.

      El siguiente mensaje significa que el perfil se ha enviado correctamente:
      ```
      true, Http code: 200
      ```

   5. Verifique los otros códigos HTTP para detectar posibles errores, como 403 para una clave de API no válida.

5. Solo para perfiles de tiempo de CPU o de pared faltantes, verifique que el controlador de señales de Datadog para el recorrido de pila no haya sido reemplazado:

   1. Abra el archivo de registro `DD-DotNet-Profiler-Native-<Application Name>-<pid>` en la carpeta `/var/log/datadog`.

   2. Busque estos dos mensajes:
      - `Profiler signal handler was replaced again. It will not be restored: the profiler is disabled.`
      - `Fail to restore profiler signal handler.`

   3. Si uno de estos mensajes está presente, significa que el código de la aplicación o un código de terceros está reinstalando repetidamente su propio controlador de señales sobre el controlador de señales de Datadog. Para evitar cualquier conflicto adicional, los generadores de perfiles de tiempo de CPU y de pared están deshabilitados.

   Tenga en cuenta que el siguiente mensaje podría aparecer, pero no afecta la generación de perfiles de Datadog: `Profiler signal handler has been replaced. Restoring it.` Esto solo indica que el controlador de señales de Datadog se reinstala cuando fue sobrescrito.

[4]: /es/profiler/enabling/dotnet/?tab=linux#configuration

{{% /tab %}}

{{% tab "Windows" %}}

El directorio de registro del generador de perfiles predeterminado es `%ProgramData%\Datadog .NET Tracer\logs\`. Antes de la v2.24, el directorio predeterminado era `%ProgramData%\Datadog-APM\logs\DotNet`.

1. Compruebe que el Agent esté instalado y en ejecución, y que sea visible en el panel de Servicios de Windows.

2. Compruebe que el generador de perfiles se haya cargado desde el registro del cargador:

   1. Abra el archivo de registro `dotnet-native-loader-<Application Name>-<pid>` de la carpeta de registro predeterminada.

   2. Busque `CorProfiler::Initialize: Continuous Profiler initialized successfully.` cerca del final. Si el mensaje `initialized successfully` no está presente, habilite los registros de depuración configurando la variable de entorno `DD_TRACE_DEBUG` para la aplicación.

   3. Reinicie la aplicación.

   4. Abra el archivo de registro `dotnet-native-loader-<Application Name>-<pid>` de la carpeta de registro predeterminada.

   5. Busque la entrada `#Profiler`.

   6. Compruebe las siguientes líneas para asegurarse de que la biblioteca del generador de perfiles se haya cargado:
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

3. Compruebe que el valor de `DD_PROFILING_ENABLED` esté establecido en `1`; si no está establecido, o si tiene otro valor, el generador de perfiles está deshabilitado.

4. Verifique el resultado de la exportación de perfiles:

   1. Si los registros de depuración no se habilitaron en el paso 2.b, establezca la variable de entorno `DD_TRACE_DEBUG` en `true` para la aplicación y reiníciela.

   2. Abra el archivo de registro `DD-DotNet-Profiler-Native-<Application Name>-<pid>` de la carpeta de registro predeterminada.

   3. Busque entradas `libddprof error: Failed to send profile.`: Este mensaje significa que no puede comunicarse con el agente. Asegúrese de que `DD_TRACE_AGENT_URL` esté configurado con la URL del Agent correcta. Consulte [Habilitación de la configuración del generador de perfiles .NET][5] para obtener más información.

   4. Si el mensaje `Failed to send profile` no está presente, busque las entradas `The profile was sent. Success?`.

      El siguiente mensaje significa que el perfil se ha enviado correctamente:
      ```
      true, Http code: 200
      ```

   5. Verifique los otros códigos HTTP para detectar posibles errores, como 403 para una clave de API no válida.

[5]: /es/profiler/enabling/dotnet/#configuration

{{% /tab %}}

{{< /tabs >}}

De lo contrario, active el [modo de depuración][1] y [abra un ticket de soporte][2] con los archivos de depuración y la siguiente información:
- Tipo y versión del sistema operativo (por ejemplo, Windows Server 2019 o Ubuntu 20.04).
- Tipo y versión del entorno de ejecución (por ejemplo, .NET Framework 4.8 o .NET Core 6.0).
- Tipo de aplicación (por ejemplo, aplicación web ejecutándose en IIS).


## Reduzca la sobrecarga al usar el generador de perfiles {#reduce-overhead-when-using-the-profiler}

### Evite habilitar el generador de perfiles en toda la máquina {#avoid-enabling-the-profiler-machine-wide}

Los [diferentes tipos de perfil][3] tienen una sobrecarga fija de CPU y memoria por aplicación. Generar perfiles de cada proceso en un servidor aumenta el uso total de recursos. Para reducir la sobrecarga en todas las plataformas, aumente los recursos asignados (como los núcleos de CPU) o configure `DD_PROFILING_WALLTIME_ENABLED=0`.

{{< tabs >}}

{{% tab "Linux con instrumentación de Single Step APM" %}}

Para reducir la sobrecarga al generar perfiles de múltiples procesos:

- Use `DD_PROFILING_ENABLED=auto` en lugar de `true` al habilitar la generación de perfiles en todo el servidor. Con `auto`, la generación de perfiles comienza solo cuando la aplicación se ha ejecutado durante más de 30 segundos **y** se ha creado al menos una traza.
- Utilice [reglas de instrumentación][6] para limitar qué procesos reciben SSI.
- Configure `DD_PROFILING_ENABLED=false` en un entorno de proceso específico para excluir ese proceso de la generación de perfiles. El rastreo no se ve afectado.

[6]: /es/tracing/trace_collection/single-step-apm/linux/#define-instrumentation-rules

{{% /tab %}}
{{% tab "Linux" %}}

Para reducir la sobrecarga al generar perfiles de múltiples procesos:

- Configure las variables de entorno del generador de perfiles solo en el script de inicio o en la unidad de systemd para la aplicación que desea perfilar. No las configure en la configuración del servidor compartido, como `/etc/environment` o con `systemctl set-environment`.
- En Docker, configure las variables del generador de perfiles en la definición del contenedor para la aplicación específica (Dockerfile o archivo compose). Evite las imágenes base de toda la empresa o los perfiles de shell que exportan variables del generador de perfiles a servicios no relacionados.

{{% /tab %}}
{{% tab "Windows" %}}

Para reducir la sobrecarga al generar perfiles de múltiples procesos:

- Genere perfiles solo de aplicaciones específicas configurando variables de entorno en archivos por lotes en lugar de a nivel de máquina.
- Reduzca la cantidad de grupos de IIS que se están perfilando (solo es posible en IIS 10 o versiones posteriores).

{{% /tab %}}

{{< /tabs >}}

### Containers de Linux {#linux-containers}

El valor exacto puede variar, pero el costo fijo de sobrecarga significa que la sobrecarga relativa del generador de perfiles puede ser significativa en contenedores pequeños. Para evitar esta situación, el generador de perfiles se deshabilita en contenedores con menos de un núcleo. Puede anular el umbral de un núcleo configurando la variable de entorno `DD_PROFILING_MIN_CORES_THRESHOLD` en un valor inferior a uno. Por ejemplo, un valor de `0.5` permite que el generador de perfiles se ejecute en un contenedor con al menos 0.5 núcleos. Sin embargo, en ese caso, habrá un aumento en el consumo de CPU, incluso para servicios inactivos, porque los subprocesos del generador de perfiles siempre escanean los subprocesos de la aplicación. Cuanto menor sea el núcleo disponible, más aumenta el consumo de CPU.

Deshabilitar el generador de perfiles de tiempo de pared con la configuración `DD_PROFILING_WALLTIME_ENABLED=0` disminuye el consumo de CPU por parte del generador de perfiles. Si esto no es suficiente, aumente los núcleos de CPU disponibles para sus contenedores.

### Deshabilitación del generador de perfiles {#disabling-the-profiler}

Dado que el rastreo de APM también depende de la API de perfilado de CLR, si desea dejar de recopilar perfiles de .NET pero continuar recibiendo rastreos de .NET, establezca las siguientes variables de entorno para deshabilitar solo el perfilado.

```
 DD_PROFILING_ENABLED=0 
 CORECLR_ENABLE_PROFILING=1
```

## No hay tiempo de CPU ni tiempo de pared porque la aplicación en Linux está bloqueada {#no-cpu-or-wall-time-because-the-application-on-linux-is-hung}

Si una aplicación se bloquea o deja de responder en Linux, las muestras de tiempo de CPU y tiempo de pared ya no estarán disponibles; siga estos pasos:

1. Abra el archivo de registro `DD-DotNet-Profiler-Native-<Application Name>-<pid>` en la carpeta `/var/log/datadog/dotnet`.

2. Busque `StackSamplerLoopManager::WatcherLoopIteration - Deadlock intervention still in progress for thread ...`. Si este mensaje no está presente, el resto no aplica.

3. Si se encuentra el mensaje, significa que el mecanismo de recorrido de pila podría estar bloqueado. Para investigar el problema, vuelque las pilas de llamadas de todos los hilos en la aplicación. Por ejemplo, para hacer esto con el depurador gdb:

   1. Instale gdb.

   2. Ejecute el siguiente comando:
      ```
      gdb -p <process id> -batch -ex "thread apply all bt full" -ex "detach" -ex "quit"
      ```

   3. Envíe el resultado obtenido al [Soporte de Datadog][2].


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: /es/tracing/troubleshooting/#debugging-and-logging
[2]: /es/help/
[3]: /es/profiler/profile_types/?code-lang=dotnet