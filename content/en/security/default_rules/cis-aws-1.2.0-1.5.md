---
aliases:
- ziw-w2v-e6z
- /security_monitoring/default_rules/ziw-w2v-e6z
- /security_monitoring/default_rules/cis-aws-1.2.0-1.5
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: IAM policy is set to require uppercase characters
type: security_rules
---

## Description

Password policies are, in part, used to enforce password complexity requirements. Use IAM password policies to ensure passwords are comprised of different character sets. The password policy should require at least one uppercase letter.

## Rationale

Setting a password complexity policy increases account resiliency against brute force login attempts.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default value

None

## References

1. CCE-78903-2

## CIS controls

16 Account Monitoring and Control

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.5
