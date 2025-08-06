---
title: Instrumenting Istio
code_lang: istio
type: multi-code-lang
code_lang_weight: 30
further_reading:
- link: "https://istio.io/"
  tag: "External Site"
  text: "Istio website"
- link: "https://istio.io/docs/"
  tag: "External Site"
  text: "Istio documentation"
- link: "https://github.com/DataDog/dd-trace-cpp"
  tag: "Source Code"
  text: "Datadog C++ Client"
aliases:
- /tracing/proxies
- /tracing/setup_overview/istio/
- /tracing/setup_overview/proxy_setup/
---

Datadog monitors every aspect of your Istio environment, so you can:
- View individual distributed traces for applications transacting over the mesh with APM (see below).
- Assess the health of Envoy and the Istio control plane with [logs][1].
- Break down the performance of your service mesh with request, bandwidth, and resource consumption [metrics][1].
- Map network communication between containers, pods, and services over the mesh with [Cloud Network Monitoring][2].

To learn more about monitoring your Istio environment with Datadog, [see the Istio blog][3].

Datadog APM is available for [supported Istio releases][13].

## Datadog Agent installation

1. [Install the Agent][4]
2. [Make sure APM is enabled for your Agent][5].
3. Uncomment the `hostPort` setting so that Istio sidecars can connect to the Agent and submit traces.


## Istio configuration and installation

To enable Datadog APM, a [custom Istio installation][6] is required to set two extra options when installing Istio.

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
application's deployment and service. More information can be found in Istio's documentation for [Protocol Selection][7]

By default, the service name used when creating traces is generated from the deployment name and namespace. This can be
set manually by adding an `app` label to the deployment's pod template:

```yaml
template:
  metadata:
    labels:
      app: <SERVICE_NAME>
```

For [CronJobs][8], the `app` label should be added to the job template, as the generated name comes from the `Job` instead
of the higher-level `CronJob`.

<!-- Commenting out due to a bug (ref: DOCS-11035)

## Istio Sampling

To control the volume of Istio traces that are sent to Datadog, configure a
sampling rule whose `"sample_rate"` is a value between `0.0` (0%) and `1.0`
(100%). Configure sampling rules with the `DD_TRACE_SAMPLING_RULES`
environment variable. If `DD_TRACE_SAMPLING_RULES` is not specified, then 100%
of Istio traces are sent to Datadog.

**Note**: These environment variables apply only to the subset of traces indicated by the `values.pilot.traceSampling` setting, hence the required `--set values.pilot.traceSampling=100.0` during Istio configuration.

Explicitly specifying an empty array of rules is different from not specifying rules.

To configure `DD_TRACE_SAMPLING_RULES`, in each deployment whose namespace is labeled `istio-injection=enabled`, set the environment variable as part of the `apm.datadoghq.com/env` annotation of the deployment spec template:
```
apiVersion: apps/v1
...
kind: Deployment
...
spec:
  template:
    metadata:
      annotations:
        apm.datadoghq.com/env: '{"DD_ENV": "prod", "DD_SERVICE": "my-service", "DD_VERSION": "v1.1", "DD_TRACE_SAMPLING_RULES": "[]"}'
```
`apm.datadoghq.com/env` is a string whose content is a JSON object mapping
environment variable names to values. The environment variable values are
themselves strings, and in the case of `DD_TRACE_SAMPLING_RULES`, the string
value is a JSON array of objects.

-->

## Deployment and service

If the Agents on your cluster are running as a deployment and service instead of the default DaemonSet, then an additional option is required to specify the DNS address and port of the Agent.
For a service named `datadog-agent` in the `default` namespace, that address would be `datadog-agent.default.svc.cluster.local:8126`.

- `--set values.global.tracer.datadog.address=datadog-agent.default.svc.cluster.local:8126`

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
This can be disabled using [manual protocol selection][12] for this specific service. The port name in the `datadog-agent` Service can be changed to `tcp-traceport`.
If using Kubernetes 1.18+, `appProtocol: tcp` can be added to the port specification.

## Environment variables

Environment variables for Istio sidecars can be set on a per-deployment basis using the `proxy.istio.io/config` annotation. This is unique for deployments employing Istio sidecars.
```yaml
apiVersion: apps/v1
...
kind: Deployment
...
spec:
  template:
    metadata:
      annotations:
        proxy.istio.io/config: |
          proxyMetadata:
            "DD_ENV": "prod"
            "DD_SERVICE": "my-service"
            "DD_VERSION": "v1.1"
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/istio/
[2]: /network_monitoring/performance/setup/#istio
[3]: https://www.datadoghq.com/blog/istio-datadog/
[4]: /agent/kubernetes/
[5]: /agent/kubernetes/apm/
[6]: https://istio.io/docs/setup/install/istioctl/
[7]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/
[8]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[9]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[10]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[12]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/#manual-protocol-selection
[13]: https://istio.io/latest/docs/releases/supported-releases/#support-status-of-istio-releases
