---
title: Identifying Databases for Database Monitoring
description: Understand how to identify your databases and hosts for DBM
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
Each database instance monitored with Datadog has a unique identifier. For Postgres, MySQL, SQL Server and Oracle this identifier can be configured using the `database_identifier.template` path in the integration configuration.

The default value for this is `$resolved_hostname`, which identifies the database with the resolved hostname of its host. This is typically the same as the specified connection `host`, but for example, if `host` is `localhost` then `$resolved_hostname` will be the `hostname` of the host.

Most users can leave this option as the default. Changing the value of `template` is primarily useful when multiple database instances are hosted on one machine.

| Each distinct instance identifier is billed as a host for Database Monitoring.

## Reported hostname
The `reported_hostname` configuration allows users to override the automatic resolution of `host` for a single database instance. This is useful when connecting to a database through a proxy to maintain the association between the DBM databse instance and any available metrics for the database host.


## Examples

Multiple Postgres instances on one host each on a different port:
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

MySQL instance with the same hostname running in multiple environments, where each is tagged with `env`. For example, `mydatabase.com.local` on `env:prod` and `env:staging` would use:
```
database_identifier:
  template: $env-$resolved_hostname
```
to create database instances named `prod-mydatabase.com.local` and `staging-mydatabase.com.local`.

Connecting to an Oracle database with multiple CDBs through a proxy:
```
reported_hostname: my-oracle.mydomain.com
database_identifier:
  template: $resolved_hostname\$cdb_name
```
