---
aliases:
- /es/tracing/languages/php
- /es/agent/apm/php/
- /es/tracing/PHP/
- /es/tracing/setup/php
- /es/tracing/setup_overview/php
- /es/tracing/setup_overview/setup/php
- /es/tracing/faq/php-tracer-manual-installation/
- /es/tracing/trace_collection/dd_libraries/php/
code_lang: php
code_lang_weight: 40
further_reading:
- link: /tracing/guide/trace-php-cli-scripts/
  tag: Guía
  text: Rastreo de scripts CLI en PHP
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: Blog
  text: Monitorización PHP con Datadog APM y rastreo distribuido
- link: https://github.com/DataDog/dd-trace-php
  tag: Código fuente
  text: Código fuente
- link: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
  tag: Código fuente
  text: Contribuir al proyecto de código abierto
- link: /tracing/glossary/
  tag: Documentación
  text: Explorar tus servicios, recursos y trazas (traces)
kind: documentation
title: Rastreo de aplicaciones PHP
type: lenguaje de código múltiple
---
## Requisitos de compatibilidad

El requisito mínimo de versión de PHP para la última versión de `dd-trace-php` es PHP 7. Si estás utilizando PHP 5, puedes seguir utilizando el rastreador PHP hasta la versión [0.99](https://github.com/DataDog/dd-trace-php/releases/tag/0.99.0). PHP 5 es EOL a partir de la versión 1.0 de PHP biblioteca.

Para consultar la lista completa de compatibilidades de versiones PHP y de marcos de trabajo Datadog (incluyendo las versiones heredadas y de mantenimiento), consulta la página de [requisitos de compatibilidad][1].

## Para empezar

Antes de empezar, asegúrate de haber [instalado y configurado el Agent][14].

### Instalación de la extensión

Descarga el instalador oficial:

```shell
curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
```

Si utilizas Alpine Linux, debes instalar `libgcc_s` antes de ejecutar el instalador:

```shell
apk add libgcc
```

Ejecuta el instalador:

```shell
# Instalación completa: APM + ASM + Generación de perfiles
php datadog-setup.php --php-bin=all --enable-appsec --enable-profiling

# Sólo APM
php datadog-setup.php --php-bin=all

# APM + ASM
php datadog-setup.php --php-bin=all --enable-appsec

# APM + Generación de perfiles (Beta)
php datadog-setup.php --php-bin=all --enable-profiling
```

<div class="alert alert-danger">
<strong>Nota</strong>: Windows sólo es compatible con APM. No utilices las marcas <code>--enable-appsec</code> y <code>--enable-profiling</code> cuando rastrees aplicaciones PHP en Windows.
</div>

Este comando instala la extensión a todos los binarios PHP que se encuentran en el host o el contenedor. Si `--PHP-bin` se omite, el instalador ejecuta el modo interactivo y pide al usuario que seleccione los binarios para la instalación. El valor de `--PHP-bin` puede ser una ruta a un binario específico en caso de que `dd-rastrear-PHP` sólo deba instalarse en dichos binarios.

Reinicia PHP (PHP-FPM o SAPI de Apache) y visita un endpoint de tu aplicación, habilitado para el rastreo. Para ver las trazas generadas, ve a la [página de trazas APM][4].

Cuando no especificas `--enable-appsec`, la extensión AppSec se carga poco después del inicio y no está activada por defecto. Se cortocircuita inmediatamente, causando una sobrecarga de rendimiento insignificante.

<div class="alert alert-info">
<strong>Nota:</strong>
Pueden pasar unos minutos hasta que aparezcan trazas en la interfaz de usuario. Si las trazas siguen sin aparecer después de unos minutos, crea una página <a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info"><code>phpinfo()</code></a> desde la máquina host y desplázate hacia abajo hasta `ddtrace`. En esta sección aparecen los checks de diagnóstico fallidos para ayudarte a identificar cualquier problema.
</div>

<div class="alert alert-warning">
<strong>Apache ZTS:</strong>
Si el binario CLI PHP se ha creado como NTS (non thread-safe), mientras que Apache utiliza una versión ZTS (Zend thread-safe) de PHP, necesitas cambiar manualmente la carga de extensión del binario ZTS. Ejecuta <code>/path/to/php-zts --ini</code> para ver dónde se encuentra el archivo <code>.ini</code> de Datadog, luego añade el sufijo <code>-zts</code> del nombre del archivo. Por ejemplo, de <code>extension=ddtrace-20210902.so</code> a <code>extension=ddtrace-20210902-zts.so</code>.
</div>

<div class="alert alert-warning">
<strong>SELinux:</strong>
Si las políticas SELinux de httpd están configuradas en el host, la funcionalidad del rastreador puede estar limitada, a menos que la escritura y la ejecución de archivos temporales esté explícitamente permitida en la configuración de SELinux:

`allow httpd_t httpd_tmpfs_t:file { execute execute_no_trans };`

</div>

## Instrumentación automática

El rastreo se activa automáticamente por defecto. Una vez instalada la extensión, **ddtrace** rastrea tu aplicación y envía trazas al Agent.

Datadog es compatible con todos los marcos de trabajo web listos para utilizar. La instrumentación automática funciona modificando el tiempo de ejecución de PHP para envolver ciertas funciones y métodos para rastrearlas. El rastreador PHP admite la instrumentación automática para varias bibliotecas.

Capturas de instrumentación automática:

* Tiempo de ejecución del método
* Datos de rastreo pertinentes, como códigos de respuesta URL y de estado para solicitudes web o consultas SQL para el acceso a bases de datos.
* Excepciones no controladas, incluyendo trazas de stacks tecnológicos, si están disponibles
* Recuento total de trazas (por ejemplo, solicitudes web) que circulan por el sistema

## Configuración

Si es necesario, configura la biblioteca de rastreo para enviar datos de telemetría del rendimiento de la aplicación, según tus necesidades, incluyendo la configuración del etiquetado unificado de servicios. Para obtener más detalles, consulta la [configuración de bibliotecas][6].

## Rastreo de scripts de CLI de corta y larga ejecución

Se requieren pasos adicionales para instrumentar scripts de CLI. Para obtener más información, consulta [Rastreo de scripts de CLI PHP][7].

## Actualización

Para actualizar el rastreador PHP, [descarga la última versión][5] y sigue los mismos pasos que para [instalar la extensión](#install-the-extension).

Una vez finalizada la instalación, reinicia PHP (PHP-FPM o SAPI de Apache).

**Nota**: Si estás utilizando caché de segundo nivel en OPcache configurando el parámetro `opcache.file_cache`, elimina la carpeta de caché.

## Eliminación

Para eliminar el rastreador PHP:

1. Para php-fpm, detén el servicio php-fpm, si no, detén el servidor web Apache.
2. Desvincula los archivos `98-ddtrace.ini` y `99-ddtrace-custom.ini` de tu carpeta de configuración PHP.
3. Para php-fpm, reinicia el servicio php-fpm, si no, reinicia el servidor web Apache.

**Nota**: Si estás utilizando caché de segundo nivel en OPcache configurando el parámetro `opcache.file_cache`, elimina la carpeta de caché.

## Solucionar problemas de fallos de una aplicación

En el caso inusual de un fallo de la aplicación causado por el rastreador PHP, normalmente debido a un fallo de segmentación, lo mejor es lograr un volcado de núcleo o una traza Valgrind y ponerse en contacto con el servicio de asistencia de Datadog.

### Instalación de símbolos de depuración

Para que los volcados de núcleo sean legibles, los símbolos de depuración de los binarios PHP deben estar instalados en el sistema que ejecuta PHP.

Para comprobar si están instalados los símbolos de depuración para PHP o PHP-FPM, utiliza `gdb`.

Instala `gdb`:

```
apt|yum install -y gdb
```

Ejecuta `gdb` con el binario de interés. Por ejemplo, para PHP-FPM:

```
gdb php-fpm
```

Si el resultado de `gdb` contiene una línea similar al texto siguiente, entonces los símbolos de depuración ya están instalados.

```
...
Reading symbols from php-fpm...Reading symbols from /usr/lib/debug/path/to/some/file.debug...done.
...
```

Si el resultado de `gdb` contiene una línea similar al texto siguiente, entonces los símbolos de depuración deben instalarse.

```
...
Reading symbols from php-fpm...(no debugging symbols found)...done.
...
```


#### CentOS

Instala el paquete `yum-utils` que proporciona el programa `debuginfo-install`:

```
yum install -y yum-utils
```

Busca el nombre de paquete de tus binarios PHP. Puede variar dependiendo del método de instalación de PHP:

```
yum list installed | grep php
```

Instala los símbolos de depuración. Por ejemplo, para el paquete `php-fpm` :

```
debuginfo-install -y php-fpm
```

**Nota**: Si el repositorio que proporciona los binarios PHP no está habilitado por defecto, puede habilitarse al ejecutar el comando `debuginfo-install`. Por ejemplo:

```
debuginfo-install --enablerepo=remi-php74 -y php-fpm
```

#### Debian

##### PHP instalado desde el DPA Debian Sury

Si PHP se ha instalado desde el [DPA Debian Sury][8], los símbolos de depuración ya están disponibles en el DPA. Por ejemplo, para PHP-FPM 7.2:

```
apt update
apt install -y php7.2-fpm-dbgsym
```

##### PHP instalado desde un paquete diferente

El proyecto Debian tiene una página wiki con las [instrucciones para instalar símbolos de depuración][9].

Edita el archivo `/etc/apt/sources.list`:

```
# ... dejar aquí todos los paquetes preexistentes

# añadir un `deb` deb http://deb.Debian.org/Debian-debug/ $RELEASE-debug main
# Por ejemplo para buster
deb http://deb.Debian.org/Debian-debug/ buster-debug main
```

Actualiza `apt`:

```
apt update
```

Prueba primero nombres canónicos de paquetes para los símbolos de depuración. Por ejemplo, si el nombre del paquete es `php7.2-fpm`, intenta:

```
apt install -y php7.2-fpm-dbgsym

# si lo anterior no funciona

apt install -y php7.2-fpm-dbg
```

Si no encuentras símbolos de depuración, utiliza la herramienta `find-dbgsym-packages`. Instala el binario:

```
apt install -y debian-goodies
```

Intenta encontrar símbolos de depuración desde la ruta completa al binario o desde el identificador de procesos de un proceso en ejecución:

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Instala el nombre de paquete resultante, si lo encuentras:

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

#### Ubuntu

##### PHP instalado desde `ppa:ondrej/php`

Si PHP se ha instalado desde [`ppa:ondrej/php`][10], edita el archivo fuente apt `/etc/apt/sources.list.d/ondrej-*.list` añadiendo el componente `main/debug`.

Antes:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main```

Después:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main main/debug```

Actualiza e instale los símbolos de depuración. Por ejemplo, para PHP-FPM 7.2:

```
apt update
apt install -y php7.2-fpm-dbgsym
```
##### PHP instalado desde un paquete diferente

Busca el nombre de paquete de tus binarios PHP. Puede variar dependiendo del método de instalación de PHP:

```
apt list --installed | grep php
```

**Nota**: En algunos casos `php-fpm` puede ser un metapaquete que hace referencia al paquete real, por ejemplo `php7.2-fpm` en el caso de PHP-FPM 7.2. En este caso, el nombre de paquete es este último.

Prueba primero nombres canónicos de paquetes para los símbolos de depuración. Por ejemplo, si el nombre del paquete es `php7.2-fpm`, intenta:

```
apt install -y php7.2-fpm-dbgsym

# si lo anterior no funciona

apt install -y php7.2-fpm-dbg
```

Si los paquetes `-dbg` y `-dbgsym` no se pueden encontrar, habilita los respositorios `ddebs`. Para obtener información detallada sobre cómo [instalar símbolos de depuración][11] desde los `ddebs`, consulta la documentación de Ubuntu.

Por ejemplo, para Ubuntu v18.04 y posterior, habilita el repositorio `ddebs`:

```
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list

echo "deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list
```

Importa la clave de firma (asegúrate de que la [clave de firma es correcta][12]):

```
apt install ubuntu-dbgsym-keyring
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <SIGNING KEY FROM UBUNTU DOCUMENTATION>
apt update
```

Intenta añadir nombres canónicos de paquetes para los símbolos de depuración. Por ejemplo, si el nombre del paquete es `php7.2-fpm`, intenta:

```
apt install -y php7.2-fpm-dbgsym

# si lo anterior no funciona

apt install -y php7.2-fpm-dbg
```

Si no encuentras símbolos de depuración, utiliza la herramienta `find-dbgsym-packages`. Instala el binario:

```
apt install -y debian-goodies
```

Intenta encontrar símbolos de depuración desde la ruta completa al binario o desde el identificador de procesos de un proceso en ejecución:

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Instala el nombre de paquete resultante, si lo encuentras:

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

### Obtener un volcado de núcleo

Obtener un volcado de núcleo para aplicaciones PHP puede ser complicado, especialmente en PHP-FPM. Aquí tienes algunos consejos para ayudarte a obtener un volcado de núcleo:

1. Determina si PHP-FPM ha generado un volcado de núcleo consultando el log de errores de aplicación:
   - Busca `(SIGSEGV - core dumped)`, ya que un mensaje como este significa que el núcelo ha sido volcado: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV - core dumped) after <duration> seconds from start`.
   - Busca , ya que un mensaje como éste indica que el núcleo no ha sido volcado: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV) after <duration> seconds from start`.
1. Localiza el volcado de núcleo ejecutando `cat /proc/sys/kernel/core_pattern`. El valor por defecto suele ser `core`, lo que significa que se generará un archivo llamado `core` en la carpeta raíz de la web.

Si no se ha generado ningún volcado de núcleo, comprueba las siguientes configuraciones y cámbielas, si es necesario:

1. Si `/proc/sys/kernel/core_pattern` contiene una ruta que incluye directorios anidados, asegúrate de que existe la ruta completa del directorio.
1. Si el usuario que ejecuta el pool de trabajadores PHP-FPM no es `root` (un nombre de usuario común es `www-data`), proporciónale permisos de escritura en el directorio de volcados de núcleo.
1. Asegúrate de que el valor de `/proc/sys/fs/suid_dumpable` no es `0`. Configúralo en `1` o `2`, a menos que ejecutes pool de trabajadores PHP-FPM como `root`. Consulta tus opciones con el administrador del sistema.
1. Asegúrate de que tienes un `rlimit_core` adecuado en la sección de configuración del pool PHP-FPM. Puedes configurarlo como ilimitado: `rlimit_core = unlimited`.
1. Asegúrate de que dispones de un conjunto `ulimit` en tu sistema. Puedes configurarlo como ilimitado: `ulimit -c unlimited`.
1. Si tu aplicación se ejecuta en un contenedor Docker, los cambios en `/proc/sys/*` deben realizarse en la máquina host. Ponte en contacto con el administrador del sistema para conocer las opciones disponibles. Si puedes, intenta recrear la incidencia en tus entornos de test o de staging.

### Obtener un volcado de núcleo desde dentro de un contenedor Docker

Utiliza la siguiente información para ayudarte a obtener un volcado de núcleo en un contenedor Docker:

1. El contenedor Docker necesita ejecutarse como contenedor privilegiado y el valor `ulimit` para los archivos del núcleo necesita ser ajustado a su máximo, como se muestra en los siguientes ejemplos.
   - Si utilizas el comando `docker run`, añade los argumentos `--privileged` y `--ulimit core=99999999999`.
   - Si utilizas `docker compose`, añade los siguiente al archivo `docker-compose.yml`:
```yaml
privileged: true
ulimits:
  core: 99999999999
```
2. Cuando ejecutes el contenedor (y antes de iniciar la aplicación PHP), debes ejecutar los siguientes comandos:
```
ulimit -c unlimited
echo '/tmp/core' > /proc/sys/kernel/core_pattern
echo 1 > /proc/sys/fs/suid_dumpable
```

### Obtener una traza Valgrind

Para obtener más detalles sobre el fallo, ejecuta la aplicación con Valgrind. A diferencia de los volcados de núcleo, este método siempre opera en un contenedor sin privilegios.

<div class="alert alert-danger">
<strong>Nota</strong>: Una aplicación que se ejecuta a través de Valgrind es órdenes de magnitud más lenta que cuando se ejecuta de forma nativa. Se recomienda este método para entornos que no son de producción.
</div>

Instala Valgrind con tu gestor de paquetes. Ejecuta la aplicación con Valgrind lo suficiente para generar unas cuantas solicitudes.

For a CLI application, run:
{{< code-block lang=shell >}}
USE_ZEND_ALLOC=0 valgrind -- php path/to/script.php
{{< /code-block >}}
When running `php-fpm` run:
{{< code-block lang="shell" >}}
USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}
When using Apache, run:
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- apache2 -X)`
{{< /code-block >}}

La traza de Valgrind resultante se imprime por defecto en el error estándar. Para imprimir en un destino diferente, consulta la [documentación oficial][13]. El resultado esperado es similar al ejemplo siguiente para un proceso PHP-FPM:

```
==322== Conditional jump or move depends on uninitialised value(s)
==322==    at 0x41EE82: zend_string_equal_val (zend_string.c:403)
==322==    ...
==322==    ...
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV): dumping core
==322==    at 0x73C8657: kill (syscall-template.S:81)
==322==    by 0x1145D0F2: zif_posix_kill (posix.c:468)
==322==    by 0x478BFE: ZEND_DO_ICALL_SPEC_RETVAL_UNUSED_HANDLER (zend_vm_execute.h:1269)
==322==    by 0x478BFE: execute_ex (zend_vm_execute.h:53869)
==322==    by 0x47D9B0: zend_execute (zend_vm_execute.h:57989)
==322==    by 0x3F6782: zend_execute_scripts (zend.c:1679)
==322==    by 0x394F0F: php_execute_script (main.c:2658)
==322==    by 0x1FFE18: main (fpm_main.c:1939)
==322==
==322== Process terminating with default action of signal 11 (SIGSEGV)
==322==    ...
==322==    ...
==322==
==322== HEAP SUMMARY:
==322==     in use at exit: 3,411,619 bytes in 22,428 blocks
==322==   total heap usage: 65,090 allocs, 42,662 frees, 23,123,409 bytes allocated
==322==
==322== LEAK SUMMARY:
==322==    definitely lost: 216 bytes in 3 blocks
==322==    indirectly lost: 951 bytes in 32 blocks
==322==      possibly lost: 2,001,304 bytes in 16,840 blocks
==322==    still reachable: 1,409,148 bytes in 5,553 blocks
==322==                       of which reachable via heuristic:
==322==                         stdstring          : 384 bytes in 6 blocks
==322==         suppressed: 0 bytes in 0 blocks
==322== Rerun with --leak-check=full to see details of leaked memory
==322==
==322== Use --track-origins=yes to see where uninitialised values come from
==322== For lists of detected and suppressed errors, rerun with: -s
==322== ERROR SUMMARY: 18868 errors from 102 contexts (suppressed: 0 from 0)
```

### Obtener un strace

Algunos problemas son causados por factores externos, por lo que puede ser valioso disponer de un `strace`.

<div class="alert alert-danger">
<strong>Nota</strong>: Una aplicación que se ejecuta a través de <code>straces</code> es órdenes de magnitud más lenta que cuando se ejecuta de forma nativa. Se recomienda este método para entornos que no son de producción.
</div>

Instala el `strace` con tu gestor de paquetes. Cuando generes un `strace` para enviarlo al servicio de asistencia de Datadog, asegúrate de utilizar la opción `-f` para seguir a procesos secundarios.

Para una aplicación CLI, ejecuta:
{{< code-block lang="shell" >}}
strace -f php path/to/script.php
{{< /code-block >}}

Para `php-fpm`, ejecute:
{{< code-block lang="shell" >}}
strace -f PHP-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}

Para Apache, ejecuta:
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; strace -f apache2 -X)
{{< /code-block >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/compatibility_requirements/php
[2]: https://app.datadoghq.com/apm/service-setup
[3]: /es/tracing/glossary/
[4]: https://app.datadoghq.com/apm/traces
[5]: https://github.com/DataDog/dd-trace-php/releases
[6]: /es/tracing/trace_collection/library_config/php/
[7]: /es/tracing/guide/trace-php-cli-scripts/
[8]: https://packages.sury.org/php/
[9]: https://wiki.debian.org/HowToGetABacktrace
[10]: https://launchpad.net/~ondrej/+archive/ubuntu/php
[11]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages
[12]: https://wiki.ubuntu.com/Debug%20Symbol%20Packages#Getting_-dbgsym.ddeb_packages
[13]: https://valgrind.org/docs/manual/manual-core.html#manual-core.comment
[14]: /es/tracing/trace_collection/automatic_instrumentation/?tab=datadoglibraries#install-and-configure-the-agent