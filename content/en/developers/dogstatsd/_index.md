---
title: DogStatsD
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
aliases:
  - /guides/dogstatsd/
  - /guides/DogStatsD/
  - /developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
further_reading:
- link: "developers/dogstatsd"
  tag: "Documentation"
  text: "Introduction to DogStatsD"
- link: "developers/libraries"
  tag: "Documentation"
  text: "Officials and Community-contributed API and DogStatsD client libraries"
- link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
  tag: "GitHub"
  text: "DogStatsD source code"
---

The easiest way to get your custom application metrics into Datadog is to send them to DogStatsD, a metrics aggregation service bundled with the Datadog Agent. DogStatsD implements the [StatsD][1] protocol and adds a few Datadog-specific extensions:

* Histogram metric type
* Service Checks
* Events
* Tagging

Any compliant StatsD client works with DogStatsD and the Agent, but you won't be able to use the [Datadog-specific extensions](#dive-into-dogstatsd).

**Note**: DogStatsD does NOT implement the following from StatsD:

* Gauge deltas (see [Gauge delta support #2104][2] Github issue)
* Timers as a native metric type (though it [does support them via histograms][3])

## How it works

DogStatsD accepts [custom metrics][4], [events][5], and [Service Checks][6] over UDP and periodically aggregates and forwards them to Datadog.

Because it uses UDP, your application can send metrics to DogStatsD and resume its work without waiting for a response. If DogStatsD ever becomes unavailable, your application won't skip a beat.

{{< img src="developers/metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd"  responsive="true" >}}

As it receives data, DogStatsD aggregates multiple data points for each unique metric into a single data point over a period of time called *the flush interval* (ten seconds, by default).

## Setup

To set up DogStatsD, configure first your Agent to enable the DogStatsD server then instrument your code to send data to it.

### Agent

To enable the Agent DogStatsD server:

1. Edit your `datadog.yaml` file to un-comment the `use_dogstatsd` and  `dogstatsd_port` parameters:

    ```yaml
    ## @param use_dogstatsd - boolean - optional - default: true
    ## Set this option to false to disable the Agent DogStatsD server.
    #
    use_dogstatsd: true

    ## @param dogstatsd_port - integer - optional - default: 8125
    ## Override the Agent DogStatsD port.
    ## Note: Make sure your client is sending to the same UDP port.
    #
    dogstatsd_port: 8125
    ```

2. [Restart your Agent][7].

By default, DogStatsD listens on UDP port **8125**. If you need to change this, configure the `dogstatsd_port` option in the main [Agent configuration file][8], and restart the Agent. You can also configure DogStatsD to use a [Unix domain socket][9].

### Code

The following officials Datadog-DogStatsD client libraries are available for your code depending on its language:

* [Python][10]
* [Ruby][11]
* [Go][12]
* [Java][13]
* [PHP][14]
* [.Net][15]

**Note**: You _can_ use any generic StatsD client to send metrics to DogStatsD, but you won't be able to use any of the Datadog-specific features mentioned above.

#### Install the DogStatsD client

Start by installing the DogStatsD client depending on your language:

{{< tabs >}}
{{% tab "Python" %}}

```shell
$ pip install datadog
```

{{% /tab %}}
{{% tab "Ruby" %}}

```shell
$ gem install dogstatsd-ruby
```

{{% /tab %}}
{{% tab "Go" %}}

```go
go get github.com/DataDog/datadog-go/statsd
```

{{% /tab %}}
{{% tab "Java" %}}

The Java DataDog StatsD Client is distributed via maven central, and can be [downloaded from Maven][1]. Start by adding the following configuration to your `pom.xml`:

```
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>java-dogstatsd-client</artifactId>
    <version>2.8</version>
</dependency>
```

[1]: https://search.maven.org/search?q=g:com.datadoghq%20a:java-dogstatsd-client
{{% /tab %}}
{{% tab "PHP" %}}

Add the following to your `composer.json`:

```
"datadog/php-datadogstatsd": "1.4.*"
```

Note: The first version shipped in Composer is *0.0.3*

Or manually, clone the repository at [github.com/DataDog/php-datadogstatsd][1] and set it up with `require './src/DogStatsd.php'`;

[1]: https://github.com/DataDog/php-datadogstatsd#php-datadog-statsd-client
{{% /tab %}}
{{% tab ".NET" %}}

[Get the package from NuGet][1] to install it.

[1]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
{{% /tab %}}
{{< /tabs >}}

#### Instantiate the DogStatsD client

Once your DogStatsD client is installed, instantiate it in your code so it's ready to use:

{{< tabs >}}
{{% tab "Python" %}}

```python
from datadog import statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)
```

{{% /tab %}}
{{% tab "Ruby" %}}

```ruby
# Import the library
require 'datadog/statsd'

# Create a DogStatsD client instance.
statsd = Datadog::Statsd.new('localhost', 8125)
```

{{% /tab %}}
{{% tab "Go" %}}

```go
dogstatsd_client, err := statsd.New("127.0.0.1:8125")
if err != nil {
    log.Fatal(err)
}
```

Find more information about the Datadog Go-DogStatsD Library with [the dedicated GoDoc][1].

[1]: https://godoc.org/github.com/DataDog/datadog-go/statsd
{{% /tab %}}
{{% tab "Java" %}}

```java
import com.timgroup.statsd.NonBlockingStatsDClient;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClient("statsd", "localhost", 8125);

    }
}
```

{{% /tab %}}
{{% tab "PHP" %}}

Instantiate a new DogStatsd object using composer:

```php
<?php

require __DIR__ . '/vendor/autoload.php';

use DataDog\DogStatsd;

$statsd = new DogStatsd(
    array('host' => '127.0.0.1',
          'port' => 8125,
     )
  );
```

{{% /tab %}}
{{% tab ".NET" %}}

At start of your app, configure the DogStatsd class:

```csharp
// The code is located under the StatsdClient namespace
using StatsdClient;

// ...

var dogstatsdConfig = new StatsdConfig
{
    StatsdServerName = "127.0.0.1",
    StatsdPort = 8125,
};

StatsdClient.DogStatsd.Configure(dogstatsdConfig);
```

{{% /tab %}}
{{< /tabs >}}

### Client instantiation parameters

In addition to the basic required DogStatsD configuration (the url and port to reach), you can use the following optional parameters for your DogStatsD client:

{{< tabs >}}
{{% tab "Python" %}}

| Parameter              | Type            | Default     | Description                                                                                                    |
| ----------             | ----            | -------     | ------------                                                                                                   |
| `statsd_host`          | String          | `localhost` | The host of your DogStatsD server.                                                                             |
| `statsd_port`          | Integer         | `8125`      | The port of your DogStatsD server.                                                                             |
| `statsd_socket_path`   | String          | `null`      | The path to the DogStatsD Unix domain socket (overrides `host` and `port`, only supported with the Agent v6+). |
| `statsd_constant_tags` | List of Strings | `null`      | Tags to apply to all metrics, events, and Service Checks send by this client.                                  |
| `statsd_namespace`     | String          | `null`      | Namespace to prefix all metrics, events, and service checks name send by this client.                          |

Find more about the [DogStatsD module in the dedicated documentation][1]
[1]: https://datadogpy.readthedocs.io/en/latest
{{% /tab %}}
{{% tab "Ruby" %}}

| Parameter     | Type            | Default     | Description                                                                                                    |
| --------      | ------          | -------     | ----------                                                                                                     |
| `host`        | String          | `localhost` | The host of your DogStatsD server.                                                                             |
| `port`        | Integer         | `8125`      | The port of your DogStatsD server.                                                                             |
| `socket_path` | String          | `null`      | The path to the DogStatsD Unix domain socket (overrides `host` and `port`, only supported with the Agent v6+). |
| `tags`        | List of Strings | `null`      | Tags to apply to all metrics, events, and Service Checks send by this client.                                  |
| `namespace`   | String          | `null`      | Namespace to prefix to all metrics, events, and service checks name send by this client.                       |

{{% /tab %}}
{{% tab "Go" %}}

| Parameter               | Type            | Description                                                                                                                                                                                                                                                            |
| ----------              | ----            | ---------                                                                                                                                                                                                                                                              |
| `Namespace`             | String          | Namespace to prefix to all metrics, events and service checks name.                                                                                                                                                                                                    |
| `Tags`                  | List of Strings | Global tags to be applied to every metric, event, and Service Check send by this client.                                                                                                                                                                               |
| `Buffered`              | Boolean         | `Buffered` allows to pack multiple DogStatsD messages in one payload. If `true` messages are buffered until the total size of the payload exceeds `MaxMessagesPerPayload` metrics, events, and/or service checks or after 100ms since the payload started to be built. |
| `MaxMessagesPerPayload` | Integer         | The maximum number of metrics, events, and/or service checks a single payload can contain. This option only takes effect when the client is buffered.                                                                                                                  |
| `AsyncUDS`              | Boolean         | Allows to switch between async and blocking mode for UDS. Blocking mode allows for error checking but does not guarantee that calls won't block the execution.                                                                                                         |
| `WriteTimeoutUDS`       | Integer         | The timeout after which a UDS packet is dropped.                                                                                                                                                                                                                       |

Find more about the [different options in the dedicated documentation][1]

[1]: https://godoc.org/github.com/DataDog/datadog-go/statsd#Option
{{% /tab %}}
{{% tab "Java" %}}

| Parameter      | Type            | Description                                                                              |
| ----------     | ----            | --------                                                                                 |
| `prefix`       | String          | The prefix to apply to all metrics, events, and Service Check sent via this client.      |
| `hostname`     | String          | The host name of the targeted StatsD server.                                             |
| `port`         | Integer         | The port of the targeted StatsD server.                                                  |
| `constantTags` | List of Strings | Global tags to be applied to every metric, event, and Service Check send by this client. |

Find more about the [NonBlockingStatsDClient Class in the dedicated documentation][1]

[1]: https://jar-download.com/artifacts/com.datadoghq/java-dogstatsd-client/2.1.1/documentation
{{% /tab %}}
{{% tab "PHP" %}}

| Parameter     | Type            | Default     | Description                                                                                                                                                              |
| ------        | --------        | --------    | ---------                                                                                                                                                                |
| `host`        | String          | `localhost` | The host of your DogStatsD server, if not set tries to get it from the `DD_AGENT_HOST` environment variable.                                                             |
| `port`        | Integer         | `8125`      | The port of your DogStatsD server, if not set, it tries to get it from the `DD_DOGSTATSD_PORT` environment variable.                                                     |
| `socket_path` | String          | `null`      | The path to the DogStatsD Unix domain socket (overrides `host` and `port`, only supported with the Agent v6+).                                                           |
| `global_tags` | List of Strings | `null`      | Tags to apply to all metrics, events, and Service Checks sent, the `@dd.internal.entity_id` tag is appended to global_tags from the `DD_ENTITY_ID` environment variable. |

{{% /tab %}}
{{% tab ".NET" %}}

| Parameter          | Type            | Default     | Description                                                                              |
| --------           | -------         | ----        | ---------                                                                                |
| `StatsdServerName` | String          | `localhost` | The host name of the targeted StatsD server.                                             |
| `StatsdPort`       | Integer         | `8125`      | The port of the targeted StatsD server.                                                  |
| `Prefix`           | String          | `null`      | Prefix to apply to every metric, event, and Service Check sent via this client.          |
| `ConstantTags`     | List of Strings | `null`      | Global tags to be applied to every metric, event, and Service Check send by this client. |

{{% /tab %}}
{{< /tabs >}}

## Dive into DogStatsD

DogStatsD and StatsD are broadly similar, however, DogStatsD implements some things differently, and contains advanced features which are specific to Datadog, including available data types, events, Service Checks, and tags:

{{< whatsnext desc="">}}
    {{< nextlink href="/developers/metrics/dogstatsd_metrics_submission/" >}}Send metrics to Datadog with DogStatsD.{{< /nextlink >}}
    {{< nextlink href="/developers/events/dogstatsd_events_submission/" >}}Send Events to Datadog with DogStatsD.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission/" >}}Send Service Checks to Datadog with DogStatsD.{{< /nextlink >}}
{{< /whatsnext >}}

If you're interested in learning more about the datagram format used by DogStatsD, or want to develop your own Datadog library, see the [datagram and shell usage][16] section, which also explains how to send metrics and events straight from the command line.

[1]: https://github.com/etsy/statsd
[2]: https://github.com/DataDog/dd-agent/pull/2104
[3]: /developers/metrics/dogstatsd_metrics_submission
[4]: /developers/metrics/custom_metrics
[5]: /developers/events/dogstatsd_events_submission
[6]: /developers/service_checks/dogstatsd_service_checks_submission
[7]: /agent/guide/agent-commands
[8]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[9]: /developers/dogstatsd/unix_socket
[10]: https://github.com/DataDog/datadogpy
[11]: https://github.com/DataDog/dogstatsd-ruby
[12]: https://github.com/DataDog/datadog-go
[13]: https://github.com/DataDog/java-dogstatsd-client
[14]: https://github.com/DataDog/php-datadogstatsd
[15]: https://github.com/DataDog/dogstatsd-csharp-client
[16]: /developers/metrics/datagram_shell
