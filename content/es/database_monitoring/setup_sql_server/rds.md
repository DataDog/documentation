---
description: Instale y configure Database Monitoring para SQL Server administrado
  en RDS.
further_reading:
- link: /integrations/sqlserver/
  tag: Documentación
  text: Integración básica de SQL Server
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentación
  text: Solucionar problemas comunes
- link: /database_monitoring/guide/sql_deadlock/
  tag: Documentación
  text: Configurar el Monitoreo de Interbloqueos
- link: /database_monitoring/guide/sql_extended_events/
  tag: Documentación
  text: Configurar la recopilación de finalización de consultas y errores de consultas
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentación
  text: Capturando valores de parámetros de consultas SQL
title: Configurando Database Monitoring para SQL Server en Amazon RDS
---
Database Monitoring proporciona una visibilidad profunda de sus bases de datos de Microsoft SQL Server al exponer métricas de consultas, muestras de consultas, planes de explicación, estados de bases de datos, conmutaciones por error y eventos.

Realice los siguientes pasos para habilitar Database Monitoring con su base de datos:

1. [Configure la integración de AWS](#configure-the-aws-integration)
1. [Otorgue acceso al Agente](#grant-the-agent-access)
1. [Instale el Agente](#install-the-agent)
1. [Instale la integración de RDS](#install-the-rds-integration)

## Antes de comenzar {#before-you-begin}

Versiones de SQL Server soportadas
: 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## Configure la integración de AWS {#configure-the-aws-integration}

Habilite {{< ui >}}Standard Collection{{< /ui >}} en la sección {{< ui >}}Resource Collection{{< /ui >}} de su [tile de integración de Amazon Web Services][2].

## Otorgue acceso al Agente {#grant-the-agent-access}

El Agente de Datadog requiere acceso de solo lectura al servidor de base de datos para recopilar estadísticas y consultas.

Cree un inicio de sesión de solo lectura para conectarse a su servidor y otorgue los permisos requeridos:

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

Cree el usuario `datadog` en cada base de datos de aplicación adicional:

```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```

Esto es necesario porque RDS no permite otorgar `CONNECT ANY DATABASE`. El Agente de Datadog necesita conectarse a cada base de datos para recopilar estadísticas de I/O de archivos específicas de la base de datos.

### Almacene su contraseña de manera segura {#securely-store-your-password}
{{% dbm-secret %}}

## Instale el Agente {#install-the-agent}

Debido a que AWS no otorga acceso directo al host, el Agente de Datadog debe instalarse en un host separado donde pueda comunicarse con el host de SQL Server. Hay varias opciones para instalar y ejecutar el Agente.

{{< tabs >}}
{{% tab "Host de Windows" %}}
{{% dbm-alwayson-cloud-hosted %}}

Para comenzar a recopilar telemetría de SQL Server, [instale el Agente de Datadog][1], luego cree el archivo de configuración del Agente de SQL Server en `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`. Consulte el [archivo de configuración de muestra][2] para todas las opciones de configuración disponibles.

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

Para usar [Autenticación de Windows][4], configure `connection_string: "Trusted_Connection=yes"` y omita los campos `username` y `password`.

Utilice las etiquetas `service` y `env` para vincular su telemetría de base de datos a otra telemetría a través de un esquema de etiquetado común. Consulte [Etiquetado de Servicio Unificado][5] para obtener detalles sobre cómo se utilizan estas etiquetas en Datadog.

### Controladores compatibles {#supported-drivers}

#### Microsoft ADO {#microsoft-ado}

El proveedor [ADO][6] recomendado es [Microsoft OLE DB Driver][7]. Asegúrese de que el controlador esté instalado en el host donde se está ejecutando el Agente.

```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # Replace with MSOLEDBSQL for versions 18 and lower
```

Los otros dos proveedores, `SQLOLEDB` y `SQLNCLI`, son considerados obsoletos por Microsoft y no deben ser utilizados.

#### ODBC {#odbc}

El controlador ODBC recomendado es [Microsoft ODBC Driver][8]. A partir de la versión 7.51 del Agente, el ODBC Driver 18 para SQL Server se incluye por defecto en el Agente de Linux. Para Windows, asegúrese de que el controlador esté instalado en el host donde se está ejecutando el Agente.

```yaml
connector: odbc
driver: 'ODBC Driver 18 for SQL Server'
```

Una vez que toda la configuración del Agente esté completa, [reinicie el Agente de Datadog][9].

### Validar {#validate}

[Ejecute el subcomando de estado del Agente][10] y busque `sqlserver` en la sección **Checks**. Navegue a la página de [Bases de datos][11] en Datadog para comenzar.

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

{{% tab "Host de Linux" %}}
{{% dbm-alwayson-cloud-hosted %}}

Para comenzar a recopilar telemetría de SQL Server, primero [instale el Agente de Datadog][1].

En Linux, también debe instalar un controlador ODBC para SQL Server, como el [Microsoft ODBC driver][2]. Después de la instalación, copie los archivos `odbc.ini` y `odbcinst.ini` en la carpeta `/opt/datadog-agent/embedded/etc`.

Utilice el conector `odbc` y especifique el controlador adecuado como se indica en el archivo `odbcinst.ini`.

Cree el archivo de configuración del Agente de SQL Server `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml`. Consulte el [archivo de configuración de muestra][3] para todas las opciones de configuración disponibles.

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

Utilice las etiquetas `service` y `env` para vincular la telemetría de su base de datos a otra telemetría a través de un esquema de etiquetado común. Consulte [Etiquetado de Servicio Unificado][5] para obtener detalles sobre cómo se utilizan estas etiquetas en Datadog.

Una vez que toda la configuración del Agente esté completa, [reinicia el Agente de Datadog][6].

### Valida {#validate-1}

[Ejecuta el subcomando de estado del Agente][7] y busca `sqlserver` en la sección **Checks**. Navegue a la página de [Bases de datos][8] en Datadog para comenzar.

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

Para configurar el Agente de Monitoreo de Bases de Datos que se ejecuta en un contenedor Docker, establece las [Plantillas de Integración de Autodescubrimiento][1] como etiquetas Docker en tu contenedor de Agente.

**Nota**: El Agente debe tener permiso de lectura en el socket de Docker para que Autodiscovery de etiquetas funcione.

Reemplaza los valores para que coincidan con tu cuenta y entorno. Consulta el [archivo de configuración de muestra][2] para todas las opciones de configuración disponibles.

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
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

Utiliza las etiquetas `service` y `env` para vincular la telemetría de tu base de datos a otra telemetría a través de un esquema de etiquetado común. Consulta [Etiquetado de Servicio Unificado][4] sobre cómo se utilizan estas etiquetas en Datadog.

### Valida {#validate-2}

[Ejecuta el subcomando de estado del Agente][5] y busca `sqlserver` en la sección **Checks**. Alternativamente, navega a la página de [Bases de Datos][6] en Datadog para comenzar.

[1]: /es/agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[4]: /es/getting_started/tagging/unified_service_tagging
[5]: /es/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}

{{% tab "Kubernetes" %}}
{{% dbm-alwayson-cloud-hosted %}}

Si estás ejecutando un clúster de Kubernetes, utiliza el [Datadog Cluster Agent][1] para habilitar Database Monitoring. Si las verificaciones del clúster no están habilitadas, [sigue estas instrucciones][2] para habilitarlas antes de continuar.

### Operador {#operator}

Sigue los pasos a continuación para configurar la integración de SQL Server, utilizando las [instrucciones del Operador en Kubernetes e Integraciones][6] como referencia.

1. Crea o actualiza el archivo `datadog-agent.yaml` con la siguiente configuración:

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

2. Aplica los cambios al Operador de Datadog utilizando el siguiente comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

Completa los siguientes pasos para instalar el [Agente de Clúster de Datadog][1] en tu clúster de Kubernetes. Reemplaza los valores para que coincidan con tu cuenta y entorno.

1. Completa las [instrucciones de instalación del Agente de Datadog][3] para Helm.
2. Actualiza tu archivo de configuración YAML (`datadog-values.yaml` en las instrucciones de instalación del Agente de Clúster) para incluir lo siguiente:
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

3. Despliega el Agente con el archivo de configuración anterior desde la línea de comandos:
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Para Windows, añade <code>--set targetSystem=windows</code> al <code>helm install</code> comando.
</div>

### Configura con archivos montados {#configure-with-mounted-files}

Para configurar una verificación de clúster con un archivo de configuración montado, monta el archivo de configuración en el contenedor del Agente de Clúster en la ruta: `/conf.d/sqlserver.yaml`:

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

### Configura con anotaciones de servicio de Kubernetes {#configure-with-kubernetes-service-annotations}

En lugar de montar un archivo, puedes declarar la configuración de la instancia como un Servicio de Kubernetes. Para configurar esta verificación para un Agente que se ejecute en Kubernetes, crea un servicio utilizando la siguiente sintaxis:

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

Consulta la [especificación de integración de SQL Server][4] para obtener información adicional sobre la configuración de los campos `deployment_type` y `name`.

El Cluster Agent registra automáticamente esta configuración y comienza a ejecutar la verificación de SQL Server.

Para evitar exponer la contraseña del usuario `datadog` en texto plano, utilice el [paquete de gestión de secretos][5] del Agent y declare la contraseña utilizando la sintaxis `ENC[]`.


[1]: /es/agent/cluster_agent
[2]: /es/agent/cluster_agent/clusterchecks/
[3]: /es/containers/kubernetes/installation/?tab=helm#installation
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /es/agent/configuration/secrets-management
[6]: /es/containers/kubernetes/integrations/?tab=datadogoperator

{{% /tab %}}

{{< /tabs >}}

## Ejemplos de Configuraciones de Agent {#example-agent-configurations}
{{% dbm-sqlserver-agent-config-examples %}}

## Instale la integración de RDS {#install-the-rds-integration}

Para recopilar métricas y registros de base de datos más completos de AWS, instale la [integración de RDS][1].

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/amazon_rds
[2]: https://app.datadoghq.com/integrations/amazon-web-services