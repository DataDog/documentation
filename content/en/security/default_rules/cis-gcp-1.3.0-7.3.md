---
aliases:
- omz-ka1-nfl
- /security_monitoring/default_rules/omz-ka1-nfl
- /security_monitoring/default_rules/cis-gcp-1.3.0-7.3
disable_edit: true
integration_id: google_bigquery_dataset
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: google_bigquery_dataset
title: A default customer-managed encryption key (CMEK) is specified for the BigQuery
  data set
type: security_rules
---

## Description
By default, BigQuery uses envelope encryption with Google-managed cryptographic keys to encrypt the data at rest. The data is encrypted using _data encryption keys_, and the data encryption keys themselves are further encrypted using _key encryption keys_. This is seamless and does not require any additional input from the user. For greater control, _customer-managed encryption keys_ (CMEKs) can be used as an encryption key management solution for BigQuery datasets.

### Default Value
Google-managed keys are used as key encryption keys.

## Rationale
By default, BigQuery uses envelope encryption with Google-managed cryptographic keys to encrypt the data at rest. The data is encrypted using _data encryption keys_, and the data encryption keys themselves are further encrypted using _key encryption keys_. This is seamless and does not require any additional input from the user.

For greater control, CMEKs can be used as an encryption key management solution for BigQuery datasets. Setting a default CMEK for a dataset ensures that any tables created in the future will use the specified CMEK, if no others are provided.

## Impact
Using CMEKs incurs an additional labor-hour
investment to create, protect, and manage the keys.

**Note**: Google does not store your keys on its servers and cannot access your
protected data unless you provide the key. This also means that if you forget
or lose your key, there is no way for Google to recover the key or to recover
any data encrypted with the lost key.

# Remediation
To update the default CMEK for existing data sets, specify the default key in the `EncryptionConfiguration.kmsKeyName` field when calling the `datasets.insert` or `datasets.patch` methods.


## References
1. [https://cloud.google.com/bigquery/docs/customer-managed-encryption][1]

[1]: https://cloud.google.com/bigquery/docs/customer-managed-encryption
