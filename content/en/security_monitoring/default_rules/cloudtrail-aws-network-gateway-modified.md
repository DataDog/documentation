---
title: AWS Network Gateway Created or Modified
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_/
src_img: /images/integrations_logos/amazon_.png
security: compliance
framework: cis
control: cis-3.12

aliases:
- 6b3-f52-84e
---

## Overview

### Goal
Detect when an AWS Network Gateway has been created or modified.

### Strategy
Monitor CloudTrail and detect when an AWS Network Gateway has been created or modified with one of the following API calls:
* [CreateCustomerGateway][1] 
* [DeleteCustomerGateway][1] 
* [AttachInternetGateway][2] 
* [CreateInternetGateway][3] 
* [DeleteInternetGateway][4] 
* [DetachInternetGateway][5]

### Triage & Response
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
   * Rotate the user credentials and investigate what other API calls.
   * Determine what other API calls the user made which were not made by the user.[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateCustomerGateway
[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteCustomerGateway
[2]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_AttachInternetGateway
[3]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateInternetGateway
[4]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteInternetGateway
[5]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DetachInternetGateway.html
