---
title: Istio
kind: documentation
further_reading:
- link: "/tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources and traces"
- link: "https://istio.io/"
  tag: "Documentation"
  text: "Istio website"
- link: "https://istio.io/docs/"
  tag: "Documentation"
  text: "Istio documentation"
- link: "https://github.com/DataDog/dd-opentracing-cpp"
  tag: "Source Code"
  text: "Datadog OpenTracing C++ Client"
aliases:
- /tracing/istio/
---

Datadog APM is available for Istio v1.1.3+ on Kubernetes clusters.

## Configuration

### Datadog Agent Installation

1. [Install the Agent][1]
2. [Make sure APM is enabled for your Agent][2].
3. Uncomment the `hostPort` setting so that Istio sidecars can connect to the Agent and submit traces.


### Istio Configuration and Installation

To enable Datadog APM, a [custom Istio installation][3] is required to set two extra options when installing Istio.

- `--set values.global.proxy.tracer=datadog`
- `--set values.pilot.traceSampling=100.0`

```shell
istioctl manifest apply --set values.global.proxy.tracer=datadog --set values.pilot.traceSampling=100.0
```

Traces are generated when the namespace for the pod has sidecar injection enabled. This is done by adding
the `istio-injection=enabled` label.

```shell
kubectl label namespace example-ns istio-injection=enabled
```

Traces are generated when Istio is able to determine the traffic is using an HTTP-based protocol.
By default, Istio tries to automatically detect this. It can be manually configured by naming the ports in your
application's deployment and service. More information can be found in Istio's documentation for [Protocol Selection][4]

By default, the service name used when creating traces is generated from the deployment name and namespace. This can be
set manually by adding an `app` label to the deployment's pod template:

```yaml
template:
  metadata:
    labels:
      app: <SERVICE_NAME>
```

For [CronJobs][5], the `app` label should be added to the job template, as the generated name comes from the `Job` instead
of the higher-level `CronJob`.

### Environment Variables

Environment variables for Istio sidecars can be set on a per-deployment basis using the `apm.datadoghq.com/env` annotation.
```yaml
    metadata:
      annotations:
        apm.datadoghq.com/env: '{ "DD_ENV": "prod", "DD_TRACE_ANALYTICS_ENABLED": "true" }'
```

The available [environment variables][6] depend on the version of the C++ tracer embedded in the Istio sidecar's proxy.

| Istio Version | C++ Tracer Version |
|---------------|--------------------|
| v1.7.x | v1.1.5 |
| v1.6.x | v1.1.3 |
| v1.5.x | v1.1.1 |
| v1.4.x | v1.1.1 |
| v1.3.x | v1.1.1 |
| v1.2.x | v0.4.2 |
| v1.1.3 | v0.4.2 |


### Running Agent as Deployment and Service

If the Agents on your cluster are running as a Deployment and Service instead of the default DaemonSet, then an additional option is required to specify the DNS address and port of the Agent.
For a service named `datadog-agent` in the `default` namespace, that address would be `datadog-agent.default.svc.cluster.local:8126`.

- `--set values.global.tracer.datadog.address=datadog-agent.default:8126`

If Mutual TLS is enabled for the cluster, then the Agent's deployment should disable sidecar injection, and you should add a traffic policy that disables TLS.

This annotation is added to the Agent's Deployment template.
```
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
```

For Istio v1.4.x, the traffic policy can be configured using a DestinationRule. Istio v1.5.x and higher do not need an additional traffic policy.
```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: datadog-agent
  namespace: istio-system
spec:
  host: datadog-agent.default.svc.cluster.local
  trafficPolicy:
    tls:
      mode: DISABLE
```

Automatic Protocol Selection may determine that traffic between the sidecar and Agent is HTTP, and enable tracing.
This can be disabled using [manual protocol selection][7] for this specific service. The port name in the `datadog-agent` Service can be changed to `tcp-traceport`.
If using Kubernetes 1.18+, `appProtocol: tcp` can be added to the port specification.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/
[2]: /agent/kubernetes/apm/
[3]: https://istio.io/docs/setup/install/istioctl/
[4]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/
[5]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[6]: /tracing/setup/cpp/#environment-variables
[7]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/#manual-protocol-selection
