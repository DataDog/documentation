---
title: AWS CloudTrail Configuration Modified
kind: documentation
type: security_rules
parent: cloudtrail
tags:
  - security: attack
    tactic: TA0005-defense-evasion
    technique: T1089-disabling-security-tools
    ervice: cloudtrail.amazonaws.com
    source: cloudtrail
meta_image: /images/integrations_logos/amazon_cloudtrail.png
---

## Overview

### Goal:
Detect when an attacker is trying to evade defenses by disabling or modifying CloudTrail.

### Strategy:
Monitor CloudTrail and detect when CloudTrail is being disabled via one of the following API calls:
* [DeleteTrail][1]
* [UpdateTrail][1]
* [StopLogging][2]

## Triage & Response:
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
 * Rotate the user credentials and investigate what other API calls.
 * Determine what other API calls the user made which were not made by the user.[1]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_DeleteTrail.html
[1]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_UpdateTrail.html
[2]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_StopLogging.html
