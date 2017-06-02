---
title: Datadog-AWS DynamoDB Integration
integration_title: AWS DynamoDB
kind: integration
git_integration_title: amazon_dynamodb
newhlevel: true
---
# Overview

{{< img src="dynamodb.png" >}}

Amazon DynamoDB is a fully managed NoSQL database cloud service, part of the AWS portfolio. Fast and easily scalable, it is meant to serve applications which require very low latency, even when dealing with large amounts of data. It supports both document and key-value store models, and has properties of both a database and a distributed hash table.


Learn more about how to monitor DynamoDB performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/top-dynamodb-performance-metrics/). We detail the key performance metrics, how to collect them, and how [Medium](https://medium.com/) monitors DynamoDB using Datadog.


# Installation

This integration requires the permissions `dynamodb:list*` and `dynamodb:describe*` to be fully enabled.

# Metrics

<%= get_metrics_from_git()%>

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.