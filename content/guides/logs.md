---
title: Log Parsing in the Agent
kind: guide
listorder: 5
sidebar:
  nav:
    - header: Guide to Log Parsing
    - text: Parsing Metrics
      href: "#metrics"
    - text: Parsing Events
      href: "#events"
---

Log files contain tons of valuable application and business data.
Unfortunately, this value is oftentimes never realized because log files go
ignored. The Datadog Agent can help remedy this by parsing metrics and events from
logs, so the data within can be graphed in real-time, all the time.

<h2 id="metrics">Parsing Metrics</h2>

The Datadog Agent can read metrics directly from your log files:

- from the Datadog canonical log format, without any additional programming
- from any other log format, with a customized log parsing function

### Datadog Canonical Log Format

Datadog logs are formatted as follows:

    metric unix_timestamp value [attribute1=v1 attributes2=v2 ...]

For example, imagining the content of `/var/log/web.log` to be:

    me.web.requests 1320786966 157 metric_type=counter unit=request
    me.web.latency 1320786966 250 metric_type=gauge unit=ms

Then all you need for Datadog to read metrics is to add this line to your Agent
configuration file (usually at `/etc/dd-agent/datadog.conf`):

    dogstreams: /var/log/web.log

You can also specify multiple log files like this:

    dogstreams: /var/log/web.log, /var/log/db.log, /var/log/cache.log

### Parsing Custom Log Formats

If you want to parse a different log format - say for a piece of vendor
or legacy software - you can use a custom Python function to extract the proper
fields from the log by specifying your log file in your Agent configuration
file in the following format:

    dogstreams: /var/log/web.log:parsers:parse_web

The `parsers:parse_web` portion indicates that the custom Python function lives
in a package called  parsers in the Agent's `PYTHONPATH`, and the parsers package
has a function named `parse_web`. The Agent's `PYTHONPATH` is set in the Agent
startup script, `/etc/init.d/datadog-agent` for Agent versions < 2.0, and in the
supervisor config for Agent version >= 2.0.

If your parser does **not** live on the Agent's `PYTHONPATH`, you can use an
alternative syntax to configure your line parser:

    dogstreams: /path/to/log1:/path/to/my/parsers_module.py:custom_parser

In this format, the agent will attempt to import a function called
`custom_parser` from `/path/to/my/parsers_module.py`.

If your custom log parser is not working, the first place to check is the
Agent collector logs. If the Agent is unable to import your function, there will
be a line with `Could not load Dogstream line parser`. (On the other hand, if
all goes well you should see `dogstream: parsing {filename} with
{function name} (requested {config option text})`.)

### Writing Parsing Functions

Custom parsing functions must:

- take two parameters: a Python logger object (for debugging) and a string parameter of the current line to parse.
- return a tuple or list of tuples of the form:

     `(metric (str), timestamp (unix timestamp), value (float), attributes (dict))`

Where attributes should at least contain the key metric_type, specifying whether the given metric is a counter or gauge.

### Example

Here's an example of what `parsers.py` might contain:

<%= python <<eof
import time
from datetime import datetime

def parse_web(logger, line):
    # Split the line into fields
    date, metric_name, metric_value, attrs = line.split('|')

    # Convert the iso8601 date into a unix timestamp, assuming the timestamp
    # string is in the same timezone as the machine that's parsing it.
    date = datetime.strptime(date, "%Y-%m-%dT%H:%M:%S")
    date = time.mktime(date.timetuple())

    # Remove surrounding whitespace from the metric name
    metric_name = metric_name.strip()

    # Convert the metric value into a float
    metric_value = float(metric_value.strip())

    # Convert the attribute string field into a dictionary
    attr_dict = {}
    for attr_pair in attrs.split(','):
        attr_name, attr_val = attr_pair.split('=')
        attr_name = attr_name.strip()
        attr_val = attr_val.strip()
        attr_dict[attr_name] = attr_val

    # Return the output as a tuple
    return (metric_name, date, metric_value, attr_dict)
eof
%>


You'll want to be able to test your parser outside of the Agent, so for the above example,
you might add a test function like this:

<%= python <<eof
def test():
    # Set up the test logger
    import logging
    logging.basicConfig(level=logging.DEBUG)

    # Set up the test input and expected output
    test_input = "2011-11-08T21:16:06|me.web.requests|157|metric_type=counter,unit=request"
    expected = (
        "me.web.requests",
        1320786966,
        157,
        {"metric_type": "counter",
         "unit":        "request" }
    )

    # Call the parse function
    actual = parse_web(logging, test_input)

    # Validate the results
    assert expected == actual, "%s != %s" % (expected, actual)
    print 'test passes'


if __name__ == '__main__':
    # For local testing, callable as "python /path/to/parsers.py"
    test()
eof
%>

And you can test your parsing logic by calling python /path/to/parsers.py.

<h2 id="events">Parsing Events</h2>

Event parsing is done via the same custom parsing functions as described above, except if you return a
`dict` (or a `list` of `dict`) from your custom parsing function, Datadog will treat it as an event instead of a metric.

Here are the event fields (bold means the field is required):

<table class="table">
<thead>
<tr>
<th>Field</th>
<th>Type</th>
<th>Value</th>
</tr>
</thead>
<tbody>
<tr>
<th>msg_title</th>
<td>string</td>
<td>Title of the event. Will get indexed by our full-text
search.</td>
</tr>
<tr>
<td>timestamp</td>
<td>integer</td>
<td>Unix epoch timestamp. If omitted, will default to the time that
the Agent parsed the event.</td>
</tr>
<tr>
<td>msg_text</td>
<td>string</td>
<td>Body of the event. Will get indexed by our full-text
search.</td>
</tr>
<tr>
<td>alert_type</td>
<td>string enum</td>
<td>Indicates the severity of the event. Must be one of `error`,
`warning`, `success` or `info`. If omitted, will default to `info`.
Searchable by `alert_type:value`</td>
</tr>
<tr>
<td>event_type</td>
<td>string</td>
<td>Describes what kind of event this is. Used as part of the
aggregation key</td>
</tr>
<tr>
<td>aggregation_key</td>
<td>string</td>
<td>Describes what this event affected, if anything. Used as part
of the aggregation key</td>
</tr>
<tr>
<td>host</td>
<td>string</td>
<td>Name of the host this event originated from. The event will
automatically get tagged with any tags you've given this host using
the <a href="https://app.datadoghq.com/infrastructure#tags">tagging
page</a> or the <a href="/api/#tags">tagging
api</a>. The host value is used as part of the aggregation
key.</td>
</tr>
<tr>
<td>priority</td>
<td>string</td>
<td>Determines whether the event will be visible or hidden by default
in the stream; Must be one of <code>low</code> or <code>normal</code></td>
</tr>
</tbody>
</table>

The events with the same aggregation key within a 24 hour time window will get aggregated together on the stream.
The aggregation key is a combination of the following fields:

- event_type
- aggregation_key
- host

For an example of an event parser, see our [cassandra compaction event parser](https://github.com/DataDog/dd-agent/blob/master/dogstream/cassandra.py)
that is bundled with the Agent.
