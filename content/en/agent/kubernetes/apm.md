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

To setup APM trace collection in a kubernetes cluster you need to:

1. **Configure the Datadog Agent to accept traces**:

    {{< tabs >}}
{{% tab "Daemonset" %}}

To enable APM trace collection in kubernetes:

- Allow incoming data from port `8126` and set the `DD_APM_NON_LOCAL_TRAFFIC` variable to true in your *env* section:

    ```yaml
     # (...)
          env:
            # (...)
            - name: DD_APM_NON_LOCAL_TRAFFIC
              value: "true"
     # (...)
    ```

- Forward the port of the Agent to the host.

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

{{% /tab %}}
{{% tab "Helm" %}}

**Note**: If you want to deploy the Datadog Agent as a deployment instead of a DaemonSet, configuration of APM via Helm is not supported.

- Update your [datadog-values.yaml][2] file with the following APM configuration:

    ```yaml
    datadog:
      ## @param apm - object - required
      ## Enable apm agent and provide custom configs
      #
      apm:
        ## @param enabled - boolean - optional - default: false
        ## Enable this to enable APM and tracing, on port 8126
        ## ref: https://github.com/DataDog/docker-dd-agent#tracing-from-the-host
        #
        enabled: true

        ## @param port - integer - optional - default: 8126
        ## Override the trace Agent DogStatsD port.
        ## Note: Make sure your client is sending to the same UDP port.
        #
        port: 8126
    ```

- Then upgrade your Datadog Helm chart.

{{% /tab %}}
{{< /tabs >}}

    **Note**: On minikube, you may receive an `Unable to detect the kubelet URL automatically` error. In this case, set `DD_KUBELET_TLS_VERIFY=false`.

2. **Configure your application pods to pull the Host IP in order to communicate with the Datadog Agent**: Use the downward API to pull the host IP; the application container needs an environment variable that points to `status.hostIP`. The Datadog container Agent expects this to be named `DD_AGENT_HOST`:

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

3. **Configure your application tracers to emit traces**: Point your application-level tracers to where the Datadog Agent host is using the environment variable `DD_AGENT_HOST`. Refer to the [language-specific APM instrumentation docs][1] for more examples.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup
