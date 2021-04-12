---
aliases:
- chz-onk-sn5
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: elb
security: compliance
source: elb
title: ELB security policy contains secure cipher
type: security_rules
---

## Description

Update your Elastic Load Balancer's (ELB's) SSL with a secure cipher.

## Rationale

SSL connections that use insecure or outdated ciphers are vulnerable to exploits.

## Remediation

### Console

Follow the [SSL negotiation configurations Classic Load Balancers][1] docs to learn how to configure a secure SSL cipher.

### CLI

1. Run `describe-load-balancer-policies` to [list all predefined security policies][2].

    {{< code-block lang="bash" filename="describe-load-balancer-policy.sh" >}}
    aws elb describe-load-balancer-policies
    --output table
    {{< /code-block >}}

2. Run `create-load-balancer-policy` to [create a security policy with a secure cipher][3] using one of the SSL configurations listed in the previous step.

    {{< code-block lang="bash" filename="create-load-balancer-policy.sh" >}}
    aws elb create-load-balancer-policy
        --load-balancer-name YourLoadBalancerName
        --policy-name YourCustomSecurityPolicy
        --policy-type-name YourPolicyTypeName
        --policy-attributes AttributeName=Protocol-TLSv1.2,AttributeValue=true AttributeName=Protocol-TLSv1.1,AttributeValue=true AttributeName=ECDHE-RSA-AES128-SHA,AttributeValue=true AttributeName=Server-Defined-Cipher-Order,AttributeValue=true
    {{< /code-block >}}

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/classic/elb-ssl-security-policy.html
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elb/describe-load-balancer-policies.html
[3]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elb/create-load-balancer-policy.html
