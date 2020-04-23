---
title: Sending large volumes of metrics
kind: documentation
description: 'Optimizing DogStatsD for high throughput'
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

DogStatsD works by sending metrics generated from your application to the [Agent][1] over a transport protocol. This protocol can be UDP (User Datagram Protocol) or [UDS (Unix Domain Socket)][2].

When DogStatsD is used to send a large volume of metrics to a single Agent, if proper measures are not taken, it is common to end up with the following symptoms:

- High Agent CPU usage
- Dropped datagrams / metrics
- The DogStatsD client library (UDS) returning errors

Most of the time the symptoms can be alleviated by tweaking some configuration options described below.

## General tips

### Enable buffering on your client

Some StatsD and DogStatsD clients, by default, send one metric per datagram. This adds considerable overhead on the client, the operating system, and the Agent. If your client supports buffering multiple metrics in one datagram, enabling this option brings noticeable improvements.

Here are a few examples for [official DogStatsD supported clients][3]:

{{< tabs >}}
{{% tab "Go" %}}

By using Datadog's official Golang library [datadog-go][1], the example below creates a buffered DogStatsD client instance with `256` maximum buffered metrics which means that all metrics sent from this instance of the client are buffered and sent in packets containing a maximum of `256` metrics:

```go
package main

import (
	"log"
	"github.com/DataDog/datadog-go/statsd"
)

func main() {

  statsd, err := statsd.New("127.0.0.1:8125",
                 statsd.Buffered(),
                 statsd.WithMaxMessagesPerPayload(256),
                )
	if err != nil {
    		log.Fatal(err)
	}

  statsd.Gauge("example_metric.gauge", 1, []string{"env:dev"}, 1)
}
```


[1]: https://github.com/DataDog/datadog-go
{{% /tab %}}

{{% tab "Python" %}}

By using Datadog's official Python library [datadogpy][1], the example below creates a buffered DogStatsD client instance that sends up to 25 metrics in one packet when the block completes:

```python
from datadog import DogStatsd

with DogStatsd(host="127.0.0.1", port=8125, max_buffer_size=25) as batch:
    batch.gauge('example_metric.gauge_1', 123, tags=["environment:dev"])
    batch.gauge('example_metric.gauge_2', 1001, tags=["environment:dev"])
```


[1]: https://github.com/DataDog/datadogpy
{{% /tab %}}

{{% tab "Ruby" %}}

By using Datadog's official Ruby library [dogstatsd-ruby][1], the example below creates a buffered DogStatsD client instance that sends metrics in one packet when the block completes:

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('127.0.0.1', 8125)

statsd.batch do |s|
  s.increment('example_metric.increment', tags: ['environment:dev'])
  s.gauge('example_metric.gauge', 123, tags: ['environment:dev'])
end
```


[1]: https://github.com/DataDog/dogstatsd-ruby
{{% /tab %}}

{{% tab "Java" %}}

By using Datadog's official Java library [java-dogstatsd-client][1], the example below creates a buffered DogStatsD client instance with `256` maximum buffered metrics which means that all metrics sent from this instance of the client are buffered and sent in packets containing a maximum of `256` metrics:

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("namespace", "127.0.0.1", 8125, 256);

        Statsd.incrementCounter("example_metric.increment", ["environment:dev"]);
        Statsd.recordGaugeValue("example_metric.gauge", 100, ["environment:dev"]);
    }
}
```


[1]: https://github.com/DataDog/java-dogstatsd-client
{{% /tab %}}
{{% tab ".NET" %}}
By using Datadog's official C# library [dogstatsd-csharp-client][1], the example below creates a DogStatsD client with UDP as transport:

```csharp
using StatsdClient;

public class DogStatsdClient
{
    public static void Main()
    {
      StatsdUDP udp = new StatsdUDP("127.0.0.1", 8125);

      // Create a stats instance with "udp" as transport
      Statsd s = new Statsd(udp);
      s.Add<Statsd.Counting,int>("example_metric.count", 1, tags: new[] {"environment:dev"});
      s.Add("event title", "content", priority: "low");
      s.Add<Statsd.Counting,int>("example_metric.count", 1, tags: new[] {"environment:dev"});

      // All metrics buffered before this call will be sent in one packet
      s.Send();
    }
}
```


[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{% /tab %}}
{{% tab "PHP" %}}

By using Datadog's official PHP library [php-datadogstatsd][1], the example below creates a buffered DogStatsD client instance that sends metrics in one packet when the block completes:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

  use DataDog\BatchedDogStatsd;

$client = new BatchedDogStatsd(
  array('host' => '127.0.0.1',
          'port' => 8125,
     )
);

$client->increment('example_metric.increment', array('environment'=>'dev'));
$client->increment('example_metric.increment', $sampleRate->0.5 , array('environment'=>'dev'));
```


[1]: https://github.com/DataDog/php-datadogstatsd
{{% /tab %}}
{{< /tabs >}}

### Sample your metrics

It is possible to reduce the traffic from your DogStatsD client to the Agent by setting a sample rate value for your client. For example, a sample rate of `0.5` halves the number of UDP packets sent. This solution is a trade-off: you decrease traffic but slightly lose in precision and granularity.

For more information and code examples, see [DogStatsD "Sample Rate" Parameter Explained][4].

### Use DogStatsD over UDS (Unix Domain Socket)

UDS is an inter-process communication protocol used to [transport DogStatsD payloads][2]. It has very little overhead when compared to UDP and lowers the general footprint of DogStatsD on your system.

## Operating System kernel buffers

Most operating systems add incoming UDP and UDS datagrams containing your metrics to a buffer with a maximum size. Once the max is reached, datagrams containing your metrics start getting dropped. It is possible to adjust the values to give the Agent more time to process incoming metrics:

### Over UDP (User Datagram Protocol)

#### Linux

On most Linux distributions, the maximum size of the kernel buffer is set to `212992` by default (208 KiB). This can be confirmed using the following commands:

```bash
$ sysctl net.core.rmem_max
net.core.rmem_max = 212992
```

To set the maximum size of the DogStatsD socket buffer to 25MiB run:

```bash
sysctl -w net.core.rmem_max=26214400
```

Add the following configuration to `/etc/sysctl.conf` to make this change permanent:

```conf
net.core.rmem_max = 26214400
```

Then set the Agent `dogstatsd_so_rcvbuf` configuration option to the same number in `datadog.yaml`:

```yaml
dogstatsd_so_rcvbuf: 26214400
```

### Over UDS (Unix Domain Socket)

#### Linux

Some Linux distributions have a kernel datagram queue size which can be low. This can be confirmed using the following command:

```bash
sysctl net.unix.max_dgram_qlen
```

If the value is < 512, you can increase it to 512 or more using this command:

```bash
sysctl -w net.unix.max_dgram_qlen=512
```

Add the following configuration to `/etc/sysctl.conf` to make this change permanent:

```conf
net.unix.max_dgram_qlen = 512
```

In the same manner, the `net.core.wmem_max` could be incremented to 25MiB to improve
client writing performances:

```conf
net.core.wmem_max = 26214400
```

## Configuration optimization guide

Dogstatsd has several configuration fields for which the default values may not be
the more optimized values at a very high throughput.

Note that their most efficient configuration could also be different depending
on the protocol used (UDS or UDP).

Here's a list of different configuration profile that could be considered in a
very high throughput setup.

### Limit the CPU usage

Dogstatsd has to process all the metrics sent by the client but must also take care
of not using all the resources of the host, especially the CPU.

The Dogstatsd pipeline is not executed every time a metric is received, the server has
buffering in different places in order to process metrics in batches, decreasing the
CPU usage. By tuning these buffers and their flush frequency, you can most of the time
observe an improvement in the CPU usage, but more memory will be needed by these buffers.

Because the Dogstatsd server is using the Agent aggregator, the aggregator's buffer must
be larger as well.

For instance, here how you can increase the buffer sizes:

```yaml
dogstatsd_packet_buffer_size: 256
dogstatsd_queue_size: 8192
aggregator_buffer_size: 1000
```

and how to flush at a lower frequency:

```yaml
dogstatsd_packet_buffer_flush_timeout: 1s
```

With UDS, a way to improve the CPU usage is to send the packets with a size of 8kb. For
instance on a Dogstatsd server receiving 500k metrics per second, we can observe an
improvement of -30% CPU usage by switching from clients sending 1.5kb packets to clients
sending 8kb packets with the configuration above used for the server.

Note that as a side-effect, increasing the buffers size could decrease the amount of drops
with UDP because Dogstatsd will have more place in memory to store data to process.

### Limit the maximum memory usage

Dogstatsd tries to absorb burst of metrics sent by a client but in order to do so,
it needs to shortly allocate a big amount of memory. This memory is quicky released
to the OS but a spike of memory usage happens and that could be an issue in containerized
environments where limit on memory usage could evict pods or containers.

In order to avoid this, limiting the buffering in Dogstatsd will help not reaching
this memory usage limit.

The default configuration `dogstatsd_queue_size: 1024` has an approximate maximum memory usage of 768MB.

Reducing the `dogstatsd_queue_size` value, you can limit the Dogstatsd max memory usage. Here's an example
decreasing the max memory usage of Dogstatsd to approximately 384MB:

```yaml
dogstatsd_queue_size: 512
```

### Limit the amount of packet drops

Most of time encountered while using UDP and because Dogstatsd is trying to not use all the
resources of the host, packet drops can appear on very high throughput for different reasons,
two of them being:

* the OS kernel dropping packets because its default configuration is not optimized for this situation
* Dogstatsd not processing fast enough all the metrics because it tries not to use all the CPU

For the former, please refer to the [Operating System kernel buffer](#operating-system-kernel-buffers)
section in order to optimize the host configuration.

For the latter, it is possible to tune Dogstatsd to stress its pipeline and greatly reduce the amount
of drops.

Here is a configuration using smaller buffers, meaning that they are flushed way more often. This configuration
is reducing the number of drops but may increase the CPU usage (by a few % during our tests):

```yaml
dogstatsd_packet_buffer_size: 8
dogstatsd_queue_size: 512
dogstatsd_packet_buffer_flush_timeout: 5ms
aggregator_buffer_size: 10
```

## Client side telemetry

Dogstatsd clients send telemetry metrics by default to the Agent. This allows
you to better troubleshoot where bottleneck exists. Each metric will be
tagged with the client language and the client version. These metrics will not be
counted as custom metrics and will not be billed.

Each client shares a set of common tags.

| Tag                | Description                                    | Example                |
| ------------------ | ---------------------------------------------- | ---------------------- |
| `client`           | The language of the client                     | `client:py`            |
| `client_version`   | The version of the client                      | `client_version:1.2.3` |
| `client_transport` | The transport byte the client (`udp` or `uds`) | `client_transport:uds` |

**Note**: When using UDP, network errors can't be detected by the client
and the corresponding metrics will not reflect bytes/packets drop.

{{< tabs >}}
{{% tab "Python" %}}

Starting with version `0.34.0` of the Python client.

| Metrics Name                               | Metric Type | Description                                                                             |
| ------------------------------------------ | ----------- | --------------------------------------------------------------------------------------- |
| `datadog.dogstatsd.client.metrics`         | count       | Number of `metrics` sent to the DogStatsD client by your application (before sampling). |
| `datadog.dogstatsd.client.events`          | count       | Number of `events` sent to the DogStatsD client by your application.                    |
| `datadog.dogstatsd.client.service_checks`  | count       | Number of `service_checks` sent to the DogStatsD client by your application.            |
| `datadog.dogstatsd.client.bytes_sent`      | count       | Number of bytes successfully sent to the Agent.                                         |
| `datadog.dogstatsd.client.bytes_dropped`   | count       | Number of bytes dropped by the DogStatsD client.                                        |
| `datadog.dogstatsd.client.packets_sent`    | count       | Number of datagrams successfully sent to the Agent.                                     |
| `datadog.dogstatsd.client.packets_dropped` | count       | Number of datagrams dropped by the DogStatsD client.                                    |

To disable telemetry, use the `disable_telemetry` method:

```python
statsd.disable_telemetry()
```

See [DataDog/datadogpy][1] for more information about the client configuration.


[1]: https://github.com/DataDog/datadogpy
{{% /tab %}}
{{% tab "Ruby" %}}

Starting with version `4.6.0` of the Ruby client.

| Metrics Name                               | Metric Type | Description                                                                             |
| ------------------------------------------ | ----------- | --------------------------------------------------------------------------------------- |
| `datadog.dogstatsd.client.metrics`         | count       | Number of `metrics` sent to the DogStatsD client by your application (before sampling). |
| `datadog.dogstatsd.client.events`          | count       | Number of `events` sent to the DogStatsD client by your application.                    |
| `datadog.dogstatsd.client.service_checks`  | count       | Number of `service_checks` sent to the DogStatsD client by your application.            |
| `datadog.dogstatsd.client.bytes_sent`      | count       | Number of bytes successfully sent to the Agent.                                         |
| `datadog.dogstatsd.client.bytes_dropped`   | count       | Number of bytes dropped by the DogStatsD client.                                        |
| `datadog.dogstatsd.client.packets_sent`    | count       | Number of datagrams successfully sent to the Agent.                                     |
| `datadog.dogstatsd.client.packets_dropped` | count       | Number of datagrams dropped by the DogStatsD client.                                    |

To disable telemetry, set the `disable_telemetry` parameter to `true`:

```ruby
Datadog::Statsd.new('localhost', 8125, disable_telemetry: true)
```

See [DataDog/dogstatsd-ruby][1] for more information about the client configuration.


[1]: https://github.com/DataDog/dogstatsd-ruby
{{% /tab %}}
{{% tab "Go" %}}

Starting with version `3.4.0` of the Go client.

| Metric name                                       | Metric Type | Description                                                                             |
| ------------------------------------------------- | ----------- | --------------------------------------------------------------------------------------- |
| `datadog.dogstatsd.client.metrics`                | count       | Number of `metrics` sent to the DogStatsD client by your application (before sampling). |
| `datadog.dogstatsd.client.events`                 | count       | Number of `events` sent to the DogStatsD client by your application.                    |
| `datadog.dogstatsd.client.service_checks`         | count       | Number of `service_checks` sent to the DogStatsD client by your application.            |
| `datadog.dogstatsd.client.bytes_sent`             | count       | Number of bytes successfully sent to the Agent.                                         |
| `datadog.dogstatsd.client.bytes_dropped`          | count       | Number of bytes dropped by the DogStatsD client.                                        |
| `datadog.dogstatsd.client.bytes_dropped_queue`    | count       | Number of bytes dropped because the DogStatsD client queue was full.                    |
| `datadog.dogstatsd.client.bytes_dropped_writer`   | count       | Number of bytes dropped because of an error while writing to Datadog.                   |
| `datadog.dogstatsd.client.packets_sent`           | count       | Number of datagrams successfully sent to the Agent.                                     |
| `datadog.dogstatsd.client.packets_dropped`        | count       | Number of datagrams dropped by the DogStatsD client.                                    |
| `datadog.dogstatsd.client.packets_dropped_queue`  | count       | Number of datagrams dropped because the DogStatsD client queue was full.                |
| `datadog.dogstatsd.client.packets_dropped_writer` | count       | Number of datagrams dropped because of an error while writing to Datadog.               |

To disable telemetry, use the `WithoutTelemetry` setting:

```go
statsd, err: = statsd.New("127.0.0.1:8125", statsd.WithoutTelemetry())
```

See [DataDog/datadog-go][1] for more information about the client configuration.


[1]: https://github.com/DataDog/datadog-go
{{% /tab %}}
{{% tab "Java" %}}

Telemetry will soon be added to the Java client.

{{% /tab %}}
{{% tab "PHP" %}}

Telemetry will soon be added to the PHP client.

{{% /tab %}}
{{% tab ".NET" %}}

Telemetry will soon be added to the .NET client.

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent
[2]: /developers/dogstatsd/unix_socket
[3]: /developers/dogstatsd/#code
[4]: /developers/metrics/dogstatsd_metrics_submission/#sample-rates
