---
title: Datagram Format and Shell Usage
kind: documentation
description: Overview of the datagram format used by DogStatsD as well as (advanced) shell usage.
aliases:
    - /developers/dogstatsd/data_types/
further_reading:
    - link: 'developers/dogstatsd'
      tag: 'Documentation'
      text: 'Introduction to DogStatsD'
    - link: 'developers/libraries'
      tag: 'Documentation'
      text: 'Official and Community created API and DogStatsD client libraries'
    - link: 'https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd'
      tag: 'GitHub'
      text: 'DogStatsD source code'
---

This section specifies the raw datagram format for metrics, events, and service checks that DogStatsD accepts. This isn't required reading if you're using any of [the DogStatsD client libraries][1]; however, if you want to write your own library, or use the shell to send metrics, then read on.

{{< tabs >}}
{{% tab "Metrics" %}}

`<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| Parameter                           | Required | Description                                                                                                                                      |
| ----------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `<METRIC_NAME>`                     | Yes      | A string that contains only ASCII alphanumerics, underscores, and periods. See the [metric naming policy][1].                                    |
| `<VALUE>`                           | Yes      | An integer or float.                                                                                                                             |
| `<TYPE>`                            | Yes      | `c` for COUNT, `g` for GAUGE, `ms` for TIMER, `h` for HISTOGRAM, `s` for SET, `d` for DISTRIBUTION. See the [metric type documentation][2].      |
| `<SAMPLE_RATE>`                     | No       | A float between `0` and `1`, inclusive. Only works with COUNT, HISTOGRAM, and TIMER metrics. The default is `1`, which samples 100% of the time. |
| `<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | No       | A comma separated list of strings. Use colons for key/value tags (`env:prod`). See the [tagging documentation][3] for guidance on defining tags. |

Here are some example datagrams:

- `page.views:1|c` : Increment the `page.views` COUNT metric.
- `fuel.level:0.5|g`: Record the fuel tank is half-empty.
- `song.length:240|h|@0.5`: Sample the `song.length` histogram half of the time.
- `users.uniques:1234|s`: Track unique visitors to the site.
- `users.online:1|c|#country:china`: Increment the active users COUNT metric and tag by country of origin.
- `users.online:1|c|@0.5|#country:china`: Track active China users and use a sample rate.


[1]: /developers/metrics/#naming-metrics
[2]: /developers/metrics/types/
[3]: /getting_started/tagging/
{{% /tab %}}
{{% tab "Events" %}}

`_e{<TITLE>.length,<TEXT>.length}:<TITLE>|<TEXT>|d:<TIMESTAMP>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| Parameter                            | Required | Description                                                                                                            |
| ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `_e`                                 | Yes      | The datagram must begin with `_e`.                                                                                     |
| `<TITLE>`                            | Yes      | The event title.                                                                                                       |
| `<TEXT>`                             | Yes      | The event text. Insert line breaks with: `\\n`.                                                                        |
| `d:<TIMESTAMP>`                      | No       | Add a timestamp to the event. The default is the current Unix epoch timestamp.                                         |
| `h:<HOSTNAME>`                       | No       | Add a hostname to the event. No default.                                                                               |
| `k:<AGGREGATION_KEY>`                | No       | Add an aggregation key to group the event with others that have the same key. No default.                              |
| `p:<PRIORITY>`                       | No       | Set to `normal` or `low`. Default `normal`.                                                                            |
| `s:<SOURCE_TYPE_NAME>`               | No       | Add a source type to the event. No default.                                                                            |
| `t:<ALERT_TYPE>`                     | No       | Set to `error`, `warning`, `info` or `success`. Default `info`.                                                        |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | No       | The colon in tags is part of the tag list string and has no parsing purpose like for the other parameters. No default. |

Here are some example datagrams:

```text
## Send an exception
_e{21,36}:An exception occurred|Cannot parse CSV file from 10.0.0.17|t:warning|#err_type:bad_file

## Send an event with a newline in the text
_e{21,42}:An exception occurred|Cannot parse JSON request:\\n{"foo: "bar"}|p:low|#err_type:bad_request
```

{{% /tab %}}
{{% tab "Service Checks" %}}

`_sc|<NAME>|<STATUS>|d:<TIMESTAMP>|h:<HOSTNAME>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|m:<SERVICE_CHECK_MESSAGE>`

| Parameter                            | Required | Description                                                                                                                             |
| ------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `_sc`                                | Yes      | The datagram must begin with `_sc`.                                                                                                     |
| `<NAME>`                             | Yes      | The service check name.                                                                                                                 |
| `<STATUS>`                           | Yes      | An integer corresponding to the check status (OK = `0`, WARNING = `1`, CRITICAL = `2`, UNKNOWN = `3`).                                  |
| `d:<TIMESTAMP>`                      | No       | Add a timestamp to the check. The default is the current Unix epoch timestamp.                                                          |
| `h:<HOSTNAME>`                       | No       | Add a hostname to the event (no default).                                                                                               |
| `#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | No       | Set the tags of the event. A list of strings separated by comma (no default).                                                           |
| `m:<SERVICE_CHECK_MESSAGE>`          | No       | A message describing the current state of the service check. This field MUST be positioned last among the metadata fields (no default). |

Here's an example datagram:

```text
# Send a CRITICAL status for a remote connection
_sc|Redis connection|2|#env:dev|m:Redis connection timed out after 10s
```

{{% /tab %}}
{{< /tabs >}}

## Send metrics using DogStatsD and the shell

For Linux and other Unix-like OS, use Bash. For Windows, use PowerShell and [PowerShell-statsd][2] (a simple PowerShell function that takes care of the network bits).

DogStatsD creates a message that contains information about your metric, event, or service check and sends it to a locally installed Agent as a collector. The destination IP address is `127.0.0.1` and the collector port over UDP is `8125`. Refer to the [main DogStatsD documentation][3] to learn how to configure the Agent.

{{< tabs >}}
{{% tab "Metrics" %}}

The format for sending metrics is:

```text
<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>
```

The examples below send data points for a gauge metric called `custom_metric` with the `shell` tag.

On Linux:

```shell
echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

```shell
echo -n "custom_metric:60|g|#shell" | nc -4u -w0 127.0.0.1 8125
```

```shell
echo -n "custom.metric.name:1|c"|nc -4u -w1 localhost 8125
```

On Windows:

```powershell
PS C:\> .\send-statsd.ps1 "custom_metric:123|g|#shell"
```

On any platform with Python (on Windows, the Agent's embedded Python interpreter can be used, which is located at `%PROGRAMFILES%\Datadog\Datadog Agent\embedded\python.exe` for Agent versions <= 6.11 and in `%PROGRAMFILES%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe` for Agent versions >= 6.12):

### Python 2

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

### Python 3

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto(b"custom_metric:60|g|#shell", ("localhost", 8125))
```

{{% /tab %}}
{{% tab "Events" %}}

The format for sending events is:

```text
_e{<TITLE>.length,<TEXT>.length}:<TITLE>|<TEXT>|d:<DATE_EVENT>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>.
```

The examples below calculate the size of the event's title and body.

On Linux:

```shell
$ title="Event from the shell"

$ text="This was sent from Bash!"

$ echo "_e{${#title},${#text}}:$title|$text|#shell,bash"  >/dev/udp/localhost/8125
```

On Windows:

```powershell
PS C:> $title = "Event from the shell"
PS C:> $text = "This was sent from PowerShell!"
PS C:> .\send-statsd.ps1 "_e{$($title.length),$($text.Length)}:$title|$text|#shell,PowerShell"
```

{{% /tab %}}
{{% tab "Service Checks" %}}

The format for sending service checks is:

```text
_sc|<NAME>|<STATUS>|d:<TIMESTAMP>|h:<HOSTNAME>|#<TAG_KEY_1>:<TAG_VALUE_1>|m:<SERVICE_CHECK_MESSAGE>
```

On Linux:

```shell
echo -n "_sc|Redis connection|2|#env:dev|m:Redis connection timed out after 10s" >/dev/udp/localhost/8125
```

On Windows:

```powershell
PS C:\> .\send-statsd.ps1 "_sc|Redis connection|2|#env:dev|m:Redis connection timed out after 10s"
```

{{% /tab %}}
{{< /tabs >}}

To send metrics, events, or service checks on containerized environments, refer to the [DogStatsD on Kubernetes][3] documentation, in conjunction with the instructions for [configuring APM on Kubernetes][4], depending on your installation. The [Docker APM][5] documentation may also be helpful.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/community/libraries/#api-and-dogstatsd-client-libraries
[2]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.ps1
[3]: /developers/dogstatsd/
[4]: /agent/kubernetes/apm/
[5]: /agent/docker/apm/
