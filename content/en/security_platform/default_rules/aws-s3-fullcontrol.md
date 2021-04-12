---
aliases:
- 8o9-i6i-hu6
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: s3
security: compliance
source: s3
title: S3 bucket does not allow users full control access
type: security_rules
---

## Description

Update your ACL permission to remove `FULL_CONTROL` access for authenticated AWS accounts and AWS IAM users.

## Rationale

`FULL_CONTROL` access allows any IAM user or AWS authenticated account to view, upload, modify and delete S3 objects without restriction.

## Remediation

### Console

Follow the [Configuring ACLs: Using the S3 console to set ACL permissions for a bucket][1] docs to remove `FULL_CONTROL` access and update ACL permissions.

### CLI

1. Run `put-bucket-acl` with your [bucket name and ACL][2] to `private`.

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api put-bucket-acl
    --bucket your-s3-bucket-name
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/managing-acls.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-acl.html#synopsis
