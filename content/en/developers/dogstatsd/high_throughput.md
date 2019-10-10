---
title: Sending large volumes of metrics
kind: documentation
description: "Optimizing DogStatsD for high throughput"
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

DogStatsD works by sending metrics generated from your application to the [Agent][1] over a transport protocol. This transport protocol can be either UDP (User Datagram Protocol) or UDS (Unix Domain Socket).

When DogStatsD is used to send a large volume of metrics to a single Agent, if proper measures are not taken, it is common to end up with the following symptoms:

- High agent CPU usage
- Dropped datagrams / metrics
- (UDS) DogStatsD client library returning lots of errors

Most of the time those symptoms can be alleviated by tweaking some configuration options described below.

## General tips

### Enable buffering on your client

Some StatsD and DogStatsD clients, by default, send one metric per datagram. This adds considerable overhead on the client, the operating system, and the Agent. If your client supports buffering multiple metrics in one datagram, enabling this option brings noticeable improvements.

Here are a few examples for supported clients:

{{< tabs >}}
{{% tab "Go" %}}
Use Datadog's official Golang library [datadog-go][1]:

```go
// Create a buffered dogstatsd client instance with 256 maximum buffered metrics
client, err := statsd.New("127.0.0.1:8125",
    statsd.Buffered(), // enable buffering
    statsd.WithMaxMessagesPerPayload(256), // sets the maximum number of messages in a single datagram
)
// All metrics sent from this instance of the client will be buffered and sent in
// packets containing several metrics
client.Gauge("kafka.health", 1, []string{"env:production", "partition:1", "partition:2"}, 1)
```
[1]: https://github.com/DataDog/datadog-go
{{% /tab %}}

{{% tab "Python" %}}
Use Datadog's official Python library [datadogpy][1]:

```python
# Load the dogstats module.
from datadog import DogStatsd

# All metrics will be buffered and sent in one packet when the block completes
with DogStatsd(host="127.0.0.1", port=8125, max_buffer_size=25) as batch:
    batch.gauge('users.online', 123)
    batch.gauge('active.connections', 1001)
```
[1]: https://github.com/DataDog/datadogpy
{{% /tab %}}

{{% tab "Ruby" %}}
Use Datadog's official Ruby library [dogstatsd-ruby][1]:

```ruby
require 'datadog/statsd'

# Create a stats instance
statsd = Datadog::Statsd.new('127.0.0.1', 8125)

# All metrics will be buffered and sent in one packet when the block completes
statsd.batch do |s|
  s.increment('page.views')
  s.gauge('users.online', 123)
end
```
[1]: https://github.com/DataDog/dogstatsd-ruby
{{% /tab %}}

{{% tab "Java" %}}
Use Datadog's official Java library [java-dogstatsd-client][1]:

```java
// Create a stats instance with a buffer size of 256
private static final StatsDClient statsd = new NonBlockingStatsDClient("namespace", "127.0.0.1", 8125, 256);

// All metrics sent from this instance of the client will be buffered and sent in
// packets containing several metrics
public void foo() {
    statsd.incrementCounter("foo");
    statsd.recordGaugeValue("bar", 100);
}
```
[1]: https://github.com/DataDog/java-dogstatsd-client
{{% /tab %}}

{{% tab "C#" %}}
Use Datadog's official C# library [dogstatsd-csharp-client][1]:

```csharp
// Create the transport
StatsdUDP udp = new StatsdUDP("127.0.0.1", 8125);

using (udp)
{
    // Create a stats instance with "udp" as transport
    Statsd s = new Statsd(udp);

    s.Add<Statsd.Counting,int>("stat-name", 1);
    s.Add("event title", "content", priority: "low");
    s.Add<Statsd.Counting,int>("stat-name", 1);

    // All metrics buffered before this call will be sent in one packet
    s.Send();
}
```
[1]: https://github.com/DataDog/dogstatsd-csharp-client
{{% /tab %}}

{{% tab "PHP" %}}
Use Datadog's official PHP library [php-datadogstatsd][1]:

```php
<?php
  require __DIR__ . '/vendor/autoload.php';

  use DataDog\BatchedDogStatsd;

  $client = new BatchedDogStatsd();

  // All metrics sent from this instance of the client will be buffered and sent in
  // packets containing several metrics
  $client->increment('your.data.point');
  $client->increment('your.data.point', .5);
?>
```
[1]: https://github.com/DataDog/php-datadogstatsd
{{% /tab %}}
{{< /tabs >}}

Please refer to your client documentation for additional details.

### Sample your metrics

It is possible to reduce the traffic from your DogStatsD client to the Agent by setting a sample rate value for your client. For example, a sample rate of `0.5` halves the number of UDP packets sent. This solution is a trade-off: you decrease traffic but slightly lose in precision and granularity.

For more information, and code examples, see [DogStatsD "Sample Rate" Parameter Explained][2].

### Use DogStatsD over UDS (Unix Domain Socket)

UDS is an inter-process communication protocol used to [transport DogStatsD payloads][3]. It has very little overhead when compared to UDP and lowers the general footprint of DogStatsD on your system.

## Operating System kernel buffers

Most OSs add incoming UDP and UDS datagrams containing your metrics to a buffer with a maximum size. Once this size is reached, datagrams containing your metrics starts getting dropped.

It is possible to adjust those values to give the Agent more time to process incoming metrics.

### Over UDP (User Datagram Protocol)

#### Linux

On most Linux distributions, the maximum size of the kernel buffer is set to `212992` by default (208 KiB). This can be confirmed using the following commands:

```bash
$ sysctl net.core.rmem_max
net.core.rmem_max = 212992
```

To set the maximum size of the DogStatsD socket buffer to 25MiB run:

```bash
$ sysctl -w net.core.rmem_max=26214400
```

Add the following configuration to `/etc/sysctl.conf` to make this change permanent:
```
net.core.rmem_max = 26214400
```

Then set the Agent `dogstatsd_so_rcvbuf` configuration option to the same number in `datadog.yaml`:
```
dogstatsd_so_rcvbuf: 26214400
```

[1]: https://docs.datadoghq.com/agent
[2]: /developers/faq/dog-statsd-sample-rate-parameter-explained
[3]: /developers/dogstatsd/unix_socket
