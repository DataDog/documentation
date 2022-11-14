---
aliases:
- ee4-ngx-bwr
- /security_monitoring/default_rules/ee4-ngx-bwr
- /security_monitoring/default_rules/cis-aws-1.3.0-1.4
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
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

## Default value

None

## References

1. [http://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html][2]
2. [http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html][3]
3. [http://docs.aws.amazon.com/IAM/latest/APIReference/API_GetAccountSummary.html][4]
4. CCE-78910-7
5. [https://aws.amazon.com/blogs/security/an-easier-way-to-determine-the-presence-of-aws-account-access-keys/][5]

**Additional Information**: IAM User account "root" for us-gov cloud regions is not enabled by default. However, on request to AWS support enables root access only through access-keys (CLI, API methods) for us-gov cloud region.

## CIS controls

Versions 7, 4.3 - Ensure the Use of Dedicated Administrative Accounts - Ensure that all users with administrative account access use a dedicated or secondary account for elevated activities. This account should only be used for administrative activities and not internet browsing, email, or similar activities.

[1]: https://docs.aws.amazon.com/config/latest/developerguide/operational-best-practices-for-cis_aws_benchmark_level_1.html
[2]: http://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html
[3]: http://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html
[4]: http://docs.aws.amazon.com/IAM/latest/APIReference/API_GetAccountSummary.html
[5]: https://aws.amazon.com/blogs/security/an-easier-way-to-determine-the-presence-of-aws-account-access-keys/
