---
aliases:
- 91b-86t-ogl
- /security_monitoring/default_rules/91b-86t-ogl
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.5
disable_edit: true
integration_id: google_sql_database_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_sql_database_instance
title: SQL Database Instances do not implicitly accept all public IP addresses
type: security_rules
---

## Description: 
A database server should accept connections only from trusted networks and IPs and
restrict access from public IP addresses.

## Rationale: 
To minimize attack surface on a database server instance, only trusted, known, and
required IPs should be allowed to connect to it.
An authorized network should not have IPs or networks configured to `0.0.0.0/0` which
allows access to the instance from anywhere in the world. Authorized networks
apply only to instances with public IPs.

## Impact: 
The Cloud SQL database instance would not be available to public IP addresses.

## Remediation: 

### From the console
1. Go to the Cloud SQL Instances page in the Google Cloud Console by visiting [https://console.cloud.google.com/sql/instances][1].
2. Click the instance name to open its `Instance details` page.
3. Under the `Configuration` section click `Edit configurations`.
4. Under `Configuration options` expand the `Connectivity` section.
5. Click the `delete` icon for the authorized network `0.0.0.0/0`.
6. Click `Save` to update the instance.

### From the command line
Update the authorized network list by removing addresses:
```
gcloud sql instances patch <INSTANCE_NAME> --authorized-networks=IP_ADDR1,IP_ADDR2...
```
## Prevention:
To prevent new SQL instances from being configured to accept incoming connections from
any IP addresses, set up a `Restrict Authorized Networks on Cloud SQL instances` Organization Policy at: [https://console.cloud.google.com/iam-admin/orgpolicies/sql-restrictAuthorizedNetworks][2].


## Default value:
By default, authorized networks are not configured. Remote connection to Cloud SQL
database instance is not possible unless authorized networks are configured.

## References:
1. [https://cloud.google.com/sql/docs/mysql/configure-ip][3]
2. [https://console.cloud.google.com/iam-admin/orgpolicies/sql-restrictAuthorizedNetworks][4] 
3. [https://cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints][5]
4. [https://cloud.google.com/sql/docs/mysql/connection-org-policy][6]


## Additional information:
There is no IPv6 configuration found for Google cloud SQL server services.

[1]: https://console.cloud.google.com/sql/instances
[2]: https://console.cloud.google.com/iam-admin/orgpolicies/sql-restrictAuthorizedNetworks
[3]: https://cloud.google.com/sql/docs/mysql/configure-ip
[4]: https://console.cloud.google.com/iam-admin/orgpolicies/sql-restrictAuthorizedNetworks
[5]: https://cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints
[6]: https://cloud.google.com/sql/docs/mysql/connection-org-policy
