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
To filter out other resources use the [API][8]. 

## AWS resource exclusion

Use the [Datadog-AWS integration tile][3] to control your metric collection. Go to the **Configuration** tab and select an account or add a new one. Each account is controlled under **Optionally limit resource collection**. Limit metrics by [host tag][4], lambda tag, or per namespace:

{{< img src="account_management/billing/aws02.png" alt="AWS" >}}

**Note**: Datadog does not charge for ELB metrics, as they can’t be filtered out.

**Note**: Host resource exclusion settings apply to both EC2 and its attached EBS volumes. 

When adding limits to existing AWS accounts within the integration tile, the previously discovered instances could stay in the [Infrastructure List][5] up to 2 hours. During the transition period, EC2 instances display a status of `???`. This does not count towards your billing.

Hosts with a running Agent still display and are included in billing. Using the limit option is only applicable to EC2 instances without a running Agent.

## Troubleshooting

For technical questions, contact [Datadog support][6].

For billing questions, contact your [Customer Success][7] Manager.

[1]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[2]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[4]: /getting_started/tagging/using_tags/#integrations
[5]: /infrastructure/
[6]: /help/
[7]: mailto:success@datadoghq.com
[8]: /api/latest/aws-integration/#set-an-aws-tag-filter
