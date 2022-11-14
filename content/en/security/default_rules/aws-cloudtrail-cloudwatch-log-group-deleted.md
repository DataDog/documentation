---
aliases:
- bif-xha-5if
- /security_monitoring/default_rules/bif-xha-5if
- /security_monitoring/default_rules/aws-cloudtrail-cloudwatch-log-group-deleted
disable_edit: true
iaas: aws
integration_id: amazon-cloudwatch
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: amazon-cloudwatch
security: attack
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: AWS CloudWatch log group deleted
type: security_rules
---

## Goal
Detect when a CloudWatch Log Group is deleted. 

## Strategy
Detect a successful `@evt.name:DeleteLogGroup` event.

## Triage and response
1. Ensure that the `{{@requestParameters.logGroupName}}` log group is not used for auditing or security purposes.
2. If it is then:
    * Ensure that the user: `{{@userIdentity.session_name}}` should be making this API call to your `{{env}}` environment.
    * Consider whitelisting the log group name: `{{@requestParameters.logGroupName}}` through a [suppression list][1]
3. If not, begin your company's IR process and investigate.

<<<<<<< HEAD
[1]: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/#customize-security-signal-messages-to-fit-your-environment
=======
## Changelog
* 11 October 2022 - updated severity.

[1] https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/#customize-security-signal-messages-to-fit-your-environment
>>>>>>> main
