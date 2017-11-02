---
title: How to collect metrics with the Agent's built-in Log Parser ?
kind: faq
customnav: agentnav
---

## Before Setup:

Before you decide to collect data via log-parsing, you should consider some other alternatives, such as the agent's [dogstatsd server](/developers/dogstatsd), [the API](/api), or (for more frequent data collection) a [custom agent check](/agent/agent_checks). Some of the benefits of these alternatives are:

* Most users find them easier to set up
* You can have more control over the types of metrics you submit via the dogstatsd and custom agent checks
* You can have more control over error logging

Oftentimes, an easier solution for collecting your data involves using one of these methods to send data to datadog at the point of log creation, rather than having the agent parse the logs later.

But there are some circumstances where [parsing logs](/agent/logs) is just what makes sense. If you find yourself in that situation, if what you want to collect are metrics, and if you have control over how the logs are written, then read on to see how you can take advantage of the agent's built-in log-parser (dogstreams) to collect your metrics. If what you want to collect are events, or if you do not have control over how the logs are written, you will want to refer to the sister article of this KB: [How to collect metrics or events with a Custom Log Parser](/agent/faq/how-to-collect-metrics-or-events-with-a-custom-log-parser). 

## First: Format the logs

Correctly formatting your logs will be key to getting metrics into your account via the agent's built-in log parser. There are 3 rules to keep in mind when it comes to this formatting:

1. The built-in parser splits all values by the space character. This means every combination of characters in the logs that is bordered by a space will be interpreted as a unique "thing" by the parser.

2. The order of the "things" here is important. That order is as follows:
    ```
    <metric.name.string> <time_stamp_int/float> <metric_value_int/float> <tag1_type=tag_value> <tag2_type=tag_value> etc.
    ```

3. You can add many tags, but they must have a two-part format, such as env:production, and they must be formatted with an "=" like so: env=production. You cannot include multiple tags with the same first-part; if you were to include both env=production and env=staging, one would get overwritten by the other.

## Second: Add the logs' directory to the datadog.conf

You must add the directory for the logs in the agent's datadog.conf file in the "dogstreams" option in order for the agent to know to parse them. Like so:
```
dogstreams: /path/to/log1
```

You can add multiple log files for parsing by comma delimiting them like so:
```
dogstreams: /path/to/log1, /path/to/log2
```

Note that by only including a path to the log file without ":"s, you will indicate to the agent that this log file should be parsed by the built-in parser.

## Troubleshooting the Log-Parser

If you are not seeing your data appear in your account as expected, it may have to do with either the logs' formatting or with their timestamps. Whatever the case, you can troubleshoot the log-parser by setting the agent's log-level to "DEBUG" (in the datadog.conf, uncomment and edit [this line](https://github.com/DataDog/dd-agent/blob/5.7.x/datadog.conf.example#L211), then restart the agent). Errors in the built-in log-parser will be captured by the debug-level logs, and will generally include the string datadog.py:189 in them ([where the error is likely to occur](https://github.com/DataDog/dd-agent/blob/5.7.x/checks/datadog.py#L189)). 

If you would like help identifying an issue sending metrics via the log-parser, feel free to reach out to support, but do first set the agent's log-level at "DEBUG", run the agent for a few minutes while ensuring that new logs are being added to your files, and then [run the flare command](/agent/faq/send-logs-and-configs-to-datadog-via-flare-command) from your agent. That will give support the information needed to effectively troubleshoot the issue. 

## Example

If you're logging the run-time of a function or process (the easiest way to do that would be with the dogstatsd, but) you could do that with the agent's built-in log parser by ensuring that the logs were written in their file as follows:
```
applications.function.runtime_seconds 1464462187 24 application=myapp code_author=gus
```

Let's say this file is being written to /Users/Documents/User Logs/myapp_run.log. You would add this directory to your datadog.conf as follows:

```
dogstreams: /Users/Documents/User\ Logs/myapp_run.log
# (N.B., Windows users should replace each "/" with the escaped "\\")
```

Then once you restart your agent and subsequently add that line to your log file, in your account you would find a metric point at Sat, 28 May 2016 19:03:07 GMT with the name "applications.function.runtime_seconds" with a value of 24, and tagged by "application:myapp" and "code_author:gus".

A word of warning: For gauge type metrics, only the last value submitted for each unique combination of metric name and tags will be kept for each agent check interval, which is around 15 seconds (this is the same behavior that gauge type metrics have in custom agent checks or dogstatsd). This over-writing is not an issue for count type metrics, where the sum of all submitted values is taken for each check interval.