---
aliases:
- vur-0bv-k08
- /security_monitoring/default_rules/vur-0bv-k08
- /security_monitoring/default_rules/aws-signal-correlation-login-applied-role
disable_edit: true
iaas: aws
integration_id: aws
kind: documentation
rule_category:
- Cloud SIEM (Signal Correlation)
scope: aws
security: attack
source: aws
title: ConsoleLogin event correlates privileged policy applying to a role
type: security_rules
---

## Goal
Correlate a brute force login with a privileged policy being applied to a role.

## Strategy
Correlate the [Potential brute force attack on AWS ConsoleLogin][1] and [AWS IAM privileged policy was applied to a role][2] signals based on the ARN: {{@userIdentity.arn}}.

## Triage and response
1. Set signal triage state to `Under Review`.
2. Determine if the brute force attack was successful.
    * If the login was not legitimate:
        * Revert the privileged policy change
        * Rotate credentials on the brute forced account
        * Enable MFA if it is not already
    * If the login was legitimate:
        * Triage the signal as a false positive

[1]: https://docs.datadoghq.com/security_platform/default_rules/aws-iam-brute-force-consolelogin/
[2]: https://docs.datadoghq.com/security_platform/default_rules/aws-iam-priv-policy-applied-to-role/
