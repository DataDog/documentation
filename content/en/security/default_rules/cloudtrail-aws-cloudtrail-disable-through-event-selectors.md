---
aliases:
- tar-dhx-0hv
- /security_monitoring/default_rules/tar-dhx-0hv
- /security_monitoring/default_rules/cloudtrail-aws-cloudtrail-disable-through-event-selectors
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
title: AWS Disable Cloudtrail with event selectors
type: security_rules
---

## Goal
Detect when CloudTrail has been disabled by creating an event selector on the Trail.

## Strategy
This rule lets you monitor CloudTrail and detect if an attacker used the [`PutEventSelectors`][1] API call to filter out management events, effectively disabling CloudTrail for the specified Trail.

See the [public Proof of Concept][2] (PoC) for this attack.

## Triage and response
1. Determine if `{{@userIdentity.arn}}` should have made the `{{@evt.name}}` API call.
2. If the API call was **not** made legitimately by the user:
  * Rotate user credentials.
  * Determine what other API calls were made by the user.
  * Remove the event selector using the `aws-cli` command [`put-event-selectors`][3] or use the [AWS console][4] to revert the event selector back to the last known good state.
3. If the API call was made legitimately by the user:
  * Determine if the user was authorized to make that change.
  * If **Yes**, work with the user to ensure that CloudTrail logs for the affected account `{{@usr.account_id}}` are being sent to the Datadog platform.
  * If **No**, remove the event selector using the `aws-cli` command [`put-event-selectors`][3] or reference the [AWS console documentation][4] to revert the event selector back to the last known good state.

## Changelog
* 17 October 2022 - Updated tags.

[1]: https://docs.aws.amazon.com/awscloudtrail/latest/APIReference/API_PutEventSelectors.html
[2]: https://github.com/RhinoSecurityLabs/Cloud-Security-Research/tree/master/AWS/cloudtrail_guardduty_bypass
[3]: https://docs.aws.amazon.com/cli/latest/reference/cloudtrail/put-event-selectors.html
[4]: https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-update-a-trail-console.html
