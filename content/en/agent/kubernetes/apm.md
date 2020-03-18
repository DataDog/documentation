---
title: Kubernetes trace collection
kind: documentation
aliases:
    - /agent/kubernetes/apm
further_reading:
- link: "agent/kubernetes/metrics"
  tag: "documentation"
  text: "Kubernetes Metrics"
---

In order to start collecting your application traces you must be [runing the Datadog Agent in your Kubernetes cluster][1].

## Setup

To enable trace collection with your Agent, follow the instructions below:

1. **Configure the Datadog Agent to accept traces**:

{{< tabs >}}
{{% tab "Helm" %}}


- If you haven't already, [install][6] the Helm chart.
- Update your datadog-values.yaml file with the following APM configuration:
    ```yaml	
    datadog:	
      ## @param apm - object - required	
      ## Enable apm agent and provide custom configs	
      #	
      apm:	
        ## @param enabled - boolean - optional - default: false	
        ## Enable this to enable APM and tracing, on port 8126	
        #	
        enabled: true	
    ```	
 - Then, upgrade your Datadog Helm chart using the following command : `helm upgrade -f datadog-values.yml <RELEASE NAME> stable/datadog`

{{% /tab %}}
{{% tab "Daemonset" %}}

To enable APM trace collection, open the Daemonset configuration file and edit the following:

- Allow incoming data from port `8126` (forwarding traffic from the host to the agent):

    ```yaml
     # (...)
          ports:
            # (...)
            - containerPort: 8126
              hostPort: 8126
              name: traceport
              protocol: TCP
     # (...)
    ```

- **If using an old agent version (7.17 or lower)**, in addition to the steps above, set the `DD_APM_NON_LOCAL_TRAFFIC` and `DD_APM_ENABLED` variable to `true` in your *env* section of the `datadog.yaml` Agent manifest:

    ```yaml
     # (...)
          env:
            # (...)
            - name: DD_APM_ENABLED
              value: 'true'
            - name: DD_APM_NON_LOCAL_TRAFFIC
              value: "true"
     # (...)
    ```

  Both flags are enabled by default on agent version 7.18+.  
{{% /tab %}}
{{< /tabs >}}

**Note**: On minikube, you may receive an `Unable to detect the kubelet URL automatically` error. In this case, set `DD_KUBELET_TLS_VERIFY=false`.

2. **Configure your application pods to pull the host IP in order to communicate with the Datadog Agent**: Use the downward API to pull the host IP; the application container needs the `DD_AGENT_HOST` environment variable that points to `status.hostIP`.

    ```yaml
        apiVersion: apps/v1
        kind: Deployment
         # ...
            spec:
              containers:
              - name: "<CONTAINER_NAME>"
                image: "<CONTAINER_IMAGE>"/"<TAG>"
                env:
                  - name: DD_AGENT_HOST
                    valueFrom:
                      fieldRef:
                        fieldPath: status.hostIP
    ```

3. **Configure your application tracers to emit traces**: Point your application-level tracers to where the Datadog Agent host is using the environment variable `DD_AGENT_HOST`. Refer to the [language-specific APM instrumentation docs][2] for more examples.

## Agent Environment Variables

List of all environment variables available for tracing within the Agent running in Kubernetes:

| Environment variable       | Description                                                                                                                                                                                                                                                                                                                 |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_API_KEY`               | [Datadog API Key][2]                                                                                                                                                                                                                                                                                                        |
| `DD_PROXY_HTTPS`           | Set up the URL for the proxy to use.                                                                                                                                                                                                                                                                                        |
| `DD_APM_REPLACE_TAGS`      | [Scrub sensitive data from your span’s tags][3].                                                                                                                                                                                                                                                                            |
| `DD_HOSTNAME`              | Manually set the hostname to use for metrics if autodection fails, or when running the Datadog Cluster Agent.                                                                                                                                                                                                               |
| `DD_DOGSTATSD_PORT`        | Set the DogStatsD port.                                                                                                                                                                                                                                                                                                     |
| `DD_APM_RECEIVER_SOCKET`  | Collect your traces through a Unix Domain Sockets and takes priority over hostname and port configuration if set. Off by default, when set it must point to a valid sock file.                                                                                                                                            |
| `DD_BIND_HOST`             | Set the StatsD & receiver hostname.                                                                                                                                                                                                                                                                                         |
| `DD_LOG_LEVEL`             | Set the logging level. (`trace`/`debug`/`info`/`warn`/`error`/`critical`/`off`)                                                                                                                                                                                                                                             |
| `DD_APM_ENABLED`           | When set to `true`, the Datadog Agent accepts trace metrics.                                                                                                                                                                                                                                                                |
| `DD_APM_CONNECTION_LIMIT`  | Sets the maximum connection limit for a 30 second time window.                                                                                                                                                                                                                                                              |
| `DD_APM_DD_URL`            | Datadog API endpoint where traces are sent. For Datadog EU site set `DD_APM_DD_URL` to `https://trace.agent.datadoghq.eu`                                                                                                                                                                                                   |
| `DD_APM_RECEIVER_PORT`     | Port that the Datadog Agent's trace receiver listens on. Default value is `8126`.                                                                                                                                                                                                                                           |
| `DD_APM_NON_LOCAL_TRAFFIC` | Allow non-local traffic when tracing from other containers.                                                                                                                                                                                                                               |
| `DD_APM_IGNORE_RESOURCES`  | Configure resources for the Agent to ignore. Format should be comma separated, regular expressions. i.e. <code>GET /ignore-me,(GET\|POST) /and-also-me</code>.                                                                                                                                                                          |
| `DD_APM_ANALYZED_SPANS`    | Configure the spans to analyze for transactions. Format should be comma separated instances of <code>\<SERVICE_NAME>\|;\<OPERATION_NAME>=1</code>. i.e. <code>my-express-app\|;express.request=1,my-dotnet-app\|;aspnet_core_mvc.request=1</code>. You can also [enable it automatically][4] with the configuration parameter in the Tracing Client. |
| `DD_APM_ENV`               | Sets the default [environment][5] for your traces.                                                                                                                                                                                                                                                                          |
| `DD_APM_MAX_EPS`           | Sets the maximum Analyzed Spans per second.                                                                                                                                                                                                                                                                                 |
| `DD_APM_MAX_TPS`           | Sets the maximum traces per second.                                                                                                                                                                                                                                                                                         |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/
[2]: /tracing/setup/
[3]: /tracing/guide/security/#replace-rules
[4]: /tracing/app_analytics/#automatic-configuration
[5]: /tracing/guide/setting_primary_tags_to_scope/#environment
[6]: /agent/kubernetes/?tab=helm
