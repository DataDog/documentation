---
aliases:
- ulv-v8e-zfk
- /security_monitoring/default_rules/ulv-v8e-zfk
- /security_monitoring/default_rules/aws-iam-priv-policy-applied-to-user
disable_edit: true
iaas: aws
integration_id: iam
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: iam
security: attack
source: cloudtrail
tactic: TA0004-privilege-escalation
title: AWS IAM privileged policy was applied to a user
type: security_rules
---

## Goal
Detect when the `AdministratorAccess` policy is attached to an AWS IAM user.

## Strategy
This rule allows you to monitor CloudTrail and detect if an attacker has attached the AWS managed policy [`AdministratorAccess`][1] to an AWS IAM user using the [`AttachUserPolicy`][2] API call.

## Triage and response
1. Determine if `{{@userIdentity.session_name}}` should have made a `{{@evt.name}}` API call.
2. If the API call was not made by the user:
  * Rotate user credentials.
  * Determine what other API calls were made by the user.
  * Remove the `AdministratorAccess` policy from the `{{@requestParameters.userName}}` user using the `aws-cli` command [detach-user-policy][3].
3. If the API call was made legitimately by the user:
  * Determine if the user `{{@requestParameters.userName}}` requires the AdministratorAccess policy to perform the intended function.
  * Advise the user to find the [least privileged][4] policy that allows the user to operate as intended.

[1]: https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_job-functions.html#jf_administrator
[2]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_AttachUserPolicy.html
[3]: https://docs.aws.amazon.com/cli/latest/reference/iam/detach-user-policy.html
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privilege
