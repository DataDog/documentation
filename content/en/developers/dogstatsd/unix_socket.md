---
title: DogStatsD over Unix Domain Socket
kind: documentation
description: "Usage documentation for DogStatsD over Unix Domain Sockets"
aliases:
- /developers/metrics/unix_socket/
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

Starting with v6.0, the Agent can ingest metrics with a Unix Domain Socket (UDS) as an alternative to UDP when running on Linux systems.

While UDP works great on `localhost`, it can be a challenge to set up in containerized environments. Unix Domain Sockets allow you to establish the connection with a socket file, regardless of the IP of the Datadog Agent container. It also enables the following benefits:

* Bypassing the networking stack brings a significant performance improvement for high traffic
* While UDP has no error handling, UDS allows the Agent to detect dropped packets and connection errors, while still allowing a non-blocking use
* DogStatsD can detect the container from which metrics originated and tag those metrics accordingly.

## How it works

Instead of using an `IP:port` pair to establish connections, Unix Domain Sockets use a placeholder socket file. Once the connection is open, data is transmitted in the same [datagram format][1] as UDP. When the Agent restarts, the existing socket is deleted and replaced by a new one. Client libraries detect this change and connect seamlessly to the new socket.

**Note:** By design, UDS traffic is local to the host, which means the Datadog Agent must run on every host you send metrics from.

## Setup

To set up DogStatsD, enable the DogStatsD server through the `dogstatsd_socket` parameter. Then, configure the DogStatsD client in your code.

### Agent

To enable the Agent DogStatsD server:

1. Edit the [Agent's main configuration file][2] to set `dogstatsd_socket` to the path where DogStatsD should create its listening socket:

    ```yaml
    ## @param dogstatsd_socket - string - optional - default: ""
    ## Listen for Dogstatsd metrics on a Unix Socket (*nix only). Set to a valid filesystem path to enable.
    #
    dogstatsd_socket: "/var/run/datadog/dsd.socket"
    ```

2. [Restart your Agent][3].

**Note**: You can also set the socket path with the `DD_DOGSTATSD_SOCKET` environment variable for the container Agent.

### DogStatsD Client
#### Native support in client libraries

The following official DogStatsD client libraries natively support UDS traffic. Refer to the library's documentation on how to enable UDS traffic. **Note**: As with UDP, enabling client-side buffering is highly recommended to improve performance on heavy traffic:

| Language | Library                              |
|----------|--------------------------------------|
| Golang   | [DataDog/datadog-go][4]              |
| Java     | [DataDog/java-dogstatsd-client][5]   |
| Python   | [DataDog/datadogpy][6]               |
| Ruby     | [DataDog/dogstatsd-ruby][7]          |
| PHP      | [DataDog/php-datadogstatsd][8]       |
| C#       | [DataDog/dogstatsd-csharp-client][9] |


#### Using netcat

To send metrics from shell scripts, or to test that DogStatsD is listening on the socket, you can use `netcat`. Most implementations of `netcat` (ex. `netcat-openbsd` on Debian or `nmap-ncat` on RHEL) support Unix Socket traffic via the `-U` flag:

```shell
echo -n "custom.metric.name:1|c" | nc -U -u -w1 /var/run/datadog/dsd.socket
```

#### Using socat as a proxy

If an application or a client library you use does not support UDS traffic, you can run `socat` to listen on UDP port `8125` and proxy the requests to the socket:

```shell
socat -s -u UDP-RECV:8125 UNIX-SENDTO:/var/run/datadog/dsd.socket
```

For guidelines on creating additional implementation options, refer to the [datadog-agent github wiki][10].

## Accessing the socket across containers

When running in a containerized environment, the socket file needs to be accessible to the client containers. To achieve this, Datadog recommends mounting a host directory on both sides (read-only in your client containers, read-write in the Agent container). Mounting the parent folder instead of the individual socket enables socket communication to persist across DogStatsD restarts:

{{< tabs >}}
{{% tab "Docker" %}}

* Start the Agent container with `-v /var/run/datadog:/var/run/datadog`
* Start your containers with `-v /var/run/datadog:/var/run/datadog:ro`

{{% /tab %}}
{{% tab "Kubernetes" %}}

Mount the folder in your `datadog-agent` container:

```yaml
volumeMounts:
  - name: dsdsocket
    mountPath: /var/run/datadog
##...
volumes:
- hostPath:
    path: /var/run/datadog/
  name: dsdsocket
```

Expose the same folder in your client containers:

```yaml
volumeMounts:
  - name: dsdsocket
    mountPath: /var/run/datadog
    readOnly: true
## ...
volumes:
- hostPath:
    path: /var/run/datadog/
  name: dsdsocket
```

**Note**: Remove `readOnly: true` if your client containers need write access to the socket.

{{% /tab %}}
{{< /tabs >}}

## Using origin detection for container tagging

Origin detection allows DogStatsD to detect where the container metrics come from, and tag metrics automatically. When this mode is enabled, all metrics received via UDS are tagged by the same container tags as Autodiscovery metrics.

**Note:** `container_id`, `container_name`, and `pod_name` tags are not added to avoid creating too many [custom metrics][11].

To use origin detection:

1. Enable the `dogstatsd_origin_detection` option in your [Agent's main configuration file][2]:

    ```yaml
    ## @param dogstatsd_origin_detection - boolean - optional - default: false
    ## When using Unix Socket, DogStatsD can tag metrics with container metadata.
    ## If running DogStatsD in a container, host PID mode (e.g. with --pid=host) is required.
    #
    dogstatsd_origin_detection: true
    ```

    **Note**: For the containerized Agent, set the environment variable `DD_DOGSTATSD_ORIGIN_DETECTION` to true.

2. [Restart your Agent][3].

When running inside a container, DogStatsd needs to run in the host's PID namespace for origin detection to work reliably. Enable this with the Docker `--pid=host` flag.

**Note**: This is supported by ECS with the parameter `"pidMode": "host"` in the task definition of the container. This option is not supported in Fargate. For more information, see the [AWS documentation][12].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics/dogstatsd_metrics_submission
[2]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[3]: /agent/guide/agent-commands
[4]: https://github.com/DataDog/datadog-go
[5]: https://github.com/DataDog/java-dogstatsd-client
[6]: https://github.com/DataDog/datadogpy
[7]: https://github.com/DataDog/dogstatsd-ruby
[8]: https://github.com/DataDog/php-datadogstatsd
[9]: https://github.com/DataDog/dogstatsd-csharp-client
[10]: https://github.com/DataDog/datadog-agent/wiki/Unix-Domain-Sockets-support
[11]: /developers/metrics/custom_metrics
[12]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
