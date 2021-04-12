---
aliases:
- 146-kl4-mas
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: ebs
security: compliance
source: ebs
title: EBS volume is encrypted
type: security_rules
---

## Description

Enable encryption for Elastic Block Store (EBS).

## Rationale

AES-256 encryption, used by EBS, protects data stored on volumes, disk I/O, and the snapshots created from a volume to protect your sensitive data from exploits and unauthorized users.

## Remediation

### Console

Follow the [EBS encryption][1] docs to learn about the requirements and methods for enabling encryption in the AWS Console.

### CLI

1. Run `enable-ebs-encryption-by-default` to [enable encryption for your account in the current region][2].

2. Run `get-ebs-encryption-by-default` to confirm encryption is enabled.

See the [Set encryption defaults using the API and CLI][3] docs for additional commands related to EBS encryption.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#ebs-encryption-requirements
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/enable-ebs-encryption-by-default.html
[3]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html#encryption-by-default-api
