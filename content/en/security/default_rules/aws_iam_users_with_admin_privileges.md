---
aliases:
- 542-ddc-8ba
- /security_monitoring/default_rules/542-ddc-8ba
- /security_monitoring/default_rules/aws_iam_users_with_admin_privileges
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: iam
title: IAM privileged user does have admin permissions to your AWS account
type: security_rules
---

## Description

Confirm there are no [Amazon IAM users][1] (privileged users) with administrator permissions for your AWS account.

## Rationale

A privileged IAM user can access all AWS services and control resources through the [AdministratorAccess IAM managed policy][2]. Any user with administrator access that should not have access can potentially, whether unknowingly or purposefully, cause security issues or data leaks.

## Remediation

### From the console

Follow the [Removing a permissions policy from a user][6] docs to revoke AdministratorAccess for a user.

### From the command line

1. Run `list-users` to get [a list of current IAM users][3].
2. Run `list-user-policies` with an IAM `user-name` to find the [users attached policies][4].

    {{< code-block lang="bash" filename="list-attached-user-policies.sh" >}}
    aws iam list-user-policies --user-name Name
    {{< /code-block >}}

3. Run `detach-user-policy` to [revoke Administrator access][5] for that user.

    {{< code-block lang="bash" filename="list-attached-user-policies.sh" >}}
    aws iam detach-user-policy --user-name Bob --policy-arn arn:aws:iam::123456789012:policy/TesterPolicy
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users.html
[2]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_job-functions.html#jf_administrator
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/list-users.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/list-user-policies.html#examples
[5]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/detach-user-policy.html
[6]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_change-permissions.html#users_change_permissions-remove-policy-console
