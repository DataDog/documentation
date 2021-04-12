---
aliases:
- z23-f9p-six
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: iam
security: compliance
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

## Default Value

None

## References

1. CCE-78908-1

## CIS Controls

4.4 Use unique passwords where multi-factor authentication is not supported (such as local administrator, root, or service accounts), accounts will use passwords that are unique to that system.

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.10
