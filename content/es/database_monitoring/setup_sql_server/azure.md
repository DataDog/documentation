---
description: Instala y configura Database Monitoring para Azure SQL Server.
further_reading:
- link: /integrations/sqlserver/
  tag: Documentación
  text: Integración SQL Server básica
- link: /database_monitoring/troubleshooting/?tab=sqlserver
  tag: Documentación
  text: Solución de problemas comunes
- link: /database_monitoring/guide/sql_deadlock/
  tag: Documentación
  text: Configurar Deadlock Monitoring
- link: /database_monitoring/guide/sql_extended_events/
  tag: Documentación
  text: Configurar la finalización de consultas y la recopilación de errores de consulta
title: Configuración de Database Monitoring para Azure SQL Server
---

Database Monitoring te proporciona una amplia visibilidad de tus bases de datos Microsoft SQL Server mediante la exposición de métricas de consultas, muestras de consultas, explain-plans, estados de bases de datos, conmutaciones por error y eventos.

Sigue los siguientes pasos para habilitar Database Monitoring con tu base de datos:

1. [Concede al Agent acceso a la base de datos](#grant-the-agent-access).
2. [Instala y configura el Agent](#install-and-configure-the-agent).
3. [Instala la integración Azure](#install-the-azure-integration).

## Antes de empezar

Versiones de SQL Server compatibles
: 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## Conceder acceso al Agent

El Datadog Agent requiere acceso de sólo lectura al servidor de la base de datos para recopilar estadísticas y consultas.

{{< tabs >}}

{{% tab "Azure SQL Database" %}}

Crea un inicio de sesión de sólo lectura para conectarte a tu servidor y concede los permisos necesarios: [Roles Azure SQL][1]:
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

Concede al Agent acceso a cada Azure SQL Database adicional en este servidor:

```SQL
CREATE USER datadog FOR LOGIN datadog;
```

**Nota:** También se admite la autenticación de identidad gestionada por Microsoft Entra ID. Para saber cómo configurarla en tu instancia Azure SQL DB, consulta [la guía][3].

Al configurar el Datadog Agent, especifica una instancia de check para cada base de datos de aplicaciones ubicada en un servidor Azure SQL DB determinado. No incluyas `master` ni otras [bases de datos del sistema][2]. El Datadog Agent debe conectarse directamente a cada base de datos de aplicaciones en Azure SQL DB, ya que cada base de datos se ejecuta en un entorno de computación aislado. Esto también significa que `database_autodiscovery` no funciona para Azure SQL DB, por lo que no debe habilitarse.

**Nota:** Azure SQL Database despliega una base de datos en un red aislada. Cada base de datos se trata como un único host. Esto significa que si ejecutas Azure SQL Database en un pool elástico, cada base de datos del pool se trata como una host independiente.

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

Para obtener instrucciones más detalladas sobre cómo instalar y configurar el Datadog Agent, consulta [Instalar el Agent](#install-the-agent).

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/database/security-server-roles
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/databases/system-databases
[3]: /es/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Instancia gestionada por Azure SQL" %}}

Crea un inicio de sesión de solo lectura para conectarte a tu servidor y conceder los permisos necesarios:

#### Para las versiones 2014 o posteriores de SQL Server

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT CONNECT ANY DATABASE to datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;
-- Si no utilizas Log Shipping Monitoring (disponible en el Agent v7.50+) o
-- SQL Server Agent Monitoring (disponible en el Agent v7.57+), comenta las siguiente tres líneas:
USE msdb;
CREATE USER datadog FOR LOGIN datadog;
GRANT SELECT to datadog;
```

**Nota:** También se admite la autenticación de identidad gestionada por Azure. Para saber cómo configurarla en tu instancia Azure SQL DB, consulta [la guía][1].

[1]: /es/database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "SQL Server en máquinas virtuales Windows Azure" %}}

Para [SQL Server en máquinas virtuales Windows Azure][1], sigue la documentación [Configuración de Database Monitoring para SQL Server autoalojado][2] para instalar el Datadog Agent directamente en la máquina virtual del host Windows Server.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview
[2]: /es/database_monitoring/setup_sql_server/selfhosted/
{{% /tab %}}

{{< /tabs >}}

### Guarda tu contraseña de forma segura
{{% dbm-secret %}}

## Instala y configura el Agent

Dado que AWS no permite el acceso directo al host, el Datadog Agent debe instalarse en un host distinto donde pueda comunicarse con el host de SQL Server. Existen varias opciones para instalar y ejecutar el Agent.

{{< tabs >}}
{{% tab "Host Windows" %}}

Para empezar a recopilar telemetría de SQL Server, primero [instala el Datadog Agent][1].

Crea el archivo de configuración de SQL Server Agent `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`. Para ver todas las opciones de configuración disponibles, consulta el [archivo de configuración de ejemplo][2].

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

Para obtener información adicional sobre la configuración de los campos `deployment_type` y `name`, consulta las [especificaciones para la integración SQL Server][3].

Para utilizar la [autenticación de Windows][4], configura `connection_string: "Trusted_Connection=yes"` y omite los campos `username` y `password`.

Utiliza las etiquetas (tags) `service` y `env` para vincular la telemetría de tu base de datos a otras telemetrías mediante un esquema común de etiquetado. Consulta [Etiquetado de servicio unificado][5] sobre cómo se utilizan estas etiquetas (tags) a lo largo de Datadog.

### Controladores compatibles

#### Microsoft ADO

El proveedor [ADO][6] recomendado es el [controlador de Microsoft OLE DB][7]. Asegúrate de que el controlador está instalado en el host donde se ejecuta el Agent.
```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # Replace with MSOLEDBSQL for versions 18 and lower
```

Los otros dos proveedores, `SQLOLEDB` y `SQLNCLI`, están considerados obsoletos por Microsoft y ya no deben utilizarse.

#### ODBC

El controlador ODBC recomendado es [Microsoft ODBC][8]. A partir del Agent v7.51, el controlador ODBC 18 para SQL Server se incluye en el Agent para Linux. Para Windows, asegúrate de que el controlador está instalado en el host donde se ejecuta el Agent.

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
{{% tab "Host Linux" %}}
Para empezar a recopilar telemetría de SQL Server, primero [instala el Datadog Agent][1].

En Linux, el Datadog Agent requiere además la instalación de un controlador ODBC SQL Server, por ejemplo, el [controlador ODBC de Microsoft][2]. Una vez instalado el controlador ODBC SQL Server, copia los archivos `odbc.ini` y `odbcinst.ini` en la carpeta `/opt/datadog-agent/embedded/etc`.

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
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'
```

Para obtener información adicional sobre la configuración de los campos `deployment_type` y `name`, consulta las [especificaciones para la integración SQL Server][4].

Utiliza las etiquetas (tags) `service` y `env` para vincular la telemetría de tu base de datos a otras telemetrías mediante un esquema común de etiquetado. Consulta [Etiquetado de servicio unificado][5] sobre cómo se utilizan estas etiquetas (tags) a lo largo de Datadog.

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
Para configurar el Database Monitoring Agent que se ejecuta en un contenedor Docker, configura las [plantillas de integración Autodiscovery][1] como etiquetas (labels) de Docker en el contenedor de tu Agent.

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
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "name": "<AZURE_ENDPOINT_ADDRESS>"
    }
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

Para obtener información adicional sobre la configuración de los campos `deployment_type` y `name`, consulta las [especificaciones para la integración SQL Server][3].

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
            # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
            azure:
              deployment_type: '<DEPLOYMENT_TYPE>'
              fully_qualified_domain_name: '<AZURE_ENDPOINT_ADDRESS>'

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

## Instalar la integración Azure

Para recopilar métricas de base de datos y logs más completos de Azure, instala la [integración Azure][1].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/integrations/azure