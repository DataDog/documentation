---
aliases:
- d9b-0f7-0a9
- /security_monitoring/default_rules/d9b-0f7-0a9
- /security_monitoring/default_rules/unrestricted_smtp_access
disable_edit: true
integration_id: ec2
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: ec2
title: Inbound SMTP access is restricted
type: security_rules
---

## Description

Reduce the probability of a breach by checking [EC2 security groups][1] for inbound rules that allow unfettered access to TCP port 25 (used by Simple Mail Transfer Protocol (SMTP) for email transmission) and restrict access to IP addresses that require this port.


## Rationale

Malicious activity, such as spamming, hacking, Shellshock, and denial-of-service (DoS) attacks, can occur when permitting unfettered access to this port.

## Remediation

### From the console

Follow the [Security group rules][4] docs to learn how to add a security group rule that will restrict access to a specific port.

### From the command line

1. Run `revoke-security-group-ingress` to [remove inbound rules][2] that allow unrestricted access to port 25.

    {{< code-block lang="bash" filename="revoke-security-group-ingress.sh" >}}
    aws ec2 revoke-security-group-ingress
        --group-name group-name
        --protocol tcp
        --port 25
        --cidr 192.0.2.0/24
    {{< /code-block >}}

2. Run `authorize-security-group-ingress` to [add new inbound rules][3] that restrict port 25 access.

    {{< code-block lang="bash" filename="revoke-security-group-ingress.sh" >}}
    aws ec2 authorize-security-group-ingress
        --group-name your-group-name
        --protocol tcp
        --port 25
        --cidr 192.0.2.0/24
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/revoke-security-group-ingress.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/ec2/authorize-security-group-ingress.html
[4]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#SecurityGroupRules
