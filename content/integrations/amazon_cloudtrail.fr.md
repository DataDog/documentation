---
aliases:
- integrations/awscloudtrail/
categories:
- cloud
- monitoring
- aws
ddtype: crawler
description: Alert on suspicious AWS account activity.
doc_link: https://docs.datadoghq.com/integrations/amazon_cloudtrail/
git_integration_title: amazon_cloudtrail
has_logo: true
integration_title: AWS CloudTrail
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_cloudtrail
public_title: Datadog-AWS CloudTrail Integration
short_description: Alert on suspicious AWS account activity.
version: '1.0'
---

{{< img src="integrations/amazon_cloudtrail/cloudtrail_event.png" alt="cloudtrail event" responsive="true" popup="true">}}

## Overview

AWS CloudTrail provides an audit trail for your AWS account. Datadog reads this audit trail and creates events you can search for in your stream and use for correlation on your dashboards. Here is an example of a CloudTrail event:

For information about the rest of the AWS services, see the [AWS tile](https://docs.datadoghq.com/integrations/amazon_web_services/)

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Add those permissions to your [Datadog IAM policy](https://app.datadoghq.com/account/settings#integrations/amazon_cloudtrail) in order to collect Amazon Cloudtrail metrics:

    * `cloudtrail:DescribeTrails`: Used to list trails and find in which s3 bucket they store the trails
    * `cloudtrail:GetTrailStatus`: Used to skip inactive trails

    For more information on CloudTrail policies, [review the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_cloudtrail.html).
    CloudTrail also requires some s3 permissions to access the trails. **These are required on the CloudTrail bucket only**:

    * `s3:ListBucket`: List objects in the CloudTrail bucket to get available trails
    * `s3:GetBucketLocation`: Get bucket's region to download trails
    * `s3:GetObject`: Fetch available trails

    For more information on Cloudtrail policies, [review the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_s3.html).

   You should put this policy section alongside your main Datadog AWS policy, and it should be set up like this:

```json
{
  "Action": [
     "s3:ListBucket",
     "s3:GetBucketLocation",
     "s3:GetObject",
     "s3:ListObjects"
  ],
  "Effect": "Allow",
  "Resource": [
     "arn:aws:s3:::your-s3-cloudtrail-bucket-name",
     "arn:aws:s3:::your-s3-cloudtrail-bucket-name/*"
  ]
}
```

2. Install the [Datadog - AWS Cloudtrail integration](https://app.datadoghq.com/account/settings#integrations/amazon_cloudtrail):
    The accounts you configured in the Amazon Web Services tile are shown here and you can choose what kinds of events are collected by Datadog. If you would like to see other events that are not mentioned here, please reach out to [our support team](/help).

## Data Collected
### Metrics
The AWS Cloudtrail integration does not include any metric at this time.

### Events
The AWS Cloudtrail integration does not include any event at this time.

### Service Checks
The AWS Cloudtrail integration does not include any service check at this time.


## Troubleshooting
### I don't see a CloudTrail tile or there are no accounts listed

You need to first configure the [Amazon Web Services tile](/integrations/aws). Once you complete this, the CloudTrail tile will be available and configurable.

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)

