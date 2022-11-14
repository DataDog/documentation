---
aliases:
- wv9-wm3-v0s
- /security_monitoring/default_rules/wv9-wm3-v0s
- /security_monitoring/default_rules/cloudtrail-guardduty-publishing-destination-deleted
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
title: AWS GuardDuty publishing destination deleted
type: security_rules
---

## Goal
Detect when a user deletes a publishing destination for a detector which will prevent the exporting of findings. 

## Strategy
This rule lets you monitor this CloudTrail API call to detect if a user has deleted a Guard Duty publishing destination.

* [DeletePublishingDestination][1]

## Triage and response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/fr_fr/guardduty/latest/APIReference/API_DeletePublishingDestination.html
