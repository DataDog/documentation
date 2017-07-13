---
title: Datadog-AWS S3 Integration
integration_title: AWS S3
kind: integration
doclevel: basic
newhlevel: true
git_integration_title: amazon_s3
---

## Overview

{{< img src="s3_db_screenshot.png" alt="S3 Dashboard" >}}

Amazon Simple Storage Service (S3) is a highly available and scalable cloud storage service.

Enable this integration to see in Datadog all your S3 metrics.

## Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws).

* **Daily Storage Metrics**

	The only requirement to monitor daily metrics is the permission `s3:GetBucketTagging`.

* **Request Metrics**

	[Enable Requests metrics][1] on your Amazon S3 buckets from the AWS console.

## Configuration

In the Amazon Web Services integration tile, ensure that S3 is checked under metric collection.

## Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.


[1]: http://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html