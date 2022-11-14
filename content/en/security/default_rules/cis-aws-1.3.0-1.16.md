---
aliases:
- qjy-cke-wd7
- /security_monitoring/default_rules/qjy-cke-wd7
- /security_monitoring/default_rules/cis-aws-1.3.0-1.16
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: IAM policies that allow full "*:*" administrative privileges are not created
type: security_rules
---

## Description

IAM policies are how privileges are granted to users, groups, or roles. It is recommended and considered best practice to give only the permissions required to perform a task. Determine what users need to do and then craft policies that let the users perform only those tasks, instead of allowing full administrative privileges.

## Rationale

It's more secure to start with a minimum set of permissions and grant additional permissions as necessary, rather than starting with permissions that are too lenient and then trying to tighten them later. Providing full administrative privileges instead of restricting to the minimum set of permissions that the user is required to do exposes the resources to potentially unwanted actions. IAM policies that have a statement with "Effect": "Allow" with "Action": "*" over "Resource": "*" should be removed.

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
4. [http://docs.aws.amazon.com/cli/latest/reference/iam/index.html#cli-aws-iam][4]

## CIS controls

Version 7, 4 - Controlled Use of Administrative Privileges

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
[3]: http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html
[4]: http://docs.aws.amazon.com/cli/latest/reference/iam/index.html#cli-aws-iam
