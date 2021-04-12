---
aliases:
- 5wo-osq-01n
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: s3
security: compliance
source: s3
title: S3 bucket content permmissions cannot be viewed by authenticated users
type: security_rules
---

## Description

Update your ACL permission to remove `READ_ACP` access for authenticated AWS accounts and AWS IAM users.

## Rationale

AWS authenticated accounts and users with `READ_ACP` access can examine Amazon S3 Access Control Lists (ACLs) configuration details. This information can be used maliciously to find misconfigured permissions and implement methods to access your S3 data.

## Remediation

### Console

Follow the [Configuring ACLs: Using the S3 console to set ACL permissions for a bucket][1] docs to remove `READ_ACP` access for AWS signed users.

### CLI

1. Run `put-bucket-acl` with your [Amazon S3 bucket name and ACL][2] set to `private`.

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api put-bucket-acl
    --bucket your-s3-bucket-name
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/managing-acls.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-acl.html#synopsis
