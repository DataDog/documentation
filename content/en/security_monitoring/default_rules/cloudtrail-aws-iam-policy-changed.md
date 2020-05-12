---
title: AWS IAM Policy Changed
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
src_img: /images/integrations_logos/amazon_cloudtrail.png
security: compliance
framework: cis
control: cis-3.4
source: cloudtrail
scope: iam

aliases:
- 7b6-2a8-df9
---

## Overview

### Goal
Detect a change to an AWS IAM Policy.

### Strategy
This rule lets you monitor CloudTrail and detect when any event pertaining to an AWS IAM policy is detected with one of the following API calls:
* [DeleteGroupPolicy][1]
* [DeleteRolePolicy][2]
* [DeleteUserPolicy][3]
* [PutGroupPolicy][4]
* [PutRolePolicy]
* [PutUserPolicy][5]
* [CreatePolicy]
* [DeletePolicy][6]
* [CreatePolicyVersion][7]
* [DeletePolicyVersion][8]
* [AttachRolePolicy][9]
* [DetachRolePolicy][10]
* [AttachUserPolicy][11]
* [DetachUserPolicy][12]
* [AttachGroupPolicy][13]
* [DetachGroupPolicy][14]

### Triage & Response
1. Review the IAM Policy change and ensure it does not negatively impact your risk in relation to authentication or authorization controls.

[1]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeleteGroupPolicy.html
[2]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeleteRolePolicy.html
[3]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeleteUserPolicy.html
[4]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_PutGroupPolicy.html
[5]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_PutUserPolicy.html
[6]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeletePolicy.html
[7]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_CreatePolicyVersion.html
[8]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DeletePolicyVersion.html
[9]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_AttachRolePolicy.html
[10]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DetachRolePolicy.html
[11]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_AttachUserPolicy.html
[12]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DetachUserPolicy.html
[13]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_AttachGroupPolicy.html
[14]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_DetachGroupPolicy.html
