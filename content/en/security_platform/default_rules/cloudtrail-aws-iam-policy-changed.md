---
aliases:
- 7b6-2a8-df9
control: cis-3.4
disable_edit: true
framework: cis-aws
kind: documentation
rule_category:
- Log Detection
scope: iam
security: compliance
source: cloudtrail
title: AWS IAM policy changed
type: security_rules
---

### Goal
Detect a change to an AWS IAM Policy.

### Strategy
This rule lets you monitor CloudTrail and detect when any event pertaining to an AWS IAM policy is detected with one of the following API calls:
* [DeleteGroupPolicy][1]
* [DeleteRolePolicy][2]
* [DeleteUserPolicy][3]
* [PutGroupPolicy][4]
* [PutRolePolicy][5]
* [PutUserPolicy][6]
* [CreatePolicy][7]
* [DeletePolicy][8]
* [CreatePolicyVersion][9]
* [DeletePolicyVersion][10]
* [AttachRolePolicy][11]
* [DetachRolePolicy][12]
* [AttachUserPolicy][13]
* [DetachUserPolicy][14]
* [AttachGroupPolicy][15]
* [DetachGroupPolicy][16]

### Triage & Response
1. Review the IAM Policy change and ensure it does not negatively impact your risk in relation to authentication or authorization controls.

[1]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeleteGroupPolicy.html
[2]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeleteRolePolicy.html
[3]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeleteUserPolicy.html
[4]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_PutGroupPolicy.html
[5]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_PutRolePolicy.html
[6]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_PutUserPolicy.html
[7]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreatePolicy.html
[8]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeletePolicy.html
[9]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreatePolicyVersion.html
[10]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeletePolicyVersion.html
[11]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_AttachRolePolicy.html
[12]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DetachRolePolicy.html
[13]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_AttachUserPolicy.html
[14]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DetachUserPolicy.html
[15]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_AttachGroupPolicy.html
[16]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DetachGroupPolicy.html
