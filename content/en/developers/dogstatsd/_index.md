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
    - link: 'integrations/node'
      tag: 'Documentation'
      text: 'Enable DogStatsD for NodeJS through the NodeJS integration'
    - link: 'developers/dogstatsd'
      tag: 'Documentation'
      text: 'Introduction to DogStatsD'
    - link: 'developers/libraries'
      tag: 'Documentation'
      text: 'Official and Community created API and DogStatsD client libraries'
    - link: "https://www.datadoghq.com/blog/monitor-azure-app-service-linux/"
      tag: "Blog"
      text: "Monitor your Linux web apps on Azure App Service with Datadog"
---

The easiest way to get your custom application metrics into Datadog is to send them to DogStatsD, a metrics aggregation service bundled with the Datadog Agent. DogStatsD implements the [StatsD][1] protocol and adds a few Datadog-specific extensions:

- Histogram metric type
- Service checks
- Events
- Tagging

Any compliant StatsD client works with DogStatsD and the Agent, but does not include the [Datadog-specific extensions](#dive-into-dogstatsd).

**Note**: DogStatsD does NOT implement timers from StatsD as a native metric type (though it does support them through [histograms][2]).

DogStatsD is available on Docker Hub and GCR:

| Docker Hub                                       | GCR                                                       |
|--------------------------------------------------|-----------------------------------------------------------|
| [hub.docker.com/r/datadog/dogstatsd][3]          | [gcr.io/datadoghq/dogstatsd][4]                           |

<div class="alert alert-warning">Docker Hub is subject to image pull rate limits. If you are not a Docker Hub customer, Datadog recommends that you update your Datadog Agent and Cluster Agent configuration to pull from GCR or ECR. For instructions, see <a href="/agent/guide/changing_container_registry">Changing your container registry</a>.</div>

## How it works

DogStatsD accepts [custom metrics][5], [events][6], and [service checks][7] over UDP and periodically aggregates and forwards them to Datadog.

Because it uses UDP, your application can send metrics to DogStatsD and resume its work without waiting for a response. If DogStatsD ever becomes unavailable, your application doesn't experience an interruption.

{{< img src="metrics/custom_metrics/dogstatsd_metrics_submission/dogstatsd.png" alt="dogstatsd" >}}

As it receives data, DogStatsD aggregates multiple data points for each unique metric into a single data point over a period of time called _the flush interval_. DogStatsD uses a flush interval of 10 seconds.

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


[1]: /agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
[2]: /developers/dogstatsd/unix_socket/
[3]: /agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Container Agent" %}}

By default, DogStatsD listens on UDP port **8125**, so you need to bind this port to your host port when running the Agent in a container. If your StatsD metrics come from outside of `localhost`you must set `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` to `true` to allow metric collection. In order to run the Agent with the DogStatsd server up, execute the following command:

```shell
docker run -d --cgroupns host \
              --pid host \
              -v /var/run/docker.sock:/var/run/docker.sock:ro \
              -v /proc/:/host/proc/:ro \
              -v /sys/fs/cgroup/:/host/sys/fs/cgroup:ro \
              -e DD_API_KEY=<DATADOG_API_KEY> \
              -e DD_DOGSTATSD_NON_LOCAL_TRAFFIC="true" \
              -p 8125:8125/udp \
              gcr.io/datadoghq/agent:latest
```

If you need to change the port used to collect StatsD metrics, use the `DD_DOGSTATSD_PORT="<NEW_DOGSTATSD_PORT>` environment variable. You can also configure DogStatsD to use a [Unix domain socket][1].

#### Origin detection over UDP

Origin detection is supported in Agent v6.10.0+, and allows DogStatsD to detect where the container metrics come from and automatically tag metrics. When this mode is enabled, all metrics received through UDP are tagged by the same pod tags as Autodiscovery metrics.

Origin detection in non-Kubernetes environments is based on an extension of the DogStatsD protocol in [Datagram Format and Shell Usage][2]. To enable the feature in the Agent, set the `DD_DOGSTATSD_ORIGIN_DETECTION_CLIENT` environment variable to `true`.

**Note**: Origin detection is not supported for Fargate environments.

[1]: /developers/dogstatsd/unix_socket/
[2]: /developers/dogstatsd/datagram_shell/?tab=metrics#dogstatsd-protocol-v12
{{% /tab %}}
{{% tab "Datadog Operator" %}}

StatsD metrics collection is enabled by default on [Unix domain socket][1]. To start collecting your StatsD metrics over UDP, you need to activate the DogStatsD feature in the Operator settings.

1. Add `features.dogstatsd.hostPortConfig.enabled` to your `datadog-agent.yaml` manifest:

    ```yaml
    features:
        dogstatsd:
            hostPortConfig:
                enabled: true
    ```

    This is an example `datadog-agent.yaml` manifest:
    ```yaml
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      global:
        credentials:
          apiSecret:
            secretName: datadog-secret
            keyName: api-key
      features:
        dogstatsd:
          hostPortConfig:
            enabled: true
    ```

    This enables the Agent to collect StatsD metrics over UDP on port `8125`.

2. Apply the change:

    ```shell
    kubectl apply -f datadog-agent.yaml
    ```

**Warning**: The `features.dogstatsd.hostPortConfig.hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources. If your network plugin doesn't support `hostPorts`, so add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod does not start. Some Kubernetes installations do not allow this.

### Send StatsD metrics to the Agent

Your application needs a reliable way to determine the IP address of its host. This is made simple in Kubernetes 1.7, which expands the set of attributes you can pass to your pods as environment variables. In versions 1.7 and above, you can pass the host IP to any pod by adding an environment variable to the PodSpec. For instance, your application manifest might look like this:

```yaml
env:
    - name: DD_AGENT_HOST
      valueFrom:
          fieldRef:
              fieldPath: status.hostIP
```

With this, any pod running your application is able to send DogStatsD metrics with port `8125` on `$DD_AGENT_HOST`.

**Note**: As a best practice, Datadog recommends using unified service tagging when assigning attributes. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to unify your environment, see [unified service tagging][4].

#### Origin detection over UDP

Origin detection is supported in Agent 6.10.0+ and allows DogStatsD to detect where the container metrics come from, and tag metrics automatically. When this mode is enabled, all metrics received through UDP are tagged by the same pod tags as Autodiscovery metrics.

1. To activate origin detection, add the `global.originDetectionUnified.enabled` setting to your `datadog-agent.yaml` manifest:

    ```yaml
    global:
        originDetectionUnified:
            enabled: true
    ```

**Notes**: 
* An alternative to UDP is [Unix Domain Sockets][5].
* Origin detection with UDP can use the pod ID as the entity ID.

To use pod ID as the entity ID, add the following lines to your application manifest:

```yaml
env:
    - name: DD_ENTITY_ID
      valueFrom:
          fieldRef:
              fieldPath: metadata.uid
```

To set [tag cardinality][6] for the metrics collected using origin detection, set the setting `features.dogstatsd.tagCardinality` to either `low` (default), `orchestrator` or `high`.

**Note:** For UDP, `pod_name` tags are not added by default to avoid creating too many [custom metrics][7].

[1]: /developers/dogstatsd/unix_socket/
[2]: https://github.com/containernetworking/cni
[3]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[4]: /getting_started/tagging/unified_service_tagging
[5]: /developers/dogstatsd/unix_socket/?tab=host#using-origin-detection-for-container-tagging
[6]: /getting_started/tagging/assigning_tags/#environment-variables
[7]: /metrics/custom_metrics/
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

     **Note**: `hostPort` functionality requires a networking provider that adheres to the [CNI specification][3], such as Calico, Canal, or Flannel. For more information, including a workaround for non-CNI network providers, see the Kubernetes documentation: [HostPort services do not work][4].

     **Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources. If your network plugin doesn't support `hostPorts`, so add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod does not start. Some Kubernetes installations do not allow this.

2. Upgrade your Agent configuration:

    ``` shell
    helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
    ```

3. Update your application pods: Your application needs a reliable way to determine the IP address of its host. This is made simple in Kubernetes 1.7, which expands the set of attributes you can pass to your pods as environment variables. In versions 1.7 and above, you can pass the host IP to any pod by adding an environment variable to the PodSpec. For instance, your application manifest might look like this:

    ```yaml
    env:
        - name: DD_AGENT_HOST
          valueFrom:
              fieldRef:
                  fieldPath: status.hostIP
    ```

     With this, any pod running your application is able to send DogStatsD metrics through port `8125` on `$DD_AGENT_HOST`.

[1]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: https://github.com/DataDog/helm-charts/blob/master/charts/datadog/values.yaml
[3]: https://github.com/containernetworking/cni
[4]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
{{% /tab %}}
{{< /tabs >}}

### Code

#### Install the DogStatsD client

Official Datadog-DogStatsD client libraries are available for the following languages. Any compliant StatsD client works with DogStatsD and the Agent, but does not include the Datadog-specific features mentioned above:
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
go get github.com/DataDog/datadog-go/v5/statsd
```

{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

The Java DataDog StatsD Client is distributed with maven central, and can be [downloaded from Maven][1]. Start by adding the following configuration to your `pom.xml`:

```xml
<dependency>
    <groupId>com.datadoghq</groupId>
    <artifactId>java-dogstatsd-client</artifactId>
    <version>4.2.1</version>
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

Install the package directly using the Nuget CLI or get [the PackageReference from NuGet][1]:

```shell
dotnet add package DogStatsD-CSharp-Client
```

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

<div class="alert alert-warning">
  By default, Python DogStatsD client instances (including the <code>statsd</code> global instance) cannot be shared across processes but are thread-safe. Because of this, the parent process and each child process must create their own instances of the client or the buffering must be explicitly disabled by setting <code>disable_buffering</code> to <code>True</code>. See the documentation on <a href="https://datadogpy.readthedocs.io/en/latest/#datadog-dogstatsd">datadog.dogstatsd</a> for more details.
</div>

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
# Import the library
require 'datadog/statsd'

# Create a DogStatsD client instance.
statsd = Datadog::Statsd.new('localhost', 8125)
```

<div class="alert alert-info">
  If you use DogStatsD with the Container Agent or in Kubernetes, you must instantiate the host to which StatsD metrics are forwarded to with the <code>$DD_DOGSTATSD_SOCKET</code> environment variable if using a Unix Domain Socket, or with the <code>$DD_AGENT_HOST</code> environment variable if you are using the host port binding method.
</div>

{{< /programming-lang >}}

{{< programming-lang lang="go" >}}

```go
dogstatsd_client, err := statsd.New("127.0.0.1:8125")
if err != nil {
    log.Fatal(err)
}
```

For more options, see [Datadog's GoDoc][1].



[1]: https://pkg.go.dev/github.com/DataDog/datadog-go/v5/statsd
{{< /programming-lang >}}

{{< programming-lang lang="java" >}}

```java
import com.timgroup.statsd.NonBlockingStatsDClientBuilder;
import com.timgroup.statsd.StatsDClient;

public class DogStatsdClient {

    public static void main(String[] args) throws Exception {

        StatsDClient statsd = new NonBlockingStatsDClientBuilder()
            .prefix("statsd")
            .hostname("localhost")
            .port(8125)
            .build();


        // alternatively
        StatsDClient statsdAlt = new NonBlockingStatsDClient(
            new NonBlockingStatsDClientBuilder(
                .prefix("statsd")
                .hostname("localhost")
                .port(8125)
                .resolve()));

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
    if (!dogStatsdService.Configure(dogstatsdConfig))
        throw new InvalidOperationException("Cannot initialize DogstatsD. Set optionalExceptionHandler argument in the `Configure` method for more information.");
    // ...
} // Flush metrics not yet sent
```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

### Client instantiation parameters

**Note**: As a best practice, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to unify your environment, see [unified service tagging][8].

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

For the full list of optional parameters available for `datadog.initialize()` as well as parameters only available when explicitly instantiating `datadog.dogstatsd.DogStatsd` instances, see the [Datadog Python library][1].


[1]: https://datadogpy.readthedocs.io/en/latest
{{< /programming-lang >}}
{{< programming-lang lang="ruby" >}}

| Parameter       | Type            | Default     | Description                                                                                                    |
| --------------- | --------------- | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `host`          | String          | `localhost` | The host of your DogStatsD server.                                                                             |
| `port`          | Integer         | `8125`      | The port of your DogStatsD server.                                                                             |
| `socket_path`   | String          | `null`      | The path to the DogStatsD Unix domain socket (overrides `host` and `port`, only supported with the Agent v6+). |
| `tags`          | List of strings | `null`      | Tags to apply to all metrics, events, and service checks.                                                      |
| `namespace`     | String          | `null`      | Namespace to prefix to all metrics, events, and service checks.                                                |
| `single_thread` | Boolean         | `false`     | Makes the client send the metrics on the main thread when enabled rather than in a companion thread.           |

For the full list of optional parameters, see the [dogstatsd-ruby repo][1] on GitHub.


[1]: https://github.com/DataDog/dogstatsd-ruby
{{< /programming-lang >}}
{{< programming-lang lang="go" >}}

The Go client has multiple options for configuring the behavior of your client.

| Parameter                     | Type            | Description                                                                  |
| ----------------------------- | --------------- | ---------------------------------------------------------------------------- |
| `WithNamespace()`             | String          | Configure a namespace to prefix to all metrics, events, and service checks.  |
| `WithTags()`                  | List of strings | Global tags applied to every metric, event, and service check.               |

For all available options, see [Datadog's GoDoc][1].


[1]: https://pkg.go.dev/github.com/DataDog/datadog-go/v5/statsd#Option
{{< /programming-lang >}}
{{< programming-lang lang="java" >}}

As of v2.10.0 the recommended way to instantiate the client is with the NonBlockingStatsDClientBuilder. You
can use the following builder methods to define the client parameters.

| Builder Method                               | Type           | Default   | Description                                                                         |
| -------------------------------------------- | -------------- | --------- | ----------------------------------------------------------------------------------- |
| `prefix(String val)`                         | String         | null      | The prefix to apply to all metrics, events, and service checks.                     |
| `hostname(String val)`                       | String         | localhost | The host name of the targeted StatsD server.                                        |
| `port(int val)`                              | Integer        | 8125      | The port of the targeted StatsD server.                                             |
| `constantTags(String... val)`                | String varargs | null      | Global tags to be applied to every metric, event, and service check.                |
| `blocking(boolean val)`                      | Boolean        | false     | The type of client to instantiate: blocking vs non-blocking.                        |
| `socketBufferSize(int val)`                  | Integer        | -1        | The size of the underlying socket buffer.                                           |
| `enableTelemetry(boolean val)`               | Boolean        | false     | Client telemetry reporting.                                                         |
| `entityID(String val)`                       | String         | null      | Entity ID for origin detection.                                                   |
| `errorHandler(StatsDClientErrorHandler val)` | Integer        | null      | Error handler in case of an internal client error.                                  |
| `maxPacketSizeBytes(int val)`                | Integer        | 8192/1432 | The maximum packet size; 8192 over UDS, 1432 for UDP.                               |
| `processorWorkers(int val)`                  | Integer        | 1         | The number of processor worker threads assembling buffers for submission.           |
| `senderWorkers(int val)`                     | Integer        | 1         | The number of sender worker threads submitting buffers to the socket.               |
| `poolSize(int val)`                          | Integer        | 512       | Network packet buffer pool size.                                                    |
| `queueSize(int val)`                         | Integer        | 4096      | Maximum number of unprocessed messages in the queue.                                |
| `timeout(int val)`                           | Integer        | 100       | the timeout in milliseconds for blocking operations. Applies to unix sockets only.  |

For more information, search the Java DogStatsD [package][1] for the NonBlockingStatsDClient Class and NonBlockingStatsDClientBuilder Class. Make sure you view the version that matches your client release.


[1]: https://javadoc.io/doc/com.datadoghq/java-dogstatsd-client/latest/index.html
{{< /programming-lang >}}
{{< programming-lang lang="PHP" >}}

| Parameter     | Type            | Default     | Description                                                                                                                                                                                          
          |
| ------------- | --------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `host`        | String          | `localhost` | The host of your DogStatsD server. If this is not set the Agent looks at the `DD_AGENT_HOST` or `DD_DOGSTATSD_URL` environment variable.                                                               |
| `port`        | Integer         | `8125`      | The port of your DogStatsD server. If this is not set, the Agent looks at the `DD_DOGSTATSD_PORT` or `DD_DOGSTATSD_URL` environment variable.                                                          |
| `socket_path` | String          | `null`      | The path to the DogStatsD Unix domain socket (overrides `host` and `port`). This is only supported with Agent v6+. If this is not set, the Agent looks at the `DD_DOGSTATSD_URL` environment variable. |
| `global_tags` | List of Strings | `null`      | Tags to apply to all metrics, events, and service checks. The `@dd.internal.entity_id` tag is appended to global_tags from the `DD_ENTITY_ID` environment variable.                                    |

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
{{< nextlink href="/metrics/custom_metrics/dogstatsd_metrics_submission/" >}}Send metrics to Datadog with DogStatsD.{{< /nextlink >}}
{{< nextlink href="/service_management/events/guides/dogstatsd/" >}}Send events to Datadog with DogStatsD.{{< /nextlink >}}
{{< nextlink href="/developers/service_checks/dogstatsd_service_checks_submission/" >}}Send service checks to Datadog with DogStatsD.{{< /nextlink >}}
{{< /whatsnext >}}

If you're interested in learning more about the datagram format used by DogStatsD, or want to develop your own Datadog library, see the [datagram and shell usage][9] section, which also explains how to send metrics and events straight from the command line.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/etsy/statsd
[2]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[3]: https://hub.docker.com/r/datadog/dogstatsd
[4]: https://gcr.io/datadoghq/dogstatsd
[5]: /metrics/custom_metrics/
[6]: /service_management/events/guides/dogstatsd/
[7]: /developers/service_checks/dogstatsd_service_checks_submission/
[8]: /getting_started/tagging/unified_service_tagging
[9]: /developers/dogstatsd/datagram_shell/
