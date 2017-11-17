---
aliases:
- /integrations/awses/
description: Track key Amazon Elasticsearch metrics.
git_integration_title: amazon_es
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS ES Integration
---

## Overview

Amazon Elasticsearch Service is a managed service that makes it easy to deploy, operate, and scale Elasticsearch in the AWS Cloud.

Enable this integration to see custom tags and metrics for your ES clusters in Datadog.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws). This integration requires the permissions `es:ListTags`, `es:ListDomainNames`  and `es:DescribeElasticsearchDomains` to be fully enabled.

### Configuration

In the Amazon Web Services integration tile, ensure that ES is checked under metric collection.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS ES integration does not include any event at this time.

### Service Checks
The AWS ES integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)