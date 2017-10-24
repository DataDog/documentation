---
title: Datadog-AWS Integration
integration_title: Amazon Web Services
kind: integration
newhlevel: true
git_integration_title: amazon_web_services

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
| [API Gateway](/integrations/amazon_api_gateway)                | create, publish, maintain, and secure APIs                                    |
| [Autoscaling](/integrations/amazon_auto_scaling)               | scale EC2 capacity                                                            |
| [Billing](/integrations/amazon_billing)                       | billing and budgets                                                           |
| [CloudFront](/integrations/amazon_cloudfront)                 | glocal content delivery network                                               |
| [CloudTrail](/integrations/amazon_cloudtrail)                 | access to log files and AWS API calls                                         |
| [CloudSearch](/integrations/amazon_cloudsearch)               | access to log files and AWS API calls                                         |
| [Direct Connect](/integrations/amazon_directconnect)          | dedicated network connection to AWS                                           |
| [Dynamo DB](/integrations/amazon_dynamodb)                      | NoSQL Database                                                                |
| [EC2 Container Service (ECS)](/integrations/ecs)          | container management service that supports Docker containers                  |
| [Elastic Beanstalk](/integrations/amazon_elasticbeanstalk)           | easy-to-use service for deploying and scaling web applications and services   |
| [Elastic Block Store (EBS)](/integrations/amazon_ebs)         | persistent block level storage volumes                                        |
| [ElastiCache](/integrations/amazon_elasticache)               | in-memory cache in the cloud                                                  |
| [Elastic Cloud Compute (EC2)](/integrations/amazon_ec2)       | resizable compute capacity in the cloud                                       |
| [Elastic File System (EFS)](/integrations/amazon_efs)         | shared file storage                                                           |
| [Elastic Load Balancing (ELB)](/integrations/amazon_elb)      | distributes incoming application traffic across multiple Amazon EC2 instances |
| [Elastic Map Reduce (EMR)](/integrations/amazon_emr)          | data processing using Hadoop                                                  |
| [Elasticsearch Service (ES)](/integrations/amazon_es)         |  deploy, operate, and scale Elasticsearch clusters                            |
| [Firehose](/integrations/amazon_firehose)                     | capture and load streaming data                                               |
| [IOT](/integrations/amazon_iot)                               | connect IOT devices with cloud services                                       |
| [Kinesis](/integrations/amazon_kinesis)                       | service for real-time processing of large, distributed data streams           |
| [Key Management Service (KMS)](/integrations/amazon_kms)      | create and control encryption keys                                            |
| [Lambda](/integrations/amazon_lambda)                         | serverless computing                                                          |
| [Machine Learning (ML)](/integrations/amazon_machine_learning)              | create machine learning models                                                |
| [OpsWorks](/integrations/amazon_ops_works)                     | configuration management                                                      |
| [Polly](/integrations/amazon_polly)                           | text-speech service                                                           |
| [Redshift](/integrations/amazon_redshift)                     | data warehouse solution                                                       |
| [Relational Database Service (RDS)](/integrations/amazon_rds) | relational database in the cloud                                              |
| [Route 53](/integrations/amazon_route53)                      | DNS and traffic management with availability monitoring                       |
| [Simple Email Service (SES)](/integrations/amazon_ses)        | cost-effective, outbound-only email-sending service                           |
| [Simple Notification System (SNS)](/integrations/amazon_sns)  | alert and notifications                                                       |
| [Simple Queue Service (SQS)](/integrations/amazon_sqs)        | messaging queue service                                                       |
| [Simple Storage Service (S3)](/integrations/amazon_s3)        | highly available and scalable cloud storage service                           |
| [Simple Workflow Service (SWF)](/integrations/amazon_swf)     | cloud workflow management                                                     |
| [Storage Gateway](/integrations/amazon_storage_gateway)        | hybrid cloud storage                                                          |
| [Web Application Firewall (WAF)](/integrations/amazon_waf)    | protect web applications from common web exploits                             |
| [Workspaces](/integrations/amazon_workspaces)                 | secure desktop computing service                                              |

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
{{< highlight json>}}
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
{{< /highlight >}}
If you are not comfortable with granting all of these permissions, at the very least use the existing policies named **AmazonEC2ReadOnlyAccess** and **CloudWatchReadOnlyAccess**. For more detailed information regarding permissions, please see the [Permissions](#permissions) section below.
9.  Click `Next: Review`.
10.  Give the role a name such as `DatadogAWSIntegrationRole` and an apt description and hit `Create Role`.


### Configuration

{{< img src="integrations/aws/integrations-aws-secretentry.png" alt="logo" responsive="true" >}}

1.  Open the [AWS Integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services).
2.  Select the **Role Delegation** tab.
3.  Enter your AWS Account ID **without dashes**, e.g. 123456789012, not 1234-5678-9012. Your Account ID can be found in the ARN of the newly created role. Then enter the name of the role you just created. Finally enter the External ID you specified above.
4.  Choose the services you want to collect metrics for on the left side of the dialog. You can optionally add tags to all hosts and metrics. Also if you want to only monitor a subset of EC2 instances on AWS, tag them and specify the tag in the limit textbox here.
5.  Click **Install Integration**.

#### Configuration for China and GovCloud

1.  Open the [AWS Integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services).
2.  Select the **Access Keys (GovCloud or China Only)** tab.
3.  Enter your AWS Access Key and AWS Secret Key. **Only access and secret keys for China and GovCloud are accepted.**
4.  Choose the services you want to collect metrics for on the left side of the dialog. You can optionally add tags to all hosts and metrics. Also if you want to only monitor a subset of EC2 instances on AWS, tag them and specify the tag in the limit textbox here.
5.  Click **Install Integration**.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

## Permissions

The core Datadog-AWS integration pulls data from AWS CloudWatch. At a minimum, your Policy Document will need to allow the following actions:

* `cloudwatch:ListMetrics` to list the available CloudWatch metrics.
* `cloudwatch:GetMetricStatistics` to fetch data points for a given metric.

<div class="alert alert-info">
These actions and the ones listed below are included in the Policy Document using wild cards such as <code>List*</code> and <code>Get*</code>. If you require strict policies, please use the complete action names as listed and reference the Amazon API documentation for the services you require.
</div>

By allowing Datadog to read the following additional endpoints, the AWS integration will be able to add tags to CloudWatch metrics and generate additional metrics.

### Autoscaling

* `autoscaling:DescribeAutoScalingGroups`: Used to list all autoscaling groups.
* `autoscaling:DescribePolicies`: List available policies (for autocompletion in events and monitors).
* `autoscaling:DescribeTags`: Used to list tags for a given autoscaling group. This will add ASG custom tags on ASG CloudWatch metrics.
* `autoscaling:DescribeScalingActivities`: Used to generate events when an ASG scales up or down.
* `autoscaling:ExecutePolicy`: Execute one policy (scale up or down from a monitor or the events feed). <br>This is not included in the [installation Policy Document](#installation) and should only be included if you are using monitors or events to execute an autoscaling policy.

For more information on [Autoscaling policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_application-autoscaling.html), review the documentation on the AWS website.

### Billing

* `budgets:ViewBudget`: Used to view budget metrics

For more information on [Budget policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_budgets.html), review the documentation on the AWS website.

### CloudTrail

* `cloudtrail:DescribeTrails`: Used to list trails and find in which s3 bucket they store the trails
* `cloudtrail:GetTrailStatus`: Used to skip inactive trails

For more information on [CloudTrail policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_cloudtrail.html), review the documentation on the AWS website.

CloudTrail also requires some s3 permissions to access the trails. **These are required on the CloudTrail bucket only**

* `s3:ListBucket`: List objects in the CloudTrail bucket to get available trails
* `s3:GetBucketLocation`: Get bucket's region to download trails
* `s3:GetObject`: Fetch available trails

For more information on [S3 policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_s3.html), review the documentation on the AWS website.

### Direct Connect

* `directconnect:DescribeConnections`: Used to list available Direct Connect connections.
* `directconnect:DescribeTags`: Used to gather custom tags applied to Direct Connect connections.

For more information on [Direct Connect policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_directconnect.html), review the documentation on the AWS website.

### DynamoDB

* `dynamodb:ListTables`: Used to list available DynamoDB tables.
* `dynamodb:DescribeTable`: Used to add metrics on a table size and item count.
* `dynamodb:ListTagsOfResource`: Used to collect all tags on a DynamoDB resource.

For more information on [DynamoDB policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_dynamodb.html), review the documentation on the AWS website.

### EC2

* `ec2:DescribeInstanceStatus`: Used by the ELB integration to assert the health of an instance. Used by the EC2 integration to describe the health of all instances.
* `ec2:DescribeSecurityGroups`: Adds SecurityGroup names and custom tags to ec2 instances.
* `ec2:DescribeInstances`: Adds tags to ec2 instances and ec2 cloudwatch metrics.

For more information on [EC2 policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ec2.html), review the documentation on the AWS website.

### ECS

* `ecs:ListClusters`: List available clusters.
* `ecs:ListContainerInstances`: List instances of a cluster.
* `ecs:DescribeContainerInstances`: Describe instances to add metrics on resources and tasks running, adds cluster tag to ec2 instances.

For more information on [ECS policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ecs.html), review the documentation on the AWS website.

### Elasticache

* `elasticache:DescribeCacheClusters`: List and describe Cache clusters, to add tags and additional metrics.
* `elasticache:ListTagsForResource`: List custom tags of a cluster, to add custom tags.
* `elasticache:DescribeEvents`: Add events avout snapshots and maintenances.

For more information on [Elasticache policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticache.html), review the documentation on the AWS website.

### EFS

* `elasticfilesystem:DescribeTags`: Gets custom tags applied to file systems
* `elasticfilesystem:DescribeFileSystems`: Provides a list of active file systems

For more information on [EFS policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticfilesystem.html), review the documentation on the AWS website.

### ELB

* `elasticloadbalancing:DescribeLoadBalancers`: List ELBs, add additional tags and metrics.
* `elasticloadbalancing:DescribeTags`: Add custom ELB tags to ELB metrics.
* `elasticloadbalancing:DescribeInstanceHealth`: Add state of your instances.

For more information on [ELB policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticloadbalancing.html), review the documentation on the AWS website.

### EMR

* `elasticmapreduce:ListClusters`: List available clusters.
* `elasticmapreduce:DescribeCluster`: Add tags to CloudWatch EMR metrics.

For more information on [EMR policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticmapreduce.html), review the documentation on the AWS website.

### ES

* `es:ListTags`: Add custom ES domain tags to ES metrics
* `es:ListDomainNames`: Add custom ES domain tags to ES metrics
* `es:DescribeElasticsearchDomains`: Add custom ES domain tags to ES metrics

For more information on [ES policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_es.html), review the documentation on the AWS website.

### Kinesis

* `kinesis:ListStreams`: List available streams.
* `kinesis:DescribeStream`: Add tags and new metrics for kinesis streams.
* `kinesis:ListTagsForStream`: Add custom tags.

For more information on [Kinesis policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_kinesis.html), review the documentation on the AWS website.

### CloudWatch Logs and Lambda

* `logs:DescribeLogGroups`: List available groups.
* `logs:DescribeLogStreams`: List available streams for a group.
* `logs:FilterLogEvents`: Fetch some specific log events for a stream to generate metrics.

For more information on [CloudWatch Logs policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_logs.html), review the documentation on the AWS website.

### RDS

* `rds:DescribeDBInstances`: Descrive RDS instances to add tags.
* `rds:ListTagsForResource`: Add custom tags on RDS instances.
* `rds:DescribeEvents`: Add events related to RDS databases.

For more information on [RDS policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_rds.html), review the documentation on the AWS website.

### Route53

* `route53:listHealthChecks`: List available health checks.
* `route53:listTagsForResources`: Add custom tags on Route53 CloudWatch metrics.

For more information on [Route53 policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_route53.html), review the documentation on the AWS website.

### S3

* `s3:ListAllMyBuckets`: Used to list available buckets
* `s3:GetBucketTagging`: Used to get custom bucket tags

For more information on [S3 policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_s3.html), review the documentation on the AWS website.

### SES

* `ses:GetSendQuota`: Add metrics about send quotas.
* `ses:GetSendStatistics`: Add metrics about send statistics.

For more information on [SES policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_ses.html), review the documentation on the AWS website.

### SNS

* `sns:ListTopics`: Used to list available topics.
* `sns:Publish`: Used to publish notifications (monitors or event feed).

For more information on [SNS policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_sns.html), review the documentation on the AWS website.

### SQS

* `sqs:ListQueues`: Used to list alive queues.

For more information on [SQS policies](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_sqs.html), review the documentation on the AWS website.

### Support

* `support:*`: Used to add metrics about service limits.<br>It requires full access because of [AWS limitations](http://docs.aws.amazon.com/IAM/latest/UserGuide/list_trustedadvisor.html)

### Tag

* `tag:getResources`: Used to get custom tags by resource type.
* `tag:getTagKeys`: Used to get tag keys by region within an AWS account.
* `tag:getTagValues`: Used to get tag values by region within an AWS account.

The main use of the Resource Group Tagging API is to reduce the number of API calls we need to collect custom tags.
For more information on [Tag policies](http://docs.aws.amazon.com/resourcegroupstagging/latest/APIReference/Welcome.html), review the documentation on the AWS website.

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
