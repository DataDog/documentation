---
aliases:
- 5f8-ed8-0d6
- /security_monitoring/default_rules/5f8-ed8-0d6
- /security_monitoring/default_rules/aws-ec2-flowlogs-removed
disable_edit: true
iaas: aws
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: attack
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1066-indicator-removal-from-tools
title: AWS FlowLogs removed
type: security_rules
---

## Goal
Detect when an attacker is removing a FlowLogs collector.

## Strategy
This rule lets you monitor this EC2 API call:

* [DeleteFlowLogs][1]

## Triage and response
1. Determine if arn: {{@userIdentity.arn}} should make this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

## Changelog
4 April 2022 - Rule query and signal message updated.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteFlowLogs.html
