---
title: AWS EC2 Instance Conducting a Port Scan
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
security: attack
tactic: TA0007-discovery
technique: T1046-network-service-scanning
source: guardduty
scope: ec2
meta_image: /images/integrations_logos/amazon_ec2.png
aliases:
- e81-5e9-154
---

## Overview

### Goal
Detect when an EC2 instance is conducting a port scan.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [Recon:EC2/Portscan][2]


### Triage & Response
1. Determine why traffic from the EC2 instance appears to be conducting a port scan.
2. If the instance is compromised:
   * Review the AWS [documentation][3] on remediating a compromised EC2 instance.
 
[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#recon5
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
