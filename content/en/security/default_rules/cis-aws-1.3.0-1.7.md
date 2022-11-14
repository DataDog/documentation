---
aliases:
- v9v-uhp-uk5
- /security_monitoring/default_rules/v9v-uhp-uk5
- /security_monitoring/default_rules/cis-aws-1.3.0-1.7
cloud: aws
disable_edit: true
integration_id: amazon-
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
title: Root account credentials have not been used in the past 30 days
type: security_rules
---

## Description

With the creation of an AWS account, a root user is created that cannot be disabled or deleted. That user has unrestricted access to and control over all resources in the AWS account. It is highly recommended that the use of this account be avoided for everyday tasks.

## Rationale

The root user has unrestricted access to and control over all account resources. Use of it is inconsistent with the principles of least privilege and separation of duties, and can lead to unnecessary harm due to error or account compromise.

## Remediation

If you find that the root user account is being used for daily activity and administrative tasks that do not require the root user, remediate this by doing the following:

1. Change the root user password.
2. Deactivate or delete access keys associated with the root user.
**Note**: Anyone who has root user credentials for your AWS account has unrestricted access to and control of all the resources in your account, including billing information.

## References

1. [https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html][1]
2. [https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html][2]
3. [https://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html][3]

**Additional Information**: The root user for us-gov cloud regions is not enabled by default. However, on request AWS support can enable the root user and grant access only through access-keys (CLI, API methods) for us-gov cloud region. If the root user for us-gov cloud regions is enabled, this recommendation is applicable. Monitor usage of the root user by implementing recommendation *3.3 Ensure a log metric filter and alarm exist for usage of the root user*.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html
[3]: https://docs.aws.amazon.com/general/latest/gr/aws_tasks-that-require-root.html
