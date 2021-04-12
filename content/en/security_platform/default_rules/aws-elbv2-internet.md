---
aliases:
- b0y-o61-ai4
cloud: aws
disable_edit: true
kind: documentation
rule_category:
- Cloud Configuration
scope: elbv2
security: compliance
source: elbv2
title: ELBv2 load balancer is internet facing
type: security_rules
---

## Description

Secure your Application Load Balancers (ALB) or Network Load Balancers (NLB) with an internal ELBv2 load balancer.

## Rationale

Internet-facing load balancers receive a public DNS name. Secure your connection by using an ELBv2 load balancer instead.

## Remediation

### Console

Follow the [Create an application load balancer][1] docs to learn how to create an internal load balancer that routes requests to targets using private IP addresses.

### CLI

Run `create-load-balancer` with a [load balancer name, scheme, and subnet][2].

    {{< code-block lang="bash" filename="create-load-balancer.sh" >}}
    aws elbv2 create-load-balancer
    --name my-internal-load-balancer
    --scheme internal
    --subnets subnet-b7d581c0 subnet-8360a9e7
    {{< /code-block >}}

See the [create-load-balancer][2] AWS CLI docs to create a load balancer for a network or gateway.

[1]: https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-application-load-balancer.html#configure-load-balancer
[2]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/elbv2/create-load-balancer.html#synopsis
