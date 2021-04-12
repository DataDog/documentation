---
aliases:
- 541-fd3-fab
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
security: compliance
title: IAM inline policy is not directly set for users
type: security_rules
---

## Description

By default, IAM users, groups, and roles have no access to AWS resources. IAM policies are how privileges are granted to users, groups, or roles. You should apply IAM policies directly to groups and roles but not to users.

## Rationale

Assigning privileges at the group or role level reduces access management's complexity as the number of users grows. Reducing access management complexity may in-turn, lessen the opportunity for a principal to receive or retain excessive privileges inadvertently.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default Value

None

## References

1. [http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html][2]
2. [http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html][3]
3. CCE-78912-3

## CIS Controls

16 Account Monitoring and Control

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.14
[2]: http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
[3]: http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html
