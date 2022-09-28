---
title: AWS Integration Billing
kind: documentation
aliases:
- /integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them/
---

## Overview

Datadog bills for AWS hosts running the Datadog Agent and all EC2 instances picked up by the Datadog-AWS integration. **You are not billed twice** if you are running the Agent on an EC2 instance picked up by the AWS integration.

**IMPORTANT**: Datadog uses EC2 instance metadata to ensure you aren't billed twice for hosts both running the agent and being crawled by the AWS integration. If your EC2 instances are configured to require the use of [Instance Metadata Service Version 2 (IMDSv2)][1], then you must set the parameter `ec2_prefer_imdsv2` to `true` in your [Agent configuration][2] to avoid double-billing.


When you set up the Fargate and Lambda integration tiles, and any custom metrics, it impacts your Datadog bill.

Other AWS resources (ELB, RDS, Dynamo, etc.) are not part of monthly billing and configuration exclusions do not apply.
 

## AWS resource exclusion

You can limit the AWS metrics collected for some services to specific resources. On the [Datadog-AWS integration page][3], select the AWS account and click on the **Metric Collection** tab. Under **Limit Metric Collection to Specific Resources** you can then exclude metrics for one or more of EC2, Lambda, ELB, Application ELB, Network ELB, RDS, SQS, and CloudWatch custom metrics.

{{< img src="account_management/billing/aws-resource-exclusion.png" alt="The metric collection tab of an AWS account within the Datadog AWS integration page showing the option to limit metric collection to specific resources with a dropdown menu to select AWS service and a field to add tags in key:value format" >}}

You can also limit AWS metrics using the [API][4].

**Note**: Only EC2 (hosts), Lambda (active functions), and CloudWatch Custom Metrics (custom metrics) are billable by Datadog. Metrics integrated for the other services you can filter do not incur Datadog charges.

**Note**: EC2 metrics resource exclusion settings apply to both EC2 and its attached EBS volumes. 

When adding limits to existing AWS accounts within the integration page, the previously discovered instances could stay in the [Infrastructure List][5] up to 2 hours. During the transition period, EC2 instances display a status of `???`. This does not count towards your billing.

Hosts with a running Agent still display and are included in billing. Using the limit option is only applicable to EC2 instances without a running Agent.

## Troubleshooting

For technical questions, contact [Datadog support][6].

For billing questions, contact your [Customer Success][7] Manager.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[3]: https://app.datadoghq.com/integrations/amazon-web-services
[4]: /api/latest/aws-integration/#set-an-aws-tag-filter
[5]: /infrastructure/
[6]: /help/
[7]: mailto:success@datadoghq.com
