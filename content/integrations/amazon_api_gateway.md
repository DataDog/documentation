---
aliases:
- /integrations/awsapigateway/
description: Track Amazon API gateway errors.
git_integration_title: amazon_api_gateway
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS API Gateway Integration
---

## Overview

Amazon API Gateway is a fully managed service that makes it easy for developers to create, publish, maintain, monitor, and secure APIs at any scale.

Enable this integration to see in Datadog all your API Gateway metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/). There are no other installation steps that need to be performed.

### Configuration

In the Amazon Web Services integration tile, ensure that API Gateway is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS API Gateway integration does not include any event at this time.

### Service Checks
The AWS API Gateway integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)