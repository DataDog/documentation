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
  tag: "GitHub"
  text: "DogStatsD source code"
---

This section specifies the raw datagram format for each data type that DogStatsD accepts. This isn't required reading if you're using any of [the DogStatsD client libraries][1]; however, if you want to write your own library, or use the shell to send metrics or events, then read on.

## Datagram Format

### Metrics

`<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| Parameter     | Required | Description                                                                                                                                                        |
|---------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `<METRIC_NAME>` | Yes      | a string with no colons, bars, or @ characters. See the [metric naming policy][2].                                                                                 |
| `<VALUE>`       | Yes      | an integer or float.                                                                                                                                               |
| `<TYPE>`        | Yes      | `c` for counter, `g` for gauge, `ms` for timer, `h` for histogram, `s` for set.                                                                                    |
| `<SAMPLE_RATE>` | No       | a float between 0 and 1, inclusive. Only works with counter, histogram, and timer metrics. Default is 1 (i.e. sample 100% of the time).                            |
| `<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`        | No       | a comma separated list of tags. Use colons for key/value tags, i.e. `env:prod`. The key `device` is reserved; Datadog drops a user-added tag like `device:foobar`. |

Here are some example datagrams:

```
## Increment the page.views counter
page.views:1|c

## Record the fuel tank is half-empty
fuel.level:0.5|g

## Sample the song length histogram half of the time
song.length:240|h|@0.5

## Track a unique visitor to the site
users.uniques:1234|s

## Increment the active users counter, tag by country of origin
users.online:1|c|#country:china

## Track active China users and use a sample rate
users.online:1|c|@0.5|#country:china
```

### Events

`_e{<TITLE>.length,<TEXT>.length}:<TITLE>|<TEXT>|d:<TIMESTAMP>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| Parameter                          | Required | Description                                                                                                            |
|------------------------------------|----------|------------------------------------------------------------------------------------------------------------------------|
| `_e`                               | Yes      | The datagram must begin with `_e`                                                                                      |
| `<TITLE>`                            | Yes      | Event title.                                                                                                           |
| `<TEXT>`                             | Yes      | Event text. Insert line breaks with an escaped slash (`\\n`)                                                           |
| `d:<TIMESTAMP>`                      | No       | Add a timestamp to the event. Default is the current Unix epoch timestamp.                                             |
| `h:<HOSTNAME>`                       | No       | Add a hostname to the event. No default.                                                                               |
| `k:aggregation_key`                | No       | Add an aggregation key to group the event with others that have the same key. No default.                              |
| `p:<PRIORITY>`                       | No       | Set to 'normal' or 'low'. Default 'normal'.                                                                            |
| `s:source_type_name`               | No       | Add a source type to the event. No default.                                                                            |
| `t:<ALERT_TYPE>`                     | No       | Set to 'error', 'warning', 'info' or 'success'. Default 'info'.                                                        |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | No       | The colon in tags is part of the tag list string and has no parsing purpose like for the other parameters. No default. |

Here are some example datagrams:

```
## Send an exception
_e{21,36}:An exception occurred|Cannot parse CSV file from 10.0.0.17|t:warning|#err_type:bad_file

## Send an event with a newline in the text
_e{21,42}:An exception occurred|Cannot parse JSON request:\\n{"foo: "bar"}|p:low|#err_type:bad_request
```

### Service Checks

`_sc|<NAME>|<STATUS>|d:<TIMESTAMP>|h:<HOSTNAME>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|m:<SERVICE_CHECK_MESSAGE>`

| Parameter                           | Required | Description                                                                                                                                  |
|-------------------------------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------|
| `_sc`                               | Yes      | the datagram must begin with `_sc`                                                                                                           |
| `<NAME>`                              | Yes      | Service check name.                                                                                                                          |
| `<STATUS>`                            | Yes      | Integer corresponding to the check status (OK = 0, WARNING = 1, CRITICAL = 2, UNKNOWN = 3).                                                  |
| `d:<TIMESTAMP>`                       | No       | Add a timestamp to the check. Default is the current Unix epoch timestamp.                                                                   |
| `h:<HOSTNAME>`                        | No       | Add a hostname to the event. No default.                                                                                                     |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | No       | The colon in tags is part of the tag list string and has no parsing purpose like for the other parameters. No default.                       |
| `m:<SERVICE_CHECK_MESSAGE>`           | No       | Add a message describing the current state of the service check. *This field MUST be positioned last among the metadata fields.* No default. |

Here's an example datagram:

```
# Send a CRITICAL status for a remote connection
_sc|Redis connection|2|#redis_instance:10.0.0.16:6379|m:Redis connection timed out after 10s
```

## Send metrics and events using DogStatsD and the shell

For Linux and other Unix-like OS, use Bash.
For Windows, you need Powershell and [powershell-statsd][3] (a simple Powershell function that takes care of the network bits).

The idea behind DogStatsD is: create a message that contains information about your metric/event, and send it to a collector over UDP on port 8125. [Read more about the message format](#datagram-format).

### Sending metrics

The format for sending metrics is `<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`, to send datapoints for a gauge metric called `custom_metric` with the shell tag. Using a locally installed Agent as a collector, the destination IP address is `127.0.0.1`.

Linux options:

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom_metric:60|g|#shell" | nc -4u -w0 127.0.0.1 8125
```

```
vagrant@vagrant-ubuntu-14-04:~$ echo -n "custom.metric.name:1|c"|nc -4u -w1 localhost 8125
```

Windows options:

```
PS C:\vagrant> .\send-statsd.ps1 "custom_metric:123|g|#shell"
PS C:\vagrant>
```

On any platform with Python (on Windows, the Agent's embedded Python interpreter can be used, which is located at `%PROGRAMFILES%\Datadog\Datadog Agent\embedded\python.exe` for Agent versions <= 6.11 and in `%PROGRAMFILES%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe` for Agent versions >= 6.12):

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

To send metrics on containerized environments, refer to the [DogStatsD on Kubernetes][4] documentation, in conjunction with the instructions for configuring APM on Kubernetes using [DaemonSets][5] or [Helm][6], depending on your installation. The [Docker APM][7] documentation may also be helpful.

### Sending events

The format for sending events is:

```
_e{<TITLE>.length,<TEXT>.length}:<TITLE>|<TEXT>|d:<DATE_EVENT>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>.
```

Here, calculate the size of the event's title and body:

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

[1]: /developers/libraries/#api-and-dogstatsd-client-libraries
[2]: /developers/metrics/#naming-metrics
[3]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.
[4]: /agent/kubernetes/dogstatsd
[5]: /agent/kubernetes/daemonset_setup/#apm-and-distributed-tracing
[6]: /agent/kubernetes/helm/#enable-apm-and-distributed-tracing
[7]: /agent/docker/apm
