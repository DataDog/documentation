---
aliases:
- a7c-i41-8z6
- /security_monitoring/default_rules/a7c-i41-8z6
- /security_monitoring/default_rules/cis-gcp-1.3.0-1.10
disable_edit: true
integration_id: google_kms_crypto_key
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_kms_crypto_key
title: KMS Encryption Keys are rotated within a period of 90 days
type: security_rules
---

## Description
Google Cloud Key Management Service stores cryptographic keys in a hierarchical structure designed for useful and elegant access control management.
The format for the rotation schedule depends on the client library that is used. For the gcloud CLI, the flag `--next-rotation-time` must be in ISO or RFC3339 format; the flag `--rotation-period` must be in the format `INTEGER[UNIT]`, where units can be one of: seconds (s), minutes (m), hours (h), or days (d). For example, `30d` for a rotation period of 30 days.

## Rationale
Set a key rotation period and starting time. A key can be created with a specified *rotation period*, which is the time between when new key versions are generated automatically. A key can also be created with a specified *next rotation time*. 

A key is a named object that represents a cryptographic key and is used for a specific purpose. The key material (the actual bits used for encryption) can change over time as new key versions are created.
A key is used to protect a *corpus of data*. A collection of files could be encrypted with the same key, and people with `decrypt` permissions on that key would be able to decrypt those files. Therefore, it's necessary to make sure the rotation period is set to a specific time.

## Impact
After a successful key rotation, the older key version is required to decrypt the data encrypted by the previous key version.

## Remediation

### From the console
1. See your cryptographic keys by visiting: [https://console.cloud.google.com/security/kms][1].
2. Click on the specific key ring.
3. From the list of keys, locate the key you wish to edit. Click on the three vertical dots under the **Actions** column.
4. Click on **Edit rotation period**.
5. In the pop-up window, select a new rotation period. Choose value less than 90 days. Then, choose the date from which the rotation period begins.

### From the command line
1. Update and schedule rotation by `ROTATION_PERIOD` and `NEXT_ROTATION_TIME` for each key:
   For example, you can use the iam.json file shown below as follows:
   ```
    gcloud kms keys update new --keyring=KEY_RING --location=LOCATION --next- rotation-time=NEXT_ROTATION_TIME --rotation-period=ROTATION_PERIOD
    ```

## Default value
By default, KMS encryption keys are rotated every 90 days.

## References
1. [https://cloud.google.com/kms/docs/key-rotation#frequency_of_key_rotation][2]
2. [https://cloud.google.com/kms/docs/re-encrypt-data][3]


## Additional Information
A user-managed key cannot be created on GCP-Managed Service Accounts.

[1]: https://console.cloud.google.com/security/kms
[2]: https://cloud.google.com/kms/docs/key-rotation#frequency_of_key_rotation
[3]: https://cloud.google.com/kms/docs/re-encrypt-data
