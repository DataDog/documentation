---
app_id: oracle
categories:
- data stores
- network
- oracle
custom_kind: integración
description: Sistema de base de datos relacional Oracle diseñado para la computación
  en red de la empresa
integration_version: 6.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Oracle Database
---
![Dashboard de Oracle](https://raw.githubusercontent.com/DataDog/integrations-core/master/oracle/images/oracle_dashboard.png)

## Información general

La integración de Oracle proporciona métricas del estado y el rendimiento de tu base de datos de Oracle casi en tiempo real. Visualiza estas métricas con el dashboard proporcionado y crea monitores para alertar a tu equipo sobre los estados de base de datos de Oracle.

Activa [Database Monitoring](https://docs.datadoghq.com/database_monitoring/) (DBM) para obtener información mejorada sobre el rendimiento de las consultas y el estado de las bases de datos. Además de las funciones de la integración estándar, Datadog DBM proporciona métricas a nivel de consulta, snapshots de consultas históricas y actuales, análisis de eventos de espera, carga de bases de datos, explain plans de consultas e información sobre bloqueos de consultas.

## Configuración

### Instalación

#### Requisito previo

Para utilizar la integración de Oracle puedes utilizar el cliente nativo (no se requieren pasos adicionales de instalación) o el Oracle Instant Client.

##### Oracle Instant Client

Omite este paso si no utilizas Instant Client.

{{< tabs >}}

{{% tab "Linux" %}}

###### Linux

1. Sigue las instrucciones de [Instalación de Oracle Instant Client para Linux](https://docs.oracle.com/en/database/oracle/oracle-database/19/mxcli/installing-and-removing-oracle-database-client.html).

1. Comprueba que el paquete *Instant Client Basic* está instalado. Búscalo en la [página de descargas](https://www.oracle.com/ch-de/database/technologies/instant-client/downloads.html). de Oracle.

   Una vez instaladas las bibliotecas de Instant Client, asegúrate de que el enlazador de tiempo de ejecución puede encontrar las bibliotecas, por ejemplo:

   ```shell
   # Put the library location in the /etc/datadog-agent/environment file.

   echo "LD_LIBRARY_PATH=/u01/app/oracle/product/instantclient_19" \
   >> /etc/datadog-agent/environment
   ```

{{% /tab %}}

{{% tab "Windows" %}}

###### Windows

1. Sigue la [guía de instalación de Oracle Windows](https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html#ic_winx64_inst) para configurar tu Oracle Instant Client.

1. Comprueba lo siguiente:

   - Se ha instalado [Microsoft Visual Studio 2017 Redistributable](https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0) o la versión adecuada para el Oracle Instant Client.

   - Se ha instalado el paquete *Instant Client Basic* de la [página de descargas](https://www.oracle.com/ch-de/database/technologies/instant-client/downloads.html) de Oracle y está disponible para todos los usuarios de la máquina en cuestión (por ejemplo, `C:\oracle\instantclient_19`).

   - La variable de entorno `PATH` contiene el directorio con el Instant Client (por ejemplo, `C:\oracle\instantclient_19`).

{{% /tab %}}

{{< /tabs >}}

#### Creación de usuarios de Datadog

{{< tabs >}}

{{% tab "Multi-tenant" %}}

##### Multiinquilino

###### Crear usuario

Crea un inicio de sesión de solo lectura para conectarte a tu servidor y conceder los permisos necesarios:

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

Crea un inicio de sesión de solo lectura para conectarte a tu servidor y conceder los permisos necesarios:

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

Crea un inicio de sesión de solo lectura para conectarte a tu servidor y conceder los permisos necesarios:

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

Crea un inicio de sesión de solo lectura para conectarte a tu servidor y conceder los permisos necesarios:

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

1. Edita el archivo `oracle.d/conf.yaml`, en la carpeta `conf.d/` en la raíz de tu [directorio de configuración del Agent](https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory). Actualiza `server` y `port` para configurar los masters que se van a monitorizar. Consulta el [ejemplo oracle.d/conf.yaml](https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

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

**Nota**: Los clientes de Oracle Real Application Cluster (RAC) deben configurar el Agent para cada nodo RAC, ya que el Agent recopila información de cada nodo por separado, consultando vistas `V$`. El Agent no consulta ninguna vista `GV$` para evitar generar tráfico de interconexión.

2. [Reinicia el Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent).

#### Conexión a Oracle a través de TCPS

Para conectarte a Oracle a través de TCPS (TCP con SSL), quita la marca de comentario de la opción de configuración `protocol` y selecciona `TCPS`. Actualiza la opción `server` para configurar el servidor TCPS en el monitor.

````
```yaml
init_config:

instances:
  ## @param server - string - required
  ## The IP address or hostname of the Oracle Database Server.
  #
  - server: localhost:1522

    ## @param service_name - string - required
    ## The Oracle Database service name. To view the services available on your server,
    ## run the following query:
    #
    service_name: "<SERVICE_NAME>"

    ## @param username - string - required
    ## The username for the user account.
    #
    username: <USER>

    ## @param password - string - required
    ## The password for the user account.
    #
    password: "<PASSWORD>"

    ## @param protocol - string - optional - default: TCP
    ## The protocol to connect to the Oracle Database Server. Valid protocols include TCP and TCPS.
    ##
    #
    protocol: TCPS
```
````

### Validación

[Ejecuta el subcomando de estado del Agent](https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information) y busca `oracle` en la sección Checks.

### Consulta personalizada

También es posible realizar consultas personalizadas. Cada consulta debe tener dos parámetros:

| Parámetro | Descripción |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |\
| `query` | Este es el SQL a ejecutar. Puede ser una sentencia simple o un script de varias líneas. Se evalúan todas las filas del resultado.                                                                                                                                                                                                                                                                                                                        |
| `columns` | Esta es una lista que representa cada columna, ordenada secuencialmente de izquierda a derecha. Hay dos datos obligatorios: <br> a. `type` - Es el método de envío (`gauge`, `count`, etc.). <br> b. name - Es el sufijo utilizado para formar el nombre completo de la métrica. Si `type` es `tag`, esta columna se considera en cambio como una etiqueta que se aplica a cada métrica recopilada por esta consulta en particular. |

Opcionalmente, utiliza el parámetro `tags` para aplicar una lista de etiquetas (tags) a cada métrica recopilada.

Lo siguiente:

```python
self.gauge('oracle.custom_query.metric1', value, tags=['tester:oracle', 'tag1:value'])
self.count('oracle.custom_query.metric2', value, tags=['tester:oracle', 'tag1:value'])
```

es en lo que se convertiría el siguiente ejemplo de configuración:

```yaml
- query: | # Use the pipe if you require a multi-line script.
    SELECT columns
    FROM tester.test_table
    WHERE conditions
  columns:
    # Put this for any column you wish to skip:
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

Consulta el [ejemplo oracle.d/conf.yaml](https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example) para conocer todas las opciones de configuración disponibles.

## Datos recopilados

### Métricas

| | |
| --- | --- |
| **oracle.active_sessions** <br>(gauge) | Número de sesiones activas|
| **oracle.asm_diskgroup.free_mb** <br>(gauge) | Capacidad no utilizada de un grupo de discos en megabytes, etiquetada por `state` (solo DBM)|
| **oracle.asm_diskgroup.offline_disks** <br>(gauge) | Número de discos de un grupo de discos ASM que están fuera de línea, etiquetados por `state` (solo DBM)|
| **oracle.asm_diskgroup.total_mb** <br>(gauge) | Capacidad total utilizable del grupo de discos, etiquetada por `state` (solo DBM)|
| **oracle.buffer_cachehit_ratio** <br>(gauge) | Ratio de accesos a la caché del buffer<br>_Se muestra como porcentaje_ |
| **oracle.cache_blocks_corrupt** <br>(gauge) | Bloques de caché corruptos<br>_Se muestra como bloque_ |
| **oracle.cache_blocks_lost** <br>(gauge) | Bloques de caché perdidos<br>_Se muestra como bloque_ |
| **oracle.cursor_cachehit_ratio** <br>(gauge) | Ratio de accesos a la caché del cursor<br>_Se muestra como porcentaje_. |
| **oracle.database_wait_time_ratio** <br>(gauge) | Ordenaciones de memoria por segundo<br>_Se muestra como porcentaje_. |
| **oracle.disk_sorts** <br>(gauge) | Ordenaciones de disco por segundo<br>_Se muestra como operación_ |
| **oracle.enqueue_timeouts** <br>(gauge) | Tiempos de espera en cola excedidos por segundo<br>_Se muestra como tiempo de espera excedido_ |
| **oracle.gc_cr_block_received** <br>(gauge) | Bloque CR de recolección de basura recibido<br>_Se muestra como bloque_ |
| **oracle.library_cachehit_ratio** <br>(gauge) | Ratio de accesos a la caché de la biblioteca<br>_Se muestra como porcentaje_ |
| **oracle.logons** <br>(gauge) | Número de intentos de inicio de sesión|
| **oracle.long_table_scans** <br>(gauge) | Número de análisis extensos de tablas por segundo<br>_Se muestra como análisis_ |
| **oracle.memory_sorts_ratio** <br>(gauge) | Ratio de ordenaciones de la memoria<br>_Se muestra como porcentaje_ |
| **oracle.physical_reads** <br>(gauge) | Lecturas físicas por segundo<br>_Se muestra como lectura_ |
| **oracle.physical_writes** <br>(gauge) | Escrituras físicas por segundo<br>_Se muestra como escritura_ |
| **oracle.process.pga_allocated_memory** <br>(gauge) | Memoria PGA asignada por el proceso<br>_Se muestra como bytes_ |
| **oracle.process.pga_freeable_memory** <br>(gauge) | Memoria PGA liberable por proceso<br>_Se muestra como bytes_ |
| **oracle.process.pga_maximum_memory** <br>(gauge) | Memoria PGA máxima asignada por el proceso<br>_Se muestra como bytes_ |
| **oracle.process.pga_used_memory** <br>(gauge) | Memoria PGA utilizada por el proceso<br>_Se muestra como bytes_ |
| **oracle.rows_per_sort** <br>(gauge) | Filas por clasificación<br>_Se muestra como fila_ |
| **oracle.service_response_time** <br>(gauge) | Tiempo de respuesta del servicio<br>_Se muestra como segundos_ |
| **oracle.session_count** <br>(gauge) | Recuento de sesiones|
| **oracle.session_limit_usage** <br>(gauge) | Uso del límite de sesión<br>_Se muestra como porcentaje_. |
| **oracle.shared_pool_free** <br>(gauge) | % de memoria libre del grupo compartido<br>_Se muestra como porcentaje_ |
| **oracle.sorts_per_user_call** <br>(gauge) | Clasificación por llamadas de usuario|
| **oracle.tablespace.in_use** <br>(gauge) | Espacio de tabla en uso<br>_Se muestra como porcentaje_. |
| **oracle.tablespace.offline** <br>(gauge) | Espacio de tabla fuera de línea|
| **oracle.tablespace.size** <br>(gauge) | Tamaño del espacio de tabla<br>_Se muestra como bytes_ |
| **oracle.tablespace.used** <br>(gauge) | Espacio de tabla utilizado<br>_Se muestra como bytes_ |
| **oracle.temp_space_used** <br>(gauge) | Espacio temporal utilizado<br>_Se muestra como bytes_ |
| **oracle.user_rollbacks** <br>(gauge) | Número de reversiones de usuarios<br>_Se muestra como operación_ |

### Eventos

El check de Oracle Database no incluye ningún evento.

### Checks de servicio

**oracle.can_connect**

Devuelve OK si la integración puede conectarse a Oracle Database, CRITICAL en caso contrario

_Estados: ok, crítico_

**oracle.can_query**

Devuelve OK si la integración puede ejecutar todas las consultas, CRITICAL en caso contrario

_Estados: ok, crítico_

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).