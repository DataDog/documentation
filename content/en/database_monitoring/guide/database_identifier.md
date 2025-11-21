---
title: Identifying Databases for Database Monitoring
description: Understand how to identify your databases and hosts for DBM
aliases:
- /database_monitoring/database_identifier
further_reading:
- link: "/database_monitoring/"
  tag: "Documentation"
  text: "Database Monitoring"
- link: "/database_monitoring/data_collected/"
  tag: "Documentation"
  text: "Data Collected"
- link: "/database_monitoring/troubleshooting/"
  tag: "Documentation"
  text: "Troubleshooting"

---

## Database identifier
Each database instance that Datadog monitors has a unique identifier. For Postgres, MySQL, SQL Server, and Oracle, use the `database_identifier.template` path in the integration configuration to define instance identifiers.

The default value for `database_identifier.template` is `$resolved_hostname`, which uses the resolved hostname of the database host as the identifier. 
**Note**: The resolved hostname is usually the same as the specified connection `host`. In other cases, for example, if `host` is set to`localhost`, `$resolved_hostname` resolves to the actual hostname.

Most users do not need to change the default value. Changing the value of `template` is primarily useful when multiple database instances are hosted on one machine.

Each distinct instance identifier is billed as a host for Database Monitoring.

## Reported hostname
The `reported_hostname` configuration allows users to override the automatic resolution of `host` for a single database instance. This is useful when connecting to a database through a proxy to maintain the association between the Database Monitoring database instance and any available metrics for the database host.


## Examples

Multiple Postgres instances on one host, each on a different port:
```
database_identifier:
  template: $resolved_hostname:$port
```

SQL Server host with multiple instances:
```
database_identifier:
  template: $resolved_hostname/$instance_name
```

Azure pool with each database monitored separately ([requires 7.68+](https://github.com/DataDog/integrations-core/blob/7.68.x/sqlserver/assets/configuration/spec.yaml#L101)):
```
database_identifier:
  template: $azure_name/$database
```

A MySQL host called `mydatabase.com.local` running in multiple environments, where each is tagged with `env`, would use the following configuration to create database instances named `prod-mydatabase.com.local` and `staging-mydatabase.com.local`:
```
database_identifier:
  template: $env-$resolved_hostname
```

Connecting to an Oracle database with multiple CDBs through a proxy:
```
reported_hostname: my-oracle.mydomain.com
database_identifier:
  template: $resolved_hostname\$cdb_name
```
