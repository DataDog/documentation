---
aliases:
- 72d-ffe-250
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: ec2
security: compliance
source: ec2
title: Inbound Elasticsearch access is restricted
type: security_rules
---

## Description

Reduce the probability of a breach by checking [EC2 security groups][1] for inbound rules that allow unfettered access to TCP port 9200, used by the [Elasticsearch][2], and restrict access to IP addresses that require this port.

## Rationale

Malicious activity, such as denial-of-service (DoS) attacks and hacking, can occur when permitting unfettered Elasticsearch access.

## Remediation

### Console

Follow the [Security group rules][3] docs to learn how to add a security group rule that will restrict access to a specific port.

### CLI

1. First, remove the security group rule(s) that allow public, unrestricted access to the Elasticsearch database. The rule in question will open port 9200 for ingress from anywhere.

2. Now that the database is contained, authorize only the specific entities that need access to the database like EC2 instances, or lambdas. You can do this by adding inbound security group rules for a specific elastic IP address, a specific range of IP addresses, or by allowing access for entities in another AWS security group.

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html
[2]: https://aws.amazon.com/elasticsearch-service/
[3]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html#SecurityGroupRules
