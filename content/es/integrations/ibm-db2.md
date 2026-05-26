---
aliases:
- /es/integrations/ibm_db2
app_id: ibm-db2
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integración
description: Monitoriza el espacio de tablas, el grupo de buffers y otras métricas
  de tu base de datos IBM Db2.
further_reading:
- link: https://www.datadoghq.com/blog/monitor-db2-with-datadog
  tag: blog
  text: Monitoriza IBM DB2 con Datadog
integration_version: 4.0.1
media: []
supported_os:
- linux
- macos
- windows
title: IBM Db2
---
![default dashboard](https://raw.githubusercontent.com/DataDog/integrations-core/master/ibm_db2/images/dashboard_overview.png)

## Información general

Con este check se monitoriza [IBM Db2](https://www.ibm.com/analytics/us/en/db2) a través del Datadog Agent .

## Configuración

### Instalación

El check de IBM Db2 está incluido en el paquete del [Datadog Agent](https://app.datadoghq.com/account/settings/agent/latest).

#### Dependencias

Se necesita la biblioteca cliente [ibm_db](https://github.com/ibmdb/python-ibmdb). Para instalarla, asegúrate de tener un compilador que funcione y ejecute:

##### Unix

```text
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install ibm_db==3.2.3
```

Nota: Si utilizas el Agent con Python 2, usa `ibm_db==3.0.1` en lugar de `ibm_db=3.1.0`.

##### Windows

Para las versiones del Agent \<= 6.11:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" -m pip install ibm_db==3.0.1
```

Para las versiones del Agent >= 6.12 y \< 7.0:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" -m pip install ibm_db==3.0.1
```

Para las versiones del Agent >= 7.0 y \< 7.58:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded3\python.exe" -m pip install ibm_db==3.1.4
```

Para versiones del Agent 7.58 o posteriores:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded3\python.exe" -m pip install ibm_db==3.2.3
```

En Linux, puede ser necesaria la funcionalidad XML. Si encuentras errores durante
el proceso de compilación, instala `libxslt-dev` (o `libxslt-devel` para RPM).

#### Habilitar la monitorización

La integración de IBM Db2 extrae los datos mediante las siguientes funciones de tabla: 

- `MON_GET_TABLESPACE`
- `MON_GET_TRANSACTION_LOG`
- `MON_GET_BUFFERPOOL`
- `MON_GET_DATABASE`
- `MON_GET_INSTANCE`

Para obtener más información sobre estas funciones de tablas, consulta la [documentación oficial de IBM](https://www.ibm.com/docs/en/db2oc?topic=views-monitor-procedures-functions).

Para monitorizar una instancia de Db2, crea un usuario de Db2 con el permiso `EXECUTE` en las cinco funciones de tabla anteriores, o concede al usuario de Db2 uno de los siguientes roles:

- Autoridad `DATAACCESS`
- Autoridad `DBADM`
- Autoridad `SQLADM`

Para monitorizar el estado de una instancia, sus bases de datos asociadas y los objetos de base de datos, habilita los interruptores de monitorización del sistema de base de datos para cada uno de los objetos que quieras monitorizar:

- Sentencia
- Bloqueo
- Tablas
- Grupo de buffers

Cambia al usuario maestro de la instancia y ejecuta estos comandos en la línea `db2`:

```text
update dbm cfg using HEALTH_MON on
update dbm cfg using DFT_MON_STMT on
update dbm cfg using DFT_MON_LOCK on
update dbm cfg using DFT_MON_TABLE on
update dbm cfg using DFT_MON_BUFPOOL on
```

Luego, ejecuta `get dbm cfg` y deberías ver lo siguiente:

```text
 Default database monitor switches
   Buffer pool                         (DFT_MON_BUFPOOL) = ON
   Lock                                   (DFT_MON_LOCK) = ON
   Sort                                   (DFT_MON_SORT) = OFF
   Statement                              (DFT_MON_STMT) = ON
   Table                                 (DFT_MON_TABLE) = ON
   Timestamp                         (DFT_MON_TIMESTAMP) = ON
   Unit of work                            (DFT_MON_UOW) = OFF
 Monitor health of instance and databases   (HEALTH_MON) = ON
```

### Configuración

{{< tabs >}}

{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `ibm_db2.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu directorio de configuración del Agent para comenzar a recopilar tus datos de rendimiento `ibm_db2`. Consulta el [ejemplo de ibm_db2.d/conf.yaml](https://github.com/DataDog/integrations-core/blob/master/ibm_db2/datadog_checks/ibm_db2/data/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-restart-the-agent).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

1. Añade este bloque de configuración a tu archivo `ibm_db2.d/conf.yaml` para empezar a recopilar logs de IBM Db2:

   ```yaml
   logs:
     - type: file
       path: /home/db2inst1/sqllib/db2dump/db2diag.log
       source: ibm_db2
       service: db2sysc
       log_processing_rules:
         - type: multi_line
           name: new_log_start_with_date
           pattern: \d{4}\-(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])
   ```

1. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-restart-the-agent).

{{% /tab %}}

{{% tab "En contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [Plantillas de integración de Autodiscovery](https://docs.datadoghq.com/agent/kubernetes/integrations/) para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_db2`                                                                                                     |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"db": "<DB_NAME>", "username":"<USERNAME>", "password":"<PASSWORD>", "host":"%%host%%", "port":"%%port%%"}` |

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent. Para activarla, consulta [Recopilación de logs de Kubernetes](https://docs.datadoghq.com/agent/kubernetes/log/).

| Parámetro      | Valor                                                                                                                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ibm_db2", "service": "<SERVICE_NAME>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])"}}` |

{{% /tab %}}

{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent(https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `ibm_db2` en la sección Checks.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **ibm_db2.application.active** <br>(gauge) | El número de aplicaciones que están actualmente conectadas a la base de datos.<br>_Mostrado como connection (conexión)_ |
| **ibm_db2.application.executing** <br>(gauge) | El número de solicitudes para las que el gestor de la base de datos está procesando actualmente una solicitud.<br>_Mostrado como connection (conexión)_ |
| **ibm_db2.backup.latest** <br>(gauge) | El tiempo transcurrido desde que se completó la última copia de seguridad de la base de datos.<br>_Mostrado como segundo_ |
| **ibm_db2.bufferpool.column.hit_percent** <br>(gauge) | El porcentaje de tiempo que el gestor de la base de datos no necesitó cargar una page (página) desde el disco para atender una solicitud de una page (página) de datos de una tabla organizada en columnas.<br>_Mostrado como porcentaje_. |
| **ibm_db2.bufferpool.column.reads.logical** <br>(count) | El número de pages (páginas) de datos de tabla organizadas en columnas leídas de los contenedores desde el espacio de tabla lógica para espacios de tablas temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.column.reads.physical** <br>(count) | El número de pages (páginas) de datos de tablas organizadas en columnas leídas desde los contenedores físicos del espacio de tablas para espacios de tablas temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.column.reads.total** <br>(count) | El número total de pages (páginas) de datos de tablas organizadas en columnas leídas desde los contenedores de espacios de tablas para espacios de tablas temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.data.hit_percent** <br>(gauge) | El porcentaje de tiempo que el gestor de la base de datos no necesitó cargar una page (página) desde el disco para atender una solicitud de page (página) de datos.<br>_Mostrado como porcentaje_. |
| **ibm_db2.bufferpool.data.reads.logical** <br>(count) | El número de pages (páginas) de datos leídas desde los contenedores de espacios de tablas lógicas para espacios de tablas temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.data.reads.physical** <br>(count) | El número de pages (páginas) de datos leídas desde los contenedores físicos de espacios de tablas para espacios de tablas temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.data.reads.total** <br>(count) | El número total de pages (páginas) de datos leídas desde los contenedores de espacios de tablas para espacios de tablas temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.group.column.hit_percent** <br>(gauge) | El porcentaje de tiempo en el que el gestor de la base de datos de grupo no necesitó cargar una page (página) desde el disco para atender una solicitud de page (página) de datos de tabla organizada por columnas.<br>_Mostrado como porcentaje_. |
| **ibm_db2.bufferpool.group.data.hit_percent** <br>(gauge) | El porcentaje de tiempo durante el cual el gestor de la base de datos de grupo no tuvo que cargar una page (página) desde el disco para atender una solicitud de página (page) de datos.<br>_Mostrado como porcentaje_. |
| **ibm_db2.bufferpool.group.hit_percent** <br>(gauge) | El porcentaje de tiempo durante el cual el gestor de la base de datos del grupo no tuvo que cargar una page (página) desde el disco para atender una solicitud de page (página).<br>_Mostrado como porcentaje_ |
| **ibm_db2.bufferpool.group.index.hit_percent** <br>(gauge) | El porcentaje de tiempo que el gestor de la base de datos de grupo no necesitó cargar una page (página) desde el disco para atender una solicitud de page (página) de índice.<br>_Mostrado como porcentaje_ |
| **ibm_db2.bufferpool.group.xda.hit_percent** <br>(gauge) | El porcentaje de tiempo en el que el gestor de la base de datos de grupo no necesitó cargar una page (página) desde el disco para atender una solicitud de page (página) de índice.<br>_Mostrado como porcentaje_ |
| **ibm_db2.bufferpool.hit_percent** <br>(gauge) | El porcentaje de tiempo que el gestor de la base de datos no necesitó cargar una page (página) desde el disco para atender una solicitud de page (página).<br>_Mostrado en porcentaje_ |
| **ibm_db2.bufferpool.index.hit_percent** <br>(gauge) | El porcentaje de tiempo que el gestor de la base de datos no necesitó cargar una page (página) desde el disco para atender una solicitud de page (página) de índice.<br>_Mostrado como porcentaje_. |
| **ibm_db2.bufferpool.index.reads.logical** <br>(count) | El número de pages (páginas) de índice leídas de los contenedores de espacios de tablas lógicas para espacios de tablas temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.index.reads.physical** <br>(count) | El número de pages (páginas) de índice leídas desde los contenedores físicos de espacios de tablas para espacios de tablas temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.index.reads.total** <br>(count) | El número total de pages (páginas) de índice leídas desde los contenedores de espacios de tabla para espacios de tabla temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.reads.logical** <br>(count) | El número de pages (páginas) leídas desde los contenedores de espacios de tabla lógica para espacios de tabla temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.reads.physical** <br>(count) | El número de pages (páginas) leídas de los contenedores de espacios de tabla físicos para espacios de tabla temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.reads.total** <br>(count) | El número total de pages (páginas) leídas desde los contenedores de espacios de tabla para espacios de tabla temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.xda.hit_percent** <br>(gauge) | El porcentaje de tiempo que el gestor de la base de datos no necesitó cargar una page (página) desde el disco para atender una solicitud de page (página) de índice.<br>_Mostrado como porcentaje_. |
| **ibm_db2.bufferpool.xda.reads.logical** <br>(count) | El número de pages (páginas) de datos para objetos de almacenamiento XML (XDA) leídos desde los contenedores de espacios de tablas lógicas para espacios de tablas temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.xda.reads.physical** <br>(count) | El número de pages (páginas) de datos para objetos de almacenamiento XML (XDAs) leídos desde los contenedores físicos de espacios de tabla para espacios de tabla temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.bufferpool.xda.reads.total** <br>(count) | El número total de páginas de datos para objetos de almacenamiento XML (XDA) leídos desde los contenedores de espacios de tabla para espacios de tabla temporales, normales y grandes.<br>_Mostrado como get_ |
| **ibm_db2.connection.active** <br>(gauge) | El número actual de connections (conexiones).<br>_Mostrado como connection (conexión)_ |
| **ibm_db2.connection.max** <br>(gauge) | El mayor número de connections (conexiones) simultáneas a la base de datos desde que se activó la base de datos.<br>_Mostrado como connection (conexión)_ |
| **ibm_db2.connection.total** <br>(count) | El número total de connections (conexiones) a la base de datos desde la primera conexión, activación o último reinicio (agentes coordinadores).<br>_Mostrado como connection (conexión)_ |
| **ibm_db2.lock.active** <br>(gauge) | El número de bloqueos actuales.<br>_Mostrado como bloqueo_ |
| **ibm_db2.lock.dead** <br>(count) | El número total de bloqueos que se han producido.<br>_Mostrado como bloqueo_ |
| **ibm_db2.lock.pages** <br>(gauge) | Las pages (páginas) de memoria (4 KiB cada una) actualmente en uso por la lista de bloqueos.<br>_Mostrado como page (página)_ |
| **ibm_db2.lock.timeouts** <br>(count) | El número de veces que una solicitud para bloquear un objeto ha expirado en lugar de ser concedida.<br>_Mostrado como bloqueo_ |
| **ibm_db2.lock.wait** <br>(gauge) | El tiempo medio de espera de un bloqueo.<br>_Mostrado como milisegundo_ |
| **ibm_db2.lock.waiting** <br>(gauge) | El número de agentes en espera de un bloqueo.<br>_Mostrado como bloqueo_ |
| **ibm_db2.log.available** <br>(gauge) | Los bloques del disco (de 4 KiB cada uno) de espacio activo de logs en la base de datos que no están siendo utilizados por transacciones no confirmadas.<br>_Mostrado como bloque_ |
| **ibm_db2.log.reads** <br>(count) | El número de pages (páginas) de logs leídas desde el disco por el registrador.<br>_Mostrado como leído_ |
| **ibm_db2.log.used** <br>(gauge) | Los bloques de disco (de 4 KiB cada uno) de espacio activo de logs utilizados actualmente en la base de datos.<br>_Mostrado como bloque_ |
| **ibm_db2.log.utilized** <br>(gauge) | La utilización del espacio activo de logs en porcentaje.<br>_Mostrado como porcentaje_ |
| **ibm_db2.log.writes** <br>(count) | El número de pages (páginas) de logs escritas en el disco por el registrador.<br>_Mostrado como escritura_ |
| **ibm_db2.row.modified.total** <br>(count) | El número total de filas insertadas, actualizadas o eliminadas.<br>_Mostrado como fila_ |
| **ibm_db2.row.reads.total** <br>(count) | El número total de filas que se han tenido que leer para devolver los conjuntos de resultados.<br>_Mostrado como fila_ |
| **ibm_db2.row.returned.total** <br>(count) | El número total de filas seleccionadas y devueltas a las aplicaciones.<br>_Mostrado como fila_ |
| **ibm_db2.tablespace.size** <br>(gauge) | El tamaño total del espacio de la tabla en bytes.<br>_Mostrado como byte_ |
| **ibm_db2.tablespace.usable** <br>(gauge) | El tamaño total utilizable del espacio de la tabla en bytes.<br>_Mostrado como byte_ |
| **ibm_db2.tablespace.used** <br>(gauge) | El tamaño total utilizado del espacio de la tabla en bytes.<br>_Mostrado como byte_ |
| **ibm_db2.tablespace.utilized** <br>(gauge) | La utilización del espacio de la tabla en porcentaje.<br>_Mostrado en porcentaje_ |

### Eventos

- `ibm_db2.tablespace_state_change` se activa cada vez que cambia el estado de un espacio de tablas.

### Checks de servicio

**ibm_db2.can_connect**

Devuelve `CRITICAL` si el Agent no puede conectarse a la base de datos IBM Db2 monitorizada o `OK` en caso contrario.

_Estados: ok, crítico_

**ibm_db2.status**

Devuelve `CRITICAL` si la base de datos IBM Db2 monitorizada está en modo inactivo, `WARNING` para el modo inactivo pendiente o puestas al día o `OK` en caso contrario.

_Estados: ok, advertencia, crítico, desconocido_

## Solucionar problemas

### Error del controlador de la CLI SQL1531N

Es posible que te encuentres con un problema que produce un logs con errores como el siguiente:

```
2023-08-10 23:34:47 UTC | CORE | ERROR | (pkg/collector/python/datadog_agent.go:129 in LogMessage) | ibm_db2:c051131490335a94 | (ibm_db2.py:563) | Unable to connect to database `datadog` as user `db2inst1`: [IBM][CLI Driver] SQL1531N  The connection failed because the name specified with the DSN connection string keyword could not be found in either the db2dsdriver.cfg configuration file or the db2cli.ini configuration file.  Data source name specified in the connection string: "DATADOG". SQLCODE=-1531
```

En ese caso, lo más probable es que se deba a una de las siguientes situaciones:

- Falta un host y un puerto en la configuración (conf.yaml).
- El controlador de la CLI no es capaz de localizar la base de datos debido a la ausencia de `db2cli.ini` y `db2dsdriver.cfg`.

El Agent necesita la información de los dos escenarios anteriores para determinar dónde conectarse correctamente a la base de datos. Para resolver este problema, puedes incluir un parámetro de host y puerto para cada instancia del check de `ibm_db2` que tenga este problema. De manera alternativa, si quieres utilizar los DSN definidos en los archivos `db2cli.ini` o `db2dsdriver.cfg`, puedes copiar dichos archivos en el directorio `clidriver` que utiliza el Agent. En circunstancias normales, ese directorio se encuentra en `/opt/datadog-agent/embedded/lib/python3.9/site-packages/clidriver/cfg` para Linux.

### Instalación de la biblioteca de cliente `ibm_db` sin conexión

Si trabajas en un entorno sin conexión o con una red restringida donde no es posible ejecutar `pip install ibm_db==x.y.z` con `x.y.z` como el número de versión, puedes instalar `ibm_db` mediante el siguiente método:

1. En una máquina con acceso a la red, descarga los tarballs source (fuente) para [la biblioteca `ibm_db` ](https://pypi.org/project/ibm-db/#files) y [el ODBC y CLI](https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/). El ODBC y la CLI deben descargarse por separado porque la biblioteca `ibm_db` los necesita, pero no puede descargarlos a través de `pip`. El siguiente script instala el archivo para `ibm_db==x.y.z` en una máquina Linux, donde `x.y.z` es el número de versión:

   ```
   curl -Lo ibm_db.tar.gz https://github.com/ibmdb/python-ibmdb/archive/refs/tags/vx.y.z.tar.gz

   curl -Lo linuxx64_odbc_cli.tar.gz https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
   ```

1. Mueve los dos archivos al host restringido y, luego, extrae el archivo.

   ```
   tar -xvf ibm_db.tar.gz

   tar -xvf linuxx64_odbc_cli.tar.gz
   ```

1. Define la variable de entorno `IBM_DB_HOME` como la localización de donde extrajiste `/clidriver` de `linuxx64_odbc_cli.tar.gz`. Esto evitará que la biblioteca `ibm_db` instale una nueva versión de la ODBC y la CLI, ya que eso generaría un error.

   ```
   export IBM_DB_HOME=/path/to/clidriver
   ```

1. Mediante la utilización del [`pip`](https://docs.datadoghq.com/developers/guide/custom-python-package/?tab=linux) insertado en el Agent, instala la bblioteca `ibm_db` localmente. Los archivos de la biblioteca están contenidos en `python-ibmdb-x.y.z` extraído de `ibm_db.tar.gz`.

   ```
   /opt/datadog-agent/embedded/bin/pip install --no-index --no-deps --no-build-isolation  /path/to/python-ibmdb-x.y.z/IBM_DB/ibm_db/
   ```

Si obtienes el siguiente error:

```
  error: subprocess-exited-with-error

  × Preparing metadata (pyproject.toml) did not run successfully.
  | exit code: 1
   -> [8 lines of output]
      Detected 64-bit Python
      Detected platform = linux, uname = x86_64
      Downloading https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
       Downloading DSDriver from url =  https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
      Pre-requisite check [which gcc] : Failed

      No Gcc installation detected.
      Please install gcc and continue with the installation of the ibm_db.
      [end of output]
```

Es posible que debas instalar `gcc`.

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog](https://docs.datadoghq.com/help/).

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitoriza IBM DB2 con Datadog](https://www.datadoghq.com/blog/monitor-db2-with-datadog)