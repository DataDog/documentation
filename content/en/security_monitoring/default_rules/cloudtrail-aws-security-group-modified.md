---
title: AWS Security Group Created or Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_/
src_img: /images/integrations_logos/amazon_.png
security: compliance
framework: cis
control: cis-3.10

aliases:
- cca-fc9-b0e
---

## Overview

### Goal
Detect when an AWS security group has been modified.

### Strategy
Monitor CloudTrail and detect when an AWS security group has been created or modified with one of the following API calls:
* [AuthorizeSecurityGroupIngress][1] 
* [AuthorizeSecurityGroupEgress][1] 
* [RevokeSecurityGroupIngress][2] 
* [RevokeSecurityGroupEgress][3] 
* [CreateSecurityGroup][4] 
* [DeleteSecurityGroup][5]

### Triage & Response
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
   * Rotate the user credentials and investigate what other API calls.
   * Determine what other API calls the user made which were not made by the user.[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_AuthorizeSecurityGroupIngress.html
[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_AuthorizeSecurityGroupEgress.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RevokeSecurityGroupIngress.html
[3]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RevokeSecurityGroupEgress.html
[4]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateSecurityGroup.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteSecurityGroup.html
