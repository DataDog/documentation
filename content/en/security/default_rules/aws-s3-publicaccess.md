---
aliases:
- rys-j0l-jyg
- /security_monitoring/default_rules/rys-j0l-jyg
- /security_monitoring/default_rules/aws-s3-publicaccess
disable_edit: true
integration_id: s3
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: s3
title: S3 bucket is not publicly accessible to anonymous users
type: security_rules
---

## Description

Set your Amazon S3 bucket to private.

## Rationale

Publicly accessible Amazon S3 buckets grant `FULL_CONTROL` access to everyone, including anonymous users. `FULL_CONTROL` grants users the ability to upload, modify, delete, and view S3 objects.

## Remediation

### From the console

Follow the [Configuring ACLs: Using the S3 console to set ACL permissions for a bucket][1] docs to remove `FULL_CONTROL` access and update ACL permissions.

### From the command line

1. Run `put-bucket-acl` with your [bucket name and ACL][2] set to `private`.

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api put-bucket-acl
    --bucket your-bucket-name
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/managing-acls.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-acl.html#synopsis
