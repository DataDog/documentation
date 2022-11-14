---
aliases:
- kp3-9yr-ube
- /security_monitoring/default_rules/kp3-9yr-ube
- /security_monitoring/default_rules/cis-aws-1.3.0-1.15_1
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: IAM policy does not have a user directly attached to it
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

## Default value

None

## References

1. [http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html][2]
2. [http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html][3]
3. CCE-78912-3

## CIS controls

16 Account Monitoring and Control

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
[3]: http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html
