---
aliases:
- cf4-844-4a0
control: cis-3.5
disable_edit: true
framework: cis-aws
kind: documentation
rule_category:
- Log Detection
scope: cloudtrail
security: compliance
source: cloudtrail
title: AWS CloudTrail configuration modified
type: security_rules
---

### Goal
Detect when an attacker is trying to evade defenses by disabling or modifying CloudTrail.

### Strategy
This rule lets you monitor these CloudTrail API calls to detect if an attacker is modifying or disabling CloudTrail:

* [DeleteTrail][1]
* [UpdateTrail][2]
* [StopLogging][3]

### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_DeleteTrail.html
[2]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_UpdateTrail.html
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_StopLogging.html
