---
title: Setting Up Database Monitoring for Azure SQL Server
kind: documentation
description: Install and configure Database Monitoring for SQL Server managed on Azure.
further_reading:
- link: "/integrations/sqlserver/"
  tag: "Documentation"
  text: "Basic SQL Server Integration"
- link: "/database_monitoring/troubleshooting/?tab=sqlserver"
  tag: "Documentation"
  text: "Troubleshoot Common Issues"


---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

Database Monitoring provides deep visibility into your Microsoft SQL Server databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

Do the following steps to enable Database Monitoring with your database:

1. [Grant the Agent access to the database](#grant-the-agent-access)
2. [Install the Agent](#install-the-agent)
3. [Install the Azure integration](#install-the-azure-integration)

## Before you begin

Supported SQL Server versions
: 2012, 2014, 2016, 2017, 2019

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
```

Grant the Agent access to each additional Azure SQL Database on this server:

```SQL
CREATE USER datadog FOR LOGIN datadog;
```

When configuring the Datadog Agent, specify one check instance for each application database located on a given Azure SQL DB server. Do not include `master` and other [system databases][2]. The Datadog Agent must connect directly to each application database in Azure SQL DB because each database is running in an isolated compute environment. This also means that `database_autodiscovery` does not work for Azure SQL DB, so it should not be enabled.

**Note:** Azure SQL Database deploys a database in an isolated network; each database is treated as a single host. This means that if you run Azure SQL Database in an elastic pool, each database in the pool is treated as a separate host.

```yaml
init_config:
instances:
  - host: '<SERVER_NAME>.database.windows.net,1433'
    database: '<DATABASE_1>'
    username: datadog
    password: '<PASSWORD>'

  - host: '<SERVER_NAME>.database.windows.net,1433'
    database: '<DATABASE_2>'
    username: datadog
    password: '<PASSWORD>'
```

See [Install the Agent](#install-the-agent) for more detailed instructions on how to install and configure the Datadog Agent.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/database/security-server-roles
[2]: https://docs.microsoft.com/en-us/sql/relational-databases/databases/system-databases
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
```

#### For SQL Server 2012

```SQL
CREATE LOGIN datadog WITH PASSWORD = '<PASSWORD>';
CREATE USER datadog FOR LOGIN datadog;
GRANT VIEW SERVER STATE to datadog;
GRANT VIEW ANY DEFINITION to datadog;

-- Create the `datadog` user in each additional application database:
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```

{{% /tab %}}

{{% tab "SQL Server on Windows Azure VM" %}}

For [SQL Server on Windows Azure VM][1] follow the [Setting Up Database Monitoring for self-hosted SQL Server][2] documentation to install the Datadog Agent directly on the Windows Server host VM.

[1]: https://docs.microsoft.com/en-us/azure/azure-sql/virtual-machines/windows/sql-server-on-azure-vm-iaas-what-is-overview
[2]: /database_monitoring/setup_sql_server/selfhosted/
{{% /tab %}}

{{< /tabs >}}

## Install the Agent

Since Azure does not grant direct host access, the Datadog Agent must be installed on a separate host where it is able to talk to the SQL Server host. There are several options for installing and running the Agent.

{{< tabs >}}
{{% tab "Windows Host" %}}
To start collecting SQL Server telemetry, first [install the Datadog Agent][1].

Create the SQL Server Agent conf file `C:\ProgramData\Datadog\conf.d\sqlserver.d\conf.yaml`. See the [sample conf file][2] for all available configuration options.

```yaml
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: '<PASSWORD>'
    connector: adodbapi
    adoprovider: MSOLEDBSQL
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      name: '<YOUR_INSTANCE_NAME>'
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

The recommended ODBC driver is [Microsoft ODBC Driver][8]. Ensure the driver is installed on the host where the Agent is running.

```yaml
connector: odbc
driver: '{ODBC Driver 17 for SQL Server}'
```

Once all Agent configuration is complete, [restart the Datadog Agent][9].

### Validate

[Run the Agent's status subcommand][10] and look for `sqlserver` under the **Checks** section. Navigate to the [Databases][11] page in Datadog to get started.


[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[4]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
[5]: /getting_started/tagging/unified_service_tagging
[6]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[7]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[8]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[9]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[10]: /agent/guide/agent-commands/#agent-status-and-information
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
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: '<PASSWORD>'
    connector: odbc
    driver: '<Driver from the `odbcinst.ini` file>'
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      name: '<YOUR_INSTANCE_NAME>'
```

See the [SQL Server integration spec][4] for additional information on setting `deployment_type` and `name` fields.

Use the `service` and `env` tags to link your database telemetry to other telemetry through a common tagging scheme. See [Unified Service Tagging][5] on how these tags are used throughout Datadog.

Once all Agent configuration is complete, [restart the Datadog Agent][6].

### Validate

[Run the Agent's status subcommand][7] and look for `sqlserver` under the **Checks** section. Navigate to the [Databases][8] page in Datadog to get started.


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /getting_started/tagging/unified_service_tagging
[6]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[7]: /agent/guide/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Docker" %}}
To configure the Database Monitoring Agent running in a Docker container, set the [Autodiscovery Integration Templates][1] as Docker labels on your Agent container.

**Note**: The Agent must have read permission on the Docker socket for Autodiscovery of labels to work.

Replace the values to match your account and environment. See the [sample conf file][2] for all available configuration options.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.35.0

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["sqlserver"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<HOSTNAME>,<SQL_PORT>",
    "connector": "odbc",
    "driver": "FreeTDS",
    "username": "datadog",
    "password": "<PASSWORD>",
    "tags": [
      "service:<CUSTOM_SERVICE>"
      "env:<CUSTOM_ENV>"
    ],
    "azure": {
      "deployment_type": "<DEPLOYMENT_TYPE>",
      "name": "<YOUR_INSTANCE_NAME>"
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
[5]: /agent/guide/agent-commands/#agent-status-and-information
[6]: https://app.datadoghq.com/databases
{{% /tab %}}
{{% tab "Kubernetes" %}}
If you have a Kubernetes cluster, use the [Datadog Cluster Agent][1] for Database Monitoring.

If cluster checks are not already enabled in your Kubernetes cluster, follow the instructions to [enable cluster checks][2]. You can configure the Cluster Agent either with static files mounted in the Cluster Agent container, or by using Kubernetes service annotations:

### Command line with Helm

Execute the following [Helm][3] command to install the [Datadog Cluster Agent][1] on your Kubernetes cluster. Replace the values to match your account and environment:

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm install <RELEASE_NAME> \
  --set 'datadog.apiKey=<DATADOG_API_KEY>' \
  --set 'clusterAgent.enabled=true' \
  --set "clusterAgent.confd.sqlserver\.yaml=cluster_check: true
init_config:
instances:
  - dbm: true
    host: <HOSTNAME>,1433
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'FreeTDS'
    include_ao_metrics: true  # Optional: For AlwaysOn users
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      name: '<YOUR_INSTANCE_NAME>' \
  datadog/datadog"
```

### Configure with mounted files

To configure a cluster check with a mounted configuration file, mount the configuration file in the Cluster Agent container on the path: `/conf.d/sqlserver.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>,<SQL_PORT>'
    username: datadog
    password: '<PASSWORD>'
    connector: "odbc"
    driver: "FreeTDS"
    tags:  # Optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your project and instance, configure the Datadog Azure integration to pull additional cloud data such as CPU, Memory, etc.
    azure:
      deployment_type: '<DEPLOYMENT_TYPE>'
      name: '<YOUR_INSTANCE_NAME>'
```

### Configure with Kubernetes service annotations

Rather than mounting a file, you can declare the instance configuration as a Kubernetes Service. To configure this check for an Agent running on Kubernetes, create a Service in the same namespace as the Datadog Cluster Agent:


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
          "host": "<HOSTNAME>,<SQL_PORT>",
          "username": "datadog",
          "password": "<PASSWORD>",
          "connector": "odbc",
          "driver": "FreeTDS",
          "tags": ["service:<CUSTOM_SERVICE>", "env:<CUSTOM_ENV>"],  # Optional
          "azure": {
            "deployment_type": "<DEPLOYMENT_TYPE>",
            "name": "<YOUR_INSTANCE_NAME>"
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
[3]: https://helm.sh
[4]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/assets/configuration/spec.yaml#L353-L383
[5]: /agent/guide/secrets-management
{{% /tab %}}
{{< /tabs >}}

## Example Agent Configurations
{{% dbm-sqlserver-agent-config-examples %}}

## Install the Azure integration

To collect more comprehensive database metrics and logs from Azure, install the [Azure integration][1].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/azure
