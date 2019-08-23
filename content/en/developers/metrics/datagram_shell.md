---
title: Datagram Format and Shell Usage
kind: documentation
description: Overview of the datagram format used by DogStatsD as well as (advanced) shell usage.
aliases:
- /developers/dogstatsd/datagram_shell
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

This section specifies the raw datagram format for metrics that DogStatsD accepts. This isn't required reading if you're using any of [the DogStatsD client libraries][1]; however, if you want to write your own library, or use the shell to send metrics, then read on.

## Metrics Datagram Format

`<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`

| Parameter                           | Required   | Description                                                                                                                                                          |
| ---------------                     | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `<METRIC_NAME>`                     | Yes        | a string with no colons, bars, or @ characters. See the [metric naming policy][2].                                                                                   |
| `<VALUE>`                           | Yes        | an integer or float.                                                                                                                                                 |
| `<TYPE>`                            | Yes        | `c` for counter, `g` for gauge, `ms` for timer, `h` for histogram, `s` for set.                                                                                      |
| `<SAMPLE_RATE>`                     | No         | a float between 0 and 1, inclusive. Only works with counter, histogram, and timer metrics. Default is 1 (i.e. sample 100% of the time).                              |
| `<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>` | No         | a comma separated list of tags. Use colons for key/value tags, i.e. `env:prod`. The key `device` is reserved; Datadog drops a user-added tag like `device:foobar`.   |

Here are some example datagrams:

| Datagram | Description |
| `page.views:1|c` | Increment the page.views counter. |
|`fuel.level:0.5|g` |Record the fuel tank is half-empty. |
| `song.length:240|h|@0.5` | Sample the song length histogram half of the time. |
| `users.uniques:1234|s` | Track a unique visitor to the site. |
| `users.online:1|c|#country:china` | Increment the active users counter, tag by country of origin. |
| `users.online:1|c|@0.5|#country:china` | Track active China users and use a sample rate. |

## Send metrics using DogStatsD and the shell

For Linux and other Unix-like OS, use Bash. For Windows, you need PowerShell and [PowerShell-statsd][3] (a simple PowerShell function that takes care of the network bits). The idea behind DogStatsD is: create a message that contains information about your metric, and send it to a collector over UDP on port `8125`.

The format for sending metrics is `<METRIC_NAME>:<VALUE>|<TYPE>|@<SAMPLE_RATE>|#<TAG_KEY_1>:<TAG_VALUE_1>,<TAG_2>`, to send datapoints for a gauge metric called `custom_metric` with the shell tag. Using a locally installed Agent as a collector, the destination IP address is `127.0.0.1`.

Linux options:

```shell
$ echo -n "custom_metric:60|g|#shell" >/dev/udp/localhost/8125
```

```shell
$ echo -n "custom_metric:60|g|#shell" | nc -4u -w0 127.0.0.1 8125
```

```shell
$ echo -n "custom.metric.name:1|c"|nc -4u -w1 localhost 8125
```

Windows options:

```
PS C:\> .\send-statsd.ps1 "custom_metric:123|g|#shell"
```

On any platform with Python (on Windows, the Agent's embedded Python interpreter can be used, which is located at `C:\Program Files\Datadog\Datadog Agent\embedded\python.exe` for Agent versions <= 6.11 and in `C:\Program Files\Datadog\Datadog Agent\embedded2\python.exe` for Agent versions >= 6.12):

```python
import socket
sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM) # UDP
sock.sendto("custom_metric:60|g|#shell", ("localhost", 8125))
```

To send metrics on containerized environments, refer to the [DogStatsD on Kubernetes][4] documentation, in conjunction with the instructions for configuring APM on Kubernetes using [DaemonSets][5] or [Helm][6], depending on your installation. The [Docker APM][7] documentation may also be helpful.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/libraries/#api-and-dogstatsd-client-libraries
[2]: /developers/metrics/#naming-metrics
[3]: https://github.com/joehack3r/powershell-statsd/blob/master/send-statsd.
[4]: /agent/kubernetes/dogstatsd
[5]: /agent/kubernetes/daemonset_setup/#apm-and-distributed-tracing
[6]: /agent/kubernetes/helm/#enable-apm-and-distributed-tracing
[7]: /agent/docker/apm
