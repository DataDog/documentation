---
title: DogStatsD over Unix Domain Socket
kind: documentation
description: "Usage documentation for DogStatsD over Unix Domain Sockets"
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

Starting with version 6.0, the Datadog Agent is able to ingest metrics via a Unix Domain Socket (UDS), as an alternative to UDP, when running on Linux systems.

While UDP works great on `localhost`, it can be a challenge to setup in containerized environments. Unix Domain Sockets allow you to easily establish the connection via a socket file, regardless of the IP of the Datadog Agent container. It also enables the following benefits:

* Bypassing the networking stack brings a significant performance improvement for high traffic
* While UDP has no error handling, UDS allows the Agent to detect dropped packets and connection errors, while still allowing a non-blocking use
* DogStatsD is able to detect the container from which metrics originated, and tag those metrics accordingly

## How it works

Instead of using an `IP:port` pair to establish connections, Unix Domain Sockets use a placeholder socket file. Once the connection is open, data is transmitted in the same [datagram format][1] as UDP.

When the Agent restarts, the existing socket is deleted and replaced by a new one. Client libraries detect this change and connect seamlessly to the new socket.

**Note:** By design, UDS traffic is local to the host, which means the Datadog Agent must run on every host you send metrics from.

## Setup

### Agent

Edit your `datadog.yaml` file to set the `dogstatsd_socket` option to the path where DogStatsD should create its listening socket:

```yaml
dogstatsd_socket: /var/run/datadog/dsd.socket
```

Then [restart your Agent][2]. You can also set the socket path via the `DD_DOGSTATSD_SOCKET` environment variable.

### Client

#### Native support in client libraries

The following DogStatsD client libraries natively support UDS traffic:

| Language | Library                            |
|----------|------------------------------------|
| Golang   | [DataDog/datadog-go][3]            |
| Java     | [DataDog/java-dogstatsd-client][4] |
| Python   | [DataDog/datadogpy][5]             |
| Ruby     | [DataDog/dogstatsd-ruby][6]        |

Refer to the library's documentation on how to enable UDS traffic.

**Note:** As with UDP, enabling client-side buffering is highly recommended to improve performance on heavy traffic. Refer to your client library's documentation for instructions.

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

### Accessing the socket across containers

When running in a containerized environment, the socket file needs to be accessible to the client containers. To achieve this, Datadog recommends mounting a host directory on both sides (read-only in your client containers, read-write in the Agent container).

Mounting the parent folder instead of the individual socket enables socket communication to persist across DogStatsD restarts.

#### Docker: bind mount

* Start the Agent container with `-v /var/run/datadog:/var/run/datadog`
* Start your containers with `-v /var/run/datadog:/var/run/datadog:ro`

#### Kubernetes: `hostPath` volume

Mount the folder in your `datadog-agent` container:

```
volumeMounts:
  - name: dsdsocket
    mountPath: /var/run/datadog
...
volumes:
- hostPath:
    path: /var/run/datadog/
  name: dsdsocket
```

Expose the same folder in your client containers:

```
volumeMounts:
  - name: dsdsocket
    mountPath: /var/run/datadog
    readOnly: true                  # see note below
...
volumes:
- hostPath:
    path: /var/run/datadog/
  name: dsdsocket
```

**Note**: Remove `readOnly: true` if your client containers need write access to the socket.

## Using origin detection for container tagging

Origin detection allows DogStatsD to detect where the container metrics come from, and tag metrics automatically. When this mode is enabled, all metrics received via UDS is tagged by the same container tags as Autodiscovery metrics. **Note:** `container_id`, `container_name` and `pod_name` tags are not added to avoid creating too many custom metric contexts.

To use origin detection, enable the `dogstatsd_origin_detection` option in your `datadog.yaml`, or set the environment variable `DD_DOGSTATSD_ORIGIN_DETECTION=true`, and [restart your Agent][2].

When running inside a container, DogStatsd needs to run in the host's PID namespace for origin detection to work reliably. You can enable this via the Docker `--pid=host` flag. **Note**: This is supported by ECS with the parameter `"pidMode": "host"` in the task definition of the container. This option is not supported in Fargate. For more information, see the [AWS documentation][7].

## Client library implementation guidelines

Adding UDS support to existing libraries can be easily achieved as the protocol is very close to UDP. Implementation guidelines and a testing checklist are available in the [datadog-agent wiki][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/dogstatsd/data_types
[2]: /agent/guide/agent-commands
[3]: https://github.com/DataDog/datadog-go
[4]: https://github.com/DataDog/java-dogstatsd-client
[5]: https://github.com/DataDog/datadogpy
[6]: https://github.com/DataDog/dogstatsd-ruby
[7]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html#task_definition_pidmode
[8]: https://github.com/DataDog/datadog-agent/wiki/Unix-Domain-Sockets-support
