---
aliases:
- db0-382-435
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: cloudtrail
security: compliance
source: cloudtrail
title: CloudTrail logs are encrypted
type: security_rules
---

## Description

Ensure that AWS CloudTrail logs are encrypted.

## Rationale

Encrypting AWS CloudTrail logs with a KMS encryption key helps protect your data and ensures only certain IAM users can access these logs.

## Remediation

### Console

Follow the [Enabling Log File Encryption][1] docs to enable SSE-KMS encryption for CloudTrail log files.

### CLI

1. Create a new policy configuration file that enables CloudTrail [encrypting and decrypting permissions][2].
2. Run `create-key` using the policy file path.

    {{< code-block lang="bash" filename="create-key.sh" >}}
    aws kms create-key
        --policy new-policy-file.json
    {{< /code-block >}}

3. Run `create-alias` with a [newly created alias name][3] and the `target-key-id` as the KMS key returned in step 2.

    {{< code-block lang="bash" filename="create-alias.sh" >}}
    aws kms create-alias
        --alias-name alias/CloudTrailKSM
        --target-key-id 12345678-abcd-1a2b-1234-012345678901
    {{< /code-block >}}

4. Run `update-trail` on [the trail name you wish to update][4] and the KMS key returned in step 2.

    {{< code-block lang="bash" filename="update-trail.sh" >}}
    aws cloudtrail update-trail
        --name MyGlobalTrail
        --kms-key-id 12345678-abcd-1a2b-1234-012345678901
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/encrypting-cloudtrail-log-files-with-aws-kms.html
[2]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/create-kms-key-policy-for-cloudtrail.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudtrail/create-trail.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudtrail/update-trail.html
