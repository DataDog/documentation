---
title: AWS VPC Created or Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: compliance
framework: cis
control: cis-3.14
source: cloudtrail
scope: ec2
meta_image: /images/integrations_logos/amazon_ec2.png
aliases:
- f6b-3b4-aef
---

## Overview

### Goal
Detect when an attacker is destroying a VPC.

### Strategy
This rule lets you monitor this CloudTrail API call to detect if an attacker is deleting a VPC:

* [DeleteVpc][1]

### Triage & Response
1. Determine which user in your organization owns the API key that made this API call.
2. Contact the user to see if they intended to make this API call.
3. If the user did not make the API call:
 * Rotate the credentials.
 * Investigate if the same credentials made other unauthorized API calls.

[1]: https://docs.aws.amazon.com/cli/latest/reference/ec2/delete-vpc.html
