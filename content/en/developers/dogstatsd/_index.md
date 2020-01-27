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
  text: "Official and Community created API and DogStatsD client libraries"
- link: "https://github.com/DataDog/datadog-agent/tree/master/pkg/dogstatsd"
  tag: "GitHub"
  text: "DogStatsD source code"
---

The easiest way to get your custom application metrics into Datadog is to send them to DogStatsD, a metrics aggregation service bundled with the Datadog Agent. DogStatsD implements the [StatsD][1] protocol and adds a few Datadog-specific extensions:

* Histogram metric type
* Service checks
* Events
* Tagging

Any compliant StatsD client works with DogStatsD and the Agent, but you won't be able to use the [Datadog-specific extensions](#dive-into-dogstatsd).

**Note**: DogStatsD does NOT implement Timers from StatsD as a native metric type (though it [does support them via histograms][2]).

## How it works

DogStatsD accepts [custom metrics][3], [events][4], and [service checks][5] over UDP and periodically aggregates and forwards them to Datadog.

Because it uses UDP, your application can send metrics to DogStatsD and resume its work without waiting for a response. If DogStatsD ever becomes unavailable, your application won't experience an interruption.

{{< img src="developers/metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd"   >}}

As it receives data, DogStatsD aggregates multiple data points for each unique metric into a single data point over a period of time called *the flush interval* (ten seconds, by default).

## Setup

DogStatsD is enabled by default over UDP port `8125` for Agent v6+. If you don't need to change this port, see directly how to [setup DogStatsD in your code](#code). Also see relevant DogStatsD setup documentation for [Docker][6] and [Kubernetes][7].

### Agent

By default, DogStatsD listens on UDP port **8125**. If you need to change this, configure the `dogstatsd_port` option in the main [Agent configuration file][8], and restart the Agent. You can also configure DogStatsD to use a [Unix domain socket][9]. To enable a custom Agent DogStatsD server UDP port:

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

2. [Restart your Agent][10].

### Code
#### Install the DogStatsD client

Official Datadog-DogStatsD client libraries are available for the following languages. You _can_ use any [generic StatsD client][11] to send metrics to DogStatsD, but you won't be able to use any of the Datadog-specific features mentioned above:

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

```shell
$ go get github.com/DataDog/datadog-go/statsd
```

{{% /tab %}}
{{% tab "Java" %}}

The Java DataDog StatsD Client is distributed with maven central, and can be [downloaded from Maven][1]. Start by adding the following configuration to your `pom.xml`:

```xml
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

```text
"datadog/php-datadogstatsd": "1.4.*"
```

**Note**: The first version shipped in Composer is *0.0.3*

Or manually clone the repository at [github.com/DataDog/php-datadogstatsd][1] and set it up with `require './src/DogStatsd.php'`.

[1]: https://github.com/DataDog/php-datadogstatsd#php-datadog-statsd-client
{{% /tab %}}
{{% tab ".NET" %}}

[Get the package from NuGet][1] to install it.

[1]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
{{% /tab %}}
{{< /tabs >}}

#### Instantiate the DogStatsD client

Once your DogStatsD client is installed, instantiate it in your code:

{{< tabs >}}
{{% tab "Python" %}}

```python
import datadog

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

datadog.initialize(**options)
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

For more options, see [Datadog's GoDoc][1].

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

Configure the DogStatsd class:

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

In addition to the required DogStatsD configuration (`url` and `port`), the following optional parameters are available for your DogStatsD client:

{{< tabs >}}
{{% tab "Python" %}}

| Parameter              | Type            | Default     | Description                                                                                                    |
|------------------------|-----------------|-------------|----------------------------------------------------------------------------------------------------------------|
| `statsd_host`          | String          | `localhost` | The host of your DogStatsD server.                                                                             |
| `statsd_port`          | Integer         | `8125`      | The port of your DogStatsD server.                                                                             |
| `statsd_socket_path`   | String          | `null`      | The path to the DogStatsD Unix domain socket (overrides `host` and `port`, only supported with the Agent v6+). |
| `statsd_constant_tags` | List of strings | `null`      | Tags to apply to all metrics, events, and service checks.                                                      |
| `statsd_namespace`     | String          | `null`      | Namespace to prefix all metrics, events, and service checks.                                                   |

For more information, see the [DogStatsD module][1] documentation.
[1]: https://datadogpy.readthedocs.io/en/latest
{{% /tab %}}
{{% tab "Ruby" %}}

| Parameter     | Type            | Default     | Description                                                                                                    |
|---------------|-----------------|-------------|----------------------------------------------------------------------------------------------------------------|
| `host`        | String          | `localhost` | The host of your DogStatsD server.                                                                             |
| `port`        | Integer         | `8125`      | The port of your DogStatsD server.                                                                             |
| `socket_path` | String          | `null`      | The path to the DogStatsD Unix domain socket (overrides `host` and `port`, only supported with the Agent v6+). |
| `tags`        | List of strings | `null`      | Tags to apply to all metrics, events, and service checks.                                                      |
| `namespace`   | String          | `null`      | Namespace to prefix to all metrics, events, and service checks.                                                |

{{% /tab %}}
{{% tab "Go" %}}

| Parameter               | Type            | Description                                                                                                                                                                                                         |
|-------------------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `Namespace`             | String          | Namespace to prefix to all metrics, events, and service checks.                                                                                                                                                     |
| `Tags`                  | List of strings | Global tags applied to every metric, event, and service check.                                                                                                                                                      |
| `Buffered`              | Boolean         | Used to pack multiple DogStatsD messages in one payload. When set to `true`, messages are buffered until the total size of the payload exceeds `MaxMessagesPerPayload` or 100ms after the payload started building. |
| `MaxMessagesPerPayload` | Integer         | The maximum number of metrics, events, and/or service checks a single payload can contain. This option only takes effect when the client is buffered.                                                               |
| `AsyncUDS`              | Boolean         | Used to switch between async and blocking mode for UDS. Blocking mode allows for error checking but does not guarantee that calls won't block the execution.                                                        |
| `WriteTimeoutUDS`       | Integer         | The timeout after which a UDS packet is dropped.                                                                                                                                                                    |

For more options, see [Datadog's GoDoc][1].

[1]: https://godoc.org/github.com/DataDog/datadog-go/statsd#Option
{{% /tab %}}
{{% tab "Java" %}}

| Parameter      | Type            | Description                                                          |
|----------------|-----------------|----------------------------------------------------------------------|
| `prefix`       | String          | The prefix to apply to all metrics, events, and service checks.      |
| `hostname`     | String          | The host name of the targeted StatsD server.                         |
| `port`         | Integer         | The port of the targeted StatsD server.                              |
| `constantTags` | List of strings | Global tags to be applied to every metric, event, and service check. |

For more information, see the [NonBlockingStatsDClient Class][1] documentation.

[1]: https://jar-download.com/artifacts/com.datadoghq/java-dogstatsd-client/2.1.1/documentation
{{% /tab %}}
{{% tab "PHP" %}}

| Parameter     | Type            | Default     | Description                                                                                                                                                         |
|---------------|-----------------|-------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `host`        | String          | `localhost` | The host of your DogStatsD server. If this is not set the Agent looks at the `DD_AGENT_HOST` environment variable.                                                  |
| `port`        | Integer         | `8125`      | The port of your DogStatsD server. If this is not set, the Agent looks at the `DD_DOGSTATSD_PORT` environment variable.                                             |
| `socket_path` | String          | `null`      | The path to the DogStatsD Unix domain socket (overrides `host` and `port`). This is only supported with Agent v6+.                                                  |
| `global_tags` | List of Strings | `null`      | Tags to apply to all metrics, events, and service checks. The `@dd.internal.entity_id` tag is appended to global_tags from the `DD_ENTITY_ID` environment variable. |

{{% /tab %}}
{{% tab ".NET" %}}

| Parameter          | Type            | Default     | Description                                                          |
|--------------------|-----------------|-------------|----------------------------------------------------------------------|
| `StatsdServerName` | String          | `localhost` | The host name of the targeted StatsD server.                         |
| `StatsdPort`       | Integer         | `8125`      | The port of the targeted StatsD server.                              |
| `Prefix`           | String          | `null`      | Prefix to apply to every metric, event, and service check.           |
| `ConstantTags`     | List of strings | `null`      | Global tags to be applied to every metric, event, and service check. |

{{% /tab %}}
{{< /tabs >}}

## Dive into DogStatsD

DogStatsD and StatsD are broadly similar, however, DogStatsD contains advanced features which are specific to Datadog, including available data types, events, service checks, and tags:

{{< whatsnext desc="">}}
    {{< nextlink href="/developers/metrics/dogstatsd_metrics_submission/" >}}Send metrics to Datadog with DogStatsD.{{< /nextlink >}}
    {{< nextlink href="/developers/events/dogstatsd/" >}}Send events to Datadog with DogStatsD.{{< /nextlink >}}
    {{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission/" >}}Send service checks to Datadog with DogStatsD.{{< /nextlink >}}
{{< /whatsnext >}}

If you're interested in learning more about the datagram format used by DogStatsD, or want to develop your own Datadog library, see the [datagram and shell usage][12] section, which also explains how to send metrics and events straight from the command line.

[1]: https://github.com/etsy/statsd
[2]: /developers/metrics/dogstatsd_metrics_submission
[3]: /developers/metrics/custom_metrics
[4]: /developers/events/dogstatsd
[5]: /developers/service_checks/dogstatsd_service_checks_submission
[6]: /agent/docker/?tab=standard#dogstatsd-custom-metrics
[7]: /agent/kubernetes/dogstatsd/
[8]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[9]: /developers/dogstatsd/unix_socket
[10]: /agent/guide/agent-commands
[11]: /developers/libraries/#api-and-dogstatsd-client-libraries
[12]: /developers/metrics
