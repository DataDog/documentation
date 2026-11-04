---
aliases:
- /es/tracing/languages/php
- /es/agent/apm/php/
- /es/tracing/php/
- /es/tracing/setup/php
- /es/tracing/setup_overview/php
- /es/tracing/setup_overview/setup/php
- /es/tracing/faq/php-tracer-manual-installation/
- /es/tracing/trace_collection/automatic_instrumentation/dd_libraries/php
code_lang: php
code_lang_weight: 40
further_reading:
- link: /tracing/guide/trace-php-cli-scripts/
  tag: Guía
  text: Rastreo de scripts PHP CLI
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: Blog
  text: Monitoreo de PHP con Datadog APM y rastreo distribuido
- link: https://github.com/DataDog/dd-trace-php
  tag: Código fuente
  text: Código fuente
- link: https://github.com/DataDog/dd-trace-php/blob/master/CONTRIBUTING.md
  tag: Código fuente
  text: Contribución al proyecto de código abierto
- link: /tracing/glossary/
  tag: Documentación
  text: Explore sus servicios, recursos y trazas
- link: https://learn.datadoghq.com/courses/configure-manage-apm-sdk
  tag: Centro de aprendizaje
  text: Configure y administre el SDK de APM para sus aplicaciones
title: Rastreo de aplicaciones PHP
type: multi-code-lang
---
## Requisitos de compatibilidad {#compatibility-requirements}

El requisito mínimo de versión de PHP para la última versión de `dd-trace-php` es PHP 7. Si utiliza PHP 5, aún puede usar el trazador de PHP hasta la versión [0.99](https://github.com/DataDog/dd-trace-php/releases/tag/0.99.0). PHP 5 llegó al final de su vida útil (EOL) a partir de la versión 1.0 de la biblioteca PHP.

Para obtener una lista completa de la compatibilidad de versiones y frameworks de PHP de Datadog (incluidas las versiones heredadas y de mantenimiento), consulte la página [Requisitos de compatibilidad][1].

## Primeros pasos {#getting-started}

Antes de comenzar, asegúrese de haber [instalado y configurado el Agent][14].

### Instale la extensión {#install-the-extension}

Descargue el instalador oficial:

```shell
curl -LO https://github.com/DataDog/dd-trace-php/releases/latest/download/datadog-setup.php
```

En caso de que utilice Alpine Linux, debe instalar `libgcc_s` antes de ejecutar el instalador:

```shell
apk add libgcc
```

Ejecute el instalador, pasando solo las banderas para las capacidades que desea habilitar:

```shell
# APM only
php datadog-setup.php --php-bin=all

# APM + AAP
php datadog-setup.php --php-bin=all --enable-appsec

# APM + Profiling
php datadog-setup.php --php-bin=all --enable-profiling

# Full installation: APM + AAP + Profiling
php datadog-setup.php --php-bin=all --enable-appsec --enable-profiling
```

<div class="alert alert-warning">
<strong>Nota</strong>: Solo se admite APM en Windows. No utilice las <code>--enable-appsec</code> y <code>--enable-profiling</code> banderas al rastrear aplicaciones PHP en Windows.
</div>

Este comando instala la extensión en todos los binarios de PHP encontrados en el servidor o contenedor. Si se omite `--php-bin`, el instalador se ejecuta en modo interactivo y le pide al usuario que seleccione los binarios para la instalación. El valor de `--php-bin` puede ser una ruta a un binario específico en caso de que `dd-trace-php` deba instalarse solo en dicho binario.

Reinicie PHP (PHP-FPM o el SAPI de Apache) y visite un punto de conexión de su aplicación con el rastreo habilitado. Para ver los rastreos generados, vaya a la [página de rastreos de APM][4].

Cuando no especifica `--enable-appsec`, la extensión AppSec se carga brevemente al inicio y no está habilitada de forma predeterminada. Se cortocircuita inmediatamente, lo que causa una sobrecarga de rendimiento insignificante.

<div class="alert alert-info">
Puede tomar unos minutos antes de que las trazas aparezcan en la interfaz de usuario. Si las trazas aún no aparecen después de unos minutos, cree una incidencia <a href="/tracing/troubleshooting/tracer_startup_logs?tab=php#php-info">.<code>phpinfo()</code>Página </a> desde la máquina del servidor y desplácese hacia abajo hasta `ddtrace`. Las verificaciones de diagnóstico fallidas aparecen en esta sección para ayudar a identificar cualquier problema.
</div>

<div class="alert alert-danger">
<strong>Apache ZTS:</strong>
Si el binario de PHP CLI está compilado como NTS (no seguro para subprocesos), mientras que Apache utiliza una versión ZTS (segura para subprocesos de Zend) de PHP, debe cambiar manualmente la carga de la extensión para el binario ZTS. Ejecute <code>/path/to/php-zts --ini</code> para encontrar dónde se encuentra el archivo de Datadog, <code>.ini</code> luego agregue el <code>-zts</code> sufijo del nombre del archivo. Por ejemplo, desde <code>extension=ddtrace-20210902.so</code> a <code>extension=ddtrace-20210902-zts.so</code>.
</div>

<div class="alert alert-danger">
<strong>SELinux:</strong>
Si las políticas de SELinux de httpd están configuradas en el servidor, la funcionalidad del SDK puede ser limitada, a menos que se permita explícitamente la escritura y ejecución de archivos temporales en la configuración de SELinux:

`allow httpd_t httpd_tmpfs_t:file { execute execute_no_trans };`

</div>

## Instrumentación automática {#automatic-instrumentation}

El rastreo se habilita automáticamente de forma predeterminada. Una vez instalada la extensión, **ddtrace** rastrea su aplicación y envía las trazas al Agent.

Datadog admite todos los marcos web de forma inmediata. La instrumentación automática funciona modificando el tiempo de ejecución de PHP para envolver ciertas funciones y métodos con el fin de rastrearlos. El rastreador de PHP admite la instrumentación automática para varias bibliotecas.

La instrumentación automática captura:

* Tiempo de ejecución del método
* Datos de traza relevantes, como URL y códigos de respuesta de estado para solicitudes web o consultas SQL para acceso a bases de datos
* Excepciones no controladas, incluyendo seguimientos de pila si están disponibles
* Un conteo total de trazas (por ejemplo, solicitudes web) que fluyen a través del sistema

## Configuración {#configuration}

Si es necesario, configure el SDK para enviar datos de telemetría de rendimiento de la aplicación según lo requiera, incluyendo la configuración de Unified Service Tagging. Lea [Configuración de la biblioteca][6] para obtener detalles.

Para controlar la ingesta de trazas por servicio o recurso (incluyendo el uso de comodines en los nombres de recursos), consulte [Controlar la ingesta de trazas con muestreo basado en recursos][15].

## Rastreo de scripts CLI de ejecución corta y larga {#tracing-short-and-long-running-cli-scripts}

Se requieren pasos adicionales para instrumentar scripts CLI. Lea [Rastreo de scripts PHP CLI][7] para obtener más información.

## Actualización {#upgrading}

Para actualizar el rastreador de PHP, [descargue la versión más reciente][5] y siga los mismos pasos que para [instalar la extensión](#install-the-extension).

Una vez completada la instalación, reinicie PHP (PHP-FPM o el SAPI de Apache).

**Nota**: Si está utilizando almacenamiento en caché de segundo nivel en OPcache configurando el parámetro `opcache.file_cache`, elimine la carpeta de caché.

## Eliminando {#removing}

Para eliminar el rastreador de PHP:

1. Para php-fpm, detenga el servicio php-fpm; de lo contrario, detenga el servidor web Apache.
2. Desvincule los archivos `98-ddtrace.ini` y `99-ddtrace-custom.ini` de su carpeta de configuración de PHP.
3. Para PHP-FPM, reinicie el servicio PHP-FPM; de lo contrario, reinicie el servidor web Apache.

**Nota**: Si está utilizando almacenamiento en caché de segundo nivel en OPcache configurando el parámetro `opcache.file_cache`, elimine la carpeta de caché.

## Solución de problemas de un bloqueo de la aplicación {#troubleshooting-an-application-crash}

En el caso inusual de un bloqueo de la aplicación causado por el rastreador de PHP, generalmente debido a un error de segmentación, lo mejor que puede hacer es obtener un volcado de memoria o una traza de Valgrind y contactar al soporte de Datadog.

### Instalar símbolos de depuración {#install-debug-symbols}

Para que los volcados de memoria sean legibles, los símbolos de depuración para los binarios de PHP deben estar instalados en el sistema que ejecuta PHP.

Para verificar si los símbolos de depuración están instalados para PHP o PHP-FPM, use `gdb`.

Instalar `gdb`:

```
apt|yum install -y gdb
```

Ejecute `gdb` con el binario de interés. Por ejemplo, para PHP-FPM:

```
gdb php-fpm
```

Si la salida de `gdb` contiene una línea similar al texto a continuación, entonces los símbolos de depuración ya están instalados.

```
...
Reading symbols from php-fpm...Reading symbols from /usr/lib/debug/path/to/some/file.debug...done.
...
```

Si la salida de `gdb` contiene una línea similar al texto a continuación, entonces los símbolos de depuración deben instalarse:

```
...
Reading symbols from php-fpm...(no debugging symbols found)...done.
...
```


#### Centos {#centos}

Instale el paquete `yum-utils` que proporciona el programa `debuginfo-install`:

```
yum install -y yum-utils
```

Encuentre el nombre del paquete para sus binarios de PHP, puede variar dependiendo del método de instalación de PHP:

```
yum list installed | grep php
```

Instale los símbolos de depuración. Por ejemplo para el paquete `php-fpm`:

```
debuginfo-install -y php-fpm
```

**Nota**: Si el repositorio que proporciona los binarios de PHP no está habilitado de forma predeterminada, puede habilitarse al ejecutar el comando `debuginfo-install`. Por ejemplo:

```
debuginfo-install --enablerepo=remi-php74 -y php-fpm
```

#### Debian {#debian}

##### PHP instalado desde el Sury Debian DPA {#php-installed-from-the-sury-debian-dpa}

Si PHP se instaló desde el [Sury Debian DPA][8], los símbolos de depuración ya están disponibles desde el DPA. Por ejemplo, para PHP-FPM 7.2:

```
apt update
apt install -y php7.2-fpm-dbgsym
```

##### PHP instalado desde un paquete diferente {#php-installed-from-a-different-package}

El proyecto Debian mantiene una página wiki con [instrucciones para instalar símbolos de depuración][9].

Edite el archivo `/etc/apt/sources.list`:

```
# ... leave here all the pre-existing packages

# add a `deb` deb http://deb.debian.org/debian-debug/ $RELEASE-debug main
# For example for buster
deb http://deb.debian.org/debian-debug/ buster-debug main
```

Actualice `apt`:

```
apt update
```

Intente primero con nombres de paquetes canónicos para los símbolos de depuración. Por ejemplo, si el nombre del paquete es `php7.2-fpm` intente:

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

Si no se pueden encontrar los símbolos de depuración, utilice la herramienta de utilidad `find-dbgsym-packages`. Instale el binario:

```
apt install -y debian-goodies
```

Intente encontrar los símbolos de depuración ya sea desde la ruta completa al binario o desde el id de proceso de un proceso en ejecución:

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Instale el nombre del paquete resultante, si se encuentra:

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

#### Ubuntu {#ubuntu}

##### PHP instalado desde `ppa:ondrej/php` {#php-installed-from-ppaondrejphp}

Si PHP se instaló desde el [`ppa:ondrej/php`][10], edite el archivo fuente apt `/etc/apt/sources.list.d/ondrej-*.list` añadiendo el componente `main/debug`.

Antes:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main```

Después:

```deb http://ppa.launchpad.net/ondrej/php/ubuntu <version> main main/debug```

Actualice e instale los símbolos de depuración. Por ejemplo, para PHP-FPM 7.2:

```
apt update
apt install -y php7.2-fpm-dbgsym
```
##### PHP instalado desde un paquete diferente {#php-installed-from-a-different-package-1}

Encuentre el nombre del paquete para sus binarios de PHP, puede variar dependiendo del método de instalación de PHP:

```
apt list --installed | grep php
```

**Nota**: En algunos casos `php-fpm` puede ser un metapaquete que hace referencia al paquete real, por ejemplo `php7.2-fpm` en el caso de PHP-FPM 7.2. En este caso, el nombre del paquete es el último.

Intente primero con nombres de paquetes canónicos para los símbolos de depuración. Por ejemplo, si el nombre del paquete es `php7.2-fpm` intente:

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

Si no se pueden encontrar los paquetes `-dbg` y `-dbgsym`, habilite los repositorios `ddebs`. Puede encontrar información detallada sobre cómo [instalar símbolos de depuración][11] desde `ddebs` en la documentación de Ubuntu.

Por ejemplo, para Ubuntu 18.04+, habilite el repositorio `ddebs`:

```
echo "deb http://ddebs.ubuntu.com $(lsb_release -cs) main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list

echo "deb http://ddebs.ubuntu.com $(lsb_release -cs)-updates main restricted universe multiverse" | tee -a /etc/apt/sources.list.d/ddebs.list
```

Importe la clave de firma (asegúrese de que la [clave de firma sea correcta][12]):

```
apt install ubuntu-dbgsym-keyring
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys <SIGNING KEY FROM UBUNTU DOCUMENTATION>
apt update
```

Intente agregar los nombres de paquete canónicos para los símbolos de depuración. Por ejemplo, si el nombre del paquete es `php7.2-fpm` intente:

```
apt install -y php7.2-fpm-dbgsym

# if the above does not work

apt install -y php7.2-fpm-dbg
```

En caso de que no se puedan encontrar los símbolos de depuración, utilice la herramienta de utilidad `find-dbgsym-packages`. Instale el binario:

```
apt install -y debian-goodies
```

Intente encontrar los símbolos de depuración ya sea desde la ruta completa al binario o desde el id de proceso de un proceso en ejecución:

```
find-dbgsym-packages /usr/sbin/php-fpm7.2
```

Instale el nombre del paquete resultante, si se encuentra:

```
apt install -y php7.2-fpm-{package-name-returned-by-find-dbgsym-packages}
```

### Obtención de un volcado de memoria {#obtaining-a-core-dump}

Obtener un volcado de memoria para aplicaciones PHP puede ser complicado, especialmente en PHP-FPM. Aquí hay algunos consejos para ayudarle a obtener un volcado de memoria:

1. Determine si PHP-FPM generó un volcado de memoria buscando en el registro de errores de la aplicación:
   - Busque `(SIGSEGV - core dumped)` porque un mensaje como este significa que se ha volcado: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV - core dumped) after <duration> seconds from start`.
   - Busque `(SIGSEGV)` porque un mensaje como este indica que no se ha generado un volcado de memoria: `WARNING: [pool www] child <pid> exited on signal 11 (SIGSEGV) after <duration> seconds from start`.
1. Localice el volcado de memoria ejecutando `cat /proc/sys/kernel/core_pattern`. El valor predeterminado es normalmente `core`, lo que significa que se generará un archivo llamado `core` en la carpeta raíz web.

Si no se generó ningún volcado de memoria, verifique las siguientes configuraciones y cámbielas según sea necesario:

1. Si `/proc/sys/kernel/core_pattern` contiene una ruta que incluye directorios anidados, asegúrese de que la ruta completa del directorio exista.
1. Si el usuario que ejecuta los trabajadores del grupo PHP-FPM es distinto de `root` (un nombre de usuario común es `www-data`), otorgue a ese usuario permisos de escritura en el directorio de volcados de memoria.
1. Asegúrese de que el valor de `/proc/sys/fs/suid_dumpable` no sea `0`. Establézcalo en `1` o `2` a menos que ejecute el grupo de trabajadores PHP-FPM como `root`. Verifique sus opciones con su administrador del sistema.
1. Asegúrese de tener un `rlimit_core` adecuado en la sección de configuración del grupo PHP-FPM. Puede establecerlo como ilimitado: `rlimit_core = unlimited`.
1. Asegúrese de tener un `ulimit` adecuado configurado en su sistema. Puede establecerlo como ilimitado: `ulimit -c unlimited`.
1. Si su aplicación se ejecuta en un contenedor Docker, los cambios en `/proc/sys/*` deben realizarse en el servidor. Comuníquese con su administrador del sistema para conocer las opciones disponibles para usted. Si puede, intente recrear el problema en sus entornos de prueba o de ensayo.

### Obtención de un volcado de memoria desde dentro de un contenedor Docker {#obtaining-a-core-dump-from-within-a-docker-container}

Utilice la información a continuación para ayudar a obtener un volcado de memoria en un contenedor Docker:

1. El contenedor Docker debe ejecutarse como un contenedor privilegiado, y el valor `ulimit` para los archivos de volcado de memoria debe establecerse en su máximo como se muestra en los ejemplos a continuación.
   - Si utiliza el comando `docker run`, agregue los argumentos `--privileged` y `--ulimit core=99999999999`
   - Si utiliza `docker compose`, agregue lo siguiente al archivo `docker-compose.yml`:

```yaml
privileged: true
ulimits:
  core: 99999999999
```
2. Al ejecutar el contenedor (y antes de iniciar la aplicación PHP) debe ejecutar los siguientes comandos:

```
ulimit -c unlimited
echo '/tmp/core' > /proc/sys/kernel/core_pattern
echo 1 > /proc/sys/fs/suid_dumpable
```

### Obtención de una traza de Valgrind {#obtaining-a-valgrind-trace}

Para obtener más detalles sobre el bloqueo, ejecute la aplicación con Valgrind. A diferencia de los volcados de memoria, este enfoque siempre funciona en un contenedor sin privilegios.

<div class="alert alert-warning">
<strong>Nota</strong>: Una aplicación que se ejecuta a través de Valgrind es órdenes de magnitud más lenta que cuando se ejecuta de forma nativa. Este método se recomienda para entornos no productivos.
</div>

Instale Valgrind con su administrador de paquetes. Ejecute la aplicación con Valgrind lo suficiente como para generar algunas solicitudes.

Para una aplicación de CLI, ejecute:
{{< code-block lang=shell >}}
USE_ZEND_ALLOC=0 valgrind -- php path/to/script.php
{{< /code-block >}}
Al ejecutar `php-fpm` ejecute:
{{< code-block lang="shell" >}}
USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}
Cuando use Apache, ejecute:
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; USE_ZEND_ALLOC=0 valgrind --trace-children=yes -- apache2 -X)`
{{< /code-block >}}

La traza de Valgrind resultante se imprime de forma predeterminada en el error estándar; siga la [documentación oficial][13] para imprimir en un destino diferente. La salida esperada es similar al ejemplo siguiente para un proceso PHP-FPM:

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

### Obtención de un strace {#obtaining-a-strace}

Algunos problemas son causados por factores externos, por lo que puede ser valioso tener un `strace`.

<div class="alert alert-warning">
<strong>Nota</strong>: Una aplicación que se ejecuta a través de <code>strace</code> es órdenes de magnitud más lenta que cuando se ejecuta de forma nativa. Este método se recomienda para entornos no productivos.
</div>

Instale `strace` con su administrador de paquetes. Al generar un `strace` para enviarlo al soporte de Datadog, asegúrese de usar la opción `-f` para seguir los procesos secundarios.

Para una aplicación de CLI, ejecute:
{{< code-block lang="shell" >}}
strace -f php path/to/script.php
{{< /code-block >}}

Para `php-fpm`, ejecute:
{{< code-block lang="shell" >}}
strace -f php-fpm -F --fpm-config <CONFIG_FILE_PATH> <MORE_OPTIONS>
{{< /code-block >}}

Para Apache, ejecute:
{{< code-block lang="shell" >}}
(. /etc/apache2/envvars; strace -f apache2 -X)
{{< /code-block >}}

## Lecturas adicionales {#further-reading}

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
[15]: /es/tracing/guide/resource_based_sampling/