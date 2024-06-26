---
title: Setting up APM with Kubernetes Service
kind: guide
further_reading:
- link: "/containers/kubernetes/apm/"
  tag: "Documentation"
  text: "Set up trace collection"
- link: "/containers/cluster_agent/admission_controller"
  tag: "Documentation"
  text: "Admission Controller"
---

## Overview

In Kubernetes, Datadog tracers can send data to the Datadog Agent in three ways: Unix Domain Socket (UDS), host IP, or a Kubernetes service. Each option ensures that when an application pod sends APM data, the data arrives at a Datadog Agent pod on the same node. This strategy is meant to properly balance traffic and ensure the correct tagging of your data. Datadog recommends that you use UDS to send data. 

However, if the `hostPath` volumes required for UDS (and the `hostPort` ports required for using host IP) are not available, you can use a Kubernetes service as an alternative option. 

This guide describes how to configure using a Kubernetes service to send data to the Datadog Agent.

## Service setup

In Kubernetes 1.22, the [Internal Traffic Policy feature][1] provides the option to set the configuration `internalTrafficPolicy: Local` on a service. When set, traffic from an application pod is directed to the service's downstream pod *on the same node*.

If you installed the Datadog Agent by using the Datadog [Helm chart][3] or [Datadog Operator][4] on clusters with Kubernetes v1.22.0+, a service for the Agent with `internalTrafficPolicy: Local` is automatically created for you. You additionally need to enable the APM port option for your Agent with the below configuration.

### Agent configuration
{{< tabs >}}
{{% tab "Datadog Operator" %}}

Update your `datadog-agent.yaml` to set `features.apm.enabled` to `true`.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    apm:
      enabled: true
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

Update your `datadog-values.yaml` to set `datadog.apm.portEnabled` to `true`.

```yaml
datadog:
  apm:
    portEnabled: true
```    

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{< /tabs >}}

## Application configuration
You can configure your application to use the Kubernetes service by using the Cluster Agent Admission Controller, or with a manual configuration.

### Cluster Agent Admission Controller
The [Cluster Agent's Admission Controller][2] can inject the configuration for APM connectivity into your containers. The options are `hostip`, `socket`, or `service`. Choose the `service` mode to have the Admission Controller add the `DD_AGENT_HOST` environment variable for the DNS name of the service.

{{< tabs >}}
{{% tab "Datadog Operator" %}}
Update your `datadog-agent.yaml` with the following:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  #(...)
  features:
    apm:
      enabled: true
    admissionController:
      enabled: true
      agentCommunicationMode: service
```

{{% k8s-operator-redeploy %}}

{{% /tab %}}
{{% tab "Helm" %}}

Update your `datadog-values.yaml` with the following:

```yaml
clusterAgent:
  admissionController:
    enabled: true
    configMode: service
```

{{% k8s-helm-redeploy %}}

{{% /tab %}}
{{< /tabs >}}

**Note:** In mixed node (Linux/Windows) environments, the Cluster Agent and its Admission Controller are relative to the Linux deployment. This may inject the wrong environment variables for the service connectivity in the Windows pods. 

### Manual configuration
For manual configuration, set the environment variable `DD_AGENT_HOST` within your pod manifest, with a value of `<SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local`.

```yaml
    #(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>"
        env:
          - name: DD_AGENT_HOST
            value: <SERVICE_NAME>.<SERVICE_NAMESPACE>.svc.cluster.local
```

Replace `<SERVICE_NAME>` with the service's name, and replace `<SERVICE_NAMESPACE>` with the service's namespace.

For example, if your service definition looks like the following:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: datadog
  namespace: monitoring
  labels:
    #(...)
spec:
  selector:
    app: datadog
  ports:
    - protocol: UDP
      port: 8125
      targetPort: 8125
      name: dogstatsdport
    - protocol: TCP
      port: 8126
      targetPort: 8126
      name: traceport
  internalTrafficPolicy: Local
```

Then set the value of `DD_AGENT_HOST` to `datadog.monitoring.svc.cluster.local`.

```yaml
    #(...)
    spec:
      containers:
      - name: "<CONTAINER_NAME>"
        image: "<CONTAINER_IMAGE>"
        env:
          - name: DD_AGENT_HOST
            value: datadog.monitoring.svc.cluster.local
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://kubernetes.io/docs/concepts/services-networking/service-traffic-policy/
[2]: /containers/cluster_agent/admission_controller
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[4]: /containers/datadog_operator
