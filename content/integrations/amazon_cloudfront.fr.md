---
aliases:
- /integrations/awscloudfront/
categories:
- cloud
- caching
- web
- aws
ddtype: crawler
description: Track error rates, request counts, and bytes downloaded and uploaded.
doc_link: https://docs.datadoghq.com/integrations/amazon_cloudfront/
git_integration_title: amazon_cloudfront
has_logo: true
integration_title: AWS CloudFront
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_cloudfront
public_title: Datadog-AWS CloudFront Integration
short_description: Track error rates, request counts, and bytes downloaded and uploaded.
version: '1.0'
---

## Overview

Amazon CloudFront is a global content delivery network (CDN) service that accelerates delivery of your websites, APIs, video content or other web assets.

Enable this integration to see in Datadog all your CloudFront metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `CloudFront` is checked under metric collection.

2. Install the [Datadog - AWS CloudFront integration](https://app.datadoghq.com/account/settings#integrations/amazon_cloudfront).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_cloudfront" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Cloudfront integration does not include any event at this time.

### Service Checks
The AWS Cloudfront integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
