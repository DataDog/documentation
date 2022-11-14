---
aliases:
- 199-0rs-25a
- /security_monitoring/default_rules/199-0rs-25a
- /security_monitoring/default_rules/cis-gcp-1.3.0-4.3
disable_edit: true
integration_id: google_compute_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_compute_instance
title: Block project-wide SSH keys is enabled for VM instances
type: security_rules
---

## Description

Datadog recommends using instance-specific SSH key(s) instead of common or shared project-wide SSH key(s) to access instances.

## Rationale

Project-wide SSH keys are stored in compute or project-meta-data. Project-wide SSH keys can be used to log into all instances within a project. Using project-wide SSH keys facilitates SSH key management, but if compromised, poses a security risk which can impact all instances within a project. Datadog recommmends using instance-specific SSH keys, which can limit the attack surface if SSH keys are compromised.

## Impact

Users already having project-wide SSH key pairs and are using third-party SSH clients will lose access to the impacted instances. For project users using Google Cloud or GCP Console-based SSH options, no manual key creation and distribution is required, this is all handled by Google Compute Engine (GCE) itself. To access an instance using third-party SSH clients, the instance-specific SSH key pairs need to be created and distributed to the required users.

## Remediation

## From Console

1. In the Google Cloud Console, navigate to [VM Instances page][1], which lists all instances in your project.
2. For every instance, click on the instance name.
3. Under **SSH Keys**, ensure **Block project-wide SSH keys** is selected.

## From the command line

1. List the instances in your project and get details on each instance using `gcloud compute instances list --format=json`.

2. Ensure the `block-project-ssh-keys` key is set to true.

## Remediation

## From Console

1. In the Google Cloud Console, navigate to [VM Instances page][1], which lists all instances in your project.
2. Click on the impacted instance name.
3. Click **Edit** in the toolbar.
4. To block users with project-wide SSH keys from connecting to this instance, select **Block project-wide SSH keys** under **SSH Keys**.
5. Click **Save** at the bottom of the page.
6. Repeat these steps for every impacted instance.

## From Command Line

To block project-wide public SSH keys, set the metadata value to true using `gcloud compute instances add-metadata <INSTANCE_NAME> --metadata block-project-ssh-keys=TRUE`.

## Default Value

By default, Block Project-wide SSH keys is not enabled.

## References
1. [https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys][2]
2. [https://cloud.google.com/sdk/gcloud/reference/topic/formats][3]


## Additional Information

If OS Login is enabled, SSH keys in the instance metadata are ignored, which means you do not need to block project-wide SSH keys.

## CIS Controls

Version 8
 
3.10 - Encrypt Sensitive Data in Transit
- Encrypt sensitive data in transit. Example implementations can include: Transport
Layer Security (TLS) and Open Secure Shell (OpenSSH).

5.2 - Use Unique Passwords
- Use unique passwords for all enterprise assets. Best practice implementation
includes, at a minimum, an 8-character password for accounts using MFA and a 14-
character password for accounts not using MFA.

[1]: https://console.cloud.google.com/compute/instances
[2]: https://cloud.google.com/compute/docs/instances/adding-removing-ssh-keys][2]
[3]: https://cloud.google.com/sdk/gcloud/reference/topic/formats][3]
