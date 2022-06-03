---
title: Setting Up Database Monitoring for Google Cloud SQL managed SQL Server
kind: documentation
description: Install and configure Database Monitoring for SQL Server managed on Google Cloud SQL
further_reading:
- link: "/integrations/sqlserver/"
  tag: "Documentation"
  text: "SQL Server Integration"


---

{{< site-region region="us5,gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

<div class="alert alert-warning">Database Monitoring for SQL Server is in private beta. Contact your Customer Success Manager to request access to the beta.</div>

Database Monitoring provides deep visibility into your Microsoft SQL Server databases by exposing query metrics, query samples, explain plans, database states, failovers, and events.

Complete the following steps to enable Database Monitoring with your database:

1. [Grant the Agent access to the database](#grant-the-agent-access)
2. [Install the Agent](#install-the-agent)
3. [Install the Cloud SQL integration](#install-the-cloud-sql-integration)

## Before you begin

Supported SQL Server versions
: 2012, 2014, 2016, 2017, 2019

{{% dbm-sqlserver-before-you-begin %}}

## Grant the Agent access

The Datadog Agent requires read-only access to the database server to collect statistics and queries.

Create a `datadog` user [on the Cloud SQL instance][1].

To maintain read-only access for the agent, remove the `datadog` user from the default `CustomerDbRootRole`. Instead, grant only the explicit permissions required by the agent.

```SQL
GRANT VIEW SERVER STATE to datadog as CustomerDbRootRole;
GRANT VIEW ANY DEFINITION to datadog as CustomerDbRootRole;
ALTER SERVER ROLE CustomerDbRootRole DROP member datadog;
```

Create the `datadog` user in each additional application database:
```SQL
USE [database_name];
CREATE USER datadog FOR LOGIN datadog;
```

This is required because Google Cloud SQL does not permit granting `CONNECT ANY DATABASE`. The Datadog Agent needs to connect to each database to collect database-specific file I/O statistics.

## Install the Agent

GCP does not grant direct host access, meaning the Datadog Agent must be installed on a separate host where it is able to talk to the SQL Server host. There are several options for installing and running the Agent.

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
    provider: MSOLEDBSQL
    tags:  # optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'
    # After adding your project and instance, configure the Datadog GCP integration to pull additional cloud data such as CPU, Memory, etc.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

To use [Windows Authentication][3] set `connection_string: "Trusted_Connection=yes"` and omit the `username` and `password` fields.

The `service` and `env` tags allow you to link your database telemetry to other telemetry through a common tagging scheme. To learn how these tags are used throughout Datadog, read the documentation on [unified service tagging][4].

### Supported Drivers

#### Microsoft ADO

The recommended [ADO][5] provider is [Microsoft OLE DB Driver][6]. Ensure the driver is installed on the host where the agent is running.
```yaml
connector: adodbapi
provider: MSOLEDBSQL
```

The other two providers, `SQLOLEDB` and `SQLNCLI`, are considered deprecated by Microsoft and should no longer be used.

#### ODBC

The recommended ODBC driver is [Microsoft ODBC Driver][7]. Ensure the driver is installed on the host where the Agent is running.

```yaml
connector: odbc
driver: '{ODBC Driver 17 for SQL Server}'
```

Once all Agent configuration is complete, [Restart the Datadog Agent][8].

### Validate

[Run the Agent's status subcommand][9] and look for `sqlserver` under the **Checks** section. Navigate to the [Databases][10] page in Datadog to get started.


[1]: https://app.datadoghq.com/account/settings#agent/windows
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://docs.microsoft.com/en-us/sql/relational-databases/security/choose-an-authentication-mode
[4]: /getting_started/tagging/unified_service_tagging
[5]: https://docs.microsoft.com/en-us/sql/ado/microsoft-activex-data-objects-ado
[6]: https://docs.microsoft.com/en-us/sql/connect/oledb/oledb-driver-for-sql-server
[7]: https://docs.microsoft.com/en-us/sql/connect/odbc/download-odbc-driver-for-sql-server
[8]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[9]: /agent/guide/agent-commands/#agent-status-and-information
[10]: https://app.datadoghq.com/databases
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
    tags:  # optional
      - 'service:<CUSTOM_SERVICE>'
      - 'env:<CUSTOM_ENV>'

    # After adding your project and instance, configure the Datadog GCP integration to pull additional cloud data such as CPU, Memory, etc.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
```

The `service` and `env` tags allow you to link your database telemetry to other telemetry through a common tagging scheme. To learn how these tags are used throughout Datadog, read the documentation on [unified service tagging][4].

Once all Agent configuration is complete, [Restart the Datadog Agent][5].

### Validate

[Run the Agent's status subcommand][6] and look for `sqlserver` under the **Checks** section. Navigate to the [Databases][7] page in Datadog to get started.


[1]: https://app.datadoghq.com/account/settings#agent
[2]: https://docs.microsoft.com/en-us/sql/connect/odbc/linux-mac/installing-the-microsoft-odbc-driver-for-sql-server
[3]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[4]: /getting_started/tagging/unified_service_tagging
[5]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: /agent/guide/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
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
    "host": "<HOSTNAME>",
    "port": <SQL_PORT>,
    "connector": "odbc",
    "driver": "FreeTDS",
    "username": "datadog",
    "password": "<PASSWORD>",
    "tags": [
      "service:<CUSTOM_SERVICE>"
      "env:<CUSTOM_ENV>"
    ],
    "gcp": {
      "project_id": "<PROJECT_ID>",
      "instance_id": "<INSTANCE_ID>"
    }
  }]' \
  datadoghq/agent:${DD_AGENT_VERSION}
```

The `service` and `env` tags allow you to link your database telemetry to other telemetry through a common tagging scheme. To learn how these tags are used throughout Datadog, read the documentation on [unified service tagging][3].

### Validate

[Run the Agent's status subcommand][4] and look for `sqlserver` under the **Checks** section. Alternatively, navigate to the [Databases][5] page in Datadog to get started.

[1]: /agent/faq/template_variables/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: /getting_started/tagging/unified_service_tagging
[4]: /agent/guide/agent-commands/#agent-status-and-information
[5]: https://app.datadoghq.com/databases
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
    host: <HOSTNAME>
    port: 1433
    username: datadog
    password: '<PASSWORD>'
    connector: 'odbc'
    driver: 'FreeTDS'
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>' \
  datadog/datadog"
```

### Configure with mounted files

To configure a cluster check with a mounted configuration file, mount the configuration file in the Cluster Agent container on the path: `/conf.d/sqlserver.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<HOSTNAME>'
    port: <SQL_PORT>
    username: datadog
    password: '<PASSWORD>'
    connector: "odbc"
    driver: "FreeTDS"
    # After adding your project and instance, configure the Datadog GCP integration to pull additional cloud data such as CPU, Memory, etc.
    gcp:
      project_id: '<PROJECT_ID>'
      instance_id: '<INSTANCE_ID>'
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
          "host": "<HOSTNAME>",
          "port": <SQL_PORT>,
          "username": "datadog",
          "password": "<PASSWORD>",
          "connector": "odbc",
          "driver": "FreeTDS",
          "gcp": {
            "project_id": "<PROJECT_ID>",
            "instance_id": "<INSTANCE_ID>"
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

The Cluster Agent automatically registers this configuration and begins running the SQL Server check.

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][4] and declare the password using the `ENC[]` syntax.

[1]: /agent/cluster_agent
[2]: /agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /agent/guide/secrets-management
{{% /tab %}}
{{< /tabs >}}

## Install the Google Cloud SQL integration

To collect more comprehensive database metrics from Google Cloud SQL, install the [Google Cloud SQL integration][2].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://cloud.google.com/sql/docs/sqlserver/create-manage-users#creating
[2]: /integrations/google_cloudsql
