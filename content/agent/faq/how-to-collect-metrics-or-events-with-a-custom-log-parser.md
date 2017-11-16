---
title: How to collect metrics or events with a Custom Log Parser
kind: faq
customnav: agentnav
---

## Before Setup:

Before you decide to collect data via log-parsing, you should consider some other alternatives, such as the [agent's dogstatsd server](/developers/dogstatsd), the API, or (for more frequent data collection) a custom agent check. Some of the benefits of these alternatives are:

Most users find them easier to set up
You can have more control over the types of metrics you submit via the dogstatsd and custom agent checks
You can have more control over error logging
Oftentimes, an easier solution for collecting your data involves using one of these methods to send data to datadog at the point of log creation, rather than having the agent parse the logs later.

But there are some circumstances where [parsing logs](/agent/logs) is just what makes sense. If you find yourself in that situation, and if you do not have much control over how the logs are written, or if you want to collect events via log-parsing, then read on to see how you can set up a custom log-parser to collect that data through the agent. If you only want to collect metrics (not events) and if you have strong control over how the logs are formatted, you may find it easier to just use the agent's built-in log-parser.

### First: If you can, structure your logs intelligently

Writing a custom log-parser will involve writing a function in Python that the agent (which is python-based) will use to interpret your logs. The result of this function will be a specifically-order tuple if you're collecting metrics, or a python dict (or list of dicts) if you're collecting metrics, that contains parsed pieces from each line of the logs. It'll be up to you to write the function that parses the logged line into the appropriate pieces, so if you have any control over how the logs are written, it is certainly to your advantage to format the logs in a way that is easier for your function to parse.

For example, it is easier to parse logs that have a unique delimiting character that breaks up their "pieces." The agent-built log-parser assumes this is a space character, but others may be more appropriate (especially for event-collection), such as a pipe ("|"). (Colons can be used, except beware of logs that include times with colons, like "4:25:32") If your logs used "|" as a delimiting character, you can simply break them all into a list of variables with the line.split('|') string method. 

### Second: Write your Custom Parser module

You'll need to create a .py file for your parser, named however you like. This module will not need to import any other specific libraries, but can optionally import and use libraries that either came with or were installed on the agent's embedded Python (if you want to install libraries into the agent's embedded Python, for Windows follow this KB, and for Unix pip install from these directories). This module must include a function that will be your log-parsing function (named however you like), and it must take 2 parameters: "logger", and "line", like so:

```python

def my_log_parser(logger, line):
```

The "logger" variable enables the agent to log (at debug level) the traceback of any errors hit by your log-parsing function. The "line" parameter takes as its argument each new log-line as a string. It will then be up to you to write the logic to interpret that string-type log-line into the appropriate pieces that the agent can digest either as metrics or as events.

#### For Metrics:

If you are writing a custom parser to receive metrics from the logs, the function must return a tuple that includes the following (in this order):

* The metric name, as a string
* The timestamp, as an integer or as a unix timestamp
* The metric's value, as an integer or a float
* The metric's attributes, as a dict (this should at least include a "metric_type" key that corresponds either to "counter" or "gauge").

So this might look something like:

```
return (metric_name, time_stamp, metric_value, metric_attributes)
```

#### For Events:

If you are writing a custom parser to receive events from the logs, the function must return a dict that includes the following necessary keys:

* 'msg_title', a string, gives the event a title
* 'timestamp', an int, gives the event a time, defaults to the time of parsing if omitted
* 'msg_text', a string, composes the event's body
* 'priority', a string, must be either 'low' or 'normal'

The result dict may additionally include the following optional keys:

* 'alert_type', a string, defaults to 'info', other possible values are 'error', 'warning', or 'success'
* 'event_type', a string, makes up part of the event aggregation-key
* 'aggregation_key', a string, makes up part of the event aggregation-key
* 'host', a string, makes up part of the event aggregation-key (the event will already get a host-tag from the agent, so this isn't necessary)

For events, the function can return either a dict or a list of dicts. 

You can of course write your custom parser function to interpret a log-line either as a metric (return an appropriate tuple) or an event (return an appropriate dict).

In cases where the log-line does not parse correctly, an error will be thrown and data will not be collected from that line. If the function returns "None", no error will be thrown (and no data collected from that parse).

### Third: Configure the datadog.conf to parse your logs with your custom log-parser

In your agent's datadog.conf file's ["dogstreams" option](https://github.com/DataDog/dd-agent/blob/5.7.x/datadog.conf.example#L168), you must add:

1. The directory for your log-file
2. The directory for your log-parser module, 
3. Your log-parser function's name. 

This is necessary for the agent to know to parse your logs with your log-parsing function. The formatting for the dogstreams option would be like so:

```
dogstreams: /path/to/log1:/path/to/parsers_module.py:parser_function_name
```

You can add multiple log files and log parser combinations by comma delimiting them like so:
```
dogstreams: /path/to/log1:/path/to/parsers_module.py:parser_function_name, /path/to/log2:/path/to/other_parsers_module.py:its_parser_function_name
```

## Troubleshooting Your Custom Log-Parser

Bugs happen, so being able to see the traceback from your log-parsers will be very important. You can do this if you are running the agent with its [agent logs](/agent/faq/log-locations) set at the "DEBUG" level. The agent's log-level can be set in the datadog.conf by uncommenting and editing [this line](https://github.com/DataDog/dd-agent/blob/5.7.x/datadog.conf.example#L211), and then restarting the agent. Once that's configured properly, traceback resulting from errors in your custom log-parser can be found in the collector.log ([read here for where to find your agent logs](/agent/faq/log-locations)), and it will generally include the string checks.collector(datadog.py:278) | Error while parsing line in them ([here's the agent code where the error is likely to be thrown](https://github.com/DataDog/dd-agent/blob/5.7.x/checks/datadog.py#L278)).

Do note that whenever you make a change to your custom log-parser, you must restart the agent before that change will be put into effect.

If you suspect there is some error occurring beyond the scope of your custom log-parser function, feel free to reach out to support, but do first set the agent's log-level at "DEBUG", run the agent for a few minutes while ensuring that new logs are being added to your files, and then run the flare command from your agent. That will give support the information needed to effectively troubleshoot the issue.

## Example for Metrics Collecting

Let's imagine that you're collecting metrics from logs that are not canonically formatted, but which are intelligently delimited by a unique character, logged as the following:

```
user.crashes|2016-05-28 20:24:43.463930|24|LotusNotes,Outlook,Explorer
```

We could set up a log-parser like the following to collect a metric from this logged data in our datadog account:

```python

import time
from datetime import datetime
...
def my_log_parser(logger, test):
    metric_name, date, metric_value, extras = line.split('|')
    # Convert the iso8601 date into a unix timestamp, assuming the timestamp
    # string is in the same timezone as the machine that's parsing it.
    date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S.%f")
    tags = extras.split(',')
    date = time.mktime(date.timetuple())
    metric_attributes = {
        'tags': tags,
        'metric_type': 'gauge',
    }
    return (metric_name, date, metric_value, metric_attributes)
```

And then we would configure our datadog.conf to include the dogstream option as follows:
```
dogstreams: /path/to/mylogfile.log:/path/to/mylogparser.py:my_log_parser
# (N.B., Windows users should replace each "/" with the escaped "\\")
```

This example would collect a gauge-type metric called "user.crashes" with a value of 24, and tagged with the 3 applications named at the end.

A word of warning: there is a limit to how many times the same metric can be collected in the same log-pass; effectively the agent will start to over-write logged metrics with the subsequent submissions of the same metric, even if they have different attributes (like tags). This can be somewhat mitigated if the metrics collected from the logs have sufficiently different time-stamps, but it is generally recommended to only submit one metric to the logs for collection once every 10 seconds or so. This over-writing is not an issue for metrics collected with differing names.

## Example for Events Collecting

Let's imagine that you want to collect events from logging where you have enough control to add all sorts of relevant information, intelligently delimited by a unique character, logged as the following:

```
2016-05-28 18:35:31.164705|Crash_Report|Windows95|A terrible crash happened!|A crash was reported on Joe M's computer|LotusNotes,Outlook,InternetExplorer
```

We could set up a log parser like the following to create an event from this logged data in our datadog [event stream](/graphing/event_stream/):

```python

import time
from datetime import datetime
...
def my_log_parser(logger, line):

    # Split the line into fields
    date, report_type, system, title, message, extras = line.split('|')
    # Further split the extras into tags
    tags = extras.split(',')
    # Convert the iso8601 date into a unix timestamp, assuming the timestamp
    # string is in the same timezone as the machine that's parsing it.
    date = datetime.strptime(date, "%Y-%m-%d %H:%M:%S.%f")
    date = time.mktime(date.timetuple()) 
    logged_event = {
        'msg_title': title,
        'timestamp': date,
        'msg_text': message,
        'priority': 'normal',
        'event_type': report_type,
        'aggregation_key': system,
        'tags': tags,
        'alert_type': 'error'
    }
    return logged_event
```

And then we would configure our datadog.conf to include the dogstream option as follows:
```
dogstreams: /path/to/mylogfile.log:/path/to/mylogparser.py:my_log_parser
# (N.B., Windows users should replace each "/" with the escaped "\\") 
```

This specific log-line parsed with this parser created the following event in datadog:
{{< img src="agent/faq/log_event_in_dd.jpg" alt="Log event in Datadog" responsive="true" >}}