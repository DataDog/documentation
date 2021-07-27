---
title: Setting Up Database Monitoring for Amazon RDS managed MySQL
kind: documentation
description: Install and configure Database Monitoring for MySQL managed on Amazon RDS.
further_reading:
- link: "/integrations/mysql/"
  tag: "Documentation"
  text: "Basic MySQL Integration"

---

{{< site-region region="us3,gov" >}}
<div class="alert alert-warning">Database Monitoring is not supported for this site.</div>
{{< /site-region >}}

Database Monitoring provides deep visibility into your MySQL databases by exposing query metrics, query samples, explain plans, connection data, system metrics, and telemetry for the InnoDB storage engine.

The Agent collects telemetry directly from the database by logging in as a read-only user. Do the following setup to enable Database Monitoring with your MySQL database:

1. [Configure database parameters](#configure-mysql-settings)
1. [Grant the Agent access to the database](#grant-the-agent-access)
1. [Install the Agent](#install-the-agent)
1. [Configure the Agent](#configure-the-agent)

## Before you begin

Supported MySQL versions
: 5.6, 5.7, or 8.0+

Supported Agent versions
: 7.30.0+

Performance impact
: The default Agent configuration for Database Monitoring is conservative, but you can adjust settings such as the collection interval and query sampling rate to better suit your needs. For most workloads, the Agent represents less than one percent of query execution time on the database and less than one percent of CPU. <br/><br/>
Database Monitoring runs as an integration on top of the base Agent ([see benchmarks][1]).

Proxies, load balancers, and connection poolers
: The Agent must connect directly to the host being monitored. For self-hosted databases, `127.0.0.1` or the socket is preferred. The Agent should not connect to the database through a proxy, load balancer, or connection pooler. While this can be an anti-pattern for client applications, each Agent must have knowledge of the underlying hostname and should stick to a single host for its lifetime, even in cases of failover. If the Datadog Agent connects to different hosts while it is running, the values of metrics will be incorrect.

Data security considerations
: See [Sensitive information][2] for information about what data the Agent collects from your databases and how to ensure it is secure.

## Configure MySQL settings

Configure the following in the [DB Parameter Group][3]:

| Parameter | Value | Description |
| --- | --- | --- |
| `performance_schema` | `1` | Required. Enables the [Performance Schema][4]. |
| `max_digest_length` | `4096` | Required for collection of larger queries. Increases the size of SQL digest text in `events_statements_*` tables. If left at the default value then queries longer than `1024` characters will not be collected. |
| `performance_schema_max_digest_length` | `4096` | Must match `max_digest_length`. |
| `performance_schema_max_sql_text_length` | `4096` | Must match `max_digest_length`. |

## Grant the Agent access

The Datadog Agent requires read-only access to the database in order to collect statistics and queries.

The following instructions grant the Agent permission to login from any host using `datadog@'%'`. You can restrict the `datadog` user to be allowed to login only from localhost by using `datadog@'localhost'`. See the [MySQL documentation][5] for more info.

{{< tabs >}}
{{% tab "MySQL ≥ 8.0" %}}

Create the `datadog` user and grant basic permissions:

```sql
CREATE USER datadog@'%' IDENTIFIED WITH mysql_native_password by '<UNIQUEPASSWORD>';
ALTER USER datadog@'%' WITH MAX_USER_CONNECTIONS 5;
GRANT REPLICATION CLIENT ON *.* TO datadog@'%';
GRANT PROCESS ON *.* TO datadog@'%';
GRANT SELECT ON performance_schema.* TO datadog@'%';
```

{{% /tab %}}
{{% tab "MySQL 5.6 & 5.7" %}}

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
GRANT CREATE TEMPORARY TABLES ON datadog.* TO datadog@'%';
```

Create the the `explain_statement` procedure to enable the Agent to collect explain plans:

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
Because with RDS, the performance schema consumers can't be enabled permanently in the configuration, you must create the following procedure to give the Agent the ability to enable `performance_schema.events_statements_*` consumers at runtime.

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

To monitor RDS hosts, install the Agent somewhere in your infrastructure and configure it to connect to the RDS instance endpoint remotely.

Installing the Datadog Agent also installs the MySQL check which is required for Database Monitoring on MySQL. If you haven't already installed the Agent to run checks, see the [Agent installation instructions][6].

## Configure the Agent

{{< tabs >}}
{{% tab "Host" %}}

To configure this check for an Agent running on a host, for example when you provision a small EC2 instance for the Agent to collect from an RDS database:

Edit the `mysql.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1] to start collecting your MySQL metrics. See the [sample mysql.d/conf.yaml][2] for all available configuration options, including those for custom metrics.

Add this configuration block to your `mysql.d/conf.yaml` to collect MySQL metrics:

```yaml
init_config:

instances:
  - dbm: true
    server: '<AWS_INSTANCE_ENDPOINT>'
    user: datadog
    pass: '<YOUR_CHOSEN_PASSWORD>' # from the CREATE USER step earlier
    port: '<YOUR_MYSQL_PORT>' # e.g. 3306
```

**Note**: Wrap your password in single quotes in case a special character is present.

[Restart the Agent][3] to start sending MySQL metrics to Datadog.


[1]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/mysql/datadog_checks/mysql/data/conf.yaml.example
[3]: /agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Docker" %}}

To configure this check for an Agent running on a Docker container:

Set [Autodiscovery Integration Templates][1] as Docker labels on your application container:

```yaml
LABEL "com.datadoghq.ad.check_names"='["mysql"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"dbm": true, "server": "<AWS_INSTANCE_ENDPOINT>", "user": "datadog","pass": "<UNIQUEPASSWORD>"}]'
```

See the [Autodiscovery template variables documentation][2] to learn how to pass `<UNIQUEPASSWORD>` as an environment variable instead of a label.

[1]: /agent/docker/integrations/?tab=docker
[2]: /agent/faq/template_variables/
{{% /tab %}}
{{% tab "Kubernetes" %}}

To configure this check for an Agent running on Kubernetes:

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
          "server": "<AWS_INSTANCE_ENDPOINT>",
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


[1]: /agent/kubernetes/integrations/?tab=kubernetes
[2]: /agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: /agent/faq/template_variables/
{{% /tab %}}
{{% tab "ECS" %}}

To configure this check for an Agent running on ECS:

Set [Autodiscovery Integrations Templates][1] as Docker labels on your application container:

```json
{
  "containerDefinitions": [{
    "name": "mysql",
    "image": "mysql:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"mysql\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"dbm\": \"true\", \"server\": \"<AWS_INSTANCE_ENDPOINT>\", \"user\": \"datadog\",\"pass\": \"<UNIQUEPASSWORD>\"}]"
    }
  }]
}
```

See the [Autodiscovery template variables documentation][2] to learn how to pass `<UNIQUEPASSWORD>` as an environment variable instead of a label.


[1]: /agent/docker/integrations/?tab=docker
[2]: /agent/faq/template_variables/
{{% /tab %}}
{{< /tabs >}}

## Validate

[Run the Agent's status subcommand][7] and look for `mysql` under the Checks section. Or visit the [Databases][8] page to get started!

## Troubleshooting

If you have installed and configured the integrations and Agent as described and it is not working as expected, see [Troubleshooting][9].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/basic_agent_usage#agent-overhead
[2]: /database_monitoring/data_collected/#sensitive-information
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html
[4]: https://dev.mysql.com/doc/refman/8.0/en/performance-schema.html
[5]: https://dev.mysql.com/doc/refman/8.0/en/creating-accounts.html
[6]: https://app.datadoghq.com/account/settings#agent
[7]: /agent/guide/agent-commands/#agent-status-and-information
[8]: https://app.datadoghq.com/databases
[9]: /database_monitoring/troubleshooting/#mysql
