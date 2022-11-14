---
aliases:
- 1a6-e94-f5d
- /security_monitoring/default_rules/1a6-e94-f5d
- /security_monitoring/default_rules/unrestricted_dns_access
disable_edit: true
integration_id: ec2
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: ec2
title: Inbound DNS access is restricted
type: security_rules
---

## Description
Reduce the possibility of a breach by checking EC2 security groups for inbound rules that allow unfettered access to TCP and UDP port 53, commonly used during DNS resolution when a request is sent from DNS clients to DNS servers or between DNS servers.

## Rationale

Malicious activity, such as distributed denial-of-service (DDoS) attacks, can occur when permitting unfettered DNS access.

## Remediation

## Console

Follow the [Security group rules][2] docs to learn how to add a security group rule that will restrict access to a specific port.

## CLI

1. Run `describe-security-groups` with a filter to [expose security groups][1] that allow access to port 53.

    {{< code-block lang="bash" filename="describe-security-groups.sh" >}}
    aws ec2 revoke-security-group-egress
        --group-id your-group-id
        --ip-permissions '[{"IpProtocol": "tcp", "FromPort": 53, "ToPort": 53, "IpRanges": [{"CidrIp": "192.0.2.0/24"}]}]'
    {{< /code-block >}}

[1]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/redshift/describe-clusters.html
[2]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#SecurityGroupRules
