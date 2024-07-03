---
title: Upgrading to PostgreSQL 15 and higher
---

Run this command on each database host to enable the additional permission needed for the `datadog` user:

```SQL
ALTER ROLE datadog INHERIT;
```

{{< tabs >}}
{{% tab "RDS" %}}
Agent versions prior to `7.49` may be unable to connect to PostgreSQL RDS instances without a configuration change. New RDS instances have a default value of `1` for the `rds.force_ssl` parameter. In Agent versions prior to `7.49`, this causes the following error when the Agent tries to issue queries:

```
FATAL:  no pg_hba.conf entry for host "HOSTNAME", user "datadog", database "postgres", no encryption
```

To allow the Agent to connect with SSL, add the following setting to each instance config where `host` and `port` are specified:

```yaml
ssl: allow
```

Restart the agent after applying this change.
{{% /tab %}}
{{% tab "Google Cloud SQL" %}}
Agent versions prior to `7.50` may attempt to connect to the `cloudsqladmin` database. This can cause error logs on the database as well as warning logs in the Agent. In order to silence those logs, add `cloudsqladmin` to the [ignore_databases][1] list:

```yaml
ignore_databases:
  - template%
  - rdsadmin
  - azure_maintenance
  - cloudsqladmin
```

If using [database autodiscovery][2], also add `cloudsqladmin` to [excluded databases][3]:

```yaml
  exclude:
   - cloudsqladmin
```
[1]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L56-L64
[2]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L250
[3]: https://github.com/DataDog/integrations-core/blob/7.49.x/postgres/datadog_checks/postgres/data/conf.yaml.example#L277-L279
{{% /tab %}}
{{< /tabs >}}