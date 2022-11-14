---
aliases:
- z23-f9p-six
- /security_monitoring/default_rules/z23-f9p-six
- /security_monitoring/default_rules/cis-aws-1.3.0-1.9
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: IAM password policy prevents password reuse
type: security_rules
---

## Description

IAM password policies can prevent the reuse of a given password by the same user. It is recommended that the password policy prevent the reuse of passwords.

## Rationale

Preventing password reuse increases account resiliency against brute force login attempts.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default value

None

## References

1. CCE-78908-1
2. [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html][2]
3. [https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#configure-strong-password-policy][3]

## CIS controls

4.4 Use unique passwords where multi-factor authentication is not supported (such as local administrator, root, or service accounts), accounts will use passwords that are unique to that system.

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#configure-strong-password-policy
