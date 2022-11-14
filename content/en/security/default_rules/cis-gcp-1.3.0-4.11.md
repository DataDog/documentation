---
aliases:
- 5d3-98j-3ls
- /security_monitoring/default_rules/5d3-98j-3ls
- /security_monitoring/default_rules/cis-gcp-1.3.0-4.11
disable_edit: true
integration_id: google_compute_instance
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_compute_instance
title: Compute instances have confidential computing enabled
type: security_rules
---

## Description

Google Cloud encrypts both stored and in-transit data, but customer data needs to be decrypted while it is processed. Confidential Computing is a Google technology that protects data by encrypting it while it is in use. Confidential Computing environments keep data encrypted in memory and elsewhere outside the central processing unit (CPU).

Confidential VMs leverage the Secure Encrypted Virtualization (SEV) feature of AMD
EPYCTM CPUs, keeping customer data encrypted while it is used, indexed, queried, or
trained on. Encryption keys are generated in hardware, per VM, and not exportable. There is no significant performance penalty to Confidential Computing workloads because of built-in hardware optimizations.

## Rationale

Confidential Computing enables customers' sensitive code and other data to be encrypted in
memory during processing. Google does not have access to the encryption keys.
Confidential VMs can help alleviate concerns about risk related to either dependency on
Google infrastructure or Google insiders' access to customer data in the clear.

## Impact

- Confidential Computing for Compute instances does not support live migration. Unlike regular Compute instances, Confidential VMs experience disruptions during maintenance events like a software or hardware update.

- Additional charges may be incurred when enabling this security feature. See [https://cloud.google.com/compute/confidential-vm/pricing][1] for more info.

## Remediation

Confidential Computing can only be enabled when an instance is created. You must delete
the current instance and create a new one.

### From the console

1. Go to the VM instances page by visiting: [https://console.cloud.google.com/compute/instances][2].
2. Click **Create instance**.
3. Fill out the desired configuration for your instance.
4. Under the **Confidential VM service** section, click **Enable** > **Enable** to enable the Confidential Computing service on this VM instance.
5. Click **Create**.

### From the command line

Create a new instance with Confidential Compute enabled.

   ```
   gcloud beta compute instances create <INSTANCE_NAME> --zone <ZONE> --confidential-compute --maintenance-policy=TERMINATE
   ```
## Default Value

By default, Confidential Computing is disabled for Compute instances.

## References

1. [https://cloud.google.com/compute/confidential-vm/docs/creating-cvm-instance][3]
2. [https://cloud.google.com/compute/confidential-vm/docs/about-cvm][4]
3. [https://cloud.google.com/confidential-computing][5]
4. [https://cloud.google.com/blog/products/identity-security/introducing-google-cloud-confidential-computing-with-confidential-vms][6]

## CIS Controls

Version 8 - 3.11: Encrypt Sensitive Data at Rest
- Encrypt sensitive data at rest on servers, applications, and databases containing sensitive data. Storage-layer encryption, also known as server-side encryption, meets the minimum requirement of this Safeguard. Additional encryption methods may include application-layer encryption, also known as client-side encryption, where access to the data storage device(s) does not permit access to the plain-text data.

Version 7 - 14.8: Encrypt Sensitive Information at Rest
- Encrypt all sensitive information at rest using a tool that requires a secondary authentication mechanism not integrated into the operating system, in order to access the information.

[1]: https://cloud.google.com/compute/confidential-vm/pricing
[2]: https://console.cloud.google.com/compute/instances
[3]: https://cloud.google.com/compute/confidential-vm/docs/creating-cvm-instance
[4]: https://cloud.google.com/compute/confidential-vm/docs/about-cvm
[5]: https://cloud.google.com/confidential-computing
[6]: https://cloud.google.com/blog/products/identity-security/introducing-google-cloud-confidential-computing-with-confidential-vms
