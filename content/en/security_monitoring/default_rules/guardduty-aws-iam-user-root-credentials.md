---
title: AWS Root Credential Activity
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
security: compliance
framework: cis
control: cis-3.3
source: guardduty
scope: iam

aliases:
- acb-67e-eb4
---

## Overview

### Goal
Detect when the AWS root user credentials are used.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [Policy:IAMUser/RootCredentialUsage][2]


### Triage & Response
1. Determine whether the root account activity was legitimate. 
 * Review the sample for context. 
 * Review CloudTrail logs for a full investigation. 
3. If the root user's credentials are compromised:
 * Review the AWS [documentation][3] on remediating compromised AWS credentials.

**[Root Account Best Practices][4]**

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_policy.html#policy1
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-creds
[4]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user.html
