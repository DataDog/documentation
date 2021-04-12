---
aliases:
- 6b8-6d0-cae
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: anomaly
source: guardduty
title: AWS EC2 instance communicating over unusual port
type: security_rules
---

### Goal
Detect when an EC2 instance is communicating over an unusual port.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [Behavior:EC2/NetworkPortUnusual][2]


### Triage & Response
1. Determine which port triggered the signal. This can be found in the samples.
2. If the instance is compromised:
   * Review the AWS [documentation][3] on remediating a compromised EC2 instance.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_behavior.html#behavior3
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
