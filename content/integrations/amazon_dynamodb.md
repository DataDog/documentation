---
aliases:
- /integrations/awsdynamo/
description: Track table size, read/write capacity, request latency, and more.
git_integration_title: amazon_dynamodb
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS DynamoDB Integration
---


{{< img src="integrations/amazon_dynamodb/dynamodb.png" alt="DynamoDB default dashboard" responsive="true" >}}

## Overview

Amazon DynamoDB is a fully managed NoSQL database cloud service, part of the AWS portfolio. Fast and easily scalable, it is meant to serve applications which require very low latency, even when dealing with large amounts of data. It supports both document and key-value store models, and has properties of both a database and a distributed hash table.

Learn more about how to monitor DynamoDB performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/top-dynamodb-performance-metrics/). We detail the key performance metrics, how to collect them, and how [Medium](https://medium.com/) monitors DynamoDB using Datadog.

## Setup
### Installation

This integration requires the permissions `dynamodb:list*` and `dynamodb:describe*` to be fully enabled.

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS DynamoDB integration does not include any event at this time.

### Service Checks
The AWS DynamoDB integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)