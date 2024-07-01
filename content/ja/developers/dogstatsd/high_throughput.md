---
title: Sending large volumes of metrics
kind: documentation
description: 'Optimizing DogStatsD for high throughput'
further_reading:
    - link: developers/dogstatsd
      tag: Documentation
      text: Introduction to DogStatsD
    - link: developers/libraries
      tag: Documentation
      text: Official and Community created API and DogStatsD client libraries
---

DogStatsD works by sending metrics generated from your application to the [Agent][1] over a transport protocol. This protocol can be UDP (User Datagram Protocol) or [UDS (Unix Domain Socket)][2].

When DogStatsD is used to send a large volume of metrics to a single Agent, if proper measures are not taken, it is common to end up with the following symptoms:

- High Agent CPU usage
- Dropped datagrams / metrics
- The DogStatsD client library (UDS) returning errors

Most of the time the symptoms can be alleviated by tweaking some configuration options described below.

## General tips

### Use Datadog official clients

Datadog recommends using the latest version of the [official DogStatsD clients][3] for every major programming language.

### Enable buffering on your client

Some StatsD and DogStatsD clients, by default, send one metric per datagram. This adds considerable overhead on the client, the operating system, and the Agent. If your client supports buffering multiple metrics in one datagram, enabling this option brings noticeable improvements.

<div class="alert alert-info">
  If you are using a community-supported DogStatsD client that supports buffering, make sure to configure a max datagram size that does not exceed the Agent-side per-datagram buffer size (8KB by default, configurable on the Agent with <code>dogstatsd_buffer_size</code>) and the network/OS max datagram size.
</div>

Here are a few examples for [official DogStatsD supported clients][3]:

{{< programming-lang-wrapper langs="go,python,ruby,java,.NET,PHP" >}}
{{< programming-lang lang="go" >}}

By default, Datadog's official Golang library [DataDog/datadog-go][1] uses buffering. The size of each packet and the number of messages use different default values for `UDS` and `UDP`. See [DataDog/datadog-go][1] for more information about the client configuration.

```go
package main

import (
        "log"
        "github.com/DataDog/datadog-go/v5/statsd"
)

func main() {
  // In this example, metrics are buffered by default with the correct default configuration for UDP.
  statsd, err := statsd.New("127.0.0.1:8125")
  if err != nil {
    log.Fatal(err)
  }

  statsd.Gauge("example_metric.gauge", 1, []string{"env:dev"}, 1)
}
```

[1]: https://github.com/DataDog/datadog-go
{{< /programming-lang >}}
{{< programming-lang lang="python" >}}

By using Datadog's official Python library [datadogpy][1], the example below uses a buffered DogStatsD client that sends metrics in a minimal number of packets. With buffering automatic flushing is performed at packet size limit and every 300ms (configurable).

```python
from datadog import DogStatsd


# If using client v0.43.0+
dsd = DogStatsd(host="127.0.0.1", port=8125, disable_buffering=False)
dsd.gauge('example_metric.gauge_1', 123, tags=["environment:dev"])
dsd.gauge('example_metric.gauge_2', 1001, tags=["environment:dev"])
dsd.flush()  # Optional manual flush

# If using client before v0.43.0, context manager is needed to use buffering
dsd = DogStatsd(host="127.0.0.1", port=8125)
with dsd:
    dsd.gauge('example_metric.gauge_1', 123, tags=["environment:dev"])
    dsd.gauge('example_metric.gauge_2', 1001, tags=["environment:dev"])
```

<div class="alert alert-warning">
  By default, Python DogStatsD client instances (including the <code>statsd</code> global instance) cannot be shared across processes but are thread-safe. Because of this, the parent process and each child process must create their own instances of the client or the buffering must be explicitly disabled by setting <code>disable_buffering</code> to <code>True</code>. See the documentation on <a href="https://datadogpy.readthedocs.io/en/latest/#datadog-dogstatsd">datadog.dogstatsd</a> for more details.
</div>


[1]: https://github.com/DataDog/datadogpy
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

By using Datadog's official Ruby library [dogstatsd-ruby][1], the example below creates a buffered DogStatsD client instance that sends metrics in one packet when the flush is triggered:

```ruby
require 'datadog/statsd'

statsd = Datadog::Statsd.new('127.0.0.1', 8125)

statsd.increment('example_metric.increment', tags: ['environment:dev'])
statsd.gauge('example_metric.gauge', 123, tags: ['environment:dev'])

# synchronous flush
statsd.flush(sync: true)
```

{{< /programming-lang >}}
{{< programming-lang lang="java" >}}


By using Datadog's official Java library [java-dogstatsd-client][1], the example below creates a buffered DogStatsD client instance with a maximum packet size of 1500 bytes, meaning all metrics sent from this instance of the client are buffered and sent in packets of `1500` packet-length at most:

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;
import java.util.Random;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("namespace").
            .hostname("127.0.0.1")
            .port(8125)
            .maxPacketSizeBytes(1500)
            .build();

        Statsd.incrementCounter("example_metric.increment", ["environment:dev"]);
        Statsd.recordGaugeValue("example_metric.gauge", 100, ["environment:dev"]);
    }
}
```


[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}
By using Datadog's official C# library [dogstatsd-csharp-client][1], the example below creates a DogStatsD client with UDP as transport:

```csharp
using StatsdClient;

public class DogStatsdClient
{
    public static void Main()
    {
        var dogstatsdConfig = new StatsdConfig
        {
            StatsdServerName = "127.0.0.1",
            StatsdPort = 8125,
        };

        using (var dogStatsdService = new DogStatsdService())
        {
            if (!dogStatsdService.Configure(dogstatsdConfig))
                throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");

            // Counter and Gauge are sent in the same datagram
            dogStatsdService.Counter("example_metric.count", 2, tags: new[] { "environment:dev" });
            dogStatsdService.Gauge("example_metric.gauge", 100, tags: new[] { "environment:dev" });
        }
    }
}
```


[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

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
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

### Sample your metrics

It is possible to reduce the traffic from your DogStatsD client to the Agent by setting a sample rate value for your client. For example, a sample rate of `0.5` halves the number of UDP packets sent. This solution is a trade-off: you decrease traffic but slightly lose in precision and granularity.

For more information and code examples, see [DogStatsD "Sample Rate" Parameter Explained][4].

### Use DogStatsD over UDS (Unix Domain Socket)

UDS is an inter-process communication protocol used to [transport DogStatsD payloads][2]. It has little overhead when compared to UDP and lowers the general footprint of DogStatsD on your system.

### Client-side aggregation

Client libraries can aggregate metrics on the client side, reducing number of messages that have to be submitted to the Datadog Agent, improving IO performance and throughput.

{{< programming-lang-wrapper langs="go,java,.NET" >}}
{{< programming-lang lang="go" >}}

Client-side aggregation is only available in the Go client starting with v5.0.0.

See [Client-side aggregation][1] for more information.

[1]: https://github.com/DataDog/datadog-go#client-side-aggregation
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Client-side aggregation is available in java-dogstatsd-client version 2.11.0 and later, and is enabled by default starting with version 3.0.0.

```java
StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
    // regular setup
    .enableAggregation(true)
    .build();
```

Client-side aggregation is available for gauges, counters and sets.

See [Client-side aggregation][1] for more information.

[1]: https://github.com/DataDog/java-dogstatsd-client#aggregation
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

Client-side aggregation is available in DogStatsD C# client v7.0.0+ and is enabled by default. Client-side aggregation is available for gauges, counters, and sets.

```csharp
var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
    ClientSideAggregation = new ClientSideAggregationConfig()
};
```


For more information, see the [DogStatsD for C# repository][1].

[1]: https://github.com/DataDog/dogstatsd-csharp-client#client-side-aggregation
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Run multiple metrics processing pipelines to limit packet drops

If your DogStatsD server uses UDS and is dropping packets at a high throughput, configuring the server to use more CPU may improve processing speed and decrease packet drops.

You may also configure your DogStatsD server if the client telemetry indicates packet drops and the server does not use more than 2 CPUs or 2 cores even if they are available.

To reduce the amount of packet drops:

1. Increase the client queue size to `8192`. For more information, see the client library configuration. You may see the amount of drops decrease, and your application may use more RAM.
2. Additionally, you can enable the `dogstatsd_pipeline_autoadjust: true` feature in your Datadog Agent configuration. The Agent uses multiple cores to process custom metrics, which may lead to higher CPU usage but lowers packet drops.

## Operating system kernel buffers

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

See the [Note on sysctl in Kubernetes][5] section if you are deploying the Agent or DogStatsD in Kubernetes.

### Over UDS (Unix Domain Socket)

#### Linux

For UDS sockets, Linux is internally buffering datagrams in a queue if the reader is slower than the writer. The size of this queue represents the maximum number of datagrams that Linux buffers per socket. This value can be queried with the following command:

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

In the same manner, the `net.core.wmem_max` could be incremented to 4MiB to improve
client writing performances:

```conf
net.core.wmem_max = 4194304
```

Then set the Agent `dogstatsd_so_rcvbuf` configuration option to the same number in `datadog.yaml`:

```yaml
dogstatsd_so_rcvbuf: 4194304
```

#### Note on sysctl in Kubernetes

If you are using Kubernetes to deploy the Agent and/or DogStatsD and you want to configure the sysctls as mentioned above, set their value per container. If the `net.*` sysctls is namespaced, you can set them per pod. See the Kubernetes documentation on [Using sysctls in a Kubernetes Cluster][6].

## Ensure proper packet sizes

Avoid extra CPU usage by sending packets with an adequate size to the DogStatsD server in the Datadog Agent. The latest versions of the official DogStatsD clients send packets with a size optimized for performance.

You can skip this section if you are using one of the latest Datadog DogStatsD clients.

If the packets sent are too small, the Datadog Agent packs several together to process them in batches later in the pipeline. The official DogStatsD clients are capable of grouping metrics to have the best ratio of the number of metrics per packet.

The Datadog Agent performs most optimally if the DogStatsD clients send packets the size of the `dogstatsd_buffer_size`. The packets must not be larger than the buffer size, otherwise, the Agent can't load them completely in the buffer without the metrics being malformed. Use the corresponding configuration field in your DogStatsD clients.

<div class="alert alert-info">
  <strong>Note for UDP</strong>: Because UDP packets usually go through the Ethernet and IP layer, you can avoid IP packets fragmentation by limiting the packet size to a value lower than a single Ethernet frame on your network. Most of the time, IPv4 networks are configured with a MTU of 1500 bytes, so in this situation the packet size of sent packets should be limited to 1472.
</div>

<div class="alert alert-info">
  <strong>Note for UDS</strong>: for the best performances, the UDS packet size should be 8192 bytes.
</div>

## Limit the maximum memory usage of the Agent

The Agent tries to absorb the burst of metrics sent by the DogStatsD clients, but to do so, it needs to use memory. Even if this is for a short amount of time and even if this memory is quickly released to the OS, a spike happens and that could be an issue in containerized environments where limit on memory usage could evict pods or containers.

Avoid sending metrics in bursts in your application - this prevents the Datadog Agent from reaching its maximum memory usage.

Another thing to look at to limit the maximum memory usage is to reduce the buffering. The main buffer of the DogStatsD server within the Agent is configurable with the `dogstatsd_queue_size` field (since Datadog Agent 6.1.0), its default value of `1024` induces an approximate maximum memory usage of 768MB.

<div class="alert alert-warning">
  <strong>Note</strong>: Reducing the buffer size could increase the number of packet drops.
</div>

This example decreases the max memory usage of DogStatsD to approximately 384MB:

```yaml
dogstatsd_queue_size: 512
```

See the next section on burst detection to help you detect bursts of metrics from your applications.

## Enable metrics processing stats and burst detection

DogStatsD has a stats mode in which you can see which metrics are the most processed.

<div class="alert alert-warning">
  <strong>Note</strong>: Enabling metrics stats mode can decrease DogStatsD performance.
</div>

To enable the stats mode, you can either:

- Set `dogstatsd_stats_enable` to `true` in your configuration file
- Set the environment variable `DD_DOGSTATSD_STATS_ENABLE` to `true`
- Use the `datadog-agent config set dogstatsd_stats true` command to enable it at runtime. You can disable it at runtime using the command `datadog-agent config set dogstatsd_stats false`.

When this mode is enabled, run the command `datadog-agent dogstatsd-stats`. A list of the processed metrics is returned in descending order by the metrics received.

While running in this mode, the DogStatsD server runs a burst detection mechanism. If a burst is detected, a warning log is emitted. For example:

```text
A burst of metrics has been detected by DogStatSd: here is the last 5 seconds count of metrics: [250 230 93899 233 218]
```

## Client-side telemetry

DogStatsD clients send telemetry metrics by default to the Agent. This allows you to better troubleshoot where bottlenecks exist. Each metric is tagged with the client language and the client version. These metrics are not counted as custom metrics.

Each client shares a set of common tags.

| Tag                | Description                                       | Example                |
| ------------------ | ------------------------------------------------- | ---------------------- |
| `client`           | The language of the client                        | `client:py`            |
| `client_version`   | The version of the client                         | `client_version:1.2.3` |
| `client_transport` | The transport used by the client (`udp` or `uds`) | `client_transport:uds` |

**Note**: When using UDP, network errors can't be detected by the client and the corresponding metrics do not reflect byte or packet drops.

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}

Starting with version `0.34.0` of the Python client.

`datadog.dogstatsd.client.metrics`
: **Metric type**: count<br>
The number of `metrics` sent to the DogStatsD client by your application (before sampling).

`datadog.dogstatsd.client.events`
: **Metric type**: count<br>
The number of `events` sent to the DogStatsD client by your application.

`datadog.dogstatsd.client.service_checks`
: **Metric type**: count<br>
The number of `service_checks` sent to the DogStatsD client by your application.

`datadog.dogstatsd.client.bytes_sent`
: **Metric type**: count<br>
The number of bytes successfully sent to the Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Metric type**: count<br>
The number of bytes dropped by the DogStatsD client.

`datadog.dogstatsd.client.packets_sent`
: **Metric type**: count<br>
The number of datagrams successfully sent to the Agent.

`datadog.dogstatsd.client.packets_dropped` 
: **Metric type**: count<br>
The number of datagrams dropped by the DogStatsD client.

To disable telemetry, use the `disable_telemetry` method:

```python
statsd.disable_telemetry()
```

See [DataDog/datadogpy][1] for more information about the client configuration.


[1]: https://github.com/DataDog/datadogpy
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

Starting with version `4.6.0` of the Ruby client.

`datadog.dogstatsd.client.metrics`
: **Metric type**: count<br>
The number of `metrics` sent to the DogStatsD client by your application (before sampling).

`datadog.dogstatsd.client.events`
: **Metric type**: count<br>
The number of `events` sent to the DogStatsD client by your application.

`datadog.dogstatsd.client.service_checks`
: **Metric type**: count<br>
The number of `service_checks` sent to the DogStatsD client by your application.

`datadog.dogstatsd.client.bytes_sent`
: **Metric type**: count<br>
The number of bytes successfully sent to the Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Metric type**: count<br>
The number of bytes dropped by the DogStatsD client.

`datadog.dogstatsd.client.packets_sent`
: **Metric type**: count<br>
The number of datagrams successfully sent to the Agent.

`datadog.dogstatsd.client.packets_dropped` 
: **Metric type**: count<br>
The number of datagrams dropped by the DogStatsD client.

To disable telemetry, set the `disable_telemetry` parameter to `true`:

```ruby
Datadog::Statsd.new('localhost', 8125, disable_telemetry: true)
```

See [DataDog/dogstatsd-ruby][1] for more information about the client configuration.


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

Starting with version `3.4.0` of the Go client.

`datadog.dogstatsd.client.metrics`
: **Metric type**: count<br>
The number of `metrics` sent to the DogStatsD client by your application (before sampling and aggregation).

`datadog.dogstatsd.client.metrics_by_type`
: **Metric type**: count<br>
The number of `metrics` sent by the DogStatsD client, before sampling and aggregation, tagged by metric type (`gauge`,
`set`, `count`, `timing`, `histogram`, or `distribution`). Starting with v5.0.0 of the Go client.

`datadog.dogstatsd.client.events`
: **Metric type**: count<br>
The number of `events` sent to the DogStatsD client by your application.

`datadog.dogstatsd.client.service_checks`
: **Metric type**: count<br>
The number of `service_checks` sent to the DogStatsD client by your application.

`datadog.dogstatsd.client.bytes_sent`
: **Metric type**: count<br>
The number of bytes successfully sent to the Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Metric type**: count<br>
The number of bytes dropped by the DogStatsD client (this includes `datadog.dogstatsd.client.bytes_dropped_queue` and
`datadog.dogstatsd.client.bytes_dropped_writer`).

`datadog.dogstatsd.client.bytes_dropped_queue`
: **Metric type**: count<br>
The number of bytes dropped because the DogStatsD client queue was full.

`datadog.dogstatsd.client.bytes_dropped_writer`
: **Metric type**: count<br>
The number of bytes dropped because of an error while writing to Datadog due to network timeout or error.

`datadog.dogstatsd.client.packets_sent`
: **Metric type**: count<br>
The number of datagrams successfully sent to the Agent.

`datadog.dogstatsd.client.packets_dropped`
: **Metric type**: count<br>
The number of datagrams dropped by the DogStatsD client (this includes `datadog.dogstatsd.client.packets_dropped_queue`
and `datadog.dogstatsd.client.packets_dropped_writer`).

`datadog.dogstatsd.client.packets_dropped_queue`
: **Metric type**: count<br>
The number of datagrams dropped because the DogStatsD client queue was full.

`datadog.dogstatsd.client.packets_dropped_writer`
: **Metric type**: count<br>
The number of datagrams dropped because of an error while writing to Datadog due to network timeout or error.

`datadog.dogstatsd.client.metric_dropped_on_receive` 
: **Metric type**: count<br>
The number of metrics dropped because the internal receiving channel is full (when using `WithChannelMode()`). Starting
with v3.6.0 of the Go client when `WithChannelMode()` is enabled.

`datadog.dogstatsd.client.aggregated_context`
: **Metric type**: count<br>
The total number of contexts flushed by the client when client side aggregation is enabled. Starting v5.0.0 of the Go
client. This metric is reported only when the aggregation is enabled (which is the default).

`datadog.dogstatsd.client.aggregated_context_by_type`
: **Metric type**: count<br>
The total number of contexts flushed by the client, when client-side aggregation is enabled, tagged by metric type
(`gauge`, `set`, `count`, `timing`, `histogram`, or `distribution`). Starting v5.0.0 of the Go client. This metric is
reported only when the aggregation is enabled (which is the default).

To disable telemetry, use the `WithoutTelemetry` setting:

```go
statsd, err: = statsd.New("127.0.0.1:8125", statsd.WithoutTelemetry())
```

See [DataDog/datadog-go][1] for more information about the client configuration.


[1]: https://github.com/DataDog/datadog-go
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

Starting with version `2.10.0` of the Java client.

`datadog.dogstatsd.client.metrics`
: **Metric type**: count<br>
The number of `metrics` sent to the DogStatsD client by your application (before sampling).

`datadog.dogstatsd.client.events`
: **Metric type**: count<br>
The number of `events` sent to the DogStatsD client by your application.

`datadog.dogstatsd.client.service_checks`
: **Metric type**: count<br>
The number of `service_checks` sent to the DogStatsD client by your application.

`datadog.dogstatsd.client.bytes_sent`
: **Metric type**: count<br>
The number of bytes successfully sent to the Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Metric type**: count<br>
The number of bytes dropped by the DogStatsD client.

`datadog.dogstatsd.client.packets_sent`
: **Metric type**: count<br>
The number of datagrams successfully sent to the Agent.

`datadog.dogstatsd.client.packets_dropped`
: **Metric type**: count<br>
The number of datagrams dropped by the DogStatsD client.

`datadog.dogstatsd.client.packets_dropped_queue` 
: **Metric type**: count<br>
The number of datagrams dropped because the DogStatsD client queue was full.

`datadog.dogstatsd.client.aggregated_context`
: **Metric type**: count<br>
The number of contexts aggregated when client side aggregation is enabled. Starting with version `v2.11.0`.

`datadog.dogstatsd.client.aggregated_context_by_type`
: **Metric type**: count<br>
The number of contexts aggregated by type when client side aggregation is enabled. Starting with version `v2.13.0`. The metric is enabled by default starting `v3.0.0` but requires `enableDevMode(true)` for `v2.13.0`. The metric is tagged by `metrics_type`.

`datadog.dogstatsd.client.metrics_by_type`
: **Metric type**: count<br>
The number of metrics sent to the DogStatsD client by your application tagged by type (before sampling). Starting with version `v2.13.0` when `enableDevMode(true)` is used and by default starting `v3.0.0`. The metric is tagged by `metrics_type`.

To disable telemetry, use the `enableTelemetry(false)` builder option:

```java
StatsDClient client = new NonBlockingStatsDClientBuilder()
.hostname("localhost")
.port(8125)
.enableTelemetry(false)
.build();
```

See [DataDog/java-dogstatsd-client][1] for more information about the client configuration.


[1]: https://github.com/DataDog/java-dogstatsd-client
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

Starting with version `1.5.0` of the PHP client the telemetry is enabled by
default for the `BatchedDogStatsd` client and disabled by default for the
`DogStatsd` client.

`datadog.dogstatsd.client.metrics`
: **Metric type**: count<br>
The number of `metrics` sent to the DogStatsD client by your application (before sampling).

`datadog.dogstatsd.client.events`
: **Metric type**: count<br>
The number of `events` sent to the DogStatsD client by your application.

`datadog.dogstatsd.client.service_checks`
: **Metric type**: count<br>
The number of `service_checks` sent to the DogStatsD client by your application.

`datadog.dogstatsd.client.bytes_sent`
: **Metric type**: count<br>
The number of bytes successfully sent to the Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Metric type**: count<br>
The number of bytes dropped by the DogStatsD client.

`datadog.dogstatsd.client.packets_sent`
: **Metric type**: count<br>
The number of datagrams successfully sent to the Agent.

`datadog.dogstatsd.client.packets_dropped` 
: **Metric type**: count<br>
The number of datagrams dropped by the DogStatsD client.

To enable or disable telemetry use the `disable_telemetry` argument. Beware,
using telemetry with the `DogStatsd` client increases network usage
significantly. It is advised to use the `BatchedDogStatsd` when using telemetry.

To enable it on the `DogStatsd` client:

```php
use DataDog\DogStatsd;

$statsd = new DogStatsd(
array('host' => '127.0.0.1',
'port' => 8125,
'disable_telemetry' => false,
)
);
```

To disable telemetry on the `BatchedDogStatsd` client:

```php
use DataDog\BatchedDogStatsd;

$statsd = new BatchedDogStatsd(
array('host' => '127.0.0.1',
'port' => 8125,
'disable_telemetry' => true,
)
);
```

See [DataDog/php-datadogstatsd][1] for more information about the client configuration.

[1]: https://github.com/DataDog/php-datadogstatsd
{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

Starting with version `5.0.0` of the .NET client.

`datadog.dogstatsd.client.metrics`
: **Metric type**: count<br>
Number of `metrics` sent to the DogStatsD client by your application (before sampling).

`datadog.dogstatsd.client.events`
: **Metric type**: count<br>
Number of `events` sent to the DogStatsD client by your application.

`datadog.dogstatsd.client.service_checks`
: **Metric type**: count<br>
Number of `service_checks` sent to the DogStatsD client by your application.

`datadog.dogstatsd.client.bytes_sent`
: **Metric type**: count<br>
Number of bytes successfully sent to the Agent.

`datadog.dogstatsd.client.bytes_dropped`
: **Metric type**: count<br>
Number of bytes dropped by the DogStatsD client.

`datadog.dogstatsd.client.packets_sent`
: **Metric type**: count<br>
Number of datagrams successfully sent to the Agent.

`datadog.dogstatsd.client.packets_dropped`
: **Metric type**: count<br>
Number of datagrams dropped by the DogStatsD client.

`datadog.dogstatsd.client.packets_dropped_queue`
: **Metric type**: count<br>
Number of datagrams dropped because the DogStatsD client queue was full.

`datadog.dogstatsd.client.aggregated_context_by_type`
: **Metric type**: count<br>
Number of contexts aggregated by type when client side aggregation is enabled. Starting with version `7.0.0`.

To disable telemetry, set `TelemetryFlushInterval` at `null`:

```csharp
var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
};

// Disable Telemetry
dogstatsdConfig.Advanced.TelemetryFlushInterval = null;
```

See [DataDog/dogstatsd-csharp-client][1] for more information about the client configuration.



[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/
[2]: /developers/dogstatsd/unix_socket/
[3]: /developers/dogstatsd/#code
[4]: /metrics/custom_metrics/dogstatsd_metrics_submission/#sample-rates
[5]: /developers/dogstatsd/high_throughput/#note-on-sysctl-in-kubernetes
[6]: https://kubernetes.io/docs/tasks/administer-cluster/sysctl-cluster/
