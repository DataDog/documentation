---
aliases:
- ee4-ngx-bwr
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: iam
security: compliance
source: iam
title: No root account access key exists
type: security_rules
---

## Description

The root account is the most privileged user in an AWS account. AWS Access Keys provide programmatic access to a given AWS account. It is recommended that all access keys associated with the root account be removed.

## Rationale

Removing access keys associated with the root account limits vectors by which the account can be compromised. Additionally, removing the root access keys encourages the creation and use of role based accounts that are least privileged.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

None

## Default Value

None

## References

1. [http://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html][2]
2. [http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html][3]
3. [http://docs.aws.amazon.com/IAM/latest/APIReference/API_GetAccountSummary.html][4]
4. CCE-78910-7 5. CIS CSC v6.0 #5.1

## CIS Controls

4.3 Ensure the Use of Dedicated Administrative Accounts - Ensure that all users with administrative account access use a dedicated or secondary account for elevated activities. This account should only be used for administrative activities and not internet browsing, email, or similar activities.

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-1.12
[2]: http://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html
[3]: http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html
[4]: http://docs.aws.amazon.com/IAM/latest/APIReference/API_GetAccountSummary.html
