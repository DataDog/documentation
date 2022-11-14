---
aliases:
- 72b-35a-ngl
- /security_monitoring/default_rules/72b-35a-ngl
- /security_monitoring/default_rules/cis-gcp-1.3.0-6.6
disable_edit: true
integration_id: google_cloud_sql_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_cloud_sql_instance
title: SQL database instances do not have public IPs
type: security_rules
---

## Description: 
Datadog recommends configuring the second generation SQL instance to use private IPs instead of
public IPs.

## Rationale: 
To lower the organization's attack surface, ensure your Cloud SQL databases does not have public IPs.
Private IPs provide improved network security and lower latency for your application.

## Impact: 
Removing the public IP address on SQL instances may break applications that relied
on it for database connectivity.

## Remediation: 

### From the console
1. Go to the Cloud SQL Instances page in the Google Cloud Console:
[https://console.cloud.google.com/sql/instances][1]
2. Click the instance name to open its Instance details page.
3. Select the `Connections` tab.
4. Deselect the `Public IP` checkbox.
5. Click `Save` to update the instance.

### From the command line

1. For every instance, remove the public IP and assign a private IP instead:
   ```
   gcloud sql instances patch <INSTANCE_NAME> --network=<VPC_NETWORK_NAME> --no-assign-ip
   ```

2. Confirm the changes using the following command:
   ```
   gcloud sql instances describe <INSTANCE_NAME>
   ```

## Prevention:
To prevent new SQL instances from getting configured with public IP addresses, set up a
`Restrict Public IP access on Cloud SQL instances` Organization policy at:


[https://console.cloud.google.com/iam-admin/orgpolicies/sql-restrictPublicIp][2]

## Default value:
By default, Cloud Sql instances have a public IP.

## References:
1. [https://cloud.google.com/sql/docs/mysql/configure-private-ip][3]
2. [https://cloud.google.com/sql/docs/mysql/private-ip][4]
3. [https://cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints][5]
4. [https://console.cloud.google.com/iam-admin/orgpolicies/sql-restrictPublicIp][6]

## Additional information:
Replicas inherit their private IP status from their primary instance. You cannot configure a private IP directly on a replica.

[1]: https://console.cloud.google.com/sql/instances
[2]: https://console.cloud.google.com/iam-admin/orgpolicies/sql-restrictPublicIp
[3]: https://cloud.google.com/sql/docs/mysql/configure-private-ip
[4]: https://cloud.google.com/sql/docs/mysql/private-ip
[5]: https://cloud.google.com/resource-manager/docs/organization-policy/org-policy-constraints
[6]: https://console.cloud.google.com/iam-admin/orgpolicies/sql-restrictPublicIp
