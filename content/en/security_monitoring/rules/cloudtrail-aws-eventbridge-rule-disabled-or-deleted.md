---
title: AWS EventBridge Rule Disabled or Deleted
kind: documentation
parent: cloudtrail
tags:
- security:attack
- tactic:TA0005-defense-evasion
- technique:T1089-disabling-security-tools
- service:events.amazonaws.com
- source:cloudtrail
meta_image: /images/integrations_logos/amazon_cloudtrail.png
---
## **Goal:**
Detect when an attacker is trying to evade defenses by deleting or disabling EventBridge rules.

## **Strategy:**
Monitor CloudTrail and detect when EventBridge rules are being deleted or disabled via one of the following API calls:
* [DeleteRule][1]
* [DisableRule][2]

## **Triage & Response:**
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
   * Rotate the user credentials and investigate what other API calls.
   * Determine what other API calls the user made which were not made by the user.
[1]: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_DeleteRule.html
[2]: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_DisableRule.html
