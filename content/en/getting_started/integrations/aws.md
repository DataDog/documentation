---
title: Getting Started with AWS
kind: documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/aws-monitoring/'
      tag: 'Blog'
      text: 'Key metrics for AWS monitoring'
    - link: 'https://www.datadoghq.com/blog/aws-1-click-integration/'
      tag: 'Blog'
      text: 'Introducing our AWS 1-click integration'
    - link: agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
      tag: 'FAQ'
      text: 'Why should I install the Datadog agent on my cloud instances?'
    - link: 'integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/??tab=cloudformation'
      tag: 'Documentation'
      text: 'Use CloudWatch metric streams with Kinesis Data Firehose'
      
---

## Overview

This guide provides an overview of the process for linking an AWS account with Datadog using Datadog's CloudFormation template. 

At a high level, this involves creating a read-only IAM role and associated policy for Datadog's AWS account and deploying the [Datadog Forwarder][1] Lambda function. The forwarder then simplifies the process of sending logs, custom metrics, and traces to Datadog. Using the CloudFormation template provides all the tools needed to send this data to your Datadog account, and Datadog maintains the CloudFormation template to provide the latest functionality.

This process can be repeated for as many AWS accounts as necessary, and you can also use the [API][2] or [Terraform][3] to set up multiple accounts at once.

## Prerequisites

Before getting started, ensure you have the following prerequisites:

1. [AWS][4] account
2. A Datadog account and [API key][5]. If you need a Datadog account, [sign up for a free trial][6].

## Setup

1. From the AWS tile on the [Integrations Page][7] in your Datadog account. Select the CloudFormation Template option:
{{< img src="getting_started/integrations/integration-tile-setup.png" alt="Datadog integrations AWS tile">}}

2. This opens the AWS Console and loads the CloudFormation stack. For this demonstration, the API key has been entered directly into the `DdApiKey` field, but you can also store this value in [Secrets Manager][8] and specify the ARN of the secret:
{{< img src="getting_started/integrations/cloudformation-options-1.png" alt="First part of CloudFormation options for creating Datadog stacks">}}

3. Ensure that the the correct [Datadog site][9] parameter is used for the `DdSite` parameter to match the region of your Datadog account. Check the required boxes from AWS and click `Create stack`:
{{< img src="getting_started/integrations/cloudformation-options-2.png" alt="Second part of CloudFormation options for creating Datadog stacks">}}


This begins the creation process for the Datadog stack along with three nested stacks:
{{< img src="getting_started/integrations/cloudformation-stacks-complete.png" alt="Datadog stacks completed in CloudFormation">}}

4. From the integration tile on the Datadog side, enter the AWS account ID and AWS Role name. If the role name wasn't changed in the CloudFormation setup page, use `DatadogIntegrationRole`. Datadog automatically queries AWS with the provided values, and a successful query returns the following status:
{{< img src="getting_started/integrations/integration-tile-status.png" alt="Datadog AWS integration tile with 'Account credentials are valid' message">}}

5. Finally, click `Install integration`. For the purposes of this demonstration, all options have been selected (only `Collect custom metrics` is unticked by default):
{{< img src="getting_started/integrations/integration-tile-complete.png" alt="Datadog AWS integration tile">}}

It should be noted that there are multiple options within the integration tile to specify the data to be collected. This can be limited based on AWS service, namespace, or tags.
With [EC2 automuting][10] enabled, Datadog uses host statuses reported by the CloudWatch API to distinguish between expected and unexpected instance terminations, preventing unwanted Monitor notifications.

### Validation

The automatically-provisioned [AWS overview dashboard][11] provides an immediate window into the metrics sent by your AWS services and infrastructure:
{{< img src="getting_started/integrations/aws-dashboard.png" alt="AWS overview dashboard">}}


## Sending Logs

As a result of setting up the Datadog Forwarder function with the CloudFormation template, log collection can be configured from directly within the integration tile in Datadog. Click into the `Collect Logs` tab in the Integration tile and enter the ARN of the Forwarder lambda. With the ARN entered, click the check mark to establish the connection: 
{{< img src="getting_started/integrations/integration-tile-collect-logs-1.png" alt="Datadog AWS integration tile 'Collect Logs' tab">}}

Once completed, you'll be able to select from any of the log sources mentioned in [this guide][12] for sending AWS service logs. For this guide, we'll select only S3 access logs, and click `Save`:
{{< img src="getting_started/integrations/integration-tile-collect-logs-2.png" alt="Datadog AWS integration tile 'Collect Logs' tab with 'S3' option checked">}}


### Validation

Find your logs in the [Logs Explorer][13] using either the `source` or `service` facets from the facet panel:
{{< img src="getting_started/integrations/logs-explorer.png" alt="Datadog Logs Explorer">}}

## Deeper visibility with the Datadog agent

By default the Datadog AWS integration crawls the CloudWatch API for AWS-provided metrics, but you can gain even deeper visibility into your EC2 instances and ECS clusters with the [Datadog agent][14]. The agent is a lightweight daemon which reports metrics and events, and can also be configured for logs and traces. The [Agent Installation][15] section of the Datadog application provides instructions for installing the agent on a wide variety of operating systems, with many options--such as Amazon Linux 2--offering one-step installation commands. This command can then be run from the instance terminal to install the agent:
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="Datadog agent installation page">}}


Once the agent is installed, it's graphically represented within the [Infrastructure List][16] with a bone icon:
{{< img src="getting_started/integrations/infrastructure-list.png" alt="Datadog infrastructure list">}}


As can be seen in the screenshot above, the host with the Datadog agent is reporting data from the [System][17] and [NTP][18] checks. The System check provides metrics around CPU, memory, filesystem, and I/O, providing additional insights into the host. You can enable additional [integrations][19] to suit the environment and use case, and [DogStatsD][20] can additionally be leveraged for sending custom metrics directly to Datadog. 

## What's next?

With metrics and logs flowing from AWS into Datadog, there are a number of options to further explore and analyze the data. For example, creating [dashboards][21] to provide visibility or setting up [monitors][22] to be notified for any unwanted or unexpected behavior.

### Traces
To dig even deeper and gather more data from your applications and AWS services, there is also the option of receiving distributed traces from either the [AWS X-Ray][23] integration or from a host with the Datadog agent via [Datadog's APM][24].

### Security
Review the [Getting Started with CSPM][25] guide to assess and detect misconfigurations in your cloud environment.

### Troubleshooting
If you encounter any issues, be sure to check out the [Troubleshooting][26] section of our documentation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}







[1]: https://docs.datadoghq.com/serverless/libraries_integrations/forwarder/
[2]: https://docs.datadoghq.com/api/latest/aws-integration/#create-an-aws-integration
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[4]: https://aws.amazon.com/getting-started/?nc1=f_cc
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://app.datadoghq.com/signup
[7]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[8]: https://aws.amazon.com/secrets-manager/
[9]: https://docs.datadoghq.com/getting_started/site/
[10]: https://docs.datadoghq.com/integrations/amazon_ec2/#ec2-automuting
[11]: https://app.datadoghq.com/screen/integration/7/aws-overview
[12]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[13]: https://app.datadoghq.com/logs
[14]: https://docs.datadoghq.com/getting_started/agent/
[15]: https://app.datadoghq.com/account/settings#agent
[16]: https://app.datadoghq.com/infrastructure
[17]: https://docs.datadoghq.com/integrations/system/#pagetitle
[18]: https://docs.datadoghq.com/integrations/ntp/#pagetitle
[19]: https://docs.datadoghq.com/integrations/
[20]: https://docs.datadoghq.com/developers/dogstatsd/?tab=hostagent
[21]: https://docs.datadoghq.com/dashboards/#overview
[22]: https://docs.datadoghq.com/monitors/create/types/
[23]: https://docs.datadoghq.com/integrations/amazon_xray/?tab=nodejs#overview
[24]: https://docs.datadoghq.com/tracing/setup_overview/
[25]: https://docs.datadoghq.com/security_platform/cspm/getting_started/#overview
[26]: https://docs.datadoghq.com/integrations/amazon_web_services/?tab=roledelegation#troubleshooting
