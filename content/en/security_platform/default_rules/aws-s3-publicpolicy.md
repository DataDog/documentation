---
aliases:
- w95-9o2-mw0
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: s3
security: compliance
source: s3
title: S3 bucket is publicly accessible (via policy)
type: security_rules
---

## Description

Update your bucket policy as your Amazon S3 bucket is currently publicly accessible.

## Rationale

Publicly accessible S3 buckets through bucket policies give any AWS user the ability to list, download, delete, and upload objects and edit object permissions.

## Remediation

### Console

Follow the [Controlling access to a bucket with user policies][1] docs to edit your existing policy and set the policy permissions to private.

### CLI

1. To remove the existing public bucket policy, run `delete-bucket-policy` with [your bucket name][2].

  {{< code-block lang="bash" filename="delete-bucket-policy.sh" >}}
  delete-bucket-policy
  --bucket your-bucket-name
  {{< /code-block >}}

2. Create a new non-public bucket policy using the [AWS Policy Generator][3].

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/walkthrough1.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/delete-bucket-policy.html#synopsis
[3]: http://awspolicygen.s3.amazonaws.com/policygen.html
