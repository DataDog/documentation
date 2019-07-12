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

DogStatsD works by sending your metrics from your application to the
[agent](https://docs.datadoghq.com/agent/) over a transport protocol. This
protocol can be either UDP (User Datagram Protocol) or UDS (Unix Domain Socket).

When used to send a large volume of metrics to a single agent it's common to see
the following symptoms:

- High agent CPU usage
- (UDP) Dropped datagrams / metrics
- (UDS) DogStatsD client library returning errors

Most of the time those symptoms can be alleviated by tweaking some configuration
options described below.

## General tips

### Enable buffering on your clients

Some statsd/dogstatsd clients, by default, will send one metric per datagram.
This adds considerable overhead on the client, the operating system and the agent.
If your client support buffering multiple metrics in one datagram

Here are a few examples for supported clients:

Please Refer to your client documentation for additional details.

{{< tabs >}}
{{% tab "Go (datadog-go)" %}}
```go
client, err := statsd.New("127.0.0.1:8125",
    statsd.Buffered(), // enable buffering
    statsd.WithMaxMessagesPerPayload(256), // sets the maximum number of messages in a single datagram
)
// All metrics sent from this instance of the client will be buffered and sent in
// packets containing several metrics
client.Gauge("kafka.health", 1, []string{"env:production", "partition:1", "partition:2"}, 1)
```
{{% /tab %}}

{{% tab "Python (datadogpy)" %}}
```python
# Load the dogstats module.
from datadog import DogStatsd

# All metrics will be buffered and sent in one packet when the block completes
with DogStatsd(host="127.0.0.1", port=8125, max_buffer_size=25) as batch:
    batch.gauge('users.online', 123)
    batch.gauge('active.connections', 1001)
```
{{% /tab %}}

{{% tab "Ruby (dogstatsd-ruby)" %}}
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
{{% /tab %}}

{{% tab "Java (java-dogstatsd-client)" %}}
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
{{% /tab %}}

{{% tab "C# (dogstatsd-csharp-client)" %}}
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
{{% /tab %}}

{{% tab "PHP (php-datadogstatsd)" %}}
```php
require __DIR__ . '/vendor/autoload.php';

use DataDog\BatchedDogStatsd;

$client = new BatchedDogStatsd();

// All metrics sent from this instance of the client will be buffered and sent in
// packets containing several metrics
$client->increment('your.data.point');
$client->increment('your.data.point', .5);
```
{{% /tab %}}
{{< /tabs >}}

### Sample your metrics

It is possible to reduce the volume of data sent by sending only 1 in `x` metrics.
The agent will then take that into account and adjust the value so that it still
report the right value to the datadog web application.

A more in-depth explaination is available [here](https://docs.datadoghq.com/developers/faq/dog-statsd-sample-rate-parameter-explained/).

### Use DogStatsD over UDS (Unix Domain Socket)

UDS is an inter-process communication protocol that can
be [used to transport dogstatsd payloads](https://docs.datadoghq.com/developers/dogstatsd/unix_socket/).
It has very little overhead when compared to UDP and will allow lowering the
general overhead of dogstatsd on your system.

## Operating System kernel buffers

Most OSs will add incoming UDP datagrams containing your metrics to a buffer
with a maximum size. Once this size is reached, datagrams containing your metrics
will start getting dropped.

Adjusting those values will give the agent more time to handle

### Over UDP (User Datagram Protocol)

### Linux

On most linux distribution the max size of is set to `212992` by default, or
`208` KiB. This can be confirmed using the following commands:

```bash
$ sysctl net.core.rmem_max
net.core.rmem_max = 212992
$ sysctl net.core.rmem_default
net.core.rmem_default = 212992
```

### Windows

// TODO

## Over UDS (Unix Domain Socket) - Linux only

- Kernel
