---
aliases:
- cf4-844-4a0
- /security_monitoring/default_rules/cf4-844-4a0
- /security_monitoring/default_rules/aws-cloudtrail-configuration-modified
control: '4.5'
disable_edit: true
framework: cis-aws
iaas: aws
integration_id: cloudtrail
kind: documentation
requirement: monitoring
rule_category:
- Cloud SIEM (Log Detection)
scope: cloudtrail
security: attack
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: AWS CloudTrail configuration modified
type: security_rules
---

## Goal
Detect when an attacker is trying to evade defenses by modifying CloudTrail.

## Strategy
This rule detects if a user is modifying CloudTrail by monitoring the CloudTrail API using [UpdateTrail][1] API calls.

## Triage and response
1. Review the `@responseElements` in the `UpdateTrail` event to determine the scope of the changes.
2. Determine if the user ARN (`{{@userIdentity.arn}}`) intended to make a CloudTrail modification.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_UpdateTrail.html
