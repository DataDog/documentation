---
title: AWS EC2 Instance Outbound Connections to TOR
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
security: attack
tactic: TA0011-command-and-control
technique: T1188-multi-hop-proxy
source: guardduty
scope: ec2
meta_image: /images/integrations_logos/amazon_ec2.png
aliases:
- f71-905-58d
---

## Overview

### Goal
Detect when an EC2 instance makes an outbound network connection from TOR.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [UnauthorizedAccess:EC2/TorClient][2]


### Triage & Response
1. Determine if the EC2 instance should be making requests to TOR. 
2. If the instance is compromised:
   * Review the AWS [documentation][3] on remediating a compromised EC2 instance. 

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized13
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
