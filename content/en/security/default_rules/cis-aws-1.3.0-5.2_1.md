---
aliases:
- tch-c9p-gh4
- /security_monitoring/default_rules/tch-c9p-gh4
- /security_monitoring/default_rules/cis-aws-1.3.0-5.2_1
disable_edit: true
integration_id: ec2
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: ec2
title: No security groups allow ingress from 0.0.0.0/0 to remote administration ports
type: security_rules
---

## Description

Security groups provide stateful filtering of ingress/egress network traffic to AWS resources. You should not allow any security group unrestricted ingress access to port 22.

## Rationale

Removing unfettered connectivity to remote console services, such as SSH, reduces a server's exposure to risk.

## Remediation

See the [CIS AWS Foundations Benchmark controls docs][1] for console remediation steps.

## Impact

If you are updating an existing environment, ensure that administrators who currently rely on ingress from 0.0.0.0/0 have access to ports 22 and 3389 through another security group.

## Default value

None

## References

None

## CIS controls

9.2 Ensure Only Approved Ports, Protocols, and Services Are Running - Ensure that only network ports, protocols, and services listening on a system with validated business needs, are running on each system.      

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-4.1
