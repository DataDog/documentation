---
aliases:
- 432-8db-b8b
- /security_monitoring/default_rules/432-8db-b8b
- /security_monitoring/default_rules/aws-cloudtrail-kms-deleted
control: '4.7'
disable_edit: true
framework: cis-aws
iaas: aws
integration_id: kms
kind: documentation
requirement: Monitoring
rule_category:
- Cloud SIEM (Log Detection)
scope: kms
security: attack
source: cloudtrail
tactic: TA0040-impact
title: AWS KMS key deleted or scheduled for deletion
type: security_rules
---

## Goal
Detect when a KMS (Key Management Service) key is deleted or scheduled for deletion.

## Strategy
This rule lets you monitor these CloudTrail API calls to detect if an attacker is deleting KMS keys:
* [DisableKey][1]
* [ScheduleKeyDeletion][2]

## Triage and response
1. Determine if `user ARN:` {{@userIdentity.arn}} in your organization should be making this call.
2. If the user did not make the API call:
 * Rotate the credentials.
 * Use the `Cloud SIEM - User Investigation` OOTB dashboard to investigate other potential unauthorized API calls from this user.

[1]: https://docs.aws.amazon.com/kms/latest/APIReference/API_DisableKey.html
[2]: https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html 

## Changelog
16 March 2022 - Rule severity and markdown updated.
