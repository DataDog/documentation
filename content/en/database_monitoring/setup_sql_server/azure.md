---
title: Setting Up Database Monitoring for Azure SQL Server
description: Install and configure Database Monitoring for SQL Server managed on Azure.
further_reading:
- link: "/integrations/sqlserver/"
  tag: "Documentation"
  text: "Basic SQL Server Integration"
- link: "/database_monitoring/troubleshooting/?tab=sqlserver"
  tag: "Documentation"
  text: "Troubleshoot Common Issues"
- link: "/database_monitoring/guide/sql_deadlock/"
  tag: "Documentation"
  text: "Configure Deadlock Monitoring"
- link: "/database_monitoring/guide/sql_extended_events/"
  tag: "Documentation"
  text: "Configure Query Completion and Query Error Collection"
- link: "/database_monitoring/guide/parameterized_queries/"
  tag: "Documentation"
  text: "Capturing SQL Query Parameter Values"
---

Database Monitoring provides deep visibility into your Microsoft SQL Server databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

Do the following steps to enable Database Monitoring with your database:

1. [Grant the Agent access to the database](#grant-the-agent-access)
2. [Install and configure the Agent](#install-and-configure-the-agent)
3. [Install the Azure integration](#install-the-azure-integration)

## Before you begin

Supported SQL Server versions
: 2014, 2016, 2017, 2019, 2022

{{% dbm-sqlserver-before-you-begin %}}

## Grant the Agent access

The Datadog Agent requires read-only access to the database server to collect statistics and queries.

{{< tabs >}}

{{% tab "Azure SQL Database" %}}

Create a read-only login to connect to your server and grant the required [Azure SQL Roles][1]:
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

Grant the Agent access to each additional Azure SQL Database on this server:

```SQL
CREATE USER datadog FOR LOGIN datadog;
```

**Note:** Microsoft Entra ID managed identity authentication is also supported. Please see [the guide][3] on how to configure this for your Azure SQL DB instance.

When configuring the Datadog Agent, specify one check instance for each application database located on a given Azure SQL DB server. Do not include `master` and other [system databases][2]. The Datadog Agent must connect directly to each application database in Azure SQL DB because each database is running in an isolated compute environment. This also means that `database_autodiscovery` does not work for Azure SQL DB, so it should not be enabled.

**Note:** Azure SQL Database deploys a database in an isolated network; each database is treated as a single host. This means that if you run Azure SQL Database in an elastic pool, each database in the pool is treated as a separate host.

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

See [Install the Agent](#install-the-agent) for more detailed instructions on how to install and configure the Datadog Agent.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/database/security-server-roles
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/databases/system-databases
[3]: /database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "Azure SQL Managed Instance" %}}

Create a read-only login to connect to your server and grant the required permissions:

#### For SQL Server versions 2014+

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

**Note:** Azure managed identity authentication is also supported. Please see [the guide][1] on how to configure this for your Azure SQL DB instance.

[1]: /database_monitoring/guide/managed_authentication
{{% /tab %}}

{{% tab "SQL Server on Windows Azure VM" %}}

For [SQL Server on Windows Azure VM][1] follow the [Setting Up Database Monitoring for self-hosted SQL Server][2] documentation to install the Datadog Agent directly on the Windows Server host VM.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview
[2]: /database_monitoring/setup_sql_server/selfhosted/
{{% /tab %}}

{{< /tabs >}}

### Securely store your password
{{% dbm-secret %}}

## Install and configure the Agent

Because Azure does not grant direct host access, the Datadog Agent must be installed on a separate host where it is able to talk to the SQL Server host. There are several options for installing and running the Agent.

{{< tabs >}}
{{% tab "Windows Host" %}}

To start collecting SQL Server telemetry, first [install the Datadog Agent][1].

Create the SQL Server Agent conf file `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`. See the [sample conf file][2] for all available configuration options.

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

See the [SQL Server integration spec][3] for additional information on setting `deployment_type` and `name` fields.

To use [Windows Authentication][4], set `connection_string: "Trusted_Connection=yes"` and omit the `username` and `password` fields.

Use the `service` and `env` tags to link your database telemetry to other telemetry through a common tagging scheme. See [Unified Service Tagging][5] on how these tags are used throughout Datadog.

### Supported Drivers

#### Microsoft ADO

The recommended [ADO][6] provider is [Microsoft OLE DB Driver][7]. Ensure the driver is installed on the host where the agent is running.
```yaml
connector: adodbapi
adoprovider: MSOLEDBSQL19  # Replace with MSOLEDBSQL for versions 18 and lower
```

The other two providers, `SQLOLEDB` and `SQLNCLI`, are considered deprecated by Microsoft and should no longer be used.

#### ODBC

The recommended ODBC driver is [Microsoft ODBC Driver][8]. Starting with Agent 7.51, ODBC Driver 18 for SQL Server is included in the agent for Linux. For Windows, ensure the driver is installed on the host where the Agent is running.

```yaml
connector: odbc
driver: 'ODBC Driver 18 for SQL Server'
```

Once all Agent configuration is complete, [restart the Datadog Agent][9].

### Validate

[Run the Agent's status subcommand][10] and look for `sqlserver` under the **Checks** section. Navigate to the [Databases][11] page in Datadog to get started.


[1]: https://app.datadoghq.com/account/settings/agent/latest?platform=windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[4]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
[5]: /getting_started/tagging/unified_service_tagging
[6]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[7]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[8]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[9]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Linux Host" %}}
To start collecting SQL Server telemetry, first [install the Datadog Agent][1].

On Linux, the Datadog Agent additionally requires an ODBC SQL Server driver to be installed—for example, the [Microsoft ODBC driver][2]. Once an ODBC SQL Server is installed, copy the `odbc.ini` and `odbcinst.ini` files into the `/opt/datadog-agent/embedded/etc` folder.

Use the `odbc` connector and specify the proper driver as indicated in the `odbcinst.ini` file.

Create the SQL Server Agent conf file `/etc/datadog-agent/conf.d/sqlserver.d/conf.yaml`. See the [sample conf file][3] for all available configuration options.

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

See the [SQL Server integration spec][4] for additional information on setting `deployment_type` and `name` fields.

Use the `service` and `env` tags to link your database telemetry to other telemetry through a common tagging scheme. See [Unified Service Tagging][5] on how these tags are used throughout Datadog.

Once all Agent configuration is complete, [restart the Datadog Agent][6].

### Validate

[Run the Agent's status subcommand][7] and look for `sqlserver` under the **Checks** section. Navigate to the [Databases][8] page in Datadog to get started.


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /getting_started/tagging/unified_service_tagging
[6]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[7]: /agent/configuration/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Docker" %}}
To configure the Database Monitoring Agent running in a Docker container, set the [Autodiscovery Integration Templates][1] as Docker labels on your Agent container.

**Note**: The Agent must have read permission on the Docker socket for Autodiscovery of labels to work.

Replace the values to match your account and environment. See the [sample conf file][2] for all available configuration options.

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

See the [SQL Server integration spec][3] for additional information on setting `deployment_type` and `name` fields.

Use the `service` and `env` tags to link your database telemetry to other telemetry through a common tagging scheme. See [Unified Service Tagging][4] on how these tags are used throughout Datadog.

### Validate

[Run the Agent's status subcommand][5] and look for `sqlserver` under the **Checks** section. Alternatively, navigate to the [Databases][6] page in Datadog to get started.


[1]: /agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[4]: /getting_started/tagging/unified_service_tagging
[5]: /agent/configuration/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Kubernetes" %}}
If you're running a Kubernetes cluster, use the [Datadog Cluster Agent][1] to enable Database Monitoring. If cluster checks aren’t already enabled, [follow these instructions][2] to enable them before proceeding.

### Operator

Follow the steps below to set up the SQL Server integration, using the [Operator instructions in Kubernetes and Integrations][6] as a reference.

1. Create or update the `datadog-agent.yaml` file with the following configuration:

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

2. Apply the changes to the Datadog Operator using the following command:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm

Complete the following steps to install the [Datadog Cluster Agent][1] on your Kubernetes cluster. Replace the values to match your account and environment.

1. Complete the [Datadog Agent installation instructions][3] for Helm.
2. Update your YAML configuration file (`datadog-values.yaml` in the Cluster Agent installation instructions) to include the following:
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

3. Deploy the Agent with the above configuration file from the command line:
    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
</div>

### Configure with mounted files

To configure a cluster check with a mounted configuration file, mount the configuration file in the Cluster Agent container on the path: `/conf.d/sqlserver.yaml`:

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

### Configure with Kubernetes service annotations

Rather than mounting a file, you can declare the instance configuration as a Kubernetes Service. To configure this check for an Agent running on Kubernetes, create a service using the following syntax:

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

See the [SQL Server integration spec][4] for additional information on setting `deployment_type` and `name` fields.

The Cluster Agent automatically registers this configuration and begins running the SQL Server check.

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][5] and declare the password using the `ENC[]` syntax.


[1]: /agent/cluster_agent
[2]: /agent/cluster_agent/clusterchecks/
[3]: /containers/kubernetes/installation/?tab=helm#installation
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /agent/configuration/secrets-management
[6]: /containers/kubernetes/integrations/?tab=datadogoperator
{{% /tab %}}
{{< /tabs >}}

## Example Agent Configurations
{{% dbm-sqlserver-agent-config-examples %}}

## Install the Azure integration

To collect more comprehensive database metrics and logs from Azure, install the [Azure integration][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure
