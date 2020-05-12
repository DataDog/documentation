---
title: AWS EventBridge Rule Disabled or Deleted
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: attack
tactic: TA0005-defense-evasion
technique: T1089-disabling-security-tools
source: cloudtrail
scope: eventbridge
meta_image: /images/integrations_logos/amazon_event_bridge.png
aliases:
- 998-f99-7bd
---

## Overview

### Goal
Detect when an attacker is trying to evade defenses by deleting or disabling EventBridge rules.

### Strategy
This rule lets you monitor these CloudTrail API calls to detect if an attacker is modifying or disabling EventBridge rules:

* [DeleteRule][1]
* [DisableRule][2]

### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_DeleteRule.html
[2]: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_DisableRule.html
