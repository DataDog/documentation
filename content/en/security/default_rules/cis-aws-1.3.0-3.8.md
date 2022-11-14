---
aliases:
- 8sx-i8v-y8v
- /security_monitoring/default_rules/8sx-i8v-y8v
- /security_monitoring/default_rules/cis-aws-1.3.0-3.8
disable_edit: true
integration_id: kms
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
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

## Default value

None

## References

1. [https://aws.amazon.com/kms/pricing/][2]
2. [http://csrc.nist.gov/publications/nistpubs/800-57/sp800-57_part1_rev3_general.pdf][3]
3. CCE-78920-6

## CIS controls

Version 7, 6 - Maintenance, Monitoring, and Analysis of Audit Logs

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: https://aws.amazon.com/kms/pricing/
[3]: http://csrc.nist.gov/publications/nistpubs/800-57/sp800-57_part1_rev3_general.pdf
