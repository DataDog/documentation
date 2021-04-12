---
aliases:
- 432-8db-b8b
control: cis-3.7
disable_edit: true
framework: cis-aws
kind: documentation
rule_category:
- Log Detection
scope: kms
security: compliance
source: cloudtrail
title: AWS CMK deleted or scheduled for deletion
type: security_rules
---

### Goal
Detect when a CMK is deleted or scheduled for deletion.

### Strategy
This rule lets you monitor these CloudTrail API calls to detect if an attacker is deleting CMKs:
* [DisableKey][1]
* [ScheduleKeyDeletion][2]

### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/kms/latest/APIReference/API_DisableKey.html
[2]: https://docs.aws.amazon.com/kms/latest/APIReference/API_ScheduleKeyDeletion.html
