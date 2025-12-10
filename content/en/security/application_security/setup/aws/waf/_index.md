---
title: Enabling App and API Protection for AWS WAF
further_reading:
    - link: "/security/application_security/how-it-works/"
      tag: "Documentation"
      text: "How App and API Protection Works"
    - link: "/security/application_security/waf-integration/"
      tag: "Documentation"
      text: "Learn more about WAF Integrations"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
    - link: "/security/application_security/threats/"
      tag: "Documentation"
      text: "App and API Protection"
    - link: "https://www.datadoghq.com/blog/aws-waf-datadog/"
      tag: "Blog"
      text: "Monitor AWS WAF activity with Datadog"
---

App and API Protection integrates with AWS Web Application Firewall (WAF) by:

1. Converting logs to traces to gain visibility into monitored and blocked requests
2. Blocking IP addresses with AWS WAF IPsets

Both can be set up independently, but it is recommended to first set up the conversion of logs to traces in order to inspect the AWS WAF actions.

## Prerequisites

 - The [Amazon Web Services integration][1] is setup.
 - Metrics, and Logs collection are enabled on the [AWS WAF integration][2]. Note that only logs sent to an S3 bucket are collected by the AWS WAF integration.
 - A [Connection][3] is created with the AWS account hosting the AWS WAF used for blocking.

## Convert AWS WAF logs to traces

First, **enable** the conversion of logs to traces on the [Settings page][4]. 

Then, ensure the web ACLs table contains request metrics as well as logs and traces.

Security traces are reported in the [AAP Traces Explorer][5] with service name `aws.waf`.

## Block with AWS WAF IPsets 

To block attackers, Datadog needs to manage a dedicated IPset. This IPset must be referenced by the web ACL with a rule in blocking mode.

Multiple web ACLs can be set up in the same or in different AWS accounts. A [Connection][3] must be created on every AWS account.

Ensure the AWS role attached to the [Connection][3] has the following permissions:

 - `GetIPSet`
 - `UpdateIPSet`

{{< tabs >}}
{{% tab "Setup with Terraform" %}}

1. Edit your Terraform configuration with the following content:
   ```tf
   resource "aws_wafv2_ip_set" "Datadog-blocked-ipv4s" {
     name               = "Datadog-blocked-ipv4s"
     ip_address_version = "IPV4"
     scope              = "CLOUDFRONT"
     addresses          = []
   
     lifecycle {
       # The addresses are managed by the Datadog Application Security product.
       ignore_changes = [addresses]
     }
   }
   
   # Add a blocking rule to your existing web ACL resource
   resource "aws_wafv2_web_acl" "EdgeWAF" {
     name  = "EdgeWAF"
     description = "undefined"
     scope = "CLOUDFRONT"
   
     default_action {
       allow {}
     }
   
     rule {
       name     = "BlockedIPs"
       priority = 0
   
       action {
         block {}
       }
   
       statement {
         ip_set_reference_statement {
           arn = aws_wafv2_ip_set."Datadog-blocked-ipv4s".arn
         }
       }
   
       visibility_config {
         cloudwatch_metrics_enabled = true
         metric_name                = "Datadog-blocked-ipv4s"
         sampled_requests_enabled   = true
       }
     }
   
     visibility_config {
       cloudwatch_metrics_enabled = true
       metric_name                = "EdgeWAF"
       sampled_requests_enabled   = true
     }
   }
   ```

2. Run `terraform apply` to create and update the WAF resources.

{{% /tab %}}
{{< /tabs >}}

After setup is complete, click **Block New Attackers** on the App & API Protection [denylist page][6]. Select the web ACL and associated AWS connection to block IP addresses.

[1]: /integrations/amazon-web-services/
[2]: /integrations/amazon_waf/
[3]: /actions/connections/
[4]: https://app.datadoghq.com/security/configuration/asm/setup
[5]: https://app.datadoghq.com/security/appsec/traces?query=service%3Aaws.waf
[6]: https://app.datadoghq.com/security/appsec/denylist
