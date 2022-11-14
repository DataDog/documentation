---
aliases:
- 719-39f-9cd
- /security_monitoring/default_rules/719-39f-9cd
- /security_monitoring/default_rules/cloudtrail-aws-guardduty-detector-deleted
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
technique: T1089-disabling-security-tools
title: AWS GuardDuty detector deleted
type: security_rules
---

## Goal
Detect when an attacker is trying to evade defenses by deleting a GuardDuty detector.

## Strategy
This rule lets you monitor this CloudTrail API call to detect if an attacker is deleting a GuardDuty Detector:

* [DeleteDetector][1]

## Triage and response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/guardduty/latest/ug/delete-detector.html
