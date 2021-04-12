---
aliases:
- b03-c2d-8f9
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: ec2
security: compliance
source: ec2
title: Inbound TCP NetBIOS access is restricted
type: security_rules
---

## Description

Reduce the probability of a breach by checking [EC2 security groups][1] for inbound rules that allow unfettered access to TCP port 139 (used by services for NetBIOS name resolution) and restrict access to IP addresses that require this port.

## Rationale

Malicious activity, such as bad tunnel exploits or denial-of-service (DoS) and man-in-the-middle (MITM) attacks, can occur when permitting unfettered access to this port.

## Remediation

### Console

Follow the [Security group rules][2] docs to learn how to add a security group rule that will restrict access to a specific port.

### CLI

1. Run `revoke-security-group-ingress` to [remove inbound rules][3] that allow unrestricted access to TCP port 139.

    {{< code-block lang="bash" filename="revoke-security-group-ingress.sh" >}}
    aws ec2 revoke-security-group-ingress
        --group-name group-name
        --protocol tcp
        --port 139
        --cidr 192.0.2.0/24
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html
[2]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#SecurityGroupRules
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/revoke-security-group-ingress.html
