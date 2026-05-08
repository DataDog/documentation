---
"app_id": "sql-server"
"app_uuid": "bfa2f276-da05-4153-b8d4-48d4e41f5e40"
"assets":
  "dashboards":
    "SQLServer-AlwaysOn": "assets/dashboards/SQLServer-AlwaysOn_dashboard.json"
    "SQLServer-Overview": "assets/dashboards/SQLServer-Overview_dashboard.json"
    "sqlserver": "assets/dashboards/sqlserver_dashboard.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "sqlserver.stats.connections"
      "metadata_path": "metadata.csv"
      "prefix": "sqlserver."
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "45"
    "source_type_name": "SQL Server"
  "monitors":
    "Auto-parameterization attempts are failing": "assets/monitors/sqlserver_high_number_failed_auto_param.json"
    "Availability Group is not healthy": "assets/monitors/sqlserver_ao_not_healthy.json"
    "Availability group failover detected": "assets/monitors/sqlserver_ao_failover.json"
    "Database is not online": "assets/monitors/sqlserver_db_not_online.json"
    "Database not in sync": "assets/monitors/sqlserver_db_not_sync.json"
    "Processes are blocked": "assets/monitors/sqlserver_high_processes_blocked.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "data stores"
- "log collection"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/sqlserver/README.md"
"display_on_public_website": verdadero
"draft": falso
"git_integration_title": "sqlserver"
"integration_id": "sql-server"
"integration_title": "SQL Server"
"integration_version": "22.7.0"
"is_public": verdadero
"manifest_version": "2.0.0"
"name": "sqlserver"
"public_title": "SQL Server"
"short_description": "Recopila métricas de rendimiento y estado importantes de SQL Server."
"supported_os":
- "linux"
- "macos"
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Linux"
  - "Supported OS::macOS"
  - "Supported OS::Windows"
  - "Category::Almacenes de datos"
  - "Category::Recopilación de logs"
  - "Offering::Integration"
  "configuration": "README.md#Setup"
  "description": "Recopila métricas de rendimiento y estado importantes de SQL Server."
  "media": []
  "overview": "README.md#Overview"
  "resources":
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/monitor-azure-sql-databases-datadog"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/sql-server-monitoring"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/sql-server-monitoring-tools"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/sql-server-performance"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/sql-server-metrics"
  - "resource_type": "blog"
    "url": "https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/"
  "support": "README.md#Support"
  "title": "SQL Server"
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


![Gráfico de SQL Server][1]

## Información general

La integración de SQL Server realiza un seguimiento del rendimiento de las instancias de SQL Server. Recopila métricas para el número de conexiones de usuario, la tasa de compilaciones de SQL y mucho más.

Activa la [Monitorización de base de datos][2] (DBM) para obtener una visión mejorada del rendimiento de las consultas y del estado de la base de datos. Además de la integración estándar, Datadog DBM proporciona métricas a nivel de consulta, snapshots de consultas en tiempo real e históricas, análisis de eventos de espera, carga de la base de datos, planes de explicación de consultas e información sobre consultas de bloqueo.

SQL Server 2012, 2014, 2016, 2017, 2019 y 2022 son compatibles.

## Configuración

<div class="alert alert-info">En esta página, se describe la integración estándar del Agent de SQL Server. Si buscas el producto de Monitorización de base de datos para SQL Server, consulta <a href="https://docs.datadoghq.com/database_monitoring" target="_blank">Monitorización de base de datos de Datadog</a>.</div>

### Instalación

El check de SQL Server se incluye en el paquete del [Datadog Agent][3]. No es necesaria ninguna instalación adicional en tus instancias de SQL Server.

Asegúrate de que tu instancia de SQL Server admite la autenticación de SQL Server activando el "Modo de autenticación de SQL Server y Windows" en las propiedades del servidor:

_Propiedades del servidor_ -> _Seguridad_ -> _Modo de autenticación de SQL Server y Windows_

### Requisito previo

**Nota**: Para instalar la Monitorización de base de datos para SQL Server, selecciona tu solución de alojamiento en el [sitio de documentación][4] para obtener instrucciones.

Las versiones de SQL Server admitidas para el check de SQL Server son las mismas que para la Monitorización de base de datos. Visita la página [Configuración de SQL Server][5] para ver las versiones soportadas actualmente bajo el título **Autoalojado**.

Procede con los siguientes pasos de esta guía solo si vas a instalar la integración estándar únicamente.

1. Crea un inicio de sesión de sólo lectura para conectarse a tu servidor:

    ```SQL
        CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
        USE master;
        CREATE USER datadog FOR LOGIN datadog;
        GRANT SELECT on sys.dm_os_performance_counters to datadog;
        GRANT VIEW SERVER STATE to datadog;
    ```

   Para recopilar métricas del tamaño del archivo por base de datos, asegúrate de que el usuario que has creado (`datadog`) tiene [acceso con permiso de conexión][6] a tus bases de datos ejecutando:

   ```SQL
       GRANT CONNECT ANY DATABASE to datadog; 
   ```

2. (Necesario para AlwaysOn y métricas `sys.master_files`) Para reunir AlwaysOn y métricas `sys.master_files`, concede el siguiente permiso adicional:

    ```SQL
        GRANT VIEW ANY DEFINITION to datadog;
    ```

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `sqlserver.d/conf.yaml` en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1]. Para conocer todas las opciones de configuración disponibles, consulta el [sqlserver.d/conf.yaml de ejemplo][2].

   ```yaml
   init_config:

   instances:
     - host: "<SQL_HOST>,<SQL_PORT>"
       username: datadog
       password: "<YOUR_PASSWORD>"
       connector: adodbapi 
       adoprovider: MSOLEDBSQL19  # Replace with MSOLEDBSQL for versions 18 and previous
   ```

    Si utilizas el Autodiscovery de puerto, utiliza `0` para `SQL_PORT`. Consulta la [configuración de check de ejemplo][2] para obtener una descripción completa de todas las opciones, incluido cómo utilizar consultas personalizadas para crear tus propias métricas.

    Utiliza [controladores compatibles][3] en función de tu configuración de SQL Server.

    **Nota**: También es posible utilizar la autenticación de Windows y no especificar el nombre de usuario/contraseña con:

      ```yaml
      connection_string: "Trusted_Connection=yes"
      ```


2. [Reinicia el Agent][4].

##### Linux

Se requieren pasos adicionales en la configuración para que la integración de SQL Server funcione en el host de Linux:

1. Instala un controlador ODBC SQL Server, por ejemplo el [controlador ODBC de Microsoft][5] o el [controlador FreeTDS][6].
2. Copia los archivos `odbc.ini` y `odbcinst.ini` en la carpeta `/opt/datadog-agent/embedded/etc`.
3. Configura el archivo `conf.yaml` para utilizar el conector `odbc` y especifica el controlador adecuado como se indica en el archivo `odbcinst.ini`.

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

1. La recopilación de logs está desactivada en forma predeterminada en el Datadog Agent, actívala en tu archivo `datadog.yaml`:

    ```yaml
    logs_enabled: true
    ```

2. Añade este bloque de configuración a tu archivo `sqlserver.d/conf.yaml` para empezar a recopilar tus logs de SQL Server:

    ```yaml
    logs:
      - type: file
        encoding: utf-16-le
        path: "<LOG_FILE_PATH>"
        source: sqlserver
        service: "<SERVICE_NAME>"
    ```

    Cambia los valores de los parámetros `path` y `service` en función de tu entorno. Consulta el [sqlserver.d/conf.yaml de ejemplo][2] para ver todas las opciones disponibles de configuración.

3. [Reinicia el Agent][4].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://docs.datadoghq.com/database_monitoring/setup_sql_server/selfhosted/#supported-drivers
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server?view=sql-server-2017
[6]: http://www.freetds.org/
{{% /tab %}}
{{% tab "Contenedores" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

##### Recopilación de métricas

| Parámetro            | Valor                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `<INTEGRATION_NAME>` | `sqlserver`                                                                                                                      |
| `<INIT_CONFIG>`      | en blanco o `{}`                                                                                                                    |
| `<INSTANCE_CONFIG>`  | `{"host": "%%host%%,%%port%%", "username": "datadog", "password": "<UNIQUEPASSWORD>", "connector": "odbc", "driver": "FreeTDS"}` |

Consulta [Variables de plantilla de Autodiscovery][2] para obtener más detalles sobre cómo pasar `<UNIQUEPASSWORD>` como una variable de entorno en lugar de una etiqueta (label).

##### Recopilación de logs

_Disponible para las versiones 6.0 o posteriores del Agent_

La recopilación de logs se encuentra deshabilitada de manera predeterminada en el Datadog Agent. Para habilitarla, consulta la [recopilación de logs de Kubernetes][3].

| Parámetro      | Valor                                             |
| -------------- | ------------------------------------------------- |
| `<LOG_CONFIG>` | `{"source": "sqlserver", "service": "sqlserver"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
[2]: https://docs.datadoghq.com/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/agent/kubernetes/log/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][9] y busca `sqlserver` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "sqlserver" >}}


La mayoría de estas métricas proceden de la tabla `sys.dm_os_performance_counters` de tu SQL Server.

### Eventos

El check de SQL Server no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "sqlserver" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][8].

Si estás ejecutando el Agent en un procesador ARM aarch64, existe un problema conocido que comienza en la versión 14.0.0 de este check, que se incluye con el Agent versión 7.48.0. Una dependencia de Python falla al cargarse y verás el siguiente mensaje al ejecutar [el subcomando de estado del Agent][7]:

```
Loading Errors
  ==============
    sqlserver
    ---------
      Core Check Loader:
        Check sqlserver not found in Catalog
      JMX Check Loader:
        check is not a jmx check, or unable to determine if it's so
      Python Check Loader:
        unable to import module 'sqlserver': No module named 'sqlserver'
```

Esto se ha solucionado en la versión 15.2.0 del check y en las versiones 7.49.1 y posteriores del Agent.

## Referencias adicionales

- [Monitoriza tus bases de datos de Azure SQL con Datadog][9]
- [Métricas clave para la monitorización de SQL Server][10]
- [Herramientas de monitorización de SQL Server][11]
- [Monitorizar el rendimiento de SQL Server con Datadog][12]
- [Métricas personalizadas de SQL Server para una monitorización detallada][13]
- [Hacer una estrategia para tu migración de Azure para cargas de trabajo de SQL con Datadog][14]
- [Optimizar el rendimiento de SQL Server con la monitorización de base de datos de Datadog][15]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/sqlserver/images/sqlserver_dashboard_02_2024.png
[2]: https://docs.datadoghq.com/database_monitoring/
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://docs.datadoghq.com/database_monitoring/#sqlserver
[5]: https://docs.datadoghq.com/database_monitoring/setup_sql_server/
[6]: https://docs.microsoft.com/en-us/sql/t-sql/statements/grant-server-permissions-transact-sql?view=sql-server-ver15
[7]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[8]: https://docs.datadoghq.com/help/
[9]: https://www.datadoghq.com/blog/monitor-azure-sql-databases-datadog
[10]: https://www.datadoghq.com/blog/sql-server-monitoring
[11]: https://www.datadoghq.com/blog/sql-server-monitoring-tools
[12]: https://www.datadoghq.com/blog/sql-server-performance
[13]: https://www.datadoghq.com/blog/sql-server-metrics
[14]: https://www.datadoghq.com/blog/migrate-sql-workloads-to-azure-with-datadog/
[15]: https://www.datadoghq.com/blog/optimize-sql-server-performance-with-datadog/
