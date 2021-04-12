---
aliases:
- 8sx-i8v-y8v
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: kms
security: compliance
source: kms
title: Rotation for customer created CMKs is enabled
type: security_rules
---

## Description

AWS Key Management Service (KMS) allows customers to rotate the backing key, the key material stored within the KMS. The KMS connects o the key ID of the customer created customer master key (CMK). This backing key is used to perform cryptographic operations such as encryption and decryption. Automatic key rotation currently retains all prior backing keys so that encrypted data can be decrypted transparently. You should enable CMK key rotation.

## Rationale

Rotating encryption keys helps reduce the potential impact of a compromised key as data encrypted with a new key cannot be accessed with a previous key that may have been exposed.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default Value

None

## References

1. [https://aws.amazon.com/kms/pricing/][2] 
2. [http://csrc.nist.gov/publications/nistpubs/800-57/sp800-57_part1_rev3_general.pdf][3] 
3. CCE-78920-6

## CIS Controls

6 Maintenance, Monitoring, and Analysis of Audit Logs

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-2.8
[2]: https://aws.amazon.com/kms/pricing/
[3]: http://csrc.nist.gov/publications/nistpubs/800-57/sp800-57_part1_rev3_general.pdf
