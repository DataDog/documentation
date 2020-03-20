---
title: AWS FlowLogs Removed
kind: documentation
type: security_rules
parent: cloudtrail
security: attack
tactic: TA0005-defense-evasion
technique: T1066-indicator-removal-from-tools
source: cloudtrail
service: ec2
meta_image: /images/integrations_logos/amazon_cloudtrail.png
---

## Overview

### **Goal:**
Detect when an attacker is removing FlowLogs to cover their tracks.

### **Strategy:**
Monitor CloudTrail and detect when FlowLogs are deleted via the following API call:
* [DeleteFlowLogs][1]

### **Triage & Response:**
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
   * Rotate the user credentials and investigate what other API calls.
   * Determine what other API calls the user made which were not made by the user.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteFlowLogs.html
