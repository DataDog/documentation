---
title: AWS EC2 Instance Victim to Metadata DNS Rebind Attack
kind: documentation
type: security_rules
disable_edit: true
src_link: https://docs.datadoghq.com/integrations/amazon_guardduty/
src_img: /images/integrations_logos/amazon_guardduty.png
security: attack
tactic: TA0006-credential-access
technique: T1522-cloud-instance-metadata-api
source: guardduty
scope: ec2
meta_image: /images/integrations_logos/amazon_ec2.png
aliases:
- 342-9e0-678
---

## Overview

### Goal
Detect when an EC2 instance makes a DNS request and resolves to the AWS metadata IP address (169.254.169.254).

### Strategy
This rule lets you monitor this [GuardDuty integration][1] finding:

* [UnauthorizedAccess:EC2/MetadataDNSRebind][2]


### Triage & Response
1. Determine which process made the DNS request. The DNS request can be found in the samples.
2. Ensure the process is not a victim of an SSRF attack to steal the AWS EC2 Instance profile's STS credentials.  
2. If the STS credentials are compromised:
   * Review the AWS [documentation][3] on revoking the session.

[1]: https://docs.datadoghq.com/integrations/amazon_guardduty/
[2]: https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_unauthorized.html#ec2-metadatadnsrebind
[3]: https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_revoke-sessions.html
