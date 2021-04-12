---
aliases:
- e81-5e9-154
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: attack
source: guardduty
tactic: TA0007-discovery
technique: T1046-network-service-scanning
title: AWS EC2 instance conducting a port scan
type: security_rules
---

### Goal
Detect when an EC2 instance is conducting a port scan.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [Recon:EC2/Portscan][2]


### Triage & Response
1. Determine why traffic from the EC2 instance appears to be conducting a port scan.
2. If the instance is compromised:
   * Review the AWS [documentation][3] on remediating a compromised EC2 instance.
 
[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#recon5
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
