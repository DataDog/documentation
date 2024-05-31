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
---

This section specifies the raw datagram format for metrics, events, and service checks that DogStatsD accepts. The raw datagrams are encoded in UTF-8. This isn't required reading if you're using any of [the DogStatsD client libraries][1]; however, if you want to write your own library, or use the shell to send metrics, then read on.

## The DogStatsD protocol

{{< tabs >}}
{{% tab "Metrics" %}}

`<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| Parameter                           | Required | Description                                                                                                                                                    |
| ----------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<METRIC_NAME>`                     | Yes      | A string that contains only ASCII alphanumerics, underscores, and periods. See the [metric naming policy][101].                                                  |
| `<VALUE>`                           | Yes      | An integer or float.                                                                                                                                           |
| `<TYPE>`                            | Yes      | `c` for COUNT, `g` for GAUGE, `ms` for TIMER, `h` for HISTOGRAM, `s` for SET, `d` for DISTRIBUTION. See [Metric Types][102] for more details.                    |
| `<SAMPLE_RATE>`                     | No       | A float between `0` and `1`, inclusive. Only works with COUNT, HISTOGRAM, DISTRIBUTION, and TIMER metrics. The default is `1`, which samples 100% of the time. |
| `<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | No       | A comma separated list of strings. Use colons for key/value tags (`env:prod`). For guidance on defining tags, see [Getting Started with Tags][103].              |

Here are some example datagrams:

- `page.views:1|c` : Increment the `page.views` COUNT metric.
- `fuel.level:0.5|g`: Record the fuel tank is half-empty.
- `song.length:240|h|@0.5`: Sample the `song.length` histogram as if it was sent half of the time.
- `users.uniques:1234|s`: Track unique visitors to the site.
- `users.online:1|c|#country:china`: Increment the active users COUNT metric and tag by country of origin.
- `users.online:1|c|@0.5|#country:china`: Track active China users and use a sample rate.

### DogStatsD protocol v1.1

Starting with the Agent `>=v6.25.0` && `<v7.0.0` or `>=v7.25.0`, value packing is possible. This
is supported for all metric types except `SET`. Values are separated by a `:`, for example:

`<METRIC_NAME>:<VALUE1>:<VALUE2>:<VALUE3>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

`TYPE`, `SAMPLE_RATE`, and `TAGS` are shared between all values. This produces the same metrics than sending multiple
messages with one value in each. This is useful for HISTOGRAM, TIMING, and DISTRIBUTION metrics.

### Example datagrams

- `page.views:1:2:32|d`: Sample the `page.views` DISTRIBUTION metric three times with values `1`, `2` and `32`.
- `song.length:240:234|h|@0.5`: Sample the `song.length` histogram as if it was sent half of the time, twice. Each value has the sample rate of `0.5` applied to it.

### DogStatsD protocol v1.2

Starting with the Agent `>=v6.35.0` && `<v7.0.0` or `>=v7.35.0`, a new container ID field is supported.
The Datadog Agent uses the container ID value to enrich DogStatsD metrics with additional container tags.

The container ID is prefixed by `c:`, for example:

`<METRIC_NAME>:<VALUE>|<TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|c:<CONTAINER_ID>`

**Note:** Set `dogstatsd_origin_detection_client` to `true` in your `datadog.yaml` file or the environment variable `DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT=true` to instruct the Datadog Agent to extract the container ID field and attach the corresponding container tags.

### Example datagrams

- `page.views:1|g|#env:dev|c:83c0a99c0a54c0c187f461c7980e9b57f3f6a8b0c918c8d93df19a9de6f3fe1d`: The Datadog Agent adds container tags like `image_name` and `image_tag` to the `page.views` metric.

Read more about container tags in the [Kubernetes][104] and [Docker][105] tagging documentation.

### DogStatsD protocol v1.3

Agents v6.40.0+ and v7.40.0+ support an optional Unix timestamp field.

When this field is provided, the Datadog Agent doesn't do any processing with the metrics (no aggregation) except from enriching the metrics with tags. This can be useful if you already aggregate your metrics in your application, and you want to send them to Datadog without extra processing.

The Unix timestamp should be a valid positive number in the past. Only GAUGE and COUNT metrics are supported.

The value is a Unix timestamp (UTC) and must be prefixed by `T`, for example:

`<METRIC_NAME>:<VALUE>|<TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>|T<METRIC_TIMESTAMP>`

### Example datagram

- `page.views:15|c|#env:dev|T1656581400`: A COUNT indicating that 15 page views happened on the 30th of June, 2022 at 9:30am UTC

[101]: /metrics/#metric-name
[102]: /metrics/types/
[103]: /getting_started/tagging/
[104]: /containers/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[105]: /containers/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
{{% /tab %}}
{{% tab "Events" %}}

`_e{<TITLE_UTF8_LENGTH>,<TEXT_UTF8_LENGTH>}:<TITLE>|<TEXT>|d:<TIMESTAMP>|h:<HOSTNAME>|p:<PRIORITY>|t:<ALERT_TYPE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| Parameter                            | Required | Description                                                                                                            |
| ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `_e`                                 | Yes      | The datagram must begin with `_e`.                                                                                     |
| `<TITLE>`                            | Yes      | The event title.                                                                                                       |
| `<TEXT>`                             | Yes      | The event text. Insert line breaks with: `\\n`.                                                                        |
| `<TITLE_UTF8_LENGTH>`                | Yes      | The length (in bytes) of the UTF-8-encoded `<TITLE>`                                                                              |
| `<TEXT_UTF8_LENGTH>`                 | Yes      | The length (in bytes) of the UTF-8-encoded `<TEXT>`                                                                               |
| `d:<TIMESTAMP>`                      | No       | Add a timestamp to the event. The default is the current Unix epoch timestamp.                                         |
| `h:<HOSTNAME>`                       | No       | Add a hostname to the event. Defaults to the Datadog Agent instance.                                                                               |
| `k:<AGGREGATION_KEY>`                | No       | Add an aggregation key to group the event with others that have the same key. No default.                              |
| `p:<PRIORITY>`                       | No       | Set to `normal` or `low`. Default `normal`.                                                                            |
| `s:<SOURCE_TYPE_NAME>`               | No       | Add a source type to the event. No default.                                                                            |
| `t:<ALERT_TYPE>`                     | No       | Set to `error`, `warning`, `info`, or `success`. Default `info`.                                                        |
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
| `m:<SERVICE_CHECK_MESSAGE>`          | No       | A message describing the current state of the service check. This field must be positioned last among the metadata fields (no default). |

Here's an example datagram:

```text
# Send a CRITICAL status for a remote connection
_sc|Redis connection|2|#env:dev|m:Redis connection timed out after 10s
```

{{% /tab %}}
{{< /tabs >}}

## Send metrics using DogStatsD and the shell

For Linux and other Unix-like OS, use Bash. For Windows, use PowerShell and [PowerShell-statsd][2] (a simple PowerShell function that takes care of the network bits).

DogStatsD creates a message that contains information about your metric, event, or service check and sends it to a locally installed Agent as a collector. The destination IP address is `127.0.0.1` and the collector port over UDP is `8125`. See [DogStatsD][3] for details on configuring the Agent.

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

On any platform with Python (on Windows, the Agent's embedded Python interpreter can be used, which is located at `%ProgramFiles%\Datadog\Datadog Agent\embedded\python.exe` for Agent versions <= 6.11 and in `%ProgramFiles%\Datadog\Datadog Agent\embedded<PYTHON_MAJOR_VERSION>\python.exe` for Agent versions >= 6.12):

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
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
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

To send metrics, events, or service checks on containerized environments, see [DogStatsD on Kubernetes][3], in conjunction with [configuring APM on Kubernetes][4], depending on your installation. The [Docker APM][5] documentation may also be helpful.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/community/libraries/#api-and-dogstatsd-client-libraries
[2]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.ps1
[3]: /developers/dogstatsd/
[4]: /agent/kubernetes/apm/
[5]: /agent/docker/apm/
