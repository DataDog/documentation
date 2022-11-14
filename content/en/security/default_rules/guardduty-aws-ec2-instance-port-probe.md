---
aliases:
- d6c-c15-186
- /security_monitoring/default_rules/d6c-c15-186
- /security_monitoring/default_rules/guardduty-aws-ec2-instance-port-probe
disable_edit: true
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: attack
source: guardduty
tactic: TA0007-discovery
technique: T1046-network-service-discovery
title: AWS EC2 instance probed by scanner
type: security_rules
---

## Goal
Detect when an EC2 instance is being probed by a scanner.

## Strategy
This rule lets you monitor these [GuardDuty integration][1] findings:

* [Recon:EC2/PortProbeUnprotectedPort][2]
* [Recon:EC2/PortProbeEMRUnprotectedPort][3]


## Triage and response
1. This is typically an informative signal. However, if this instance should not be publicly available, you should review the security group for this instance. 

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#recon6
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#PortProbeEMRUnprotectedPort
