---
title: Setting Up Database Monitoring for self hosted MySQL
description: Install and configure Database Monitoring for self-hosted MySQL.
further_reading:
- link: "/integrations/mysql/"
  tag: "Documentation"
  text: "Basic MySQL Integration"

---

Database Monitoring provides deep visibility into your MySQL databases by exposing query metrics, query samples, explain plans, connection data, system metrics, and telemetry for the InnoDB storage engine.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your MySQL database:

1. [Configure database parameters](#configure-mysql-settings)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install the Agent](#install-the-agent)

## Before you begin

Supported MySQL versions
: 5.6, 5.7, or 8.0+

Supported MariaDB versions
: 10.5, 10.6, 10.11, or 11.1 <br/><br/>
Database Monitoring for MariaDB is supported with [known limitations][13].

Supported Agent versions
: 7.36.1+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][1]).

Proxies, load balancers, and connection poolers
: The Datadog Agent must connect directly to the host being monitored. For self-hosted databases, `127.0.0.1` or the socket is preferred. The Agent should not connect to the database through a proxy, load balancer, or connection pooler. If the Agent connects to different hosts while it is running (as in the case of failover, load balancing, and so on), the Agent calculates the difference in statistics between two hosts, producing inaccurate metrics.

Data security considerations
: See [Sensitive information][2] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Configure MySQL settings

To collect query metrics, samples, and explain plans, enable the [MySQL Performance Schema][3] and configure the following [Performance Schema Options][4], either on the command line or in configuration files (for example, `mysql.conf`):

{{< tabs >}}
{{% tab "MySQL ≥ 5.7" %}}
| Parameter | Value | Description |
| --- | --- | --- |
| `performance_schema` | `ON` | Required. Enables the Performance Schema. |
| `max_digest_length` | `4096` | Required for collection of larger queries. If left at the default value then queries longer than `1024` characters will not be collected. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Must match `max_digest_length`. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code> | `4096` | Must match `max_digest_length`. |
| `performance-schema-consumer-events-statements-current` | `ON` | Required. Enables monitoring of currently running queries. |
| `performance-schema-consumer-events-waits-current` | `ON` | Required. Enables the collection of wait events. |
| `performance-schema-consumer-events-statements-history-long` | `ON` | Recommended. Enables tracking of a larger number of recent queries across all threads. If enabled it increases the likelihood of capturing execution details from infrequent queries. |
| `performance-schema-consumer-events-statements-history` | `ON` | Optional. Enables tracking recent query history per thread. If enabled it increases the likelihood of capturing execution details from infrequent queries. |
{{% /tab %}}
{{% tab "MySQL 5.6" %}}
| Parameter | Value | Description |
| --- | --- | --- |
| `performance_schema` | `ON` | Required. Enables the Performance Schema. |
| `max_digest_length` | `4096` | Required for collection of larger queries. If left at the default value then queries longer than `1024` characters will not be collected. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Must match `max_digest_length`. |
| `performance-schema-consumer-events-statements-current` | `ON` | Required. Enables monitoring of currently running queries. |
| `performance-schema-consumer-events-waits-current` | `ON` | Required. Enables the collection of wait events. |
| `performance-schema-consumer-events-statements-history-long` | `ON` | Recommended. Enables tracking of a larger number of recent queries across all threads. If enabled it increases the likelihood of capturing execution details from infrequent queries. |
| `performance-schema-consumer-events-statements-history` | `ON` | Optional. Enables tracking recent query history per thread. If enabled it increases the likelihood of capturing execution details from infrequent queries. |
{{% /tab %}}
{{< /tabs >}}


**Note**: A recommended practice is to allow the agent to enable the `performance-schema-consumer-*` settings dynamically at runtime, as part of granting the Agent access. See [Runtime setup consumers](#runtime-setup-consumers).

## Grant the Agent access

The Datadog Agent requires read-only access to the database in order to collect statistics and queries.

The following instructions grant the Agent permission to login from any host using `datadog@'%'`. You can restrict the `datadog` user to be allowed to login only from localhost by using `datadog@'localhost'`. See the [MySQL documentation][5] for more info.

{{< tabs >}}
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
{{% tab "MySQL 5.6" %}}

Create the `datadog` user and grant basic permissions:

```sql
CREATE USER datadog@'%' IDENTIFIED BY '<UNIQUEPASSWORD>';
GRANT REPLICATION CLIENT ON *.* TO datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{< /tabs >}}

Create the following schema:

```sql
CREATE SCHEMA IF NOT EXISTS datadog;
GRANT EXECUTE ON datadog.* to datadog@'%';
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

To collect index metrics, grant the `datadog` user an additional privilege:

```sql
GRANT SELECT ON mysql.innodb_index_stats TO datadog@'%';
```

Starting from Agent v7.65, the Datadog Agent can collect schema information from MySQL databases. See the [Collecting schemas][14] section below for more info on how to grant the Agent permissions for this collection.


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

### Securely store your password
{{% dbm-secret %}}

## Install the Agent

Installing the Datadog Agent also installs the MySQL check, which is required for Database Monitoring on MySQL.

1. If you haven't installed the Agent yet, see the [Agent installation instructions][6], then return here to configure the MySQL check.

2. Follow the instructions below based on how you installed the Agent.

{{< tabs >}}

{{% tab "Host" %}}

After you've installed the Host Agent, edit the Agent's `conf.d/mysql.d/conf.yaml` file to point the MySQL instance you want to monitor. For a complete list of configuration options, see the [sample mysql.d/conf.yaml][1].

Note that the `datadog` user should be set up in the MySQL integration configuration as `host: 127.0.0.1` instead of `localhost`. Alternatively, you may also use `sock`.

```yaml
init_config:
instances:
  - dbm: true
    host: 127.0.0.1
    port: 3306
    username: datadog
    password: 'ENC[datadog_user_database_password]'
```

**Note**: If your password includes special characters, wrap it in single quotes.

[Restart the Agent][2] to apply the changes.

[1]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[2]: /agent/configuration/agent-commands/#restart-the-agent

{{% /tab %}}

{{% tab "Docker" %}}

To configure an integration for an Agent running in a Docker container, you have a couple of methods available, all of which are covered in detail in the [Docker Configuration Documentation][1].

The examples below show how to use [Docker Labels][2] and [Autodiscovery Templates][3] to configure the MySQL integration.

**Note**: The Agent must have read access to the Docker socket for label-based Autodiscovery to work.

### Command line

Run the following command from your [command line][4] to start the Agent. Replace the placeholder values with those for your account and environment.

```bash
export DD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export DD_AGENT_VERSION=<AGENT_VERSION>

docker run -e "DD_API_KEY=${DD_API_KEY}" \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  -l com.datadoghq.ad.checks='{"mysql": {
    "init_config": {},
    "instances": [{
      "dbm": true,
      "host": "<HOST>",
      "port": <PORT>,
      "username": "datadog",
      "password": "ENC[datadog_user_database_password]"
    }]
  }}' \
  gcr.io/datadoghq/agent:${DD_AGENT_VERSION}
```

### Dockerfile

You can also specify labels in a `Dockerfile`, allowing you to build and deploy a custom Agent without modifying your infrastructure configuration:

```Dockerfile
FROM gcr.io/datadoghq/agent:<AGENT_VERSION>

LABEL "com.datadoghq.ad.checks"='{"mysql": {"init_config": {}, "instances": [{"dbm": true, "host": "<HOST>", "port": <PORT>, "username": "datadog", "password": "ENC[datadog_user_database_password]"}]}}'
```

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][5] and declare the password using the `ENC[]` syntax. Alternatively, see the [Autodiscovery template variables documentation][6] to provide the password as an environment variable.

[1]: /containers/docker/integrations/?tab=labels#configuration
[2]: https://docs.docker.com/engine/manage-resources/labels/
[3]: /getting_started/containers/autodiscovery/
[4]: /containers/docker/integrations/?tab=labels#using-docker-run-nerdctl-run-or-podman-run
[5]: /agent/configuration/secrets-management
[6]: /agent/faq/template_variables/

{{% /tab %}}

{{% tab "Kubernetes" %}}

If you're running a Kubernetes cluster, use the [Datadog Cluster Agent][1] to enable Database Monitoring.

**Note**: Make sure [cluster checks][2] are enabled for your Datadog Cluster Agent before proceeding.

Below are step-by-step instructions for configuring the MySQL integration using different Datadog Cluster Agent deployment methods.

### Operator

Using the [Operator instructions in Kubernetes and Integrations][3] as a reference, follow the steps below to set up the MySQL integration:

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
              mysql.yaml: |-
                cluster_check: true
                init_config:
                instances:
                - host: <HOST>
                  port: <PORT>
                  username: datadog
                  password: 'ENC[datadog_user_database_password]'
                  dbm: true
    ```

2. Apply the changes to the Datadog Operator using the following command:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

### Helm

Using the [Helm instructions in Kubernetes and Integrations][4] as a reference, follow the steps below to set up the MySQL integration:

1. Update your `datadog-values.yaml` file (used in the Cluster Agent installation instructions) with the following configuration:

    ```yaml
    datadog:
      clusterChecks:
        enabled: true

    clusterChecksRunner:
      enabled: true

    clusterAgent:
      enabled: true
      confd:
        mysql.yaml: |-
          cluster_check: true
          init_config:
          instances:
          - dbm: true
            host: <HOST>
            port: <PORT>
            username: datadog
            password: 'ENC[datadog_user_database_password]'
    ```

2. Deploy the Agent with the above configuration file using the following command:

    ```shell
    helm install datadog-agent -f datadog-values.yaml datadog/datadog
    ```

<div class="alert alert-info">
For Windows, append <code>--set targetSystem=windows</code> to the <code>helm install</code> command.
</div>

### Configure with mounted files

To configure a cluster check with a mounted configuration file, mount the configuration file in the Cluster Agent container at the path: `/conf.d/mysql.yaml`:

```yaml
cluster_check: true  # Make sure to include this flag
init_config:
instances:
  - dbm: true
    host: <HOST>
    port: <PORT>
    username: datadog
    password: 'ENC[datadog_user_database_password]'
```

### Configure with Kubernetes service annotations

Instead of mounting a file, you can declare the instance configuration as a Kubernetes Service. To configure this check for an Agent running on Kubernetes, create a Service in the same namespace as the Datadog Cluster Agent:

#### Autodiscovery annotations v2

```yaml
apiVersion: v1
kind: Service
metadata:
  name: mysql
  labels:
    tags.datadoghq.com/env: '<ENV>'
    tags.datadoghq.com/service: '<SERVICE>'
  annotations:
    ad.datadoghq.com/<CONTAINER_NAME>.checks: |
      {
        "mysql": {
          "init_config": <INIT_CONFIG>,
          "instances": [
            {
              "dbm": true,
              "host": "<HOST>",
              "port": <PORT>,
              "username": "datadog",
              "password": "ENC[datadog_user_database_password]"
            }
          ]
        }
      }
spec:
  ports:
  - port: <PORT>
    protocol: TCP
    targetPort: <PORT>
    name: mysql
```

The Cluster Agent automatically registers this configuration and begins running the MySQL check.

To avoid exposing the `datadog` user's password in plain text, use the Agent's [secret management package][6] and declare the password using the `ENC[]` syntax.

[1]: /containers/cluster_agent/setup/
[2]: /containers/cluster_agent/clusterchecks/
[3]: /containers/kubernetes/integrations/?tab=datadogoperator
[4]: /containers/kubernetes/integrations/?tab=helm
[5]: /containers/kubernetes/integrations/?tab=annotations#configuration
[6]: /agent/configuration/secrets-management


{{% /tab %}}

{{< /tabs >}}


### Log collection (optional)

In addition to telemetry collected from the database by the Agent, you can also choose to send your database logs directly to Datadog.

1. By default MySQL logs everything in `/var/log/syslog` which requires root access to read. To make the logs more accessible, follow these steps:

   1. Edit `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` and comment out all lines.
   2. Edit `/etc/mysql/my.cnf` to enable the desired logging settings. For example, to enable general, error, and slow query logs, use the following configuration:

     ```conf
       [mysqld_safe]
       log_error = /var/log/mysql/mysql_error.log

       [mysqld]
       general_log = on
       general_log_file = /var/log/mysql/mysql.log
       log_error = /var/log/mysql/mysql_error.log
       slow_query_log = on
       slow_query_log_file = /var/log/mysql/mysql_slow.log
       long_query_time = 3
     ```

   3. Save the file and restart MySQL.
   4. Make sure the Agent has read access to the `/var/log/mysql` directory and all of the files within. Double-check your `logrotate` configuration to make sure these files are taken into account and that the permissions are correctly set.
      In `/etc/logrotate.d/mysql-server` there should be something similar to:

     ```text
       /var/log/mysql.log /var/log/mysql/mysql.log /var/log/mysql/mysql_slow.log {
               daily
               rotate 7
               missingok
               create 644 mysql adm
               Compress
       }
     ```

2. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

3. Add this configuration block to your `mysql.d/conf.yaml` file to start collecting your MySQL logs:

   ```yaml
   logs:
     - type: file
       path: "<ERROR_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"

     - type: file
       path: "<SLOW_QUERY_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"
       log_processing_rules:
         - type: multi_line
           name: new_slow_query_log_entry
           pattern: "# Time:"
           # If mysqld was started with `--log-short-format`, use:
           # pattern: "# Query_time:"
           # If using mysql version <5.7, use the following rules instead:
           # - type: multi_line
           #   name: new_slow_query_log_entry
           #   pattern: "# Time|# User@Host"
           # - type: exclude_at_match
           #   name: exclude_timestamp_only_line
           #   pattern: "# Time:"

     - type: file
       path: "<GENERAL_LOG_FILE_PATH>"
       source: mysql
       service: "<SERVICE_NAME>"
       # For multiline logs, if they start by the date with the format yyyy-mm-dd uncomment the following processing rule
       # log_processing_rules:
       #   - type: multi_line
       #     name: new_log_start_with_date
       #     pattern: \d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])
       # If the logs start with a date with the format yymmdd but include a timestamp with each new second, rather than with each log, uncomment the following processing rule
       # log_processing_rules:
       #   - type: multi_line
       #     name: new_logs_do_not_always_start_with_timestamp
       #     pattern: \t\t\s*\d+\s+|\d{6}\s+\d{,2}:\d{2}:\d{2}\t\s*\d+\s+
   ```

4. [Restart the Agent][9].

## Validate

[Run the Agent's status subcommand][10] and look for `mysql` under the Checks section, or see the [Databases][11] page to get started!

## Example Agent Configurations
{{% dbm-mysql-agent-config-examples %}}

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][12].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /database_monitoring/agent_integration_overhead/?tab=mysql
[2]: /database_monitoring/data_collected/#sensitive-information
[3]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
[4]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-options.html
[5]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: /agent/configuration/agent-configuration-files/#agent-configuration-directory
[8]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[9]: /agent/configuration/agent-commands/#start-stop-and-restart-the-agent
[10]: /agent/configuration/agent-commands/#agent-status-and-information
[11]: https://app.datadoghq.com/databases
[12]: /database_monitoring/troubleshooting/?tab=mysql
[13]: /database_monitoring/setup_mysql/troubleshooting/#mariadb-known-limitations
[14]: /database_monitoring/setup_mysql/selfhosted?tab=mysql57#collecting-schemas
