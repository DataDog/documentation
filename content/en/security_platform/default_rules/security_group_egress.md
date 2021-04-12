---
aliases:
- cfd-f0b-f05
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: ec2
security: compliance
source: ec2
title: Outbound access on all ports is restricted
type: security_rules
---

## Description
Reduce the probability of a breach by checking [EC2 security groups][1] for outbound rules that allow unfettered access to any TCP/UDP ports and restrict access to IP addresses that require this port.

## Rationale

Malicious activity, such as denial-of-service (DoS) and distributed denial-of-service (DDoS) attacks, can occur when permitting unfettered outbound access.

## Remediation

### Console

Follow the [Security group rules][2] docs to learn how to add a security group rule that will restrict access to IP addresses that require a specific port.

### CLI

1. Run `revoke-security-group-egress` to remove IP permissions for the selected EC2 security group.

    {{< code-block lang="bash" filename="revoke-security-group-egress.sh" >}}
    aws ec2 revoke-security-group-egress
        --group-id your-group-id
        --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 22, "ToPort": 22, "IpRanges": [{"CidrIp": "0.0.0.0/0"}]}]'
    {{< /code-block >}}

2. Run `authorize-security-group-egress` with new parameters to restrict outbound access to specific destinations.

    {{< code-block lang="bash" filename="authorize-security-group-egress.sh" >}}
    aws ec2 authorize-security-group-egress
        --group-id your-group-id
        --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 22, "ToPort": 22, "IpRanges": [{"CidrIp": "0.0.0.0/0"}]}]'
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html
[2]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#SecurityGroupRules
