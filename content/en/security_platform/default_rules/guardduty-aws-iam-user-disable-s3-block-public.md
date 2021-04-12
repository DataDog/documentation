---
aliases:
- ab4-bab-93b
disable_edit: true
kind: documentation
rule_category:
- Log Detection
scope: iam
security: compliance
source: guardduty
title: AWS IAM user disabled S3 Block Public Access
type: security_rules
---

### Goal
Detect when an AWS IAM user disables [S3 Block Public Access][1]

### Strategy
This rule lets you monitor this [GuardDuty integration][2] finding:

* [Policy:IAMUser/S3BlockPublicAccessDisabled][3]


### Triage & Response
1. Determine which user triggered the signal. This can be found in the signal.
2. Contact the user and determine why the user disabled the S3 Block Access feature.   
3. Re-enable S3 Block Public Access.

[1]: https://docs.aws.amazon.com/AmazonS3/latest/dev/access-control-block-public-access.html
[2]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_policy.html#policy2
