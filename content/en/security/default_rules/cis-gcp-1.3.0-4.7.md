---
aliases:
- 16j-g9v-8c8
- /security_monitoring/default_rules/16j-g9v-8c8
- /security_monitoring/default_rules/cis-gcp-1.3.0-4.7
disable_edit: true
integration_id: google_compute_disk
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_compute_disk
title: VM disks for critical VMs are encrypted with customer-supplied encryption keys
  (CSEK)
type: security_rules
---

## Description
Customer-Supplied Encryption Keys (CSEK) are a feature in Google Cloud Storage and
Google Compute Engine. If you supply your own encryption keys, Google uses your key to
protect the Google-generated keys used to encrypt and decrypt your data. By default,
Google Compute Engine encrypts all data at rest. Compute Engine handles and manages
this encryption for you without any additional actions on your part. However, if you
wanted to control and manage this encryption yourself, you can provide your own
encryption keys.

### Default value
By default, VM disks are encrypted with Google-managed keys. They are not encrypted
with `Customer-Supplied` Encryption Keys.

## Rationale
By default, Google Compute Engine encrypts all data at rest. Compute Engine handles and
manages this encryption for you without any additional actions on your part. However, if
you wanted to control and manage this encryption yourself, you can provide your own
encryption keys.
If you provide your own encryption keys, Compute Engine uses your key to protect the
Google-generated keys used to encrypt and decrypt your data. Only users who can provide
the correct key can use resources protected by a customer-supplied encryption key.
Google does not store your keys on its servers and cannot access your protected data
unless you provide the key. This also means that if you forget or lose your key, there is no
way for Google to recover the key or to recover any data encrypted with the lost key.
Business critical VMs should have VM disks encrypted with CSEK.

### Impact
If you lose your encryption key, you will not be able to recover the data.

## Remediation
You cannot update the encryption of an existing disk. Therefore, you
should create a new disk with encryption set to **Customer supplied**.

### From the console 
1. Go to [Compute Engine Disks][1] in your Google Cloud console.
2. Click **CREATE DISK**.
3. Set **Encryption type** to `Customer supplied`.
4. Provide the **Key** in the box.
5. Select **Wrapped key**.
6. Click **Create**.

### From the command line
You can use the `gcloud` CLI to encrypt a disk using the `--csek-key-file` flag during instance
creation. If you are using an RSA-wrapped key, use the gcloud beta component. See [RSA key wrapping][5] in Google's Compute Engine documentation.
```
gcloud compute instances create <INSTANCE_NAME> --csek-key-file <example-
file.json>
```

To encrypt a standalone persistent disk:
```
gcloud compute disks create <DISK_NAME> --csek-key-file <example-file.json>
```

## References
1. [https://cloud.google.com/compute/docs/disks/customer-supplied-encryption#encrypt_a_new_persistent_disk_with_your_own_keys][2]
2. [https://cloud.google.com/compute/docs/reference/rest/v1/disks/get][3]
3. [https://cloud.google.com/compute/docs/disks/customer-supplied-encryption#key_file][4]

[1]: https://console.cloud.google.com/compute/disks
[2]: https://cloud.google.com/compute/docs/disks/customer-supplied-encryption#encrypt_a_new_persistent_disk_with_your_own_keys
[3]: https://cloud.google.com/compute/docs/reference/rest/v1/disks/get
[4]: https://cloud.google.com/compute/docs/disks/customer-supplied-encryption#key_file
[5]: https://cloud.google.com/compute/docs/disks/customer-supplied-encryption#rsa-encryption
