---
aliases:
- 388-936-903
- /security_monitoring/default_rules/388-936-903
- /security_monitoring/default_rules/guardduty-aws-iam-user-using-hacking-tools
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: iam
security: attack
source: guardduty
tactic: TA0007-discovery
technique: T1580-cloud-infrastructure-discovery
title: AWS IAM user making API requests with hacking tools
type: security_rules
---

## Goal
Detect when an AWS IAM user makes API requests with hacking tools.

## Strategy
This rule lets you monitor these [GuardDuty integration][1] findings:

* [PenTest:IAMUser/KaliLinux][2]
* [PenTest:IAMUser/ParrotLinux][3]
* [PenTest:IAMUser/PentooLinux][4]

## Triage and response
1. Determine which user triggered the signal. This can be found in the signal.
2. Determine if the user's credentials are compromised.  
3. If the user's credentials are compromised:
  * Review the AWS [documentation][5] on remediating compromised AWS credentials.

## Changelog
* 17 October 2022 - Updated tags.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_pentest.html#pentest1
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_pentest.html#pentest2
[4]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_pentest.html#pentest3
[5]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-creds
