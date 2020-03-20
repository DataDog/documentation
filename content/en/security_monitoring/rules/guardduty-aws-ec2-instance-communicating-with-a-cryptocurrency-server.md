---
title: AWS EC2 Instance Communicating With a Cryptocurrency Server
kind: documentation
type: security_rules
parent: guardduty
security: attack
tactic: TA0040-impact
technique: T1496-resource-hijacking
source: guardduty
service: ec2
meta_image: /images/integrations_logos/amazon_guardduty.png
---

## Overview

### **Goal:**
Detect when an EC2 instance is communicating with a cryptocurrency server

### **Strategy:**
Leverage GuardDuty and detect when an EC2 instance has made a DNS request or is communicating with an IP which is associated with cryptocurrency operations. The following are GuardDuty Findings which may trigger this signal:
* [CryptoCurrency:EC2/BitcoinTool.B!DNS][1]
* [CryptoCurrency:EC2/BitcoinTool.B][2]


### **Triage & Response:**
1. Determine the domain name or IP address which triggered the signal. This should be present in any of the samples. 
2. If the domain or IP address should not have been requested, open a security investigation and determine which process requested the domain name or IP address.

[1]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_crypto.html#crypto3
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_crypto.html#crypto4
