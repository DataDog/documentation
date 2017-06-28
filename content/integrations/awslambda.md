---
title: Datadog-AWS Lambda Integration
integration_title: AWS Lambda
kind: integration
newhlevel: true
git_integration_title: amazon_lambda
---

# Overview

Amazon Lambda is a compute service that runs code in response to events and automatically manages the compute resources required by that code.

Enable this integration to begin collecting Cloudwatch & custom metrics from your Lambda functions.

# Installation

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws).

# Configuration

In the Amazon Web Services integration tile, ensure that Lambda is checked under metric collection.

To send custom metrics to Datadog, you must print a log line from your Lambda, using the following format:

~~~
MONITORING|unix_epoch_timestamp|value|metric_type|metric.name|#tag1:value,tag2
~~~

##Notes on each section

###MONITORING
* This is used to find the log statement within Cloudwatch Logs and pull it into Datadog

###unix_epoch_timestamp
* Please ensure the `unix_epoch_timestamp` is in seconds (not milliseconds)

###value
* The value of the metric **must** be a number.
* For metric_type `check` the options are, `'0': OK, '1': WARNING, '2': CRITICAL, '3': UNKNOWN`

###metric_type
* Supported metric types are `count, gauge, histogram, and check`

###metric.name
* A unique name to identify your metric

###tags
* Optionally add tags to apply to this metric
* If you do not want to add any tags use the format: `MONITORING|unix_epoch_timestamp|value|metric_type|metric.name`
* The tag `function_name` will automatically be applied to custom metrics


## Sample snippets (in Python):

###Count/Gauge

~~~
unix_epoch_timestamp = int(time.time())
value = 42
metric_type = 'count'
#metric_type = 'gauge'
metric_name = 'my.metric.name'
tags = ['tag1:value', 'tag2']

print('MONITORING|{0}|{1}|{2}|{3}|#{4}'.format(
    unix_epoch_timestamp, value, metric_type, metric_name, ','.join(tags)
))
~~~

###Histogram

~~~
unix_epoch_timestamp = int(time.time())
metric_type = 'histogram'
metric_name = 'my.metric.name.hist'
tags = ['tag1:value', 'tag2']2

for i in xrange(0,10):
	print('MONITORING|{0}|{1}|{2}|{3}|#{4}'.format(
    	unix_epoch_timestamp, i, metric_type, metric_name, ','.join(tags)
))
~~~

Note: Using the histogram metric type provides `avg, count, max, min 95p, and median` values

###Service Check

~~~
unix_epoch_timestamp = int(time.time())
value = 1
metric_type = 'check'
metric_name = 'my.metric.name.check'
tags = ['tag1:value', 'tag2']
print('MONITORING|{0}|{1}|{2}|{3}|#{4}'.format(
	timestamp, value, metric_type, metric_name, ','.join(tags)
))
~~~


##Required Permssions

~~~
logs:DescribeLogGroups
logs:DescribeLogStreams
logs:FilterLogEvents
tag:getResources
~~~

# Metrics

<%= get_metrics_from_git()%> 

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to function name, security-groups, and more.
