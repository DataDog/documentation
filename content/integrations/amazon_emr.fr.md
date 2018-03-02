---
aliases:
- /integrations/awsemr/
categories:
- cloud
- processing
- aws
ddtype: crawler
description: Track key Amazon Elastic Map Reduce metrics.
doc_link: https://docs.datadoghq.com/integrations/amazon_emr/
git_integration_title: amazon_emr
has_logo: true
integration_title: AWS Elastic Map Reduce
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_emr
public_title: Datadog-AWS Elastic Map Reduce Integration
short_description: Track key Amazon Elastic Map Reduce metrics.
version: '1.0'
---

## Overview

Amazon Elastic MapReduce (Amazon EMR) is a web service that makes it easy to quickly and cost-effectively process vast amounts of data.

Enable this integration to see in Datadog all your EMR metrics.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `EMR` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon EMR metrics: 

    * `elasticmapreduce:ListClusters`: List available clusters.
    * `elasticmapreduce:DescribeCluster`: Add tags to CloudWatch EMR metrics.

    For more information on EMR policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_elasticmapreduce.html).

3. Install the [Datadog - AWS EMR integration](https://app.datadoghq.com/account/settings#integrations/amazon_emr).

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_emr" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS Elastic MapReduce integration does not include any event at this time.

### Service Checks
The AWS Elastic MapReduce integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
