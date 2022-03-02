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
    - link: 'integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/??tab=cloudformation'
      tag: 'Documentation'
      text: 'AWS CloudWatch Metric Streams with Kinesis Data Firehose'
---

## Overview

This guide provides an overview of the process for integrating an Amazon Web Services(AWS) account with Datadog using Datadog's CloudFormation template. 

At a high level, this involves creating an IAM role and associated policy to enable Datadog's AWS account to make API calls into your AWS account for collecting or pushing data. The template also deploys the [Datadog Forwarder][1] Lambda function for sending logs to Datadog. Using the CloudFormation template provides all the tools needed to send this data to your Datadog account, and Datadog maintains the CloudFormation template to provide the latest functionality.

Once the initial connection is established, you can easily enable any of the individual AWS service integrations relevant to your AWS environment. With a single click, Datadog provisions the necessary resources in your AWS account and begins querying metrics and events for the services you use. For popular AWS services you are using, Datadog provisions out-of-the-box dashboards, providing immediate and customizable visibility. This guide demonstrates setting up the integration, sending logs from [CloudTrail][2] and the Forwarder Lambda function, and installing the Datadog Agent on an Amazon Linux EC2 instance. See the [Enable sub-integrations section](#enable-sub-integrations) for a list of the available sub-integrations.

This process can be repeated for as many AWS accounts as necessary, or you can also use the [API][3], [AWS CLI][4], or [Terraform][5] to set up multiple accounts at once. For more information, review Datadog's [CloudFormation Guide][6].

## Prerequisites

Before getting started, ensure you have the following prerequisites:

1. An [AWS][7] account. Your AWS user needs the following IAM permissions to successfully run the CloudFormation template:

    * cloudformation:CreateStack
    * ec2:DescribeSecurityGroups
    * ec2:DescribeSubnets
    * ec2:DescribeVpcs
    * iam:AttachRolePolicy
    * iam:CreatePolicy
    * iam:CreateRole
    * iam:PassRole
    * iam:PutRolePolicy
    * iam:UpdateAssumeRolePolicy
    * kms:Decrypt
    * lambda:AddPermission
    * lambda:CreateFunction
    * lambda:GetCodeSigningConfig
    * lambda:GetFunction
    * lambda:GetFunctionCodeSigningConfig
    * lambda:InvokeFunction
    * lambda:PutFunctionConcurrency
    * logs:CreateLogGroup
    * logs:DescribeLogGroups
    * logs:PutRetentionPolicy
    * s3:CreateBucket
    * s3:GetObject
    * s3:GetObjectVersion
    * secretsmanager:CreateSecret
    * secretsmanager:GetSecretValue
    * secretsmanager:PutSecretValue
    * serverless:CreateCloudFormationTemplate


## Setup


2. From the AWS tile on the [Integrations page][12] in your Datadog account, scroll to the bottom of the page and click "Add another account," then subsequently click the "Automatically Using CloudFormation" option:
{{< img src="getting_started/integrations/integration-tile-setup.png" alt="An image from the Datadog AWS integration tile showing the options for establishing the integration. The Role Delegation tab is highlighted.">}}

3. This opens the AWS Console and loads the CloudFormation stack. All the parameters will be correctly filled in based on your selections in the prior Datadog form, so you do not need to edit those unless desired.
**Note:** The `DatadogAppKey` parameter enables the CloudFormation stack to add and edit the Datadog configuration for this AWS account via API calls to Datadog. This is automatically generated and tied to your Datadog account.
{{< img src="getting_started/integrations/cloudformation-options-1.png" alt="An image from the AWS CloudFormation create-stack page that shows the Stack name as datadog, IAMRoleName as DatadogIntegrationRole, ExternalId as an obfuscated value ending in be46, DdApiKey as an obfuscated value.">}}

4. Check the required boxes from AWS and click `Create stack`:
{{< img src="getting_started/integrations/cloudformation-options-2.png" alt="An image from the AWS CloudFormation create-stack page that shows the Advanced options of creating the Datadog stack. DdAWSAccountId parameter is filled in with 464622532012, DdForwarderName parameter is filled in with DatadogForwarder, and InstallDatadogPolicyMacro is set as true. Below these parameters is a Capabilities section with two checkboxes, both of which are checked. The first checkbox states 'I acknowledge that AWS CloudFormation might create IAM resources with custom names.' The second checkbox states 'I acknowledge that AWS CloudFormation might require the following capability: CAPABILITY_AUTO_EXPAND'.">}}

This begins the creation process for the Datadog stack along with three nested stacks. This could take several minutes; ensure that the stack is successfully created before proceeding:
{{< img src="getting_started/integrations/cloudformation-stacks-complete.png" alt="An image from the AWS CloudFormation Stacks page showing the four completed stacks under the 'Stacks' column along the left hand side of the page. The stacks are datadog-DatadogIntegrationRoleStack, datadog-DatadogPolicyMacroStack, datadog-ForwarderStack, and datadog. Each stack shows the timestamp of creation and a green checkmark with CREATE_COMPLETE. The 'datadog' stack and is highlighted and displaying the 'Events' tab. There are 9 events listed with their Timestamp, Logical ID, Status, and Status reason. These events reference the different stages of creation for each of the stacks.">}}

5. Once the Stack has successfully created, go back to the Datadog tab you have open to the AWS  integration tile. You'll see a box for the new account you created. Click "Refresh to Check Status" and you should see a success message at the top of the page, along with the new account you just added visible on the page with the relevant details.

{{< img src="getting_started/integrations/integration-tile-complete.png" alt="An image displaying the AWS integration tile from within the Datadog account. The left hand side shows that the EC2 automuting option is enabled. There is a section titled 'Limit metric collection by AWS Service' which displays the sub-integrations associated with the Datadog AWS integration. These are ApiGateway, ApplicationELB, AppRunner, AppStream, AppSync, Athena, AutoScaling, Billing, Budgeting, CertificateManager, CloudFront, CloudHSM, CloudSearch, CodeBuild, Cognito, and Connect. There is a heading which states 'Turning on sub-integrations can affect your CloudWatch API usage. See our AWS FAQ for more info.'. All boxes are displayed as checked. Below this is another section called 'Other options'. There are two checkboxes here, Collect CloudWatch alarms and Collect custom metrics. Both options are checked.' On the right hand side of the page there is a section showing the settings for the connected AWS account. The Account ID is displayed as an obfuscated value. The AWS Role name is displayed as DatadogIntegrationRole.">}}

Depending on which AWS services you're using and your use case for monitoring, there are multiple options within the integration tile to specify the data to be collected. For example, you can limit data collection based on AWS service, namespace, or tags. Additionally, you can choose to mute monitor notifications. For example, terminations triggered manually or by autoscaling with [EC2 automuting][14] enabled. If needed, enable [Alarm Collection][15] to send your CloudWatch alarms to the Datadog [Event Stream][16] and choose whether to collect custom metrics.

### Validation

View the out-of-the-box [AWS overview dashboard][17] to see metrics sent by your AWS services and infrastructure:
{{< img src="getting_started/integrations/aws-dashboard.png" alt="An image displaying the AWS overview dashboard in the Datadog account. On the left is the AWS logo and an AWS events graph showing 'No matching entries found'. In the center are graphs related to EBS volumes with numerical data displayed and a heat map showing consistent data. Along the right are graphs related to ELBs showing numerical data as well as a timeseries graph showing spikey data from three sources.">}}

## Enable integrations for individual AWS service

See the [Integrations page][18] for a full listing of the available sub-integrations.

## Send logs

### With CloudTrail

As [CloudTrail][19] is widely used and helps to power [Cloud SIEM][20], follow the [Log collection documentation][21] for CloudTrail. This requires sending your CloudTrail logs to S3 and adding a trigger on the already-provisioned Datadog Forwarder Lambda function for `Object Created (All)` events on your S3 bucket.

Any new log events will be sent to Datadog once established, and the logs appear with the `Source` and `Service` attributes set as `cloudtrail`:

{{< img src="getting_started/integrations/logs-explorer-cloudtrail.png" alt="An image from the Logs Explorer page of the Datadog account. Along the left the image displays the Source facet, checked with 'cloudtrail'. Along the right, some log entries are displayed in a list format.">}}

### Automatically using triggers

As a result of setting up the Datadog Forwarder function with the CloudFormation template, you can [automatically set up triggers][22] to collect AWS logs from multiple sources in CloudWatch and S3. Click into the `Collect Logs` tab in the Integration tile and enter the ARN of the Forwarder Lambda. With the ARN entered, click the checkmark to establish the connection:
{{< img src="getting_started/integrations/integration-tile-collect-logs-1.png" alt="An image displaying the 'Collect Logs' tab of the AWS integration tile within the Datadog account. Along the left is a section displayed as 'AWS accounts' which shows the obfuscated AccountID of the connected account. On the right is a section displayed as 'Enter a Lambda ARN' which shows the ARN of the Datadog Forwarder Lambda function, with the accountID section of the ARN obfuscated.">}}

Provided you have already [Enabled logging for your AWS service][23], you can select from any of the log sources provided in the list, such as `S3 Access Logs` in the screenshot below. Click `Save`:
{{< img src="getting_started/integrations/integration-tile-collect-logs-2.png" alt="An image displaying the 'Collect Logs' tab of the AWS integration tile within the Datadog account. Along the left is a section displayed as 'AWS accounts' which shows the obfuscated AccountID of the connected account. On the right is a section displayed as 'Currently used Lambda ARNs' which shows the ARN of the Datadog Forwarder Lambda function, with the accountID section of the ARN obfuscated. Under this are the options for 'Enter a Lambda ARN' and 'Select the services you would like to collect logs for'. The only option which is ticked is the 'S3 Access Logs' option.">}}

Once you're receiving logs, review [Log Management][24] for more information about processing, enriching, searching, and analyzing your logs.

### Validation

Find your logs in the [Logs Explorer][25] using either the `source` or `service` facets from the facet panel, such as this example from S3:
{{< img src="getting_started/integrations/logs-explorer.png" alt="An image from the Logs Explorer page of the Datadog account. Along the left the image displays the Source and Service facets, both checked with 's3'. Along the right, some log entries are displayed in a list format.">}}

## Get more from the Datadog platform

### Deeper visibility with the Datadog Agent on EC2

By default the Datadog AWS integration crawls the CloudWatch API for AWS-provided metrics, but you can gain even deeper visibility into your EC2 instances with the [Datadog Agent][26]. The Agent is a lightweight daemon that reports metrics and events, and can also be configured for logs and traces. The [Agent Installation][27] section of the Datadog application provides instructions for installing the Agent on a wide variety of operating systems, with many options (for example, Amazon Linux) offering one-step installation commands. This command can then be run from the instance terminal to install the Agent:
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="An image displaying the 'Agent' section of the 'Integrations' tab in the Datadog account. Along the left are displayed a list of supported operating systems for the Datadog Agent. 'Amazon Linux' is highlighted from this list. On the right is displayed 'Use our easy one-step install'. The command for installing the Agent is displayed below this, with the DD_API_KEY section obfuscated.">}}

Once the Agent is installed, it's graphically represented within the [Infrastructure List][28] with a bone icon:
{{< img src="getting_started/integrations/infrastructure-list.png" alt="An image from the infrastructure list of the Datadog account. Two hosts are displayed in a list format. Both hosts show the AWS icon for the AWS integration and 'aws' shown in a blue box to show they are associated with the AWS integration. One host also shows a dog-bone icon and blue boxes for 'ntp' and 'system'.">}}

As can be seen in the screenshot above, the host with the Datadog Agent is reporting data from the [System][29] and [NTP][30] checks. The System check provides metrics around CPU, memory, filesystem, and I/O, providing additional insights into the host. You can enable additional [integrations][31] to suit the environment and use case, and [DogStatsD][32] can additionally be leveraged for sending custom metrics directly to Datadog. 

See the [FAQ on why you should install the Datadog Agent on your cloud instances][33] for more information about the benefits of this approach.

### Using the Datadog Agent with Amazon Container Services

For containerized environments, you can use the Datadog Agent, whether you're managing your instances or leveraging [Fargate][34] for a serverless environment.

#### ECS with EC2 launch type

Use the [Amazon ECS documentation][35]  to run the [Datadog Docker Agent][36] on the EC2 instances in your ECS cluster. Review the [Amazon ECS Data Collection documentation][37]  to see the metrics and events reported to your Datadog account.

#### ECS with Fargate launch type

Use the [Amazon ECS on AWS Fargate documentation][38]  to run the Agent as a container in the same task definition as your application. **Note**: Datadog Agent version 6.1.1 or higher is needed to take full advantage of the Fargate integration.

#### EKS

You don't need any specific configuration for Amazon Elastic Kubernetes Service (EKS), as mentioned in the [Kubernetes Distributions documentation][39]. Use the [dedicated Kubernetes documentation][40] to deploy the Agent in your EKS cluster.

#### EKS with Fargate

Since Fargate pods are managed by AWS, they exclude host-based system checks like CPU and memory. In order to collect data from your AWS Fargate pods, use the [Amazon EKS on AWS Fargate documentation][41] to run the Agent as a sidecar of your application pod with custom role-based access control (RBAC). **Note**: This requires Datadog Agent version 7.17 or higher.

#### EKS Anywhere

Use the [EKS Anywhere documentation][42] for on-premises Kubernetes clusters.

### Create additional Datadog resources
In addition to using the Datadog UI or [API][43], you can create many [Datadog resources][44] with the [CloudFormation Registry][45]. For visibility and troubleshooting, use [dashboards][46] to display key data, apply [Functions][47], and find [Metric Correlations][48]. 

To get notified of any unwanted or unexpected behavior in your account, create [monitors][49]. Monitors consistently evaluate the data reported to your account, and send [Notifications][50] to ensure that the right information gets to the right team members. Review the [List of Notification Integrations][51] for all the ways to notify your team.

## Explore related products

### Serverless

You can unify the metrics, traces, and logs from your AWS Lambda functions running serverless applications in Datadog. Check out [Serverless] for instructions on instrumenting your application, installing [Serverless Libraries and Integrations][52], implementing [Distributed Tracing with Serverless Applications][53], or [Serverless Troubleshooting][54].

### APM
To dig even deeper and gather more data from your applications and AWS services, enable collecting distributed traces from either the [AWS X-Ray][55] integration or from a host with the Datadog Agent using [APM][56]. Then, review [Explore Datadog APM][57] for a better understanding of how to use this data to gain insights into your application performance. 

Additionally, you can use [Watchdog][58], an algorithmic feature for APM performance and infrastructure metrics, to automatically detect and be notified about potential application issues.

### Security

#### Cloud SIEM

Review [Getting Started with Cloud SIEM][59] to evaluate your logs against the out-of-the-box [Log Detection Rules][60]. These rules are customizable, and when threats are detected, they generate Security Signals which can be accessed on the [Security Signals Explorer][61]. To ensure that the correct team is notified, use [Notification Rules][62] to configure notification preferences across multiple rules.

#### CSPM

Use the [Getting Started with CSPM][63] guide to learn about detecting and assessing misconfigurations in your cloud environment. Resource configuration data is evaluated against the [out-of-the-box Cloud Configuration Rules][64] to flag attacker techniques and potential misconfigurations, allowing for fast response and remediation.

### Troubleshooting
If you encounter any issues, be sure to check out the [Troubleshooting][65] section.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /serverless/libraries_integrations/forwarder/
[2]: https://aws.amazon.com/cloudtrail/
[3]: /api/latest/aws-integration/#create-an-aws-integration
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[6]: /integrations/guide/amazon_cloudformation/
[7]: https://aws.amazon.com/getting-started/?nc1=f_cc
[8]: https://app.datadoghq.com/organization-settings/api-keys
[9]: https://app.datadoghq.com/signup
[10]: /account_management/api-app-keys/#api-keys
[11]: https://aws.amazon.com/secrets-manager/
[12]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[13]: /getting_started/site/
[14]: /integrations/amazon_ec2/#ec2-automuting
[15]: /integrations/amazon_web_services/?tab=roledelegation#alarm-collection
[16]: /events/stream/
[17]: https://app.datadoghq.com/screen/integration/7/aws-overview
[18]: /integrations/#cat-aws
[19]: /integrations/amazon_cloudtrail/
[20]: /security_platform/cloud_siem/
[21]: /integrations/amazon_cloudtrail/#enable-logging
[22]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[23]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=cloudformation#enable-logging-for-your-aws-service
[24]: /logs/
[25]: https://app.datadoghq.com/logs
[26]: /getting_started/agent/
[27]: https://app.datadoghq.com/account/settings#agent
[28]: https://app.datadoghq.com/infrastructure
[29]: /integrations/system/
[30]: /integrations/ntp/
[31]: /integrations/
[32]: /developers/dogstatsd/?tab=hostagent
[33]: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[34]: https://aws.amazon.com/fargate/
[35]: /agent/amazon_ecs/?tab=awscli
[36]: /agent/docker/?tab=standard
[37]: /agent/amazon_ecs/data_collected/
[38]: /integrations/ecs_fargate/?tab=fluentbitandfirelens
[39]: /agent/kubernetes/distributions/?tab=helm#EKS
[40]: /agent/kubernetes/?tab=helm
[41]: /integrations/eks_fargate/#setup
[42]: /integrations/eks_anywhere/
[43]: /api/latest/using-the-api/
[44]: /integrations/guide/amazon_cloudformation/#resources-available
[45]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[46]: /dashboards/#overview
[47]: /dashboards/functions/
[48]: /dashboards/correlations/
[49]: /monitors/create/types/
[50]: /monitors/notify/
[51]: /integrations/#cat-notification
[52]: /serverless/libraries_integrations
[53]: /serverless/distributed_tracing
[54]: /serverless/troubleshooting
[55]: /integrations/amazon_xray/?tab=nodejs
[56]: /tracing/setup_overview/
[57]: /tracing/#explore-datadog-apm
[58]: /watchdog/
[59]: /security_platform/cloud_siem/getting_started/
[60]: /security_platform/default_rules/#cat-log-detection
[61]: /security_platform/explorer/
[62]: /security_platform/notification_rules/
[63]: /security_platform/cspm/getting_started/
[64]: /security_platform/default_rules/#cat-cloud-configuration
[65]: /integrations/amazon_web_services/?tab=roledelegation#troubleshooting
