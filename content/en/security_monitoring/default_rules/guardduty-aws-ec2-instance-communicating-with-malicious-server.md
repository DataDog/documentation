---
title: AWS EC2 Instance Communicated with a Malicious Server
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
security: attack
source: guardduty
scope: ec2
meta_image: /images/integrations_logos/amazon_ec2.png
aliases:
- f20-5ca-a05
---

## Overview

### Goal
Detect when an EC2 instance is communicating with a malicious server.

### Strategy
This rule lets you monitor these [GuardDuty integration][1] findings:

* [Backdoor:EC2/C&CActivity.B!DNS][2]
* [Trojan:EC2/BlackholeTraffic][3]
* [Trojan:EC2/DropPoint][4]
* [Trojan:EC2/BlackholeTraffic!DNS][5]
* [Trojan:EC2/DriveBySourceTraffic!DNS][6]
* [Trojan:EC2/DropPoint!DNS][7]
* [Trojan:EC2/DGADomainRequest.B][8]
* [Trojan:EC2/DGADomainRequest.C!DNS][9]
* [Trojan:EC2/DNSDataExfiltration][10]
* [Trojan:EC2/PhishingDomainRequest!DNS][11]


### Triage & Response
1. Determine which domain name or IP address triggered the signal. This can be found in the samples.
2. If the instance is compromised:
   * Review the AWS [documentation][12] on remediating a compromised EC2 instance.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_backdoor.html#backdoor6
[3]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_trojan.html#trojan4
[4]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_trojan.html#trojan5
[5]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_trojan.html#trojan6
[6]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_trojan.html#trojan7
[7]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_trojan.html#trojan8
[8]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_trojan.html#trojan9
[9]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_trojan.html#trojan95
[10]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_trojan.html#trojan10
[11]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_trojan.html#trojan11
[12]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_remediate.html#compromised-ec2
