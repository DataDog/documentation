---
description: Instala y configura la Monitorización de base de datos para Oracle autoalojado.
further_reading:
- link: /integrations/oracle/
  tag: Documentación
  text: Integración básica de Oracle
title: Configuración de la Monitorización de base de datos para Oracle autoalojado
---

{{% dbm-oracle-definition %}}

El Agent recopila telemetría directamente de la base de datos iniciando sesión como usuario de sólo lectura.

## Antes de empezar

{{% dbm-supported-oracle-versions %}}

{{% dbm-supported-oracle-agent-version %}}

Impacto del rendimiento
: el valor predeterminado de configuración del Agent para la Monitorización de base de datos es conservador, pero puedes ajustar parámetros como el intervalo de recopilación y la frecuencia de muestreo de consultas para que se adapten mejor a tus necesidades. Para la mayoría de las cargas de trabajo, el Agent representa menos del uno por ciento del tiempo de ejecución de consultas en la base de datos y menos del uno por ciento de la CPU. <br/><br/>
La Monitorización de base de datos se ejecuta como integración sobre el Agent base ([ver valores de referencia][6]).

Proxies, equilibradores de carga y agrupadores de conexiones
: El Agent debe conectarse directamente al host que está siendo monitorizado. El Agent no debe conectarse a la base de datos a través de un proxy, equilibrador de carga o agrupador de conexiones. Cada Agent debe tener conocimiento del nombre de host subyacente y debe ceñirse a un único host durante toda su vida, incluso en casos de conmutación por error. Si el Datadog Agent se conecta a diferentes hosts mientras se está ejecutando, los valores de las métricas serán incorrectos.

Consideraciones sobre la seguridad de los datos
: para saber qué datos recopila el Agent de tus bases de datos y cómo garantizar su seguridad, consulta [Información confidencial][5].

## Configuración

Sigue los siguientes pasos para habilitar la Monitorización de base de datos con tu base de datos Oracle:

1. [Crea el usuario Datadog](#create-the-datadog-user).
1. [Conceder al usuario acceso a la base de datos](#grant-the-user-access-to-the-database)
1. [Crea una vista](#create-a-view)
1. [Instala el Agent](#install-the-agent).
1. [Configura el Agent](#configure-the-agent).
1. [Instala o verifica la integración de Oracle](#install-or-verify-the-oracle-integration).
1. [Confirma la configuración](#validate-the-setup).

### Crear el usuario de Datadog

Si ya tienes instalada la integración legacy de Oracle, omite este paso, porque el usuario ya existe.

Crea un inicio de sesión de sólo lectura para conectarte a tu servidor y concede los permisos necesarios:

{{< tabs >}}
{{% tab "Multiinquilino" %}}
```SQL
CREATE USER c##datadog IDENTIFIED BY &password CONTAINER = ALL ;

ALTER USER c##datadog SET CONTAINER_DATA=ALL CONTAINER=CURRENT;
```
{{% /tab %}}

{{% tab "No CDB" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}

{{% tab "Oracle 11" %}}
```SQL
CREATE USER datadog IDENTIFIED BY &password ;
```
{{% /tab %}}
{{< /tabs >}}

### Conceder al usuario acceso a la base de datos

Inicia sesión como `sysdba` y concede los siguientes permisos:

{{< tabs >}}

{{% tab "Multiinquilino" %}}
{{% dbm-oracle-multitenant-permissions-grant-sql %}}
{{% /tab %}}

{{% tab "No CDB" %}}
{{% dbm-oracle-non-cdb-permissions-grant-sql %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-11-permissions-grant-sql %}}
{{% /tab %}}

{{< /tabs >}}

### Guardar tu contraseña de forma segura
{{% dbm-secret %}}

### Crear una vista

Inicia sesión como `sysdba`, crea una nueva `view` en el esquema `sysdba` y concede acceso al usuario del Agent:

{{< tabs >}}

{{% tab "Multiinquilino" %}}
{{% dbm-multitenant-view-create-sql %}}
{{% /tab %}}

{{% tab "No CDB" %}}
{{% dbm-non-cdb-view-create-sql %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-11-view-create-sql %}}
{{% /tab %}}

{{< /tabs >}}

### Instalación del Agent

Para conocer los pasos de instalación, consulta las [instrucciones de instalación del Agent][1].

### Configurar el Agent

Crea el archivo de configuración de Oracle Agent `/etc/datadog-agent/conf.d/oracle.d/conf.yaml`. Para ver todas las opciones de configuración disponibles, consulta el [archivo de configuración de ejemplo][4].

**Nota:** El subdirectorio de configuración para las versiones del Agent entre `7.50.1` y `7.53.0` es `oracle-dbm.d`. Consulta [Configuración de la integración de Oracle en el Agent 7.50.1+][10] para obtener más detalles.

{{< tabs >}}
{{% tab "Multiinquilino" %}}
```yaml
init_config:
instances:
  - server: '<HOSTNAME_1>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
  - server: '<HOSTNAME_2>:<PORT>'
    service_name: "<CDB_SERVICE_NAME>" # The Oracle CDB service name
    username: 'c##datadog'
    password: 'ENC[datadog_user_database_password]'
    dbm: true
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
```

El Agent se conecta únicamente a la base de datos del contenedor (CBD) multiinquilino raíz. Consulta la información sobre la PDB mientras está conectado a la CDB raíz. No crees conexiones a PDB individuales.
{{% /tab %}}

{{% tab "No CDB" %}}
{{% dbm-oracle-selfhosted-config %}}
{{% /tab %}}

{{% tab "Oracle 11" %}}
{{% dbm-oracle-selfhosted-config %}}

{{% /tab %}}
{{< /tabs >}}

Una vez terminada la configuración del Agent, [reinicia el Datadog Agent][9].

### Validar la configuración

[Ejecuta el subcomando de estado del Agent][8] y busca `oracle` en la sección **Checks**. Visita la página [Dashboard][2] y [Bases de datos][3] de Datadog para empezar.

## Consultas personalizadas

La Monitorización de base de datos admite consultas personalizadas para bases de datos Oracle. Para obtener más información sobre las opciones de configuración disponibles, consulta [conf.yaml.example][4].

<div class="alert alert-danger">La ejecución de consultas personalizadas puede dar lugar a costes o cargos adicionales evaluados por Oracle.</div>

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[2]: https://app.datadoghq.com/dash/integration/30990/dbm-oracle-database-overview
[3]: https://app.datadoghq.com/databases
[4]: https://github.com/DataDog/datadog-agent/blob/main/cmd/agent/dist/conf.d/oracle.d/conf.yaml.example
[5]: /es/database_monitoring/data_collected/#sensitive-information
[6]: /es/database_monitoring/agent_integration_overhead/?tab=oracle
[7]: https://app.datadoghq.com/integrations/oracle
[8]: /es/agent/configuration/agent-commands/#agent-status-and-information
[9]: /es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: /es/integrations/guide/oracle-check-upgrade-7.50.1/

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}