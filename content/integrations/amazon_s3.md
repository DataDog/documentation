---
aliases: []
description: Track request latency, number of requests by type, bucket sizes, and
  more.
git_integration_title: amazon_s3
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS S3 Integration
---

{{< img src="integrations/amazon_s3/s3_db_screenshot.png" alt="S3 Dashboard" responsive="true" >}}

## Overview

Amazon Simple Storage Service (S3) is a highly available and scalable cloud storage service.

Enable this integration to see in Datadog all your S3 metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/).

* **Daily Storage Metrics**

  The only requirement to monitor daily metrics is the permission `s3:GetBucketTagging`.

* **Request Metrics**

  [Enable Requests metrics](http://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html) on your Amazon S3 buckets from the AWS console.

### Configuration

In the Amazon Web Services integration tile, ensure that S3 is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS S3 integration does not include any event at this time.

### Service Checks
The AWS S3 integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)