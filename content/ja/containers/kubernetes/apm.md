---
title: Kubernetes APM - Trace Collection
aliases:
    - /agent/kubernetes/apm
further_reading:
- link: /agent/kubernetes/log/
  tag: Documentation
  text: Collect your application logs
- link: /agent/kubernetes/prometheus/
  tag: Documentation
  text: Collect your Prometheus metrics
- link: /agent/kubernetes/integrations/
  tag: Documentation
  text: Collect automatically your applications metrics and logs
- link: /agent/guide/autodiscovery-management/
  tag: Documentation
  text: Limit data collection to a subset of containers only
- link: /agent/kubernetes/tag/
  tag: Documentation
  text: Assign tags to all data emitted by a container
---

{{< learning-center-callout header="Try Introduction to Monitoring Kubernetes in the Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/intro-to-monitoring-kubernetes">}}
  Learn without cost on real cloud compute capacity and a Datadog trial account. Start these hands-on labs to get up to speed with the metrics, logs, and APM traces that are specific to Kubernetes.
{{< /learning-center-callout >}}

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
{{% tab "Datadog Operator" %}}
Edit your `datadog-agent.yaml` to set `features.apm.enabled` to `true`.

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
        path: /var/run/datadog/apm.socket # default
```

When APM is enabled, the default configuration creates a directory on the host and mounts it within the Agent. The Agent then creates and listens on a socket file `/var/run/datadog/apm/apm.socket`. The application pods can then similarly mount this volume and write to this same socket. You can modify the path and socket with the `features.apm.unixDomainSocketConfig.path` configuration value.

{{% k8s-operator-redeploy %}}

**Note**: On minikube, you may receive an `Unable to detect the kubelet URL automatically` error. In this case, set `global.kubelet.tlsVerify` to `false`.

{{% /tab %}}
{{% tab "Helm" %}}

If you [used Helm to install the Datadog Agent][1], APM is **enabled by default** over UDS or Windows named pipe.

To verify, ensure that `datadog.apm.socketEnabled` is set to `true` in your `datadog-values.yaml`.

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

Update your `datadog-values.yaml` file with the following APM configuration:

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

## APM environment variables

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Set additional APM environment variables under `override.nodeAgent.containers.trace-agent.env`:

{{< code-block lang="yaml" filename="datadog-agent.yaml" >}}
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      containers:
        trace-agent:
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "Helm" %}}
Set additional APM environment variables under `agents.containers.traceAgent.env`:
{{< code-block lang="yaml" filename="datadog-values.yaml" >}}
agents:
  containers:
    traceAgent:
      env:
        - name: <ENV_VAR_NAME>
          value: <ENV_VAR_VALUE>
{{< /code-block >}}

{{% /tab %}}
{{% tab "DaemonSet" %}}
Add environment variables to the DaemonSet or Deployment (for Datadog Cluster Agent).
```yaml
apiVersion: apps/v1
kind: DaemonSet
metadata:
  name: datadog
spec:
  template:
    spec:
      containers:
        - name: agent
          ...
          env:
            - name: <ENV_VAR_NAME>
              value: <ENV_VAR_VALUE>
```

{{% /tab %}}
{{< /tabs >}}

List of environment variables available for configuring APM:

| Environment variable | Description |
| -------------------- | ----------- |
| `DD_APM_ENABLED`           | When set to `true`, the Datadog Agent accepts trace metrics. <br/>**Default**: `true` (Agent 7.18+) |
| `DD_APM_ENV`           | Sets the `env:` tag on collected traces.  |
| `DD_APM_RECEIVER_SOCKET` | For tracing over UDS. When set, must point to a valid socket file. |
| `DD_APM_RECEIVER_PORT`     | For tracing over TCP, the port that the Datadog Agent's trace receiver listens on. <br/>**Default**: `8126` |
| `DD_APM_NON_LOCAL_TRAFFIC` | Allow non-local traffic when tracing from other containers. <br/>**Default**: `true` (Agent 7.18+) |
| `DD_APM_DD_URL`            | The Datadog API endpoint where your traces are sent: `https://trace.agent.{{< region-param key="dd_site" >}}`. <br/>**Default**:  `https://trace.agent.datadoghq.com` |
| `DD_APM_TARGET_TPS`     | The target traces per second to sample. <br/>**Default**: `10` |
| `DD_APM_ERROR_TPS`     | The target error trace chunks to receive per second. <br/>**Default**: `10` |
| `DD_APM_MAX_EPS`     | Maximum number of APM events per second to sample. <br/>**Default**: `200` |
| `DD_APM_MAX_MEMORY`     | What the Datadog Agent aims to use in terms of memory. If surpassed, the API rate limits incoming requests. <br/>**Default**: `500000000` |
| `DD_APM_MAX_CPU_PERCENT`     | The CPU percentage that the Datadog Agent aims to use. If surpassed, the API rate limits incoming requests. <br/>**Default**: `50` |
| `DD_APM_FILTER_TAGS_REQUIRE`     | Collects only traces that have root spans with an exact match for the specified span tags and values. <br/>See [Ignoring unwanted resources in APM][11]. |
| `DD_APM_FILTER_TAGS_REJECT`     | Rejects traces that have root spans with an exact match for the specified span tags and values. <br/>See [Ignoring unwanted resources in APM][11]. |
| `DD_APM_REPLACE_TAGS` | [Scrub sensitive data from your span's tags][4]. |
| `DD_APM_IGNORE_RESOURCES`  | Configure resources for the Agent to ignore. Format should be comma separated, regular expressions. <br/>For example: `GET /ignore-me,(GET\|POST) /and-also-me` |
| `DD_APM_LOG_FILE`  | Path to file where APM logs are written. |
| `DD_APM_CONNECTION_LIMIT`  | Maximum connection limit for a 30 second time window. <br/>**Default**: 2000 |
| `DD_APM_ADDITONAL_ENDPOINTS`     | Send data to multiple endpoints and/or with multiple API keys. <br/>See [Dual Shipping][12]. |
| `DD_APM_DEBUG_PORT`     | Port for the debug endpoints for the Trace Agent. Set to `0` to disable the server. <br/>**Default**: `5012`. |
| `DD_BIND_HOST`             | Set the StatsD and receiver hostname. |
| `DD_DOGSTATSD_PORT`        | For tracing over TCP, set the DogStatsD port. |
| `DD_ENV`                   | Sets the global `env` for all data emitted by the Agent. If `env` is not present in your trace data, this variable is used. |
| `DD_HOSTNAME`         | Manually set the hostname to use for metrics if autodetection fails, or when running the Datadog Cluster Agent. |
| `DD_LOG_LEVEL`             | Set the logging level. <br/>**Values**: `trace`, `debug`, `info`, `warn`, `error`, `critical`, `off` |
| `DD_PROXY_HTTPS`     | Set up the URL for the proxy to use. |


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: /containers/kubernetes/installation
[2]: /tracing/setup/
[3]: /getting_started/tagging/unified_service_tagging
[4]: /tracing/configure_data_security/?tab=kubernetes#replace-tags
[5]: /tracing/guide/setting_primary_tags_to_scope/#environment
[6]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[7]: https://docs.datadoghq.com/agent/docker/?tab=standard#environment-variables
[8]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
[9]: /tracing/guide/setting_up_apm_with_kubernetes_service/
[10]: /tracing
[11]: /tracing/guide/ignoring_apm_resources/?tab=kubernetes
[12]: /agent/configuration/dual-shipping/