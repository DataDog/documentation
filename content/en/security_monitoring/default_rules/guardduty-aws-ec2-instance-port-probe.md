---
title: AWS EC2 Instance Probed by Scanner
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
- d6c-c15-186
---

## Overview

### Goal
Detect when an EC2 instance is being probed by a scanner.

### Strategy
This rule lets you monitor these [GuardDuty integration][1] findings:

* [Recon:EC2/PortProbeUnprotectedPort][2]
* [Recon:EC2/PortProbeEMRUnprotectedPort][3]


### Triage & Response
1. This is typically an informative signal. However, if this instance should not be publicly available, you should review the security group for this instance. 

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#recon6
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_recon.html#PortProbeEMRUnprotectedPort
