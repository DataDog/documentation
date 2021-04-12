---
aliases:
- f71-905-58d
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: attack
source: guardduty
tactic: TA0011-command-and-control
technique: T1188-multi-hop-proxy
title: AWS EC2 instance outbound connections to TOR
type: security_rules
---

### Goal
Detect when an EC2 instance makes an outbound network connection from TOR.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [UnauthorizedAccess:EC2/TorClient][2]


### Triage & Response
1. Determine if the EC2 instance should be making requests to TOR. 
2. If the instance is compromised:
   * Review the AWS [documentation][3] on remediating a compromised EC2 instance. 

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized13
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
