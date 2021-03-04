---
title: DogStatsD
kind: documentation
description: Overview of the features of DogStatsD, including data types and tagging.
aliases:
    - /guides/dogstatsd/
    - /guides/DogStatsD/
    - /developers/faq/how-to-remove-the-host-tag-when-submitting-metrics-via-dogstatsd/
    - /integrations/faq/dogstatsd-and-docker
    - /agent/kubernetes/dogstatsd
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

The easiest way to get your custom application metrics into Datadog is to send them to DogStatsD, a metrics aggregation service bundled with the Datadog Agent. DogStatsD implements the [StatsD][1] protocol and adds a few Datadog-specific extensions:

- Histogram metric type
- Service checks
- Events
- Tagging

Any compliant StatsD client works with DogStatsD and the Agent, but you won't be able to use the [Datadog-specific extensions](#dive-into-dogstatsd).

**Note**: DogStatsD does NOT implement Timers from StatsD as a native metric type (though it [does support them via histograms][2]).

DogStatsD is available on Docker Hub and GCR:

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/dogstatsd][3]          | [gcr.io/datadoghq/dogstatsd][4]                           |

## How it works

DogStatsD accepts [custom metrics][5], [events][6], and [service checks][7] over UDP and periodically aggregates and forwards them to Datadog.

Because it uses UDP, your application can send metrics to DogStatsD and resume its work without waiting for a response. If DogStatsD ever becomes unavailable, your application won't experience an interruption.

{{< img src="developers/metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd"   >}}

As it receives data, DogStatsD aggregates multiple data points for each unique metric into a single data point over a period of time called _the flush interval_ (ten seconds, by default).

## Setup

DogStatsD is enabled by default over UDP port `8125` for Agent v6+. If you don't need to change this port, see directly how to [setup DogStatsD in your code](#code).

### Agent

{{< tabs >}}
{{% tab "Host Agent" %}}

By default, DogStatsD listens on UDP port **8125**. If you need to change this, configure the `dogstatsd_port` option in the main [Agent configuration file][1], and restart the Agent. You can also configure DogStatsD to use a [Unix domain socket][2]. To enable a custom Agent DogStatsD server UDP port:

1. Edit your `datadog.yaml` file to un-comment the `use_dogstatsd` and `dogstatsd_port` parameters:

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

2. [Restart your Agent][3].


[1]: https://github.com/DataDog/dd-agent/blob/master/datadog.conf.example
[2]: /developers/dogstatsd/unix_socket/
[3]: /agent/guide/agent-commands/
{{% /tab %}}
{{% tab "Container Agent" %}}

By default, DogStatsD listens on UDP port **8125**, so you need to bind this port to your host port when running the Agent in a container. If your StatsD metrics come from outside of `localhost`you must set `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` to `true` to allow metric collection. In order to run the Agent with the DogStatsd server up, execute the following command:

```shell
DOCKER_CONTENT_TRUST=1 \
docker run -d -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC="true" \
              -p 8125:8125/udp \
              gcr.io/datadoghq/agent:latest
```

If you need to change the port used to collect StatsD metrics, use the `DD_DOGSTATSD_PORT="<NEW_DOGSTATSD_PORT>` environment variable. You can also configure DogStatsD to use a [Unix domain socket][1]:

[1]: /developers/dogstatsd/unix_socket/
{{% /tab %}}
{{% tab "Kubernetes" %}}

To start collecting your StatsD metrics, you need to bind the DogStatsD port to a host port. You can also configure DogStatsD to use a [Unix domain socket][1].

1. Add a `hostPort` to your `datadog-agent.yaml` manifest:

    ```yaml
    ports:
        - containerPort: 8125
          hostPort: 8125
          name: dogstatsdport
          protocol: UDP
    ```

     This enables your applications to send metrics via DogStatsD on port `8125` on whichever node they happen to be running.

     **Note**: `hostPort` functionality requires a networking provider that adheres to the [CNI specification][2], such as Calico, Canal, or Flannel. For more information, including a workaround for non-CNI network providers, consult the [Kubernetes documentation][3].

2. Enable DogStatsD non local traffic to allow StatsD data collection, set `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` to `true` in your `datadog-agent.yaml` manifest:

    ```yaml
    - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
      value: 'true'
    ```

     This allows collecting StatsD data from other containers than the one running the Agent.

3. Apply the change:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

**Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources. Another word of caution: some network plugins don't support `hostPorts` yet, so this won't work.
The workaround in this case is to add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are also opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod will not start. Not all Kubernetes installations allow this.

### Send StatsD metrics to the Agent

Your application needs now a reliable way to determine the IP address of its host. This is made simple in Kubernetes 1.7, which expands the set of attributes you can pass to your pods as environment variables. In versions 1.7 and above, you can pass the host IP to any pod by adding an environment variable to the PodSpec. For instance, your application manifest might look like this:

```yaml
env:
    - name: DD_AGENT_HOST
      valueFrom:
          fieldRef:
              fieldPath: status.hostIP
```

With this, any pod running your application is able to send DogStatsD metrics via port `8125` on `$DD_AGENT_HOST`.

**Note**: As a best practice, Datadog recommends using unified service tagging when assigning attributes. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to unify your environment, refer to the dedicated [unified service tagging][8] documentation.

#### Origin detection over UDP

Origin detection is supported in Agent 6.10.0+ and allows DogStatsD to detect where the container metrics come from, and tag metrics automatically. When this mode is enabled, all metrics received via UDP are tagged by the same container tags as Autodiscovery metrics.

**Note**: An alternative to UDP is [Unix Domain Sockets][4].

To enable origin detection over UDP, add the following lines to your application manifest:

```yaml
env:
    - name: DD_ENTITY_ID
      valueFrom:
          fieldRef:
              fieldPath: metadata.uid
```

To set [tag cardinality][5] for the metrics collected using origin detection, set the environment variable `DD_DOGSTATSD_TAG_CARDINALITY` to either `low` (default) or `orchestrator`.

**Note:** For UDP, `pod_name` tags are not added by default to avoid creating too many [custom metrics][6].

[1]: /developers/dogstatsd/unix_socket/
[2]: https://github.com/containernetworking/cni
[3]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[4]: /developers/dogstatsd/unix_socket/#using-origin-detection-for-container-tagging
[5]: /getting_started/tagging/assigning_tags/#environment-variables
[6]: /developers/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Helm" %}}

To gather custom metrics with [DogStatsD][1] with helm:

1. Update your [datadog-values.yaml][2] file to enable DogStatsD:

    ```yaml
      dogstatsd:
        port: 8125
        useHostPort: true
        nonLocalTraffic: true
    ```

     **Note**: `hostPort` functionality requires a networking provider that adheres to the [CNI specification][3], such as Calico, Canal, or Flannel. For more information, including a workaround for non-CNI network providers, consult the [Kubernetes documentation][4]. The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources. Another word of caution: some network plugins don't support `hostPorts` yet, so this won't work.
     The workaround in this case is to add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are also opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod will not start. Not all Kubernetes installations allow this.

2. Upgrade your Agent configuration:

    ``` shell
    helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
    ```

3. Update your application pods: Your application needs now a reliable way to determine the IP address of its host. This is made simple in Kubernetes 1.7, which expands the set of attributes you can pass to your pods as environment variables. In versions 1.7 and above, you can pass the host IP to any pod by adding an environment variable to the PodSpec. For instance, your application manifest might look like this:

    ```yaml
    env:
        - name: DD_AGENT_HOST
          valueFrom:
              fieldRef:
                  fieldPath: status.hostIP
    ```

     With this, any pod running your application is able to send DogStatsD metrics via port `8125` on `$DD_AGENT_HOST`.

[1]: /developers/metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://github.com/containernetworking/cni
[4]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
{{% /tab %}}
{{< /tabs >}}

### Code

#### Install the DogStatsD client

Official Datadog-DogStatsD client libraries are available for the following languages. You _can_ use any [generic StatsD client][8] to send metrics to DogStatsD, but you won't be able to use any of the Datadog-specific features mentioned above:
{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}

{{< programming-lang lang="python" >}}

```shell
pip install datadog
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```shell
gem install dogstatsd-ruby
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```shell
go get github.com/DataDog/datadog-go/statsd
```

{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

The Java DataDog StatsD Client is distributed with maven central, and can be [downloaded from Maven][1]. Start by adding the following configuration to your `pom.xml`:

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>java-dogstatsd-client</artifactId>
    <version>2.10.1</version>
</dependency>
```



[1]: https://search.maven.org/search?q=g:com.datadoghq%20a:java-dogstatsd-client
{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

Add the following to your `composer.json`:

```text
"datadog/php-datadogstatsd": "1.4.*"
```

**Note**: The first version shipped in Composer is _0.0.3_

Or manually clone the repository at [github.com/DataDog/php-datadogstatsd][1] and set it up with `require './src/DogStatsd.php'`.



[1]: https://github.com/DataDog/php-datadogstatsd#php-datadog-statsd-client
{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

- Get [the package from NuGet][1] to install it.


[1]: https://www.nuget.org/packages/DogStatsD-CSharp-Client
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}


#### Instantiate the DogStatsD client

Once your DogStatsD client is installed, instantiate it in your code:
{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}

{{< programming-lang lang="python" >}}

```python
from datadog import initialize, statsd

options = {
    'statsd_host':'127.0.0.1',
    'statsd_port':8125
}

initialize(**options)
```

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
# Import the library
require 'datadog/statsd'

# Create a DogStatsD client instance.
statsd = Datadog::Statsd.new('localhost', 8125)
```

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
dogstatsd_client, err := statsd.New("127.0.0.1:8125")
if err != nil {
    log.Fatal(err)
}
```

For more options, see [Datadog's GoDoc][1].



[1]: https://godoc.org/github.com/DataDog/datadog-go/statsd
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient Statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd")
            .hostname("localhost")
            .port(8125)
            .build();

    }
}
```

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

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

{{< /programming-lang >}}

{{< programming-lang lang=".NET" >}}

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

using (var dogStatsdService = new DogStatsdService())
{
    dogStatsdService.Configure(dogstatsdConfig);
    // ...
} // Flush metrics not yet sent
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

**Note**: If you use DogStatsD with the Container Agent or in Kubernetes, you must instantiate the host to which StatsD metrics are forwarded to with the `$DD_DOGSTATSD_SOCKET` environment variable if using a Unix Domain Socket, or with the `$DD_AGENT_HOST` environment variable if you are using the host port binding method.

### Client instantiation parameters

**Note**: As a best practice, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to unify your environment, refer to the dedicated [unified service tagging][9] documentation.

In addition to the required DogStatsD configuration (`url` and `port`), the following optional parameters are available for your DogStatsD client:

{{< programming-lang-wrapper langs="python,ruby,go,java,PHP,.NET" >}}
{{< programming-lang lang="python" >}}
| Parameter              | Type            | Default     | Description                                                                                                    |
| ---------------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `statsd_host`          | String          | `localhost` | The host of your DogStatsD server.                                                                             |
| `statsd_port`          | Integer         | `8125`      | The port of your DogStatsD server.                                                                             |
| `statsd_socket_path`   | String          | `null`      | The path to the DogStatsD Unix domain socket (overrides `host` and `port`, only supported with the Agent v6+). |
| `statsd_constant_tags` | List of strings | `null`      | Tags to apply to all metrics, events, and service checks.                                                      |
| `statsd_namespace`     | String          | `null`      | Namespace to prefix all metrics, events, and service checks.                                                   |

For more information, see the [DogStatsD module][1] documentation.


[1]: https://datadogpy.readthedocs.io/en/latest
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

| Parameter     | Type            | Default     | Description                                                                                                    |
| ------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `host`        | String          | `localhost` | The host of your DogStatsD server.                                                                             |
| `port`        | Integer         | `8125`      | The port of your DogStatsD server.                                                                             |
| `socket_path` | String          | `null`      | The path to the DogStatsD Unix domain socket (overrides `host` and `port`, only supported with the Agent v6+). |
| `tags`        | List of strings | `null`      | Tags to apply to all metrics, events, and service checks.                                                      |
| `namespace`   | String          | `null`      | Namespace to prefix to all metrics, events, and service checks.                                                |

{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

| Parameter               | Type            | Description                                                                                                                                                                                                         |
| ----------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Namespace`             | String          | Namespace to prefix to all metrics, events, and service checks.                                                                                                                                                     |
| `Tags`                  | List of strings | Global tags applied to every metric, event, and service check.                                                                                                                                                      |
| `Buffered`              | Boolean         | Used to pack multiple DogStatsD messages in one payload. When set to `true`, messages are buffered until the total size of the payload exceeds `MaxMessagesPerPayload` or 100ms after the payload started building. |
| `MaxMessagesPerPayload` | Integer         | The maximum number of metrics, events, and/or service checks a single payload can contain. This option only takes effect when the client is buffered.                                                               |
| `AsyncUDS`              | Boolean         | Used to switch between async and blocking mode for UDS. Blocking mode allows for error checking but does not guarantee that calls won't block the execution.                                                        |
| `WriteTimeoutUDS`       | Integer         | The timeout after which a UDS packet is dropped.                                                                                                                                                                    |

For more options, see [Datadog's GoDoc][1].


[1]: https://godoc.org/github.com/DataDog/datadog-go/statsd#Option
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

| Parameter      | Type            | Description                                                          |
| -------------- | --------------- | -------------------------------------------------------------------- |
| `prefix`       | String          | The prefix to apply to all metrics, events, and service checks.      |
| `hostname`     | String          | The host name of the targeted StatsD server.                         |
| `port`         | Integer         | The port of the targeted StatsD server.                              |
| `constantTags` | List of strings | Global tags to be applied to every metric, event, and service check. |

For more information, see the [NonBlockingStatsDClient Class][1] documentation.


[1]: https://jar-download.com/artifacts/com.datadoghq/java-dogstatsd-client/2.1.1/documentation
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

| Parameter     | Type            | Default     | Description                                                                                                                                                         |
| ------------- | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `host`        | String          | `localhost` | The host of your DogStatsD server. If this is not set the Agent looks at the `DD_AGENT_HOST` environment variable.                                                  |
| `port`        | Integer         | `8125`      | The port of your DogStatsD server. If this is not set, the Agent looks at the `DD_DOGSTATSD_PORT` environment variable.                                             |
| `socket_path` | String          | `null`      | The path to the DogStatsD Unix domain socket (overrides `host` and `port`). This is only supported with Agent v6+.                                                  |
| `global_tags` | List of Strings | `null`      | Tags to apply to all metrics, events, and service checks. The `@dd.internal.entity_id` tag is appended to global_tags from the `DD_ENTITY_ID` environment variable. |

{{< /programming-lang >}}
{{< programming-lang lang=".NET" >}}

| Parameter          | Type            | Default     | Description                                                          |
| ------------------ | --------------- | ----------- | -------------------------------------------------------------------- |
| `StatsdServerName` | String          | `localhost` | The host name of the targeted StatsD server.                         |
| `StatsdPort`       | Integer         | `8125`      | The port of the targeted StatsD server.                              |
| `Prefix`           | String          | `null`      | Prefix to apply to every metric, event, and service check.           |
| `ConstantTags`     | List of strings | `null`      | Global tags to be applied to every metric, event, and service check. |

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Dive into DogStatsD

DogStatsD and StatsD are broadly similar, however, DogStatsD contains advanced features which are specific to Datadog, including available data types, events, service checks, and tags:

{{< whatsnext desc="">}}
{{< nextlink href="/developers/metrics/dogstatsd_metrics_submission/" >}}Send metrics to Datadog with DogStatsD.{{< /nextlink >}}
{{< nextlink href="/developers/events/dogstatsd/" >}}Send events to Datadog with DogStatsD.{{< /nextlink >}}
{{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission/" >}}Send service checks to Datadog with DogStatsD.{{< /nextlink >}}
{{< /whatsnext >}}

If you're interested in learning more about the datagram format used by DogStatsD, or want to develop your own Datadog library, see the [datagram and shell usage][10] section, which also explains how to send metrics and events straight from the command line.

[1]: https://github.com/etsy/statsd
[2]: /developers/metrics/dogstatsd_metrics_submission/
[3]: https://hub.docker.com/r/datadog/dogstatsd
[4]: https://gcr.io/datadoghq/dogstatsd
[5]: /developers/metrics/custom_metrics/
[6]: /developers/events/dogstatsd/
[7]: /developers/service_checks/dogstatsd_service_checks_submission/
[8]: /developers/libraries/#api-and-dogstatsd-client-libraries
[9]: /getting_started/tagging/unified_service_tagging
[10]: /developers/metrics/
