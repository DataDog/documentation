---
aliases:
- eel-ic1-rey
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: s3
security: compliance
source: s3
title: S3 bucket content cannot be listed by users
type: security_rules
---

## Description

Update your ACL permission to remove `READ` access for authenticated AWS accounts or IAM users.

## Rationale

`READ` access allows any authenticated IAM user or AWS authenticated account to list all objects within your bucket and exploit objects with misconfigured ACL permissions.

## Remediation

### Console

Follow the [Configuring ACLs: Using the S3 console to set ACL permissions for a bucket][1] docs to deselect the `Bucket ACL - Read` permission and update ACL permissions.

### CLI

1. Run `put-bucket-acl` with your [bucket name and ACL][2] to `private`.

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api put-bucket-acl
    --bucket your-s3-bucket-name
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/managing-acls.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-acl.html#synopsis
