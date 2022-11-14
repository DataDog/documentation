---
aliases:
- otd-at8-rcy
- /security_monitoring/default_rules/otd-at8-rcy
- /security_monitoring/default_rules/aws-ec2-getpasswordata-error
disable_edit: true
iaas: aws
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: attack
source: cloudtrail
tactic: TA0006-credential-access
technique: T1555-credentials-from-password-stores
title: Encrypted administrator password retrieved for Windows EC2 instance
type: security_rules
---

## Goal
Detect a user attempting to retrieve the encrypted Administrator password for a Windows EC2 instance.

## Strategy
This rule allows you to monitor CloudTrail and detect if an attacker has attempted to retrieve the encrypted Administrator password for a Windows EC2 instance using the [`GetPasswordData`][1] API call.

## Triage and response
1. Determine if `{{@userIdentity.session_name}}` should have made a `{{@evt.name}}` API call.
2. If the API call was not made by the user:
  * Rotate user credentials.
  * Determine what other API calls were made by the user.
3. If the API call was made by the user:
  * Determine if this user should be accessing this EC2 instance.
  * If Yes, advise the user to speak with the instance owner to resolve the error.
  * If No, see if other API calls were made by the user and determine if they warrant further investigation.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_GetPasswordData.html
