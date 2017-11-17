---
aliases:
- /integrations/awscloudfront/
description: Track error rates, request counts, and bytes downloaded and uploaded.
git_integration_title: amazon_cloudfront
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS CloudFront Integration
---

## Overview

Amazon CloudFront is a global content delivery network (CDN) service that accelerates delivery of your websites, APIs, video content or other web assets.

Enable this integration to see in Datadog all your CloudFront metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/s). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that CloudFront is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS Cloudfront integration does not include any event at this time.

### Service Checks
The AWS Cloudfront integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)