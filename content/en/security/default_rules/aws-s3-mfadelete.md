---
aliases:
- k20-cl4-oat
- /security_monitoring/default_rules/k20-cl4-oat
- /security_monitoring/default_rules/aws-s3-mfadelete
disable_edit: true
integration_id: s3
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: s3
title: S3 bucket MFA Delete feature is enabled
type: security_rules
---

## Description

Set up the Multi-Factor Authentication (MFA) delete feature to prevent deletion of Amazon S3 objects.

## Rationale

## Remediation

MFA-protected Amazon S3 buckets ensure S3 objects cannot be accidentally or intentionally deleted by AWS users who have access to your bucket.

### From the console

`MFA DELETE` [cannot be enabled in the AWS Console][1]. See the CLI remediation below for configuration instructions.

### From the command line

1. Run `put-bucket-versioning` with your [bucket name, versioning configuration, and MFA configuration][2].

  {{< code-block lang="bash" filename="put-bucket-acl.sh" >}}
  aws s3api put-bucket-versioning
    --bucket your-s3-bucket-name
    --versioning-configuration '{"MFADelete":"Enabled","Status":"Enabled"}'
    --mfa 'arn:aws:iam::aws_account_id:mfa/root-account-mfa-device'
  {{< /code-block >}}

[1]: https://docs.aws.amazon.com/AmazonS3/latest/userguide/MultiFactorAuthenticationDelete.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/s3api/put-bucket-versioning.html#synopsis
