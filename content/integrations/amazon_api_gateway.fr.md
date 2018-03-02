---
aliases:
- /integrations/awsapigateway/
categories:
- cloud
- api
- aws
ddtype: crawler
description: Track gateway errors, cache hits and misses, and request latency.
doc_link: https://docs.datadoghq.com/integrations/amazon_api_gateway/
git_integration_title: amazon_api_gateway
has_logo: true
integration_title: AWS API Gateway
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_api_gateway
public_title: Datadog-AWS API Gateway Integration
short_description: Track Amazon API gateway errors.
version: '1.0'
---

## Overview

Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.

Enable this integration to see in Datadog all your API Gateway metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `API Gateway` is checked under metric collection.

2. Install the [Datadog - AWS API Gateway integration](https://app.datadoghq.com/account/settings#integrations/amazon_api_gateway).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_api_gateway" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS API Gateway integration does not include any event at this time.

### Service Checks
The AWS API Gateway integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
