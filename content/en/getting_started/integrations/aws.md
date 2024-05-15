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
    - link: 'https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/'
      tag: 'Blog'
      text: 'Deploying and configuring Datadog with CloudFormation'
    - link: 'https://www.datadoghq.com/blog/monitoring-as-code-with-datadog-and-cloudformation/'
      tag: 'Blog'
      text: 'Implement monitoring as code with Datadog and CloudFormation Registry'
    - link: 'https://www.datadoghq.com/blog/datadog-serverless-view/'
      tag: 'Blog'
      text: 'Monitor your entire serverless stack in the Serverless view'
    - link: 'https://www.datadoghq.com/blog/monitor-aws-fargate/'
      tag: 'Blog'
      text: 'Monitor ECS applications on AWS Fargate with Datadog'
    - link: 'https://www.datadoghq.com/blog/amazon-ecs-anywhere-monitoring/'
      tag: 'Blog'
      text: 'Monitor Amazon ECS Anywhere with Datadog'
    - link: '/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/?tab=cloudformation'
      tag: 'Documentation'
      text: 'AWS CloudWatch Metric Streams with Amazon Data Firehose'
    - link: 'https://www.datadoghq.com/blog/monitor-aws-graviton3-with-datadog/'
      tag: 'Blog'
      text: 'Monitor your Graviton3-powered EC2 instances with Datadog'
---

## Overview

This guide provides an overview of the process for integrating an Amazon Web Services(AWS) account with Datadog using Datadog's CloudFormation template.

At a high level, this involves creating an IAM role and associated policy to enable Datadog's AWS account to make API calls into your AWS account for collecting or pushing data. The template also deploys the [Datadog Forwarder][1] Lambda function for sending logs to Datadog. Using the CloudFormation template provides all the tools needed to send this data to your Datadog account, and Datadog maintains the CloudFormation template to provide the latest functionality.

After the initial connection is established, you can enable individual AWS service integrations relevant to your AWS environment. With a single click, Datadog provisions the necessary resources in your AWS account and begins querying metrics and events for the services you use. For popular AWS services you are using, Datadog provisions out-of-the-box dashboards, providing immediate and customizable visibility. This guide demonstrates setting up the integration and installing the Datadog Agent on an Amazon Linux EC2 instance, as well as providing a broad overview of the integration's capabilities. See the [Enable integrations for individual AWS service](#enable-integrations-for-individual-aws-service) section for a list of the available sub-integrations.

This process can be repeated for as many AWS accounts as necessary, or you can also use the [API][3], [AWS CLI][4], or [Terraform][5] to set up multiple accounts at once. For more information, read the [Datadog-Amazon CloudFormation guide][6].

## Prerequisites

Before getting started, ensure you have the following prerequisites:

1. An [AWS][7] account. Your AWS user needs the following IAM permissions to successfully run the CloudFormation template:

    * cloudformation:CreateStack
    * cloudformation:CreateUploadBucket
    * cloudformation:DeleteStack
    * cloudformation:DescribeStacks
    * cloudformation:DescribeStackEvents
    * cloudformation:GetStackPolicy
    * cloudformation:GetTemplateSummary
    * cloudformation:ListStacks
    * cloudformation:ListStackResources
    * ec2:DescribeSecurityGroups
    * ec2:DescribeSubnets
    * ec2:DescribeVpcs
    * iam:AttachRolePolicy
    * iam:CreatePolicy
    * iam:CreateRole
    * iam:DeleteRole
    * iam:DeleteRolePolicy
    * iam:DetachRolePolicy
    * iam:GetRole
    * iam:GetRolePolicy
    * iam:PassRole
    * iam:PutRolePolicy
    * iam:UpdateAssumeRolePolicy
    * kms:Decrypt
    * lambda:AddPermission
    * lambda:CreateFunction
    * lambda:DeleteFunction
    * lambda:GetCodeSigningConfig
    * lambda:GetFunction
    * lambda:GetFunctionCodeSigningConfig
    * lambda:GetLayerVersion
    * lambda:InvokeFunction
    * lambda:PutFunctionConcurrency
    * lambda:RemovePermission
    * lambda:TagResource
    * logs:CreateLogGroup
    * logs:DeleteLogGroup
    * logs:DescribeLogGroups
    * logs:PutRetentionPolicy
    * oam:ListSinks
    * oam:ListAttachedLinks
    * s3:CreateBucket
    * s3:DeleteBucket
    * s3:DeleteBucketPolicy
    * s3:GetEncryptionConfiguration
    * s3:GetObject
    * s3:GetObjectVersion
    * s3:PutBucketPolicy
    * s3:PutBucketPublicAccessBlock
    * s3:PutEncryptionConfiguration
    * secretsmanager:CreateSecret
    * secretsmanager:DeleteSecret
    * secretsmanager:GetSecretValue
    * secretsmanager:PutSecretValue
    * serverlessrepo:CreateCloudFormationTemplate

## Setup

2. Go to the [AWS integration configuration page][8] in Datadog and click **Add AWS Account**.

3. Configure the integration's settings under the **Automatically using CloudFormation** option.  
    a. Select the AWS regions to integrate with.  
    b. Add your Datadog [API key][9].  
    c. Optionally, send logs and other data to Datadog with the [Datadog Forwarder Lambda][1].  
    d. Optionally, enable [Cloud Security Management Misconfigurations][54] to scan your cloud environment, hosts, and containers for misconfigurations and security risks.

5. Click **Launch CloudFormation Template**. This opens the AWS Console and loads the CloudFormation stack. All the parameters are filled in based on your selections in the prior Datadog form, so you do not need to edit those unless desired.  
**Note:** The `DatadogAppKey` parameter enables the CloudFormation stack to make API calls to Datadog to add and edit the Datadog configuration for this AWS account. The key is automatically generated and tied to your Datadog account.

6. Check the required boxes from AWS and click **Create stack**. This launches the creation process for the Datadog stack along with three nested stacks. This could take several minutes. Ensure that the stack is successfully created before proceeding.

7. After the stack is created, go back to the AWS integration tile in Datadog and click **Ready!**

8. Wait up to 10 minutes for data to start being collected, and then view the out-of-the-box [AWS overview dashboard][12] to see metrics sent by your AWS services and infrastructure:
{{< img src="getting_started/integrations/aws-dashboard.png" alt="The AWS overview dashboard in the Datadog account. On the left is the AWS logo and an AWS events graph showing 'No matching entries found'. In the center are graphs related to EBS volumes with numerical data displayed and a heatmap showing consistent data. Along the right are graphs related to ELBs showing numerical data as well as a timeseries graph showing spiky data from three sources.">}}

## Enable integrations for individual AWS services

See the [Integrations page][13] for a full listing of the available sub-integrations. Many of these integrations are installed by default when Datadog recognizes data coming in from your AWS account.

## Send logs

There are two ways of sending AWS service logs to Datadog:

- [Amazon Data Firehose destination][10]: Use the Datadog destination in your Amazon Data Firehose delivery stream to forward logs to Datadog. It is recommended to use this approach when sending logs from CloudWatch in a very high volume.
- [Forwarder Lambda function][11]: Deploy the Datadog Forwarder Lambda function, which subscribes to S3 buckets or your CloudWatch log groups and forwards logs to Datadog. You **must** use this approach to send traces, enhanced metrics, or custom metrics from Lambda functions asynchronously through logs. Datadog also recommends you use this approach to sending logs from S3 or other resources that cannot directly stream data to Kinesis.

Read the [Enable logging for your AWS service][14] section to get logs flowing for the most-used AWS services.

### Validation

Once you have enabled logs, find them in the [Logs Explorer][15] using either the `source` or `service` facets from the facet panel, such as this example from S3:
{{< img src="getting_started/integrations/logs-explorer.png" alt="The Logs Explorer page of the Datadog account. Along the left the image displays the Source and Service facets, both checked with 's3'. Along the right, some log entries are displayed in a list format.">}}

## Get more from the Datadog platform

### Deeper visibility with the Datadog Agent on EC2

By default the Datadog AWS integration crawls the CloudWatch API for AWS-provided metrics, but you can gain even deeper visibility into your EC2 instances with the [Datadog Agent][16]. The Agent is a lightweight daemon that reports metrics and events, and can also be configured for logs and traces. The [Agent Installation][17] section of the Datadog application provides instructions for installing the Agent on a wide variety of operating systems. Many operating systems (for example, Amazon Linux) have one-step installation commands that you can run from the instance terminal to install the Agent:
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="The 'Agent' section of the 'Integrations' tab in Datadog. Along the left are displayed a list of supported operating systems for the Datadog Agent. 'Amazon Linux' is highlighted from this list. On the right is displayed 'Use our easy one-step install'. The command for installing the Agent is displayed below this, with the DD_API_KEY section obfuscated.">}}

Once the Agent is installed, it's graphically represented within the [Infrastructure List][18] with a bone icon:
{{< img src="getting_started/integrations/infrastructure-list.png" alt="The infrastructure list showing two hosts in a list format. Both hosts show the AWS icon for the AWS integration and 'aws' shown in a blue box to show they are associated with the AWS integration. One host also shows a dog-bone icon and blue boxes for 'ntp' and 'system'.">}}

The screen shot above shows the host with the Datadog Agent reporting data from the [System][19] and [NTP][20] checks. The System check provides metrics around CPU, memory, filesystem, and I/O, providing additional insights into the host. You can enable additional [integrations][21] to suit the environment and use case, or additionally use [DogStatsD][22] to send custom metrics directly to Datadog.

See the [FAQ on why you should install the Datadog Agent on your cloud instances][23] for more information about the benefits of this approach.

### Using the Datadog Agent with Amazon Container Services

For containerized environments, you can use the Datadog Agent, whether you're managing your instances or leveraging [Fargate][24] for a serverless environment.

#### ECS with EC2 launch type

Use the [Amazon ECS documentation][25] to run the [Datadog Docker Agent][26] on the EC2 instances in your ECS cluster. Review the [Amazon ECS Data Collection documentation][27] to see the metrics and events reported to your Datadog account.

#### ECS with Fargate launch type

Use the [Amazon ECS on AWS Fargate documentation][28] to run the Agent as a container in the same task definition as your application. **Note**: Datadog Agent version 6.1.1 or higher is needed to take full advantage of the Fargate integration.

#### AWS Batch with Fargate orchestration type

Use the [Amazon ECS on AWS Fargate for AWS Batch documentation][58] to run the Agent as a container in the same AWS Batch job definition as your application. **Note**: Datadog Agent version 6.1.1 or higher is needed to take full advantage of the Fargate integration.

#### EKS

You don't need any specific configuration for Amazon Elastic Kubernetes Service (EKS), as mentioned in the [Kubernetes Distributions documentation][29]. Use the [dedicated Kubernetes documentation][30] to deploy the Agent in your EKS cluster.

#### EKS with Fargate

Because Fargate pods are managed by AWS, they exclude host-based system checks like CPU and memory. To collect data from your AWS Fargate pods, use the [Amazon EKS on AWS Fargate documentation][31] to run the Agent as a sidecar of your application pod with custom role-based access control (RBAC). **Note**: This requires Datadog Agent version 7.17 or higher.

#### EKS Anywhere

Use the [EKS Anywhere documentation][32] for on-premises Kubernetes clusters.

### Create additional Datadog resources
In addition to using the Datadog UI or [API][33], you can create many [Datadog resources][34] with the [CloudFormation Registry][35]. For visibility and troubleshooting, use [dashboards][36] to display key data, apply [Functions][37], and find [Metric Correlations][38].

To get notified of any unwanted or unexpected behavior in your account, create [monitors][39]. Monitors consistently evaluate the data reported to your account, and send [Notifications][40] to ensure that the right information gets to the right team members. Review the [List of Notification Integrations][41] for all the ways to notify your team.

## Explore related products

### Serverless

You can unify the metrics, traces, and logs from your AWS Lambda functions running serverless applications in Datadog. Check out [Serverless][42] for instructions on instrumenting your application, installing [Serverless Libraries and Integrations][43], implementing [Distributed Tracing with Serverless Applications][44], or [Serverless Troubleshooting][45].

### APM
To dig even deeper and gather more data from your applications and AWS services, enable collecting distributed traces from either the [AWS X-Ray][46] integration or from a host with the Datadog Agent using [APM][47]. Then, read the [APM documentation][48] for a better understanding of how to use this data to gain insights into your application performance.

Additionally, you can use [Watchdog][49], an algorithmic feature for APM performance and infrastructure metrics, to automatically detect and be notified about potential application issues.

### Security

#### Cloud SIEM

Review [Getting Started with Cloud SIEM][50] to evaluate your logs against the out-of-the-box [Log Detection Rules][51]. These rules are customizable, and when threats are detected, they generate security signals which can be accessed on the [Security Signals Explorer][52]. To ensure that the correct team is notified, use [Notification Rules][53] to configure notification preferences across multiple rules.

#### Cloud Security Management Misconfigurations

Use the [Setting Up CSM Misconfigurations][54] guide to learn about detecting and assessing misconfigurations in your cloud environment. Resource configuration data is evaluated against the out-of-the-box [Cloud][55] and [Infrastructure][56] compliance rules to flag attacker techniques and potential misconfigurations, allowing for fast response and remediation.

### Troubleshooting

If you encounter the error `Datadog is not authorized to perform sts:AssumeRole`, see its dedicated [troubleshooting page][2]. For any other issues, see the [AWS integration troubleshooting guide][57].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /logs/guide/forwarder/
[2]: /integrations/guide/error-datadog-not-authorized-sts-assume-role/
[3]: /api/latest/aws-integration/#create-an-aws-integration
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[6]: /integrations/guide/amazon_cloudformation/
[7]: https://aws.amazon.com/getting-started/?nc1=f_cc
[8]: https://app.datadoghq.com/integrations/amazon-web-services
[9]: https://app.datadoghq.com/organization-settings/api-keys
[10]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/
[11]: https://docs.datadoghq.com/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/
[12]: https://app.datadoghq.com/dash/integration/7/aws-overview
[13]: /integrations/#cat-aws
[14]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#enable-logging-for-your-aws-service
[15]: https://app.datadoghq.com/logs
[16]: /getting_started/agent/
[17]: https://app.datadoghq.com/account/settings/agent/latest
[18]: https://app.datadoghq.com/infrastructure
[19]: /integrations/system/
[20]: /integrations/ntp/
[21]: /integrations/
[22]: /developers/dogstatsd/?tab=hostagent
[23]: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[24]: https://aws.amazon.com/fargate/
[25]: /agent/amazon_ecs/?tab=awscli
[26]: /agent/docker/?tab=standard
[27]: /agent/amazon_ecs/data_collected/
[28]: /integrations/ecs_fargate/?tab=fluentbitandfirelens
[29]: /agent/kubernetes/distributions/?tab=helm#EKS
[30]: /agent/kubernetes/?tab=helm
[31]: /integrations/eks_fargate/#setup
[32]: /integrations/eks_anywhere/
[33]: /api/latest/using-the-api/
[34]: /integrations/guide/amazon_cloudformation/#resources-available
[35]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[36]: /dashboards/#overview
[37]: /dashboards/functions/
[38]: /dashboards/correlations/
[39]: /monitors/types
[40]: /monitors/notify/
[41]: /integrations/#cat-notification
[42]: /serverless
[43]: /serverless/libraries_integrations
[44]: /serverless/distributed_tracing
[45]: /serverless/aws_lambda/troubleshooting/
[46]: /integrations/amazon_xray/
[47]: /tracing/trace_collection/
[48]: /tracing/
[49]: /watchdog/
[50]: /getting_started/cloud_siem/
[51]: /security/default_rules/#cat-log-detection
[52]: /security/cloud_siem/investigate_security_signals
[53]: /security/notifications/rules/
[54]: /security/cloud_security_management/setup/
[55]: /security/default_rules/#cat-posture-management-cloud
[56]: /security/default_rules/#cat-posture-management-infra
[57]: /integrations/guide/aws-integration-troubleshooting/
[58]: /integrations/ecs_fargate/?tab=webui#installation-for-aws-batch


