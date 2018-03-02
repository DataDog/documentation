---
aliases:
- /integrations/aws/
categories:
- cloud
- aws
ddtype: crawler
description: Integrate your AWS services with Datadog.
doc_link: https://docs.datadoghq.com/integrations/amazon_web_services/
git_integration_title: amazon_web_services
has_logo: true
integration_title: AWS
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_web_services
public_title: Datadog-AWS Integration
short_description: Integrate your AWS services with Datadog.
version: '1.0'
---

## Overview

Connect to Amazon Web Services (AWS) in order to:

* See automatic AWS status updates in your stream
* Get CloudWatch metrics for EC2 hosts without installing the Agent
* Tag your EC2 hosts with EC2-specific information (e.g. availability zone)
* See EC2 scheduled maintenances events in your stream
* Collect CloudWatch metrics and events from many other AWS products


Related integrations include:

|                                                           |                                                                               |
| :---------------------------------------------------------|:------------------------------------------------------------------------------|
| [API Gateway](https://docs.datadoghq.com/integrations/awsapigateway)                | create, publish, maintain, and secure APIs                                    |
| [Autoscaling](https://docs.datadoghq.com/integrations/awsautoscaling)               | scale EC2 capacity                                                            |
| [Billing](https://docs.datadoghq.com/integrations/awsbilling)                       | billing and budgets                                                           |
| [CloudFront](https://docs.datadoghq.com/integrations/awscloudfront)                 | glocal content delivery network                                               |
| [CloudTrail](https://docs.datadoghq.com/integrations/awscloudtrail)                 | access to log files and AWS API calls                                         |
| [CloudSearch](https://docs.datadoghq.com/integrations/awscloudsearch)               | access to log files and AWS API calls                                         |
| [Direct Connect](https://docs.datadoghq.com/integrations/awsdirectconnect)          | dedicated network connection to AWS                                           |
| [Dynamo DB](https://docs.datadoghq.com/integrations/awsdynamo)                      | NoSQL Database                                                                |
| [EC2 Container Service (ECS)](https://docs.datadoghq.com/integrations/ecs)          | container management service that supports Docker containers                  |
| [Elastic Beanstalk](https://docs.datadoghq.com/integrations/awsbeanstalk)           | easy-to-use service for deploying and scaling web applications and services   |
| [Elastic Block Store (EBS)](https://docs.datadoghq.com/integrations/awsebs)         | persistent block level storage volumes                                        |
| [ElastiCache](https://docs.datadoghq.com/integrations/awselasticache)               | in-memory cache in the cloud                                                  |
| [Elastic Cloud Compute (EC2)](https://docs.datadoghq.com/integrations/awsec2)       | resizable compute capacity in the cloud                                       |
| [Elastic File System (EFS)](https://docs.datadoghq.com/integrations/awsefs)         | shared file storage                                                           |
| [Elastic Load Balancing (ELB)](https://docs.datadoghq.com/integrations/awselb)      | distributes incoming application traffic across multiple Amazon EC2 instances |
| [Elastic Map Reduce (EMR)](https://docs.datadoghq.com/integrations/awsemr)          | data processing using Hadoop                                                  |
| [Elasticsearch Service (ES)](https://docs.datadoghq.com/integrations/awses)         |  deploy, operate, and scale Elasticsearch clusters                            |
| [Firehose](https://docs.datadoghq.com/integrations/awsfirehose)                     | capture and load streaming data                                               |
| [IOT](https://docs.datadoghq.com/integrations/awsiot)                               | connect IOT devices with cloud services                                       |
| [Kinesis](https://docs.datadoghq.com/integrations/awskinesis)                       | service for real-time processing of large, distributed data streams           |
| [Key Management Service (KMS)](https://docs.datadoghq.com/integrations/awskms)      | create and control encryption keys                                            |
| [Lambda](https://docs.datadoghq.com/integrations/awslambda)                         | serverless computing                                                          |
| [Machine Learning (ML)](https://docs.datadoghq.com/integrations/awsml)              | create machine learning models                                                |
| [OpsWorks](https://docs.datadoghq.com/integrations/awsopsworks)                     | configuration management                                                      |
| [Polly](https://docs.datadoghq.com/integrations/awspolly)                           | text-speech service                                                           |
| [Redshift](https://docs.datadoghq.com/integrations/awsredshift)                     | data warehouse solution                                                       |
| [Relational Database Service (RDS)](https://docs.datadoghq.com/integrations/awsrds) | relational database in the cloud                                              |
| [Route 53](https://docs.datadoghq.com/integrations/awsroute53)                      | DNS and traffic management with availability monitoring                       |
| [Simple Email Service (SES)](https://docs.datadoghq.com/integrations/awsses)        | cost-effective, outbound-only email-sending service                           |
| [Simple Notification System (SNS)](https://docs.datadoghq.com/integrations/awssns)  | alert and notifications                                                       |
| [Simple Queue Service (SQS)](https://docs.datadoghq.com/integrations/awssqs)        | messaging queue service                                                       |
| [Simple Storage Service (S3)](https://docs.datadoghq.com/integrations/amazon_s3)        | highly available and scalable cloud storage service                           |
| [Simple Workflow Service (SWF)](https://docs.datadoghq.com/integrations/awsswf)     | cloud workflow management                                                     |
| [Storage Gateway](https://docs.datadoghq.com/integrations/awsstoragegateway)        | hybrid cloud storage                                                          |
| [Web Application Firewall (WAF)](https://docs.datadoghq.com/integrations/awswaf)    | protect web applications from common web exploits                             |
| [Workspaces](https://docs.datadoghq.com/integrations/awsworkspaces)                 | secure desktop computing service                                              |

## Setup
### Installation

Setting up the Datadog integration with Amazon Web Services requires configuring role delegation using AWS IAM. To get a better
understanding of role delegation, refer to the [AWS IAM Best Practices guide](http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles).

<div class="alert alert-warning">
The GovCloud and China regions do not currently support IAM role delegation. If you are deploying in these regions please skip to the <a href="#configuration-for-china-and-govcloud">configuration section</a> below.
</div>

1.  Create a new role in the AWS [IAM Console](https://console.aws.amazon.com/iam/home#/roles). 
2.  Select `Another AWS account` for the Role Type.
3.  For Account ID, enter `464622532012` (Datadog's account ID). This means that you will grant Datadog read only access to your AWS data. 
4.  Check off `Require external ID` and enter the one generated [in the Datadog app](https://app.datadoghq.com/account/settings#integrations/amazon_web_services). Make sure you leave **Require MFA** disabled. *For more information about the External ID, refer to [this document in the IAM User Guide](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html)*.
5.  Click `Next: Permissions`.
6.  Click `Create Policy`. Note, if you've already created the policy, search for it on this page and use select it. Otherwise complete the following to create a new one.
7.  Choose `Create Your Own Policy`.
8.  Name the policy `DatadogAWSIntegrationPolicy`, or one of your choosing and provide an apt description. To take advantage of every AWS integration offered by Datadog, use the following in the **Policy Document** textbox. As we add other components to the integration, these permissions may change.

<div class="alert alert-info">
These actions and the ones listed below are included in the Policy Document using wild cards such as <code>List*</code> and <code>Get*</code>. If you require strict policies, please use the complete action names as listed and reference the Amazon API documentation for the services you require.
</div>

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "autoscaling:Describe*",
        "budgets:ViewBudget",
        "cloudtrail:DescribeTrails",
        "cloudtrail:GetTrailStatus",
        "cloudwatch:Describe*",
        "cloudwatch:Get*",
        "cloudwatch:List*",
        "codedeploy:List*",
        "codedeploy:BatchGet*",
        "directconnect:Describe*",
        "dynamodb:List*",
        "dynamodb:Describe*",
        "ec2:Describe*",
        "ec2:Get*",
        "ecs:Describe*",
        "ecs:List*",
        "elasticache:Describe*",
        "elasticache:List*",
        "elasticfilesystem:DescribeFileSystems",
        "elasticfilesystem:DescribeTags",
        "elasticloadbalancing:Describe*",
        "elasticmapreduce:List*",
        "elasticmapreduce:Describe*",
        "es:ListTags",
        "es:ListDomainNames",
        "es:DescribeElasticsearchDomains",
        "health:DescribeEvents",
        "health:DescribeEventDetails",
        "health:DescribeAffectedEntities",
        "kinesis:List*",
        "kinesis:Describe*",
        "lambda:List*",
        "logs:Get*",
        "logs:Describe*",
        "logs:FilterLogEvents",
        "logs:TestMetricFilter",
        "rds:Describe*",
        "rds:List*",
        "route53:List*",
        "s3:GetBucketTagging",
        "s3:ListAllMyBuckets",
        "ses:Get*",
        "sns:List*",
        "sns:Publish",
        "sqs:ListQueues",
        "support:*",
        "tag:getResources",
        "tag:getTagKeys",
        "tag:getTagValues"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

If you are not comfortable with granting all of these permissions, at the very least use the existing policies named **AmazonEC2ReadOnlyAccess** and **CloudWatchReadOnlyAccess**, for more detailed information regarding permissions, please see the [Permissions](#permissions) section below.
9.  Click `Next: Review`.
10.  Give the role a name such as `DatadogAWSIntegrationRole` and an apt description and hit `Create Role`.

### Permissions

The core Datadog-AWS integration pulls data from AWS CloudWatch. At a minimum, your Policy Document needs to allow the following actions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": [
        "cloudwatch:Get*",
        "cloudwatch:List*",
        "ec2:Describe*",
        "ec2:Get*",
        "support:*",
        "tag:getResources",
        "tag:getTagKeys",
        "tag:getTagValues"
      ],
      "Effect": "Allow",
      "Resource": "*"
    }
  ]
}
```

* **Cloudwatch**:

    * `cloudwatch:ListMetrics` to list the available CloudWatch metrics.
    * `cloudwatch:GetMetricStatistics` to fetch data points for a given metric.

* **Support**:

    * `support:*`: Used to add metrics about service limits.<br>It requires full access because of [AWS limitations](http://docs.aws.amazon.com/IAM/latest/UserGuide/list_trustedadvisor.html)

* **Tag**:

    * `tag:getResources`: Used to get custom tags by resource type.
    * `tag:getTagKeys`: Used to get tag keys by region within an AWS account.
    * `tag:getTagValues`: Used to get tag values by region within an AWS account.

    The main use of the Resource Group Tagging API is to reduce the number of API calls we need to collect custom tags. For more information on [Tag policies](http://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/Welcome.html), review the documentation on the AWS website.


### Configuration

{{< img src="integrations/aws/integrations-aws-secretentry.png" alt="logo" responsive="true">}}

1.  Open the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services).
2.  Select the **Role Delegation** tab.
3.  Enter your AWS Account ID **without dashes**, e.g. 123456789012, not 1234-5678-9012. Your Account ID can be found in the ARN of the newly created role. Then enter the name of the role you just created. Finally enter the External ID you specified above.
4.  Choose the services you want to collect metrics for on the left side of the dialog. You can optionally add tags to all hosts and metrics. Also if you want to only monitor a subset of EC2 instances on AWS, tag them and specify the tag in the limit textbox here.
5.  Click **Install Integration**.

#### Configuration for China and GovCloud

1.  Open the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services).
2.  Select the **Access Keys (GovCloud or China Only)** tab.
3.  Enter your AWS Access Key and AWS Secret Key. **Only access and secret keys for China and GovCloud are accepted.**
4.  Choose the services you want to collect metrics for on the left side of the dialog. You can optionally add tags to all hosts and metrics. Also if you want to only monitor a subset of EC2 instances on AWS, tag them and specify the tag in the limit textbox here.
5.  Click **Install Integration**.

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_web_services" >}}


### Events

The Datadog-AWS integrations send all your CloudWatch events in your [Event stream](https://docs.datadoghq.com/graphing/event_stream/)

## Troubleshooting

### Do you believe you're seeing a discrepancy between your data in CloudWatch and Datadog?


There are two important distinctions to be aware of:

  1. In AWS for counters, a graph that is set to 'sum' '1minute' shows the total number of occurrences in one minute leading up to that point, i.e. the rate per 1 minute. Datadog is displaying the raw data from AWS normalized to per second values, regardless of the timeframe selected in AWS, which is why you will probably see our value as lower.
  2. Overall, min/max/avg have a different meaning within AWS than in Datadog. In AWS, average latency, minimum latency, and maximum latency are three distinct metrics that AWS collects. When Datadog pulls metrics from AWS CloudWatch, we only get the average latency as a single time series per ELB. Within Datadog, when you are selecting 'min', 'max', or 'avg', you are controlling how multiple time series will be combined. For example, requesting `system.cpu.idle` without any filter would return one series for each host that reports that metric and those series need to be combined to be graphed. On the other hand, if you requested `system.cpu.idle` from a single host, no aggregation would be necessary and switching between average and max would yield the same result.

### Metrics delayed?

When using the AWS integration, we're pulling in metrics via the CloudWatch API. You may see a slight delay in metrics from AWS due to some constraints that exist for their API.

To begin, the CloudWatch API only offers a metric-by-metric crawl to pull data. The CloudWatch APIs have a rate limit that varies based on the combination of authentication credentials, region, and service. Metrics are made available by AWS dependent on the account level. For example, if you are paying for "detailed metrics" within AWS, they are available more quickly. This level of service for detailed metrics also applies to granularity, with some metrics being available per minute and others per five minutes.

On the Datadog side, we do have the ability to prioritize certain metrics within an account to pull them in faster, depending on the circumstances. Please contact [support@datadoghq.com][6] for more info on this.

To obtain metrics with virtually zero delay, we recommend installing the Datadog Agent on those hosts. We’ve
written a bit about this [here][7],  especially in relation to CloudWatch.



### Missing metrics?

CloudWatch's api returns only metrics with datapoints, so if for instance an ELB has no attached instances, it is expected not to see metrics related to this ELB in Datadog.



### Wrong count of aws.elb.healthy_host_count?


When the cross-zone load balancing option is enabled on an ELB, all the instances attached to this ELB are considered part of all availability zones (on CloudWatch’s side), so if you have 2 instances in 1a and 3 in ab, the metric will display 5 instances per availability zone.
As this can be counter intuitive, we’ve added new metrics, **aws.elb.healthy_host_count_deduped** and **aws.elb.un_healthy_host_count_deduped**, that display the count of healthy and unhealthy instances per availability zone, regardless of if this cross-zone load balancing option is enabled or not.

### Duplicated hosts when installing the agent?


When installing the agent on an aws host, you might see duplicated hosts on the infra page for a few hours if you manually set the hostname in the agent's configuration. This second host will disapear a few hours later, and won't affect your billing.



   [1]: https://console.aws.amazon.com/iam/home#s=Home
   [2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services

   [6]: mailto:support@datadoghq.com
   [7]: http://www.datadoghq.com/blog/dont-fear-the-agent

