---
aliases:
- 24e-e4b-666
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: ec2
security: compliance
source: ec2
title: Inbound UDP NetBIOS access is restricted
type: security_rules
---

## Description

Reduce the probability of a breach by checking [EC2 security groups][1] for inbound rules that allow unfettered access to TCP port 139 and UDP ports 137 and 138 (used by services for NetBIOS name resolution) and restrict access to IP addresses that require this port.

## Rationale

Malicious activity, such as bad tunnel exploits or denial-of-service (DoS) and man-in-the-middle (MITM) attacks, can occur when permitting unfettered access to this port.

## Remediation

### Console

Follow the [Security group rules][2] docs to learn how to add a security group rule that will restrict access to a specific port.

### CLI

1. Run `authorize-security-group-ingress` to [add new inbound rules][3] that restrict UDP ports 137 access.

    {{< code-block lang="bash" filename="revoke-security-group-ingress.sh" >}}
    aws ec2 authorize-security-group-ingress
        --group-name your-group-name
        --protocol udp
        --port 137
        --cidr 192.0.2.0/24
    {{< /code-block >}}

2. Run `authorize-security-group-ingress` to [add new inbound rules][3] that restrict UDP ports 138 access.

    {{< code-block lang="bash" filename="revoke-security-group-ingress.sh" >}}
    aws ec2 authorize-security-group-ingress
        --group-name your-group-name
        --protocol udp
        --port 138
        --cidr 192.0.2.0/24
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html
[2]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#SecurityGroupRules
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/authorize-security-group-ingress.html
