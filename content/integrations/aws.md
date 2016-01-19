---
title: Datadog-AWS Integration
integration_title: Amazon Web Services
kind: integration
newhlevel: true
sidebar:
  nav:
    - header: AWS integration
    - text: Overview
      href: "#overview"
    - text: Installation
      href: "#installation"
    - text: Configuration
      href: "#configuration"
---

# Overview

Connect to Amazon Web Services (AWS) in order to:

* See automatic AWS status updates in your stream
* Get Cloudwatch metrics for EC2 hosts without installing the Agent
* Tag your EC2 hosts with EC2-specific information (e.g. availability zone)
* Get Cloudwatch metrics for other services: ELB, RDS, EBS, AutoScaling, DynamoDB, ElastiCache, CloudFront, CloudSearch, Kinesis, Lambda, * OpsWorks, Redshift, Route53, SQS, and SNS
* See EC2 scheduled maintenances events in your stream

Related integrations include:

| [CloudTrail](/integrations/awscloudtrail) | Access to log files and AWS API calls |
| [Dynamo DB](/integrations/awsdynamo) | NoSQL Database|
| [Elastic Beanstalk](/integrations/awsbeanstalk) | easy-to-use service for deploying and scaling web applications and services |
| [Elastic Cloud Compute (EC2)](/integrations/awsec2) | resizable compute capacity in the cloud |
| [ElastiCache](/integrations/awselasticache) | in-memory cache in the cloud |
| [Elastic Load Balancing (ELB)](/integrations/awselb) | distributes incoming application traffic across multiple Amazon EC2 instances |
| [EC2 Container Service (ECS)](/integrations/ecs) | container management service that supports Docker containers |
| [Kinesis](/integrations/awskinesis) | service for real-time processing of large, distributed data streams |
| [Relational Database Service (RDS)](/integrations/awsrds) | relational database in the cloud |
| [Simple Email Service (SES)](/integrations/awsses) | cost-effective, outbound-only email-sending service |
| [Simple Notification System (SNS)](/integrations/awssns) | alert and notifications |
{:.table}

There are a number of other AWS services that are also available in Datadog but they are all configured in the main AWS Integration or in the CloudTrail integration. This includes, but is not limited to:

| AutoScaling |
| Billing |
| Budgeting |
| CloudFront |
| CloudSearch |
| EBS |
| ElasticsearchService |
| Firehose |
| Lambda |
| MachineLearning |
{:.table}


# Installation

The only installation steps outside of Datadog is to set up a new user via the IAM  Console and grant that user a specific set of permissions. At the very least for access to EC2 and CloudWatch, attach the following policies:

* AmazonEC2ReadOnlyAccess
* CloudWatchReadOnlyAccess

Depending on the services you are using you will need other permissions as well. Here is the current list of permissions required to take full advantage of the Datadog AWS integrations. As we add other components to the integration, these permissions may change.

    {
      "Version": "2012-10-17",
      "Statement": [
        {
          "Action": [
            "autoscaling:Describe*",
            "cloudtrail:DescribeTrails",
            "cloudtrail:GetTrailStatus",
            "cloudwatch:Describe*",
            "cloudwatch:Get*",
            "cloudwatch:List*",
            "ec2:Describe*",
            "ec2:Get*",
            "ecs:Describe*",
            "ecs:List*",
            "elasticache:Describe*",
            "elasticache:List*",
            "elasticloadbalancing:Describe*",
            "iam:Get*",
            "iam:List*",
            "kinesis:Get*",
            "kinesis:List*",
            "kinesis:Describe*",
            "rds:Describe*",
            "rds:List*",
            "ses:Get*",
            "ses:List*",
            "sns:List*",
            "sns:Publish",
            "sqs:GetQueueAttributes",
            "sqs:ListQueues",
            "sqs:ReceiveMessage"
          ],
          "Effect": "Allow",
          "Resource": "*"
        }
      ]
    }

Once these credentials are configured in the AWS IAM Console, go into the [AWS integration tile][2] within Datadog to pull this data in.

# Configuration

Open the [Amazon Web Services tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services) in the Datadog application. Add the AWS Access Key and AWS Secret Key for the account created above. You can also optionally add tags to all hosts and metrics. If you want to only monitor a subset of instances on AWS, tag them and specify the tag in the limit textbox here. On the left side of the window, choose the AWS services you want to enable in Datadog.



# Troubleshooting
{: #troubleshooting}

## Do you believe you're seeing a discrepancy between your data in Cloudwatch and Datadog?

There are two important distinctions to be aware of:

  1. In AWS for counters, a graph that is set to 'sum' '1minute' shows the total number of occurrences in one minute leading up to that point, i.e. the rate per 1 minute. Datadog is displaying the raw data from AWS normalized to per second values, regardless of the timeframe selected in AWS, which is why you will probably see our value as lower.
  2. Overall, min/max/avg have a different meaning within AWS than in Datadog. In AWS, average latency, minimum latency, and maximum latency are three distinct metrics that AWS collects. When Datadog pulls metrics from AWS Cloudwatch, we only get the average latency as a single time series per ELB. Within Datadog, when you are selecting 'min', 'max', or 'avg', you are controlling how multiple time series will be combined. For example, requesting `system.cpu.idle` without any filter would return one series for each host that reports that metric and those series need to be combined to be graphed. On the other hand, if you requested `system.cpu.idle` from a single host, no aggregation would be necessary and switching between average and max would yield the same result.

## Metrics delayed?

When using the AWS integration, we're pulling in metrics via the Cloudwatch API. You may see a slight delay in metrics from AWS due to some constraints that exist for their API.

To begin, the Cloudwatch API only offers a metric-by-metric crawl to pull data. The Cloudwatch APIs have a rate limit that varies based on the combination of authentication credentials, region, and service. Metrics are made available by AWS dependent on the account level. For example, if you are paying for "detailed metrics" within AWS, they are available more quickly. This level of service for detailed metrics also applies to granularity, with some metrics being available per minute and others per five minutes.

On the Datadog side, we do have the ability to prioritize certain metrics within an account to pull them in faster, depending on the circumstances. Please contact [support@datadoghq.com][6] for more info on this.

To obtain metrics with virtually zero delay, we recommend installing the Datadog Agent on those hosts. We’ve
written a bit about this [here][7],  especially in relation to CloudWatch.



## Missing metrics?

CloudWatch's api returns only metrics with datapoints, so if for instance an ELB has no attached instances, it is expected not to see metrics related to this ELB in Datadog.



## Wrong count of aws.elb.healthy_host_count?

When the Cross-Zone Load Balancing option is enabled on an ELB, all the instances attached to this ELB are considered part of all A-Zs (on cloudwatch’s side), so if you have 2 instances in 1a and 3 in ab, the metric will display 5 instances per A-Z.
As this can be counter-intuitive, we’ve added a new metric, aws.elb.host_count, that displays the count of healthy instances per AZ, regardless of if this Cross-Zone Load Balancing option is enabled or not.
This metric should have value you would expect.



## Duplicated hosts when installing the agent?

When installing the agent on an aws host, you might see duplicated hosts on the infra page for a few hours if you manually set the hostname in the agent's configuration. This second host will disapear a few hours later, and won't affect your billing.



   [1]: https://console.aws.amazon.com/iam/home#s=Home
   [2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services

   [6]: mailto:support@datadoghq.com
   [7]: http://www.datadoghq.com/2013/10/dont-fear-the-agent
