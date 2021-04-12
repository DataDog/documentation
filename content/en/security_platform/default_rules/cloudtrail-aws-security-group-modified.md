---
aliases:
- cca-fc9-b0e
control: cis-3.10
disable_edit: true
framework: cis-aws
kind: documentation
rule_category:
- Log Detection
scope: ec2
security: compliance
source: cloudtrail
title: AWS security group created or modified
type: security_rules
---

### Goal
Detect when an AWS security group has been modified.

### Strategy
Monitor CloudTrail and detect when an AWS security group has been created or modified with one of the following API calls:
* [AuthorizeSecurityGroupIngress][1] 
* [AuthorizeSecurityGroupEgress][2] 
* [RevokeSecurityGroupIngress][3] 
* [RevokeSecurityGroupEgress][4] 
* [CreateSecurityGroup][5] 
* [DeleteSecurityGroup][6]

### Triage & Response
1. Determine who the user was who made this API call.
2. Contact the user and see if this was an API call which was made by the user.
3. If the API call was not made by the user:
   * Rotate the user credentials and investigate what other API calls.
   * Determine what other API calls the user made which were not made by the user.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_AuthorizeSecurityGroupIngress.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_AuthorizeSecurityGroupEgress.html
[3]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RevokeSecurityGroupIngress.html
[4]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_RevokeSecurityGroupEgress.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateSecurityGroup.html
[6]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteSecurityGroup.html
