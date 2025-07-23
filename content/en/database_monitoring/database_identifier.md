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

The default value for this is `$reported_hostname`, which identifies the database with the resolved hostname of its host. Most users can leave this option as the default. Changing the value is primarily useful when multiple database instances are hosted on one machine.

| When setting a non-default value for the database identifier, each distinct instance identifier is billed as a host for Database Monitoring.

## Reported hostname
The `reported_hostname` configuration allows users to override the automatic resolution of `host` for a single database instance. This is useful when connecting to a database through a proxy, or when host resolution produces a different name than the one associated with the Datadog infrastructure host.


## Examples

Multiple Postgres instances each on different port:
```
database_identifier:
  template: $resolved_hostname:$port
```

SQL Server host with multiple instances:
```
database_identifier:
  template: $resolved_hostname:$instance_name
```

<!-- In 7.67 there will be new template variables and this can be updated to $azure_name/$database -->
Azure pool:
```
database_identifier:
  template: my-pool-name/my-database
```

MySQL instance with the same hostname running in multiple environments:
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
