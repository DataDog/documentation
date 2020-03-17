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
