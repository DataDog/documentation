---
aliases:
- tch-c9p-gh4
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
security: compliance
source: ec2
title: No security groups allow ingress from 0.0.0.0/0 to port 22
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

## Default Value

None

## References

None

## CIS Controls

9.2 Ensure Only Approved Ports, Protocols, and Services Are Running - Ensure that only network ports, protocols, and services listening on a system with validated business needs, are running on each system.      

[1]: https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-cis-controls.html#securityhub-cis-controls-4.1
