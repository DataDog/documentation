---
title: Can I use a named instance in the SQL Server integration?
kind: faq
---

When connecting to a default instances in SQL Server, users specify the host name with the port (1433 by default) as the host value in the sqlserver.yaml file. When [troubleshooting connection issues with SQL Server][1], make sure we are connecting to a default instance or a named instance. Named instances can be connected using the $SERVER\$INSTANCE_NAME syntax, but only if the SQL Server Browser service is enabled since this service provides the port the instance is on.

Here are the docs from Microsoft with more about the SQL Server Browser service:
```
https://technet.microsoft.com/en-us/library/ms181087(v=sql.105).aspx#Anchor_2
```

The SQL Server Browser service is required to use named instances and this service is disabled by default. We highly recommend the approval of a sys admin before enabling [this service][2]).

Once the SQL Server Browser service has been enabled, you can configure the [sqlserver.yaml][3] file to connect to a named instance by designating the named instance in the host value. For example:

```yaml
instances:
  - host: $SERVER\$INSTANCENAME
```

[1]: /integrations/faq/connection-issues-with-the-sql-server-integration
[2]: https://technet.microsoft.com/en-us/library/ms165734(v=sql.90.aspx
[3]: https://github.com/DataDog/integrations-core/blob/5.17.x/sqlserver/conf.yaml.example#L61
