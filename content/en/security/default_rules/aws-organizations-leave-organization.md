---
aliases:
- f70-oqy-yer
- /security_monitoring/default_rules/f70-oqy-yer
- /security_monitoring/default_rules/aws-organizations-leave-organization
disable_edit: true
iaas: aws
integration_id: cloudtrail
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: cloudtrail
security: attack
source: cloudtrail
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: An AWS account attempted to leave the AWS Organization
type: security_rules
---

## Goal
Detect an AWS account attempting to leave an AWS organization.

## Strategy
This rule allows you to monitor CloudTrail and detect if an attacker has attempted to have an AWS account leave an AWS organization using the [LeaveOrganization][1] API call.

An attacker may attempt this API call for several reasons, such as:

* Target security configurations that are often defined at the organization level. Leaving an organization can disrupt or disable these controls.
* Perform a denial of service (DoS) attack on the victim's account that prevents the victim's organization to access it.

## Triage and response
1. Determine if `{{@userIdentity.arn}}` should have made the `{{@evt.name}}` API call.
2. If the API call was not made by the user:
  * Rotate user credentials.
  * Determine what other API calls were made by the user.
  * Initiate your company's incident response (IR) process.
3. If the API call was made legitimately by the user:
  * Communicate with the user to understand if this was a planned action.
  * If No, see if other API calls were made by the user and determine if they warrant further investigation.
  * Initiate your company's incident response (IR) process.

[1]: https://docs.aws.amazon.com/organizations/latest/APIReference/API_LeaveOrganization.html
[2]: https://docs.aws.amazon.com/IAM/latest/APIReference/API_AttachGroupPolicy.html
[3]: https://docs.aws.amazon.com/cli/latest/reference/iam/detach-group-policy.html
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#grant-least-privileg
