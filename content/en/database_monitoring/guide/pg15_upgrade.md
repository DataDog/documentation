---
title: Upgrading to PostgreSQL 15 on RDS
kind: guide
---

For PostgreSQL 15 RDS instances, AWS changed the default value of the `rds.force_ssl` parameter. On agent versions prior to 7.49, this will cause the following error when the agent tries to issue queries:

```
FATAL:  no pg_hba.conf entry for host "HOSTNAME", user "datadog", database "postgres", no encryption
```

To allow the agent to connect via SSL, add the following setting to the instance config where host and port are specified:

```yaml
ssl: allow
```
