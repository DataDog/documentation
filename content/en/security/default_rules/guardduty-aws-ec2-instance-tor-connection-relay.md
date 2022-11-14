---
aliases:
- 86f-3ac-c70
- /security_monitoring/default_rules/86f-3ac-c70
- /security_monitoring/default_rules/guardduty-aws-ec2-instance-tor-connection-relay
disable_edit: true
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: attack
source: guardduty
tactic: TA0040-impact
technique: T1496-resource-hijacking
title: AWS EC2 instance connecting to TOR as a relay
type: security_rules
---

## Goal
Detect when an EC2 instance is being used as a TOR relay.

## Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [UnauthorizedAccess:EC2/TorRelay][2]


## Triage and response
1. Determine if the EC2 instance should be uses as a TOR relay. 
2. If the instance is compromised:
   * Review the AWS [documentation][3] on remediating a compromised EC2 instance. 

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized14
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
