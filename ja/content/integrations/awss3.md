---
description: Track request latency, number of requests by type, bucket sizes, and
  more.
doclevel: basic
git_integration_title: amazon_s3
integration_title: AWS S3
kind: integration
newhlevel: true
placeholder: true
title: Datadog-AWS S3 Integration
---

<div class='alert alert-info'><strong>NOTICE:</strong>アクセスいただきありがとうございます。こちらのページは現在英語のみのご用意となっております。引き続き日本語化の範囲を広げてまいりますので、皆様のご理解のほどよろしくお願いいたします。</div>

{{< img src="integrations/awss3/s3_db_screenshot.png" alt="S3 Dashboard" >}}

## Overview

Amazon Simple Storage Service (S3) is a highly available and scalable cloud storage service.

Enable this integration to see in Datadog all your S3 metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws).

* **Daily Storage Metrics**

	The only requirement to monitor daily metrics is the permission `s3:GetBucketTagging`.

* **Request Metrics**

	[Enable Requests metrics][1] on your Amazon S3 buckets from the AWS console.

### Configuration

In the Amazon Web Services integration tile, ensure that S3 is checked under metric collection.

## Data Collected
### Metrics

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

[1]: http://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html
