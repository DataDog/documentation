---
title: Datadog-AWS DynamoDB Integration
integration_title: AWS DynamoDB
kind: integration
git_integration_title: amazon_dynamodb
---

Amazon DynamoDB is a fully managed NoSQL database cloud service, part of the AWS portfolio. Fast and easily scalable, it is meant to serve applications which require very low latency, even when dealing with large amounts of data. It supports both document and key-value store models, and has properties of both a database and a distributed hash table.

To start collecting DynamoDB metrics, the only thing you need to do is to set up our integration with AWS CloudWatch by following [these instructions](http://docs.datadoghq.com/integrations/aws/).


![DynamoDB default dashboard](/static/images/dynamodb.png)

Learn more about how to monitor DynamoDB performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/top-dynamodb-performance-metrics/). We detail the key performance metrics, how to collect them, and how [Medium](https://medium.com/) monitors DynamoDB using Datadog.

### Metrics

<%= get_metrics_from_git()%> 
