---
title: Upgrading to PostgreSQL 15 on RDS
kind: guide
---

Agent versions prior to `7.49` may be unable to connect to PostgreSQL RDS instances without a configuration change. New RDS instances have a default value of `1` for the `rds.force_ssl` parameter. In Agent versions prior to `7.49`, this causes the following error when the Agent tries to issue queries:

```
FATAL:  no pg_hba.conf entry for host "HOSTNAME", user "datadog", database "postgres", no encryption
```

To allow the Agent to connect with SSL, add the following setting to each instance config where `host` and `port` are specified:

```yaml
ssl: allow
```
