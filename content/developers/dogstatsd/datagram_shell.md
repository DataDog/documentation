---
title: Datagram Format and Shell Usage
kind: documentation
description: Overview of the datagram format used by DogStatsD as well as (advanced) shell usage.
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Official and Community-contributed API and DogStatsD client libraries"
- link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
  tag: "Github"
  text: "DogStatsD source code"
---


This section specifies the raw datagram format for each data type that DogStatsD accepts. This isn't required reading if you're using any of the DogStatsD client libraries; however, if you want to write your own library, or use the shell to send metrics or events, then read on.

## Datagram Format

### Metrics

`metric.name:value|type|@sample_rate|#tag1:value,tag2`

- `metric.name` - a string with no colons, bars, or @ characters. See the [metric naming policy][1].
- `value` - an integer or float.
- `type` - `c` for counter, `g` for gauge, `ms` for timer, `h` for histogram, `s` for set.
- `sample rate` (optional) - a float between 0 and 1, inclusive. Only works with counter, histogram, and timer metrics. Default is 1 (i.e. sample 100% of the time).
- `tags` (optional) - a comma separated list of tags. Use colons for key/value tags, i.e. `env:prod`. The key `device` is reserved; Datadog drops a user-added tag like `device:foobar`.

Here are some example datagrams:

    # Increment the page.views counter
    page.views:1|c

    # Record the fuel tank is half-empty
    fuel.level:0.5|g

    # Sample the song length histogram half of the time
    song.length:240|h|@0.5

    # Track a unique visitor to the site
    users.uniques:1234|s

    # Increment the active users counter, tag by country of origin
    users.online:1|c|#country:china

    # Track active China users and use a sample rate
    users.online:1|c|@0.5|#country:china

### Events

`_e{title.length,text.length}:title|text|d:timestamp|h:hostname|p:priority|t:alert_type|#tag1,tag2`

- `_e` - The datagram must begin with `_e`
- `title` - Event title.
- `text` - Event text. Insert line breaks with an escaped slash (`\\n`)
- `|d:timestamp` (optional) - Add a timestamp to the event. Default is the current Unix epoch timestamp.
- `|h:hostname` (optional) - Add a hostname to the event. No default.
- `|k:aggregation_key` (optional) - Add an aggregation key to group the event with others that have the same key. No default.
- `|p:priority` (optional) - Set to 'normal' or 'low'. Default 'normal'.
- `|s:source_type_name` (optional) - Add a source type to the event. No default.
- `|t:alert_type` (optional) - Set to 'error', 'warning', 'info' or 'success'. Default 'info'.
- `|#tag1:value1,tag2,tag3:value3...` (optional) - The colon in tags is part of the tag list string and has no parsing purpose like for the other parameters. No default.

Here are some example datagrams:

    # Send an exception
    _e{21,36}:An exception occurred|Cannot parse CSV file from 10.0.0.17|t:warning|#err_type:bad_file

    # Send an event with a newline in the text
    _e{21,42}:An exception occurred|Cannot parse JSON request:\\n{"foo: "bar"}|p:low|#err_type:bad_request

### Service Checks

`_sc|name|status|d:timestamp|h:hostname|#tag1:value1,tag2,tag3:value3,...|m:service_check_message`

- `_sc` - the datagram must begin with `_sc`
- `name` - Service check name.
- `status` - Integer corresponding to the check status (OK = 0, WARNING = 1, CRITICAL = 2, UNKNOWN = 3).
- `d:timestamp` (optional) - Add a timestamp to the check. Default is the current Unix epoch timestamp.
- `h:hostname` (optional) - Add a hostname to the event. No default.
- `#tag1:value1,tag2,tag3:value3,...` (optional) - The colon in tags is part of the tag list string and has no parsing purpose like for the other parameters. No default.
- `m:service_check_message` (optional) - Add a message describing the current state of the service check. *This field MUST be positioned last among the metadata fields.* No default.

Here's an example datagram:

    # Send a CRITICAL status for a remote connection
    _sc|Redis connection|2|#redis_instance:10.0.0.16:6379|m:Redis connection timed out after 10s

## Send metrics and events using DogStatsD and the shell

For Linux and other Unix-like OS, we use Bash.
For Windows we need Powershell and [powershell-statsd][2], a simple Powershell function that takes care of the network bits for us.

The idea behind DogStatsD is simple: create a message that contains information about your metric/event, and send it to a collector over UDP on port 8125. [Read more about the message format](#datagram-format).

### Sending metrics

The format for sending metrics is `metric.name:value|type|@sample_rate|#tag1:value,tag2,` so let's go ahead and send datapoints for a gauge metric called custom_metric with the shell tag. We use a locally installed Agent as a collector, so the destination IP address is 127.0.0.1.

On Linux:

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

or

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom_metric:60|g|#shell" | nc -4u -w0 127.0.0.1 8125
```

On Windows:

```
PS C:\vagrant> .\send-statsd.ps1 "custom_metric:123|g|#shell"
PS C:\vagrant>
```

On any platform with Python (on Windows, the Agent's embedded Python interpreter can be used, which is located at `C:\Program Files\Datadog\Datadog Agent\embedded\python.exe`):

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

### Sending events

The format for sending events is:

```
_e{title.length,text.length}:title|text|d:date_happened|h:hostname|p:priority|t:alert_type|#tag1,tag2.
```

Here we need to calculate the size of the event's title and body.

On Linux:

```
vagrant@vagrant-ubuntu-14-04:~$ title="Event from the shell"
vagrant@vagrant-ubuntu-14-04:~$ text="This was sent from Bash!"
vagrant@vagrant-ubuntu-14-04:~$ echo "_e{${#title},${#text}}:$title|$text|#shell,bash"  >/dev/udp/localhost/8125
```

On Windows:

```
PS C:\vagrant> $title = "Event from the shell"
PS C:\vagrant> $text = "This was sent from Powershell!"
PS C:\vagrant> .\send-statsd.ps1 "_e{$($title.length),$($text.Length)}:$title|$text|#shell,powershell"
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics/#naming-metrics
[2]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.ps1
