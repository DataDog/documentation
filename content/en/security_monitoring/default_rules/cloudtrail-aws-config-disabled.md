---
title: AWS Config Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: compliance
framework: cis
control: cis-3.9
source: cloudtrail
scope: amazon-config
meta_image: /images/integrations_logos/amazon_web_services.png
aliases:
- d17-702-f4a
---

## Overview

### Goal
Detect when an attacker is trying to evade defenses by disabling an AWS configuration.

### Strategy
This rule lets you monitor these CloudTrail API calls to detect if an attacker is trying to stop recording configurations of your AWS resources or trying to delete a delivery channel:

* [StopConfigurationRecorder][1] 
* [DeleteDeliveryChannel][2] 

### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/config/latest/APIReference/API_StopConfigurationRecorder.html
[2]: https://docs.aws.amazon.com/config/latest/APIReference/API_DeleteDeliveryChannel.html
