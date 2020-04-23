---
title: AWS GuardDuty Detector Deleted
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: attack
tactic: TA0005-defense-evasion
technique: T1089-disabling-security-tools
source: cloudtrail
scope: guardduty
meta_image: /images/integrations_logos/amazon_guardduty.png
aliases:
- 719-39f-9cd
---

## Overview

### Goal
Detect when an attacker is trying to evade defenses by deleting a GuardDuty detector.

### Strategy
This rule lets you monitor this CloudTrail API call to detect if an attacker is deleting a GuardDuty Detector:

* [DeleteDetector][1]

### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/guardduty/latest/ug/delete-detector.html
