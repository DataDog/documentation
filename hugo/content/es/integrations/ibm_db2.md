---
app_id: ibm-db2
app_uuid: e588293a-833f-4888-a7b4-2208e087059a
assets:
  dashboards:
    IBM Db2 Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: true
    metrics:
      check: ibm_db2.connection.active
      metadata_path: metadata.csv
      prefix: ibm_db2.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10054
    source_type_name: IBM Db2
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- almacenes de datos
- recopilación de logs
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/ibm_db2/README.md
display_on_public_website: true
draft: false
git_integration_title: ibm_db2
integration_id: ibm-db2
integration_title: IBM Db2
integration_version: 4.0.1
is_public: true
manifest_version: 2.0.0
name: ibm_db2
public_title: IBM Db2
short_description: Monitoriza el espacio de tablas, el grupo de buffers y otras métricas
  de tu base de datos IBM Db2.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - SO compatible::Linux
  - SO compatible::macOS
  - SO compatible::Windows
  - Categoría::Almacenes de datos
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza el espacio de tablas, el grupo de buffers y otras métricas
    de tu base de datos IBM Db2.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: Blog
    url: https://www.datadoghq.com/blog/monitor-db2-with-datadog
  support: README.md#Soporte
  title: IBM Db2
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


![dashboard predeterminado][1]

## Información general

Este check monitoriza [IBM Db2][2] a través del Datadog Agent.

## Configuración

### Instalación

El check de IBM Db2 está incluido en el paquete del [Datadog Agent][3].

#### Dependencias

Se necesita la librería de cliente [ibm_db][4]. Para instalarla, asegúrate de que dispones de un compilador operativo y ejecútalo:

##### Unix

```text
sudo -Hu dd-agent /opt/datadog-agent/embedded/bin/pip install ibm_db==3.2.3
```

Nota: Si utilizas el Agent con Python 2, usa `ibm_db==3.0.1` en lugar de `ibm_db=3.1.0`.

##### Windows

En el Agent v6.11 y anteriores:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded\python.exe" -m pip install ibm_db==3.0.1
```

Para las versiones del Agent entre la 6.12 y la 7.0:

```text
"C:\Program Files\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe" -m pip install ibm_db==3.0.1
```

Para versiones del Agent 7.0 o posteriores y anteriores a 7.58:

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
* `MON_GET_TABLESPACE`
* `MON_GET_TRANSACTION_LOG`
* `MON_GET_BUFFERPOOL`
* `MON_GET_DATABASE`
* `MON_GET_INSTANCE`

Para obtener más información sobre estas funciones de tabla, consulta la [documentación oficial de IBM][5].

Para monitorizar una instancia de Db2, crea un usuario de Db2 con el permiso `EXECUTE` en las cinco funciones de tabla anteriores, o concede al usuario de Db2 uno de los siguientes roles:
* Autoridad `DATAACCESS`
* Autoridad `DBADM`
* Autoridad `SQLADM`

Para monitorizar el estado de una instancia, sus bases de datos asociadas y los objetos de base de datos, habilita los interruptores de monitorización del sistema de base de datos para cada uno de los objetos que quieras monitorizar:
* Sentencia
* Bloqueo
* Tablas
* Grupo de buffers

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

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Recopilación de métricas

1. Edita el archivo `ibm_db2.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de `ibm_db2`. Consulta el [archivo de ejemplo ibm_db2.d/conf.yaml][1] para conocer todas las opciones de configuración disponibles.

2. [Reinicia el Agent][2].

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

1. La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Habilítala en tu archivo `datadog.yaml`:

   ```yaml
   logs_enabled: true
   ```

2. Añade este bloque de configuración a tu archivo `ibm_db2.d/conf.yaml` para empezar a recopilar logs de IBM Db2:

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

3. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/ibm_db2/datadog_checks/ibm_db2/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-restart-the-agent
{{% /tab %}}
{{% tab "Contenedores" %}}

#### Contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                                                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `ibm_db2`                                                                                                     |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                                                 |
| `<INSTANCE_CONFIG>`  | `{"db": "<DB_NAME>", "username":"<USERNAME>", "password":"<PASSWORD>", "host":"%%host%%", "port":"%%port%%"}` |

##### Recopilación de logs

Disponible para la versión 6.0 o posteriores del Agent

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta [Recopilación de logs de Kubernetes][2].

| Parámetro      | Valor                                                                                                                                                                                                |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "ibm_db2", "service": "<SERVICE_NAME>", "log_processing_rules": {"type":"multi_line","name":"new_log_start_with_date", "pattern":"\d{4}\-(0?[1-9]|[12][0-9]|3[01])\-(0?[1-9]|1[012])"}}` |

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/es/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `ibm_db2` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "ibm-db2" >}}


### Eventos

- `ibm_db2.tablespace_state_change` se activa cada vez que cambia el estado de un espacio de tablas.

### Checks de servicio
{{< get-service-checks-from-git "ibm-db2" >}}


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

### Instalación de la librería de cliente `ibm_db` sin conexión

Si trabajas en un entorno sin conexión o con una red restringida donde no es posible ejecutar `pip install ibm_db==x.y.z` con `x.y.z` como el número de versión, puedes instalar `ibm_db` mediante el siguiente método:


1. En una máquina con acceso a una red, descarga los archivos .tar de origen de la [biblioteca`ibm_db`][7] y [la ODBC y la CLI][8]. La ODBC y la CLI deben descargarse por separado porque la librería `ibm_db` los necesita, pero no pueden descargarse a través del `pip`. El siguiente script instala el archivo de almacenamiento para `ibm_db==x.y.z` en una máquina Linux, donde `x.y.z` es el número de versión:

   ```
   curl -Lo ibm_db.tar.gz https://github.com/ibmdb/python-ibmdb/archive/refs/tags/vx.y.z.tar.gz

   curl -Lo linuxx64_odbc_cli.tar.gz https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/linuxx64_odbc_cli.tar.gz
   ```

1. Mueve los dos archivos al host restringido y, luego, extrae el archivo.

   ```
   tar -xvf ibm_db.tar.gz

   tar -xvf linuxx64_odbc_cli.tar.gz
   ```

1. Define la variable de entorno `IBM_DB_HOME` como la localización de donde extrajiste `/clidriver` de `linuxx64_odbc_cli.tar.gz`. Esto evitará que la librería `ibm_db` instale una nueva versión de la ODBC y la CLI, ya que eso generaría un error.

   ```
   export IBM_DB_HOME=/path/to/clidriver
   ```

1. Con el [`pip`][9] integrado en el Agent, instala la librería `ibm_db` de manera local. Los archivos de esta biblioteca se encuentran dentro del `python-ibmdb-x.y.z` extraído de `ibm_db.tar.gz`.

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

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Monitorizar IBM DB2 con Datadog][11]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/ibm_db2/images/dashboard_overview.png
[2]: https://www.ibm.com/analytics/us/en/db2
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/ibmdb/python-ibmdb
[5]: https://www.ibm.com/docs/en/db2oc?topic=views-monitor-procedures-functions
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://pypi.org/project/ibm-db/#files
[8]: https://public.dhe.ibm.com/ibmdl/export/pub/software/data/db2/drivers/odbc_cli/
[9]: https://docs.datadoghq.com/es/developers/guide/custom-python-package/?tab=linux
[10]: https://docs.datadoghq.com/es/help/
[11]: https://www.datadoghq.com/blog/monitor-db2-with-datadog
