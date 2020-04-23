---
title: AWS EBS Default Encryption Disabled
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: compliance
source: cloudtrail
scope: ec2
meta_image: /images/integrations_logos/amazon_ec2.png
aliases:
- ee2-dc1-3c1
---

## Overview

### Goal
Detect when an EBS encryption is disabled by default. 

### Strategy
Monitor CloudTrail and detect when EBS encryption is disabled by default via the following API call:

* [DisableEbsEncryptionByDefault][1]

### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user and let them know that it is best practice to enable EBS encryption by default.
3. Re-enable EBS encryption by default.

For more information about Amazon EBS Encryption, check out the [Amazon EBS Encryption][2] documentation.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DisableEbsEncryptionByDefault.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html
