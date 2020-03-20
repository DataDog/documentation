---
title: AWS EC2 Instance Involved in Brute Force Attack
kind: documentation
type: security_rules
parent: guardduty
security: attack
tactic: TA0006-credential-access
technique: T1110-brute-force
source: guardduty
service: ec2
meta_image: /images/integrations_logos/amazon_guardduty.png
---

## Overview

### **Goal:**
Detect Brute Force Attacks

### **Strategy:**
Leverage GuardDuty and detect when an attacker is performing a brute force attack. The following are GuardDuty Findings which may trigger this signal:
* [UnauthorizedAccess:EC2/SSHBruteForce][1]
* [UnauthorizedAccess:EC2/RDPBruteForce][2]


### **Triage & Response:**
1. Inspect the role of the EC2 Instance in the attack. The role is located in the signal name and is either ACTOR or TARGET
   * If you are the TARGET and the instance is available on the Internet, it is expected to see IPs scanning your systems.
   * If you are the TARGET and the instance is **not** available on the Internet, this means a host on your internal network is scanning your EC2 instance. An investigation should be opened.
   * IF you are the ACTOR this means that instance is performing brute force attacks on other systems. An investigation should be opened.

[1]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized9
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized10
