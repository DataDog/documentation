---
aliases:
- ayr-n9s-q87
- /security_monitoring/default_rules/ayr-n9s-q87
- /security_monitoring/default_rules/cis-aws-1.3.0-1.8
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: IAM password policy has 14 or more characters
type: security_rules
---

## Description

Password policies are, in part, used to enforce password complexity requirements. Use IAM password policies to ensure passwords are a minimum length. The password policy should require a minimum password length of 14 characters.

## Rationale

Setting a password complexity policy increases account resiliency against brute force login attempts.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default value

None

## References

1. CCE-78907-3
2. [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html][2]
3. [https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#configure-strong-password-policy][3]

## CIS controls

Version 7, 16 - Account Monitoring and Control

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_passwords_account-policy.html
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#configure-strong-password-policy
