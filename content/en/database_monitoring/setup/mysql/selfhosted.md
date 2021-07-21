---
title: Setting Up Database Monitoring for self hosted MySQL
kind: documentation
description: Install and configure Database Monitoring for self-hosted MySQL.
code_lang: selfhosted
type: multi-code-lang
code_lang_weight: 10
further_reading:
- link: "/integrations/mysql/"
  tag: "Documentation"
<<<<<<< HEAD
  text: "Basic MySQL Integration"
  
---

{{< site-region region="us3,gov" >}} 
<div class="alert alert-warning">Database Monitoring is not supported in this region.</div>
=======
  text: "tktk"

---

{{< site-region region="us3,gov" >}}

Database Monitoring is not supported in this region.

>>>>>>> MySQL selfhosted edits
{{< /site-region >}}

Database Monitoring collects telemetry data about query metrics, samples, and execution plans, in addition to basic [Datadog MySQL integration][1] data about query throughput and performance, connections, and the InnoDB storage engine.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your MySQL database:

1. [Configure database parameters](#configure-mysql-settings)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install the Agent](#install-the-agent)
1. [Configure the Agent](#configure-the-agent)

## Before you begin

### Supported MySQL versions

* 5.6, 5.7, or 8.0+

### Performance impact

The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU.

Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][2]).

### Proxies, load balancers, and connection poolers

The Agent must connect directly to the host being monitored. For self-hosted databases, `127.0.0.1` or the socket is preferred. The Agent should not connect to the database through a proxy, load balancer, or connection pooler such as `pgbouncer`. While this can be an anti-pattern for client applications, each Agent must have knowledge of the underlying hostname and should be "sticky" to a single host, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the values of metrics will be incorrect.

## Configure MySQL settings

<<<<<<< HEAD
To collect query metrics, samples, and execution plans, enable the [MySQL Performance Schema][3] and configure the following [Performance Schema Options][4], either on the command line or in configuration files (for example,`mysql.conf`): 
=======
To collect query metrics, samples, and execution plans, enable the [MySQL Performance Schema][2] and configure the following [Performance Schema Options][3], either on the command line or in configuration files (for example,`mysql.conf`):
>>>>>>> MySQL selfhosted edits

| Parameter | Value | Description |
| --- | --- | --- |
| `performance_schema` | `ON` | Required. Enables the Performance Schema. |
| `max_digest_length` | `4096` | Required for collection of larger queries. If left at the default value then queries longer than `1024` characters will not be collected. |
| <code style="word-break:break-all;">`performance_schema_max_digest_length`</code> | `4096` | Must match `max_digest_length`. |
| <code style="word-break:break-all;">`performance_schema_max_sql_text_length`</code> | `4096` | Must match `max_digest_length`. |
| `performance-schema-consumer-events-statements-current` | `ON` | Required. Enables monitoring of currently running queries. |
| `performance-schema-consumer-events-statements-history` | `ON` | Optional. Enables tracking recent query history per thread. If enabled it increases the likelihood of capturing execution details from infrequent queries. |
| `performance-schema-consumer-events-statements-history-long` | `ON` | Optional. Enables tracking of a larger number of recent queries across all threads. If enabled it increases the likelihood of capturing execution details from infrequent queries. |

**Note**: A recommended practice is to allow the agent to enable the `performance-schema-consumer-*` settings dynamically at runtime, as part of granting the Agent access, next. See [Runtime setup consumers](#runtime-setup-consumers).

## Grant the Agent access

The Datadog Agent requires read-only access to the database in order to collect statistics and queries.

The following instructions grant the Agent permission to login from any host using `datadog@'%'`. You can restrict the `datadog` user to be allowed to login only from localhost by using `datadog@'localhost'`. See the [MySQL documentation][5] for more info.

{{< tabs >}}
{{% tab "MySQL ≥ 8.0" %}}

Create the datadog user and grant basic permissions:

```sql
CREATE USER datadog@'%' IDENTIFIED WITH mysql_native_password by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6 & 5.7" %}}

Create the datadog user and grant basic permissions:

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
GRANT CREATE TEMPORARY TABLES ON datadog.* TO datadog@'%';
```

Create the the `explain_statement` procedure to enable the Agent to collect execution plans:

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

Additionally, create this procedure **in every schema** from which you want to collect execution plans. Replace the `<YOUR_SCHEMA>` with your database schema:

```sql
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
Datadog recommends that you create the following procedure to give the Agent the ability to enable `performance_schema.events_statements_*` consumers at runtime.

```SQL
DELIMITER $$
CREATE PROCEDURE datadog.enable_events_statements_consumers()
    SQL SECURITY DEFINER
BEGIN
    UPDATE performance_schema.setup_consumers SET enabled='YES' WHERE name LIKE 'events_statements_%';
END $$
DELIMITER ;
GRANT EXECUTE ON PROCEDURE datadog.enable_events_statements_consumers TO datadog@'%';
```

### Verify

Verify the user was created successfully using the following commands, replacing `<UNIQUEPASSWORD>` with the password you created above:

```shell
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show status" | \
grep Uptime && echo -e "\033[0;32mMySQL user - OK\033[0m" || \
echo -e "\033[0;31mCannot connect to MySQL\033[0m"
```
```shell
mysql -u datadog --password=<UNIQUEPASSWORD> -e "show slave status" && \
echo -e "\033[0;32mMySQL grant - OK\033[0m" || \
echo -e "\033[0;31mMissing REPLICATION CLIENT grant\033[0m"
```

## Install the Agent

<<<<<<< HEAD
Installing the Datadog Agent also installs the MySQL check which is required for Database Monitoring on MySQL. If you haven't already installed the Agent for your MySQL database host, see the [Agent installation instructions][6]. 
=======
Installing the Datadog Agent also installs the MySQL check which is required for Database Monitoring on MySQL. If you haven't already installed the Agent for your MySQL database host, see the [Agent installation instructions][5].
>>>>>>> MySQL selfhosted edits

## Configure the Agent

### MySQL Agent configuration

{{< tabs >}}
{{% tab "Host" %}}

To configure this check for an Agent running on a host:

Edit the `mysql.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your MySQL [metrics](#metric-collection) and [logs](#log-collection). See the [sample mysql.d/conf.yaml][2] for all available configuration options, including those for custom metrics.

#### Metric collection

- Add this configuration block to your `mysql.d/conf.yaml` to collect MySQL metrics:

  ```yaml
  init_config:

  instances:
    - dbm: true
      server: 127.0.0.1
      user: datadog
      pass: '<YOUR_CHOSEN_PASSWORD>' # from the CREATE USER step earlier
      port: '<YOUR_MYSQL_PORT>' # e.g. 3306
  ```

**Note**: Wrap your password in single quotes in case a special character is present.

Note that the `datadog` user should be set up in the MySQL integration configuration as `host: 127.0.0.1` instead of `localhost`. Alternatively, you may also use `sock`.

[Restart the Agent][3] to start sending MySQL metrics to Datadog.

#### Log collection

_Available for Agent versions >6.0_

1. By default MySQL logs everything in `/var/log/syslog` which requires root access to read. To make the logs more accessible, follow these steps:

   - Edit `/etc/mysql/conf.d/mysqld_safe_syslog.cnf` and remove or comment the lines.
   - Edit `/etc/mysql/my.cnf` and add following lines to enable general, error, and slow query logs:

     ```conf
       [mysqld_safe]
       log_error = /var/log/mysql/mysql_error.log

       [mysqld]
       general_log = on
       general_log_file = /var/log/mysql/mysql.log
       log_error = /var/log/mysql/mysql_error.log
       slow_query_log = on
       slow_query_log_file = /var/log/mysql/mysql_slow.log
       long_query_time = 2
     ```

   - Save the file and restart MySQL using following commands:
     `service mysql restart`
   - Make sure the Agent has read access on the `/var/log/mysql` directory and all of the files within. Double-check your `logrotate` configuration to make sure those files are taken into account and that the permissions are correctly set there as well.
   - In `/etc/logrotate.d/mysql-server` there should be something similar to:

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

4. [Restart the Agent][3].


[1]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: h/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

To configure this check for an Agent running on a Docker container:

#### Metric collection

Set [Autodiscovery Integration Templates][1] as Docker labels on your application container:

```yaml
LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "server": "%%host%%", "user": "datadog","pass": "<UNIQUEPASSWORD>"}]'
```

See the [Autodiscovery template variables documentation][2] to learn how to pass `<UNIQUEPASSWORD>` as an environment variable instead of a label.

#### Log collection


Collecting logs is disabled by default in the Datadog Agent. To enable it, see the [Docker log collection documentation][3].

Then, set [Log Integrations][4] as Docker labels:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"mysql","service":"mysql"}]'
```


[1]: /agent/docker/integrations/?tab=docker
[2]: /agent/faq/template_variables/
[3]: /agent/docker/log/?tab=containerinstallation#installation
[4]: /agent/docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{% tab "Kubernetes" %}}

To configure this check for an Agent running on Kubernetes:

#### Metric collection

Set [Autodiscovery Integrations Templates][1] as pod annotations on your application container. Alternatively, you can configure templates with a [file, configmap, or key-value store][2].

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
  annotations:
    ad.datadoghq.com/nginx.check_names: '["mysql"]'
    ad.datadoghq.com/nginx.init_configs: '[{}]'
    ad.datadoghq.com/nginx.instances: |
      [
        {
          "dbm": true,
          "server": "%%host%%",
          "user": "datadog",
          "pass": "<UNIQUEPASSWORD>"
        }
      ]
  labels:
    name: mysql
spec:
  containers:
    - name: mysql
```

See the [Autodiscovery template variables documentation][3] to learn how to pass `<UNIQUEPASSWORD>` as an environment variable instead of a label.

#### Log collection

Collecting logs is disabled by default in the Datadog Agent. To enable it, see the [Kubernetes log collection documentation][4].

Then, set [Log Integrations][5] as pod annotations. Alternatively, you can configure this with a [file, configmap, or key-value store][6].

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: mysql
  annotations:
    ad.datadoghq.com/mysql.logs: '[{"source": "mysql", "service": "mysql"}]'
  labels:
    name: mysql
```



[1]: /agent/kubernetes/integrations/?tab=kubernetes
[2]: /agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: /agent/faq/template_variables/
[4]: /agent/kubernetes/log/?tab=containerinstallation#setup
[5]: /agent/docker/log/?tab=containerinstallation#log-integrations
[6]: /agent/kubernetes/log/?tab=daemonset#configuration
{{% /tab %}}
{{% tab "ECS" %}}

To configure this check for an Agent running on ECS:

#### Metric collection

Set [Autodiscovery Integrations Templates][1] as Docker labels on your application container:

```json
{
  "containerDefinitions": [{
    "name": "mysql",
    "image": "mysql:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"mysql\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"server\": \"%%host%%\", \"user\": \"datadog\",\"pass\": \"<UNIQUEPASSWORD>\"}]"
    }
  }]
}
```

See the [Autodiscovery template variables documentation][2] to learn how to pass `<UNIQUEPASSWORD>` as an environment variable instead of a label.

#### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see the [ECS log collection documentation][3].

Then, set [Log Integrations][4] as Docker labels:

```yaml
{
  "containerDefinitions": [{
    "name": "mysql",
    "image": "mysql:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"mysql\",\"service\":\"mysql\"}]"
    }
  }]
}
```


[1]: /agent/docker/integrations/?tab=docker
[2]: /agent/faq/template_variables/
[3]: /agent/amazon_ecs/logs/?tab=linux
[4]: /docker/log/?tab=containerinstallation#log-integrations
{{% /tab %}}
{{< /tabs >}}

### Validating

[Run the Agent's status subcommand][7] and look for `mysql` under the Checks section. Or visit the [Databases][8] page to get started!

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][9]

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/mysql/
[2]: /agent/basic_agent_usage#agent-overhead
[3]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-quick-start.html
[4]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema-options.html
[5]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[6]: https://app.datadoghq.com/account/settings#agent
[7]: /agent/guide/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
[9]: /database_monitoring/setup/troubleshooting/#mysql
