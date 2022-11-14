---
aliases:
- mk4-lz1-nc0
- /security_monitoring/default_rules/mk4-lz1-nc0
- /security_monitoring/default_rules/cis-gcp-1.3.0-7.2
disable_edit: true
integration_id: google_bigquery_table
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_bigquery_table
title: All BigQuery tables are encrypted with customer-managed encryption keys (CMEK)
type: security_rules
---

## Description
By default, BigQuery encrypts data at rest by employing `Envelope Encryption` using
Google managed cryptographic keys. The data is encrypted using the `data encryption keys` and data encryption keys themselves are further encrypted using `key encryption keys`. This is done automatically and does not require any additional input from the user. However, if you want to have greater control, customer-managed encryption keys (CMEK) can be used as an encryption key management solution for BigQuery datasets. If CMEK is used, the CMEK is used to encrypt the data encryption keys, instead of using google-managed encryption keys.

### Default Value
Google-managed keys are used as `key encryption keys`.

## Rationale
For greater control over the encryption, customer-managed encryption keys (CMEK) can
be used as encryption key management solution for BigQuery tables. CMEK is used to
encrypt the data encryption keys instead of using google-managed encryption keys.
BigQuery stores the table and CMEK association. The encryption/decryption is done
automatically.

Apply the default customer-managed keys on BigQuery datasets to ensure that all
new tables created in the future will be encrypted using CMEK. However, existing tables need to be updated individually to use CMEK.

## Impact
Using customer-managed encryption keys (CMEK) will incur additional labor-hour
investment to create, protect, and manage the keys.

- Note: Google does not store your keys on its servers and cannot access your
protected data unless you provide the key. This also means that if you forget
or lose your key, there is no way for Google to recover the key or to recover
any data encrypted with the lost key.

## Remediation
Currently, there is no way to update the encryption of existing data in the table. The data
needs to be copied to either an original table or another table. Either option requires the specification of the
customer managed encryption key (CMEK).

### From the command line
Use the following command to copy the data to the original table and encrypt it with the CMEK. The source and the destination needs to be same when copying to the original table.

```
bq cp --destination_kms_key <customer_managed_key> source_dataset.source_table destination_dataset.destination_table
```


## References
1. [https://cloud.google.com/bigquery/docs/customer-managed-encryption][1]

[1]: https://cloud.google.com/bigquery/docs/customer-managed-encryption
