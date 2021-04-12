---
aliases:
- a89-2fc-381
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: iam
security: attack
source: guardduty
tactic: TA0003-persistence
title: AWS IAM user attempting to gain persistence
type: security_rules
---

### Goal
Detect when an AWS IAM user is attempting to gain persistence within an AWS account.

### Strategy
This rule lets you monitor these [GuardDuty integration][1] findings:

* [Persistence:IAMUser/NetworkPermissions][2]
* [Persistence:IAMUser/ResourcePermissions][3]
* [Persistence:IAMUser/UserPermissions][4]


### Triage & Response
1. Determine which user triggered the signal. This can be found in the signal.
2. Determine if the user's credentials are compromised.  
3. If the user's credentials are compromised:
  * Review the AWS [documentation][5] on remediating compromised AWS credentials.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_persistence.html#persistence1
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_persistence.html#persistence2
[4]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_persistence.html#persistence3
[5]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-creds
