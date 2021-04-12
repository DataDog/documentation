---
aliases:
- 1th-739-cyc
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: elb
security: compliance
source: elb
title: ELB has secure SSL protocols
type: security_rules
---

## Description

Update your Elastic Load Balancer's (ELB's) Secure Socket Layer (SSL) to replace SSLv2, SSLv3, and TLSv1 insecure or deprecated SSL protocols.

## Rationale

An ELB Security Policy using insecure or deprecated protocols are vulnerable to exploits, such as [POODLE][1] and [DROWN][2] attacks.

## Remediation

### Console

Follow the [Update an HTTPS listener for your Application Load Balancer][3] docs to learn how to update your security policy with a modified HTTPS listener.

### CLI

1. Run `modify-listener` with the `ssl-policy` flag to define a new SSL policy. You can also modify the protocol by using the `--protocol` flag. See the [AWS CLI documentation][4] for examples.

[1]: https://en.wikipedia.org/wiki/POODLE
[2]: https://en.wikipedia.org/wiki/DROWN_attack
[3]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-certificates.html
[4]: https://docs.aws.amazon.com/cli/latest/reference/elbv2/modify-listener.html#examples
