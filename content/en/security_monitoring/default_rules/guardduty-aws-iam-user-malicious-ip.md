---
title: AWS IAM User Requests from Malicious IP
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
security: threat-intel
source: guardduty
scope: iam

aliases:
- e55-19c-bcb
---

## Overview

### Goal
Detect when an AWS IAM user makes API requests from a malicious IP.

### Strategy
This rule lets you monitor these [GuardDuty integration][1] findings:

* [Recon:IAMUser/TorIPCaller][2]
* [Recon:IAMUser/MaliciousIPCaller.Custom][3]
* [Recon:IAMUser/MaliciousIPCaller][4]
* [UnauthorizedAccess:IAMUser/MaliciousIPCaller][5]


### Triage & Response
1. Determine which user triggered the signal. This can be found in the signal.
2. Determine if the user's credentials are compromised.  
3. If the user's credentials are compromised:
  * Review the AWS [documentation][6] on remediating compromised AWS credentials.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#recon1
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#recon2
[4]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#recon3
[5]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized5
[6]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-creds
