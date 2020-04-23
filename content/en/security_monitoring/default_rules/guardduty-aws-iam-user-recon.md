---
title: AWS IAM Principal Enumeration
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
security: attack
tactic: TA0007-discovery
technique: T1069-permission-groups-discovery
source: guardduty
scope: iam

aliases:
- 098-1df-338
---

## Overview

### Goal
Detect when an attacker is enumerating IAM principals.

### Strategy
This rule lets you leverage GuardDuty to detect when an attacker is enumerating IAM principals. The GuardDuty Findings which trigger this signal:

* [Recon:IAMUser/NetworkPermissions][1]
* [Recon:IAMUser/ResourcePermissions][2]
* [Recon:IAMUser/UserPermissions][3] 


### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#recon7
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#recon8
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#recon9
