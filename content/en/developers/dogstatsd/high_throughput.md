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
This adds considerable overhead

TODO: table on how to enable buffering on every client

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


## Over UDS (Unix Domain Socket) - Linux only

- Kernel
