---
aliases:
- /integrations/awslambda/
description: Track lambda run times, errors, invocation counts, and more.
git_integration_title: amazon_lambda
integration_title: ''
kind: integration
newhlevel: true
title: Datadog-AWS Lambda Integration
---

## Overview

Amazon Lambda is a compute service that runs code in response to events and automatically manages the compute resources required by that code.

Enable this integration to begin collecting Cloudwatch & custom metrics from your Lambda functions.

## Setup
### Installation

If you haven't already, set up the [Amazon Web Services integration first](https://docs.datadoghq.com/integrations/aws/).

### Configuration

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

* `<metric_name>` uniquely identifies your metric and adheres to the [metric naming policy](http://docs.datadoghq.com/faq/#api)

* `<tag_list>` is optional, comma separated, and must be preceded by `#`.<br>The tag `function_name:<name_of_the_function>` will automatically be applied to custom metrics

#### Sample snippets (in Python):

##### Count/Gauge

```python
unix_epoch_timestamp = int(time.time())
value = 42
metric_type = 'count'
metric_name = 'my.metric.name'
tags = ['tag1:value', 'tag2']

print('MONITORING|{0}|{1}|{2}|{3}|#{4}'.format(
    unix_epoch_timestamp, value, metric_type, metric_name, ','.join(tags)
))
```

##### Histogram

```python
unix_epoch_timestamp = int(time.time())
metric_type = 'histogram'
metric_name = 'my.metric.name.hist'
tags = ['tag1:value', 'tag2']

for i in xrange(0,10):
    print('MONITORING|{0}|{1}|{2}|{3}|#{4}'.format(
        unix_epoch_timestamp, i, metric_type, metric_name, ','.join(tags)
))
```

<div class="alert alert-info">
Using the histogram metric type provides <code>avg</code>, <code>count</code>, <code>max</code>, <code>min</code>, <code>95p</code>, and <code>median</code> values. These values are calculated at one second granularity.
</div>

##### Service Check

```python
unix_epoch_timestamp = int(time.time())
value = 1 # WARNING
metric_type = 'check'
metric_name = 'my.metric.name.check'

print('MONITORING|{0}|{1}|{2}|{3}'.format(
    timestamp, value, metric_type, metric_name
))
```

## Data Collected
### Metrics
{{< get-metrics-from-git >}}

### Events
The AWS Lambda integration does not include any event at this time.

### Service Checks
The AWS Lambda integration does not include any service check at this time.

## Troubleshooting
Need help? Contact [Datadog Support](http://docs.datadoghq.com/help/).

## Further Reading
Learn more about infrastructure monitoring and all our integrations on [our blog](https://www.datadoghq.com/blog/)