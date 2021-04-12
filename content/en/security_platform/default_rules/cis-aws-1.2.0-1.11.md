---
aliases:
- v5j-jba-9tg
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: iam
security: compliance
source: iam
title: IAM policy is set to expire passwords within 90 days or less
type: security_rules
---

## Description

IAM password policies can require passwords to be rotated or expired after a given number of days. The password policy should expire passwords after 90 days or less.

## Rationale

Reducing the password lifetime increases account resiliency against brute force login attempts. Additionally, requiring regular password changes help if a password is stolen or compromised without your knowledge. This can happen if your system is compromised, because of a software vulnerability, or if there is an internal threat. Certain corporate and government web filters or proxy servers have the ability to intercept and record traffic even if it's encrypted. Many people use the same password for many systems such as work, email, and personal. Compromised end-user workstations might have a keystroke logger.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default Value

None

## References

1. CCE-78909-9

## CIS Controls

16 Account Monitoring and Control

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.3
