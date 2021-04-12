---
aliases:
- ix9-ih4-ucg
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: elbv2
security: compliance
source: elbv2
title: ELBv2 ALB is using a secure listener
type: security_rules
---

## Description

Use HTTPS to secure communication between your application client and an Elastic Load Balancer (ELB) listener.

## Rationale

Without an HTTPS listener, front-end connections are vulnerable to exploits, such as man-in-the-middle (MITM) attacks. Securing all communication between your application client and ELB listener ensures sensitive data is protected.

## Remediation

### Console

Follow the [Create an HTTPS listener for your Application Load Balancer][1] docs to learn how to create a listener that checks for connection requests.

### CLI

1. Run `list-certificates` to retrieve the ARN of your SSL certificate. If you do not have an SSL certificate, follow the [Create or import an SSL/TLS certificate][2] docs.
2. Run `create-listener` using the [ARN of the load balancer and SSL certificate][3].

    {{< code-block lang="bash" filename="create-listener.sh" >}}
    aws elbv2 create-listener
        --load-balancer-arn arn:aws:elasticloadbalancing:region:123456789012:loadbalancer/app/my-load-balancer/12ab3c456d7e8912
        --protocol HTTPS
        --port 443
        --certificates CertificateArn=arn:aws:acm:region:123456789012:certificate/1abc0c41-bd73-5445-9ab9-123456a23456
        --ssl-policy ELBSecurityPolicy-2016-08 --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:region:123456789012:targetgroup/my-targets/12ab3c456d7e8912
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html
[2]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/ssl-server-cert.html#create-certificate-acm
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elbv2/create-listener.html
