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

Once the initial connection is established, you can easily enable any of the sub-integrations relevant to your cloud environment. With a single click, Datadog queries AWS with the provisioned IAM role and installs the desired integration. As soon as data returns from the integration, Datadog provisions an out-of-the-box dashboard for that integration, providing immediate and customizable visibility. This guide demonstrates setting up the integration, sending logs from [CloudTrail][2] and the Forwarder Lambda function, and installing the Datadog Agent on an Amazon Linux EC2 instance. See the [Enabling integrations section](#enabling-integrations) for a list of the available sub-integrations.

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

2. A Datadog account and [API key][8]. If you need a Datadog account, [sign up for a free trial][9].

## Setup

1. Provide a valid Datadog [API Key][10] to the CloudFormation template. You can paste the API key directly into the CloudFront template, or you can store the value in [Secrets Manager][11] and reference the ARN of the secret. First, copy this value to your clipboard.

2. From the AWS tile on the [Integrations page][12] in your Datadog account, select the CloudFormation Template option:
{{< img src="getting_started/integrations/integration-tile-setup.png" alt="An image from the Datadog AWS integration tile showing the options for establishing the integration. The Role Delegation tab is highlighted.">}}

3. This opens the AWS Console and loads the CloudFormation stack. Paste the API key into the `DdApiKey` field, or paste the Secret ARN into the `DdApiKeySecretArn` if using Secrets Manager:
{{< img src="getting_started/integrations/cloudformation-options-1.png" alt="An image from the AWS CloudFormation create-stack page that shows the Stack name as datadog, IAMRoleName as DatadogIntegrationRole, ExternalId as an obfuscated value ending in be46, DdApiKey as an obfuscated value.">}}

4. Ensure that the the correct [Datadog site][13] is used for the `DdSite` parameter to match the region of your Datadog account. Check the required boxes from AWS and click `Create stack`:
{{< img src="getting_started/integrations/cloudformation-options-2.png" alt="An image from the AWS CloudFormation create-stack page that shows the Advanced options of creating the Datadog stack. DdAWSAccountId parameter is filled in with 464622532012, DdForwarderName parameter is filled in with DatadogForwarder, and InstallDatadogPolicyMacro is set as true. Below these parameters is a Capabilities section with two checkboxes, both of which are checked. The first checkbox states 'I acknowledge that AWS CloudFormation might create IAM resources with custom names.' The second checkbox states 'I acknowledge that AWS CloudFormation might require the following capability: CAPABILITY_AUTO_EXPAND'.">}}

This begins the creation process for the Datadog stack along with three nested stacks. This could take several minutes; ensure that the stack successfully creates before proceeding:
{{< img src="getting_started/integrations/cloudformation-stacks-complete.png" alt="An image from the AWS CloudFormation Stacks page showing the four completed stacks under the 'Stacks' column along the left hand side of the page. The stacks are datadog-DatadogIntegrationRoleStack, datadog-DatadogPolicyMacroStack, datadog-ForwarderStack, and datadog. Each stack shows the timestamp of creation and a green checkmark with CREATE_COMPLETE. The 'datadog' stack and is highlighted and displaying the 'Events' tab. There are 9 events listed with their Timestamp, Logical ID, Status, and Status reason. These events reference the different stages of creation for each of the stacks.">}}

5. From the integration tile on the Datadog side, enter the AWS account ID and AWS Role name. If the role name wasn't changed in the CloudFormation setup page, use `DatadogIntegrationRole`. Datadog automatically queries AWS with the provided values, and a successful query returns a status that tells you your credentials are valid. Scroll down to find the `Install Integration` button.

6. Click `Install Integration`. For this demonstration, all options have been selected (only `Collect custom metrics` is unticked by default):
{{< img src="getting_started/integrations/integration-tile-complete.png" alt="An image displaying the AWS integration tile from within the Datadog account. The left hand side shows that the EC2 automuting option is enabled. There is a section titled 'Limit metric collection by AWS Service' which displays the sub-integrations associated with the Datadog AWS integration. These are ApiGateway, ApplicationELB, AppRunner, AppStream, AppSync, Athena, AutoScaling, Billing, Budgeting, CertificateManager, CloudFront, CloudHSM, CloudSearch, CodeBuild, Cognito, and Connect. There is a heading which states 'Turning on sub-integrations can affect your CloudWatch API usage. See our AWS FAQ for more info.'. All boxes are displayed as checked. Below this is another section called 'Other options'. There are two checkboxes here, Collect CloudWatch alarms and Collect custom metrics. Both options are checked.' On the right hand side of the page there is a section showing the settings for the connected AWS account. The Account ID is displayed as an obfuscated value. The AWS Role name is displayed as DatadogIntegrationRole.">}}

Depending on which AWS services you're using and your use case for monitoring, there are multiple options within the integration tile to specify the data to be collected. For example, you can limit data collection based on AWS service, namespace, or tags. Additionally, you can choose to mute monitor notifications, for instance terminations triggered manually or by autoscaling with [EC2 automuting][14] enabled. If needed, enable [Alarm Collection][15] to send your CloudWatch alarms to the Datadog [Event Stream][16] and choose whether to collect custom metrics.

### Validation

View the out-of-the-box [AWS overview dashboard][17] to see metrics sent by your AWS services and infrastructure:
{{< img src="getting_started/integrations/aws-dashboard.png" alt="An image displaying the AWS overview dashboard in the Datadog account. On the left is the AWS logo and an AWS events graph showing 'No matching entries found'. In the center are graphs related to EBS volumes with numerical data displayed and a heat map showing consistent data. Along the right are graphs related to ELBs showing numerical data as well as a timeseries graph showing spikey data from three sources.">}}

## Enable sub-integrations

<div class="alert alert-warning">
Datadog's Amazon integration is built to collect <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/aws-services-cloudwatch-metrics.html">ALL metrics from CloudWatch</a>. Datadog strives to continually update the docs to show every sub-integration, but cloud services rapidly release new metrics and services so the list of integrations are sometimes lagging.
</div>

| Integration                             | Description                                                                            |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| [API Gateway][1]                        | Create, publish, maintain, and secure APIs                                             |
| [App Runner][6]                        | A service that provides a fast, simple, and cost-effective way to deploy from source code or a container image.         |
| [Appstream][3]                          | Fully managed application streaming on AWS                                             |
| [AppSync][4]                            | A GraphQL service with real-time data synchronization and offline programming features |
| [Athena][5]                             | Serverless interactive query service                                                   |
| [Autoscaling][7]                        | Scale EC2 capacity                                                                     |
| [Billing][8]                            | Billing and budgets                                                                    |
| [CloudFront][9]                         | Local content delivery network                                                         |
| [Cloudhsm][12]                           | Managed hardware security module (HSM)                                                 |
| [CloudSearch][11]                        | Access to log files and AWS API calls                                                  |
| [CloudTrail][13]                        | Access to log files and AWS API calls                                                  |
| [CodeBuild][14]                         | Fully managed build service                                                            |
| [CodeDeploy][17]                        | Automate code deployments                                                              |
| [Cognito][18]                           | Secure user sign-up and sign-in                                                        |
| [Connect][19]                           | A self-service, cloud-based contact center service                                     |
| [Direct Connect][20]                    | Dedicated network connection to AWS                                                    |
| [DMS][21]                               | Database Migration Service                                                             |
| [DocumentDB][22]                        | MongoDB-compatible database                                                            |
| [Dynamo DB][23]                         | NoSQL Database                                                                         |
| [EBS (Elastic Block Store)][24]         | Persistent block level storage volumes                                                 |
| [EC2 (Elastic Cloud Compute)][25]       | Resizable compute capacity in the cloud                                                |
| [EC2 Spot][26]                          | Take advantage of unused EC2 capacity                                                  |
| [ECS (Elastic Container Service)][27]   | Container management service that supports Docker containers                           |
| [EFS (Elastic File System)][28]         | Shared file storage                                                                    |
| [EKS][29]                               | Elastic Container Service for Kubernetes                                               |
| [Elastic Transcoder][30]                | Media and video transcoding in the cloud                                               |
| [ElastiCache][31]                       | In-memory cache in the cloud                                                           |
| [Elastic Beanstalk][32]                 | Service for deploying and scaling web applications and services                        |
| [ELB (Elastic Load Balancing)][33]      | Distributes incoming application traffic across multiple Amazon EC2 instances          |
| [EMR (Elastic Map Reduce)][34]          | Data processing using Hadoop                                                           |
| [ES (Elasticsearch)][35]                | Deploy, operate, and scale Elasticsearch clusters                                      |
| [Firehose][36]                          | Capture and load streaming data                                                        |
| [FSx][37]                              | Managed service providing scalable storage for Windows File Server or Lustre.          |
| [Gamelift][38]                          | Dedicated game server hosting                                                          |
| [Glue][39]                              | Extract, transform, and load data for analytics                                        |
| [GuardDuty][40]                         | Intelligent threat detection                                                           |
| [Health][41]                            | Visibility into the state of your AWS resources, services, and accounts                |
| [Inspector][42]                         | Automated security assessment                                                          |
| [IOT (Internet of Things)][43]          | Connect IOT devices with cloud services                                                |
| [Kinesis][44]                           | Service for real-time processing of large, distributed data streams                    |
| [KMS (Key Management Service)][45]      | Create and control encryption keys                                                     |
| [Lambda][46]                            | Serverless computing                                                                   |
| [Lex][47]                               | Build conversation bots                                                                |
| [Machine Learning][48]                  | Create machine learning models                                                         |
| [MediaConnect][49]                      | Transport for live video                                                               |
| [MediaConvert][50]                      | Video processing for broadcast and multiscreen delivery                                |
| [MediaPackage][51]                      | Prepare and protect video for delivery over the internet                               |
| [MediaTailor][52]                       | Scalable server-side ad insertion                                                      |
| [MQ][53]                                | Managed message broker for ActiveMQ                                                    |
| [Managed Streaming for Kafka][54]       | Build and run applications that use Apache Kafka to process streaming data             |
| [NAT Gateway][55]                       | Enable instances in a private subnet to connect to the internet or other AWS services  |
| [Neptune][56]                           | Fast, reliable graph database built for the cloud                                      |
| [Network Firewall][57]                 | Filter traffic at the perimeter of a VPC                                               |
| [OpsWorks][58]                          | Configuration management                                                               |
| [Polly][59]                             | Text-speech service                                                                    |
| [RDS (Relational Database Service)][60] | Relational database in the cloud                                                       |
| [Redshift][61]                          | Data warehouse solution                                                                |
| [Rekognition][15]                       | Image and video analysis for applications                                              |
| [Route 53][16]                          | DNS and traffic management with availability monitoring                                |
| [S3 (Simple Storage Service)][62]       | Highly available and scalable cloud storage service                                    |
| [SageMaker][63]                         | Machine learning models and algorithms                                                 |
| [SES (Simple Email Service)][64]        | Cost-effective, outbound-only email-sending service                                    |
| [SNS (Simple Notification System)][65]  | Alerts and notifications                                                               |
| [SQS (Simple Queue Service)][66]        | Messaging queue service                                                                |
| [Storage Gateway][67]                   | Hybrid cloud storage                                                                   |
| [SWF (Simple Workflow Service)][68]     | Cloud workflow management                                                              |
| [VPC (Virtual Private Cloud)][10]       | Launch AWS resources into a virtual network                                            |
| [Web Application Firewall (WAF)][69]    | Protect web applications from common web exploits                                      |
| [Workspaces][70]                        | Secure desktop computing service                                                       |
| [X-Ray][71]                             | Tracing for distributed applications                                                   |

## Send logs

### With CloudTrail

As [CloudTrail][70] is widely used and helps to power [Cloud SIEM][71], follow the [Log collection documentation][69] for CloudTrail. This requires sending your CloudTrail logs to S3 and adding a trigger on the already-provisioned Datadog Forwarder Lambda function for `Object Created (All)` events on your S3 bucket.

Any new log events will be sent to Datadog once established, and the logs appear with the `Source` attribute set as `cloudtrail`:

{{< img src="getting_started/integrations/logs-explorer-cloudtrail.png" alt="An image from the Logs Explorer page of the Datadog account. Along the left the image displays the Source facet, checked with 'cloudtrail'. Along the right, some log entries are displayed in a list format.">}}

### Automatically using triggers

As a result of setting up the Datadog Forwarder function with the CloudFormation template, you can [automatically set up triggers][18] to collect AWS logs from multiple sources in CloudWatch and S3. Click into the `Collect Logs` tab in the Integration tile and enter the ARN of the Forwarder Lambda. With the ARN entered, click the checkmark to establish the connection:
{{< img src="getting_started/integrations/integration-tile-collect-logs-1.png" alt="An image displaying the 'Collect Logs' tab of the AWS integration tile within the Datadog account. Along the left is a section displayed as 'AWS accounts' which shows the obfuscated AccountID of the connected account. On the right is a section displayed as 'Enter a Lambda ARN' which shows the ARN of the Datadog Forwarder Lambda function, with the accountID section of the ARN obfuscated.">}}

Provided you have already [Enabled logging for your AWS service][62], you can select from any of the log sources provided in the list, such as `S3 Access Logs` in the screenshot below. Click `Save`:
{{< img src="getting_started/integrations/integration-tile-collect-logs-2.png" alt="An image displaying the 'Collect Logs' tab of the AWS integration tile within the Datadog account. Along the left is a section displayed as 'AWS accounts' which shows the obfuscated AccountID of the connected account. On the right is a section displayed as 'Currently used Lambda ARNs' which shows the ARN of the Datadog Forwarder Lambda function, with the accountID section of the ARN obfuscated. Under this are the options for 'Enter a Lambda ARN' and 'Select the services you would like to collect logs for'. The only option which is ticked is the 'S3 Access Logs' option.">}}

Once you're receiving logs, review [Log Management][63] for more information about processing, enriching, searching, and analyzing your logs.

### Validation

Find your logs in the [Logs Explorer][19] using either the `source` or `service` facets from the facet panel, such as this example from S3:
{{< img src="getting_started/integrations/logs-explorer.png" alt="An image from the Logs Explorer page of the Datadog account. Along the left the image displays the Source and Service facets, both checked with 's3'. Along the right, some log entries are displayed in a list format.">}}

## Get more from the Datadog platform

### Deeper visibility with the Datadog Agent on EC2

By default the Datadog AWS integration crawls the CloudWatch API for AWS-provided metrics, but you can gain even deeper visibility into your EC2 instances with the [Datadog Agent][20]. The Agent is a lightweight daemon that reports metrics and events, and can also be configured for logs and traces. The [Agent Installation][21] section of the Datadog application provides instructions for installing the Agent on a wide variety of operating systems, with many options (for example, Amazon Linux) offering one-step installation commands. This command can then be run from the instance terminal to install the Agent:
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="An image displaying the 'Agent' section of the 'Integrations' tab in the Datadog account. Along the left are displayed a list of supported operating systems for the Datadog Agent. 'Amazon Linux' is highlighted from this list. On the right is displayed 'Use our easy one-step install'. The command for installing the Agent is displayed below this, with the DD_API_KEY section obfuscated.">}}

Once the Agent is installed, it's graphically represented within the [Infrastructure List][22] with a bone icon:
{{< img src="getting_started/integrations/infrastructure-list.png" alt="An image from the infrastructure list of the Datadog account. Two hosts are displayed in a list format. Both hosts show the AWS icon for the AWS integration and 'aws' shown in a blue box to show they are associated with the AWS integration. One host also shows a dog-bone icon and blue boxes for 'ntp' and 'system'.">}}

As can be seen in the screenshot above, the host with the Datadog Agent is reporting data from the [System][23] and [NTP][24] checks. The System check provides metrics around CPU, memory, filesystem, and I/O, providing additional insights into the host. You can enable additional [integrations][25] to suit the environment and use case, and [DogStatsD][26] can additionally be leveraged for sending custom metrics directly to Datadog. 

See the [FAQ on why you should install the Datadog Agent on your cloud instances][27] for more information about the benefits of this approach.

### Using the Datadog Agent with Amazon Container Services

For containerized environments, you can use the Datadog Agent, whether you're managing your instances or leveraging [Fargate][28] for a serverless environment.

#### ECS with EC2 launch type

Use the [Amazon ECS documentation][29]  to run the [Datadog Docker Agent][30] on the EC2 instances in your ECS cluster. Review the [Amazon ECS Data Collection documentation][31]  to see the metrics and events reported to your Datadog account.

#### ECS with Fargate launch type

Use the [Amazon ECS on AWS Fargate documentation][32]  to run the Agent as a container in the same task definition as your application. **Note**: Datadog Agent version 6.1.1 or higher is needed to take full advantage of the Fargate integration.

#### EKS

You don't need any specific configuration for Amazon Elastic Kubernetes Service (EKS), as mentioned in the [Kubernetes Distributions documentation][33]. Use the [dedicated Kubernetes documentation][34] to deploy the Agent in your EKS cluster.

#### EKS with Fargate

Since Fargate pods are managed by AWS, they exclude host-based system checks like CPU and memory. In order to collect data from your AWS Fargate pods, use the [Amazon EKS on AWS Fargate documentation][52] to run the Agent as a sidecar of your application pod with custom role-based access control (RBAC). **Note**: This requires Datadog Agent version 7.17 or higher.

#### EKS Anywhere

Use the [EKS Anywhere documentation][35] for on-premises Kubernetes clusters.

### Create additional Datadog resources
In addition to using the Datadog UI or [API][36], you can create many [Datadog resources][37] with the [CloudFormation Registry][38]. For visibility and troubleshooting, use [dashboards][39] to display key data, apply [Functions][40], and find [Metric Correlations][41]. 

To get notified of any unwanted or unexpected behavior in your account, create [monitors][42]. Monitors consistently evaluate the data reported to your account, and send [Notifications][43] to ensure that the right information gets to the right team members. Review the [List of Notification Integrations][44] for all the ways to notify your team.

## Explore related products

### Serverless

You can unify the metrics, traces, and logs from your AWS Lambda functions running serverless applications in Datadog. Check out [Serverless] for instructions on instrumenting your application, installing [Serverless Libraries and Integrations][64], implementing [Distributed Tracing with Serverless Applications][66], or [Serverless Troubleshooting][67].

### APM
To dig even deeper and gather more data from your applications and AWS services, enable collecting distributed traces from either the [AWS X-Ray][45] integration or from a host with the Datadog Agent using [APM][46]. Then, review [Explore Datadog APM][47] for a better understanding of how to use this data to gain insights into your application performance. 

Additionally, you can use [Watchdog][48], an algorithmic feature for APM performance and infrastructure metrics, to automatically detect and be notified about potential application issues.

### Security

#### Cloud SIEM

Review [Getting Started with Cloud SIEM][53] to evaluate your logs against the out-of-the-box [Log Detection Rules][54]. These rules are customizable, and when threats are detected, they generate Security Signals which can be accessed on the [Security Signals Explorer][55]. To ensure that the correct team is notified, use [Notification Rules][56] to configure notification preferences across multiple rules.

#### CSPM

Use the [Getting Started with CSPM][49] guide to learn about detecting and assessing misconfigurations in your cloud environment. Resource configuration data is evaluated against the [out-of-the-box Cloud Configuration Rules][50] to flag attacker techniques and potential misconfigurations, allowing for fast response and remediation.

### Troubleshooting
If you encounter any issues, be sure to check out the [Troubleshooting][51] section.

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
[18]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[19]: https://app.datadoghq.com/logs
[20]: /getting_started/agent/
[21]: https://app.datadoghq.com/account/settings#agent
[22]: https://app.datadoghq.com/infrastructure
[23]: /integrations/system/
[24]: /integrations/ntp/
[25]: /integrations/
[26]: /developers/dogstatsd/?tab=hostagent
[27]: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[28]: https://aws.amazon.com/fargate/
[29]: /agent/amazon_ecs/?tab=awscli
[30]: /agent/docker/?tab=standard
[31]: /agent/amazon_ecs/data_collected/
[32]: /integrations/ecs_fargate/?tab=fluentbitandfirelens
[33]: /agent/kubernetes/distributions/?tab=helm#EKS
[34]: /agent/kubernetes/?tab=helm
[35]: /integrations/eks_anywhere/
[36]: /api/latest/using-the-api/
[37]: /integrations/guide/amazon_cloudformation/#resources-available
[38]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[39]: /dashboards/#overview
[40]: /dashboards/functions/
[41]: /dashboards/correlations/
[42]: /monitors/create/types/
[43]: /monitors/notify/
[44]: /integrations/#cat-notification
[45]: /integrations/amazon_xray/?tab=nodejs
[46]: /tracing/setup_overview/
[47]: /tracing/#explore-datadog-apm
[48]: /watchdog/
[49]: /security_platform/cspm/getting_started/
[50]: /security_platform/default_rules/#cat-cloud-configuration
[51]: /integrations/amazon_web_services/?tab=roledelegation#troubleshooting
[52]: /integrations/eks_fargate/#setup
[53]: /security_platform/cloud_siem/getting_started/
[54]: /security_platform/default_rules/#cat-log-detection
[55]: /security_platform/explorer/
[56]: /security_platform/notification_rules/
[57]: /integrations/amazon_api_gateway/
[58]: /integrations/amazon_ec2/
[59]: /integrations/amazon_rds/
[60]: /integrations/amazon_elb/
[61]: /integrations/amazon_lambda/
[62]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=cloudformation#enable-logging-for-your-aws-service
[63]: /logs/
[64]: /serverless/libraries_integrations
[65]: /serverless/installation/
[66]: /serverless/distributed_tracing
[67]: /serverless/troubleshooting
[68]: /serverless
[69]: /integrations/amazon_cloudtrail/#enable-logging
[70]: /integrations/amazon_cloudtrail/
[71]: /security_platform/cloud_siem/
