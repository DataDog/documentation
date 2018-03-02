---
aliases:
- /integrations/awses/
categories:
- cloud
- search
- aws
ddtype: crawler
description: Track key Amazon Elasticsearch metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_es/
git_integration_title: amazon_es
has_logo: true
integration_title: AWS ES
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_es
public_title: Datadog-AWS ES Integration
short_description: Track key Amazon Elasticsearch metrics.
version: '1.0'
---

## Overview

Amazon Elasticsearch Service is a managed service that makes it easy to deploy, operate, and scale Elasticsearch in the AWS Cloud.

Enable this integration to see custom tags and metrics for your ES clusters in Datadog.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `ES` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon ES metrics: 

    * `es:ListTags`: Add custom ES domain tags to ES metrics
    * `es:ListDomainNames`: Add custom ES domain tags to ES metrics
    * `es:DescribeElasticsearchDomains`: Add custom ES domain tags to ES metrics

    For more information on ES policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_es.html).

3. Install the [Datadog - AWS ES integration](https://app.datadoghq.com/account/settings#integrations/amazon_es).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_es" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS ES integration does not include any event at this time.

### Service Checks
The AWS ES integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
