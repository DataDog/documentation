---
aliases:
- /integrations/awss3/
categories:
- cloud
- data store
- aws
- os & system
ddtype: crawler
description: Track request latency, number of requests by type, bucket sizes, and
  more.
doc_link: https://docs.datadoghq.com/integrations/amazon_s3/
git_integration_title: amazon_s3
has_logo: true
integration_title: AWS S3
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_s3
public_title: Datadog-AWS S3 Integration
short_description: Track request latency, number of requests by type, bucket sizes,
  and more.
version: '1.0'
---

{{< img src="integrations/amazon_s3/s3_db_screenshot.png" alt="S3 Dashboard" responsive="true" popup="true">}}

## Overview

Amazon Simple Storage Service (S3) is a highly available and scalable cloud storage service.

Enable this integration to see in Datadog all your S3 metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `S3` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon S3 metrics: 

    * `s3:ListAllMyBuckets`: Used to list available buckets
    * `s3:GetBucketTagging`: Used to get custom bucket tags

    For more information on S3 policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_s3.html).

3. Install the [Datadog - AWS S3 integration](https://app.datadoghq.com/account/settings#integrations/amazon_s3).

4. (optional) To gather **Request Metrics**, [Enable Requests metrics](http://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html) on your Amazon S3 buckets from the AWS console.

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_s3" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS S3 integration does not include any event at this time.

### Service Checks
The AWS S3 integration does not include any service check at this time.

## Troubleshooting

### CloudTrail encrypted log

If your AWS CloudTrail log data is encrypted by KMS in your AWS S3, allow the Datadog role to decrypt the Cloudtrail log data with the following policy: `kms:Decrypt`. [Learn more about your KMS encrypt/decrypt policy](https://docs.aws.amazon.com/kms/latest/developerguide/iam-policies.html#iam-policy-example-encrypt-decrypt-one-account).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
