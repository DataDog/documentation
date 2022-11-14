---
aliases:
- n68-nzh-pl8
- /security_monitoring/default_rules/n68-nzh-pl8
- /security_monitoring/default_rules/aws-ebs-snapshotencrypted
disable_edit: true
integration_id: ebs
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: ebs
title: EBS snapshot is encrypted
type: security_rules
---

## Description

Encrypt Amazon Elastic Block Store (EBS) snapshots with volume snapshot encryption keys.

## Rationale

Amazon EBS snapshots contain sensitive data, and publicly accessible snapshots can be copied. Keep your data secure from exploits or unauthorized users by using AWS key management.

## Remediation

### From the console

Follow the [Default key for EBS encryption][1] docs to learn how to encrypt a snapshot in the AWS Console.

### From the command line

1. Run `get-ebs-default-kms-key-id` to describe [the default CMK][2].

2. If you need to create a new key, follow the [Creating keys][3] AWS Console docs or the [create-key][4] AWS CLI docs.

3. Run `modify-ebs-default-kms-key-id` with your `--kms-key-id` to [modify the default CMK used to encrypt EBS volumes][3].

See the [Set encryption defaults using the API and CLI][6] docs for additional information.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#EBSEncryption_key_mgmt
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/get-ebs-default-kms-key-id.html
[3]: https://docs.aws.amazon.com/kms/latest/developerguide/create-keys.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/kms/create-key.html
[5]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/modify-ebs-default-kms-key-id.html
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#encryption-by-default-api
