---
aliases:
- m4l-btf-8cs
- /security_monitoring/default_rules/m4l-btf-8cs
- /security_monitoring/default_rules/aws-security-hub-disabled
disable_edit: true
iaas: aws
integration_id: cloudtrail
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: cloudtrail
security: attack
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: AWS Security Hub disabled
type: security_rules
---

## Goal
Detect when a user disables AWS Security Hub.

## Strategy
This rule lets you monitor this CloudTrail API call to detect if a user has disabled AWS Security Hub:

* [DisableSecurityHub][1]

## Triage and response
1. Determine if {{@userIdentity.arn}} is expected to perform the {{@evt.name}} API call on the account: {{@usr.account_id}}.
2. Contact the principal owner and see if this was an API call that was made by the user.
3. If the API call was not made by the user, rotate the user credentials and investigate what other APIs were successfully accessed.
   * Rotate the credentials.
   * Investigate if the same credentials made other unauthorized API calls.

## Changelog
7 April 2022 - Updated rule query and signal message.

[1]: https://docs.aws.amazon.com/securityhub/1.0/APIReference/API_DisableSecurityHub.html
