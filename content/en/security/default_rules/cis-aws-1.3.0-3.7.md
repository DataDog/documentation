---
aliases:
- yg4-3in-tkd
- /security_monitoring/default_rules/yg4-3in-tkd
- /security_monitoring/default_rules/cis-aws-1.3.0-3.7
disable_edit: true
integration_id: cloudtrail
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: cloudtrail
title: CloudTrail logs are encrypted at rest using KMS CMKs
type: security_rules
---

## Description

AWS CloudTrail is a web service that records AWS API calls for an account and makes those logs available to users and resources per IAM policies. AWS Key Management Service (KMS) is a managed service that helps create and control the encryption keys used to encrypt account data. It uses Hardware Security Modules (HSMs) to protect the security of encryption keys. Configure your CloudTrail logs to leverage server-side encryption (SSE), and KMS customer-created master keys (CMK) to further protect CloudTrail logs. You should set up CloudTrail to use SSE-KMS.

## Rationale

Configuring CloudTrail to use SSE-KMS provides additional confidentiality controls on log data. A given user must have S3 read permission on the corresponding log bucket and have decrypt permission by the CMK policy.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

Customer created keys incur an additional cost. See [https://aws.amazon.com/kms/pricing/][2] for more information.

## Default value

None

## References

1. [https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html][3]
2. [https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html][4]
3. CCE-78919-8

## CIS controls

Version 7 - 6 Maintenance, Monitoring, and Analysis of Audit Logs

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: https://aws.amazon.com/kms/pricing/
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html
[4]: https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html
