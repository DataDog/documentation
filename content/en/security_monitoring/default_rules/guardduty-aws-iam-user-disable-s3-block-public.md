---
title: AWS IAM User Disabled S3 Block Public Access
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
security: compliance
source: guardduty
scope: iam

aliases:
- ab4-bab-93b
---

## Overview

### Goal
Detect when an AWS IAM user disables [S3 Block Public Access][1]

### Strategy
This rule lets you monitor this [GuardDuty integration][2] finding:

* [Policy:IAMUser/S3BlockPublicAccessDisabled][3]


### Triage & Response
1. Determine which user triggered the signal. This can be found in the signal.
2. Contact the user and determine why the user disabled the S3 Block Access feature.   
3. Re-enable S3 Block Public Access.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html
[2]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_policy.html#policy2
