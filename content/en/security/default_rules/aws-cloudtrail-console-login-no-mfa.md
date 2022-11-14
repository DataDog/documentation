---
aliases:
- 208-e1f-0f9
- /security_monitoring/default_rules/208-e1f-0f9
- /security_monitoring/default_rules/aws-cloudtrail-console-login-no-mfa
control: '4.2'
disable_edit: true
framework: cis-aws
iaas: aws
integration_id: iam
kind: documentation
requirement: Monitoring
rule_category:
- Cloud SIEM (Log Detection)
scope: iam
security: attack
source: cloudtrail
tactic: TA0001-initial-access
technique: T1078-valid-accounts
title: AWS Console login without MFA
type: security_rules
---

## Goal
Detect when any user logs in to your AWS console without multi-factor authentication.

## Strategy
This rule monitors CloudTrail and detects when any `IAMUser` or `Root` user does a `Console Login`, and `@userIdentity.sessionContext.attributes.mfaAuthenticated` has a value of `false`. 

**Notes:** 

- This rule triggers with a `High` severity if the user logging in is a `Root` user.
- This rule ignores logins using SAML because 2FA is implemented on the IdP and not through AWS.

## Triage and response
1. Reach out to the {{@usr.name}} to determine if the login was legitimate. 
   * Use Cloud SIEM - User Investigation dashboard to see if the user: {{@usr.name}} with an account type of: {{@userIdentity.type}} has done any actions after logging in. 
2. If the login was legitimate, request that the user enables 2FA. 
3. If the login wasn't legitimate, rotate the credentials, enable 2FA and triage an actions uncovered from step 1.
4. Review all user accounts to ensure MFA is enabled.

## Changelog
3 March 2022 - Rule updated
