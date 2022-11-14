---
aliases:
- pph-a76-cco
- /security_monitoring/default_rules/pph-a76-cco
- /security_monitoring/default_rules/impossible-travel-leads-to-permission-enumeration
disable_edit: true
iaas: aws
integration_id: aws
kind: documentation
rule_category:
- Cloud SIEM (Signal Correlation)
scope: aws
security: attack
source: aws
title: Impossible travel event leads to permission enumeration
type: security_rules
---

## Goal
Correlate an impossible travel login with permission enumeration of a user.

## Strategy
Correlate the [User travel was impossible in AWS CloudTrail IAM log][1] and [A user received multiple AccessDenied errors][2] signals based on the ARN: {{@userIdentity.arn}}.

## Triage and response
1. Set signal triage state to `Under Review`.
2. Determine if the impossible travel login was is legitimate.
    * If the login was not legitimate:
        * Investigate the user using the `User Investigation Dashboard`
        * Rotate credentials on the account
        * Enable MFA if it is not already enabled
    * If the login was legitimate:
        * Triage the signal as a false positive

[1]: https://docs.datadoghq.com/security_platform/default_rules/aws-cloudtrail-user-impossible-travel-with-baseline-user-locations
[2]: https://docs.datadoghq.com/security_platform/default_rules/aws-cloudtrail-access-denied-multiple-events
