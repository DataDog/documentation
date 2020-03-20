---
title: AWS Config Disabled
kind: documentation
type: security_rules
parent: cloudtrail
security: attack
tactic: TA0005-defense-evasion
technique: T1089-disabling-security-tools
source: cloudtrail
service: amazon-config
meta_image: /images/integrations_logos/amazon_cloudtrail.png
---

## Overview

### **Goal:**
Detect when an attacker is trying to evade defenses by disabling AWS Config.

### **Strategy:**
Monitor CloudTrail and detect when AWS config is being disabled via the following API calls:
* [StopConfigurationRecorder][1] 
* [DeleteDeliveryChannel][2] 

### **Triage & Response:**
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
 * Rotate the user credentials and investigate what other API calls.
 * Determine what other API calls the user made which were not made by the user.

[1]: https://docs.aws.amazon.com/config/latest/APIReference/API_StopConfigurationRecorder.html
[2]: https://docs.aws.amazon.com/config/latest/APIReference/API_DeleteDeliveryChannel.html
