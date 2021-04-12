---
aliases:
- 2mn-qgc-gka
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: iam
security: compliance
source: iam
title: IAM policy is set to require at least one number
type: security_rules
---

## Description

Password policies are, in part, used to enforce password complexity requirements. Use IAM password policies to ensure passwords are comprised of different character sets. The password policy should require at least one number.

## Rationale

Setting a password complexity policy increases account resiliency against brute force login attempts.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default Value

None

## References

1. CCE-78906-5

## CIS Controls

16 Account Monitoring and Control

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.8
