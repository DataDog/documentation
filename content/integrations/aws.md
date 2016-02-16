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
| Elastic MapReduce |
| ElasticsearchService |
| Firehose |
| Lambda |
| MachineLearning |
| OpsWorks |
| S3 |
| Simple Queing Service |
| Simple Workflow Service |
| WorkSpaces |
{:.table}


# Installation

There are two integration methods that can be used to allow Datadog to monitor your AWS environment. Both require creating a policy in the AWS Console with a certain set of permissions. The difference between the two is whether you choose to create a role that Datadog has access to which is preferred due to the higher level of security, or create a user and share an AWS Secret and Access Key. To get a better understanding of role delegation, refer to the [AWS IAM Best Practices guide](http://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html#delegate-using-roles).

1.  First create a new policy in the [IAM Console](https://console.aws.amazon.com/iam/home#s=Home). Name the policy ```DatadogAWSIntegrationPolicy```, or choose a name that is more relevant for you. To take advantage of every AWS integration offered by Datadog, using the following in the **Policy Document** textbox. As we add other components to the integration, these permissions may change.

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
                "logs:Get*",
                "logs:Describe*",
                "logs:TestMetricFilter",
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

    If you are not comfortable with granting all of these permissions, at the very least use the existing policies named **AmazonEC2ReadOnlyAccess** and **CloudWatchReadOnlyAccess**.

2.  Choose the approach you want to take. You can either create a role and allow Datadog to assume the role or create a user and share the Access Key and Secret Key:
    * Create a role and allow Datadog to assume it (**Preferred Option**)
        1.  Create a new role in the IAM Console. Name it anything you like, such as ```DatadogAWSIntegrationRole```.
        2.  From the selection, choose Role for Cross-Account Access.
        3.  Click the Select button for **Allows IAM users from a 3rd party AWS account to access this account**.
        4.  For Account ID, enter ```464622532012```. Enter a unique password for External ID. You will use this again later in the Datadog tile. Make sure you leave **Require MFA** disabled. *For more information about the External ID, refer to [this document in the IAM User Guide](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-user_externalid.html)*.
        5.  Select the policy you created above.
        6.  Review what you selected and click the **Create Role** button.
    * Create a user which will have Secret and Access Key associated with it
        1.  Create a new user in the IAM Console. Name it anything you like.
        2.  Make sure you leave the **Generate an access key for each user** checked.
        3.  Click the link to **Show User Security Credentials**.
        4.  Make a note of the Access Key ID and Secret Access Key in a secure location. You will need this in the Datadog tile. You can also download the credentials.


# Configuration

![logo](/static/images/integrations-aws-secretentry.png)

Depending on whether you created a role or a user above, choose the appropriate Datadog configuration:

* Configure Role Delegation
  1.  Open the [AWS Integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services).
  2.  Select the **Role Delegation** tab.
  3.  Enter your AWS Account ID which can be found in the ARN of the newly created role. Then enter the name of the role you just created. Finally enter the External ID you specified above.
  4.  Choose the services you want to collect metrics for on the left side of the dialog. You can optionally add tags to all hosts and metrics. Also if you want to only monitor a subset of instances on AWS, tag them and specify the tag in the limit textbox here.
  5.  Click **Install Integration**.

* Configure Access Key / Secret Key
  1.   Open the [AWS Integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services).
  2.  Select the **Access Keys** tab.
  3.  Enter your AWS Access Key and AWS Secret Key for the user created above.
  4.  Choose the services you want to collect metrics for on the left side of the dialog. You can optionally add tags to all hosts and metrics. Also if you want to only monitor a subset of instances on AWS, tag them and specify the tag in the limit textbox here.
  5.  Click **Install Integration**.


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
