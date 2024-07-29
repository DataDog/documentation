---
title: Dogstream
private: true
aliases:
  - /agent/faq/dogstream
---

<div class="alert alert-danger">
This is a deprecated feature of Agent 5. New feature releases are discontinued.
<br>
Agent v6 is available! <a href="https://github.com/DataDog/datadog-agent/blob/master/docs/agent/upgrade.md">Upgrade to the newest version</a> to benefit from the new functionality.
</div>

Log files contain tons of valuable application and business data.
Unfortunately, this value is oftentimes never realized because log files go
ignored. The Datadog Agent can help remedy this by parsing metrics and events from
logs, so the data within can be graphed in real-time, all the time.

## Parsing metrics

The Datadog Agent can read metrics directly from your log files:

- from the Datadog canonical log format, without any additional programming
- from any other log format, with a customized log parsing function

### Datadog canonical log format

Datadog logs are formatted as follows:

    metric unix_timestamp value [attribute1=v1 attributes2=v2 ...]

For example, imagining the content of `/var/log/web.log` to be:

    me.web.requests 1320786966 157 metric_type=counter unit=request
    me.web.latency 1320786966 250 metric_type=gauge unit=ms

Then all you need for Datadog to read metrics is to add this line to your Agent configuration file (usually at `/etc/dd-agent/datadog.conf`):

    dogstreams: /var/log/web.log

You can also specify multiple log files like this:

    dogstreams: /var/log/web.log, /var/log/db.log, /var/log/cache.log

### Parsing custom log formats

If you want to parse a different log format—say for a piece of vendor or legacy software—you can use a custom Python function to extract the proper fields from the log by specifying your log file in your Agent configuration file in the following format:

    dogstreams: /var/log/web.log:parsers:parse_web

The `parsers:parse_web` portion indicates that the custom Python function lives in a package called `parsers` in the Agent's `PYTHONPATH`, and the `parsers` package has a function named `parse_web`. The Agent's `PYTHONPATH` is set in the Agent startup script, `/etc/init.d/datadog-agent`, in the supervisor config for Agent version.

If your parser does **not** live on the Agent's `PYTHONPATH`, you can use an alternative syntax to configure your line parser:

    dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser

In this format, the Agent attempts to import a function called `custom_parser` from `/path/to/my/parsers_module.py`.

If your custom log parser is not working, the first thing to check are the Agent collector logs:

* If the Agent is unable to import your function, look for `Could not load Dogstream line parser`.

* If all goes well you should see `dogstream: parsing {filename} with {function name} (requested {config option text})`.

<div class="alert alert-warning">
To test that dogstreams are working, append a line-don't edit an existing one-to any log file you've configured the Agent to watch. The Agent only <a href="/glossary/#tail">tails</a> the end of each log file, so it doesn't notice any changes you make elsewhere in the file.
</div>

### Writing parsing functions

Custom parsing functions must:

- take two parameters: a Python logger object (for debugging) and a string parameter of the current line to parse.
- return a tuple or list of tuples of the form:

     `(metric (str), timestamp (unix timestamp), value (float), attributes (dict))`

    Where attributes should at least contain the key metric_type, specifying whether the given metric is a counter or gauge.

    If the line doesn't match, instead return `None`.

### Metrics collection

Imagine that you're collecting metrics from logs that are not canonically formatted, but which are intelligently delimited by a unique character, logged as the following:

```text
user.crashes|2016-05-28 20:24:43.463930|24|LotusNotes,Outlook,Explorer
```

You could set up a log-parser like the following to collect a metric from this logged data in your Datadog account:

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

And then you would configure your `datadog.conf` to include the dogstream option as follows:

```text
dogstreams: /path/to/mylogfile.log:/path/to/mylogparser.py:my_log_parser
# (N.B., Windows users should replace each "/" with the escaped "\\")
```

This example would collect a gauge-type metric called "user.crashes" with a value of 24, and tagged with the 3 applications named at the end.

A word of warning: there is a limit to how many times the same metric can be collected in the same log-pass; effectively the Agent starts to overwrite logged metrics with the subsequent submissions of the same metric, even if they have different attributes (like tags). This can be somewhat mitigated if the metrics collected from the logs have sufficiently different timestamps, but it is generally recommended to only submit one metric to the logs for collection once every 10 seconds or so. This overwriting is not an issue for metrics collected with differing names.

## Parsing events

Event parsing is done through the same custom parsing functions as described above, except if you return a
`dict` (or a `list` of `dict`) from your custom parsing function, Datadog treats it as an event instead of a metric.

Here are the event fields (bold means the field is required):

| Field           | Type        | Value                                                                                                                                                                                                                             |
|-----------------|-------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **msg_title**   | string      | Title of the event, gets indexed by the full-text search.                                                                                                                                                                         |
| **timestamp**   | integer     | Unix epoch timestamp. If omitted, it defaults to the time that the Agent parsed the event.                                                                                                                                        |
| **msg_text**    | string      | Body of the event, get indexed by the full-text search.                                                                                                                                                                           |
| alert_type      | string enum | Indicates the severity of the event. Must be one of `error`, `warning`, `success` or `info`. If omitted, it defaults to `info`. Searchable by `alert_type:value`                                                                  |
| event_type      | string      | Describes what kind of event this is. Used as part of the aggregation key                                                                                                                                                         |
| aggregation_key | string      | Describes what this event affected, if anything. Used as part of the aggregation key                                                                                                                                              |
| host            | string      | Name of the host this event originated from. The event automatically gets tagged with any tags you've given this host using the [tagging][1] page or the [tagging api][2]. The host value is used as part of the aggregation key. |
| **priority**    | string      | Determines whether the event is visible or hidden by default in the stream; Must be one of `low` or `normal`                                                                                                                      |

The events with the same aggregation key within a 24 hour time window gets aggregated together on the stream.
The aggregation key is a combination of the following fields:

- event_type
- aggregation_key
- host

For an example of an event parser, see the [Cassandra compaction event parser][3] that is bundled with the Agent.

### Events collection

Imagine that you want to collect events from logging where you have enough control to add all sorts of relevant information, intelligently delimited by a unique character, logged as the following:

```text
2016-05-28 18:35:31.164705|Crash_Report|Windows95|A terrible crash happened!|A crash was reported on Joe M's computer|LotusNotes,Outlook,InternetExplorer
```

You could set up a log parser like the following to create an event from this logged data in your Datadog [event explorer][4]:

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

And then you would configure your `datadog.conf` to include the Dogstream option as follows:

```text
dogstreams: /path/to/mylogfile.log:/path/to/mylogparser.py:my_log_parser
# (N.B., Windows users should replace each "/" with the escaped "\\")
```

This specific log-line parsed with this parser created the following event in Datadog:

{{< img src="agent/faq/log_event_in_dd.jpg" alt="Log event in Datadog" style="width:70%;">}}

## Send extra parameters to your custom parsing function

Once you have setup your custom parser to send metric or events to your platform, you should have something like this in your `datadog.conf`:

```text
dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser
```

And in your parsers_module.py a function defined as:

```python
def custom_parser(logger, line)
```

You can change the parity of your function to take extra parameter as shown in this [Agent example][5].

So if you change your configuration file to:

```text
dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser:customvar1:customvar2
```

And your parsing function as:

```python
def custom_parser(logger, line, parser_state, *parser_args):
```

You have a tuple parameter in **parser_args** as (`<CUSTOM_VAR_1>`, `<CUSTOM_VAR_2>`) which is ready to use in your code by using parser_args[0] and parser_args[1].

**Note**: the parameter **parser_state** does not have to be used but it has to be in the signature of the function. And if you have only one parameter, you have to use **parser_args[1]** to get it.

As an example, if you have the same parser as in the documentation, but this time you do not want to extract the metric name from the log, but to set it thanks to this parameter:

In the configuration file you would have:

```text
dogstreams: /Users/Documents/Parser/test.log:/Users/Documents/Parser/myparser.py:parse_web:logmetric
```

## Troubleshooting

Bugs happen, so being able to see the traceback from your log-parsers is important. You can do this if you are running the Agent with its [Agent logs][6] set at the "DEBUG" level. The Agent's log-level can be set in the `datadog.conf` by uncommenting and editing this [line][7], and then [restarting the Agent][8]. Once that's configured properly, traceback resulting from errors in your custom log-parser can be found in the `collector.log` file, and it generally includes the string checks.collector(datadog.py:278) | Error while parsing line in them (see the [Agent code][9] where the error is likely to be thrown).

**Note**: Whenever you make a change to your custom log-parser, [restart the Agent][8] to put that change into effect.

If you suspect there is some error occurring beyond the scope of your custom log-parser function, feel free to [reach out to support][10], but do first set the Agent's log-level at "DEBUG", run the Agent for a few minutes while ensuring that new logs are being added to your files, and then [run the flare command][11] from your Agent. That gives to the support team the information needed to effectively troubleshoot the issue.

[1]: https://app.datadoghq.com/infrastructure#tags
[2]: /api/v1/tags/
[3]: https://github.com/DataDog/dd-agent/blob/master/dogstream/cassandra.py
[4]: /events/
[5]: https://github.com/DataDog/dd-agent/blob/5.13.x/checks/datadog.py#L210
[6]: /agent/configuration/agent-log-files/
[7]: https://github.com/DataDog/dd-agent/blob/5.7.x/datadog.conf.example#L211
[8]: /agent/configuration/agent-commands/
[9]: https://github.com/DataDog/dd-agent/blob/5.7.x/checks/datadog.py#L278
[10]: /help/
[11]: /agent/troubleshooting/send_a_flare/
