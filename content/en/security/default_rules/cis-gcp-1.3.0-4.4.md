---
aliases:
- nc8-0lx-rbj
- /security_monitoring/default_rules/nc8-0lx-rbj
- /security_monitoring/default_rules/cis-gcp-1.3.0-4.4
disable_edit: true
integration_id: google_compute_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_compute_instance
title: OS Login is enabled for the project
type: security_rules
---

## Description
Enabling OS Login binds SSH certificates to IAM users and facilitates effective SSH certificate
management.

## Rationale
Enabling OS Login ensures that SSH keys used to connect to instances are mapped to IAM
users. Revoking access to an IAM user will revoke all the SSH keys associated with that
particular user. It facilitates centralized and automated SSH key pair management, which is
useful in handling cases like compromised SSH key pairs and/or revocation of
external, third-party, vendor users.

To use OS Login, the instance using Custom Images must have the latest version
of the Linux Guest Environment installed. The following image families do not
support OS Login:

   - Project cos-cloud (Container-Optimized OS) image family cos-stable.
   - All project coreos-cloud (CoreOS) image families
   - Project suse-cloud (SLES) image family sles-11
   - All Windows Server and SQL Server image families

The project's `enable-oslogin` can be overridden by setting the `enable-oslogin` parameter to an
instance metadata individually.

### Impact
Enabling OS Login on a project disables metadata-based SSH key configurations on all
instances of a project. Disabling OS Login restores SSH keys that you have configured in a
project's or an instance's metadata.

### Exception
VMs created by GKE should be excluded. These VMs have names that start with `gke-`
and are labeled `goog-gke-node`.

### Default value
By default, the parameter `enable-oslogin` is not set, which is equivalent to setting it to `FALSE`.

## Remediation

### From the console

1. Go to the [VM compute metadata][1] page.
2. Click **Edit**.
3. Add a metadata entry for the key `enable-oslogin` with the value `TRUE`.
4. Click **Save** to apply the changes.
5. For every instance that overrides the project setting, go to the VM Instance's page at 
    https://console.cloud.google.com/compute/instances.
6. Click the name of the instance from which you want to remove the metadata value.
7. At the top of the instance's details page, click **Edit** to edit the instance's settings.
8. Under Custom Metadata, remove any entries with the key `enable-oslogin` set to `FALSE`.
9. At the bottom of the instance's details page, click **Save** to apply your changes to the instance.

### From the command line

1. Configure OS Login for the project by running the following command:
   ```
   gcloud compute project-info add-metadata --metadata enable-oslogin=TRUE
   ```

2. Use the following command to remove instance metadata that overrides the project setting:
   ```
   gcloud compute instances remove-metadata <INSTANCE_NAME> --keys=enable-oslogin
   ```

Optionally, you can enable two-factor authentication for OS Login. See [Setting up OS Login with 2-step verification ][2] for more information.

## References
1. [https://cloud.google.com/compute/docs/instances/managing-instance-access][3]
2. [https://cloud.google.com/compute/docs/instances/managing-instance-access#enable_oslogin][4]
3. [https://cloud.google.com/sdk/gcloud/reference/compute/instances/remove-metadata][5]
4. [https://cloud.google.com/compute/docs/oslogin/setup-two-factor-authentication][2]



[1]: https://console.cloud.google.com/compute/metadata
[2]: https://cloud.google.com/compute/docs/oslogin/setup-two-factor-authentication
[3]: https://cloud.google.com/compute/docs/instances/managing-instance-access
[4]: https://cloud.google.com/compute/docs/instances/managing-instance-access#enable_oslogin
[5]: https://cloud.google.com/sdk/gcloud/reference/compute/instances/remove-metadata
