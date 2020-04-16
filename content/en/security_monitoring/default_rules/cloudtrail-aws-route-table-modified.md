---
title: AWS Route Table Created or Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_/
src_img: /images/integrations_logos/amazon_.png
security: compliance
framework: cis
control: cis-3.13

aliases:
- fd3-1aa-d7d
---

## Overview

### Goal
Detect when an AWS Route Table has been created or modified.

### Strategy
Monitor CloudTrail and detect when an AWS Route Table has been created or modified with one of the following API calls:
* [CreateRoute][1] 
* [CreateRouteTable][1] 
* [ReplaceRoute][2] 
* [ReplaceRouteTableAssociation][3] 
* [DeleteRouteTable][4] 
* [DeleteRoute][5] 
* [DisassociateRouteTable][6]

### Triage & Response
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
   * Rotate the user credentials and investigate what other API calls.
   * Determine what other API calls the user made which were not made by the user.[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateRoute.html
[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateRouteTable
[2]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ReplaceRoute.html
[3]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ReplaceRouteTableAssociation
[4]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteRouteTable.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteRoute.html
[6]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DisassociateRouteTable.html
