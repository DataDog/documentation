---
aliases:
- och-2qd-98m
- /security_monitoring/default_rules/och-2qd-98m
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.4
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: SQL database instance uses SSL for all incoming connections
type: security_rules
---

## Description
It is recommended to enforce all incoming connections to SQL database instances to use SSL.

## Rationale
SQL database connections, if successfully trapped (MITM), can reveal sensitive data like
credentials, database queries, query outputs, and so on. For security, it is recommended to always
use SSL encryption when connecting to your instance. This recommendation is applicable
to PostgreSQL, MySQL generation 1, MySQL generation 2, and SQL Server 2017 instances.

### Additional Information
By default, `Settings: ipConfiguration` has no `authorizedNetworks` set or configured. In
that case, even if `requireSSL` is not set by default, which is equivalent to `requireSSL:false`,
there is no risk as the instance cannot be accessed outside of the network, unless
`authorizedNetworks` is configured. However, if the default for `requireSSL` is not updated to
`true`, any `authorizedNetworks` created later on will not enforce SSL-only connections.

### Impact
After enforcing SSL connections, the existing client will not be able to communicate with the SQL
server, unless it is configured with appropriate client-certificates to communicate to the SQL
database instance.

### Default Value
By default, the parameter `settings: ipConfiguration: requireSSL` is not set, which is
equivalent to `requireSSL:false`.

## Remediation

### From the console
1. Go to the [Cloud SQL Instances page][1].
2. Click on an instance name to see its configuration overview.
3. In the left-side panel, select **Connections**.
4. In the SSL connections section, click **Allow only SSL connections**.
5. Under Configure SSL server certificates, click **Create new certificate**.
6. Under Configure SSL client certificates, click **Create a client certificate**.
7. Follow the instructions shown to learn how to connect to your instance.

### From the command line
To enforce SSL encryption for an instance, run the command:
```
gcloud sql instances patch <INSTANCE_NAME> --require-ssl
```

**Note:** A **restart** is required for type MySQL Generation 1 Instances (`backendType: FIRST_GEN`) for
this configuration to go into effect.

## References
1. [http://cloud.google.com/sql/docs/postgres/configure-ssl-instance/][2]

[1]: https://console.cloud.google.com/sql/instances
[2]: http://cloud.google.com/sql/docs/postgres/configure-ssl-instance/
