---
aliases:
- fd3-1aa-d7d
- /security_monitoring/default_rules/fd3-1aa-d7d
- /security_monitoring/default_rules/aws-ec2-route-table-modified
control: '4.13'
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
title: AWS Route Table created or modified
type: security_rules
---

## Goal
Detect when an AWS Route Table has been created or modified.

## Strategy
This rule lets you monitor CloudTrail and detect when an AWS Route Table has been created or modified with one of the following API calls:
* [CreateRoute][1] 
* [CreateRouteTable][2] 
* [ReplaceRoute][3] 
* [ReplaceRouteTableAssociation][4] 
* [DeleteRouteTable][5] 
* [DeleteRoute][6] 
* [DisassociateRouteTable][7]

## Triage and response
1. Determine if {{@userIdentity.arn}} is expected to perform the {{@evt.name}} API call.
2. Contact the principal owner and see if this was an API call which was made by the user.
3. If the API call was not made by the user, rotate the user credentials and investigate what other APIs were successfully accessed.

## Changelog
6 April 2022 - Update signal message. Updated rule query/case layout

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateRoute.html 
[2]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_CreateRouteTable 
 [3]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ReplaceRoute.html 
 [4]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ReplaceRouteTableAssociation 
 [5]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteRouteTable.html 
 [6]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DeleteRoute.html 
 [7]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_DisassociateRouteTable.html
