---
title: AWS Console Root Login Without MFA
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: compliance
framework: cis
control: cis-3.2
source: cloudtrail
scope: amazon
meta_image: /images/integrations_logos/amazon_web_services.png
aliases:
- 76c-a88-8f0
---

## Overview

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
