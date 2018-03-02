---
aliases:
- /integrations/awsdynamo/
categories:
- cloud
- data store
- aws
ddtype: crawler
description: Track table size, read/write capacity, request latency, and more.
doc_link: https://docs.datadoghq.com/integrations/amazon_dynamodb/
git_integration_title: amazon_dynamodb
has_logo: true
integration_title: AWS DynamoDB
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_dynamodb
public_title: Datadog-AWS DynamoDB Integration
short_description: Track table size, read/write capacity, request latency, and more.
version: '1.0'
---

{{< img src="integrations/amazon_dynamodb/dynamodb.png" alt="DynamoDB default dashboard" responsive="true" popup="true">}}

## Overview

Amazon DynamoDB is a fully managed NoSQL database cloud service, part of the AWS portfolio. Fast and easily scalable, it is meant to serve applications which require very low latency, even when dealing with large amounts of data. It supports both document and key-value store models, and has properties of both a database and a distributed hash table.

Learn more about how to monitor DynamoDB performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/top-dynamodb-performance-metrics/). We detail the key performance metrics, how to collect them, and how [Medium](https://medium.com/) monitors DynamoDB using Datadog.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. In the [AWS integration tile](https://app.datadoghq.com/account/settings#integrations/amazon_web_services), ensure that `DynamoDB` is checked under metric collection.

2. Add those permissions to your [Datadog IAM policy](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) in order to collect Amazon DynamoDB metrics: 

    * `dynamodb:ListTables`: Used to list available DynamoDB tables.
    * `dynamodb:DescribeTable`: Used to add metrics on a table size and item count.
    * `dynamodb:ListTagsOfResource`: Used to collect all tags on a DynamoDB resource.

    For more information on DynamoDB policies, review [the documentation on the AWS website](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_dynamodb.html).

3. Install the [Datadog - AWS DynamoDB integration](https://app.datadoghq.com/account/settings#integrations/amazon_dynamodb).

### Installation

This integration requires the permissions `dynamodb:list*` and `dynamodb:describe*` to be fully enabled.

## Data Collected
### Metrics
{{< get-metrics-from-git "amazon_dynamodb" >}}


Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events
The AWS DynamoDB integration does not include any event at this time.

### Service Checks
The AWS DynamoDB integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)
