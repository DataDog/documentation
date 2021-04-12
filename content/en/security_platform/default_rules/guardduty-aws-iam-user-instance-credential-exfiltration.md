---
aliases:
- f57-e0b-478
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: threat-intel
source: guardduty
title: AWS EC2 instance credential exfiltrated
type: security_rules
---

### Goal
Detect when an AWS API call is made from a non EC2 IP for a credential which is scoped to an EC2 Instance.  

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [UnauthorizedAccess:IAMUser/InstanceCredentialExfiltration][2]


### Triage & Response
1. Determine the EC2 instance this credential is scoped to. This can be found in the samples. 
2. Determine if the EC2 instance credentials are compromised.  
3. If the instance is compromised:
   * Review the AWS [documentation][3] on remediating a compromised EC2 instance.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized11
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
