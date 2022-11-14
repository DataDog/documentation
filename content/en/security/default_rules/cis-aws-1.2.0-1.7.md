---
aliases:
- r88-a34-ppx
- /security_monitoring/default_rules/r88-a34-ppx
- /security_monitoring/default_rules/cis-aws-1.2.0-1.7
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: IAM policy is set to require at least one symbol
type: security_rules
---

## Description

Password policies are, in part, used to enforce password complexity requirements. IAM password policies can be used to ensure passwords are comprised of different character sets. It is recommended that the password policy require at least one symbol.

## Rationale

Setting a password complexity policy increases account resiliency against brute force login attempts.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default value

None

## References

1. CCE-78905-7

## CIS controls

16 Account Monitoring and Control Account Monitoring and Control

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.7
