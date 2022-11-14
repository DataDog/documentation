---
aliases:
- dhz-27i-ani
- /security_monitoring/default_rules/dhz-27i-ani
- /security_monitoring/default_rules/cloudtrail-guardduty-threat-intel-set-deleted
disable_edit: true
iaas: aws
integration_id: guardduty
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: guardduty
security: attack
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: AWS GuardDuty threat intel set deleted
type: security_rules
---

## Goal
Detect when an attacker is trying to evade defenses by deleting a GuardDuty ThreatIntelSet.

## Strategy
This rule lets you monitor this CloudTrail API call to detect if an attacker is deleting a GuardDuty ThreatIntelSet:

* [DeleteThreatIntelSet][1]

## Triage and response
1. Determine if user: `{{@userIdentity.arn}}` should have made a `{{@evt.name}}` API call.
2. If the API call was not made by the user:
  * Rotate user credentials.
  * Determine what other API calls were made by the user.
  * Replace ThreatIntelSets deleted by the user with the `aws-cli` command [create-threat-intel-set][2] or use the [AWS Console][3].
3. If the API call was made by the user:
  * Determine if the user should be performing this API call and if it was an authorized change.
  * If No, see if other API calls were made by the user and determine if they warrant further investigation.

[1]: https://docs.aws.amazon.com/guardduty/latest/APIReference/API_DeleteThreatIntelSet.html
[2]: https://docs.aws.amazon.com/cli/latest/reference/guardduty/create-threat-intel-set.html
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_upload-lists.html
