---
title: AWS EC2 Instance Inbound Connections from TOR
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
security: threat-intel
source: guardduty
scope: ec2
meta_image: /images/integrations_logos/amazon_ec2.png
aliases:
- 152-b40-a1f
---

## Overview

### Goal
Detect when an EC2 instance receives an inbound network connection from TOR.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [UnauthorizedAccess:EC2/TorIPCaller][2]


### Triage & Response
1. This is typically an informative signal. However, if this instance should not be publicly available, you should review the security group for this instance. 

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized7
