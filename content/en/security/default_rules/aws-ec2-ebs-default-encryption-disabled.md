---
aliases:
- ee2-dc1-3c1
- /security_monitoring/default_rules/ee2-dc1-3c1
- /security_monitoring/default_rules/aws-ec2-ebs-default-encryption-disabled
control: 2.2.1
disable_edit: true
framework: cis-aws
iaas: aws
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: compliance
source: cloudtrail
title: AWS EBS default encryption disabled
type: security_rules
---

## Goal
Detect when an EBS encryption is disabled by default. 

## Strategy
Monitor CloudTrail and detect when EBS encryption is disabled by default via the following API call:

* [DisableEbsEncryptionByDefault][1]

## Triage and response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user and let them know that it is best practice to enable EBS encryption by default.
3. Re-enable EBS encryption by default.

For more information about Amazon EBS Encryption, check out the [Amazon EBS Encryption][2] documentation.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DisableEbsEncryptionByDefault.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html

## Changelog
18 March 2022 - Rule query and severity updated.
