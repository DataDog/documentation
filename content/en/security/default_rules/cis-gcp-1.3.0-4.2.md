---
aliases:
- buj-j64-53a
- /security_monitoring/default_rules/buj-j64-53a
- /security_monitoring/default_rules/cis-gcp-1.3.0-4.2
disable_edit: true
integration_id: google_compute_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_compute_instance
title: Instances are not configured to use the default service account with full access
  to all cloud APIs
type: security_rules
---

## Description
To support the principle of least privileges and to prevent potential privilege escalation, assign instances to a service account other than the default `Compute Engine default service account` with Scope `Allow full access to all Cloud APIs`.

## Rationale
The Google `Compute Engine default service account` for an instance can access necessary cloud services, as well as create, manage, and use user-managed custom service accounts. The `Project Editor` role is assigned to `Compute Engine default service account` so it has almost all capabilities over all cloud services except billing. However, when `Compute Engine default service account` is assigned to an instance it can operate in three scopes:

1. Allow default access: Allows the minimum access required to run an
instance (least privileges).

2. Allow full access to all Cloud APIs: Allows full access to all cloud
APIs and services (too much access).

3. Set access for each API: Allows an instance administrator to choose only
those APIs that are needed to perform the specific business functionality
expected by instance.

When an instance is configured with the `Compute Engine default service account` with
scope `Allow full access to all Cloud APIs`, depending on the IAM roles assigned to the users
accessing the instance, it may allow users to perform cloud operations and API calls that they are not
supposed to perform, leading to successful privilege escalation.

## Exception
VMs created by GKE are excluded from this rule. These VMs have names that start with `gke-` and are labeled `goog-gke-node`.

## Impact
To change a service account or scope for an instance, the instance must be stopped.

## Remediation

### From the console
1. Go to the `VM instances` page by visiting:
[https://console.cloud.google.com/compute/instances][1].
2. Click on the impacted VM instance.
3. If the instance is not stopped, click the `Stop` button. Wait for the instance to stop.
4. Click the `Edit` button.
5. Scroll down to the `Service Account` section.
6. Select a different service account or ensure that `Allow full access to all Cloud APIs` is not selected.
7. Click the `Save` button to save your changes and then click `START`.

### From the command line
1. Stop the instance:
   ```
   gcloud compute instances stop <INSTANCE_NAME>
   ```
2. Update the instance:
   ```
   gcloud compute instances set-service-account <INSTANCE_NAME> --service-account=<SERVICE_ACCOUNT> --scopes [SCOPE1, SCOPE2...]
   ```
3. Restart the instance:
   ```
   gcloud compute instances start <INSTANCE_NAME>
   ```

## Default value
By default, Compute instances are configured to use the default Compute Engine service
account.

## References
1. [https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances][2]
2. [https://cloud.google.com/compute/docs/access/service-accounts][3]

## Additional Information:
- User IAM roles override service account scope, but configuring minimal scope
ensures a deeper defence.
- Non-default service accounts do not offer selection of access scopes like the default
service account does. Use IAM roles with non-default service accounts to
control VM access.

## CIS Controls

Version 8 - 4.7: Manage Default Accounts on Enterprise Assets and Software
- Manage default accounts on enterprise assets and software, such as root,
administrator, and other pre-configured vendor accounts. Example implementations
can include: disabling default accounts or making them unusable.

Version 7 - 4.7 Limit Access to Script Tools
- Limit access to scripting tools (such as Microsoft PowerShell and Python) to only
administrative or development users with the need to access those capabilities.


[1]: https://console.cloud.google.com/compute/instances
[2]: https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances
[3]: https://cloud.google.com/compute/docs/access/service-accounts
