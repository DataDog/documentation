---
title: Datadog-AWS Lambda Integration
integration_title: AWS Lambda
kind: integration
doclevel: basic
git_integration_title: amazon_lambda
---

### Overview
Amazon Lambda is a compute service that runs code in response to events and automatically manages the compute resources required by that code.

Enable this integration to begin collecting custom metric from your Lambda functions, and see them in Datadog.

Custom metrics are collected from log lines printed with the following format:
<code>MONITORING|unix_epoch_timestamp|value|count|my.metric.name|#tag1:value,tag2</code>

Note: This integration requires the AWS permissions <code>logs:DescribeLogGroups</code>, <code>logs:DescribeLogStreams</code>, and <code>logs:FilterLogEvents</code> to be fully enabled. Also, counts and gauges are the only metrics types currently supported.
