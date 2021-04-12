---
aliases:
- a90-d33-371
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: attack
source: guardduty
tactic: TA0040-impact
technique: T1496-resource-hijacking
title: AWS EC2 instance Sending spam emails
type: security_rules
---

### Goal
Detect when an EC2 instance is compromised and sending spam emails.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [Backdoor:EC2/Spambot][2]


### Triage & Response
1. Determine if the EC2 should be sending out email over port 25. 
2. If the instance is compromised:
   * Review the AWS [documentation][3] on remediating a compromised EC2 instance.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_backdoor.html#backdoor6
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
