---
aliases:
- dkk-6z8-rmg
- /security_monitoring/default_rules/dkk-6z8-rmg
- /security_monitoring/default_rules/cloudtrail-aws-cloudwatch-rule-disabled-or-deleted
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
title: AWS CloudWatch rule disabled or deleted
type: security_rules
---

## Goal
Detect when a CloudWatch rule has been disabled or deleted.

## Strategy
This rule lets you monitor CloudTrail and detect if a [`DisableRule`][1] or [`DeleteRule`][2] API call has occurred. An attacker may delete rules in an attempt to evade defenses.

## Triage and response
1. Determine if `{{@userIdentity.arn}}` should have made the `{{@evt.name}}` API call.
2. If the API call was **not** made legitimately by the user:
  * Rotate user credentials.
  * Determine what other API calls were made by the user.
  * Enable or create a rule using the `aws-cli` commands [`enable-rule`][4] or [`put-rule`][3], or reference the [AWS documentation][5] to revert the rules back to the last known good state.
3. If the API call was made legitimately by the user:
  * Determine if the user was authorized to make that change.
  * If **Yes**, consider including the EventBus name in a [suppression list][6]: `{{@requestParameters.eventBusName}}`.
  * If **No**, enable or create a rule using the `aws-cli` commands [`enable-rule`][4] or [`put-rule`][3], respectively, or reference the [AWS documentation][5] to revert the rules back to the last known good state.
    * Begin your company's IR process and investigate.

## Changelog
* 4 October 2022 - Updated severity

[1]: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_DeleteRule.html
[2]: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_DisableRule.html
[3]: https://docs.aws.amazon.com/cli/latest/reference/events/put-rule.html
[4]: https://docs.aws.amazon.com/cli/latest/reference/events/enable-rule.html
[5]: https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rules.html
[6]: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/#customize-security-signal-messages-to-fit-your-environment
