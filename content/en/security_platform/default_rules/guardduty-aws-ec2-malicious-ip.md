---
aliases:
- 933-c10-749
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: threat-intel
source: guardduty
title: AWS EC2 instance communicating with malicious IP
type: security_rules
---

### Goal
Detect when an EC2 instance makes an outbound network connection to a malcious IP address.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [UnauthorizedAccess:EC2/MaliciousIPCaller.Custom][2]


### Triage & Response
1. Determine which IP address triggered the signal. This can be found in the sample.
2. If the instance is compromised:
   * Review the AWS [documentation][3] on remediating a compromised EC2 instance.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized5
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-creds
