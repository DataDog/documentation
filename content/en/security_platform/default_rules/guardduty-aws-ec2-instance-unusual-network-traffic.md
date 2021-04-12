---
aliases:
- a34-639-3d4
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: anomaly
source: guardduty
title: AWS EC2 instance network traffic volume unusual
type: security_rules
---

### Goal
Detect when an EC2 instance network traffic volume is unusual.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [Behavior:EC2/TrafficVolumeUnusual][2]


### Triage & Response
1. Determine which port triggered the signal. This can be found in the samples.
2. If the instance is compromised:
   * Review the AWS [documentation][3] on remediating a compromised EC2 instance.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_behavior.html#behavior4
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
