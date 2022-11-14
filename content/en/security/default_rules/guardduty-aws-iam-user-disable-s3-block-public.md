---
aliases:
- ab4-bab-93b
- /security_monitoring/default_rules/ab4-bab-93b
- /security_monitoring/default_rules/guardduty-aws-iam-user-disable-s3-block-public
disable_edit: true
integration_id: iam
kind: documentation
rule_category:
- Cloud SIEM (Log Detection)
scope: iam
security: attack
source: guardduty
tactic: TA0005-defense-evasion
technique: T1562-impair-defenses
title: AWS IAM user disabled S3 Block Public Access
type: security_rules
---

## Goal
Detect when an AWS IAM user disables [S3 Block Public Access][1]

## Strategy
This rule lets you monitor this [GuardDuty integration][2] finding:

* [Policy:IAMUser/S3BlockPublicAccessDisabled][3]

## Triage and response
1. Determine which user triggered the signal. This can be found in the signal.
2. Contact the user and determine why the user disabled the S3 Block Access feature.   
3. Re-enable S3 Block Public Access.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html
[2]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_policy.html#policy2
