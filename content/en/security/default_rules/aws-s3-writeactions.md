---
aliases:
- 3vo-lxz-d8w
- /security_monitoring/default_rules/3vo-lxz-d8w
- /security_monitoring/default_rules/aws-s3-writeactions
disable_edit: true
integration_id: s3
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: s3
title: S3 bucket cannot be accessed for WRITE actions
type: security_rules
---

## Description

Update your AWS S3 bucket to remove `WRITE` actions for any IAM user or AWS authenticated account.

## Rationale

Authenticated users with AWS S3 bucket `WRITE` privileges can add, delete, and replace objects without restriction, which can lead to potential data loss or unintended billing charges.

## Remediation

### From the console

Follow the [Editing customer managed policies (console)][1] documentation to learn how to edit permissions for your existing policy. In the console, modify **Permissions** for Access Control Lists (ACLs). Deselect **Upload/Delete** for **Any Authenticated AWS User**.

### From the command line

1. Run `list-buckets` to [list all available S3 buckets][2] for your account.

  {{< code-block lang="bash" filename="list-buckets.sh" >}}
  aws s3api list-buckets
    --query "Buckets[].Name"
  {{< /code-block >}}

2. Run `put-bucket-acl` with your [bucket name and the canned ACL to apply to the bucket][3].

  {{< code-block lang="bash" filename="list-buckets.sh" >}}
  aws s3api put-bucket-acl
    --bucket your-bucket-name
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_manage-edit.html#edit-managed-policy-console
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/list-buckets.html#examples
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-acl.html#synopsis
