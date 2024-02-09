---
title: Setting Up Database Monitoring for Aurora managed MySQL
kind: documentation
description: Install and configure Database Monitoring for MySQL managed on Aurora.
further_reading:
- link: "/integrations/mysql/"
  tag: "Documentation"
  text: "Basic MySQL Integration"

---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}


Database Monitoring provides deep visibility into your MySQL databases by exposing query metrics, query samples, explain plans, connection data, system metrics, and telemetry for the InnoDB storage engine.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your MySQL database:

1. [Configure database parameters](#configure-mysql-settings)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install the Agent](#install-the-agent)
1. [Install the RDS integration](#install-the-rds-integration)

## Before you begin

Supported MySQL versions
: 5.6, 5.7, and 8.0 or later

Supported Agent versions
: 7.36.1 or later

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][1]).

Proxies, load balancers, and connection poolers
: The Datadog Agent must connect directly to the host being monitored, preferably through the instance endpoint. The Agent should not connect to the database through a proxy, load balancer, connection pooler, or the **Aurora cluster endpoint**. If connected to the cluster endpoint, the Agent collects data from one random replica, and only provides visibility into that replica. If the Agent connects to different hosts while it is running (as in the case of failover, load balancing, and so on), the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics.

Data security considerations
: See [Sensitive information][2] for information about what data the Agent collects from your databases and how to ensure it is secure.


## Configure MySQL settings

Configure the following in the [DB Parameter Group][3] and then **restart the server** for the settings to take effect:

{{< tabs >}}
{{% tab "MySQL 5.6" %}}
| Parameter | Value | Description |
| --- | --- | --- |
| `performance_schema` | `1` | Required. Enables the [Performance Schema][1]. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_current</code> | `1` | Required. Enables monitoring of currently running queries. |
| <code style="word-break:break-all;">performance-schema-consumer-events-waits-current</code> | `ON` | Required. Enables the collection of wait events. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history</code> | `1` | Optional. Enables tracking recent query history per thread. If enabled it increases the likelihood of capturing execution details from infrequent queries. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history_long</code> | `1` | Optional. Enables tracking of a larger number of recent queries across all threads. If enabled it increases the likelihood of capturing execution details from infrequent queries. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}

{{% tab "MySQL ≥ 5.7" %}}
| Parameter | Value | Description |
| --- | --- | --- |
| `performance_schema` | `1` | Required. Enables the [Performance Schema][1]. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_current</code> | `1` | Required. Enables monitoring of currently running queries. |
| <code style="word-break:break-all;">performance-schema-consumer-events-waits-current</code> | `ON` | Required. Enables the collection of wait events. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history</code> | `1` | Optional. Enables tracking recent query history per thread. If enabled it increases the likelihood of capturing execution details from infrequent queries. |
| <code style="word-break:break-all;">performance_schema_consumer_events_statements_history_long</code> | `1` | Optional. Enables tracking of a larger number of recent queries across all threads. If enabled it increases the likelihood of capturing execution details from infrequent queries. |
| <code style="word-break:break-all;">performance_schema_max_digest_length</code> | `4096` | Increases the size of SQL digest text in `events_statements_*` tables. If left at the default value then queries longer than `1024` characters will not be collected. |
| <code style="word-break:break-all;">performance_schema_max_sql_text_length</code> | `4096` | Must match <code style="word-break:break-all;">performance_schema_max_digest_length</code>. |

[1]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
{{% /tab %}}
{{< /tabs >}}

**Note**: A recommended practice is to allow the Agent to enable the `performance-schema-consumer-*` settings dynamically at runtime, as part of granting the Agent access. See [Runtime setup consumers](#runtime-setup-consumers).

## Grant the Agent access

The Datadog Agent requires read-only access to the database in order to collect statistics and queries.

The following instructions grant the Agent permission to login from any host using `datadog@'%'`. You can restrict the `datadog` user to be allowed to login only from localhost by using `datadog@'localhost'`. See the [MySQL documentation][4] for more info.

{{< tabs >}}
{{% tab "MySQL 5.6" %}}

Create the `datadog` user and grant basic permissions:

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL ≥ 5.7" %}}

Create the `datadog` user and grant basic permissions:

```sql
CREATE USER datadog@'%' IDENTIFIED by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

Create the following schema:

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
GRANT CREATE TEMPORARY TABLES ON datadog.* TO datadog@'%';
```

Create the `explain_statement` procedure to enable the Agent to collect explain plans:

```sql
DELIMITER $$
CREATE PROCEDURE datadog.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
```

Additionally, create this procedure **in every schema** from which you want to collect explain plans. Replace `<YOUR_SCHEMA>` with your database schema:

```sql
DELIMITER $$
CREATE PROCEDURE <YOUR_SCHEMA>.explain_statement(IN query TEXT)
    SQL SECURITY DEFINER
BEGIN
    SET @explain := CONCAT('EXPLAIN FORMAT=json ', query);
    PREPARE stmt FROM @explain;
    EXECUTE stmt;
    DEALLOCATE PREPARE stmt;
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE <YOUR_SCHEMA>.explain_statement TO datadog@'%';
```

### Runtime setup consumers
Datadog recommends that you create the following procedure to give the Agent the ability to enable `performance_schema.events_*` consumers at runtime.

```SQL
DELIMITER $$
CREATE PROCEDURE datadog.enable_events_statements_consumers()
    SQL SECURITY DEFINER
BEGIN
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name LIKE 'events_statements_%';
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name = 'events_waits_current';
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE datadog.enable_events_statements_consumers TO datadog@'%';
```

## Install the Agent

To monitor Aurora hosts, install the Datadog Agent in your infrastructure and configure it to connect to each instance endpoint remotely. The Agent does not need to run on the database, it only needs to connect to it. For additional Agent installation methods not mentioned here, see the [Agent installation instructions][5].

{{< tabs >}}
{{% tab "Host" %}}

To configure this check for an Agent running on a host, for example when you provision a small EC2 instance for the Agent to collect from an Aurora database:

Edit the `mysql.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. See the [sample mysql.d/conf.yaml][2] for all available configuration options, including those for custom metrics.

Add this configuration block to your `mysql.d/conf.yaml` to collect MySQL metrics:

```yaml
init_config:

instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: '<YOUR_CHOSEN_PASSWORD>' # from the CREATE USER step earlier
        
    # After adding your project and instance, configure the Datadog AWS integration to pull additional cloud data such as CPU and Memory.
    aws:
      instance_endpoint: '<AWS_INSTANCE_ENDPOINT>'
```

<div class="alert alert-warning"><strong>Important</strong>: Use the Aurora instance endpoint here, not the cluster endpoint.</div>

**Note**: Wrap your password in single quotes in case a special character is present.

[Restart the Agent][3] to start sending MySQL metrics to Datadog.


[1]: /agent/configuration/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

To configure the Database Monitoring Agent running in a Docker container such as in ECS or Fargate, you can set the [Autodiscovery Integration Templates][1] as Docker labels on your agent container.

**Note**: The Agent must have read permission on the Docker socket for Autodiscovery of labels to work.

### Command line

Get up and running quickly by executing the following command to run the agent from your command line. Replace the values to match your account and environment:

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=7.36.1

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.check_names='["mysql"]' \
  -l com.datadoghq.ad.init_configs='[{}]' \
  -l com.datadoghq.ad.instances='[{
    "dbm": true,
    "host": "<AWS_INSTANCE_ENDPOINT>",
    "port": 3306,
    "username": "datadog",
    "password": "<UNIQUEPASSWORD>"
  }]' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

### Dockerfile

Labels can also be specified in a `Dockerfile`, so you can build and deploy a custom agent without changing any infrastructure configuration:

```Dockerfile
FROM gcr.io/datadoghq/agent:7.36.1

LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "host": "<AWS_INSTANCE_ENDPOINT>", "port": 3306,"username": "datadog","password": "<UNIQUEPASSWORD>"}]'
```

<div class="alert alert-warning"><strong>Important</strong>: Use the Aurora instance endpoint as the host, not the cluster endpoint.</div>

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][2] and declare the password using the `ENC[]` syntax, or see the [Autodiscovery template variables documentation][3] to learn how to pass the password as an environment variable.


[1]: /agent/docker/integrations/?tab=docker
[2]: /agent/configuration/secrets-management
[3]: /agent/faq/template_variables/
{{% /tab %}}
{{% tab "Kubernetes" %}}

If you have a Kubernetes cluster, use the [Datadog Cluster Agent][1] for Database Monitoring.

Follow the instructions to [enable the cluster checks][2] if not already enabled in your Kubernetes cluster. You can declare the MySQL configuration either with static files mounted in the Cluster Agent container or using service annotations:

### Command line with Helm

Execute the following [Helm][3] command to install the [Datadog Cluster Agent][1] on your Kubernetes cluster. Replace the values to match your account and environment:

```bash
helm repo add datadog https://helm.datadoghq.com
helm repo update

helm install <RELEASE_NAME> \
  --set 'datadog.apiKey=<DATADOG_API_KEY>' \
  --set 'clusterAgent.enabled=true' \
  --set 'clusterAgent.confd.mysql\.yaml=cluster_check: true
init_config:
instances:
  - dbm: true
    host: <INSTANCE_ADDRESS>
    port: 3306
    username: datadog
    password: "<UNIQUEPASSWORD>"' \
  datadog/datadog
```

### Configure with mounted files

To configure a cluster check with a mounted configuration file, mount the configuration file in the Cluster Agent container on the path `/conf.d/mysql.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: '<AWS_INSTANCE_ENDPOINT>'
    port: 3306
    username: datadog
    password: '<UNIQUEPASSWORD>'
```

### Configure with Kubernetes service annotations

Rather than mounting a file, you can declare the instance configuration as a Kubernetes Service. To configure this check for an Agent running on Kubernetes, create a Service in the same namespace as the Datadog Cluster Agent:


```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/service.check_names: '["mysql"]'
    ad.datadoghq.com/service.init_configs: '[{}]'
    ad.datadoghq.com/service.instances: |
      [
        {
          "dbm": true,
          "host": "<AWS_INSTANCE_ENDPOINT>",
          "port": 3306,
          "username": "datadog",
          "password": "<UNIQUEPASSWORD>"
        }
      ]
spec:
  ports:
  - port: 3306
    protocol: TCP
    targetPort: 3306
    name: mysql
```
<div class="alert alert-warning"><strong>Important</strong>: Use the Aurora instance endpoint here, not the Aurora cluster endpoint.</div>

The Cluster Agent automatically registers this configuration and begins running the MySQL check.

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][4] and declare the password using the `ENC[]` syntax.

[1]: /agent/cluster_agent
[2]: /agent/cluster_agent/clusterchecks/
[3]: https://helm.sh
[4]: /agent/configuration/secrets-management
{{% /tab %}}
{{< /tabs >}}

### Validate

[Run the Agent's status subcommand][6] and look for `mysql` under the Checks section. Or visit the [Databases][7] page to get started!

## Example Agent Configurations
{{% dbm-mysql-agent-config-examples %}}

## Install the RDS Integration

To collect more comprehensive database metrics from AWS, install the [RDS integration][8] (optional).

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][9]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /agent/basic_agent_usage#agent-overhead
[2]: /database_monitoring/data_collected/#sensitive-information
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html
[4]: https://dev.mysql.com/doc/refman/5.7/en/creating-accounts.html
[5]: https://app.datadoghq.com/account/settings/agent/latest
[6]: /agent/configuration/agent-commands/#agent-status-and-information
[7]: https://app.datadoghq.com/databases
[8]: /integrations/amazon_rds
[9]: /database_monitoring/troubleshooting/?tab=mysql
