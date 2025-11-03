---
description: Instala y configura Database Monitoring para SQL Server en Amazon RDS.
further_reading:
- link: /integrations/sqlserver/
  tag: Documentación
  text: Integración SQL Server básica
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentación
  text: Solución de problemas comunes
- link: /database_monitoring/guide/sql_deadlock/
  tag: Documentación
  text: Configurar la monitorización de interbloqueos
- link: /database_monitoring/guide/sql_extended_events/
  tag: Documentación
  text: Configurar la finalización de consultas y la recopilación de errores de consulta
title: Configuración de Database Monitoring para SQL Server en Amazon RDS
---

Database Monitoring te proporciona una amplia visibilidad de tus bases de datos Microsoft SQL Server mediante la exposición de métricas de consultas, muestras de consultas, explain-plans, estados de bases de datos, conmutaciones por error y eventos.

Sigue los siguientes pasos para habilitar Database Monitoring con tu base de datos:

1. [Configura la integración AWS](#configure-the-aws-integration).
1. [Concede acceso al Agent](#grant-the-agent-access).
1. [Instala el Agent](#install-the-agent).
1. [Instala la integración RDS](#install-the-rds-integration).

## Antes de empezar

Versiones de SQL Server compatibles
: 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## Configuración de la integración AWS

Habilita la **Recopilación estándar** en la sección **Recopilación de recursos** de tu [cuadro de integración de Amazon Web Services][2].

## Conceder acceso al Agent

El Datadog Agent requiere acceso de sólo lectura al servidor de la base de datos para recopilar estadísticas y consultas.

Crea un inicio de sesión de solo lectura para conectarte a tu servidor y conceder los permisos necesarios:

```SQL
USE [master];
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
GO
--Set context to msdb database and create datadog user
USE [msdb];
CREATE USER datadog FOR LOGIN datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+), comment out the next line:
GRANT SELECT ON dbo.log_shipping_monitor_primary to datadog;
GRANT SELECT ON dbo.log_shipping_monitor_secondary to datadog;
-- If not using SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
GRANT SELECT ON dbo.sysjobs to datadog;
GRANT SELECT ON dbo.sysjobhistory TO datadog;
GRANT SELECT ON dbo.sysjobactivity to datadog;
GO
--Switch back to master and grant datadog user server permissions
USE [master];
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
GO
```

Crea el usuario `datadog` en cada base de datos de aplicaciones adicional:
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```

Esto es necesario porque RDS no permite conceder el permiso `CONNECT ANY DATABASE`. El Datadog Agent necesita conectarse a cada base de datos para recopilar estadísticas de E/S de archivos específicas de la base de datos.

### Guarda tu contraseña de forma segura
{{% dbm-secret %}}

## Instalar el Agent

Dado que AWS no permite el acceso directo al host, el Datadog Agent debe instalarse en un host distinto donde pueda comunicarse con el host de SQL Server. Existen varias opciones para instalar y ejecutar el Agent.

{{< tabs >}}
{{% tab "Windows Host" %}}
{{% dbm-alwayson-cloud-hosted %}}

Para empezar a recopilar telemetría de SQL Server, [instala el Datadog Agent][1] y, a continuación, crea el archivo de configuración del Agent para SQL Server en `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`. Para ver todas las opciones de configuración disponibles, consulta el [archivo de configuración de ejemplo][2].

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<PORT>'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
    aws:
      instance_endpoint: '<INSTANCE_ENDPOINT>'
```

Para utilizar la [autenticación de Windows][4], configura `connection_string: "Trusted_Connection=yes"` y omite los campos `username` y `password`.

Utiliza las etiquetas (tags) `service` y `env` para vincular la telemetría de tu base de datos con otras telemetrías mediante un esquema de etiquetado común. Para ver más detalles sobre cómo se utilizan estas etiquetas en Datadog, consulta [Etiquetado unificado de servicios][5].

### Controladores compatibles

#### Microsoft ADO

El proveedor [ADO][6] recomendado es [Microsoft OLE DB Driver][7]. Asegúrate de que el controlador está instalado en el host donde se ejecuta el Agent.
```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # Replace with MSOLEDBSQL for versions 18 and lower
```

Los otros dos proveedores, `SQLOLEDB` y `SQLNCLI`, están considerados obsoletos por Microsoft y ya no deben utilizarse.

#### ODBC

El controlador ODBC recomendado es [Microsoft ODBC Driver][8]. A partir del Agent v7.51, ODBC Driver 18 para SQL Server se incluye por defecto en el Agent Linux. Para Windows, asegúrate de que el controlador está instalado en el host donde se ejecuta el Agent.

```yaml
connector: odbc
driver: 'ODBC Driver 18 for SQL Server'
```

Una vez terminada la configuración del Agent, [reinicia el Datadog Agent][9].

### Validación

[Ejecuta el subcomando de estado del Agent][10] y busca `sqlserver` en la sección **Checks** o visita la página [Bases de datos][11] de Datadog para empezar.

[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[4]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[7]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[8]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[9]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /es/agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
{{% /tab %}}

{{% tab "Linux Host" %}}
{{% dbm-alwayson-cloud-hosted %}}

Para empezar a recopilar telemetría de SQL Server, primero [instala el Datadog Agent][1].

En Linux, también debes instalar un controlador ODBC SQL Server, como [Microsoft ODBC Driver][2]. Luego de la instalación, copia los archivos `odbc.ini` y `odbcinst.ini` en la carpeta `/opt/datadog-agent/embedded/etc`.

Utiliza el conector `odbc` y especifica el controlador adecuado, como se indica en el archivo `odbcinst.ini`.

Crea el archivo de configuración de SQL Server Agent `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml`. Para ver todas las opciones de configuración disponibles, consulta el [archivo de configuración de ejemplo][3].

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<PORT>'
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: odbc
    driver: '<Driver from the `odbcinst.ini` file>'
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
    aws:
      instance_endpoint: '<INSTANCE_ENDPOINT>'
```

Utiliza las etiquetas (tags) `service` y `env` para vincular la telemetría de tu base de datos con otras telemetrías mediante un esquema de etiquetado común. Para ver más detalles sobre cómo se utilizan estas etiquetas en Datadog, consulta [Etiquetado unificado de servicios][5].

Una vez completada la configuración del Agent, [reinicia el Datadog Agent][6].

### Validación

[Ejecuta el subcomando de estado del Agent][7] y busca `sqlserver` en la sección **Checks**. Ve a la página [Bases de datos][8] en Datadog para empezar.

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[7]: /es/agent/configuration/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
{{% /tab %}}

{{% tab "Docker" %}}
{{% dbm-alwayson-cloud-hosted %}}

Para configurar el Agent de Database Monitoring que se ejecuta en un contenedor de Docker, puedes configurar las [plantillas de la integración Autodiscovery][1] como etiquetas (labels) de Docker en tu contenedor del Agent.

**Nota**: El Agent debe tener permiso de lectura en el socket Docker para que las etiquetas (labels) de Autodiscovery funcionen.

Sustituye los valores para que coincidan con tu cuenta y tu entorno. Para ver todas las opciones de configuración disponibles, consulta el [archivo de configuración de ejemplo][2].

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["sqlserver"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<HOSTNAME>,<PORT>",
    "connector": "odbc",
    "driver": "ODBC Driver 18 for SQL Server",
    "username": "datadog",
    "password": "<PASSWORD>",
    "tags": [
      "service:<CUSTOM_SERVICE>"
      "env:<CUSTOM_ENV>"
    ],
    "aws": {
      "instance_endpoint": "<INSTANCE_ENDPOINT>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

Utiliza las etiquetas (tags) `service` y `env` para vincular la telemetría de tu base de datos a otras telemetrías mediante un esquema de etiquetado común. Para saber cómo se utilizan estas etiquetas en Datadog, consulta [Etiquetado unificado de servicios][4].

### Validación

[Ejecuta el subcomando de estado del Agent][5] y busca `sqlserver` en la sección **Checks** o visita la página [Bases de datos][6] de Datadog para empezar.

[1]: /es/agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[4]: /es/getting_started/tagging/unified_service_tagging
[5]: /es/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}

{{% tab "Kubernetes" %}}
{{% dbm-alwayson-cloud-hosted %}}

Si estás ejecutando un clúster de Kubernetes, utiliza el [Datadog Cluster Agent][1] para habilitar Database Monitoring. Si los checks de clúster aún no están habilitados, [sigue estas instrucciones][2] para habilitarlos antes de continuar.

### Operador

Sigue los pasos que se indican a continuación para configurar la integración SQL Server, utilizando como referencia las [instrucciones del Operator en Kubernetes e integraciones][6].

1. Crea o actualiza el archivo `Datadog-Agent.yaml` con la siguiente configuración:

    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      global:
        clusterName: <CLUSTER_NAME>
        site: <DD_SITE>
        credentials:
          apiSecret:
            secretName: datadog-agent-secret
            keyName: api-key

      features:
        clusterChecks:
          enabled: true

      override:
        nodeAgent:
          image:
            name: agent
            tag: <AGENT_VERSION>

        clusterAgent:
          extraConfd:
            configDataMap:
              sqlserver.yaml: |-
                cluster_check: true # Required for cluster checks
                init_config:
                instances:
                - host: <HOSTNAME>,<PORT>
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  connector: 'odbc'
                  driver: 'ODBC Driver 18 for SQL Server'
                  dbm: true
                  # Optional: For additional tags
                  tags:
                    - 'service:<CUSTOM_SERVICE>'
                    - 'env:<CUSTOM_ENV>'
                  # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
                  aws:
                    instance_endpoint: <INSTANCE_ENDPOINT>
    ```

2. Aplica los cambios al Datadog Operator con el siguiente comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm

Realiza los siguientes pasos para instalar el [Datadog Cluster Agent][1] en tu clúster Kubernetes. Sustituye los valores para que coincidan con tu cuenta y tu entorno.

1. Sigue las [instrucciones de instalación del Datadog Agent][3] para Helm.
2. Actualiza tu archivo de configuración YAML (`datadog-values.yaml` en las instrucciones de instalación del Cluster Agent) para incluir lo siguiente:
    ```yaml
    clusterAgent:
      confd:
        sqlserver.yaml: |-
          cluster_check: true # Required for cluster checks
          init_config:
          instances:
          - dbm: true
            host: <HOSTNAME>,<PORT>
            username: datadog
            password: 'ENC[datadog_user_database_password]'
            connector: 'odbc'
            driver: 'ODBC Driver 18 for SQL Server'
            # Optional: For additional tags
            tags:
              - 'service:<CUSTOM_SERVICE>'
              - 'env:<CUSTOM_ENV>'
            # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
            aws:
              instance_endpoint: <INSTANCE_ENDPOINT>

    clusterChecksRunner:
      enabled: true
    ```

3. Despliega el Agent con el archivo de configuración anterior desde la línea de comandos:
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Para Windows, adjunta <code>--set targetSystem=windows</code> al comando de <code>instalación de Helm</code>.
</div>

### Configuración con archivos integrados

Para configurar un check de clúster con un archivo de configuración montado, monta el archivo de configuración del contenedor del Cluster Agent en la ruta: `/conf.d/sqlserver.yaml`:

```yaml
cluster_check: true  # Required for cluster checks
init_config:
instances:
  - dbm: true
    host: <HOSTNAME>,<PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    # Optional: For additional tags
    tags:
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your instance endpoint, configure the Datadog AWS integration to pull additional cloud data such as CPU, Memory, etc.
    aws:
      instance_endpoint: <INSTANCE_ENDPOINT>
```

### Configuración con anotaciones de servicios de Kubernetes

En lugar de montar un archivo, puedes declarar la configuración de la instancia como servicio Kubernetes. Para configurar este check para un Agent que se ejecuta en Kubernetes, crea un servicio con la siguiente sintaxis:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: sqlserver-datadog-check-instances
  annotations:
    ad.datadoghq.com/service.check_names: '["sqlserver"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<HOSTNAME>,<PORT>",
          "username": "datadog",
          "password": "ENC[datadog_user_database_password]",
          "connector": "odbc",
          "driver": "ODBC Driver 18 for SQL Server",
          "tags": ["service:<CUSTOM_SERVICE>", "env:<CUSTOM_ENV>"],
          "aws": {
            "instance_endpoint": "<INSTANCE_ENDPOINT>"
          }
        }
      ]
spec:
  ports:
  - port: 1433
    protocol: TCP
    targetPort: 1433
    name: sqlserver
```

Para obtener información adicional sobre la configuración de los campos `deployment_type` y `name`, consulta las [especificaciones para la integración SQL Server][4].

El Cluster Agent registra automáticamente esta configuración y comienza a ejecutar el check de SQL Server.

Para evitar exponer la contraseña del usuario `datadog` en texto simple, utiliza el [paquete de gestión de secretos][5] del Agent y declara la contraseña utilizando la sintaxis `ENC[]`.


[1]: /es/agent/cluster_agent
[2]: /es/agent/cluster_agent/clusterchecks/
[3]: /es/containers/kubernetes/installation/?tab=helm#installation
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /es/agent/configuration/secrets-management
[6]: /es/containers/kubernetes/integrations/?tab=datadogoperator

{{% /tab %}}

{{< /tabs >}}

## Configuraciones del Agent de ejemplo
{{% dbm-sqlserver-agent-config-examples %}}

## Instalar la integración RDS

Para recopilar métricas de base de datos y logs más completos de AWS, instala la [integración RDS][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/amazon_rds
[2]: https://app.datadoghq.com/integrations/amazon-web-services