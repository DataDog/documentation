---
app_id: oracle
app_uuid: 34835d2b-a812-4aac-8cc2-d298db851b80
assets:
  dashboards:
    DBM Oracle Database Overview: assets/dashboards/dbm_oracle_database_overview.json
    oracle: assets/dashboards/oracle_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: oracle.session_count
      metadata_path: metadata.csv
      prefix: oracle.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10000
    source_type_name: Oracle Database
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- data stores
- network
- oracle
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/oracle/README.md
display_on_public_website: true
draft: false
git_integration_title: oracle
integration_id: oracle
integration_title: Oracle Database
integration_version: 6.0.0
is_public: true
manifest_version: 2.0.0
name: oracle
public_title: Oracle Database
short_description: Sistema de base de datos relacional Oracle diseñado para la computación
  enterprise grid
supported_os:
- linux
- windows
- macos
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Data Stores
  - Category::Network
  - Category::Oracle
  - Supported OS::Linux
  - Supported OS::Windows
  - Supported OS::macOS
  - Offering::Integration
  configuration: README.md#Setup
  description: Sistema de base de datos relacional Oracle diseñado para la computación
    enterprise grid
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Oracle Database
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


![Dashboard de Oracle][1]

## Información general

La integración de Oracle proporciona métricas del estado y el rendimiento de tu base de datos de Oracle casi en tiempo real. Visualiza estas métricas con el dashboard proporcionado y crea monitores para alertar a tu equipo sobre los estados de base de datos de Oracle.

Activa la [Monitorización de base de datos][2] (DBM) para obtener información mejorada sobre el rendimiento de las consultas y el estado de la base de datos. Además de las funciones estándar de integración, Datadog DBM proporciona métricas a nivel de consulta, snapshots de consultas en tiempo real e históricas, análisis de evento de espera, carga de la base de datos, planes de explicación de consultas e información de consultas de bloqueo.


## Configuración

### Instalación

#### Requisito previo

Para utilizar la integración de Oracle, puedes utilizar el cliente nativo (no requiere pasos adicionales de instalación) o Oracle Instant Client.

##### Oracle Instant Client

Omite este paso si no utilizas Instant Client.

{{< tabs >}}

{{% tab "Linux" %}}
###### Linux

1. Sigue las instrucciones de [Instalación de Oracle Instant Client para Linux][1].

2. Comprueba que el paquete *Instant Client Basic* está instalado. Encuéntralo en la [página de descargas][2] de Oracle.

    Una vez instaladas las bibliotecas de Instant Client, asegúrate de que el enlazador de tiempo de ejecución pueda encontrar las bibliotecas, por ejemplo:

      ```shell
      # Put the library location in the /etc/datadog-agent/environment file.

      echo "LD_LIBRARY_PATH=/u01/app/oracle/product/instantclient_19" \
      >> /etc/datadog-agent/environment
      ```

[1]: https://docs.oracle.com/en/database/oracle/oracle-database/19/mxcli/installing-and-removing-oracle-database-client.html
[2]: https://www.oracle.com/ch-de/database/technologies/instant-client/downloads.html
{{% /tab %}}

{{% tab "Windows" %}}
###### Windows

1. Sigue la [Guía de instalación de Oracle Windows][1] para configurar tu Oracle Instant Client.

2. Verifica lo siguiente:
    - Se ha instalado [Microsoft Visual Studio 2017 Redistributable][2] o la versión adecuada para Oracle Instant Client.

    - El paquete *Instant Client Basic* de la [página de descargas][3] de Oracle está instalado y disponible para todos los usuarios de la máquina en cuestión (por ejemplo, `C:\oracle\instantclient_19`).

    - La variable de entorno `PATH` contiene el directorio con el Instant Client (por ejemplo, `C:\oracle\instantclient_19`).


[1]: https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html#ic_winx64_inst
[2]: https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0
[3]: https://www.oracle.com/ch-de/database/technologies/instant-client/downloads.html
{{% /tab %}}
{{< /tabs >}}

#### Creación de usuarios de Datadog

{{< tabs >}}
{{% tab "Multiinquilino" %}}
##### Multiinquilino

###### Crear usuario

Crea un inicio de sesión de solo lectura para conectarte a tu servidor y concede los permisos necesarios:

```SQL
CREATE USER c##datadog IDENTIFIED BY &password CONTAINER = ALL ;

ALTER USER c##datadog SET CONTAINER_DATA=ALL CONTAINER=CURRENT;
```

###### Conceder permisos

Inicia sesión como `sysdba` y concede los siguientes permisos:

```SQL
grant create session to c##datadog ;
grant select on v_$session to c##datadog ;
grant select on v_$database to c##datadog ;
grant select on v_$containers to c##datadog;
grant select on v_$sqlstats to c##datadog ;
grant select on v_$instance to c##datadog ;
grant select on dba_feature_usage_statistics to c##datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to c##datadog ;
grant select on V_$PROCESS to c##datadog ;
grant select on V_$SESSION to c##datadog ;
grant select on V_$CON_SYSMETRIC to c##datadog ;
grant select on CDB_TABLESPACE_USAGE_METRICS to c##datadog ;
grant select on CDB_TABLESPACES to c##datadog ;
grant select on V_$SQLCOMMAND to c##datadog ;
grant select on V_$DATAFILE to c##datadog ;
grant select on V_$SYSMETRIC to c##datadog ;
grant select on V_$SGAINFO to c##datadog ;
grant select on V_$PDBS to c##datadog ;
grant select on CDB_SERVICES to c##datadog ;
grant select on V_$OSSTAT to c##datadog ;
grant select on V_$PARAMETER to c##datadog ;
grant select on V_$SQLSTATS to c##datadog ;
grant select on V_$CONTAINERS to c##datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to c##datadog ;
grant select on V_$SQL to c##datadog ;
grant select on V_$PGASTAT to c##datadog ;
grant select on v_$asm_diskgroup to c##datadog ;
grant select on v_$rsrcmgrmetric to c##datadog ;
grant select on v_$dataguard_config to c##datadog ;
grant select on v_$dataguard_stats to c##datadog ;
grant select on v_$transaction to c##datadog;
grant select on v_$locked_object to c##datadog;
grant select on dba_objects to c##datadog;
grant select on cdb_data_files to c##datadog;
grant select on dba_data_files to c##datadog;
```

Si has configurado consultas personalizadas que se ejecutan en una base de datos conectable (PDB), debes conceder el privilegio `set container` al usuario `C##DATADOG`:

```SQL
connect / as sysdba
alter session set container = your_pdb ;
grant set container to c##datadog ;
```

{{% /tab %}}

{{% tab "Sin CDB" %}}
##### Sin CDB

###### Crear usuario

Crea un inicio de sesión de solo lectura para conectarte a tu servidor y concede los permisos necesarios:

```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```

###### Conceder permisos

Inicia sesión como `sysdba` y concede los siguientes permisos:

```SQL
grant create session to datadog ;
grant select on v_$session to datadog ;
grant select on v_$database to datadog ;
grant select on v_$containers to datadog;
grant select on v_$sqlstats to datadog ;
grant select on v_$instance to datadog ;
grant select on dba_feature_usage_statistics to datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V_$PROCESS to datadog ;
grant select on V_$SESSION to datadog ;
grant select on V_$CON_SYSMETRIC to datadog ;
grant select on CDB_TABLESPACE_USAGE_METRICS to datadog ;
grant select on CDB_TABLESPACES to datadog ;
grant select on V_$SQLCOMMAND to datadog ;
grant select on V_$DATAFILE to datadog ;
grant select on V_$SYSMETRIC to datadog ;
grant select on V_$SGAINFO to datadog ;
grant select on V_$PDBS to datadog ;
grant select on CDB_SERVICES to datadog ;
grant select on V_$OSSTAT to datadog ;
grant select on V_$PARAMETER to datadog ;
grant select on V_$SQLSTATS to datadog ;
grant select on V_$CONTAINERS to datadog ;
grant select on V_$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V_$SQL to datadog ;
grant select on V_$PGASTAT to datadog ;
grant select on v_$asm_diskgroup to datadog ;
grant select on v_$rsrcmgrmetric to datadog ;
grant select on v_$dataguard_config to datadog ;
grant select on v_$dataguard_stats to datadog ;
grant select on v_$transaction to datadog;
grant select on v_$locked_object to datadog;
grant select on dba_objects to datadog;
grant select on cdb_data_files to datadog;
grant select on dba_data_files to datadog;
```

{{% /tab %}}

{{% tab "RDS" %}}
##### RDS

###### Crear usuario

Crea un inicio de sesión de solo lectura para conectarte a tu servidor y concede los permisos necesarios:

```SQL
CREATE USER datadog IDENTIFIED BY your_password ;
```

###### Conceder permisos 

```SQL
grant create session to datadog ;
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SESSION','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATABASE','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$CONTAINERS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQLSTATS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$INSTANCE','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL_PLAN_STATISTICS_ALL','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('DBA_FEATURE_USAGE_STATISTICS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PROCESS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SESSION','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$CON_SYSMETRIC','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_TABLESPACE_USAGE_METRICS','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_TABLESPACES','DATADOG','SELECT',p_grant_option => false); 
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQLCOMMAND','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATAFILE','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SGAINFO','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SYSMETRIC','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PDBS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_SERVICES','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$OSSTAT','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PARAMETER','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQLSTATS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$CONTAINERS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL_PLAN_STATISTICS_ALL','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$SQL','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$PGASTAT','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$ASM_DISKGROUP','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$RSRCMGRMETRIC','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATAGUARD_CONFIG','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$DATAGUARD_STATS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$TRANSACTION','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('V_$LOCKED_OBJECT','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('DBA_OBJECTS','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('CDB_DATA_FILES','DATADOG','SELECT',p_grant_option => false);
exec rdsadmin.rdsadmin_util.grant_sys_object('DBA_DATA_FILES','DATADOG','SELECT',p_grant_option => false);
```

{{% /tab %}}

{{% tab "Oracle Autonomous Database" %}}
##### Oracle Autonomous Database

###### Crear usuario

Crea un inicio de sesión de solo lectura para conectarte a tu servidor y concede los permisos necesarios:

```SQL
CREATE USER datadog IDENTIFIED BY your_password ;
```

###### Conceder permisos 

```SQL
grant create session to datadog ;
grant select on v$session to datadog ;
grant select on v$database to datadog ;
grant select on v$containers to datadog;
grant select on v$sqlstats to datadog ;
grant select on v$instance to datadog ;
grant select on dba_feature_usage_statistics to datadog ;
grant select on V$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V$PROCESS to datadog ;
grant select on V$SESSION to datadog ;
grant select on V$CON_SYSMETRIC to datadog ;
grant select on CDB_TABLESPACE_USAGE_METRICS to datadog ;
grant select on CDB_TABLESPACES to datadog ;
grant select on V$SQLCOMMAND to datadog ;
grant select on V$DATAFILE to datadog ;
grant select on V$SYSMETRIC to datadog ;
grant select on V$SGAINFO to datadog ;
grant select on V$PDBS to datadog ;
grant select on CDB_SERVICES to datadog ;
grant select on V$OSSTAT to datadog ;
grant select on V$PARAMETER to datadog ;
grant select on V$SQLSTATS to datadog ;
grant select on V$CONTAINERS to datadog ;
grant select on V$SQL_PLAN_STATISTICS_ALL to datadog ;
grant select on V$SQL to datadog ;
grant select on V$PGASTAT to datadog ;
grant select on v$asm_diskgroup to datadog ;
grant select on v$rsrcmgrmetric to datadog ;
grant select on v$dataguard_config to datadog ;
grant select on v$dataguard_stats to datadog ;
grant select on v$transaction to datadog;
grant select on v$locked_object to datadog;
grant select on dba_objects to datadog;
grant select on cdb_data_files to datadog;
grant select on dba_data_files to datadog;
```

{{% /tab %}}

{{< /tabs >}}

### Configuración

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `oracle.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent][3]. Actualiza `server` y `port` para establecer el nodo maestro a monitorizar. Consulta el [oracle.d/conf.yaml de ejemplo][4] para conocer todas las opciones disponibles de configuración.

   ```yaml
   init_config:

   instances:
      ## @param server - string - required
      ## The IP address or hostname of the Oracle Database Server.
      #
      - server: localhost:1521

        ## @param service_name - string - required
        ## The Oracle Database service name. To view the services available on your server,
        ## run the following query: `SELECT value FROM v$parameter WHERE name='service_names'`
        #
        service_name: <SERVICE_NAME>

        ## @param username - string - required
        ## The username for the Datadog user account.
        #
        username: <USERNAME>

        ## @param password - string - required
        ## The password for the Datadog user account.
        #
        password: <PASSWORD>
   ```

**Nota:** Para las versiones del Agent comprendidas entre `7.50.1` (incluido) y `7.53.0` (excluido), el subdirectorio de configuración es `oracle-dbm.d`. Para todas las demás versiones del Agent, el directorio de configuración es `oracle.d`.

**Nota**: Los clientes de Oracle Real Application Cluster (RAC) deben configurar el Agent para cada nodo RAC, porque el Agent recopila información de cada nodo por separado consultando las vistas `V$`. El Agent no consulta ninguna vista `GV$` para evitar generar tráfico de interconexión.

2. [Reinicia el Agent][5].

#### Conexión a Oracle a través de TCPS

Para conectarte a Oracle a través de TCPS (TCP con SSL), elimina los comentarios de la opción de configuración `protocol` y selecciona `TCPS`. Actualiza la opción `server` para establecer el servidor TCPS a monitorizar.

    ```yaml
    init_config:

    instances:
      ## @param server - string - required
      ## L dirección IP o el nombre de host del Oracle Database Server.
      #
      - server: localhost:1522

        ## @param service_name - string - required
        ## El nombre de servicio de Oracle Database. Para ver los servicios disponibles en tu servidor,
        ## ejecuta la siguiente consulta:
        #
        service_name: "<SERVICE_NAME>"

        ## @param username - string - required
        ## El nombre de usuario de la cuenta de usuario.
        #
        username: <USER>

        ## @param password - string - required
        ## La contraseña para la cuenta de usuario.
        #
        password: "<PASSWORD>"

        ## @param protocol - string - optional - default: TCP
        ## El protocolo para conectarte al Oracle Database Server. Los protocolos válids son TCP y TCPS.
        ##
        #
        protocol: TCPS
    ```

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `oracle` en la sección Checks.

### Consulta personalizada

También es posible realizar consultas personalizadas. Cada consulta debe tener dos parámetros:

| Parámetro       | Descripción                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |                                                                                                                                                                
| `query`         | Este es el SQL a ejecutar. Puede ser una sentencia simple o un script de varias líneas. Se evalúan todas las filas del resultado.                                                                                                                                                                                                                                                                                                                        |
| `columns`       | Se trata de una lista que representa cada columna, ordenada secuencialmente de izquierda a derecha. Hay dos datos obligatorios: <br> a. `type`: es el método de envío (`gauge`, `count`, etc.). <br> b. name (nombre): es el sufijo utilizado para formar el nombre completo de la métrica. Si `type` es `tag`, esta columna se considera una etiqueta que se aplica a cada métrica recopilada por esta consulta en particular. |

Opcionalmente, utiliza el parámetro `tags` para aplicar una lista de etiquetas a cada métrica recopilada.

Lo siguiente:

```python
self.gauge('oracle.custom_query.metric1', value, tags=['tester:oracle', 'tag1:value'])
self.count('oracle.custom_query.metric2', value, tags=['tester:oracle', 'tag1:value'])
```

es en lo que se convertiría el siguiente ejemplo de configuración:

```yaml
- query: | # Usa el pipe si necesitas un script de múltiples líneas.
    SELECT columns
    FROM tester.test_table
    WHERE conditions
  columns:
    # Coloca esto en cualquier columna que deseas omitir:
    - {}
    - name: metric1
      type: gauge
    - name: tag1
      type: tag
    - name: metric2
      type: count
  tags:
    - tester:oracle
```

Consulta el [oracle.d/conf.yaml de ejemplo][4] para ver todas las opciones disponibles de configuración.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "oracle" >}}


### Eventos

El check de Oracle Database no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "oracle" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][7].


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/oracle/images/oracle_dashboard.png
[2]: https://docs.datadoghq.com/es/database_monitoring/
[3]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/es/help/