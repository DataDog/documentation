---
aliases:
- /continuous_integration/static_analysis/rules/terraform-aws/aws-lb-redirect-https
- /static_analysis/rules/terraform-aws/aws-lb-redirect-https
dependencies: []
disable_edit: true
group_id: terraform-aws
meta:
  category: Security
  id: terraform-aws/aws-lb-redirect-https
  language: Terraform
  severity: Warning
  severity_rank: 2
title: Ensure that LB use HTTPS redirect
---
<!--  SOURCED FROM https://github.com/DataDog/datadog-static-analyzer-rule-docs -->


## Metadata
**ID:** `terraform-aws/aws-lb-redirect-https`

**Language:** Terraform

**Severity:** Warning

**Category:** Security

## Description
This rule ensures that all HTTP requests are redirected to HTTPS for secure communication. In the context of AWS load balancer listeners, the 'protocol' field in the 'redirect' block of 'default_action' should always be set to 'HTTPS'. This is crucial as it helps prevent man-in-the-middle attacks by encrypting data in transit, thereby ensuring the confidentiality and integrity of data.

Non-compliance with this rule, as shown in the non-compliant code sample, could expose your application to security vulnerabilities. The 'protocol' field in the 'redirect' block is set to 'HTTP', meaning that the data is not encrypted and can be intercepted by unauthorized parties. 

To adhere to this rule, always set the 'protocol' field in the 'redirect' block of 'default_action' to 'HTTPS', as shown in the compliant code sample. This practice ensures that all HTTP traffic is redirected to HTTPS, thereby providing secure communication. This is an essential practice in maintaining application security and safeguarding sensitive data.

## Non-Compliant Code Examples
```terraform
resource "aws_lb_listener" "my-load-balancer" {
  protocol = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      protocol = "HTTP"
    }
  }
}
```

## Compliant Code Examples
```terraform
resource "aws_lb_listener" "my-load-balancer" {
  protocol = "HTTP"

  default_action {
    type = "redirect"

    redirect {
      protocol = "HTTPS"
    }
  }
}
```
