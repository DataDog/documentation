---
title: AWS Console Login Without MFA
kind: documentation
parent: cloudtrail
tags:
- security:compliance
meta_image: /images/integrations_logos/amazon_cloudtrail.png
---
## **Goal:**
Detect when any user logs in to the AWS console without MFA

## **Strategy:**
Monitor CloudTrail and detect when any `@evt.name` is equal to `Console Login`, and `@additionalEventData.MFAUsed` is equal to `no`. 

## **Triage & Response:**
1. Reach out to the user and ensure the login was legitimate
2. Request the user to enable 2FA
3. Review all user accounts and ensure MFA is enabled on all accounts 

**Note:** There is a separate rule to detect Root Login without MFA.

**Note:** This rule ignores logins via SAML because the 2FA is implemented on the IdP, not at AWS.