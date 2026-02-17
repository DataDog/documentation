---
title: AWS Integration Billing
aliases:
- /integrations/faq/i-can-t-filter-out-my-elb-instances-will-i-be-charged-for-them/
---

## Overview

Datadog bills for AWS hosts running the Datadog Agent and all EC2 instances picked up by the Datadog-AWS integration. **You are not billed twice** if you are running the Agent on an EC2 instance picked up by the AWS integration.

**IMPORTANT**: Datadog uses EC2 instance metadata to ensure you aren't billed twice for hosts both running the agent and being crawled by the AWS integration. If your EC2 instances are configured to require the use of [Instance Metadata Service Version 2 (IMDSv2)][1], then you must set the parameter `ec2_prefer_imdsv2` to `true` in your [Agent configuration][2] to avoid double-billing.

When you set up the Fargate and Lambda integration tiles, and any custom metrics, it impacts your Datadog bill.

Other AWS resources such as ELB, RDS, and DynamoDB are not part of monthly infrastructure billing, and configuration exclusions do not apply.

## AWS resource exclusion

You can limit the AWS metrics collected for some services to specific resources. On the [Datadog-AWS integration page][3], select the AWS account and click on the **Metric Collection** tab. Under **Limit Metric Collection to Specific Resources** you can then limit metrics for one or more of EC2, Lambda, ELB, Application ELB, Network ELB, RDS, SQS, Step Functions, and CloudWatch custom metrics.
Ensure that the tags added to this section are assigned to the corresponding resources on AWS.

**Note**: If using exclusion notation (`!`), ensure the resource lacks the specified tag.

{{< img src="account_management/billing/aws-resource-exclusion.png" alt="The metric collection tab of an AWS account within the Datadog AWS integration page showing the option to limit metric collection to specific resources with a dropdown menu to select AWS service and a field to add tags in key:value format" >}}

You can also limit AWS metrics using the [API][4].

**Note**: Only EC2 (hosts), Lambda (active functions), CloudWatch Custom Metrics (custom metrics), and [containers][9] are billable by Datadog. Metrics integrated for the other services you can filter do not incur Datadog charges.

### EC2

EC2 metrics resource exclusion settings apply to both EC2 instances and any attached EBS volumes. When adding limits to existing AWS accounts within the integration page, the previously discovered instances could stay in the [Infrastructure List][5] for up to two hours. During the transition period, EC2 instances display a status of `???`. This does not count towards your billing.

Hosts with a running Agent still display and are included in billing. Use the limit option to restrict `aws.ec2.*` metrics collection from AWS and restrict the AWS resource EC2 instance hosts.

#### Examples

The following filter excludes all EC2 instances that contain the tag `datadog:no`:

```
!datadog:no
```

The following filter _only_ collects metrics from EC2 instances that contain the tag `datadog:monitored` **or** the tag `env:production` **or** an `instance-type` tag with a `c1.*` value **and not** a `region:us-east-1` tag:

```
datadog:monitored,env:production,instance-type:c1.*,!region:us-east-1
```
**Note**: In Datadog, uppercase letters are changed to lowercase letters and spaces are replaced with underscores. For example, to collect metrics from EC2 instances with the tag `Team:Frontend App`, in Datadog, the tag applied should be `team:frontend_app`.
 
### CloudWatch Metric Streams with Amazon Data Firehose

You can optionally [send CloudWatch metrics to Datadog using CloudWatch Metric Streams and Amazon Data Firehose][8] instead of using the default API polling method. Tag filtering configured in the AWS Integration tile **also applies** to CloudWatch Metric Streams.

## Check if a host is monitored by the Agent or AWS

In the Infrastructure Host list:

- **Monitored by AWS Integration**

  If a host displays only the AWS logo, or if its metrics are limited to the `aws.*` namespace, it indicates that the host is monitored exclusively through the AWS integration.

  {{< img src="account_management/billing/infra-aws.png" alt="Infrastructure Host list showing multiple hosts with only the AWS logo, indicating monitoring through the AWS integration." >}}

- **Monitored by the Datadog Agent**

  If a host displays the Datadog Agent logo but not the AWS logo, or if its metrics are collected from the Datadog Agent (such as `datadog.*`, `system.*`, etc.), it indicates that the host is being monitored by the Datadog Agent.

  {{< img src="account_management/billing/infra-agent.png" alt="Infrastructure Host List showing a host with the Datadog Agent logo but no AWS logo, indicating monitoring through the Datadog Agent." >}}

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
[8]: /integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation#streaming-vs-polling
[9]: /account_management/billing/containers/
