---
description: Atributos y ayudantes de Windows Agent para reglas de CSM Threats
disable_edit: true
further_reading:
- link: /security/cloud_workload_security/getting_started/
  tag: Documentación
  text: Empezar con Datadog CSM Threats
title: Atributos y ayudantes de Windows Agent
---
<!--  EXTRAÍDO DE https://github.com/DataDog/datadog-agent -->


<!-- ESTE ARCHIVO SE GENERA AUTOMÁTICAMENTE. EDÍTALO EN LA CARPETA SCRIPTS/PLANTILLAS -->

## Atributos y ayudantes de Windows Agent
Esta documentación describe los atributos y los ayudantes de Windows del [Security Language (SECL) de Datadog][1].

Las reglas que utilicen atributos y ayudantes de Windows deben incluir un campo de filtro de regla de sistema operativo como el siguiente.


{{< code-block lang="yaml" >}}
id: [...]
expression: [...]
filters:
  - Sistema operativo == "Windows"

{{< /code-block >}}

## Activadores
Los activadores son eventos que corresponden a tipos de actividad observados por el sistema. El conjunto de activadores admitidos actualmente es:

| Evento SECL | Tipo | Definición | Versión del Agent |
| ---------- | ---- | ---------- | ------------- |
| `change_permission` | Registro | Se ha modificado un permiso | 7.55 |
| `create` | Archivo | Se ha creado un archivo | 7.52 |
| `create_key` | Registro | Se ha creado una clave de registro | 7.52 |
| `delete` | Archivo | Se ha eliminado un archivo | 7.54 |
| `delete_key` | Registro | Se ha eliminado una clave de registro | 7.52 |
| `exec` | Proceso | Se ha ejecutado o bifurcado un proceso  | 7.27 |
| `exit` | Proceso | Se ha cerrado un proceso | 7.38 |
| `open_key` | Registro | Se ha abierto una clave de registro | 7.52 |
| `rename` | Archivo | Se ha renombrado un archivo | 7.54 |
| `set_key_value` | Registro | Se ha definido un valor de clave de registro | 7.52 |
| `write` | Archivo | Se ha escrito un archivo | 7.54 |

## Variables
Las variables SECL son variables predefinidas que pueden utilizarse como valores o como parte de valores.

Por ejemplo, la regla que utiliza una variable `process.pid` tiene este aspecto:


{{< code-block lang="javascript" >}}
open.file.path == "/proc/${process.pid}/maps"

{{< /code-block >}}

Lista de las variables disponibles:

| Variable SECL         |  Definición                           | Versión del Agent |
|-----------------------|---------------------------------------|---------------|
| `process.pid`         | PID de proceso                           | 7.33          |

## Atributos de evento

### Común a todos los tipos de eventos

| Propiedad | Definición |
| -------- | ------------- |
| [`container.created_at`](#container-created_at-doc) | Marca de tiempo de la creación del contenedor |
| [`container.id`](#container-id-doc) | ID del contenedor |
| [`container.runtime`](#container-runtime-doc) | Tiempo de ejecución que gestiona el contenedor |
| [`container.tags`](#container-tags-doc) | Etiquetas (tags) del contenedor |
| [`event.hostname`](#event-hostname-doc) | Nombre de host asociado al evento |
| [`event.origin`](#event-origin-doc) | Origen del evento |
| [`event.os`](#event-os-doc) | Sistema operativo del evento |
| [`event.service`](#event-service-doc) | Servicio asociado al evento |
| [`event.timestamp`](#event-timestamp-doc) | Marca de tiempo del evento |
| [`process.ancestors.cmdline`](#common-process-cmdline-doc) | Línea de comandos del proceso |
| [`process.ancestors.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`process.ancestors.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`process.ancestors.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`process.ancestors.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`process.ancestors.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`process.ancestors.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.ancestors.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`process.ancestors.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.ancestors.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID del grupo de subprocesos) |
| [`process.ancestors.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`process.ancestors.user`](#common-process-user-doc) | Nombre de usuario |
| [`process.ancestors.user_sid`](#common-process-user_sid-doc) | SId del usuario del proceso |
| [`process.cmdline`](#common-process-cmdline-doc) | Línea de comandos del proceso |
| [`process.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`process.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`process.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`process.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`process.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`process.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`process.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.parent.cmdline`](#common-process-cmdline-doc) | Línea de comandos del proceso |
| [`process.parent.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`process.parent.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`process.parent.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`process.parent.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`process.parent.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`process.parent.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.parent.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`process.parent.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`process.parent.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID del grupo de subprocesos) |
| [`process.parent.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`process.parent.user`](#common-process-user-doc) | Nombre de usuario |
| [`process.parent.user_sid`](#common-process-user_sid-doc) | SId del usuario del proceso |
| [`process.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID del grupo de subprocesos) |
| [`process.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`process.user`](#common-process-user-doc) | Nombre de usuario |
| [`process.user_sid`](#common-process-user_sid-doc) | SId del usuario del proceso |

### Evento `change_permission`

Se ha modificado un permiso

| Propiedad | Definición |
| -------- | ------------- |
| [`change_permission.new_sd`](#change_permission-new_sd-doc) | Nuevo descriptor de seguridad del objeto cuyo permiso se ha modificado |
| [`change_permission.old_sd`](#change_permission-old_sd-doc) | Descriptor de seguridad original del objeto cuyo permiso se ha modificado |
| [`change_permission.path`](#change_permission-path-doc) | Nombre del objeto cuyo permiso se ha modificado |
| [`change_permission.type`](#change_permission-type-doc) | Tipo de objeto cuyo permiso se ha modificado |
| [`change_permission.user_domain`](#change_permission-user_domain-doc) | Nombre de dominio del autor del cambio de permiso |
| [`change_permission.username`](#change_permission-username-doc) | Nombre de usuario del autor del cambio de permiso |

### Evento `create`

Se ha creado un archivo

| Propiedad | Definición |
| -------- | ------------- |
| [`create.file.device_path`](#common-fimfileevent-device_path-doc) | Ruta del archivo |
| [`create.file.device_path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`create.file.name`](#common-fimfileevent-name-doc) | Nombre base del archivo |
| [`create.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`create.file.path`](#common-fimfileevent-path-doc) | Ruta del archivo |
| [`create.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |

### Evento `create_key`

Se ha creado una clave de registro

| Propiedad | Definición |
| -------- | ------------- |
| [`create.registry.key_name`](#common-registryevent-key_name-doc) | Nombre del registro |
| [`create.registry.key_name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`create.registry.key_path`](#common-registryevent-key_path-doc) | Ruta del registro |
| [`create.registry.key_path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`create_key.registry.key_name`](#common-registryevent-key_name-doc) | Nombre del registro |
| [`create_key.registry.key_name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`create_key.registry.key_path`](#common-registryevent-key_path-doc) | Ruta del registro |
| [`create_key.registry.key_path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |

### Evento `delete`

Se ha eliminado un archivo

| Propiedad | Definición |
| -------- | ------------- |
| [`delete.file.device_path`](#common-fimfileevent-device_path-doc) | Ruta del archivo |
| [`delete.file.device_path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`delete.file.name`](#common-fimfileevent-name-doc) | Nombre base del archivo |
| [`delete.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`delete.file.path`](#common-fimfileevent-path-doc) | Ruta del archivo |
| [`delete.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |

### Evento `delete_key`

Se ha eliminado una clave de registro

| Propiedad | Definición |
| -------- | ------------- |
| [`delete.registry.key_name`](#common-registryevent-key_name-doc) | Nombre del registro |
| [`delete.registry.key_name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`delete.registry.key_path`](#common-registryevent-key_path-doc) | Ruta del registro |
| [`delete.registry.key_path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`delete_key.registry.key_name`](#common-registryevent-key_name-doc) | Nombre del registro |
| [`delete_key.registry.key_name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`delete_key.registry.key_path`](#common-registryevent-key_path-doc) | Ruta del registro |
| [`delete_key.registry.key_path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |

### Evento `exec`

Se ha ejecutado o bifurcado un proceso 

| Propiedad | Definición |
| -------- | ------------- |
| [`exec.cmdline`](#common-process-cmdline-doc) | Línea de comandos del proceso |
| [`exec.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`exec.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`exec.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`exec.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`exec.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`exec.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`exec.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`exec.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`exec.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID del grupo de subprocesos) |
| [`exec.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`exec.user`](#common-process-user-doc) | Nombre de usuario |
| [`exec.user_sid`](#common-process-user_sid-doc) | SId del usuario del proceso |

### Evento `exit`

Se ha cerrado un proceso

| Propiedad | Definición |
| -------- | ------------- |
| [`exit.cause`](#exit-cause-doc) | Causa de finalización del proceso (una de EXITED, SIGNALED, COREDUMPED) |
| [`exit.cmdline`](#common-process-cmdline-doc) | Línea de comandos del proceso |
| [`exit.code`](#exit-code-doc) | Código de salida del proceso o número de la señal que ha provocado la finalización del proceso  |
| [`exit.container.id`](#common-process-container-id-doc) | ID del contenedor |
| [`exit.created_at`](#common-process-created_at-doc) | Marca de tiempo de la creación del proceso |
| [`exit.envp`](#common-process-envp-doc) | Variables de entorno del proceso |
| [`exit.envs`](#common-process-envs-doc) | Nombres de variables de entorno del proceso |
| [`exit.file.name`](#common-fileevent-name-doc) | Nombre base del archivo |
| [`exit.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`exit.file.path`](#common-fileevent-path-doc) | Ruta del archivo |
| [`exit.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`exit.pid`](#common-pidcontext-pid-doc) | ID de proceso del proceso (también llamado ID del grupo de subprocesos) |
| [`exit.ppid`](#common-process-ppid-doc) | ID del proceso principal |
| [`exit.user`](#common-process-user-doc) | Nombre de usuario |
| [`exit.user_sid`](#common-process-user_sid-doc) | SId del usuario del proceso |

### Evento `open_key`

Se ha abierto una clave de registro

| Propiedad | Definición |
| -------- | ------------- |
| [`open.registry.key_name`](#common-registryevent-key_name-doc) | Nombre del registro |
| [`open.registry.key_name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`open.registry.key_path`](#common-registryevent-key_path-doc) | Ruta del registro |
| [`open.registry.key_path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`open_key.registry.key_name`](#common-registryevent-key_name-doc) | Nombre del registro |
| [`open_key.registry.key_name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`open_key.registry.key_path`](#common-registryevent-key_path-doc) | Ruta del registro |
| [`open_key.registry.key_path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |

### Evento `rename`

Se ha renombrado un archivo

| Propiedad | Definición |
| -------- | ------------- |
| [`rename.file.destination.device_path`](#common-fimfileevent-device_path-doc) | Ruta del archivo |
| [`rename.file.destination.device_path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`rename.file.destination.name`](#common-fimfileevent-name-doc) | Nombre base del archivo |
| [`rename.file.destination.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`rename.file.destination.path`](#common-fimfileevent-path-doc) | Ruta del archivo |
| [`rename.file.destination.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`rename.file.device_path`](#common-fimfileevent-device_path-doc) | Ruta del archivo |
| [`rename.file.device_path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`rename.file.name`](#common-fimfileevent-name-doc) | Nombre base del archivo |
| [`rename.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`rename.file.path`](#common-fimfileevent-path-doc) | Ruta del archivo |
| [`rename.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |

### Evento `set_key_value`

Se ha definido un valor de clave de registro

| Propiedad | Definición |
| -------- | ------------- |
| [`set.registry.key_name`](#common-registryevent-key_name-doc) | Nombre del registro |
| [`set.registry.key_name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`set.registry.key_path`](#common-registryevent-key_path-doc) | Ruta del registro |
| [`set.registry.key_path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`set.registry.value_name`](#common-setregistrykeyvalueevent-registry-value_name-doc) | Nombre del valor del registro |
| [`set.registry.value_name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`set.value_name`](#common-setregistrykeyvalueevent-value_name-doc) | Nombre del valor del registro |
| [`set_key_value.registry.key_name`](#common-registryevent-key_name-doc) | Nombre del registro |
| [`set_key_value.registry.key_name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`set_key_value.registry.key_path`](#common-registryevent-key_path-doc) | Ruta del registro |
| [`set_key_value.registry.key_path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`set_key_value.registry.value_name`](#common-setregistrykeyvalueevent-registry-value_name-doc) | Nombre del valor del registro |
| [`set_key_value.registry.value_name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`set_key_value.value_name`](#common-setregistrykeyvalueevent-value_name-doc) | Nombre del valor del registro |

### Evento `write`

Se ha escrito un archivo

| Propiedad | Definición |
| -------- | ------------- |
| [`write.file.device_path`](#common-fimfileevent-device_path-doc) | Ruta del archivo |
| [`write.file.device_path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`write.file.name`](#common-fimfileevent-name-doc) | Nombre base del archivo |
| [`write.file.name.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |
| [`write.file.path`](#common-fimfileevent-path-doc) | Ruta del archivo |
| [`write.file.path.length`](#common-string-length-doc) | Longitud de la cadena correspondiente |


## Documentación sobre atributos


### `*.cmdline` {#common-process-cmdline-doc}
Tipo: cadena

Definición: línea de comandos del proceso

`*.cmdline` tiene 5 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent`



Ejemplo:

{{< code-block lang="javascript" >}}
exec.cmdline == "-sV -p 22,53,110,143,4564 198.116.0-255.1-127"
{{< /code-block >}}

Coincide con cualquier proceso que tenga estos argumentos exactos.

Ejemplo:

{{< code-block lang="javascript" >}}
exec.cmdline =~ "* -F * http*"
{{< /code-block >}}

Coincide con cualquier proceso que tenga el argumento "-F" en cualquier lugar antes de un argumento que empiece por "http".

### `*.container.id` {#common-process-container-id-doc}
Tipo: cadena

Definición: ID de contenedor

`*.container.id` tiene 5 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.created_at` {#common-process-created_at-doc}
Tipo: int

Definición: marca de tiempo de la creación del proceso

`*.created_at` tiene 5 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.device_path` {#common-fimfileevent-device_path-doc}
Tipo: cadena

Definición: ruta del archivo

`*.device_path` tiene 5 prefijos posibles:
`create.file` `delete.file` `rename.file` `rename.file.destination` `write.file`



Ejemplo:

{{< code-block lang="javascript" >}}
create.file.device_path == "\device\harddisk1\cmd.bat"
{{< /code-block >}}

Coincide con la creación del archivo ubicado en c:\cmd.bat

### `*.envp` {#common-process-envp-doc}
Tipo: cadena

Definición: variables de entorno del proceso

`*.envp` tiene 5 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.envs` {#common-process-envs-doc}
Tipo: cadena

Definición: nombres de variable de entorno del proceso

`*.envs` tiene 5 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.key_name` {#common-registryevent-key_name-doc}
Tipo: cadena

Definición: nombre del registro

`*.key_name` tiene 8 prefijos posibles:
`create.registry` `create_key.registry` `delete.registry` `delete_key.registry` `open.registry` `open_key.registry` `set.registry` `set_key_value.registry`


### `*.key_path` {#common-registryevent-key_path-doc}
Tipo: cadena

Definición: ruta del registro

`*.key_path` tiene 8 prefijos posibles:
`create.registry` `create_key.registry` `delete.registry` `delete_key.registry` `open.registry` `open_key.registry` `set.registry` `set_key_value.registry`


### `*.length` {#common-string-length-doc}
Tipo: int

Definición: longitud de la cadena correspondiente

`*.length` tiene 43 prefijos posibles:
`create.file.device_path` `create.file.name` `create.file.path` `create.registry.key_name` `create.registry.key_path` `create_key.registry.key_name` `create_key.registry.key_path` `delete.file.device_path` `delete.file.name` `delete.file.path` `delete.registry.key_name` `delete.registry.key_path` `delete_key.registry.key_name` `delete_key.registry.key_path` `exec.file.name` `exec.file.path` `exit.file.name` `exit.file.path` `open.registry.key_name` `open.registry.key_path` `open_key.registry.key_name` `open_key.registry.key_path` `process.ancestors.file.name` `process.ancestors.file.path` `process.file.name` `process.file.path` `process.parent.file.name` `process.parent.file.path` `rename.file.destination.device_path` `rename.file.destination.name` `rename.file.destination.path` `rename.file.device_path` `rename.file.name` `rename.file.path` `set.registry.key_name` `set.registry.key_path` `set.registry.value_name` `set_key_value.registry.key_name` `set_key_value.registry.key_path` `set_key_value.registry.value_name` `write.file.device_path` `write.file.name` `write.file.path`


### `*.name` {#common-fileevent-name-doc}
Tipo: cadena

Definición: nombre base del archivo

`*.name` tiene 5 prefijos posibles:
`exec.file` `exit.file` `process.ancestors.file` `process.file` `process.parent.file`



Ejemplo:

{{< code-block lang="javascript" >}}
exec.file.name == "cmd.bat"
{{< /code-block >}}

Coincide con la ejecución de cualquier archivo llamado cmd.bat.

### `*.name` {#common-fimfileevent-name-doc}
Tipo: cadena

Definición: nombre base del archivo

`*.name` tiene 5 prefijos posibles:
`create.file` `delete.file` `rename.file` `rename.file.destination` `write.file`



Ejemplo:

{{< code-block lang="javascript" >}}
create.file.name == "cmd.bat"
{{< /code-block >}}

Coincide con la creación de cualquier archivo llamado cmd.bat.

### `*.path` {#common-fileevent-path-doc}
Tipo: cadena

Definición: ruta del archivo

`*.path` tiene 5 prefijos posibles:
`exec.file` `exit.file` `process.ancestors.file` `process.file` `process.parent.file`



Ejemplo:

{{< code-block lang="javascript" >}}
exec.file.path == "c:\cmd.bat"
{{< /code-block >}}

Coincide con la ejecución del archivo ubicado en c:\cmd.bat

### `*.path` {#common-fimfileevent-path-doc}
Tipo: cadena

Definición: ruta del archivo

`*.path` tiene 5 prefijos posibles:
`create.file` `delete.file` `rename.file` `rename.file.destination` `write.file`



Ejemplo:

{{< code-block lang="javascript" >}}
create.file.path == "c:\cmd.bat"
{{< /code-block >}}

Coincide con la creación del archivo ubicado en c:\cmd.bat

### `*.pid` {#common-pidcontext-pid-doc}
Tipo: int

Definición: ID de proceso del proceso (también llamado ID de grupo del subproceso)

`*.pid` tiene 5 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.ppid` {#common-process-ppid-doc}
Tipo: int

Definición: ID del proceso principal

`*.ppid` tiene 5 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.registry.value_name` {#common-setregistrykeyvalueevent-registry-value_name-doc}
Tipo: cadena

Definición: nombre del valor del registro

`*.registry.value_name` tiene 2 prefijos posibles:
`set` `set_key_value`


### `*.user` {#common-process-user-doc}
Tipo: cadena

Definición: nombre de usuario

`*.user` tiene 5 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.user_sid` {#common-process-user_sid-doc}
Tipo: cadena

Definición: SId del usuario del proceso

`*.user_sid` tiene 5 prefijos posibles:
`exec` `exit` `process` `process.ancestors` `process.parent`


### `*.value_name` {#common-setregistrykeyvalueevent-value_name-doc}
Tipo: cadena

Definición: nombre del valor del registro

`*.value_name` tiene 2 prefijos posibles:
`set` `set_key_value`


### `change_permission.new_sd` {#change_permission-new_sd-doc}
Tipo: cadena

Definición: nuevo descriptor de seguridad del objeto cuyo permiso se ha modificado



### `change_permission.old_sd` {#change_permission-old_sd-doc}
Tipo: cadena

Definición: descriptor de seguridad original del objeto cuyo permiso se ha modificado



### `change_permission.path` {#change_permission-path-doc}
Tipo: cadena

Definición: nombre del objeto cuyo permiso se ha modificado



### `change_permission.type` {#change_permission-type-doc}
Tipo: cadena

Definición: tipo de objeto cuyo permiso se ha modificado



### `change_permission.user_domain` {#change_permission-user_domain-doc}
Tipo: cadena

Definición: nombre de dominio del autor del cambio de permiso



### `change_permission.username` {#change_permission-username-doc}
Tipo: cadena

Definición: nombre de usuario del autor del cambio de permiso



### `container.created_at` {#container-created_at-doc}
Tipo: int

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
Tipo: int

Definición: marca de tiempo del evento



### `exit.cause` {#exit-cause-doc}
Tipo: int

Definición: causa de la finalización del proceso (EXITED, SIGNALED, COREDUMPED)



### `exit.code` {#exit-code-doc}
Tipo: int

Definición: código de salida del proceso o número de la señal que provocó la finalización del proceso 



## Constantes

Las constantes se utilizan para mejorar la legibilidad de las reglas. Algunas constantes son comunes a todas las arquitecturas y otras son específicas de algunas arquitecturas.

### `Boolean constants` {#boolean-constants}
Las constantes booleanas son las constantes booleanas admitidas.

| Nombre | Arquitecturas |
| ---- |---------------|
| `true` | todos |
| `false` | todos |

### `DNS qclasses` {#dns-qclasses}
Las qclasses DNS son las clases de consulta DNS admitidas.

| Nombre | Arquitecturas |
| ---- |---------------|
| `CLASS_INET` | todos |
| `CLASS_CSNET` | todos |
| `CLASS_CHAOS` | todos |
| `CLASS_HESIOD` | todos |
| `CLASS_NONE` | todos |
| `CLASS_ANY` | todos |

### `DNS qtypes` {#dns-qtypes}
Los qtypes DNS son los tipos de consulta DNS admitidos.

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



{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/threats/agent