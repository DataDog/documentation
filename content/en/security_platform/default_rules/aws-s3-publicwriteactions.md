---
aliases:
- dvz-qe2-0ql
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: s3
security: compliance
source: s3
title: S3 bucket is not publicly accessible for write actions by anonymous users
type: security_rules
---

## Description

Modify your access control permissions to remove public `WRITE` access.

## Rationale

Public `WRITE` access gives unauthorized users the ability to add, replace, and delete objects within a bucket. Attackers can use these abilities to access your data or incur charges on your AWS bill.

## Remediation

### Console

Follow the [Controlling access to a bucket with user policies][1] docs to edit your existing policy and set the policy permissions to private.

### CLI

1. Run `put-bucket-acl` with your [S3 bucket name and the ACL][2] set to `private`.

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api get-bucket-acl
    --bucket your-bucket-name
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/walkthrough1.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-versioning.html#synopsis
