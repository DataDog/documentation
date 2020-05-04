---
title: AWS IAM User Changing Sensitive Configurations
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
security: attack
tactic: TA0005-defense-evasion
technique: T1089-disabling-security-tools
source: guardduty
scope: iam

aliases:
- d42-7bd-898
---

## Overview

### Goal
Detect when an AWS IAM user is changing sensitive configurations and has no prior history of invoking these APIs.

### Strategy
This rule lets you monitor these [GuardDuty integration][1] findings:

* [Stealth:IAMUser/S3ServerAccessLoggingDisabled][2]
* [Stealth:IAMUser/PasswordPolicyChange][3]
* [Stealth:IAMUser/CloudTrailLoggingDisabled][4]
* [Stealth:IAMUser/LoggingConfigurationModified][5]


### Triage & Response
1. Determine which user triggered the signal. This can be found in the signal.
2. Determine if the user's credentials are compromised.  
3. If the user's credentials are compromised:
  * Review the AWS [documentation][6] on remediating compromised AWS credentials.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_stealth.html#stealth4
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_stealth.html#stealth1
[4]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_stealth.html#stealth2
[5]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_stealth.html#stealth3
[6]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-creds
