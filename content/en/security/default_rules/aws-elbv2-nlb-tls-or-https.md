---
aliases:
- 31q-rfg-tiz
- /security_monitoring/default_rules/31q-rfg-tiz
- /security_monitoring/default_rules/aws-elbv2-nlb-tls-or-https
disable_edit: true
integration_id: elb
kind: documentation
rule_category:
- Posture Management (Cloud)
- Cloud Security Management
source: elb
title: ELBv2 Network Load Balancer listeners employ TLS or HTTPS
type: security_rules
---

## Description

Configure Amazon Network Load Balancers so all listeners use either TLS or HTTPS encryption. 

## Rationale

Using TLS or HTTPS helps ensure the communication between your network load balancers (NLBs) and backend servers is protected from decryption, data leaks, and other exploits. NLS's can accept and route TCP connections to Application load balancers(ALBs), this allows AWS customers to directly register an ALB as an NLB target, eliminating the need to actively manage changing ALB IP addresses. Amazon's NLBs can be configured to handle TLS termination. This reduces the workload on your backend systems and localizes TLS configuration to the NLBs, thereby improving both performance and security.



## Remediation

### From the console

Follow the [Create a listener for your network load balancer][1] docs to learn how to add a TLS listener to your network load balancer.

### From the command line

1. Run `describe-load-balancers` to retrieve the ARNs of your network load balancers.
2. Run `list-certificates` to retrieve the ARN of your Amazon ACM TLS certificates, or `list-server-certificates` to retrieve the ARN of your AWS IAM TLS certificates. If you do not have a TLS certificate, follow the [Configure TLS listeners: Certificates][2] docs.
3. Run `create-listener` using the ARN of the desired load balancer and TLS certificate.

    {{< code-block lang="bash" filename="update-listener.sh" >}}
    aws elbv2 create-listener 
        --load-balancer-arn arn:aws:elasticloadbalancing:us-west-2:123456789012:loadbalancer/app/my-load-balancer/50dc6c495c0c9188 
        --certificates CertificateArn=arn:aws:acm:us-west-2:123456789012:certificate/3dcb0a41-bd72-4774-9ad9-756919c40557 
        --protocol TLS
        --port 443
        --ssl-policy ELBSecurityPolicy-2016-08 
        --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:us-west-2:123456789012:targetgroup/my-targets/73e2d6bc24d8a067
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/create-listener.html
[2]: https://docs.aws.amazon.com/elasticloadbalancing/latest/network/create-tls-listener.html#tls-listener-certificates
[3]: https://aws.amazon.com/fr/blogs/networking-and-content-delivery/application-load-balancer-type-target-group-for-network-load-balancer/
