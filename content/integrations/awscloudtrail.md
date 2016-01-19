---
title: Datadog-AWS CloudTrail Integration
integration_title: AWS CloudTrail
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

AWS CloudTrail provides an audit trail for your AWS account. Datadog reads this audit trail and creates events you can search for in your stream and use for correlation on your dashboards.


# CloudTrail integration
{: #cloudtrail}

AWS CloudTrail records AWS API calls for your account in log files. Datadog can read these files and create events in your stream. Here is an example of a CloudTrail event:

![](/static/images/cloudtrail_event.png)


## How to configure CloudTrail?
{: #config-cloudtrail}

First make sure that you have configured CloudWatch and that the user you created for Datadog has the **AWS CloudTrail read-only access**. See above explanation. Besides the instructions below you will also have to configure the separate [Cloudtrail integration tile][3] within Datadog.

CloudTrail has to be configured on a per-region basis. Make sure you complete the two steps below for **all regions** that you want Datadog to collect CloudTrail data from.


1. [Go to your CloudTrail console][4] to enable it. Then select the S3 bucket you wish to use as follows:
![](/static/images/cloudtrail_config.png)
2. Your user must have access to the S3 bucket you have selected. To grant your user read-only access to your bucket, you would paste the following policy in the IAM console:

        { "Statement": [
          {
            "Action": [
              "s3:ListBucket",
              "s3:GetBucketLocation",
              "s3:GetObject"
            ],
            "Effect": "Allow",
            "Resource": [
              "arn:aws:s3:::your-s3-bucket-name",
              "arn:aws:s3:::your-s3-bucket-name/*"
            ]
          } ]
        }


## What events are collected?

You will find the list of events that Datadog will collect from CloudTrail on the [CloudTrail tile][3]. If you would like to see other events that are not mentionned here, please reach out to [our support team][5].

   [3]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudtrail
   [4]: https://console.aws.amazon.com/cloudtrail
   [5]: /help
