---
description: Instale y configure Database Monitoring para SQL Server administrado
  en Azure.
further_reading:
- link: /integrations/sqlserver/
  tag: Documentación
  text: Integración básica de SQL Server
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentación
  text: Solución de problemas comunes
- link: /database_monitoring/guide/sql_deadlock/
  tag: Documentación
  text: Configure el monitoreo de interbloqueos
- link: /database_monitoring/guide/sql_extended_events/
  tag: Documentación
  text: Configure la recopilación de finalización de consultas y errores de consulta
- link: /database_monitoring/guide/parameterized_queries/
  tag: Documentación
  text: Captura de valores de parámetros de consultas SQL
title: Configuración de Database Monitoring para Azure SQL Server
---
El Database Monitoring proporciona una visibilidad profunda de sus bases de datos de Microsoft SQL Server al exponer métricas de consulta, muestras de consulta, planes de explicación, estados de la base de datos, conmutaciones por error y eventos.

Siga los siguientes pasos para habilitar Database Monitoring con su base de datos:

1. [Otorgue al Agent acceso a la base de datos](#grant-the-agent-access)
2. [Instale y configure el Agent](#install-and-configure-the-agent)
3. [Instale la integración de Azure](#install-the-azure-integration)

## Antes de comenzar {#before-you-begin}

Versiones de SQL Server compatibles
: 2014, 2016, 2017, 2019, 2022, 2025 (requiere Agent 7.79+)

{{% dbm-sqlserver-before-you-begin %}}

## Otorgue al Agent acceso {#grant-the-agent-access}

El Datadog Agent requiere acceso de solo lectura al servidor de base de datos para recopilar estadísticas y consultas.

{{< tabs >}}

{{% tab "Azure SQL Database" %}}

Cree un inicio de sesión de solo lectura para conectarse a su servidor y otorgue los [Roles de Azure SQL][1] requeridos:

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
ALTER SERVER ROLE ##MS_ServerStateReader## ADD MEMBER datadog;
ALTER SERVER ROLE ##MS_DefinitionReader## ADD MEMBER datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

Otorgue al Agent acceso a cada Azure SQL Database adicional en este servidor:

```SQL
CREATE USER datadog FOR LOGIN datadog;
```

**Nota:** También se admite la autenticación de identidad administrada de Microsoft Entra ID. Consulte [la guía][3] sobre cómo configurar esto para su instancia de Azure SQL DB.

Al configurar el Datadog Agent, especifique una instancia de comprobación para cada base de datos de aplicación ubicada en un servidor de Azure SQL DB determinado. No incluya `master` ni otras [bases de datos del sistema][2]. El Datadog Agent debe conectarse directamente a cada base de datos de aplicación en Azure SQL DB porque cada base de datos se ejecuta en un entorno de cómputo aislado. Esto también significa que `database_autodiscovery` no funciona para Azure SQL DB, por lo que no debe habilitarse.

**Nota:** Azure SQL Database implementa una base de datos en una red aislada; cada base de datos se trata como un host. Esto significa que si ejecuta Azure SQL Database en un grupo elástico, cada base de datos en el grupo se trata como un host.

```yaml
init_config:
instances:
  - host: '<SERVER_NAME>.database.windows.net,<PORT>'
    database: '<DATABASE_1>'
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: 'sql_database'
      fully_qualified_domain_name: '<SERVER_NAME>.database.windows.net'

  - host: '<SERVER_NAME>.database.windows.net,<PORT>'
    database: '<DATABASE_2>'
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'ODBC Driver 18 for SQL Server'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: 'sql_database'
      fully_qualified_domain_name: '<SERVER_NAME>.database.windows.net'
```

Consulte [Instalar el Agent](#install-the-agent) para obtener instrucciones más detalladas sobre cómo instalar y configurar el Datadog Agent.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/database/security-server-roles
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/databases/system-databases
[3]: /es/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Azure SQL Managed Instance" %}}

Cree un inicio de sesión de solo lectura para conectarse a su servidor y otorgue los permisos necesarios:

#### Para versiones de SQL Server 2014+ {#for-sql-server-versions-2014}

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- If not using either of Log Shipping Monitoring (available in Agent v7.50+) or
-- SQL Server Agent Monitoring (available in Agent v7.57+), comment out the next three lines:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

**Nota:** También se admite la autenticación de identidad administrada de Azure. Consulte [la guía][1] sobre cómo configurar esto para su instancia de Azure SQL DB.

[1]: /es/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "SQL Server en una VM de Windows Azure" %}}

Para [SQL Server en una VM de Windows Azure][1], siga la documentación de [Configuración de Database Monitoring para SQL Server autohospedado][2] para instalar el Datadog Agent directamente en el host VM de Windows Server.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview
[2]: /es/database_monitoring/setup_sql_server/selfhosted/
{{% /tab %}}

{{< /tabs >}}

### Almacene su contraseña de forma segura {#securely-store-your-password}
{{% dbm-secret %}}

## Instale y configure el Agent {#install-and-configure-the-agent}

Debido a que Azure no otorga acceso directo al host, el Datadog Agent debe instalarse en un host separado donde pueda comunicarse con el host de SQL Server. Existen varias opciones para instalar y ejecutar el Agent.

{{< tabs >}}
{{% tab "Host de Windows" %}}

Para comenzar a recopilar telemetría de SQL Server, primero [instale el Datadog Agent][1].

Cree el archivo de configuración del SQL Server Agent `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`. Consulte el [archivo de configuración de ejemplo][2] para ver todas las opciones de configuración disponibles.

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
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_INSTANCE_ENDPOINT>'
```

Consulte la [especificación de integración de SQL Server][3] para obtener información adicional sobre cómo configurar los campos `deployment_type` y `fully_qualified_domain_name`.

Para usar [Autenticación de Windows][4], configure `connection_string: "Trusted_Connection=yes"` y omita los campos `username` y `password`.

Use las etiquetas `service` y `env` para vincular la telemetría de su base de datos con otra telemetría a través de un esquema de etiquetado común. Consulte [Unified Service Tagging][5] sobre cómo se usan estas etiquetas en Datadog.

### Controladores compatibles {#supported-drivers}

#### Microsoft ADO {#microsoft-ado}

El proveedor [ADO][6] recomendado es [Microsoft OLE DB Driver][7]. Asegúrese de que el controlador esté instalado en el host donde se ejecuta el Agent.

```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # Replace with MSOLEDBSQL for versions 18 and lower
```

Los otros dos proveedores, `SQLOLEDB` y `SQLNCLI`, son considerados obsoletos por Microsoft y ya no deben usarse.

#### ODBC {#odbc}

El controlador ODBC recomendado es [Microsoft ODBC Driver][8]. A partir del Agent 7.51, el controlador ODBC 18 para SQL Server se incluye en el Agent para Linux. Para Windows, asegúrese de que el controlador esté instalado en el host donde se ejecuta el Agent.

```yaml
connector: odbc
driver: 'ODBC Driver 18 for SQL Server'
```

Una vez completada toda la configuración del Datadog Agent, [reinicie el Datadog Agent][9].

### Valide {#validate}

[Ejecute el subcomando de estado del Agent][10] y busque `sqlserver` en la sección **Checks**. Navegue a la página [Databases][11] en Datadog para comenzar.


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
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
Para comenzar a recopilar telemetría de SQL Server, primero [instale el Datadog Agent][1].

En Linux, el Datadog Agent requiere además que se instale un controlador ODBC de SQL Server; por ejemplo, el [Microsoft ODBC driver][2]. Una vez instalado el servidor SQL ODBC, copie los archivos `odbc.ini` y `odbcinst.ini` en la carpeta `/opt/datadog-agent/embedded/etc`.

Utilice el conector `odbc` y especifique el controlador adecuado como se indica en el archivo `odbcinst.ini`.

Cree el archivo de configuración del SQL Server Agent `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml`. Consulte el [archivo de configuración de ejemplo][3] para ver todas las opciones de configuración disponibles.

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
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
```

Consulte la [especificación de integración de SQL Server][4] para obtener información adicional sobre cómo configurar los campos `deployment_type` y `fully_qualified_domain_name`.

Utilice las etiquetas `service` y `env` para vincular la telemetría de su base de datos a otra telemetría a través de un esquema de etiquetado común. Consulte [Unified Service Tagging][5] sobre cómo se usan estas etiquetas en Datadog.

Una vez completada toda la configuración del Datadog Agent, [reinicie el Datadog Agent][6].

### Valide {#validate-1}

[Ejecute el subcomando de estado del Agent][7] y busque `sqlserver` en la sección **Checks**. Navegue a la página [Databases][8] en Datadog para comenzar.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[5]: /es/getting_started/tagging/unified_service_tagging
[6]: /es/agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[7]: /es/agent/configuration/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Docker" %}}
Para configurar el Database Monitoring Agent que se ejecuta en un container Docker, establezca las [Autodiscovery Integration Templates][1] como etiquetas de Docker en su contenedor del Agent.

**Nota**: El Agent debe tener permiso de lectura en el socket de Docker para que Autodiscovery de etiquetas funcione.

Reemplace los valores para que coincidan con su cuenta y entorno. Consulte el [archivo de configuración de ejemplo][2] para ver todas las opciones de configuración disponibles.

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
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "fully_qualified_domain_name": "<AZURE_ENDPOINT_ADDRESS>"
    }
  }]' \
  registry.datadoghq.com/agent:${DD_AGENT_VERSION}
```

Consulte la [especificación de integración de SQL Server][3] para obtener información adicional sobre cómo configurar los campos `deployment_type` y `fully_qualified_domain_name`.

Utilice las etiquetas `service` y `env` para vincular la telemetría de su base de datos a otra telemetría a través de un esquema de etiquetado común. Consulte [unified service tagging][4] sobre cómo se utilizan estas etiquetas en todo Datadog.

### Valide {#validate-2}

[Ejecute el subcomando de estado del Agent][5] y busque `sqlserver` en la sección **Checks**. Alternativamente, navegue a la página [Databases][6] en Datadog para comenzar.


[1]: /es/agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[4]: /es/getting_started/tagging/unified_service_tagging
[5]: /es/agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Kubernetes" %}}
Si está ejecutando un clúster de Kubernetes, utilice el [Datadog Cluster Agent][1] para habilitar Database Monitoring. Si las comprobaciones de clúster aún no están habilitadas, [siga estas instrucciones][2] para habilitarlas antes de continuar.

### Operador {#operator}

Siga los pasos a continuación para configurar la integración de SQL Server, utilizando las [instrucciones del Operador en Kubernetes e Integrations][6] como referencia.

1. Cree o actualice el archivo `datadog-agent.yaml` con la siguiente configuración:

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
                cluster_check: true # Make sure to include this flag
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
                  # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
                  azure:
                    deployment_type: '<DEPLOYMENT_TYPE>'
                    fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
    ```

2. Aplique los cambios al Datadog Operator utilizando el siguiente comando:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm {#helm}

Complete los siguientes pasos para instalar el [Datadog Cluster Agent][1] en su clúster de Kubernetes. Reemplace los valores para que coincidan con su cuenta y entorno.

1. Complete las [instrucciones de instalación del Datadog Agent][3] para Helm.
2. Actualice su archivo de configuración YAML (`datadog-values.yaml` en las instrucciones de instalación del Cluster Agent) para incluir lo siguiente:
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
            # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
            azure:
              deployment_type: '<DEPLOYMENT_TYPE>'
              fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'

    clusterChecksRunner:
      enabled: true
    ```

3. Implemente el Agent con el archivo de configuración anterior desde la línea de comandos:
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
Para Windows, añada <code>--set targetSystem=windows</code> al <code>helm install</code> comando.
</div>

### Configure con archivos montados {#configure-with-mounted-files}

Para configurar una comprobación de clúster con un archivo de configuración montado, monte el archivo de configuración en el container del Cluster Agent en la ruta: `/conf.d/sqlserver.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
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
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
```

### Configure con anotaciones de servicio de Kubernetes {#configure-with-kubernetes-service-annotations}

En lugar de montar un archivo, puede declarar la configuración de la instancia como un Servicio de Kubernetes. Para configurar esta comprobación para un Agent que se ejecuta en Kubernetes, cree un servicio utilizando la siguiente sintaxis:

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
          "azure": {
            "deployment_type": "<DEPLOYMENT_TYPE>",
            "fully_qualified_domain_name": "<AZURE_ENDPOINT_ADDRESS>"
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

Consulte la [especificación de integración de SQL Server][4] para obtener información adicional sobre cómo configurar los campos `deployment_type` y `fully_qualified_domain_name`.

El Cluster Agent registra automáticamente esta configuración y comienza a ejecutar la comprobación de SQL Server.

Para evitar exponer la contraseña del usuario `datadog` en texto plano, utilice el [paquete de gestión de secretos][5] del Agent y declare la contraseña utilizando la sintaxis `ENC[]`.


[1]: /es/agent/cluster_agent
[2]: /es/agent/cluster_agent/clusterchecks/
[3]: /es/containers/kubernetes/installation/?tab=helm#installation
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L797-L841
[5]: /es/agent/configuration/secrets-management
[6]: /es/containers/kubernetes/integrations/?tab=datadogoperator
{{% /tab %}}
{{< /tabs >}}

## Ejemplos de configuraciones del Agent {#example-agent-configurations}
{{% dbm-sqlserver-agent-config-examples %}}

## Instale la integración de Azure {#install-the-azure-integration}

Para recopilar métricas y registros de base de datos más completos de Azure, instale la [integración de Azure][1].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/azure