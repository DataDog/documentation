---
aliases:
- bd9-8o0-553
- /security_monitoring/default_rules/bd9-8o0-553
- /security_monitoring/default_rules/cloudtrail-aws-ec2-modify-user-data-priv-escalation
disable_edit: true
iaas: aws
integration_id: ec2
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: ec2
security: attack
source: cloudtrail
tactic: TA0004-privilege-escalation
technique: T1037-boot-or-logon-initialization-scripts
title: Possible AWS EC2 privilege escalation via the modification of user data
type: security_rules
---

## Goal
Detect a user attempting to modify a [user data script][1] on an EC2 instance.

## Strategy
This rule allows you to monitor CloudTrail and detect if an attacker has attempted to modify the user data script on an EC2 instance using the following API calls:

* [`StopInstances`][2]
* [`ModifyInstanceAttribute`][3]
* [`StartInstances`][4]

## Triage and response
1. Determine if `{{@userIdentity.session_name}}` should have modified the user data script associated with `{{host}}`.
2. If the API calls were not made by the user:
  * Rotate user credentials.
  * Determine what other API calls were made by the user.
  * Follow your company's incident response process to determine the impact to `{{host}}`.
  * Revert the user data script to the last known good state with the `aws-cli` command [modify-instance-attribute][5] or use the [AWS Console][6].
3. If the API calls were made by the user:
  * Determine if the user should be modifying this user data script.
  * If No, see if other API calls were made by the user and determine if they warrant further investigation.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html
[2]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_StopInstances.html
[3]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_ModifyInstanceAttribute.html
[4]: https://docs.aws.amazon.com/AWSEC2/latest/APIReference/API_StartInstances.html
[5]: https://docs.aws.amazon.com/cli/latest/reference/ec2/modify-instance-attribute.html
[6]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/user-data.html#user-data-view-change
