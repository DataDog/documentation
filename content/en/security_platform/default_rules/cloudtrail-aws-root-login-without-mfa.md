---
aliases:
- 76c-a88-8f0
control: cis-3.2
disable_edit: true
framework: cis-aws
kind: documentation
rule_category:
- Log Detection
scope: amazon
security: compliance
source: cloudtrail
title: AWS Console root login without MFA
type: security_rules
---

### Goal
Detect when a root user logs into the AWS console without multi-factor authentication.

### Strategy
Monitor CloudTrail and detect when any `@evt.name` has a value of `Console Login`, `@userIdentity.type` has a value of `Root`, and `@additionalEventData.MFAUsed` has a value of `no`. 

**Note:** This rule ignores logins using SAML because 2FA is implemented on the IdP and not through AWS.

### Triage & Response
1. Reach out to the user to determine if the login was legitimate. 
2. If the login was legitimate, request that the user enables 2FA on the root account. 
3. If the login wasn't legitimate, rotate the credentials. 
4. Review all root user accounts to ensure MFA is enabled. 

**Note:** There is a separate rule to detect [Login without MFA for non-root users][1]. 

[1]: /security_monitoring/default_rules/cloudtrail-aws-login-without-mfa/
