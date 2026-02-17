---
aliases:
- /es/tracing/profiler/enabling/linux/
- /es/tracing/profiler/enabling/ddprof/
code_lang: ddprof
code_lang_weight: 90
further_reading:
- link: getting_started/profiler
  tag: Documentación
  text: Empezando con el generador de perfiles
- link: profiler/profiler_troubleshooting/ddprof
  tag: Documentación
  text: Solucionar los problemas que surjan al utilizar el generador de perfiles
title: Activación del generador de perfiles nativo para lenguajes compilados
type: multi-code-lang
---

<div class="alert alert-danger">
<code>ddprof</code> está en fase beta. Datadog recomienda evaluar el generador de perfiles en un entorno no sensible antes de desplegarlo en producción.
</div>

El generador de perfiles nativo para lenguajes compilados (`ddprof`) utiliza APIs de nivel de sistema operativo para recopilar datos de perfiles. Es ideal para aplicaciones escritas en lenguajes compilados, como C, C++ o Rust.
Los perfiles enviados desde `ddprof` aparecen bajo el tiempo de ejecución _nativo_ en la aplicación web de Datadog.

## Requisitos

Para obtener un resumen de las versiones mínimas y recomendadas del tiempo de ejecución y del rastreador en todos los lenguajes, consulta [Versiones de lenguaje y rastreadores compatibles][7].

Sistemas operativos compatibles
: Linux (glibc o musl)

Arquitectura compatible
: procesadores `amd64` o `arm64`

Serverless
: `ddprof` no es compatible con plataformas serverless, como AWS Lambda.

Configuración del sistema operativo
: la configuración del kernel `perf_event_paranoid` es 2 o inferior (consulta [Solucionar problemas][1])

Información de depuración
: los símbolos deben estar disponibles. El generador de perfiles no puede proporcionar nombres de función legibles si la tabla de símbolos está vacía.

## Instalación

El generador de perfiles puede utilizarse como un ejecutable independiente o como biblioteca. Ve a las [instrucciones de instalación de librería](#library) si deseas utilizarlo como biblioteca.

### Independiente

1. Descarga la última [versión de `ddprof`][2]. Por ejemplo, esta es una forma de obtener la última versión para una plataforma `amd64` (también conocida como `x86_64`):

   ```bash
   curl -Lo ddprof-linux.tar.xz https://github.com/DataDog/ddprof/releases/latest/download/ddprof-amd64-linux.tar.xz
   tar xvf ddprof-linux.tar.xz
   mv ddprof/bin/ddprof INSTALLATION_TARGET
   ```

   Donde `INSTALLATION_TARGET` especifica la localización en la que deseas almacenar el archivo binario `ddprof`. En los ejemplos siguientes se asume que `INSTALLATION_TARGET` está configurado como `./ddprof`.

   Utiliza `arm64` en lugar de `amd64` para la plataforma `aarch64`.

3. Modifica tu invocación de servicio para incluir el generador de perfiles. Tu comando habitual se pasa como último argumento al ejecutable `ddprof`.
   {{< tabs >}}
{{% tab "Variables de entorno" %}}

```bash
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
./ddprof myapp --arg1 --arg2
```
**Nota**: Si sueles lanzar tu aplicación utilizando un shell builtin, por ejemplo:

```bash
exec myapp --arg1 --arg2
```

En ese caso, deberás invocar `ddprof` con esa función builtin:

```bash
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
exec ./ddprof myapp --arg1 --arg2
```

{{% /tab %}}
{{% tab "Parámetros" %}}

```bash
./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
```

**Nota**: Si sueles lanzar tu aplicación utilizando un shell builtin, por ejemplo:

```bash
exec myapp --arg1
```

En ese caso, deberás invocar `ddprof` con esa función builtin:

```bash
exec ./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
```

{{% /tab %}}
{{< /tabs >}}


5. Unos minutos después de iniciar tu aplicación, los perfiles aparecerán en la página [Datadog APM > Generador de perfiles][3].

### Biblioteca

La librería expone una API en C.

1. Descarga una versión de [ddprof][2] compatible con la librería (v0.8.0 o posterior) y extrar el archivo tar. Por ejemplo:

   ```bash
   curl -Lo ddprof-linux.tar.xz https://github.com/DataDog/ddprof/releases/latest/download/ddprof-amd64-linux.tar.xz
   tar xvf ddprof-linux.tar.xz --directory /tmp
   ```

2. En tu código, inicia el generador de perfiles utilizando la interfaz `ddprof_start_profiling()`, definida en el encabezado `_dd_profiling.h_` proporcionada por la versión. El generador de perfiles se detiene automáticamente cuando se cierra el programa. Para detener el generador de perfiles manualmente, utiliza `ddprof_stop_profiling(ms)` con el parámetro `ms` indicando el tiempo máximo de bloqueo de la función en milisegundos. Aquí encontrarás un ejemplo autónomo (`profiler_demo.c`) en C:
   ```cpp
   #include <stdlib.h>
   #include "dd_profiling.h"

   int foo(void) {
     int n = 0;
     for (int i = 0; i < 1000; i++) {
       n += 1;
     }
     return n;
   }

   int main(void) {
     // Initialize and start the Datadog profiler. Uses agent defaults if not
     // specified
     setenv("DD_ENV", "prod", 1);
     setenv("DD_SERVICE", "c_testservice", 1);
     setenv("DD_VERSION", "1.0.3", 1);
     ddprof_start_profiling();

     // Do some work
     for (int i = 0; i < 1e6; i++) {
       foo();
     }
     return 0;
   }
   ```

3. Pasa los subdirectorios `include` y `lib` del directorio extraído a tu sistema de compilación y vincúlalos con `libdd_profiling`. Para el ejemplo anterior:
   ```bash
   gcc -I/tmp/ddprof/include -L/tmp/ddprof/lib profiler_demo.c -o profiler_demo -ldd_profiling
   ```

### Despliegue de la librería compartida

La librería compartida debe estar presente en la ruta de búsqueda de la librería del sistema. De lo contrario, la aplicación no se iniciará. Usando el ejemplo de antes:
```bash
./profiler_demo
./profiler_demo: error while loading shared libraries: libdd_profiling.so: cannot open shared object file: No such file or directory
```

Evita esto enlazando con la librería estática.

#### Instalación de la librería

Añade la librería a la ruta de búsqueda copiándola en cualquier directorio de búsqueda existente. Para averiguar cuáles son tus directorios de búsqueda, en sistemas Linux, ejecuta:
```bash
ld --verbose | grep SEARCH_DIR | tr -s ' ;' \\n
```

#### Añadir un directorio de búsqueda

Utiliza la variable de entorno `LD_LIBRARY_PATH` para añadir rutas de búsqueda adicionales al enlazador del tiempo de ejecución. Por ejemplo, utilizando la distribución de directorios de antes:

```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/tmp/ddprof/lib
```

## Configuración

Los ajustes `environment`, `service` y `service_version` son recomendados, ya que son utilizados por la interfaz de usuario de perfiles.

Consulta la [lista completa de parámetros][5] o utiliza la línea de comandos.

```bash
ddprof --help
```

### Gestión de logs

Puede configurar la gestión de logs a uno de los varios endpoints:
- `stdout` imprime los logs en el flujo de salida estándar (por defecto).
- `stderr` imprime los logs en el flujo de error estándar.
- `syslog` publica los logs a syslog, intentando adherirse a la especificación en RFC 3164.
- `disable` desactiva por completo los logs.
- Cualquier otro valor se trata como una ruta de archivo, con una `/` inicial que designa una ruta absoluta.

### Global

Si deseas instrumentar todos los procesos en ejecución, puedes probar la opción `--global`.
El modo global está pensado para propósitos de depuración. Esto requiere permisos superiores. Según tu configuración, esto puede significar ejecutar como raíz, conceder `CAP_PERFMON`, `CAP_SYSADMIN`, o establecer `perf_event_paranoid` en `-1`.

```bash
./ddprof --environment staging --global --service_version full-host-profile
```

Para la mayoría de las configuraciones, esto consiste en todos los procesos visibles dentro del espacio de nombres del PID del generador de perfiles.

## ¿No sabes qué hacer a continuación?

La guía [Empezando con el generador de perfiles][6] toma un ejemplo de servicio con un problema de rendimiento y te muestra cómo utilizar Continuous Profiler para comprender y solucionar el problema.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/profiler/profiler_troubleshooting
[2]: https://github.com/DataDog/ddprof/releases
[3]: https://app.datadoghq.com/profiling
[4]: /es/getting_started/tagging/unified_service_tagging
[5]: https://github.com/DataDog/ddprof/blob/main/docs/Commands.md
[6]: /es/getting_started/profiler/
[7]: /es/profiler/enabling/supported_versions/
