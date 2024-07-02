---
title: DogStatsD over Unix Domain Socket
kind: documentation
description: 'Usage documentation for DogStatsD over Unix Domain Sockets'
aliases:
    - /developers/metrics/unix_socket/
further_reading:
    - link: developers/dogstatsd
      tag: Documentation
      text: Introduction to DogStatsD
    - link: developers/libraries
      tag: Documentation
      text: Official and Community created API and DogStatsD client libraries
---

Starting with version 6.0, the Agent can ingest metrics with a Unix Domain Socket (UDS) as an alternative to UDP transport.

While UDP works great on `localhost`, it can be a challenge to set up in containerized environments. Unix Domain Sockets allow you to establish the connection with a socket file, regardless of the IP of the Datadog Agent container. It also enables the following benefits:

- Bypassing the networking stack brings a significant performance improvement for high traffic.
- While UDP has no error handling, UDS allows the Agent to detect dropped packets and connection errors, while still allowing a non-blocking use.
- DogStatsD can detect the container from which metrics originated and tag those metrics accordingly.

## How it works

Instead of using an `IP:port` pair to establish connections, Unix Domain Sockets use a placeholder socket file. Once the connection is open, data is transmitted in the same [datagram format][1] as for the UDP transport. When the Agent restarts, the existing socket is deleted and replaced by a new one. Client libraries detect this change and connect seamlessly to the new socket.

**Notes:**

* By design, UDS traffic is local to the host, which means the Datadog Agent must run on every host you send metrics from.
* UDS is not supported on Windows.

## セットアップ

To set up DogStatsD with Unix Domain Socket, enable the DogStatsD server through the `dogstatsd_socket` parameter. Then, configure the [DogStatsD client](#dogstatsd-client-configuration) in your code.

To enable the Agent DogStatsD UDS:

{{< tabs >}}
{{% tab "Host" %}}

1. Create a socket file for DogStatsD to use as a listening socket. For example:
   ```shell
   sudo mkdir -p /var/run/datadog/
   ```
1. Ensure that the `dd-agent` user has read and write permissions to the socket file:
   ```shell
   sudo chown dd-agent:dd-agent /var/run/datadog/
   ```
1. Edit the [Agent's main configuration file][1]:
   1. Set `use_dogstatsd` to `true`.
   1. Set `dogstatsd_socket` to the path where DogStatsD should create its listening socket:

      ```yaml
      ## @param dogstatsd_socket - string - optional - default: ""
      ## Listen for Dogstatsd metrics on a Unix Socket (*nix only).
      ## Set to a valid and existing filesystem path to enable.
      #
      dogstatsd_socket: '/var/run/datadog/dsd.socket'
      ```
1. [Restart your Agent][2].


[1]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Docker" %}}

1. Set the socket path with the `DD_DOGSTATSD_SOCKET=<YOUR_UDS_PATH>` environment variable on the Agent container.

2. Make the socket file accessible to the application containers by mounting a host directory on both sides (read-only in your application containers and read-write in the Agent container). Mounting the parent folder instead of the individual socket enables socket communication to persist across DogStatsD restarts:

    - Start the Agent container with `-v /var/run/datadog:/var/run/datadog`
    - Start your application containers with `-v /var/run/datadog:/var/run/datadog:ro`

{{% /tab %}}
{{% tab "Kubernetes" %}}

1. Set the socket path with the `DD_DOGSTATSD_SOCKET=<YOUR_UDS_PATH>` environment variable on the Agent container (example: `/var/run/datadog/dsd.socket`).

2. Make the socket file accessible to the application containers by mounting a host directory on both sides (read-only in your application containers and read-write in the Agent container). Mounting the parent folder instead of the individual socket enables socket communication to persist across DogStatsD restarts.

    - Mount the socket folder in your `datadog-agent` container:

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

    - Expose the same folder in your application containers:

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

        **Note**: Remove `readOnly: true` if your application containers need write access to the socket.

{{% /tab %}}
{{% tab "EKS Fargate" %}}

1. Set the socket path with the `DD_DOGSTATSD_SOCKET=<YOUR_UDS_PATH>` environment variable on the Agent container (example: `/var/run/datadog/dsd.socket`).

2. Make the socket file accessible to the application containers by mounting an empty directory on both sides (read-only in your application containers and read-write in the Agent container). Mounting the parent folder instead of the individual socket enables socket communication to persist across DogStatsD restarts.

    - Mount the empty folder in your pod spec:

        ```yaml
        volumes:
            - emptyDir: {}
              name: dsdsocket
        ```

    - Mount the socket folder in your `datadog-agent` container:

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
        ```

    - Expose the same folder in your application containers:

        ```yaml
        volumeMounts:
            - name: dsdsocket
              mountPath: /var/run/datadog
              readOnly: true
        ```

        **Note**: Remove `readOnly: true` if your application containers need write access to the socket.

{{% /tab %}}
{{< /tabs >}}

### Test with netcat

To send metrics from shell scripts, or to test that DogStatsD is listening on the socket, use `netcat`. Most implementations of `netcat`, such as `netcat-openbsd` on Debian or `nmap-ncat` on RHEL, support Unix Socket traffic with the `-U` flag:

```shell
echo -n "custom.metric.name:1|c" | nc -U -u -w1 /var/run/datadog/dsd.socket
```

### Origin detection

Origin detection allows DogStatsD to detect where the container metrics come from, and tag metrics automatically. When this mode is enabled, all metrics received by UDS are tagged with the same container tags as Autodiscovery metrics.

{{< tabs >}}
{{% tab "Host" %}}

1. Enable the `dogstatsd_origin_detection` option in your [Agent's main configuration file][1]:

    ```yaml
    ## @param dogstatsd_origin_detection - boolean - optional - default: false
    ## When using Unix Socket, DogStatsD can tag metrics
    ## with container metadata. If running DogStatsD in a container,
    ## host PID mode (for example, with --pid=host) is required.
    #
    dogstatsd_origin_detection: true
    ```

2. Optional - To configure [tag cardinality][2] for the metrics collected using origin detection, set the parameter `dogstatsd_tag_cardinality` to `low` (default), `orchestrator`, or `high`:

    ```yaml
    ## @param dogstatsd_tag_cardinality - string - optional - default: low
    ## Configure the level of granularity of tags to send for DogStatsD
    ## metrics and events. Choices are:
    ##   * low: add tags about low-cardinality objects
    ##     (clusters, hosts, deployments, container images, ...)
    ##   * orchestrator: add tags about pods (Kubernetes),
    ##     or tasks (ECS or Mesos) -level of cardinality
    ##   * high: add tags about high-cardinality objects
    ##     (individual containers, user IDs in requests, etc.)
    ##
    ## WARNING: Sending container tags for DogStatsD metrics may create
    ## more metrics (one per container instead of one per host).
    ## This may impact your custom metrics billing.
    #
    dogstatsd_tag_cardinality: low
    ```

3. [Restart your Agent][3].


[1]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /getting_started/tagging/assigning_tags/#environment-variables
[3]: /agent/configuration/agent-commands/
{{% /tab %}}
{{% tab "Docker" %}}

1. Set the `DD_DOGSTATSD_ORIGIN_DETECTION=true` environment variable for the Agent container.

2. Optional - To configure [tag cardinality][1] for the metrics collected using origin detection, set the environment variable `DD_DOGSTATSD_TAG_CARDINALITY` to `low` (default), `orchestrator`, or `high`.

When running inside a container, DogStatsD needs to run in the host's PID namespace for origin detection to work reliably. Enable this in Docker with the `--pid=host` flag. This is supported by ECS with the parameter `"pidMode": "host"` in the task definition of the container. This option is not supported in Fargate. For more information, see the AWS documentation on [PID mode][2].


[1]: /getting_started/tagging/assigning_tags/#environment-variables
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
{{% /tab %}}
{{% tab "Kubernetes" %}}

1. Set the `DD_DOGSTATSD_ORIGIN_DETECTION` environment variable to true for the Agent container:

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_ORIGIN_DETECTION
          value: 'true'
    ```

2. Set `hostPID: true` in the pod template spec:

    ```yaml
    # (...)
    spec:
        # (...)
        hostPID: true
    ```

3. Optional - To configure [tag cardinality][1] for the metrics collected using origin detection, set the environment variable `DD_DOGSTATSD_TAG_CARDINALITY` to `low` (default), `orchestrator`, or `high`:

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_TAG_CARDINALITY
          value: 'low'
    ```

[1]: /getting_started/tagging/assigning_tags/#environment-variables
{{% /tab %}}
{{% tab "EKS Fargate" %}}

1. Set the `DD_DOGSTATSD_ORIGIN_DETECTION` environment variable to true for the Agent container:

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_ORIGIN_DETECTION
          value: 'true'
    ```

2. Set `shareProcessNamespace: true` in the pod template spec:

    ```yaml
    # (...)
    spec:
        # (...)
        shareProcessNamespace: true
    ```

3. Optional - To configure [tag cardinality][1] for the metrics collected using origin detection, set the environment variable `DD_DOGSTATSD_TAG_CARDINALITY` to `low` (default), `orchestrator`, or `high`:

    ```yaml
    # (...)
    env:
        # (...)
        - name: DD_DOGSTATSD_TAG_CARDINALITY
          value: 'low'
    ```

[1]: /getting_started/tagging/assigning_tags/#environment-variables
{{% /tab %}}
{{< /tabs >}}

**Note:** `container_id`, `container_name`, and `pod_name` tags are not added by default to avoid creating too many [custom metrics][2].

## DogStatsD client configuration

### Client libraries

The following official DogStatsD client libraries natively support UDS traffic. See the library's documentation on how to enable UDS traffic. **Note**: As with UDP, enabling client-side buffering is recommended to improve performance on heavy traffic:

| Language | Library                              |
| -------- | ------------------------------------ |
| Golang   | [DataDog/datadog-go][3]              |
| Java     | [DataDog/java-dogstatsd-client][4]   |
| Python   | [DataDog/datadogpy][5]               |
| Ruby     | [DataDog/dogstatsd-ruby][6]          |
| PHP      | [DataDog/php-datadogstatsd][7]       |
| C#       | [DataDog/dogstatsd-csharp-client][8] |

### socat proxy

If an application or a client library does not support UDS traffic, run `socat` to listen on UDP port `8125` and proxy the requests to the socket:

```shell
socat -s -u UDP-RECV:8125 UNIX-SENDTO:/var/run/datadog/dsd.socket
```

For guidelines on creating additional implementation options, see the [datadog-agent GitHub wiki][9].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /metrics/custom_metrics/dogstatsd_metrics_submission/
[2]: /metrics/custom_metrics/
[3]: https://github.com/DataDog/datadog-go#unix-domain-sockets-client
[4]: https://github.com/DataDog/java-dogstatsd-client#unix-domain-socket-support
[5]: https://github.com/DataDog/datadogpy#instantiate-the-dogstatsd-client-with-uds
[6]: https://github.com/DataDog/dogstatsd-ruby#configuration
[7]: https://github.com/DataDog/php-datadogstatsd
[8]: https://github.com/DataDog/dogstatsd-csharp-client#unix-domain-socket-support
[9]: https://github.com/DataDog/datadog-agent/wiki/Unix-Domain-Sockets-support
