---
title: AWS Unauthorized Activity
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: compliance
framework: cis
control: cis-3.1
source: cloudtrail
scope: amazon
meta_image: /images/integrations_logos/amazon_web_services.png
aliases:
- 1b1-37a-74c
---

## Overview

### Goal
Detect when unauthorized activity is detected in AWS.

### Strategy
This rule lets you monitor CloudTrail to detect when the error message of `AccessDenied` is returned.

### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.
