---
title: AWS Console Brute Force Login
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: compliance
framework: cis
control: cis-3.6
source: cloudtrail
scope: iam

aliases:
- 8d2-d0c-0b6
---

## Overview

### Goal
Detect when a user is a victim of an Account Take Over (ATO) by a brute force attack.

### Strategy
 This rule monitors CloudTrail and detects when any `@evt.name` has a value of `Console Login`, and `@error.message:` has a value of `Failed authentication`. 

### Triage & Response
1. Determine if the user logged in with 2FA.
2. Reach out to the user and ensure the login was legitimate.