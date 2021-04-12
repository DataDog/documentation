---
aliases:
- 5f8-ed8-0d6
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: attack
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1066-indicator-removal-from-tools
title: AWS FlowLogs removed
type: security_rules
---

### Goal
Detect when an attacker is removing FlowLogs to cover their tracks.

### Strategy
This rule lets you monitor this CloudTrail API call to detect if an attacker is deleting FlowLogs:

* [DeleteFlowLogs][1]

### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteFlowLogs.html
