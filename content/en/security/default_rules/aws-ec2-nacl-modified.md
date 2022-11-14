---
aliases:
- 282-cf7-5c4
- /security_monitoring/default_rules/282-cf7-5c4
- /security_monitoring/default_rules/aws-ec2-nacl-modified
control: '4.11'
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
title: AWS Network Access Control List created or modified
type: security_rules
---

## Goal
Detect when an AWS Network Access Control List (NACL) has been created, deleted or modified.

## Strategy
This rule lets you monitor CloudTrail and detect when an AWS NACL has been created, deleted or modified with one of the following API calls:
* [CreateNetworkAcl][1] 
* [CreateNetworkAclEntry][2] 
* [DeleteNetworkAcl][3] 
* [DeleteNetworkAclEntry][4] 
* [ReplaceNetworkAclEntry][5] 
* [ReplaceNetworkAclAssociation][6]

## Triage and response
1. Determine if the usr with arn: {{@userIdentity.arn}} should have used the API call: {{@evt.name}}.
2. Contact the user and see if this API call was made by the user.
3. If the API call was not made by the user:
   * Rotate the user credentials and investigate what other API calls.
   * Determine what other API calls the user made which were not made by the user.

## Changelog
5 April 2022 - Rule queries, cases and signal message updated.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateNetworkAcl.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateNetworkAclEntry.html
[3]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteNetworkAcl.html
[4]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteNetworkAclEntry.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ReplaceNetworkAclEntry.html
[6]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ReplaceNetworkAclAssociation.html
