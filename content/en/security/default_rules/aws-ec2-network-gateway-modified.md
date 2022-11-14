---
aliases:
- 6b3-f52-84e
- /security_monitoring/default_rules/6b3-f52-84e
- /security_monitoring/default_rules/aws-ec2-network-gateway-modified
control: '4.12'
disable_edit: true
framework: cis-aws
iaas: aws
integration_id: ec2
kind: documentation
requirement: Monitoring
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: compliance
source: cloudtrail
title: AWS Network Gateway created or modified
type: security_rules
---

## Goal
Detect when an AWS Network Gateway has been created or modified.

## Strategy
Monitor CloudTrail and detect when an AWS Network Gateway has been created or modified with one of the following API calls:
* [CreateCustomerGateway][1] 
* [DeleteCustomerGateway][2] 
* [AttachInternetGateway][3] 
* [CreateInternetGateway][4]
* [DeleteInternetGateway][5] 
* [DetachInternetGateway][6]

## Triage and response
1. Determine if the API call: {{@evt.name}} should have occurred.
2. If it shouldn't have been made:
   * Contact the user: {{@userIdentity.arn}} and see if they made the API call.
3. If the API call was not made by the user:
   * Rotate the user credentials.
   * Determine what other API calls were made with the old credentials that were not made by the user.

## Changelog
6 April 2022 - Updated rule cases and signal message.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateCustomerGateway 
[2]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteCustomerGateway 
[3]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_AttachInternetGateway 
[4]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateInternetGateway 
[5]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteInternetGateway 
[6]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DetachInternetGateway.html
