---
description: Instalación y configuración de Database Monitoring para Oracle Autonomous
  Database
further_reading:
- link: /integrations/oracle/
  tag: Documentación
  text: Integración Oracle básica
title: Configuración de Database Monitoring para Oracle Autonomous Database
---

{{% dbm-oracle-definition %}}

El Agent recopila telemetría directamente de la base de datos iniciando sesión como usuario de sólo lectura.

## Antes de empezar

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

Impacto en el rendimiento
: La configuración de Database Monitoring predeterminada del Agent es conservadora, pero puedes ajustar algunos parámetros como el intervalo de recopilación y la frecuencia de muestreo de consultas según tus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de la consulta en la base de datos y menos del uno por ciento del uso de CPU. <br/><br/>
Database Monitoring se ejecuta como una integración sobre el Agent de base ([consulta las referencias][1]).

Proxies, balanceadores de carga y agrupadores de conexiones
: El Agent debe conectarse directamente al host que está siendo monitorizado. El Agent no debe conectarse a la base de datos a través de un proxy, balanceador de carga o agrupador de conexiones. Cada Agent debe tener conocimiento del nombre de host subyacente y debe ceñirse a un único host durante toda su vida, incluso en casos de conmutación por error. Si el Datadog Agent se conecta a diferentes hosts mientras se está ejecutando, los valores de las métricas serán incorrectos.

Consideraciones sobre la seguridad de los datos
: Para saber qué datos recopila el Agent de tus bases de datos y cómo garantizar su seguridad, consulta [Información confidencial][2].

## Configuración

Sigue los siguientes pasos para habilitar Database Monitoring con tu base de datos Oracle:

1. [Crea el usuario Datadog](#create-the-datadog-user).
1. [Concede al usuario acceso a la base de datos](#grant-the-user-access-to-the-database).
1. [Instala el Agent](#install-the-agent).
1. [Configura el Agent](#configure-the-agent).
1. [Instala o verifica la integración Oracle](#install-or-verify-the-oracle-integration).
1. [Confirma la configuración](#validate-the-setup).

### Crear el usuario Datadog

{{% dbm-create-oracle-user %}}

### Conceder al usuario acceso a la base de datos

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

### Instalar el Agent

Para determinar dónde instalar el Agent, consulta la documentación [Arquitecturas de configuración de DBM][12]. El Agent no requiere ningún cliente Oracle externo.

Para conocer los pasos de instalación, consulta las [instrucciones de instalación del Agent][8].

### Configurar el Agent

Descarga el archivo zip de cartera desde Oracle Cloud y descomprímelo.

Crea el archivo de configuración de Oracle Agent `/etc/datadog-agent/conf.d/oracle.d/conf.yaml`. Para ver todas las opciones de configuración disponibles, consulta el [archivo de configuración de ejemplo][11].

**Nota:** El subdirectorio de configuración para las versiones del Agent anteriores a `7.53.0` es `oracle-dbm.d`.

Configura los parámetros `protocol` y `wallet`.

```yaml
init_config:
instances:
  - server: '<HOST_1>:<PORT>'
    service_name: "<SERVICE_NAME>" # Nombre de servicio de la base de datos de contenedor Oracle
    username: 'datadog'
    password: '<PASSWORD>'
    protocol: TCPS
    wallet: <YOUR_WALLET_DIRECTORY>
    dbm: true
    tags:  # Opcional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<HOST_2>:<PORT>'
    service_name: "<SERVICE_NAME>" # Nombre de servicio de la base de datos de contenedor Oracle
    username: 'datadog'
    password: '<PASSWORD>'
    protocol: TCPS
    wallet: <YOUR_WALLET_DIRECTORY>
    dbm: true
    tags:  # Opcional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

Una vez de terminar de configurar el Agent, [reinicia el Datadog Agent ][4].

### Instalar o verificar la integración Oracle

#### Primeras instalaciones

En la página de integraciones de Datadog, instala la [integración Oracle][9] para tu organización. Se instala un [dashboard de Oracle][7] en tu cuenta que puedes utilizar para monitorizar el rendimiento de tus bases de datos Oracle.

### Confirmar la configuración

[Ejecuta el subcomando de estado del Agent][5] y busca `oracle` en la sección **Checks**. Para comenzar, ve al dashboard con [información general de la base de datos Oracle para DBM][7] y a la página [Bases de datos][6] en Datadog.

## Consultas personalizadas

Database Monitoring admite consultas personalizadas para bases de datos Oracle. Para obtener más información sobre las opciones de configuración disponibles, consulta [conf.yaml.example][12].

<div class="alert alert-danger">La ejecución de consultas personalizadas puede dar lugar a costes o tasas adicionales evaluados por Oracle.</div>

[1]: /es/database_monitoring/agent_integration_overhead/?tab=oracle
[2]: /es/database_monitoring/data_collected/#sensitive-information
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[5]: /es/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
[7]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[8]: https://app.datadoghq.com/account/settings/agent/latest
[9]: https://app.datadoghq.com/integrations/oracle
[11]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[12]: /es/database_monitoring/architecture/

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}