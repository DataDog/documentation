---
aliases:
- 31q-rfg-uiu
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: elb
security: compliance
source: elb
title: ELB listener is securely configured
type: security_rules
---

## Description

Use a secure protocol to encrypt communication between the client and your Elastic Load Balancers (ELBs).

## Rationale

Insecure communication channels increase the risk of attacks, such as man-in-the-middle attacks, and sensitive data breaches.

## Remediation

### Console

Follow the [Add an HTTP listener][1] docs to learn how to create an HTTP listener in the AWS Console.

### CLI

1. Run `aws iam list-server-certificates` to return the [SSL certificate ARN][2] with AWS IAM.

2. Run `create-load-balancer-listeners` to [create a new HTTPS listener][3] for the selected load balancer using the SSL certificates returned in step 1.

    {{< code-block lang="bash" filename="create-load-balancer-listeners.sh" >}}
    aws elb create-load-balancer-listeners
        --load-balancer-name YourLoadBalancerName
        --listeners Protocol=HTTPS, LoadBalancerPort=443, InstanceProtocol=HTTP, InstancePort=80, SSLCertificateId=arn:aws:iam::123456789123:server-certificate/YourSSLCertificate
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-listener.html#add-listener
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/iam/list-server-certificates.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elb/create-load-balancer-listeners.html
