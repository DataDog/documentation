---
code_lang: ddprof
code_lang_weight: 90
further_reading:
- link: /tracing/troubleshooting
  tag: Documentación
  text: Solucionar problemas de APM
title: Solucionar problemas del generador de perfiles nativo para lenguajes compilados
type: lenguaje de código múltiple
---

<div class="alert alert-warning">
<code>ddprof</code> está en fase beta. Datadog recomienda evaluar el generador de perfiles en un entorno no sensible antes de desplegarlo en producción.
</div>

## Perfiles faltantes en la página de búsqueda de perfiles

Si has configurado el generador de perfiles y no ves perfiles en la página de búsqueda de perfiles, activa la generación de logs con muchos datos (`-l debug`) y [abre un ticket de asistencia][1]. En el ticket de asistencia, incluye los archivos de log junto con la siguiente información:

- Versión del kernel Linux (`uname -r`)
- Versión de libc (`ldd --version`)
- Valor de `/proc/sys/kernel/perf_event_paranoid`
- Línea de comandos completa, incluidos los argumentos del generador de perfiles y de la aplicación

En la sección siguiente se muestran los posibles problemas de configuración.

### "\<ERROR\> Error calling perfopen on watcher"

Este error suele producirse cuando no se dispone de permisos suficientes para habilitar el generador de perfiles. La razón más común para que esto suceda es cuando las características requeridas del sistema operativo se han deshabilitado, lo que hace que la generación de perfiles falle. Normalmente se trata de una configuración a nivel de host, que no puede configurarse a nivel de un pod o contenedor individual.

La configuración de `perf_event_paranoid` para que persista en los reinicios depende de tu distribución. Intenta lo siguiente, como paso de diagnóstico:

```shell
echo 1 | sudo tee /proc/sys/kernel/perf_event_paranoid
```

**Nota**: Debe ejecutarse desde el espacio de nombres de un montaje, en el que el objeto `/proc/sys/kernel/perf_event_paranoid` existe y puede escribirse. En un contenedor, esta configuración se hereda del host.

Existen dos funciones que puedes utilizar para anular el valor de `perf_event_paranoid`:
- `CAP_SYS_ADMIN`: Añade varios permisos, por lo que puede desaconsejarse.
- `CAP_PERFMON`: Añade funciones BPF y `perf_event_open` (disponible en Linux v5.8 o posterior).

Existen algunos problemas de permisos menos comunes:
- El generador de perfiles se basa en la llamada al sistema `perf_event_open()`, que no está permitida en algunos tiempos de ejecución de contenedores. Consulte la documentación correspondiente para comprobar si este es el caso.
- Algunos perfiles seccomp prohíben `perf_event_open()`. Si tu sistema ejecuta este tipo de configuración, es posible que no puedas ejecutar el generador de perfiles.

### "\<ERROR\> Could not mmap memory for watcher

El generador de perfiles necesita memoria fija para funcionar. Este tipo de memoria está limitado por los parámetros del kernel. Puedes ver la configuración actual utilizando `ulimit -l`. Para evitar esta limitación, puedes utilizar la siguiente función:
- `CAP_IPC_LOCK`: Permite el uso de memoria bloqueada (memoria exenta de paginación).

### "\<WARNING\> Could not finalize watcher"

Puedes encontrar esta advertencia cuando el sistema es incapaz de asignar suficiente memoria bloqueada para el generador de perfiles. Esto ocurre con mayor frecuencia cuando hay demasiadas instancias del generador de perfiles activas en un determinado host, como cuando se instrumentan individualmente muchos contenedores servicios en el mismo host. Puedes resolverlo aumentando el límite de memoria de `mlock()` o reduciendo el número de aplicaciones instrumentadas.

Otras herramientas de generación de perfiles pueden contribuir al mismo límite.

### "\<WARNING\> Failure to establish connection"

Este error suele significar que el generador de perfiles no puede conectarse al Datadog Agent. Habilita la generación de logs de configuración (`--show_config`) para identificar el nombre de host y el puerto utilizados por el generador de perfiles para las cargas. Además, el contenido del mensaje de error puede transmitir el nombre de host o puerto utilizado. Compara estos valores con la configuración de tu Agent. Para obtener más información sobre cómo configurar la URL del Agent, consulta la sección de ayuda del generador de perfiles (`ddprof --help`).

## Perfiles vacíos o dispersos

La raíz de tu perfil es el marco anotado con el binario de la aplicación. Si este marco muestra una cantidad significativa de tiempo de CPU, pero no muestra ningún marco secundario, considera lo siguiente:
- Los binarios despojados no tienen símbolos disponibles. Prueba a utilizar un binario no despojado o una imagen no minificada de contenedor.
- Algunas aplicaciones y bibliotecas se benefician de la instalación de sus paquetes de depuración. Esto es válido para servicios instalados a través del gestor de paquetes de tu repositorio o similar.

Si ves `Anonymous` donde esperabas ver el nombre de tu función, es posible que estés utilizando un lenguaje interpretado o JIT. Considera la posibilidad de habilitar mapas de perfiles o la información de volcado JIT.

Tus perfiles pueden estar vacíos ("Sin tiempo de CPU informado") o contener pocos marcos. Comprueba si tu aplicación está sometida a cierta carga. El generador de perfiles sólo se activa cuando la aplicación instrumentada está programada en la CPU.

## Error al cargar bibliotecas compartidas

Cuando se utiliza el Continuous Profiler para lenguajes compilados como biblioteca dinámica, tu aplicación puede fallar al iniciar con el siguiente error:

```
error while loading shared libraries: libdd_profiling.so: cannot open shared object file: No such file or directory
```

Esto ocurre cuando tu aplicación se crea con `libdd_profiling.so` como dependencia, pero no se puede encontrar en tiempo de ejecución durante la reconciliación de dependencias. Puedes solucionarlo realizando una de las siguientes acciones:

- Vuelve a crear tu aplicación utilizando la biblioteca estática. En algunos sistemas de compilación, la elección entre bibliotecas dinámicas y estáticas puede ser ambigua, así que utiliza `ldd` para comprobar si el binario resultante incluye una dependencia dinámica no deseada en `libdd_profiling.so`.
- Copia `libdd_profiling.so` en uno de los directorios de la ruta de búsqueda para el enlazador dinámico. Puedes obtener un lista de estos directorios ejecutando `ld --verbose | grep SEARCH_DIR | tr -s ' ;' \\n` en la mayoría de los sistemas Linux.


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/help/