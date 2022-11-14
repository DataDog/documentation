---
aliases:
- r1s-kud-79s
- /security_monitoring/default_rules/r1s-kud-79s
- /security_monitoring/default_rules/aws-iam-user-access-key-unused-older-than-1-year
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: IAM access keys older than 1 year have not been used in the last 30 days
type: security_rules
---

## Description

This rule identifies IAM access keys that are older than one year and have not been used in the past 30 days.

## Rationale

This is a good indicator that an access key or IAM user that is not used anymore, and raises a security risk. IAM access keys are static secrets that do not change. This leak represents a common cause for cloud security breaches.

## Remediation

* Verify that the IAM user is still actively used or if it can be removed.
* Verify that the IAM access key is still actively used or if it can be removed.
* If the IAM user is still needed, rotate the access key. For more information, see the [AWS documentation][2].

[1]: https://docs.datadoghq.com/security_platform/default_rules/cis-aws-1.3.0-1.14/
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html#Using_RotateAccessKey
