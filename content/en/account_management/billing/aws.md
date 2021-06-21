---
title: AWS integration billing
kind: documentation
aliases:
- /integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them/
---

## Overview

Datadog bills for AWS hosts running the Datadog Agent and all EC2 instances picked up by the Datadog-AWS integration. **You are not billed twice** if you are running the Agent on an EC2 instance picked up by the AWS integration.

Other AWS resources (ELB, EBS, RDS, Dynamo, etc.) are not part of monthly billing and configuration exclusions do not apply.

## AWS resource exclusion

Use the [Datadog-AWS integration tile][1] to control your metric collection. Go to the **Configuration** tab and select an account or add a new one. Each account is controlled under **Optionally limit resource collection**. Limit metrics by [host tag][2], lambda tag, or per namespace:

{{< img src="account_management/billing/aws02.png" alt="AWS" >}}

**Note**: Datadog does not charge for ELB metrics, as they can’t be filtered out.

**Note**: Host resource exclusion settings apply to both EC2 and its attached EBS volumes. 

When adding limits to existing AWS accounts within the integration tile, the previously discovered instances could stay in the [Infrastructure List][3] up to 2 hours. During the transition period, EC2 instances display a status of `???`. This does not count towards your billing.

Hosts with a running Agent still display and are included in billing. Using the limit option is only applicable to EC2 instances without a running Agent.

## Troubleshooting

For technical questions, contact [Datadog support][4].

For billing questions, contact your [Customer Success][5] Manager.

[1]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[2]: /getting_started/tagging/using_tags/#integrations
[3]: /infrastructure/
[4]: /help/
[5]: mailto:success@datadoghq.com
