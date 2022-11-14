---
aliases:
- v5u-24i-koa
- /security_monitoring/default_rules/v5u-24i-koa
- /security_monitoring/default_rules/aws-signal-correlation-login-assumed-role
disable_edit: true
iaas: aws
integration_id: aws
kind: documentation
rule_category:
- Cloud SIEM (Signal Correlation)
scope: aws
security: attack
source: aws
title: Brute forced ConsoleLogin event correlates with an assumed role event
type: security_rules
---

## Goal
Correlate a bruteforce login with a user attempting to assume an anomalous number of roles.

## Strategy
Correlate the [Potential brute force attack on AWS ConsoleLogin][1] and [Anomalous number of assumed roles from user][2] signals based on the ARN: {{@userIdentity.arn}}.

## Triage and response
1. Set signal triage state to `Under Review`.
2. Determine if the brute force attack was successful.
    * If the login was not legitimate:
        * Investigate the user using the `User Investigation Dashboard`
        * Rotate credentials on the brute forced account
        * Enable MFA if it is not already enabled
    * If the login was legitimate:
        * Triage the signal as a false positive

[1]: https://docs.datadoghq.com/security_platform/default_rules/aws-iam-brute-force-consolelogin/
[2]: https://docs.datadoghq.com/security_platform/default_rules/cloudtrail-aws-user-attempted-to-assumerole-anomaly
