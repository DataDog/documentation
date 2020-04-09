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
Detect when the root user logs into the AWS console without MFA

### Strategy
Monitor CloudTrail and detect when any `@evt.name` is equal to `Console Login`, `@userIdentity.type` is equal to `Root`, and `@additionalEventData.MFAUsed` is equal to `no`. 

### Triage & Response
1. Determine who logged into the root user account and ensure the login was legitimate
2. Enable 2FA on the root account
3. Review all user accounts and ensure MFA is enabled on all accounts 

**[Root Account Best Practices][1]**

**Note:** There is a seperate rule to detect login without MFA for non root users.

**Note:** This rule ignores logins via SAML because the 2FA is implemented on the IdP, not at AWS.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html
