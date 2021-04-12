---
aliases:
- ayr-n9s-q87
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: iam
security: compliance
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

## Default Value

None

## References

1. CCE-78907-3 2. CIS CSC v6.0 #5.7, #16.12

## CIS Controls

16 Account Monitoring and Control

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.9
