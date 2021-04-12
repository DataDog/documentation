---
aliases:
- d6a-d57-3bb
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: attack
source: guardduty
tactic: TA0040-impact
technique: T1496-resource-hijacking
title: AWS EC2 instance participating in a DoS attack
type: security_rules
---

### Goal
Detect when an EC2 instance is participating in a Denial of Service (DoS) attack.

### Strategy
This rule lets you monitor these [GuardDuty integration][1] findings:

* [Backdoor:EC2/DenialOfService.Tcp][2]
* [Backdoor:EC2/DenialOfService.Udp][3]
* [Backdoor:EC2/DenialOfService.Dns][4]
* [Backdoor:EC2/DenialOfService.UdpOnTcpPorts][5]
* [Backdoor:EC2/DenialOfService.UnusualProtocol][6]


### Triage & Response
1. Determine if the EC2 instance is compromised and participating in a DoS attack.
2. If the instance is compromised:
   * Review the AWS [documentation][7] on remediating a compromised EC2 instance.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_backdoor.html#backdoor8
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_backdoor.html#backdoor9
[4]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_backdoor.html#backdoor10
[5]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_backdoor.html#backdoor11
[6]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_backdoor.html#backdoor12
[7]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
