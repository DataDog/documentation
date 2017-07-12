---
title: Datadog-AWS Lambda Integration
integration_title: AWS Lambda
kind: integration
newhlevel: true
git_integration_title: amazon_lambda
---

## Overview

Amazon Lambda is a compute service that runs code in response to events and automatically manages the compute resources required by that code.

Enable this integration to begin collecting Cloudwatch & custom metrics from your Lambda functions.

## Installation

If you haven't already, set up the <a href="/integrations/aws" target="_blank">Amazon Web Services integration</a>.

## Configuration

In the Amazon Web Services integration tile, ensure that Lambda is checked under metric collection.

The following permissions are also required to use the Lambda integration:

* `lambda:List*`:  List Lambda functions, metadata, and tags.
* `logs:DescribeLogGroups`:  List available log groups.
* `logs:DescribeLogStreams`: List available log streams for a group.
* `logs:FilterLogEvents`:  Fetch specific log events for a stream to generate metrics.
* `tag:getResources`: Get custom tags applied to Lambda functions.

To send custom metrics to Datadog, you must print a log line from your Lambda, using the following format:

~~~
MONITORING|<unix_epoch_timestamp>|<value>|<metric_type>|<metric_name>|#<tag_list>
~~~

Where:

* `MONITORING` signals to the Datadog integration that it should collect this log entry

* `<unix_epoch_timestamp>` is in seconds, not milliseconds


* `<value>` MUST be a number (i.e. integer or float)

* `<metric_type>` is `count`, `gauge`, `histogram`, or `check`

* `<metric_name>` uniquely identifies your metric and adheres to the [metric naming policy](http://docs.datadoghq.com/faq/#api){:target="_blank"}

* `<tag_list>` is optional, comma separated, and must be preceded by `#`. NOTE, The tag `function_name:<name_of_the_function>` will automatically be applied to custom metrics

## Sample snippets (in Python):

### Count/Gauge

~~~
unix_epoch_timestamp = int(time.time())
value = 42
metric_type = 'count'
metric_name = 'my.metric.name'
tags = ['tag1:value', 'tag2']

print('MONITORING|{0}|{1}|{2}|{3}|#{4}'.format(
    unix_epoch_timestamp, value, metric_type, metric_name, ','.join(tags)
))
~~~

### Histogram

~~~
unix_epoch_timestamp = int(time.time())
metric_type = 'histogram'
metric_name = 'my.metric.name.hist'
tags = ['tag1:value', 'tag2']

for i in xrange(0,10):
	print('MONITORING|{0}|{1}|{2}|{3}|#{4}'.format(
    	unix_epoch_timestamp, i, metric_type, metric_name, ','.join(tags)
))
~~~

Note: Using the histogram metric type provides `avg`, `count`, `max`, `min`, `95p`, and `median` values. These values are calculated at one second granularity.

### Service Check

~~~
unix_epoch_timestamp = int(time.time())
value = 1 # WARNING
metric_type = 'check'
metric_name = 'my.metric.name.check'

print('MONITORING|{0}|{1}|{2}|{3}'.format(
	timestamp, value, metric_type, metric_name
))
~~~

# Metrics

{{< get-metrics-from-git >}}

The metrics above get tagged in Datadog with any tags from AWS, including (but not limited to) function name, security-groups, and more.

Custom metrics only get tagged with function name.
