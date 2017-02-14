---
title: Datadog-AWS S3 Integration
integration_title: AWS S3
kind: integration
doclevel: basic
newhlevel: true
git_integration_title: amazon_s3
---

# Overview

![RDS Dashboard](/static/images/s3_db_screenshot.png)

Amazon Simple Storage Service (S3) is a highly available and scalable cloud storage service.

Enable this integration to see in Datadog all your S3 metrics.

# Installation

* **Daily Storage Metrics**

	The only requirement for this integration is the permission `s3:GetBucketTagging`.

* **Request Metrics**

	[Enable Requests metrics][1] on your Amazon S3 buckets from the AWS console.


# Metrics

<%= get_metrics_from_git() %>

[1]: http://docs.aws.amazon.com/AmazonS3/latest/dev/cloudwatch-monitoring.html