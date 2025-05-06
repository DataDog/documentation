---
description: Scripts auxiliares y atributos del Linux Agent para las reglas de CSM
  Threats
disable_edit: true
further_reading:
- link: /security/cloud_workload_security/getting_started/
  tag: Documentación
  text: Empezando con Datadog CSM Threats
title: Scripts auxiliares y atributos del Linux Agent
---
<!--  EXTRAÍDO DE https://github.com/DataDog/datadog-agent -->


<!-- ESTE ARCHIVO SE GENERA AUTOMÁTICAMENTE. EDÍTALO EN LA CARPETA SCRIPTS/PLANTILLAS -->

## Scripts auxiliares y atributos del Linux Agent
Esta documentación describe los atributos y scripts auxiliares de Linux del [Security Language (SECL) de Datadog][1].

Las reglas que utilicen atributos y scripts auxiliares de Linux deben incluir un campo de filtro de regla de sistema operativo como el siguiente.


{{< code-block lang="yaml" >}}
id: [...]
expression: [...]
filters:
  - os == "linux"

{{< /code-block >}}

## Disparadores
Los disparadores son eventos que corresponden a tipos de actividad vistos por el sistema. El conjunto de disparadores admitidos actualmente es:

| Evento de SECL | Tipo | Definición | Versión del Agent |
| ---------- | ---- | ---------- | ------------- |
| `bind` | Red | Se ha ejecutado una vinculación | 7.37 |
| `bpf` | Kernel | Se ha ejecutado un comando BPF | 7.33 |
| `capset` | Proceso | A proceso cambió su conjunto de capacidades | 7.27 |
| `chdir` | Archivo | [Experimental] Un proceso cambió el directorio actual | 7.52 |
| `chmod` | Archivo | Se han cambiado los permisos de un archivo | 7.27 |
| `chown` | Archivo | Se ha cambiado el propietario de un archivo | 7.27 |
| `dns` | Red | Se ha enviado una solicitud DNS | 7.36 |
| `exec` | Proceso | Se ha ejecutado o bifurcado un proceso  | 7.27 |
| `exit` | Proceso | Se finalizó un proceso | 7.38 |
| `imds` | Red | Se capturó un evento de IMDS | 7.55 |
| `link` | Archivo | Crear un nuevo nombre/alias para un archivo | 7.27 |
| `load_module` | Kernel | Se ha cargado un nuevo módulo del kernel | 7.35 |
| `mkdir` | Archivo | Se ha creado un directorio | 7.27 |
| `mmap` | Kernel | Se ha ejecutado un comando mmap | 7.35 |
| `mount` | Archivo | [Experimental] Se ha montado un sistema de archivos | 7.42 |
| `mprotect` | Kernel | Se ha ejecutado un comando mprotect | 7.35 |
| `open` | Archivo | Se ha abierto un archivo | 7.27 |
| `ptrace` | Kernel | Se ha ejecutado un comando ptrace | 7.35 |
| `removexattr` | Archivo | Eliminar atributos ampliados | 7.27 |
| `rename` | Archivo | Se ha renombrado un archivo/directorio | 7.27 |
| `rmdir` | Archivo | Se ha eliminado un directorio | 7.27 |
| `selinux` | Kernel | Se ha ejecutado una operación SELinux | 7.30 |
| `setgid` | Proceso | Un proceso cambió su gid efectivo | 7.27 |
| `setuid` | Proceso | Un proceso cambió su uid efectivo | 7.27 |
| `setxattr` | Archivo | Establecer atributos ampliados | 7.27 |
| `signal` | Proceso | Se envió una señal | 7.35 |
| `splice` | Archivo | Se ha ejecutado un comando splice | 7.36 |
| `unlink` | Archivo | Se ha eliminado un archivo | 7.27 |
| `unload_module` | Kernel | Se ha eliminado un módulo del kernel | 7.35 |
| `utimes` | Archivo | Modificar los tiempos de acceso/modificación de archivos | 7.27 |

## Variables
Las variables SECL son variables predefinidas que pueden utilizarse como valores o como parte de valores.

Por ejemplo, la regla que utiliza una variable `process.pid` tiene el siguiente aspecto:


{{< code-block lang="javascript" >}}
open.file.path == "/proc/${process.pid}/maps"

{{< /code-block >}}

Lista de las variables disponibles:

| Variable SECL         |  Definición                           | Versión del Agent |
|-----------------------|---------------------------------------|---------------|
| `process.pid`         | PID de proceso                           | 7.33          |

## CIDR y rango de IP
En SECL es posible establecer correspondencias con CIDR e IP. Se pueden utilizar operadores como `in`, `not in` o `allin` combinados con notaciones de CIDR o IP.

Estas reglas pueden escribirse de la siguiente manera:


{{< code-block lang="javascript" >}}
dns.question.name == "example.com" && network.destination.ip in [192.168.1.25, 10.0.0.0/24]

{{< /code-block >}}

## Scripts auxiliares
En SECL existen scripts auxiliares que permiten a los usuarios escribir reglas avanzadas sin necesidad de recurrir a técnicas genéricas como expresiones regulares.

### Argumentos de la línea de comandos
*args_flags* y *args_options* son scripts auxiliares para facilitar la escritura de reglas de CSM Threats basadas en argumentos de línea de comandos.

*args_flags* se utiliza para atrapar argumentos que comienzan con uno o dos caracteres guión pero que no aceptan ningún valor asociado.

Ejemplos:
* `version` forma parte de *args_flags* del comando `cat --version`
* `l` y `n` ambos están en *args_flags* para el comando `netstat -ln`


*args_options* se utiliza para atrapar argumentos que comienzan con uno o dos caracteres guión y acepta un valor especificado como el mismo argumento pero separado por el carácter '=' o especificado como el siguiente argumento.

Ejemplos:
* `T=8` y `width=8` ambos están en *args_options* para el comando `ls -T 8 --width=8`
* `exec.args_options in [ r"s=.*\\" ]` se puede utilizar para detectar si `sudoedit` fue lanzado con el argumento `-s` y un comando que termina con una `\`

### Derechos de archivo

El atributo *file.rights* puede utilizarse ahora además de *file.mode*. *file.mode* puede contener valores establecidos por el kernel, mientras que *file.rights* sólo contiene los valores establecidos por el usuario. Estos derechos pueden ser más conocidos porque están en los comandos `chmod`.

## Atributos de evento

### Común para todos los tipos de evento

| Propiedad | Definición |
| -------- | ------------- |
| [`cgroup.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`cgroup.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`cgroup.id`](#common-cgroupcontext-id-doc) | ID del cgroup |
| [`cgroup.manager`](#common-cgroupcontext-manager-doc) | Gestor del ciclo de vida del cgroup |
| [`container.created_at`](#container-created_at-doc) | Marca de tiempo de la creación del contenedor |
| [`container.id`](#container-id-doc) | ID del contenedor |
| [`container.runtime`](#container-runtime-doc) | Tiempo de ejecución que gestiona el contenedor |
| [`container.tags`](#container-tags-doc) | Etiquetas del contenedor |
| [`event.async`](#event-async-doc) | True si la syscall era asíncrona |
| [`event.hostname`](#event-hostname-doc) | Nombre de host asociado al evento |
| [`event.origin`](#event-origin-doc) | Origen del evento |
| [`event.os`](#event-os-doc) | Sistema operativo del evento |
| [`event.service`](#event-service-doc) | Servicio asociado al evento |
| [`event.timestamp`](#event-timestamp-doc) | Marca de tiempo del evento |
| [`process.ancestors.args`](#common-process-args-doc) | Argumentos de proceso (como cadena, excluyendo argv0) |
| [`process.ancestors.args_flags`](#common-process-args_flags-doc) | Indicadores en los argumentos de proceso  |
| [`process.ancestors.args_options`](#common-process-args_options-doc) | Argumento del proceso como opciones |
| [`process.ancestors.args_truncated`](#common-process-args_truncated-doc) | Indicador del truncamiento de argumentos |
| [`process.ancestors.argv`](#common-process-argv-doc) | Argumentos del proceso (como matriz, excluyendo argv0) |
| [`process.ancestors.argv0`](#common-process-argv0-doc) | Primer argumento del proceso |
| [`process.ancestors.auid`](#common-credentials-auid-doc) | UID de inicio de sesión del proceso |
| [`process.ancestors.cap_effective`](#common-credentials-cap_effective-doc) | Conjunto de capacidades efectivas del proceso |
| [`process.ancestors.cap_permitted`](#common-credentials-cap_permitted-doc) | Conjunto de capacidades permitidas del proceso |
| [`process.ancestors.cgroup.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`process.ancestors.cgroup.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`process.ancestors.cgroup.id`](#common-cgroupcontext-id-doc) | ID del cgroup |
| [`process.ancestors.cgroup.manager`](#common-cgroupcontext-manager-doc) | Gestor del ciclo de vida del cgroup |
| [`process.ancestors.comm`](#common-process-comm-doc) | Atributo Comm del proceso |
| [`process.ancestors.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`process.ancestors.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`process.ancestors.egid`](#common-credentials-egid-doc) | GID efectivo del proceso |
| [`process.ancestors.egroup`](#common-credentials-egroup-doc) | Grupo efectivo del proceso |
| [`process.ancestors.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`process.ancestors.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`process.ancestors.envs_truncated`](#common-process-envs_truncated-doc) | Indicador de truncamiento de variables de entorno |
| [`process.ancestors.euid`](#common-credentials-euid-doc) | UID efectivo del proceso |
| [`process.ancestors.euser`](#common-credentials-euser-doc) | Usuario efectivo del proceso |
| [`process.ancestors.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`process.ancestors.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`process.ancestors.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`process.ancestors.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`process.ancestors.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`process.ancestors.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`process.ancestors.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`process.ancestors.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`process.ancestors.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`process.ancestors.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`process.ancestors.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`process.ancestors.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.ancestors.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`process.ancestors.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`process.ancestors.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`process.ancestors.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`process.ancestors.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.ancestors.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`process.ancestors.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`process.ancestors.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`process.ancestors.fsgid`](#common-credentials-fsgid-doc) | FileSystem-gid del proceso |
| [`process.ancestors.fsgroup`](#common-credentials-fsgroup-doc) | FileSystem-group del proceso |
| [`process.ancestors.fsuid`](#common-credentials-fsuid-doc) | FileSystem-uid del proceso |
| [`process.ancestors.fsuser`](#common-credentials-fsuser-doc) | FileSystem-user del proceso |
| [`process.ancestors.gid`](#common-credentials-gid-doc) | GID del proceso |
| [`process.ancestors.group`](#common-credentials-group-doc) | Grupo del proceso |
| [`process.ancestors.interpreter.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`process.ancestors.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`process.ancestors.interpreter.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`process.ancestors.interpreter.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`process.ancestors.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`process.ancestors.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`process.ancestors.interpreter.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`process.ancestors.interpreter.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`process.ancestors.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`process.ancestors.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`process.ancestors.interpreter.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`process.ancestors.interpreter.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.ancestors.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`process.ancestors.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`process.ancestors.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`process.ancestors.interpreter.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`process.ancestors.interpreter.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.ancestors.interpreter.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`process.ancestors.interpreter.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`process.ancestors.interpreter.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`process.ancestors.is_kworker`](#common-pidcontext-is_kworker-doc) | Indica si el proceso es un kworker |
| [`process.ancestors.is_thread`](#common-process-is_thread-doc) | Indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ha ejecutado otro programa) |
| [`process.ancestors.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID de grupo del subproceso) |
| [`process.ancestors.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`process.ancestors.tid`](#common-pidcontext-tid-doc) | ID del subproceso |
| [`process.ancestors.tty_name`](#common-process-tty_name-doc) | Nombre del TTY asociado al proceso |
| [`process.ancestors.uid`](#common-credentials-uid-doc) | UID del proceso |
| [`process.ancestors.user`](#common-credentials-user-doc) | Usuario del proceso |
| [`process.ancestors.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Grupos de Kubernetes del usuario que ejecutó el proceso |
| [`process.ancestors.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | UID de Kubernetes del usuario que ejecutó el proceso |
| [`process.ancestors.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Nombre de usuario de Kubernetes del usuario que ejecutó el proceso |
| [`process.args`](#common-process-args-doc) | Argumentos del proceso (como cadena, excluyendo argv0) |
| [`process.args_flags`](#common-process-args_flags-doc) | Indicadores en los argumentos de proceso  |
| [`process.args_options`](#common-process-args_options-doc) | Argumento del proceso como opciones |
| [`process.args_truncated`](#common-process-args_truncated-doc) | Indicador del truncamiento de argumentos |
| [`process.argv`](#common-process-argv-doc) | Argumentos del proceso (como matriz, excluyendo argv0) |
| [`process.argv0`](#common-process-argv0-doc) | Primer argumento del proceso |
| [`process.auid`](#common-credentials-auid-doc) | UID de inicio de sesión del proceso |
| [`process.cap_effective`](#common-credentials-cap_effective-doc) | Conjunto de capacidades efectivas del proceso |
| [`process.cap_permitted`](#common-credentials-cap_permitted-doc) | Conjunto de capacidades permitidas del proceso |
| [`process.cgroup.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`process.cgroup.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`process.cgroup.id`](#common-cgroupcontext-id-doc) | ID del cgroup |
| [`process.cgroup.manager`](#common-cgroupcontext-manager-doc) | Gestor del ciclo de vida del cgroup |
| [`process.comm`](#common-process-comm-doc) | Atributo Comm del proceso |
| [`process.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`process.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`process.egid`](#common-credentials-egid-doc) | GID efectivo del proceso |
| [`process.egroup`](#common-credentials-egroup-doc) | Grupo efectivo del proceso |
| [`process.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`process.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`process.envs_truncated`](#common-process-envs_truncated-doc) | Indicador de truncamiento de variables de entorno |
| [`process.euid`](#common-credentials-euid-doc) | UID efectivo del proceso |
| [`process.euser`](#common-credentials-euser-doc) | Usuario efectivo del proceso |
| [`process.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`process.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`process.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`process.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`process.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`process.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`process.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`process.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`process.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`process.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`process.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`process.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`process.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`process.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`process.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`process.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`process.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`process.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`process.fsgid`](#common-credentials-fsgid-doc) | FileSystem-gid del proceso |
| [`process.fsgroup`](#common-credentials-fsgroup-doc) | FileSystem-group del proceso |
| [`process.fsuid`](#common-credentials-fsuid-doc) | FileSystem-uid del proceso |
| [`process.fsuser`](#common-credentials-fsuser-doc) | FileSystem-user del proceso |
| [`process.gid`](#common-credentials-gid-doc) | GID del proceso |
| [`process.group`](#common-credentials-group-doc) | Grupo del proceso |
| [`process.interpreter.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`process.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`process.interpreter.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`process.interpreter.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`process.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`process.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`process.interpreter.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`process.interpreter.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`process.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`process.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`process.interpreter.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`process.interpreter.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`process.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`process.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`process.interpreter.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`process.interpreter.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.interpreter.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`process.interpreter.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`process.interpreter.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`process.is_kworker`](#common-pidcontext-is_kworker-doc) | Indica si el proceso es un kworker |
| [`process.is_thread`](#common-process-is_thread-doc) | Indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ha ejecutado otro programa) |
| [`process.parent.args`](#common-process-args-doc) | Argumentos del proceso (como cadena, excluyendo argv0) |
| [`process.parent.args_flags`](#common-process-args_flags-doc) | Indicadores en los argumentos de proceso  |
| [`process.parent.args_options`](#common-process-args_options-doc) | Argumento del proceso como opciones |
| [`process.parent.args_truncated`](#common-process-args_truncated-doc) | Indicador del truncamiento de argumentos |
| [`process.parent.argv`](#common-process-argv-doc) | Argumentos del proceso (como matriz, excluyendo argv0) |
| [`process.parent.argv0`](#common-process-argv0-doc) | Primer argumento del proceso |
| [`process.parent.auid`](#common-credentials-auid-doc) | UID de inicio de sesión del proceso |
| [`process.parent.cap_effective`](#common-credentials-cap_effective-doc) | Conjunto de capacidades efectivas del proceso |
| [`process.parent.cap_permitted`](#common-credentials-cap_permitted-doc) | Conjunto de capacidades permitidas del proceso |
| [`process.parent.cgroup.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`process.parent.cgroup.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`process.parent.cgroup.id`](#common-cgroupcontext-id-doc) | ID del cgroup |
| [`process.parent.cgroup.manager`](#common-cgroupcontext-manager-doc) | Gestor del ciclo de vida del cgroup |
| [`process.parent.comm`](#common-process-comm-doc) | Atributo Comm del proceso |
| [`process.parent.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`process.parent.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`process.parent.egid`](#common-credentials-egid-doc) | GID efectivo del proceso |
| [`process.parent.egroup`](#common-credentials-egroup-doc) | Grupo efectivo del proceso |
| [`process.parent.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`process.parent.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`process.parent.envs_truncated`](#common-process-envs_truncated-doc) | Indicador de truncamiento de variables de entorno |
| [`process.parent.euid`](#common-credentials-euid-doc) | UID efectivo del proceso |
| [`process.parent.euser`](#common-credentials-euser-doc) | Usuario efectivo del proceso |
| [`process.parent.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`process.parent.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`process.parent.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`process.parent.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`process.parent.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`process.parent.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`process.parent.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`process.parent.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`process.parent.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`process.parent.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`process.parent.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`process.parent.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.parent.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`process.parent.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`process.parent.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`process.parent.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`process.parent.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.parent.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`process.parent.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`process.parent.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`process.parent.fsgid`](#common-credentials-fsgid-doc) | FileSystem-gid del proceso |
| [`process.parent.fsgroup`](#common-credentials-fsgroup-doc) | FileSystem-group del proceso |
| [`process.parent.fsuid`](#common-credentials-fsuid-doc) | FileSystem-uid del proceso |
| [`process.parent.fsuser`](#common-credentials-fsuser-doc) | FileSystem-user del proceso |
| [`process.parent.gid`](#common-credentials-gid-doc) | GID del proceso |
| [`process.parent.group`](#common-credentials-group-doc) | Grupo del proceso |
| [`process.parent.interpreter.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`process.parent.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`process.parent.interpreter.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`process.parent.interpreter.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`process.parent.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`process.parent.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`process.parent.interpreter.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`process.parent.interpreter.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`process.parent.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`process.parent.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`process.parent.interpreter.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`process.parent.interpreter.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.parent.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`process.parent.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`process.parent.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`process.parent.interpreter.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`process.parent.interpreter.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.parent.interpreter.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`process.parent.interpreter.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`process.parent.interpreter.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`process.parent.is_kworker`](#common-pidcontext-is_kworker-doc) | Indica si el proceso es un kworker |
| [`process.parent.is_thread`](#common-process-is_thread-doc) | Indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ha ejecutado otro programa) |
| [`process.parent.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID de grupo del subproceso) |
| [`process.parent.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`process.parent.tid`](#common-pidcontext-tid-doc) | ID del subproceso |
| [`process.parent.tty_name`](#common-process-tty_name-doc) | Nombre del TTY asociado al proceso |
| [`process.parent.uid`](#common-credentials-uid-doc) | UID del proceso |
| [`process.parent.user`](#common-credentials-user-doc) | Usuario del proceso |
| [`process.parent.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Grupos de Kubernetes del usuario que ejecutó el proceso |
| [`process.parent.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | UID de Kubernetes del usuario que ejecutó el proceso |
| [`process.parent.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Nombre de usuario de Kubernetes del usuario que ejecutó el proceso |
| [`process.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID de grupo del subproceso) |
| [`process.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`process.tid`](#common-pidcontext-tid-doc) | ID del subproceso |
| [`process.tty_name`](#common-process-tty_name-doc) | Nombre del TTY asociado al proceso |
| [`process.uid`](#common-credentials-uid-doc) | UID del proceso |
| [`process.user`](#common-credentials-user-doc) | Usuario del proceso |
| [`process.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Grupos de Kubernetes del usuario que ejecutó el proceso |
| [`process.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | UID de Kubernetes del usuario que ejecutó el proceso |
| [`process.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Nombre de usuario de Kubernetes del usuario que ejecutó el proceso |

### Evento `bind`

Se ha ejecutado una vinculación

| Propiedad | Definición |
| -------- | ------------- |
| [`bind.addr.family`](#bind-addr-family-doc) | Familia de direcciones |
| [`bind.addr.ip`](#common-ipportcontext-ip-doc) | Dirección IP |
| [`bind.addr.port`](#common-ipportcontext-port-doc) | Número de puerto |
| [`bind.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |

### Evento `bpf`

Se ha ejecutado un comando BPF

| Propiedad | Definición |
| -------- | ------------- |
| [`bpf.cmd`](#bpf-cmd-doc) | Nombre del comando BPF |
| [`bpf.map.name`](#bpf-map-name-doc) | Nombre del mapa eBPF (añadido en 7.35) |
| [`bpf.map.type`](#bpf-map-type-doc) | Tipo de mapa eBPF |
| [`bpf.prog.attach_type`](#bpf-prog-attach_type-doc) | Tipo de adjunto del programa eBPF |
| [`bpf.prog.helpers`](#bpf-prog-helpers-doc) | Scripts auxiliares de eBPF utilizados por el programa eBPF (añadidos en 7.35) |
| [`bpf.prog.name`](#bpf-prog-name-doc) | Nombre del programa eBPF (añadido en 7.35) |
| [`bpf.prog.tag`](#bpf-prog-tag-doc) | Hash (sha1) del programa eBPF (añadido en 7.35) |
| [`bpf.prog.type`](#bpf-prog-type-doc) | Tipo de programa eBPF |
| [`bpf.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |

### Evento `capset`

Un proceso cambió su conjunto de capacidades

| Propiedad | Definición |
| -------- | ------------- |
| [`capset.cap_effective`](#capset-cap_effective-doc) | Conjunto de capacidades efectivas del proceso |
| [`capset.cap_permitted`](#capset-cap_permitted-doc) | Conjunto de capacidades permitidas del proceso |

### Evento `chdir`

Este tipo de evento es experimental y puede cambiar en el futuro.

Un proceso cambió el directorio actual

| Propiedad | Definición |
| -------- | ------------- |
| [`chdir.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`chdir.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`chdir.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`chdir.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`chdir.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`chdir.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`chdir.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`chdir.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`chdir.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`chdir.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`chdir.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`chdir.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`chdir.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`chdir.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`chdir.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`chdir.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`chdir.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`chdir.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`chdir.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`chdir.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`chdir.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |
| [`chdir.syscall.path`](#chdir-syscall-path-doc) | argumento path de syscall |

### Evento `chmod`

Se han cambiado los permisos de un archivo

| Propiedad | Definición |
| -------- | ------------- |
| [`chmod.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`chmod.file.destination.mode`](#chmod-file-destination-mode-doc) | Nuevo modo del archivo chmod-ed |
| [`chmod.file.destination.rights`](#chmod-file-destination-rights-doc) | Nuevos derechos del archivo chmod-ed |
| [`chmod.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`chmod.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`chmod.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`chmod.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`chmod.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`chmod.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`chmod.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`chmod.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`chmod.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`chmod.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`chmod.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`chmod.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`chmod.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`chmod.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`chmod.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`chmod.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`chmod.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`chmod.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`chmod.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`chmod.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |
| [`chmod.syscall.mode`](#chmod-syscall-mode-doc) | argumento mode de syscall |
| [`chmod.syscall.path`](#chmod-syscall-path-doc) | argumento path de syscall |

### Evento `chown`

Se ha cambiado el propietario de un archivo

| Propiedad | Definición |
| -------- | ------------- |
| [`chown.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`chown.file.destination.gid`](#chown-file-destination-gid-doc) | Nuevo GID del propietario del archivo chown-ed |
| [`chown.file.destination.group`](#chown-file-destination-group-doc) | Nuevo grupo del propietario del archivo chown-ed |
| [`chown.file.destination.uid`](#chown-file-destination-uid-doc) | Nuevo UID del propietario del archivo chown-ed |
| [`chown.file.destination.user`](#chown-file-destination-user-doc) | Nuevo usuario del propietario del archivo chown-ed |
| [`chown.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`chown.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`chown.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`chown.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`chown.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`chown.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`chown.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`chown.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`chown.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`chown.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`chown.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`chown.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`chown.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`chown.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`chown.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`chown.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`chown.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`chown.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`chown.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`chown.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |
| [`chown.syscall.gid`](#chown-syscall-gid-doc) | argumento GID de syscall |
| [`chown.syscall.path`](#chown-syscall-path-doc) | argumento Path de syscall |
| [`chown.syscall.uid`](#chown-syscall-uid-doc) | argumento UID de syscall |

### Evento `dns`

Se ha enviado una solicitud DNS

| Propiedad | Definición |
| -------- | ------------- |
| [`dns.id`](#dns-id-doc) | [Experimental] El ID de la solicitud DNS |
| [`dns.question.class`](#dns-question-class-doc) | la clase buscada por la pregunta DNS |
| [`dns.question.count`](#dns-question-count-doc) | el recuento total de preguntas de la solicitud DNS |
| [`dns.question.length`](#dns-question-length-doc) | el tamaño total de la solicitud DNS en bytes |
| [`dns.question.name`](#dns-question-name-doc) | el nombre de dominio consultado |
| [`dns.question.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`dns.question.type`](#dns-question-type-doc) | un código de dos octetos que especifica el tipo de pregunta DNS |
| [`network.destination.ip`](#common-ipportcontext-ip-doc) | Dirección IP |
| [`network.destination.port`](#common-ipportcontext-port-doc) | Número de puerto |
| [`network.device.ifindex`](#network-device-ifindex-doc) | Interfaz ifindex |
| [`network.device.ifname`](#network-device-ifname-doc) | Interfaz ifname |
| [`network.l3_protocol`](#network-l3_protocol-doc) | Protocolo L3 del paquete de red |
| [`network.l4_protocol`](#network-l4_protocol-doc) | Protocolo L4 del paquete de red |
| [`network.size`](#network-size-doc) | Tamaño en bytes del paquete de red |
| [`network.source.ip`](#common-ipportcontext-ip-doc) | Dirección IP |
| [`network.source.port`](#common-ipportcontext-port-doc) | Número de puerto |

### Evento `exec`

Se ha ejecutado o bifurcado un proceso

| Propiedad | Definición |
| -------- | ------------- |
| [`exec.args`](#common-process-args-doc) | Argumentos del proceso (como cadena, excluyendo argv0) |
| [`exec.args_flags`](#common-process-args_flags-doc) | Indicadores en los argumentos de proceso  |
| [`exec.args_options`](#common-process-args_options-doc) | Argumento del proceso como opciones |
| [`exec.args_truncated`](#common-process-args_truncated-doc) | Indicador del truncamiento de argumentos |
| [`exec.argv`](#common-process-argv-doc) | Argumentos del proceso (como matriz, excluyendo argv0) |
| [`exec.argv0`](#common-process-argv0-doc) | Primer argumento del proceso |
| [`exec.auid`](#common-credentials-auid-doc) | UID de inicio de sesión del proceso |
| [`exec.cap_effective`](#common-credentials-cap_effective-doc) | Conjunto de capacidades efectivas del proceso |
| [`exec.cap_permitted`](#common-credentials-cap_permitted-doc) | Conjunto de capacidades permitidas del proceso |
| [`exec.cgroup.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`exec.cgroup.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`exec.cgroup.id`](#common-cgroupcontext-id-doc) | ID del cgroup |
| [`exec.cgroup.manager`](#common-cgroupcontext-manager-doc) | Gestor del ciclo de vida del cgroup |
| [`exec.comm`](#common-process-comm-doc) | Atributo Comm del proceso |
| [`exec.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`exec.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`exec.egid`](#common-credentials-egid-doc) | GID efectivo del proceso |
| [`exec.egroup`](#common-credentials-egroup-doc) | Grupo efectivo del proceso |
| [`exec.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`exec.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`exec.envs_truncated`](#common-process-envs_truncated-doc) | Indicador de truncamiento de variables de entorno |
| [`exec.euid`](#common-credentials-euid-doc) | UID efectivo del proceso |
| [`exec.euser`](#common-credentials-euser-doc) | Usuario efectivo del proceso |
| [`exec.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`exec.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`exec.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`exec.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`exec.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`exec.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`exec.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`exec.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`exec.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`exec.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`exec.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`exec.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`exec.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`exec.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`exec.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`exec.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`exec.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`exec.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`exec.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`exec.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`exec.fsgid`](#common-credentials-fsgid-doc) | FileSystem-gid del proceso |
| [`exec.fsgroup`](#common-credentials-fsgroup-doc) | FileSystem-group del proceso |
| [`exec.fsuid`](#common-credentials-fsuid-doc) | FileSystem-uid del proceso |
| [`exec.fsuser`](#common-credentials-fsuser-doc) | FileSystem-user del proceso |
| [`exec.gid`](#common-credentials-gid-doc) | GID del proceso |
| [`exec.group`](#common-credentials-group-doc) | Grupo del proceso |
| [`exec.interpreter.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`exec.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`exec.interpreter.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`exec.interpreter.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`exec.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`exec.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`exec.interpreter.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`exec.interpreter.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`exec.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`exec.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`exec.interpreter.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`exec.interpreter.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`exec.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`exec.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`exec.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`exec.interpreter.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`exec.interpreter.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`exec.interpreter.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`exec.interpreter.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`exec.interpreter.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`exec.is_kworker`](#common-pidcontext-is_kworker-doc) | Indica si el proceso es un kworker |
| [`exec.is_thread`](#common-process-is_thread-doc) | Indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ha ejecutado otro programa) |
| [`exec.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID de grupo del subproceso) |
| [`exec.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`exec.syscall.path`](#exec-syscall-path-doc) | argumento path de syscall |
| [`exec.tid`](#common-pidcontext-tid-doc) | ID del subproceso |
| [`exec.tty_name`](#common-process-tty_name-doc) | Nombre del TTY asociado al proceso |
| [`exec.uid`](#common-credentials-uid-doc) | UID del proceso |
| [`exec.user`](#common-credentials-user-doc) | Usuario del proceso |
| [`exec.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Grupos de Kubernetes del usuario que ejecutó el proceso |
| [`exec.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | UID de Kubernetes del usuario que ejecutó el proceso |
| [`exec.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Nombre de usuario de Kubernetes del usuario que ejecutó el proceso |

### Evento `exit`

Se finalizó un proceso

| Propiedad | Definición |
| -------- | ------------- |
| [`exit.args`](#common-process-args-doc) | Argumentos del proceso (como cadena, excluyendo argv0) |
| [`exit.args_flags`](#common-process-args_flags-doc) | Indicadores en los argumentos de proceso  |
| [`exit.args_options`](#common-process-args_options-doc) | Argumento del proceso como opciones |
| [`exit.args_truncated`](#common-process-args_truncated-doc) | Indicador del truncamiento de argumentos |
| [`exit.argv`](#common-process-argv-doc) | Argumentos del proceso (como matriz, excluyendo argv0) |
| [`exit.argv0`](#common-process-argv0-doc) | Primer argumento del proceso |
| [`exit.auid`](#common-credentials-auid-doc) | UID de inicio de sesión del proceso |
| [`exit.cap_effective`](#common-credentials-cap_effective-doc) | Conjunto de capacidades efectivas del proceso |
| [`exit.cap_permitted`](#common-credentials-cap_permitted-doc) | Conjunto de capacidades permitidas del proceso |
| [`exit.cause`](#exit-cause-doc) | Causa de finalización del proceso (EXITED, SIGNALED, COREDUMPED) |
| [`exit.cgroup.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`exit.cgroup.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`exit.cgroup.id`](#common-cgroupcontext-id-doc) | ID del cgroup |
| [`exit.cgroup.manager`](#common-cgroupcontext-manager-doc) | Gestor del ciclo de vida del cgroup |
| [`exit.code`](#exit-code-doc) | Código de salida del proceso o número de señal que provocó la finalización del proceso |
| [`exit.comm`](#common-process-comm-doc) | Atributo Comm del proceso |
| [`exit.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`exit.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`exit.egid`](#common-credentials-egid-doc) | GID efectivo del proceso |
| [`exit.egroup`](#common-credentials-egroup-doc) | Grupo efectivo del proceso |
| [`exit.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`exit.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`exit.envs_truncated`](#common-process-envs_truncated-doc) | Indicador de truncamiento de variables de entorno |
| [`exit.euid`](#common-credentials-euid-doc) | UID efectivo del proceso |
| [`exit.euser`](#common-credentials-euser-doc) | Usuario efectivo del proceso |
| [`exit.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`exit.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`exit.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`exit.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`exit.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`exit.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`exit.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`exit.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`exit.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`exit.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`exit.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`exit.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`exit.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`exit.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`exit.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`exit.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`exit.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`exit.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`exit.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`exit.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`exit.fsgid`](#common-credentials-fsgid-doc) | FileSystem-gid del proceso |
| [`exit.fsgroup`](#common-credentials-fsgroup-doc) | FileSystem-group del proceso |
| [`exit.fsuid`](#common-credentials-fsuid-doc) | FileSystem-uid del proceso |
| [`exit.fsuser`](#common-credentials-fsuser-doc) | FileSystem-user del proceso |
| [`exit.gid`](#common-credentials-gid-doc) | GID del proceso |
| [`exit.group`](#common-credentials-group-doc) | Grupo del proceso |
| [`exit.interpreter.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`exit.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`exit.interpreter.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`exit.interpreter.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`exit.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`exit.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`exit.interpreter.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`exit.interpreter.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`exit.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`exit.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`exit.interpreter.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`exit.interpreter.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`exit.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`exit.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`exit.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`exit.interpreter.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`exit.interpreter.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`exit.interpreter.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`exit.interpreter.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`exit.interpreter.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`exit.is_kworker`](#common-pidcontext-is_kworker-doc) | Indica si el proceso es un kworker |
| [`exit.is_thread`](#common-process-is_thread-doc) | Indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ha ejecutado otro programa) |
| [`exit.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID de grupo del subproceso) |
| [`exit.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`exit.tid`](#common-pidcontext-tid-doc) | ID del subproceso |
| [`exit.tty_name`](#common-process-tty_name-doc) | Nombre del TTY asociado al proceso |
| [`exit.uid`](#common-credentials-uid-doc) | UID del proceso |
| [`exit.user`](#common-credentials-user-doc) | Usuario del proceso |
| [`exit.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Grupos de Kubernetes del usuario que ejecutó el proceso |
| [`exit.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | UID de Kubernetes del usuario que ejecutó el proceso |
| [`exit.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Nombre de usuario de Kubernetes del usuario que ejecutó el proceso |

### Evento `imds`

Se capturó un evento IMDS

| Propiedad | Definición |
| -------- | ------------- |
| [`imds.aws.is_imds_v2`](#imds-aws-is_imds_v2-doc) | un booleano que especifica si el evento IMDS sigue las convenciones de IMDSv1 o IMDSv2 |
| [`imds.aws.security_credentials.type`](#imds-aws-security_credentials-type-doc) | el tipo de credenciales de seguridad |
| [`imds.cloud_provider`](#imds-cloud_provider-doc) | el proveedor de nube previsto del evento IMDS |
| [`imds.host`](#imds-host-doc) | el host del protocolo HTTP |
| [`imds.server`](#imds-server-doc) | el encabezado del servidor de una respuesta |
| [`imds.type`](#imds-type-doc) | el tipo de evento IMDS |
| [`imds.url`](#imds-url-doc) | la URL de IMDS consultada |
| [`imds.user_agent`](#imds-user_agent-doc) | el Agent de usuario del cliente HTTP |
| [`network.destination.ip`](#common-ipportcontext-ip-doc) | Dirección IP |
| [`network.destination.port`](#common-ipportcontext-port-doc) | Número de puerto |
| [`network.device.ifindex`](#network-device-ifindex-doc) | Interfaz ifindex |
| [`network.device.ifname`](#network-device-ifname-doc) | Interfaz ifname |
| [`network.l3_protocol`](#network-l3_protocol-doc) | Protocolo L3 del paquete de red |
| [`network.l4_protocol`](#network-l4_protocol-doc) | Protocolo L4 del paquete de red |
| [`network.size`](#network-size-doc) | Tamaño en bytes del paquete de red |
| [`network.source.ip`](#common-ipportcontext-ip-doc) | Dirección IP |
| [`network.source.port`](#common-ipportcontext-port-doc) | Número de puerto |

### Evento `link`

Crear un nuevo nombre/alias para un archivo

| Propiedad | Definición |
| -------- | ------------- |
| [`link.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`link.file.destination.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`link.file.destination.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`link.file.destination.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`link.file.destination.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`link.file.destination.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`link.file.destination.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`link.file.destination.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`link.file.destination.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`link.file.destination.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`link.file.destination.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`link.file.destination.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`link.file.destination.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`link.file.destination.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`link.file.destination.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`link.file.destination.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`link.file.destination.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`link.file.destination.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`link.file.destination.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`link.file.destination.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`link.file.destination.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`link.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`link.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`link.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`link.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`link.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`link.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`link.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`link.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`link.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`link.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`link.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`link.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`link.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`link.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`link.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`link.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`link.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`link.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`link.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`link.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |
| [`link.syscall.destination.path`](#link-syscall-destination-path-doc) | argumento destination path de syscall |
| [`link.syscall.path`](#link-syscall-path-doc) | argumento Path de syscall |

### Evento `load_module`

Se ha cargado un nuevo módulo del kernel

| Propiedad | Definición |
| -------- | ------------- |
| [`load_module.args`](#load_module-args-doc) | Parámetros (en forma de cadena) del nuevo módulo del kernel |
| [`load_module.args_truncated`](#load_module-args_truncated-doc) | Indica si los argumentos se han truncado o no |
| [`load_module.argv`](#load_module-argv-doc) | Parámetros (en forma de matriz) del nuevo módulo del kernel |
| [`load_module.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`load_module.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`load_module.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`load_module.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`load_module.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`load_module.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`load_module.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`load_module.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`load_module.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`load_module.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`load_module.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`load_module.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`load_module.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`load_module.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`load_module.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`load_module.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`load_module.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`load_module.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`load_module.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`load_module.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`load_module.loaded_from_memory`](#load_module-loaded_from_memory-doc) | Indica si el módulo del kernel se ha cargado desde la memoria |
| [`load_module.name`](#load_module-name-doc) | Nombre del nuevo módulo del kernel |
| [`load_module.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |

### Evento `mkdir`

Se ha creado un directorio

| Propiedad | Definición |
| -------- | ------------- |
| [`mkdir.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`mkdir.file.destination.mode`](#mkdir-file-destination-mode-doc) | Modo del nuevo directorio |
| [`mkdir.file.destination.rights`](#mkdir-file-destination-rights-doc) | Derechos del nuevo directorio |
| [`mkdir.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`mkdir.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`mkdir.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`mkdir.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`mkdir.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`mkdir.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`mkdir.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`mkdir.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`mkdir.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`mkdir.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`mkdir.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`mkdir.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`mkdir.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`mkdir.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`mkdir.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`mkdir.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`mkdir.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`mkdir.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`mkdir.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`mkdir.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |

### Evento `mmap`

Se ha ejecutado un comando mmap

| Propiedad | Definición |
| -------- | ------------- |
| [`mmap.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`mmap.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`mmap.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`mmap.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`mmap.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`mmap.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`mmap.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`mmap.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`mmap.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`mmap.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`mmap.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`mmap.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`mmap.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`mmap.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`mmap.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`mmap.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`mmap.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`mmap.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`mmap.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`mmap.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`mmap.flags`](#mmap-flags-doc) | indicadores de segmento de memoria |
| [`mmap.protection`](#mmap-protection-doc) | protección de segmento de memoria |
| [`mmap.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |

### Evento `mount`

Este tipo de evento es experimental y puede cambiar en el futuro.

Se ha montado un sistema de archivos

| Propiedad | Definición |
| -------- | ------------- |
| [`mount.fs_type`](#mount-fs_type-doc) | Tipo del sistema de archivos montado |
| [`mount.mountpoint.path`](#mount-mountpoint-path-doc) | Ruta del punto de montaje |
| [`mount.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |
| [`mount.root.path`](#mount-root-path-doc) | Ruta raíz del montaje |
| [`mount.source.path`](#mount-source-path-doc) | Ruta de origen de un montaje bind |
| [`mount.syscall.fs_type`](#mount-syscall-fs_type-doc) | argumento File system type de syscall |
| [`mount.syscall.mountpoint.path`](#mount-syscall-mountpoint-path-doc) | argumento Mount point path de syscall |
| [`mount.syscall.source.path`](#mount-syscall-source-path-doc) | argumento Source path de syscall |

### Evento `mprotect`

Se ha ejecutado un comando mprotect

| Propiedad | Definición |
| -------- | ------------- |
| [`mprotect.req_protection`](#mprotect-req_protection-doc) | nueva protección de segmentos de memoria |
| [`mprotect.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |
| [`mprotect.vm_protection`](#mprotect-vm_protection-doc) | protección inicial de segmentos de memoria |

### Evento `open`

Se ha abierto un archivo

| Propiedad | Definición |
| -------- | ------------- |
| [`open.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`open.file.destination.mode`](#open-file-destination-mode-doc) | Modo del archivo creado |
| [`open.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`open.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`open.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`open.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`open.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`open.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`open.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`open.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`open.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`open.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`open.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`open.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`open.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`open.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`open.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`open.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`open.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`open.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`open.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`open.flags`](#open-flags-doc) | Indicadores utilizados al abrir el archivo |
| [`open.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |
| [`open.syscall.flags`](#open-syscall-flags-doc) | argumento Flags de syscall |
| [`open.syscall.mode`](#open-syscall-mode-doc) | argumento Mode de syscall |
| [`open.syscall.path`](#open-syscall-path-doc) | argumento Path de syscall |

### Evento `ptrace`

Se ha ejecutado un comando ptrace

| Propiedad | Definición |
| -------- | ------------- |
| [`ptrace.request`](#ptrace-request-doc) | solicitud de ptrace |
| [`ptrace.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |
| [`ptrace.tracee.ancestors.args`](#common-process-args-doc) | Argumentos del proceso (como cadena, excluyendo argv0) |
| [`ptrace.tracee.ancestors.args_flags`](#common-process-args_flags-doc) | Indicadores en los argumentos de proceso  |
| [`ptrace.tracee.ancestors.args_options`](#common-process-args_options-doc) | Argumento del proceso como opciones |
| [`ptrace.tracee.ancestors.args_truncated`](#common-process-args_truncated-doc) | Indicador del truncamiento de argumentos |
| [`ptrace.tracee.ancestors.argv`](#common-process-argv-doc) | Argumentos del proceso (como matriz, excluyendo argv0) |
| [`ptrace.tracee.ancestors.argv0`](#common-process-argv0-doc) | Primer argumento del proceso |
| [`ptrace.tracee.ancestors.auid`](#common-credentials-auid-doc) | UID de inicio de sesión del proceso |
| [`ptrace.tracee.ancestors.cap_effective`](#common-credentials-cap_effective-doc) | Conjunto de capacidades efectivas del proceso |
| [`ptrace.tracee.ancestors.cap_permitted`](#common-credentials-cap_permitted-doc) | Conjunto de capacidades permitidas del proceso |
| [`ptrace.tracee.ancestors.cgroup.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`ptrace.tracee.ancestors.cgroup.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`ptrace.tracee.ancestors.cgroup.id`](#common-cgroupcontext-id-doc) | ID del cgroup |
| [`ptrace.tracee.ancestors.cgroup.manager`](#common-cgroupcontext-manager-doc) | Gestor del ciclo de vida del cgroup |
| [`ptrace.tracee.ancestors.comm`](#common-process-comm-doc) | Atributo Comm del proceso |
| [`ptrace.tracee.ancestors.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`ptrace.tracee.ancestors.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`ptrace.tracee.ancestors.egid`](#common-credentials-egid-doc) | GID efectivo del proceso |
| [`ptrace.tracee.ancestors.egroup`](#common-credentials-egroup-doc) | Grupo efectivo del proceso |
| [`ptrace.tracee.ancestors.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`ptrace.tracee.ancestors.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`ptrace.tracee.ancestors.envs_truncated`](#common-process-envs_truncated-doc) | Indicador de truncamiento de variables de entorno |
| [`ptrace.tracee.ancestors.euid`](#common-credentials-euid-doc) | UID efectivo del proceso |
| [`ptrace.tracee.ancestors.euser`](#common-credentials-euser-doc) | Usuario efectivo del proceso |
| [`ptrace.tracee.ancestors.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`ptrace.tracee.ancestors.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`ptrace.tracee.ancestors.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`ptrace.tracee.ancestors.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`ptrace.tracee.ancestors.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`ptrace.tracee.ancestors.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`ptrace.tracee.ancestors.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`ptrace.tracee.ancestors.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`ptrace.tracee.ancestors.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`ptrace.tracee.ancestors.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`ptrace.tracee.ancestors.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`ptrace.tracee.ancestors.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`ptrace.tracee.ancestors.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`ptrace.tracee.ancestors.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`ptrace.tracee.ancestors.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`ptrace.tracee.ancestors.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`ptrace.tracee.ancestors.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`ptrace.tracee.ancestors.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`ptrace.tracee.ancestors.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`ptrace.tracee.ancestors.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`ptrace.tracee.ancestors.fsgid`](#common-credentials-fsgid-doc) | FileSystem-gid del proceso |
| [`ptrace.tracee.ancestors.fsgroup`](#common-credentials-fsgroup-doc) | FileSystem-group del proceso |
| [`ptrace.tracee.ancestors.fsuid`](#common-credentials-fsuid-doc) | FileSystem-uid del proceso |
| [`ptrace.tracee.ancestors.fsuser`](#common-credentials-fsuser-doc) | FileSystem-user del proceso |
| [`ptrace.tracee.ancestors.gid`](#common-credentials-gid-doc) | GID del proceso |
| [`ptrace.tracee.ancestors.group`](#common-credentials-group-doc) | Grupo del proceso |
| [`ptrace.tracee.ancestors.interpreter.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`ptrace.tracee.ancestors.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`ptrace.tracee.ancestors.interpreter.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`ptrace.tracee.ancestors.interpreter.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`ptrace.tracee.ancestors.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`ptrace.tracee.ancestors.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`ptrace.tracee.ancestors.interpreter.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`ptrace.tracee.ancestors.interpreter.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`ptrace.tracee.ancestors.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`ptrace.tracee.ancestors.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`ptrace.tracee.ancestors.interpreter.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`ptrace.tracee.ancestors.interpreter.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`ptrace.tracee.ancestors.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`ptrace.tracee.ancestors.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`ptrace.tracee.ancestors.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`ptrace.tracee.ancestors.interpreter.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`ptrace.tracee.ancestors.interpreter.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`ptrace.tracee.ancestors.interpreter.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`ptrace.tracee.ancestors.interpreter.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`ptrace.tracee.ancestors.interpreter.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`ptrace.tracee.ancestors.is_kworker`](#common-pidcontext-is_kworker-doc) | Indica si el proceso es un kworker |
| [`ptrace.tracee.ancestors.is_thread`](#common-process-is_thread-doc) | Indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ha ejecutado otro programa) |
| [`ptrace.tracee.ancestors.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID de grupo del subproceso) |
| [`ptrace.tracee.ancestors.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`ptrace.tracee.ancestors.tid`](#common-pidcontext-tid-doc) | ID del subproceso |
| [`ptrace.tracee.ancestors.tty_name`](#common-process-tty_name-doc) | Nombre del TTY asociado al proceso |
| [`ptrace.tracee.ancestors.uid`](#common-credentials-uid-doc) | UID del proceso |
| [`ptrace.tracee.ancestors.user`](#common-credentials-user-doc) | Usuario del proceso |
| [`ptrace.tracee.ancestors.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Grupos de Kubernetes del usuario que ejecutó el proceso |
| [`ptrace.tracee.ancestors.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | UID de Kubernetes del usuario que ejecutó el proceso |
| [`ptrace.tracee.ancestors.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Nombre de usuario de Kubernetes del usuario que ejecutó el proceso |
| [`ptrace.tracee.args`](#common-process-args-doc) | Argumentos del proceso (como cadena, excluyendo argv0) |
| [`ptrace.tracee.args_flags`](#common-process-args_flags-doc) | Indicadores en los argumentos de proceso  |
| [`ptrace.tracee.args_options`](#common-process-args_options-doc) | Argumento del proceso como opciones |
| [`ptrace.tracee.args_truncated`](#common-process-args_truncated-doc) | Indicador del truncamiento de argumentos |
| [`ptrace.tracee.argv`](#common-process-argv-doc) | Argumentos del proceso (como matriz, excluyendo argv0) |
| [`ptrace.tracee.argv0`](#common-process-argv0-doc) | Primer argumento del proceso |
| [`ptrace.tracee.auid`](#common-credentials-auid-doc) | UID de inicio de sesión del proceso |
| [`ptrace.tracee.cap_effective`](#common-credentials-cap_effective-doc) | Conjunto de capacidades efectivas del proceso |
| [`ptrace.tracee.cap_permitted`](#common-credentials-cap_permitted-doc) | Conjunto de capacidades permitidas del proceso |
| [`ptrace.tracee.cgroup.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`ptrace.tracee.cgroup.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`ptrace.tracee.cgroup.id`](#common-cgroupcontext-id-doc) | ID del cgroup |
| [`ptrace.tracee.cgroup.manager`](#common-cgroupcontext-manager-doc) | Gestor del ciclo de vida del cgroup |
| [`ptrace.tracee.comm`](#common-process-comm-doc) | Atributo Comm del proceso |
| [`ptrace.tracee.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`ptrace.tracee.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`ptrace.tracee.egid`](#common-credentials-egid-doc) | GID efectivo del proceso |
| [`ptrace.tracee.egroup`](#common-credentials-egroup-doc) | Grupo efectivo del proceso |
| [`ptrace.tracee.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`ptrace.tracee.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`ptrace.tracee.envs_truncated`](#common-process-envs_truncated-doc) | Indicador de truncamiento de variables de entorno |
| [`ptrace.tracee.euid`](#common-credentials-euid-doc) | UID efectivo del proceso |
| [`ptrace.tracee.euser`](#common-credentials-euser-doc) | Usuario efectivo del proceso |
| [`ptrace.tracee.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`ptrace.tracee.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`ptrace.tracee.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`ptrace.tracee.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`ptrace.tracee.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`ptrace.tracee.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`ptrace.tracee.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`ptrace.tracee.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`ptrace.tracee.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`ptrace.tracee.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`ptrace.tracee.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`ptrace.tracee.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`ptrace.tracee.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`ptrace.tracee.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`ptrace.tracee.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`ptrace.tracee.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`ptrace.tracee.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`ptrace.tracee.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`ptrace.tracee.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`ptrace.tracee.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`ptrace.tracee.fsgid`](#common-credentials-fsgid-doc) | FileSystem-gid del proceso |
| [`ptrace.tracee.fsgroup`](#common-credentials-fsgroup-doc) | FileSystem-group del proceso |
| [`ptrace.tracee.fsuid`](#common-credentials-fsuid-doc) | FileSystem-uid del proceso |
| [`ptrace.tracee.fsuser`](#common-credentials-fsuser-doc) | FileSystem-user del proceso |
| [`ptrace.tracee.gid`](#common-credentials-gid-doc) | GID del proceso |
| [`ptrace.tracee.group`](#common-credentials-group-doc) | Grupo del proceso |
| [`ptrace.tracee.interpreter.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`ptrace.tracee.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`ptrace.tracee.interpreter.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`ptrace.tracee.interpreter.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`ptrace.tracee.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`ptrace.tracee.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`ptrace.tracee.interpreter.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`ptrace.tracee.interpreter.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`ptrace.tracee.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`ptrace.tracee.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`ptrace.tracee.interpreter.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`ptrace.tracee.interpreter.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`ptrace.tracee.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`ptrace.tracee.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`ptrace.tracee.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`ptrace.tracee.interpreter.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`ptrace.tracee.interpreter.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`ptrace.tracee.interpreter.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`ptrace.tracee.interpreter.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`ptrace.tracee.interpreter.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`ptrace.tracee.is_kworker`](#common-pidcontext-is_kworker-doc) | Indica si el proceso es un kworker |
| [`ptrace.tracee.is_thread`](#common-process-is_thread-doc) | Indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ha ejecutado otro programa) |
| [`ptrace.tracee.parent.args`](#common-process-args-doc) | Argumentos del proceso (como cadena, excluyendo argv0) |
| [`ptrace.tracee.parent.args_flags`](#common-process-args_flags-doc) | Indicadores en los argumentos de proceso  |
| [`ptrace.tracee.parent.args_options`](#common-process-args_options-doc) | Argumento del proceso como opciones |
| [`ptrace.tracee.parent.args_truncated`](#common-process-args_truncated-doc) | Indicador del truncamiento de argumentos |
| [`ptrace.tracee.parent.argv`](#common-process-argv-doc) | Argumentos del proceso (como matriz, excluyendo argv0) |
| [`ptrace.tracee.parent.argv0`](#common-process-argv0-doc) | Primer argumento del proceso |
| [`ptrace.tracee.parent.auid`](#common-credentials-auid-doc) | UID de inicio de sesión del proceso |
| [`ptrace.tracee.parent.cap_effective`](#common-credentials-cap_effective-doc) | Conjunto de capacidades efectivas del proceso |
| [`ptrace.tracee.parent.cap_permitted`](#common-credentials-cap_permitted-doc) | Conjunto de capacidades permitidas del proceso |
| [`ptrace.tracee.parent.cgroup.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`ptrace.tracee.parent.cgroup.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`ptrace.tracee.parent.cgroup.id`](#common-cgroupcontext-id-doc) | ID del cgroup |
| [`ptrace.tracee.parent.cgroup.manager`](#common-cgroupcontext-manager-doc) | Gestor del ciclo de vida del cgroup |
| [`ptrace.tracee.parent.comm`](#common-process-comm-doc) | Atributo Comm del proceso |
| [`ptrace.tracee.parent.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`ptrace.tracee.parent.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`ptrace.tracee.parent.egid`](#common-credentials-egid-doc) | GID efectivo del proceso |
| [`ptrace.tracee.parent.egroup`](#common-credentials-egroup-doc) | Grupo efectivo del proceso |
| [`ptrace.tracee.parent.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`ptrace.tracee.parent.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`ptrace.tracee.parent.envs_truncated`](#common-process-envs_truncated-doc) | Indicador de truncamiento de variables de entorno |
| [`ptrace.tracee.parent.euid`](#common-credentials-euid-doc) | UID efectivo del proceso |
| [`ptrace.tracee.parent.euser`](#common-credentials-euser-doc) | Usuario efectivo del proceso |
| [`ptrace.tracee.parent.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`ptrace.tracee.parent.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`ptrace.tracee.parent.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`ptrace.tracee.parent.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`ptrace.tracee.parent.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`ptrace.tracee.parent.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`ptrace.tracee.parent.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`ptrace.tracee.parent.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`ptrace.tracee.parent.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`ptrace.tracee.parent.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`ptrace.tracee.parent.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`ptrace.tracee.parent.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`ptrace.tracee.parent.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`ptrace.tracee.parent.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`ptrace.tracee.parent.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`ptrace.tracee.parent.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`ptrace.tracee.parent.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`ptrace.tracee.parent.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`ptrace.tracee.parent.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`ptrace.tracee.parent.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`ptrace.tracee.parent.fsgid`](#common-credentials-fsgid-doc) | FileSystem-gid del proceso |
| [`ptrace.tracee.parent.fsgroup`](#common-credentials-fsgroup-doc) | FileSystem-group del proceso |
| [`ptrace.tracee.parent.fsuid`](#common-credentials-fsuid-doc) | FileSystem-uid del proceso |
| [`ptrace.tracee.parent.fsuser`](#common-credentials-fsuser-doc) | FileSystem-user del proceso |
| [`ptrace.tracee.parent.gid`](#common-credentials-gid-doc) | GID del proceso |
| [`ptrace.tracee.parent.group`](#common-credentials-group-doc) | Grupo del proceso |
| [`ptrace.tracee.parent.interpreter.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`ptrace.tracee.parent.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`ptrace.tracee.parent.interpreter.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`ptrace.tracee.parent.interpreter.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`ptrace.tracee.parent.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`ptrace.tracee.parent.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`ptrace.tracee.parent.interpreter.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`ptrace.tracee.parent.interpreter.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`ptrace.tracee.parent.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`ptrace.tracee.parent.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`ptrace.tracee.parent.interpreter.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`ptrace.tracee.parent.interpreter.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`ptrace.tracee.parent.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`ptrace.tracee.parent.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`ptrace.tracee.parent.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`ptrace.tracee.parent.interpreter.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`ptrace.tracee.parent.interpreter.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`ptrace.tracee.parent.interpreter.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`ptrace.tracee.parent.interpreter.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`ptrace.tracee.parent.interpreter.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`ptrace.tracee.parent.is_kworker`](#common-pidcontext-is_kworker-doc) | Indica si el proceso es un kworker |
| [`ptrace.tracee.parent.is_thread`](#common-process-is_thread-doc) | Indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ha ejecutado otro programa) |
| [`ptrace.tracee.parent.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID de grupo del subproceso) |
| [`ptrace.tracee.parent.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`ptrace.tracee.parent.tid`](#common-pidcontext-tid-doc) | ID del subproceso |
| [`ptrace.tracee.parent.tty_name`](#common-process-tty_name-doc) | Nombre del TTY asociado al proceso |
| [`ptrace.tracee.parent.uid`](#common-credentials-uid-doc) | UID del proceso |
| [`ptrace.tracee.parent.user`](#common-credentials-user-doc) | Usuario del proceso |
| [`ptrace.tracee.parent.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Grupos de Kubernetes del usuario que ejecutó el proceso |
| [`ptrace.tracee.parent.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | UID de Kubernetes del usuario que ejecutó el proceso |
| [`ptrace.tracee.parent.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Nombre de usuario de Kubernetes del usuario que ejecutó el proceso |
| [`ptrace.tracee.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID de grupo del subproceso) |
| [`ptrace.tracee.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`ptrace.tracee.tid`](#common-pidcontext-tid-doc) | ID del subproceso |
| [`ptrace.tracee.tty_name`](#common-process-tty_name-doc) | Nombre del TTY asociado al proceso |
| [`ptrace.tracee.uid`](#common-credentials-uid-doc) | UID del proceso |
| [`ptrace.tracee.user`](#common-credentials-user-doc) | Usuario del proceso |
| [`ptrace.tracee.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Grupos de Kubernetes del usuario que ejecutó el proceso |
| [`ptrace.tracee.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | UID de Kubernetes del usuario que ejecutó el proceso |
| [`ptrace.tracee.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Nombre de usuario de Kubernetes del usuario que ejecutó el proceso |

### Evento `removexattr`

Eliminar atributos ampliados

| Propiedad | Definición |
| -------- | ------------- |
| [`removexattr.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`removexattr.file.destination.name`](#common-setxattrevent-file-destination-name-doc) | Nombre del atributo ampliado |
| [`removexattr.file.destination.namespace`](#common-setxattrevent-file-destination-namespace-doc) | Espacio de nombres del atributo ampliado |
| [`removexattr.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`removexattr.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`removexattr.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`removexattr.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`removexattr.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`removexattr.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`removexattr.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`removexattr.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`removexattr.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`removexattr.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`removexattr.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`removexattr.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`removexattr.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`removexattr.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`removexattr.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`removexattr.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`removexattr.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`removexattr.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`removexattr.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`removexattr.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |

### Evento `rename`

Se ha renombrado un archivo/directorio

| Propiedad | Definición |
| -------- | ------------- |
| [`rename.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`rename.file.destination.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`rename.file.destination.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`rename.file.destination.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`rename.file.destination.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`rename.file.destination.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`rename.file.destination.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`rename.file.destination.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`rename.file.destination.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`rename.file.destination.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`rename.file.destination.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`rename.file.destination.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`rename.file.destination.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`rename.file.destination.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`rename.file.destination.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`rename.file.destination.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`rename.file.destination.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`rename.file.destination.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`rename.file.destination.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`rename.file.destination.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`rename.file.destination.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`rename.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`rename.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`rename.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`rename.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`rename.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`rename.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`rename.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`rename.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`rename.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`rename.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`rename.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`rename.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`rename.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`rename.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`rename.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`rename.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`rename.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`rename.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`rename.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`rename.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |
| [`rename.syscall.destination.path`](#rename-syscall-destination-path-doc) | argumento destination path de syscall |
| [`rename.syscall.path`](#rename-syscall-path-doc) | argumento Path de syscall |

### Evento `rmdir`

Se ha eliminado un directorio

| Propiedad | Definición |
| -------- | ------------- |
| [`rmdir.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`rmdir.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`rmdir.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`rmdir.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`rmdir.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`rmdir.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`rmdir.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`rmdir.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`rmdir.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`rmdir.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`rmdir.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`rmdir.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`rmdir.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`rmdir.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`rmdir.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`rmdir.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`rmdir.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`rmdir.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`rmdir.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`rmdir.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`rmdir.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |

### Evento `selinux`

Se ha ejecutado una operación SELinux

| Propiedad | Definición |
| -------- | ------------- |
| [`selinux.bool.name`](#selinux-bool-name-doc) | Nombre booleano de SELinux |
| [`selinux.bool.state`](#selinux-bool-state-doc) | Nuevo valor booleano de SELinux |
| [`selinux.bool_commit.state`](#selinux-bool_commit-state-doc) | Indicador de una operación booleana de confirmación de SELinux |
| [`selinux.enforce.status`](#selinux-enforce-status-doc) | Estado de aplicación de SELinux ("enforcing", "permissive" o "disabled") |

### Evento `setgid`

Un proceso cambió su gid efectivo

| Propiedad | Definición |
| -------- | ------------- |
| [`setgid.egid`](#setgid-egid-doc) | Nuevo GID efectivo del proceso |
| [`setgid.egroup`](#setgid-egroup-doc) | Nuevo grupo efectivo del proceso |
| [`setgid.fsgid`](#setgid-fsgid-doc) | Nuevo GID de FileSystem del proceso |
| [`setgid.fsgroup`](#setgid-fsgroup-doc) | Nuevo grupo de FileSystem del proceso |
| [`setgid.gid`](#setgid-gid-doc) | Nuevo GID del proceso |
| [`setgid.group`](#setgid-group-doc) | Nuevo grupo del proceso |

### Evento `setuid`

Un proceso cambió su uid efectivo

| Propiedad | Definición |
| -------- | ------------- |
| [`setuid.euid`](#setuid-euid-doc) | Nuevo UID efectivo del proceso |
| [`setuid.euser`](#setuid-euser-doc) | Nuevo usuario efectivo del proceso |
| [`setuid.fsuid`](#setuid-fsuid-doc) | Nuevo UID de FileSystem del proceso |
| [`setuid.fsuser`](#setuid-fsuser-doc) | Nuevo usuario de FileSystem del proceso |
| [`setuid.uid`](#setuid-uid-doc) | Nuevo UID del proceso |
| [`setuid.user`](#setuid-user-doc) | Nuevo usuario del proceso |

### Evento `setxattr`

Establecer atributos ampliados

| Propiedad | Definición |
| -------- | ------------- |
| [`setxattr.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`setxattr.file.destination.name`](#common-setxattrevent-file-destination-name-doc) | Nombre del atributo ampliado |
| [`setxattr.file.destination.namespace`](#common-setxattrevent-file-destination-namespace-doc) | Espacio de nombres del atributo ampliado |
| [`setxattr.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`setxattr.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`setxattr.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`setxattr.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`setxattr.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`setxattr.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`setxattr.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`setxattr.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`setxattr.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`setxattr.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`setxattr.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`setxattr.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`setxattr.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`setxattr.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`setxattr.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`setxattr.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`setxattr.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`setxattr.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`setxattr.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`setxattr.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |

### Evento `signal`

Se envió una señal

| Propiedad | Definición |
| -------- | ------------- |
| [`signal.pid`](#signal-pid-doc) | PID objetivo |
| [`signal.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |
| [`signal.target.ancestors.args`](#common-process-args-doc) | Argumentos del proceso (como cadena, excluyendo argv0) |
| [`signal.target.ancestors.args_flags`](#common-process-args_flags-doc) | Indicadores en los argumentos de proceso  |
| [`signal.target.ancestors.args_options`](#common-process-args_options-doc) | Argumento del proceso como opciones |
| [`signal.target.ancestors.args_truncated`](#common-process-args_truncated-doc) | Indicador del truncamiento de argumentos |
| [`signal.target.ancestors.argv`](#common-process-argv-doc) | Argumentos del proceso (como matriz, excluyendo argv0) |
| [`signal.target.ancestors.argv0`](#common-process-argv0-doc) | Primer argumento del proceso |
| [`signal.target.ancestors.auid`](#common-credentials-auid-doc) | UID de inicio de sesión del proceso |
| [`signal.target.ancestors.cap_effective`](#common-credentials-cap_effective-doc) | Conjunto de capacidades efectivas del proceso |
| [`signal.target.ancestors.cap_permitted`](#common-credentials-cap_permitted-doc) | Conjunto de capacidades permitidas del proceso |
| [`signal.target.ancestors.cgroup.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`signal.target.ancestors.cgroup.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`signal.target.ancestors.cgroup.id`](#common-cgroupcontext-id-doc) | ID del cgroup |
| [`signal.target.ancestors.cgroup.manager`](#common-cgroupcontext-manager-doc) | Gestor del ciclo de vida del cgroup |
| [`signal.target.ancestors.comm`](#common-process-comm-doc) | Atributo Comm del proceso |
| [`signal.target.ancestors.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`signal.target.ancestors.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`signal.target.ancestors.egid`](#common-credentials-egid-doc) | GID efectivo del proceso |
| [`signal.target.ancestors.egroup`](#common-credentials-egroup-doc) | Grupo efectivo del proceso |
| [`signal.target.ancestors.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`signal.target.ancestors.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`signal.target.ancestors.envs_truncated`](#common-process-envs_truncated-doc) | Indicador de truncamiento de variables de entorno |
| [`signal.target.ancestors.euid`](#common-credentials-euid-doc) | UID efectivo del proceso |
| [`signal.target.ancestors.euser`](#common-credentials-euser-doc) | Usuario efectivo del proceso |
| [`signal.target.ancestors.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`signal.target.ancestors.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`signal.target.ancestors.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`signal.target.ancestors.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`signal.target.ancestors.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`signal.target.ancestors.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`signal.target.ancestors.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`signal.target.ancestors.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`signal.target.ancestors.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`signal.target.ancestors.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`signal.target.ancestors.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`signal.target.ancestors.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`signal.target.ancestors.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`signal.target.ancestors.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`signal.target.ancestors.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`signal.target.ancestors.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`signal.target.ancestors.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`signal.target.ancestors.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`signal.target.ancestors.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`signal.target.ancestors.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`signal.target.ancestors.fsgid`](#common-credentials-fsgid-doc) | FileSystem-gid del proceso |
| [`signal.target.ancestors.fsgroup`](#common-credentials-fsgroup-doc) | FileSystem-group del proceso |
| [`signal.target.ancestors.fsuid`](#common-credentials-fsuid-doc) | FileSystem-uid del proceso |
| [`signal.target.ancestors.fsuser`](#common-credentials-fsuser-doc) | FileSystem-user del proceso |
| [`signal.target.ancestors.gid`](#common-credentials-gid-doc) | GID del proceso |
| [`signal.target.ancestors.group`](#common-credentials-group-doc) | Grupo del proceso |
| [`signal.target.ancestors.interpreter.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`signal.target.ancestors.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`signal.target.ancestors.interpreter.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`signal.target.ancestors.interpreter.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`signal.target.ancestors.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`signal.target.ancestors.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`signal.target.ancestors.interpreter.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`signal.target.ancestors.interpreter.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`signal.target.ancestors.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`signal.target.ancestors.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`signal.target.ancestors.interpreter.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`signal.target.ancestors.interpreter.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`signal.target.ancestors.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`signal.target.ancestors.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`signal.target.ancestors.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`signal.target.ancestors.interpreter.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`signal.target.ancestors.interpreter.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`signal.target.ancestors.interpreter.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`signal.target.ancestors.interpreter.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`signal.target.ancestors.interpreter.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`signal.target.ancestors.is_kworker`](#common-pidcontext-is_kworker-doc) | Indica si el proceso es un kworker |
| [`signal.target.ancestors.is_thread`](#common-process-is_thread-doc) | Indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ha ejecutado otro programa) |
| [`signal.target.ancestors.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID de grupo del subproceso) |
| [`signal.target.ancestors.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`signal.target.ancestors.tid`](#common-pidcontext-tid-doc) | ID del subproceso |
| [`signal.target.ancestors.tty_name`](#common-process-tty_name-doc) | Nombre del TTY asociado al proceso |
| [`signal.target.ancestors.uid`](#common-credentials-uid-doc) | UID del proceso |
| [`signal.target.ancestors.user`](#common-credentials-user-doc) | Usuario del proceso |
| [`signal.target.ancestors.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Grupos de Kubernetes del usuario que ejecutó el proceso |
| [`signal.target.ancestors.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | UID de Kubernetes del usuario que ejecutó el proceso |
| [`signal.target.ancestors.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Nombre de usuario de Kubernetes del usuario que ejecutó el proceso |
| [`signal.target.args`](#common-process-args-doc) | Argumentos del proceso (como cadena, excluyendo argv0) |
| [`signal.target.args_flags`](#common-process-args_flags-doc) | Indicadores en los argumentos de proceso  |
| [`signal.target.args_options`](#common-process-args_options-doc) | Argumento del proceso como opciones |
| [`signal.target.args_truncated`](#common-process-args_truncated-doc) | Indicador del truncamiento de argumentos |
| [`signal.target.argv`](#common-process-argv-doc) | Argumentos del proceso (como matriz, excluyendo argv0) |
| [`signal.target.argv0`](#common-process-argv0-doc) | Primer argumento del proceso |
| [`signal.target.auid`](#common-credentials-auid-doc) | UID de inicio de sesión del proceso |
| [`signal.target.cap_effective`](#common-credentials-cap_effective-doc) | Conjunto de capacidades efectivas del proceso |
| [`signal.target.cap_permitted`](#common-credentials-cap_permitted-doc) | Conjunto de capacidades permitidas del proceso |
| [`signal.target.cgroup.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`signal.target.cgroup.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`signal.target.cgroup.id`](#common-cgroupcontext-id-doc) | ID del cgroup |
| [`signal.target.cgroup.manager`](#common-cgroupcontext-manager-doc) | Gestor del ciclo de vida del cgroup |
| [`signal.target.comm`](#common-process-comm-doc) | Atributo Comm del proceso |
| [`signal.target.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`signal.target.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`signal.target.egid`](#common-credentials-egid-doc) | GID efectivo del proceso |
| [`signal.target.egroup`](#common-credentials-egroup-doc) | Grupo efectivo del proceso |
| [`signal.target.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`signal.target.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`signal.target.envs_truncated`](#common-process-envs_truncated-doc) | Indicador de truncamiento de variables de entorno |
| [`signal.target.euid`](#common-credentials-euid-doc) | UID efectivo del proceso |
| [`signal.target.euser`](#common-credentials-euser-doc) | Usuario efectivo del proceso |
| [`signal.target.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`signal.target.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`signal.target.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`signal.target.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`signal.target.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`signal.target.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`signal.target.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`signal.target.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`signal.target.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`signal.target.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`signal.target.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`signal.target.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`signal.target.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`signal.target.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`signal.target.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`signal.target.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`signal.target.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`signal.target.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`signal.target.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`signal.target.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`signal.target.fsgid`](#common-credentials-fsgid-doc) | FileSystem-gid del proceso |
| [`signal.target.fsgroup`](#common-credentials-fsgroup-doc) | FileSystem-group del proceso |
| [`signal.target.fsuid`](#common-credentials-fsuid-doc) | FileSystem-uid del proceso |
| [`signal.target.fsuser`](#common-credentials-fsuser-doc) | FileSystem-user del proceso |
| [`signal.target.gid`](#common-credentials-gid-doc) | GID del proceso |
| [`signal.target.group`](#common-credentials-group-doc) | Grupo del proceso |
| [`signal.target.interpreter.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`signal.target.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`signal.target.interpreter.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`signal.target.interpreter.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`signal.target.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`signal.target.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`signal.target.interpreter.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`signal.target.interpreter.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`signal.target.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`signal.target.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`signal.target.interpreter.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`signal.target.interpreter.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`signal.target.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`signal.target.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`signal.target.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`signal.target.interpreter.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`signal.target.interpreter.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`signal.target.interpreter.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`signal.target.interpreter.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`signal.target.interpreter.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`signal.target.is_kworker`](#common-pidcontext-is_kworker-doc) | Indica si el proceso es un kworker |
| [`signal.target.is_thread`](#common-process-is_thread-doc) | Indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ha ejecutado otro programa) |
| [`signal.target.parent.args`](#common-process-args-doc) | Argumentos del proceso (como cadena, excluyendo argv0) |
| [`signal.target.parent.args_flags`](#common-process-args_flags-doc) | Indicadores en los argumentos de proceso  |
| [`signal.target.parent.args_options`](#common-process-args_options-doc) | Argumento del proceso como opciones |
| [`signal.target.parent.args_truncated`](#common-process-args_truncated-doc) | Indicador del truncamiento de argumentos |
| [`signal.target.parent.argv`](#common-process-argv-doc) | Argumentos del proceso (como matriz, excluyendo argv0) |
| [`signal.target.parent.argv0`](#common-process-argv0-doc) | Primer argumento del proceso |
| [`signal.target.parent.auid`](#common-credentials-auid-doc) | UID de inicio de sesión del proceso |
| [`signal.target.parent.cap_effective`](#common-credentials-cap_effective-doc) | Conjunto de capacidades efectivas del proceso |
| [`signal.target.parent.cap_permitted`](#common-credentials-cap_permitted-doc) | Conjunto de capacidades permitidas del proceso |
| [`signal.target.parent.cgroup.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`signal.target.parent.cgroup.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`signal.target.parent.cgroup.id`](#common-cgroupcontext-id-doc) | ID del cgroup |
| [`signal.target.parent.cgroup.manager`](#common-cgroupcontext-manager-doc) | Gestor del ciclo de vida del cgroup |
| [`signal.target.parent.comm`](#common-process-comm-doc) | Atributo Comm del proceso |
| [`signal.target.parent.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`signal.target.parent.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`signal.target.parent.egid`](#common-credentials-egid-doc) | GID efectivo del proceso |
| [`signal.target.parent.egroup`](#common-credentials-egroup-doc) | Grupo efectivo del proceso |
| [`signal.target.parent.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`signal.target.parent.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`signal.target.parent.envs_truncated`](#common-process-envs_truncated-doc) | Indicador de truncamiento de variables de entorno |
| [`signal.target.parent.euid`](#common-credentials-euid-doc) | UID efectivo del proceso |
| [`signal.target.parent.euser`](#common-credentials-euser-doc) | Usuario efectivo del proceso |
| [`signal.target.parent.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`signal.target.parent.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`signal.target.parent.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`signal.target.parent.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`signal.target.parent.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`signal.target.parent.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`signal.target.parent.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`signal.target.parent.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`signal.target.parent.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`signal.target.parent.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`signal.target.parent.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`signal.target.parent.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`signal.target.parent.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`signal.target.parent.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`signal.target.parent.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`signal.target.parent.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`signal.target.parent.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`signal.target.parent.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`signal.target.parent.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`signal.target.parent.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`signal.target.parent.fsgid`](#common-credentials-fsgid-doc) | FileSystem-gid del proceso |
| [`signal.target.parent.fsgroup`](#common-credentials-fsgroup-doc) | FileSystem-group del proceso |
| [`signal.target.parent.fsuid`](#common-credentials-fsuid-doc) | FileSystem-uid del proceso |
| [`signal.target.parent.fsuser`](#common-credentials-fsuser-doc) | FileSystem-user del proceso |
| [`signal.target.parent.gid`](#common-credentials-gid-doc) | GID del proceso |
| [`signal.target.parent.group`](#common-credentials-group-doc) | Grupo del proceso |
| [`signal.target.parent.interpreter.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`signal.target.parent.interpreter.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`signal.target.parent.interpreter.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`signal.target.parent.interpreter.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`signal.target.parent.interpreter.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`signal.target.parent.interpreter.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`signal.target.parent.interpreter.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`signal.target.parent.interpreter.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`signal.target.parent.interpreter.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`signal.target.parent.interpreter.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`signal.target.parent.interpreter.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`signal.target.parent.interpreter.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`signal.target.parent.interpreter.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`signal.target.parent.interpreter.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`signal.target.parent.interpreter.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`signal.target.parent.interpreter.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`signal.target.parent.interpreter.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`signal.target.parent.interpreter.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`signal.target.parent.interpreter.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`signal.target.parent.interpreter.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`signal.target.parent.is_kworker`](#common-pidcontext-is_kworker-doc) | Indica si el proceso es un kworker |
| [`signal.target.parent.is_thread`](#common-process-is_thread-doc) | Indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ha ejecutado otro programa) |
| [`signal.target.parent.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID de grupo del subproceso) |
| [`signal.target.parent.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`signal.target.parent.tid`](#common-pidcontext-tid-doc) | ID del subproceso |
| [`signal.target.parent.tty_name`](#common-process-tty_name-doc) | Nombre del TTY asociado al proceso |
| [`signal.target.parent.uid`](#common-credentials-uid-doc) | UID del proceso |
| [`signal.target.parent.user`](#common-credentials-user-doc) | Usuario del proceso |
| [`signal.target.parent.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Grupos de Kubernetes del usuario que ejecutó el proceso |
| [`signal.target.parent.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | UID de Kubernetes del usuario que ejecutó el proceso |
| [`signal.target.parent.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Nombre de usuario de Kubernetes del usuario que ejecutó el proceso |
| [`signal.target.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID de grupo del subproceso) |
| [`signal.target.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`signal.target.tid`](#common-pidcontext-tid-doc) | ID del subproceso |
| [`signal.target.tty_name`](#common-process-tty_name-doc) | Nombre del TTY asociado al proceso |
| [`signal.target.uid`](#common-credentials-uid-doc) | UID del proceso |
| [`signal.target.user`](#common-credentials-user-doc) | Usuario del proceso |
| [`signal.target.user_session.k8s_groups`](#common-usersessioncontext-k8s_groups-doc) | Grupos de Kubernetes del usuario que ejecutó el proceso |
| [`signal.target.user_session.k8s_uid`](#common-usersessioncontext-k8s_uid-doc) | UID de Kubernetes del usuario que ejecutó el proceso |
| [`signal.target.user_session.k8s_username`](#common-usersessioncontext-k8s_username-doc) | Nombre de usuario de Kubernetes del usuario que ejecutó el proceso |
| [`signal.type`](#signal-type-doc) | Tipo de señal (por ejemplo: SIGHUP, SIGINT, SIGQUIT, etc.) |

### Evento `splice`

Se ha ejecutado un comando splice

| Propiedad | Definición |
| -------- | ------------- |
| [`splice.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`splice.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`splice.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`splice.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`splice.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`splice.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`splice.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`splice.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`splice.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`splice.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`splice.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`splice.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`splice.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`splice.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`splice.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`splice.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`splice.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`splice.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`splice.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`splice.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`splice.pipe_entry_flag`](#splice-pipe_entry_flag-doc) | Indicador de entrada del pipe "fd_out" pasado a la syscall splice |
| [`splice.pipe_exit_flag`](#splice-pipe_exit_flag-doc) | Indicador de salida del pipe "fd_out" pasado a la syscall splice |
| [`splice.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |

### Evento `unlink`

Se ha eliminado un archivo

| Propiedad | Definición |
| -------- | ------------- |
| [`unlink.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`unlink.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`unlink.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`unlink.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`unlink.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`unlink.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`unlink.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`unlink.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`unlink.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`unlink.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`unlink.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`unlink.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`unlink.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`unlink.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`unlink.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`unlink.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`unlink.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`unlink.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`unlink.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`unlink.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`unlink.flags`](#unlink-flags-doc) | Indicadores de la syscall unlink |
| [`unlink.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |
| [`unlink.syscall.dirfd`](#unlink-syscall-dirfd-doc) | argumento Directory file descriptor de syscall |
| [`unlink.syscall.flags`](#unlink-syscall-flags-doc) | argumento Flags de syscall |
| [`unlink.syscall.path`](#unlink-syscall-path-doc) | argumento Path de syscall |

### Evento `unload_module`

Se ha eliminado un módulo del kernel

| Propiedad | Definición |
| -------- | ------------- |
| [`unload_module.name`](#unload_module-name-doc) | Nombre del módulo del kernel que se ha eliminado |
| [`unload_module.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |

### Evento `utimes`

Modificar los tiempos de acceso/modificación de archivos

| Propiedad | Definición |
| -------- | ------------- |
| [`utimes.file.change_time`](#common-filefields-change_time-doc) | Hora de modificación (ctime) del archivo |
| [`utimes.file.filesystem`](#common-fileevent-filesystem-doc) | Sistema del archivo |
| [`utimes.file.gid`](#common-filefields-gid-doc) | GID del propietario del archivo |
| [`utimes.file.group`](#common-filefields-group-doc) | Grupo del propietario del archivo |
| [`utimes.file.hashes`](#common-fileevent-hashes-doc) | [Experimental] Lista de hashes criptográficos calculados para este archivo |
| [`utimes.file.in_upper_layer`](#common-filefields-in_upper_layer-doc) | Indicador de la capa de archivo, por ejemplo, en un OverlayFS |
| [`utimes.file.inode`](#common-pathkey-inode-doc) | Nodo índice del archivo |
| [`utimes.file.mode`](#common-filefields-mode-doc) | Modo del archivo |
| [`utimes.file.modification_time`](#common-filefields-modification_time-doc) | Hora de modificación (mtime) del archivo |
| [`utimes.file.mount_id`](#common-pathkey-mount_id-doc) | ID de montaje del archivo |
| [`utimes.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`utimes.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`utimes.file.package.name`](#common-fileevent-package-name-doc) | [Experimental] Nombre del paquete que proporcionó este archivo |
| [`utimes.file.package.source_version`](#common-fileevent-package-source_version-doc) | [Experimental] Versión completa del paquete fuente del paquete que proporcionó este archivo |
| [`utimes.file.package.version`](#common-fileevent-package-version-doc) | [Experimental] Versión completa del paquete que proporcionó este archivo |
| [`utimes.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`utimes.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`utimes.file.rights`](#common-filefields-rights-doc) | Derechos del archivo |
| [`utimes.file.uid`](#common-filefields-uid-doc) | UID del propietario del archivo |
| [`utimes.file.user`](#common-filefields-user-doc) | Usuario del propietario del archivo |
| [`utimes.retval`](#common-syscallevent-retval-doc) | Valor de retorno de syscall |
| [`utimes.syscall.path`](#utimes-syscall-path-doc) | argumento Path de syscall |


## Documentación sobre atributos


### `*.args` {#common-process-args-doc}
Tipo: cadena

Definición: argumentos del proceso (como cadena, excluyendo argv0)

`*.args` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`



Ejemplo:

{{< code-block lang="javascript" >}}
exec.args == "-sV -p 22,53,110,143,4564 198.116.0-255.1-127"
{{< /code-block >}}

Coincide con cualquier proceso con estos argumentos exactos.

Ejemplo:

{{< code-block lang="javascript" >}}
exec.args =~ "* -F * http*"
{{< /code-block >}}

Coincide con cualquier proceso que tenga el argumento "-F" en cualquier lugar antes de un argumento que empiece por "http".

### `*.args_flags` {#common-process-args_flags-doc}
Tipo: cadena

Definición: indicadores en los argumentos del proceso 

`*.args_flags` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`



Ejemplo:

{{< code-block lang="javascript" >}}
exec.args_flags in ["s"] && exec.args_flags in ["V"]
{{< /code-block >}}

Coincide con cualquier proceso que incluya las opciones "-s" y "-V" en sus argumentos. También coincide con "-sV".

### `*.args_options` {#common-process-args_options-doc}
Tipo: cadena

Definición: argumento del proceso como opciones

`*.args_options` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`



Ejemplo:

{{< code-block lang="javascript" >}}
exec.args_options in ["p=0-1024"]
{{< /code-block >}}

Coincide con cualquier proceso que tenga "-p 0-1024" o "--p=0-1024" en sus argumentos.

### `*.args_truncated` {#common-process-args_truncated-doc}
Tipo: booleano

Definición: indicador del truncamiento de argumentos

`*.args_truncated` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.argv` {#common-process-argv-doc}
Tipo: cadena

Definición: argumentos del proceso (como matriz, excluyendo argv0)

`*.argv` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`



Ejemplo:

{{< code-block lang="javascript" >}}
exec.argv in ["127.0.0.1"]
{{< /code-block >}}

Coincide con cualquier proceso que tenga esta dirección IP como uno de sus argumentos.

### `*.argv0` {#common-process-argv0-doc}
Tipo: cadena

Definición: primer argumento del proceso

`*.argv0` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.auid` {#common-credentials-auid-doc}
Tipo: entero

Definición: UID de inicio de sesión del proceso

`*.auid` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.cap_effective` {#common-credentials-cap_effective-doc}
Tipo: entero

Definición: conjunto de capacidades efectivas del proceso

`*.cap_effective` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`

Constantes: [constantes de capacidad del kernel](#kernel-capability-constants)



### `*.cap_permitted` {#common-credentials-cap_permitted-doc}
Tipo: entero

Definición: conjunto de capacidades permitidas del proceso

`*.cap_permitted` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`

Constantes: [constantes de capacidad del kernel](#kernel-capability-constants)



### `*.change_time` {#common-filefields-change_time-doc}
Tipo: entero

Definición: hora de modificación (ctime) del archivo

`*.change_time` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.comm` {#common-process-comm-doc}
Tipo: cadena

Definición: atributo Comm del proceso

`*.comm` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.container.id` {#common-process-container-id-doc}
Tipo: cadena

Definición: ID del contenedor

`*.container.id` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.created_at` {#common-process-created_at-doc}
Tipo: entero

Definición: marca de tiempo de la creación del proceso

`*.created_at` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.egid` {#common-credentials-egid-doc}
Tipo: entorno

Definición: GID efectivo del proceso

`*.egid` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.egroup` {#common-credentials-egroup-doc}
Tipo: cadena

Definición: grupo efectivo del proceso

`*.egroup` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.envp` {#common-process-envp-doc}
Tipo: cadena

Definición: variables de entorno del proceso

`*.envp` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.envs` {#common-process-envs-doc}
Tipo: cadena

Definición: nombres de variable de entorno del proceso

`*.envs` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.envs_truncated` {#common-process-envs_truncated-doc}
Tipo: booleano

Definición: indicador de truncamiento de variables de entorno 

`*.envs_truncated` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.euid` {#common-credentials-euid-doc}
Tipo: entero

Definición: UID efectivo del proceso

`*.euid` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.euser` {#common-credentials-euser-doc}
Tipo: cadena

Definición: usuario efectivo del proceso

`*.euser` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.file.destination.name` {#common-setxattrevent-file-destination-name-doc}
Tipo: cadena

Definición: nombre del atributo extendido

`*.file.destination.name` tiene 2 prefijos posibles:
`removexattr` `setxattr`


### `*.file.destination.namespace` {#common-setxattrevent-file-destination-namespace-doc}
Tipo: cadena

Definición: espacio de nombres del atributo extendido

`*.file.destination.namespace` tiene 2 prefijos posibles:
`removexattr` `setxattr`


### `*.filesystem` {#common-fileevent-filesystem-doc}
Tipo: cadena

Definición: sistema del archivo

`*.filesystem` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.fsgid` {#common-credentials-fsgid-doc}
Tipo: entero

Definición: FileSystem-gid del proceso

`*.fsgid` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.fsgroup` {#common-credentials-fsgroup-doc}
Tipo: cadena

Definición: FileSystem-group del proceso

`*.fsgroup` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.fsuid` {#common-credentials-fsuid-doc}
Tipo: entorno

Definición: FileSystem-uid del proceso

`*.fsuid` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.fsuser` {#common-credentials-fsuser-doc}
Tipo: cadena

Definición: FileSystem-user del proceso

`*.fsuser` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.gid` {#common-credentials-gid-doc}
Tipo: entero

Definición: GID del proceso

`*.gid` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.gid` {#common-filefields-gid-doc}
Tipo: entorno

Definición: GID del propietario del archivo

`*.gid` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.group` {#common-credentials-group-doc}
Tipo: cadena

Definición: grupo del proceso

`*.group` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.group` {#common-filefields-group-doc}
Tipo: cadena

Definición: grupo del propietario del archivo

`*.group` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.hashes` {#common-fileevent-hashes-doc}
Tipo: cadena

Definición: [Experimental] Lista de hashes criptográficos calculados para este archivo

`*.hashes` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.id` {#common-cgroupcontext-id-doc}
Tipo: cadena

Definición: ID del cgroup

`*.id` tiene 12 prefijos posibles:
`cgroup` `exec.cgroup` `exit.cgroup` `process.ancestors.cgroup` `process.cgroup` `process.parent.cgroup` `ptrace.tracee.ancestors.cgroup` `ptrace.tracee.cgroup` `ptrace.tracee.parent.cgroup` `signal.target.ancestors.cgroup` `signal.target.cgroup` `signal.target.parent.cgroup`


### `*.in_upper_layer` {#common-filefields-in_upper_layer-doc}
Tipo: booleano

Definición: indicador de la capa del archivo, por ejemplo, en un OverlayFS.

`*.in_upper_layer` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.inode` {#common-pathkey-inode-doc}
Tipo: entero

Definición: nodo índice del proceso

`*.inode` tiene 51 prefijos posibles:
`cgroup.file` `chdir.file` `chmod.file` `chown.file` `exec.cgroup.file` `exec.file` `exec.interpreter.file` `exit.cgroup.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.cgroup.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.cgroup.file` `process.file` `process.interpreter.file` `process.parent.cgroup.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.cgroup.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.cgroup.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.cgroup.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.cgroup.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.cgroup.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.cgroup.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.ip` {#common-ipportcontext-ip-doc}
Tipo: IP/CIDR

Definición: dirección IP

`*.ip` tiene 3 prefijos posibles:
`bind.addr` `network.destination` `network.source`


### `*.is_kworker` {#common-pidcontext-is_kworker-doc}
Tipo: booleano

Definición: indica si el proceso es un kworker

`*.is_kworker` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.is_thread` {#common-process-is_thread-doc}
Tipo: booleano

Definición: indica si el proceso se considera un subproceso (es decir, un proceso secundario que no ha ejecutado otro programa)

`*.is_thread` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.k8s_groups` {#common-usersessioncontext-k8s_groups-doc}
Tipo: cadena

Definición: grupos de Kubernetes del usuario que ejecutó el proceso

`*.k8s_groups` tiene 11 prefijos posibles:
`exec.user_session` `exit.user_session` `process.ancestors.user_session` `process.parent.user_session` `process.user_session` `ptrace.tracee.ancestors.user_session` `ptrace.tracee.parent.user_session` `ptrace.tracee.user_session` `signal.target.ancestors.user_session` `signal.target.parent.user_session` `signal.target.user_session`


### `*.k8s_uid` {#common-usersessioncontext-k8s_uid-doc}
Tipo: cadena

Definición: UID de Kubernetes del usuario que ejecutó el proceso

`*.k8s_uid` tiene 11 prefijos posibles:
`exec.user_session` `exit.user_session` `process.ancestors.user_session` `process.parent.user_session` `process.user_session` `ptrace.tracee.ancestors.user_session` `ptrace.tracee.parent.user_session` `ptrace.tracee.user_session` `signal.target.ancestors.user_session` `signal.target.parent.user_session` `signal.target.user_session`


### `*.k8s_username` {#common-usersessioncontext-k8s_username-doc}
Tipo: cadena

Definición: nombre de usuario de Kubernetes del usuario que ejecutó el proceso

`*.k8s_username` tiene 11 prefijos posibles:
`exec.user_session` `exit.user_session` `process.ancestors.user_session` `process.parent.user_session` `process.user_session` `ptrace.tracee.ancestors.user_session` `ptrace.tracee.parent.user_session` `ptrace.tracee.user_session` `signal.target.ancestors.user_session` `signal.target.parent.user_session` `signal.target.user_session`


### `*.length` {#common-string-length-doc}
Tipo: entero

Definición: longitud de la cadena correspondiente

`*.length` tiene 79 prefijos posibles:
`chdir.file.name` `chdir.file.path` `chmod.file.name` `chmod.file.path` `chown.file.name` `chown.file.path` `dns.question.name` `exec.file.name` `exec.file.path` `exec.interpreter.file.name` `exec.interpreter.file.path` `exit.file.name` `exit.file.path` `exit.interpreter.file.name` `exit.interpreter.file.path` `link.file.destination.name` `link.file.destination.path` `link.file.name` `link.file.path` `load_module.file.name` `load_module.file.path` `mkdir.file.name` `mkdir.file.path` `mmap.file.name` `mmap.file.path` `open.file.name` `open.file.path` `process.ancestors.file.name` `process.ancestors.file.path` `process.ancestors.interpreter.file.name` `process.ancestors.interpreter.file.path` `process.file.name` `process.file.path` `process.interpreter.file.name` `process.interpreter.file.path` `process.parent.file.name` `process.parent.file.path` `process.parent.interpreter.file.name` `process.parent.interpreter.file.path` `ptrace.tracee.ancestors.file.name` `ptrace.tracee.ancestors.file.path` `ptrace.tracee.ancestors.interpreter.file.name` `ptrace.tracee.ancestors.interpreter.file.path` `ptrace.tracee.file.name` `ptrace.tracee.file.path` `ptrace.tracee.interpreter.file.name` `ptrace.tracee.interpreter.file.path` `ptrace.tracee.parent.file.name` `ptrace.tracee.parent.file.path` `ptrace.tracee.parent.interpreter.file.name` `ptrace.tracee.parent.interpreter.file.path` `removexattr.file.name` `removexattr.file.path` `rename.file.destination.name` `rename.file.destination.path` `rename.file.name` `rename.file.path` `rmdir.file.name` `rmdir.file.path` `setxattr.file.name` `setxattr.file.path` `signal.target.ancestors.file.name` `signal.target.ancestors.file.path` `signal.target.ancestors.interpreter.file.name` `signal.target.ancestors.interpreter.file.path` `signal.target.file.name` `signal.target.file.path` `signal.target.interpreter.file.name` `signal.target.interpreter.file.path` `signal.target.parent.file.name` `signal.target.parent.file.path` `signal.target.parent.interpreter.file.name` `signal.target.parent.interpreter.file.path` `splice.file.name` `splice.file.path` `unlink.file.name` `unlink.file.path` `utimes.file.name` `utimes.file.path`


### `*.manager` {#common-cgroupcontext-manager-doc}
Tipo: cadena

Definición: gestor del ciclo de vida del cgroup

`*.manager` tiene 12 prefijos posibles:
`cgroup` `exec.cgroup` `exit.cgroup` `process.ancestors.cgroup` `process.cgroup` `process.parent.cgroup` `ptrace.tracee.ancestors.cgroup` `ptrace.tracee.cgroup` `ptrace.tracee.parent.cgroup` `signal.target.ancestors.cgroup` `signal.target.cgroup` `signal.target.parent.cgroup`


### `*.mode` {#common-filefields-mode-doc}
Tipo: entero

Definición: modo del archivo

`*.mode` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`

Constantes: [constantes del modo del nodo índice](#inode-mode-constants)



### `*.modification_time` {#common-filefields-modification_time-doc}
Tipo: entero

Definición: hora de modificación (mtime) del archivo

`*.modification_time` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.mount_id` {#common-pathkey-mount_id-doc}
Tipo: entero

Definición: ID de montaje del archivo

`*.mount_id` tiene 51 prefijos posibles:
`cgroup.file` `chdir.file` `chmod.file` `chown.file` `exec.cgroup.file` `exec.file` `exec.interpreter.file` `exit.cgroup.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.cgroup.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.cgroup.file` `process.file` `process.interpreter.file` `process.parent.cgroup.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.cgroup.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.cgroup.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.cgroup.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.cgroup.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.cgroup.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.cgroup.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.name` {#common-fileevent-name-doc}
Tipo: cadena

Definición: nombre base del archivo

`*.name` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`



Ejemplo:

{{< code-block lang="javascript" >}}
exec.file.name == "apt"
{{< /code-block >}}

Coincide con la ejecución de cualquier archivo llamado apt.

### `*.package.name` {#common-fileevent-package-name-doc}
Tipo: cadena

Definición: [Experimental] nombre del paquete que proporcionó este archivo

`*.package.name` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.package.source_version` {#common-fileevent-package-source_version-doc}
Tipo: cadena

Definición: [Experimental] versión completa del paquete fuente del paquete que proporcionó este archivo.

`*.package.source_version` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.package.version` {#common-fileevent-package-version-doc}
Tipo: cadena

Definición: [Experimental] versión completa del paquete que proporcionó este archivo

`*.package.version` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.path` {#common-fileevent-path-doc}
Tipo: cadena

Definición: ruta del archivo

`*.path` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`



Ejemplo:

{{< code-block lang="javascript" >}}
exec.file.path == "/usr/bin/apt"
{{< /code-block >}}

Coincide con la ejecución del archivo ubicado en /usr/bin/apt

Ejemplo:

{{< code-block lang="javascript" >}}
open.file.path == "/etc/passwd"
{{< /code-block >}}

Coincide con cualquier proceso que abra el archivo /etc/passwd.

### `*.pid` {#common-pidcontext-pid-doc}
Tipo: entero

Definición: ID de proceso del proceso (también llamado ID de grupo del subproceso)

`*.pid` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.port` {#common-ipportcontext-port-doc}
Tipo: entero

Definición: número del puerto

`*.port` tiene 3 prefijos posibles:
`bind.addr` `network.destination` `network.source`


### `*.ppid` {#common-process-ppid-doc}
Tipo: entero

Definición: ID del proceso principal

`*.ppid` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.retval` {#common-syscallevent-retval-doc}
Tipo: entero

Definición: valor de retorno de syscall

`*.retval` tiene 22 prefijos posibles:
`bind` `bpf` `chdir` `chmod` `chown` `link` `load_module` `mkdir` `mmap` `mount` `mprotect` `open` `ptrace` `removexattr` `rename` `rmdir` `setxattr` `signal` `splice` `unlink` `unload_module` `utimes`

Constantes: [constantes de error](#error-constants)



### `*.rights` {#common-filefields-rights-doc}
Tipo: entero

Definición: derechos del archivo

`*.rights` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`

Constantes: [constantes del modo de archivo](#file-mode-constants)



### `*.tid` {#common-pidcontext-tid-doc}
Tipo: entero

Definición: ID del subproceso

`*.tid` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.tty_name` {#common-process-tty_name-doc}
Tipo: cadena

Definición: nombre del TTY asociado al proceso

`*.tty_name` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.uid` {#common-credentials-uid-doc}
Tipo: entero

Definición: UID del proceso

`*.uid` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`


### `*.uid` {#common-filefields-uid-doc}
Tipo: entero

Definición: UID del propietario del archivo

`*.uid` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `*.user` {#common-credentials-user-doc}
Tipo: cadena

Definición: usuario del proceso

`*.user` tiene 11 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent` `ptrace.tracee` `ptrace.tracee.ancestors` `ptrace.tracee.parent` `signal.target` `signal.target.ancestors` `signal.target.parent`



Ejemplo:

{{< code-block lang="javascript" >}}
process.user == "root"
{{< /code-block >}}

Restringir un evento para que lo active un proceso que se ejecuta como usuario raíz.

### `*.user` {#common-filefields-user-doc}
Tipo: cadena

Definición: usuario del propietario del archivo

`*.user` tiene 39 prefijos posibles:
`chdir.file` `chmod.file` `chown.file` `exec.file` `exec.interpreter.file` `exit.file` `exit.interpreter.file` `link.file` `link.file.destination` `load_module.file` `mkdir.file` `mmap.file` `open.file` `process.ancestors.file` `process.ancestors.interpreter.file` `process.file` `process.interpreter.file` `process.parent.file` `process.parent.interpreter.file` `ptrace.tracee.ancestors.file` `ptrace.tracee.ancestors.interpreter.file` `ptrace.tracee.file` `ptrace.tracee.interpreter.file` `ptrace.tracee.parent.file` `ptrace.tracee.parent.interpreter.file` `removexattr.file` `rename.file` `rename.file.destination` `rmdir.file` `setxattr.file` `signal.target.ancestors.file` `signal.target.ancestors.interpreter.file` `signal.target.file` `signal.target.interpreter.file` `signal.target.parent.file` `signal.target.parent.interpreter.file` `splice.file` `unlink.file` `utimes.file`


### `bind.addr.family` {#bind-addr-family-doc}
Tipo: entero

Definición: familia de direcciones



### `bpf.cmd` {#bpf-cmd-doc}
Tipo: entero

Definición: nombre del comando BPF


Constantes: [comandos BPF](#bpf-commands)



### `bpf.map.name` {#bpf-map-name-doc}
Tipo: cadena

Definición: nombre del mapa eBPF (añadido en 7.35)



### `bpf.map.type` {#bpf-map-type-doc}
Tipo: entero

Definición: tipo del mapa eBPF


Constantes: [tipos de mapa BPF](#bpf-map-types)



### `bpf.prog.attach_type` {#bpf-prog-attach_type-doc}
Tipo: entero

Definición: tipo de adjunto del programa eBPF


Constantes: [tipos de adjunto BPF](#bpf-attach-types)



### `bpf.prog.helpers` {#bpf-prog-helpers-doc}
Tipo: entero

Definición: scripts auxiliares de eBPF utilizados por el programa eBPF (añadido en 7.35)


Constantes: [funciones de scripts auxiliares de BPF](#bpf-helper-functions)



### `bpf.prog.name` {#bpf-prog-name-doc}
Tipo: cadena

Definición: nombre del programa eBPF (añadido en 7.35)



### `bpf.prog.tag` {#bpf-prog-tag-doc}
Tipo: cadena

Definición: hash (sha1) del programa eBPF (añadido en 7.35)



### `bpf.prog.type` {#bpf-prog-type-doc}
Tipo: entero

Definición: tipo de programa eBPF


Constantes: [tipos de programa BPF](#bpf-program-types)



### `capset.cap_effective` {#capset-cap_effective-doc}
Tipo: entero

Definición: conjunto de capacidades efectivas del proceso


Constantes: [constantes de capacidad del kernel](#kernel-capability-constants)



### `capset.cap_permitted` {#capset-cap_permitted-doc}
Tipo: entero

Definición: conjunto de capacidades permitidas del proceso


Constantes: [constantes de capacidad del kernel](#kernel-capability-constants)



### `chdir.syscall.path` {#chdir-syscall-path-doc}
Tipo: cadena

Definición: argumento path de syscall



### `chmod.file.destination.mode` {#chmod-file-destination-mode-doc}
Tipo: entero

Definición: nuevo modo del archivo chmod-ed


Constantes: [constantes del modo de archivo](#file-mode-constants)



### `chmod.file.destination.rights` {#chmod-file-destination-rights-doc}
Tipo: entero

Definición: nuevos derechos del archivo chmod-ed


Constantes: [constantes del modo de archivo](#file-mode-constants)



### `chmod.syscall.mode` {#chmod-syscall-mode-doc}
Tipo: entero

Definición: argumento mode de syscall



### `chmod.syscall.path` {#chmod-syscall-path-doc}
Tipo: cadena

Definición: argumento path de syscall



### `chown.file.destination.gid` {#chown-file-destination-gid-doc}
Tipo: entero

Definición: nuevo GID del propietario del archivo chown-ed



### `chown.file.destination.group` {#chown-file-destination-group-doc}
Tipo: cadena

Definición: nuevo grupo del propietario del archivo chown-ed



### `chown.file.destination.uid` {#chown-file-destination-uid-doc}
Tipo: entero

Definición: nuevo UID del propietario del archivo chown-ed



### `chown.file.destination.user` {#chown-file-destination-user-doc}
Tipo: cadena

Definición: nuevo usuario del propietario del archivo chown-ed



### `chown.syscall.gid` {#chown-syscall-gid-doc}
Tipo: entero

Definición: argumento GID de syscall



### `chown.syscall.path` {#chown-syscall-path-doc}
Tipo: cadena

Definición: argumento Path de syscall



### `chown.syscall.uid` {#chown-syscall-uid-doc}
Tipo: entero

Definición: argumento UID de syscall



### `container.created_at` {#container-created_at-doc}
Tipo: entero

Definición: marca de tiempo de la creación del contenedor



### `container.id` {#container-id-doc}
Tipo: cadena

Definición: ID del contenedor



### `container.runtime` {#container-runtime-doc}
Tipo: cadena

Definición: tiempo de ejecución que gestiona el contenedor



### `container.tags` {#container-tags-doc}
Tipo: cadena

Definición: etiquetas del contenedor



### `dns.id` {#dns-id-doc}
Tipo: entero

Definición: [Experimental] el ID de la solicitud DNS



### `dns.question.class` {#dns-question-class-doc}
Tipo: entero

Definición: la clase buscada por la pregunta DNS


Constantes: [DNS qclasses](#dns-qclasses)



### `dns.question.count` {#dns-question-count-doc}
Tipo: entero

Definición: recuento total de preguntas de la solicitud DNS.



### `dns.question.length` {#dns-question-length-doc}
Tipo: entero

Definición: el tamaño total de la solicitud DNS en bytes



### `dns.question.name` {#dns-question-name-doc}
Tipo: cadena

Definición: el nombre de dominio consultado



### `dns.question.type` {#dns-question-type-doc}
Tipo: entero

Definición: código de dos octetos que especifica el tipo de pregunta DNS


Constantes: [DNS qtypes](#dns-qtypes)



### `event.async` {#event-async-doc}
Tipo: booleano

Definición: true si syscall fue asíncrona



### `event.hostname` {#event-hostname-doc}
Tipo: cadena

Definición: nombre de host asociado al evento



### `event.origin` {#event-origin-doc}
Tipo: cadena

Definición: origen del evento



### `event.os` {#event-os-doc}
Tipo: cadena

Definición: sistema operativo del evento



### `event.service` {#event-service-doc}
Tipo: cadena

Definición: servicio asociado al evento



### `event.timestamp` {#event-timestamp-doc}
Tipo: entero

Definición: marca de tiempo del evento



### `exec.syscall.path` {#exec-syscall-path-doc}
Tipo: cadena

Definición: argumento path de syscall



### `exit.cause` {#exit-cause-doc}
Tipo: entero

Definición: causa de la finalización del proceso (EXITED, SIGNALED, COREDUMPED)



### `exit.code` {#exit-code-doc}
Tipo: entero

Definición: código de salida del proceso o número de la señal que provocó la finalización del proceso 



### `imds.aws.is_imds_v2` {#imds-aws-is_imds_v2-doc}
Tipo: booleano

Definición: un booleano que especifica si el evento IMDS sigue las convenciones IMDSv1 o IMDSv2.



### `imds.aws.security_credentials.type` {#imds-aws-security_credentials-type-doc}
Tipo: cadena

Definición: tipo de credenciales de seguridad



### `imds.cloud_provider` {#imds-cloud_provider-doc}
Tipo: cadena

Definición: el proveedor de nube previsto del evento IMDS



### `imds.host` {#imds-host-doc}
Tipo: cadena

Definición: el host del protocolo HTTP



### `imds.server` {#imds-server-doc}
Tipo: cadena

Definición: el encabezado del servidor de una respuesta



### `imds.type` {#imds-type-doc}
Tipo: cadena

Definición: tipo de evento IMDS



### `imds.url` {#imds-url-doc}
Tipo: cadena

Definición: URL del IMDS consultado



### `imds.user_agent` {#imds-user_agent-doc}
Tipo: cadena

Definición: Agent del usuario del cliente HTTP



### `link.syscall.destination.path` {#link-syscall-destination-path-doc}
Tipo: cadena

Definición: argumento destination path de syscall



### `link.syscall.path` {#link-syscall-path-doc}
Tipo: cadena

Definición: argumento Path de syscall



### `load_module.args` {#load_module-args-doc}
Tipo: cadena

Definición: parámetros (en forma de cadena) del nuevo módulo del kernel



### `load_module.args_truncated` {#load_module-args_truncated-doc}
Tipo: booleano

Definición: indica si los argumentos fueron truncados o no



### `load_module.argv` {#load_module-argv-doc}
Tipo: cadena

Definición: parámetros (en forma de matriz) del nuevo módulo del kernel



### `load_module.loaded_from_memory` {#load_module-loaded_from_memory-doc}
Tipo: booleano

Definición: indica si el módulo del kernel se cargó desde la memoria



### `load_module.name` {#load_module-name-doc}
Tipo: cadena

Definición: nombre del nuevo módulo del kernel



### `mkdir.file.destination.mode` {#mkdir-file-destination-mode-doc}
Tipo: entero

Definición: modo del nuevo directorio


Constantes: [constantes del modo de archivo](#file-mode-constants)



### `mkdir.file.destination.rights` {#mkdir-file-destination-rights-doc}
Tipo: entero

Definición: derechos del nuevo directorio


Constantes: [constantes del modo de archivo](#file-mode-constants)



### `mmap.flags` {#mmap-flags-doc}
Tipo: entero

Definición: indicadores de segmentos de memoria


Constantes: [indicadores MMap](#mmap-flags)



### `mmap.protection` {#mmap-protection-doc}
Tipo: entero

Definición: protección de segmentos de memoria


Constantes: [constantes de protección](#protection-constants)



### `mount.fs_type` {#mount-fs_type-doc}
Tipo: cadena

Definición: tipo del sistema de archivo montado



### `mount.mountpoint.path` {#mount-mountpoint-path-doc}
Tipo: cadena

Definición: ruta del punto de montaje



### `mount.root.path` {#mount-root-path-doc}
Tipo: cadena

Definición: ruta raíz del montaje



### `mount.source.path` {#mount-source-path-doc}
Tipo: cadena

Definición: ruta de origen de un montaje bind



### `mount.syscall.fs_type` {#mount-syscall-fs_type-doc}
Tipo: cadena

Definición: argumento File system type de syscall



### `mount.syscall.mountpoint.path` {#mount-syscall-mountpoint-path-doc}
Tipo: cadena

Definición: argumento Mount point path de syscall



### `mount.syscall.source.path` {#mount-syscall-source-path-doc}
Tipo: cadena

Definición: argumento Source path de syscall



### `mprotect.req_protection` {#mprotect-req_protection-doc}
Tipo: entero

Definición: nueva protección de segmentos de memoria


Constantes: [indicadores de memoria virtual](#virtual-memory-flags)



### `mprotect.vm_protection` {#mprotect-vm_protection-doc}
Tipo: entero

Definición: protección inicial de segmentos de memoria


Constantes: [indicadores de memoria virtual](#virtual-memory-flags)



### `network.device.ifindex` {#network-device-ifindex-doc}
Tipo: entero

Definición: interfaz ifindex



### `network.device.ifname` {#network-device-ifname-doc}
Tipo: cadena

Definición: interfaz ifname



### `network.l3_protocol` {#network-l3_protocol-doc}
Tipo: entero

Definición: protocolo L3 del paquete de red 


Constantes: [protocolos L3](#l3-protocols)



### `network.l4_protocol` {#network-l4_protocol-doc}
Tipo: entero

Definición: protocolo L4 del paquete de red 


Constantes: [protocolos L4](#l4-protocols)



### `network.size` {#network-size-doc}
Tipo: entero

Definición: tamaño en bytes del paquete de red 



### `open.file.destination.mode` {#open-file-destination-mode-doc}
Tipo: entero

Definición: modo del archivo creado


Constantes: [constantes del modo de archivo](#file-mode-constants)



### `open.flags` {#open-flags-doc}
Tipo: entero

Definición: indicadores utilizados al abrir el archivo


Constantes: [indicadores de apertura](#open-flags)



### `open.syscall.flags` {#open-syscall-flags-doc}
Tipo: entero

Definición: argumento Flags de syscall



### `open.syscall.mode` {#open-syscall-mode-doc}
Tipo: entero

Definición: argumento Mode de syscall



### `open.syscall.path` {#open-syscall-path-doc}
Tipo: cadena

Definición: argumento Path de syscall



### `ptrace.request` {#ptrace-request-doc}
Tipo: entero

Definición: solicitud ptrace


Constantes: [constantes Ptrace](#ptrace-constants)



### `rename.syscall.destination.path` {#rename-syscall-destination-path-doc}
Tipo: cadena

Definición: argumento Destination path de syscall



### `rename.syscall.path` {#rename-syscall-path-doc}
Tipo: cadena

Definición: argumento Path de syscall



### `selinux.bool.name` {#selinux-bool-name-doc}
Tipo: cadena

Definición: nombre booleano de SELinux



### `selinux.bool.state` {#selinux-bool-state-doc}
Tipo: cadena

Definición: nuevo valor booleano de SELinux



### `selinux.bool_commit.state` {#selinux-bool_commit-state-doc}
Tipo: booleano

Definición: indicador de una operación booleana de confirmación de SELinux



### `selinux.enforce.status` {#selinux-enforce-status-doc}
Tipo: cadena

Definición: estado de aplicación de SELinux ("enforcing", "permissive", "disabled")



### `setgid.egid` {#setgid-egid-doc}
Tipo: entero

Definición: nuevo GID efectivo del proceso



### `setgid.egroup` {#setgid-egroup-doc}
Tipo: cadena

Definición: nuevo grupo efectivo del proceso



### `setgid.fsgid` {#setgid-fsgid-doc}
Tipo: entero

Definición: nuevo GID de FileSystem del proceso



### `setgid.fsgroup` {#setgid-fsgroup-doc}
Tipo: cadena

Definición: nuevo grupo de FileSystem del proceso



### `setgid.gid` {#setgid-gid-doc}
Tipo: entero

Definición: nuevo GID del proceso



### `setgid.group` {#setgid-group-doc}
Tipo: cadena

Definición: nuevo grupo del proceso



### `setuid.euid` {#setuid-euid-doc}
Tipo: entero

Definición: nuevo UID efectivo del proceso



### `setuid.euser` {#setuid-euser-doc}
Tipo: cadena

Definición: nuevo usuario efectivo del proceso



### `setuid.fsuid` {#setuid-fsuid-doc}
Tipo: entero

Definición: nuevo UID de FileSystem del proceso



### `setuid.fsuser` {#setuid-fsuser-doc}
Tipo: cadena

Definición: nuevo usuario de FileSystem del proceso



### `setuid.uid` {#setuid-uid-doc}
Tipo: entero

Definición: nuevo UID del proceso



### `setuid.user` {#setuid-user-doc}
Tipo: cadena

Definición: nuevo usuario del proceso



### `signal.pid` {#signal-pid-doc}
Tipo: entero

Definición: PID objetivo



### `signal.type` {#signal-type-doc}
Tipo: entero

Definición: tipo de señal (ejemplo: SIGHUP, SIGINT, SIGQUIT, etc)


Constantes: [constantes de señal](#signal-constants)



### `splice.pipe_entry_flag` {#splice-pipe_entry_flag-doc}
Tipo: entero

Definición: indicador de entrada del pipe "fd_out" pasado a la syscall splice


Constantes: [indicadores de búfer del pipe](#pipe-buffer-flags)



### `splice.pipe_exit_flag` {#splice-pipe_exit_flag-doc}
Tipo: entero

Definición: indicador de salida del pipe "fd_out" pasado a la syscall splice


Constantes: [indicadores de búfer del pipe](#pipe-buffer-flags)



### `unlink.flags` {#unlink-flags-doc}
Tipo: entero

Definición: indicadores de la syscall unlink


Constantes: [indicadores unlink](#unlink-flags)



### `unlink.syscall.dirfd` {#unlink-syscall-dirfd-doc}
Tipo: entero

Definición: argumento Directory file descriptor de syscall



### `unlink.syscall.flags` {#unlink-syscall-flags-doc}
Tipo: entero

Definición: argumento Flags de syscall



### `unlink.syscall.path` {#unlink-syscall-path-doc}
Tipo: cadena

Definición: argumento Path de syscall



### `unload_module.name` {#unload_module-name-doc}
Tipo: cadena

Definición: nombre del módulo del kernel que se ha eliminado



### `utimes.syscall.path` {#utimes-syscall-path-doc}
Tipo: cadena

Definición: argumento Path de syscall



## Constantes

Las constantes se utilizan para mejorar la legibilidad de las reglas. Algunas constantes son comunes a todas las arquitecturas, otras son específicas de algunas arquitecturas.

### `BPF attach types` {#bpf-attach-types}
Los tipos de adjuntos BPF son los tipos de adjuntos del programa eBPF admitidos.

| Nombre | Arquitecturas |
| ---- |---------------|
| `BPF_CGROUP_INET_INGRESS` | todos |
| `BPF_CGROUP_INET_EGRESS` | todos |
| `BPF_CGROUP_INET_SOCK_CREATE` | todos |
| `BPF_CGROUP_SOCK_OPS` | todos |
| `BPF_SK_SKB_STREAM_PARSER` | todos |
| `BPF_SK_SKB_STREAM_VERDICT` | todos |
| `BPF_CGROUP_DEVICE` | todos |
| `BPF_SK_MSG_VERDICT` | todos |
| `BPF_CGROUP_INET4_BIND` | todos |
| `BPF_CGROUP_INET6_BIND` | todos |
| `BPF_CGROUP_INET4_CONNECT` | todos |
| `BPF_CGROUP_INET6_CONNECT` | todos |
| `BPF_CGROUP_INET4_POST_BIND` | todos |
| `BPF_CGROUP_INET6_POST_BIND` | todos |
| `BPF_CGROUP_UDP4_SENDMSG` | todos |
| `BPF_CGROUP_UDP6_SENDMSG` | todos |
| `BPF_LIRC_MODE2` | todos |
| `BPF_FLOW_DISSECTOR` | todos |
| `BPF_CGROUP_SYSCTL` | todos |
| `BPF_CGROUP_UDP4_RECVMSG` | todos |
| `BPF_CGROUP_UDP6_RECVMSG` | todos |
| `BPF_CGROUP_GETSOCKOPT` | todos |
| `BPF_CGROUP_SETSOCKOPT` | todos |
| `BPF_TRACE_RAW_TP` | todos |
| `BPF_TRACE_FENTRY` | todos |
| `BPF_TRACE_FEXIT` | todos |
| `BPF_MODIFY_RETURN` | todos |
| `BPF_LSM_MAC` | todos |
| `BPF_TRACE_ITER` | todos |
| `BPF_CGROUP_INET4_GETPEERNAME` | todos |
| `BPF_CGROUP_INET6_GETPEERNAME` | todos |
| `BPF_CGROUP_INET4_GETSOCKNAME` | todos |
| `BPF_CGROUP_INET6_GETSOCKNAME` | todos |
| `BPF_XDP_DEVMAP` | todos |
| `BPF_CGROUP_INET_SOCK_RELEASE` | todos |
| `BPF_XDP_CPUMAP` | todos |
| `BPF_SK_LOOKUP` | todos |
| `BPF_XDP` | todos |
| `BPF_SK_SKB_VERDICT` | todos |

### `BPF commands` {#bpf-commands}
Los comandos BPF se utilizan para especificar un comando a una syscall bpf.

| Nombre | Arquitecturas |
| ---- |---------------|
| `BPF_MAP_CREATE` | todos |
| `BPF_MAP_LOOKUP_ELEM` | todos |
| `BPF_MAP_UPDATE_ELEM` | todos |
| `BPF_MAP_DELETE_ELEM` | todos |
| `BPF_MAP_GET_NEXT_KEY` | todos |
| `BPF_PROG_LOAD` | todos |
| `BPF_OBJ_PIN` | todos |
| `BPF_OBJ_GET` | todos |
| `BPF_PROG_ATTACH` | todos |
| `BPF_PROG_DETACH` | todos |
| `BPF_PROG_TEST_RUN` | todos |
| `BPF_PROG_RUN` | todos |
| `BPF_PROG_GET_NEXT_ID` | todos |
| `BPF_MAP_GET_NEXT_ID` | todos |
| `BPF_PROG_GET_FD_BY_ID` | todos |
| `BPF_MAP_GET_FD_BY_ID` | todos |
| `BPF_OBJ_GET_INFO_BY_FD` | todos |
| `BPF_PROG_QUERY` | todos |
| `BPF_RAW_TRACEPOINT_OPEN` | todos |
| `BPF_BTF_LOAD` | todos |
| `BPF_BTF_GET_FD_BY_ID` | todos |
| `BPF_TASK_FD_QUERY` | todos |
| `BPF_MAP_LOOKUP_AND_DELETE_ELEM` | todos |
| `BPF_MAP_FREEZE` | todos |
| `BPF_BTF_GET_NEXT_ID` | todos |
| `BPF_MAP_LOOKUP_BATCH` | todos |
| `BPF_MAP_LOOKUP_AND_DELETE_BATCH` | todos |
| `BPF_MAP_UPDATE_BATCH` | todos |
| `BPF_MAP_DELETE_BATCH` | todos |
| `BPF_LINK_CREATE` | todos |
| `BPF_LINK_UPDATE` | todos |
| `BPF_LINK_GET_FD_BY_ID` | todos |
| `BPF_LINK_GET_NEXT_ID` | todos |
| `BPF_ENABLE_STATS` | todos |
| `BPF_ITER_CREATE` | todos |
| `BPF_LINK_DETACH` | todos |
| `BPF_PROG_BIND_MAP` | todos |

### `BPF helper functions` {#bpf-helper-functions}
Las funciones de script auxiliar de BPF son las funciones de script auxiliar de BPF compatibles.

| Nombre | Arquitecturas |
| ---- |---------------|
| `BPF_UNSPEC` | todos |
| `BPF_MAP_LOOKUP_ELEM` | todos |
| `BPF_MAP_UPDATE_ELEM` | todos |
| `BPF_MAP_DELETE_ELEM` | todos |
| `BPF_PROBE_READ` | todos |
| `BPF_KTIME_GET_NS` | todos |
| `BPF_TRACE_PRINTK` | todos |
| `BPF_GET_PRANDOM_U32` | todos |
| `BPF_GET_SMP_PROCESSOR_ID` | todos |
| `BPF_SKB_STORE_BYTES` | todos |
| `BPF_L3_CSUM_REPLACE` | todos |
| `BPF_L4_CSUM_REPLACE` | todos |
| `BPF_TAIL_CALL` | todos |
| `BPF_CLONE_REDIRECT` | todos |
| `BPF_GET_CURRENT_PID_TGID` | todos |
| `BPF_GET_CURRENT_UID_GID` | todos |
| `BPF_GET_CURRENT_COMM` | todos |
| `BPF_GET_CGROUP_CLASSID` | todos |
| `BPF_SKB_VLAN_PUSH` | todos |
| `BPF_SKB_VLAN_POP` | todos |
| `BPF_SKB_GET_TUNNEL_KEY` | todos |
| `BPF_SKB_SET_TUNNEL_KEY` | todos |
| `BPF_PERF_EVENT_READ` | todos |
| `BPF_REDIRECT` | todos |
| `BPF_GET_ROUTE_REALM` | todos |
| `BPF_PERF_EVENT_OUTPUT` | todos |
| `BPF_SKB_LOAD_BYTES` | todos |
| `BPF_GET_STACKID` | todos |
| `BPF_CSUM_DIFF` | todos |
| `BPF_SKB_GET_TUNNEL_OPT` | todos |
| `BPF_SKB_SET_TUNNEL_OPT` | todos |
| `BPF_SKB_CHANGE_PROTO` | todos |
| `BPF_SKB_CHANGE_TYPE` | todos |
| `BPF_SKB_UNDER_CGROUP` | todos |
| `BPF_GET_HASH_RECALC` | todos |
| `BPF_GET_CURRENT_TASK` | todos |
| `BPF_PROBE_WRITE_USER` | todos |
| `BPF_CURRENT_TASK_UNDER_CGROUP` | todos |
| `BPF_SKB_CHANGE_TAIL` | todos |
| `BPF_SKB_PULL_DATA` | todos |
| `BPF_CSUM_UPDATE` | todos |
| `BPF_SET_HASH_INVALID` | todos |
| `BPF_GET_NUMA_NODE_ID` | todos |
| `BPF_SKB_CHANGE_HEAD` | todos |
| `BPF_XDP_ADJUST_HEAD` | todos |
| `BPF_PROBE_READ_STR` | todos |
| `BPF_GET_SOCKET_COOKIE` | todos |
| `BPF_GET_SOCKET_UID` | todos |
| `BPF_SET_HASH` | todos |
| `BPF_SETSOCKOPT` | todos |
| `BPF_SKB_ADJUST_ROOM` | todos |
| `BPF_REDIRECT_MAP` | todos |
| `BPF_SK_REDIRECT_MAP` | todos |
| `BPF_SOCK_MAP_UPDATE` | todos |
| `BPF_XDP_ADJUST_META` | todos |
| `BPF_PERF_EVENT_READ_VALUE` | todos |
| `BPF_PERF_PROG_READ_VALUE` | todos |
| `BPF_GETSOCKOPT` | todos |
| `BPF_OVERRIDE_RETURN` | todos |
| `BPF_SOCK_OPS_CB_FLAGS_SET` | todos |
| `BPF_MSG_REDIRECT_MAP` | todos |
| `BPF_MSG_APPLY_BYTES` | todos |
| `BPF_MSG_CORK_BYTES` | todos |
| `BPF_MSG_PULL_DATA` | todos |
| `BPF_BIND` | todos |
| `BPF_XDP_ADJUST_TAIL` | todos |
| `BPF_SKB_GET_XFRM_STATE` | todos |
| `BPF_GET_STACK` | todos |
| `BPF_SKB_LOAD_BYTES_RELATIVE` | todos |
| `BPF_FIB_LOOKUP` | todos |
| `BPF_SOCK_HASH_UPDATE` | todos |
| `BPF_MSG_REDIRECT_HASH` | todos |
| `BPF_SK_REDIRECT_HASH` | todos |
| `BPF_LWT_PUSH_ENCAP` | todos |
| `BPF_LWT_SEG6_STORE_BYTES` | todos |
| `BPF_LWT_SEG6_ADJUST_SRH` | todos |
| `BPF_LWT_SEG6_ACTION` | todos |
| `BPF_RC_REPEAT` | todos |
| `BPF_RC_KEYDOWN` | todos |
| `BPF_SKB_CGROUP_ID` | todos |
| `BPF_GET_CURRENT_CGROUP_ID` | todos |
| `BPF_GET_LOCAL_STORAGE` | todos |
| `BPF_SK_SELECT_REUSEPORT` | todos |
| `BPF_SKB_ANCESTOR_CGROUP_ID` | todos |
| `BPF_SK_LOOKUP_TCP` | todos |
| `BPF_SK_LOOKUP_UDP` | todos |
| `BPF_SK_RELEASE` | todos |
| `BPF_MAP_PUSH_ELEM` | todos |
| `BPF_MAP_POP_ELEM` | todos |
| `BPF_MAP_PEEK_ELEM` | todos |
| `BPF_MSG_PUSH_DATA` | todos |
| `BPF_MSG_POP_DATA` | todos |
| `BPF_RC_POINTER_REL` | todos |
| `BPF_SPIN_LOCK` | todos |
| `BPF_SPIN_UNLOCK` | todos |
| `BPF_SK_FULLSOCK` | todos |
| `BPF_TCP_SOCK` | todos |
| `BPF_SKB_ECN_SET_CE` | todos |
| `BPF_GET_LISTENER_SOCK` | todos |
| `BPF_SKC_LOOKUP_TCP` | todos |
| `BPF_TCP_CHECK_SYNCOOKIE` | todos |
| `BPF_SYSCTL_GET_NAME` | todos |
| `BPF_SYSCTL_GET_CURRENT_VALUE` | todos |
| `BPF_SYSCTL_GET_NEW_VALUE` | todos |
| `BPF_SYSCTL_SET_NEW_VALUE` | todos |
| `BPF_STRTOL` | todos |
| `BPF_STRTOUL` | todos |
| `BPF_SK_STORAGE_GET` | todos |
| `BPF_SK_STORAGE_DELETE` | todos |
| `BPF_SEND_SIGNAL` | todos |
| `BPF_TCP_GEN_SYNCOOKIE` | todos |
| `BPF_SKB_OUTPUT` | todos |
| `BPF_PROBE_READ_USER` | todos |
| `BPF_PROBE_READ_KERNEL` | todos |
| `BPF_PROBE_READ_USER_STR` | todos |
| `BPF_PROBE_READ_KERNEL_STR` | todos |
| `BPF_TCP_SEND_ACK` | todos |
| `BPF_SEND_SIGNAL_THREAD` | todos |
| `BPF_JIFFIES64` | todos |
| `BPF_READ_BRANCH_RECORDS` | todos |
| `BPF_GET_NS_CURRENT_PID_TGID` | todos |
| `BPF_XDP_OUTPUT` | todos |
| `BPF_GET_NETNS_COOKIE` | todos |
| `BPF_GET_CURRENT_ANCESTOR_CGROUP_ID` | todos |
| `BPF_SK_ASSIGN` | todos |
| `BPF_KTIME_GET_BOOT_NS` | todos |
| `BPF_SEQ_PRINTF` | todos |
| `BPF_SEQ_WRITE` | todos |
| `BPF_SK_CGROUP_ID` | todos |
| `BPF_SK_ANCESTOR_CGROUP_ID` | todos |
| `BPF_RINGBUF_OUTPUT` | todos |
| `BPF_RINGBUF_RESERVE` | todos |
| `BPF_RINGBUF_SUBMIT` | todos |
| `BPF_RINGBUF_DISCARD` | todos |
| `BPF_RINGBUF_QUERY` | todos |
| `BPF_CSUM_LEVEL` | todos |
| `BPF_SKC_TO_TCP6_SOCK` | todos |
| `BPF_SKC_TO_TCP_SOCK` | todos |
| `BPF_SKC_TO_TCP_TIMEWAIT_SOCK` | todos |
| `BPF_SKC_TO_TCP_REQUEST_SOCK` | todos |
| `BPF_SKC_TO_UDP6_SOCK` | todos |
| `BPF_GET_TASK_STACK` | todos |
| `BPF_LOAD_HDR_OPT` | todos |
| `BPF_STORE_HDR_OPT` | todos |
| `BPF_RESERVE_HDR_OPT` | todos |
| `BPF_INODE_STORAGE_GET` | todos |
| `BPF_INODE_STORAGE_DELETE` | todos |
| `BPF_D_PATH` | todos |
| `BPF_COPY_FROM_USER` | todos |
| `BPF_SNPRINTF_BTF` | todos |
| `BPF_SEQ_PRINTF_BTF` | todos |
| `BPF_SKB_CGROUP_CLASSID` | todos |
| `BPF_REDIRECT_NEIGH` | todos |
| `BPF_PER_CPU_PTR` | todos |
| `BPF_THIS_CPU_PTR` | todos |
| `BPF_REDIRECT_PEER` | todos |
| `BPF_TASK_STORAGE_GET` | todos |
| `BPF_TASK_STORAGE_DELETE` | todos |
| `BPF_GET_CURRENT_TASK_BTF` | todos |
| `BPF_BPRM_OPTS_SET` | todos |
| `BPF_KTIME_GET_COARSE_NS` | todos |
| `BPF_IMA_INODE_HASH` | todos |
| `BPF_SOCK_FROM_FILE` | todos |
| `BPF_CHECK_MTU` | todos |
| `BPF_FOR_EACH_MAP_ELEM` | todos |
| `BPF_SNPRINTF` | todos |

### `BPF map types` {#bpf-map-types}
Los tipos de mapa de BPF son los tipos de mapa de eBPF admitidos.

| Nombre | Arquitecturas |
| ---- |---------------|
| `BPF_MAP_TYPE_UNSPEC` | todos |
| `BPF_MAP_TYPE_HASH` | todos |
| `BPF_MAP_TYPE_ARRAY` | todos |
| `BPF_MAP_TYPE_PROG_ARRAY` | todos |
| `BPF_MAP_TYPE_PERF_EVENT_ARRAY` | todos |
| `BPF_MAP_TYPE_PERCPU_HASH` | todos |
| `BPF_MAP_TYPE_PERCPU_ARRAY` | todos |
| `BPF_MAP_TYPE_STACK_TRACE` | todos |
| `BPF_MAP_TYPE_CGROUP_ARRAY` | todos |
| `BPF_MAP_TYPE_LRU_HASH` | todos |
| `BPF_MAP_TYPE_LRU_PERCPU_HASH` | todos |
| `BPF_MAP_TYPE_LPM_TRIE` | todos |
| `BPF_MAP_TYPE_ARRAY_OF_MAPS` | todos |
| `BPF_MAP_TYPE_HASH_OF_MAPS` | todos |
| `BPF_MAP_TYPE_DEVMAP` | todos |
| `BPF_MAP_TYPE_SOCKMAP` | todos |
| `BPF_MAP_TYPE_CPUMAP` | todos |
| `BPF_MAP_TYPE_XSKMAP` | todos |
| `BPF_MAP_TYPE_SOCKHASH` | todos |
| `BPF_MAP_TYPE_CGROUP_STORAGE` | todos |
| `BPF_MAP_TYPE_REUSEPORT_SOCKARRAY` | todos |
| `BPF_MAP_TYPE_PERCPU_CGROUP_STORAGE` | todos |
| `BPF_MAP_TYPE_QUEUE` | todos |
| `BPF_MAP_TYPE_STACK` | todos |
| `BPF_MAP_TYPE_SK_STORAGE` | todos |
| `BPF_MAP_TYPE_DEVMAP_HASH` | todos |
| `BPF_MAP_TYPE_STRUCT_OPS` | todos |
| `BPF_MAP_TYPE_RINGBUF` | todos |
| `BPF_MAP_TYPE_INODE_STORAGE` | todos |
| `BPF_MAP_TYPE_TASK_STORAGE` | todos |

### `BPF program types` {#bpf-program-types}
Los tipos de programa BPF son los tipos de programa eBPF admitidos.

| Nombre | Arquitecturas |
| ---- |---------------|
| `BPF_PROG_TYPE_UNSPEC` | todos |
| `BPF_PROG_TYPE_SOCKET_FILTER` | todos |
| `BPF_PROG_TYPE_KPROBE` | todos |
| `BPF_PROG_TYPE_SCHED_CLS` | todos |
| `BPF_PROG_TYPE_SCHED_ACT` | todos |
| `BPF_PROG_TYPE_TRACEPOINT` | todos |
| `BPF_PROG_TYPE_XDP` | todos |
| `BPF_PROG_TYPE_PERF_EVENT` | todos |
| `BPF_PROG_TYPE_CGROUP_SKB` | todos |
| `BPF_PROG_TYPE_CGROUP_SOCK` | todos |
| `BPF_PROG_TYPE_LWT_IN` | todos |
| `BPF_PROG_TYPE_LWT_OUT` | todos |
| `BPF_PROG_TYPE_LWT_XMIT` | todos |
| `BPF_PROG_TYPE_SOCK_OPS` | todos |
| `BPF_PROG_TYPE_SK_SKB` | todos |
| `BPF_PROG_TYPE_CGROUP_DEVICE` | todos |
| `BPF_PROG_TYPE_SK_MSG` | todos |
| `BPF_PROG_TYPE_RAW_TRACEPOINT` | todos |
| `BPF_PROG_TYPE_CGROUP_SOCK_ADDR` | todos |
| `BPF_PROG_TYPE_LWT_SEG6LOCAL` | todos |
| `BPF_PROG_TYPE_LIRC_MODE2` | todos |
| `BPF_PROG_TYPE_SK_REUSEPORT` | todos |
| `BPF_PROG_TYPE_FLOW_DISSECTOR` | todos |
| `BPF_PROG_TYPE_CGROUP_SYSCTL` | todos |
| `BPF_PROG_TYPE_RAW_TRACEPOINT_WRITABLE` | todos |
| `BPF_PROG_TYPE_CGROUP_SOCKOPT` | todos |
| `BPF_PROG_TYPE_TRACING` | todos |
| `BPF_PROG_TYPE_STRUCT_OPS` | todos |
| `BPF_PROG_TYPE_EXT` | todos |
| `BPF_PROG_TYPE_LSM` | todos |
| `BPF_PROG_TYPE_SK_LOOKUP` | todos |

### `Boolean constants` {#boolean-constants}
Las constantes booleanas son las constantes booleanas admitidas.

| Nombre | Arquitecturas |
| ---- |---------------|
| `true` | todos |
| `false` | todos |

### `DNS qclasses` {#dns-qclasses}
DNS qclasses son las clases de consulta DNS admitidas.

| Nombre | Arquitecturas |
| ---- |---------------|
| `CLASS_INET` | todos |
| `CLASS_CSNET` | todos |
| `CLASS_CHAOS` | todos |
| `CLASS_HESIOD` | todos |
| `CLASS_NONE` | todos |
| `CLASS_ANY` | todos |

### `DNS qtypes` {#dns-qtypes}
DNS qtypes son los tipos de consulta DNS admitidos.

| Nombre | Arquitecturas |
| ---- |---------------|
| `None` | todos |
| `A` | todos |
| `NS` | todos |
| `MD` | todos |
| `MF` | todos |
| `CNAME` | todos |
| `SOA` | todos |
| `MB` | todos |
| `MG` | todos |
| `MR` | todos |
| `NULL` | todos |
| `PTR` | todos |
| `HINFO` | todos |
| `MINFO` | todos |
| `MX` | todos |
| `TXT` | todos |
| `RP` | todos |
| `AFSDB` | todos |
| `X25` | todos |
| `ISDN` | todos |
| `RT` | todos |
| `NSAPPTR` | todos |
| `SIG` | todos |
| `KEY` | todos |
| `PX` | todos |
| `GPOS` | todos |
| `AAAA` | todos |
| `LOC` | todos |
| `NXT` | todos |
| `EID` | todos |
| `NIMLOC` | todos |
| `SRV` | todos |
| `ATMA` | todos |
| `NAPTR` | todos |
| `KX` | todos |
| `CERT` | todos |
| `DNAME` | todos |
| `OPT` | todos |
| `APL` | todos |
| `DS` | todos |
| `SSHFP` | todos |
| `RRSIG` | todos |
| `NSEC` | todos |
| `DNSKEY` | todos |
| `DHCID` | todos |
| `NSEC3` | todos |
| `NSEC3PARAM` | todos |
| `TLSA` | todos |
| `SMIMEA` | todos |
| `HIP` | todos |
| `NINFO` | todos |
| `RKEY` | todos |
| `TALINK` | todos |
| `CDS` | todos |
| `CDNSKEY` | todos |
| `OPENPGPKEY` | todos |
| `CSYNC` | todos |
| `ZONEMD` | todos |
| `SVCB` | todos |
| `HTTPS` | todos |
| `SPF` | todos |
| `UINFO` | todos |
| `UID` | todos |
| `GID` | todos |
| `UNSPEC` | todos |
| `NID` | todos |
| `L32` | todos |
| `L64` | todos |
| `LP` | todos |
| `EUI48` | todos |
| `EUI64` | todos |
| `URI` | todos |
| `CAA` | todos |
| `AVC` | todos |
| `TKEY` | todos |
| `TSIG` | todos |
| `IXFR` | todos |
| `AXFR` | todos |
| `MAILB` | todos |
| `MAILA` | todos |
| `ANY` | todos |
| `TA` | todos |
| `DLV` | todos |
| `Reserved` | todos |

### `Error constants` {#error-constants}
Las constantes de error son las constantes de error admitidas.

| Nombre | Arquitecturas |
| ---- |---------------|
| `E2BIG` | todos |
| `EACCES` | todos |
| `EADDRINUSE` | todos |
| `EADDRNOTAVAIL` | todos |
| `EADV` | todos |
| `EAFNOSUPPORT` | todos |
| `EAGAIN` | todos |
| `EALREADY` | todos |
| `EBADE` | todos |
| `EBADF` | todos |
| `EBADFD` | todos |
| `EBADMSG` | todos |
| `EBADR` | todos |
| `EBADRQC` | todos |
| `EBADSLT` | todos |
| `EBFONT` | todos |
| `EBUSY` | todos |
| `ECANCELED` | todos |
| `ECHILD` | todos |
| `ECHRNG` | todos |
| `ECOMM` | todos |
| `ECONNABORTED` | todos |
| `ECONNREFUSED` | todos |
| `ECONNRESET` | todos |
| `EDEADLK` | todos |
| `EDEADLOCK` | todos |
| `EDESTADDRREQ` | todos |
| `EDOM` | todos |
| `EDOTDOT` | todos |
| `EDQUOT` | todos |
| `EEXIST` | todos |
| `EFAULT` | todos |
| `EFBIG` | todos |
| `EHOSTDOWN` | todos |
| `EHOSTUNREACH` | todos |
| `EIDRM` | todos |
| `EILSEQ` | todos |
| `EINPROGRESS` | todos |
| `EINTR` | todos |
| `EINVAL` | todos |
| `EIO` | todos |
| `EISCONN` | todos |
| `EISDIR` | todos |
| `EISNAM` | todos |
| `EKEYEXPIRED` | todos |
| `EKEYREJECTED` | todos |
| `EKEYREVOKED` | todos |
| `EL2HLT` | todos |
| `EL2NSYNC` | todos |
| `EL3HLT` | todos |
| `EL3RST` | todos |
| `ELIBACC` | todos |
| `ELIBBAD` | todos |
| `ELIBEXEC` | todos |
| `ELIBMAX` | todos |
| `ELIBSCN` | todos |
| `ELNRNG` | todos |
| `ELOOP` | todos |
| `EMEDIUMTYPE` | todos |
| `EMFILE` | todos |
| `EMLINK` | todos |
| `EMSGSIZE` | todos |
| `EMULTIHOP` | todos |
| `ENAMETOOLONG` | todos |
| `ENAVAIL` | todos |
| `ENETDOWN` | todos |
| `ENETRESET` | todos |
| `ENETUNREACH` | todos |
| `ENFILE` | todos |
| `ENOANO` | todos |
| `ENOBUFS` | todos |
| `ENOCSI` | todos |
| `ENODATA` | todos |
| `ENODEV` | todos |
| `ENOENT` | todos |
| `ENOEXEC` | todos |
| `ENOKEY` | todos |
| `ENOLCK` | todos |
| `ENOLINK` | todos |
| `ENOMEDIUM` | todos |
| `ENOMEM` | todos |
| `ENOMSG` | todos |
| `ENONET` | todos |
| `ENOPKG` | todos |
| `ENOPROTOOPT` | todos |
| `ENOSPC` | todos |
| `ENOSR` | todos |
| `ENOSTR` | todos |
| `ENOSYS` | todos |
| `ENOTBLK` | todos |
| `ENOTCONN` | todos |
| `ENOTDIR` | todos |
| `ENOTEMPTY` | todos |
| `ENOTNAM` | todos |
| `ENOTRECOVERABLE` | todos |
| `ENOTSOCK` | todos |
| `ENOTSUP` | todos |
| `ENOTTY` | todos |
| `ENOTUNIQ` | todos |
| `ENXIO` | todos |
| `EOPNOTSUPP` | todos |
| `EOVERFLOW` | todos |
| `EOWNERDEAD` | todos |
| `EPERM` | todos |
| `EPFNOSUPPORT` | todos |
| `EPIPE` | todos |
| `EPROTO` | todos |
| `EPROTONOSUPPORT` | todos |
| `EPROTOTYPE` | todos |
| `ERANGE` | todos |
| `EREMCHG` | todos |
| `EREMOTE` | todos |
| `EREMOTEIO` | todos |
| `ERESTART` | todos |
| `ERFKILL` | todos |
| `EROFS` | todos |
| `ESHUTDOWN` | todos |
| `ESOCKTNOSUPPORT` | todos |
| `ESPIPE` | todos |
| `ESRCH` | todos |
| `ESRMNT` | todos |
| `ESTALE` | todos |
| `ESTRPIPE` | todos |
| `ETIME` | todos |
| `ETIMEDOUT` | todos |
| `ETOOMANYREFS` | todos |
| `ETXTBSY` | todos |
| `EUCLEAN` | todos |
| `EUNATCH` | todos |
| `EUSERS` | todos |
| `EWOULDBLOCK` | todos |
| `EXDEV` | todos |
| `EXFULL` | todos |

### `File mode constants` {#file-mode-constants}
Las constantes de modo de archivo son los permisos de archivo admitidos, así como las constantes para los bits set-user-ID, set-group-ID y sticky.

| Nombre | Arquitecturas |
| ---- |---------------|
| `S_ISUID` | todos |
| `S_ISGID` | todos |
| `S_ISVTX` | todos |
| `S_IRWXU` | todos |
| `S_IRUSR` | todos |
| `S_IWUSR` | todos |
| `S_IXUSR` | todos |
| `S_IRWXG` | todos |
| `S_IRGRP` | todos |
| `S_IWGRP` | todos |
| `S_IXGRP` | todos |
| `S_IRWXO` | todos |
| `S_IROTH` | todos |
| `S_IWOTH` | todos |
| `S_IXOTH` | todos |

### `Inode mode constants` {#inode-mode-constants}
Las constantes de modo de nodo índice son las constantes de tipo de archivo admitidas, así como las constantes de modo de archivo.

| Nombre | Arquitecturas |
| ---- |---------------|
| `S_IFMT` | todos |
| `S_IFSOCK` | todos |
| `S_IFLNK` | todos |
| `S_IFREG` | todos |
| `S_IFBLK` | todos |
| `S_IFDIR` | todos |
| `S_IFCHR` | todos |
| `S_IFIFO` | todos |
| `S_ISUID` | todos |
| `S_ISGID` | todos |
| `S_ISVTX` | todos |
| `S_IRWXU` | todos |
| `S_IRUSR` | todos |
| `S_IWUSR` | todos |
| `S_IXUSR` | todos |
| `S_IRWXG` | todos |
| `S_IRGRP` | todos |
| `S_IWGRP` | todos |
| `S_IXGRP` | todos |
| `S_IRWXO` | todos |
| `S_IROTH` | todos |
| `S_IWOTH` | todos |
| `S_IXOTH` | todos |

### `Kernel Capability constants` {#kernel-capability-constants}
Las constantes de capacidad del kernel son las capacidades del kernel de Linux admitidas.

| Nombre | Arquitecturas |
| ---- |---------------|
| `CAP_AUDIT_CONTROL` | todos |
| `CAP_AUDIT_READ` | todos |
| `CAP_AUDIT_WRITE` | todos |
| `CAP_BLOCK_SUSPEND` | todos |
| `CAP_BPF` | todos |
| `CAP_CHECKPOINT_RESTORE` | todos |
| `CAP_CHOWN` | todos |
| `CAP_DAC_OVERRIDE` | todos |
| `CAP_DAC_READ_SEARCH` | todos |
| `CAP_FOWNER` | todos |
| `CAP_FSETID` | todos |
| `CAP_IPC_LOCK` | todos |
| `CAP_IPC_OWNER` | todos |
| `CAP_KILL` | todos |
| `CAP_LEASE` | todos |
| `CAP_LINUX_IMMUTABLE` | todos |
| `CAP_MAC_ADMIN` | todos |
| `CAP_MAC_OVERRIDE` | todos |
| `CAP_MKNOD` | todos |
| `CAP_NET_ADMIN` | todos |
| `CAP_NET_BIND_SERVICE` | todos |
| `CAP_NET_BROADCAST` | todos |
| `CAP_NET_RAW` | todos |
| `CAP_PERFMON` | todos |
| `CAP_SETFCAP` | todos |
| `CAP_SETGID` | todos |
| `CAP_SETPCAP` | todos |
| `CAP_SETUID` | todos |
| `CAP_SYSLOG` | todos |
| `CAP_SYS_ADMIN` | todos |
| `CAP_SYS_BOOT` | todos |
| `CAP_SYS_CHROOT` | todos |
| `CAP_SYS_MODULE` | todos |
| `CAP_SYS_NICE` | todos |
| `CAP_SYS_PACCT` | todos |
| `CAP_SYS_PTRACE` | todos |
| `CAP_SYS_RAWIO` | todos |
| `CAP_SYS_RESOURCE` | todos |
| `CAP_SYS_TIME` | todos |
| `CAP_SYS_TTY_CONFIG` | todos |
| `CAP_WAKE_ALARM` | todos |

### `L3 protocols` {#l3-protocols}
Los protocolos L3 son los protocolos de capa 3 admitidos.

| Nombre | Arquitecturas |
| ---- |---------------|
| `ETH_P_LOOP` | todos |
| `ETH_P_PUP` | todos |
| `ETH_P_PUPAT` | todos |
| `ETH_P_TSN` | todos |
| `ETH_P_IP` | todos |
| `ETH_P_X25` | todos |
| `ETH_P_ARP` | todos |
| `ETH_P_BPQ` | todos |
| `ETH_P_IEEEPUP` | todos |
| `ETH_P_IEEEPUPAT` | todos |
| `ETH_P_BATMAN` | todos |
| `ETH_P_DEC` | todos |
| `ETH_P_DNADL` | todos |
| `ETH_P_DNARC` | todos |
| `ETH_P_DNART` | todos |
| `ETH_P_LAT` | todos |
| `ETH_P_DIAG` | todos |
| `ETH_P_CUST` | todos |
| `ETH_P_SCA` | todos |
| `ETH_P_TEB` | todos |
| `ETH_P_RARP` | todos |
| `ETH_P_ATALK` | todos |
| `ETH_P_AARP` | todos |
| `ETH_P_8021_Q` | todos |
| `ETH_P_ERSPAN` | todos |
| `ETH_P_IPX` | todos |
| `ETH_P_IPV6` | todos |
| `ETH_P_PAUSE` | todos |
| `ETH_P_SLOW` | todos |
| `ETH_P_WCCP` | todos |
| `ETH_P_MPLSUC` | todos |
| `ETH_P_MPLSMC` | todos |
| `ETH_P_ATMMPOA` | todos |
| `ETH_P_PPPDISC` | todos |
| `ETH_P_PPPSES` | todos |
| `ETH_P__LINK_CTL` | todos |
| `ETH_P_ATMFATE` | todos |
| `ETH_P_PAE` | todos |
| `ETH_P_AOE` | todos |
| `ETH_P_8021_AD` | todos |
| `ETH_P_802_EX1` | todos |
| `ETH_P_TIPC` | todos |
| `ETH_P_MACSEC` | todos |
| `ETH_P_8021_AH` | todos |
| `ETH_P_MVRP` | todos |
| `ETH_P_1588` | todos |
| `ETH_P_NCSI` | todos |
| `ETH_P_PRP` | todos |
| `ETH_P_FCOE` | todos |
| `ETH_P_IBOE` | todos |
| `ETH_P_TDLS` | todos |
| `ETH_P_FIP` | todos |
| `ETH_P_80221` | todos |
| `ETH_P_HSR` | todos |
| `ETH_P_NSH` | todos |
| `ETH_P_LOOPBACK` | todos |
| `ETH_P_QINQ1` | todos |
| `ETH_P_QINQ2` | todos |
| `ETH_P_QINQ3` | todos |
| `ETH_P_EDSA` | todos |
| `ETH_P_IFE` | todos |
| `ETH_P_AFIUCV` | todos |
| `ETH_P_8023_MIN` | todos |
| `ETH_P_IPV6_HOP_BY_HOP` | todos |
| `ETH_P_8023` | todos |
| `ETH_P_AX25` | todos |
| `ETH_P_ALL` | todos |
| `ETH_P_8022` | todos |
| `ETH_P_SNAP` | todos |
| `ETH_P_DDCMP` | todos |
| `ETH_P_WANPPP` | todos |
| `ETH_P_PPPMP` | todos |
| `ETH_P_LOCALTALK` | todos |
| `ETH_P_CAN` | todos |
| `ETH_P_CANFD` | todos |
| `ETH_P_PPPTALK` | todos |
| `ETH_P_TR8022` | todos |
| `ETH_P_MOBITEX` | todos |
| `ETH_P_CONTROL` | todos |
| `ETH_P_IRDA` | todos |
| `ETH_P_ECONET` | todos |
| `ETH_P_HDLC` | todos |
| `ETH_P_ARCNET` | todos |
| `ETH_P_DSA` | todos |
| `ETH_P_TRAILER` | todos |
| `ETH_P_PHONET` | todos |
| `ETH_P_IEEE802154` | todos |
| `ETH_P_CAIF` | todos |
| `ETH_P_XDSA` | todos |
| `ETH_P_MAP` | todos |

### `L4 protocols` {#l4-protocols}
Los protocolos L4 son los protocolos de capa 4 admitidos.

| Nombre | Arquitecturas |
| ---- |---------------|
| `IP_PROTO_IP` | todos |
| `IP_PROTO_ICMP` | todos |
| `IP_PROTO_IGMP` | todos |
| `IP_PROTO_IPIP` | todos |
| `IP_PROTO_TCP` | todos |
| `IP_PROTO_EGP` | todos |
| `IP_PROTO_IGP` | todos |
| `IP_PROTO_PUP` | todos |
| `IP_PROTO_UDP` | todos |
| `IP_PROTO_IDP` | todos |
| `IP_PROTO_TP` | todos |
| `IP_PROTO_DCCP` | todos |
| `IP_PROTO_IPV6` | todos |
| `IP_PROTO_RSVP` | todos |
| `IP_PROTO_GRE` | todos |
| `IP_PROTO_ESP` | todos |
| `IP_PROTO_AH` | todos |
| `IP_PROTO_ICMPV6` | todos |
| `IP_PROTO_MTP` | todos |
| `IP_PROTO_BEETPH` | todos |
| `IP_PROTO_ENCAP` | todos |
| `IP_PROTO_PIM` | todos |
| `IP_PROTO_COMP` | todos |
| `IP_PROTO_SCTP` | todos |
| `IP_PROTO_UDPLITE` | todos |
| `IP_PROTO_MPLS` | todos |
| `IP_PROTO_RAW` | todos |

### `MMap flags` {#mmap-flags}
Los indicadores MMap son los indicadores admitidos para la syscall mmap.

| Nombre | Arquitecturas |
| ---- |---------------|
| `MAP_SHARED` | todos |
| `MAP_PRIVATE` | todos |
| `MAP_SHARED_VALIDATE` | todos |
| `MAP_ANON` | todos |
| `MAP_ANONYMOUS` | todos |
| `MAP_DENYWRITE` | todos |
| `MAP_EXECUTABLE` | todos |
| `MAP_FIXED` | todos |
| `MAP_FIXED_NOREPLACE` | todos |
| `MAP_GROWSDOWN` | todos |
| `MAP_HUGETLB` | todos |
| `MAP_LOCKED` | todos |
| `MAP_NONBLOCK` | todos |
| `MAP_NORESERVE` | todos |
| `MAP_POPULATE` | todos |
| `MAP_STACK` | todos |
| `MAP_SYNC` | todos |
| `MAP_UNINITIALIZED` | todos |
| `MAP_HUGE_16KB` | todos |
| `MAP_HUGE_64KB` | todos |
| `MAP_HUGE_512KB` | todos |
| `MAP_HUGE_1MB` | todos |
| `MAP_HUGE_2MB` | todos |
| `MAP_HUGE_8MB` | todos |
| `MAP_HUGE_16MB` | todos |
| `MAP_HUGE_32MB` | todos |
| `MAP_HUGE_256MB` | todos |
| `MAP_HUGE_512MB` | todos |
| `MAP_HUGE_1GB` | todos |
| `MAP_HUGE_2GB` | todos |
| `MAP_HUGE_16GB` | todos |
| `MAP_32BIT` | amd64 |

### `Network Address Family constants` {#network-address-family-constants}
Las constantes de familia de direcciones de red son las familias de direcciones red admitidas.

| Nombre | Arquitecturas |
| ---- |---------------|
| `AF_UNSPEC` | todos |
| `AF_LOCAL` | todos |
| `AF_UNIX` | todos |
| `AF_FILE` | todos |
| `AF_INET` | todos |
| `AF_AX25` | todos |
| `AF_IPX` | todos |
| `AF_APPLETALK` | todos |
| `AF_NETROM` | todos |
| `AF_BRIDGE` | todos |
| `AF_ATMPVC` | todos |
| `AF_X25` | todos |
| `AF_INET6` | todos |
| `AF_ROSE` | todos |
| `AF_DECnet` | todos |
| `AF_NETBEUI` | todos |
| `AF_SECURITY` | todos |
| `AF_KEY` | todos |
| `AF_NETLINK` | todos |
| `AF_ROUTE` | todos |
| `AF_PACKET` | todos |
| `AF_ASH` | todos |
| `AF_ECONET` | todos |
| `AF_ATMSVC` | todos |
| `AF_RDS` | todos |
| `AF_SNA` | todos |
| `AF_IRDA` | todos |
| `AF_PPPOX` | todos |
| `AF_WANPIPE` | todos |
| `AF_LLC` | todos |
| `AF_IB` | todos |
| `AF_MPLS` | todos |
| `AF_CAN` | todos |
| `AF_TIPC` | todos |
| `AF_BLUETOOTH` | todos |
| `AF_IUCV` | todos |
| `AF_RXRPC` | todos |
| `AF_ISDN` | todos |
| `AF_PHONET` | todos |
| `AF_IEEE802154` | todos |
| `AF_CAIF` | todos |
| `AF_ALG` | todos |
| `AF_NFC` | todos |
| `AF_VSOCK` | todos |
| `AF_KCM` | todos |
| `AF_QIPCRTR` | todos |
| `AF_SMC` | todos |
| `AF_XDP` | todos |
| `AF_MAX` | todos |

### `Open flags` {#open-flags}
Los indicadores de apertura son los indicadores admitidos para syscall open.

| Nombre | Arquitecturas |
| ---- |---------------|
| `O_RDONLY` | todos |
| `O_WRONLY` | todos |
| `O_RDWR` | todos |
| `O_APPEND` | todos |
| `O_CREAT` | todos |
| `O_EXCL` | todos |
| `O_SYNC` | todos |
| `O_TRUNC` | todos |
| `O_ACCMODE` | todos |
| `O_ASYNC` | todos |
| `O_CLOEXEC` | todos |
| `O_DIRECT` | todos |
| `O_DIRECTORY` | todos |
| `O_DSYNC` | todos |
| `O_FSYNC` | todos |
| `O_NDELAY` | todos |
| `O_NOATIME` | todos |
| `O_NOCTTY` | todos |
| `O_NOFOLLOW` | todos |
| `O_NONBLOCK` | todos |
| `O_RSYNC` | todos |

### `Pipe buffer flags` {#pipe-buffer-flags}
Los indicadores de búfer del pipe son los indicadores admitidos para un búfer del pipe.

| Nombre | Arquitecturas |
| ---- |---------------|
| `PIPE_BUF_FLAG_LRU` | todos |
| `PIPE_BUF_FLAG_ATOMIC` | todos |
| `PIPE_BUF_FLAG_GIFT` | todos |
| `PIPE_BUF_FLAG_PACKET` | todos |
| `PIPE_BUF_FLAG_CAN_MERGE` | todos |
| `PIPE_BUF_FLAG_WHOLE` | todos |
| `PIPE_BUF_FLAG_LOSS` | todos |

### `Protection constants` {#protection-constants}
Las constantes de protección son las protecciones admitidas para la syscall mmap.

| Nombre | Arquitecturas |
| ---- |---------------|
| `PROT_NONE` | todos |
| `PROT_READ` | todos |
| `PROT_WRITE` | todos |
| `PROT_EXEC` | todos |
| `PROT_GROWSDOWN` | todos |
| `PROT_GROWSUP` | todos |

### `Ptrace constants` {#ptrace-constants}
Las constantes ptrace son los comandos ptrace admitidos para la syscall ptrace.

| Nombre | Arquitecturas |
| ---- |---------------|
| `PTRACE_TRACEME` | todos |
| `PTRACE_PEEKTEXT` | todos |
| `PTRACE_PEEKDATA` | todos |
| `PTRACE_PEEKUSR` | todos |
| `PTRACE_POKETEXT` | todos |
| `PTRACE_POKEDATA` | todos |
| `PTRACE_POKEUSR` | todos |
| `PTRACE_CONT` | todos |
| `PTRACE_KILL` | todos |
| `PTRACE_SINGLESTEP` | todos |
| `PTRACE_ATTACH` | todos |
| `PTRACE_DETACH` | todos |
| `PTRACE_SYSCALL` | todos |
| `PTRACE_SETOPTIONS` | todos |
| `PTRACE_GETEVENTMSG` | todos |
| `PTRACE_GETSIGINFO` | todos |
| `PTRACE_SETSIGINFO` | todos |
| `PTRACE_GETREGSET` | todos |
| `PTRACE_SETREGSET` | todos |
| `PTRACE_SEIZE` | todos |
| `PTRACE_INTERRUPT` | todos |
| `PTRACE_LISTEN` | todos |
| `PTRACE_PEEKSIGINFO` | todos |
| `PTRACE_GETSIGMASK` | todos |
| `PTRACE_SETSIGMASK` | todos |
| `PTRACE_SECCOMP_GET_FILTER` | todos |
| `PTRACE_SECCOMP_GET_METADATA` | todos |
| `PTRACE_GET_SYSCALL_INFO` | todos |
| `PTRACE_GETFPREGS` | amd64, arm |
| `PTRACE_SETFPREGS` | amd64, arm |
| `PTRACE_GETFPXREGS` | amd64 |
| `PTRACE_SETFPXREGS` | amd64 |
| `PTRACE_OLDSETOPTIONS` | amd64, arm |
| `PTRACE_GET_THREAD_AREA` | amd64, arm |
| `PTRACE_SET_THREAD_AREA` | amd64 |
| `PTRACE_ARCH_PRCTL` | amd64 |
| `PTRACE_SYSEMU` | amd64, arm64 |
| `PTRACE_SYSEMU_SINGLESTEP` | amd64, arm64 |
| `PTRACE_SINGLEBLOCK` | amd64 |
| `PTRACE_GETCRUNCHREGS` | arm |
| `PTRACE_GETFDPIC` | arm |
| `PTRACE_GETFDPIC_EXEC` | arm |
| `PTRACE_GETFDPIC_INTERP` | arm |
| `PTRACE_GETHBPREGS` | arm |
| `PTRACE_GETVFPREGS` | arm |
| `PTRACE_GETWMMXREGS` | arm |
| `PTRACE_SETCRUNCHREGS` | arm |
| `PTRACE_SETHBPREGS` | arm |
| `PTRACE_SETVFPREGS` | arm |
| `PTRACE_SETWMMXREGS` | arm |
| `PTRACE_SET_SYSCALL` | arm |
| `PTRACE_PEEKMTETAGS` | arm64 |
| `PTRACE_POKEMTETAGS` | arm64 |

### `Signal constants` {#signal-constants}
Las constantes de señal son las señales admitidas para la syscall kill.

| Nombre | Arquitecturas |
| ---- |---------------|
| `SIGHUP` | todos |
| `SIGINT` | todos |
| `SIGQUIT` | todos |
| `SIGILL` | todos |
| `SIGTRAP` | todos |
| `SIGABRT` | todos |
| `SIGIOT` | todos |
| `SIGBUS` | todos |
| `SIGFPE` | todos |
| `SIGKILL` | todos |
| `SIGUSR1` | todos |
| `SIGSEGV` | todos |
| `SIGUSR2` | todos |
| `SIGPIPE` | todos |
| `SIGALRM` | todos |
| `SIGTERM` | todos |
| `SIGSTKFLT` | todos |
| `SIGCHLD` | todos |
| `SIGCONT` | todos |
| `SIGSTOP` | todos |
| `SIGTSTP` | todos |
| `SIGTTIN` | todos |
| `SIGTTOU` | todos |
| `SIGURG` | todos |
| `SIGXCPU` | todos |
| `SIGXFSZ` | todos |
| `SIGVTALRM` | todos |
| `SIGPROF` | todos |
| `SIGWINCH` | todos |
| `SIGIO` | todos |
| `SIGPOLL` | todos |
| `SIGPWR` | todos |
| `SIGSYS` | todos |

### `Unlink flags` {#unlink-flags}
Los indicadores unlink son los indicadores admitidos para la syscall unlink.

| Nombre | Arquitecturas |
| ---- |---------------|
| `AT_REMOVEDIR` | todos |

### `Virtual Memory flags` {#virtual-memory-flags}
Los indicadores de memoria virtual definen la protección de un segmento de memoria virtual.

| Nombre | Arquitecturas |
| ---- |---------------|
| `VM_NONE` | todos |
| `VM_READ` | todos |
| `VM_WRITE` | todos |
| `VM_EXEC` | todos |
| `VM_SHARED` | todos |
| `VM_MAYREAD` | todos |
| `VM_MAYWRITE` | todos |
| `VM_MAYEXEC` | todos |
| `VM_MAYSHARE` | todos |
| `VM_GROWSDOWN` | todos |
| `VM_UFFD_MISSING` | todos |
| `VM_PFNMAP` | todos |
| `VM_UFFD_WP` | todos |
| `VM_LOCKED` | todos |
| `VM_IO` | todos |
| `VM_SEQ_READ` | todos |
| `VM_RAND_READ` | todos |
| `VM_DONTCOPY` | todos |
| `VM_DONTEXPAND` | todos |
| `VM_LOCKONFAULT` | todos |
| `VM_ACCOUNT` | todos |
| `VM_NORESERVE` | todos |
| `VM_HUGETLB` | todos |
| `VM_SYNC` | todos |
| `VM_ARCH_1` | todos |
| `VM_WIPEONFORK` | todos |
| `VM_DONTDUMP` | todos |
| `VM_SOFTDIRTY` | todos |
| `VM_MIXEDMAP` | todos |
| `VM_HUGEPAGE` | todos |
| `VM_NOHUGEPAGE` | todos |
| `VM_MERGEABLE` | todos |



{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/threats/agent