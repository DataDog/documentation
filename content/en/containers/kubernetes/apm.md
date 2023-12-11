---
title: Kubernetes APM - Trace Collection
kind: documentation
aliases:
    - /agent/kubernetes/apm
further_reading:
- link: "/agent/kubernetes/log/"
  tag: "Documentation"
  text: "Collect your application logs"
- link: "/agent/kubernetes/prometheus/"
  tag: "Documentation"
  text: "Collect your Prometheus metrics"
- link: "/agent/kubernetes/integrations/"
  tag: "Documentation"
  text: "Collect automatically your applications metrics and logs"
- link: "/agent/guide/autodiscovery-management/"
  tag: "Documentation"
  text: "Limit data collection to a subset of containers only"
- link: "/agent/kubernetes/tag/"
  tag: "Documentation"
  text: "Assign tags to all data emitted by a container"
---

This page describes how to set up and configure [Application Performance Monitoring (APM)][10] for your Kubernetes application.

{{< img src="tracing/visualization/troubleshooting_pipeline_kubernetes.png" alt="The APM troubleshooting pipeline: The tracer sends traces and metrics data from the application pod to the Agent pod, which sends it to the Datadog backend to be shown in the Datadog UI.">}}

You can send traces over Unix Domain Socket (UDS), TCP (`IP:Port`), or Kubernetes service. Datadog recommends that you use UDS, but it is possible to use all three at the same time, if necessary.

## Setup
1. If you haven't already, [install the Datadog Agent][1] in your Kubernetes environment.
2. [Configure the Datadog Agent](#configure-the-datadog-agent-to-collect-traces) to collect traces.
3. [Configure application pods](#configure-your-application-pods-to-submit-traces-to-datadog-agent) to submit traces to the Datadog Agent.

### Configure the Datadog Agent to collect traces

The instructions in this section configure the Datadog Agent to receive traces over UDS. To use TCP, see the [additional configuration](#additional-configuration) section. To use Kubernetes service, see [Setting up APM with Kubernetes Service][9].

{{< tabs >}}
{{% tab "Operator" %}}
After you [use the Operator to install the Datadog Agent][1], edit your `datadog-agent.yaml` to set `features.apm.enabled` to `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    apm:
      enabled: true
      unixDomainSocketConfig:
        path: /var/run/datadog/apm.sock # default
```

When APM is enabled, the default configuration creates a directory on the host and mounts it within the Agent. The Agent then creates and listens on a socket file `/var/run/datadog/apm/apm.socket`. The application pods can then similarly mount this volume and write to this same socket. You can modify the path and socket with the `features.apm.unixDomainSocketConfig.path` configuration value.

{{% k8s-operator-redeploy %}}

**Note**: On minikube, you may receive an `Unable to detect the kubelet URL automatically` error. In this case, set `global.kubelet.tlsVerify` to `false`.

[1]: /containers/kubernetes/installation/?tab=operator#installation
{{% /tab %}}
{{% tab "Helm" %}}

If you [used Helm to install the Datadog Agent][1], APM is **enabled by default** over UDS or Windows named pipe.

To verify, ensure that `datadog.apm.socketEnabled` is set to `true` in your `values.yaml`.

```yaml
datadog:
  apm:
    socketEnabled: true    
```

The default configuration creates a directory on the host and mounts it within the Agent. The Agent then creates and listens on a socket file `/var/run/datadog/apm.socket`. The application pods can then similarly mount this volume and write to this same socket. You can modify the path and socket with the `datadog.apm.hostSocketPath` and `datadog.apm.socketPath` configuration values.

```yaml
datadog:
  apm:
    # the following values are default:
    socketEnabled: true
    hostSocketPath: /var/run/datadog/
    socketPath: /var/run/datadog/apm.socket
```

To disable APM, set `datadog.apm.socketEnabled` to `false`.

{{% k8s-helm-redeploy %}}

**Note**: On minikube, you may receive an `Unable to detect the kubelet URL automatically` error. In this case, set `datadog.kubelet.tlsVerify` to `false`.

[1]: /containers/kubernetes/installation?tab=helm#installation
{{% /tab %}}
{{< /tabs >}}

### Configure your application pods to submit traces to Datadog Agent

{{< tabs >}}

{{% tab "Datadog Admission Controller" %}}
The Datadog Admission Controller is a component of the Datadog Cluster Agent that simplifies your application pod configuration. Learn more by reading the [Datadog Admission Controller documentation][1].

Use the Datadog Admission Controller to inject environment variables and mount the necessary volumes on new application pods, automatically configuring pod and Agent trace communication. Learn how to automatically configure your application to submit traces to Datadog Agent by reading the [Injecting Libraries Using Admission Controller][2] documentation.

[1]: /agent/cluster_agent/admission_controller/
[2]: /tracing/trace_collection/library_injection_local/
{{% /tab %}}

{{% tab "Unix Domain Socket (UDS)" %}}
If you are sending traces to the Agent by using UDS, mount the host directory the socket is in (that the Agent created) to the application container and specify the path to the socket with `DD_TRACE_AGENT_URL`:

```yaml
apiVersion: apps/v1
kind: Deployment
#(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>/<TAG>"
        env:
        - name: DD_TRACE_AGENT_URL
          value: 'unix:///var/run/datadog/apm.socket'
        volumeMounts:
        - name: apmsocketpath
          mountPath: /var/run/datadog
        #(...)
      volumes:
        - hostPath:
            path: /var/run/datadog/
          name: apmsocketpath
```

### Configure your application tracers to emit traces:
After configuring your Datadog Agent to collect traces and giving your application pods the configuration on *where* to send traces, install the Datadog tracer into your applications to emit the traces. Once this is done, the tracer sends the traces to the appropriate `DD_TRACE_AGENT_URL` endpoint.

{{% /tab %}}


{{% tab TCP %}}
If you are sending traces to the Agent by using TCP (`<IP_ADDRESS>:8126`) supply this IP address to your application pods—either automatically with the [Datadog Admission Controller][1], or manually using the downward API to pull the host IP. The application container needs the `DD_AGENT_HOST` environment variable that points to `status.hostIP`:

```yaml
apiVersion: apps/v1
kind: Deployment
#(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>/<TAG>"
        env:
          - name: DD_AGENT_HOST
            valueFrom:
              fieldRef:
                fieldPath: status.hostIP
```
**Note:** This configuration requires the Agent to be configured to accept traces over TCP

### Configure your application tracers to emit traces:
After configuring your Datadog Agent to collect traces and giving your application pods the configuration on *where* to send traces, install the Datadog tracer into your applications to emit the traces. Once this is done, the tracer automatically sends the traces to the appropriate `DD_AGENT_HOST` endpoint.

[1]: /agent/cluster_agent/admission_controller/
{{% /tab %}}

{{< /tabs >}}

Refer to the [language-specific APM instrumentation docs][2] for more examples.

## Additional configuration

### Configure the Datadog Agent to accept traces over TCP
{{< tabs >}}
{{% tab "Datadog Operator" %}}

Update your `datadog-agent.yaml` with the following:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>

  features:
    apm:
      enabled: true
      hostPortConfig:
        enabled: true
        hostPort: 8126 # default
```

{{% k8s-operator-redeploy %}}

**Warning**: The `hostPort` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources. If your network plugin doesn't support `hostPorts`, add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. This also means that all ports opened on the container are opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod does not start. Some Kubernetes installations do not allow this.
{{% /tab %}}
{{% tab "Helm" %}}

Update your `values.yaml` file with the following APM configuration:

```yaml
datadog:
  apm:
    portEnabled: true
    port: 8126 # default
```

{{% k8s-helm-redeploy %}}

**Warning**: The `datadog.apm.portEnabled` parameter opens a port on your host. Make sure your firewall only allows access from your applications or trusted sources. If your network plugin doesn't support `hostPorts`, add `hostNetwork: true` in your Agent pod specifications. This shares the network namespace of your host with the Datadog Agent. This also means that all ports opened on the container are opened on the host. If a port is used both on the host and in your container, they conflict (since they share the same network namespace) and the pod does not start. Some Kubernetes installations do not allow this.
{{% /tab %}}
{{< /tabs >}}

## Agent environment variables

**Note**: As a best practice, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, refer to the dedicated [unified service tagging][3] documentation.

List of all environment variables available for tracing within the Agent running in Kubernetes:

| Environment variable       | Description                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_API_KEY`               | Datadog API Key                                                                                                                                                                                                                                                                                                        |
| `DD_PROXY_HTTPS`           | Set up the URL for the proxy to use.                                                                                                                                                                                                                                                                                        |
| `DD_APM_REPLACE_TAGS`      | [Scrub sensitive data from your span's tags][4].                                                                                                                                                                                                                                                                            |
| `DD_HOSTNAME`              | Manually set the hostname to use for metrics if autodetection fails, or when running the Datadog Cluster Agent.                                                                                                                                                                                                               |
| `DD_DOGSTATSD_PORT`        | Set the DogStatsD port.                                                                                                                                                                                                                                                                                                     |
| `DD_APM_RECEIVER_SOCKET`  | Collect your traces through a Unix Domain Sockets and takes priority over hostname and port configuration if set. Off by default, when set it must point to a valid sock file.                                                                                                                                            |
| `DD_BIND_HOST`             | Set the StatsD & receiver hostname.                                                                                                                                                                                                                                                                                         |
| `DD_LOG_LEVEL`             | Set the logging level. (`trace`/`debug`/`info`/`warn`/`error`/`critical`/`off`)                                                                                                                                                                                                                                             |
| `DD_APM_ENABLED`           | When set to `true`, the Datadog Agent accepts trace metrics. Default value is `true` (Agent 7.18+)                                                                                                                                                                                                                                                                |
| `DD_APM_CONNECTION_LIMIT`  | Sets the maximum connection limit for a 30 second time window.                                                                                                                                                                                                                                                              |
| `DD_APM_DD_URL`            | Set the Datadog API endpoint where your traces are sent: `https://trace.agent.{{< region-param key="dd_site" >}}`. Defaults to `https://trace.agent.datadoghq.com`.                                                                                                                                                                                                   |
| `DD_APM_RECEIVER_PORT`     | Port that the Datadog Agent's trace receiver listens on. Default value is `8126`.                                                                                                                                                                                                                                           |
| `DD_APM_NON_LOCAL_TRAFFIC` | Allow non-local traffic when tracing from other containers. Default value is `true` (Agent 7.18+)                                                                                                                                                                                                                               |
| `DD_APM_IGNORE_RESOURCES`  | Configure resources for the Agent to ignore. Format should be comma separated, regular expressions. Like <code>GET /ignore-me,(GET\|POST) /and-also-me</code>.                                                                                                                                                       |
| `DD_ENV`                   | Sets the global `env` for all data emitted by the Agent. If `env` is not present in your trace data, this variable is used. See [APM environment setup][5] for more details.


### Operator environment variables
| Environment variable       | Description                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `agent.apm.enabled`                                                                                          | Enable this to enable APM and tracing, on port 8126. See the [Datadog Docker documentation][6].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `agent.apm.env`                                                                                              | The Datadog Agent supports many [environment variables][7].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `agent.apm.hostPort`                                                                                         | Number of port to expose on the host. If specified, this must be a valid port number, 0 < x < 65536. If `HostNetwork` is specified, this must match `ContainerPort`. Most containers do not need this.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `agent.apm.resources.limits`                                                                                 | Limits describes the maximum amount of compute resources allowed. For more info, see the [Kubernetes documentation][8].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `agent.apm.resources.requests`                                                                               | Requests describes the minimum amount of compute resources required. If `requests` is omitted for a container, it defaults to `limits` if that is explicitly specified, otherwise to an implementation-defined value. For more info, see the [Kubernetes documentation][8].     |                                                                                                                                                                                                                                                                                                                               |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /containers/kubernetes/installation
[2]: /tracing/setup/
[3]: /getting_started/tagging/unified_service_tagging
[4]: /tracing/configure_data_security#scrub-sensitive-data-from-your-spans
[5]: /tracing/guide/setting_primary_tags_to_scope/#environment
[6]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[7]: https://docs.datadoghq.com/agent/docker/?tab=standard#environment-variables
[8]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
[9]: /tracing/guide/setting_up_apm_with_kubernetes_service/
[10]: /tracing