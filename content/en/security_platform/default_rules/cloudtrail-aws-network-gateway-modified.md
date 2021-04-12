---
aliases:
- 6b3-f52-84e
control: cis-3.12
disable_edit: true
framework: cis-aws
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: compliance
source: cloudtrail
title: AWS Network Gateway created or modified
type: security_rules
---

### Goal
Detect when an AWS Network Gateway has been created or modified.

### Strategy
Monitor CloudTrail and detect when an AWS Network Gateway has been created or modified with one of the following API calls:
* [CreateCustomerGateway][1] 
* [DeleteCustomerGateway][2] 
* [AttachInternetGateway][3] 
* [CreateInternetGateway][4]
* [DeleteInternetGateway][5] 
* [DetachInternetGateway][6]

### Triage & Response
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
   * Rotate the user credentials and investigate what other API calls.
   * Determine what other API calls the user made which were not made by the user.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateCustomerGateway
[2]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteCustomerGateway
[3]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_AttachInternetGateway
[4]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateInternetGateway
[5]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteInternetGateway
[6]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DetachInternetGateway.html
