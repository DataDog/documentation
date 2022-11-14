---
aliases:
- 45i-h7m-x1w
- /security_monitoring/default_rules/45i-h7m-x1w
- /security_monitoring/default_rules/cis-aws-1.3.0-5.1
disable_edit: true
integration_id: vpc
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: vpc
title: Network ACLs do not allow ingress from 0.0.0.0/0 to remote server administration
  ports
type: security_rules
---

## Description

The Network Access Control List (NACL) function provides stateless filtering of ingress and egress network traffic to AWS resources. It is recommended that no NACL allows unrestricted ingress access to remote server administration ports, such as SSH to port 22 and RDP to port 3389.

## Rationale

Public access to remote server administration ports, such as 22 and 3389, increases resource attack surface and unnecessarily raises the risk of resource compromise.

## Remediation

1. Login to the AWS Management Console at https://console.aws.amazon.com/vpc/home
2. In the left pane, click Network ACLs.
3. For each network ACL to remediate, perform the following: Select the network ACL, Click the Inbound Rules tab, Click Edit inbound rules. Either update the Source field to a range other than `0.0.0.0/0` or click Delete to remove the offending inbound rule. Click save.

## Reference

1. [https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html][1]
2. [https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html#VPC_Security_Comparison][2]

[1]: https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html
[2]: https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Security.html#VPC_Security_Comparison
