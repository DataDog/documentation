---
title: AWS IAM User Suspicious Login
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
security: anomaly
source: guardduty
scope: iam

aliases:
- 29c-15c-4b5
---

## Overview

### Goal
Detect when an AWS IAM user login is suspicious.

### Strategy
This rule lets you monitor these [GuardDuty integration][1] findings:

* [UnauthorizedAccess:IAMUser/ConsoleLoginSuccess.B][2]
* [UnauthorizedAccess:IAMUser/ConsoleLogin][3]


### Triage & Response
1. Determine which user triggered the signal. This can be found in the signal.
2. Determine if the user's credentials are compromised.  
3. If the user's credentials are compromised:
  * Review the AWS [documentation][4] on remediating compromised AWS credentials.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized4
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized12
[4]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-creds
