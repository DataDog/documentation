---
aliases:
- vn4-vpi-u7q
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: elbv2
security: compliance
source: elbv2
title: ELBv2 load balancer is using the latest security policy
type: security_rules
---

## Description

Secure your Amazon Application Load Balancer (ALB) with the latest predefined AWS security policy.

## Rationale

Insecure or deprecated security policies can expose the client and the load balancer to various SSL/TLS vulnerabilities.

## Remediation

### Console

Follow the [Update security policy][1] docs to learn how to update your HTTPS listener with the latest security policy.

### CLI

Run `modify-listener` with the [ARN of the listener and the recommended SSL policy][2].

    {{< code-block lang="bash" filename="create-listener.sh" >}}
    aws elbv2 create-listener
        --load-balancer-arn arn:aws:elasticloadbalancing:region:123456789012:loadbalancer/app/my-load-balancer/12ab3c456d7e8912
        --ssl-policy ELBSecurityPolicy-2016-08 --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:region:123456789012:targetgroup/my-targets/12ab3c456d7e8912
    {{< /code-block >}}

Review the [Security policies][3] docs for Amazon-recommended security policies.

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-certificates.html#update-security-policy
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elbv2/modify-listener.html
[3]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html#describe-ssl-policies
