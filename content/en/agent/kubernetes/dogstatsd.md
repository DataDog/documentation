---
title: Sending Custom Metrics to DogStatsD for Kubernetes
kind: documentation
further_reading:
- link: "agent/kubernetes/metrics"
  tag: "documentation"
  text: Kubernetes Metrics
- link: "developers/dogstatsd"
  tag: "documentation"
  text: DogStatsD
---

To emit custom metrics from your Kubernetes application, use [DogStatsD][1], a metrics aggregation service bundled with the Datadog Agent. DogStatsD implements the [StatsD][2] protocol with some differences. See more on the [DogStatsD documentation][1].

## Use DogStatsD over a Unix Domain Socket

You can use [DogStatsD over a Unix Domain Socket][3].

### Create a listening socket

Edit your `datadog.yaml` file to set the `dogstatsd_socket` option to the path where DogStatsD should create its listening socket:

```
dogstatsd_socket: /var/run/datadog/dsd.socket
```

And [restart your Agent][4]. You can also set the socket path via the `DD_DOGSTATSD_SOCKET` environment variable.

### Share the socket path with your application

The socket file needs to be accessible to the client containers. Mount a host directory on both sides: read-only in client containers, and read-write in the Agent container.

In your Agent container:

```yaml
volumeMounts:
  - name: dsdsocket
    mountPath: /var/run/datadog
...
volumes:
- hostPath:
    path: /var/run/datadog/
  name: dsdsocket
```

In your client containers:

```yaml
volumeMounts:
  - name: dsdsocket
    mountPath: /var/run/datadog
    readOnly: true
...
volumes:
- hostPath:
    path: /var/run/datadog/
  name: dsdsocket
```

For more details, see the [DogStatsD over a Unix Domain Socket documentation][3].

## Alternatively, use hostPort

### Bind the DogStatsD port to a host port

1. Add a `hostPort` to your `datadog-agent.yaml` manifest:

      ```yaml
      ports:
        - containerPort: 8125
          hostPort: 8125
          name: dogstatsdport
          protocol: UDP
      ```

    This enables your applications to send metrics via DogStatsD on port `8125` on whichever node they happen to be running.

    **Note**: `hostPort` functionality requires a networking provider that adheres to the [CNI specification][5], such as Calico, Canal, or Flannel. For more information, including a workaround for non-CNI network providers, consult the [Kubernetes documentation][6].

2. Enable DogStatsD non local traffic to allow StatsD data collection, set `DD_DOGSTATSD_NON_LOCAL_TRAFFIC` to `true` in your `datadog-agent.yaml` manifest:

        - name: DD_DOGSTATSD_NON_LOCAL_TRAFFIC
          value: "true"

    This allows collecting StatsD data from other containers than the one running the Agent.

3. Apply the change:

      ```
      kubectl apply -f datadog-agent.yaml
      ```

**Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources.  Another word of caution: some network plugins don't support `hostPorts` yet, so this won't work.
The workaround in this case is to add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. It also means that all ports opened on the container are also opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod will not start. Not all Kubernetes installations allow this.

### Pass the node's IP address to your application

Your application needs a reliable way to determine the IP address of its host. This is made simple in Kubernetes 1.7, which expands the set of attributes you can [pass to your pods as environment variables][7]. In versions 1.7 and above, you can pass the host IP to any pod by adding an environment variable to the PodSpec. For instance, your application manifest might look like this:

```yaml
env:
  - name: DD_AGENT_HOST
    valueFrom:
      fieldRef:
        fieldPath: status.hostIP
```

With this, any pod running your application is able to send DogStatsD metrics via port `8125` on `$DD_AGENT_HOST`.

## Origin detection over UDP

Origin detection allows DogStatsD to detect where the container metrics come from, and tag metrics automatically. When this mode is enabled, all metrics received via UDP are tagged by the same container tags as Autodiscovery metrics.

**Note**: An alternative to UDP is [Unix Domain Sockets][8].

To enable origin detection over UDP, add the following lines to your application manifest:

```yaml
env:
  - name: DD_ENTITY_ID
    valueFrom:
      fieldRef:
        fieldPath: metadata.uid
```

Origin detection is supported in Agent 6.10.0+ and in the following client libraries:

| Library      | Version |
| ------------ | ------- |
| [Go][9]      | 2.2     |
| [PHP][10]     | 1.4.0   |
| [Python][11] | 0.28.0  |
| [Ruby][12]   | 4.2.0   |
| [C#][13]     | 3.3.0   |
| [Java][14]   | 2.8     |

To set [tag cardinality][15] for the metrics collected using origin detection, use the environment variable `DD_DOGSTATSD_TAG_CARDINALITY`.

There are two environment variables that set tag cardinality: `DD_CHECKS_TAG_CARDINALITY` and `DD_DOGSTATSD_TAG_CARDINALITY`—as DogStatsD is priced differently, its tag cardinality setting is separated in order to provide the opportunity for finer configuration. Otherwise, these variables function the same way: they can have values `low`, `orchestrator`, or `high`. They both default to `low`.

## Instrument your code to send metrics to DogStatsD

Once your application can send metrics via DogStatsD on each node, you can instrument your application code to submit custom metrics.

**[See the full list of Datadog DogStatsD Client Libraries][16]**

For instance, if your application is written in Go, import Datadog's [Go library][9], which provides a DogStatsD client library:

```
import "github.com/DataDog/datadog-go/statsd"
```

Before you can add custom counters, gauges, etc., [initialize the StatsD client][17] with the location of the DogStatsD service, depending on the method you have chosen:

- Unix Domain Socket: `$DD_DOGSTATSD_SOCKET`
- hostPort: `$DD_AGENT_HOST`

```go
func main(){

  // other main() code omitted for brevity

  // use host IP and port to define endpoint
  dogstatsd, err := statsd.New(os.Getenv("DOGSTATSD_HOST_IP") + ":8125")
  // alternatively, use the unix socket path
  // dogstatsd, err = statsd.New(os.Getenv("DD_DOGSTATSD_SOCKET"))
  if err != nil{
    log.Printf("Cannot get a DogStatsD client.")
  } else {
    // prefix every metric and event with the app name
    dogstatsd.Namespace = "My Application"

    // post an event to Datadog at app startup
    dogstatsd.Event(&statsd.Event{
      Title: "My application started.",
      Text: "My application started.",
      })
  }
}
```

You can also increment a custom metric for each of your handler functions. For example, every time the `InfoHandler` function is called, it increments the `request_count` metric by 1, while applying the tag `endpoint:info` to that data point:

```go
func InfoHandler(rw http.ResponseWriter, req *http.Request) {
    dogstatsd.Incr("request_count", []string{"endpoint:info"}, 1)
    info := HandleError(masterPool.Get(0).Do("INFO")).([]byte)
    rw.Write(info)
}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /developers/metrics/dogstatsd_metrics_submission
[2]: https://github.com/etsy/statsd
[3]: /developers/dogstatsd/unix_socket
[4]: /agent/guide/agent-commands
[5]: https://github.com/containernetworking/cni
[6]: https://kubernetes.io/docs/setup/independent/troubleshooting-kubeadm/#hostport-services-do-not-work
[7]: https://kubernetes.io/docs/tasks/inject-data-application/downward-api-volume-expose-pod-information
[8]: /developers/dogstatsd/unix_socket/#using-origin-detection-for-container-tagging
[9]: https://github.com/DataDog/datadog-go
[10]: https://github.com/DataDog/php-datadogstatsd
[11]: https://github.com/DataDog/datadogpy
[12]: https://github.com/DataDog/dogstatsd-ruby
[13]: https://github.com/DataDog/dogstatsd-csharp-client
[14]: https://github.com/DataDog/java-dogstatsd-client
[15]: /tagging/assigning_tags/#environment-variables
[16]: /developers/libraries/#api-and-dogstatsd-client-libraries
[17]: https://gist.github.com/johnaxel/fe50c6c73442219c48bf2bebb1154f91
