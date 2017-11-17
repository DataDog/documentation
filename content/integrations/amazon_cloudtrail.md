---
aliases:
- integrations/awscloudtrail/
description: Alert on suspicious AWS account activity.
git_integration_title: amazon_cloudtrail
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS CloudTrail Integration
---

{{< img src="integrations/amazon_cloudtrail/cloudtrail_event.png" alt="cloudtrail event" responsive="true" >}}

## Overview

AWS CloudTrail provides an audit trail for your AWS account. Datadog reads this audit trail and creates events you can search for in your stream and use for correlation on your dashboards. Here is an example of a CloudTrail event:

For information about the rest of the AWS services, see the [AWS tile](https://docs.datadoghq.com/integrations/aws/)

## Setup
### Installation

Configure CloudWatch on AWS and ensure that the policy you created has the equivalent of the **AWSCloudTrailReadOnlyAccess** policy assigned. The actions in that policy are **s3:ListBucket**, **s3:GetBucketLocation**, and **s3:GetObject**. Also ensure that the policy gives access to the S3 bucket you selected for the CloudTrail Trail. Here is an example policy to give access to an S3 bucket.

```json
{
  "Version": "2012-10-17",
  "Statement": [
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
```


### Configuration

Open the AWS CloudTrail tile. The accounts you configured in the Amazon Web Services tile are shown here and you can choose what kinds of events will be collected by Datadog. If you would like to see other events that are not mentioned here, please reach out to [our support team](/help).

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS Cloudtrail integration does not include any event at this time.

### Service Checks
The AWS Cloudtrail integration does not include any service check at this time.


## Troubleshooting
### I don't see a CloudTrail tile or there are no accounts listed

You need to first configure the [Amazon Web Services tile](/integrations/aws). Once you complete this, the CloudTrail tile will be available and configurable.

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)