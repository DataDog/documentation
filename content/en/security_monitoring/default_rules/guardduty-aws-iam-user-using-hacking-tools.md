---
title: AWS IAM User Making API Requests With Hacking Tools
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
source: guardduty
scope: iam

aliases:
- 388-936-903
---

## Overview

### Goal
Detect when an AWS IAM user makes API requests with hacking tools.

### Strategy
This rule lets you monitor these [GuardDuty integration][1] findings:

* [PenTest:IAMUser/KaliLinux][2]
* [PenTest:IAMUser/ParrotLinux][3]
* [PenTest:IAMUser/PentooLinux][4]


### Triage & Response
1. Determine which user triggered the signal. This can be found in the signal.
2. Determine if the user's credentials are compromised.  
3. If the user's credentials are compromised:
  * Review the AWS [documentation][5] on remediating compromised AWS credentials.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_pentest.html#pentest1
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_pentest.html#pentest2
[4]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_pentest.html#pentest3
[5]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-creds
