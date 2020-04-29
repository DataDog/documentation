---
title: AWS EC2 Instance Connecting to TOR as a Relay
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
security: attack
tactic: TA0040-impact
technique: T1496-resource-hijacking
source: guardduty
scope: ec2
meta_image: /images/integrations_logos/amazon_ec2.png
aliases:
- 86f-3ac-c70
---

## Overview

### Goal
Detect when an EC2 instance is being used as a TOR relay.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [UnauthorizedAccess:EC2/TorRelay][2]


### Triage & Response
1. Determine if the EC2 instance should be uses as a TOR relay. 
2. If the instance is compromised:
   * Review the AWS [documentation][3] on remediating a compromised EC2 instance. 

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#unauthorized14
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
