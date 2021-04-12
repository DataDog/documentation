---
aliases:
- 152-b40-a1f
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: threat-intel
source: guardduty
title: AWS EC2 instance inbound connections from TOR
type: security_rules
---

### Goal
Detect when an EC2 instance receives an inbound network connection from TOR.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [UnauthorizedAccess:EC2/TorIPCaller][2]


### Triage & Response
1. This is typically an informative signal. However, if this instance should not be publicly available, you should review the security group for this instance. 

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized7
