---
aliases:
- 6b8-6d0-cae
- /security_monitoring/default_rules/6b8-6d0-cae
- /security_monitoring/default_rules/guardduty-aws-ec2-instance-unusual-network-port
disable_edit: true
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: anomaly
source: guardduty
tactic: TA0011-command-and-control
technique: T1571-non-standard-port
title: AWS EC2 instance communicating over unusual port
type: security_rules
---

## Goal
Detect when an EC2 instance is communicating over an unusual port.

## Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [Behavior:EC2/NetworkPortUnusual][2]


## Triage and response
1. Determine which port triggered the signal. This can be found in the samples.
2. If the instance is compromised:
   * Review the AWS [documentation][3] on remediating a compromised EC2 instance.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_behavior.html#behavior3
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
