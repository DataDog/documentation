---
title: AWS IAM Principal Enumeration
kind: documentation
type: security_rules
parent: guardduty
security: attack
tactic: TA0007-discovery
technique: T1069-permission-groups-discovery
source: guardduty
meta_image: /images/integrations_logos/amazon_guardduty.png
---
## **Goal:**
Detect when an attacker is enumerating IAM principals.

## **Strategy:**
Leverage GuardDuty and detect when an attacker is enumerating IAM principals. The following are GuardDuty Findings which may trigger this signal:
* [Recon:IAMUser/NetworkPermissions][1]
* [Recon:IAMUser/ResourcePermissions][2]
* [Recon:IAMUser/UserPermissions][3] 


## **Triage & Response:**
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
 * Rotate the user credentials and investigate what other API calls
 * Determine what other API calls the user made which were not made by the user[1]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#recon7
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#recon8
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#recon9
