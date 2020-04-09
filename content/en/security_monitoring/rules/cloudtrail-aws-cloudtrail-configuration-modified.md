---
title: AWS CloudTrail Configuration Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: compliance
framework: cis
control: cis-3.5
source: cloudtrail
scope: cloudtrail
meta_image: /images/integrations_logos/amazon_cloudtrail.png
aliases:
- cf4-844-4a0
---

## Overview

### Goal
Detect when an attacker is trying to evade defenses by disabling or modifying CloudTrail.

### Strategy
Monitor CloudTrail and detect when CloudTrail is being disabled via one of the following API calls:

* [DeleteTrail][1]
* [UpdateTrail][2]
* [StopLogging][3]

### Triage & Response
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
 * Rotate the user credentials and investigate what other API calls.
 * Determine what other API calls the user made which were not made by the user.

[1]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_DeleteTrail.html
[2]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_UpdateTrail.html
[3]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_StopLogging.html
