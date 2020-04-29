---
title: AWS Route Table Created or Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: compliance
framework: cis
control: cis-3.13
source: cloudtrail
scope: ec2
meta_image: /images/integrations_logos/amazon_ec2.png
aliases:
- fd3-1aa-d7d
---

## Overview

### Goal
Detect when an AWS Route Table has been created or modified.

### Strategy
This rule lets you monitor CloudTrail and detect when an AWS Route Table has been created or modified with one of the following API calls:
* [CreateRoute][1] 
* [CreateRouteTable][2] 
* [ReplaceRoute][3] 
* [ReplaceRouteTableAssociation][4] 
* [DeleteRouteTable][5] 
* [DeleteRoute][6] 
* [DisassociateRouteTable][7]

### Triage & Response
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
   * Rotate the user credentials and investigate what other API calls.
   * Determine what other API calls the user made which were not made by the user.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateRoute.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateRouteTable
[3]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ReplaceRoute.html
[4]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ReplaceRouteTableAssociation
[5]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteRouteTable.html
[6]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteRoute.html
[7]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DisassociateRouteTable.html
