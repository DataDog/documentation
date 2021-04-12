---
aliases:
- u5s-9vx-7a7
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: ec2
security: compliance
source: ec2
title: Access to port 3389 is restricted
type: security_rules
---

## Description

Reduce the probability of a breach by checking [EC2 security groups][1] for inbound rules that allow unfettered access to TCP port 3389 (used to connect a remote Remote Desktop Protocol (RDP) client application with an RDP server) and restrict access to IP addresses that require this port.

## Rationale

Malicious activity, such as pass-the-hash (PtH) and man-in-the-middle attacks (MITM), can occur when permitting unfettered access to this port.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

1. Run `revoke-security-group-ingress` to [remove inbound rules][2] that allow unrestricted access to port 3389.

   {{< code-block lang="bash" filename="revoke-security-group-ingress.sh" >}}
   aws ec2 revoke-security-group-ingress
   --group-name group-name
   --protocol tcp
   --port 3389
   --cidr 192.0.2.0/24
   {{< /code-block >}}

2. Run `authorize-security-group-ingress` to [add new inbound rules][3] that restrict port 3389 access.

   {{< code-block lang="bash" filename="revoke-security-group-ingress.sh" >}}
   aws ec2 authorize-security-group-ingress
   --group-name your-group-name
   --protocol tcp
   --port 3389
   --cidr 192.0.2.0/24
   {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/revoke-security-group-ingress.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/authorize-security-group-ingress.html
[4]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-4.2
