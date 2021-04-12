---
aliases:
- wud-s4z-fz8
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: iam
security: compliance
source: iam
title: A support role is set up to manage incidents with AWS Support
type: security_rules
---

## Description

AWS provides a support center that can be used for incident notification and response, as well as technical support and customer services. Create an IAM Role to allow authorized users to manage incidents with AWS Support.

## Rationale

An IAM Role will require an appropriate IAM Policy to allow Support Center Access to manage Incidents with AWS Support by implementing least privilege for access control.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

All AWS Support plans include an unlimited number of accounts and billing support cases, with no long-term contracts. Support billing calculations are performed on a per-account basis for all plans. Enterprise Support plan customers have the option to include multiple enabled accounts in an aggregated monthly billing calculation. Monthly charges for the Business and Enterprise support plans are based on each month's AWS usage charges, subject to a monthly minimum, billed in advance.

## Default Value

None

## References

1. [http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html][2]
2. [https://aws.amazon.com/premiumsupport/pricing/][3]
3. [http://docs.aws.amazon.com/cli/latest/reference/iam/list-policies.html][4]
4. [http://docs.aws.amazon.com/cli/latest/reference/iam/attach-role-policy.html][5]
5. [http://docs.aws.amazon.com/cli/latest/reference/iam/list-entities-for-policy.html][6]

## CIS Controls

None

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.20
[2]: http://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_managed-vs-inline.html
[3]: https://aws.amazon.com/premiumsupport/pricing/
[4]: http://docs.aws.amazon.com/cli/latest/reference/iam/list-policies.html
[5]: http://docs.aws.amazon.com/cli/latest/reference/iam/attach-role-policy.html
[6]: http://docs.aws.amazon.com/cli/latest/reference/iam/list-entities-for-policy.html
