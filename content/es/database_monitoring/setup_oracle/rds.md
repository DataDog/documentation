---
description: Instala y configura la Monitorización de base de datos para RDS Oracle
further_reading:
- link: /integrations/oracle/
  tag: Documentación
  text: Integración básica de Oracle
title: Configuración de la Monitorización de base de datos para RDS Oracle
---

{{% dbm-oracle-definition %}}

El Agent recopila telemetría directamente de la base de datos iniciando sesión como usuario de solo lectura.

## Antes de empezar

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

Impacto del rendimiento
: el valor predeterminado de configuración del Agent para la Monitorización de base de datos es conservador, pero puedes ajustar parámetros como el intervalo de recopilación y la frecuencia de muestreo de consultas para que se adapten mejor a tus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de consultas en la base de datos y menos del uno por ciento de la CPU. <br/><br/>
La Monitorización de base de datos se ejecuta como integración sobre el Agent base ([ver valores de referencia][1]).

Proxies, equilibradores de carga y agrupadores de conexiones
: El Agent debe conectarse directamente al host que está siendo monitorizado. El Agent no debe conectarse a la base de datos a través de un proxy, equilibrador de carga o agrupador de conexiones. Cada Agent debe tener conocimiento del nombre de host subyacente y debe ceñirse a un único host durante toda su vida, incluso en casos de conmutación por error. Si el Datadog Agent se conecta a diferentes hosts mientras se está ejecutando, los valores de las métricas serán incorrectos.

Consideraciones sobre la seguridad de los datos
: para saber qué datos recopila el Agent de tus bases de datos y cómo garantizar su seguridad, consulta [Información confidencial][6].

## Configuración

Sigue los siguientes pasos para habilitar la Monitorización de base de datos con tu base de datos Oracle:

1. [Crea el usuario Datadog](#create-the-datadog-user).
1. [Concede al usuario acceso a la base de datos](#grant-the-user-access-to-the-database)
1. [Instala el Agent](#install-the-agent).
1. [Configura el Agent](#configure-the-agent).
1. [Instala o verifica la integración de Oracle](#install-or-verify-the-oracle-integration).
1. [Confirma la configuración](#validate-the-setup).

### Crear el usuario de Datadog

{{% dbm-create-oracle-user %}}

### Conceder al usuario acceso a la base de datos

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
### Guardar tu contraseña de forma segura
{{% dbm-secret %}}

### Instalación del Agent

Para determinar dónde instalar el Agent, consulta la documentación [Arquitecturas de configuración de DBM][10]. El Agent no requiere ningún cliente de Oracle externo.

Para conocer los pasos de instalación, consulta las [instrucciones de instalación del Agent][8].

### Configurar el Agent

Crea el archivo de configuración de Oracle Agent `/etc/datadog-agent/conf.d/oracle.d/conf.yaml`. Para ver todas las opciones de configuración disponibles, consulta el [archivo de configuración de ejemplo][9].

**Nota:** El subdirectorio de configuración para las versiones del Agent entre `7.50.1` y `7.53.0` es `oracle-dbm.d`. Para ver más detalles, consulta [Configuración de la integración de Oracle en el Agent v7.50.1 o posterior][11].

```yaml
init_config:
instances:
  - server: '<RDS_INSTANCE_ENDPOINT_1>:<PORT>'
    service_name: "<SERVICE_NAME>" # The Oracle CDB service name
    username: 'datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<RDS_INSTANCE_ENDPOINT_2>:<PORT>'
    service_name: "<SERVICE_NAME>" # The Oracle CDB service name
    username: 'datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

Una vez terminada la configuración del Agent, [reinicia el Datadog Agent][2].

### Validar la configuración

[Ejecuta el subcomando de estado del Agent][3] y busca `oracle` en la sección **Checks**. Visita la página [Dashboard][5] y [Bases de datos][4] de Datadog para empezar.

## Consultas personalizadas

La Monitorización de base de datos admite consultas personalizadas para bases de datos Oracle. Para obtener más información sobre las opciones de configuración disponibles, consulta [conf.yaml.example][9].

<div class="alert alert-danger">La ejecución de consultas personalizadas puede dar lugar a costes o cargos adicionales evaluados por Oracle.</div>

[1]: /es/database_monitoring/agent_integration_overhead/?tab=oracle
[2]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[3]: /es/agent/configuration/agent-commands/#agent-status-and-information
[4]: https://app.datadoghq.com/databases
[5]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[6]: /es/database_monitoring/data_collected/#sensitive-information
[7]: https://app.datadoghq.com/integrations/oracle
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[10]: /es/database_monitoring/architecture/
[11]: /es/integrations/guide/oracle-check-upgrade-7.50.1/

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}