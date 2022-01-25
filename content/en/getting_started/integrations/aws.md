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

This guide provides an overview of the process for linking an Amazon Web Services(AWS) account with Datadog using Datadog's CloudFormation template. 

At a high level, this involves creating a read-only IAM role and associated policy for Datadog's AWS account and deploying the [Datadog Forwarder][1] Lambda function. The forwarder then simplifies sending logs, custom metrics, and traces to Datadog. Using the CloudFormation template provides all the tools needed to send this data to your Datadog account, and Datadog maintains the CloudFormation template to provide the latest functionality. For more information, review Datadog's [CloudFormation Guide][2].

This process can be repeated for as many AWS accounts as necessary, or you can also use the [API][3], [AWS CLI][4], or [Terraform][5] to set up multiple accounts at once.

## Prerequisites

Before getting started, ensure you have the following prerequisites:

1. An [AWS][6] account
2. A Datadog account and [API key][7]. If you need a Datadog account, [sign up for a free trial][8].

## Setup

1. From the AWS tile on the [Integrations page][9] in your Datadog account, select the CloudFormation Template option:
{{< img src="getting_started/integrations/integration-tile-setup.png" alt="An image from the Datadog AWS integration tile showing the options for establishing the integration. The Role Delegation tab is highlighted.">}}

2. This opens the AWS Console and loads the CloudFormation stack. For this demonstration, the API key has been entered directly into the `DdApiKey` field, but you can also store this value in [Secrets Manager][10] and specify the ARN of the secret:
{{< img src="getting_started/integrations/cloudformation-options-1.png" alt="An image from the AWS CloudFormation create-stack page that shows the Stack name as datadog, IAMRoleName as DatadogIntegrationRole, ExternalId as an obfuscated value ending in be46, DdApiKey as an obfuscated value.">}}

3. Ensure that the the correct [Datadog site][11] parameter is used for the `DdSite` parameter to match the region of your Datadog account. Check the required boxes from AWS and click `Create stack`:
{{< img src="getting_started/integrations/cloudformation-options-2.png" alt="An image from the AWS CloudFormation create-stack page that shows the Advanced options of creating the Datadog stack. DdAWSAccountId parameter is filled in with 464622532012, DdForwarderName parameter is filled in with DatadogForwarder, and InstallDatadogPolicyMacro is set as true. Below these parameters is a Capabilities section with two checkboxes, both of which are checked. The first checkbox states 'I acknowledge that AWS CloudFormation might create IAM resources with custom names.' The second checkbox states 'I acknowledge that AWS CloudFormation might require the following capability: CAPABILITY_AUTO_EXPAND'.">}}


This begins the creation process for the Datadog stack along with three nested stacks:
{{< img src="getting_started/integrations/cloudformation-stacks-complete.png" alt="An image from the AWS CloudFormation Stacks page showing the four completed stacks under the 'Stacks' column along the left hand side of the page. The stacks are datadog-DatadogIntegrationRoleStack, datadog-DatadogPolicyMacroStack, datadog-ForwarderStack, and datadog. Each stack shows the timestamp of creation and a green checkmark with CREATE_COMPLETE. The 'datadog' stack and is highlighted and displaying the 'Events' tab. There are 9 events listed with their Timestamp, Logical ID, Status, and Status reason. These events reference the different stages of creation for each of the stacks.">}}

4. From the integration tile on the Datadog side, enter the AWS account ID and AWS Role name. If the role name wasn't changed in the CloudFormation setup page, use `DatadogIntegrationRole`. Datadog automatically queries AWS with the provided values, and a successful query returns a status that tells you your credentials are valid. Scroll down to find the `Install Integration` button.

5. Finally, click `Install Integration`. For the purposes of this demonstration, all options have been selected (only `Collect custom metrics` is unticked by default):
{{< img src="getting_started/integrations/integration-tile-complete.png" alt="An image displaying the AWS integration tile from within the Datadog account. The left hand side shows that the EC2 automuting option is enabled. There is a section titled 'Limit metric collection by AWS Service' which displays the subintegrations associated with the Datadog AWS integration. These are ApiGateway, ApplicationELB, AppRunner, AppStream, AppSync, Athena, AutoScaling, Billing, Budgeting, CertificateManager, CloudFront, CloudHSM, CloudSearch, CodeBuild, Cognito, and Connect. There is a heading which states 'Turning on subintegrations can affect your CloudWatch API usage. See our AWS FAQ for more info.'. All boxes are displayed as checked. Below this is another section called 'Other options'. There are two checkboxes here, Collect CloudWatch alarms and Collect custom metrics. Both options are checked.' On the right hand side of the page there is a section showing the settings for the connected AWS account. The Account ID is displayed as an obfuscated value. The AWS Role name is displayed as DatadogIntegrationRole.">}}

It should be noted that there are multiple options within the integration tile to specify the data to be collected. This can be limited based on AWS service, namespace, or tags.
With [EC2 automuting][12] enabled, Datadog uses host statuses reported by the CloudWatch API to distinguish between expected and unexpected instance terminations, preventing unwanted Monitor notifications.

### Validation

View the out-of-the-box [AWS overview dashboard][13] to see metrics sent by your AWS services and infrastructure:
{{< img src="getting_started/integrations/aws-dashboard.png" alt="An image displaying the AWS overview dashboard in the Datadog account. On the left is the AWS logo and an AWS events graph showing 'No matching entries found'. In the center are graphs related to EBS volumes with numerical data displayed and a heat map showing consistent data. Along the right are graphs related to ELBs showing numerical data as well as a timeseries graph showing spikey data from three sources.">}}

## Sending Logs

As a result of setting up the Datadog Forwarder function with the CloudFormation template, you can configure log collection directly in the integration tile in Datadog. Click into the `Collect Logs` tab in the Integration tile and enter the ARN of the Forwarder Lambda. With the ARN entered, click the checkmark to establish the connection:
{{< img src="getting_started/integrations/integration-tile-collect-logs-1.png" alt="An image displaying the 'Collect Logs' tab of the AWS integration tile within the Datadog account. Along the left is a section displayed as 'AWS accounts' which shows the obfuscated AccountID of the connected account. On the right is a section displayed as 'Enter a Lambda ARN' which shows the ARN of the Datadog Forwarder Lambda function, with the accountID section of the ARN obfuscated.">}}

Once this is successful, you can select from any of the log sources mentioned in [this guide for sending AWS service logs][14]. For this guide, we'll select only S3 access logs, and click `Save`:
{{< img src="getting_started/integrations/integration-tile-collect-logs-2.png" alt="An image displaying the 'Collect Logs' tab of the AWS integration tile within the Datadog account. Along the left is a section displayed as 'AWS accounts' which shows the obfuscated AccountID of the connected account. On the right is a section displayed as 'Currently used Lambda ARNs' which shows the ARN of the Datadog Forwarder Lambda function, with the accountID section of the ARN obfuscated. Under this are the options for 'Enter a Lambda ARN' and 'Select the services you would like to collect logs for'. The only option which is ticked is the 'S3 Access Logs' option.">}}

### Validation

Find your logs in the [Logs Explorer][15] using either the `source` or `service` facets from the facet panel:
{{< img src="getting_started/integrations/logs-explorer.png" alt="An image from the Logs Explorer page of the Datadog account. Along the left the image displays the Source and Service facets, both checked with 's3'. Along the right, some log entries are displayed in a list format.">}}

## Deeper visibility with the Datadog Agent on your hosts

By default the Datadog AWS integration crawls the CloudWatch API for AWS-provided metrics, but you can gain even deeper visibility into your EC2 instances and ECS clusters with the [Datadog Agent][16]. The Agent is a lightweight daemon that reports metrics and events, and can also be configured for logs and traces. The [Agent Installation][17] section of the Datadog application provides instructions for installing the Agent on a wide variety of operating systems, with many options--such as Amazon Linux--offering one-step installation commands. This command can then be run from the instance terminal to install the Agent:
{{< img src="getting_started/integrations/integrations-agent-installation.png" alt="An image displaying the 'Agent' section of the 'Integrations' tab in the Datadog account. Along the left are displayed a list of supported operating systems for the Datadog Agent. 'Amazon Linux' is highlighted from this list. On the right is displayed 'Use our easy one-step install'. The command for installing the agent is displayed below this, with the DD_API_KEY section obfuscated.">}}

Once the Agent is installed, it's graphically represented within the [Infrastructure List][18] with a bone icon:
{{< img src="getting_started/integrations/infrastructure-list.png" alt="An image from the infrastructure list of the Datadog account. Two hosts are displayed in a list format. Both hosts show the AWS icon for the AWS integration and 'aws' shown in a blue box to show they are associated with the AWS integration. One host also shows a dog-bone icon and blue boxes for 'ntp' and 'system'.">}}

As can be seen in the screenshot above, the host with the Datadog Agent is reporting data from the [System][19] and [NTP][20] checks. The System check provides metrics around CPU, memory, filesystem, and I/O, providing additional insights into the host. You can enable additional [integrations][21] to suit the environment and use case, and [DogStatsD][22] can additionally be leveraged for sending custom metrics directly to Datadog. 

See the [FAQ on why you should install the Datadog Agent on your cloud instances][23] for more information about the benefits of this approach.

### Using the Datadog Agent with Amazon Container Services

For containerized environments, you can use the Datadog Agent whether you're managing your instances or leveraging [Fargate][24] for a serverless environment.

#### ECS with EC2 launch type

Use the [Amazon ECS documentation][25]  to run the [Datadog Docker Agent][26] on the EC2 instances in your ECS cluster. Review the [Amazon ECS Data Collection documentation][27]  to see the metrics and events reported to your Datadog account.

#### ECS with Fargate launch type

Use the [Amazon ECS on AWS Fargate documentation][28]  to run the Agent as a container in the same task definition as your application. **Note**: Datadog Agent version 6.1.1 or higher is needed to take full advantage of the Fargate integration.

#### EKS

You don't need any specific configuration for AWS Elastic Kubernetes Service (EKS), as mentioned in the [Kubernetes Distributions documentation][29]. Use the [dedicated Kubernetes documentation][30] to deploy the agent in your EKS cluster.

#### EKS with Fargate

Since Fargate pods are managed by AWS, they exclude host-based system checks like CPU and memory. In order to collect data from your AWS Fargate pods, run the Agent as a sidecar of your application pod with custom role-based access control (RBAC). **Note**: This requires Datadog Agent version 7.17 or higher.

#### EKS Anywhere

Use the [EKS Anywhere documentation][31] for on-premises Kubernetes clusters.

## What's next?

### Create additional Datadog resources
In addition to using the Datadog UI or [API][32], you can create many [Datadog resources][33] with the [CloudFormation Registry][34]. For visibility and troubleshooting, use [dashboards][35] to display key data, apply [Functions][36], and find [Metric Correlations][37]. 

In order to get notified of any unwanted or unexpected behavior in your account, create [monitors][38]. Monitors consistently evaluate the data reported to your account, and send [Notifications][39] to ensure that the right information gets to the right team members. Review the [List of Notification Integrations][40] for all the ways to notify your team.

### Traces
To dig even deeper and gather more data from your applications and AWS services, enable collecting distributed traces from either the [AWS X-Ray][41] integration or from a host with the Datadog Agent using [APM][42]. Then, review [Explore Datadog APM][43] for a better understanding of how to use this data to gain insights into your application performance. 

Additionally, you can use [Watchdog][44], an algorithmic feature for APM performance and infrastructure metrics, to automatically detect--and be alerted upon--potential application issues. 

### Security
Use the [Getting Started with CSPM][45] guide to learn about detecting and assessing misconfigurations in your cloud environment. Resource configuration data is evaluated against the [out-of-the-box Cloud Configuration rules][46] to flag attacker techniques and potential misconfigurations, allowing for fast response and remediation.

### Troubleshooting
If you encounter any issues, be sure to check out the [Troubleshooting][47] section.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


Notes:

Is a pre requisite to other integrations (ELBs, etc)

Section for other products -- touch points for other parts of the platform

Link to getting started for Cloud SIEM

Serverless
Log Management
UI tile page is more confusing than helpful

What other products 

What's next should be 'How you want to start'

How are you using AWS? Why do you need it?[1]: /serverless/libraries_integrations/forwarder/
[2]: /integrations/guide/amazon_cloudformation/
[3]: /api/latest/aws-integration/#create-an-aws-integration
[4]: https://awscli.amazonaws.com/v2/documentation/api/latest/reference/cloudformation/index.html
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/integration_aws
[6]: https://aws.amazon.com/getting-started/?nc1=f_cc
[7]: https://app.datadoghq.com/organization-settings/api-keys
[8]: https://app.datadoghq.com/signup
[9]: https://app.datadoghq.com/account/settings#integrations/amazon-web-services
[10]: https://aws.amazon.com/secrets-manager/
[11]: /getting_started/site/
[12]: /integrations/amazon_ec2/#ec2-automuting
[13]: https://app.datadoghq.com/screen/integration/7/aws-overview
[14]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole#automatically-set-up-triggers
[15]: https://app.datadoghq.com/logs
[16]: /getting_started/agent/
[17]: https://app.datadoghq.com/account/settings#agent
[18]: https://app.datadoghq.com/infrastructure
[19]: /integrations/system/#pagetitle
[20]: /integrations/ntp/#pagetitle
[21]: /integrations/
[22]: /developers/dogstatsd/?tab=hostagent
[23]: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[24]: https://aws.amazon.com/fargate/
[25]: /agent/amazon_ecs/?tab=awscli#overview
[26]: /agent/docker/?tab=standard#overview
[27]: /agent/amazon_ecs/data_collected/
[28]: /integrations/ecs_fargate/?tab=fluentbitandfirelens
[29]: /agent/kubernetes/distributions/?tab=helm#EKS
[30]: /agent/kubernetes/?tab=helm
[31]: /integrations/eks_anywhere/#pagetitle
[32]: /api/latest/using-the-api/
[33]: /integrations/guide/amazon_cloudformation/#resources-available
[34]: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/registry.html
[35]: /dashboards/#overview
[36]: /dashboards/functions/
[37]: /dashboards/correlations/
[38]: /monitors/create/types/
[39]: /monitors/notify/
[40]: /integrations/#cat-notification
[41]: /integrations/amazon_xray/?tab=nodejs#overview
[42]: /tracing/setup_overview/
[43]: /tracing/#explore-datadog-apm
[44]: /watchdog/
[45]: /security_platform/cspm/getting_started/#overview
[46]: /security_platform/default_rules/#cat-cloud-configuration
[47]: /integrations/amazon_web_services/?tab=roledelegation#troubleshooting
