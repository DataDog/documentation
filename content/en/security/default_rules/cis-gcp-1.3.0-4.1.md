---
aliases:
- b32-i3a-85d
- /security_monitoring/default_rules/b32-i3a-85d
- /security_monitoring/default_rules/cis-gcp-1.3.0-4.1
disable_edit: true
integration_id: google_compute_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_compute_instance
title: Instances are not configured to use the default service account
type: security_rules
---

## Description
Configure your instance to use an account other than the default Compute Engine service account, because it has the Editor role on the project.

## Rationale
The default Compute Engine service account has the Editor role on the project, which allows read and write access to most Google Cloud Services. 
To defend against privilege escalations if your VM is compromised and prevent an attacker from gaining access to all of your project, it is recommended that you not use the default Compute Engine service account. Instead, create a new service account and assign only the permissions needed by your instance. 
The default Compute Engine service account is named `[PROJECT_NUMBER]-compute@developer.gserviceaccount.com`.

## Exception
VMs created by GKE are excluded from this guidance. These VMs have names that start with `gke-` and are labeled `goog-gke-node`.

## Remediation

### From the console
1. Go to the `VM instances` page by visiting:
[https://console.cloud.google.com/compute/instances][1].
2. Click on the instance name to go to its `VM instance details` page.
3. Click `STOP` and then click `EDIT`.
4. Under the section `API and identity management`, select a service account other
than the default Compute Engine service account. You may first need to create a new
service account.
5. Click `Save` and then click `START`.

### From the command line
1. Stop the instance:
    ```
    gcloud compute instances stop <INSTANCE_NAME>
    ```
2. Update the instance:
    ```
    gcloud compute instances set-service-account <INSTANCE_NAME> --service-account=<SERVICE_ACCOUNT>
    ```
3. Restart the instance:
    ```
    gcloud compute instances start <INSTANCE_NAME>
    ```

## Default value
By default, Compute instances are configured to use the default Compute Engine service
account.

## References
1. [https://cloud.google.com/compute/docs/access/service-accounts][2]
2. [https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances][3]
3. [https://cloud.google.com/sdk/gcloud/reference/compute/instances/set-service-account][4]


## CIS Controls

Version 8 - 4.7: Manage Default Accounts on Enterprise Assets and Software
- Manage default accounts on enterprise assets and software, such as root,
administrator, and other pre-configured vendor accounts. Example implementations
can include: disabling default accounts or making them unusable.

Version 7 - 4.7 Limit Access to Script Tools
- Limit access to scripting tools (such as Microsoft PowerShell and Python) to only
administrative or development users with the need to access those capabilities.


[1]: https://console.cloud.google.com/compute/instances
[2]: https://cloud.google.com/compute/docs/access/service-accounts
[3]: https://cloud.google.com/compute/docs/access/create-enable-service-accounts-for-instances
[4]: https://cloud.google.com/sdk/gcloud/reference/compute/instances/set-service-account
