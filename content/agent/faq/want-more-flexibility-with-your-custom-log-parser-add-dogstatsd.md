---
title: Want more flexibility with your custom log parser? Add dogstatsd
kind: faq
customnav: agentnav
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
- link: "/developers/dogstatsd"
  tag: "Documentation"
  text: Learn more about DogstatsD
---

There are many ways to collect [custom metrics](/getting_started/custom_metrics/) from your datadog agent. One additional method of collecting custom metrics from a datadog agent is by parsing log files: the agent comes with its own [built-in log parser](/agent/logs), and you can also write [your own custom log parser](/agent/logs/) to collect events or metrics from logs that don't fit the agent's built-in log parser. This method of custom metric collection has certain limitations, and can be fairly difficult to set up, which often makes it not the most appropriate approach to collecting custom metrics. 

That being said, sometimes parsing logs just makes sense. And in those cases, the [DogStatsD](/developers/dogstatsd) can be used along with a custom log parser to make for more effective log-parsing.

## Limitations of stand-alone log parsers

There are currently a number of limitations to collecting metrics with [agent log] parsers, whether built-in or custom. Among these are:

* The log parser can only collect metrics as "gauge" or "counter" type metrics and events--it cannot collect "histogram" type metrics nor service checks.
* The log parser can only collect metrics of the same name at roughly 15 second intervals before it starts to over-write the metrics it collects, and this is true even when the metrics have different tags.

In some circumstances, these limitations end up being significant indeed. Fortunately, using the [DogStatsD](/developers/dogstatsd) in a custom log parser enables you to circumnavigate both of these limitations. 

## Pre-requisites for this type of custom metric collection

* A datadog agent. More info on how to install that from your [datadog account here](https://app.datadoghq.com/account/settings#agent). 
* The datadogpy library, which can be installed by following [these instructions](/agent/basic_agent_usage/amazonlinux/#adding-a-custom-python-package-to-the-agent), the datadogpy library itself can be found [here](https://github.com/DataDog/datadogpy#installation). 

## The big idea

f you're interested in this method of metric collection, you can build a custom log parser as you normally would ([following these instructions](/agent/logs), if you'd like some direction), but then instead of using the parser to actually submit the metrics or events in the return line of the parsing module, just use a [DogStatsD](/developers/dogstatsd) method instead. Of course, in order to use a [DogStatsD](/developers/dogstatsd) method in a python log-parsing module, you'll want to start the module off by importing statsd from the [DogStatsD](/developers/dogstatsd) library just as you normally would when using the dogstatsd.

## An example

Taking a (very simple) test log file that included logs in the following format:

```
10|logparser,test:one
10|logparser,test:two
10|logparser,test:three
10|logparser,test:four
10|logparser,test:five
10|logparser,test:six
10|logparser,test:seven
10|logparser,test:eight
10|logparser,test:nine
```

These two custom log parser modules were applied to collect metrics from the logs, the first without the dogstatsd:

```python

from datadog import statsd
from time import time

def logstatsd_parser(logger, line):

    if line:
        if len(line) > 0:
            metric_value, metric_tags = line.split('|')
            ts = int(time())
            met_attribs = {'tags': metric_tags.split(','), 'metric_type': 'gauge'}
            return ('custom_log_parser_test.gauge', ts, metric_value, met_attribs)
    return None
```

and second with the dogstatsd:

```python

from datadog import statsd

def logstatsd_parser(logger, line):

    if line:
        if len(line) > 0:
            metric_value, metric_tags = line.split('|')
            statsd.gauge(
                'logstatsd_test.gauge',
                metric_value,
                tags=metric_tags.split(',')
            )
    return None
```

And you can see the resulting metric collection below. Because these log lines were all written at virtually the same time, the standalone log parser was only able to collect one metric value, whereas the "logstatsd" version was able to collect the metric for each unique tag value.

{{< img src="agent/faq/collect_metrics.png" alt="Collect Metrics" responsive="true" popup="true">}}

Of course, gauge type metrics always have their limitations in terms of how frequently you can submit them--if you still run into issues with metric granularity stemming from high-frequency logs, your metric may be better suited for a "counter" type metric, which can also be submitted via the [DogStatsD](/developers/dogstatsd) using the `statsd.increment()`` method. 

The `dogstatsd.statsd` methods uses the timestamp at the moment the log line is parsed for the metric timestamp. If you need to inherit timestamps from the log lines themselves, you can use the `dogstatsd.threadstats` method instead. 