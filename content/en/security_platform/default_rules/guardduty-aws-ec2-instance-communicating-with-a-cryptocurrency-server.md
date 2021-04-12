---
aliases:
- ecb-6e7-738
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: attack
source: guardduty
tactic: TA0040-impact
technique: T1496-resource-hijacking
title: AWS EC2 instance communicating with a cryptocurrency server
type: security_rules
---

### Goal
Detect when an EC2 instance is communicating with a cryptocurrency server

### Strategy
This rule lets you leverage GuardDuty to detect when an EC2 instance has made a DNS request or is communicating with an IP that is associated with cryptocurrency operations. The following GuardDuty Findings trigger this signal:

* [CryptoCurrency:EC2/BitcoinTool.B!DNS][1]
* [CryptoCurrency:EC2/BitcoinTool.B][2]


### Triage & Response
1. Determine which domain name or IP address triggered the signal. This can be found in the samples. 
2. If the domain or IP address should not have been requested, open a security investigation, and determine which process requested the domain name or IP address.

[1]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_crypto.html#crypto3
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_crypto.html#crypto4
