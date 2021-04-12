---
aliases:
- 7fc-0mg-8e0
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: elb
security: compliance
source: elb
title: ELB listener using TLSv1.2
type: security_rules
---

## Description

Update your Elastic Load Balancer (ELB) listener to TLSv1.2+.

## Rationale

Using an insecure or older TLS is vulnerable to exploits, such as [SSL stripping and other various attacks][1]. Using TLSv1.2+ ensures that your data remains private and secure when a connection is established between the client and server.

## Remediation

### Console

Follow the [Update Security Policy][2] docs to learn how to modify an HTTPS listener in the AWS Console.

### CLI

1. Run `modify-listener` with the `ssl-policy` flag to define a policy. See the [AWS CLI documentation][3] for examples.

[1]: https://tools.ietf.org/html/rfc7457#page-3
[2]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-certificates.html#update-security-policy
[3]: https://docs.aws.amazon.com/cli/latest/reference/elbv2/modify-listener.html#examples
