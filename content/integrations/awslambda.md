---
title: Datadog-AWS Lambda Integration
integration_title: AWS Lambda
kind: integration
doclevel: basic
beta: true
git_integration_title: amazon_lambda
---

### Overview
Amazon Lambda is a compute service that runs code in response to events and automatically manages the compute resources required by that code.

Enable this integration to begin collecting custom metrics from your Lambda functions, and see them in Datadog.

To send custom metrics to Datadog, you must print a log line from your Lambda, using the following format:
<code>MONITORING|unix_epoch_timestamp|value|metric_type|my.metric.name|#tag1:value,tag2</code>

For example, here is sample snippet for printing a valid custom metric, from your Lambda function (in Python):
<code>
unix_epoch_timestamp = int(time.time())
value = 42
metric_type = 'count'
metric_name = 'my.metric.name'
tags = ['tag1:value', 'tag2']
print('MONITORING|{0}|{1}|{2}|{3}|#{4}'.format(
    unix_epoch_timestamp, value, metric_type, metric_name, ','.join(tags)
))
</code>

Note: This integration requires the AWS permissions <code>logs:DescribeLogGroups</code>, <code>logs:DescribeLogStreams</code>, and <code>logs:FilterLogEvents</code> to be fully enabled. Also, counts and gauges are the only metrics types currently supported.

### Metrics

<%= get_metrics_from_git()%> 
