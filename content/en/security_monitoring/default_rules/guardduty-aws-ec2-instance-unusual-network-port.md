---
title: AWS EC2 Instance Communicating Over Unusual Port
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
security: anomaly
source: guardduty
scope: ec2
meta_image: /images/integrations_logos/amazon_ec2.png
aliases:
- 6b8-6d0-cae
---

## Overview

### Goal
Detect when an EC2 instance is communicating over an unusual port.

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [Behavior:EC2/NetworkPortUnusual][2]


### Triage & Response
1. Determine which port triggered the signal. This can be found in the samples.
2. If the instance is compromised:
   * Review the AWS [documentation][3] on remediating a compromised EC2 instance.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_behavior.html#behavior3
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
