---
aliases:
- 998-f99-7bd
- /security_monitoring/default_rules/998-f99-7bd
- /security_monitoring/default_rules/aws-eventbridge-rule-disabled-or-deleted
disable_edit: true
iaas: aws
integration_id: eventbridge
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: eventbridge
security: attack
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1089-disabling-security-tools
title: AWS EventBridge rule disabled or deleted
type: security_rules
---

## Goal
Detect when an attacker is trying to evade defenses by deleting or disabling EventBridge rules.

## Strategy
This rule lets you monitor these CloudTrail API calls to detect if an attacker is modifying or disabling EventBridge rules:

* [DeleteRule][1]
* [DisableRule][2]

## Triage and response
1. Determine if the arn: {{@userIdentity.arn}} should have made the {{@evt.name}} API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

**NOTE:** Your organization should tune out user agents that are valid and triggering this signal. To do this, see our [Fine-tune security signals to reduce noise][3] blog.

## Changelog
4 April 2022 - Rule query, options and signal markdown updated.

[1]: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_DeleteRule.html
[2]: https://docs.aws.amazon.com/eventbridge/latest/APIReference/API_DisableRule.html
[3]: https://www.datadoghq.com/blog/writing-datadog-security-detection-rules/#fine-tune-security-signals-to-reduce-noise
