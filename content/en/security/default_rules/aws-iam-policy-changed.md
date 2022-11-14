---
aliases:
- 7b6-2a8-df9
- /security_monitoring/default_rules/7b6-2a8-df9
- /security_monitoring/default_rules/aws-iam-policy-changed
control: '4.4'
disable_edit: true
framework: cis-aws
iaas: aws
integration_id: iam
kind: documentation
requirement: Monitoring
rule_category:
- Cloud SIEM (Log Detection)
scope: iam
security: attack
source: cloudtrail
tactic: TA0003-persistence
technique: T1098-account-manipulation
title: AWS IAM policy changed
type: security_rules
---

## Goal
Detect a change to an AWS IAM Policy.

## Strategy
This rule lets you monitor CloudTrail and detect when any event pertaining to an AWS IAM policy is detected with one of the following API calls:

* [DeleteGroupPolicy][1]
* [DeleteRolePolicy][16]
* [DeleteUserPolicy][2]
* [PutGroupPolicy][3]
* [PutRolePolicy][4]
* [PutUserPolicy][5]
* [CreatePolicy][6]
* [DeletePolicy][7]
* [SetPolicyVersion][17]
* [CreatePolicyVersion][8]
* [DeletePolicyVersion][9]
* [AttachRolePolicy][10]
* [DetachRolePolicy][11]
* [AttachUserPolicy][12]
* [DetachUserPolicy][13]
* [AttachGroupPolicy][14]
* [DetachGroupPolicy][15]

## Triage and response
1. Review the IAM Policy change and ensure it does not negatively impact your risk in relation to authentication or authorization controls.
2. If risk is increased, contact the individual that used the arn: {{@userIdentity.arn}} and determine if {{@evt.name}} API calls were made by them.

## Changelog
5 April 2022 - Rule modified and signal message updated.

[1]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeleteGroupPolicy.html
[2]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeleteUserPolicy.html
[3]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_PutGroupPolicy.html
[4]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_PutRolePolicy.html
[5]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_PutUserPolicy.html
[6]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreatePolicy.html
[7]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeletePolicy.html
[8]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreatePolicyVersion.html
[9]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeletePolicyVersion.html
[10]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_AttachRolePolicy.html
[11]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DetachRolePolicy.html
[12]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_AttachUserPolicy.html
[13]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DetachUserPolicy.html
[14]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_AttachGroupPolicy.html
[15]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DetachGroupPolicy.html
[16]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeleteRolePolicy.html
[17]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_SetDefaultPolicyVersion.html
