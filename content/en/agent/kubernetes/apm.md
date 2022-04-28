---
title: Kubernetes Trace Collection
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

In order to start collecting your application traces you must be [running the Datadog Agent in your Kubernetes cluster][1].

## Setup

You can configure the Agent to intake traces by using either TCP (`IP:Port`), Unix Domain Socket (UDS), or both. The Agent can receive traces from both setups at the same time if needed.

{{< img src="tracing/visualization/troubleshooting_pipeline_kubernetes.png" alt="The APM troubleshooting pipeline: The tracer sends traces and metrics data from the application pod to the Agent pod, which sends it to the Datadog backend to be shown in the Datadog UI.">}}

### Configure the Datadog Agent to accept traces
{{< tabs >}}
{{% tab "Helm" %}}

- If you haven't already, [install][1] the Helm chart.

The default configuration creates a directory on the host and mounts it within the Agent. The Agent then creates and listens on a socket file `/var/run/datadog/apm.socket`. The application pods can then similarly mount this volume and write to this same socket. You can modify the path and socket with the `datadog.apm.hostSocketPath` and `datadog.apm.socketPath` configuration values.

#### Optional - Configure the Datadog Agent to accept traces over TCP

Datadog agent can also be configured to receive traces over TCP. To enable this feature:

- Update your `values.yaml` file with the following APM configuration:
    ```yaml
    datadog:
      ## Enable apm agent and provide custom configs
      apm:
        # datadog.apm.portEnabled -- Enable APM over TCP communication (port 8126 by default)
        ## ref: https://docs.datadoghq.com/agent/kubernetes/apm/
        portEnabled: true
    ```

Then, upgrade your Datadog Helm chart using the following command: `helm upgrade -f values.yaml <RELEASE NAME> datadog/datadog`. If you did not set your operating system in `values.yaml`, add `--set targetSystem=linux` or `--set targetSystem=windows` to this command.

[1]: /agent/kubernetes/?tab=helm
{{% /tab %}}
{{% tab "DaemonSet" %}}

To enable APM trace collection, open the DaemonSet configuration file and edit the following:

- Allow incoming data from port `8126` (forwarding traffic from the host to the agent) within the `trace-agent` container:
    ```yaml
      # (...)
      containers:
        - name: trace-agent
          # (...)
          ports:
            - containerPort: 8126
              hostPort: 8126
              name: traceport
              protocol: TCP
      # (...)
    ```

- **If using an old agent version (7.17 or lower)**, in addition to the steps above, set the `DD_APM_NON_LOCAL_TRAFFIC` and `DD_APM_ENABLED` variable to `true` in your `env` section of the `datadog.yaml` trace Agent manifest:

  ```yaml
    # (...)
    containers:
      - name: trace-agent
        # (...)
        env:
          - name: DD_APM_ENABLED
            value: 'true'
          - name: DD_APM_NON_LOCAL_TRAFFIC
            value: "true"
          # (...)
  ```

{{% /tab %}}
{{% tab "DaemonSet (UDS)" %}}

To enable APM trace collection, open the DaemonSet configuration file and edit the following:

  ```yaml
    # (...)
    containers:
    - name: trace-agent
      # (...)
      env:
      - name: DD_APM_ENABLED
        value: "true"
      - name: DD_APM_RECEIVER_SOCKET
        value: "/var/run/datadog/apm.socket"
    # (...)
      volumeMounts:
      - name: apmsocket
        mountPath: /var/run/datadog/
    volumes:
    - hostPath:
        path: /var/run/datadog/
        type: DirectoryOrCreate
    # (...)
  ```

This configuration creates a directory on the host and mounts it within the Agent. The Agent then creates and listens on a socket file in that directory with the `DD_APM_RECEIVER_SOCKET` value of `/var/run/datadog/apm.socket`. The application pods can then similarly mount this volume and write to this same socket.
{{% /tab %}}
{{% tab "Operator" %}}

The default configuration creates a directory on the host and mounts it within the Agent. The Agent then creates and listens on a socket file `/var/run/datadog/apm.socket`. The application pods can then similarly mount this volume and write to this same socket. You can modify the path and socket with the `agent.apm.hostSocketPath` and `agent.apm.socketPath` configuration values.

#### Optional - Configure the Datadog Agent to accept traces over TCP
Datadog agent can also be configured to receive traces over TCP. To enable this feature:

Update your `datadog-agent.yaml` manifest with the following:

```yaml
agent:
  image:
    name: "gcr.io/datadoghq/agent:latest"
  apm:
    enabled: true
    hostPort: 8126
site: <DATADOG_SITE>
```
Where your `<DATADOG_SITE>` is {{< region-param key="dd_site" code="true" >}} (defaults to `datadoghq.com`).

See the sample [manifest with APM and metrics collection enabled][1] for a complete example.

Then apply the new configuration:

```shell
$ kubectl apply -n $DD_NAMESPACE -f datadog-agent.yaml
```

[1]: https://github.com/DataDog/datadog-operator/blob/main/examples/datadogagent/datadog-agent-apm.yaml
{{% /tab %}}
{{< /tabs >}}

**Note**: On minikube, you may receive an `Unable to detect the kubelet URL automatically` error. In this case, set `DD_KUBELET_TLS_VERIFY=false`.

### Configure your application pods to submit traces to Datadog Agent

{{< tabs >}}
{{% tab "Datadog Admission Controller" %}}
[Datadog Admission Controller][1] is able to inject environment variables and mount the necessary volumes on new application-pods in order to configure pod/agent trace communication automatically.

To learn more on how to automatically configure you application to submit traces to Datadog Agent refer to [Datadog Admission Controller][1].

[1]: /agent/cluster_agent/admission_controller/
{{% /tab %}}

{{% tab "UDS" %}}
If you are sending traces to the Agent by using Unix Domain Socket (UDS), mount the host directory the socket is in (that the Agent created) to the application container and specify the path to the socket with `DD_TRACE_AGENT_URL`:

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

[1]: /agent/cluster_agent/admission_controller/
{{% /tab %}}
{{< /tabs >}}

### Configure your application tracers to emit traces:
After configuring your Datadog Agent to collect traces and giving your application pods the configuration on *where* to send traces, install the Datadog Tracer into your applications to emit the traces. Once this is done, the tracer automatically sends the traces to the relative `DD_AGENT_HOST` (for `IP:Port`) or `DD_TRACE_AGENT_URL` (for UDS) endpoint.

Refer to the [language-specific APM instrumentation docs][1] for more examples.

**Note:** The PHP tracer does not currently support sending traces over Unix Domain Socket (UDS). For updates on UDS for PHP, contact support.

[1]: /tracing/setup/

## Agent environment variables

**Note**: As a best practice, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, refer to the dedicated [unified service tagging][2] documentation.

List of all environment variables available for tracing within the Agent running in Kubernetes:

| Environment variable       | Description                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_API_KEY`               | [Datadog API Key][3]                                                                                                                                                                                                                                                                                                        |
| `DD_PROXY_HTTPS`           | Set up the URL for the proxy to use.                                                                                                                                                                                                                                                                                        |
| `DD_APM_REPLACE_TAGS`      | [Scrub sensitive data from your span’s tags][4].                                                                                                                                                                                                                                                                            |
| `DD_HOSTNAME`              | Manually set the hostname to use for metrics if autodection fails, or when running the Datadog Cluster Agent.                                                                                                                                                                                                               |
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


[1]: /agent/kubernetes/
[2]: /getting_started/tagging/unified_service_tagging
[3]: /tracing/setup/
[4]: /tracing/guide/security/#replace-rules
[5]: /tracing/guide/setting_primary_tags_to_scope/#environment
[6]: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
[7]: https://docs.datadoghq.com/agent/docker/?tab=standard#environment-variables
[8]: https://kubernetes.io/docs/concepts/configuration/manage-compute-resources-container/
