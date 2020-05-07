---
title: AWS Network Access Control List Created or Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: compliance
framework: cis
control: cis-3.11
source: cloudtrail
scope: ec2
meta_image: /images/integrations_logos/amazon_ec2.png
aliases:
- 282-cf7-5c4
---

## Overview

### Goal
Detect when an AWS Network Access Control List (NACL) has been created or modified.

### Strategy
This rule lets you monitor CloudTrail and detect when an AWS NACL has been created or modified with one of the following API calls:
* [CreateNetworkAcl][1] 
* [CreateNetworkAclEntry][2] 
* [DeleteNetworkAcl][3] 
* [DeleteNetworkAclEntry][4] 
* [ReplaceNetworkAclEntry][5] 
* [ReplaceNetworkAclAssociation][6]

### Triage & Response
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
   * Rotate the user credentials and investigate what other API calls.
   * Determine what other API calls the user made which were not made by the user.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateNetworkAcl.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateNetworkAclEntry.html
[3]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteNetworkAcl.html
[4]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteNetworkAclEntry.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ReplaceNetworkAclEntry.html
[6]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ReplaceNetworkAclAssociation.html
