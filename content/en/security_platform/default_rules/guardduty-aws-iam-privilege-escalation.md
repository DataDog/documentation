---
aliases:
- 2c1-7bc-7ac
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: iam
security: attack
source: guardduty
tactic: TA0004-privilege-escalation
title: AWS IAM user escalating privileges
type: security_rules
---

### Goal
Detect when an AWS IAM user is attempting to escalate permissions.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [PrivilegeEscalation:IAMUser/AdministrativePermissions][2]


### Triage & Response
1. Determine which user triggered the signal. This can be found in the signal.
2. Determine if the user's credentials are compromised.  
3. If the user's credentials are compromised:
  * Review the AWS [documentation][3] on remediating compromised AWS credentials.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_privilegeescalation.html#privilegeescalation1
