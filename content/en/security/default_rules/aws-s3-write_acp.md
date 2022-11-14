---
aliases:
- 6lt-aha-t2f
- /security_monitoring/default_rules/6lt-aha-t2f
- /security_monitoring/default_rules/aws-s3-write_acp
disable_edit: true
integration_id: s3
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: s3
title: S3 bucket does not allow authenticated users to modify access controls
type: security_rules
---

## Description

Modify your access control permissions to remove `WRITE_ACP` access for authenticated users.

## Rationale

`WRITE_ACP` access gives any authenticated AWS accounts or IAM users `READ` and `WRITE` Access Control List (ACL) permissions. With these permissions, authenticated users can modify, delete, and update S3 objects, which can lead to data loss or unexpected charges on your AWS bill.

## Remediation

### From the console

Follow the [Controlling access to a bucket with user policies][1] docs to edit your existing policy and set the policy permissions to private.

### From the command line

1. Run `put-bucket-acl` with your [S3 bucket name and the ACL][2] set to `private`.

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api get-bucket-acl
    --bucket your-bucket-name
    --acl private
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/walkthrough1.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-versioning.html#synopsis
