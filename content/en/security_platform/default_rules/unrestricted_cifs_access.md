---
aliases:
- 3ce-77d-28a
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: ec2
security: compliance
source: ec2
title: Inbound CIFS access is restricted
type: security_rules
---

## Description

Reduce the possibility of a breach by checking [EC2 security groups][1] for inbound rules that allow unfettered access to TCP port 445, commonly used by client/server applications, and restrict access to IP addresses that require this port.

## Rationale

Malicious activity, such as denial-of-service (DoS) or man-in-the-middle attacks (MITM), can occur when permitting unrestricted Common Internet File System (CIFS) access. TCP port 445 is the port commonly used by client/server applications as a means of communication between network nodes over TCP.

## Remediation

### Console

Follow the [Security group rules][2] docs to learn how to add a security group rule that will restrict access to IP addresses that require a specific port.

### CLI

1. Run `revoke-security-group-ingress` to [remove inbound rules][3] that allow unrestricted access to port 445.

    {{< code-block lang="bash" filename="revoke-security-group-ingress.sh" >}}
        aws ec2 revoke-security-group-ingress
            --group-name group-name
            --protocol tcp
            --port 445
            --cidr 0.0.0.0/0
    {{< /code-block >}}

2. Run `authorize-security-group-ingress` to [add new inbound rules][4] that restrict CIFS access.

    {{< code-block lang="bash" filename="revoke-security-group-ingress.sh" >}}
        aws ec2 authorize-security-group-ingress
            --group-name your-group-name
            --protocol tcp
            --port 445
            --cidr 192.0.2.0/24
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html
[2]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#SecurityGroupRules
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/revoke-security-group-ingress.html
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/authorize-security-group-ingress.html
